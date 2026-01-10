# Solution Monitor Cluster Components - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Logging-Monitoring/Solution-Monitor-Cluster-Components)

---

## Table of Contents

- Solution Monitor Cluster Components
  - Inspecting Running Pods
  - Deploying the Metrics Server
  - Verifying Metrics and Analyzing Resource Consumption
  - Analyzing the Data
  - Conclusion
  - Watch Video
    - Step 1: Clone the Repository
    - Step 2: Examine the Configuration Files
    - Step 3: Deploy the Metrics Server
    - Checking Node Metrics
    - Checking Pod Metrics
    - Identifying the Node with the Highest CPU Usage
    - Identifying the Node with the Highest Memory Usage
    - Determining the Pod Using the Most Memory
    - Identifying the Pod with the Least CPU Usage

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Logging Monitoring

# Solution Monitor Cluster Components

In this guide, we will explore how to monitor Kubernetes cluster components using the Metrics Server. We’ll walk through inspecting running pods, deploying the Metrics Server, and examining resource consumption on both nodes and pods.

---

## Inspecting Running Pods

Before setting up monitoring, verify that your workloads are running correctly by listing the pods:

```
kubectl get pods
```

You should see output similar to this:

```
root@controlplane:~# kubectl get pods
NAME        READY   STATUS             RESTARTS   AGE
elephant    1/1     Running            0          20s
lion        1/1     Running            0          20s
rabbit      0/1     ContainerCreating   0          20s
```

After a short wait, the `rabbit` pod should transition to a running state:

```
root@controlplane:~# kubectl get pods
NAME        READY   STATUS             RESTARTS   AGE
elephant    1/1     Running            0          27s
lion        1/1     Running            0          27s
rabbit      1/1     Running            0          27s
```

---

## Deploying the Metrics Server

To monitor resource consumption, you need to deploy the Kubernetes Metrics Server. In this lab, we use a preconfigured repository with the required settings.

> [!important]
> **Note**
>
> For production environments, avoid using these lab-specific configurations. Always refer to the official [Metrics Server documentation](https://github.com/kubernetes-sigs/metrics-server) for accurate and secure deployment.

### Step 1: Clone the Repository

Clone the repository that includes the metrics server configuration:

```
git clone https://github.com/kodekloudhub/kubernetes-metrics-server.git
```

The output should be similar to:

```
Cloning into 'kubernetes-metrics-server'...
remote: Enumerating objects: 24, done.
remote: Counting objects: 100% (12/12), done.
remote: Compressing objects: 100% (12/12), done.
remote: Total 24 (delta 4), reused 0 (delta 0), pack-reused 12
Unpacking objects: 100% (24/24), done.
```

### Step 2: Examine the Configuration Files

Navigate to the repository directory and list its contents to review the configuration files:

```
cd kubernetes-metrics-server/
ls
```

Expected output:

```
README.md                       auth-metrics-reader.yaml
aggregated-metrics-reader.yaml  metrics-apiserver-deployment.yaml
auth-delegator.yaml             metrics-server-service.yaml
resource-reader.yaml            metrics-server-deployment.yaml
```

### Step 3: Deploy the Metrics Server

Deploy all required objects with the following command:

```
kubectl create -f .
```

This command should produce output confirming that resources have been successfully created, for example:

```
clusterrole.rbac.authorization.k8s.io:aggregated-metrics-reader created
clusterrole.rbac.authorization.k8s.io:system:auth-delegator created
clusterrole.rbac.authorization.k8s.io:system:auth-reader created
apiresourcedelegation.k8s.io:metrics.k8s.io created
serviceaccount/metrics-server created
deployment.apps/metrics-server created
clusterrole.rbac.authorization.k8s.io/system:metrics-server created
```

> [!important]
> **Note**
>
> It may take a few minutes for the Metrics Server to begin gathering and reporting resource data.

---

## Verifying Metrics and Analyzing Resource Consumption

Once the Metrics Server is up and running, you can verify the resource usage on your nodes and pods.

### Checking Node Metrics

To check the CPU and memory usage for each node, run:

```
kubectl top node
```

Sample output:

```
NAME            CPU(cores)   MEMORY(bytes)
controlplane    470m         1252Mi
node01          57m          349Mi
```

### Checking Pod Metrics

To list the resource usage for individual pods, execute:

```
kubectl top pod
```

Expected output:

```
NAME       CPU(cores)   MEMORY(bytes)
elephant   20m          32Mi
lion       1m           18Mi
rabbit     131m         252Mi
```

---

## Analyzing the Data

After gathering metrics, you can analyze them to understand resource consumption patterns across your cluster.

### Identifying the Node with the Highest CPU Usage

Review the node metrics—for example:

```
root@controlplane:~/kubernetes-metrics-server# kubectl top node
NAME           CPU(cores)   CPU%   MEMORY(bytes)   MEMORY%
controlplane   478m         1%     1252Mi          0%
node01         57m          0%     349Mi           0%
```

The control plane node consumes significantly more CPU compared to node01 due to its hosting of various control components.

### Identifying the Node with the Highest Memory Usage

Using the node metrics:

```
root@controlplane:~/kubernetes-metrics-server# kubectl top node
NAME         CPU(cores)   CPU%   MEMORY(bytes)   MEMORY%
controlplane 470m         1%     1252Mi          0%
node01       57m          0%     349Mi           0%
```

It's evident that the control plane node is also consuming more memory.

### Determining the Pod Using the Most Memory

Analyze the pod metrics to pinpoint the pod consuming the most memory:

```
root@controlplane:~/kubernetes-metrics-server# kubectl top pod
NAME        CPU(cores)   MEMORY(bytes)
elephant    1m           32Mi
lion        1m           18Mi
rabbit      131m         252Mi
```

The `rabbit` pod is using the most memory (252Mi), indicating that its workload—possibly RabbitMQ—may require higher resource allocation.

### Identifying the Pod with the Least CPU Usage

From the pod metrics, notice that certain pods consistently consume minimal CPU (around 1m), suggesting low processing requirements for those workloads.

---

## Conclusion

In this guide, you learned how to:

1.  Inspect running pods to ensure your workloads are active.
2.  Deploy the Kubernetes Metrics Server using a preconfigured repository.
3.  Verify and analyze resource usage on both nodes and pods within your cluster.

This foundational demonstration helps you monitor cluster components effectively, empowering you to identify areas with high resource consumption and optimize performance in your Kubernetes environment.

Happy monitoring!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/67ee36bc-fea0-4136-a5a9-40754b32c5f7/lesson/fed0f5f1-ef91-46e0-9999-c3c1a6d11bce)**
>
> Watch video content
