# Course Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Autoscaling/Manual-Scaling/Course-Overview)

---

## Table of Contents

- Course Overview
  - Why Autoscaling Matters
  - Kubernetes Autoscaling Architecture
  - Course Content
  - Learning Outcomes
  - Watch Video

---

## Content

Kubernetes Autoscaling

Manual Scaling

# Course Overview

Welcome to the Kubernetes Autoscaling course! In this lesson, you’ll learn how to automate resource scaling to keep your applications resilient, responsive, and cost-efficient under varying traffic patterns.

## Why Autoscaling Matters

When your online store faces a sudden surge—like a flash sale—manual scaling can’t react fast enough. Autoscaling in Kubernetes works like a smart thermostat for your cluster, adding capacity when demand spikes and removing it as traffic eases, ensuring optimal performance and cost control.

![The image illustrates the need for scaling in online stores, highlighting issues like website slowdowns and customer access problems, with a note on autoscaling to manage traffic.](https://kodekloud.com/kk-media/image/upload/v1752880225/notes-assets/images/Kubernetes-Autoscaling-Course-Overview/scaling-online-stores-autoscaling.jpg)

## Kubernetes Autoscaling Architecture

Kubernetes autoscaling relies on close collaboration between:

- **Control Plane**: Makes scaling decisions based on metrics and cluster state.
- **Worker Nodes**: Run your application pods and scale out/in as directed.
- **Pods**: The smallest deployable units, which increase or decrease in count or resource allocation.

When load increases, the control plane triggers pod replicas and may provision additional nodes. In case of node failures, workloads shift to healthy nodes, keeping applications available.

> [!important]
> **Requirements**
>
> Make sure you have the Kubernetes Metrics Server installed to power autoscaling with CPU, memory, and custom metrics.
> Refer to the [Metrics Server setup guide](https://github.com/kubernetes-sigs/metrics-server).

![The image illustrates Kubernetes autoscaling, showing a cluster with multiple worker nodes and pods handling incoming traffic.](https://kodekloud.com/kk-media/image/upload/v1752880226/notes-assets/images/Kubernetes-Autoscaling-Course-Overview/kubernetes-autoscaling-cluster-diagram.jpg)

## Course Content

Below is an overview of the topics we’ll cover in this lesson:

| Topic                                      | Description                                                                                                                                                      |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fundamentals of Scaling                    | Key concepts, use cases, and scaling patterns.                                                                                                                   |
| Horizontal Pod Autoscaler (HPA)            | Auto-adjust pod replica count based on CPU, memory, or custom metrics. [Learn more](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/). |
| Vertical Pod Autoscaler (VPA)              | Recommends or enforces CPU and memory requests/limits for pods.                                                                                                  |
| Cluster Proportional Autoscaler (CPA)      | Scales resources in proportion to cluster size.                                                                                                                  |
| Kubernetes Event-Driven Autoscaling (KEDA) | Reacts to external event sources (e.g., Kafka, SQS). [Explore KEDA](https://keda.sh/).                                                                           |
| Cluster Autoscaler                         | Adjusts node count to fit pod scheduling requirements.                                                                                                           |

> [!important]
> **Cluster Autoscaler Caution**
>
> Scaling nodes can impact cloud costs. Always review your budget and set safe limits when configuring the Cluster Autoscaler.

![The image outlines a course content flowchart on scaling, including topics like Horizontal Pod Autoscaler, Vertical Pod Autoscaler, Cluster Proportional Autoscaler, and Kubernetes Event-Driven Autoscaling (KEDA).](https://kodekloud.com/kk-media/image/upload/v1752880228/notes-assets/images/Kubernetes-Autoscaling-Course-Overview/scaling-course-content-flowchart.jpg)

## Learning Outcomes

By the end of this lesson, you will be able to:

- Explain core autoscaling concepts in Kubernetes.
- Configure and deploy HPA, VPA, CPA, KEDA, and Cluster Autoscaler.
- Implement best practices to ensure reliable, cost-effective scaling.

![The image outlines three key takeaways: building a solid foundation of scaling, gaining hands-on experience in implementing scaling, and adopting and implementing best practices.](https://kodekloud.com/kk-media/image/upload/v1752880229/notes-assets/images/Kubernetes-Autoscaling-Course-Overview/scaling-foundation-experience-best-practices.jpg)

Let’s dive in and start mastering Kubernetes autoscaling!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-autoscaling/module/66710f67-c094-4a4c-b718-4a031d1ddebe/lesson/7605b2e1-8fbb-4b8c-849e-8f6a8c02f064)**
>
> Watch video content
