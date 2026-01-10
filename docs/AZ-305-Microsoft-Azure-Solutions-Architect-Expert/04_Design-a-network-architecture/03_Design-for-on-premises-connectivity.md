# Design for on premises connectivity - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-network-architecture/Design-for-on-premises-connectivity)

---

## Table of Contents

- Design for on premises connectivity
  - VPN Connection
  - ExpressRoute Connection
  - ExpressRoute with VPN Failover
  - Hub-Spoke Architecture
  - Hub-Spoke Architecture with Virtual WAN
  - Summary
  - Watch Video

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a network architecture

# Design for on premises connectivity

This article provides a comprehensive guide on designing connectivity from an on-premises environment to Azure. We explore the two primary methods—VPN Gateway and ExpressRoute—and explain how connectivity works along with essential design principles such as hub-spoke architecture and Virtual WAN.

---

## VPN Connection

A VPN connection creates an encrypted communication channel over the public Internet using site-to-site or point-to-site configurations. Typically, the deployment involves both an Azure Virtual Network and an on-premises network. Gateways are deployed on each side, and a site-to-site connection is configured using a shared pre-shared key (PSK). This bidirectional connection enables seamless communication between Azure VMs and on-premises infrastructure.

In many implementations, a dedicated bastion subnet is used to host Azure Bastion, which facilitates secure RDP or SSH access to VMs. It is crucial to plan dedicated subnets—such as the gateway subnet and bastion subnet—to support different workloads.

Key benefits of a VPN connection include:

- Simplicity of setup: Once the VPN gateway is deployed, configuration only requires referencing the on-premises gateway from Azure, and vice versa.
- Consistent security: The use of a pre-shared key on both ends ensures robust encryption.
- Flexible throughput options: Depending on the chosen SKU, throughput can range from around 50 Mbps with lower SKUs to up to 10 gigabits per second with higher SKUs.

However, there are several challenges to be aware of:

- An on-premises VPN device or router is required for establishing a site-to-site connection. Note that point-to-site connections, while easier to manage, have limitations on the number of concurrent connections.
- Deploying a gateway can take approximately 30 to 40 minutes.

