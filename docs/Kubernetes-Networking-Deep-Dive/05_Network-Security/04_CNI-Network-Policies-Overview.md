# CNI Network Policies Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Networking-Deep-Dive/Network-Security/CNI-Network-Policies-Overview)

---

## Table of Contents

- CNI Network Policies Overview
  - Recap of Kubernetes Network Policies
  - Built-In vs. CNI-Specific Network Policies
  - Key Benefits of CNI Network Policies
  - Cilium: Our CNI of Choice
  - Policy Enforcement Modes
  - Rule Structure
  - Layer 3 Policies
  - Layer 4 Policies
  - Layer 7 Policies
  - Namespace vs. Cluster-Wide Policies
  - Links and References
  - Watch Video
    - Example: Comprehensive CiliumNetworkPolicy (L3–L7)
    - Examples
    - Example: Restrict Egress to TCP Port 80
    - Example: HTTP Methods, Paths & Headers

---

## Content

Kubernetes Networking Deep Dive

Network Security

# CNI Network Policies Overview

## Recap of Kubernetes Network Policies

By default, Kubernetes pods communicate without restrictions, which can expose applications to unintended traffic flows. Implementing network policies allows you to explicitly permit or deny traffic between:

- Pod-to-Pod
- Pod-to-Service
- Pod-to-Namespace

> [!important]
> **Note**
>
> Network policies enhance cluster security by defining clear ingress and egress rules. Always start with a default deny posture in production.

