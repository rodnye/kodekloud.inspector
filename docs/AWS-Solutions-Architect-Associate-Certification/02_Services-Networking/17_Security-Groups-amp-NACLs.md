# Security Groups amp NACLs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Networking/Security-Groups-amp-NACLs)

---

## Table of Contents

- Security Groups amp NACLs
  - Overview of Firewalls
  - Configuring a Stateless Firewall
  - Configuring a Stateful Firewall
  - AWS Network Access Control Lists (NACLs)
  - AWS Security Groups
  - AWS Network ACL Rules
  - Multiple Security Groups
  - Final Notes on VPC and NACLs
  - Summary
  - Watch Video
    - Configuring Security Group Rules

---

## Content

AWS Solutions Architect Associate Certification

Services Networking

# Security Groups amp NACLs

In this lesson, we explore AWS firewalls by understanding security groups and network access control lists (NACLs), key components used to control network traffic. Learn the difference between stateful and stateless firewalls, and discover how AWS implements these solutions through security groups and NACLs.

## Overview of Firewalls

Consider a web server listening on port 443 (HTTPS). When a client sends a request, the firewall controls the flow of data by applying a set of predefined inbound (incoming traffic) and outbound (outgoing traffic) rules. There are two primary types of firewalls:

- **Stateless Firewalls:**  
  Evaluate each packet individually. Rules must be configured for both inbound and outbound traffic as there is no tracking of connection states.
- **Stateful Firewalls:**  
  Monitor active connections. When an inbound request is allowed, the corresponding outbound response is automatically permitted without the need for an explicit rule.

## Configuring a Stateless Firewall

For a stateless firewall, imagine your web server that listens on port 443. You must configure rules separately for both directions:

1.  **Inbound Rules:**
    - Allow incoming traffic on port 443.

2.  **Outbound Rules:**
    - Allow outbound traffic to the ephemeral port range (typically 1024 to 65535) since client source ports fall within this range.
    - Additionally, if the server initiates a connection (for example, pulling updates from a server via port 80), you need to allow outbound traffic on port 80 and specify corresponding inbound rules to accept responses on the ephemeral port range.

> [!important]
> **Key Concept**
>
> Stateless firewalls treat inbound and outbound traffic separately, requiring manual configuration for both sides.

