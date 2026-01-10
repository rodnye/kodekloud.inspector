# AWS Identity Access Management - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Cloud-Practitioner-CLF-C02/Security-and-Compliance/AWS-Identity-Access-Management)

---

## Table of Contents

- AWS Identity Access Management
  - Creating an AWS Account
  - Introduction to IAM
  - IAM Users
  - IAM Policies
  - Policies and Access Control
  - Managing Users with IAM Groups and Roles
  - Multi-Factor Authentication (MFA)
  - Lesson Summary
  - Watch Video

---

## Content

AWS Cloud Practitioner CLF-C02

Security and Compliance

# AWS Identity Access Management

In this lesson, we explore AWS Identity and Access Management (IAM) and explain how to securely manage access to your AWS resources. We'll guide you through account creation, user management, policy configuration, and the use of Multi-Factor Authentication (MFA) for an extra layer of security.

## Creating an AWS Account

When you create your AWS account, you must provide the following three pieces of information:

1.  **Unique Email Address:** For example, if you register an account with kodekloud@gmail.com, that email cannot be used to create another account.
2.  **Account Name:** A descriptive name such as "dev" for identification.
3.  **Credit Card:** Although the same credit card may be used for multiple accounts, each account must be tied to its own unique email address.

Upon registration, AWS automatically generates a root user. The root user provides unlimited access to all resources in your account, which makes it incredibly powerful—and potentially risky if mishandled.

