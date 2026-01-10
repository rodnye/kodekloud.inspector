# Azure Blob Storage - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Exploring-Azure-Blob-Storage/Azure-Blob-Storage)

---

## Table of Contents

- Azure Blob Storage
  - Blob Types
  - Blob Storage Hierarchy
  - Naming Conventions
  - Managing the Blob Storage Lifecycle
  - Watch Video
    - Block Blobs
    - Append Blobs
    - Page Blobs
    - Organizational Structure
    - Containers and Blobs
    - Accessing Blobs via URLs

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Exploring Azure Blob Storage

# Azure Blob Storage

In this article, we dive deep into Azure Blob Storage, exploring the various blob types and their specific use cases. Whether you are managing large media files or maintaining continuous logs, understanding these blob types will help you optimize your storage strategy.

## Blob Types

Azure Blob Storage supports three main types of blobs. Each type is designed to address different storage requirements:

### Block Blobs

Block blobs are perfect for storing large amounts of unstructured data such as images, videos, backups, or log files. These blobs are made up of blocks that can be uploaded independently. This design means that if the upload of one block fails, you only need to retry that block instead of re-uploading the entire file.

### Append Blobs

Append blobs are optimized for append operations. They are ideal for use cases where you need to continuously add data, such as updating log files with new entries. Every write operation simply adds data to the end of the blob, ensuring that the existing content remains unchanged.

### Page Blobs

![The image illustrates different types of blobs: Block Blobs, Append Blobs, and Page Blobs, with visual representations and examples of their structure.](https://kodekloud.com/kk-media/image/upload/v1752866418/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Azure-Blob-Storage/blob-types-block-append-page.jpg)

Page blobs are engineered for scenarios that require random read-write access. They are commonly used to store virtual hard drives for Azure Virtual Machines. With page blobs, you can update specific byte ranges, making them highly efficient when only parts of a file need to be read or modified (for example, updating a VM disk or database storage).

## Blob Storage Hierarchy

Understanding the structure of Azure Blob Storage helps in organizing and managing your data effectively.

### Organizational Structure

Consider an organization like KodeKloud. Within this organization, there can be several subscriptions. In our example, we are using one subscription that hosts two storage accounts. A storage account is not just a container for blob storage—it also includes file storage, queue storage, and table storage. It serves as a centralized place for managing various configuration settings such as redundancy options (LRS, GRS, ZRS), access tiers, and network rules.

### Containers and Blobs

Each storage account can contain multiple containers, which are similar to folders in a file system. Containers allow you to logically group related blobs—for instance, one container for images and another for videos. This segmentation provides fine-grained access control using Microsoft Entra ID or shared access signatures.

A blob, the actual stored object (such as a text file, image, or video), resides within a container. Blobs have unique properties and metadata, and you can perform operations like read, write, delete, and even version them to track changes over time.

For example, imagine a storage account containing two containers: one named "files" and another named "videos." The "files" container may hold blobs like file1.txt and ad1.png, while the "videos" container stores objects such as intro.mp4.

### Accessing Blobs via URLs

Accessing a blob requires a properly formatted URL, which consists of:

1.  The unique storage account name (e.g., corecloud123), which must be unique across Azure.
2.  The Blob service endpoint: `blob.core.windows.net`.
3.  The container name.
4.  The blob name.

For instance, to access the file file1.txt located in the "files" container of the storage account corecloud123, the URL would be:

```
https://corecloud123.blob.core.windows.net/files/file1.txt
```

![The image illustrates a "Blob Storage Hierarchy" showing the structure from subscriptions to storage accounts, containers, and blobs, with examples of file types and a URL format.](https://kodekloud.com/kk-media/image/upload/v1752866420/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Azure-Blob-Storage/blob-storage-hierarchy-structure.jpg)

## Naming Conventions

Proper naming of Azure Blob Storage components is essential for smooth operations. Here are the key guidelines:

- **Storage Account:** Must be globally unique across Azure, consist of 3 to 24 characters, and use only lowercase letters (without dashes or underscores).
- **Container Name:** Should be between 3 to 63 characters and supports only lowercase letters.
- **Blob Name:** May contain 1 to 1024 characters and is case sensitive.
- **Virtual Directories:** The full path, which includes virtual directories, is limited to 1024 characters. Additionally, each directory name in ADLS Gen2 can be up to 124 characters.

For instance, within a container, you can create virtual directories (folders) to logically separate and organize your blobs, making it easier to navigate and manage large volumes of data.

![The image provides guidelines for naming Azure Blob Storage components, detailing character limits and case sensitivity for storage account names, container names, and blob names.](https://kodekloud.com/kk-media/image/upload/v1752866421/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Azure-Blob-Storage/azure-blob-storage-naming-guidelines.jpg)

## Managing the Blob Storage Lifecycle

Managing the lifecycle of your blob storage is crucial for cost control and performance optimization. The lifecycle management feature in Azure Blob Storage allows you to define policies for data retention and to transition data between different access tiers based on usage patterns. This ensures that your data remains both accessible and cost-effective over time.

> [!important]
> **Note**
>
> Lifecycle management in Azure Blob Storage can help you automate tasks such as moving infrequently accessed data to a cooler tier, archiving old data, or even deleting data that is no longer needed.

By understanding the various blob types, the hierarchical structure, and naming best practices, you can effectively leverage Azure Blob Storage to meet your application needs and optimize your data management strategy.

Happy learning!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/d7bae4e9-7fdd-4381-ab83-8297abc55df1/lesson/198b403e-040f-41d4-b18e-4434f2848a70)**
>
> Watch video content
