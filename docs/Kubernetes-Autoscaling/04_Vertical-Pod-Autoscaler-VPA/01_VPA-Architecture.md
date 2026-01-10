# VPA Architecture - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Autoscaling/Vertical-Pod-Autoscaler-VPA/VPA-Architecture)

---

## Table of Contents

- VPA Architecture
  - Why Vertical Scaling with VPA?
  - How VPA Keeps Pods Right-Sized
  - Core Components of VPA
  - VPA Modes
  - VPA Workflow Walkthrough
  - Links and References
  - Watch Video

---

## Content

Kubernetes Autoscaling

Vertical Pod Autoscaler VPA

# VPA Architecture

In this lesson we dive into the Kubernetes Vertical Pod Autoscaler (VPA) to understand its architecture, key components, and operational modes. While the Horizontal Pod Autoscaler (HPA) scales applications by adjusting the number of replicas, the VPA optimizes individual pods by tuning their CPU and memory requests in response to workload demands.

> [!important]
> **Prerequisites**
>
> Before you begin, ensure your cluster has the Metrics Server installed and the VPA admission controller enabled.

## Why Vertical Scaling with VPA?

Vertical scaling increases the resources allocated to a single pod—adding more CPU or memory—rather than scaling out with additional instances. You may ask: if HPA already adjusts replica counts, why introduce VPA?

Consider a busy city café where staff scheduling affects wait times and resource utilization. Each morning you guess how many baristas, chefs, and waiters you need. Sometimes you overstaff, other times you understaff.

![The image depicts a lively coffee shop scene with people sitting at a table, a barista preparing drinks, and a chef cooking in the kitchen. The text at the top asks, "Why Do We Need VPA?"](https://kodekloud.com/kk-media/image/upload/v1752880244/notes-assets/images/Kubernetes-Autoscaling-VPA-Architecture/coffee-shop-scene-vpa-question.jpg)

A smart manager monitors real-time customer flow and reallocates staff as needed. Similarly, the VPA continuously tracks pod metrics and adjusts resource requests, ensuring pods are right-sized without manual intervention.

## How VPA Keeps Pods Right-Sized

The VPA observes live and historical CPU and memory usage, then computes optimal requests to prevent performance bottlenecks and resource waste.

![The image explains the need for VPA (Vertical Pod Autoscaler), highlighting its role in monitoring and adjusting CPU and memory based on real-time workload, with icons representing a document, a pod, and a slowdown indicator.](https://kodekloud.com/kk-media/image/upload/v1752880244/notes-assets/images/Kubernetes-Autoscaling-VPA-Architecture/vpa-monitoring-cpu-memory-explained.jpg)

If a pod consistently uses more CPU or memory than requested, the VPA suggests higher values. Conversely, if a pod is oversized, it recommends lowering its requests to reduce cost.

![The image explains the need for VPA (Vertical Pod Autoscaler), highlighting its role in dynamically adjusting CPU and memory to meet demand and keeping applications efficient, preventing crashes, and reducing waste.](https://kodekloud.com/kk-media/image/upload/v1752880245/notes-assets/images/Kubernetes-Autoscaling-VPA-Architecture/vpa-vertical-pod-autoscaler-explained.jpg)

## Core Components of VPA

The VPA comprises three collaborating components that form a continuous feedback loop:

![The image is a diagram illustrating the components of a Vertical Pod Autoscaler (VPA), showing the interactions between a Pod, VPA, Recommender, Updater, and Admission Controller. Each component's role is briefly described, such as monitoring resource usage and adjusting CPU and memory.](https://kodekloud.com/kk-media/image/upload/v1752880246/notes-assets/images/Kubernetes-Autoscaling-VPA-Architecture/vertical-pod-autoscaler-diagram.jpg)

- **Recommender**  
  Gathers historical metrics, evaluates OOM events, and computes recommended CPU and memory requests.
- **Updater**  
  Reads recommendations and, when necessary, evicts pods to apply updated resource requests by recreating them.
- **Admission Controller**  
  Intercepts new pod creation, mutates the pod spec, and injects the updated resource requests before scheduling.

These components work together: the recommender proposes adjustments, the updater enforces them, and the admission controller ensures new pods honor the latest recommendations.

## VPA Modes

Choose a VPA mode to control how and when resource recommendations are applied:

![The image describes three VPA (Vertical Pod Autoscaler) modes: "Initial," "Auto," and "Off," each with a brief explanation of their functions in resource management for pods.](https://kodekloud.com/kk-media/image/upload/v1752880247/notes-assets/images/Kubernetes-Autoscaling-VPA-Architecture/vpa-modes-initial-auto-off.jpg)

| Mode    | Description                                                                                                                                |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Initial | Applies recommendations only at pod startup. After creation, resource requests remain unchanged.                                           |
| Auto    | Continuously enforces recommendations throughout the pod’s lifecycle, evicting and recreating pods when resource updates are needed.       |
| Off     | Records and stores recommendations without enforcing them. Ideal for dry-run scenarios and performance analysis before actual enforcement. |

> [!important]
> **Warning**
>
> Using Auto mode may cause frequent pod evictions and restarts, potentially impacting application availability. Always test changes in a staging environment first.

## VPA Workflow Walkthrough

The VPA operates in a loop to ensure pods maintain optimal resource allocations:

![The image is a flowchart illustrating a Vertical Pod Autoscaler (VPA) walkthrough, showing interactions between components like VPA Config, Metrics Server, Pod, and K8s Controller. It includes elements such as Recommender, Updater, and Admission Controller.](https://kodekloud.com/kk-media/image/upload/v1752880248/notes-assets/images/Kubernetes-Autoscaling-VPA-Architecture/vpa-walkthrough-flowchart-components.jpg)

1.  A user applies or updates the VPA configuration in the cluster.
2.  The **Recommender** fetches metrics from the Metrics Server and computes new CPU/memory request recommendations.
3.  The **Updater** evaluates these suggestions and evicts pods if updates are required, triggering pod re-creation.
4.  During pod creation, the **Admission Controller** injects the recommended resource requests into the pod spec.
5.  Kubernetes schedules the new pods with adjusted resources, maintaining performance and efficiency.

This cycle repeats continuously, adapting to workload fluctuations and historical usage patterns.

## Links and References

- [Vertical Pod Autoscaler Documentation](https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler)
- [Kubernetes Autoscaling Concepts](https://kubernetes.io/docs/concepts/cluster-administration/autoscaling/)
- [Metrics Server](https://github.com/kubernetes-sigs/metrics-server)
- [Horizontal Pod Autoscaler (HPA)](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-autoscaling/module/0a6c48bd-c431-4b14-b33b-250d02997055/lesson/eb2c4234-8e6b-441d-8aca-fbd37687b40c)**
>
> Watch video content
