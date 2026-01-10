# Resource Access Manager - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Management-and-Governance/Resource-Access-Manager)

---

## Table of Contents

- Resource Access Manager
  - Key Use Cases
  - How AWS RAM Works
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Management and Governance

# Resource Access Manager

In this article, we explore AWS Resource Access Manager (AWS RAM), a service that simplifies the process of sharing AWS resources across multiple accounts. By leveraging AWS RAM, you can avoid creating duplicate resources, improve cost efficiency, and maintain a secure environment.

## Key Use Cases

AWS RAM supports various resource sharing scenarios. For instance:

- **S3 Bucket Sharing:**  
  When you create an S3 bucket in one account, you can share it with authorized accounts using AWS RAM. This allows collaborative access, where users can securely view, modify, or retrieve objects. Any changes made—such as adding or removing items—are reflected automatically across all accounts with access.
- **Subnet Sharing:**  
  If you create a subnet in one account, you can share it with other accounts. The recipient accounts can then deploy EC2 instances into the shared subnet, even though the physical infrastructure remains in the provider's account. This capability streamlines operations in multi-account AWS environments.

Before AWS RAM, organizations often faced challenges such as fragmented resources—including VPCs, Transit Gateways, and subnets—spread across numerous accounts. This fragmentation led to increased costs, inefficiencies, and complex IAM policy configurations. Additionally, establishing complex network configurations like VPC peering or VPN connections was necessary to share resources, further complicating management and troubleshooting.

> [!important]
> **Security Consideration**
>
> Ensure that IAM policies are meticulously configured when sharing resources to avoid potential security vulnerabilities. Misconfigurations can lead to unauthorized access or data breaches.

## How AWS RAM Works

The process to share resources with AWS RAM is straightforward:

1.  **Create a Resource:**  
    Begin by creating the resource in your AWS account.
2.  **Select the Resource:**  
    Identify the resource you wish to share.
3.  **Choose Principals:**  
    Specify the AWS accounts (principals) with which you want to share the resource.
4.  **Accept the Share:**  
    On the recipient account, accept the resource share to gain access.

![The image is a step-by-step guide on how to use AWS RAM, detailing the process of creating a resource share, selecting resources, choosing principals, and accepting the resource share request.](https://kodekloud.com/kk-media/image/upload/v1752865372/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Resource-Access-Manager/aws-ram-resource-share-guide.jpg)

Once the resource share is established, you can continuously monitor, manage, or revoke access as needed.

For more detailed information on managing AWS resources, refer to the [AWS Documentation](https://docs.aws.amazon.com/ram/latest/userguide/what-is-aws-ram.html).

> [!important]
> **Note**
>
> AWS RAM not only simplifies resource sharing but also enhances collaboration among different teams by centralizing resource management. This makes it an essential tool for enterprises with multi-account AWS environments.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/3c1ec40a-853a-4bf0-a4de-d53993e309f0/lesson/578747df-115c-4bea-942b-6d6f8af48eea)**
>
> Watch video content
