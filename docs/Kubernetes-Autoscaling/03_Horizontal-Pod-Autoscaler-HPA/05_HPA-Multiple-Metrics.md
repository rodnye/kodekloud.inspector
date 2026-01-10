# HPA Multiple Metrics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Autoscaling/Horizontal-Pod-Autoscaler-HPA/HPA-Multiple-Metrics)

---

## Table of Contents

- HPA Multiple Metrics
  - Use Case: E-commerce Platform
  - Microservices and Independent Scaling
  - Exposing Custom Metrics with Prometheus
  - Configuring HPA with Multiple Metrics
  - When to Avoid Multiple Metrics
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

Kubernetes Autoscaling

Horizontal Pod Autoscaler HPA

# HPA Multiple Metrics

Welcome to this guide on using Kubernetes’ [Horizontal Pod Autoscaler (HPA)](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/) with both native and custom metrics. Combining CPU utilization with application-specific indicators—like request rate or transaction count—ensures your workloads scale precisely during demand spikes.

## Use Case: E-commerce Platform

Consider a high-traffic e-commerce site where shoppers browse items, add them to carts, and complete purchases. Traffic surges during promotions make CPU and memory alone insufficient signals. You need application metrics (e.g., requests per second, cart size) to scale effectively.

![The image illustrates the need for multiple metrics in an e-commerce application, highlighting three key activities: browsing products, adding to cart, and processing transactions.](https://kodekloud.com/kk-media/image/upload/v1752880180/notes-assets/images/Kubernetes-Autoscaling-HPA-Multiple-Metrics/ecommerce-metrics-browsing-cart-transactions.jpg)

## Microservices and Independent Scaling

Your platform runs three microservices:

- **Catalog Service**: Handles product browsing
- **Cart Service**: Manages cart operations
- **Checkout Service**: Processes transactions

Each is a separate Deployment. To know when to scale the Catalog Service, monitor both CPU utilization and incoming request rate.

![The image illustrates the need for multiple metrics to efficiently scale applications during peak traffic, highlighting that scaling requires considering various metrics simultaneously.](https://kodekloud.com/kk-media/image/upload/v1752880181/notes-assets/images/Kubernetes-Autoscaling-HPA-Multiple-Metrics/scaling-applications-metrics-illustration.jpg)

## Exposing Custom Metrics with Prometheus

1.  Instrument your application to expose HTTP request metrics (e.g., active_requests).
2.  Deploy [Prometheus](https://prometheus.io/) in-cluster to scrape those metrics.

> [!important]
> **Note**
>
> Ensure your service exports Prometheus-formatted metrics (e.g., via client libraries like `prometheus-client`).

Next, install a metrics adapter—such as the [Prometheus Metrics Adapter](https://github.com/kubernetes-sigs/prometheus-adapter)—so Kubernetes can query custom metrics from Prometheus.

![The image is a slide titled "Multiple Metrics Implementation" with a focus on exposing custom metrics. It suggests instrumenting the backend to track active HTTP requests and using a monitoring system like Prometheus to collect these metrics.](https://kodekloud.com/kk-media/image/upload/v1752880182/notes-assets/images/Kubernetes-Autoscaling-HPA-Multiple-Metrics/multiple-metrics-implementation-prometheus.jpg)

![The image illustrates the implementation of multiple metrics by deploying a metrics adapter to expose custom metrics to a Kubernetes cluster.](https://kodekloud.com/kk-media/image/upload/v1752880183/notes-assets/images/Kubernetes-Autoscaling-HPA-Multiple-Metrics/kubernetes-metrics-adapter-implementation.jpg)

## Configuring HPA with Multiple Metrics

Below is a sample `HorizontalPodAutoscaler` manifest that scales the `backend-service` Deployment by:

- **CPU utilization** (70% average)
- **Active HTTP requests per pod** (100 average)

```
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: backend-service-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: backend-service
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Pods
      pods:
        metric:
          name: active_http_requests
        target:
          type: AverageValue
          averageValue: "100"
```

| Metric Type | Source                     | Aim                                  |
| ----------- | -------------------------- | ------------------------------------ |
| Resource    | Kubernetes Metrics Server  | Scale by CPU utilization (70% avg)   |
| Pods        | Prometheus Metrics Adapter | Scale by HTTP requests (100 avg/pod) |

The HPA controller evaluates both metrics and adjusts replicas to satisfy the most demanding threshold.

## When to Avoid Multiple Metrics

While powerful, multiple-metric scaling can introduce complexity:

- Metrics that are poorly correlated with real load
- Unreliable or hard-to-maintain adapters
- Disparate sampling rates or units

> [!important]
> **Warning**
>
> Mixing metrics with different collection intervals (e.g., 1s vs. 10m) can cause erratic scaling. Validate correlation before production.

![The image provides guidelines on when to avoid using multiple metrics for scaling, focusing on non-correlated metrics, complex adapters metrics, and different sampling rates.](https://kodekloud.com/kk-media/image/upload/v1752880184/notes-assets/images/Kubernetes-Autoscaling-HPA-Multiple-Metrics/scaling-guidelines-non-correlated-metrics.jpg)

---

Balancing simplicity and accuracy is key. With the right metrics and adapters, HPA can keep your microservices responsive and cost-efficient.

## Links and References

- [Kubernetes HPA Documentation](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)
- [Prometheus](https://prometheus.io/)
- [Prometheus Adapter for Kubernetes](https://github.com/kubernetes-sigs/prometheus-adapter)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-autoscaling/module/245fe895-fa01-4adf-b796-ce7f28666043/lesson/37304e76-3ec9-447e-ba1c-ace3bf95d336)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kubernetes-autoscaling/module/245fe895-fa01-4adf-b796-ce7f28666043/lesson/7582ead6-af77-4e82-bf0d-7c12b99adf4a)**
>
> Practice lab
