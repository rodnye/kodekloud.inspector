# Kubernetes Services - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Associate-KCNA/Container-Orchestration-Servvice-Mesh/Kubernetes-Services)

---

## Table of Contents

- Kubernetes Services
  - Types of Kubernetes Services
  - Quick Comparison
  - Watch Video

---

## Content

Kubernetes and Cloud Native Associate - KCNA

Container Orchestration Service Mesh

# Kubernetes Services

In this article, we will provide an overview of Kubernetes services and explain why they are critical for maintaining consistent application connectivity within a cluster.

Pods are the smallest deployable units in Kubernetes. When running an application, you encapsulate it within a pod. However, pods are ephemeral—they can be created or terminated at any time to align with the desired cluster state managed by Deployments. For applications to function correctly, pods must reliably find and communicate with each other within the cluster.

Each pod receives its own IP address, which enables direct communication. However, because these IP addresses may change frequently, using them directly for component communication (for example, a front-end service communicating with a back-end service) becomes challenging. This is where Kubernetes services are essential.

Kubernetes services provide a stable abstraction over a dynamic set of pods. By leveraging labels, a service can select the appropriate pods from a larger pool, ensuring consistent connectivity even when pods are terminated and recreated. The service is assigned its own IP address, enabling applications to communicate through the service rather than connecting to individual pod IPs.

> [!important]
> **Key Insight**
>
> Kubernetes services simplify networking between dynamically changing pod environments by abstracting communication through stable service endpoints.

## Types of Kubernetes Services

There are three primary types of Kubernetes services:

1.  **ClusterIP**  
    This is the default service type. It creates an internal-only service to facilitate communication between applications within the cluster.  
    ![The image illustrates three types of Kubernetes services: NodePort, ClusterIP, and LoadBalancer, each represented with a simple diagram.](https://kodekloud.com/kk-media/image/upload/v1752880617/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Kubernetes-Services/frame_100.jpg)
2.  **NodePort**  
    This service type exposes the application on a specified port on every node in the cluster. It makes the application accessible from outside the cluster, although the access is limited to the node IP addresses and the allocated port.
3.  **LoadBalancer**  
    Supported by specific cloud providers, this service type is similar to NodePort but integrates with an external load balancer. This external component routes traffic to the application’s exposed ports on the nodes, providing a more robust solution for external access.

## Quick Comparison

| Service Type | Description                                                  | Use Case                                                            |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------------------------- |
| ClusterIP    | Internal-only communication within the cluster               | Inter-pod communication                                             |
| NodePort     | Exposes service on each node's IP at a static port           | External access using a fixed node port                             |
| LoadBalancer | Routes external traffic via a cloud provider's load balancer | Production environments requiring high availability and scalability |

This overview covers the core concepts of Kubernetes services and clarifies the differences between the available types. By using Kubernetes services, you can ensure stable and reliable inter-pod connectivity while abstracting the dynamic nature of individual pod IP addresses.

Thank you for reading this article. We look forward to exploring more Kubernetes and cloud-native topics in our next lesson.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-associate-kcna/module/aeecda11-7f2e-48c5-9c54-5409f2d9d8d8/lesson/d007e0dc-bd68-4ea6-9f5d-20278c5cbc71)**
>
> Watch video content
