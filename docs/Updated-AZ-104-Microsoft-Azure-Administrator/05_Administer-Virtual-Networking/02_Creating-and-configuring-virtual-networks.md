# Creating and configuring virtual networks - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Virtual-Networking/Creating-and-configuring-virtual-networks)

---

## Table of Contents

- Creating and configuring virtual networks
  - Virtual Network Overview
  - Key Concepts in Virtual Networks
  - Watch Video
  - Practice Lab
    - 1. Azure Subscription and Regions
    - 2. Address Space and Subnets
    - 3. VNet Connectivity

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Virtual Networking

# Creating and configuring virtual networks

Virtual networks (VNets) are a cornerstone of cloud infrastructure, providing an isolated network environment that enables the provisioning and management of scalable, secure network resources. In Azure, a VNet is the fundamental building block that allows virtual machines, applications, and other services to communicate safely with each other, with the internet, and with on-premises networks. Essentially, a VNet creates a private section of the cloud dedicated exclusively to your use.

As illustrated in the diagram below, two distinct virtual networks are depicted, each assigned its own address space and divided further into subnets. This design lets you customize your network by defining IP ranges, subnets, route tables, network gateways, and more, effectively replicating the structure of an on-premises network. This capability is especially advantageous for hybrid cloud scenarios.

![The image illustrates a diagram of virtual networks, showing two virtual networks with subnets containing Linux and Windows virtual machines, connected to an on-premises setup. It includes a legend explaining symbols for cloud network representation, dedicated instances, hybrid scenarios, and Azure services connectivity.](https://kodekloud.com/kk-media/image/upload/v1752884807/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Creating-and-configuring-virtual-networks/virtual-networks-diagram-linux-windows.jpg)

In many real-world configurations, cloud-based virtual networks connect seamlessly with on-premises networks. While the diagram simplifies this connectivity, additional components such as route tables, VPN Gateways, and often ExpressRoute (covered in advanced materials) typically play a role in establishing secure connections between your cloud resources and on-premises infrastructure.

The flexibility of VNets stands as one of their greatest strengths. By segmenting a VNet into multiple subnets, you can effectively organize and secure your resources. Features like Network Security Groups (NSGs) and traffic routing through a firewall further enable you to tailor your network infrastructure to the specific needs of your applications and workloads.

In the following sections, we will explore how to create virtual networks, configure address spaces and DNS settings, implement route tables, set up hybrid connectivity, and enable communication between virtual networks.

## Virtual Network Overview

A virtual network in Azure is a logical construct that mirrors an on-premises network, yet it exists entirely in the cloud. Each Azure VNet is private and dedicated, with IP addresses drawn from RFC 1918 private ranges (for example, 10.0.0.0/8).

Consider it similar to a home router setup, where your devices (PCs, tablets, smartphones) are assigned IP addresses by a router. Even if adjacent networks use the same default IP range, they remain isolated and independent. In the context of VNets, this separation is maintained even when identical IP ranges are in use across different networks, unless you deliberately establish connectivity through VPN Gateways or similar methods.

VNets enable connectivity for Azure Virtual Machines and services, providing access to both the internet and on-premises networks. The diagram below visually represents these concepts:

![The image illustrates virtual network concepts, showing a virtual network with three subnets: GatewaySubnet, frontendSubnet, and databaseSubnet, each with specific IP ranges.](https://kodekloud.com/kk-media/image/upload/v1752884809/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Creating-and-configuring-virtual-networks/virtual-network-subnets-diagram.jpg)

## Key Concepts in Virtual Networks

### 1\. Azure Subscription and Regions

Before creating a VNet, you must have an Azure Subscription. Azure services are generally deployed regionally, with each region hosting multiple data centers organized into availability zones to ensure redundancy and high availability. Deploying VNets within a specific region not only maintains data sovereignty but also helps you meet regional regulatory standards.

### 2\. Address Space and Subnets

Every VNet in Azure comes with an address space defined by public or more commonly by private IP addresses (typically adhering to RFC 1918). It is crucial to ensure that the VNet's address space does not overlap with those of other VNets or your on-premises network, as overlapping can lead to routing conflicts.

Subnets are logical subdivisions of a VNet, allowing you to partition network resources into manageable segments. You can allocate a portion of the VNet’s IP address range to each subnet and designate them for specific functions—for example:

| Subnet Type      | Typical Usage                                |
| ---------------- | -------------------------------------------- |
| Front-end Subnet | Hosting web servers                          |
| Database Subnet  | Running SQL databases                        |
| Gateway Subnet   | Managing VPN connectivity and other gateways |

### 3\. VNet Connectivity

VNets not only facilitate internal secure communication between Azure services but also enable connectivity to on-premises networks and even other cloud providers. This is most often achieved using VPN Gateways or ExpressRoute. While a deep dive into ExpressRoute is available in advanced materials, it is helpful to grasp its basic role in linking cloud resources with on-premises infrastructure.

> [!important]
> **Note**
>
> When planning your network configuration, ensure that the address space and subnet divisions are carefully designed to avoid overlaps and potential routing conflicts.

In summary, virtual networks are instrumental in:

- Facilitating secure communication between Azure Virtual Machines and services.
- Enabling Azure VMs to access the internet securely.
- Supporting connectivity between cloud-based resources and on-premises networks.

This lesson lays the foundation for a more detailed exploration of these topics. Up next, we will delve into private versus public IP addresses within VNets and analyze how these concepts influence network connectivity and design.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/809fc274-7871-4b13-8f85-052b43442c81/lesson/c3f13966-7b47-405e-b262-94fb412eeda5)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/809fc274-7871-4b13-8f85-052b43442c81/lesson/dbb424ff-711c-4692-9dd2-567bd835ac01)**
>
> Practice lab
