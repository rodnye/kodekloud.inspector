# Multi Account in AWS Strategies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-4-Security-and-Compliance/Multi-Account-in-AWS-Strategies)

---

## Table of Contents

- Multi Account in AWS Strategies
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 4 Security and Compliance

# Multi Account in AWS Strategies

Welcome to this lesson on multi-account strategies in AWS. In this guide, we discuss methods to manage multiple AWS accounts while ensuring robust security and compliance across your organization.

When managing multiple accounts, implementing proper operational security controls is essential despite the inherent complexity. One of the key mechanisms to achieve this is the use of [Service Control Policies (SCPs)](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html). SCPs help enforce specific restrictions—for example, allowing more flexibility in development accounts while applying stricter controls on production environments.

![The image illustrates the application of security guardrails to organizational units (OUs) rather than individual accounts, showing different categories like Security and Compliance, Development, and Production. It includes icons representing organizational structure and a document labeled "Security and Compliance SCP."](https://kodekloud.com/kk-media/image/upload/v1752860557/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Multi-Account-in-AWS-Strategies/security-guardrails-organizational-units.jpg)

As illustrated above, production environments are typically locked down with even tighter controls. SCPs play a central role in managing multiple accounts that are grouped within organizational units such as development, production, and security/compliance.

It is crucial to avoid building deeply nested organizational trees. Instead, aim for a flat structure. For example, design production accounts consistently across subsidiaries, and apply similar principles to development accounts. Keeping the structure simple minimizes unnecessary complexity and enhances agility.

![The image illustrates a simplified organizational structure with three main categories: Security and Compliance, Development, and Production, each containing four teams labeled A to D. It emphasizes avoiding deep organizational unit hierarchies.](https://kodekloud.com/kk-media/image/upload/v1752860558/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Multi-Account-in-AWS-Strategies/organizational-structure-security-dev-prod.jpg)

Start small with [AWS Organizations](https://aws.amazon.com/organizations/) and gradually expand your organizational units as needed. In many large enterprises, maintaining a flat hierarchy has proven effective. For instance, a Fortune 50 company managed 750 AWS accounts by organizing them into distinct units for production, development, QA, highly sensitive workloads, and even an experimental environment for data science initiatives.

Every organization has a management account that is essential for billing, control, and defining SCPs and policies. This account acts as the root or foundation of your organizational structure, ensuring that policies applied at the root cascade to all underlying accounts.

![The image is a diagram illustrating the concept of avoiding deploying workloads to a management account, showing a hierarchy with "Root" and "Management Account" leading to "Security and Compliance," "Development," and "Production" sections.](https://kodekloud.com/kk-media/image/upload/v1752860559/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Multi-Account-in-AWS-Strategies/avoiding-workloads-management-account-diagram.jpg)

> [!important]
> **Best Practice**
>
> A recommended best practice is to separate non-production and production environments. For example, designate shared services accounts for security and compliance separate from accounts dedicated to software delivery. Additionally, you can segment development accounts into areas like QA, staging, and UAT to minimize impact from potential issues.

![The image illustrates the separation of production from non-production workloads, showing shared services for security and compliance, alongside development and production environments.](https://kodekloud.com/kk-media/image/upload/v1752860560/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Multi-Account-in-AWS-Strategies/production-nonproduction-workloads-diagram.jpg)

Automation can further streamline the management of multiple AWS accounts. Tools such as [AWS Control Tower](https://aws.amazon.com/controltower/) enable you to set up an account factory that automatically creates and configures accounts with the necessary SCPs and resource configurations. This automated setup helps enforce multi-factor authentication across all accounts and reduces the risk of unauthorized access.

![The image outlines four steps for using automation to support agility and scale: new account creation, applying SCPs, configuring resources, and enforcing policies.](https://kodekloud.com/kk-media/image/upload/v1752860562/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Multi-Account-in-AWS-Strategies/automation-agility-scale-steps.jpg)

Another important aspect is managing access within accounts. A common strategy involves differentiating between regular user accounts for day-to-day operations and elevated "breaking glass" access reserved for emergency situations. This approach, similar to using sudo in Linux, ensures that full administrative privileges are only activated under strictly monitored conditions.

![The image is a diagram titled "Breaking Glass Access," comparing "Regular Access" with restricted permissions for daily operations and "Emergency Access" with full admin permissions for emergencies.](https://kodekloud.com/kk-media/image/upload/v1752860563/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Multi-Account-in-AWS-Strategies/breaking-glass-access-diagram.jpg)

In summary, implementing multi-account strategies in AWS involves:

- Keeping organizational structures simple and flat.
- Applying SCPs systematically across various environments.
- Leveraging automation tools like AWS Control Tower to enhance security and scalability.
- Using access management strategies to balance daily operations with emergency needs.

These practices not only enforce necessary security policies but also provide a scalable approach to efficiently manage a large number of AWS accounts.

Thank you for reading this lesson on multi-account strategies in AWS.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/0c9bb9a3-5201-434e-8085-a9f1e9f23f22/lesson/20349d85-570e-4d41-bc62-20902e04717c)**
>
> Watch video content
