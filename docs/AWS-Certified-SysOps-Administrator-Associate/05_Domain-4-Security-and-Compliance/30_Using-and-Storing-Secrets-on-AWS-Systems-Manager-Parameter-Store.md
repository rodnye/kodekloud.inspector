# Using and Storing Secrets on AWS Systems Manager Parameter Store - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-4-Security-and-Compliance/Using-and-Storing-Secrets-on-AWS-Systems-Manager-Parameter-Store)

---

## Table of Contents

- Using and Storing Secrets on AWS Systems Manager Parameter Store
  - Introduction to AWS Systems Manager
  - Focus on Parameter Store
  - Secure Strings and Parameter Types
  - Conclusion
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 4 Security and Compliance

# Using and Storing Secrets on AWS Systems Manager Parameter Store

Welcome back. In this article, we take a closer look at managing secrets with AWS Systems Manager Parameter Store. While our previous discussion focused on AWS Secrets Manager — a service built to handle automatic rotation of database credentials, OAuth tokens, API keys, and various application credentials — here we explore an alternative approach to storing and managing secrets.

![The image is a diagram showing AWS Secrets Manager, which manages database credentials, application credentials, OAuth tokens, and API keys.](https://kodekloud.com/kk-media/image/upload/v1752860656/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Using-and-Storing-Secrets-on-AWS-Systems-Manager-Parameter-Store/aws-secrets-manager-diagram.jpg)

It is important to understand that AWS Secrets Manager provides auto-rotation of credentials, a feature that AWS Systems Manager Parameter Store does not offer. Although both services are capable of storing critical secrets like database credentials, API keys, and OAuth tokens, the absence of automatic rotation in Parameter Store is a key differentiator for exam preparation and production use cases.

## Introduction to AWS Systems Manager

AWS Systems Manager (SSM) is a powerful management service that consolidates a suite of operational tools. It enables efficient patch management, parameter management, incident management, state management, and more. Designed to work with AWS environments, on-premises servers, other cloud providers, and IoT devices (provided the SSM Agent is installed), Systems Manager streamlines the management of diverse systems.

![The image is a diagram of a Systems Manager, showing various management tools like Inventory, Patch Manager, and Incident Manager, connected to different environments such as AWS, Data Centers, and IoT Fleets.](https://kodekloud.com/kk-media/image/upload/v1752860657/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Using-and-Storing-Secrets-on-AWS-Systems-Manager-Parameter-Store/systems-manager-management-tools-diagram.jpg)

## Focus on Parameter Store

At the heart of Systems Manager lies the Parameter Store, a secure and centralized system for storing configuration data and secrets. Positioned in the upper right-hand section of the Systems Manager console, Parameter Store lets you safely store configuration strings, parameters, and other values, including passwords, database connection details, and license codes. Despite AWS offering a dedicated License Manager, many users continue to leverage Parameter Store for its simplicity and central management.

Parameter Store is also instrumental in enabling secure connectivity. For example, by linking your EC2 instances with Parameter Store, you can ensure that your RDS systems always retrieve up-to-date and secure credentials.

![The image is a diagram illustrating the AWS Systems Manager Parameter Store, showing its integration with Amazon EC2, AWS Lambda, and Amazon RDS, and highlighting features like centralized, scalable, and secure storage for passwords, database connections, and license codes.](https://kodekloud.com/kk-media/image/upload/v1752860658/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Using-and-Storing-Secrets-on-AWS-Systems-Manager-Parameter-Store/aws-parameter-store-diagram.jpg)

> [!important]
> **Note**
>
> AWS Systems Manager relies on an agent that can be installed on a variety of operating systems, whether running in the cloud or on-premises, as long as the agent can communicate with the public AWS endpoints.

![The image is a diagram showing the relationship between an SSM Agent on an Amazon EC2 or on-premises server and a Systems Manager.](https://kodekloud.com/kk-media/image/upload/v1752860659/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Using-and-Storing-Secrets-on-AWS-Systems-Manager-Parameter-Store/ssm-agent-ec2-relationship-diagram.jpg)

## Secure Strings and Parameter Types

Parameter Store uses a data unit known as a secure string to store sensitive information. Secure strings are encrypted using AWS Key Management Service (KMS), ensuring that passwords and similar data remain protected. This encryption means that applications can retrieve necessary configuration data without directly handling plaintext secrets.

Parameters typically follow a hierarchical naming convention — for example, "myapp-dev-db-password" or "/app1/qa/database1/password" — allowing you to design the structure that fits your organization.

There are three main parameter types available in Parameter Store:

| Parameter Type          | Use Case                                    | Example Naming Convention   |
| ----------------------- | ------------------------------------------- | --------------------------- |
| String parameter        | For storing plain text values               | `/app/env/parameter`        |
| String list parameter   | For storing comma-separated list of strings | `/app/env/parameterList`    |
| Secure string parameter | For storing sensitive data (encrypted)      | `/app/env/secure-parameter` |

Almost all sensitive information is stored as a secure string, ensuring it is encrypted via KMS.

![The image illustrates different parameter types in a parameter store: String, StringList, and SecureString, with SecureString noted for use with sensitive data.](https://kodekloud.com/kk-media/image/upload/v1752860660/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Using-and-Storing-Secrets-on-AWS-Systems-Manager-Parameter-Store/parameter-store-types-string-securestring.jpg)

> [!important]
> **Password Rotation Reminder**
>
> If your application mandates regular password rotation, AWS Secrets Manager is the recommended solution. Parameter Store offers a secure and cost-effective alternative, but it does not support automatic password rotation.

![The image illustrates the process of encryption using AWS Key Management Service (KMS), showing a flow from Parameter Store to SecureString via AWS KMS.](https://kodekloud.com/kk-media/image/upload/v1752860661/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Using-and-Storing-Secrets-on-AWS-Systems-Manager-Parameter-Store/aws-kms-encryption-process-diagram.jpg)

## Conclusion

This article has provided an overview of managing secrets using secure string parameters in AWS Systems Manager Parameter Store. In upcoming demos, we will explore a hands-on process to store and retrieve secrets using Parameter Store, offering practical examples and deeper insights into its usage.

Stay tuned for more detailed explorations and practical guides on securing your AWS infrastructure with Parameter Store!

For additional reading, you might consider exploring [AWS Systems Manager Documentation](https://docs.aws.amazon.com/systems-manager/) and [AWS Secrets Manager Documentation](https://docs.aws.amazon.com/secretsmanager/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/0c9bb9a3-5201-434e-8085-a9f1e9f23f22/lesson/6cc0651c-944a-435b-a316-4f9a53c18f52)**
>
> Watch video content
