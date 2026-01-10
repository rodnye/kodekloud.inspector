# KEDA CPU Scaling - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Autoscaling/Kubernetes-Event-Driven-Autoscaling-KEDA/KEDA-CPU-Scaling)

---

## Table of Contents

- KEDA CPU Scaling
  - How KEDA Leverages CPU Metrics
  - Prerequisites
  - Defining CPU Requests in Your Deployment
  - Configuring the CPU Trigger in KEDA
  - Creating the ScaledObject
  - Summary of Key Resources
  - References
  - Watch Video
  - Practice Lab

---

## Content

Kubernetes Autoscaling

Kubernetes Event Driven Autoscaling KEDA

# KEDA CPU Scaling

Welcome to this guide on implementing CPU-based autoscaling in Kubernetes using [KEDA](https://keda.sh/) and the built-in [Horizontal Pod Autoscaler (HPA)](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/). You’ll learn how KEDA monitors CPU metrics, sets thresholds, and dynamically adjusts your pod replicas to match workload demands.

## How KEDA Leverages CPU Metrics

KEDA integrates with the Kubernetes HPA to fetch CPU metrics and make scaling decisions. The following diagram illustrates the flow:

![The image illustrates the KEDA scaling mechanism, showing how it interacts with CPU resources and the Horizontal Pod Autoscaler (HPA) to manage pod scaling.](https://kodekloud.com/kk-media/image/upload/v1752880197/notes-assets/images/Kubernetes-Autoscaling-KEDA-CPU-Scaling/keda-scaling-cpu-hpa-diagram.jpg)

1.  Metrics Server exposes CPU usage for each pod.
2.  HPA retrieves metrics and compares against defined thresholds.
3.  KEDA’s ScaledObject configures HPA targets and min/max replica counts.
4.  Pods scale out/in based on real-time CPU usage.

## Prerequisites

Before you begin, ensure your cluster meets the following requirements:

- Metrics Server is deployed and operational.
- Pods specify CPU `requests` (and optionally `limits`) to enable accurate metrics.
- Kubernetes v1.27+ or compatible version for HPA and Custom Metrics API.

![The image outlines KEDA CPU scaling requirements, highlighting the need for a Metrics Server and defining Pod CPU requests or limits.](https://kodekloud.com/kk-media/image/upload/v1752880198/notes-assets/images/Kubernetes-Autoscaling-KEDA-CPU-Scaling/keda-cpu-scaling-requirements-diagram.jpg)

## Defining CPU Requests in Your Deployment

Specify resource requests and limits in your Deployment manifest so the Metrics Server can report CPU usage correctly:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cpu-app
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      app: cpu-app
  template:
    metadata:
      labels:
        app: cpu-app
    spec:
      containers:
        - name: app
          image: images.my-company.example/app:v4
          resources:
            requests:
              cpu: "500m"
              memory: "128Mi"
            limits:
              cpu: "1000m"
              memory: "256Mi"
```

> [!important]
> **Note**
>
> Defining CPU `requests` ensures the HPA can calculate utilization percentages. If no limits are set, pods can burst beyond the request but HPA will still use the request as the baseline.

## Configuring the CPU Trigger in KEDA

KEDA supports two CPU trigger modes:

| Mode         | Description                                          |
| ------------ | ---------------------------------------------------- |
| Utilization  | Percentage of CPU request (e.g., `50` for 50% usage) |
| AverageValue | Absolute CPU value in millicores (e.g., `250m`)      |

Example trigger configuration:

```
triggers:
  - type: cpu
    metadata:
      type: Utilization      # 'Utilization' or 'AverageValue'
      value: "60"            # percentage or absolute value
      containerName: ""      # optional: target specific container
```

> [!important]
> **Warning**
>
> If your pods include sidecar containers (e.g., logging, service mesh), set `containerName` to your main application container to avoid scaling based on sidecar CPU usage.

## Creating the ScaledObject

A `ScaledObject` ties your Deployment to KEDA’s scaling logic. Below is a sample manifest that scales `cpu-app` between 1 and 5 replicas when CPU utilization exceeds 50%:

```
apiVersion: keda.sh/v1alpha1
kind: ScaledObject
metadata:
  name: cpu-app-scaledobject
  namespace: default
spec:
  scaleTargetRef:
    name: cpu-app         # must match the Deployment name
  minReplicaCount: 1
  maxReplicaCount: 5
  triggers:
    - type: cpu
      metadata:
        type: Utilization
        value: "50"        # CPU utilization threshold
```

## Summary of Key Resources

| Resource       | Purpose                                         |
| -------------- | ----------------------------------------------- |
| Metrics Server | Exposes CPU/memory metrics to the Metrics API   |
| Deployment     | Defines pod spec with CPU `requests` & `limits` |
| ScaledObject   | Configures KEDA triggers and HPA parameters     |
| HPA            | Executes the scaling logic based on CPU metrics |

## References

- [KEDA Documentation](https://keda.sh/docs/)
- [Horizontal Pod Autoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)
- [Metrics Server Installation](https://kubernetes.io/docs/tasks/debug-application-cluster/resource-metrics-pipeline/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-autoscaling/module/c218f836-7d7e-425b-a8b7-0148914eb040/lesson/24de6c5a-a759-451a-a3ec-b9abaee06425)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kubernetes-autoscaling/module/c218f836-7d7e-425b-a8b7-0148914eb040/lesson/a592bf82-74d3-435b-b3af-4807e73ab7c5)**
>
> Practice lab
