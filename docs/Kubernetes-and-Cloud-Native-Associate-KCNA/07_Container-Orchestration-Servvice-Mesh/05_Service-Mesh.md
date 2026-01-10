# Service Mesh - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Associate-KCNA/Container-Orchestration-Servvice-Mesh/Service-Mesh)

---

## Table of Contents

- Service Mesh
  - Watch Video

---

## Content

Kubernetes and Cloud Native Associate - KCNA

Container Orchestration Service Mesh

# Service Mesh

A service mesh provides a dedicated and configurable infrastructure layer that enhances communication between microservices without requiring any changes to your business code. Instead of embedding networking requirements in each microservice, a service mesh deploys a single proxy as a sidecar container for each service. These sidecar proxies interact via a data plane and connect with a centralized control plane that manages all traffic entering and leaving your services.

> [!important]
> **Note**
>
> A key advantage of using a service mesh is that it offloads complex tasks like routing, security, observability, and service discovery from your application code, enabling developers to focus solely on business logic.

The control plane abstracts the complexities of network management by dynamically configuring how services interact. It enforces policies such as mutual TLS (mTLS) for secure communication, ensuring that every communication channel between services is securely authenticated and encrypted.

![The image explains that a service mesh is an infrastructure layer managing communication between services in a microservice architecture without altering the code.](https://kodekloud.com/kk-media/image/upload/v1752880624/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Service-Mesh/frame_30.jpg)

Enhanced observability is another significant benefit of implementing a service mesh. By providing real-time insights into service interactions, a service mesh helps you:

- Monitor end-to-end application performance
- Identify issues and bottlenecks
- Manage service discovery efficiently by tracking service IP addresses and ports within dynamic clusters

Additionally, integrated health checks continuously verify service availability. This smart monitoring ensures that only healthy service instances receive traffic through intelligent load balancing, while unhealthy instances are automatically sidelined.

![The image explains service mesh responsibilities: traffic management, security, observability, and service discovery, using proxies for Python, Ruby, Java, and Node.js applications.](https://kodekloud.com/kk-media/image/upload/v1752880625/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Service-Mesh/frame_60.jpg)

In the sections that follow, we will delve into the core functionalities provided by a service mesh:

- Traffic Management
- Security Enhancements
- Advanced Observability
- Service Discovery

Each section will illustrate how the service mesh simplifies and secures microservice communications, leading to a more resilient and efficient system architecture.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-associate-kcna/module/aeecda11-7f2e-48c5-9c54-5409f2d9d8d8/lesson/6f503220-cb96-4635-af8a-8470681717a2)**
>
> Watch video content
