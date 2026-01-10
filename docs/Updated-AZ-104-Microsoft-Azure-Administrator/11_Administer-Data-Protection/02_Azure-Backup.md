# Azure Backup - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Data-Protection/Azure-Backup)

---

## Table of Contents

- Azure Backup
  - Data Sources
  - Watch Video
    - Azure Workloads
    - On-Premises and Other Environments

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Data Protection

# Azure Backup

Azure Backup is a native Microsoft Azure service that simplifies the process of backing up and restoring your data in the cloud. With automatic storage management that scales with your data, it minimizes the need for manual interventions while optimizing costs.

Azure Backup supports several storage options, including Locally Redundant Storage (LRS), Geo-Redundant Storage (GRS), and Zone-Redundant Storage (ZRS). This flexibility helps you meet diverse compliance and business continuity requirements. Best of all, there are no transfer fees for backup data or restored content.

> [!important]
> **Data Security**
>
> Data security is a top priority. Azure Backup encrypts data both in transit and at rest and supports application-consistent backups. This ensures that even running applications remain uninterrupted during the backup process while preserving data integrity. Additionally, configurable retention policies let you store backups for as long as needed to satisfy regulatory and organizational demands.

One of the standout benefits of Azure Backup is its versatility. Whether you need to back up files, folders, or entire computers—whether they're hosted on-premises, in AWS, GCP, or on Azure—the service securely stores your data in the cloud.

![The image outlines the benefits of Azure Backup, highlighting features like automatic storage management, multiple storage options, unlimited data transfer, data encryption, application-consistent backup, and long-term retention. It also shows a flowchart for backing up files, folders, and computers.](https://kodekloud.com/kk-media/image/upload/v1752884459/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Azure-Backup/azure-backup-benefits-flowchart.jpg)

The backup process is designed to accommodate different environments and resource types. Whether you are protecting files, folders, or computers, each is seamlessly integrated into the Azure Backup Service.

## Data Sources

Azure Backup is capable of handling a wide range of data sources. Here's a breakdown of supported workloads:

### Azure Workloads

- **Virtual Machines:** Protect your Azure VMs.
- **Azure Files Shares:** Back up file shares stored on Azure.
- **SQL VMs:** Ensure the integrity of your SQL Virtual Machines.
- **SAP HANA on Azure VMs:** Secure your SAP HANA environments.

### On-Premises and Other Environments

- **Files and Folders:** Safeguard critical documents and directories.
- **Hyper-V Virtual Machines:** Manage backups for Hyper-V VMs.
- **VMware Virtual Machines:** Integrate VMware environment backups.
- **SQL Server:** Protect your SQL Server databases.
- **SharePoint:** Ensure SharePoint data consistency.
- **Exchange:** Back up your Exchange server data.
- **System State:** Preserve essential system configuration.
- **Bare Metal Recovery:** Support comprehensive system restores.

![The image shows two sections for selecting data sources for backup: "Azure Workloads" with options like Virtual Machine and Azure FileShare, and "On-Premises Workloads" with options like Files and Folders and Hyper-V Virtual Machines.](https://kodekloud.com/kk-media/image/upload/v1752884460/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Azure-Backup/data-sources-backup-azure-on-premises.jpg)

Multiple data sources can be seamlessly integrated into Azure Backup. In the following sections, you will learn how to back up file shares from on-premises environments and virtual machines in the cloud.

The next section introduces the Azure Backup Center, where you can manage and monitor your backup processes effectively.

> [!important]
> **Tip**
>
> Before proceeding, ensure that your backup policies align with your organization's compliance and retention requirements. This proactive check can help prevent potential data governance issues later on.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/a25ecd10-20ce-4ff9-bcc1-386c2e018b09/lesson/910718fa-1df8-4439-a964-2e5b237e76d1)**
>
> Watch video content
