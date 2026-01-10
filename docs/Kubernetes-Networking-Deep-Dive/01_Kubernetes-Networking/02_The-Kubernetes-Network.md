# The Kubernetes Network - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Networking-Deep-Dive/Kubernetes-Networking/The-Kubernetes-Network)

---

## Table of Contents

- The Kubernetes Network
  - Kubernetes Networking Model
  - Four Core Networking Challenges
  - Implementing the Networking Model with CNI
  - Next Steps
  - Links and References
  - Watch Video
    - Network Namespace in Pods
    - Comparing Popular CNI Plugins

---

## Content

Kubernetes Networking Deep Dive

Kubernetes Networking

# The Kubernetes Network

Networking is a foundational aspect of Kubernetes, enabling seamless communication between pods, services, and nodes—both inside and outside a cluster. Mastering Kubernetes networking ensures your containerized applications run efficiently, scale effectively, and remain manageable.

## Kubernetes Networking Model

Kubernetes adopts a flat, unified network approach based on these core principles:

- Every pod gets a unique, cluster-wide IP address (the **IP-per-pod** model).
- Pods can communicate with any other pod on any node without Network Address Translation (NAT).
- Agents (like the kubelet) on each node can reach all pods on that node.

![The image illustrates the Kubernetes Networking Model, showing a cluster with nodes containing pods, and the communication between them.](https://kodekloud.com/kk-media/image/upload/v1752880334/notes-assets/images/Kubernetes-Networking-Deep-Dive-The-Kubernetes-Network/kubernetes-networking-model-cluster-pods.jpg)

> [!important]
> **IP-per-Pod Explained**
>
> Think of each pod as a micro-VM: it receives its own IP address, allowing direct pod-to-pod connectivity across the cluster—just like virtual machines in a traditional network.

![The image illustrates the "IP-per-pod" concept in a Kubernetes cluster, showing each pod with its own IP address and a network of servers, each also with an IP address.](https://kodekloud.com/kk-media/image/upload/v1752880336/notes-assets/images/Kubernetes-Networking-Deep-Dive-The-Kubernetes-Network/ip-per-pod-kubernetes-cluster-diagram.jpg)

### Network Namespace in Pods

All containers in a pod share the same network namespace, meaning:

- One IP and one MAC address per pod.
- Shared interfaces, routing tables, firewall rules, and sockets.
- Intra-pod communication over `localhost`.

![The image illustrates a pod containing two containers, labeled "Container 1" and "Container 2," with a node labeled "Eth0 [IP Address]" below them.](https://kodekloud.com/kk-media/image/upload/v1752880337/notes-assets/images/Kubernetes-Networking-Deep-Dive-The-Kubernetes-Network/pod-with-two-containers-eth0-ip.jpg)

![The image illustrates the concept of network namespaces, showing a container within a pod, connected via a virtual Ethernet (veth) to the root network namespace on a node.](https://kodekloud.com/kk-media/image/upload/v1752880338/notes-assets/images/Kubernetes-Networking-Deep-Dive-The-Kubernetes-Network/network-namespaces-container-pod-diagram.jpg)

## Four Core Networking Challenges

Kubernetes addresses these four networking scenarios:

| Communication Type     | Description                                              |
| ---------------------- | -------------------------------------------------------- |
| Container-to-Container | Within the same pod via shared `localhost`.              |
| Pod-to-Pod             | Across nodes using pod IPs—no NAT required.              |
| Pod-to-Service         | Pods reach a stable Virtual IP (ClusterIP) for services. |
| External-to-Service    | External clients access `NodePort` or `LoadBalancer`.    |

Each resource type uses distinct IP ranges to avoid conflicts:

| Resource Type | IP Assignment Source                                  |
| ------------- | ----------------------------------------------------- |
| Pod           | CNI plugin–allocated from predefined pod CIDR pools   |
| Service       | kube-apiserver assigns cluster IPs from service CIDR  |
| Node          | Provided by infrastructure (DHCP, static, cloud APIs) |

![The image illustrates the IP address ranges within a Kubernetes cluster, showing the relationship between services, pods, and nodes.](https://kodekloud.com/kk-media/image/upload/v1752880339/notes-assets/images/Kubernetes-Networking-Deep-Dive-The-Kubernetes-Network/kubernetes-ip-address-ranges-illustration.jpg)

> [!important]
> **IP Range Overlaps**
>
> Ensure your pod CIDR and service CIDR do not overlap with each other or your physical network to prevent routing issues.

## Implementing the Networking Model with CNI

Kubernetes relies on the **Container Network Interface (CNI)** to provision and configure pod networking. The kubelet invokes a CNI plugin to:

- Create and manage virtual network interfaces (`veth`, `macvlan`, etc.)
- Allocate and assign pod IP addresses
- Program routes and firewall (iptables) rules
- Tear down networks when pods terminate

![The image illustrates the concept of Container Network Interface (CNI) with a logo and a diagram showing connections to virtual networks labeled with "IP."](https://kodekloud.com/kk-media/image/upload/v1752880340/notes-assets/images/Kubernetes-Networking-Deep-Dive-The-Kubernetes-Network/cni-logo-diagram-virtual-networks-ip.jpg)

### Comparing Popular CNI Plugins

| Plugin  | Use Case                             | Key Features                                            |
| ------- | ------------------------------------ | ------------------------------------------------------- |
| Calico  | Enterprise network policy & security | BGP routing, NetworkPolicy, IP-in-IP overlay            |
| Flannel | Simple pod overlay networking        | VXLAN, host-gateway modes                               |
| Weave   | Easy mesh networking                 | Automatic mesh, encryption, DNS service discovery       |
| Cilium  | High-performance, eBPF-based         | eBPF datapath, Kubernetes NetworkPolicy, Load Balancing |

![The image shows logos of different Container Network Interface (CNI) plugins: Calico, Flannel, Weave, and Cilium.](https://kodekloud.com/kk-media/image/upload/v1752880342/notes-assets/images/Kubernetes-Networking-Deep-Dive-The-Kubernetes-Network/cni-plugins-calico-flannel-weave-cilium.jpg)

## Next Steps

With the networking fundamentals in place, you’re ready to delve into advanced topics like network policies, ingress controllers, and service meshes. These components build on Kubernetes’ core networking model to provide security, observability, and traffic management.

## Links and References

- [Kubernetes Networking Concepts](https://kubernetes.io/docs/concepts/cluster-administration/networking/)
- [CNI Specification](https://www.cni.dev/)
- [Calico GitHub Repository](https://github.com/projectcalico/calico)
- [Flannel GitHub Repository](https://github.com/flannel-io/flannel)
- [Weaveworks Weave Net](https://github.com/weaveworks/weave)
- [Cilium GitHub Repository](https://github.com/cilium/cilium)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-networking/module/0ef9d5a8-532a-4e0a-8fdc-fc2845255bd7/lesson/359cdf6d-acbc-4887-ae70-458e84b75074)**
>
> Watch video content
