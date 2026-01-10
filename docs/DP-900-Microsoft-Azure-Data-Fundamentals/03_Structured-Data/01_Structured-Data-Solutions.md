# Structured Data Solutions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DP-900-Microsoft-Azure-Data-Fundamentals/Structured-Data/Structured-Data-Solutions)

---

## Table of Contents

- Structured Data Solutions
  - 1. Lift-and-Shift Migration to IaaS
  - 2. Serverless PaaS for Relational Databases
  - 3. Open Source & Third-Party Options
  - Further Reading and Resources
  - Watch Video
    - 2.1 Azure SQL Database Family
      - 2.1.1 Azure SQL Database
      - 2.1.2 Azure SQL Managed Instance
      - 2.1.3 Elastic Pools
      - 2.1.4 Azure SQL Edge

---

## Content

DP-900: Microsoft Azure Data Fundamentals

Structured Data

# Structured Data Solutions

Welcome to **Module 2** of the Azure Data Fundamentals course. In this lesson, we dive into structured data and relational databases, exploring Azure’s offerings for every migration and modernization scenario. We’ll highlight common challenges and demonstrate how Azure simplifies database management, improves scalability, and reduces operational overhead.

## 1\. Lift-and-Shift Migration to IaaS

If you have an on-premises DBMS, a quick way to migrate is to **lift and shift** your database to an Azure Virtual Machine (VM). You install and run your choice of DBMS—such as Microsoft SQL Server, Oracle, MariaDB, or MySQL—just as you did on-prem.

Key responsibilities remain on you:

- Operating system upgrades and security patches
- Database server updates and compatibility testing
- Full VM and DBMS administration

![The image illustrates a "Lift and Shift Migration" to Infrastructure as a Service (IaaS), showing database management systems like MariaDB, MySQL, and Oracle, and their migration to an Azure virtual machine with Microsoft SQL Server.](https://kodekloud.com/kk-media/image/upload/v1752873098/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Structured-Data-Solutions/lift-and-shift-migration-iaas-azure.jpg)

Regardless of platform, you continue to manage:

- Access control (who can read or write data)
- Data ingestion pipelines into your DBMS

## 2\. Serverless PaaS for Relational Databases

To minimize infrastructure management, opt for a **serverless, fully managed** database service in Azure. With PaaS:

- Azure automates OS and DBMS patching/upgrades
- You don’t provision or manage VMs
- You focus on schema design, access policies, and data ingestion

> [!important]
> **Note**
>
> Serverless databases automatically scale compute and storage based on demand, helping you optimize costs and performance.

![The image illustrates a comparison between traditional Database Management Systems (DBMS) like MariaDB, MySQL, and Oracle, and a serverless PaaS solution using Microsoft SQL Server, highlighting features like automation and Azure management.](https://kodekloud.com/kk-media/image/upload/v1752873099/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Structured-Data-Solutions/dbms-vs-serverless-paas-comparison.jpg)

### 2.1 Azure SQL Database Family

The Azure SQL family delivers multiple serverless and PaaS options compatible with on-premises SQL Server workloads. Keep in mind:

> [!important]
> **Warning**
>
> Features such as Service Broker and Database Mail aren’t supported in Azure SQL Database and some Managed Instances. If these are critical, consider SQL Server on a VM.

![The image is an infographic about Microsoft SQL Server as a serverless DBMS, highlighting its compatibility with on-premises SQL Server and its ability to support multiple databases, but noting the lack of support for Service Broker or Database Mail.](https://kodekloud.com/kk-media/image/upload/v1752873100/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Structured-Data-Solutions/microsoft-sql-server-serverless-infographic.jpg)

Below is a quick overview of Azure SQL offerings:

| SKU                        | Use Case                                | Key Benefits                                 |
| -------------------------- | --------------------------------------- | -------------------------------------------- |
| Azure SQL Database         | Single database, web/app backends       | Rapid provisioning, built-in geo-replication |
| Azure SQL Managed Instance | Lift & modernize existing SQL workloads | Near 100% compatibility, custom maintenance  |
| Elastic Pools              | Multiple DBs with varying demands       | Shared resources, cost-effective scaling     |
| Azure SQL Edge             | IoT and edge computing                  | Real-time analytics, time-series processing  |

#### 2.1.1 Azure SQL Database

A fully managed single-database service ideal for OLTP workloads that need fast setup and built-in high availability.

#### 2.1.2 Azure SQL Managed Instance

Provides almost full SQL Server compatibility, enabling easy database porting and control over patching schedules.

#### 2.1.3 Elastic Pools

Share compute and storage among multiple databases with complementary usage patterns—perfect when one database peaks by day and another by night.

![The image is an infographic about Microsoft's serverless DBMS, focusing on Azure SQL Managed Instance and its features like near 100% compatibility with SQL Server and elastic pools for shared resources. It highlights benefits such as more control over maintenance and options for upgrading and patching.](https://kodekloud.com/kk-media/image/upload/v1752873101/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Structured-Data-Solutions/azure-sql-managed-instance-infographic.jpg)

#### 2.1.4 Azure SQL Edge

Optimized for IoT scenarios and edge computing, it ingests continuous telemetry streams and supports real-time analytics with sliding time windows.

![The image is an infographic about Microsoft's serverless DBMS, specifically Azure SQL Edge, highlighting its features for IoT environments, including real-time data streaming and time series support.](https://kodekloud.com/kk-media/image/upload/v1752873102/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Structured-Data-Solutions/azure-sql-edge-infographic-iot-features.jpg)

## 3\. Open Source & Third-Party Options

Azure also offers fully managed services for popular open-source relational databases:

- **Azure Database for PostgreSQL**
- **Azure Database for MySQL**
- **Azure Database for MariaDB**

If you need additional engines, browse the Azure Marketplace for third-party, serverless offerings—such as IBM Db2—or deploy any database on an Azure VM for full control.

![The image is a slide titled "Serverless: Third Party," featuring IBM Db2 as a third-party database available in the Azure Marketplace. It includes a brief description of the database's capabilities.](https://kodekloud.com/kk-media/image/upload/v1752873103/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Structured-Data-Solutions/serverless-third-party-ibm-db2-azure.jpg)

## Further Reading and Resources

- [Azure SQL Database documentation](https://docs.microsoft.com/azure/azure-sql/)
- [Migrate on-premises SQL Server to Azure SQL](https://docs.microsoft.com/azure/azure-sql/migration-guides/)
- [Azure Database for PostgreSQL overview](https://docs.microsoft.com/azure/postgresql/)
- [Azure Marketplace third-party databases](https://azuremarketplace.microsoft.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/dp-900-microsoft-azure-data-fundamentals/module/ab06c95a-37f6-40d4-9dd8-b5a6961866b5/lesson/4e4669ca-08de-4810-965c-8412a91befe3)**
>
> Watch video content
