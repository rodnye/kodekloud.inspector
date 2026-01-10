# VPC Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Networking/VPC-Overview)

---

## Table of Contents

- VPC Overview
  - What is a Virtual Private Cloud (VPC)?
  - Regional Isolation and VPC Deployment
  - The Role of CIDR Blocks in VPCs
  - Types of VPCs
  - Default VPC Configuration
  - Summary
  - Watch Video
    - Default VPC
    - Custom VPC

---

## Content

AWS Solutions Architect Associate Certification

Services Networking

# VPC Overview

In this article, we dive deep into the AWS Virtual Private Cloud (VPC) concept, a cornerstone of secure and isolated networking in the cloud. Understanding VPCs is essential for anyone looking to master AWS networking, whether you are preparing for the Solutions Architect exam or managing production cloud services.

## What is a Virtual Private Cloud (VPC)?

A Virtual Private Cloud (VPC) provides a secure, isolated section of AWS where you can launch AWS resources in a virtual network that you define. VPCs enable you to isolate resources, ensuring that one customer's data remains separate from another's—even within the same AWS account—and allow you to securely segment different applications.

Within a VPC, you have full control over your networking environment. You can:

- Define custom IP addressing through subnetting.
- Configure routing tables to control packet flow within your account.
- Use security features such as Security Groups and Network Access Control Lists (NACLs) to manage traffic flow.
- Customize inbound and outbound traffic using various types of gateways.

