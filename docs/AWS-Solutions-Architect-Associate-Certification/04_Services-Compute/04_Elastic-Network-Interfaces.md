# Elastic Network Interfaces - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Compute/Elastic-Network-Interfaces)

---

## Table of Contents

- Elastic Network Interfaces
  - Key Properties of ENIs
  - Primary vs. Secondary ENIs
  - Elastic IP Addresses and Security Groups
  - Benefits of Using ENIs
  - Summary
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Compute

# Elastic Network Interfaces

In this article, we delve into Elastic Network Interfaces (ENIs) in [Amazon EC2](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2). An ENI is a virtual network interface that can be attached to EC2 instances within a VPC. It decouples network configurations from the compute instances, enabling you to seamlessly move an interface—with all its associated settings such as IP addresses, security groups, and more—across different instances.

## Key Properties of ENIs

An ENI represents a logical version of a physical network card in a VPC. Its main properties include:

- A primary private IPv4 address automatically selected from the subnet's CIDR block.
- Optionally, a primary IPv6 address.
- Secondary private IPv4 addresses.
- The ability to associate an Elastic IP address.
- Public IP address allocation when enabled.
- A unique MAC address.
- Configurable flags like the source/destination check.

![The image illustrates a network architecture diagram showing an Elastic Network Interface within a VPC, including a public and private IP, a subnet, and security components.](https://kodekloud.com/kk-media/image/upload/v1752864957/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Network-Interfaces/network-architecture-diagram-vpc.jpg)

## Primary vs. Secondary ENIs

When you launch an [Amazon EC2](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2) instance, it automatically receives a primary ENI, typically named Ethernet0. This primary ENI comes with a primary private IPv4 address sourced from the associated subnet. It remains attached to the instance for its lifetime and cannot be detached—even during instance stops or restarts—and is deleted when the instance is terminated. Additionally, if your subnet configuration auto-assigns public IP addresses, this ENI will obtain a public IP address as well.

> [!important]
> **Important**
>
> The primary ENI is permanently linked to its instance. Secondary ENIs, however, can be detached and reattached, making them ideal for scenarios like network appliances or management networks.

Secondary ENIs offer enhanced flexibility:

- They can be attached to or detached from EC2 instances as needed.
- They can host a primary private IP along with multiple secondary private IP addresses.
- They may have different security groups compared to the primary ENI, allowing for distinct network and security configurations.

![The image compares primary and secondary Elastic Network Interfaces (ENI), showing their associated public and private IP addresses. The primary ENI (eth0) has IPs 34.191.162.238 (public) and 10.0.0.35 (private), while the secondary ENI (eth1) has IPs 54.35.215.118 (public) and 10.0.1.69 (private).](https://kodekloud.com/kk-media/image/upload/v1752864958/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Network-Interfaces/eni-ip-addresses-comparison.jpg)

Remember, while the primary ENI is immovable, secondary ENIs persist even when an instance is stopped or restarted, offering the ability to transfer them between instances when necessary.

![The image illustrates the concept of Elastic Network Interfaces (ENI) in Amazon EC2, showing a central EC2 instance connected to one primary and two secondary ENIs.](https://kodekloud.com/kk-media/image/upload/v1752864959/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Network-Interfaces/elastic-network-interfaces-ec2-diagram.jpg)

## Elastic IP Addresses and Security Groups

You can associate an Elastic IP address with an ENI, which guarantees that the IP remains constant even if the ENI is detached and later reattached to a different instance. Moreover, security groups can be directly linked to an ENI, allowing granular control over the traffic at the interface level.

## Benefits of Using ENIs

ENIs offer several powerful features for designing flexible and secure network architectures on AWS:

| Feature                      | Benefit                                                                    |
| ---------------------------- | -------------------------------------------------------------------------- |
| Multiple IP Addresses        | Support for both primary and secondary private IPv4 addresses              |
| Elastic IP Association       | Maintain static IP configurations regardless of instance changes           |
| Enhanced Security            | Assign different security groups directly at the interface level           |
| Hot Attach/Detach Capability | Attach or detach ENIs without stopping or restarting the instance          |
| Flow Logs Configuration      | Capture detailed IP traffic information for monitoring and troubleshooting |

![The image lists five features: Multiple IP Addresses, Elastic IP Addresses, Security, Hot Attach and Detach, and Network Flow Logs, each with an icon.](https://kodekloud.com/kk-media/image/upload/v1752864959/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Network-Interfaces/features-multiple-ip-elastic-security.jpg)

## Summary

ENIs are robust and versatile components of Amazon EC2 that help you:

- Decouple network configurations from compute instances.
- Leverage multiple IP addressing schemes.
- Configure static IP addresses through Elastic IP associations.
- Implement specialized security configurations using dedicated security groups.
- Enhance operational flexibility by allowing dynamic attachment and detachment of network interfaces.

For more detailed guidance and best practices on AWS networking, explore the [Amazon EC2 documentation](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-eni.html).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/afe0c951-fe76-47f2-9fc4-18858721be70/lesson/0b43e510-b3b3-4f09-8ebb-fceb9b6c92b9)**
>
> Watch video content
