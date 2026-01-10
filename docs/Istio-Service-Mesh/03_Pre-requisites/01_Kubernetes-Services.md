# Kubernetes Services - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Istio-Service-Mesh/Pre-requisites/Kubernetes-Services)

---

## Table of Contents

- Kubernetes Services
  - Types of Kubernetes Services
  - Summary
  - Additional Resources
  - Watch Video

---

## Content

Istio Service Mesh

Pre requisites

# Kubernetes Services

In this article, we'll recap Kubernetes services and explain how they facilitate reliable communication between pods within a cluster, ensuring seamless connectivity even as pod IPs change.

Pods are the smallest deployable units in Kubernetes. When deploying an application on Kubernetes, you create a pod to host your application. However, because pods are ephemeral and can be created or terminated dynamically to maintain the desired state (as specified in deployments), their IP addresses may change over time.

For internal cluster communication, it’s crucial that pods can reliably locate and interact with each other. Although each pod is assigned its own IP, these addresses are temporary. The challenge then becomes how to enable a front-end, for instance, to consistently reach a back-end service even as individual pod IPs change. This is where Kubernetes Services become essential.

A backend service can be configured to target a set of backend pods. Because the service itself receives a stable IP address, there is no longer any need to monitor the dynamic IPs of the individual pods.

![The image illustrates a Kubernetes cluster with backend and frontend deployments, showing pods and their IP addresses, connected via a backend service.](https://kodekloud.com/kk-media/image/upload/v1752879372/notes-assets/images/Istio-Service-Mesh-Kubernetes-Services/kubernetes-cluster-deployments-diagram.jpg)

Kubernetes Services are abstractions that define both the selection criteria for pods (usually via labels) and the policy to establish connections between them. This ensures that even if pods are dynamically added or removed, the service consistently routes traffic to the appropriate pods.

> [!important]
> **Key Point**
>
> Ensure that your pods are properly labeled; this is crucial for the Kubernetes Service to correctly identify and communicate with the intended pods.

## Types of Kubernetes Services

Kubernetes supports three primary types of services, each designed to meet different connectivity needs:

1.  **ClusterIP:**  
    The default and most common service type, ClusterIP, exposes the service on an internal IP address within the cluster. This type is ideal for enabling communication between applications within the same cluster.

    ![The image illustrates three types of Kubernetes services: NodePort, ClusterIP, and LoadBalancer, each represented with a simple diagram.](https://kodekloud.com/kk-media/image/upload/v1752879373/notes-assets/images/Istio-Service-Mesh-Kubernetes-Services/kubernetes-services-nodeport-clusterip-loadbalancer.jpg)

2.  **NodePort:**  
    NodePort exposes the service on a specific port across all nodes in the cluster. This makes it possible to access the service externally, directly via the node IP addresses.
3.  **LoadBalancer:**  
    This service type provisions an external load balancer (supported by select cloud providers) which routes traffic to the service. It extends the functionality of NodePort by providing enhanced traffic distribution and integration with cloud load-balancing solutions.

## Summary

Kubernetes Services provide a stable and efficient way to manage dynamic pod communication within a cluster. By abstracting pod endpoints into a single, stable service, they simplify inter-component communication even as individual pod IPs are subject to change.

For a deeper dive into Kubernetes and hands-on practice, explore the [Kubernetes for the Absolute Beginners - Hands-on Tutorial](https://learn.kodekloud.com/user/courses/kubernetes-for-the-absolute-beginners-hands-on-tutorial) course.

## Additional Resources

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/istio-service-mesh/module/1095f3e0-a80d-4c31-941b-6423a5b6d74c/lesson/0a99ae1c-241c-4b22-94ea-c514814eec0a)**
>
> Watch video content
