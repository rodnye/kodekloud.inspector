# Core AWS Services Networking - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Cloud-Practitioner-CLF-C02/Technology-Part-One/Core-AWS-Services-Networking)

---

## Table of Contents

- Core AWS Services Networking
  - Virtual Private Cloud (VPC)
  - VPCs and AWS Regions
  - Subnets
  - Hybrid Deployments and CIDR Blocks
  - Internet Connectivity for Subnets
  - Secure Connectivity to Private Resources
  - Summary
  - Watch Video

---

## Content

AWS Cloud Practitioner CLF-C02

Technology Part One

# Core AWS Services Networking

In this article, we dive into AWS networking and explain how Virtual Private Clouds (VPCs), subnets, gateways, and related components work together to create a secure and isolated cloud infrastructure. Understanding these elements is crucial for designing scalable and reliable AWS architectures.

When you deploy applications on AWS, your workloads run on shared infrastructure. However, AWS ensures that each customer's resources remain secure and isolated. AWS provides each customer with a dedicated, isolated "mini private cloud" called a Virtual Private Cloud (VPC). This built-in isolation prevents unauthorized access between different customers' applications, ensuring a strong security posture.

## Virtual Private Cloud (VPC)

A VPC is a logical, isolated section of the AWS Cloud where you can launch AWS resources in a virtual network that you define. It gives you complete control over your networking environment, allowing you to:

- Configure subnets, IP ranges, routing tables, network access control lists (NACLs)
- Define security groups for controlling traffic at the instance level
- Manage gateways to regulate traffic between your VPC and the internet

