# Transit Gateway - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Networking/Transit-Gateway)

---

## Table of Contents

- Transit Gateway
  - Background
  - How Transit Gateway Works
  - Connecting On-Premises Environments
  - Advanced Connectivity Options
  - Summary
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Networking

# Transit Gateway

In this article, we explore the AWS Transit Gateway service, which simplifies connectivity and routing between multiple VPCs and on-premises environments. AWS Transit Gateway offers a scalable alternative to managing a complex web of peering connections.

## Background

By default, VPCs cannot communicate with one another. For example, resources in VPC 1 cannot interact with resources in VPC 2 unless a VPC peering connection is configured. While VPC peering allows direct communication between two VPCs, it does not support transitive routing. This means if VPC 1 is peered with VPC 2, and VPC 2 is peered with VPC 3, then VPC 1 and VPC 3 cannot communicate unless a direct peering is established between them.

When you scale out to include more VPCs, the number of required peering connections increases significantly. For instance, with four VPCs, a full mesh of peering is required, meaning every VPC must connect to every other VPC. This quickly becomes both complex and hard to manage—especially when integrating on-premises networks through multiple VPN connections.

> [!important]
> **Note**
>
> For environments with multiple VPCs, AWS Transit Gateway provides a simplified and more scalable approach compared to traditional VPC peering.

## How Transit Gateway Works

AWS Transit Gateway acts as a centralized router, allowing you to attach each VPC to the gateway instead of wiring a full mesh of peerings. In a scenario with four VPCs, each VPC requires only a single connection to the Transit Gateway, which then efficiently routes traffic between them.

A key configuration requirement is to designate one subnet from each availability zone within a VPC to be used by the Transit Gateway. For example, if your VPC spans three availability zones, create a dedicated subnet in each zone. This setup ensures that the Transit Gateway has sufficient network interfaces for effective traffic routing.

## Connecting On-Premises Environments

Transit Gateway also significantly simplifies on-premises connectivity. Traditionally, connecting an on-premises data center to multiple VPCs required establishing separate VPN connections for each VPC. With Transit Gateway, a single VPN connection to the gateway suffices, as it routes traffic to all connected VPCs. Additionally, AWS Direct Connect can be integrated with Transit Gateway to offer enhanced connectivity options for high-performance and low-latency needs.

![The image illustrates an AWS Transit Gateway setup, showing connections between a corporate data center, customer gateway, and multiple cloud networks. It highlights the transit gateway's role in routing traffic between VPCs and the requirement to specify subnets from each availability zone.](https://kodekloud.com/kk-media/image/upload/v1752865702/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Transit-Gateway/aws-transit-gateway-setup-diagram.jpg)

## Advanced Connectivity Options

A standout feature of Transit Gateways is their ability to peer with other Transit Gateways. This enables inter-region connectivity as well as connectivity across different AWS accounts. For example, if you need to link resources in two regions or manage networks across separate AWS accounts, establishing a peering relationship between Transit Gateways simplifies these scenarios considerably.

![The image illustrates a diagram of AWS Transit Gateway peerings between two regions, each containing an AWS Transit Gateway.](https://kodekloud.com/kk-media/image/upload/v1752865703/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Transit-Gateway/aws-transit-gateway-peerings-diagram.jpg)

## Summary

AWS Transit Gateway is a powerful tool that streamlines network connectivity. It eliminates the complexities of setting up a full mesh of VPC-to-VPC peerings by enabling transitive routing. Key takeaways include:

- Each VPC requires a designated subnet per availability zone for Transit Gateway connectivity.
- Transit Gateway reduces the number of VPN connections needed for on-premises connectivity.
- Integration with both VPN and AWS Direct Connect enhances on-premises connection options.
- Peering capabilities allow Transit Gateways to connect across regions and AWS accounts.

![The image is a summary of key points about Transit Gateways, highlighting their role in simplifying networking, allowing transitive routing, specifying subnets for traffic routing, and peering with other gateways.](https://kodekloud.com/kk-media/image/upload/v1752865704/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Transit-Gateway/transit-gateways-summary-key-points.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/e03ffb87-3345-4fbb-9576-cb53d21d7a6a/lesson/5d34d747-949a-4668-93a1-33e74e03cacc)**
>
> Watch video content
