# Load Balancing GKE Traffic Ingress - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GKE-Google-Kubernetes-Engine/Networking-for-GKE-clusters/Load-Balancing-GKE-Traffic-Ingress)

---

## Table of Contents

- Load Balancing GKE Traffic Ingress
  - Kubernetes Ingress Overview
  - External Load Balancer
  - Internal Load Balancer
  - Container-Native Load Balancing
  - Comparing Load Balancer Options
  - Further Reading
  - Watch Video

---

## Content

GKE - Google Kubernetes Engine

Networking for GKE clusters

# Load Balancing GKE Traffic Ingress

In this guide, you’ll learn how Kubernetes Ingress routes incoming HTTPS traffic to applications running in a Google Kubernetes Engine (GKE) cluster. We’ll cover external and internal load balancers, then introduce container-native load balancing with Network Endpoint Groups (NEGs).

## Kubernetes Ingress Overview

Kubernetes Ingress lets you define HTTP(S) routing rules based on hostnames and paths. In GKE:

- **Ingress resource** → Provisions an external or internal application load balancer
- **Service definitions** → Determine backend Pods and ports

By customizing your Ingress manifest, you control TLS termination, virtual hosts, and URL-based routing.

## External Load Balancer

An external application load balancer routes internet traffic to your GKE Services and Pods. When you create an Ingress for external HTTPS:

1.  GKE provisions a global HTTP(S) load balancer
2.  TLS is terminated at the load balancer
3.  Requests are forwarded to Service backends

Use an external load balancer when exposing public-facing applications.

## Internal Load Balancer

An internal application load balancer handles traffic within the same VPC or cluster. For an internal HTTPS Ingress:

1.  GKE creates a regional, proxy-based load balancer
2.  It uses an internal IP address on your Service
3.  Connections are terminated and proxied to backend Pods

Backend Pods see the load balancer as the request source, not the original client.

![The image is a diagram illustrating the architecture of an internal load balancer within a Google Kubernetes Engine (GKE) setup, showing components like GKE clusters, pods, and internal clients. It also mentions elements of an external load balancer, such as forwarding rules and health checks.](https://kodekloud.com/kk-media/image/upload/v1752875690/notes-assets/images/GKE-Google-Kubernetes-Engine-Load-Balancing-GKE-Traffic-Ingress/gke-internal-load-balancer-architecture-diagram.jpg)

> [!important]
> **Warning**
>
> Any manual edits to load balancer components (forwarding rules, target proxies, etc.) made outside GKE can be overwritten when the cluster updates. The GKE Ingress controller fully manages these resources according to your Ingress manifest.

## Container-Native Load Balancing

GKE’s container-native load balancing uses NEGs to attach Pods directly as backends. This eliminates extra network hops and improves performance:

- Routes traffic from the load balancer straight to Pod IPs
- Bypasses NodePort and kube-proxy hops
- Performs Pod readiness checks at the load balancer

![The image is a diagram illustrating the architecture of an internal load balancer within a Google Kubernetes Engine (GKE) cluster, showing components like pods, internal clients, and the GKE control plane.](https://kodekloud.com/kk-media/image/upload/v1752875691/notes-assets/images/GKE-Google-Kubernetes-Engine-Load-Balancing-GKE-Traffic-Ingress/gke-internal-load-balancer-architecture-diagram-2.jpg)

## Comparing Load Balancer Options

| Load Balancer Type           | Scope              | Traffic Path                         | Health Checks       |
| ---------------------------- | ------------------ | ------------------------------------ | ------------------- |
| External HTTP(S)             | Global, Internet   | Client → LB → Service → Pod          | HTTP(S) at LB       |
| Internal HTTP(S)             | Regional, VPC      | Client → Internal LB → Service → Pod | HTTP(S) at LB       |
| Container-Native (NEG-based) | Global or Regional | Client → LB → Pod (direct via NEG)   | Pod readiness at LB |

## Further Reading

- [Kubernetes Ingress Concepts](https://kubernetes.io/docs/concepts/services-networking/ingress/)
- [GKE Ingress Guide](https://cloud.google.com/kubernetes-engine/docs/concepts/ingress)
- [Using Network Endpoint Groups](https://cloud.google.com/load-balancing/docs/negs)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gke-google-kubernetes-engine/module/e39613e2-4771-4eaa-a8cf-6360f282895a/lesson/e43fb39f-f8a1-4f8f-91d9-5ad2e8378759)**
>
> Watch video content
