# Storage migration - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-migration-solution/Storage-migration)

---

## Table of Contents

- Storage migration
  - Online Storage Migration
  - Offline Storage Migration
  - Migration Tools Comparison
  - Conclusion
  - Watch Video
    - Azure File Sync
    - Windows Server Storage Migration Service
    - AzCopy and Storage Explorer
    - Azure Import/Export Service
    - Azure Data Box
      - Import Workflow
      - Export Workflow
      - When to Use Azure Data Box

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a migration solution

# Storage migration

In this article, we explore effective storage migration methods, available both online and offline. Leveraging a variety of tools and services, these methods cater to different data volumes, network conditions, and specific migration requirements.

## Online Storage Migration

Online migration transfers data over a network rather than using physical disks. It provides a seamless way to move data between environments. Key tools and services include:

- Windows Server Storage Migration Service
- Azure File Sync
- AzCopy
- Storage Explorer
- Azure CLI and PowerShell

### Azure File Sync

Azure File Sync synchronizes on-premises file shares with an Azure file share. When synchronization is complete, on-premises file servers serve as caching points, allowing on-demand access without the need to locally store all data.

![The image is a diagram illustrating Azure File Sync, showing the flow from a storage account with file shares to a storage sync service with cloud endpoints, and then to registered server file sync agents.](https://kodekloud.com/kk-media/image/upload/v1752867048/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Storage-migration/azure-file-sync-diagram.jpg)

### Windows Server Storage Migration Service

The Windows Server Storage Migration Service facilitates the migration of data from various on-premises file servers—including Samba, NetApp, and different Windows Server versions—to a new Windows Server hosted on-premises or in Azure. It supports several migration paths:

- Direct migration to a Virtual Machine using the Storage Migration Service.
- Synchronization to Azure Files via Azure File Sync.
- Manual data copying to a Windows Server before migrating to Azure.

![The image is a diagram illustrating the Windows Server Storage Migration Service, showing data migration paths from various servers to Azure Files, VMs, and Windows servers. It includes components like File Sync and different server types such as Samba, NetApp, and various Windows Server versions.](https://kodekloud.com/kk-media/image/upload/v1752867049/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Storage-migration/windows-server-storage-migration-diagram.jpg)

### AzCopy and Storage Explorer

AzCopy is a command-line interface (CLI) tool designed for efficient data transfers, while Storage Explorer provides a graphical user interface (GUI) for similar tasks. Both tools are popular choices for transferring data from on-premises environments to Azure, as showcased in the [AZ-104: Microsoft Azure Administrator](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator) course.

![The image is a promotional graphic for "AzCopy and Storage Explorer," tools for data migration, featuring logos and descriptions of each tool. AzCopy is described as a CLI-based tool, while Storage Explorer is a GUI-based tool.](https://kodekloud.com/kk-media/image/upload/v1752867050/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Storage-migration/azcopy-storage-explorer-promo.jpg)

## Offline Storage Migration

Offline migration involves transferring data by physically moving storage devices. Two primary services offered for offline migration include:

- Azure Import/Export Service
- Azure Data Box

### Azure Import/Export Service

The Azure Import/Export Service is designed to move large datasets between on-premises environments and Azure. It supports two distinct workflows: import (from on-premises to Azure) and export (from Azure to on-premises).

#### Import Workflow

1.  Identify the data to be transferred (e.g., 40 terabytes).
2.  Prepare the disk and copy the data onto it using the WA Import/Export tool.
3.  Generate journal files to ensure data integrity.
4.  Create an import job in Azure with a reference to the destination storage account, and upload the journal files.
5.  Ship the prepared drives to an Azure data center using a carrier service (e.g., UPS, FedEx). The job includes the data center’s address and an optional return address.
6.  Once processed, the data is copied to the Azure Storage Account, and the disks are returned.

![The image is a flowchart illustrating the import workflow for transferring data from on-premises to Azure using the Import/Export Service. It outlines steps from preparing and shipping hard drives to data processing and storage in Azure.](https://kodekloud.com/kk-media/image/upload/v1752867052/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Storage-migration/import-export-service-workflow-flowchart.jpg)

> [!important]
> **Key Tip**
>
> Ensure that journal files are properly generated, as they play a critical role in maintaining data integrity during the import process.

#### Export Workflow

To export data from Azure to an on-premises environment, follow these steps:

1.  Identify the data to be exported and create an export job in the Azure portal.
2.  Specify the destination address for shipping the disks in the export job.
3.  Ship the disks to the designated Azure data center.
4.  At the data center, the selected data is copied onto the hard drives.
5.  The disks are encrypted with BitLocker, with decryption keys included in the job details.
6.  The disks are packaged and shipped back to the specified return address.
7.  Use the provided decryption keys to access your data on-premises.

![The image is a flowchart illustrating the export workflow of an Import/Export Service by KodeKloud, detailing steps from identifying data to shipping encrypted hard drives.](https://kodekloud.com/kk-media/image/upload/v1752867053/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Storage-migration/export-workflow-flowchart-kodekloud.jpg)

### Azure Data Box

Azure Data Box is a managed appliance designed for offline data transfers. Unlike the Import/Export Service where you need to prepare your own disks, Azure Data Box provides secure, tamper-proof hardware. There are three offerings:

- **Data Box Disk:** Ideal for transferring less than 40 terabytes. It offers 35 terabytes of usable capacity, supports Azure Blob Storage, and features SATA II and SATA III interfaces with 128-bit encryption.
- **Data Box:** Provides up to 100 terabytes capacity, supports standard NAS protocols, comes with a rugged casing, Azure Blob Storage support, and 256-bit encryption.
- **Data Box Heavy:** Suitable for extremely large data transfers—up to one petabyte—with a robust design and 256-bit encryption.

![The image is an infographic detailing Azure Data Box offerings, including Data Box Disk, Data Box, and Data Box Heavy, with their respective capacities and features.](https://kodekloud.com/kk-media/image/upload/v1752867056/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Storage-migration/azure-data-box-offerings-infographic.jpg)

#### When to Use Azure Data Box

Azure Data Box is a cost-effective solution in scenarios such as:

- One-time migrations when on-premises storage capacity is limited.
- Initial bulk transfers followed by incremental updates.
- Regular uploads from a data center with large quantities of data.
- Disaster recovery as part of a comprehensive business continuity and disaster recovery (BCDR) strategy.
- Data migration between on-premises environments and various cloud providers.

## Migration Tools Comparison

Selecting the right migration tool depends on the dataset size and available network bandwidth. The following comparison provides guidance on choosing the appropriate solution:

![The image is a table comparing data migration solutions based on dataset size and network bandwidth, listing options like Azure Import/Export, Data Box, and AZCopy. It categorizes solutions for different bandwidth scenarios, from low to high.](https://kodekloud.com/kk-media/image/upload/v1752867057/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Storage-migration/data-migration-solutions-comparison-table.jpg)

Key considerations include:

- For large datasets with very low network bandwidth, use Azure Import/Export or Data Box.
- For large datasets with high bandwidth (ranging from 1 Gbps to 100 Gbps), AzCopy is recommended. In such cases, also consider Azure Data Factory, Azure Stack Edge, or Azure Data Box Gateway.
- For moderately large datasets with moderate bandwidth (100 Mbps to 1 Gbps), Azure Import/Export or Data Box provide balanced solutions.
- For smaller datasets (a few gigabytes to a few terabytes) with low to moderate bandwidth, tools like Storage Explorer, the Azure portal, AzCopy, Azure PowerShell, or Azure CLI are effective.

> [!important]
> **Tip**
>
> Review your data volume and network capabilities to determine the most efficient migration tool for your scenario.

## Conclusion

Choosing the appropriate storage migration solution depends on your data volume, network bandwidth, and your preferred approach—online or offline. The range of tools and services outlined in this article offers flexible options for a smooth and secure data migration.

Thank you for reading.

Microsoft Mechanics  
www.microsoft.com  
www.microsoft.com

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/fd250ecb-c21c-4044-ad18-71a6368cc4a6/lesson/7e7980b2-2501-4094-ab86-873f4efd6e3b)**
>
> Watch video content
