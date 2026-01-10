# Configuring VPC Components Subnets Route Tables and Security GroupsNACLs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-5-Networking-and-Content-Delivery/Configuring-VPC-Components-Subnets-Route-Tables-and-Security-GroupsNACLs)

---

## Table of Contents

- Configuring VPC Components Subnets Route Tables and Security GroupsNACLs
  - Route Tables: Directing Traffic Within Your VPC
  - Firewalls in AWS: NACLs and Security Groups
  - Additional Important Points
  - Lesson Summary
  - Watch Video
    - Stateless Firewalls: NACLs
    - Stateful Firewalls: Security Groups
    - Comparing NACLs and Security Groups

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 5 Networking and Content Delivery

# Configuring VPC Components Subnets Route Tables and Security GroupsNACLs

Welcome, students. In this lesson, we dive into configuring essential VPC components such as subnets, route tables, security groups, and network access control lists (NACLs) within AWS. These components work together to create a secure and isolated network environment tailored to your specific requirements.

Virtual Private Cloud (VPC) is a secure, isolated network segment within AWS that manages a range of IP addresses. Almost every AWS resource—whether it's a Lambda function with a network interface, an EC2 instance, or a container on a virtual machine—resides within a VPC subnet. This design empowers you with full control over network segmentation, routing, and firewall security.

