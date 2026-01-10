# Storage redundancy - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Azure-Storage/Storage-redundancy)

---

## Table of Contents

- Storage redundancy
  - Locally Redundant Storage (LRS)
  - Zone Redundant Storage (ZRS)
  - Geo-Redundant Storage (GRS)
  - Read Access Geo-Redundant Storage (RA-GRS)
  - Geo-Redundant Storage with Zones (GCRS and RA-GCRS)
  - Creating a Storage Account in Azure
  - Summary
  - Watch Video

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Azure Storage

# Storage redundancy

This guide explores the various storage replication strategies in Azure, including Locally Redundant Storage (LRS), Zone Redundant Storage (ZRS), Geo-Redundant Storage (GRS), Read Access Geo-Redundant Storage (RA-GRS), and Geo-Redundant Storage with Zones (GCRS and RA-GCRS). Each replication method balances data durability, availability, and cost differently. Choosing the right strategy depends on your application’s needs.

## Locally Redundant Storage (LRS)

LRS creates three copies of your data within a single data center, distributing them across different fault domains. Fault domains are isolated hardware units endowed with independent cooling, power, and networking systems. In case of a hardware failure, the replicated copies ensure data availability. However, LRS only covers a single data center, and if that center goes down, access to your data will be interrupted. Despite this, LRS remains the most cost-effective option, offering 99.99% durability.