![The image is a slide titled "Network Policies Recap," summarizing key points about network policies in Kubernetes, including traffic control, communication restrictions, and security enhancements.](https://kodekloud.com/kk-media/image/upload/v1752880384/notes-assets/images/Kubernetes-Networking-Deep-Dive-CNI-Network-Policies-Overview/network-policies-recap-kubernetes-summary.jpg)

## Built-In vs. CNI-Specific Network Policies

Kubernetes ships with basic network policy support, but many CNI plugins extend capabilities with advanced features:

| Feature                        | Built-In Policy | CNI Plugin Extensions                |
| ------------------------------ | --------------- | ------------------------------------ |
| Layer 7 Filtering              | ✖️              | ✅ HTTP, gRPC, Kafka rules           |
| Encryption & Segmentation      | ✖️              | ✅ mTLS, IPsec                       |
| Rate Limiting & Whitelisting   | ✖️              | ✅ IP whitelisting/blacklisting, QoS |
| Traffic Monitoring & Analytics | Limited         | ✅ Real-time metrics & logs          |
| Multi-Cluster Policy Scope     | ✖️              | ✅ Global policy management          |

![The image is an overview of CNI (Container Network Interface) network policies, illustrating a Kubernetes cluster with nodes and an external network, highlighting features like network segmentation, encryption, and enhanced security. It also mentions projects like Calico, Cilium, and Weave Net.](https://kodekloud.com/kk-media/image/upload/v1752880384/notes-assets/images/Kubernetes-Networking-Deep-Dive-CNI-Network-Policies-Overview/cni-network-policies-kubernetes-overview.jpg)

## Key Benefits of CNI Network Policies

| Benefit                  | Description                                                   |
| ------------------------ | ------------------------------------------------------------- |
| Advanced Traffic Control | Fine-grained L3–L7 rules across pods, nodes, external targets |
| Enhanced Security        | Intrusion detection, IP whitelisting, rate limiting           |
| Performance Optimization | Low-latency, high-throughput networking                       |
| Extended Scope           | Policy enforcement beyond cluster boundaries                  |
| Customization            | Organization-specific rule definitions                        |
| Segmentation & QoS       | Network isolation plus traffic prioritization                 |
| Real-Time Monitoring     | Anomaly detection and live metrics                            |

## Cilium: Our CNI of Choice

Cilium leverages eBPF for efficient enforcement of Layer 3, 4, and 7 policies with minimal performance overhead:

- Layer 7 Visibility (HTTP, gRPC, Kafka)
- Protocol-Aware Filtering (methods, paths, headers)
- Service Mesh Integrations ([Istio](https://istio.io), [Linkerd](https://linkerd.io))
- Multi-Cluster Policy Consistency
- Rich eBPF-Powered Troubleshooting & Metrics

![The image is an informational graphic about Cilium Network Policies, highlighting protocol support (HTTP, gRPC, Kafka), layered controls (L3/L4 and L7), and extensive integrations. It features the Cilium logo.](https://kodekloud.com/kk-media/image/upload/v1752880385/notes-assets/images/Kubernetes-Networking-Deep-Dive-CNI-Network-Policies-Overview/cilium-network-policies-protocols-graphic.jpg)

## Policy Enforcement Modes

Cilium follows a whitelist model. Traffic is dropped by default unless permitted by one of these modes:

- **Ingress Policies:** Allow traffic into pods based on source IPs, ports, or L7 rules
- **Egress Policies:** Allow pods to initiate traffic to specified destinations
- **Default Deny:** Any traffic not explicitly allowed will be blocked

## Rule Structure

Every Cilium policy uses an endpoint selector to target pods via labels:

```
endpointSelector:
  matchLabels:
    app: myapp
```

Subsequent rule sections can include:

- `fromEndpoints` / `toEndpoints`: Label selectors for source/destination pods
- `ports` & `protocols`: Restrict to TCP/UDP ports
- Layer 7 rules: HTTP methods, paths, headers
- CIDR blocks: Allow or exclude specific IP ranges

![The image explains two rule basics: "Layer 7 Rules," which define policies based on application layer parameters like HTTP methods and paths, and "CIDR Blocks," which control traffic to/from specific IP ranges for network integration.](https://kodekloud.com/kk-media/image/upload/v1752880386/notes-assets/images/Kubernetes-Networking-Deep-Dive-CNI-Network-Policies-Overview/layer-7-rules-cidr-blocks-explained.jpg)

### Example: Comprehensive CiliumNetworkPolicy (L3–L7)

```
apiVersion: "cilium.io/v2"
kind: CiliumNetworkPolicy
metadata:
  name: "example-policy"
spec:
  endpointSelector:
    matchLabels:
      app: myapp
  ingress:
    - fromEndpoints:
        - matchLabels:
            app: frontend
      toPorts:
        - ports:
            - port: "80"
              protocol: TCP
          rules:
            http:
              - method: "GET"
                path: "/public"
  egress:
    - toEndpoints:
        - matchLabels:
            app: database
      toPorts:
        - ports:
            - port: "3306"
              protocol: TCP
```

- **Ingress:** Only HTTP GET on `/public` from pods with `app=frontend`.
- **Egress:** Only TCP port 3306 to pods with `app=database`.

---

## Layer 3 Policies

Layer 3 policies define network-layer connectivity without deep packet inspection:

- **Endpoints-based:** Select pods by labels
- **Entities-based:** Match built-in identities like `host` or `world`
- **DNS-based:** Use runtime-resolved DNS names (honoring TTLs)

![The image shows a list of Layer 3 policies alongside a diagram of the OSI Model layers, highlighting the Network layer.](https://kodekloud.com/kk-media/image/upload/v1752880387/notes-assets/images/Kubernetes-Networking-Deep-Dive-CNI-Network-Policies-Overview/layer-3-policies-osi-model-diagram.jpg)

### Examples

```
# 1. Allow ingress from frontend pods to backend pods
apiVersion: "cilium.io/v2"
kind: CiliumNetworkPolicy
metadata:
  name: layer3-ingress-only
spec:
  endpointSelector:
    matchLabels:
      role: backend
  ingress:
    - fromEndpoints:
        - matchLabels:
            role: frontend
```

```
# 2. Allow egress to specific CIDRs, excluding cluster service CIDR
apiVersion: "cilium.io/v2"
kind: CiliumNetworkPolicy
metadata:
  name: layer3-egress-cidr
spec:
  endpointSelector:
    matchLabels:
      role: backend
  egress:
    - toCIDR:
        - "20.1.1.1/32"
    - toCIDRSet:
        - cidr: "10.0.0.0/8"
          except:
            - "10.96.0.0/12"
```

---

## Layer 4 Policies

Layer 4 rules govern transport-layer connectivity (TCP/UDP). By default, Cilium blocks ICMP unless explicitly permitted.

![The image describes Layer 4 policies, including integration with Layer 3, control over UDP/TCP traffic, and default behavior, alongside a diagram of the OSI model layers.](https://kodekloud.com/kk-media/image/upload/v1752880389/notes-assets/images/Kubernetes-Networking-Deep-Dive-CNI-Network-Policies-Overview/layer-4-policies-osi-model-diagram.jpg)

### Example: Restrict Egress to TCP Port 80

```
apiVersion: "cilium.io/v2"
kind: CiliumNetworkPolicy
metadata:
  name: layer4-example
spec:
  endpointSelector:
    matchLabels:
      app: myService
  egress:
    - toPorts:
        - ports:
            - port: "80"
              protocol: TCP
```

This policy permits only TCP traffic on port 80 for pods labeled `app=myService`.

---

## Layer 7 Policies

Layer 7 policies enable application-layer inspection and enforcement for HTTP, gRPC, Kafka, and more.

![The image illustrates Layer 7 policies, showing supported protocols (HTTP, gRPC, Kafka) and attributes used (HTTP methods, URL paths, request headers), alongside a diagram of the OSI Model layers.](https://kodekloud.com/kk-media/image/upload/v1752880390/notes-assets/images/Kubernetes-Networking-Deep-Dive-CNI-Network-Policies-Overview/layer-7-policies-supported-protocols-diagram.jpg)

### Example: HTTP Methods, Paths & Headers

```
apiVersion: "cilium.io/v2"
kind: CiliumNetworkPolicy
metadata:
  name: layer7-example
spec:
  endpointSelector:
    matchLabels:
      app: myService
  ingress:
    - toPorts:
        - ports:
            - port: "80"
              protocol: TCP
      rules:
        http:
          - method: GET
            path: "/path1$"
          - method: PUT
            path: "/path2$"
            headers:
              - "X-My-Header: true"
```

This policy allows:

- HTTP GET requests to `/path1`
- HTTP PUT requests to `/path2` only if `X-My-Header: true` is present

---

## Namespace vs. Cluster-Wide Policies

Cilium supports two scope levels:

| Resource Type                  | Scope            |
| ------------------------------ | ---------------- |
| CiliumNetworkPolicy            | Single Namespace |
| CiliumClusterwideNetworkPolicy | All Namespaces   |

> [!important]
> **Note**
>
> Combining namespace-specific and cluster-wide policies ensures both granular control and consistent, global security enforcement.

![The image compares CiliumNetworkPolicy and CiliumClusterwideNetworkPolicy, highlighting their scope and application within Kubernetes clusters. CiliumNetworkPolicy is namespace-specific, while CiliumClusterwideNetworkPolicy is cluster-wide.](https://kodekloud.com/kk-media/image/upload/v1752880390/notes-assets/images/Kubernetes-Networking-Deep-Dive-CNI-Network-Policies-Overview/cilium-network-policy-comparison-kubernetes.jpg)

---

Now that we’ve covered the theory behind CNI network policies, explore our hands-on [Cilium policy lab](/docs/cilium-lab) to see them in action.

## Links and References

- [Kubernetes Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/)
- [Cilium Documentation](https://docs.cilium.io/)
- [Calico Networking](https://docs.projectcalico.org/)
- [Weave Net](https://www.weave.works/docs/net/latest/kubernetes/kube-addon/)
- [Istio Service Mesh](https://istio.io)
- [Linkerd Service Mesh](https://linkerd.io)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-networking/module/5a70ab6c-2094-4bf2-9f49-e441919fc8c2/lesson/213062d7-7c18-4532-81dd-0a42de9333e6)**
>
> Watch video content
