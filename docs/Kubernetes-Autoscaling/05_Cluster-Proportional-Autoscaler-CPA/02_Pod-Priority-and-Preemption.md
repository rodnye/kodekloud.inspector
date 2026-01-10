# Pod Priority and Preemption - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Autoscaling/Cluster-Proportional-Autoscaler-CPA/Pod-Priority-and-Preemption)

---

## Table of Contents

- Pod Priority and Preemption
  - Pod Priority
  - Preemption
  - Defining Priority Classes
  - Assigning Priority to Pods and Deployments
  - Default System Priority Classes
  - Controlling Pod Preemption
  - References
  - Watch Video
  - Practice Lab

---

## Content

Kubernetes Autoscaling

Cluster Proportional Autoscaler CPA

# Pod Priority and Preemption

Kubernetes scheduling includes built-in support for Pod Priority and Preemption, which ensures that critical workloads receive resources first. By defining priority classes and leveraging preemption, you can maintain high availability and efficient resource utilization across your cluster.

## Pod Priority

Consider a concert hall with limited seats and attendees such as VIPs, general guests, and staff. When seats run out, you want VIPs and staff to be guaranteed a spot. In Kubernetes, CPU and memory are finite “seats,” and Pods are the “attendees.” Assigning priorities ensures your most important services always run.

![The image is an illustration titled "Pod Priority – Introduction," showing a screen with various colored figures representing VIPs, regular guests, and staff members. The figures are arranged in a pyramid-like structure below the screen.](https://kodekloud.com/kk-media/image/upload/v1752880161/notes-assets/images/Kubernetes-Autoscaling-Pod-Priority-and-Preemption/pod-priority-introduction-illustration.jpg)

Seats = cluster resources (CPU, memory)  
People = Pods (applications)

![The image is a diagram comparing a concert hall to a Kubernetes cluster, illustrating the concept of pod priority by equating seats to CPU resources and people to pods.](https://kodekloud.com/kk-media/image/upload/v1752880163/notes-assets/images/Kubernetes-Autoscaling-Pod-Priority-and-Preemption/concert-hall-kubernetes-pod-priority.jpg)

Kubernetes groups Pods into three priority tiers:

- **System-critical Pods** (e.g., kube-apiserver, kube-scheduler)
- **Application-critical Pods** (e.g., payment-processing, order API)
- **Low-priority Pods** (e.g., batch jobs, CI tasks)

![The image is a diagram showing Kubernetes pod priorities, categorized into three types: K8s System-Critical Pods, Application-Critical Pods, and Low-Priority Pods, each with examples like Kube-API, payment processing systems, and batch jobs.](https://kodekloud.com/kk-media/image/upload/v1752880164/notes-assets/images/Kubernetes-Autoscaling-Pod-Priority-and-Preemption/kubernetes-pod-priorities-diagram.jpg)

## Preemption

When a VIP arrives and the hall is full, a regular guest may be asked to give up their seat. Kubernetes preemption evicts lower-priority Pods to make room for higher-priority ones.

![The image illustrates Kubernetes preemption, showing a cluster with high-priority and low-priority pods, where some low-priority pods are preempted to accommodate high-priority ones.](https://kodekloud.com/kk-media/image/upload/v1752880165/notes-assets/images/Kubernetes-Autoscaling-Pod-Priority-and-Preemption/kubernetes-preemption-pods-illustration.jpg)

Kubernetes supports two preemption policies:

| Policy               | Behavior                                                         |
| -------------------- | ---------------------------------------------------------------- |
| PreemptLowerPriority | Evict lower-priority Pods to schedule this Pod (default)         |
| Never                | Prevent this Pod from being preempted by any higher-priority Pod |

```
preemptionPolicy: PreemptLowerPriority
preemptionPolicy: Never
```

![The image describes two types of preemption policies: "PreemptLowerPriority," which allows higher-priority pods to preempt lower-priority ones, and "Never," where pods cannot be evicted for high-priority scheduling.](https://kodekloud.com/kk-media/image/upload/v1752880166/notes-assets/images/Kubernetes-Autoscaling-Pod-Priority-and-Preemption/preemption-policies-diagram.jpg)

Pod Priority combined with Preemption ensures that mission-critical workloads run even under resource contention.

## Defining Priority Classes

Priority classes assign a numeric weight to Pods. Higher values mean higher scheduling priority.

Create a high-priority class:

```
apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: high-priority
value: 1000
globalDefault: false
description: "Critical workloads get this priority."
```

Create a low-priority class:

```
apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: low-priority
value: 500
globalDefault: false
description: "Batch jobs and non-critical tasks."
```

> [!important]
> **Note**
>
> If you do not specify a `PriorityClass`, Pods default to priority `0`.

## Assigning Priority to Pods and Deployments

Add `priorityClassName` in your Pod or Deployment spec to apply a priority class:

Pod example:

```
apiVersion: v1
kind: Pod
metadata:
  name: high-priority-pod
spec:
  priorityClassName: high-priority
  containers:
  - name: nginx
    image: nginx
```

Deployment example:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: high-priority-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: high-priority-app
  template:
    metadata:
      labels:
        app: high-priority-app
    spec:
      priorityClassName: high-priority
      containers:
      - name: nginx
        image: nginx
```

## Default System Priority Classes

Kubernetes ships with built-in priority classes for system Pods:

![The image is a table titled "Default Priority Class," listing different priority classes for system pods with their names, values, descriptions, and purposes.](https://kodekloud.com/kk-media/image/upload/v1752880167/notes-assets/images/Kubernetes-Autoscaling-Pod-Priority-and-Preemption/default-priority-class-table.jpg)

- **system-node-critical**: Pods essential for node health.
- **system-cluster-critical**: Pods essential for cluster services.
- No `priorityClassName` → priority `0`.

## Controlling Pod Preemption

To make a Pod immune from eviction, set `preemptionPolicy: Never`:

```
apiVersion: v1
kind: Pod
metadata:
  name: non-preemptible-pod
spec:
  priorityClassName: low-priority
  preemptionPolicy: Never
  containers:
  - name: nginx
    image: nginx
```

> [!important]
> **Warning**
>
> Using `preemptionPolicy: Never` can lead to resource starvation for higher-priority workloads. Apply with caution.

Preemption is enabled by default. Only Pods with `preemptionPolicy: Never` are protected from eviction.

---

## References

- [Kubernetes Pod Priority and Preemption](https://kubernetes.io/docs/concepts/scheduling-eviction/pod-priority-preemption/)
- [Kubernetes Scheduling](https://kubernetes.io/docs/concepts/scheduling-eviction/)
- [Kubernetes API Reference: PriorityClass](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.26/#priorityclass-v1-scheduling-k8s-io)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-autoscaling/module/ad35ef0b-c572-4f9e-82e4-0865c98fd502/lesson/36e80af5-e217-461e-aa1a-6e2eb896fd9a)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kubernetes-autoscaling/module/ad35ef0b-c572-4f9e-82e4-0865c98fd502/lesson/ff158bc1-0521-4651-bb2f-023a5bd43085)**
>
> Practice lab
