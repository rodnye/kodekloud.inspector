# Summary on Security and Compliance - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Cloud-Practitioner-CLF-C02/Bringing-it-all-together/Summary-on-Security-and-Compliance)

---

## Table of Contents

- Summary on Security and Compliance
  - AWS Shared Responsibility Model
  - Compliance and Regulatory Frameworks
  - Security Responsibilities Based on Service Type
  - Identity and Access Management (IAM)
  - AWS Organizations
  - Overview of AWS Security Services
  - Watch Video
    - Preventive Security Services
    - Detection-Based Security Services
    - Management-Based Security Resources

---

## Content

AWS Cloud Practitioner CLF-C02

Bringing it all together

# Summary on Security and Compliance

In this lesson, we provide a detailed overview of key security and compliance concepts in AWS. This summary covers the AWS Shared Responsibility Model, compliance frameworks, IAM best practices, and the various security services offered by AWS.

## AWS Shared Responsibility Model

The AWS Shared Responsibility Model clearly defines the security roles between customers and AWS. In a cloud environment, understanding your responsibilities versus the aspects managed by AWS is crucial.

There are two primary service categories in AWS:

- **Unmanaged Services:** You are responsible for many security aspects.
- **Managed Services:** AWS takes care of most security tasks, reducing your workload.

