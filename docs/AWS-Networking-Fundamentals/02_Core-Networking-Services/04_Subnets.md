# Subnets - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Networking-Fundamentals/Core-Networking-Services/Subnets)

---

## Table of Contents

- Subnets
  - What Is an AWS Subnet?
  - Public vs. Private Subnets
  - Subnet Requirements
  - Configuration Considerations
  - Summary
  - Links and References
  - Watch Video

---

## Content

AWS Networking Fundamentals

Core Networking Services

# Subnets

In AWS, a **subnet** is a contiguous range of IP addresses within a Virtual Private Cloud (VPC). Each subnet resides in a single Availability Zone (AZ) and determines where resources—such as EC2 instances—are placed. Selecting a subnet implicitly chooses the AZ for those resources, enabling high availability and fault isolation.

## What Is an AWS Subnet?

- A subnet’s CIDR block must be a subset of its VPC’s CIDR block.
- AWS supports subnet sizes from `/16` (65,536 IPs) down to `/28` (16 IPs).
- You distribute subnets across multiple AZs to increase resilience.

Example:

- Subnet A: `192.168.10.0/24` in `us-east-1a`
- Subnet B: `192.168.20.0/24` in `us-east-1b`

By spreading workloads across AZs, you achieve higher availability and withstand AZ-level failures.

## Public vs. Private Subnets

| Subnet Type | Route Target     | Typical Use Cases              |
| ----------- | ---------------- | ------------------------------ |
| Public      | Internet Gateway | Web servers, load balancers    |
| Private     | NAT Gateway      | Databases, application servers |

- Public subnets have a route to an Internet Gateway (IGW) for direct internet access.
- Private subnets use a NAT Gateway (or NAT instance) for outbound internet connectivity without exposing resources to inbound traffic.

> [!important]
> **Note**
>
> Configure route tables to associate subnets with the IGW or NAT Gateway as needed.

## Subnet Requirements

1.  **CIDR containment**  
    Your subnet’s CIDR must lie within the VPC’s CIDR block.
    - Valid: VPC `192.168.0.0/16`, Subnet `192.168.10.0/24`
    - Invalid: VPC `192.168.0.0/16`, Subnet `10.100.1.0/24`

2.  **Reserved IP addresses**  
    AWS reserves five IPs in each subnet:

    | Address Offset | Purpose           |
    | -------------- | ----------------- |
    | `.0`           | Network address   |
    | `.1`           | VPC router        |
    | `.2`           | DNS               |
    | `.3`           | AWS future use    |
    | `/.last`       | Broadcast address |

3.  **Size constraints**
    - Minimum: `/28` (16 IPs)
    - Maximum: `/16` (65,536 IPs)

![The image explains subnet requirements within a VPC, including CIDR range, block size, and reserved IP addresses, with a diagram showing public subnets in two availability zones.](https://kodekloud.com/kk-media/image/upload/v1752863373/notes-assets/images/AWS-Networking-Fundamentals-Subnets/vpc-subnet-requirements-diagram.jpg)

## Configuration Considerations

- No overlapping CIDRs within the same VPC. Overlapping is only permitted across distinct VPCs.

> [!important]
> **Warning**
>
> Defining overlapping CIDR blocks in the same VPC causes route conflicts and deployment failures.

Example of an invalid overlap:

```
10.16.0.0/24
10.16.0.128/25
```

- IPv6 support: You can associate a `/56` IPv6 CIDR block with your VPC. Subnets may be configured as:
  - IPv4 only
  - IPv6 only
  - Dual-stack (IPv4 + IPv6)

- Default communication: All subnets in a VPC can communicate without extra route entries.
- **Auto-assign public IP**: Enabling this on a subnet ensures every instance launched receives a public IPv4/IPv6 address in addition to its private IP.

![The image illustrates subnet configuration options within a VPC, highlighting that subnets cannot overlap, can allow for optional IPv6 CIDR, and can be configured as IPv6 only. It includes a diagram showing two public subnets in different availability zones with specific CIDR blocks.](https://kodekloud.com/kk-media/image/upload/v1752863374/notes-assets/images/AWS-Networking-Fundamentals-Subnets/vpc-subnet-configuration-diagram-ipv6.jpg)

## Summary

- Subnets are AZ-scoped IP ranges within a VPC.
- Choose public or private routing by using an Internet Gateway or NAT Gateway.
- Support for IPv4, IPv6, or dual-stack.
- CIDR blocks must be non-overlapping and nested within the VPC’s CIDR.

## Links and References

- [Amazon VPC Concepts](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html)
- [NAT Gateways](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html)
- [IPv6 in Amazon VPC](https://docs.aws.amazon.com/vpc/latest/userguide/ipv6.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-networking-fundamentals/module/406e4440-01a6-45f6-ab45-e14485d333c3/lesson/08d1662a-53e6-4db9-8cc1-f10b32309b3e)**
>
> Watch video content
