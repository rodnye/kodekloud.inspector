# Storage Services - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ900-Microsoft-Azure-Fundamentals/Storage/Storage-Services)

---

## Table of Contents

- Storage Services
  - Blob Storage
  - Disk Storage
  - Queue Storage
  - Azure Files
  - Azure Table Storage
  - Global Accessibility and Endpoints
  - Demonstration Preview
  - Watch Video

---

## Content

AZ900: Microsoft Azure Fundamentals

Storage

# Storage Services

Azure Storage Services offer a comprehensive, cloud-based solution for securely storing, accessing, and managing your data. In this guide, we explore the primary storage services available in Azure—beginning with Blob Storage—to help you choose the best option tailored to your specific needs.

## Blob Storage

Azure Blob Storage is ideal for handling unstructured data, including documents, images, and videos. Whether you're managing thousands of photos or hosting large video files, Blob Storage delivers global accessibility and robust performance for website assets and digital media.

## Disk Storage

Disk Storage provides high-performance storage options for Azure Virtual Machines. Featuring multiple performance tiers—such as SSDs and HDDs—this service is optimized for speed and reliability, making it an excellent choice for mission-critical applications.

## Queue Storage

Queue Storage enables reliable message delivery between various components of your application. Think of it as a secure postal service that ensures each message is efficiently routed to its destination, facilitating effective communication within distributed systems.

## Azure Files

Azure Files offers managed file shares that work seamlessly in both cloud and on-premises environments. For example, an organization like Bella Innovation can utilize Azure Files to support team collaboration with scalable file sharing that mimics locally mounted drives—all while benefiting from cloud agility.

## Azure Table Storage

Azure Table Storage is a NoSQL data store designed for rapid development and scalable applications. It excels at storing semi-structured data such as user profiles and configuration settings, offering a flexible and efficient solution for many data scenarios.

![The image lists five Azure storage services: Azure Blob, Azure Disk, Azure Queue, Azure Files, and Azure Tables, each with an icon.](https://kodekloud.com/kk-media/image/upload/v1752868535/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Storage-Services/azure-storage-services-list.jpg)

## Global Accessibility and Endpoints

Except for Disk Storage—which is directly connected to Virtual Machines—all Azure Storage Services are accessible globally via public endpoints. These endpoints follow a consistent HTTPS format for enhanced security. Although HTTP is supported, it is disabled by default to safeguard your data.

Each storage account in Azure requires a unique name, ensuring a predictable URL structure. For instance:

```
HTTPS://{storage_account_name}.blob.core.windows.net
```

For Queue Storage, the structure is as follows:

```
HTTPS://{storage_account_name}.queue.core.windows.net
```

Notice how the service name is embedded in the URL, clearly indicating the type of storage being accessed.

![The image is a table listing different storage services and their corresponding endpoints, including Blob Storage, Azure Files, Queue Storage, and Table Storage.](https://kodekloud.com/kk-media/image/upload/v1752868536/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Storage-Services/storage-services-endpoints-table.jpg)

## Demonstration Preview

In the upcoming demonstration, you will witness the process of creating a Storage Account and configuring Blob Storage. This practical example will show how the URL appears in your browser, highlighting the straightforward structure and global accessibility of Azure Storage Services.

> [!important]
> **Next Steps**
>
> After understanding Azure Storage Services, continue to our next section on Access Tiers to learn how to optimize your storage costs and performance.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az900-microsoft-azure-fundamentals/module/dc6682c4-e930-431d-ae27-8de33ae04303/lesson/18f75e14-fce0-4d45-814f-5d5af4026cbd)**
>
> Watch video content
