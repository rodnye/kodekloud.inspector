# AKS Networking Options - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Azure-Kubernetes-Service/Networking-in-AKS/AKS-Networking-Options)

---

## Table of Contents

- AKS Networking Options
  - Kubenet Overview
  - Azure CNI Overview
  - How Azure CNI Works
  - Comparing Kubenet and Azure CNI
  - Links and References
  - Watch Video
    - When to Use Each Plugin

---

## Content

Azure Kubernetes Service

Networking in AKS

# AKS Networking Options

When you provision an Azure Kubernetes Service (AKS) cluster, selecting the right network plugin is crucial for performance, security, and scalability. AKS supports two primary options:

- **Kubenet** (Basic): Uses separate address spaces for nodes and pods, with NAT and user-defined routes (UDRs).
- **Azure CNI** (Advanced): Integrates pods directly into your Azure Virtual Network (VNet), assigning them first-class IPs.

Both plugins install automatically on each node during cluster creation and handle pod-to-node and inter-node communication.

---

## Kubenet Overview

With Kubenet, AKS allocates node IPs from your VNet subnet and assigns pods to a secondary, logically distinct address space (by default a /24 per node). Outbound traffic from pods uses SNAT on the node IP, and inter-node pod traffic flows via UDRs you configure.

![The image illustrates networking options for AKS using KubeNet, showing two virtual machines (VM1 and VM2) each with two pods, connected through specific IP addresses and a UDR (User Defined Route).](https://kodekloud.com/kk-media/image/upload/v1752869489/notes-assets/images/Azure-Kubernetes-Service-AKS-Networking-Options/aks-kubenet-networking-options-diagram.jpg)

For example, pod1 on VM1 sending packets to pod1 on VM2 is routed through a UDR on Subnet1, directing traffic to VM2, which then forwards to the target pod.

When pods access external resources, AKS applies SNAT:

![The image illustrates networking options for AKS (Azure Kubernetes Service) using KubeNet, showing an AKS cluster with virtual machines and pods, and a frontend-backend network setup with SNAT (Source Network Address Translation).](https://kodekloud.com/kk-media/image/upload/v1752869490/notes-assets/images/Azure-Kubernetes-Service-AKS-Networking-Options/aks-networking-options-kubenet-diagram.jpg)

In this scenario, a pod with IP `192.168.1.4` reaching a VM in another VNet (`10.10.1.1`) appears as the node’s IP and port to the destination.

> [!important]
> **Warning**
>
> Ensure your subnet and SNAT port allocation can handle peak pod-to-external flows. SNAT port exhaustion can disrupt outbound connectivity.

---

## Azure CNI Overview

Azure CNI integrates directly into your Azure VNet, assigning both nodes and pods IPs from the same subnet. Pods become first-class citizens on the VNet, enabling native routing to other Azure services, on-premises systems, and peered VNets (subject to NSGs/UDRs).

![The image is a diagram illustrating Azure CNI (Container Networking Interface) connectivity, showing how containers connect to Azure services, the internet, peer virtual networks, and on-premise systems. It includes icons representing various components like containers, virtual machines, and service endpoints.](https://kodekloud.com/kk-media/image/upload/v1752869491/notes-assets/images/Azure-Kubernetes-Service-AKS-Networking-Options/azure-cni-connectivity-diagram.jpg)

Key benefits:

- **Native IPs** for pods—no SNAT for intra-VNet traffic.
- **Automatic NSG/UDR enforcement** on pod interfaces.
- **Compatibility** with Ingress controllers, DNS, Kubernetes Network Policies, and Windows Server node pools.

> [!important]
> **Note**
>
> Plan VNet size carefully: Azure CNI consumes one IP per pod. A /24 supports up to 250 pods per node, so allocate your address space accordingly.

---

## How Azure CNI Works

Azure CNI implements the [CNI spec](https://github.com/containernetworking/cni) with two modules:

1.  **Networking**: Attaches a virtual network interface (vNIC) to each container.
2.  **IP Address Management (IPAM)**: Allocates/deallocates IPs from the subnet pool.

![The image is a diagram titled "CNI Modules," showing that CNI includes "Networking" and "IP Address Management (IPAM)" as components.](https://kodekloud.com/kk-media/image/upload/v1752869492/notes-assets/images/Azure-Kubernetes-Service-AKS-Networking-Options/cni-modules-networking-ipam-diagram.jpg)

At cluster creation, Azure reserves a pool of secondary IPs on each node’s NIC equal to your max pods-per-node setting (e.g., 30 secondary IPs for 30 pods). When a container starts, Azure CNI assigns an IP from this pool to the pod’s vNIC; it returns to the pool on termination.

Under the hood, a VNet bridge orchestrates these assignments:

![The image illustrates IP management in a network interface (NIC) with a VNet bridge, showing multiple IP addresses (IP0, IP1, IP2, IP3) and indicating Azure's support for 250 containers per pod/VM and 64,000 IPs per VNet.](https://kodekloud.com/kk-media/image/upload/v1752869494/notes-assets/images/Azure-Kubernetes-Service-AKS-Networking-Options/ip-management-network-interface-vnet-bridge.jpg)

Azure currently supports up to **250 pods per node** and **64,000 IP addresses per VNet** (a /16).

---

## Comparing Kubenet and Azure CNI

![The image is a comparison table between Kubenet and CNI, detailing their capabilities in areas like cluster deployment, connectivity, and network policies. It highlights differences in support for features such as virtual nodes and multiple clusters sharing one subnet.](https://kodekloud.com/kk-media/image/upload/v1752869495/notes-assets/images/Azure-Kubernetes-Service-AKS-Networking-Options/kubenet-cni-comparison-table-capabilities.jpg)

| Feature                   | Kubenet                                    | Azure CNI                   |
| ------------------------- | ------------------------------------------ | --------------------------- |
| Pod IP allocation         | Secondary network (/24 per node)           | First-class VNet IP         |
| Outbound NAT              | SNAT on node IP                            | No SNAT for VNet traffic    |
| NSG & UDR enforcement     | Nodes only                                 | Pods and nodes              |
| Max pods per node         | Limited by secondary CIDR (/24 ≈ 250 pods) | Up to 250 pods per node     |
| Windows Server node pools | Supported                                  | Supported (only CNI option) |
| Virtual nodes             | Not supported                              | Supported                   |

### When to Use Each Plugin

| Use Case                             | Recommended Plugin |
| ------------------------------------ | ------------------ |
| Limited VNet address space           | Kubenet            |
| No need for pod inbound connectivity | Kubenet            |
| Can tolerate SNAT overhead           | Kubenet            |
| Pods require direct VNet routing     | Azure CNI          |
| Advanced Azure Network Policies      | Azure CNI          |
| Virtual nodes or Windows pools       | Azure CNI          |

---

## Links and References

- [Kubernetes CNI Plugins](https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/network-plugins/)
- [AKS Networking Documentation](https://docs.microsoft.com/azure/aks/concepts-network)
- [Azure Virtual Network](https://docs.microsoft.com/azure/virtual-network/)
- [Container Networking Interface (CNI) Spec](https://github.com/containernetworking/cni)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/azure-kubernetes-service/module/96320ff1-0141-4a5f-ab22-ed42e7995612/lesson/cc3a1b75-9f93-4e0d-bb67-2e3f2d2d994b)**
>
> Watch video content
