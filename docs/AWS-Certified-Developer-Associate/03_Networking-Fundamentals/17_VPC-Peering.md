# VPC Peering - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Networking-Fundamentals/VPC-Peering)

---

## Table of Contents

- VPC Peering
  - Key Benefits of VPC Peering
  - Pricing Considerations
  - How VPC Peering Works
  - Transitive Peering Considerations
  - Summary
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Networking Fundamentals

# VPC Peering

In this article, we explore AWS VPC Peering, an essential mechanism for enabling communication between Virtual Private Clouds (VPCs). By default, resources in one VPC cannot interact with those in another since each VPC acts as its own isolated network boundary.

![The image illustrates the behavior of Virtual Private Clouds (VPCs) acting as network boundaries, showing two VPCs with a connection between them that is blocked.](https://kodekloud.com/kk-media/image/upload/v1752859269/notes-assets/images/AWS-Certified-Developer-Associate-VPC-Peering/vpc-network-boundaries-illustration.jpg)

If your architecture requires resources in separate VPCs to interact, VPC peering provides an effective solution. By establishing a network connection between two VPCs, you can configure routing so that traffic flows seamlessly between them. With proper routing, VPC peering makes instances across different VPCs appear as if they reside in the same network.

## Key Benefits of VPC Peering

VPC peering offers several flexible connection options:

- **Same Region:** Connect VPCs within the same region.
- **Different Regions:** Establish peering connections across regions.
- **Different AWS Accounts:** Enable secure communication between VPCs owned by different accounts.

![The image illustrates VPC Peering between two AWS accounts, each containing a Virtual Private Cloud (VPC).](https://kodekloud.com/kk-media/image/upload/v1752859270/notes-assets/images/AWS-Certified-Developer-Associate-VPC-Peering/vpc-peering-aws-accounts-diagram.jpg)

## Pricing Considerations

When planning VPC peering, keep the following pricing details in mind:

- Creating a VPC peering connection is free.
- Data transferred within an Availability Zone via a VPC peering connection is free.
- Data transfer charges apply when data crosses VPC peering connections between different Availability Zones.

![The image explains VPC Peering Pricing, highlighting that there is no cost for VPC Peering connection creation and that data transfer within an Availability Zone via VPC Peering is free.](https://kodekloud.com/kk-media/image/upload/v1752859272/notes-assets/images/AWS-Certified-Developer-Associate-VPC-Peering/vpc-peering-pricing-explanation.jpg)

> [!important]
> **Note**
>
> Ensure you review the latest AWS pricing documentation as charges may vary based on region and usage.

## How VPC Peering Works

Consider an example with two VPCs:

- **VPC1:** CIDR block 10.1.0.0/16.
- **VPC2:** CIDR block 10.2.0.0/16.

One VPC sends a peering request to the other. If the VPCs belong to different AWS accounts, the owner of the receiving VPC must accept the request. For VPCs within the same account, the process is simpler, with the request effectively coming from yourself. Once accepted, the peering connection is active.

![The image illustrates a VPC peering process between two virtual private clouds (VPC 1 and VPC 2), showing the sending and accepting of a peering request.](https://kodekloud.com/kk-media/image/upload/v1752859273/notes-assets/images/AWS-Certified-Developer-Associate-VPC-Peering/vpc-peering-process-diagram.jpg)

After establishing the peering connection, the next crucial step is configuring the routing tables for both VPCs:

- In **VPC1**, add a route for the CIDR block 10.2.0.0/16, targeting the peering connection.
- In **VPC2**, add a route for the CIDR block 10.1.0.0/16, also targeting the peering connection.

This configuration ensures that any traffic destined for the other VPC is correctly forwarded through the peering connection.

## Transitive Peering Considerations

A common misconception is that VPC peering is transitive. For instance, if VPC1 is peered with VPC2 and VPC2 is peered with VPC3, one might assume VPC1 can communicate with VPC3 via VPC2. However, VPC peering is not transitive. Each VPC that needs to communicate must have its own direct peering connection.

> [!important]
> **Warning**
>
> Do not rely on indirect routes through an intermediary VPC. Ensure to configure direct peering for every pair of VPCs that need to exchange traffic.

## Summary

AWS VPC Peering is a robust feature enabling seamless network connectivity across VPCs in various configurations—whether in the same region, across different regions, or between multiple AWS accounts. The process involves sending and accepting peering requests, configuring routing for proper data flow, and understanding the pricing nuances, especially for inter-Availability Zone traffic. Always remember that VPC peering connections require direct links between communicating VPCs; the feature does not support transitive routing.

![The image is a summary slide about VPC Peering, highlighting its function, connectivity across regions and accounts, and cost details. It includes three main points with colorful numbered icons.](https://kodekloud.com/kk-media/image/upload/v1752859274/notes-assets/images/AWS-Certified-Developer-Associate-VPC-Peering/vpc-peering-summary-connectivity-costs.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/c8f3ca76-9178-474e-a33b-bf1de4fd948c/lesson/f791769b-2d8e-481a-b002-f36ad385c8f6)**
>
> Watch video content
