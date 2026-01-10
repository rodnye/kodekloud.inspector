# NACLs and SecGroups - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Security/NACLs-and-SecGroups)

---

## Table of Contents

- NACLs and SecGroups
  - Understanding NACLs
  - Comparing NACLs and Security Groups
  - Integrating NACLs and Security Groups
  - Deep Dive: Security Groups
  - Watch Video
    - Key Differences in Traffic Handling
    - Managing Security Groups Effectively
    - Configuring Security Group Rules
    - Automatic Traffic Exceptions in Security Groups

---

## Content

AWS Solutions Architect Associate Certification

Services Security

# NACLs and SecGroups

In this article, we dive into Network Access Control Lists (NACLs) and security groups—two essential components for managing and securing your AWS Virtual Private Cloud (VPC). We will explore what NACLs are, how they compare to security groups, and how both work together to provide layered security.

---

## Understanding NACLs

A Network Access Control List (NACL) serves as an additional firewall for your VPC by regulating traffic moving in and out of subnets. NACLs offer flexibility as you can associate one NACL with multiple subnets if they require similar traffic filtering.

Each rule within a NACL is defined by:

- A rule number (lower numbers indicate higher priority)
- The traffic type (e.g., all traffic, TCP, or UDP)
- Port range (for TCP/UDP)
- Source IP address (for inbound traffic)
- Action (either allow or deny)

Below is an example demonstrating a default NACL configuration with several rules:

![The image shows a table of default network ACL (NACL) inbound rules, with one rule allowing all traffic and another denying all traffic from any source.](https://kodekloud.com/kk-media/image/upload/v1752865903/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-NACLs-and-SecGroups/default-nacl-inbound-rules-table.jpg)

> [!important]
> **Note**
>
> When you create a VPC and its corresponding subnets, a default NACL is automatically assigned that permits all traffic until you modify the rules to enforce more restrictive filtering.

---

## Comparing NACLs and Security Groups

AWS employs two primary types of firewalls to secure your environment:

- **NACLs**: Operate at the subnet level, filtering both inbound and outbound traffic.
- **Security Groups**: Provide instance-level security, managing traffic to and from individual EC2 instances and other resources.

### Key Differences in Traffic Handling

| Feature      | NACLs                                                   | Security Groups                                                 |
| ------------ | ------------------------------------------------------- | --------------------------------------------------------------- |
| Level        | Subnet-level                                            | Instance-level                                                  |
| State        | Stateless (requires explicit rules for both directions) | Stateful (inbound rules automatically allow outbound responses) |
| Rule Options | Allow and Deny                                          | Allow only                                                      |

> [!important]
> **Note**
>
> NACLs require you to configure rules for both directions since they are stateless, while security groups simplify management by automatically handling the response traffic.

The diagram below summarizes these differences:

![The image is a comparison between Security Groups and Network Access Control Lists (NACL) in terms of level, state, and supported rules. Security Groups are instance-level, stateful, and allow rules only, while NACLs are subnet-level, stateless, and allow and deny rules.](https://kodekloud.com/kk-media/image/upload/v1752865904/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-NACLs-and-SecGroups/security-groups-vs-nacl-comparison.jpg)

---

## Integrating NACLs and Security Groups

NACLs and security groups complement each other by offering security at different layers of your VPC architecture:

- NACLs control traffic at the subnet level.
- Security groups protect individual instances.

The following diagram illustrates how both security layers interact within a VPC that includes public and private subnets across multiple availability zones:

![The image is a diagram comparing Security Groups and Network ACLs (NACLs) within a Virtual Private Cloud (VPC) setup, showing public and private subnets across two availability zones.](https://kodekloud.com/kk-media/image/upload/v1752865905/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-NACLs-and-SecGroups/security-groups-nacls-vpc-diagram.jpg)

---

## Deep Dive: Security Groups

Security groups act as virtual firewalls for individual instances, controlling inbound and outbound traffic. While every resource gets a default security group, you can tailor these groups to meet specific requirements.

### Managing Security Groups Effectively

Consider a scenario with multiple web servers that need only HTTP (port 80) and HTTPS (port 443) access. Instead of assigning unique security groups to each server, create one comprehensive web security group with the necessary rules and assign it to all. You can also attach multiple security groups to an EC2 instance to merge rules—such as combining web traffic with management traffic (SSH on port 22).

### Configuring Security Group Rules

Security group rules are divided into two sections:

- **Inbound Rules**: Control incoming traffic.
- **Outbound Rules**: Control outgoing traffic.

Below is an example configuration for an inbound rule that permits SSH access:

```
# Inbound rule configuration for SSH access
{
    "Type": "SSH",
    "Protocol": "TCP",
    "PortRange": "22",
    "Source": "0.0.0.0/0"
}
```

In this configuration, the rule allows SSH (TCP port 22) access from any IP address (0.0.0.0/0). Remember that security groups only support "allow" rules. Outbound rules follow a similar format but apply to traffic leaving the instance.

The diagram below shows a user interface section for configuring these inbound rules specifically for SSH:

![The image shows a section of a user interface for configuring inbound rules, specifically for SSH access, with details like protocol, port range, and source. It includes an icon and is labeled "Inbound and Outbound Rules."](https://kodekloud.com/kk-media/image/upload/v1752865906/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-NACLs-and-SecGroups/inbound-outbound-rules-ssh-config.jpg)

### Automatic Traffic Exceptions in Security Groups

Certain traffic types are automatically permitted by security groups, ensuring essential communication is not interrupted. These include:

- Amazon DNS servers
- Amazon DHCP traffic
- EC2 instance metadata service
- ECS task metadata endpoints
- Windows license activation traffic
- Amazon Time Sync Service
- Reserved IP addresses used by the default VPC router

The image below lists these exceptions:

![The image lists services for which security groups do not filter traffic, including Amazon DNS, DHCP, EC2 instance metadata, ECS task metadata endpoints, Windows license activation, Amazon Time Sync Service, and reserved IP addresses for the default VPC router.](https://kodekloud.com/kk-media/image/upload/v1752865908/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-NACLs-and-SecGroups/security-groups-traffic-exceptions.jpg)

> [!important]
> **Note**
>
> You do not need to create explicit rules for the above protocols; they are automatically allowed by AWS to ensure critical services run smoothly.

---

This comprehensive guide has provided an in-depth look at how NACLs and security groups function, highlighting their individual roles and how they synergize to secure your AWS infrastructure effectively.

For further reading and advanced configuration tips, be sure to check out the [AWS Documentation](https://aws.amazon.com/documentation/) and related resources.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/6b2d9e18-1714-499c-83d4-4d1f7ff29e66/lesson/9452bc36-c9f9-4287-8108-dbfac0da78ae)**
>
> Watch video content
