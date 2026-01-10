# Introduction to Security Group - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Amazon-Elastic-Compute-Cloud-EC2/Introduction/Introduction-to-Security-Group)

---

## Table of Contents

- Introduction to Security Group
  - Security Group Analogy
  - Scenario Overview
  - Security Group Rule Components
  - Configuring Inbound Rules
  - Configuring Outbound Rules
  - Best Practices
  - Links and References
  - Watch Video

---

## Content

Amazon Elastic Compute Cloud (EC2)

Introduction

# Introduction to Security Group

AWS Security Groups act as virtual firewalls, controlling both inbound and outbound traffic for your EC2 instances and other resources. In this guide, you’ll learn how to configure security group rules to secure your applications while maintaining the necessary connectivity.

## Security Group Analogy

Think of a gated community:

- A guard at the entrance logs visitors’ details on arrival and exit.
- Only pre-approved guests or those matching specific criteria can enter or leave.

Similarly, a Security Group inspects network packets, allowing only traffic that matches its defined rules.

## Scenario Overview

You have an EC2 instance inside a VPC with an attached security group named `application-security-group`. This group evaluates:

1.  Inbound traffic (requests coming to your instance)
2.  Outbound traffic (requests leaving your instance)

## Security Group Rule Components

Every security group rule—whether inbound or outbound—includes:

| Component    | Description                                            | Example              |
| ------------ | ------------------------------------------------------ | -------------------- |
| Protocol     | Network protocol (TCP, UDP, ICMP, or all)              | TCP                  |
| Port range   | Single or range of ports                               | 22, 80 or 1024–65535 |
| Source/Dest. | Source CIDR for inbound; destination CIDR for outbound | `203.0.113.0/24`     |

## Configuring Inbound Rules

Inbound rules control which external systems can reach your instance.

1.  Allow HTTP (port 80) from a specific IP:

    ```
    aws ec2 authorize-security-group-ingress \
      --group-name application-security-group \
      --protocol tcp \
      --port 80 \
      --cidr 121.10.13.141/32
    ```

2.  Test a connection from `130.67.87.13` on port 80 → **Rejected** (IP not allowed).
3.  Open HTTP to the world:

    ```
    aws ec2 authorize-security-group-ingress \
      --group-name application-security-group \
      --protocol tcp \
      --port 80 \
      --cidr 0.0.0.0/0
    ```

> [!important]
> **Warning**
>
> Allowing `0.0.0.0/0` exposes your port to the entire Internet. Ensure you only open ports that are strictly necessary.

## Configuring Outbound Rules

By default, outbound traffic is fully open:

| Protocol | Port Range | Destination |
| -------- | ---------- | ----------- |
| All      | All        | `0.0.0.0/0` |

To tighten outbound access, specify the protocol, port range, and destination:

```
aws ec2 revoke-security-group-egress \
  --group-name application-security-group \
  --protocol all \
  --cidr 0.0.0.0/0


aws ec2 authorize-security-group-egress \
  --group-name application-security-group \
  --protocol tcp \
  --port 443 \
  --cidr 203.0.113.0/24
```

> [!important]
> **Note**
>
> Always review both inbound and outbound rules to maintain the principle of least privilege.

## Best Practices

- Use descriptive security group names (e.g., `web-sg`, `db-sg`).
- Limit CIDR ranges to the smallest possible scope.
- Regularly audit rules for unused or overly permissive entries.
- Combine Security Groups with Network ACLs for layered defense.

## Links and References

- [AWS Security Groups](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html)
- [AWS CLI Reference: authorize-security-group-ingress](https://docs.aws.amazon.com/cli/latest/reference/ec2/authorize-security-group-ingress.html)
- [AWS CLI Reference: authorize-security-group-egress](https://docs.aws.amazon.com/cli/latest/reference/ec2/authorize-security-group-egress.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2/module/2f7acbdc-7cde-4d21-9c8d-e1095f159b48/lesson/0a0fdcb7-028a-4162-b72e-c7971b9cad97)**
>
> Watch video content
