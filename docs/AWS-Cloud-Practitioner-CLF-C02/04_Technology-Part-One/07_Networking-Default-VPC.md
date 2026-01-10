# Networking Default VPC - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Cloud-Practitioner-CLF-C02/Technology-Part-One/Networking-Default-VPC)

---

## Table of Contents

- Networking Default VPC
  - Default VPC Structure
  - Summary of Default VPC Features
  - Watch Video

---

## Content

AWS Cloud Practitioner CLF-C02

Technology Part One

# Networking Default VPC

In this lesson, we delve into the concept of default VPCs, compare them with custom VPCs, and explain the automated networking configuration that AWS provides. You'll gain insight into how these preconfigured environments enable rapid deployment and internet connectivity.

AWS provides two types of Virtual Private Clouds (VPCs):

- **Default VPCs:** Automatically created in every region when you open an AWS account. They include preconfigured settings designed for quick access and straightforward deployment.
- **Custom VPCs:** Require manual configuration of settings such as internet connectivity, subnets, and security policies.

> [!important]
> **Note**
>
> Default VPCs are ideal for users who want a ready-to-use network environment that supports internet-accessible resources without manual setup.

## Default VPC Structure

Each default VPC in AWS exhibits the following characteristics:

1.  **Single VPC per Region:** Every region has one default VPC.
2.  **CIDR Block:** The default VPC is assigned a /16 CIDR block, specifically **172.31.0.0/16**, offering 65,536 IP addresses.
3.  **Default Subnets:** For each availability zone in a region, a default subnet is created. For instance, if a region has two availability zones, there will be two subnets. These subnets are typically configured with a /20 mask (e.g., **172.31.0.0/20** and **172.31.16.0/20**).
4.  **Internet Gateway:** An Internet Gateway is automatically attached to the default VPC, and a default route is configured to direct all outbound traffic to the gateway. This ensures that every subnet within the default VPC is public, allowing resources to be accessed from the internet.
5.  **Security Configurations:** Default security groups and Network Access Control Lists (NACLs) are set up to manage and control traffic.

Below is an image that illustrates a typical default VPC setup, showcasing the Internet Gateway, public subnets, and security configurations:

![The image illustrates a default VPC setup with an internet gateway, public subnets, and default security configurations, highlighting network access and routing in a cloud environment.](https://kodekloud.com/kk-media/image/upload/v1752861960/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Networking-Default-VPC/frame_130.jpg)

## Summary of Default VPC Features

Every AWS region comes configured with a default VPC that includes:

- **CIDR Block:** 172.31.0.0/16 for the entire VPC.
- **Subnets:** One default subnet per availability zone.
- **Internet Access:** An attached Internet Gateway enables outbound connectivity.
- **Security:** Default security groups support outbound traffic, and default NACLs are open for inbound and outbound traffic.

The following image summarizes these core features—subnets, security groups, NACLs, CIDR allocation, internet access, and availability zones:

![The image summarizes Default VPC features, including subnets, security groups, NACLs, CIDR block, internet access, and availability zones.](https://kodekloud.com/kk-media/image/upload/v1752861962/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Networking-Default-VPC/frame_170.jpg)

> [!important]
> **Quick Reference**
>
> For further details and best practices on configuring VPCs, consider exploring the [AWS VPC Documentation](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02/module/dcba3ea8-580a-4aac-ad89-48969e6876ee/lesson/d7ba5de6-e38e-4057-9389-57ae0d37466e)**
>
> Watch video content
