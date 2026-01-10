# Security Groups NACLs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Networking-Fundamentals/Security-Groups-NACLs)

---

## Table of Contents

- Security Groups NACLs
  - Overview of Firewalls
  - Stateless Firewalls
  - Stateful Firewalls
  - Network Access Control Lists (NACLs)
  - Security Groups
  - Comparing NACLs and Security Groups
  - Additional Considerations
  - Summary
  - Watch Video
    - Configuring Inbound Rules
    - Configuring Outbound Rules

---

## Content

AWS Certified Developer - Associate

Networking Fundamentals

# Security Groups NACLs

In this lesson, we delve into how security groups and network access control lists (NACLs) function within AWS networking. Both features serve as firewalls, controlling the flow of traffic to and from your resources. We will examine the fundamentals of firewalls, distinguish between stateless and stateful configurations, and then discuss how AWS employs NACLs alongside security groups for robust network protection.

---

## Overview of Firewalls

Consider a server configured as a web server listening on port 443 for HTTPS requests. When a client sends a request to this port, the server responds accordingly. A firewall inspects traffic based on a set of predetermined rules, ensuring that only permitted data is allowed in or out. These rules are categorized as follows:

- **Inbound Rules:** Govern incoming traffic.
- **Outbound Rules:** Regulate outgoing traffic.

Firewalls are typically classified into two types:

- **Stateless Firewalls:**  
  These firewalls do not remember established connections; hence, every packet (both inbound and outbound) must be explicitly allowed.
- **Stateful Firewalls:**  
  These track active connections, meaning that once an inbound request is permitted, the corresponding outbound response is automatically allowed.

---

## Stateless Firewalls

When configuring a stateless firewall for a web server, you must set up explicit rules for both incoming and outgoing traffic. Consider the following configuration:

1.  **Inbound Traffic:**
    - Permit incoming traffic on port 443.

2.  **Outbound Traffic:**
    - Allow responses to client requests. In a typical TCP connection, a client uses an ephemeral source port (usually in the range 1024-65535) to send a request to port 443.
    - If the server initiates communication with another server (e.g., fetching updates on port 80), you should:
      - Allow outbound traffic on port 80.
      - Permit the return traffic on the ephemeral port range.

The essential concept behind stateless firewalls is that they require matching rules for both directions since no connection tracking is performed.

