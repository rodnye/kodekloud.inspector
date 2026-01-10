# NACLs Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Networking-Fundamentals/Core-Networking-Services/NACLs-Demo)

---

## Table of Contents

- NACLs Demo
  - Table of Contents
  - Overview of Security Groups vs NACLs
  - 1. Preparing the Security Group
  - 2. Verifying Subnet Membership
  - 3. Inspecting the Default Network ACL
  - 4. Testing Initial Connectivity
  - 5. Restricting Inbound NACL Rules to SSH Only
  - 6. Allowing HTTP and HTTPS Traffic
  - 7. Demonstrating Stateless Behavior
  - 8. Using Explicit Deny Rules
  - Conclusion
  - References
  - Watch Video

---

## Content

AWS Networking Fundamentals

Core Networking Services

# NACLs Demo

In this tutorial, we’ll explore how to configure **Network ACLs (NACLs)** in AWS and see how they differ from **security groups**. Security groups are _stateful_ and apply at the instance level, whereas NACLs are _stateless_ and operate at the subnet level. You’ll learn how to test and modify NACL rules to filter traffic in and out of your subnet.

## Table of Contents

1.  [Overview of Security Groups vs NACLs](#overview-of-security-groups-vs-nacls)
2.  [1\. Preparing the Security Group](#1-preparing-the-security-group)
3.  [2\. Verifying Subnet Membership](#2-verifying-subnet-membership)
4.  [3\. Inspecting the Default Network ACL](#3-inspecting-the-default-network-acl)
5.  [4\. Testing Initial Connectivity](#4-testing-initial-connectivity)
6.  [5\. Restricting Inbound NACL Rules to SSH Only](#5-restricting-inbound-nacl-rules-to-ssh-only)
7.  [6\. Allowing HTTP and HTTPS Traffic](#6-allowing-http-and-https-traffic)
8.  [7\. Demonstrating Stateless Behavior](#7-demonstrating-stateless-behavior)
9.  [8\. Using Explicit Deny Rules](#8-using-explicit-deny-rules)
10. [Conclusion](#conclusion)
11. [References](#references)

## Overview of Security Groups vs NACLs

| Feature          | Security Groups     | Network ACLs (NACLs)       |
| ---------------- | ------------------- | -------------------------- |
| Statefulness     | Stateful            | Stateless                  |
| Scope            | Instance-level      | Subnet-level               |
| Rule Types       | Allow only          | Allow & Deny               |
| Evaluation Order | All rules evaluated | First-match by rule number |

> [!important]
> **Note**
>
> Use security groups for fine-grained, instance-level controls and NACLs for broader subnet-level filtering.

---

## 1\. Preparing the Security Group

Before testing NACL behavior, make sure your EC2 security group is wide open so it won’t block any traffic.

1.  In the AWS Management Console, go to **EC2** → **Instances**, select your servers.
2.  Under **Security** → **Security Groups**, click **Change security groups**.
3.  Attach the `webserver-sg` security group to both instances.
4.  Edit **Inbound** and **Outbound** rules to allow all traffic (All protocols, All ports, Source/Destination `0.0.0.0/0`).

![The image shows an AWS EC2 Management Console with two running instances, "server-2" and "server1," both of type t2.micro. The details of "server1" are displayed, including security group information and inbound rules.](https://kodekloud.com/kk-media/image/upload/v1752863275/notes-assets/images/AWS-Networking-Fundamentals-NACLs-Demo/aws-ec2-management-console-instances.jpg)

![The image shows an AWS EC2 Management Console screen displaying details of a security group named "webserver-sg," including its inbound and outbound rules. The outbound rules section is highlighted, showing a rule allowing all traffic to destination 0.0.0.0/0.](https://kodekloud.com/kk-media/image/upload/v1752863276/notes-assets/images/AWS-Networking-Fundamentals-NACLs-Demo/aws-ec2-security-group-outbound-rules.jpg)

---

## 2\. Verifying Subnet Membership

Both instances must reside in the same subnet to observe NACL behavior:

1.  Select your instance in **EC2** → **Networking** tab.
2.  Copy the **Subnet ID** (e.g., `subnet-e1683`).

Repeat for the second instance to confirm they share the same Subnet ID.

---

## 3\. Inspecting the Default Network ACL

Navigate to **VPC** → **Security** → **Network ACLs**. Select the default ACL for your VPC and review its inbound rules:

- **Rule 100**: Allow all traffic (All protocols, All ports, `0.0.0.0/0`)
- **Rule \***: Deny all traffic

Because rule 100 catches all traffic first, the deny rule never applies.

![The image shows the AWS Management Console displaying the Network ACLs section, listing various ACLs with details such as associated subnets and inbound rules. The selected ACL has inbound rules allowing and denying all traffic from any source.](https://kodekloud.com/kk-media/image/upload/v1752863277/notes-assets/images/AWS-Networking-Fundamentals-NACLs-Demo/aws-management-console-network-acls.jpg)

---

## 4\. Testing Initial Connectivity

With the security group and default NACL wide open, verify connectivity:

```
# From your local machine:
ssh -i main.pem ec2-user@<instance-public-ip>


# On the EC2 instance:
ping -c 4 8.8.8.8


# Expected output:
# 64 bytes from 8.8.8.8: icmp_seq=1 ttl=53 time=1.58 ms
# ...
# 0% packet loss
```

Your web server (if running) should also be reachable over HTTP:

```
curl http://<instance-public-ip>
```

---

## 5\. Restricting Inbound NACL Rules to SSH Only

Now lock down the NACL so only SSH (port 22) is allowed inbound:

1.  In **VPC** → **Network ACLs**, select your ACL.
2.  Edit **Inbound Rules**:
    - Change **Rule 100** to allow only SSH (TCP port 22) from `0.0.0.0/0`.
    - The default deny will now block everything else.

Test SSH and HTTP:

```
# SSH should still connect:
ssh -i main.pem ec2-user@<instance-public-ip>


# HTTP now times out:
curl http://<instance-public-ip>
# (No response)
```

---

## 6\. Allowing HTTP and HTTPS Traffic

To re-enable web traffic, add two inbound rules after SSH:

- **Rule 101**: Allow HTTP (TCP 80) from `0.0.0.0/0`
- **Rule 120**: Allow HTTPS (TCP 443) from `0.0.0.0/0`

![The image shows an AWS Management Console screen for editing inbound rules in a VPC, with rules for SSH, HTTP, and HTTPS traffic. The rules specify protocols, port ranges, sources, and allow/deny actions.](https://kodekloud.com/kk-media/image/upload/v1752863279/notes-assets/images/AWS-Networking-Fundamentals-NACLs-Demo/aws-management-console-vpc-inbound-rules.jpg)

Verify web access again:

```
curl http://<instance-public-ip>   # Should return your web page
```

> [!important]
> **Note**
>
> If your second server doesn’t serve HTTP yet, install and start NGINX:
>
> ```
> sudo yum install nginx -y
> sudo systemctl enable nginx
> sudo systemctl start nginx
> ```
>
> Refresh your browser on both instances’ IPs to confirm HTTP works.

---

## 7\. Demonstrating Stateless Behavior

NACLs are stateless, so return traffic must be explicitly allowed. Even with outbound rules open, inbound return packets for ephemeral ports are blocked:

```
ping -c 4 8.8.8.8
# 100% packet loss
```

To download packages, add a temporary inbound rule:

- **Rule 130**: Allow all traffic (for the duration of your download)

After installing, remove rule 130. This illustrates that both directions require explicit rules in a stateless firewall.

![The image shows the AWS Management Console interface for editing inbound rules in a VPC network ACL. It lists rules for SSH, HTTP, HTTPS, and a custom TCP port, all set to allow traffic from any source.](https://kodekloud.com/kk-media/image/upload/v1752863280/notes-assets/images/AWS-Networking-Fundamentals-NACLs-Demo/aws-management-console-vpc-acl-rules.jpg)

---

## 8\. Using Explicit Deny Rules

Unlike security groups, NACLs support explicit **Deny** entries. For example, to block SSH from a specific CIDR:

1.  Create **Rule 90**: Deny TCP port 22 from `1.0.0.0/24`.
2.  Keep **Rule 100**: Allow TCP port 22 from `0.0.0.0/0` (evaluated after rule 90).

Traffic evaluation:

- SSH from `1.0.0.0/24` is denied by rule 90.
- SSH from all other IPs is allowed by rule 100.

![The image shows an AWS Management Console screen displaying Network ACLs with a list of inbound rules, including SSH, HTTP, and HTTPS protocols, along with their allow or deny statuses.](https://kodekloud.com/kk-media/image/upload/v1752863281/notes-assets/images/AWS-Networking-Fundamentals-NACLs-Demo/aws-management-console-network-acls-inbound-rules.jpg)

---

## Conclusion

In this demo we covered:

- Security groups are **stateful** and instance-level.
- NACLs are **stateless** and subnet-level.
- NACLs support both **Allow** and **Deny**, evaluated in ascending order.

Use security groups for per-instance controls and NACLs for broader subnet-based traffic filtering.

## References

- [AWS Network ACLs Documentation](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html)
- [AWS Security Groups](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html)
- [Nginx Installation on Amazon Linux 2](https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-open-source/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-networking-fundamentals/module/406e4440-01a6-45f6-ab45-e14485d333c3/lesson/2bde7f3d-33aa-440a-969f-48a5cbb571e4)**
>
> Watch video content
