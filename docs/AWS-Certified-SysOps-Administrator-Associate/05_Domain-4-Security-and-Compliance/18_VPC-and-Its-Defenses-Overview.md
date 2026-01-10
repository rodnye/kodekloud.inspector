# VPC and Its Defenses Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-4-Security-and-Compliance/VPC-and-Its-Defenses-Overview)

---

## Table of Contents

- VPC and Its Defenses Overview
  - Introduction to VPCs
  - Default VPCs vs. Custom VPCs
  - Subnets: Structure and Configuration
  - Routing within a VPC
  - Network Access Control Lists (NACLs) and Security Groups
  - Configuring Rules in Security Groups and NACLs
  - Conclusion
  - Watch Video
    - NACLs: Stateless Firewalls
    - Security Groups: Stateful Firewalls
    - Comparing NACLs and Security Groups
    - Security Group Rules
    - NACL Rules

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 4 Security and Compliance

# VPC and Its Defenses Overview

Welcome to this comprehensive guide on Virtual Private Clouds (VPCs) and the security defenses that protect them. In this article, we cover VPC components, CIDR configurations, subnets, routing, and the differences between stateful security groups and stateless network access control lists (NACLs). This information will help you architect and secure your AWS environment effectively.

## Introduction to VPCs

A VPC is a secure, isolated network segment hosted within AWS, providing complete control over subnetting, IP addressing, routing, firewalls, and gateways. When services are launched with an associated network interface, they are typically placed within a VPC and become isolated by default.

Each VPC is tied to a single region, acting as a network boundary between resources. Although VPCs can be interconnected through VPC peering or a transit gateway, each VPC remains a separate security domain by default.

