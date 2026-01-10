# Storage accounts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Azure-Storage/Storage-accounts)

---

## Table of Contents

- Storage accounts
  - Key Benefits
  - Azure Storage Services
  - Storage Account Types
  - Storage Redundancy
  - Watch Video
    - Containers (Azure Blob Storage)
    - Azure Files
    - Azure Tables
    - Azure Queues
    - Blob Storage
    - General Purpose V1 (GPV1)
    - General Purpose V2 (GPV2)
    - Block Blob Storage
    - File Storage

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Azure Storage

# Storage accounts

Azure Storage accounts are the fundamental building blocks for data storage in Azure, offering secure, scalable cloud storage for a wide range of data objects. In this article, we explore the benefits, services, and account types available in Azure Storage, helping you optimize your cloud storage strategy.

## Key Benefits

Azure Storage accounts provide several key advantages that make them an essential component of any cloud architecture:

- **High Availability and Durability:**  
  Multiple redundancy options allow your data to be replicated across different data centers—or even across regions—to ensure maximum availability and durability.
- **Security:**  
  Data stored in Azure is automatically encrypted using storage service encryption. Additionally, various authorization methods are available, including storage keys, shared access signatures, and Azure Active Directory (now known as Microsoft Entra ID).
- **Scalability and Management:**  
  Managed as a platform service, Azure Storage automatically adjusts to your performance and storage needs, making it an ideal solution for both small and large-scale applications.
- **Access:**  
  Secure access via HTTP or HTTPS is provided through Microsoft’s SDKs, Azure PowerShell, Azure CLI, and REST APIs, ensuring seamless integration with your applications.

Azure Storage supports two performance tiers:

- **Standard:**  
  Uses magnetic drives to offer cost-effective storage for workloads that do not require high throughput and low latency.
- **Premium:**  
  Utilizes solid-state drives for high-performance workloads, making it ideal for databases and high-processing applications.

Azure Storage accounts are versatile and support various data types and scenarios:

- **Virtual Machine Storage:**  
  Provides reliable disk storage for running a wide range of applications on Azure.
- **Unstructured Data:**  
  Blob storage is optimized for storing massive amounts of text, binary data, documents, media files, and installers.
- **Structured Data:**  
  Azure Table Storage is suitable for applications that manage structured data sets like user information and metadata.

Overall, Azure Storage accounts offer a robust, flexible platform for both everyday applications and data-intensive workloads.

## Azure Storage Services

Azure Storage comprises multiple services, each optimized for specific use cases. A single storage account can host several services, making it easy to consolidate your storage needs. Below are the primary services along with their use cases:

### Containers (Azure Blob Storage)

Containers in Azure Blob Storage are used for storing unstructured data such as documents, images, videos, and audio files. For example, a media hosting service can use Blob Storage to store and manage user-uploaded videos and photos. Each file is stored as a blob within a container, which functions similarly to a directory in your storage account.

### Azure Files

Azure Files provides a fully managed file share accessible via the SMB protocol. This service functions like a traditional file server, enabling shared access to files and directories across different locations. A common use case is document sharing and collaboration across geographically dispersed teams.

### Azure Tables

Azure Tables offer a scalable NoSQL data storage solution for structured data. Think of each entity as a row in a database. Applications that collect and manage user information, such as names, addresses, and contact details, can efficiently use Azure Tables for structured data storage.

### Azure Queues

Azure Queue Storage is designed to handle storage of large volumes of messages, accessible globally over authenticated HTTP or HTTPS. For instance, a video processing service might use queues to manage encoding tasks, where processing jobs are queued and processed by background services.

![The image is a diagram illustrating Azure Storage Services, showing the relationship between containers, files, tables, and queues with their respective data types like blobs, directories, entities, and messages. It highlights Azure Containers, Azure Files, Azure Tables, and Azure Queues.](https://kodekloud.com/kk-media/image/upload/v1752884406/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Storage-accounts/azure-storage-services-diagram.jpg)

Each of these services is engineered for high availability, durability, and scalability, ensuring that your application maintains excellent performance as it grows.

## Storage Account Types

Azure offers a variety of storage account types to meet different operational and performance needs. Each account type provides distinct services, performance tiers, and replication options:

### Blob Storage

Designed specifically for storing unstructured data as blobs, this account type is ideal for hosting images, documents, audio, video, and more. It operates under the standard performance tier and supports replication options like Locally Redundant Storage (LRS), Geo-Redundant Storage (GRS), and Read-Access Geo-Redundant Storage (RA-GRS).

### General Purpose V1 (GPV1)

The first-generation storage account gives you access to all Azure Storage services, including blobs, files, queues, tables, and disks. GPV1 accounts are available in both standard and premium tiers and support replication options such as LRS, GRS, and REGRS.

### General Purpose V2 (GPV2)

Recommended for most scenarios, the second-generation GPV2 storage account offers enhanced performance and a wider range of replication choices, including Zone-Redundant Storage (ZRS), Geo-Zone-Redundant Storage (GZRS), and Read-Access Geo-Zone-Redundant Storage (RA-GZRS) along with all services offered by GPV1.

### Block Blob Storage

Optimized for block blobs and append blobs, this account type is ideal for textual and binary data storage. Operating under the premium performance tier, it delivers higher throughput and lower latency, supporting replication options like LRS and GRS.

### File Storage

Specifically designed for cloud-based file shares, File Storage is perfect for legacy applications that rely on traditional file systems. Available in the premium tier, this account type ensures high throughput and low latency with replication options such as LRS and GRS.

![The image is a table listing different storage account types, their services, performance tiers, and replication options. It includes types like Blob storage, General Purpose V1 and V2, Block blob storage, and File storage.](https://kodekloud.com/kk-media/image/upload/v1752884407/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Storage-accounts/storage-account-types-table.jpg)

> [!important]
> **Note**
>
> If you find the various replication options such as LRS, GRS, and REGRS confusing, detailed explanations of each method are provided in the subsequent discussion.

## Storage Redundancy

In the next section, we will dive deeper into the storage redundancy options provided by Azure. Understanding these replication methods will help you make informed decisions about data durability and availability, ensuring that your applications remain resilient in case of hardware failures or other disruptions.

For more information on Azure Storage services and best practices, consider visiting the following resources:

- [Azure Storage Documentation](https://docs.microsoft.com/en-us/azure/storage/)
- [Microsoft Entra ID Documentation](https://docs.microsoft.com/en-us/azure/active-directory/)

Stay tuned for our upcoming discussion on storage redundancy to further optimize your Azure environment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/48d08f66-feb9-4bae-83b0-2e6aa34e24ae/lesson/1d82ecd0-b25b-4c2b-b8a7-e197aed0a16c)**
>
> Watch video content
