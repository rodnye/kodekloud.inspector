# Secrets Manager - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Security/Secrets-Manager)

---

## Table of Contents

- Secrets Manager
  - Key Features of AWS Secrets Manager
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Security

# Secrets Manager

In this lesson, we explore AWS Secrets Manager—a crucial service designed for managing, retrieving, and rotating sensitive credentials such as database passwords and API keys.

![The image is an infographic about a "Secrets Manager" with icons representing its functions: managing, retrieving, and rotating secrets.](https://kodekloud.com/kk-media/image/upload/v1752859412/notes-assets/images/AWS-Certified-Developer-Associate-Secrets-Manager/secrets-manager-infographic-functions.jpg)

AWS Secrets Manager offers a major advantage over similar services like Parameter Store by providing automatic secret rotation. For instance, you can configure Secrets Manager to rotate your secrets every 60 days using a Lambda function. Additionally, all secrets are encrypted by default with AWS Key Management Service (KMS), ensuring robust security.

![The image illustrates a process involving AWS Secrets Manager, a Lambda function, and AWS Key Management Service (KMS), with a password update every 60 days.](https://kodekloud.com/kk-media/image/upload/v1752859413/notes-assets/images/AWS-Certified-Developer-Associate-Secrets-Manager/aws-secrets-manager-lambda-kms-process.jpg)

> [!important]
> **Note**
>
> When choosing between AWS Systems Manager Parameter Store and Secrets Manager, always consider the sensitivity of your data. For sensitive information that requires regular rotation and enhanced security, Secrets Manager is typically the preferred service.

Secrets Manager not only manages secrets but also integrates seamlessly with Amazon Relational Database Service (RDS). It can automatically configure initial credentials for new RDS instances, eliminating the need to manually set usernames and passwords.

![The image illustrates the integration of AWS Secrets Manager with Amazon Relational Database Service (RDS), showing a flow of credentials (username and password) between them.](https://kodekloud.com/kk-media/image/upload/v1752859414/notes-assets/images/AWS-Certified-Developer-Associate-Secrets-Manager/aws-secrets-manager-rds-integration.jpg)

## Key Features of AWS Secrets Manager

Below is a summary table that highlights the key features and benefits of using AWS Secrets Manager over Parameter Store:

| Feature              | AWS Secrets Manager                                  | Parameter Store                                     |
| -------------------- | ---------------------------------------------------- | --------------------------------------------------- |
| Automatic Rotation   | Supports automatic rotation via Lambda functions     | Does not support automatic rotation                 |
| Default Encryption   | Encrypts secrets automatically using KMS             | Can be configured to encrypt, but not by default    |
| Integration with RDS | Integrates seamlessly to manage database credentials | Typically used for non-sensitive configuration data |

> [!important]
> **Key Benefits**
>
> - Automatic rotation of secrets enhances security and reduces manual overhead.
> - Default encryption with KMS provides strong protection against unauthorized access.
> - Integration with RDS simplifies credential management and boosts operational efficiency.

![The image compares AWS Secrets Manager and SSM Parameter Store, highlighting features like Lambda rotation, KMS encryption, and RDS integration for Secrets Manager.](https://kodekloud.com/kk-media/image/upload/v1752859415/notes-assets/images/AWS-Certified-Developer-Associate-Secrets-Manager/aws-secrets-manager-ssm-comparison.jpg)

In summary, AWS Secrets Manager is an ideal solution for managing and rotating sensitive credentials including database credentials and API keys. Its advanced features—such as automatic Lambda-based rotation, default KMS encryption, and smooth integration with services like RDS—make it the preferred choice for handling sensitive information in AWS environments.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/294fdab3-80dd-4183-aa7e-e5e3ffc9edd8/lesson/d2261d86-69be-4297-86d0-8228fb3f1b44)**
>
> Watch video content
