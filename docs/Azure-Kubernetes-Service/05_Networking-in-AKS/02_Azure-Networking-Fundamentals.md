# Azure Networking Fundamentals - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Azure-Kubernetes-Service/Networking-in-AKS/Azure-Networking-Fundamentals)

---

## Table of Contents

- Azure Networking Fundamentals
  - Table of Contents
  - Virtual Networks (VNets) & CIDR Notation
  - Subnets
  - Network Security Groups (NSGs)
  - Route Tables & User-Defined Routes (UDRs)
  - VNet Peering
  - Quick Reference
  - Links and References
  - Watch Video

---

## Content

Azure Kubernetes Service

Networking in AKS

# Azure Networking Fundamentals

In this lesson, we’ll explore Azure’s core networking components—Virtual Networks (VNets), CIDR addressing, subnets, Network Security Groups (NSGs), Route Tables, and User-Defined Routes (UDRs). These building blocks form the foundation of secure, scalable networking for Azure Kubernetes Service (AKS).

## Table of Contents

1.  [Virtual Networks (VNets) & CIDR Notation](#virtual-networks-vnets--cidr-notation)
2.  [Subnets](#subnets)
3.  [Network Security Groups (NSGs)](#network-security-groups-nsgs)
4.  [Route Tables & User-Defined Routes (UDRs)](#route-tables--user-defined-routes-udrs)
5.  [VNet Peering](#vnet-peering)
6.  [Quick Reference](#quick-reference)
7.  [Links and References](#links-and-references)

## Virtual Networks (VNets) & CIDR Notation

A **Virtual Network (VNet)** provides an isolated, private IP address space in Azure. VNets support both IPv4 and IPv6; this guide focuses on IPv4.

We define address ranges using **Classless Inter-Domain Routing (CIDR)** notation, which combines an IP address with its subnet mask.

Example CLI:

```
# Create a VNet with a /16 CIDR block (up to 65,534 addresses)
az network vnet create \
  --resource-group MyResourceGroup \
  --name VNet1 \
  --address-prefixes 10.2.0.0/16
```

> [!important]
> **Note**
>
> Use IP address management (IPAM) tools or Azure’s built-in features to plan non-overlapping CIDR blocks across multiple VNets.

## Subnets

A **subnet** segments your VNet’s address space into smaller networks, enabling you to group and isolate resources like VMs or AKS nodes.

Example CLI:

```
# Create two /24 subnets within VNet1
az network vnet subnet create \
  --resource-group MyResourceGroup \
  --vnet-name VNet1 \
  --name SubnetA \
  --address-prefixes 10.2.1.0/24


az network vnet subnet create \
  --resource-group MyResourceGroup \
  --vnet-name VNet1 \
  --name SubnetB \
  --address-prefixes 10.2.2.0/24
```

> [!important]
> **Warning**
>
> Subnets within the same VNet must not have overlapping CIDR ranges.

## Network Security Groups (NSGs)

A **Network Security Group (NSG)** acts as a virtual firewall at the subnet or NIC level. NSGs include inbound and outbound rules to allow or deny traffic based on source/destination IP, port, and protocol.

Example CLI:

```
# Create an NSG and attach it to SubnetA
az network nsg create \
  --resource-group MyResourceGroup \
  --name MyNSG


az network vnet subnet update \
  --resource-group MyResourceGroup \
  --vnet-name VNet1 \
  --name SubnetA \
  --network-security-group MyNSG
```

> [!important]
> **Note**
>
> Azure NSGs include default rules permitting VNet-to-VNet traffic and outbound internet traffic. Customize NSGs to enforce your security policies.

## Route Tables & User-Defined Routes (UDRs)

A **Route Table** is a set of routes that control packet forwarding within a VNet. Azure populates it with:

- **System routes** (default Azure routes)
- **BGP routes** (learned via ExpressRoute or VPN)
- **User-Defined Routes (UDRs)**

UDRs let you override default routing—for instance, to direct traffic through a firewall appliance.

Example CLI:

```
# Create a route table
az network route-table create \
  --resource-group MyResourceGroup \
  --name MyRouteTable


# Add a UDR to route all internet-bound traffic via a virtual appliance
az network route-table route create \
  --resource-group MyResourceGroup \
  --route-table-name MyRouteTable \
  --name InternetRoute \
  --address-prefix 0.0.0.0/0 \
  --next-hop-type VirtualAppliance \
  --next-hop-ip-address 10.2.1.4


# Associate the route table with SubnetA
az network vnet subnet update \
  --resource-group MyResourceGroup \
  --vnet-name VNet1 \
  --name SubnetA \
  --route-table MyRouteTable
```

## VNet Peering

To enable low-latency, high-bandwidth connectivity between VNets (within or across regions), configure **VNet Peering**.

Example CLI:

```
# Peer VNet1 with VNet2
az network vnet peering create \
  --name VNet1-to-VNet2 \
  --resource-group MyResourceGroup \
  --vnet-name VNet1 \
  --remote-vnet /subscriptions/.../resourceGroups/MyResourceGroup/providers/Microsoft.Network/virtualNetworks/VNet2 \
  --allow-vnet-access
```

![The image shows a diagram of three virtual networks (VNet1, VNet2, VNet3), each containing two subnets with network security groups and other components.](https://kodekloud.com/kk-media/image/upload/v1752869496/notes-assets/images/Azure-Kubernetes-Service-Azure-Networking-Fundamentals/virtual-networks-diagram-subnets-security-groups.jpg)

## Quick Reference

| Component   | Description                                        | CLI Example                                                                                                                                                                |
| ----------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| VNet        | Private IP address space                           | `az network vnet create --resource-group RG --name VNet1 --address-prefixes 10.2.0.0/16`                                                                                   |
| Subnet      | Subdivision of a VNet                              | `az network vnet subnet create --resource-group RG --vnet-name VNet1 --name SubnetA --address-prefixes 10.2.1.0/24`                                                        |
| NSG         | Virtual firewall                                   | `az network nsg create --resource-group RG --name MyNSG`                                                                                                                   |
| Route Table | Collection of system, BGP, and user-defined routes | `az network route-table create --resource-group RG --name MyRouteTable`                                                                                                    |
| Route       | Custom path (UDR)                                  | `az network route-table route create --resource-group RG --route-table-name MyRouteTable --name InternetRoute --address-prefix 0.0.0.0/0 --next-hop-type VirtualAppliance` |

## Links and References

- [Azure Virtual Networks](https://docs.microsoft.com/azure/virtual-network/virtual-networks-overview)
- [CIDR Notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing)
- [Azure Network Security Groups](https://docs.microsoft.com/azure/virtual-network/network-security-groups-overview)
- [Azure Route Tables & UDRs](https://docs.microsoft.com/azure/virtual-network/virtual-networks-udr-overview)
- [Virtual Network Peering](https://docs.microsoft.com/azure/virtual-network/virtual-network-peering-overview)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/azure-kubernetes-service/module/96320ff1-0141-4a5f-ab22-ed42e7995612/lesson/557470cd-bffb-49db-9376-30ca8743e3ab)**
>
> Watch video content