![The image is an introduction to Virtual Private Cloud (VPC), featuring a network diagram and a list of components: Subnetting, Routing, Firewalls, and Gateways.](https://kodekloud.com/kk-media/image/upload/v1752860676/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-VPC-and-Its-Defenses-Overview/vpc-introduction-network-diagram.jpg)

Every VPC is assigned a primary CIDR block that determines the range of available IP addresses. You can also add multiple CIDR blocks (both IPv4 and optional IPv6) to accommodate additional resources. When attaching extra CIDR blocks, ensure that the subnet masks range between /16 and /28.

## Default VPCs vs. Custom VPCs

By default, AWS provides five VPCs per account in each region. These include:

- **Default VPC:** Preconfigured with a /16 CIDR block (typically 172.31.0.0/16), two public subnets (often /20 each), and an associated Internet Gateway.
- **Custom VPCs:** VPCs you create manually.

![The image is a diagram illustrating the concept of a Virtual Private Cloud (VPC) within multiple regions, with each region containing a VPC labeled as "Default."](https://kodekloud.com/kk-media/image/upload/v1752860677/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-VPC-and-Its-Defenses-Overview/vpc-diagram-multiple-regions-default.jpg)

In a default VPC, each of the two public subnets usually supports around 4,000 IP addresses. With an attached Internet Gateway, resources launched within this VPC are automatically exposed to the Internet unless additional firewall restrictions are applied.

![The image illustrates the structure of a Virtual Private Cloud (VPC), showing a default VPC per region with a /16 IPv4 CIDR block and default subnets in each availability zone.](https://kodekloud.com/kk-media/image/upload/v1752860678/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-VPC-and-Its-Defenses-Overview/vpc-structure-default-cidr-subnets.jpg)

## Subnets: Structure and Configuration

Subnets are subdivisions within a VPC's overall CIDR block and must reside entirely within one availability zone, even though the VPC itself spans an entire region. When configuring subnets, ensure that:

- They fit within the VPC’s primary CIDR block.
- They do not overlap.
- For IPv4, subnet sizes vary between /16 and /28. Overlapping of IPv6 subnets is strictly prohibited.

> [!important]
> **Note**
>
> AWS reserves the first three and the last IP address of every subnet. For example, in a subnet with the CIDR 192.168.10.0/24, the addresses \*.0, \*.1, \*.2, \*.3, and \*.255 are reserved, making the usable addresses start from \*.4.

![The image explains subnet requirements within a VPC, showing that subnets must be within the CIDR range, with an example of a valid and an invalid subnet.](https://kodekloud.com/kk-media/image/upload/v1752860679/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-VPC-and-Its-Defenses-Overview/vpc-subnet-requirements-cidr-diagram.jpg)

If you choose an IPv6 configuration, every device will receive its own unique address. Additionally, by default, subnets can freely communicate with each other unless restricted by custom route tables or NACLs.

## Routing within a VPC

Each subnet has a default router, typically the first usable IP address in the subnet (e.g., 192.168.1.1 in a 192.168.1.0/24 subnet). The default VPC includes a route table that primarily allows local traffic, though custom route tables can be created to control traffic between subnets or direct traffic to external locations using Internet Gateways, NAT devices, or Virtual Private Gateways. Route tables support both IPv4 and IPv6, offering flexibility in traffic management.

![The image shows a route table interface with two routes listed, each having a destination and a target labeled as "local."](https://kodekloud.com/kk-media/image/upload/v1752860680/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-VPC-and-Its-Defenses-Overview/route-table-interface-local-routes.jpg)

## Network Access Control Lists (NACLs) and Security Groups

### NACLs: Stateless Firewalls

NACLs act as stateless firewalls that manage inbound and outbound traffic at the subnet level. Because they are stateless, rules must be defined for both directions. They operate sequentially, meaning the order of rules is crucial. NACLs are best used to explicitly deny specific IP ranges or ports.

![The image illustrates the concept of stateless firewalls, showing traffic flow through port 443 and highlighting that firewalls monitor and allow traffic based on predefined rules.](https://kodekloud.com/kk-media/image/upload/v1752860682/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-VPC-and-Its-Defenses-Overview/stateless-firewalls-traffic-flow.jpg)

For example, you may configure an NACL to allow inbound HTTP traffic while denying traffic from a specific IP range. Note that NACLs only filter traffic entering or leaving subnets, not traffic within a subnet.

![The image explains Network Access Control Lists (NACLs) in a Virtual Private Cloud, showing how they filter traffic entering and leaving subnets, but not within them. It highlights that NACLs are stateless firewalls requiring rules for both inbound and outbound traffic.](https://kodekloud.com/kk-media/image/upload/v1752860683/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-VPC-and-Its-Defenses-Overview/nacl-traffic-filtering-vpc-diagram.jpg)

### Security Groups: Stateful Firewalls

Security groups function as stateful firewalls applied at the resource level, such as EC2 instances, RDS databases, load balancers, and Lambda functions within a VPC. Since they are stateful, they automatically allow response traffic for outbound requests initiated by a resource. Consequently, you only need to define rules for inbound traffic (or outbound if you choose to restrict it).

For example, to allow HTTP traffic, you would create an inbound rule for TCP port 80 with a source of 0.0.0.0/0, while outbound traffic is allowed by default.

![The image explains how stateful firewalls work, showing how they allow inbound and outbound traffic by recognizing requests and responses as part of the same connection. It includes tables of IP/Port actions and illustrates the process with arrows and icons.](https://kodekloud.com/kk-media/image/upload/v1752860683/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-VPC-and-Its-Defenses-Overview/stateful-firewalls-traffic-diagram.jpg)

Consider this scenario: a security group with a custom rule allowing TCP traffic on port 200 only from a specific IP (e.g., 1.1.1.1/32) will permit the initial request and then automatically allow the response traffic. Multiple security groups can be attached to a single resource, and their rules are combined to form a comprehensive set of permissions.

![The image shows a table of inbound rules for a security group, detailing two rules with different protocols, port ranges, and source IPs. One rule is highlighted with a red box and blue arrow.](https://kodekloud.com/kk-media/image/upload/v1752860684/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-VPC-and-Its-Defenses-Overview/security-group-inbound-rules-table.jpg)

Security groups generally allow all outbound traffic by default, though you can customize these settings as needed.

![The image shows a screenshot of outbound rules for a security group, allowing all traffic over IPv4 to any destination.](https://kodekloud.com/kk-media/image/upload/v1752860685/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-VPC-and-Its-Defenses-Overview/security-group-outbound-rules-ipv4.jpg)

### Comparing NACLs and Security Groups

Below is a summary that highlights the key differences between NACLs and security groups:

| Feature             | NACLs (Stateless)                              | Security Groups (Stateful)             |
| ------------------- | ---------------------------------------------- | -------------------------------------- |
| Level of Protection | Subnet-level filtering                         | Resource-level filtering               |
| Traffic Evaluation  | Separate evaluation for inbound and outbound   | Automatically allows return traffic    |
| Rule Options        | Both allow and deny                            | Only allow rules (no explicit deny)    |
| Use Case            | Broad filtering of unwanted IP ranges or ports | Granular, resource-specific protection |

![The image compares NACLs (Network Access Control Lists) and Security Groups, highlighting that NACLs are stateless firewalls monitoring traffic at the subnet level, while Security Groups are stateful and act as personal firewalls for individual resources. It includes a diagram of a Virtual Private Cloud with public and private subnets.](https://kodekloud.com/kk-media/image/upload/v1752860687/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-VPC-and-Its-Defenses-Overview/nacls-vs-security-groups-diagram.jpg)

For denying traffic from a specific IP range or port, NACLs are the preferred option. In contrast, security groups only allow you to specifically define permitted traffic and merge rules when multiple groups are attached to a resource.

## Configuring Rules in Security Groups and NACLs

### Security Group Rules

- Specify inbound rules to permit required traffic, for example:
  - Allow IPv4 HTTP traffic (TCP port 80) from any source (0.0.0.0/0).
  - Allow custom TCP traffic on port 200 from an IP such as 1.1.1.1/32.
- Outbound traffic is allowed by default due to the stateful nature of security groups, though additional outbound rules can be added if desired.

### NACL Rules

- NACLs require rules for both inbound and outbound traffic.
- Rules are evaluated in order—meaning precedence is essential.
- Example:
  - An inbound rule may deny port 80 access for a source IP of 40.0.0.8, while a following rule might allow traffic that does not match the denial criteria.
- The final rule in a NACL typically defaults to denying all traffic not expressly allowed.

![The image shows a table of Network Access Control List (NACL) inbound rules, detailing rule numbers, types, protocols, port ranges, sources, and whether the traffic is allowed or denied.](https://kodekloud.com/kk-media/image/upload/v1752860688/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-VPC-and-Its-Defenses-Overview/nacl-inbound-rules-table.jpg)

Assigning multiple security groups—such as one for web access and another for management—results in a merged set of rules controlling access for services like SSH (port 22), RDP (port 3389), HTTP (port 80), and HTTPS (port 443).

> [!important]
> **Warning**
>
> Avoid opening RDP (port 3389) to all IP addresses to prevent unauthorized access.

![The image explains the concept of assigning multiple security groups to a single resource, showing how rules from different groups (web and mgmt) are merged, with specific ports and IP ranges listed for each group.](https://kodekloud.com/kk-media/image/upload/v1752860689/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-VPC-and-Its-Defenses-Overview/multiple-security-groups-resource-diagram.jpg)

By default, every subnet in a VPC is automatically associated with a NACL, and while the same NACL can be applied to multiple subnets, each subnet can have only one associated NACL at a time.

![The image contains three colored text boxes with information about security groups and network ACLs in a VPC. It explains default outbound rules, subnet associations, and network ACL relationships.](https://kodekloud.com/kk-media/image/upload/v1752860690/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-VPC-and-Its-Defenses-Overview/vpc-security-groups-acls-info.jpg)

Keep in mind that NACLs do not filter critical AWS service traffic such as DNS, DHCP, NTP, or access to the instance metadata service. This design prevents accidental lockouts from vital AWS infrastructure services.

## Conclusion

This guide has provided an in-depth look at VPCs and the security measures that safeguard them, including subnet configuration, routing, NACLs, and security groups. Understanding how these components function together is essential for securing your AWS environment. As you proceed, consider exploring advanced network configurations and best practices to optimize VPC security further.

For additional details, you might find these resources useful:

- [AWS VPC Documentation](https://docs.aws.amazon.com/vpc/)
- [Networking Best Practices on AWS](https://aws.amazon.com/architecture/networking/)

Happy networking and secure cloud architecture!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/0c9bb9a3-5201-434e-8085-a9f1e9f23f22/lesson/33f653bd-c77b-4b33-8a0d-80418da1cb36)**
>
> Watch video content
