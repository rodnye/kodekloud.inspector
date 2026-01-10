# Internal Kubernetes Communication Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Networking-Deep-Dive/Container-Network-InterfaceCNI/Internal-Kubernetes-Communication-Overview)

---

## Table of Contents

- Internal Kubernetes Communication Overview
  - Table of Contents
  - Recap: Kubernetes Network Model
  - Pod-to-Pod Communication on the Same Node
  - Pod-to-Pod Communication Across Nodes
  - Network Policies
  - Services & DNS
  - Service Mesh
  - References
  - Watch Video

---

## Content

Kubernetes Networking Deep Dive

Container Network InterfaceCNI

# Internal Kubernetes Communication Overview

In this lesson, we’ll explore how pods communicate inside a Kubernetes cluster. We’ll cover key patterns and tools—from the basic network model to advanced service meshes—so you can design reliable, secure, and scalable applications.

![The image outlines lesson objectives, focusing on pod-to-pod communication and exploring communication patterns and techniques.](https://kodekloud.com/kk-media/image/upload/v1752880262/notes-assets/images/Kubernetes-Networking-Deep-Dive-Internal-Kubernetes-Communication-Overview/pod-to-pod-communication-objectives-diagram.jpg)

## Table of Contents

- [Recap: Kubernetes Network Model](#recap-kubernetes-network-model)
- [Pod-to-Pod Communication on the Same Node](#pod-to-pod-communication-on-the-same-node)
- [Pod-to-Pod Communication Across Nodes](#pod-to-pod-communication-across-nodes)
- [Network Policies](#network-policies)
- [Services & DNS](#services--dns)
- [Service Mesh](#service-mesh)
- [References](#references)

## Recap: Kubernetes Network Model

Kubernetes enforces a flat, IP-per-pod network. The core principles are:

1.  **Unique Pod IP**  
    Every Pod receives its own IP address.
2.  **Local Node Traffic**  
    Pods on the same node communicate via localhost or the CNI bridge.
3.  **Cluster-wide Reachability**  
    Pods on different nodes talk without NAT, thanks to the CNI (we’re using Cilium).

> [!important]
> **Note**
>
> We use [Cilium](https://cilium.io/) with eBPF for high-performance routing, policy enforcement, and load balancing—no IP masquerading required.

![The image illustrates the Kubernetes Network Model, showing pods with unique IP addresses within nodes. It highlights the concept of assigning a unique IP to each pod.](https://kodekloud.com/kk-media/image/upload/v1752880263/notes-assets/images/Kubernetes-Networking-Deep-Dive-Internal-Kubernetes-Communication-Overview/kubernetes-network-model-pods-ip-addresses.jpg)

## Pod-to-Pod Communication on the Same Node

When pods share a node, each pod’s network interface pairs with a veth endpoint on the CNI bridge. All traffic stays local:

- Low latency, no encapsulation
- Direct IP routing on the bridge interface

![The image illustrates a network diagram showing pod-to-pod communication on the same node, using virtual Ethernet interfaces and a CNI (Container Network Interface) bridge.](https://kodekloud.com/kk-media/image/upload/v1752880264/notes-assets/images/Kubernetes-Networking-Deep-Dive-Internal-Kubernetes-Communication-Overview/network-diagram-pod-communication-cni.jpg)

## Pod-to-Pod Communication Across Nodes

For inter-node traffic, Cilium injects eBPF programs into the kernel to handle routing, encapsulation (if overlay is used), and policy. Traffic flows like this:

1.  Pod → veth → Cilium eBPF hook
2.  Encapsulation (if enabled)
3.  Underlay network → remote node
4.  Decapsulation → destination pod

This approach eliminates the need for traditional overlay networks and improves performance.

![The image illustrates a network diagram showing pod-to-pod communication across nodes, with components like eth0, veth0, and CNI labeled.](https://kodekloud.com/kk-media/image/upload/v1752880265/notes-assets/images/Kubernetes-Networking-Deep-Dive-Internal-Kubernetes-Communication-Overview/network-diagram-pod-communication-nodes.jpg)

## Network Policies

Network Policies control traffic at the IP and port level (TCP/UDP). You can specify which pods, namespaces, or external CIDRs are allowed or denied.

| Feature           | Description                     | Example                                    |
| ----------------- | ------------------------------- | ------------------------------------------ |
| PodSelector       | Select pods by label            | `podSelector: matchLabels: app: frontend`  |
| NamespaceSelector | Scope policy to namespaces      | `namespaceSelector: matchLabels: team:ops` |
| IPBlock           | Allow/Deny external CIDR ranges | `ipBlock: cidr: 172.16.0.0/16`             |
| PolicyTypes       | Ingress, Egress, or both        | `policyTypes: ["Ingress","Egress"]`        |

![The image illustrates network policies, showing how communication between pods is managed, with some connections allowed and others blocked. It highlights the management of communication between entities like other pods, namespaces, and IP addresses.](https://kodekloud.com/kk-media/image/upload/v1752880267/notes-assets/images/Kubernetes-Networking-Deep-Dive-Internal-Kubernetes-Communication-Overview/network-policies-pod-communication-diagram.jpg)

## Services & DNS

Kubernetes Services provide stable endpoints and built-in DNS discovery. Each Service gets a DNS A record, so clients always hit the right IP:

- **ClusterIP**: Internal load-balancer
- **NodePort**: Exposes port on each node
- **LoadBalancer**: External cloud LB

| Service Type | Scope     | Example Command                                       |
| ------------ | --------- | ----------------------------------------------------- |
| ClusterIP    | Internal  | `kubectl expose pod nginx --port=80 --target-port=80` |
| NodePort     | External  | `kubectl create service nodeport nginx --port=80`     |
| LoadBalancer | Cloud LBs | `kubectl apply -f loadbalancer-service.yaml`          |

Pods also get a DNS entry of the form:

```
pod-ip-address.namespace.pod.cluster.local
# e.g. 10-244-1-3.default.pod.cluster.local
```

> [!important]
> **Warning**
>
> Pod DNS records change on restart or rescheduling. Always prefer Service DNS names (`my-service.default.svc.cluster.local`) for stable discovery.

![The image illustrates the role of services in Kubernetes, showing how they facilitate service discovery and DNS management, and define pod access with a stable endpoint.](https://kodekloud.com/kk-media/image/upload/v1752880268/notes-assets/images/Kubernetes-Networking-Deep-Dive-Internal-Kubernetes-Communication-Overview/kubernetes-services-discovery-dns-management.jpg)

## Service Mesh

A Service Mesh (e.g., Istio, Linkerd) injects sidecar proxies into each pod. These proxies manage:

- Traffic routing and retries
- Mutual TLS (mTLS) encryption
- Circuit breaking and observability

No application code changes are needed—network features are handled transparently.

![The image illustrates a service mesh concept with two pods, each having a sidecar proxy, and highlights features like lightweight proxies, sidecar operation, and traffic interception.](https://kodekloud.com/kk-media/image/upload/v1752880269/notes-assets/images/Kubernetes-Networking-Deep-Dive-Internal-Kubernetes-Communication-Overview/service-mesh-pods-sidecar-proxy-diagram.jpg)

---

In this lesson, we reviewed Kubernetes’ pod-to-pod connectivity patterns, network policies, Service DNS, and the power of a Service Mesh. Next, try applying these concepts in your own cluster!

## References

- [Kubernetes Networking Concepts](https://kubernetes.io/docs/concepts/cluster-administration/networking/)
- [Cilium Documentation](https://docs.cilium.io/)
- [Kubernetes Services](https://kubernetes.io/docs/concepts/services-networking/service/)
- [Istio Service Mesh](https://istio.io/latest/docs/)
- [Linkerd Service Mesh](https://linkerd.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-networking/module/5eea49e6-caea-4e84-88a0-268ea6f263af/lesson/c59b34d8-459c-4088-9cc7-d36f224a061f)**
>
> Watch video content
