# Introduction to NACL - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Amazon-Elastic-Compute-Cloud-EC2/Introduction/Introduction-to-NACL)

---

## Table of Contents

- Introduction to NACL
  - Inbound vs. Outbound Rules
  - Example: Allowing Ephemeral Port Traffic
  - Watch Video
  - Practice Lab
    - Inbound Rules
    - Outbound Rules

---

## Content

Amazon Elastic Compute Cloud (EC2)

Introduction

# Introduction to NACL

Network Access Control Lists (Network ACLs or NACLs) are an essential network-layer security feature in Amazon VPCs. While Security Groups enforce host-level traffic rules, NACLs apply stateless, subnet-level filters. This makes them ideal for isolating resources—such as placing databases in a separate subnet and only allowing traffic from your application subnet.

> [!important]
> **Note**
>
> Network ACLs are **stateless**: you must explicitly configure both inbound and outbound rules to allow return traffic. In contrast, Security Groups are stateful and automatically permit responses.

Network ACLs consist of ordered rule entries that either **allow** or **deny** specific traffic. Rules are evaluated by ascending rule number, and processing stops when a match is found.

| Field       | Description                                                      |
| ----------- | ---------------------------------------------------------------- |
| Rule Number | Integer from 1–32,766, determining evaluation order              |
| Protocol    | `TCP`, `UDP`, `ICMP` or `ALL`                                    |
| Port Range  | Single port or range (e.g., `80` or `1024–65535`)                |
| CIDR Block  | IPv4/IPv6 network (source for inbound, destination for outbound) |
| Action      | `ALLOW` or `DENY`                                                |

## Inbound vs. Outbound Rules

- **Inbound rules** filter traffic entering the subnet.
- **Outbound rules** filter traffic leaving the subnet.

## Example: Allowing Ephemeral Port Traffic

In this scenario, an application subnet (`10.10.1.0/24`) must communicate with a database subnet. We allow TCP traffic on ephemeral ports (1024–65535) and deny all other traffic.

### Inbound Rules

```
Rule #  Protocol  Port Range     Source CIDR        Action
100     TCP       1024–65535     10.10.1.0/24       ALLOW
*       ALL       ALL            0.0.0.0/0          DENY
```

### Outbound Rules

```
Rule #  Protocol  Port Range     Destination CIDR   Action
100     TCP       1024–65535     10.10.1.0/24       ALLOW
*       ALL       ALL            0.0.0.0/0          DENY
```

> [!important]
> **Warning**
>
> Always include a catch-all `DENY` rule (`*`) to block unwanted traffic. Omitting it can leave your subnet exposed.

![The image illustrates a network setup with a VPC containing EC2 security groups, an internet gateway, and subnets, alongside tables showing inbound and outbound NACL rules.](https://kodekloud.com/kk-media/image/upload/v1752869092/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-Introduction-to-NACL/vpc-ec2-security-groups-network-setup.jpg)

- Combine **Security Groups** (stateful) and **Network ACLs** (stateless) for layered defense.
- Use specific rule numbers to group similar rules.
- Regularly audit NACL logs via [VPC Flow Logs](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html).
- [AWS Network ACLs Documentation](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html)
- [AWS Security Groups vs. NACLs](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Security.html)
- [VPC Flow Logs](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2/module/2f7acbdc-7cde-4d21-9c8d-e1095f159b48/lesson/be627a44-7ecc-4a35-97bf-b0d05a13ddad)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2/module/2f7acbdc-7cde-4d21-9c8d-e1095f159b48/lesson/4df6319a-e3fa-4271-9f0e-13bac23c7151)**
>
> Practice lab