![The image illustrates the concept of stateless firewalls, showing how firewall rules are divided into inbound and outbound rules, with specific ports and actions for each direction.](https://kodekloud.com/kk-media/image/upload/v1752865680/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Security-Groups-amp-NACLs/stateless-firewalls-inbound-outbound-rules.jpg)

## Configuring a Stateful Firewall

Using the same web server example for a stateful firewall, the configuration simplifies due to the system’s ability to track connections:

1.  **Inbound Rules:**
    - Permit incoming traffic on port 443.

2.  **Outbound Rules:**
    - No explicit outbound rule is required for returning response traffic as the firewall automatically recognizes established connections.
    - For additional outbound connections (e.g., connecting to port 80 on a different server), only the rule to allow the outbound request is required.

> [!important]
> **Stateful Advantage**
>
> Stateful firewalls eliminate the need for duplicate rules by automatically permitting response traffic once a valid connection is established.

![The image explains how stateful firewalls work, showing the process of allowing inbound and outbound requests and responses based on port numbers. It illustrates the concept of recognizing requests and responses as part of the same connection.](https://kodekloud.com/kk-media/image/upload/v1752865681/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Security-Groups-amp-NACLs/stateful-firewalls-connection-process.jpg)

## AWS Network Access Control Lists (NACLs)

AWS NACLs provide subnet-level filtering in a Virtual Private Cloud (VPC):

- **Subnet-Level Filtering:**  
  NACLs are associated with subnets rather than individual resources. Resources within a subnet are subject to the NACL’s rules, while traffic between resources in the same subnet is not filtered.
- **Stateless Nature:**  
  Being stateless, NACLs require explicit rules for both inbound and outbound traffic.

![The image explains Network Access Control Lists (NACLs) in a Virtual Private Cloud (VPC), highlighting their role in filtering traffic entering and leaving subnets, and noting that they are stateless firewalls requiring rules for both inbound and outbound traffic. It includes a diagram showing public and private subnets.](https://kodekloud.com/kk-media/image/upload/v1752865682/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Security-Groups-amp-NACLs/nacl-vpc-traffic-filtering-diagram.jpg)

## AWS Security Groups

Security groups act as virtual firewalls for individual AWS resources, such as EC2 instances, load balancers, and RDS databases. They differ from NACLs in the following ways:

- **Resource-Level Protection:**  
  Security groups protect individual resources rather than an entire subnet.
- **Stateful Behavior:**  
  Only the initial inbound traffic (or outbound traffic) needs to be explicitly allowed since the return traffic is automatically permitted.
- **Allow Rules Only:**  
  Security groups only contain rules that allow traffic. There is no provision to create explicit deny rules; any traffic not expressly permitted is blocked.

![The image compares NACLs and Security Groups, explaining that NACLs are stateless firewalls monitoring traffic at the subnet level, while Security Groups are stateful and act as personal firewalls for individual resources. It includes a diagram of a Virtual Private Cloud (VPC) with public and private subnets.](https://kodekloud.com/kk-media/image/upload/v1752865683/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Security-Groups-amp-NACLs/nacls-vs-security-groups-diagram.jpg)

### Configuring Security Group Rules

When configuring security group rules in the AWS console, you will encounter separate sections for inbound and outbound traffic. Here’s a breakdown of the typical fields within a security group rule:

- **Name:**  
  A descriptive name that helps identify the rule.
- **Rule ID:**  
  A unique identifier for the rule.
- **IP Version:**  
  Indicates whether the rule applies to IPv4 or IPv6 traffic.
- **Type, Protocol, and Port Range:**  
  For example, selecting "HTTP" sets the rule to allow TCP traffic on port 80.
- **Source/Destination:**  
  Specifies the IP address or range permitted by the rule. For instance, 0.0.0.0/0 allows traffic from any IP, while specifying an IP like 1.1.1.1 restricts access.
- **Description:**  
  Provides an explanation of the rule’s purpose.

Consider these examples:

1.  **HTTP Traffic Rule:**  
    Permits HTTP (TCP port 80) traffic from any IP address.
2.  **Custom TCP Rule:**  
    Configured as a "custom TCP" rule, it allows traffic on port 200 only from IP address 1.1.1.1. If a range (e.g., ports 200 through 300) is required, the rule can be configured accordingly.

For outbound traffic, the configuration is similar. By default, security groups permit all outbound traffic, though customization is possible.

> [!important]
> **Security Group Reminder**
>
> If no rules are defined, all traffic is blocked by default. Also, when multiple security groups are attached to a resource, their rules merge to form a consolidated security policy.

![The image shows a list of inbound rules for a security group, highlighting a custom TCP rule with port 200 and source IP 1.1.1.1/32.](https://kodekloud.com/kk-media/image/upload/v1752865684/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Security-Groups-amp-NACLs/inbound-rules-security-group-tcp-200.jpg)

![The image shows a table of outbound rules for a security group, allowing all IPv4 traffic to any destination.](https://kodekloud.com/kk-media/image/upload/v1752865685/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Security-Groups-amp-NACLs/security-group-outbound-rules-table.jpg)

## AWS Network ACL Rules

Unlike security groups, NACL rules offer greater control by allowing both allow and deny actions:

- **Rule Order:**  
  Each rule is assigned a number, and lower numbered rules are evaluated before higher ones.
- **Allow and Deny Actions:**  
  NACLs can explicitly allow or block traffic based on type, protocol, port range, and source address, offering granular control over subnet traffic.

![The image shows a table of Network Access Control List (NACL) rules, detailing inbound rules with specific rule numbers, types, protocols, port ranges, sources, and whether they are allowed or denied.](https://kodekloud.com/kk-media/image/upload/v1752865686/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Security-Groups-amp-NACLs/nacl-inbound-rules-table.jpg)

## Multiple Security Groups

AWS resources can be associated with multiple security groups simultaneously. When applying more than one security group (e.g., one for web access and another for management), their rules are merged. The final effective security policy is the combination of all allowed traffic flows from these groups.

![The image explains the concept of multiple security groups in a network, showing how rules from "web" and "mgmt" groups are merged for an instance, with a table listing ports and IP ranges.](https://kodekloud.com/kk-media/image/upload/v1752865687/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Security-Groups-amp-NACLs/multiple-security-groups-network-diagram.jpg)

## Final Notes on VPC and NACLs

- Every subnet in a Virtual Private Cloud (VPC) must be associated with a network ACL.
- A single network ACL can be linked to multiple subnets, but each subnet can only have one network ACL at a time.
- Certain traffic types (such as communication with Amazon's DNS, DHCP, EC2 instance metadata, Windows license activation, and time synchronization services) are exempt from NACL filtering.

![The image contains three colored text boxes with information about security groups, subnets, and network ACLs in a VPC. Each box provides a specific rule or guideline related to network configuration.](https://kodekloud.com/kk-media/image/upload/v1752865688/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Security-Groups-amp-NACLs/vpc-security-groups-subnets-acls.jpg)

![The image lists services that Network ACLs do not filter traffic for, including Amazon DNS, DHCP, EC2 instance metadata, ECS task metadata endpoints, Windows license activation, and Time Sync Service.](https://kodekloud.com/kk-media/image/upload/v1752865689/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Security-Groups-amp-NACLs/network-acls-exempt-services-list.jpg)

## Summary

- **Stateless Firewalls:**  
  Require explicit configuration of both inbound and outbound traffic rules.
- **Stateful Firewalls:**  
  Automatically allow return traffic for approved connections, simplifying rule management.
- **Network ACLs:**  
  Function as stateless firewalls for subnets, allowing detailed allow/deny rules and processing rules in numeric order.
- **Security Groups:**  
  Provide stateful protection at the resource level, merging multiple groups' rules to secure AWS resources like EC2 instances.

![The image is a summary slide about security groups, highlighting their role as stateful firewalls for resources like EC2, their ability to only allow traffic, and the merging of rules when multiple groups are applied.](https://kodekloud.com/kk-media/image/upload/v1752865690/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Security-Groups-amp-NACLs/security-groups-stateful-firewalls-summary.jpg)

By understanding these key differences and implementations in AWS, you can design a more secure and efficient network architecture in your AWS environment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/e03ffb87-3345-4fbb-9576-cb53d21d7a6a/lesson/edde951d-3e42-43fd-b080-204b2dfda4a6)**
>
> Watch video content
