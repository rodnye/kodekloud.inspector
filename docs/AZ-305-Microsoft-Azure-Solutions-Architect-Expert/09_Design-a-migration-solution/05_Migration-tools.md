# Migration tools - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-migration-solution/Migration-tools)

---

## Table of Contents

- Migration tools
  - Server Migration
  - Database Migration
  - Data Box
  - Watch Video

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a migration solution

# Migration tools

Migration tools offer robust solutions for securely moving your on-premises data, workloads, and applications to Azure after completing the assessment phase. In this guide, we will explore the various tools available for Azure migration and their roles in facilitating a smooth transition to the cloud.

After finishing your assessment, the next step is to migrate your infrastructure to Azure. These migration tools enable the secure and efficient transfer of servers, databases, and web applications to the cloud.

## Server Migration

Server migration involves the transfer of both physical servers and virtual machines—from environments such as VMware, Hyper-V, or other on-premises setups—to Azure. This process builds upon the migration project initiated during the assessment phase.

When you log into the Azure portal and complete the assessment, click on **Discover** to specify the location of your virtual machines. For instance, if you are using VMware, you will encounter two replication options:

1.  **Agentless Replication**  
    This technique does not require any installation of agents. Instead, it relies on the SDKs provided by VMware or Hyper-V. Azure interacts directly with the hypervisor to gather the necessary information and execute replication.
2.  **Agent-based Replication**  
    With this approach, you deploy an appliance (similar to the one used during assessment) and install a mobility agent on each server you intend to migrate. The agent collects the data and sends it to the appliance, which then forwards it to Azure. This method is supported in environments including VMware, Hyper-V, AWS, and GCP.

> [!important]
> **Note**
>
> Migration replicates your on-premises data to the cloud and attaches a compute instance to run the workload. An analogy is removing a hard disk from a malfunctioning laptop, connecting it to another computer, and booting from it. Similarly, a replica of your disk is created in the cloud, enabling you to continue operations.

![The image is an infographic from KodeKloud about migration tools for Azure, detailing server migration, database migration, and data box options.](https://kodekloud.com/kk-media/image/upload/v1752867045/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Migration-tools/azure-migration-tools-infographic.jpg)

## Database Migration

Database migration primarily focuses on transferring your on-premises Microsoft SQL Server databases to various Azure services, such as Azure SQL Database, SQL Managed Instance, or SQL Server on a virtual machine. A typical demonstration involves setting up a SQL Server on a VM and migrating it to an Azure SQL Database. Although the process is more straightforward for database migration, it requires a secure connection between your on-premises server and Azure.

## Data Box

Microsoft’s Data Box solution is designed for the offline migration of large datasets. With Data Box, Microsoft sends you physical disks that you fill with your data and then return. While the Data Box service is not available in every region, it supports data transfers starting at 40 terabytes and scales according to your needs. For offline data migration, alternatives like the Import-Export Service are available, but Data Box remains a preferred choice for its efficiency.

![The image outlines three migration tools for Azure: Server Migration, Database Migration, and Data Box, each with a brief description of their functions.](https://kodekloud.com/kk-media/image/upload/v1752867047/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Migration-tools/azure-migration-tools-overview.jpg)

That concludes our overview of the key migration tools available for moving your workloads to Azure. In the next lesson, we will explore database migration in greater detail.

Thank you.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/fd250ecb-c21c-4044-ad18-71a6368cc4a6/lesson/a1f3418e-7e92-4e7e-8c99-0daabb4a0f97)**
>
> Watch video content
