# IAM Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Identity-and-Access-Management-IAM/IAM-Overview)

---

## Table of Contents

- IAM Overview
  - IAM Users and Policies
  - Using Groups for Simplified Management
  - IAM Roles
  - Least Privilege and Multi-Factor Authentication
  - Summary
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Identity and Access Management IAM

# IAM Overview

When you create an AWS account, you are required to provide two essential pieces of information: a unique email address and a valid credit card for billing. Once your account is set up, an initial user—the root user—is automatically created. This root user has unrestricted access to your account, enabling actions such as resource creation or deletion, billing modifications, and full control over AWS services. Because of these extensive privileges, it is strongly recommended to limit the root user’s activity strictly to critical administrative operations like billing changes.

![The image illustrates an AWS root user account with access to everything in the account, including email and credit card information. It highlights the root user's ability to perform any action on resources within the account.](https://kodekloud.com/kk-media/image/upload/v1752858943/notes-assets/images/AWS-Certified-Developer-Associate-IAM-Overview/aws-root-user-account-access.jpg)

To enhance security, always create non-root IAM users for day-to-day operations. For instance, when onboarding a new employee, avoid sharing the root credentials. Instead, provide the employee with a unique IAM user account with permissions tailored to their role. By default, a new IAM user has no permissions until you explicitly assign the necessary access, such as permissions for Amazon EC2 and Amazon S3 while restricting access to other services like Amazon RDS. This level of control is managed via the Identity and Access Management (IAM) service.

![The image illustrates an Identity and Access Management (IAM) scenario where a new employee is granted access to Amazon EC2 and Amazon S3, but denied access to Amazon RDS.](https://kodekloud.com/kk-media/image/upload/v1752858944/notes-assets/images/AWS-Certified-Developer-Associate-IAM-Overview/iam-access-ec2-s3-denied-rds.jpg)

IAM is a global service designed to manage both authentication ("Are you who you say you are?") and authorization ("What actions are you allowed to perform?"). You can assign specific permissions to users, groups, and roles to ensure that each entity has access only to the resources necessary for their tasks.

![The image is a diagram explaining AWS Identity and Access Management (IAM), showing how it handles authentication and authorization for users, groups, and roles within an AWS account.](https://kodekloud.com/kk-media/image/upload/v1752858945/notes-assets/images/AWS-Certified-Developer-Associate-IAM-Overview/aws-iam-authentication-authorization-diagram.jpg)

![The image is a diagram illustrating AWS Identity and Access Management (IAM), showing the relationship between users, groups, roles, policies, and AWS services like Amazon EC2 and Amazon RDS.](https://kodekloud.com/kk-media/image/upload/v1752858947/notes-assets/images/AWS-Certified-Developer-Associate-IAM-Overview/aws-iam-diagram-users-roles-policies.jpg)

---

## IAM Users and Policies

An IAM user represents a person or an application that requires access to AWS resources. When you create an IAM user, they start with a default "deny-all" permission policy. To grant specific access, you explicitly attach IAM policies to that user. Policies are written in JSON and detail which actions are allowed or denied on which resources.

For example, consider the following JSON policy:

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
        "arn:aws:s3:::bucket1",
        "arn:aws:s3:::bucket1/*"
      ]
    }
  ]
}
```

In this example:

- **SecondStatement**: Grants permission for all actions on EC2 services across all resources.
- **ThirdStatement**: Grants permission only to list and retrieve objects from a specific S3 bucket (`bucket1`).

By assigning such a policy to a user, you ensure they have the necessary EC2 access and controlled S3 access needed for their role. This approach allows you to apply granular control over the resources each user can access.

---

## Using Groups for Simplified Management

Managing individual permissions for multiple IAM users can be complex. To streamline this process, you can create groups that aggregate users and assign them policies collectively. For example, you might create separate groups for HR, Finance, and IT, each with its own tailored permissions. When a user is added to a group, they automatically inherit the group's permissions, reducing administrative overhead.

![The image shows a diagram with icons representing HR, Finance, and IT groups, each with a policy checklist and a user icon with "+100." There's also a warning symbol labeled "Unmaintainable."](https://kodekloud.com/kk-media/image/upload/v1752858948/notes-assets/images/AWS-Certified-Developer-Associate-IAM-Overview/hr-finance-it-policy-checklist-diagram.jpg)

![The image illustrates a grouping concept with icons representing HR, Finance, and IT departments, each associated with a policy checklist. Below, there are group icons with a user and a "+100" symbol.](https://kodekloud.com/kk-media/image/upload/v1752858949/notes-assets/images/AWS-Certified-Developer-Associate-IAM-Overview/grouping-concept-hr-finance-it.jpg)

---

## IAM Roles

IAM roles allow you to grant temporary access to AWS resources. Unlike IAM users, roles come with temporary credentials that can be assumed by users, applications, or services when needed. For example, an application running on an EC2 instance might assume a role that permits access to an S3 bucket, or a Lambda function might assume a role to process messages from a queue. Roles are also essential for enabling cross-account resource interactions.

A role must be paired with a trust policy to define which entities can assume it. Consider the following trust policy example:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::xxxxxx:user/UserA"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

When a user assumes a role, they temporarily gain the role's permissions until the session expires, at which point they revert to their original permissions.

![The image illustrates two roles: one connecting an instance to a bucket, and another connecting AWS Lambda to a queue.](https://kodekloud.com/kk-media/image/upload/v1752858950/notes-assets/images/AWS-Certified-Developer-Associate-IAM-Overview/aws-lambda-queue-bucket-roles.jpg)

---

## Least Privilege and Multi-Factor Authentication

A key security principle embodied by IAM is the principle of least privilege. This means granting users only the permissions they absolutely need to perform their tasks. For instance, if a user does not require access to EC2, do not include EC2 permissions in their policy.

> [!important]
> **Note**
>
> It is best practice to continuously review and update IAM policies to adhere to the principle of least privilege.

Additionally, implementing multi-factor authentication (MFA) adds an extra seat of security. MFA requires users to provide a dynamically generated code—often from an authentication app like Google Authenticator or Authy—in addition to their username and password. This extra layer significantly reduces the risk of unauthorized access, even if credentials are compromised.

![The image illustrates least-privilege permissions, showing a user with access to Amazon S3 but not to Amazon EC2.](https://kodekloud.com/kk-media/image/upload/v1752858952/notes-assets/images/AWS-Certified-Developer-Associate-IAM-Overview/least-privilege-s3-access-illustration.jpg)

![The image illustrates a multi-factor authentication (MFA) process, showing a mobile device with an authentication app generating a code, and includes references to Google Authenticator and Authy. It also depicts a user account and credentials, emphasizing security through additional verification steps.](https://kodekloud.com/kk-media/image/upload/v1752858953/notes-assets/images/AWS-Certified-Developer-Associate-IAM-Overview/mfa-process-authentication-app-diagram.jpg)

Keep in mind that MFA is an optional feature in AWS, but it is highly recommended—especially for the root user—to add an extra layer of protection to your account.

---

## Summary

When you create an AWS account, the root user is automatically provisioned and possesses unrestricted access. For routine activities, create individual IAM users and assign them specifically tailored policies that restrict their actions to only what is necessary. Simplify permission management using groups that allow collective policy assignment, and use IAM roles for granting temporary credentials for applications or cross-account scenarios.

IAM policies, defined as JSON documents, allow you to specify allowed and denied actions on a per-resource basis. By combining dedicated users, groups, and roles with the principle of least privilege and enhanced security features like MFA, you can effectively secure and manage access to your AWS resources.

![The image is a summary of Identity Access Management, highlighting groups as collections of IAM users, roles for temporary access, and least-privilege permissions to minimize access and reduce risks.](https://kodekloud.com/kk-media/image/upload/v1752858955/notes-assets/images/AWS-Certified-Developer-Associate-IAM-Overview/identity-access-management-summary.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/683c50bc-9bd3-4094-b666-354fcc06941f/lesson/5752a62e-ad41-4aa1-ae2d-8aae2560665f)**
>
> Watch video content
