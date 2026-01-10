# Cognito Identity Pool Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Security/Cognito-Identity-Pool-Demo)

---

## Table of Contents

- Cognito Identity Pool Demo
  - Configuring Authenticated Access
  - Configuring Guest Access
  - Post-Creation Steps
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Security

# Cognito Identity Pool Demo

In this lesson, you will learn how to set up a Cognito identity pool to grant users access to AWS services. This process allows your users to interact securely with AWS resources through controlled permissions.

Begin by navigating to the AWS Cognito console and selecting the option to "Grant access to AWS services." This is the core purpose of an identity pool—enabling secure interactions with AWS. Click on **Create identity pool** to start the setup.

![The image shows the Amazon Cognito page on the AWS website, highlighting secure identity and access management for apps, with sections on benefits, features, and pricing.](https://kodekloud.com/kk-media/image/upload/v1752859307/notes-assets/images/AWS-Certified-Developer-Associate-Cognito-Identity-Pool-Demo/amazon-cognito-aws-identity-management.jpg)

When configuring your identity pool, you can enable one or both of the following access types:

- **Authenticated Access:** Issues credentials for users from trusted identity providers.
- **Guest Access:** Provides unauthenticated public access to AWS services.

For this demonstration, both authenticated and guest access are enabled. The following sections detail the configuration steps for each access type.

## Configuring Authenticated Access

If you opt for authenticated access, you need to assign a role that authenticated users will assume when interacting with AWS. For example, you might name this role "Cognito Identity Pool - Authenticated Role." By default, this role includes a policy document with limited permissions, primarily allowing the following action:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "cognito-identity:GetCredentialsForIdentity"
      ],
      "Resource": [
        "*"
      ]
    }
  ]
}
```

> [!important]
> **Note**
>
> These limited permissions ensure that users can only retrieve credentials for their identities. You can later update this role in [AWS IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html) to add additional permissions (such as S3 access) when necessary.

![The image shows an AWS Cognito Identity Pools configuration screen where a new IAM role is being created, with options to create or use an existing IAM role.](https://kodekloud.com/kk-media/image/upload/v1752859308/notes-assets/images/AWS-Certified-Developer-Associate-Cognito-Identity-Pool-Demo/aws-cognito-identity-pools-iam-role.jpg)

## Configuring Guest Access

For guest access, create a new role, often by modifying the default role name (for instance, "guest") and adjusting the associated policy document to define different permissions. This separation ensures that guests and authenticated users operate under distinct permission sets.

After setting up both roles, you have the option to connect your identity providers. In this demonstration, the identity pool is named "my identity pool" and basic authentication flow is enabled. Click **Next** to review your configurations and proceed to create the identity pool.

## Post-Creation Steps

Once your identity pool has been created, ensure that users (whether authenticated or guests) log in via the chosen authentication provider. Upon successful login, they can retrieve temporary AWS credentials that allow them to interact with AWS services according to the permissions defined in their respective roles. Should you need to grant additional permissions later (for example, S3 access), simply update the role in IAM with the necessary policies.

![The image shows the AWS Identity and Access Management (IAM) console, specifically the "Roles" section, with a search for roles related to "Cognito." Three roles are listed with their trusted entities and last activity details.](https://kodekloud.com/kk-media/image/upload/v1752859309/notes-assets/images/AWS-Certified-Developer-Associate-Cognito-Identity-Pool-Demo/aws-iam-console-roles-cognito.jpg)

This concludes the lesson on configuring a Cognito identity pool. We hope you found this walkthrough informative and helpful.

Happy coding, and see you in the next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/294fdab3-80dd-4183-aa7e-e5e3ffc9edd8/lesson/5b0b8f2f-c3fa-49e3-b96f-73707d1feebd)**
>
> Watch video content
