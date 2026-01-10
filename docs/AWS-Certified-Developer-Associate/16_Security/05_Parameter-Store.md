# Parameter Store - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Security/Parameter-Store)

---

## Table of Contents

- Parameter Store
  - Centralized Configuration Management
  - Hierarchical Organization and Permission Management
  - Standard vs. Advanced Tiers
  - Advanced Tier Policy Features
  - Summary
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Security

# Parameter Store

In this lesson, we explore AWS Systems Manager Parameter Store—a secure service designed to store configuration data and secrets such as passwords, database connection strings, and other vital configuration values. It supports both plain text and encrypted data, providing flexibility and security for your applications.

![The image is an informational graphic about the Systems Manager Parameter Store, highlighting its features: secure storage for configuration data and secrets, storing passwords and database strings, and supporting plaintext and encrypted data.](https://kodekloud.com/kk-media/image/upload/v1752859397/notes-assets/images/AWS-Certified-Developer-Associate-Parameter-Store/systems-manager-parameter-store-graphic.jpg)

## Centralized Configuration Management

Applications often require configuration settings—like database connection details—that must be securely managed. Rather than embedding sensitive credentials within your source code or configuring them separately on each instance (whether in a server, Lambda function, or mobile app), you can centralize these configurations in Parameter Store. This approach enables every instance of your application to dynamically retrieve the necessary values at runtime.

For example, when an application requires database access, it typically needs both a username and a password. By storing these credentials in Parameter Store, you eliminate the hassle of manual configuration across multiple application instances. Furthermore, updating the database password becomes a streamlined process, as you only need to change it in one centralized location.

![The image illustrates the concept of an SSM Parameter Store with icons representing different applications accessing stored credentials (username and password).](https://kodekloud.com/kk-media/image/upload/v1752859398/notes-assets/images/AWS-Certified-Developer-Associate-Parameter-Store/ssm-parameter-store-credentials-diagram.jpg)

## Hierarchical Organization and Permission Management

Parameter Store organizes configurations into a hierarchical structure, allowing you to group parameters logically. For instance, you might create a hierarchy starting at the organization level (e.g., `/org`), then branching into various applications or services. Within each service (such as an authentication service or task service), you can further segregate parameters as necessary.

![The image shows a hierarchical diagram of a parameter store, with levels including organization, application, auth/tasks, db, and username/password.](https://kodekloud.com/kk-media/image/upload/v1752859399/notes-assets/images/AWS-Certified-Developer-Associate-Parameter-Store/parameter-store-hierarchy-diagram.jpg)

This hierarchical model simplifies permission management. If the authentication team requires access solely to parameters related to the authentication service, you can grant permissions specifically for that branch. This setup ensures they can retrieve necessary credentials (like database usernames and passwords) without exposing configurations unrelated to their responsibilities.

## Standard vs. Advanced Tiers

Parameter Store is offered in two tiers: Standard and Advanced. Below is a comparison of the two tiers:

| Feature            | Standard Tier        | Advanced Tier                              |
| ------------------ | -------------------- | ------------------------------------------ |
| Parameter Limit    | Lower limit          | Higher limit                               |
| Parameter Size     | Up to a fixed size   | Up to 8 KB                                 |
| Parameter Policies | Not supported        | Supported (e.g., expiration, notification) |
| Additional Cost    | No additional charge | Additional cost applies                    |

![The image is a table comparing AWS Parameter Store tiers, detailing differences in parameters allowed, size limits, policy availability, and costs between Standard and Advanced tiers.](https://kodekloud.com/kk-media/image/upload/v1752859400/notes-assets/images/AWS-Certified-Developer-Associate-Parameter-Store/aws-parameter-store-comparison-table.jpg)

> [!important]
> **Note**
>
> When choosing a tier, consider your application's needs. Use the Standard tier for basic requirements and the Advanced tier when you need enhanced features like parameter policies.

## Advanced Tier Policy Features

Within the Advanced tier, you can leverage various parameter policies to increase automation and monitoring:

- **Expiration Policy:** Automatically delete parameters after a specified date or time.
- **Expiration Notification Policy:** Send alerts via EventBridge when a parameter is nearing its expiration.
- **No-Change Notification Policy:** Alert you if a parameter has not been modified within a designated period.

![The image lists three parameter policies: "Expiration" for deleting parameters on a date/time, "ExpirationNotification" for sending expiration notifications via EventBridge, and "NoChangeNotification" for notifications when no changes occur.](https://kodekloud.com/kk-media/image/upload/v1752859401/notes-assets/images/AWS-Certified-Developer-Associate-Parameter-Store/parameter-policies-expiration-notifications.jpg)

> [!important]
> **Warning**
>
> Always ensure that sensitive parameters are properly encrypted using AWS KMS to prevent unauthorized access.

## Summary

AWS Systems Manager Parameter Store offers a robust, secure method for storing configuration data and secrets. Its key benefits include:

- **Centralized Management:** Easily update configuration data without modifying individual application instances.
- **Hierarchical Organization:** Group parameters logically, simplifying permission management.
- **Enhanced Security:** Secure sensitive data with encryption using AWS KMS.
- **Choice of Tiers:** Select the Standard tier for basic needs or the Advanced tier for higher limits and additional policy features.

![The image is a summary slide with a gradient background, listing three points about securely storing configuration data, organizing configurations, and encryption using KMS.](https://kodekloud.com/kk-media/image/upload/v1752859402/notes-assets/images/AWS-Certified-Developer-Associate-Parameter-Store/secure-configuration-storage-summary.jpg)

For further details on AWS Systems Manager Parameter Store, please refer to the [AWS Documentation](https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store.html).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/294fdab3-80dd-4183-aa7e-e5e3ffc9edd8/lesson/d1e1c17e-3b75-4670-a3ba-c5ac146d0983)**
>
> Watch video content
