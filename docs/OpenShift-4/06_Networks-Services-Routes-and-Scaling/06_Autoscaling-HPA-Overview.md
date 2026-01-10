# Autoscaling HPA Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenShift-4/Networks-Services-Routes-and-Scaling/Autoscaling-HPA-Overview)

---

## Table of Contents

- Autoscaling HPA Overview
  - Vertical Scaling
  - Horizontal Autoscaling
  - Watch Video
    - How HPA Works

---

## Content

OpenShift 4

Networks Services Routes and Scaling

# Autoscaling HPA Overview

In this article, we explore two key scaling concepts in cloud-native environments: vertical scaling and horizontal autoscaling using the Horizontal Pod Autoscaler (HPA). Understanding these strategies is essential for optimizing resource usage and ensuring your applications remain responsive under fluctuating loads.

## Vertical Scaling

Vertical scaling enhances the resources—such as CPU and memory—of a single pod. This approach is useful when a pod faces performance bottlenecks due to high traffic or increased processing demands. By increasing the pod's resource allocation, you can sometimes manage short-term spikes in workload. However, vertical scaling is generally less common and is typically reserved for specific scenarios where scaling out horizontally is not feasible.

![The image illustrates the concepts of vertical and horizontal scaling with icons representing a microchip and a memory card, labeled as "RARE."](https://kodekloud.com/kk-media/image/upload/v1752882665/notes-assets/images/OpenShift-4-Autoscaling-HPA-Overview/vertical-horizontal-scaling-icons-rare.jpg)

> [!important]
> **Note**
>
> Vertical scaling is most effective for applications with limited scalability options or when stateful workloads prevent easy horizontal partitioning.

## Horizontal Autoscaling

Horizontal autoscaling involves the dynamic creation and removal of pod replicas based on current load conditions. For example, your application may start with a single pod, scale out to three pods when user traffic increases, and scale back down when the demand subsides. This method ensures optimal performance and efficient resource utilization by adapting in real time to varying traffic levels.

![The image illustrates the concepts of vertical and horizontal scaling, with three hexagonal shapes inside a rectangular box.](https://kodekloud.com/kk-media/image/upload/v1752882666/notes-assets/images/OpenShift-4-Autoscaling-HPA-Overview/vertical-horizontal-scaling-diagram.jpg)

### How HPA Works

The Horizontal Pod Autoscaler continuously monitors CPU and/or memory resource usage across the pods in an OpenShift environment. It compares the current metrics to predefined target values and automatically adjusts the number of replicas to meet the desired performance. This automation helps manage application load efficiently, ensuring that the system can handle peak traffic without manual intervention.

> [!important]
> **Key Benefit**
>
> One of the primary advantages of HPA is its ability to automatically scale the number of pods based on real-time usage metrics. This responsiveness helps maintain application performance and optimizes resource allocation during both high-demand and low-demand periods.

By leveraging horizontal autoscaling, organizations can ensure that their applications remain highly available and responsive, adapting swiftly to changing workloads while maintaining cost efficiency. For more insights into Kubernetes scaling concepts, consider exploring the following resources:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [OpenShift Documentation](https://docs.openshift.com/)

These strategies are crucial for building scalable, resilient applications in today's dynamic cloud environments.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/openshift-4/module/ec611802-285c-4fb9-b13e-26eb84f4ec7d/lesson/65cec26e-628a-4565-8b4d-e6d0c6879564)**
>
> Watch video content