![The image explains what a Virtual Private Cloud (VPC) is, highlighting components like subnetting, routing, firewalls, and gateways. It includes a network diagram and a list of features related to VPCs.](https://kodekloud.com/kk-media/image/upload/v1752865705/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-VPC-Overview/vpc-network-diagram-features.jpg)

> [!important]
> **Note**
>
> Managing your VPC in AWS is similar to managing a traditional data center with routers and switches, but the AWS Management Console streamlines and simplifies the process.

## Regional Isolation and VPC Deployment

When you create a VPC, you must specify a single AWS region for its deployment. For instance, you might have VPC1 in the US East 1 region and VPC2 in US East 2. Each VPC exists solely within its designated region, preventing cross-region communication unless specifically configured.

![The image illustrates AWS Cloud regions "us-east-1" and "us-east-2," each containing a separate VPC (Virtual Private Cloud). It highlights that a VPC is specific to a single region.](https://kodekloud.com/kk-media/image/upload/v1752865706/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-VPC-Overview/aws-cloud-regions-vpc-diagram.jpg)

By design, resources within one VPC are isolated from those in another. To enable communication with the internet or between VPCs, you must explicitly configure the necessary settings, adding an extra layer of security.

## The Role of CIDR Blocks in VPCs

Each VPC is assigned a range of IP addresses via its Classless Inter-Domain Routing (CIDR) block. For example, a VPC with a CIDR block of 192.168.0.0/16 can assign any IP address within that range to its resources. The allowed block sizes vary from a /16 (65,536 addresses) to a /28.

![The image explains VPC (Virtual Private Cloud) concepts, highlighting that each VPC has a CIDR block defining its IP address range, with block sizes ranging from /16 to /28.](https://kodekloud.com/kk-media/image/upload/v1752865707/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-VPC-Overview/vpc-cidr-blocks-ip-addresses.jpg)

In addition to the primary CIDR block, you can enable secondary IPv4 CIDR blocks or add up to five IPv6 CIDR blocks per VPC (each providing a /56 block), enhancing the flexibility and scalability of your network configuration.

![The image is a diagram explaining a Virtual Private Cloud (VPC) with a CIDR block of 192.168.0.0/16, including options for secondary IPv4 and IPv6 CIDR blocks.](https://kodekloud.com/kk-media/image/upload/v1752865708/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-VPC-Overview/vpc-cidr-block-diagram.jpg)

## Types of VPCs

When working with VPCs, you typically encounter two types:

1.  **Default VPC**
2.  **Custom VPC**

### Default VPC

A default VPC is automatically created by AWS when a new account is set up. Each region comes with a default VPC, pre-configured to allow immediate internet connectivity for your instances. This ready-to-use configuration lets you deploy servers without investing time in complex networking setups.

### Custom VPC

Custom VPCs are created and fully configured by you. When you set up a custom VPC, you define:

- The CIDR block
- Subnets and their IP addressing
- Routing configurations
- Network access rules using security groups and NACLs

![The image illustrates a diagram of a Virtual Private Cloud (VPC) within a region, showing two types: Default and Custom. It includes AWS branding and is labeled as a copyright of KodeKloud.](https://kodekloud.com/kk-media/image/upload/v1752865711/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-VPC-Overview/vpc-diagram-default-custom-aws.jpg)

## Default VPC Configuration

AWS provides several default configurations for a default VPC to ease network setup. Below is an overview of these settings:

| Feature                        | Default Configuration                                      | Description                                                              |
| ------------------------------ | ---------------------------------------------------------- | ------------------------------------------------------------------------ |
| **CIDR Block**                 | 172.31.0.0/16                                              | Provides 65,536 IP addresses                                             |
| **Default Subnets**            | One subnet per availability zone (typically /20 CIDR each) | For example, one zone may have 172.31.16.0/20 and another 172.31.32.0/20 |
| **Internet Gateway**           | Attached with a default route (0.0.0.0/0)                  | Enables internet connectivity for instances                              |
| **Default Security Group**     | Configured to allow outbound traffic                       | Protects instances by default                                            |
| **Default Network ACL (NACL)** | Allows both inbound and outbound traffic                   | Provides an additional layer of security                                 |

> [!important]
> **Note**
>
> AWS configures a default VPC in every region. This configuration is designed to help you get started quickly, but for production environments, you might consider creating custom VPCs tailored to your specific security and performance requirements.

![The image is a diagram explaining the structure of a default Virtual Private Cloud (VPC) in a region, showing a /16 IPv4 CIDR block and default subnets in two availability zones.](https://kodekloud.com/kk-media/image/upload/v1752865712/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-VPC-Overview/vpc-structure-default-cidr-diagram.jpg)

![The image is a diagram of a default Virtual Private Cloud (VPC) setup, showing components like an internet gateway, public subnets in two availability zones, and security features such as a security group and network access control list.](https://kodekloud.com/kk-media/image/upload/v1752865714/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-VPC-Overview/vpc-setup-diagram-internet-gateway.jpg)

## Summary

To summarize the key points:

- VPCs are a foundational element of AWS networking, providing isolated environments for deploying resources.
- Each VPC exists within a single AWS region, enhancing security and network segmentation.
- A VPC’s network is defined by its CIDR block, which restricts the range of assignable IP addresses.
- AWS provides a default VPC per region with pre-configured subnets, an internet gateway, a security group, and a NACL.
- The default VPC uses the CIDR block 172.31.0.0/16, with each availability zone having one default subnet.

![The image is a summary slide highlighting that every region has a default VPC with subnets, security groups, and NACLs, and the CIDR block for the default is 172.31.0.0/16.](https://kodekloud.com/kk-media/image/upload/v1752865715/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-VPC-Overview/default-vpc-subnets-security-groups.jpg)

![The image is a summary slide stating that security groups in a default VPC allow outbound traffic, and NACLs are open in both inbound and outbound directions.](https://kodekloud.com/kk-media/image/upload/v1752865716/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-VPC-Overview/security-groups-nacls-summary-slide.jpg)

This comprehensive overview should serve as a valuable resource for understanding the design and functionality of AWS Virtual Private Clouds (VPCs). For further reading, consider exploring the [AWS Documentation](https://aws.amazon.com/documentation/) and [AWS VPC FAQs](https://aws.amazon.com/vpc/faqs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/e03ffb87-3345-4fbb-9576-cb53d21d7a6a/lesson/a734115c-7980-4ff4-a86c-bda9435d7f2e)**
>
> Watch video content
