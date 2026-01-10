# Internal Network to Network Connectivity With VPC Peering - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-5-Networking-and-Content-Delivery/Internal-Network-to-Network-Connectivity-With-VPC-Peering)

---

## Table of Contents

- Internal Network to Network Connectivity With VPC Peering
  - Overview
  - Private Connectivity and Cross-Account Support
  - VPC Peering vs. Transit Gateway
  - How VPC Peering Works
  - Important Considerations
  - Summary
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 5 Networking and Content Delivery

# Internal Network to Network Connectivity With VPC Peering

Welcome back! In this article, we explore how to establish internal network-to-network connectivity using VPC peering. This approach allows you to connect separate Virtual Private Clouds (VPCs) securely—even if they belong to different AWS accounts or regions.

## Overview

Network-to-network connectivity by VPC peering involves linking one VPC directly to another. By design, VPCs serve as isolated boundaries within your cloud environment. While you may have distinct VPCs for production and development, there are occasions when these networks need to communicate.

AWS’s Transit Gateway is a robust solution for connecting multiple VPCs. However, VPC peering remains the original and straightforward option to connect two VPCs. Importantly, although our example depicts VPCs in the same region, VPC peering also supports cross-region connectivity. For instance, a VPC in the Tokyo region can seamlessly connect with one in the Virginia region.

![The image illustrates a network diagram showing two separate regions, each with a VPC and a private subnet, before VPC peering.](https://kodekloud.com/kk-media/image/upload/v1752860855/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Internal-Network-to-Network-Connectivity-With-VPC-Peering/network-diagram-vpc-peering.jpg)

## Private Connectivity and Cross-Account Support

VPC peering leverages AWS’s private backbone network, eliminating the need for public connectivity—even when using private subnets. This feature also supports cross-account connections, enabling you to connect VPCs owned by different AWS accounts as well as those in different regions.

![The image illustrates a VPC peering connection between two accounts, each containing a VPC with a private subnet.](https://kodekloud.com/kk-media/image/upload/v1752860856/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Internal-Network-to-Network-Connectivity-With-VPC-Peering/vpc-peering-connection-private-subnet.jpg)

## VPC Peering vs. Transit Gateway

VPC peering provides a one-to-one connection, meaning if VPC A is peered with VPC B and VPC C, there is no transitive routing between B and C through A. For scenarios that require connecting multiple VPCs or transitive connectivity, AWS Transit Gateway may be a more flexible solution.

![The image illustrates an inter-region VPC peering connection between two regions, each containing a VPC with a private subnet.](https://kodekloud.com/kk-media/image/upload/v1752860858/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Internal-Network-to-Network-Connectivity-With-VPC-Peering/vpc-peering-connection-diagram.jpg)

## How VPC Peering Works

Establishing a VPC peering connection involves the following steps:

1.  The owner of a VPC initiates a peering request to the target VPC.
2.  AWS notifies both parties via email and the AWS Management Console that a peering request is pending.
3.  Once the target VPC accepts the request, update the route tables on both VPCs to enable direct communication.

> [!important]
> **Tip**
>
> Ensure that the IP address ranges (CIDR blocks) of the peered VPCs do not overlap. For example:
>
> - Two VPCs configured with /16 CIDR blocks (like 10.10.0.0/16) would conflict.
> - Using distinct CIDR blocks (such as 10.10.0.0/24 and 10.10.1.0/24) avoids conflicts. For IPv6, overlapping is typically not an issue since every address is unique.

Once initiated, the peering request status is "pending acceptance." The request may eventually expire or be rejected. After acceptance, the connection status turns "active" and the route tables must be updated accordingly.

![The image is a flowchart illustrating the VPC Peering Connection Lifecycle, showing stages such as "Initiating-request," "Pending-acceptance," "Provisioning," "Active," "Deleting," and various end states like "Failed," "Expired," "Rejected," and "Deleted."](https://kodekloud.com/kk-media/image/upload/v1752860859/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Internal-Network-to-Network-Connectivity-With-VPC-Peering/vpc-peering-connection-lifecycle-flowchart.jpg)

## Important Considerations

- **Non-transitive Nature:**  
  VPC peering is strictly one-to-one. Even if VPC A is peered with both VPC B and VPC C, B and C cannot communicate through A. A direct peering connection is needed for those VPCs to interact.
- **IP Address Overlap:**  
  Always check that the CIDR blocks of the peered VPCs do not overlap—overlapping addresses prevent proper routing between networks.
- **No Edge Routing:**  
  VPC peering does not support edge routing. Unlike Transit Gateway, which provides advanced routing features, VPC peering requires manual updating of each VPC's route table.
- **Latency Considerations:**  
  When peering VPCs across regions, even though connections use AWS’s backbone, the physical distance may introduce latency. This could affect performance in high-traffic scenarios.

![The image lists six limitations related to network configurations, including no transitive peering, no overlapping CIDRs, and no support for edge routing.](https://kodekloud.com/kk-media/image/upload/v1752860860/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Internal-Network-to-Network-Connectivity-With-VPC-Peering/network-config-limitations-list.jpg)

## Summary

VPC peering offers a straightforward and secure way to directly connect two VPCs—whether they reside within the same region or across multiple regions or accounts. Remember that the connection must be initiated and accepted, and route tables require manual updates to enable communication. Always ensure that the IP ranges between VPCs do not overlap, and keep in mind that peering is inherently a point-to-point connection without transitive routing.

We hope this article has provided you with a clear understanding of VPC peering and its capabilities. Stay tuned for more insights on cloud network configurations and best practices in our upcoming articles.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/fd99c412-5efc-46e2-99ce-bb9c581fec27/lesson/33119f66-a57f-4733-bbb6-c3ae9afe941e)**
>
> Watch video content