![The image is a diagram illustrating a VPN connection between an on-premises network and an Azure virtual network, highlighting the pros and cons of the setup.](https://kodekloud.com/kk-media/image/upload/v1752867090/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-on-premises-connectivity/vpn-connection-azure-diagram.jpg)

> [!important]
> **Quick Tip**
>
> For smoother deployment, verify that your on-premises VPN device meets the compatibility requirements with Azure VPN gateways.

---

## ExpressRoute Connection

ExpressRoute offers a dedicated, private connection between your on-premises environment and Azure. Although the basic network architecture remains similar—with both an on-premises network and an Azure Virtual Network—the gateway subnet is configured with an ExpressRoute gateway instead of a VPN gateway. This design leverages a connectivity provider available in your region. A circuit is established between local edge routers and Microsoft Edge routers, ensuring a secure and high-speed bidirectional connection.

Advantages of using ExpressRoute include:

- Higher throughput: ExpressRoute delivers greater bandwidth compared to traditional VPN connections.
- Private connection: By bypassing the public Internet, ExpressRoute enhances both performance and security.
- Dynamic bandwidth scaling: Bandwidth can be scaled dynamically with the right connectivity provider, optimizing costs.
- Support for ExpressRoute Direct: In select regions, direct connections are available, providing even more streamlined connectivity.

Be mindful of the following trade-offs:

- Dependency on third-party providers: Collaboration with a connectivity provider is required, adding complexity to the configuration process.
- Specialized on-premises equipment: High-bandwidth devices that support ExpressRoute connectivity are needed, which might increase costs.

![The image is a diagram illustrating an ExpressRoute connection between an on-premises network and an Azure virtual network, highlighting components like gateways, subnets, and routers. It includes pros and cons of using ExpressRoute for dedicated private connections.](https://kodekloud.com/kk-media/image/upload/v1752867091/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-on-premises-connectivity/expressroute-connection-diagram-azure.jpg)

---

## ExpressRoute with VPN Failover

To enhance connectivity resilience, ExpressRoute can be paired with a VPN gateway as a failover solution. In this configuration, an ExpressRoute gateway is deployed in Azure along with an on-premises gateway that creates the primary ExpressRoute circuit. Additionally, a VPN gateway is deployed in the same gateway subnet to serve as a backup if the ExpressRoute connection fails.

Key aspects of this configuration are:

- High availability: If the ExpressRoute connection is disrupted, the VPN gateway maintains connectivity between on-premises and Azure.
- Throughput considerations: The VPN gateway generally provides lower throughput compared to ExpressRoute.
- Dual setup complexity: Configuring both ExpressRoute and VPN connections on your on-premises device—as well as deploying two separate gateways in Azure—can increase overall costs.

![The image is a diagram illustrating an ExpressRoute with VPN failover setup, showing the connection between an on-premises network and an Azure virtual network using ExpressRoute and VPN gateways.](https://kodekloud.com/kk-media/image/upload/v1752867092/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-on-premises-connectivity/expressroute-vpn-failover-diagram.jpg)

> [!important]
> **Attention**
>
> Ensure that your network design accounts for the additional complexity and cost when implementing dual gateways for a failover strategy.

---

## Hub-Spoke Architecture

Often, connecting a single virtual network to an on-premises network is not sufficient. Deploying individual VPN gateways in every virtual network can be cost-prohibitive and challenging to manage. Instead, a hub-spoke architecture simplifies management and minimizes costs.

In a hub-spoke architecture:

- A central hub virtual network is created and managed. This hub includes the VPN gateway.
- A site-to-site connection is established from the on-premises network to the hub.
- Virtual network peering enables spoke networks (which host workloads) to access the on-premises network using the VPN gateway in the hub.

This design centralizes connectivity, reducing the need to deploy multiple VPN gateways.

![The image illustrates a Hub-Spoke architecture, showing the connection between an on-premises network and Azure virtual networks via a VPN gateway and peering.](https://kodekloud.com/kk-media/image/upload/v1752867095/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-on-premises-connectivity/hub-spoke-architecture-azure-vpn.jpg)

---

## Hub-Spoke Architecture with Virtual WAN

The hub-spoke model becomes even more effective when enhanced with Azure Virtual WAN. In this advanced design, the traditional hub is replaced by the Virtual WAN service, which acts as a centralized transit hub for various connectivity types. This setup supports multiple scenarios, including:

- Branch-to-VNet connectivity via ExpressRoute or VPN.
- Branch-to-branch communication using ExpressRoute Global Reach.
- Point-to-site VPN connections for remote users.
- Remote users accessing on-premises resources through the Virtual WAN transit hub.
- Hub-to-hub connectivity and branch-to-hub-to-VNet integrations.

As a platform-managed service, Virtual WAN delivers high availability, scalability, and simplified maintenance, making it an optimal choice for complex connectivity requirements.

![The image illustrates a Hub-Spoke architecture using VWAN, showing the connection between an on-premises network and Azure virtual networks through a central hub. It includes components like workloads, gateways, and peering connections.](https://kodekloud.com/kk-media/image/upload/v1752867096/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-on-premises-connectivity/hub-spoke-architecture-vwan-azure.jpg)

---

## Summary

In this article, we examined several design options for connecting on-premises environments to Azure:

| Connection Type                | Description                                                                                                   | Key Considerations                                                                            |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| VPN Connection                 | Encrypted connectivity over the Internet with support for both site-to-site and point-to-site configurations. | Simplicity, consistent security, moderate throughput.                                         |
| ExpressRoute                   | Dedicated, private connectivity with high throughput and dynamic bandwidth scaling.                           | Higher performance, dependency on third-party providers, cost implications.                   |
| ExpressRoute with VPN Failover | Combines ExpressRoute and VPN for high availability in the event of connection failures.                      | Ensures reliability, but with lower backup throughput and increased configuration complexity. |
| Hub-Spoke Architecture         | Centralizes connectivity with a single VPN gateway in the hub, reducing management overhead and cost.         | Streamlined management and cost savings.                                                      |
| Hub-Spoke with Virtual WAN     | Uses Virtual WAN as a centralized transit hub, enabling diverse connectivity scenarios.                       | Enhanced flexibility and scalability, with built-in service availability.                     |

These strategies allow you to tailor your connectivity approach based on performance, cost, and complexity requirements. By selecting the best option for your environment, you can achieve reliable and cost-effective integration between your on-premises resources and Azure.

![The image illustrates a Hub-Spoke architecture using VWAN, showing various connectivity options like Branch-to-VNet and Remote users-to-Branch, with a diagram of regions and network connections.](https://kodekloud.com/kk-media/image/upload/v1752867097/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-on-premises-connectivity/hub-spoke-architecture-vwan-diagram.jpg)

Next, we will explore design considerations for network connectivity.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/61e4ebd3-ea7b-4ade-94f7-e203f93b60c9/lesson/0591a3f7-9f9a-4259-8123-83f3c651b2d4)**
>
> Watch video content
