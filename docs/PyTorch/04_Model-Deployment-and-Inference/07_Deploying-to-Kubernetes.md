# Deploying to Kubernetes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/PyTorch/Model-Deployment-and-Inference/Deploying-to-Kubernetes)

---

## Table of Contents

- Deploying to Kubernetes
  - What is Kubernetes?
  - Why Use Kubernetes for Model Deployment?
  - Handling Specialized Workloads
  - Deploying an ML Model to Kubernetes
  - Horizontal Pod Autoscaler (HPA)
  - Best Practices for Deploying ML Models on Kubernetes
  - ML Serving Frameworks for Kubernetes
  - Conclusion
  - Watch Video
    - Node Affinity
    - Node Selector
    - Taints and Tolerations
    - Resource Requests and Limits

---

## Content

PyTorch

Model Deployment and Inference

# Deploying to Kubernetes

Kubernetes has rapidly become the de facto standard for deploying scalable, resilient applications, including machine learning (ML) models. Its robust architecture, which has scaled the internet among other applications, now plays a critical role in modern AI/ML initiatives.

![The image illustrates Kubernetes as a central component, highlighting its features such as seamless deployment, AI/ML support, and scalable architecture.](https://kodekloud.com/kk-media/image/upload/v1752883212/notes-assets/images/PyTorch-Deploying-to-Kubernetes/kubernetes-features-deployment-ai-ml.jpg)

In this guide, we explore why Kubernetes is ideal for model deployment. We assume you already have a basic understanding of Kubernetes, so our focus will be on its advantages and best practices for deploying ML models rather than a comprehensive platform overview.

We'll start by discussing the key benefits of using Kubernetes for model deployment. Then, we demonstrate how to leverage Kubernetes to handle specialized workloads, outline the complete deployment workflow for ML models, share best practices, and review popular ML serving frameworks.

![The image shows an agenda for a presentation on Kubernetes, covering topics like its role in model deployment, key benefits, specialized workloads, deployment workflow, best practices, and ML serving frameworks.](https://kodekloud.com/kk-media/image/upload/v1752883213/notes-assets/images/PyTorch-Deploying-to-Kubernetes/kubernetes-presentation-agenda-topics.jpg)

## What is Kubernetes?

Kubernetes is an open-source platform for automating the deployment, scaling, and management of containerized applications.

![The image is a slide titled "Kubernetes for Model Deployment" featuring the Kubernetes logo and a description of it as an open-source platform for automating deployment, scaling, and management of containerized applications.](https://kodekloud.com/kk-media/image/upload/v1752883214/notes-assets/images/PyTorch-Deploying-to-Kubernetes/kubernetes-model-deployment-slide.jpg)

Rather than rehash its general capabilities, let’s dive into why Kubernetes is particularly well-suited for ML model deployment.

## Why Use Kubernetes for Model Deployment?

Kubernetes offers several compelling benefits when deploying machine learning models:

- **High-Volume Request Handling:** Designed to manage a high volume of simultaneous requests, making it ideal for production environments where model traffic can fluctuate.
- **Seamless Scalability:** Its inherent scalability allows your application to grow without requiring extensive modifications to your deployment configuration.
- **Efficient Resource Utilization:** Kubernetes optimally allocates limited resources like GPUs, ensuring cost-effective operations for resource-heavy AI workloads.
- **Versatile Deployment Scenarios:** Whether deploying for real-time data inference or batch processing of historical data, Kubernetes adapts easily to various deployment scenarios.
- **Automated Resource Management:** It automates critical processes such as scaling during peak demand and adjusting resources during low-demand periods, while continuously monitoring system health for high availability and reliability.

Overall, Kubernetes streamlines the complex process of deploying and managing ML models, making it a powerful tool for modern AI applications.

## Handling Specialized Workloads

ML and AI tasks often require specific hardware configurations. Kubernetes enables precise resource allocation and workload scheduling by using node affinity, node selectors, taints & tolerations, and resource requests and limits.

### Node Affinity

Node affinity allows you to define which nodes should execute particular workloads. For instance, if a node is labeled with `gpu=true`, you can ensure that your ML tasks run specifically on these GPU-enabled nodes.

![The image is a slide titled "Specialized Workloads" focusing on "Node Affinity," explaining how to define node preferences for pods using labels and affinity rules, with an example of assigning GPU nodes for model inference tasks.](https://kodekloud.com/kk-media/image/upload/v1752883215/notes-assets/images/PyTorch-Deploying-to-Kubernetes/specialized-workloads-node-affinity.jpg)

Below is an example deployment manifest that uses node affinity to target nodes labeled with `gpu="true"`:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: gpu-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: gpu-app
  template:
    metadata:
      labels:
        app: gpu-app
    spec:
      containers:
        - name: gpu-container
          image: my-ml-model:latest
      affinity:
        nodeAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            nodeSelectorTerms:
              - matchExpressions:
                  - key: gpu
                    operator: In
                    values:
                      - "true"
```

### Node Selector

Alternatively, you can use a node selector to ensure pods are scheduled on nodes with a specific label. Consider the following example, where pods are assigned to nodes labeled `cpu=high-performance`:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cpu-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: cpu-app
  template:
    metadata:
      labels:
        app: cpu-app
    spec:
      nodeSelector:
        cpu: "high-performance"
      containers:
        - name: cpu-container
          image: my-cpu-intensive-app:latest
```

### Taints and Tolerations

Taints prevent pods from being scheduled on certain nodes unless they expressly tolerate them. This is useful for dedicating nodes exclusively to ML workloads.

![The image is a slide titled "Specialized Workloads" discussing "Taints and Tolerations" in Kubernetes, explaining how to prevent general-purpose pods from running on specialized nodes, with an example of allowing only ML-specific pods on GPU-enabled nodes.](https://kodekloud.com/kk-media/image/upload/v1752883216/notes-assets/images/PyTorch-Deploying-to-Kubernetes/specialized-workloads-taints-tolerations.jpg)

First, taint the node using the following command:

```
# Taint a node
kubectl taint nodes node-name gpu-only=true:NoSchedule
```

Then, update the deployment manifest to include the necessary toleration:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: gpu-tolerant-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: gpu-tolerant-app
  template:
    metadata:
      labels:
        app: gpu-tolerant-app
    spec:
      tolerations:
        - key: "gpu-only"
          operator: "Equal"
          value: "true"
          effect: "NoSchedule"
      containers:
        - name: gpu-container
          image: my-ml-model:latest
```

### Resource Requests and Limits

Defining resource requests and limits ensures that your ML models receive the necessary CPU, GPU, or memory while preventing competition between workloads.

![The image is a slide titled "Specialized Workloads" focusing on "Resource Requests and Limits," advising the allocation of CPU, GPU, and memory to avoid resource contention and ensure proper job execution.](https://kodekloud.com/kk-media/image/upload/v1752883218/notes-assets/images/PyTorch-Deploying-to-Kubernetes/specialized-workloads-resource-requests-limits.jpg)

For example, if your model requires one GPU and 4GB of memory, specifying these in your YAML manifest will help ensure efficient resource allocation.

## Deploying an ML Model to Kubernetes

Deploying an ML model with Kubernetes involves a series of well-defined steps:

1.  **Containerization:** Package your trained model into a container using a model serving framework. Test the container locally to ensure it functions as expected.
2.  **Preparing Kubernetes Resources:** Define your deployment, services, config maps, and secrets using YAML manifests. These configurations instruct Kubernetes on how to run and manage your model.
3.  **Deployment:** Apply the YAML files using `kubectl` or integrate them into a GitOps pipeline. Verify the deployment using commands like `kubectl get pods` and `kubectl logs`.
4.  **Testing and Scaling:** Use a REST client (such as Postman) to test the model endpoint. Configure an autoscaler (e.g., Horizontal Pod Autoscaler) to adjust pod counts dynamically based on traffic.

![The image shows a "Deployment Workflow" diagram with steps including "Containerize the Model," "Prepare Kubernetes Resources," "Deploy to Kubernetes," and "Test and Scale." The highlighted step, "Prepare Kubernetes Resources," involves creating YAML files and specifying resource requests and limits.](https://kodekloud.com/kk-media/image/upload/v1752883219/notes-assets/images/PyTorch-Deploying-to-Kubernetes/deployment-workflow-kubernetes-diagram.jpg)

![The image shows a "Deployment Workflow" for deploying to Kubernetes, highlighting steps like applying YAML files and verifying pod status. It includes a sidebar with steps: "Containerize the Model," "Prepare Kubernetes Resources," "Deploy to Kubernetes," and "Test and Scale."](https://kodekloud.com/kk-media/image/upload/v1752883220/notes-assets/images/PyTorch-Deploying-to-Kubernetes/deployment-workflow-kubernetes-diagram-2.jpg)

![The image shows a "Deployment Workflow" diagram with steps for containerizing a model, preparing Kubernetes resources, deploying to Kubernetes, and testing and scaling. The highlighted step, "Test and Scale," includes testing the model endpoint with a REST client and autoscaling using Horizontal Pod Autoscaler (HPA).](https://kodekloud.com/kk-media/image/upload/v1752883222/notes-assets/images/PyTorch-Deploying-to-Kubernetes/deployment-workflow-containerization-diagram.jpg)

## Horizontal Pod Autoscaler (HPA)

The Horizontal Pod Autoscaler (HPA) is critical for managing workload fluctuations. It automatically adjusts the number of pods based on real-time metrics such as CPU usage, memory consumption, or custom metrics, ensuring your deployment remains responsive and resource-efficient.

![The image illustrates a "Horizontal Pod Autoscaler" with a focus on low traffic during off-peak hours, showing a deployment of six pods.](https://kodekloud.com/kk-media/image/upload/v1752883223/notes-assets/images/PyTorch-Deploying-to-Kubernetes/horizontal-pod-autoscaler-low-traffic.jpg)

HPA dynamically scales pods based on utilization metrics. The following diagram outlines key components such as CPU utilization, memory usage, and custom application metrics that influence scaling decisions:

![The image is a diagram titled "Horizontal Pod Autoscaler" showing three components: CPU Utilization, Memory Usage, and Custom Application Metrics.](https://kodekloud.com/kk-media/image/upload/v1752883225/notes-assets/images/PyTorch-Deploying-to-Kubernetes/horizontal-pod-autoscaler-diagram.jpg)

![The image is a slide titled "Horizontal Pod Autoscaler," highlighting two benefits: handling high traffic to prevent downtime and optimizing resource usage during low traffic to reduce costs.](https://kodekloud.com/kk-media/image/upload/v1752883225/notes-assets/images/PyTorch-Deploying-to-Kubernetes/horizontal-pod-autoscaler-benefits.jpg)

Currently, GPU metrics are not natively supported, but you can integrate custom metric systems to monitor GPU usage.

Below is an example configuration that demonstrates HPA in action. The deployment manifest sets resource requests and limits, while the HPA definition scales the deployment based on CPU utilization:

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
          image: my-ml-model:latest
          resources:
            requests:
              cpu: "500m"
            limits:
              cpu: "1000m"
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: ml-model-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: ml-model-deployment
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
```

When the average CPU utilization exceeds 70%, HPA automatically scales out up to 10 replicas. Conversely, if the utilization drops, the deployment scales back down to a minimum of 2 replicas, ensuring that your application adapts to traffic changes seamlessly.

## Best Practices for Deploying ML Models on Kubernetes

Adopting best practices is crucial for robust and efficient ML model deployments:

1.  **Container Optimization:**  
    Use lightweight, optimized containers such as slim Docker images that include only the necessary files and dependencies. This practice speeds up deployments and reduces resource overhead.

    ![The image is a slide titled "Best Practices" with a focus on using lightweight containers, suggesting the optimization of containers like slim Docker images.](https://kodekloud.com/kk-media/image/upload/v1752883226/notes-assets/images/PyTorch-Deploying-to-Kubernetes/best-practices-lightweight-containers.jpg)

2.  **Resource Monitoring:**  
    Leverage monitoring tools like Prometheus and Grafana to track CPU, memory, and GPU usage. Always define resource limits to avoid contention, especially in shared cluster environments.

    ![The image provides best practices for monitoring resource usage, suggesting the use of tools like Prometheus and Grafana, and setting resource limits for CPU, memory, and GPU.](https://kodekloud.com/kk-media/image/upload/v1752883228/notes-assets/images/PyTorch-Deploying-to-Kubernetes/monitoring-resource-usage-best-practices.jpg)

3.  **Rolling Updates:**  
    Employ rolling updates for model deployments to minimize downtime. This approach allows gradual updates and ensures a smooth user experience.

    ![The image is a slide titled "Best Practices" with a focus on "Leverage Rolling Updates," highlighting the benefits of gradual deployment and minimal downtime.](https://kodekloud.com/kk-media/image/upload/v1752883229/notes-assets/images/PyTorch-Deploying-to-Kubernetes/best-practices-rolling-updates.jpg)

4.  **Security Measures:**  
    Implement strict security best practices by using Role-Based Access Control (RBAC) and network policies to restrict permissions for pods. This minimizes unauthorized access risks.

    ![The image is a slide titled "Best Practices" with a focus on "Enforce Security," suggesting the use of RBAC (Role-Based Access Control) to restrict permissions.](https://kodekloud.com/kk-media/image/upload/v1752883230/notes-assets/images/PyTorch-Deploying-to-Kubernetes/best-practices-enforce-security-rbac.jpg)

## ML Serving Frameworks for Kubernetes

While Kubernetes' native resources (Deployments, Services, etc.) suffice for many model deployments, specialized ML serving frameworks can streamline and enhance the process:

- **KServe (formerly KFServing):**  
  Specifically designed for serving ML models on Kubernetes, KServe supports advanced features such as explainability and model monitoring, making it perfect for production-grade deployments.
- **Seldon Core:**  
  Offers interoperability for models built on different frameworks. Seldon Core facilitates complex workflows like ensemble models and A/B testing while integrating natively with Kubernetes.
- **Triton Inference Server:**  
  Developed by NVIDIA, Triton provides GPU-accelerated inference and supports dynamic batching across multiple ML frameworks (TensorFlow, PyTorch, ONNX).

![The image lists three ML serving frameworks: KServe, Seldon Core, and Triton Inference Server, each with a brief description of their features.](https://kodekloud.com/kk-media/image/upload/v1752883230/notes-assets/images/PyTorch-Deploying-to-Kubernetes/ml-serving-frameworks-kserve-seldon-triton.jpg)

These frameworks also offer crucial capabilities such as model versioning, autoscaling, and integrated logging and monitoring, enabling efficient troubleshooting and management of multiple model versions.

![The image lists three key features of frameworks: model versioning and rollout strategies, autoscaling based on traffic, and logging and monitoring tools for ML workloads.](https://kodekloud.com/kk-media/image/upload/v1752883232/notes-assets/images/PyTorch-Deploying-to-Kubernetes/frameworks-key-features-ml-tools.jpg)

## Conclusion

Kubernetes provides a powerful and flexible platform for deploying machine learning models. Its ability to handle scalability, efficiently allocate resources, and adapt to diverse deployment scenarios makes it an excellent choice for modern ML workloads. Key techniques such as utilizing node affinity, applying taints and tolerations, and setting appropriate resource requests and limits simplify the deployment process.

By following best practices—optimizing containers, monitoring resources, employing rolling updates, and enforcing security measures—you can ensure robust and efficient deployments. Additionally, leveraging ML serving frameworks like KServe, Seldon Core, and Triton Inference Server further enhances your deployment capabilities with advanced features like autoscaling, model versioning, and integrated monitoring.

Let's now load up a Kubernetes cluster and deploy our model application using these best practices and real-world strategies.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/pytorch/module/a958efa1-845c-4cdf-9261-7688050bd96c/lesson/254f1dc1-743a-495f-b990-c6aa13a334d6)**
>
> Watch video content
