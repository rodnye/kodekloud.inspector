# Ingress Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Networking-Deep-Dive/Kubernetes-Ingress/Ingress-Overview)

---

## Table of Contents

- Ingress Overview
  - Ingress vs. Service
  - Anatomy of an Ingress Resource
  - Minimal Ingress Example
  - Common Ingress Patterns
  - Key Benefits of Ingress
  - Watch Video
    - 1. Ingress Rules
    - 2. Default Backend
    - 3. Resource Backend
    - 4. Path Types
    - 5. Annotations
    - 6. TLS Configuration

---

## Content

Kubernetes Networking Deep Dive

Kubernetes Ingress

# Ingress Overview

Accessing applications from outside a Kubernetes cluster is essential for serving users at scale. Kubernetes uses an abstraction called **Ingress** to route external HTTP/HTTPS traffic to services within the cluster. By defining hostname- and path-based rules, Ingress acts as a reverse proxy or load balancer, enabling:

- Multiple services under a single IP
- SSL/TLS termination at the edge
- Name-based virtual hosting

![The image is a diagram illustrating the concept of Kubernetes Ingress, showing the flow from a client through an ingress-managed load balancer, routing rules, and services to pods within a Kubernetes cluster.](https://kodekloud.com/kk-media/image/upload/v1752880314/notes-assets/images/Kubernetes-Networking-Deep-Dive-Ingress-Overview/kubernetes-ingress-diagram-load-balancer.jpg)

Creating an `Ingress` resource has no effect until you deploy an **Ingress Controller**, which watches those resources and configures the edge component—such as NGINX or a cloud load balancer—to implement your routing rules.

![The image is a diagram illustrating the flow of traffic through an ingress controller in a Kubernetes cluster, showing components like the client, ingress-managed load balancer, routing rule, and pods.](https://kodekloud.com/kk-media/image/upload/v1752880315/notes-assets/images/Kubernetes-Networking-Deep-Dive-Ingress-Overview/kubernetes-ingress-controller-traffic-flow-diagram.jpg)

Ingress Controllers run as pods in your cluster, providing scalability and self-healing. Many offer SSL/TLS termination, authentication, and DNS integration. Some popular controllers include:

| Controller               | Features                                 |
| ------------------------ | ---------------------------------------- |
| NGINX Ingress Controller | Widely adopted, rich annotation support  |
| Traefik                  | Dynamic configuration, Let’s Encrypt     |
| HAProxy Ingress          | High performance, advanced routing rules |

Cloud platforms like [AWS](https://aws.amazon.com), [GKE](https://cloud.google.com/kubernetes-engine), and [AKS](https://azure.microsoft.com/en-us/services/kubernetes-service/) also provide managed controllers that integrate with their load balancers and DNS services.

## Ingress vs. Service

| Aspect          | Service (`NodePort`/`LoadBalancer`) | Ingress              |
| --------------- | ----------------------------------- | -------------------- |
| Protocols       | TCP/UDP, HTTP                       | HTTP/HTTPS only      |
| Port Exposure   | Arbitrary ports                     | Ports 80 and 443     |
| Routing         | None                                | Host- and path-based |
| TLS Termination | Not supported                       | Built-in at the edge |
| Virtual Hosting | No                                  | Name-based           |

Services are straightforward to configure, but Ingress provides greater control over HTTP traffic management, security, and virtual hosting.

## Anatomy of an Ingress Resource

An Ingress resource uses the standard Kubernetes schema: `apiVersion`, `kind`, `metadata`, and `spec`. Key spec fields include:

1.  Ingress Rules
2.  Default Backend
3.  Resource Backend
4.  Path Types
5.  Annotations
6.  TLS Configuration

### 1\. Ingress Rules

Rules map hostnames and URL paths to specific services and ports. You can route different paths or domains to separate backends.

![The image is a diagram about "The Ingress Resource" with a highlighted section on "Ingress Rules," indicating it directs traffic based on hostname and URL path.](https://kodekloud.com/kk-media/image/upload/v1752880316/notes-assets/images/Kubernetes-Networking-Deep-Dive-Ingress-Overview/ingress-resource-ingress-rules-diagram.jpg)

### 2\. Default Backend

The default backend handles requests that don’t match any rule, forwarding them to a specified service and port.

![The image is a diagram about "The Ingress Resource" with a highlighted section on "Default Backend," explaining it handles unmatched traffic by directing it to a default service and port.](https://kodekloud.com/kk-media/image/upload/v1752880317/notes-assets/images/Kubernetes-Networking-Deep-Dive-Ingress-Overview/ingress-resource-default-backend-diagram.jpg)

### 3\. Resource Backend

You can reference another Kubernetes resource (in the same namespace) instead of a service. Mixing `service` and `resource` in the same backend is invalid.

> [!important]
> **Note**
>
> Resource backends were supported in earlier APIs (e.g., `networking.k8s.io/v1beta1`) but are not part of the current `networking.k8s.io/v1` spec. Controller support varies.

![The image is a slide titled "The Ingress Resource" with a menu on the left highlighting "Resource Backend" and a description on the right explaining its function in Kubernetes.](https://kodekloud.com/kk-media/image/upload/v1752880318/notes-assets/images/Kubernetes-Networking-Deep-Dive-Ingress-Overview/ingress-resource-backend-kubernetes-slide.jpg)

### 4\. Path Types

Path types determine how the Ingress Controller matches request URLs:

| Path Type              | Behavior                          |
| ---------------------- | --------------------------------- |
| Exact                  | Matches the full path exactly     |
| Prefix                 | Matches based on the URL prefix   |
| ImplementationSpecific | Controller-defined matching logic |

![The image is a diagram explaining "The Ingress Resource" with a focus on "Path Types," detailing three types: Exact, Prefix, and Implementation Specific, each with a brief description.](https://kodekloud.com/kk-media/image/upload/v1752880320/notes-assets/images/Kubernetes-Networking-Deep-Dive-Ingress-Overview/ingress-resource-path-types-diagram.jpg)

### 5\. Annotations

Annotations enable controller-specific features like SSL redirection, URL rewrites, or rate limiting.

![The image is a diagram about "The Ingress Resource" with a menu on the left listing options like "Ingress Rules" and "Annotations," and a highlighted section explaining how to customize ingress behavior.](https://kodekloud.com/kk-media/image/upload/v1752880321/notes-assets/images/Kubernetes-Networking-Deep-Dive-Ingress-Overview/ingress-resource-diagram-customization-options.jpg)

### 6\. TLS Configuration

Specify TLS by referencing Kubernetes Secrets that store certificates and private keys. This configures HTTPS at the Ingress gateway.

![The image is a diagram about "The Ingress Resource" with a menu on the left listing options like "Ingress Rules" and "SSL/TLS Configurations," and a lock icon on the right indicating support for HTTPS using TLS certificates.](https://kodekloud.com/kk-media/image/upload/v1752880322/notes-assets/images/Kubernetes-Networking-Deep-Dive-Ingress-Overview/ingress-resource-diagram-https-tls.jpg)

## Minimal Ingress Example

This example defines a `defaultBackend` for unmatched requests and a rule that routes `example.com/web*` (prefix match) to `web-service:80`.

```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: example-ingress
  namespace: default
spec:
  defaultBackend:
    service:
      name: default-service
      port:
        number: 80
  rules:
  - host: "example.com"
    http:
      paths:
      - path: /web
        pathType: Prefix
        backend:
          service:
            name: web-service
            port:
              number: 80
```

All traffic not matching `/web` is sent to `default-service:80`.

## Common Ingress Patterns

- **Single-Service Ingress**: Routes all traffic to one backend.
- **Simple Fan-Out**: Path-based routing to multiple services.
- **Name-Based Virtual Hosting**: Hostname-based routing for multiple domains.
- **TLS/SSL Termination**: Decrypts HTTPS at the edge and forwards HTTP to services.

![The image lists four types of ingress: Single-Service Ingress, Simple Fanout, Name-Based Virtual Hosting, and SSL/TLS Termination, alongside a blue hexagonal icon with arrows and "ing" text.](https://kodekloud.com/kk-media/image/upload/v1752880323/notes-assets/images/Kubernetes-Networking-Deep-Dive-Ingress-Overview/ingress-types-list-icon-arrows.jpg)

Controller support and advanced features may vary. Use annotations or Custom Resource Definitions (CRDs) to extend behavior.

## Key Benefits of Ingress

![The image lists the benefits of ingress, including centralized traffic management, enhanced security, flexible routing, scalability, and integration with cloud providers.](https://kodekloud.com/kk-media/image/upload/v1752880324/notes-assets/images/Kubernetes-Networking-Deep-Dive-Ingress-Overview/ingress-benefits-traffic-management-security.jpg)

- Centralized traffic management through a single entry point
- Simplified certificate handling with edge SSL/TLS termination
- Flexible path- and host-based routing for complex architectures
- Auto-scaling and high availability via Kubernetes controllers
- Native integration with cloud load balancers, DNS, and managed certificates

Ingress gives you powerful, centralized control over external HTTP/HTTPS access to your Kubernetes workloads. Next, we’ll dive into Ingress Controllers and deployment strategies.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-networking/module/19677663-2b7d-4c3d-92ee-06df9f5530eb/lesson/6d38896a-d031-4851-a3eb-b16754225bc3)**
>
> Watch video content
