# Demo Deploying to Kubernetes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/PyTorch/Model-Deployment-and-Inference/Demo-Deploying-to-Kubernetes)

---

## Table of Contents

- Demo Deploying to Kubernetes
  - Model Deployment and Horizontal Pod Autoscaler
  - Using Node Affinity and Node Selectors
  - Taints and Tolerations
  - Requesting GPUs in Your Deployment
  - Summary
  - Watch Video
  - Practice Lab
    - Node Affinity
    - Node Selector

---

## Content

PyTorch

Model Deployment and Inference

# Demo Deploying to Kubernetes

In this article, we explore several advanced approaches for deploying your machine learning models on Kubernetes. We cover creating deployments, configuring Horizontal Pod Autoscalers (HPA), and applying node affinity, node selectors, and taints with tolerations to target specific nodes. These techniques are key for managing scaling, optimal resource allocation, and enforcing specialized hardware usage (such as GPUs).

---

## Model Deployment and Horizontal Pod Autoscaler

Below is a sample deployment YAML that runs a Flask application and its associated pod specification:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ml-model-deployment
spec:
  selector:
    matchLabels:
      app: ml-model
  template:
    metadata:
      labels:
        app: ml-model
    spec:
      containers:
      - name: ml-model-container
        image: wbassler/mobilenetv3lg-flask:v1.0
        imagePullPolicy: Always
        resources:
          requests:
            cpu: "200m"
            memory: "250Mi"
          limits:
            cpu: "200m"
            memory: "250Mi"
```

Next, we define a Horizontal Pod Autoscaler to automatically adjust the number of replicas based on CPU utilization. The HPA targets the above deployment, scaling the pods between 3 and 10 replicas to maintain a target CPU utilization of 70%:

```
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: ml-model-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: ml-model-deployment
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

To deploy and test your configuration, apply the manifests and establish a port-forward to your service with the following commands:

```
kubectl apply -f manifests/
kubectl port-forward svc/ml-model-service 8
```

> [!important]
> **Note**
>
> While the load test executes in the background, observe how the Horizontal Pod Autoscaler automatically scales your application when the average CPU utilization exceeds 70%. You can inspect the HPA status with:
>
> ```
> kubectl describe hpa ml-model-hpa
> ```
>
> Note that HPA uses the CPU resource requests defined in the deployment rather than the resource limits.

---

## Using Node Affinity and Node Selectors

To ensure that specific pods run on nodes with specialized capabilities (for example, GPU-enabled nodes), you can use node affinity or node selectors.

### Node Affinity

Node affinity offers flexible scheduling policies based on node labels. To schedule pods exclusively on a node labeled "node02", add the following affinity rules to your deployment:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ml-model-deployment
spec:
  selector:
    matchLabels:
      app: ml-model
  template:
    metadata:
      labels:
        app: ml-model
    spec:
      affinity:
        nodeAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            nodeSelectorTerms:
            - matchExpressions:
              - key: kubernetes.io/hostname
                operator: In
                values:
                - "node02"
      containers:
      - name: ml-model-container
        image: wbassler/mobilenetv3lg-flask:v1.0
        imagePullPolicy: Always
        resources:
          requests:
            cpu: "300m"
```

### Node Selector

For a simpler scheduling approach, a node selector directly matches key-value pairs. The snippet below schedules the pod only on the node with the hostname "node02":

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ml-model-deployment
spec:
  selector:
    matchLabels:
      app: ml-model
  template:
    metadata:
      labels:
        app: ml-model
    spec:
      nodeSelector:
        kubernetes.io/hostname: "node02"
      containers:
      - name: ml-model-container
        image: wbassler/mobilenetv3lg-flask:v1.0
        imagePullPolicy: Always
        resources:
          requests:
            cpu: "200m"
            memory: "250Mi"
          limits:
            cpu: "200m"
            memory: "250Mi"
```

When checking your nodes using commands like `kubectl get nodes` and `kubectl describe node02`, you’ll see that all model deployment pods are scheduled on node02, thereby keeping other nodes like node01 available for different workloads.

---

## Taints and Tolerations

Taints allow nodes to repel certain pods unless they have the requisite tolerations. This is particularly useful for reserving nodes for specialized pods. For instance, taint node02 so that only pods with the corresponding toleration for key "role" and value "pytorch" are allowed to schedule:

```
kubectl taint nodes node02 role=pytorch:NoSchedule
kubectl describe node node02 | grep Taints
```

Then, update your deployment with the required tolerations:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ml-model-deployment
spec:
  selector:
    matchLabels:
      app: ml-model
  template:
    metadata:
      labels:
        app: ml-model
    spec:
      tolerations:
      - key: "role"
        operator: "Equal"
        value: "pytorch"
        effect: "NoSchedule"
      nodeSelector:
        kubernetes.io/hostname: "node02"
      containers:
      - name: ml-model-container
        image: wbassler/mobilenetv3lg-flask:v1.0
        imagePullPolicy: Always
        resources:
          requests:
            cpu: "200m"
            memory: "250Mi"
          limits:
            cpu: "200m"
            memory: "250Mi"
```

This configuration ensures that only pods with the specified toleration, such as your model deployment, are scheduled on node02. Conversely, an example Nginx deployment that does not include the necessary tolerations will not be scheduled on node02:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
```

Deploy the test pods manifest and verify the pod placement with:

```
kubectl apply -f manifests/test-pods.yaml
kubectl get pods -w
```

> [!important]
> **Note**
>
> The absence of the required toleration in the Nginx deployment prevents its pods from landing on node02.

---

## Requesting GPUs in Your Deployment

If your application benefits from GPU acceleration, ensure that your GPU-enabled nodes have NVIDIA drivers installed. Also, verify that your Docker image includes the necessary libraries and that the NVIDIA device plugin is deployed to your cluster. Update your container resource requests to include GPUs as shown below:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ml-model-deployment
spec:
  selector:
    matchLabels:
      app: ml-model
  template:
    metadata:
      labels:
        app: ml-model
    spec:
      tolerations:
      - key: "role"
        operator: "Equal"
        value: "pytorch"
        effect: "NoSchedule"
      nodeSelector:
        kubernetes.io/hostname: "node02"
      containers:
      - name: ml-model-container
        image: wbassler/mobilenetv3lg-flask:v1.0
        imagePullPolicy: Always
        resources:
          requests:
            cpu: "200m"
            memory: "250Mi"
            nvidia.com/gpu: 1  # Request 1 GPU
          limits:
            cpu: "200m"
            memory: "250Mi"
            nvidia.com/gpu: 1  # Limit to 1 GPU
```

Ensure your application is properly configured to leverage GPU acceleration with the appropriate NVIDIA drivers and libraries.

---

## Summary

In this article, we explored a range of advanced deployment scenarios in Kubernetes:

- Deploying model applications using Deployment objects and Horizontal Pod Autoscalers.
- Leveraging node affinity and node selectors to target specific nodes.
- Applying taints and tolerations to reserve nodes for specialized workloads.
- Requesting GPUs in your container resource specifications.

These techniques empower you to fine-tune your Kubernetes deployments and meet specific performance, scheduling, and resource requirements. For more detailed information, refer to the [Kubernetes Documentation](https://kubernetes.io/docs/).

Thanks for reading!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/pytorch/module/a958efa1-845c-4cdf-9261-7688050bd96c/lesson/caadb2eb-ce72-402b-b576-f8218af04876)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/pytorch/module/a958efa1-845c-4cdf-9261-7688050bd96c/lesson/6f914b07-bff5-4511-9a47-72278be78fbf)**
>
> Practice lab
