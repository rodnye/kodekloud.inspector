# What Is HPA - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Autoscaling/Horizontal-Pod-Autoscaler-HPA/What-Is-HPA)

---

## Table of Contents

- What Is HPA
  - Why HPA Matters: A Factory Analogy
  - How the Horizontal Pod Autoscaler Works
  - HPA Metrics Overview
  - Summary
  - References
  - Watch Video
    - Key Triggers for Scaling

---

## Content

Kubernetes Autoscaling

Horizontal Pod Autoscaler HPA

# What Is HPA

Welcome to our deep dive into one of Kubernetes’ most powerful autoscaling features: the Horizontal Pod Autoscaler (HPA). HPA automatically adjusts your application’s pod count in response to real-time demand, ensuring optimal performance and resource utilization.

## Why HPA Matters: A Factory Analogy

Imagine a manufacturing plant that employs a fixed number of workers every day. All runs smoothly—until demand suddenly spikes (say, right after the holidays). The static team can’t keep up, orders back up, and production grinds to a halt. In the world of applications, a similar scenario unfolds when user traffic surges beyond expected levels.

![The image illustrates the need for HPA (Horizontal Pod Autoscaler) with icons representing a factory, a team, and an increase in demand, highlighting insufficiency.](https://kodekloud.com/kk-media/image/upload/v1752880189/notes-assets/images/Kubernetes-Autoscaling-What-Is-HPA/hpa-need-factory-team-demand.jpg)

Just as management tracks order volume, stock levels, and special orders to decide when to call in extra staff, Kubernetes monitors metrics like CPU and memory to know when to spin up more pods.

![The image is a slide titled "Why Do We Need HPA?" showing that a factory tracks metrics such as order volume, stock levels, and custom order requirements.](https://kodekloud.com/kk-media/image/upload/v1752880189/notes-assets/images/Kubernetes-Autoscaling-What-Is-HPA/why-do-we-need-hpa-factory-metrics.jpg)

### Key Triggers for Scaling

When stock falls below a threshold or special orders demand extra handling, the factory hires more workers. Similarly, if your application’s CPU or memory usage crosses your defined thresholds, HPA will scale out your pods to maintain performance.

![The image discusses the need for HPA (Horizontal Pod Autoscaler) with reasons such as stock falling below threshold due to high demand and custom orders requiring specialized handling, accompanied by simple icons and a team illustration.](https://kodekloud.com/kk-media/image/upload/v1752880190/notes-assets/images/Kubernetes-Autoscaling-What-Is-HPA/hpa-need-reasons-icons-team.jpg)

## How the Horizontal Pod Autoscaler Works

Think of HPA as an automated supervisor that:

- Continuously gathers metrics (CPU, memory, custom)
- Compares them against target thresholds
- Adjusts the replica count of your Deployment, StatefulSet, or ReplicaSet

![The image is a diagram explaining the need for HPA (Horizontal Pod Autoscaler), showing how it monitors key metrics and adjusts the workforce in a system with pods.](https://kodekloud.com/kk-media/image/upload/v1752880191/notes-assets/images/Kubernetes-Autoscaling-What-Is-HPA/hpa-diagram-pod-autoscaler.jpg)

By default, HPA uses CPU utilization, but you can extend it to include memory, custom, or even external metrics.

![The image is a diagram explaining the functions of a Horizontal Pod Autoscaler (HPA), which observes metrics, adds pods, balances thresholds, and tracks multiple metrics.](https://kodekloud.com/kk-media/image/upload/v1752880192/notes-assets/images/Kubernetes-Autoscaling-What-Is-HPA/horizontal-pod-autoscaler-diagram.jpg)

## HPA Metrics Overview

| Metric Type        | Use Case                                       | Default Support | Customizable |
| ------------------ | ---------------------------------------------- | --------------- | ------------ |
| CPU Utilization    | Scale on CPU load                              | ✔️ Yes          | —            |
| Memory Utilization | Scale on memory consumption                    | —               | ✔️ Yes       |
| Custom Metrics     | Application-specific KPIs (e.g., queue length) | —               | ✔️ Yes       |
| External Metrics   | Third-party services (e.g., cloud pub/sub)     | —               | ✔️ Yes       |

> [!important]
> **Note**
>
> HPA relies on the Kubernetes [Metrics Server](https://github.com/kubernetes-sigs/metrics-server) or a Custom Metrics API to retrieve resource usage. Ensure it’s installed and configured in your cluster.> [!important]
> **Warning**
>
> Relying only on CPU metrics can leave memory-heavy workloads unprotected. Always evaluate your application’s bottlenecks and configure HPA to use all relevant metrics.

## Summary

The Horizontal Pod Autoscaler acts as a dynamic capacity manager for your Kubernetes workloads. By continuously monitoring key metrics and adjusting pod replica counts, HPA helps maintain performance during traffic spikes and reduces costs during slow periods. In the next article, we’ll cover HPA configuration and best practices for tuning thresholds to fit your applications’ unique requirements.

## References

- [Kubernetes HPA Documentation](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)
- [Metrics Server](https://github.com/kubernetes-sigs/metrics-server)
- [Custom Metrics API](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#support-for-custom-metrics)
- [Kubernetes Autoscaling Concepts](https://kubernetes.io/docs/concepts/cluster-administration/autoscaling/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-autoscaling/module/245fe895-fa01-4adf-b796-ce7f28666043/lesson/272ed778-7f30-4abc-9c4d-5c7ebac166e3)**
>
> Watch video content
