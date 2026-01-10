# Intro to Consul Service Mesh Intentions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Register-a-Service-Proxy/Intro-to-Consul-Service-Mesh-Intentions)

---

## Table of Contents

- Intro to Consul Service Mesh Intentions
  - Building Your Service Graph with Intentions
  - Intentions Precedence and Match Order
  - Protocol Enforcement: Layer 4 vs. Layer 7
  - Further Reading
  - Watch Video

---

## Content

HashiCorp Certified: Consul Associate Certification

Register a Service Proxy

# Intro to Consul Service Mesh Intentions

In a Consul service mesh, **Intentions** govern which services can communicate by enforcing access control at the application layer. Using a service graph, Intentions ensure only permitted traffic flows between sidecar proxies or natively integrated applications.

![The image is a slide about "Consul Service Mesh - Intentions," explaining how intentions define access control for services and how they are enforced. It includes details on service graphs, inbound connections, proxy requests, and default ACL policy behavior.](https://kodekloud.com/kk-media/image/upload/v1752877918/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Intro-to-Consul-Service-Mesh-Intentions/consul-service-mesh-intentions-slide.jpg)

Intentions are enforced at the **destination** (the upstream or target service) during inbound connections:

- With a default ACL policy of **Allow All**, every service-to-service call succeeds unless you explicitly add a Deny Intention.
- With **Deny All**, no traffic is allowed until you create specific Allow Intentions.

> [!important]
> **Warning**
>
> If you switch to `Deny All`, all existing service calls will be blocked until you configure Allow Intentions.

When multiple Intentions match a communication path, Consul applies the **first** matching rule in a top-down evaluation. Only one Intention controls authorization at any time.

---

## Building Your Service Graph with Intentions

Every service registers in Consul’s catalog—usually alongside a Sidecar Proxy. As you define Intentions, Consul dynamically constructs a **service graph** illustrating permitted interactions.

Consider these common policies:

- **Allow the web application to call the Platform API**  
  Create an Allow Intention from `web-app` → `platform-api` for encrypted, authenticated traffic.
- **Allow the search service to query the database**  
  Define an Allow Intention from `search-service` → `database` so search can read data.
- **Deny Inventory service access to Identity service**  
  Add a Deny Intention from `inventory` → `identity` to block all inventory instances.

![The image illustrates a Consul Service Mesh with a focus on "Intentions," showing a service catalog and a service graph with connections between various applications and databases. It includes icons for web applications, microservices, databases, and other components, highlighting interactions and permissions.](https://kodekloud.com/kk-media/image/upload/v1752877919/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Intro-to-Consul-Service-Mesh-Intentions/consul-service-mesh-intentions-diagram.jpg)

Since Consul enforces **identity-based authorization**, you reference services by name—not IP address. Any number of instances (containers, VMs, etc.) of a service automatically share the same permissions.

![The image illustrates a Consul Service Mesh with a focus on "Intentions," showing a service catalog and a service graph with various applications and their interactions, including allowed and denied connections.](https://kodekloud.com/kk-media/image/upload/v1752877920/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Intro-to-Consul-Service-Mesh-Intentions/consul-service-mesh-intentions-diagram-2.jpg)

---

## Intentions Precedence and Match Order

Intentions are prioritized by a **precedence** value; higher numbers are evaluated first. Consul processes rules top-down and stops at the first match for both source and destination services.

![The image is a slide about "Consul Service Mesh - Intentions," explaining precedence and match order with a table showing rules and their precedence levels. It highlights a top-down ruleset using "Allow" or "Deny" intentions, with precedence that cannot be overridden.](https://kodekloud.com/kk-media/image/upload/v1752877922/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Intro-to-Consul-Service-Mesh-Intentions/consul-service-mesh-intentions-ruleset.jpg)

---

## Protocol Enforcement: Layer 4 vs. Layer 7

Consul supports two enforcement modes, depending on your proxy and application protocol:

| Enforcement Layer | Mechanism                  | Key Capabilities                                 |
| ----------------- | -------------------------- | ------------------------------------------------ |
| Layer 4 (L4)      | Consul’s built-in proxy    | Identity-based TCP allow/deny on new connections |
| Layer 7 (L7)      | Envoy or advanced sidecars | HTTP-aware policies (paths, headers, methods)    |

> [!important]
> **Note**
>
> To use Layer 7 Intentions, integrate [Envoy](https://www.envoyproxy.io) or another HTTP-aware proxy with Consul.

![The image is a slide about "Consul Service Mesh - Intentions," focusing on controlling authorization using L4 (identity-based) and L7 (application-aware) protocols. It includes a decorative pixelated design on the right and a cartoon character at the bottom right.](https://kodekloud.com/kk-media/image/upload/v1752877923/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Intro-to-Consul-Service-Mesh-Intentions/consul-service-mesh-intentions-slide-2.jpg)

---

## Further Reading

- [Consul Intentions Documentation](https://www.consul.io/docs/enterprise/connect/intentions)
- [Consul ACL Overview](https://www.consul.io/docs/security/acl)
- [Envoy Proxy Documentation](https://www.envoyproxy.io)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/be057676-1d98-4d78-89c8-b8be2a9c2967/lesson/cb709e82-467c-4dbf-98b5-37acfe5766b8)**
>
> Watch video content
