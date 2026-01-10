# Design for network connectivity - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-network-architecture/Design-for-network-connectivity)

---

## Table of Contents

- Design for network connectivity
  - Design Topology
  - Designing Outbound Connectivity
  - Managing Routing in Azure
  - Watch Video
    - 1. Single Network Approach
    - 2. Multiple Peer Networks
    - 3. Hub-Spoke Architecture
    - 1. Azure Firewall
    - 2. Azure Load Balancer
    - 3. NAT Gateway
    - System Routes
    - User-Defined Routes (UDRs)

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a network architecture

# Design for network connectivity

In this lesson, we explore the fundamentals of designing network connectivity in Azure. We will review the connectivity options available for a virtual network, including communication between Azure resources, connections between on-premises networks and Azure, and methods to control both inbound and outbound traffic.

We begin by outlining connectivity between your on-premises network and your Azure virtual network. Typically, your on-premises environment connects to an Azure virtual network that may include subnets for virtual machines and a dedicated gateway subnet housing a VPN gateway. On the on-premises side, a corresponding gateway facilitates secure connections to Azure.

Connectivity options discussed in this lesson include:

- Communication among resources within the Azure virtual network.
- Connection to resources in separate virtual networks via virtual network peering or VNet-to-VNet VPN gateway connections.
- Secure connections from on-premises devices to Azure with site-to-site VPN or point-to-site VPN for remote users.
- Outbound connectivity to the internet.

An illustrative diagram below highlights these connectivity options:

![The image illustrates a network connectivity design, showing connections between on-premises infrastructure and Azure virtual networks, including gateway and workload subnets, with various connectivity options.](https://kodekloud.com/kk-media/image/upload/v1752867070/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-network-connectivity/network-connectivity-azure-design.jpg)

This lesson also covers topics such as controlling outbound traffic, inter-VNet communication, and managing resource-to-subnet communication.

---

## Design Topology

Next, we examine various network topology patterns available in Azure. There are three primary approaches to consider:

### 1\. Single Network Approach

In the Single Network Approach, all resources (such as those for a three-tier application) are deployed within a single virtual network. Isolation is achieved using subnet segmentation—for example, dividing a virtual network into frontend, mid-tier, and database subnets. Since these subnets reside within the same virtual network, system routes automatically allow inter-subnet communication without extra configuration.

![The image illustrates a network topology diagram for a single network approach within an Azure region, showing a virtual network segmented into frontend, mid, and database subnets.](https://kodekloud.com/kk-media/image/upload/v1752867071/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-network-connectivity/azure-network-topology-diagram.jpg)

### 2\. Multiple Peer Networks

This topology involves deploying workloads across multiple virtual networks that communicate via Virtual Network Peering. By leveraging the Microsoft Backbone network, virtual network peering ensures low-latency communication, which is particularly beneficial for scenarios like database failover or high-volume transactions.

![The image illustrates a network topology design with multiple peered networks across Azure Regions A and B, showing virtual networks and subnets connected through virtual network peering.](https://kodekloud.com/kk-media/image/upload/v1752867072/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-network-connectivity/network-topology-azure-peering.jpg)

### 3\. Hub-Spoke Architecture

Widely adopted in enterprise environments, the Hub-Spoke Architecture centralizes connectivity in a hub (either a virtual network or a virtual WAN), which then connects to multiple spokes. Spokes represent additional virtual networks that link to the central hub via virtual network peering or VPN gateways. The hub can also peer with other hubs across regions, enabling efficient cross-region communication.

![The image illustrates a hub-spoke network architecture across two Azure regions, showing centralized hubs connected to multiple spokes. It includes a brief description of deploying workloads in this topology.](https://kodekloud.com/kk-media/image/upload/v1752867072/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-network-connectivity/hub-spoke-network-architecture-azure.jpg)

---

## Designing Outbound Connectivity

Managing outbound connectivity is key to controlling how your virtual network accesses external resources. Azure offers three primary options:

### 1\. Azure Firewall

Azure Firewall can centralize outbound traffic management by forcing all outbound traffic through a secure firewall. By configuring a user-defined route (UDR) that directs traffic through the firewall, organizations can enforce security policies and monitor traffic effectively.

### 2\. Azure Load Balancer

Using an Azure Load Balancer, you can set up outbound rules that determine how outbound traffic is routed. This method allows for load-balanced management of connections from your virtual network to the internet.

### 3\. NAT Gateway

A NAT Gateway simplifies outbound connectivity by translating private IP addresses into a set of defined public IP addresses. When resources within a subnet pass outbound traffic through a NAT gateway, external destinations see only the gateway’s public IPs—similar to how a home router works.

For example, deploying a NAT gateway on subnet A (or multiple subnets like A and B) ensures that all outbound traffic from those subnets is translated to the NAT gateway’s public IP addresses.

> [!important]
> **Key Benefits of NAT Gateway**
>
> - Security: Eliminates the need for individual public IP addresses on resources.
> - Resiliency: Fully platform-managed, eliminating single points of failure.
> - Scalability: Automatically scales across multiple fault domains.
> - Performance: Maintains high network bandwidth.

![The image is an infographic about designing outbound connectivity using a NAT Gateway, highlighting its security, resiliency, scalability, and performance benefits, along with a diagram showing its integration with subnets in a virtual network.](https://kodekloud.com/kk-media/image/upload/v1752867074/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-network-connectivity/nat-gateway-outbound-connectivity-infographic.jpg)

Overall, NAT gateways are preferred for their ease of deployment and strong performance characteristics.

---

## Managing Routing in Azure

Routing within an Azure virtual network determines how traffic is directed between resources and external networks. Azure leverages route tables to implement routing policies, similar to routing used by traditional networking devices. There are two primary types of routes:

### System Routes

When a virtual network is created in Azure, system routes are automatically configured. These routes facilitate communication between subnets, enable internet access for virtual machines, and even extend to peer virtual networks. For example, Windows machines receive system routes that allow them to download updates without additional configuration.

### User-Defined Routes (UDRs)

In cases where the default routing behavior needs modification, you can create User-Defined Routes (UDRs) to manually override system routes. UDRs allow traffic to be custom-routed—for instance, sending all outbound traffic through an Azure Firewall. To implement a UDR, add it to a route table and then associate it with a specific subnet or network interface.

The priority of routing is as follows:

| Priority Level           | Description                                        |
| ------------------------ | -------------------------------------------------- |
| 1\\. User-Defined Routes | Highest precedence for custom configurations       |
| 2\\. BGP Routes          | Applied when using Border Gateway Protocol routing |
| 3\\. System Routes       | Default routes provided by Azure                   |

![The image explains the concept of designing routing in a virtual network using Azure, illustrating system routes and user-defined routes with diagrams of network subnets and connections. It highlights how traffic is managed and routed within the network infrastructure.](https://kodekloud.com/kk-media/image/upload/v1752867075/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-network-connectivity/azure-virtual-network-routing-diagram.jpg)

By combining system routes with UDRs, you gain robust control over the traffic flows within your Azure environment.

---

With a thorough understanding of connectivity options, network topology designs, outbound connectivity strategies, and Azure routing mechanisms, you are well-equipped to design and manage a secure and efficient network infrastructure in Azure. Future content will delve into design considerations for application delivery, further enhancing your solutions architecture.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/61e4ebd3-ea7b-4ade-94f7-e203f93b60c9/lesson/962598e9-2f6b-4405-bdab-079e84fd9db5)**
>
> Watch video content
