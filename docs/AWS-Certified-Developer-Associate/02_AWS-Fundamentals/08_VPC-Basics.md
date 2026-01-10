# VPC Basics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/AWS-Fundamentals/VPC-Basics)

---

## Table of Contents

- VPC Basics
  - Default VPC Configuration
  - Summary
  - Watch Video

---

## Content

AWS Certified Developer - Associate

AWS Fundamentals

# VPC Basics

In this lesson, we explore a key networking concept in AWS: Virtual Private Clouds (VPCs). A VPC provides a secure, isolated network within AWS, enabling you to segregate resources from those of other customers or separate applications within the same account.

VPCs offer complete control over your cloud networking environment. You can define subnet ranges, configure routing tables to direct traffic within your account, and set up security measures—using security groups and network access control lists (NACLs)—to control both inbound and outbound traffic. Additionally, gateways help customize the flow of traffic in and out of your VPC.

![The image explains the concept of a Virtual Private Cloud (VPC) with a diagram and lists components like subnetting, routing, firewalls, and gateways.](https://kodekloud.com/kk-media/image/upload/v1752858268/notes-assets/images/AWS-Certified-Developer-Associate-VPC-Basics/vpc-diagram-subnetting-routing-firewalls.jpg)

This configuration is analogous to managing a physical data center, where you would handle routers, switches, and IP configurations manually. AWS simplifies these tasks, allowing you to manage and scale your network resources through an intuitive interface.

> [!important]
> **Key Information**
>
> Remember, VPCs are specific to a single AWS region. When creating a VPC, you must specify the region where it will reside.

For example, if you have one VPC in US East 1 and another in US East 2, these VPCs remain isolated within their respective regions.

![The image illustrates AWS Cloud with two regions, "us-east-1" and "us-east-2," each containing a separate VPC (Virtual Private Cloud). It highlights that a VPC is specific to a single region.](https://kodekloud.com/kk-media/image/upload/v1752858269/notes-assets/images/AWS-Certified-Developer-Associate-VPC-Basics/aws-cloud-regions-vpc-diagram.jpg)

By default, resources in one VPC cannot communicate with those in another unless explicitly configured, enhancing network isolation and security. To enable communication—either between VPCs or with the Internet—additional settings must be applied.

Every VPC is assigned a CIDR block, which defines the range of IP addresses available to its resources. For instance, assigning the CIDR block 192.168.0.0/16 to a VPC provides IP addresses from 192.168.0.0 to 192.168.255.255. The permissible size for a CIDR block in a VPC ranges from /16 to /28. Optionally, you can attach a secondary IPv4 CIDR block or associate an IPv6 CIDR block (typically a /56 range). Although the default limit is five IPv6 CIDR blocks per VPC, this limit can be increased.

![The image is a diagram explaining a Virtual Private Cloud (VPC) with a CIDR block of 192.168.0.0/16, including options for secondary IPv4 and IPv6 CIDR blocks.](https://kodekloud.com/kk-media/image/upload/v1752858273/notes-assets/images/AWS-Certified-Developer-Associate-VPC-Basics/vpc-cidr-block-diagram-ipv4-ipv6.jpg)

There are two types of VPC configurations:

1.  **Default VPCs:**  
    AWS automatically creates a default VPC for each region when you open a new account. These VPCs are pre-configured to support Internet connectivity, so you can begin deploying resources without additional setup.
2.  **Custom VPCs:**  
    With custom VPCs, you manually specify the CIDR block and configure settings such as subnets, routing, and access controls. This approach allows for a higher degree of customization and isolation to meet specific networking requirements.

![The image illustrates a diagram of a Virtual Private Cloud (VPC) setup within a region, showing both default and custom VPCs.](https://kodekloud.com/kk-media/image/upload/v1752858278/notes-assets/images/AWS-Certified-Developer-Associate-VPC-Basics/vpc-setup-diagram-default-custom.jpg)

## Default VPC Configuration

The default configuration of a VPC includes the following:

1.  **Single Default VPC per Region:**  
    Every region in your AWS account includes one default VPC. This VPC uses a /16 IPv4 CIDR block, specifically 172.31.0.0/16, providing 65,536 IP addresses.
2.  **Default Subnets:**  
    For each availability zone (AZ) within the region, AWS creates a default subnet with a /20 CIDR block. For example, one AZ might have a subnet of 172.31.16.0/20, while another has 172.31.32.0/20.
3.  **Internet Gateway and Routing:**  
    An internet gateway is attached to the VPC, and a default route (0.0.0.0/0) directs outbound traffic to this gateway. This setup enables Internet access for VPC resources and allows inbound traffic if properly configured.
4.  **Default Security Groups and NACLs:**  
    AWS establishes default security groups that allow outbound traffic and NACLs configured to permit both inbound and outbound traffic.

![The image illustrates a Virtual Private Cloud (VPC) setup, showing a default VPC per region with a /16 IPv4 CIDR block and default subnets in each availability zone.](https://kodekloud.com/kk-media/image/upload/v1752858280/notes-assets/images/AWS-Certified-Developer-Associate-VPC-Basics/vpc-setup-default-cidr-subnets.jpg)

![The image illustrates the structure of a default VPC, showing components like an internet gateway, public subnets, and security groups within a region. It highlights how traffic is routed and the accessibility of devices from the internet.](https://kodekloud.com/kk-media/image/upload/v1752858281/notes-assets/images/AWS-Certified-Developer-Associate-VPC-Basics/default-vpc-structure-internet-gateway.jpg)

## Summary

A VPC isolates computing resources within the AWS cloud by tying them to a specific region and defining an IP address range using a CIDR block. You can extend a VPC's capacity with secondary IPv4 or IPv6 CIDR blocks if needed. AWS provides a default VPC in every region with pre-configured subnets, security groups, and NACLs set up for immediate Internet connectivity—using the 172.31.0.0/16 CIDR block and default subnet configurations per availability zone.

This lesson offers a comprehensive overview of how VPCs function in AWS, as well as the differences between default and custom VPC configurations. For further reading and best practices, consider reviewing the official [AWS VPC documentation](https://aws.amazon.com/vpc/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/6d3acaeb-020a-4e1e-9bd0-5fc6c50eb164/lesson/f7d055ac-0625-4ad3-9257-19a85e44404f)**
>
> Watch video content
