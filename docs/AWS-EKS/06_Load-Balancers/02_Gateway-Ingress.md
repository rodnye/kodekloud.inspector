# Gateway Ingress - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-EKS/Load-Balancers/Gateway-Ingress)

---

## Table of Contents

- Gateway Ingress
  - Table of Contents
  - What Is Kubernetes Ingress?
  - NGINX Ingress Controller Architecture
  - AWS Load Balancer Controller
  - Alternative Ingress Controllers & Service Meshes
  - AWS Lattice: Gateway API Implementation
  - Comparison of Traffic Management Options
  - References
  - Watch Video

---

## Content

AWS EKS

Load Balancers

# Gateway Ingress

Ingress Resources in Kubernetes manage L7 traffic, but the new Gateway API delivers more extensibility and team isolation. In this article, we compare classic Ingress (NGINX, AWS ALB) with the emerging Gateway API, service meshes, and AWS Lattice. We preserve the sequence of diagrams to illustrate each architecture.

## Table of Contents

- [What Is Kubernetes Ingress?](#what-is-kubernetes-ingress)
- [NGINX Ingress Controller Architecture](#nginx-ingress-controller-architecture)
- [AWS Load Balancer Controller](#aws-load-balancer-controller)
- [Alternative Ingress Controllers & Service Meshes](#alternative-ingress-controllers--service-meshes)
- [AWS Lattice: Gateway API Implementation](#aws-lattice-gateway-api-implementation)
- [Comparison of Traffic Management Options](#comparison-of-traffic-management-options)
- [References](#references)

## What Is Kubernetes Ingress?

An **Ingress** is a native Kubernetes API object (`networking.k8s.io/v1`) that defines rules for routing external HTTP(S) traffic to Services inside the cluster. While stable since Kubernetes v1.19, Ingress has limitations:

- Limited API extensibility for multi-team environments
- Controller-specific annotations for advanced L7 features
- One-to-one mapping between Ingress and external load balancers (in some providers)

The newer [Gateway API](https://gateway-api.sigs.k8s.io/) addresses these gaps by offering:

- Role-based resource split: Gateways, Listeners, Routes
- Fine-grained control for teams and operators
- Extended protocol support beyond HTTP(S)

## NGINX Ingress Controller Architecture

Here’s how a typical NGINX-based Ingress controller routes external traffic within a two-node cluster:

```
# Example Service and Ingress
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  type: ClusterIP
  ports:
    - port: 5000
      targetPort: 5000
  selector:
    app: myapp


---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp-ingress
spec:
  rules:
    - host: myapp.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: myapp-service
                port:
                  number: 5000
```

1.  Each `ClusterIP` Service is backed by a NodePort (e.g., 30000).
2.  The NGINX Ingress controller Pod (via DaemonSet/Deployment) exposes ports 80/443 on every node.
3.  An external Load Balancer forwards HTTP(S) traffic to node ports.
4.  NGINX inspects the `Host` header and proxies to the correct Service.

![The image is a diagram showing a load balancer setup with two nodes, each running NGINX and an application, connected via ports 80, 443, and 5000. The setup includes ingress rules and a host name "myapp.fun."](https://kodekloud.com/kk-media/image/upload/v1752862850/notes-assets/images/AWS-EKS-Gateway-Ingress/load-balancer-nginx-setup-diagram.jpg)

## AWS Load Balancer Controller

The [AWS Load Balancer Controller](https://github.com/kubernetes-sigs/aws-load-balancer-controller) replaces the in-cluster Ingress controller by provisioning AWS Application Load Balancers (ALBs) for your Kubernetes Ingress resources:

- Define a standard Kubernetes `Ingress`.
- The controller reads L7 rules and creates an ALB with listener rules.
- The ALB routes traffic directly to your Service endpoints.

> [!important]
> **Note**
>
> Since version `v2.4.0`, the AWS Load Balancer Controller offers experimental support for the \[Gateway API\]. If you need a stable interface, continue using `networking.k8s.io/v1` Ingress resources.

While this offloads proxy management to AWS, many Ingress objects can result in multiple ALBs, increasing cost. You can consolidate rules by hosting multiple domains on a single ALB:

| Domain          | Ingress Resource |
| --------------- | ---------------- |
| `myapp.example` | `myapp-ingress`  |
| `myapi.example` | `myapi-ingress`  |

![The image illustrates the management of ingress with an AWS Load Balancer, showing host names, a load balancer controller, and various AWS service icons. It notes that gateways are not supported.](https://kodekloud.com/kk-media/image/upload/v1752862851/notes-assets/images/AWS-EKS-Gateway-Ingress/aws-load-balancer-ingress-management-diagram.jpg)

## Alternative Ingress Controllers & Service Meshes

Beyond NGINX, several data planes and control planes support Ingress and the Gateway API:

| Controller / Mesh | Data Plane    | API Support                  | Use Case                         |
| ----------------- | ------------- | ---------------------------- | -------------------------------- |
| NGINX             | NGINX         | Ingress, Annotations         | Highly configurable HTTP routing |
| HAProxy           | HAProxy       | Ingress                      | Low-latency L4/L7                |
| Contour           | Envoy         | Gateway API                  | Cloud-native L7                  |
| Istio Mesh        | Envoy         | Gateway API, VirtualServices | Advanced traffic management      |
| Linkerd Mesh      | Linkerd Proxy | Ingress                      | Simple service mesh routing      |

Service meshes like \[Istio\] or \[Linkerd\] can also manage north-south traffic via custom Gateway or Ingress resources.

![The image shows logos for two service meshes: Istio and Linkerd.](https://kodekloud.com/kk-media/image/upload/v1752862852/notes-assets/images/AWS-EKS-Gateway-Ingress/istio-linkerd-service-mesh-logos.jpg)

## AWS Lattice: Gateway API Implementation

[AWS Lattice](https://docs.aws.amazon.com/lattice/latest/ug/what-is-aws-lattice.html) is an AWS-managed service that implements the Gateway API for both L4 and L7 routing:

- Creates an external Load Balancer on your behalf.
- Routes cross-account or cross-service traffic (e.g., Kubernetes → AWS Lambda).
- Simplifies rule management at the AWS control plane.

While Lattice supports the standard Gateway API definitions directly, it does not yet match the full feature set of NGINX or the AWS Load Balancer Controller. Consider Lattice when you need:

- Cross-service routing (EC2, Lambda, ECS)
- Managed control plane without self-hosted proxies

![The image is a diagram showing AWS Lattice, NGINX, and AWS LB Controller in relation to a Kubernetes Cluster, Lambda Function, and EC2 Instance. It highlights features like being "more full featured" and "more flexible."](https://kodekloud.com/kk-media/image/upload/v1752862854/notes-assets/images/AWS-EKS-Gateway-Ingress/aws-lattice-nginx-kubernetes-diagram.jpg)

## Comparison of Traffic Management Options

![The image is a summary slide with three points about Gateway API, Ingress Controllers, and traffic management options for clusters. It features a gradient background and numbered bullet points.](https://kodekloud.com/kk-media/image/upload/v1752862855/notes-assets/images/AWS-EKS-Gateway-Ingress/gateway-api-ingress-traffic-summary.jpg)

| Solution                             | Pros                                   | Cons                                |
| ------------------------------------ | -------------------------------------- | ----------------------------------- |
| Ingress (NGINX/HAProxy)              | Mature, highly configurable            | Self-managed, single API surface    |
| AWS Load Balancer Controller (ALB)   | AWS-managed, no in-cluster proxies     | Can generate many ALBs              |
| Service Mesh Gateways (Istio, Envoy) | Rich traffic policies, mTLS, telemetry | Additional control plane complexity |
| AWS Lattice (Gateway API)            | Cross-service routing, managed rules   | Limited L7 features vs NGINX/ALB    |

1.  Gateway API supersedes Ingress with a stable, extensible L7 routing framework.
2.  Ingress controllers (NGINX, Envoy-based, AWS ALB Controller) offer host-based routing without per-service load balancers.
3.  Service meshes and AWS Lattice provide alternative north-south solutions—choose based on features, flexibility, and operational model.

---

## References

- Kubernetes Ingress: https://kubernetes.io/docs/concepts/services-networking/ingress/
- Gateway API: https://gateway-api.sigs.k8s.io/
- AWS Load Balancer Controller: https://github.com/kubernetes-sigs/aws-load-balancer-controller
- Istio: https://istio.io/
- Linkerd: https://linkerd.io/
- AWS Lattice: https://docs.aws.amazon.com/lattice/latest/ug/what-is-aws-lattice.html

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-eks/module/3242702b-09b2-43c8-9bbe-283c1d64c685/lesson/bf68c334-9c17-49da-91bc-6f633256a4e0)**
>
> Watch video content
