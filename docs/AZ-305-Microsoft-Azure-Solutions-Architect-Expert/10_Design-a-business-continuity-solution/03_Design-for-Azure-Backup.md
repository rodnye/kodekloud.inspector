# Design for Azure Backup - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-business-continuity-solution/Design-for-Azure-Backup)

---

## Table of Contents

- Design for Azure Backup
  - Data Collection and Backup Processes
  - Backup Storage Architecture
  - Vault Organization
  - Policy Enforcement
  - Region Availability
  - Access Control
  - Data Redundancy
  - Getting Started with Service Backup Configurations
  - Watch Video

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a business continuity solution

# Design for Azure Backup

In this article, we explore the robust architecture of the Azure Backup service. We discuss its design considerations, supported workloads, and strategies for storing backup data, as well as best practices for configuring Recovery Services Vaults.

Azure Backup is a versatile solution that supports both Azure and non-Azure workloads. As illustrated in the diagram below, multiple backup sources on the left feed data into a centralized backup storage system on the right.

![The image is a diagram titled "Design for Azure Backup," illustrating components like backup agents, built-in backup, backup vault, and recovery services vault, with Azure Backup at the center. It highlights various Azure services and workloads that can be backed up.](https://kodekloud.com/kk-media/image/upload/v1752866806/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Backup/azure-backup-design-diagram.jpg)

## Data Collection and Backup Processes

Azure Backup employs several methods for data collection and backup:

- **Backup Agents**: Installed on on-premises or non-Azure systems, these agents collect and send data directly to Azure Backup.
- **Built-In Backup**: Native backup features are available for services such as Azure Virtual Machines, Azure File Shares, Microsoft SQL Server, SAP, and more.

This unified backup solution encompasses essential features like a restore point manager, high availability, integrated storage management, and data tiering. With everything centralized, there is no need for additional storage provisioning or external restore point managers.

## Backup Storage Architecture

Azure Backup categorizes backup data into dedicated vaults for optimized management:

- **Backup Vault**: Used for storing backup data for services like Azure Database for PostgreSQL, Blob storage, and disks.
- **Recovery Services Vault**: Protects Azure Virtual Machines, SQL databases, SAP systems, backup servers, backup agents, and Data Protection Manager (DPM). For on-premises workloads, components such as backup agents and DPM extend backup capabilities beyond Azure.

> [!important]
> **Note**
>
> Using dedicated vaults to store various types of backup data enhances data management and improves overall service reliability.

Below are important design considerations and best practices when planning your Recovery Services Vault:

## Vault Organization

- Maintain separate vaults for different environments (e.g., production, development, testing).
- Configure production workloads with geo-redundant storage (GRS) to ensure high availability, while development systems may use locally redundant storage (LRS).
- Organize vaults by subscription, environment, or application based on your organizational needs.

## Policy Enforcement

Use Azure Policy to enforce consistent configurations and compliance rules across all vaults. This ensures every vault adheres to standard policies and best practices.

## Region Availability

Deploy Azure Backup components in the same region as the Recovery Services Vault. For example, if you have a Virtual Machine in the East US region, ensure the corresponding vault is also located in East US.

## Access Control

Access to the Recovery Services Vault is managed using Azure Role-Based Access Control (RBAC). This ensures that only authorized users can manage backup resources, enhancing overall security.

## Data Redundancy

By default, a newly created Recovery Services Vault is configured with geo-redundant storage (GRS). Consider the following points regarding redundancy settings:

- The Azure portal does not allow changes to the redundancy option during the initial vault creation.
- Before onboarding any resources, you can modify the redundancy setting (e.g., from LRS to zone-redundant storage (ZRS)).
- Once a resource such as a Virtual Machine is backed up in the vault, the redundancy option becomes locked.
- To switch from GRS to LRS after onboarding, you must delete the existing vault, create a new one with the desired redundancy, and then onboard the resource again.

> [!important]
> **Warning**
>
> Changing redundancy settings on a vault with onboarded resources requires deleting and recreating the vault. This process can lead to service interruptions, so plan accordingly.

## Getting Started with Service Backup Configurations

Next, we will detail the backup configuration process for various services, starting with Azure Blob Storage. This guide will walk you through leveraging Azure Backup effectively while adhering to industry best practices.

For additional information and detailed documentation, consider visiting:

- [Azure Backup Documentation](https://docs.microsoft.com/en-us/azure/backup/)
- [Azure Recovery Services Vault Overview](https://docs.microsoft.com/en-us/azure/backup/backup-configure-vault)

By following these design principles and best practices, you can build a robust and scalable backup solution that meets the needs of your organization.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/d9cff719-f4ed-4b69-a9a5-5994a66e8e15/lesson/d55cfff5-cba0-44fd-ad16-872de08e7de1)**
>
> Watch video content
