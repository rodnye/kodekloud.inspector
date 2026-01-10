# Configuring IAM Policies for Fine Grained Access Control - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-4-Security-and-Compliance/Configuring-IAM-Policies-for-Fine-Grained-Access-Control)

---

## Table of Contents

- Configuring IAM Policies for Fine Grained Access Control
  - Identity-Based Policies
  - JSON Document Structure
  - IAM Policy Components
  - Principle of Least Privilege
  - Managed Policies: AWS vs. Customer Managed
  - Access Advisor
  - Summary
  - Watch Video
    - 1. AWS Managed Policies
    - 2. Customer Managed Policies

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 4 Security and Compliance

# Configuring IAM Policies for Fine Grained Access Control

Welcome to this lesson on IAM policies. In this article, we explore how IAM policies enable fine-grained access control for Identity and Access Management (IAM) in AWS. Similar to how a library card determines which books can be checked out or what rooms can be accessed, IAM policies define which actions users, groups, or roles can perform on AWS services.

## Identity-Based Policies

IAM policies are typically identity-based and are attached to a user, group, or role. In contrast, resource-based policies are directly attached to AWS resources, such as S3 buckets or SQS queues. It is recommended to attach policies to groups and roles, allowing users to inherit the appropriate permissions.

![The image is a diagram illustrating IAM (Identity and Access Management) policies, showing that policies can be created and attached to users, groups, and roles.](https://kodekloud.com/kk-media/image/upload/v1752860416/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-IAM-Policies-for-Fine-Grained-Access-Control/iam-policies-diagram-users-groups-roles.jpg)

Roles, which serve as security identities, allow users to assume a set of permissions.

![The image is a diagram illustrating IAM (Identity and Access Management) policies, showing how policies are created and attached to users, groups, and roles, which are categorized as IAM identities.](https://kodekloud.com/kk-media/image/upload/v1752860417/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-IAM-Policies-for-Fine-Grained-Access-Control/iam-policies-diagram-illustration.jpg)

An IAM policy is a JSON document containing statements that specifically allow or deny actions on AWS services, such as S3, EC2, RDS, GuardDuty, or Kubernetes. By default, users, groups, and roles have no permissions on AWS until an explicit policy is attached.

## JSON Document Structure

IAM policies are defined as JSON documents. Consider a policy that permits a user to upload objects to a specific S3 bucket using conditions such as restricting access by days or specific IP ranges.

![The image shows an icon of a document labeled "JSON" with text indicating that most policies in AWS are stored as JSON documents.](https://kodekloud.com/kk-media/image/upload/v1752860418/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-IAM-Policies-for-Fine-Grained-Access-Control/aws-json-policies-icon.jpg)

A typical policy structure includes:

- **Version**: The version of the policy language.
- **Statement Block**: One or more statements that detail:
  - **Effect**: Whether the statement allows or denies access.
  - **Action**: The actions enabled or restricted.
  - **Resource**: The AWS resources (identified by ARNs) to which the statement applies.
- **Conditions (Optional)**: Additional restrictions, such as specific times, IP addresses, or security constraints (SSL/TLS).

For example, a policy granting read access to a specific S3 bucket might look like this:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket",
        "s3:GetObject"
      ],
      "Resource": [
        "arn:aws:s3:::KodeKloud-bucket",
        "arn:aws:s3:::KodeKloud-bucket/*"
      ]
    }
  ]
}
```

> [!important]
> **Note**
>
> Be sure to specify both the bucket ("arn:aws:s3:::KodeKloud-bucket") and its objects ("arn:aws:s3:::KodeKloud-bucket/\*") to correctly define the scope of permissions.

## IAM Policy Components

When creating IAM policies, keep the following components in mind:

1.  **Version**: Usually "2012-10-17".
2.  **Statement**: Consists of one or more statements that define:
    - **Effect**: "Allow" or "Deny" specific actions.
    - **Action**: The AWS service actions like "s3:ListBucket" or "s3:GetObject".
    - **Resource**: Specifies the AWS resources (using ARNs).
    - **Condition (Optional)**: Enforces additional checks, such as IP address or time-based restrictions.

For resource-based policies, the **Principal** element is also included to indicate which identities are allowed to interact with the resource.

![The image outlines the IAM Policy Structure, listing six components: Versions, Statements, Effect, Principal, Action, and Resource. Each component is represented with an icon and a number.](https://kodekloud.com/kk-media/image/upload/v1752860420/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-IAM-Policies-for-Fine-Grained-Access-Control/iam-policy-structure-components.jpg)

## Principle of Least Privilege

A core security principle in AWS IAM is the principle of least privilege, which dictates that users should only have the permissions they require for their tasks. Fine-grained control through IAM policies simplifies enforcing this principle.

![The image illustrates the "Principle of Least Privilege" in an IAM (Identity and Access Management) context, featuring a computer screen with a padlock and people interacting with security elements.](https://kodekloud.com/kk-media/image/upload/v1752860421/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-IAM-Policies-for-Fine-Grained-Access-Control/principle-of-least-privilege-iam.jpg)

## Managed Policies: AWS vs. Customer Managed

There are two main types of IAM policies:

### 1\. AWS Managed Policies

AWS Managed Policies are predefined by AWS and cannot be edited. They offer various access levels, such as full access, power user, read-only, and job function-specific policies, each with a unique ARN.

![The image shows two types of IAM policies: AWS Managed Policies and Customer Managed Policies, with a simple layout and numbering.](https://kodekloud.com/kk-media/image/upload/v1752860425/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-IAM-Policies-for-Fine-Grained-Access-Control/iam-policies-aws-managed-customer.jpg)

For instance, AWS provides policies like "IAM ReadOnlyAccess" and "PowerUserAccess".

![The image is a flowchart titled "AWS Managed Policies," showing a hierarchy of library cards: "Standard Library Cards" leading to "Children's Library Card" and "Adult Library Card."](https://kodekloud.com/kk-media/image/upload/v1752860426/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-IAM-Policies-for-Fine-Grained-Access-Control/aws-managed-policies-flowchart.jpg)

### 2\. Customer Managed Policies

Customer Managed Policies are custom policies that you create and manage. They allow for tailor-made permission sets that can be attached to multiple users, groups, or roles and can be updated as requirements change.

![The image is a slide titled "Customer Managed Policies" with a section on "Custom Library Cards" and an example about issuing custom cards for researchers to borrow rare books.](https://kodekloud.com/kk-media/image/upload/v1752860427/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-IAM-Policies-for-Fine-Grained-Access-Control/customer-managed-policies-custom-cards.jpg)

AWS managed policies are ideal for standard access patterns, while customer managed policies offer flexibility and granular customization. Every update to a customer managed policy creates a new policy version, with AWS retaining up to five previous versions (only one of which is active at a time).

![The image outlines key features of AWS Managed Policies, highlighting predefined permissions, automatic updates, and the inability to modify them.](https://kodekloud.com/kk-media/image/upload/v1752860429/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-IAM-Policies-for-Fine-Grained-Access-Control/aws-managed-policies-features-diagram.jpg)

![The image shows different types of AWS Managed Policies: Full Access, Power-User Policies, Partial-Access, and Job Function Policies, each represented by an icon.](https://kodekloud.com/kk-media/image/upload/v1752860431/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-IAM-Policies-for-Fine-Grained-Access-Control/aws-managed-policies-icons.jpg)

Customer managed policies allow for detailed customization and can be revised over time to meet evolving security requirements.

![The image illustrates "Customer Managed Policies" in AWS, showing people working with charts and data, and notes that these policies can be attached to multiple users, groups, or roles and are reusable.](https://kodekloud.com/kk-media/image/upload/v1752860432/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-IAM-Policies-for-Fine-Grained-Access-Control/customer-managed-policies-aws-diagram.jpg)

![The image is a comparison table between AWS Managed Policies and Customer Managed Policies, using a library analogy to explain their creation, usage, and examples.](https://kodekloud.com/kk-media/image/upload/v1752860434/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-IAM-Policies-for-Fine-Grained-Access-Control/aws-managed-vs-customer-policies.jpg)

## Access Advisor

Access Advisor is a helpful tool in the IAM framework that audits user activity by showing which services a user has accessed and when. This information is invaluable for ensuring adherence to the principle of least privilege. For example, if a user rarely accesses certain services like Auto Scaling or CloudWatch, it may be beneficial to remove those permissions after confirming with the user.

![The image shows an Access Advisor interface displaying a list of allowed services, their associated policies, and the last accessed time for each service. It highlights the feature of assessing permission needs based on access history.](https://kodekloud.com/kk-media/image/upload/v1752860436/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-IAM-Policies-for-Fine-Grained-Access-Control/access-advisor-service-permissions.jpg)

## Summary

IAM policies, defined as JSON documents, offer fine-grained control over AWS access by specifying permissions for users, groups, roles, and resources. They help enforce the principle of least privilege and are available in two forms:

- **AWS Managed Policies**: Predefined and unmodifiable policies suitable for standard access patterns.
- **Customer Managed Policies**: Customizable policies that allow for granular permissions and can be updated as needed.

> [!important]
> **Remember**
>
> By default, AWS entities have no access. You must explicitly grant permissions through these policies. Use conditions and tools like Access Advisor to align permissions with actual user activity and adhere to security best practices.

This concludes our lesson on IAM policies. We hope you found this information useful as you continue to refine your AWS security practices.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/0c9bb9a3-5201-434e-8085-a9f1e9f23f22/lesson/57ce9e71-0ca5-4de6-8933-3dc618fd93d9)**
>
> Watch video content
