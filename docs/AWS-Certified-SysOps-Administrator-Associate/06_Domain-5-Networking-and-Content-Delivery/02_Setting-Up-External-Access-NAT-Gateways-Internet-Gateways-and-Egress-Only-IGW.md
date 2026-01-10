# Setting Up External Access NAT Gateways Internet Gateways and Egress Only IGW - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-5-Networking-and-Content-Delivery/Setting-Up-External-Access-NAT-Gateways-Internet-Gateways-and-Egress-Only-IGW)

---

## Table of Contents

- Setting Up External Access NAT Gateways Internet Gateways and Egress Only IGW
  - Internet Gateway
  - NAT Gateway
  - Egress-Only Internet Gateway
  - Summary
  - Watch Video
  - Practice Lab

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 5 Networking and Content Delivery

# Setting Up External Access NAT Gateways Internet Gateways and Egress Only IGW

In this lesson, we explain how to enable external internet access for your Virtual Private Clouds (VPCs) by configuring Internet Gateways, NAT Gateways, and Egress-Only Internet Gateways. These components allow you to control the direction and method of internet connectivity based on your use case.

## Internet Gateway

An Internet Gateway is a virtual device that connects your VPC to the internet. Each VPC can have only one attached Internet Gateway. To enable external access for your resources, you must update the route table of your public subnet to direct traffic to the Internet Gateway. Consider the following points:

- The resource must reside in a public subnet with an appropriate route.
- Security groups and network ACLs must allow outbound connectivity.
- The resource must have a public IP address (either chosen at launch or assigned as an Elastic IP).

For example, in a private subnet without an Internet Gateway route, the resource remains inaccessible from the internet. The standard steps to configure an Internet Gateway are:

1.  Create an Internet Gateway.
2.  Attach the Internet Gateway to your VPC.
3.  Update the route table to direct non-local traffic through the Internet Gateway.
4.  Associate the route table with a public subnet.
5.  Ensure the resource in the subnet is assigned a public IP address.

