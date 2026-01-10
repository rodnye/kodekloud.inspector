# Using Organizational Policies to Scope Organization Permissions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-4-Security-and-Compliance/Using-Organizational-Policies-to-Scope-Organization-Permissions)

---

## Table of Contents

- Using Organizational Policies to Scope Organization Permissions
  - Tag Policies
  - Backup Policies
  - AI Services Opt-Out Policy
  - Overview of AWS Organizational Policies
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 4 Security and Compliance

# Using Organizational Policies to Scope Organization Permissions

Welcome back, students. In this lesson, we explore the different types of organizational policies available in AWS Organizations. AWS Organizations not only leverages Service Control Policies (SCPs) to manage AWS accounts but also provides additional policies such as tag policies, backup policies, and the AI Services Opt-Out Policy.

![The image lists four types of organizational policies: Service Control Policies, Tag Policies, Backup Policies, and AI Services Opt-Out Policy, each with a brief description.](https://kodekloud.com/kk-media/image/upload/v1752860636/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Using-Organizational-Policies-to-Scope-Organization-Permissions/organizational-policies-list-descriptions.jpg)

AWS Organizations enables you to group multiple AWS accounts, which is particularly beneficial when a corporate headquarters oversees various subsidiaries. The headquarters can enforce specific rules—for instance, ensuring that S3 buckets are not publicly exposed or restricting public access to databases. SCPs serve as an effective tool to enforce such regulations across all accounts within your organization. For example, an SCP can restrict the launching of resources in unapproved regions, thus helping to maintain compliance with corporate policies.

![The image illustrates a Service Control Policy (SCP) that restricts downloading software from an office network, represented by a user icon, a download arrow with a cross, and a software window.](https://kodekloud.com/kk-media/image/upload/v1752860637/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Using-Organizational-Policies-to-Scope-Organization-Permissions/scp-restrict-software-downloads-illustration.jpg)

> [!important]
> **Reminder**
>
> SCPs are applied from a management account at the root organizational unit down to child organizational units, ensuring consistent access controls across your AWS environment.

## Tag Policies

If your company mandates consistent tagging across all resources (for example, by environment or application), AWS Organizations offers tag policies to enforce uniform key-value formatting standards. This ensures that every service within your AWS accounts adheres to a standardized tagging convention.

![The image is a diagram illustrating a tag policy structure, showing a hierarchy from a root and management account to development, staging, and production environments, each with their own tag policies.](https://kodekloud.com/kk-media/image/upload/v1752860639/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Using-Organizational-Policies-to-Scope-Organization-Permissions/tag-policy-structure-diagram.jpg)

## Backup Policies

Backup policies are critical in mandating regular backups to prevent data loss from key services such as EBS, EFS, and RDS. For example, a backup policy might require each department to perform daily backups to safeguard their data consistently.

![The image illustrates a backup policy where the IT department backs up data once a day, ensuring data from EBS volumes and RDS databases is never lost.](https://kodekloud.com/kk-media/image/upload/v1752860639/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Using-Organizational-Policies-to-Scope-Organization-Permissions/backup-policy-daily-it-department.jpg)

## AI Services Opt-Out Policy

The AI Services Opt-Out Policy allows organizations to control their data's usage for AWS AI/ML services. For instance, if the legal department decides to restrict the use of facial recognition or advanced AI tools on company data, the AI Services Opt-Out Policy can prevent AWS from using submitted data—such as text, audio, images, or videos—to train its AI models.

![The image illustrates an AI Services Opt-Out Policy, showing a legal department implementing a new rule to restrict the use of facial recognition and advanced AI tools. It explains that AWS allows organizations to prevent certain accounts from using AI/ML services that process customer data.](https://kodekloud.com/kk-media/image/upload/v1752860640/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Using-Organizational-Policies-to-Scope-Organization-Permissions/ai-services-opt-out-policy.jpg)

## Overview of AWS Organizational Policies

To summarize, AWS Organizations offers four principal types of policies:

| Policy Type              | Purpose                                                                | Example Use Case                                                                              |
| ------------------------ | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Service Control Policies | Restrict access to specific AWS services/actions across accounts       | Prevent launching resources in unauthorized regions                                           |
| Tag Policies             | Enforce a consistent tagging convention for resources                  | Ensure all resources are tagged by environment or application                                 |
| Backup Policies          | Mandate regular backups to prevent data loss                           | Require daily backups for IT data from EBS volumes, EFS, and RDS services                     |
| AI Services Opt-Out      | Opt out of using AWS AI/ML services on company data for model training | Prevent AI services from processing customer data, such as disabling facial recognition tools |

![The image illustrates an "AI Services Opt-Out Policy" featuring Amazon services like Comprehend, Polly, Rekognition, and SageMaker, with icons for text, audio, image, and video.](https://kodekloud.com/kk-media/image/upload/v1752860641/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Using-Organizational-Policies-to-Scope-Organization-Permissions/ai-services-opt-out-policy-amazon.jpg)

This overview covers the various types of organizational policies that you may encounter on the AWS certification exam. For more detailed information on AWS Organizations and its policies, visit the [AWS Documentation](https://aws.amazon.com/organizations/) page.

Thank you for reading this lesson.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/0c9bb9a3-5201-434e-8085-a9f1e9f23f22/lesson/f2eec40f-6e10-40a8-bc21-712784ec9108)**
>
> Watch video content
