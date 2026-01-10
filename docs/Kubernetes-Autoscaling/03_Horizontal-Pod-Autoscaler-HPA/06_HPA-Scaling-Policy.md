# HPA Scaling Policy - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Autoscaling/Horizontal-Pod-Autoscaler-HPA/HPA-Scaling-Policy)

---

## Table of Contents

- HPA Scaling Policy
  - Defining Scaling Policies
  - Stabilization Window
  - Further Reading
  - Watch Video
    - Customizing the Scale-Down Window

---

## Content

Kubernetes Autoscaling

Horizontal Pod Autoscaler HPA

# HPA Scaling Policy

In this guide, you'll learn how to configure Kubernetes Horizontal Pod Autoscaler (HPA) scaling policies. HPA scaling policies define rules that direct the control plane on adjusting pod replicas based on metrics like CPU, memory, or custom/external metrics. Think of these rules as the “brain” that scales your application in sync with demand—adding pods when needed and removing them when load subsides.

## Defining Scaling Policies

Under the HPA manifest’s `behavior` section, the `policies` field specifies how scaling decisions occur. Each policy entry includes:

- **type**: `Pods` for a fixed number of pods or `Percent` for a percentage of current replicas.
- **value**: A numeric value corresponding to the type.
- **periodSeconds**: Minimum interval between consecutive scaling actions under this rule.

Example configuration:

```
apiVersion: autoscaling/v2beta2
kind: HorizontalPodAutoscaler
metadata:
  name: my-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-app
  minReplicas: 2
  maxReplicas: 100
  behavior:
    scaleUp:
      policies:
        - type: Pods
          value: 4
          periodSeconds: 60
        - type: Percent
          value: 10
          periodSeconds: 60
```

| Type    | Value | periodSeconds | Effect                                           |
| ------- | ----- | ------------- | ------------------------------------------------ |
| Pods    | 4     | 60            | Adds up to 4 pods every 60 seconds               |
| Percent | 10    | 60            | Increases replicas by up to 10% every 60 seconds |

HPA fetches metrics every 15 seconds by default but only enforces a scaling action when the associated `periodSeconds` has elapsed. Combining fixed and percentage-based policies provides precise control over autoscaling behavior.

> [!important]
> **Custom Metric Intervals**
>
> You can adjust the default 15-second metric scraping interval via your [metrics-server](https://github.com/kubernetes-sigs/metrics-server) or an external metrics adapter configuration.

## Stabilization Window

To prevent rapid fluctuations (thrashing) in pod counts, HPA uses a **stabilization window**. This buffer retains recent scaling recommendations and ensures you scale up quickly while scaling down more conservatively.

| Window Type | Default Interval    | Purpose                                                                 |
| ----------- | ------------------- | ----------------------------------------------------------------------- |
| scale-up    | 0 seconds           | Immediate scaling up based on current metrics                           |
| scale-down  | 300 seconds (5 min) | Delays scale-down by using the highest recommendation in the last 5 min |

### Customizing the Scale-Down Window

Adjust your HPA manifest to modify the scale-down stabilization window:

```
spec:
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
```

With a 300-second window:

1.  At **minute 1**, metrics recommend scaling up to **40 pods**.
2.  At **minute 2**, metrics suggest scaling down to **30 pods**, but the window holds at **40 pods**.
3.  From **minutes 3–5**, even if load decreases further, HPA maintains **40 pods** until the buffer expires.

![The image shows a stabilization window chart with time intervals and corresponding pod counts, indicating a five-minute stabilization window.](https://kodekloud.com/kk-media/image/upload/v1752880186/notes-assets/images/Kubernetes-Autoscaling-HPA-Scaling-Policy/stabilization-window-chart-pod-counts.jpg)

This approach ensures your application rapidly scales up under load while avoiding premature downscaling that could impact performance.

## Further Reading

- [Kubernetes Autoscaling Guide](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)
- [HPA Behavior Configuration Reference](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.27/#horizontalpodautoscalerbehaviorspec-v2beta2-autoscaling)
- [Metrics Server](https://github.com/kubernetes-sigs/metrics-server)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-autoscaling/module/245fe895-fa01-4adf-b796-ce7f28666043/lesson/d9eaf966-8398-420c-94d2-3e1b79bed80e)**
>
> Watch video content
