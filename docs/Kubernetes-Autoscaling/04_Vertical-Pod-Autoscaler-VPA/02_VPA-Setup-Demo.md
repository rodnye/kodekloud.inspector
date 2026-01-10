# VPA Setup Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Autoscaling/Vertical-Pod-Autoscaler-VPA/VPA-Setup-Demo)

---

## Table of Contents

- VPA Setup Demo
  - Table of Contents
  - What Are Custom Resource Definitions (CRDs)?
  - VPA-Specific CRDs
  - Summary of VPA CRDs
  - References
  - Watch Video
  - Practice Lab

---

## Content

Kubernetes Autoscaling

Vertical Pod Autoscaler VPA

# VPA Setup Demo

Welcome back! In this lesson, we’ll prepare our environment for a hands-on demo of the Vertical Pod Autoscaler (VPA). Before applying any manifests, you need a solid understanding of Custom Resource Definitions (CRDs), which power the VPA’s custom behaviors in Kubernetes.

## Table of Contents

1.  [What Are Custom Resource Definitions (CRDs)?](#what-are-custom-resource-definitions-crds)
2.  [VPA-Specific CRDs](#vpa-specific-crds)
3.  [Summary of VPA CRDs](#summary-of-vpa-crds)
4.  [References](#references)

---

## What Are Custom Resource Definitions (CRDs)?

Custom Resource Definitions extend Kubernetes’ API by letting you introduce new resource types. Built-in objects include Pods, Services, and Deployments, but CRDs allow you to teach the API “new words”—for example, **VerticalPodAutoscaler**. When you register a CRD:

- The Kubernetes API server recognizes your custom resource kind.
- You can create, read, update, and delete custom objects just like native ones.
- Controllers and operators watch these new objects and implement the logic you define.

> [!important]
> **Note**
>
> Ensure your cluster has the `apiextensions.k8s.io` API enabled before applying any CRDs. For more details, see [Kubernetes CRD Documentation](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/).

---

## VPA-Specific CRDs

The Vertical Pod Autoscaler relies on two CRDs to function:

- **VerticalPodAutoscaler**  
  Continuously observes pod CPU and memory usage, then recalculates optimal resource requests.
- **VerticalPodAutoscalerCheckpoint**  
  Persists historical usage metrics so that the VPA controller can make data-driven recommendations, even after restarts or failures.

> \[!note\] The diagram below shows how these two CRDs interact within the VPA architecture.

![The image is a diagram showing two types of Vertical Pod Autoscaler (VPA) CRDs: "Vertical Pod Autoscaler CRD" with functions to monitor container CPU and memory, and "Vertical Pod Autoscaler Checkpoint CRD."](https://kodekloud.com/kk-media/image/upload/v1752880252/notes-assets/images/Kubernetes-Autoscaling-VPA-Setup-Demo/vertical-pod-autoscaler-diagram.jpg)

---

## Summary of VPA CRDs

| CRD Name                        | Role                           | How It Helps                         |
| ------------------------------- | ------------------------------ | ------------------------------------ |
| VerticalPodAutoscaler           | Real-time resource tuning      | Adjusts CPU/memory requests          |
| VerticalPodAutoscalerCheckpoint | Historical usage checkpointing | Stores past metrics to guide scaling |

With these two CRDs in place, your cluster gains dynamic resource optimization—pods automatically resize CPU and memory requests based on actual demand and historical data. Next, we’ll dive into installing and configuring the VPA controller and sample manifests.

---

## References

- [Kubernetes Custom Resources](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/)
- [Vertical Pod Autoscaler on GitHub](https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler)
- [Kubernetes API Extensions](https://kubernetes.io/docs/reference/using-api/api-overview/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-autoscaling/module/0a6c48bd-c431-4b14-b33b-250d02997055/lesson/d1e3c4de-6570-49ea-8de1-2f9e18de0506)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kubernetes-autoscaling/module/0a6c48bd-c431-4b14-b33b-250d02997055/lesson/3732ce77-60fd-4722-a8ff-5135df53b02a)**
>
> Practice lab
