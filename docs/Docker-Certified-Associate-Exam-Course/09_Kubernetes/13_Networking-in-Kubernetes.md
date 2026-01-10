# Networking in Kubernetes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Kubernetes/Networking-in-Kubernetes)

---

## Table of Contents

- Networking in Kubernetes
  - Single-Node Cluster Networking
  - Multi-Node Cluster Networking
  - Links and References
  - Watch Video
    - Popular CNI Plugins

---

## Content

Docker Certified Associate Exam Course

Kubernetes

# Networking in Kubernetes

In this guide, you’ll learn the core concepts of Kubernetes networking—from a single-node setup to a multi-node cluster. We’ll cover how Pods receive IP addresses, why a Container Network Interface (CNI) plugin is required, and how Kubernetes builds a cluster-wide virtual network.

## Single-Node Cluster Networking

On a single-node cluster, the Kubernetes node itself has an IP address (e.g., `192.168.1.2`). You use this address to SSH into the host or connect to the API server. However, each Pod you create is allocated its own IP from a private Pod network—by default, something like `10.244.0.0/16`.

```
# Example Pod network CIDR
podCIDR: 10.244.0.0/16
```

When you spin up a Pod, Kubernetes assigns it an IP, such as `10.244.0.2`, which all containers in that Pod share.

![The image is a diagram titled "Kubernetes Networking - 101," illustrating how an IP address is assigned to a Kubernetes pod within a node.](https://kodekloud.com/kk-media/image/upload/v1752874011/notes-assets/images/Docker-Certified-Associate-Exam-Course-Networking-in-Kubernetes/kubernetes-networking-ip-assignment-diagram.jpg)

If you deploy several Pods on this node, each receives a unique IP in the same `10.244.0.0/16` range. They can communicate directly using these IPs:

![The image is a diagram illustrating Kubernetes networking, showing how IP addresses are assigned to pods within a node.](https://kodekloud.com/kk-media/image/upload/v1752874012/notes-assets/images/Docker-Certified-Associate-Exam-Course-Networking-in-Kubernetes/kubernetes-networking-ip-addresses-diagram.jpg)

> [!important]
> **Note**
>
> Pod IP addresses are ephemeral. When a Pod is deleted and recreated, it may receive a different IP.

## Multi-Node Cluster Networking

As your cluster scales to multiple nodes, each host must carve out a non-overlapping slice of the Pod network to avoid IP conflicts.

Consider two nodes:

- Host IP: `192.168.1.2` → Pod subnet `10.244.0.0/24`
- Host IP: `192.168.1.3` → Pod subnet `10.244.1.0/24`

Without a CNI plugin, Kubernetes does not set up inter-node Pod routing. A CNI plugin handles:

| Requirement | Description                                                |
| ----------- | ---------------------------------------------------------- |
| Pod-to-Pod  | All Pods communicate directly across nodes without NAT     |
| Node-to-Pod | Nodes can reach any Pod IP without SNAT                    |
| Pod-to-Node | Pods can reach any node IP address                         |
| Non-overlap | Each node gets a unique Pod subnet to prevent IP conflicts |

> [!important]
> **Warning**
>
> If you skip installing a proper CNI, Pods on different nodes may end up with overlapping IPs, causing connectivity failures.

### Popular CNI Plugins

| Plugin       | Type          | Description                                                  | Link                                                           |
| ------------ | ------------- | ------------------------------------------------------------ | -------------------------------------------------------------- |
| Calico       | Layer 3       | Advanced network policy, IP-in-IP or VXLAN overlay           | https://docs.projectcalico.org/                                |
| Flannel      | VXLAN/Host-gw | Simple overlay networking, ideal for labs and small clusters | https://github.com/flannel-io/flannel                          |
| Cilium       | eBPF          | High-performance networking, built-in security policies      | https://cilium.io/                                             |
| Weave Net    | VXLAN         | Automatic mesh networking, easy to deploy                    | https://www.weave.works/docs/net/latest/kubernetes/kube-addon/ |
| Cisco ACI    | SDN           | Enterprise-grade, integrates with Cisco data center fabrics  | https://developer.cisco.com/docs/aci/                          |
| VMware NSX-T | SDN           | Micro-segmentation, multi-cloud networking                   | https://docs.vmware.com/en/VMware-NSX-T/index.html             |

Once your CNI is in place, each node’s CNI daemon (e.g., `flanneld` or `calico-node`) allocates a unique `/24` Pod subnet and programs the host routes. The result is a seamless overlay network:

![The image illustrates a Kubernetes cluster networking setup, showing two nodes with pods, each having specific IP addresses, connected through routing.](https://kodekloud.com/kk-media/image/upload/v1752874014/notes-assets/images/Docker-Certified-Associate-Exam-Course-Networking-in-Kubernetes/kubernetes-cluster-networking-setup.jpg)

With this virtual network, Pods on different nodes can communicate directly using stable Pod IPs, satisfying Kubernetes’ flat network model.

## Links and References

- [Kubernetes Networking Concepts](https://kubernetes.io/docs/concepts/cluster-administration/networking/)
- [Container Network Interface (CNI)](https://github.com/containernetworking/cni)
- [Flannel GitHub Repository](https://github.com/flannel-io/flannel)
- [Calico Documentation](https://docs.projectcalico.org/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/d9358627-4fc7-4acc-ab96-fa25232555c6/lesson/0dd6c125-6564-4328-99fd-aefe2b07f95c)**
>
> Watch video content
