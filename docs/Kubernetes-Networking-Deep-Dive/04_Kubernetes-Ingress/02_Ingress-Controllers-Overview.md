# Ingress Controllers Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Networking-Deep-Dive/Kubernetes-Ingress/Ingress-Controllers-Overview)

---

## Table of Contents

- Ingress Controllers Overview
  - Ingress Resource vs Ingress Controller
  - Kubernetes Architecture with Ingress
  - Cloud-based Ingress Controllers
  - Non-cloud-based Ingress Controllers
  - Deployment Models: Deployment vs DaemonSet
  - Factors to Consider
  - References
  - Watch Video

---

## Content

Kubernetes Networking Deep Dive

Kubernetes Ingress

# Ingress Controllers Overview

In this lesson, we dive deep into Kubernetes Ingress controllers and learn how they route external traffic into your cluster. Remember: an **Ingress Resource** defines the routing rules, but without an **Ingress Controller**, those rules are never enforced.

## Ingress Resource vs Ingress Controller

An **Ingress Resource** is a Kubernetes object that declares hostname- and path-based routing rules. By itself, it performs no traffic routing.

An **Ingress Controller** is a Pod (or set of Pods) running inside the cluster. It monitors Ingress resources and programs the underlying proxy or load balancer to enforce those rules.

| Aspect        | Ingress Resource                    | Ingress Controller                         |
| ------------- | ----------------------------------- | ------------------------------------------ |
| Definition    | Kubernetes object for routing rules | Component (Pod) that reads Ingress objects |
| Functionality | Declares host/path rules            | Implements rules, load-balances traffic    |
| Runtime       | No running process                  | Runs inside cluster                        |
| Benefit       | No effect without a controller      | Routes external traffic to Services        |

![The image is a comparison table between "Ingress Resource" and "Ingress Controller," highlighting aspects such as dependency, functionality, access and benefit, and nature.](https://kodekloud.com/kk-media/image/upload/v1752880307/notes-assets/images/Kubernetes-Networking-Deep-Dive-Ingress-Controllers-Overview/ingress-resource-controller-comparison-table.jpg)

> [!important]
> **Warning**
>
> Defining an Ingress without an active controller means no external traffic will reach your Services.

## Kubernetes Architecture with Ingress

Clients send HTTP(S) requests to the cluster’s external endpoint. The Ingress controller intercepts these requests, matches them against Ingress rules, and forwards them to the appropriate Service, which then load-balances to the backend Pods.

![The image is an architecture overview diagram showing a client interacting with a Kubernetes cluster through an ingress-managed load balancer, routing rules, and a service (SVC).](https://kodekloud.com/kk-media/image/upload/v1752880308/notes-assets/images/Kubernetes-Networking-Deep-Dive-Ingress-Controllers-Overview/kubernetes-architecture-client-ingress-diagram.jpg)

## Cloud-based Ingress Controllers

Cloud providers offer managed Ingress controllers that integrate with native infrastructure services—load balancers, firewalls, IAM, and more—simplifying setup and scaling.

| Controller                   | Cloud Provider | Key Features                             |
| ---------------------------- | -------------- | ---------------------------------------- |
| AWS Load Balancer Controller | AWS            | ALB & NLB provisioning, Auto scaling     |
| Google Cloud Load Balancer   | GCP            | GKE integration, Global load balancing   |
| Azure Application Gateway    | Azure          | SSL termination, WAF, path-based routing |

Key benefits:

- Automatic provisioning of cloud LoadBalancer resources
- Built-in security features (WAF, IAM integration)
- Managed upgrades and high availability
- Reduced operational overhead

![The image depicts a cloud-based architecture overview, showing a client connecting to an ingress controller, which routes through a load balancer to various services within a Kubernetes cluster.](https://kodekloud.com/kk-media/image/upload/v1752880309/notes-assets/images/Kubernetes-Networking-Deep-Dive-Ingress-Controllers-Overview/cloud-architecture-kubernetes-ingress-overview.jpg)

![The image shows an overview of cloud-based architecture featuring logos of Amazon Web Services (AWS), Google Cloud, and Microsoft Azure.](https://kodekloud.com/kk-media/image/upload/v1752880310/notes-assets/images/Kubernetes-Networking-Deep-Dive-Ingress-Controllers-Overview/cloud-architecture-aws-google-azure.jpg)

## Non-cloud-based Ingress Controllers

Self-managed controllers run anywhere you choose—on-premises, private clouds, or public clouds where you handle cluster exposure. You’ll need to configure a Service of type LoadBalancer or NodePort to expose the Ingress controller externally.

| Controller               | Use Case            | Highlights                              |
| ------------------------ | ------------------- | --------------------------------------- |
| NGINX Ingress Controller | General purpose     | Reverse proxy, SSL/TLS, rate-limiting   |
| Traefik                  | Dynamic auto-config | HTTP/HTTPS routing, metrics, dashboard  |
| HAProxy Ingress          | Performance-focused | Low-latency load balancing, TCP support |

## Deployment Models: Deployment vs DaemonSet

Choosing **Deployment** or **DaemonSet** affects how Ingress Pods are scheduled, how traffic is distributed, and resource consumption.

![The image illustrates the deployment of ingress controllers, comparing "Deployments" and "DaemonSets" with their respective benefits. Deployments are easily scaled and resource-efficient but may have uneven load, while DaemonSets offer distributed load and high availability.](https://kodekloud.com/kk-media/image/upload/v1752880311/notes-assets/images/Kubernetes-Networking-Deep-Dive-Ingress-Controllers-Overview/ingress-controllers-deployments-daemonsets-comparison.jpg)

| Option     | Pros                                                              | Cons                                 |
| ---------- | ----------------------------------------------------------------- | ------------------------------------ |
| Deployment | Dynamic scaling, resource-efficient                               | Uneven load distribution on nodes    |
| DaemonSet  | One Pod per node, uniform traffic distribution, high availability | Higher resource usage per node count |

> [!important]
> **Note**
>
> - Use **Deployment** when traffic patterns fluctuate and you want to optimize resource usage.
> - Use **DaemonSet** for uniform low-latency ingress on every node and built-in failover.

## Factors to Consider

Before selecting an Ingress controller or deployment model, evaluate:

- Traffic volume, throughput, and latency requirements
- Scaling capabilities (static vs dynamic)
- Features: supported protocols, SSL/TLS, middleware (auth, rate limiting)
- Integration with your cloud or on-prem infrastructure
- Configuration complexity and learning curve
- API/automation support for CI/CD integration
- Community support, plugin ecosystem, and commercial options
- Cost: managed service fees vs self-managed resource costs
- High availability, failover strategies, and load balancing algorithms

![The image outlines factors to consider when deciding on an ingress controller, including performance, ease of use, features, support, cloud integration, and reliability.](https://kodekloud.com/kk-media/image/upload/v1752880313/notes-assets/images/Kubernetes-Networking-Deep-Dive-Ingress-Controllers-Overview/ingress-controller-factors-performance-reliability.jpg)

---

## References

- [Kubernetes Ingress Documentation](https://kubernetes.io/docs/concepts/services-networking/ingress/)
- [AWS Load Balancer Controller Guide](https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html)
- [NGINX Ingress Controller](https://kubernetes.github.io/ingress-nginx/)
- [Traefik Official Docs](https://doc.traefik.io/traefik/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-networking/module/19677663-2b7d-4c3d-92ee-06df9f5530eb/lesson/3017c41a-a251-472c-952d-487d10bcf878)**
>
> Watch video content
