# Networking Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Cloud-Practitioner-CLF-C02/Technology-Part-One/Networking-Overview)

---

## Table of Contents

- Networking Overview
  - Key AWS Networking Components
  - Watch Video

---

## Content

AWS Cloud Practitioner CLF-C02

Technology Part One

# Networking Overview

This article provides a high-level review of AWS networking components and demonstrates how they integrate to form a robust networking solution.

The diagram below illustrates key AWS networking features and their interactions. It highlights that your AWS Virtual Private Cloud (VPC) is region-specific. Within the VPC, you deploy subnets that align with specific availability zones. For example, one subnet may be linked to Availability Zone 1 and another to Availability Zone 2, ensuring that resources such as servers are strategically placed across the infrastructure.

![The image illustrates a Virtual Private Cloud (VPC) architecture with public and private subnets, internet and NAT gateways, route tables, and ACLs across two availability zones.](https://kodekloud.com/kk-media/image/upload/v1752861969/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Networking-Overview/frame_50.jpg)

Each resource within a subnet is assigned a security group, which acts as a dedicated firewall controlling inbound and outbound traffic for that resource. This ensures that only authorized communication occurs.

In addition to security groups, AWS employs network access control lists (ACLs) to manage traffic between subnets. While security groups secure individual resources, network ACLs provide a broader layer of traffic filtering for the entire subnet.

Two critical components for routing traffic into and out of the VPC are the Internet Gateway and the NAT Gateway:

- The **Internet Gateway** enables direct communication between your VPC and the Internet.
- The **NAT Gateway** is designed to allow outbound connections from resources inside the VPC, while ensuring that unsolicited inbound traffic does not reach those resources.

Additionally, AWS uses route tables—a core element of its network routing—to manage traffic flow within the VPC. For example, you can configure route tables to direct traffic from a server destined for the Internet through a specific intermediary server, offering enhanced control over resource interactions.

> [!important]
> **Note**
>
> Understanding how security groups, network ACLs, gateways, and route tables work together is key to designing a secure and efficient AWS network architecture.

## Key AWS Networking Components

| Component             | Function                                            | Example Usage                                          |
| --------------------- | --------------------------------------------------- | ------------------------------------------------------ |
| Virtual Private Cloud | Isolates resources within a specific AWS region     | Creating a VPC to host your application infrastructure |
| Subnet                | Segregates VPC into distinct availability zones     | Deploying servers in different availability zones      |
| Security Group        | Acts as a firewall for individual resources         | Controlling traffic to and from an EC2 instance        |
| Network ACL           | Filters traffic at the subnet level                 | Setting rules for all resources within a subnet        |
| Internet Gateway      | Enables direct Internet communication               | Allowing public access to web servers                  |
| NAT Gateway           | Permits outbound communication from private subnets | Securely connecting private instances to the Internet  |
| Route Table           | Directs traffic flow within the VPC                 | Routing traffic through a specific server or gateway   |

Overall, this architecture demonstrates how VPCs, subnets, security groups, network ACLs, gateways, and route tables work in concert to deliver a secure and efficient networking environment on AWS.

For more detailed information on AWS networking, visit the [AWS Networking Documentation](https://docs.aws.amazon.com/vpc/index.html).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02/module/dcba3ea8-580a-4aac-ad89-48969e6876ee/lesson/266b38f9-78f9-4e97-8bac-7f26bb532e33)**
>
> Watch video content