![The image explains a Virtual Private Cloud (VPC) as a secure, isolated network segment in AWS, offering control over networking, subnets, routing, firewalls, and gateways.](https://kodekloud.com/kk-media/image/upload/v1752861913/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Networking/frame_150.jpg)

Each AWS account can have multiple VPCs. You can design your network architecture to include separate VPCs for development, staging, and production environments, or to assign different VPCs for various applications or teams.

![The image illustrates multiple AWS Virtual Private Clouds (VPCs) for a customer, labeled as Development, Staging, and Production environments.](https://kodekloud.com/kk-media/image/upload/v1752861914/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Networking/frame_190.jpg)

## VPCs and AWS Regions

VPCs are region-specific. When creating a VPC, you must choose a region (e.g., US East 1, US East 2, Australia) where your VPC and its resources will be deployed. This regional limitation means that resources within a VPC are confined to that specific region.

![The image illustrates AWS VPCs and regions, showing a VPC in the "us-east-1" region, highlighting that a VPC is specific to a single region.](https://kodekloud.com/kk-media/image/upload/v1752861916/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Networking/frame_280.jpg)

By default, a VPC serves as its own network boundary. Although inter-VPC communication can be configured if necessary, isolation is the default behavior to enhance security.

## Subnets

Subnets are subdivisions of a VPC's IP address range (CIDR block), providing more granular control over where resources reside. When you create subnets, each is associated with a single Availability Zone. For example, consider the following subnets:

- Subnet 1: IP range 172.16.0.0/24
- Subnet 2: IP range 172.16.1.0/24

When you launch an EC2 instance or any AWS resource, it is deployed into a specific subnet and receives an IP address from that subnet's range.

![The image illustrates a Virtual Private Cloud (VPC) with two subnets, each in different availability zones, highlighting subnet IP ranges within a region.](https://kodekloud.com/kk-media/image/upload/v1752861917/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Networking/frame_370.jpg)

Subnets can be classified as either public or private:

- Public Subnet: Directly exposed to the internet via an attached Internet Gateway. Ideal for web servers.
- Private Subnet: Not directly accessible from the internet, making it suitable for databases and internal resources.

![The image illustrates a Virtual Private Cloud (VPC) with public and private subnets across two availability zones, highlighting subnet access to resources.](https://kodekloud.com/kk-media/image/upload/v1752861919/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Networking/frame_430.jpg)

## Hybrid Deployments and CIDR Blocks

For hybrid deployments, you can extend your on-premises data center to AWS using VPN connections. When creating a VPC, you must define a CIDR block—a range of IP addresses available to your VPC. For example, specifying a CIDR block of 192.168.0.0/16 allocates addresses from 192.168.0.0 to 192.168.255.255.

```
CIDR = 192.168.0.0/16
192.168.0.0 - 192.168.255.255
```

Resources launched within a VPC must receive an IP address within this range. Additionally, any subnets you create must have CIDR ranges that fall within the VPC's block. AWS supports valid block sizes ranging from /16 to /28. For instance, 192.168.10.0/24 is valid within 192.168.0.0/16, while a block like 10.100.1.0/24 would be rejected.

> [!important]
> **Note**
>
> AWS reserves the first four IP addresses and the last IP address in each subnet for internal use. In a 192.168.10.0/24 subnet, usable IP addresses start at 192.168.10.4.

![The image explains VPC subnet IP address reservations, showing valid and invalid subnets within a CIDR range of 192.168.0.0/16.](https://kodekloud.com/kk-media/image/upload/v1752861920/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Networking/frame_620.jpg)

## Internet Connectivity for Subnets

By default, subnets are private and not accessible from the internet. To enable internet connectivity, you need to associate your subnet with an Internet Gateway. The Internet Gateway is attached to the VPC and allows bi-directional traffic between the internet and public subnets.

![The image illustrates VPC external connectivity, showing that subnets are private and not exposed to the internet when first created.](https://kodekloud.com/kk-media/image/upload/v1752861921/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Networking/frame_680.jpg)

For scenarios where you need outbound internet access without exposing your resources to unsolicited inbound traffic, you can use a NAT (Network Address Translation) gateway. A NAT gateway enables resources in a private subnet to initiate outbound requests to the internet while blocking incoming connections that were not initiated internally. The NAT gateway is deployed within a public subnet and works in concert with the Internet Gateway.

![The image explains how an Internet Gateway enables subnets in a Virtual Private Cloud (VPC) to communicate with the internet, determining if a subnet is public or private.](https://kodekloud.com/kk-media/image/upload/v1752861923/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Networking/frame_720.jpg)

![The image illustrates a NAT Gateway setup within a Virtual Private Cloud (VPC), emphasizing that connections must originate from within the VPC.](https://kodekloud.com/kk-media/image/upload/v1752861925/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Networking/frame_760.jpg)

When a resource in a private subnet requires internet access, it sends the request to the NAT gateway, which then forwards it to the Internet Gateway. The response follows the reverse path back to the originating resource.

![The image illustrates a network architecture with a Virtual Private Cloud (VPC) containing a public subnet with a NAT Gateway and a private subnet, connected to an Internet Gateway.](https://kodekloud.com/kk-media/image/upload/v1752861926/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Networking/frame_790.jpg)

## Secure Connectivity to Private Resources

Managing or monitoring resources in a private subnet requires secure connectivity. To achieve this, AWS offers VPN gateways (also known as Virtual Private Gateways). These gateways establish an encrypted VPN connection over the internet, enabling secure access to private resources.

![The image illustrates a Virtual Private Gateway setup, connecting a corporate data center to an AWS Virtual Private Cloud (VPC) via a VPN connection.](https://kodekloud.com/kk-media/image/upload/v1752861927/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Networking/frame_820.jpg)

Alternatively, AWS Direct Connect provides a dedicated, high-speed connection between your on-premises network and AWS at a designated Direct Connect location. This option offers lower latency and enhanced security compared to traditional internet connectivity.

![The image illustrates a network diagram showing a corporate data center connected to a Virtual Private Cloud (VPC) via Direct Connect and a VPN gateway.](https://kodekloud.com/kk-media/image/upload/v1752861929/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Networking/frame_890.jpg)

## Summary

To recap, here are the essential points covered in this article:

- A Virtual Private Cloud (VPC) offers a secure, isolated networking environment in AWS where you can control IP addressing, subnets, and traffic flow.
- Each VPC is linked to a single region and is defined by a CIDR block, with subnets carved out of that block.
- Subnets are designated as public (with direct internet access via an Internet Gateway) or private (requiring a NAT gateway for internet access).
- Secure connectivity to private resources is enabled through VPN gateways or AWS Direct Connect.

![The image summarizes AWS networking components, including subnets, Internet Gateways, NAT Gateways, Virtual Private Gateways, and Direct Connect, highlighting their functions and connectivity features.](https://kodekloud.com/kk-media/image/upload/v1752861930/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Networking/frame_1030.jpg)

This comprehensive overview provides the foundational knowledge required for designing secure, scalable, and high-performing AWS cloud architectures. Explore more about AWS networking and best practices in our related guides and documentation.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02/module/dcba3ea8-580a-4aac-ad89-48969e6876ee/lesson/ef9fe10a-07a4-4b68-a21a-06f5ad47412b)**
>
> Watch video content
