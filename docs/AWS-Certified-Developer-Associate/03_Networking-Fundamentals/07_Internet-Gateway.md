# Internet Gateway - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Networking-Fundamentals/Internet-Gateway)

---

## Table of Contents

- Internet Gateway
  - What Is an Internet Gateway?
  - Converting a Private Subnet to a Public Subnet
  - How the Default Route Works
  - How AWS Handles IP Address Translation
  - Summary
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Networking Fundamentals

# Internet Gateway

In this article, we explore the concept of an Internet Gateway and its pivotal role in providing internet connectivity to your VPC subnets.

By default, when you create a subnet, it is classified as a private subnet. Devices in these subnets lack direct access to the internet, and external networks cannot initiate connections to them. To enable internet connectivity, you need to convert a private subnet into a public subnet by associating it with an Internet Gateway.

## What Is an Internet Gateway?

An Internet Gateway is a horizontally scaled, redundant, and highly available component attached to your VPC. It is region resilient, spanning all Availability Zones within that region. Without an Internet Gateway, all subnets in a VPC remain private.

> [!important]
> **Key Constraints**
>
> - A VPC can have at most one Internet Gateway attached.
> - An Internet Gateway can only be attached to one VPC at a time.

## Converting a Private Subnet to a Public Subnet

The process to convert your private subnet into a public one involves the following steps:

1.  Create an Internet Gateway.
2.  Attach the Internet Gateway to your VPC.
3.  Create a custom route table.
4.  Add a default route (0.0.0.0/0) in the custom route table that directs all traffic to the Internet Gateway.
5.  Associate the public subnet with the custom route table.

The diagram below provides a visual representation of these steps:

![The image illustrates the setup of an Internet Gateway within a VPC, showing steps like creating an IGW, attaching it to a VPC, creating a custom route table, and configuring a default route. It includes a diagram of a region with a VPC, availability zone, public subnet, and route table.](https://kodekloud.com/kk-media/image/upload/v1752859167/notes-assets/images/AWS-Certified-Developer-Associate-Internet-Gateway/internet-gateway-vpc-setup-diagram.jpg)

## How the Default Route Works

The default route in the custom route table acts as a catch-all. When a packet does not match any other specific route, it is forwarded to the Internet Gateway, which then handles the traffic to and from the internet.

After the public subnet is associated with the custom route table, resources launched in that subnet gain internet access. However, by default, resources deployed in a public subnet are assigned only a private IP address. To allow external communication, you must enable auto-assignment of a public IP address. This way, a public IP is mapped to the resource’s private IP.

The following diagram illustrates this network setup:

![The image is a diagram illustrating a network setup within a cloud environment, showing a public IP configuration in a VPC with a public subnet and resource.](https://kodekloud.com/kk-media/image/upload/v1752859168/notes-assets/images/AWS-Certified-Developer-Associate-Internet-Gateway/cloud-network-setup-vpc-diagram.jpg)

## How AWS Handles IP Address Translation

In this setup:

- The resource (for example, an EC2 instance) is assigned a private IP (e.g., 192.168.1.1) recognized by its operating system.
- When configured to auto-assign a public IP, an external public IP (e.g., 1.1.1.1) is associated with the instance.
- The instance remains unaware of the public IP because AWS manages the translation between public and private IP addresses.
- Incoming traffic directed to the public IP is translated by AWS and then forwarded to the corresponding private IP.

This mechanism ensures that resources can communicate with external networks while preserving the security of their internal configurations.

## Summary

Internet Gateways are essential for enabling internet connectivity for resources within a VPC. Here’s a quick overview:

- Internet Gateways provide the necessary connectivity for VPC resources to access the internet.
- They are attached to VPCs (with a maximum of one per VPC) and operate seamlessly across all Availability Zones in a region.
- Converting a private subnet into a public subnet requires creating and attaching an Internet Gateway, configuring a custom route table with a default route pointing to it, and associating the subnet with that route table.

![The image is a summary slide outlining three key points about internet gateways and VPCs, including connectivity, attachment, and limitations.](https://kodekloud.com/kk-media/image/upload/v1752859169/notes-assets/images/AWS-Certified-Developer-Associate-Internet-Gateway/internet-gateways-vpcs-summary-slide.jpg)

By following these steps, you can successfully configure your public subnets and ensure that your resources maintain robust and secure communication with the internet.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/c8f3ca76-9178-474e-a33b-bf1de4fd948c/lesson/cb3e277d-c58e-4756-8be0-48a4fc40499e)**
>
> Watch video content
