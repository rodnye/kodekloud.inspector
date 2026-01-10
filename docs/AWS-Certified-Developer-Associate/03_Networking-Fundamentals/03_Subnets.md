# Subnets - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Networking-Fundamentals/Subnets)

---

## Table of Contents

- Subnets
  - How Subnets Work
  - CIDR Ranges and IP Address Allocation
  - Visualizing Subnets in a VPC
  - Additional Subnet Considerations
  - Summary
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Networking Fundamentals

# Subnets

In this article, we explore the concept of subnets within a Virtual Private Cloud (VPC). A subnet is a defined group of IP addresses inside your VPC that determines the range of deployable resources, such as EC2 instances or servers. Each subnet resides in a specific Availability Zone, ensuring you can control resource placement across different zones simply by designating target subnets.

## How Subnets Work

Consider a scenario with two subnets: one in Availability Zone 1 and the other in Availability Zone 2. Launching an instance in the first subnet places it in Availability Zone 1, while deploying an instance in the second subnet locates it in Availability Zone 2. This capability allows precise control over resource placement according to availability and fault tolerance requirements.

Subnets are categorized as either public or private:

- **Public Subnets:** Deploy resources that require external network access, such as web servers.
- **Private Subnets:** Use for resources that do not need direct internet connectivity, such as backend servers.

## CIDR Ranges and IP Address Allocation

A VPC is defined by a CIDR range. For example, if a VPC has a CIDR range of 192.168.0.0/16, every subnet must fall within this range. A subnet like 192.168.10.0/24 is valid because it fits within the VPC’s CIDR range, whereas an IP range such as 10.100.1.0/24 would be invalid and trigger an error from AWS.

It is crucial to note that the subnet block size must be between /16 and /28. Additionally, the first four and the last IP addresses in every subnet are reserved:

- **Reserved Addresses:**
  - The first address is reserved for the network address.
  - The next three addresses (e.g., 192.168.10.1, 192.168.10.2, and 192.168.10.3 in a 192.168.10.0/24 subnet) are allocated for AWS services. Typically, .1 is used for the VPC router, .2 for DNS, and .3 for future use.
  - The final IP address in the range (e.g., 192.168.10.255) serves as the broadcast address.

> [!important]
> **Important Note**
>
> When planning your subnet configurations, always ensure the CIDR ranges you allocate for your subnets are fully contained within the VPC’s overall CIDR range.

## Visualizing Subnets in a VPC

When configuring subnets, refer to the diagram below which illustrates the structure of subnetting within a VPC. It details CIDR ranges, reserved IP addresses, and the division of public subnets across different Availability Zones.

![The image explains subnetting within a VPC, detailing CIDR ranges, reserved IP addresses, and public subnets in availability zones. It includes a diagram showing a default VPC with public subnets in two availability zones.](https://kodekloud.com/kk-media/image/upload/v1752859258/notes-assets/images/AWS-Certified-Developer-Associate-Subnets/subnetting-vpc-cidr-diagram.jpg)

## Additional Subnet Considerations

1.  **Non-Overlapping IP Ranges:**  
    Subnets within the same VPC must have non-overlapping IP ranges. For instance, having one subnet with an IP range of 10.16.0.0/24 and another defined as 10.16.0.128/25 results in overlapping ranges, which is invalid. Although overlapping IP ranges are acceptable across different VPCs, they are not permitted within a single VPC.
2.  **IPv6 Support:**  
    It is possible to define an optional IPv6 /56 CIDR block for a subnet. Some configurations might utilize exclusively IPv6 addresses without any IPv4 addresses.
3.  **Internal Communication:**  
    By default, subnets within the same VPC can communicate with each other through full internal routing. This seamless connectivity eliminates the need for additional routing configuration for internal communication between resources.
4.  **Auto-Assignment of Public IP Addresses:**  
    You can enable auto-assignment for public IPv4 or IPv6 addresses on your subnets. Resources launched in a public subnet can be configured to receive a public IP in addition to the default private address. This feature is especially beneficial for deploying web servers that require direct internet connectivity.

The following diagram presents various subnet configuration options and emphasizes key points:

- Subnets must not overlap within the same VPC.
- Optionally, a subnet can be assigned an IPv6 CIDR block.
- Public subnets can be configured to enable external access.

![The image illustrates subnet configuration options within a VPC, highlighting that subnets cannot overlap, can allow optional IPv6 CIDR, and can be configured for IPv6 only. It includes a diagram showing two public subnets in different availability zones.](https://kodekloud.com/kk-media/image/upload/v1752859260/notes-assets/images/AWS-Certified-Developer-Associate-Subnets/vpc-subnet-configuration-diagram.jpg)

## Summary

In summary, subnets are defined ranges of IP addresses within a VPC that reside in a single Availability Zone. They enable control over the physical placement of your resources, ensuring optimized distribution across Availability Zones. Subnets can be categorized as public or private and can utilize IPv4 or IPv6 addresses. It is essential to adhere to the correct CIDR range specifications and avoid overlapping IP ranges within the same VPC to ensure efficient and error-free network configurations.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/c8f3ca76-9178-474e-a33b-bf1de4fd948c/lesson/cd80e2c1-41ad-419f-95cc-b3142915a8b8)**
>
> Watch video content
