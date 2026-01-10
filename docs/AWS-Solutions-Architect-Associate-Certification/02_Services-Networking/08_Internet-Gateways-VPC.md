# Internet Gateways VPC - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Networking/Internet-Gateways-VPC)

---

## Table of Contents

- Internet Gateways VPC
  - Converting a Private Subnet to a Public Subnet
  - Public and Private IP Addressing
  - Summary
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Networking

# Internet Gateways VPC

In this guide, you'll learn how Internet Gateways enable public connectivity for subnets within a Virtual Private Cloud (VPC). Understanding this concept is crucial for configuring your AWS environment for both private and public communication.

By default, subnets in a VPC are created as private. Devices within these subnets cannot access the Internet, and external resources cannot reach them. To convert a subnet into a public subnet, you must attach an Internet Gateway to your VPC.

> [!important]
> **Important Reminders**
>
> - Each VPC can have only **one Internet Gateway** attached.
> - An Internet Gateway can only be attached to **one VPC** at a time.

An Internet Gateway is a horizontally scaled, redundant, and highly available component that spans all Availability Zones within a region. It provides the essential communication bridge between resources inside your VPC and the Internet. Without an Internet Gateway, all subnets in your VPC remain private by default.

## Converting a Private Subnet to a Public Subnet

To transform a private subnet into a public one, follow these essential steps:

1.  **Create an Internet Gateway.**
2.  **Attach the Internet Gateway to your VPC.**
3.  **Create a custom route table.**
4.  **Configure a default route in the route table that points to the Internet Gateway.**  
    This default route ensures that any traffic without a more specific route is forwarded to the Internet Gateway.
5.  **Associate the desired subnet with the custom route table.**  
    This association enables all resources within that subnet to access the Internet.

![The image illustrates the setup of an Internet Gateway within a VPC, showing steps like creating the gateway, attaching it to the VPC, and configuring route tables. It includes a diagram of a region with a public subnet in an availability zone.](https://kodekloud.com/kk-media/image/upload/v1752865571/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Internet-Gateways-VPC/internet-gateway-vpc-setup-diagram.jpg)

## Public and Private IP Addressing

When you deploy resources in a public subnet, they automatically receive a private IP address. To allow Internet-facing communication, you must enable the assignment of public IP addresses.

For example:

- A resource might have a private IP like 192.168.1.1.
- Additionally, it will receive a public IP, such as 1.1.1.1, which external clients can use to reach the resource.

It's important to note that the resource itself only recognizes its private IP. AWS manages the translation between the public and private IP addresses. When an external request is directed to the public IP, AWS forwards it to the corresponding private IP.

![The image is a diagram illustrating a network setup with a public IP, showing a resource within a public subnet in a VPC (default) in Availability Zone 2. It includes IP addresses and a checkbox indicating the intention to assign a public IP.](https://kodekloud.com/kk-media/image/upload/v1752865571/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Internet-Gateways-VPC/network-setup-public-ip-diagram.jpg)

Each network interface on a resource can have its own pair of public and private IP addresses. AWS seamlessly manages the mapping between these IP addresses to ensure smooth communication.

## Summary

To recap the key points about Internet Gateways and VPC connectivity:

- Internet Gateways provide necessary public connectivity for VPC resources.
- They offer regional resilience by spanning all Availability Zones.
- Each VPC is limited to one Internet Gateway, and an Internet Gateway can be attached to only a single VPC.
- A subnet is converted to a public subnet when its route table includes a default route pointing to the Internet Gateway.

![The image is a summary slide with three key points about internet gateways and VPCs: enabling internet connectivity, attachment to VPCs with regional resilience, and the limitation of one internet gateway per VPC.](https://kodekloud.com/kk-media/image/upload/v1752865572/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Internet-Gateways-VPC/internet-gateways-vpcs-summary-slide.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/e03ffb87-3345-4fbb-9576-cb53d21d7a6a/lesson/ced0c275-2031-4453-9149-38390b24009f)**
>
> Watch video content