![The image illustrates the concept of stateless firewalls, showing how firewall rules are divided into inbound and outbound rules, with specific IP/Port configurations and actions for each direction. It emphasizes the need for configuring both inbound and outbound traffic to allow communication.](https://kodekloud.com/kk-media/image/upload/v1752859222/notes-assets/images/AWS-Certified-Developer-Associate-Security-Groups-NACLs/stateless-firewalls-inbound-outbound-rules.jpg)

> [!important]
> **Note**
>
> Ensure that every allowed request has a corresponding outbound rule, as failure to do so can result in blocked responses.

---

## Stateful Firewalls

Stateful firewalls ease network management by tracking TCP sessions. The configuration for inbound traffic remains similar—such as allowing traffic on port 443—but outbound traffic is managed differently:

- Once an inbound request on a permitted port (e.g., port 443) is allowed, the firewall automatically permits the outgoing response without requiring an explicit outbound rule.
- For outbound requests (like connecting to an update server on port 80), only the initial request needs to be permitted. The response is accommodated automatically because the firewall recognizes it as part of an established session.

![The image explains how stateful firewalls work, showing how they allow inbound and outbound traffic by recognizing requests and responses as part of the same connection. It includes a diagram with ports and actions, illustrating the flow of data through the firewall.](https://kodekloud.com/kk-media/image/upload/v1752859223/notes-assets/images/AWS-Certified-Developer-Associate-Security-Groups-NACLs/stateful-firewalls-traffic-diagram.jpg)

This stateful behavior reduces administrative overhead by simplifying rule management.

---

## Network Access Control Lists (NACLs)

NACLs function at the subnet level within an AWS Virtual Private Cloud (VPC) and have the following characteristics:

- **Traffic Filtering:**  
  NACLs monitor and filter traffic entering and leaving a subnet. However, they do not inspect traffic within the same subnet.
- **Stateless Operation:**  
  Similar to stateless firewalls, rules in NACLs must be defined for both inbound and outbound traffic directions.
- **Allow or Deny:**  
  Unlike security groups, NACLs can be configured to either allow or deny traffic.

Each NACL rule is assigned a unique number that determines its processing order (lower numbers are evaluated first). For example, a typical NACL configuration might look as follows:

![The image shows a table of Network Access Control List (NACL) rules, detailing inbound rules with specific rule numbers, types, protocols, port ranges, sources, and whether they are allowed or denied.](https://kodekloud.com/kk-media/image/upload/v1752859224/notes-assets/images/AWS-Certified-Developer-Associate-Security-Groups-NACLs/nacl-inbound-rules-table.jpg)

---

## Security Groups

Security groups act as stateful firewalls at the resource level, protecting individual instances such as EC2, load balancers, or RDS instances. Key aspects include:

- **Stateful Nature:**  
  Traffic allowed for a request automatically permits its corresponding response. For instance, permitting HTTP traffic on port 80 automatically allows its reply.
- **Default Behavior:**  
  By default, security groups are designed to block all traffic. Adding a rule explicitly opens access for that specific traffic type. Importantly, security groups only support allow rules—they do not offer an option to explicitly deny traffic.

### Configuring Inbound Rules

When setting up inbound rules in the AWS Console, you will typically interact with a configuration that includes:

- **Name:** Descriptive label for the rule (optional).
- **Rule ID:** Unique identifier for the rule.
- **IP Version:** Indicates whether the rule applies to IPv4 or IPv6.
- **Type, Protocol, and Port Range:**  
  For example, selecting HTTP automatically sets the protocol to TCP and the port to 80. Custom configurations, such as "Custom TCP", allow you to specify one or a range of ports (e.g., 200 or 200–300).
- **Source:** Specifies the allowed IP range (e.g., 0.0.0.0/0 for public access or 1.1.1.1/32 for a specific IP).
- **Description:** An optional note explaining the rule's purpose.

![The image shows a list of inbound rules for a security group, detailing two rules with different protocols, port ranges, and source IPs. The highlighted rule allows TCP traffic on port 200 from the IP 1.1.1.1/32.](https://kodekloud.com/kk-media/image/upload/v1752859225/notes-assets/images/AWS-Certified-Developer-Associate-Security-Groups-NACLs/security-group-inbound-rules-tcp.jpg)

### Configuring Outbound Rules

Similarly, outbound rules can be configured in the AWS Console. For instance, the default outbound setting for a security group permits all traffic:

- **Type:** All traffic
- **Protocol:** All (TCP, UDP, ICMP, etc.)
- **Port Range:** All ports
- **Destination:** 0.0.0.0/0 (allowing traffic to any destination)

![The image shows a table of outbound rules for a security group, allowing all traffic to all destinations (0.0.0.0/0) with IPv4.](https://kodekloud.com/kk-media/image/upload/v1752859226/notes-assets/images/AWS-Certified-Developer-Associate-Security-Groups-NACLs/outbound-rules-security-group-ipv4.jpg)

> [!important]
> **Note**
>
> If no rules are defined for a security group, the default behavior is to block all traffic. Always ensure that the necessary rules are in place to meet your access requirements.

Additional clarification:

![The image contains text explaining that security groups block all traffic by default unless specific rules are added to allow certain types of traffic. It also notes that security group rules only allow traffic, with no option to deny.](https://kodekloud.com/kk-media/image/upload/v1752859227/notes-assets/images/AWS-Certified-Developer-Associate-Security-Groups-NACLs/security-groups-traffic-rules-explained.jpg)

---

## Comparing NACLs and Security Groups

Below is a summary comparison between NACLs and security groups:

| Feature            | Network ACLs (NACLs)                                                                                                         | Security Groups                                                                                 |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Operation Level    | Subnet-level                                                                                                                 | Resource-level (EC2, load balancers, RDS, etc.)                                                 |
| Statefulness       | Stateless – explicit rules required for inbound and outbound traffic                                                         | Stateful – response traffic is automatically allowed                                            |
| Traffic Management | Can allow or deny traffic                                                                                                    | Only allows traffic; implicit deny for everything else                                          |
| Rule Combination   | Rules are applied per subnet; each subnet associates with one NACL, though a single NACL can be attached to multiple subnets | Multiple security groups can be attached to a single resource; rules from all groups are merged |
| Default Behavior   | No default rules; all rules must be explicitly defined                                                                       | By default, blocks all traffic until rules are added                                            |

![The image compares NACLs and Security Groups, explaining that NACLs are stateless firewalls monitoring traffic for subnets, while Security Groups are stateful and act as personal firewalls for individual resources. It includes a diagram of a Virtual Private Cloud (VPC) with public and private subnets.](https://kodekloud.com/kk-media/image/upload/v1752859228/notes-assets/images/AWS-Certified-Developer-Associate-Security-Groups-NACLs/nacls-vs-security-groups-diagram.jpg)

When multiple security groups are associated with a resource, their rules collectively form a union of access policies. For example, if one group (e.g., “web”) permits access on ports 80 and 443, and another group (e.g., “management”) permits ports 22 and 3389, the effective access policy for the resource encompasses all these ports. By default, security groups include an outbound rule that allows all traffic.

![The image explains the concept of multiple security groups in a network, showing how rules from "web" and "mgmt" groups are merged for a single resource, with a table listing ports and IP ranges.](https://kodekloud.com/kk-media/image/upload/v1752859229/notes-assets/images/AWS-Certified-Developer-Associate-Security-Groups-NACLs/multiple-security-groups-network-diagram.jpg)

---

## Additional Considerations

- **VPC and Subnet Association:**  
  Every subnet within a VPC must be associated with a network ACL, and although a single NACL can cover multiple subnets, each subnet can only be linked with one NACL at any given time.
- **Unfiltered AWS-Specific Traffic:**  
  NACLs do not filter certain AWS-specific communications, including:
  - Amazon DNS and DHCP traffic
  - EC2 instance metadata and metadata endpoints
  - License activation for Windows instances
  - Amazon Time Sync Services
  - Reserved IP addresses used by the default VPC router

![The image lists services and endpoints that are not filtered by Network ACLs, including Amazon DNS, DHCP, EC2 instance metadata, ECS task metadata, Windows license activation, Amazon Time Sync Service, and reserved IP addresses for the default VPC router.](https://kodekloud.com/kk-media/image/upload/v1752859231/notes-assets/images/AWS-Certified-Developer-Associate-Security-Groups-NACLs/unfiltered-services-endpoints-network-acls.jpg)

---

## Summary

- **Stateless Firewalls:**  
  Require explicit permissions for both inbound and outbound traffic.
- **Stateful Firewalls:**  
  Track sessions so that when an inbound request is allowed, the corresponding outbound response is automatically permitted.
- **Network ACLs:**
  - Operate at the subnet level.
  - Are stateless; require rules for both directions.
  - Can explicitly allow or deny traffic.

- **Security Groups:**
  - Protect individual resources.
  - Are stateful; automatically allow responses.
  - Only support allow rules, and rules from different groups merge when applied to a single resource.

![The image is a summary slide about security groups, highlighting their role as stateful firewalls for resources, their rule options, and how multiple groups' rules are merged.](https://kodekloud.com/kk-media/image/upload/v1752859232/notes-assets/images/AWS-Certified-Developer-Associate-Security-Groups-NACLs/security-groups-stateful-firewalls-summary.jpg)

Understanding the differences between these mechanisms will aid you in designing and deploying secure, efficient AWS network infrastructures. Remember that each subnet must be associated with a NACL, and while a NACL can cover multiple subnets, each subnet can only be linked to one at a time.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/c8f3ca76-9178-474e-a33b-bf1de4fd948c/lesson/5753365b-515f-4287-be54-6597325b674e)**
>
> Watch video content
