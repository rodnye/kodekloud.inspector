# Networking - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-EKS/EKS-Fundamentals/Networking)

---

## Table of Contents

- Networking
  - Flat Networking in Kubernetes
  - AWS VPC and Subnets
  - Nodes, ENIs, and API Server Connectivity
  - Pod IP Allocation with AWS VPC CNI
  - Overlay Networking Alternatives
  - Managing IP Consumption
  - Links and References
  - Watch Video

---

## Content

AWS EKS

EKS Fundamentals

# Networking

In this lesson, we’ll dive into how Kubernetes networking works on AWS, why a flat pod network is essential for Amazon EKS, and how VPCs, ENIs, and various CNI plugins shape your cluster’s IP management. Understanding these concepts will help you design resilient, scalable EKS deployments.

## Flat Networking in Kubernetes

Kubernetes mandates a flat pod network: every pod must have a unique IP and be able to reach any other pod directly, without NAT or VLANs. All segmentation and isolation occur via higher-level constructs like NetworkPolicies.

![The image illustrates the concept of "Flat Networking" with two labeled layers: "Segmentation and Isolation" and "Networking."](https://kodekloud.com/kk-media/image/upload/v1752862786/notes-assets/images/AWS-EKS-Networking/flat-networking-segmentation-isolation-diagram.jpg)

This stands in contrast to traditional three-tier architectures, where web, app, and database tiers each live in separate subnets. In Kubernetes, pods share a single IP space, and you enforce fine-grained controls using native policies.

## AWS VPC and Subnets

AWS uses a Virtual Private Cloud (VPC) as your networking boundary. Inside a VPC, subnets carve out IP ranges for resources.

Example:

- VPC CIDR: `10.10.0.0/16`
- Subnet CIDR: `10.10.1.0/24` (≈250 usable IPs after AWS reservations)

> [!important]
> **Note**
>
> Choose subnet CIDRs with enough headroom for both node ENIs and pod IP assignments when using the AWS VPC CNI.

## Nodes, ENIs, and API Server Connectivity

Each EKS node (EC2 instance) attaches an Elastic Network Interface (ENI) in your VPC. AWS also adds a cross-account ENI (X-ENI) so nodes can reach the Amazon-hosted control plane:

- **Node ENI**  
  Assigned dynamically to each worker node for VPC communications.
- **X-ENI**  
  Enables secure API traffic from your nodes to the EKS control plane outside your account.

When a node starts, it authenticates against the API server via its ENI, with traffic routed through the X-ENI.

## Pod IP Allocation with AWS VPC CNI

The [AWS VPC CNI plugin](https://github.com/aws/amazon-vpc-cni-k8s) assigns each pod an IP from your VPC subnet by adding secondary IPs to the node’s ENI. Internally, the Linux kernel routes those addresses into pod network namespaces.

Key characteristics:

- 1 VPC IP per pod
- Up to N secondary IPs per ENI (instance-type dependent)
- Leverages AWS’s network fabric—no overlays or tunnels required

## Overlay Networking Alternatives

If you’d rather not consume VPC IPs for pods, consider overlay CNIs such as Flannel, Cilium, or Calico. They allocate pod IPs from an independent CIDR and encapsulate traffic between nodes.

![The image illustrates an overlay network setup within a VPC, featuring a public subnet with a pod, IP addresses, and references to Cilium and Calico.](https://kodekloud.com/kk-media/image/upload/v1752862787/notes-assets/images/AWS-EKS-Networking/vpc-overlay-network-cilium-calico-pod.jpg)

| Plugin      | Pod IP Source | Overlay | Encapsulation Overhead  |
| ----------- | ------------- | ------- | ----------------------- |
| AWS VPC CNI | VPC subnet    | No      | Low                     |
| Flannel     | Custom CIDR   | Yes     | Medium (VXLAN)          |
| Cilium      | Custom CIDR   | Yes     | Variable (e.g., Geneve) |
| Calico      | Custom CIDR   | Yes     | Low (IP-in-IP)          |

Pros of overlays:

- Preserve VPC IP space
- Decouple pod addressing from VPC design

Cons:

- Extra encapsulation latency
- Additional configuration and monitoring

## Managing IP Consumption

When using the AWS VPC CNI, plan your subnet sizes and pods-per-node carefully. Each ENI has a maximum number of secondary IPs—and network throughput limits are tied to instance type.

> [!important]
> **Warning**
>
> Exhausting your subnet’s IP pool will prevent new pods from scheduling. Monitor `kubectl describe node` for IP allocations and right-size your VPC ranges accordingly.

![The image is a diagram illustrating a VPC with a public subnet containing a pod, showing multiple IP addresses and an X-ENI connection.](https://kodekloud.com/kk-media/image/upload/v1752862788/notes-assets/images/AWS-EKS-Networking/vpc-public-subnet-pod-diagram.jpg)

---

## Links and References

- [Amazon VPC CNI Plugin for Kubernetes (GitHub)](https://github.com/aws/amazon-vpc-cni-k8s)
- [Flannel GitHub Repository](https://github.com/flannel-io/flannel)
- [Cilium Networking](https://cilium.io/)
- [Project Calico](https://www.projectcalico.org/)
- [Kubernetes Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-eks/module/b84e1a30-d946-4325-96d8-f457dd1817f8/lesson/d8d7f570-4538-42d4-84a2-f07ec2cc8b5d)**
>
> Watch video content
