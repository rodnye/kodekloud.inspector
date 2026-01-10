# External Metrics Mechanisms - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Autoscaling/Horizontal-Pod-Autoscaler-HPA/External-Metrics-Mechanisms)

---

## Table of Contents

- External Metrics Mechanisms
  - Introduction
  - What Are External Metrics?
  - Why Use External Metrics?
  - Practical Scenario: Scaling Based on Queue Length
  - Architecture: Components of an External Metrics Setup
  - Key Considerations
  - Conclusion
  - References
  - Watch Video
  - Practice Lab
    - Example HPA Configuration

---

## Content

Kubernetes Autoscaling

Horizontal Pod Autoscaler HPA

# External Metrics Mechanisms

## Introduction

External metrics enable the Kubernetes Horizontal Pod Autoscaler (HPA) to scale pods based on measurements from systems outside the cluster—such as cloud services, third-party APIs, or external load balancers. In this guide, we’ll explore how external metrics work, why they matter for proactive autoscaling, and how to implement them in your environment.

## What Are External Metrics?

External metrics are custom measurements collected from sources beyond Kubernetes. By integrating these metrics with the HPA, you can trigger scaling events based on factors like queue lengths, API request rates, or cloud service metrics.

## Why Use External Metrics?

- Achieve proactive scaling before CPU or memory limits are reached.
- Incorporate data from services like [AWS SQS](https://aws.amazon.com/sqs/), external load balancers, or custom APIs.
- Align your scaling policies with real-world traffic patterns and business needs.

## Practical Scenario: Scaling Based on Queue Length

Imagine an application processing messages from a cloud queue. You want the HPA to increase replicas as the backlog grows:

1.  A **monitoring agent** polls the queue service for current message count.
2.  A **metrics adapter** converts that data into the Kubernetes metrics API.
3.  The **HPA** retrieves the external metric and adjusts pod replicas accordingly.

### Example HPA Configuration

```
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: queue-consumer-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: queue-consumer
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: External
      external:
        metric:
          name: queue_length
          selector:
            matchLabels:
              queue: messages
        target:
          type: Value
          value: "100"
```

> [!important]
> **Note**
>
> Ensure your monitoring agent and metrics adapter have the required RBAC permissions to fetch data from the external system.

## Architecture: Components of an External Metrics Setup

| Component                       | Description                                                          | Examples                                         |
| ------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------ |
| External Metric Source          | Any service outside the cluster providing metric data.               | AWS SQS, third-party API, external load balancer |
| Collection Agent / Monitoring   | Polls or scrapes the external source and forwards metrics.           | Prometheus, custom scripts                       |
| Metrics Adapter                 | Translates external metrics into Kubernetes API objects.             | Prometheus Adapter, AWS CloudWatch Adapter       |
| Horizontal Pod Autoscaler (HPA) | Reads the translated metrics via the Kubernetes API and scales pods. | Kubernetes HPA v2                                |

## Key Considerations

- The default [metrics-server](https://github.com/kubernetes-sigs/metrics-server) does **not** support external metrics.

> [!important]
> **Warning**
>
> Without a compatible metrics adapter, the HPA cannot read external metrics and scaling will not occur.

- Deploy and configure a metrics adapter that matches your data source:
  - **Prometheus Adapter** for Prometheus metrics
  - **AWS CloudWatch Adapter** for CloudWatch metrics
- Verify network connectivity and RBAC settings for your collection agent and adapter.

![The image outlines considerations for HPA External Metrics, featuring icons and labels for metrics server limitation, adapter configuration, and monitoring systems.](https://kodekloud.com/kk-media/image/upload/v1752880172/notes-assets/images/Kubernetes-Autoscaling-External-Metrics-Mechanisms/hpa-external-metrics-considerations.jpg)

## Conclusion

External metrics empower Kubernetes HPA to make scaling decisions based on data from outside the cluster. By implementing a reliable collection agent, the right metrics adapter, and proper HPA configuration, you can achieve more proactive, context-aware autoscaling that optimizes resource usage and application performance.

## References

- [Kubernetes Horizontal Pod Autoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)
- [Prometheus Adapter](https://github.com/kubernetes-sigs/prometheus-adapter)
- [AWS CloudWatch Adapter](https://github.com/awslabs/aws-cloudwatch-adapter)
- [metrics-server](https://github.com/kubernetes-sigs/metrics-server)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-autoscaling/module/245fe895-fa01-4adf-b796-ce7f28666043/lesson/f0e21343-4242-4359-a321-c77a082ad324)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kubernetes-autoscaling/module/245fe895-fa01-4adf-b796-ce7f28666043/lesson/bbb01344-6729-4736-a876-cbbc454998cc)**
>
> Practice lab
