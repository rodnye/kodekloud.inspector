# Istio Basics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/Kubernetes-Operations-and-Security/Istio-Basics)

---

## Table of Contents

- Istio Basics
  - Architecture Overview
  - Sidecar Proxy Pattern
  - From Netflix OSS to Istio
  - Summary
  - Links and References
  - Watch Video
    - Control Plane Components

---

## Content

DevSecOps - Kubernetes DevOps & Security

Kubernetes Operations and Security

# Istio Basics

Istio is an open-source service mesh that simplifies connecting, securing, managing, and monitoring microservices. With Istio, you get:

- Automated **service discovery**, **load balancing**, and **failure recovery**
- Fine-grained **traffic control** for A/B testing, canary releases, and rate limiting
- **End-to-end security** with mutual TLS, policy enforcement, and telemetry
- Zero or minimal changes to application code

> [!important]
> **Note**
>
> Istio works transparently alongside any application stack (Spring Boot, Node.js, Vert.x, etc.) by injecting an Envoy sidecar proxy into each pod.

![The image is an informational slide about Istio, describing it as an open framework for managing microservices with features like discovery, load balancing, and more, without requiring code changes. It includes a list of basic and complex operational requirements that Istio can handle.](https://kodekloud.com/kk-media/image/upload/v1752873809/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Istio-Basics/istio-microservices-management-framework-slide.jpg)

## Architecture Overview

Istio’s design is split into two planes:

- **Data Plane**  
  Consists of Envoy sidecar proxies that run next to application containers. They intercept all inbound/outbound traffic, enabling metrics collection, policy enforcement, and traffic routing.
- **Control Plane**  
  Configures and manages the proxies, distributing routing rules, certificates, and configuration to ensure consistent behavior across the mesh.

Envoy is a high-performance proxy written in C++ that mediates all service-to-service communication within the mesh.

![The image illustrates the Istio architecture, showing the data plane with applications and proxies, and the control plane with components like Pilot, Citadel, and Galley. It depicts the flow of ingress, mesh, and egress traffic within the Istio mesh.](https://kodekloud.com/kk-media/image/upload/v1752873810/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Istio-Basics/istio-architecture-data-plane-control-plane.jpg)

### Control Plane Components

| Component | Responsibility                                     | Reference                                                                   |
| --------- | -------------------------------------------------- | --------------------------------------------------------------------------- |
| Pilot     | Service discovery, traffic management & routing    | [Pilot Docs](https://istio.io/latest/docs/reference/commands/pilot/)        |
| Citadel   | mTLS-based authentication & certificate issuance   | [Citadel Docs](https://istio.io/latest/docs/tasks/security/authentication/) |
| Galley    | Configuration ingestion, validation & distribution | [Galley Docs](https://istio.io/latest/docs/reference/config/galley/)        |

> [!important]
> **Warning**
>
> In Istio 1.5+, Galley and Pilot components were merged into `istiod`. Be sure to check your Istio version and configuration model.

## Sidecar Proxy Pattern

When you deploy Istio, each application pod includes an Envoy sidecar. The sidecar:

1.  **Intercepts** all network traffic to/from the application
2.  **Forwards** requests to the application container and relays responses
3.  **Encrypts** traffic between pods using mutual TLS

This pattern externalizes cross-cutting concerns—tracing, metrics, load balancing, and security—out of application code.

## From Netflix OSS to Istio

Before Istio, Spring Boot microservices often required embedding multiple Netflix OSS libraries:

| Netflix OSS Component      | Use Case                      | Istio Equivalent               |
| -------------------------- | ----------------------------- | ------------------------------ |
| Eureka                     | Service discovery             | Envoy + Pilot                  |
| Spring Cloud Config Server | Centralized configuration     | Galley / Config APIs           |
| Ribbon                     | Client-side load balancing    | Envoy load-balancer            |
| Hystrix                    | Circuit breaking & resilience | Envoy retry & circuit-breakers |
| Zipkin                     | Distributed tracing           | Envoy + Zipkin/Jaeger plugin   |
| Zuul                       | API gateway                   | IngressGateway                 |

![The image illustrates the transition of microservices from a traditional container setup to using Istio with sidecar containers, highlighting the externalization of capabilities. It also features logos of technologies like Netflix OSS, Spring, and Envoy.](https://kodekloud.com/kk-media/image/upload/v1752873812/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Istio-Basics/microservices-istio-sidecar-transition-diagram.jpg)

## Summary

Istio’s sidecar-based approach offloads critical infrastructure concerns from your code to a transparent proxy mesh. You gain unified **traffic management**, **security**, and **observability** with minimal disruption to your existing workflows.

## Links and References

- [Istio Official Website](https://istio.io/)
- [Envoy Proxy](https://www.envoyproxy.io/)
- [Kubernetes Service Mesh Concepts](https://kubernetes.io/docs/concepts/services-networking/service/)
- [Mutual TLS in Istio](https://istio.io/latest/docs/tasks/security/authentication/authn-policy/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/fc1733bc-1e9c-4e38-ae86-84e6bd9af04d/lesson/da1538db-b4c3-49c1-af36-c434927cda4d)**
>
> Watch video content