![The image is an illustration of a Virtual Private Cloud (VPC) with interconnected nodes and a list of components including subnetting, routing, firewalls, and gateways.](https://kodekloud.com/kk-media/image/upload/v1752860805/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-VPC-Components-Subnets-Route-Tables-and-Security-GroupsNACLs/vpc-interconnected-nodes-illustration.jpg)

A VPC spans an entire AWS region. AWS operates in over 30 geographic regions—such as Virginia, Oregon, Ohio, Mumbai, and Singapore. Each VPC is confined to a single region and acts as a logical boundary grouping a set of subnets.

![The image illustrates AWS cloud architecture, showing two regions (us-east-1 and us-east-2), each containing a Virtual Private Cloud (VPC). It highlights that a VPC is specific to a single region.](https://kodekloud.com/kk-media/image/upload/v1752860806/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-VPC-Components-Subnets-Route-Tables-and-Security-GroupsNACLs/aws-cloud-architecture-vpc-regions.jpg)

Every VPC is associated with one or more IP address ranges, known as CIDR blocks. For instance, a CIDR block like 192.168.0.0/16 represents a large pool of IP addresses. You can also add additional CIDR blocks—including IPv6 addresses—to further expand your network. Although the slash notation might imply that a /16 is smaller than a /20, in reality a /16 block contains far more addresses (approximately 65,000 compared to 4,096).

![The image explains the concept of a Virtual Private Cloud (VPC), highlighting that each VPC has a range of IP addresses called a CIDR block, which defines the IP addresses resources can use, with block sizes ranging from /16 to /28.](https://kodekloud.com/kk-media/image/upload/v1752860806/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-VPC-Components-Subnets-Route-Tables-and-Security-GroupsNACLs/vpc-cidr-block-ip-addresses-explanation.jpg)

VPCs serve as logical containers within your AWS account. AWS creates a default VPC in every region, allowing you to launch EC2 instances quickly without a custom setup. However, many organizations choose to build custom VPCs to meet specific security and configuration needs.

![The image is a diagram illustrating the concept of a Virtual Private Cloud (VPC) across multiple regions, each labeled as "Region" with a "VPC" and "Default" designation.](https://kodekloud.com/kk-media/image/upload/v1752860808/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-VPC-Components-Subnets-Route-Tables-and-Security-GroupsNACLs/vpc-multiple-regions-diagram.jpg)

When using either the default or a custom VPC, you need to configure its internal components. In a default VPC, a typical CIDR block (e.g., 172.31.0.0/16) delivers 65,536 addresses. Subnets are then carved out from this space (for example, using a /20 block), where you can think of the VPC as the whole pie and each subnet as a slice.

![The image illustrates the structure of a Virtual Private Cloud (VPC), showing a default VPC per region with a /16 IPv4 CIDR block and default subnets in each availability zone.](https://kodekloud.com/kk-media/image/upload/v1752860809/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-VPC-Components-Subnets-Route-Tables-and-Security-GroupsNACLs/vpc-structure-default-cidr-subnets.jpg)

Remember that AWS reserves the first four IP addresses and the last IP address within each subnet. This reservation means that a subnet with an apparent 4,096 addresses will have a few addresses that are not assignable.

Additionally, the default VPC is equipped with an Internet Gateway. The Internet Gateway connects your VPC to the internet; however, attaching one does not automatically expose your resources. Security measures like security groups and NACLs ensure that inbound access remains restricted unless explicitly enabled.

![The image illustrates a default VPC (Virtual Private Cloud) setup, showing an internet gateway, public subnets in two availability zones, and a route for internet traffic.](https://kodekloud.com/kk-media/image/upload/v1752860811/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-VPC-Components-Subnets-Route-Tables-and-Security-GroupsNACLs/default-vpc-setup-internet-gateway.jpg)

By default, public subnets in the VPC allow outbound internet traffic when configured with proper security group rules, though inbound connections remain blocked. Alongside the Internet Gateway, default VPCs include a security group and a NACL—these form the cornerstone of your instance-level and subnet-level security.

Subnets reside in individual Availability Zones (AZs) within a region. Although the VPC covers the entire region, subnets are confined to specific AZs to maximize high availability by distributing resources across different data centers. Subnets can be set up as either public or private, but the CIDR block assigned to any subnet must be a subset of the parent VPC's CIDR block.

A subnet’s CIDR block must fall within a /16 to /28 range. AWS reserves the first five IP addresses and the final IP in every subnet (typically used for the network address, router IP, DNS, and future purposes). For example, if you have a subnet of 192.168.0.0/24, the first available usable IP might start at 192.168.0.4.

![The image explains subnetting within a VPC, detailing reserved IP addresses and subnet block sizes, with a visual representation of a VPC containing public subnets in two availability zones.](https://kodekloud.com/kk-media/image/upload/v1752860812/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-VPC-Components-Subnets-Route-Tables-and-Security-GroupsNACLs/vpc-subnetting-ip-addresses-diagram.jpg)

When designing your network, ensure that the CIDR blocks for your subnets do not overlap; every subnet must represent a unique portion of your VPC’s IP address space. It is also possible to configure subnets as IPv6-only if needed.

## Route Tables: Directing Traffic Within Your VPC

Routing within a VPC is controlled by route tables, which can be associated with individual subnets or with the VPC as a whole. A common configuration directs all non-local traffic to the Internet Gateway. The router’s interface (often the first usable IP address in a subnet, such as 192.168.1.1 for a 192.168.1.0/24 subnet) acts as the default gateway.

Just like a home network router that guides packet traffic, AWS route tables define how data is routed between subnets, to the internet, or even between other networks. Each subnet must be associated with exactly one route table, though a single route table may cover multiple subnets.

![The image is a diagram showing a default VPC with two availability zones, each containing a public subnet and default route tables.](https://kodekloud.com/kk-media/image/upload/v1752860813/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-VPC-Components-Subnets-Route-Tables-and-Security-GroupsNACLs/default-vpc-availability-zones-diagram.jpg)

## Firewalls in AWS: NACLs and Security Groups

AWS offers two types of firewalls to protect your network:

1.  > [!important]
    > **Stateless Firewalls (NACLs)**
    >
    > Network Access Control Lists (NACLs) are stateless firewalls that operate at the subnet level. They require explicit rules for both inbound and outbound traffic since they do not track connection states.
2.  > [!important]
    > **Stateful Firewalls (Security Groups)**
    >
    > Security groups act as stateful firewalls attached to individual resources. They automatically allow response traffic to outbound requests and only require allow rules to be specified. Traffic not explicitly allowed is denied by default.

### Stateless Firewalls: NACLs

NACLs filter traffic at the subnet perimeter. Because they do not track the state of connections, each direction (inbound and outbound) must be configured independently. For example, when a client accesses a web server on port 80, you must add rules for both inbound client requests and outbound responses.

![The image illustrates the concept of stateless firewalls, showing how firewall rules are divided into inbound and outbound rules, with specific ports and actions for each. It emphasizes the need for configuration to allow both types of traffic.](https://kodekloud.com/kk-media/image/upload/v1752860814/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-VPC-Components-Subnets-Route-Tables-and-Security-GroupsNACLs/stateless-firewalls-inbound-outbound-rules.jpg)

### Stateful Firewalls: Security Groups

In contrast, security groups track connection states. When an inbound rule permits traffic, the corresponding outbound response is automatically allowed. This stateful behavior simplifies configuration as you only need to explicitly allow traffic in one direction.

![The image explains how stateful firewalls work, showing that they can identify and permit responses to requests as part of the same connection, with examples of inbound and outbound port actions.](https://kodekloud.com/kk-media/image/upload/v1752860815/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-VPC-Components-Subnets-Route-Tables-and-Security-GroupsNACLs/stateful-firewalls-connection-explained.jpg)

In AWS, NACLs operate at the subnet level and are ideal for defining explicit allow or deny rules based on IP ranges, protocols, and port numbers. Security groups, however, attach directly to instances, RDS databases, or load balancers, and they only use allow rules to control access.

![The image is a diagram explaining security groups in a Virtual Private Cloud (VPC), showing how they act as firewalls for resources in public and private subnets. It highlights that security groups are stateful, requiring only the request to be allowed.](https://kodekloud.com/kk-media/image/upload/v1752860816/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-VPC-Components-Subnets-Route-Tables-and-Security-GroupsNACLs/vpc-security-groups-diagram.jpg)

### Comparing NACLs and Security Groups

- NACLs filter traffic at the subnet level and offer fine-grained control with both allow and deny rules.
- Security groups control traffic at the instance level, automatically permitting return traffic for allowed outbound calls.
- For example, you might define a custom TCP rule in a security group to allow inbound traffic on port 200 only from the IP address 1.1.1.1/32.
- By default, security groups allow all outbound traffic, ensuring that your instances can reach external destinations while inbound traffic is restrictive.

![The image shows a table of inbound rules for a security group, listing two rules with details such as IP version, type, protocol, port range, and source. The first rule allows HTTP traffic on port 80 from any IP, and the second allows custom TCP traffic on port 200 from a specific IP.](https://kodekloud.com/kk-media/image/upload/v1752860817/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-VPC-Components-Subnets-Route-Tables-and-Security-GroupsNACLs/security-group-inbound-rules-table.jpg)

NACLs, on the other hand, evaluate rules in order. For instance, if a NACL rule denies traffic from a known bad IP range with a lower-numbered rule, that traffic will be dropped before a later allow rule is reached. In the default VPC, NACLs generally allow all traffic, leaving security groups as the primary access control mechanism.

![The image shows a table of Network Access Control List (NACL) inbound rules, detailing rule numbers, types, protocols, port ranges, sources, and whether the traffic is allowed or denied.](https://kodekloud.com/kk-media/image/upload/v1752860818/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-VPC-Components-Subnets-Route-Tables-and-Security-GroupsNACLs/nacl-inbound-rules-table.jpg)

When multiple security groups are assigned to the same resource, the effective permissions are a combination of all rules, with the most restrictive rules taking precedence.

![The image explains that multiple security groups can be assigned to a single resource, with their rules merged. It shows two security groups, "web" and "mgmt," each with specific port and IP configurations.](https://kodekloud.com/kk-media/image/upload/v1752860819/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-VPC-Components-Subnets-Route-Tables-and-Security-GroupsNACLs/security-groups-resource-rules-diagram.jpg)

## Additional Important Points

- Security groups have default outbound rules that allow all traffic.
- Each subnet in a VPC is automatically associated with a NACL. Although a single NACL can be associated with multiple subnets, a subnet can only be linked to one NACL.
- NACLs do not filter some critical types of traffic such as DNS lookups, DHCP, EC2 instance metadata, ECS task metadata, NTP, or essential router communications. AWS ensures that these services function without interruption.

![The image contains three colored boxes with text about security groups and network ACLs in a VPC. Each box provides a specific rule or guideline related to network security configurations.](https://kodekloud.com/kk-media/image/upload/v1752860820/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-VPC-Components-Subnets-Route-Tables-and-Security-GroupsNACLs/vpc-security-groups-acls-guidelines.jpg)

![The image lists services and endpoints that Network Access Control Lists (NACLs) do not filter traffic to and from, including Amazon DNS, DHCP, EC2 instance metadata, ECS task metadata, and others.](https://kodekloud.com/kk-media/image/upload/v1752860821/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-VPC-Components-Subnets-Route-Tables-and-Security-GroupsNACLs/nacl-unfiltered-services-endpoints.jpg)

## Lesson Summary

- A VPC is a pool of IP addresses confined to a single AWS region.
- Subnets are smaller segments within a VPC, each assigned to specific Availability Zones for high availability.
- Default VPCs come preconfigured with an Internet Gateway, security groups, and NACLs.
- Route tables control the flow of traffic between subnets, to the internet, and external networks.
- NACLs (stateless) and security groups (stateful) complement each other to secure your AWS resources by managing traffic based on different rule models.

Stay focused on these core concepts and best practices as you continue your studies. Happy networking, and see you in the next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/fd99c412-5efc-46e2-99ce-bb9c581fec27/lesson/71c7789a-f72d-44a8-a609-2bc964671d8f)**
>
> Watch video content
