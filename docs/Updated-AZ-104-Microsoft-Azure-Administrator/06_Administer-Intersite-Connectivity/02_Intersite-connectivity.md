# Intersite connectivity - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Intersite-Connectivity/Intersite-connectivity)

---

## Table of Contents

- Intersite connectivity
  - Azure-to-Azure Connectivity
  - Azure-to-On-Premises Connectivity
  - Comparison of Connectivity Options
  - Summary
  - Watch Video

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Intersite Connectivity

# Intersite connectivity

In this guide, we explore various intersite connectivity options, focusing on two primary scenarios: Azure-to-Azure connectivity and Azure-to-on-premises connectivity. Each option is designed to enable secure and reliable communication between disparate network environments.

## Azure-to-Azure Connectivity

When managing multiple Azure Virtual Networks (VNets), such as VNet A and VNet B, communication is not enabled by default due to their separate address spaces and network boundaries. To bridge this gap, you have two primary approaches:

1.  **VPN Gateway with Gateway Subnet**  
    Create a dedicated gateway subnet within one or both VNets and deploy a VPN Gateway. This gateway facilitates a secure VNet-to-VNet connection by encrypting the data traffic between VNet A and VNet B. The same VPN Gateway can also be leveraged for Azure-to-on-premises connectivity.

    > [!important]
    > **Tip**
    >
    > Reusing the VPN Gateway for multiple connectivity options can help simplify network management by reducing the number of required resources.

2.  **VNet Peering**  
    VNet peering provides a direct connection between VNets without the need for an intermediary VPN Gateway. This method offers low latency and high bandwidth connectivity, making it ideal for environments where performance is critical.

Later in this guide, we will compare these methods to help determine which approach best meets your business needs and performance goals.

## Azure-to-On-Premises Connectivity

Connecting your Azure environment to on-premises infrastructure offers several options. Consider the following model:

Imagine your Azure virtual network includes a subnet hosting two virtual machines, while your on-premises infrastructure resides on the other side. A gateway subnet with a VPN Gateway can bridge these environments securely.

- **Site-to-Site Connection**  
  The VPN Gateway can be configured to establish a Site-to-Site connection between your Azure environment and on-premises infrastructure. Although this setup utilizes public internet channels, it ensures secure data transfer by routing the traffic through an encrypted VPN tunnel.
- **ExpressRoute**  
  For scenarios requiring a dedicated private connection, ExpressRoute provides a direct link between your Azure data center and on-premises data center without using the public internet. This option ensures a secure and reliable connection, though it generally comes at a higher cost.

  > [!important]
  > **Note**
  >
  > ExpressRoute utilizes dedicated telecom connections, offering enhanced security and predictable performance.

- **Point-to-Site Connection**  
  This option is ideal for remote workers, developers, or employees on the move. A Point-to-Site connection allows individual devices to establish a secure connection to Azure resources through the VPN Gateway, independent of the on-premises network location.

![The image illustrates intersite connectivity between Azure and on-premises networks, showing different connection types like P2S, site-to-site, and ExpressRoute. It includes subnets, gateways, and network components within a virtual network (VNet-A) and an on-premises setup.](https://kodekloud.com/kk-media/image/upload/v1752884619/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Intersite-connectivity/azure-intersite-connectivity-diagram.jpg)

## Comparison of Connectivity Options

Below is a quick reference table summarizing the available connectivity types:

| Connectivity Option          | Use Case                                             | Key Benefit                                      |
| ---------------------------- | ---------------------------------------------------- | ------------------------------------------------ |
| VPN Gateway (Azure-to-Azure) | Secure encrypted communication between VNets         | Flexibility to reuse for on-premises connections |
| VNet Peering                 | Direct, high-performance connection between VNets    | Low latency and high bandwidth                   |
| Site-to-Site VPN             | Secure connection to on-premises infrastructure      | Utilizes existing internet channels securely     |
| ExpressRoute                 | Dedicated private connection to on-premises networks | Enhanced security and performance predictability |
| Point-to-Site VPN            | Remote access for individual devices                 | Secure connection without physical site presence |

## Summary

- **Azure-to-Azure Connectivity:**
  - Enable communication between VNets using either a VPN Gateway (with a gateway subnet) or VNet Peering.

- **Azure-to-On-Premises Connectivity:**
  - Establish secure connections via Site-to-Site and Point-to-Site VPNs using a VPN Gateway, or opt for ExpressRoute for a dedicated private connection.

This article introduces the various connectivity options within Azure. In the following sections, we will delve deeper into Virtual Network Peering and further examine these solutions to help you build a robust, secure network infrastructure.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/f7470a91-91f6-4c6c-8a03-565abfeb7aee/lesson/05cb5db3-2482-4b3f-8567-df19b115ce9f)**
>
> Watch video content
