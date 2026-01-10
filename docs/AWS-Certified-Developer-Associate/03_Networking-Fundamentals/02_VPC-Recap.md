# VPC Recap - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Networking-Fundamentals/VPC-Recap)

---

## Table of Contents

- VPC Recap
  - Summary
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Networking Fundamentals

# VPC Recap

In this lesson, we will review a fundamental networking concept within AWS: the Virtual Private Cloud (VPC).

A Virtual Private Cloud is a secure, isolated network segment hosted within AWS. It enables you to isolate resources both from those of other customers and within your own AWS account. For example, if you have multiple applications running in the same account and need to prevent them from communicating with each other, you can deploy them in separate VPCs to enforce strict isolation.

![The image is a diagram explaining a Virtual Private Cloud (VPC) within the AWS Cloud, showing various icons representing different cloud services.](https://kodekloud.com/kk-media/image/upload/v1752859276/notes-assets/images/AWS-Certified-Developer-Associate-VPC-Recap/vpc-aws-cloud-services-diagram.jpg)

Using VPCs provides you with full control over your cloud networking environment. You decide the subnetting, specify your IP address range, configure routing tables, and manage security through components like security groups and network access control lists (NACLs). Furthermore, you can control incoming and outgoing traffic by configuring various gateways. This setup closely resembles managing a physical data center, with AWS streamlining and automating many of the manual tasks.

![The image explains the concept of a Virtual Private Cloud (VPC) with a diagram and lists components like subnetting, routing, firewalls, and gateways.](https://kodekloud.com/kk-media/image/upload/v1752859277/notes-assets/images/AWS-Certified-Developer-Associate-VPC-Recap/vpc-diagram-subnetting-routing-firewalls.jpg)

> [!important]
> **Region-Specific VPCs**
>
> An important aspect for the AWS Solutions Architect exam is that VPCs are specific to a single region. When you create a VPC, you must assign it to a region. For instance, if you create VPC One in the US East 1 region and VPC Two in the US East 2 region, these VPCs are bound to their respective regions and cannot extend across multiple regions.

![The image illustrates AWS Cloud with two regions, "us-east-1" and "us-east-2," each containing a separate VPC (Virtual Private Cloud). It highlights that a VPC is specific to a single region.](https://kodekloud.com/kk-media/image/upload/v1752859279/notes-assets/images/AWS-Certified-Developer-Associate-VPC-Recap/aws-cloud-regions-vpc-diagram.jpg)

VPCs serve as a network boundary. By default, resources inside a VPC are isolated from those in other VPCs. To allow communication with external systems—such as the internet or other VPCs—you must explicitly configure network access.

Each VPC is assigned a range of IP addresses defined by a Classless Inter-Domain Routing (CIDR) block. For example, if you create VPC One with a CIDR block of 192.168.0.0/16, the available IP range will be from 192.168.0.0 to 192.168.255.255. Additionally, you have the option to enable a secondary IPv4 block or configure IPv6 CIDR blocks (providing a /56 block). You can associate up to five IPv6 CIDR blocks with a VPC, though this limit can be adjusted.

![The image explains the concept of a VPC (Virtual Private Cloud) and its CIDR block, detailing how IP addresses are assigned and the range of CIDR block sizes. It includes a labeled diagram of "VPC 1."](https://kodekloud.com/kk-media/image/upload/v1752859281/notes-assets/images/AWS-Certified-Developer-Associate-VPC-Recap/vpc-cidr-block-diagram.jpg)

In AWS, there are two types of VPCs: default VPCs and custom VPCs.

- A **default VPC** is automatically created by AWS for every region when you set up a new account. This configuration provides immediate internet connectivity for your resources, making it simple to launch servers without additional configuration.

![The image is a diagram explaining a Virtual Private Cloud (VPC) with a CIDR block of 192.168.0.0/16, including options for secondary IPv4 and IPv6 CIDR blocks.](https://kodekloud.com/kk-media/image/upload/v1752859282/notes-assets/images/AWS-Certified-Developer-Associate-VPC-Recap/vpc-cidr-block-diagram-ipv4-ipv6.jpg)

- A **custom VPC** is one that you create and configure. With a custom VPC, you define all the settings—including the CIDR block, subnets, routing, and security controls—allowing for a tailored network environment that meets your specific requirements.

Let’s explore the default VPC configuration provided by AWS:

- You receive one default VPC per region, each configured with a /16 IPv4 CIDR block (specifically, 172.31.0.0/16), which provides 65,536 IP addresses.
- In every Availability Zone within that region, a default subnet is created with a /20 CIDR block. For example, one Availability Zone might have the subnet 172.31.16.0/20 and another might have 172.31.32.0/20.
- An internet gateway is attached to the default VPC, and a default route (0.0.0.0/0) directs all outbound traffic to this gateway, ensuring seamless internet connectivity.
- Default security groups and NACLs are set up: the default security group typically allows outbound traffic, while the default NACL permits both inbound and outbound traffic.

![The image illustrates a default VPC setup with an internet gateway, showing public subnets in two availability zones, and highlighting that devices in these subnets are accessible from the internet.](https://kodekloud.com/kk-media/image/upload/v1752859284/notes-assets/images/AWS-Certified-Developer-Associate-VPC-Recap/default-vpc-internet-gateway-diagram.jpg)

## Summary

- A VPC isolates computing resources within the cloud and is tied to a specific region.
- The CIDR block assigned to a VPC defines the IP addresses available for its resources.
- You can configure optional secondary IPv4 and IPv6 CIDR blocks.
- Each AWS region includes a default VPC complete with default subnets, an internet gateway, default routing, and essential security controls.
- Default VPC security groups allow outbound traffic, and default NACLs are open for both inbound and outbound traffic.

This overview should help you understand both the default settings provided by AWS and the customization options available with custom VPCs, ensuring you can design a network environment tailored to your application's needs.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/c8f3ca76-9178-474e-a33b-bf1de4fd948c/lesson/48da6d69-ab96-4035-bf27-1c65f2c56316)**
>
> Watch video content
