# Monitoring - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Observability/Monitoring)

---

## Table of Contents

- Monitoring
  - Why Monitor Kubernetes?
  - Historical Perspective
  - How Metrics are Collected
  - Deploying the Metrics Server
  - Viewing Cluster Metrics
  - Conclusion
  - Watch Video
  - Practice Lab
    - For Minikube Users
    - For Other Environments
    - Node Metrics
    - Pod Metrics

---

## Content

Certified Kubernetes Application Developer - CKAD

Observability

# Monitoring

Welcome to this lesson on monitoring Kubernetes clusters. In this article, you will learn how to track resource consumption and performance in your Kubernetes environment.

## Why Monitor Kubernetes?

Monitoring in Kubernetes is essential for maintaining your cluster’s health and performance. Key metrics to watch include:

- **Node-Level Metrics:** Total nodes, their health status, and overall performance.
- **Performance Metrics:** CPU, memory, network, and disk usage.
- **Pod-Level Metrics:** Number of pods and individual pod performance (e.g., CPU and memory consumption).

Implementing a monitoring solution enables you to collect, aggregate, and analyze these metrics efficiently. Although Kubernetes does not include a full-featured built-in monitoring system, several open-source options—such as Metrics Server, Prometheus, and Elastic Stack—as well as proprietary solutions like Datadog and Dynatrace are available. In this lesson, we'll focus on the Metrics Server. For more advanced monitoring techniques, see the [Kubernetes Administration: Package Management with Glasskube](https://learn.kodekloud.com/user/courses/k8s-administration-package-management-with-glasskube) course.

> [!important]
> **Key Information**
>
> The Metrics Server is a lightweight, in-memory monitoring solution, ideal for real-time metrics collection. However, it does not persist historical data. For long-term data analysis, consider advanced monitoring systems.

## Historical Perspective

Originally, the Hipster project provided monitoring and analysis features for Kubernetes. Even though you might encounter references to Hipster in online resources, it has been deprecated in favor of its streamlined counterpart, the Metrics Server. Remember, you can deploy only one Metrics Server per cluster.

## How Metrics are Collected

Each node in your Kubernetes cluster runs a kubelet, which manages pods and communicates with the Kubernetes API master server. A subcomponent of the kubelet, known as cAdvisor (container advisor), collects performance data from pods and makes it available to the Metrics Server via the kubelet API.

## Deploying the Metrics Server

### For Minikube Users

If you’re running a local cluster with Minikube, you can enable the Metrics Server with this simple command:

```
minikube addons enable metrics-server
```

### For Other Environments

To deploy the Metrics Server in other environments, first clone the repository, then apply the deployment files as shown below:

```
git clone https://github.com/kubernetes-incubator/metrics-server.git
```

```
kubectl create -f deploy/1.8+/
```

After running these commands, you should see output similar to the following:

```
clusterrolebinding "metrics-server:system:auth-delegator" created
rolebinding "metrics-server-auth-reader" created
apiservice "v1beta1.metrics.k8s.io" created
serviceaccount "metrics-server" created
deployment "metrics-server" created
service "metrics-server" created
clusterrole "system:metrics-server" created
clusterrolebinding "system:metrics-server" created
```

These steps deploy the necessary pods, services, and roles for the Metrics Server to gather real-time performance metrics from your cluster nodes. Allow a few moments for the Metrics Server to start collecting data.

## Viewing Cluster Metrics

After deployment, you can view your cluster's performance metrics using the following commands:

### Node Metrics

To see CPU and memory usage for each node, run:

```
kubectl top node
```

Example output:

```
NAME          CPU(cores)   CPU%   MEMORY(bytes)   MEMORY%
kubemaster    166          8%     1337Mi          70%
kubnode1      36           1%     1046Mi          55%
kubnode2      39           1%     1048Mi          55%
```

### Pod Metrics

To display pod-level metrics, execute:

```
kubectl top pod
```

Example output:

```
NAME    CPU(cores)   CPU%   MEMORY(bytes)   MEMORY%
nginx   166          8%     1337Mi          70%
redis   36           1%     1046Mi          55%
```

## Conclusion

This article provided an overview of monitoring Kubernetes clusters using the Metrics Server. By deploying this lightweight solution, you can efficiently monitor node and pod performance, ensuring your cluster runs smoothly. For further practice, explore the provided coding exercises to reinforce your monitoring skills in Kubernetes.

Happy monitoring!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/d79d0450-406f-43ef-91ae-2f0c9dc1204c/lesson/c6419c6e-96a0-449c-a282-f64f08336703)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/d79d0450-406f-43ef-91ae-2f0c9dc1204c/lesson/a4a85ef6-fb7b-4a25-a812-699c63108bd6)**
>
> Practice lab
