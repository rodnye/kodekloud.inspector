# Subnets - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Networking/Subnets)

---

## Table of Contents

- Subnets
  - Availability Zones and Subnet Placement
  - Public vs. Private Subnets
  - CIDR Range and Subnet Configuration
  - Avoiding Overlapping Subnets
  - IPv6 Support and Internal Routing
  - Auto-Assigning Public IP Addresses
  - Summary
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Networking

# Subnets

In this lesson, we explore subnets and their function within a Virtual Private Cloud (VPC). Subnets are defined as groups of IP addresses within your VPC, allowing you to deploy resources into isolated segments. When you launch an AWS resource—such as an EC2 instance—it must be assigned to a specific subnet.

## Availability Zones and Subnet Placement

Every subnet is associated with a single availability zone. For instance, if you have:

- **Subnet One** in Availability Zone 1, any resource deployed within this subnet will reside in that zone.
- **Subnet Two** in Availability Zone 2, resources will similarly be placed in the second zone.

By selecting the appropriate subnet for your resource deployment, you are effectively choosing the availability zone where your resource will reside.

## Public vs. Private Subnets

Subnets can be designated as either public or private based on the intended use:

- **Public Subnets:**  
  Ideal for resources that need direct internet connectivity, such as web servers or public applications. Public subnets have a direct route to an Internet Gateway.
- **Private Subnets:**  
  Best suited for resources that do not require exposure to the internet, such as databases or internal applications. Internet-bound traffic in private subnets typically routes via a NAT Gateway.

## CIDR Range and Subnet Configuration

A key aspect of subnet configuration is the CIDR range. For example, if your VPC is assigned a CIDR of 192.168.0.0/16, every subnet you create must have an IP address range within this block. Examples include:

- A subnet defined as 192.168.10.0/24 is valid.
- A subnet defined as 10.100.1.0/24 is outside the VPC's CIDR range and would trigger a configuration error.

Further, the block size of any subnet must be between /16 and /28. Note the following reserved IP address rules within each subnet:

> [!important]
> **Reserved IP Addresses**
>
> - The first four IP addresses in every subnet are reserved:
> - The **first address** serves as the network address.
> - The **second address** is typically used by the VPC router.
> - The **third address** is reserved for DNS.
> - The **fourth address** is held for future use.
> - Additionally, the **last IP address** in a subnet (e.g., 192.168.10.255 in a /24 subnet) is reserved as the broadcast address.

![The image explains subnet requirements within a VPC, highlighting CIDR range compliance, block size limits, and reserved IP addresses, with a diagram showing a valid and an invalid subnet.](https://kodekloud.com/kk-media/image/upload/v1752865699/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Subnets/vpc-subnet-requirements-diagram.jpg)

## Avoiding Overlapping Subnets

When creating subnets within the same VPC, ensure their IP address ranges do not overlap. For example:

- Subnet A: 10.16.0.0/24
- Subnet B: 10.16.0.128/25

This configuration is invalid because the ranges overlap. However, overlapping subnets in different VPCs are permitted.

## IPv6 Support and Internal Routing

Subnets can also be assigned an IPv6 CIDR block (commonly a /56) or even be configured to use exclusively IPv6 addresses. By default, resources in subnets can communicate with one another within the same VPC without requiring additional routing configurations in route tables.

## Auto-Assigning Public IP Addresses

When configuring a subnet, you can enable the option to auto-assign a public IPv4 or IPv6 address to a resource upon deployment. Typically, instances receive a private IP address by default. Enabling this feature is particularly useful for resources in public subnets that require internet connectivity. When this setting is enabled:

- A public IP address is automatically assigned alongside the private IP.
- This ensures that resources, such as internet-facing web servers, are reachable by external users.

![The image illustrates subnet configuration options within a VPC, highlighting features like non-overlapping subnets, optional IPv6 CIDR, and communication capabilities. It includes a diagram showing public subnets in two availability zones.](https://kodekloud.com/kk-media/image/upload/v1752865700/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Subnets/vpc-subnet-configuration-diagram.jpg)

## Summary

Subnets are integral to defining IP address ranges within a VPC and are confined to a single availability zone, which in turn determines resource placement. They can be configured as public or private depending on your requirements for internet connectivity. All subnets must comply with the VPC's CIDR range, and specific IP addresses within each block are reserved for essential network functions. Remember that while overlapping IP ranges are not allowed within a single VPC, such overlaps are permissible across different VPCs. Finally, subnet settings offer advanced options, such as IPv6 addressing and automatic public IP assignment, to help you build a scalable and robust AWS network architecture.

For additional details, explore [AWS VPC Documentation](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html) and other related resources for best practices in network design.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/e03ffb87-3345-4fbb-9576-cb53d21d7a6a/lesson/41f95184-dd67-4749-adc8-e56237c5d0fc)**
>
> Watch video content