![The image is a diagram illustrating the setup of an Internet Gateway within a VPC, showing steps like creating an IGW, attaching it to a VPC, and configuring route tables. It includes a visual representation of a region, VPC, availability zone, and public subnet.](https://kodekloud.com/kk-media/image/upload/v1752860927/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Setting-Up-External-Access-NAT-Gateways-Internet-Gateways-and-Egress-Only-IGW/internet-gateway-vpc-setup-diagram.jpg)

Once correctly configured, traffic from a resource’s public IP address routes through the Internet Gateway, allowing both outbound and (if permitted by firewall rules) inbound communication.

For instance, consider a resource that receives a public IP (e.g., 1.1.1.1) at launch while retaining its private IP. This dual-address setup is common in many web applications:

![The image is a diagram illustrating a network setup within a cloud environment, showing a region containing a default VPC, an availability zone, a public subnet, and a resource with both private and public IP addresses.](https://kodekloud.com/kk-media/image/upload/v1752860929/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Setting-Up-External-Access-NAT-Gateways-Internet-Gateways-and-Egress-Only-IGW/cloud-network-setup-diagram.jpg)

It is important to note that the resource's private IP remains permanently associated, while the public IP serves solely for internet connectivity:

![The image illustrates a diagram of an AWS Cloud setup, showing a public subnet containing a resource with both a private IP (192.163.1.1) and a public IP (1.1.1.1), connected to a user.](https://kodekloud.com/kk-media/image/upload/v1752860930/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Setting-Up-External-Access-NAT-Gateways-Internet-Gateways-and-Egress-Only-IGW/aws-cloud-setup-diagram.jpg)

## NAT Gateway

A NAT Gateway enables instances in private subnets to initiate outbound connections while blocking inbound traffic from the internet. This setup maintains the security of your resources while allowing necessary outbound communication.

Key considerations when using a NAT Gateway include:

- The route table of the private subnet directs outbound traffic to the NAT Gateway.
- The NAT Gateway resides in a public subnet with its own route to the Internet Gateway.
- It acts as a proxy by translating private IP addresses to a public IP address.
- It supports both IPv4 (primarily) and IPv6 (using NAT64), though it is mainly used for IPv4 outbound traffic.
- It is AZ-specific, meaning you should deploy one NAT Gateway per Availability Zone to minimize latency.

> [!important]
> **Cost Consideration**
>
> Remember that NAT Gateways incur hourly charges as well as fees per gigabyte processed. Monitor usage to manage costs effectively.

![The image illustrates a network diagram of a NAT Gateway setup within a VPC, showing public and private subnets, route tables, and internet connectivity.](https://kodekloud.com/kk-media/image/upload/v1752860932/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Setting-Up-External-Access-NAT-Gateways-Internet-Gateways-and-Egress-Only-IGW/nat-gateway-vpc-network-diagram.jpg)

While it is possible for multiple private subnets to route traffic through a single NAT Gateway, best practices suggest deploying one per Availability Zone:

![The image is a diagram illustrating a NAT Gateway setup within a VPC, showing four availability zones with routing configurations.](https://kodekloud.com/kk-media/image/upload/v1752860933/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Setting-Up-External-Access-NAT-Gateways-Internet-Gateways-and-Egress-Only-IGW/nat-gateway-vpc-setup-diagram.jpg)

## Egress-Only Internet Gateway

The Egress-Only Internet Gateway is used exclusively for IPv6 traffic in private subnets. It allows outbound-only connections, ensuring that no incoming traffic can reach the resource.

Key details include:

- Supports only IPv6 traffic.
- Permits outbound connections only, with all inbound traffic blocked.
- Does not perform IP translation between IPv6 and IPv4.
- Is configured in the route table similarly to an Internet or NAT Gateway.
- No special placement in public subnets is required.
- While there is no setup fee, standard data transfer charges apply for outbound traffic.

![The image is a diagram illustrating an "Egress-Only Internet Gateway" setup within a cloud environment, showing a VPC, private subnet, and associated IP ranges.](https://kodekloud.com/kk-media/image/upload/v1752860935/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Setting-Up-External-Access-NAT-Gateways-Internet-Gateways-and-Egress-Only-IGW/egress-only-internet-gateway-diagram.jpg)

For clarity, consider the following comparison:

- NAT Gateways translate IPv4 addresses (and support IPv6 via NAT64) and act as proxies.
- Egress-only Internet Gateways offer a direct, unaltered IPv6 connection for outbound traffic without translation.

![The image compares an Egress-Only Internet Gateway, which is for IPv6 and supports one-way communication, with a NAT Gateway, which is for IPv4 and supports one-way translation.](https://kodekloud.com/kk-media/image/upload/v1752860936/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Setting-Up-External-Access-NAT-Gateways-Internet-Gateways-and-Egress-Only-IGW/egress-only-gateway-vs-nat-gateway.jpg)

Additionally, the following diagram offers a visual comparison of these gateways:

![The image is a comparison table between Egress-Only Internet Gateway and NAT Gateway, highlighting differences in IP version, communication type, and Elastic IP requirements.](https://kodekloud.com/kk-media/image/upload/v1752860937/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Setting-Up-External-Access-NAT-Gateways-Internet-Gateways-and-Egress-Only-IGW/egress-only-vs-nat-gateway-table.jpg)

## Summary

- **Internet Gateway:**  
  Provides full bidirectional internet access for public subnets. Every VPC can have one attached, making it essential for resources requiring external connectivity.
- **NAT Gateway:**  
  Allows private subnets to access the internet (primarily IPv4) by translating private IP addresses to a public IP address. It prevents inbound connections from external sources.
- **Egress-Only Internet Gateway:**  
  Designed for IPv6 outbound traffic in private subnets, it ensures a direct connection without translation and blocks all inbound traffic.

Understanding the correct deployment and configuration of these gateways is crucial for both secure network architectures and exam preparation. Proper implementation of these components helps maintain secure, scalable, and cost-effective external access for your VPC instances.

We'll see you in the next lesson.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/fd99c412-5efc-46e2-99ce-bb9c581fec27/lesson/855e2dc1-71ec-453c-a966-f602b502ee1b)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/fd99c412-5efc-46e2-99ce-bb9c581fec27/lesson/a731b6c9-3a24-4974-9322-6231b790a1c8)**
>
> Practice lab