![The image illustrates "Storage Replication – Locally Redundant Storage" with a diagram showing data replication across multiple servers within a single data center, highlighting one server with a red cross to indicate failure.](https://kodekloud.com/kk-media/image/upload/v1752884408/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Storage-redundancy/storage-replication-locally-redundant-diagram.jpg)

> [!important]
> **Tip**
>
> For scenarios where cost efficiency is critical and data center-wide disasters are unlikely, LRS is a solid choice.

## Zone Redundant Storage (ZRS)

ZRS enhances resilience by replicating data across three different availability zones within a single region. Each zone is typically situated in separate clusters of data centers located at least 300 miles apart, ensuring independent power, cooling, and networking. This redundancy means if one zone fails, the other zones maintain data availability. ZRS provides 99.12% durability but does not safeguard against a full regional outage.

![The image illustrates zone-redundant storage (ZRS) with three zones (A, B, and C) within a region, highlighting replication, durability, and chances of failure. Zone B is marked with an "X" to indicate a failure, while Zones A and C show storage availability.](https://kodekloud.com/kk-media/image/upload/v1752884408/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Storage-redundancy/zone-redundant-storage-illustration.jpg)

## Geo-Redundant Storage (GRS)

GRS offers enhanced redundancy by combining data replication in two regions. Initially, your data is replicated in a primary region using LRS (three copies within one data center). The system then asynchronously replicates the data to a secondary region, also utilizing LRS. In the event that the primary region experiences an outage, a failover can be initiated—either manually or by Microsoft—to the secondary region. Note that the secondary region provides read access only until a complete failover occurs. GRS guarantees 99.69% durability.

![The image illustrates a geo-redundant storage system with replication and durability features, showing a primary and secondary data center setup with failover capabilities. It highlights the concept of geo-replication for enhanced data reliability.](https://kodekloud.com/kk-media/image/upload/v1752884409/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Storage-redundancy/geo-redundant-storage-replication-diagram.jpg)

> [!important]
> **Important**
>
> When planning for GRS, remember that new data writes during a regional outage require additional application logic (using mechanisms like queues or a secondary storage account) to ensure proper synchronization when the primary region is restored.

## Read Access Geo-Redundant Storage (RA-GRS)

RA-GRS functions similarly to GRS by maintaining three data copies in both the primary and secondary regions. However, it extends functionality by enabling continuous read access from the secondary region. This setup allows your applications to query data from the secondary region without the need for a manual failover, providing a balance between accessibility and redundancy. RA-GRS achieves 99.16% durability.

![The image illustrates a storage replication process with read access geo-redundant storage, showing primary and secondary data centers, geo-replication, and failover mechanisms. It highlights replication, durability, and considerations for storage accounts.](https://kodekloud.com/kk-media/image/upload/v1752884410/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Storage-redundancy/storage-replication-geo-redundancy-diagram.jpg)

## Geo-Redundant Storage with Zones (GCRS and RA-GCRS)

By integrating the benefits of availability zones into geo-redundancy, Azure’s GCRS takes data protection further:

- In GCRS, data is first spread across three availability zones within the primary region. It is then asynchronously replicated (using LRS) to a secondary region, effectively combining zone-level and region-level redundancy for higher durability ("ZRS plus LRS").
- RA-GCRS operates in a similar fashion, but it allows for continuous read access to the secondary region without waiting for a failover.

![The image illustrates a storage replication system with geo-zone-redundant storage, showing a primary region with multiple zones and a secondary region for geo-replication. It highlights the flow of read requests from clients to the storage account.](https://kodekloud.com/kk-media/image/upload/v1752884412/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Storage-redundancy/storage-replication-geo-redundancy-diagram-2.jpg)

## Creating a Storage Account in Azure

Follow these steps to create and configure a storage account through the Azure portal:

1.  **Sign in to the Azure portal:** Navigate to "Storage accounts."
2.  **Initiate Creation:** Click "Create" and select the desired subscription and resource group. If needed, create a new resource group.
3.  **Name Your Account:** Provide a unique name—this name will be part of your account’s public endpoint.
4.  **Configure Settings:** Choose the region for deployment along with the performance tier (HDD or SSD) and the redundancy option (LRS, GRS, ZRS, etc.). For demonstration purposes, LRS is selected due to its cost efficiency.

    ![The image shows a Microsoft Azure portal page for creating a storage account, with options for project details, instance details, and redundancy settings. A dropdown menu is open, displaying different redundancy options like locally-redundant storage and geo-redundant storage.](https://kodekloud.com/kk-media/image/upload/v1752884413/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Storage-redundancy/azure-portal-storage-account-creation.jpg)

5.  **Review and Create:** Double-check your configuration settings and click "Review + Create."
6.  **Manage Your Storage Account:** Once the account is created, you can explore services like blobs, file shares, queues, and tables.

    ![The image shows a Microsoft Azure portal screen where a user is in the process of creating a storage account, with details such as subscription, resource group, and location displayed. The "Review" tab is active, and a notification indicates that deployment is being initialized.](https://kodekloud.com/kk-media/image/upload/v1752884415/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Storage-redundancy/azure-portal-storage-account-creation-2.jpg)

7.  **View Account Properties:** After deployment, the storage account overview will indicate that it is a general-purpose v2 account using LRS. Should your requirements change, you can later modify the redundancy option (for example, switching from LRS to ZRS) via the account's redundancy settings.

    ![The image shows a Microsoft Azure portal interface displaying details of a storage account, including its properties, security settings, and networking configurations.](https://kodekloud.com/kk-media/image/upload/v1752884416/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Storage-redundancy/azure-portal-storage-account-details.jpg)

## Summary

This article outlines the different storage replication strategies available in Azure:

| Storage Type   | Redundancy Location                              | Durability | Key Benefit                                            |
| -------------- | ------------------------------------------------ | ---------- | ------------------------------------------------------ |
| LRS            | Single data center across multiple fault domains | 99.99%     | Most cost-effective with intra-data center replication |
| ZRS            | Multiple zones within one region                 | 99.12%     | Protects against zone-level failures                   |
| GRS            | Primary and secondary regions                    | 99.69%     | Enables failover to a secondary region                 |
| RA-GRS         | Primary and secondary regions                    | 99.16%     | Continuous read access in the secondary region         |
| GCRS / RA-GCRS | Availability zones in primary + secondary region | Very high  | Combines zone and regional redundancy                  |

Choose the strategy that best aligns with your application’s availability and cost requirements. For more detailed insights, visit the [Azure Storage Documentation](https://docs.microsoft.com/azure/storage/common/storage-redundancy).

By following this guide, you can confidently select and configure the optimal storage redundancy option for your Azure solutions.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/48d08f66-feb9-4bae-83b0-2e6aa34e24ae/lesson/9f6ffdb2-5648-4afe-a1d1-c8b1d806e9c8)**
>
> Watch video content
