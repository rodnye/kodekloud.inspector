# VPC Peering - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Networking/VPC-Peering)

---

## Table of Contents

- VPC Peering
  - Overview of VPC Isolation and Peering
  - How VPC Peering Works
  - Key Considerations for VPC Peering
  - Pricing Considerations
  - Summary
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Networking

# VPC Peering

VPC peering is an essential component in cloud networking, enabling direct communication between Virtual Private Clouds (VPCs) by connecting them through a private network. In this lesson, we will explore how VPC peering works, its benefits, and considerations for configuration. For additional context, refer to the [AWS Cloud Practitioner (CLF-C02)](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02) exam materials.

## Overview of VPC Isolation and Peering

By default, resources hosted in different VPCs are isolated because each VPC creates its own network boundary. This isolation prevents instances in separate VPCs from communicating with each other unless explicitly configured. VPC peering addresses this challenge by creating a direct network connection between two VPCs, allowing instances in each VPC to interact as if they were on the same network.

VPC peering supports connections under various scenarios:

- Between VPCs in the same region.
- Across different regions.
- Between VPCs in different AWS accounts.

![The image illustrates VPC Peering between two AWS accounts, each containing a Virtual Private Cloud (VPC).](https://kodekloud.com/kk-media/image/upload/v1752865724/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-VPC-Peering/vpc-peering-aws-accounts-diagram.jpg)

## How VPC Peering Works

Consider an example with two VPCs:

- **VPC One**: CIDR block 10.1.0.0/16
- **VPC Two**: CIDR block 10.2.0.0/16

One VPC initiates a peering request to the other. If the VPCs belong to different AWS accounts, the owner of the target VPC must accept the request. In the same account, the request is automatically approved. Once accepted, the peering connection is established.

After establishing the connection, you need to manually update the route tables in both VPCs. For instance, in VPC One, add a route that directs traffic destined for the 10.2.0.0/16 CIDR block to the peering connection. Similarly, in VPC Two, create a route for the 10.1.0.0/16 CIDR block pointing to the same connection.

![The image illustrates a VPC peering process between two virtual private clouds (VPC1 and VPC2) with their respective IP ranges, showing the sending and accepting of a peering request.](https://kodekloud.com/kk-media/image/upload/v1752865725/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-VPC-Peering/vpc-peering-process-ip-ranges.jpg)

> [!important]
> **Routing Note**
>
> Remember to update the route tables in both VPCs after establishing the peering connection. Without these changes, instances will not be able to communicate.

## Key Considerations for VPC Peering

One critical aspect of VPC peering is its non-transitive nature. For example, if you have three VPCs (VPC One, VPC Two, and VPC Three) and establish peering between VPC One & VPC Two and between VPC Two & VPC Three, VPC One will not automatically communicate with VPC Three. Each communication pair requires a dedicated peering connection.

![The image is a diagram illustrating VPC peering between three virtual private clouds (VPC 1, VPC 2, and VPC 3), with a central point indicating a connection issue.](https://kodekloud.com/kk-media/image/upload/v1752865727/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-VPC-Peering/vpc-peering-diagram-connection-issue.jpg)

> [!important]
> **Non-Transitivity Warning**
>
> VPC peering does not support transitive routing. Ensure that each pair of VPCs needing communication has its own peering connection.

## Pricing Considerations

VPC peering connections themselves incur no additional charges. However, data transfer costs apply in specific scenarios:

- Data transferred within the same availability zone via a VPC peering connection is free.
- Data transferred between different availability zones is billed.

## Summary

VPC peering offers a secure and efficient mechanism to connect two VPCs, allowing direct routing of traffic as if they are part of the same network. The key benefits include:

| Feature              | Description                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------ |
| Direct Connectivity  | Enables private communication between VPC resources                                        |
| Cross-Region Support | Works across regions and between AWS accounts                                              |
| Cost Efficiency      | No additional charge for peering connections; only data transfer is billed (if applicable) |

![The image is a summary slide about VPC Peering, highlighting its function, connectivity across regions and accounts, and cost details related to data transfer.](https://kodekloud.com/kk-media/image/upload/v1752865730/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-VPC-Peering/vpc-peering-summary-function-connectivity.jpg)

By understanding and implementing VPC peering, you can effectively design and manage your cloud network, ensuring secure and efficient resource communication across different VPCs. For more configuration details and best practices, refer to the AWS documentation and guidelines on VPC peering.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/e03ffb87-3345-4fbb-9576-cb53d21d7a6a/lesson/40fb8d93-b077-4a63-bd61-ce502bacec37)**
>
> Watch video content
