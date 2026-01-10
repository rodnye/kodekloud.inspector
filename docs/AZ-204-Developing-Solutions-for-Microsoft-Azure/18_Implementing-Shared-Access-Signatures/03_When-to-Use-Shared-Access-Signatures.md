# When to Use Shared Access Signatures - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Implementing-Shared-Access-Signatures/When-to-Use-Shared-Access-Signatures)

---

## Table of Contents

- When to Use Shared Access Signatures
  - 1. Frontend Proxy Service
  - 2. Lightweight SaaS Authentication Service
  - Summary
  - Watch Video

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Implementing Shared Access Signatures

# When to Use Shared Access Signatures

In this article, we explore when it is appropriate to leverage Shared Access Signatures (SAS) in Azure Storage environments. SAS tokens allow you to grant controlled, time-bound access to storage resources without sharing your account keys, making them ideal for scenarios that require precise permission management.

When using a storage account to store data, there are two common design patterns for managing client uploads and downloads:

## 1\. Frontend Proxy Service

In the first design pattern, a frontend proxy service handles all client interactions with the storage account. Clients upload and download data through this proxy, which also manages authentication and business rule validations.

![The image illustrates a data flow diagram showing the use of a front-end proxy service to upload/download data between a computer and Microsoft Azure Storage.](https://kodekloud.com/kk-media/image/upload/v1752866673/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-When-to-Use-Shared-Access-Signatures/data-flow-diagram-azure-storage.jpg)

This approach provides the following benefits and trade-offs:

| Aspect                | Description                                                                                                                         |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Business Rule Control | The proxy can enforce additional validations and business rules during data operations.                                             |
| Scalability           | Scaling a single proxy service to manage high-volume or large data transfers may be challenging and costly.                         |
| Performance           | High transaction volumes (e.g., hundreds of image uploads per second on an e-commerce platform) can create performance bottlenecks. |

> [!important]
> **Note**
>
> Using a frontend proxy service can be ideal when strict business validations are critical and the overall data volume is moderate.

## 2\. Lightweight SaaS Authentication Service

The second design pattern involves a lightweight service dedicated to SaaS authentication. This service authenticates the client and issues a SAS token that grants specific permissions—such as read or write access—to the Azure Storage account. The workflow is as follows:

1.  The client requests access from the lightweight authentication service.
2.  The service verifies the client’s identity.
3.  Upon successful verification, the service returns a SAS token with defined permissions.

![The image is a flowchart illustrating the process of using Shared Access Signatures (SAS) with a computer, SAS Provider Service, and Microsoft Azure Storage, showing the steps of authentication, data saving, and reading.](https://kodekloud.com/kk-media/image/upload/v1752866674/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-When-to-Use-Shared-Access-Signatures/sas-flowchart-azure-storage.jpg)

This design pattern offers significant advantages:

| Benefit               | Explanation                                                                                                                 |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Direct Storage Access | Clients use the SAS token to interact directly with Azure Storage, eliminating the performance overhead of a proxy.         |
| Scalability           | The direct access model scales much better for high-volume or large data transactions, such as uploading large video files. |
| Resource Efficiency   | Reduces load on central servers by bypassing the proxy for every transaction.                                               |

> [!important]
> **Note**
>
> This method is especially effective for applications with unpredictable data loads, where dynamic token generation ensures both security and scalability.

## Summary

Shared Access Signatures provide a scalable and efficient way to grant controlled access to Azure Blob Storage resources. They are particularly useful in scenarios that demand fine-grained control over user permissions and data access. For example, an application that requires users to upload large files can issue a SAS token, allowing users to interact directly with Azure Storage and thereby reducing server load.

Azure Functions can be employed to dynamically generate SAS tokens during runtime, offering flexible and secure access management based on configured permissions.

In the next section, we will discuss Stored Access Policies and how they can be used to centrally manage SAS token parameters for enhanced control and security.

For further reading, consider exploring these resources:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Azure Documentation](https://docs.microsoft.com/azure/)
- [Microsoft Azure Storage](https://docs.microsoft.com/azure/storage/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/00cea585-8945-49f2-bd87-be0ce9c88985/lesson/0b8aadd4-61de-4347-abdc-3274a29def50)**
>
> Watch video content
