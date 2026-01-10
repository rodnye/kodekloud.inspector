# Secrets Manager - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Security/Secrets-Manager)

---

## Table of Contents

- Secrets Manager
  - The Risks of Hard-Coded Credentials
  - How AWS Secrets Manager Works
  - Secure Secret Management Workflow
  - Key Features of AWS Secrets Manager
  - Watch Video
  - Practice Lab

---

## Content

AWS Solutions Architect Associate Certification

Services Security

# Secrets Manager

In this lesson, we explore AWS Secrets Manager—a secure and efficient service for managing sensitive information required by your applications. When applications connect to resources like databases, they often need credentials such as usernames and passwords. Hard-coding these credentials in your source code, for instance in a GitHub repository, can expose them to unauthorized access.

> [!important]
> **Security Alert**
>
> Never store credentials directly in your source code. Always use secure methods such as environment variables or services like AWS Secrets Manager to safeguard sensitive data.

## The Risks of Hard-Coded Credentials

Embedding credentials in your application code exposes your systems to potential attacks. If an attacker accesses your repository, they may extract these sensitive credentials, putting your database and valuable customer information at risk.

## How AWS Secrets Manager Works

AWS Secrets Manager provides a reliable solution to this problem by allowing you to store, distribute, and manage sensitive data securely. This service handles various types of secrets including:

- Database credentials
- Passwords
- Third-party API keys
- Any other sensitive configuration data

Each secret consists of a name and a JSON structure containing the secret data. AWS Secrets Manager encrypts these secrets at rest using AWS Key Management Service (KMS). When your application retrieves a secret, Secrets Manager decrypts it and securely transmits it over TLS to your runtime environment.

## Secure Secret Management Workflow

Consider the following flow for managing credentials securely with AWS Secrets Manager:

1.  Your application requires credentials to connect to a database.
2.  Instead of embedding these credentials in the code, you store them as secrets in AWS Secrets Manager.
3.  The credentials are encrypted using AWS KMS.
4.  When the application starts, it retrieves the encrypted credentials from Secrets Manager.
5.  AWS Secrets Manager decrypts the credentials using KMS and securely transmits them over TLS.
6.  The credentials are only available at runtime, ensuring they remain secure and hidden from the source code.
7.  AWS Lambda functions can be scheduled to rotate secrets automatically at defined intervals, enhancing overall security.

> [!important]
> **Pro Tip**
>
> This workflow is applicable not only for database credentials but also for any sensitive data like API keys. Using AWS Secrets Manager helps centralize and secure all your critical secrets.

![The image illustrates a flowchart showing how AWS Secrets Manager is used to manage API keys for an external API, involving AWS Lambda within the AWS Cloud.](https://kodekloud.com/kk-media/image/upload/v1752865914/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Secrets-Manager/aws-secrets-manager-api-keys-flowchart.jpg)

## Key Features of AWS Secrets Manager

AWS Secrets Manager offers a range of benefits:

| Feature                     | Description                                                                               |
| --------------------------- | ----------------------------------------------------------------------------------------- |
| Secure Storage              | Encrypts secrets using AWS KMS, ensuring sensitive data is securely stored at rest.       |
| Easy Retrieval              | Simplifies secret management through straightforward API calls, reducing code complexity. |
| Automatic Rotation          | Facilitates scheduled secret rotation, minimizing the risk of credential compromise.      |
| Fine-Grained Access Control | Provides detailed access policies to control who can access specific secrets.             |

![The image lists four features: Secure Secret Storage, Easy Retrieval, Automatic Rotation, and Fine-Grained Access Control, each represented with an icon.](https://kodekloud.com/kk-media/image/upload/v1752865915/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Secrets-Manager/secure-secret-storage-features.jpg)

AWS Secrets Manager eliminates the need to hard-code sensitive data, allowing your application to dynamically retrieve necessary credentials at runtime while maintaining a high security standard. This service not only protects your application but also simplifies credential management and enhances overall system integrity.

By leveraging AWS Secrets Manager, you can strengthen your application's security posture and efficiently manage your sensitive data.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/6b2d9e18-1714-499c-83d4-4d1f7ff29e66/lesson/3d0e19d2-1f82-4341-81aa-b12f8b34503d)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/6b2d9e18-1714-499c-83d4-4d1f7ff29e66/lesson/d27abd25-b12d-41e6-984e-f1d568e5cef2)**
>
> Practice lab
