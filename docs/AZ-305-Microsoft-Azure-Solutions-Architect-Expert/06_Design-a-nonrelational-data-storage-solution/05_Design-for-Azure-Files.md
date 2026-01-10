# Design for Azure Files - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-nonrelational-data-storage-solution/Design-for-Azure-Files)

---

## Table of Contents

- Design for Azure Files
  - Overview of Azure Files Structure
  - Accessing File Shares
  - Performance Levels
  - Storage Tiers for Azure Files
  - Comparison with Blob Storage and Azure NetApp Files
  - Demonstration in the Azure Portal
  - Watch Video

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a nonrelational data storage solution

# Design for Azure Files

In this lesson, we explore the design considerations for Azure Files—a service that offers enterprise-grade file shares hosted in the cloud. This guide covers the structure of Azure Files, access methods, performance and storage tiers, and comparisons with other storage services such as Blob Storage and Azure NetApp Files.

## Overview of Azure Files Structure

Azure Files is organized hierarchically, starting with a storage account. Within this account, you can create multiple file shares (e.g., A, B, C). Each file share contains directories (or folders) where individual files are stored.

![The image is a diagram illustrating the structure of Azure Files, showing the flow from an Azure File Service account to file shares, directories, and individual files.](https://kodekloud.com/kk-media/image/upload/v1752867120/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Files/azure-files-structure-diagram.jpg)

> [!important]
> **Key Information**
>
> Azure Files is designed for easy and scalable file storage in the cloud, providing seamless integration with different operating systems.

## Accessing File Shares

There are two main methods to access your Azure file shares:

1.  **Direct Mounting:**  
    You can directly mount file shares to Windows, Linux, or macOS devices using the SMB or NFS protocols. When creating a file share in the Azure portal, click the "Connect" button to generate an OS-specific script (PowerShell for Windows, Bash for Linux, or macOS). Ensure that port 445 is enabled because it is essential for SMB communications; the script will verify this before establishing the connection.
2.  **Azure File Sync:**  
    Azure File Sync converts your on-premises Windows servers into caches for your Azure file shares. This setup centralizes file management by caching frequently accessed files locally, thereby reducing retrieval times compared to cloud downloads. The tiering feature helps prioritize and cache critical files on-premises.

![The image is an infographic from KodeKloud about accessing file shares, highlighting two methods: direct mounting using the SMB protocol and Azure File Sync for centralizing file shares.](https://kodekloud.com/kk-media/image/upload/v1752867121/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Files/kodekloud-file-shares-infographic.jpg)

## Performance Levels

The performance of your Azure file share depends on your business needs and cost considerations. There are two primary performance tiers:

- **Standard Tier:**  
  Using HDD storage, the Standard tier typically offers double-digit millisecond latencies, up to 10,000 IOPS, and a maximum bandwidth of 300 megabits per second. It is an economical option when high IOPS or bandwidth is not critical.
- **Premium Tier:**  
  This tier takes advantage of SSD storage, resulting in lower, single-digit millisecond latencies. Premium file shares support up to 100,000 IOPS and offer bandwidth up to 5 gigabits per second. Because of its enhanced performance, the premium tier is more expensive and is currently available only in zones that support ZRS. When creating a file share, select the premium option if your region supports it.

![The image compares two performance levels, "Standard" and "Premium," for data storage, highlighting differences in latency, IOPS, bandwidth, and cost. The "Standard" uses HDDs, while the "Premium" uses SSDs.](https://kodekloud.com/kk-media/image/upload/v1752867123/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Files/performance-comparison-standard-premium.jpg)

## Storage Tiers for Azure Files

Azure Files provides various storage tiers designed to balance performance and cost. The following table summarizes the key characteristics of each tier:

| Storage Tier          | Description                                                                                                        | Storage Type |
| --------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------ |
| Premium               | Uses SSDs for low latency and high performance, ideal for I/O-intensive workloads.                                 | SSD          |
| Transaction Optimized | Designed for high transactional workloads with moderate latency; default option for standard storage accounts.     | HDD          |
| Hot                   | Best for small to medium file shares that require fast, consistent access, such as in team file sharing scenarios. | HDD          |
| Cool                  | Meant for archival and infrequently accessed data while minimizing cost.                                           | HDD          |

> [!important]
> **Note**
>
> Only the Premium tier utilizes SSD storage; the Transaction Optimized, Hot, and Cool tiers all rely on HDD storage.

![The image describes four storage tiers: Premium, Transaction Optimized, Hot, and Cool, each with different performance and cost characteristics for data storage.](https://kodekloud.com/kk-media/image/upload/v1752867124/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Files/storage-tiers-premium-transaction-hot-cool.jpg)

## Comparison with Blob Storage and Azure NetApp Files

When selecting a storage solution, it's important to understand the differences among Azure Files, Blob Storage, and Azure NetApp Files:

- **Blob Storage:**  
  Ideal for large-scale, sequential read workloads. Blob Storage is commonly used for static website content and other scenarios where data is ingested once and read repeatedly. It is cost-effective, low-maintenance, and optimized for serving data.
- **Azure Files:**  
  Designed as a fully managed file service, Azure Files supports random access workloads across multiple operating systems via SMB and NFS protocols. NFS support ensures full POSIX file system compatibility, making it suitable for persistent storage in containerized environments like ACI and AKS. Additionally, file shares persist even after container deletion.
- **Azure NetApp Files:**  
  Powered by NetApp technology, this fully managed file service offers advanced performance, multi-protocol support (NFS 3.0, 4.1, and SMB concurrently), and robust data protection features. It is ideal for high-performance, random access workloads.

The following performance metrics offer a quick comparison:

| Service            | IOPS               | Throughput |
| ------------------ | ------------------ | ---------- |
| Blob Storage       | Up to 20,000 IOPS  | 100 GB/s   |
| Azure Files        | Up to 100,000 IOPS | 80 Gbps    |
| Azure NetApp Files | Up to 460,000 IOPS | 36 Gbps    |

Cost is also a significant factor when choosing the appropriate storage for your application.

## Demonstration in the Azure Portal

Below is a walkthrough of how to configure Azure Files using the Azure portal:

1.  **Viewing and Editing a File Share:**
    - Navigate to your Storage Account and select "File Shares."
    - To modify an existing file share (for example, one configured with the Transaction Optimized tier), click on "Edit Quota" to update the storage limit.
    - To create a new file share, provide a name and select the appropriate tier. Note that for standard storage accounts, the Premium option is not available; you will choose between Transaction Optimized, Hot, or Cool tiers based on your requirements.

2.  **Connecting to a File Share:**
    - When you select a file share, a "Connect" button appears at the top of the interface.
    - Clicking this button provides OS-specific scripts for connecting to the file share.
    - The scripts include a verification check to ensure that port 445 is open for SMB connections.

3.  **Creating a Premium File Share:**
    - To create a Premium file share, begin by creating a new storage account with the Premium performance tier.
    - In the portal, select a resource group, choose "Premium" for the account type, and ensure the FileShares option is enabled.
    - Remember, for Premium file shares, only LRS or ZRS options are available; options such as GCRS or GRS are not supported.
    - Once the premium storage account is active, create a new file share similarly to a standard file share. However, you will benefit from enhanced IOPS and lower latency due to the SSD storage. Additionally, you can choose between SMB or NFS protocols (note that both protocols cannot be enabled simultaneously).

> [!important]
> **Pro Tip**
>
> Choose the appropriate storage tier and performance level based on your workload requirements and cost constraints to optimize your Azure Files deployment.

Once you have configured and connected to your file shares, you are ready to design and deploy your Azure Files based on your specific performance and cost needs.

Next, we will move on to discuss the design for Azure Disks.

[Learn more about Azure storage design patterns](https://docs.microsoft.com/azure/storage/common/storage-design-patterns)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/7f522b0e-e9c6-4a0a-acfa-345ee6ebb885/lesson/14f4a641-e1a2-4d82-a0e0-bdfa416ba131)**
>
> Watch video content
