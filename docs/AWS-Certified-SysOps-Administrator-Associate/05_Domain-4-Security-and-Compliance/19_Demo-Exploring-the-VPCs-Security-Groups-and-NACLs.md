# Demo Exploring the VPCs Security Groups and NACLs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-4-Security-and-Compliance/Demo-Exploring-the-VPCs-Security-Groups-and-NACLs)

---

## Table of Contents

- Demo Exploring the VPCs Security Groups and NACLs
  - Lab VPC Overview
  - Network ACLs in the VPC
  - Security Groups: The Stateful Firewall for EC2 Instances
  - Summary
  - Watch Video
  - Practice Lab

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 4 Security and Compliance

# Demo Exploring the VPCs Security Groups and NACLs

Welcome to this lesson. In this session, Michael Forrester guides you through the key aspects of AWS VPC configurations along with their security components. You’ll learn about lab VPC settings, the difference between stateless Network ACLs and stateful Security Groups, and how these elements interact to secure AWS environments.

## Lab VPC Overview

Our lab uses a specifically provisioned VPC—not the default one—with the CIDR block 10.0.0.0/16. This means the first two octets (10.0) define the network portion, while the rest designate hosts.

Below is an image of the AWS VPC dashboard displaying essential details like VPC ID, state, and IP address ranges:

![The image shows an AWS VPC dashboard displaying a list of Virtual Private Clouds (VPCs) with details such as VPC ID, state, and IP address ranges. The selected VPC is "LabVpc" with additional details shown below.](https://kodekloud.com/kk-media/image/upload/v1752860442/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Exploring-the-VPCs-Security-Groups-and-NACLs/aws-vpc-dashboard-labvpc-details.jpg)

Key configuration points include:

- IPv4 addressing per the defined CIDR block.
- Optional IPv6 addressing with a dedicated pool.
- Features such as DNS hostnames, default shared tenancy, and DHCP configurations.
- A primary route table and an associated access control list (ACL) for security management.

In this lesson, our focus is on security, specifically the Network ACLs (NACLs) and Security Groups tied to this VPC.

---

## Network ACLs in the VPC

Within the lab VPC, a Network ACL is linked with eight subnets. Acting as a rule-based firewall at the subnet level, these ACLs process rules sequentially from highest to lowest priority. By default, the inbound rules permit all IPv4 and IPv6 traffic using explicit allow rules that conclude with a deny rule.

![The image shows an AWS VPC dashboard displaying details of a Network ACL, including its ID, associated subnets, and inbound rules. The inbound rules list specifies traffic permissions, with some rules allowing and others denying all traffic.](https://kodekloud.com/kk-media/image/upload/v1752860444/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Exploring-the-VPCs-Security-Groups-and-NACLs/aws-vpc-dashboard-network-acl.jpg)

You can modify these ACLs to tailor traffic control. For example, to restrict access to a web server, you might add deny rules for specific source IP addresses. Typically, each inbound rule is paired with a corresponding outbound rule to manage the return traffic.

The following image displays the outbound rules for the ACL, which similarly outline permissions with both allow and deny entries:

![The image shows an AWS VPC dashboard displaying the details and outbound rules of a specific Network ACL. The rules specify traffic permissions, with some allowing and others denying all traffic.](https://kodekloud.com/kk-media/image/upload/v1752860445/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Exploring-the-VPCs-Security-Groups-and-NACLs/aws-vpc-dashboard-network-acl-rules.jpg)

Additionally, you can review the network ACL’s subnet associations. In our lab setup, these include public, private, and endpoint subnets. While subnets typically inherit the VPC's default ACL, you have the option to assign a different ACL to an individual subnet.

![The image shows an AWS VPC dashboard displaying subnet associations, including details like subnet names, IDs, associated network ACLs, availability zones, and IPv4 CIDR blocks.](https://kodekloud.com/kk-media/image/upload/v1752860446/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Exploring-the-VPCs-Security-Groups-and-NACLs/aws-vpc-dashboard-subnet-associations.jpg)

The image below highlights the details of a specific subnet and its associated ACL:

![The image shows an AWS VPC dashboard displaying details of a specific subnet, including its ID, availability zone, IPv4 and IPv6 CIDR, and associated network ACL.](https://kodekloud.com/kk-media/image/upload/v1752860448/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Exploring-the-VPCs-Security-Groups-and-NACLs/aws-vpc-dashboard-subnet-details.jpg)

> [!important]
> **Tip**
>
> Remember, Network ACLs are stateless, so rules must be defined separately for inbound and outbound traffic.

---

## Security Groups: The Stateful Firewall for EC2 Instances

Security Groups serve as stateful firewalls for EC2 instances and other AWS resources. They automatically track connection states, meaning that once an inbound request is allowed, the corresponding outbound response is automatically permitted.

Consider these aspects of security groups:

- By default, all traffic is denied unless explicitly allowed.
- A security group might, for example, allow inbound HTTP requests while enabling outbound HTTP and HTTPS traffic.
- Even if an outbound rule is removed, statefulness ensures that legitimate inbound connections can still receive a response.

The image below shows a Security Group in the AWS Management Console with its outbound rules configured for HTTP and HTTPS protocols:

![The image shows an AWS Management Console screen displaying details of a security group, including outbound rules for HTTP and HTTPS protocols.](https://kodekloud.com/kk-media/image/upload/v1752860450/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Exploring-the-VPCs-Security-Groups-and-NACLs/aws-management-console-security-group-details.jpg)

Security Groups are attached directly to network interfaces across various AWS services such as EC2, RDS, EMR, Lambda, and even VPC endpoints. Unlike ACLs, which are applied at the subnet level, Security Groups are assigned on a per-resource basis. Notably, an EC2 instance can be associated with multiple security groups.

> [!important]
> **Key Takeaway**
>
> - Network ACLs: Stateless and applied to subnets.
> - Security Groups: Stateful and applied to individual network interfaces.

---

## Summary

This lesson provided an overview of the interaction between VPCs, subnets, and their security configurations:

- VPCs form the backbone of your network infrastructure.
- Network ACLs are stateless firewalls that require explicit inbound and outbound rules at the subnet level.
- Security Groups are stateful firewalls that simplify traffic management on individual resources.

Understanding these distinctions is essential to effectively managing and securing your AWS infrastructure. For more detailed information on AWS networking, consider exploring the [AWS Documentation](https://aws.amazon.com/documentation/).

Happy learning, and we’ll see you in the next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/0c9bb9a3-5201-434e-8085-a9f1e9f23f22/lesson/1786484d-194e-41d4-a74a-d6b156bb1141)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/0c9bb9a3-5201-434e-8085-a9f1e9f23f22/lesson/49881463-12b0-4dff-b1b9-e26063e48559)**
>
> Practice lab