![The image explains AWS account creation, requiring a unique email, account name, and credit card, with root user access and credit card usability across multiple accounts.](https://kodekloud.com/kk-media/image/upload/v1752861715/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Identity-Access-Management/frame_50.jpg)

> [!important]
> **Important**
>
> Avoid using the root account for everyday tasks. Instead, create IAM users with specific permissions to minimize security risks.

![The image explains AWS account creation, requiring a unique email, account name, and credit card, with root user access to all resources.](https://kodekloud.com/kk-media/image/upload/v1752861716/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Identity-Access-Management/frame_70.jpg)

## Introduction to IAM

As your organization expands, sharing the root credentials among users becomes unsafe. IAM allows you to grant secure, granular access to AWS resources without risking the security of your root account. IAM includes several key components:

- **IAM Users:** Individual identities for people or applications requiring AWS access.
- **Groups:** Collections of IAM users that share common permissions.
- **Roles:** Provide temporary permissions to users or services.
- **Policies:** JSON documents that explicitly permit or deny actions on specific AWS resources.

![The image explains AWS Identity and Access Management (IAM), detailing user, group, role, and policy management for authentication and authorization of resources.](https://kodekloud.com/kk-media/image/upload/v1752861718/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Identity-Access-Management/frame_160.jpg)

Think of IAM as a security guard that verifies the identity of each user and checks whether they are allowed to perform a specific action, ensuring adherence to the principle of least privilege.

![The image illustrates AWS Identity and Access Management (IAM), showing users, groups, roles, and policies managing access to AWS resources within an AWS account.](https://kodekloud.com/kk-media/image/upload/v1752861719/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Identity-Access-Management/frame_200.jpg)

## IAM Users

Whenever a new employee or application needs to access AWS, you must create an IAM user account. Each IAM user is initially without any permissions; you then grant permissions by attaching the right policies.

![The image illustrates AWS Identity and Access Management (IAM) for creating a user account, showing a user requesting access.](https://kodekloud.com/kk-media/image/upload/v1752861720/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Identity-Access-Management/frame_220.jpg)

It's best practice to create separate IAM users for both people and applications. This approach prevents unintentional exposure and ensures that only the necessary permissions are granted.

![The image shows a user with access permissions to different services, indicated by checkmarks and a cross, under the question "What Do Users Have Access to?"](https://kodekloud.com/kk-media/image/upload/v1752861723/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Identity-Access-Management/frame_290.jpg)

## IAM Policies

IAM policies are written in JSON and define permissions by specifying what actions are allowed or denied on AWS resources. Below is an example of a policy document:

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

This policy includes two main parts:

- **EC2 Permissions:** All EC2-related actions are allowed on any resource.
- **S3 Permissions:** Actions limited to listing and retrieving objects from a specific bucket (`bucket1`).

When you attach a policy to an IAM user, group, or role, it enforces the permissions based on the principle of least privilege—only granting the necessary permissions.

![The image illustrates AWS Identity and Access Management (IAM) policies, showing decision paths for access permissions to resources, represented by icons.](https://kodekloud.com/kk-media/image/upload/v1752861726/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Identity-Access-Management/frame_340.jpg)

## Policies and Access Control

When assigning policies, it is crucial to ensure that users are granted only the permissions they require. For example, if a user needs to list and retrieve information from S3, do not allow actions such as deletion or modification. This minimizes security risks while adhering to the principle of least privilege.

After creating a user, immediately attach the relevant IAM policy to make those permissions effective.

![The image illustrates a user with a policy determining access to AWS services, allowing access to an S3 bucket but denying access to another service.](https://kodekloud.com/kk-media/image/upload/v1752861727/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Identity-Access-Management/frame_550.jpg)

## Managing Users with IAM Groups and Roles

For streamlined user management, consider the following best practices:

| Feature    | Description                                                                        | Use Case                                                 |
| ---------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------- |
| **Groups** | Collections of IAM users with common permissions                                   | Manage a team with similar roles                         |
| **Roles**  | Provide temporary permissions allowing a user to assume different responsibilities | Grant temporary administrative access for specific tasks |

- **IAM Groups:** Instead of manually assigning policies to each user, add users to groups with pre-defined IAM policies.
- **IAM Roles:** Allow users to assume a role for temporary access to additional permissions. This is useful when a user needs to perform tasks that require privileges beyond their usual permissions.

A useful analogy is that roles operate like an older sibling assuming responsibility temporarily in the absence of a parent.

## Multi-Factor Authentication (MFA)

Adding Multi-Factor Authentication (MFA) significantly enhances your account security by requiring a temporary, time-sensitive code in addition to your username and password. MFA devices include mobile apps like Google Authenticator or Authy.

Even if an attacker compromises your credentials, without the MFA code, they cannot access your account.

![The image explains Multi-Factor Authentication (MFA) for AWS, highlighting the need for a code from a device/app for added security beyond username and password.](https://kodekloud.com/kk-media/image/upload/v1752861729/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Identity-Access-Management/frame_780.jpg)

It is highly recommended to enforce MFA on every IAM user account.

![The image explains Multi-Factor Authentication (MFA), highlighting its security benefits by requiring a code from a device/app, preventing unauthorized access even if passwords are compromised.](https://kodekloud.com/kk-media/image/upload/v1752861730/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Identity-Access-Management/frame_820.jpg)

![The image illustrates Multi-Factor Authentication (MFA) for a root user and two additional users, recommending enabling MFA for all users.](https://kodekloud.com/kk-media/image/upload/v1752861731/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Identity-Access-Management/frame_850.jpg)

## Lesson Summary

- **Account Creation:** A root user is automatically generated upon account creation. Use it sparingly and avoid it for everyday operations.
- **IAM Overview:** IAM is your tool for managing secure access to AWS through users, groups, roles, and policies.
- **IAM Users:** Each user starts without permissions until a specific IAM policy is attached.
- **IAM Policies:** Policies, defined in JSON, explicitly allow or deny access to resources. Always follow the principle of least privilege.
- **Groups and Roles:** Use groups to simplify permissions management for multiple users and roles for temporary access.
- **Multi-Factor Authentication:** Enable MFA on all accounts to enhance security and prevent unauthorized access.

![The image summarizes Identity Access Management, highlighting groups, roles for temporary access, and least-privilege permissions to minimize security risks.](https://kodekloud.com/kk-media/image/upload/v1752861733/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Identity-Access-Management/frame_930.jpg)

This lesson provided a detailed overview of AWS Identity and Access Management, illustrating the best practices for managing user access, crafting effective policies, and using MFA to secure your AWS environment. For more information on AWS security practices, explore the [AWS Documentation](https://aws.amazon.com/documentation/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02/module/4528372a-a177-43ff-b4b6-236c0eee4029/lesson/3bff0d08-29fe-480b-a4a7-22c7a541145f)**
>
> Watch video content
