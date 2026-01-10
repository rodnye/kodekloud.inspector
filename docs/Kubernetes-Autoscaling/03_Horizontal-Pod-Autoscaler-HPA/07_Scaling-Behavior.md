# Scaling Behavior - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Autoscaling/Horizontal-Pod-Autoscaler-HPA/Scaling-Behavior)

---

## Table of Contents

- Scaling Behavior
  - HPA Scaling Overview
  - Scale-Down and Stabilization Window
  - Example HPA Configuration
  - Best Practices
  - Further Reading
  - Watch Video
  - Practice Lab

---

## Content

Kubernetes Autoscaling

Horizontal Pod Autoscaler HPA

# Scaling Behavior

Welcome to this guide on Kubernetes Horizontal Pod Autoscaler (HPA) scaling behavior. We’ll explore how HPA automatically adjusts pod replica counts to maintain performance, optimize resource usage, and control costs.

## HPA Scaling Overview

The HPA controller periodically observes metrics and scales the number of pods in a Deployment, StatefulSet, or ReplicaSet. It supports:

| Metric Type | Source                                              | Use Case                                            |
| ----------- | --------------------------------------------------- | --------------------------------------------------- |
| Resource    | Native Kubernetes metrics (CPU, memory)             | Basic autoscaling based on pod resource consumption |
| Custom      | In-cluster metrics exposed via Metrics API          | Application-level metrics (e.g., QPS, latency)      |
| External    | Metrics from outside the cluster (Prometheus, etc.) | Third-party or business metrics                     |

> [!important]
> **Note**
>
> By default, HPA syncs every 15 seconds. You can adjust this with the `--horizontal-pod-autoscaler-sync-period` flag on the controller manager.

When a metric crosses your defined threshold (for example, CPU utilization > 70%), HPA calculates a new replica count and applies any configured scale-up policies:

![The image outlines the scale-up scaling behavior in three steps: Trigger, Action, and Policy Configuration, explaining how metrics like CPU utilization lead to increased pod replicas and policy settings for scaling rates.](https://kodekloud.com/kk-media/image/upload/v1752880186/notes-assets/images/Kubernetes-Autoscaling-Scaling-Behavior/scale-up-scaling-behavior-diagram.jpg)

1.  **Trigger**: Observed metric exceeds the target (e.g., CPU > 70%).
2.  **Action**: HPA computes the desired replicas based on current usage.
3.  **Policy Configuration**: Applies your scale-up limits (percent or count) to control growth rate.

You can tune:

- **minReplicas** and **maxReplicas**
- Percent-based vs. fixed-count scaling
- Resource, custom, or external metrics

## Scale-Down and Stabilization Window

Scale-down operates similarly but adds a stabilization window to prevent rapid oscillations during brief low-load periods:

![The image explains the "Scale-Down Scaling Behavior" in three steps: Trigger, Action, and Stabilization Window, detailing how HPA (Horizontal Pod Autoscaler) manages pod replicas based on metrics.](https://kodekloud.com/kk-media/image/upload/v1752880187/notes-assets/images/Kubernetes-Autoscaling-Scaling-Behavior/scale-down-scaling-behavior-hpa.jpg)

| Step                 | Description                                                       |
| -------------------- | ----------------------------------------------------------------- |
| Trigger              | Metric drops below the defined target                             |
| Stabilization Window | Waits for a cool-off period (default 300 s) before scaling down   |
| Action               | Applies scale-down policies (percent or count) to reduce replicas |

> [!important]
> **Warning**
>
> Setting a very short stabilization window can cause pod thrashing. Ensure it aligns with your application’s cool-off characteristics.

## Example HPA Configuration

Below is an `autoscaling/v2beta2` manifest that scales a Deployment named `my-app-deployment` between 1 and 10 replicas. It targets 50% average CPU, allows instant scale-up up to 100% more pods per minute, and delays scale-down by 5 minutes, reducing only 10% per minute.

```
apiVersion: autoscaling/v2beta2
kind: HorizontalPodAutoscaler
metadata:
  name: my-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-app-deployment
  minReplicas: 1
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 50
  behavior:
    scaleUp:
      stabilizationWindowSeconds: 0
      policies:
        - type: Percent
          value: 100
          periodSeconds: 60
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
        - type: Percent
          value: 10
          periodSeconds: 60
```

> [!important]
> **Note**
>
> Percent-based scaling policies let you grow or shrink pods relative to the current replica count. Use count-based if you need fixed increments.

## Best Practices

Implement these recommendations to ensure reliable and efficient autoscaling:

| Practice                                        | Benefit                                        |
| ----------------------------------------------- | ---------------------------------------------- |
| Align stabilization windows with app cool-off   | Prevents rapid up/down scaling oscillations    |
| Define clear, testable policies                 | Ensures predictable scaling behavior           |
| Use metrics tied to business or user experience | Optimizes for actual demand, not just resource |
| Continuously monitor and adjust                 | Keeps autoscaling tuned to evolving workloads  |

![The image outlines best practices for scaling behavior, including avoiding rapid scaling, having clear policies, and monitoring and adjusting.](https://kodekloud.com/kk-media/image/upload/v1752880188/notes-assets/images/Kubernetes-Autoscaling-Scaling-Behavior/scaling-behavior-best-practices.jpg)

## Further Reading

- [Horizontal Pod Autoscaler (HPA) Concepts](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)
- [Kubernetes Metrics Server](https://github.com/kubernetes-sigs/metrics-server)
- [Custom Metrics API](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#support-for-custom-metrics)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-autoscaling/module/245fe895-fa01-4adf-b796-ce7f28666043/lesson/65f471ae-8728-43ae-8e06-ba3394c2d56f)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kubernetes-autoscaling/module/245fe895-fa01-4adf-b796-ce7f28666043/lesson/babb082d-82ba-4e86-98e9-0365c0590551)**
>
> Practice lab
