# Service Discovery - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Explain-Consul-Architecture/Service-Discovery)

---

## Table of Contents

- Service Discovery
  - Centralized Service Registry
  - Real-Time Health Monitoring
  - Service Registration and Lookup Workflow
  - Identity-Based Authorization with Consul Connect
  - Multi–Data Center Service Discovery
  - Links and References
  - Watch Video

---

## Content

HashiCorp Certified: Consul Associate Certification

Explain Consul Architecture

# Service Discovery

In this article, we’ll dive into how HashiCorp Consul enables robust service discovery by providing a centralized registry, real-time health monitoring, and secure, identity-based connectivity. You’ll learn how Consul scales in dynamic microservice environments and multi–data-center architectures.

## Centralized Service Registry

A centralized registry is the single source of truth for service locations and health status. When a service (for example, **Service A**) starts, its Consul agent registers the service instance with the Consul servers. Later, if **Service A** needs to call **Service B**, it queries Consul for a healthy **Service B** endpoint and receives the IP and port of a live instance.

This approach is critical in containerized or auto-scaling environments where instances can spin up or down rapidly. By offloading east–west load balancing of microservices to Consul’s registry, you often reduce the need for dedicated load balancers between services.

![The image is a slide titled "Service Discovery!" discussing the benefits of a centralized service registry, including its importance for dynamic workloads and microservice architecture, and the reduction of load balancers for front-end services.](https://kodekloud.com/kk-media/image/upload/v1752877858/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Service-Discovery/service-discovery-centralized-registry-benefits.jpg)

## Real-Time Health Monitoring

Consul agents distribute health checks across all nodes. Each agent runs:

| Check Type    | Scope                | Example                                   |
| ------------- | -------------------- | ----------------------------------------- |
| Node-level    | Host or VM resource  | SSH availability, disk space, CPU usage   |
| Service-level | Application endpoint | HTTP `/health` latency, TCP port response |

When a health check fails, the agent immediately updates the service’s status in the catalog. As a result, Consul only returns healthy service instances in DNS responses or API queries.

![The image is a slide titled "Service Discovery!" outlining real-time health monitoring, distributed responsibility, and health checks at node and application levels. It features a pixelated design on the right and a cartoon character at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752877859/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Service-Discovery/service-discovery-health-monitoring-slide.jpg)

## Service Registration and Lookup Workflow

Imagine an e-commerce platform with three microservices: **Inventory**, **Search**, and **Order**. Each service runs a local Consul agent, which:

1.  Registers the service on startup.
2.  Performs scheduled health checks.
3.  Updates the central catalog with status.

When **Search** needs to call **Order**, it has two lookup options:

1.  **DNS**:

    ```
    nslookup order.service.consul
    ```

2.  **HTTP API**:

    ```
    curl http://127.0.0.1:8500/v1/health/service/order?passing=true
    ```

Consul returns a list of healthy **Order** instances, and **Search** connects directly.

![The image illustrates a service discovery architecture using Consul, showing components like Inventory, Search, and Order services interacting with a central Consul server for service registration, health status, DNS queries, and API requests.](https://kodekloud.com/kk-media/image/upload/v1752877861/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Service-Discovery/service-discovery-architecture-consul-diagram.jpg)

As traffic grows, **Inventory** and **Search** services can scale independently. New instances register automatically, and decommissioned instances deregister. When **Order** queries **Inventory** or **Search**, it always receives healthy endpoints across all nodes.

![The image illustrates a service discovery architecture using Consul, showing interactions between inventory, search, and order services with service registration, health status, DNS queries, and API requests. It emphasizes scalability to thousands of nodes.](https://kodekloud.com/kk-media/image/upload/v1752877862/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Service-Discovery/consul-service-discovery-architecture-diagram.jpg)

## Identity-Based Authorization with Consul Connect

Consul Connect extends service discovery to include mTLS encryption and identity-based policies (intentions). Instead of managing IP-based firewall rules, define intentions like:

```
web-service → database-service
```

When new **web-service** instances register, they automatically gain permission to talk to **database-service** without manual network changes.

> [!important]
> **Note**
>
> Consul Connect leverages mTLS certificates for both authentication and encryption. Intentions are enforced by sidecar proxies, ensuring secure and auditable communication.

![The image illustrates a concept of service discovery using identity-based authorization, moving away from IP-based or firewall-based security. It features cartoon-like speech bubbles from services identifying themselves, with a focus on automating networking and security.](https://kodekloud.com/kk-media/image/upload/v1752877863/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Service-Discovery/service-discovery-identity-authorization-diagram.jpg)

## Multi–Data Center Service Discovery

Consul supports global service discovery across multiple data centers. Each DC runs its own Consul cluster, and mesh gateways connect clusters over public or private networks. Services register locally but can query remote data centers for failover or aggregation.

For example, deploy your web and database services in both Azure and AWS:

1.  **Azure** web service queries local Consul for database instances.
2.  If the Azure database fails, Consul transparently fails over to the AWS database cluster.

This transparent failover ensures high availability and performance across cloud providers and regions.

## Links and References

- Official Consul Documentation: https://www.consul.io/docs
- Consul Connect Overview: https://www.consul.io/docs/connect
- DNS Interface Guide: https://www.consul.io/docs/discovery/dns
- HTTP API Reference: https://www.consul.io/api
- HashiCorp Learn: https://learn.hashicorp.com/collections/consul/getting-started

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/bb95f43b-3acb-4ce2-88ae-0c79beb3e569/lesson/492c0244-f70f-4330-9b30-39670b428acc)**
>
> Watch video content
