# Service Mesh - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Security-Associate-KCSA/Platform-Security/Service-Mesh)

---

## Table of Contents

- Service Mesh
  - Architecture Overview
  - Core Responsibilities
  - Next Steps and References
  - Links and References
  - Watch Video

---

## Content

Kubernetes and Cloud Native Security Associate (KCSA)

Platform Security

# Service Mesh

A **service mesh** is a dedicated infrastructure layer that handles service-to-service communication in microservices architectures. By offloading networking logic to this layer, developers can focus on business functionality without modifying application code for resilience, security, or observability.

## Architecture Overview

Rather than embedding networking concerns within each microservice, a service mesh injects a sidecar proxy alongside every service instance. These proxies form the **data plane**, managing all east–west traffic. A **control plane** centrally configures and orchestrates the proxies, enabling dynamic routing, security policies, and telemetry collection.

![The image explains that a service mesh is a dedicated and configurable infrastructure layer that manages communication between services in a microservice architecture without changing the code.](https://kodekloud.com/kk-media/image/upload/v1752880910/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Service-Mesh/service-mesh-communication-infrastructure.jpg)

Key benefits include:

- **Dynamic Traffic Routing**: Canary releases, blue/green deployments, circuit breaking, retries
- **Mutual TLS (mTLS)**: Automatic encryption and authentication of service calls
- **Observability**: End-to-end metrics, logs, and distributed tracing
- **Service Discovery**: Automatic registration and lookup of service instances

> [!important]
> **Note**
>
> A service mesh is platform-agnostic—popular implementations include [Istio](https://istio.io/), [Linkerd](https://linkerd.io/), and [Consul Connect](https://www.consul.io/).

## Core Responsibilities

The following table summarizes a service mesh’s primary capabilities:

| Capability         | Description                                                                | Example Tools/Config                               |
| ------------------ | -------------------------------------------------------------------------- | -------------------------------------------------- |
| Service Discovery  | Maintains registry of healthy instances for dynamic lookup                 | Envoy, Consul Catalog                              |
| Health Checking    | Removes unresponsive instances to prevent routing to unhealthy pods        | HTTP/gRPC probes, custom health checks             |
| Load Balancing     | Distributes traffic based on round-robin, least connections, or locality   | Envoy LB algorithms                                |
| Security (mTLS)    | Encrypts and authenticates all inter-service traffic                       | Istio PeerAuthentication, Linkerd identity service |
| Traffic Management | Applies retries, timeouts, fault injection, and traffic splitting policies | Istio VirtualService, Linkerd ServiceProfile       |
| Observability      | Collects metrics, logs, and traces for end-to-end visibility               | Prometheus, Jaeger, Grafana                        |

![The image illustrates the responsibilities of a service mesh, highlighting traffic management, security, observability, and service discovery across different services using proxies. Each service is represented with a programming language logo and a labeled box.](https://kodekloud.com/kk-media/image/upload/v1752880911/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Service-Mesh/service-mesh-responsibilities-traffic-security.jpg)

- **Service Discovery**  
  Proxies query a centralized registry to resolve healthy service endpoints dynamically.
- **Health Checks**  
  Continuous probing ensures unresponsive instances are excluded from load-balancing pools.
- **Load Balancing**  
  Traffic is distributed using configurable algorithms (e.g., round-robin, least requests).
- **Security (mTLS)**  
  Automatic certificate issuance and rotation secure all traffic with mutual TLS.
- **Traffic Management**  
  Fine-grained policies for fault tolerance: retries, timeouts, circuit breakers, and canary releases.
- **Observability**  
  Telemetry from each proxy yields metrics, logs, and distributed traces, aiding root-cause analysis.

## Next Steps and References

In the upcoming sections, we'll explore how to configure each capability with code examples, best practices for policy design, and real-world use cases.

## Links and References

- [Kubernetes Networking Basics](https://kubernetes.io/docs/concepts/cluster-administration/networking/)
- [Istio Documentation](https://istio.io/latest/docs/)
- [Linkerd Documentation](https://linkerd.io/2/reference/)
- [Envoy Proxy](https://www.envoyproxy.io/docs)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/8f0d5517-7d43-4d97-871d-234bb4503f7f/lesson/cda23baf-4be0-48f2-9f91-0c63b7435d90)**
>
> Watch video content
