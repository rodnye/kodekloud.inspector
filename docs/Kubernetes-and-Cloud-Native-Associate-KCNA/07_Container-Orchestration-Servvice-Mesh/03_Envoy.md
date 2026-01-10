# Envoy - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Associate-KCNA/Container-Orchestration-Servvice-Mesh/Envoy)

---

## Table of Contents

- Envoy
  - What Is a Proxy and Why Use Envoy?
  - Envoy in a Containerized Ecosystem
  - Offloading Critical Tasks from Your Application
  - Watch Video

---

## Content

Kubernetes and Cloud Native Associate - KCNA

Container Orchestration Service Mesh

# Envoy

Envoy is one of the most widely used proxies in the service mesh ecosystem. In this article, we dive into what Envoy is, why it has gained popularity among developers, and how it plays a crucial role in modern, service-oriented systems.

## What Is a Proxy and Why Use Envoy?

A proxy serves as an intermediary between a user and an application. Consider a scenario where an application not only handles core business logic but also takes care of essential functions like TLS encryption, authentication, and retrying failed requests. Implementing these features inside the application can divert focus away from its primary purpose. By delegating these responsibilities to a dedicated proxy service like Envoy, developers can concentrate on building unique application features.

When a user sends a request, the proxy intercepts it and forwards it to the appropriate destination. Envoy is an open-source proxy tailored for modern, distributed systems. Originally developed at Lyft in 2015 to tackle challenges in microservices management, Envoy matured quickly. In 2017, it joined the Cloud Native Computing Foundation (CNCF), and by 2018, it had evolved into a robust solution supported by an active community.

![The image illustrates a proxy setup, showing a user connecting through a proxy with TLS, authentication, and retry features to access an application's business logic.](https://kodekloud.com/kk-media/image/upload/v1752880614/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Envoy/frame_50.jpg)

## Envoy in a Containerized Ecosystem

Envoy operates both as a high-performance proxy and as a communication bus with advanced functionalities. Typically deployed as a sidecar container, Envoy ensures that all traffic entering or leaving a pod is routed through it, thereby standardizing and securing inter-service communication. This sidecar pattern is central to many service mesh implementations.

![The image displays logos of Lyft, Envoy, and the Cloud Native Computing Foundation.](https://kodekloud.com/kk-media/image/upload/v1752880616/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Envoy/frame_70.jpg)

## Offloading Critical Tasks from Your Application

Using Envoy allows developers to offload common tasks that are essential for modern applications, such as:

- Traffic management
- Circuit breaking
- Load balancing
- Security enforcement

By moving these functions out of the application, Envoy simplifies both development and operations, making it especially well-suited for distributed systems and microservices architectures where managing and securing inter-service communication is paramount.

![The image shows the Envoy logo and a diagram of a pod containing a main container and an Envoy sidecar.](https://kodekloud.com/kk-media/image/upload/v1752880617/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Envoy/frame_90.jpg)

> [!important]
> **Note**
>
> For a deeper understanding of how Envoy integrates within service mesh architectures, refer to the [Istio Service Mesh documentation](https://learn.kodekloud.com/user/courses/istio-service-mesh).

In the later sections of this article, we will explore Envoy's critical role within the core architecture of the Istio Service Mesh and demonstrate how it facilitates secure, reliable service-to-service communication.

---

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-associate-kcna/module/aeecda11-7f2e-48c5-9c54-5409f2d9d8d8/lesson/72c4e745-8cbd-4f70-8c27-c0ec181608a8)**
>
> Watch video content
