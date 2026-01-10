# Istio - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Istio-Service-Mesh/Istio-Introduction/Istio)

---

## Table of Contents

- Istio
  - Istio Architecture
  - Watch Video
    - Data Plane
    - Control Plane

---

## Content

Istio Service Mesh

Istio Introduction

# Istio

In this lesson, we explore Istio—its architecture, operation, and key components—to help you understand how it enhances microservices environments.

Istio is an open-source service mesh that simplifies securing, connecting, and monitoring services within both Kubernetes and traditional workloads. It provides universal traffic management, telemetry, and security for complex deployments, and is widely supported by major cloud providers and consulting firms.

> [!important]
> **Overview**
>
> Istio leverages an open-source, high-performance proxy called Envoy. These Envoy proxies offload critical tasks from microservices, ensuring efficient communication between services as part of the data plane.

## Istio Architecture

Istio's architecture is divided into two main parts: the data plane and the control plane.

### Data Plane

The data plane consists of Envoy proxies that are deployed alongside each service instance (or pod). These proxies handle crucial functions such as load balancing, security, and observability.

### Control Plane

The control plane manages and configures the proxies to route traffic, enforce policies, and collect telemetry data. Originally, Istio’s control plane was composed of three separate components:

- **Citadel:** Responsible for generating and managing certificates for secure communications.
- **Pilot:** Handles service discovery and maintains routing configurations.
- **Galley:** Validates configuration files to ensure correct settings.

Later, these components were consolidated into a single daemon called Istiod, streamlining the architecture and simplifying management.

![The image is a diagram of a microservices architecture using Istio, showing a control plane with Istiod, Citadel, Pilot, and Galley, and a data plane with services like Product Page, Details, Reviews, and Ratings, each with an Envoy proxy.](https://kodekloud.com/kk-media/image/upload/v1752879340/notes-assets/images/Istio-Service-Mesh-Istio/microservices-istio-architecture-diagram.jpg)

Within each pod, an Istio agent works in tandem with the Envoy proxy. The agent is responsible for delivering configuration secrets and other necessary data to ensure that the proxy operates correctly.

> [!important]
> **Key Takeaway**
>
> This overview of Istio's architecture provides the groundwork for understanding its installation process and advanced features, which will be covered in subsequent sections.

In the next sections, we will delve into the installation process for Istio and explore its comprehensive features and functionalities in detail.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/istio-service-mesh/module/dc0a9efc-09ce-4310-86e9-1c7aaab6a7d8/lesson/59b3de7e-9646-414d-a5b8-0f3a262f4a74)**
>
> Watch video content