![The image summarizes the AWS Shared Responsibility Model, highlighting customer and AWS responsibilities, user security for unmanaged services, and AWS's role in managed services.](https://kodekloud.com/kk-media/image/upload/v1752861534/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Summary-on-Security-and-Compliance/frame_50.jpg)

> [!important]
> **Note**
>
> Review the AWS Shared Responsibility Model thoroughly to understand which areas require your intervention and which are covered by AWS.

## Compliance and Regulatory Frameworks

Compliance frameworks are sets of guidelines and best practices tailored to meet industry or regional regulatory requirements. AWS supports compliance by managing the underlying infrastructure, while you are responsible for configuring and maintaining your environment in a compliant manner.

AWS provides several tools to simplify compliance management:

- **AWS Artifact:** On-demand access to AWS audit reports.
- **Compliance Center:** Detailed resources on meeting regulatory requirements.
- **Audit Manager:** Automated data collection for audit readiness.
- **AWS Config:** Continuously monitors resource configurations, ensuring historical tracking for audits.

![The image summarizes the AWS Shared Responsibility Model, highlighting compliance frameworks, AWS Artifact, Compliance Center, Audit Manager, and AWS Config for regulatory adherence.](https://kodekloud.com/kk-media/image/upload/v1752861536/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Summary-on-Security-and-Compliance/frame_120.jpg)

## Security Responsibilities Based on Service Type

The division of security responsibilities changes based on the AWS service type you are using:

- **Infrastructure as a Service (IaaS) \[e.g., EC2\]:** AWS handles the physical hardware and virtualization, while you secure the operating system and applications.
- **Platform as a Service (PaaS):** AWS manages most of the infrastructure and operating system, leaving you to focus mainly on your data and application configuration.
- **Software as a Service (SaaS):** Your primary responsibility is managing and securing your data within the application.

A quick reference overview:

| Service Type | Customer Responsibility  | AWS Responsibility                   |
| ------------ | ------------------------ | ------------------------------------ |
| IaaS         | Operating System & Apps  | Physical hardware and virtualization |
| PaaS         | Data & Application Logic | Infrastructure, OS, and middleware   |
| SaaS         | Data Management          | Full service management              |

## Identity and Access Management (IAM)

Every AWS account starts with a root user that has unrestricted access. To enhance security, it is critical to implement AWS Identity and Access Management (IAM) best practices:

- Create individual IAM users for employees and applications.
- Use policies to define and restrict what actions users can perform.
- Group users by similar permissions to streamline management.
- Use IAM roles to grant temporary elevated privileges when needed.
- Practice the principle of least privilege to minimize risk.

![The image illustrates the AWS Shared Responsibility Model, comparing responsibilities across On-Premises, IaaS, PaaS, and SaaS environments.](https://kodekloud.com/kk-media/image/upload/v1752861537/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Summary-on-Security-and-Compliance/frame_190.jpg)

IAM policies are defined using JSON. Below is an example of a policy document with multiple statements:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "SecondStatement",
      "Effect": "Allow",
      "Action": "ec2:*",
      "Resource": "*"
    },
    {
      "Sid": "ThirdStatement",
      "Effect": "Allow",
      "Action": [
        "s3:List*",
        "s3:Get*"
      ],
      "Resource": [
        "arn:AWS:s3:::bucket1",
        "arn:AWS:s3:::bucket1/*"
      ]
    }
  ]
}
```

In this example:

- "Sid" is an optional identifier for each statement.
- "Effect" indicates whether the actions are allowed or denied.
- "Action" specifies the AWS operations controlled.
- "Resource" defines the resources to which the actions apply.

![The image summarizes AWS Identity Access Management, highlighting root user access, IAM responsibilities, user roles, and policy functions.](https://kodekloud.com/kk-media/image/upload/v1752861539/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Summary-on-Security-and-Compliance/frame_230.jpg)

## AWS Organizations

AWS Organizations simplifies the management of multiple AWS accounts by enabling you to group them based on business needs or service control policies. This approach ensures consistent security governance and streamlined billing processes across the organization.

![The image summarizes AWS Organizations, highlighting account management, organizational units for grouping, and service control policies for account restrictions.](https://kodekloud.com/kk-media/image/upload/v1752861540/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Summary-on-Security-and-Compliance/frame_360.jpg)

## Overview of AWS Security Services

AWS employs a layered security approach, offering services across three main categories: Preventive, Detection-Based, and Management-Based security services.

### Preventive Security Services

- **Web Application Firewall (WAF):** Protects against threats such as SQL injection and cross-site scripting.
- **Shield:** Offers DDoS attack protection.
- **Network Firewalls:** Monitors and controls traffic to and from your Virtual Private Cloud (VPC).

### Detection-Based Security Services

- **AWS GuardDuty:** Continuously monitors for abnormal or suspicious activities.
- **AWS Detective:** Provides interactive dashboards to help analyze security events.
- **CloudTrail:** Logs and monitors user and API activity for enhanced visibility.
- **AWS Config:** Tracks configuration changes across your AWS resources.
- **Security Hub:** Aggregates insights and automates security checks based on AWS best practices.
- **Security Lake:** Consolidates logs from various sources into a query-optimized format.
- **AWS Macie:** Scans S3 buckets for sensitive data and alerts on findings.

![The image summarizes AWS security resources for detection, including GuardDuty, Detective, CloudTrail, AWS Config, Security Hub, and Security Lake, highlighting their monitoring and analysis functions.](https://kodekloud.com/kk-media/image/upload/v1752861541/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Summary-on-Security-and-Compliance/frame_440.jpg)

### Management-Based Security Resources

- **Firewall Manager:** Centralizes the management of security configurations across multiple accounts.
- **Resource Access Manager:** Enables secure sharing of resources between accounts and organizational units.
- **Amazon Cognito:** Manages user authentication and authorization for web and mobile applications.
- **Secrets Manager:** Secures and manages sensitive information like passwords and credentials.
- **AWS Certificate Manager:** Handles the provisioning and management of SSL/TLS certificates.
- **Private Certificate Authority:** Allows you to create and manage your own private CA without directly handling the infrastructure.
- **Key Management Service (KMS):** Manages encryption keys to protect your data.
- **CloudHSM:** Provides dedicated hardware for secure cryptographic key management.

![The image summarizes AWS security management resources, including Firewall Manager, Resource Access Manager, Cognito, IAM, Identity Center, and Secrets Manager, highlighting their functions.](https://kodekloud.com/kk-media/image/upload/v1752861542/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Summary-on-Security-and-Compliance/frame_500.jpg)

> [!important]
> **Key Takeaway**
>
> Understanding AWS's layered security approach is vital for building a secure, compliant, and well-managed cloud infrastructure.

This lesson has provided a comprehensive overview of crucial security and compliance features in AWS. Mastering these concepts ensures that you are well-equipped to manage security risks while maintaining compliance with industry and regulatory standards.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02/module/e578bb11-e866-4f03-94b8-1a3e89c9afb3/lesson/f85023d0-03b5-40a3-aa22-1cd75aa66cb1)**
>
> Watch video content
