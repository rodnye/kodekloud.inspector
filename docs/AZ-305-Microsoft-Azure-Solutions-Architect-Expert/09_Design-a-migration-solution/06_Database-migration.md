# Database migration - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-migration-solution/Database-migration)

---

## Table of Contents

- Database migration
  - Types of Database Migration
  - On-Premises Database Setup
  - Installing and Using Data Migration Assistant (DMA)
  - Preparing Database Migration Using Azure DMS
  - Migrating the Database Using DMA
  - Conclusion
  - Watch Video

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a migration solution

# Database migration

Database migration allows you to seamlessly move your on-premises databases to Azure. Before beginning the migration process, it is crucial to assess your current database environment. You can perform this assessment using the Data Migration Assistant (DMA), which not only evaluates your environment but also helps in migrating the data. Alternatively, the Azure Database Migration Service (DMS) enables streamlined migration. This guide covers both the theoretical background and a hands-on demonstration of installing DMA on an on-premises database, assessing it, and finally migrating it to Azure using DMS.

## Types of Database Migration

There are two primary migration strategies:

1.  **Offline Migration:**  
    In this approach, you need to shut down the source server at the start of the migration, which results in downtime.
2.  **Online Migration:**  
    With this method, continuous data replication occurs from on-premises to Azure without shutting down the server, effectively eliminating downtime. The migration can be finalized with a cutover at any time.

![The image compares offline and online database migration types, highlighting that offline migration requires server shutdown and causes downtime, while online migration allows continuous data replication without downtime.](https://kodekloud.com/kk-media/image/upload/v1752867027/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Database-migration/offline-online-database-migration-comparison.jpg)

## On-Premises Database Setup

In this demonstration, our on-premises database includes two tables: one for departments and another for employees.

For the employee table, the following SQL query is used:

```
SELECT TOP (1000) [empno]
      ,[ename]
      ,[job]
      ,[mgr]
      ,[hiredate]
      ,[sal]
      ,[comm]
      ,[dept]
FROM [customers].[dbo].[emp]
```

Similarly, to query the department table, use:

```
SELECT TOP (100) [deptno]
      ,[dname]
      ,[loc]
FROM [customers].[dbo].[dept]
```

> [!important]
> **Note**
>
> Although this demonstration uses an Azure-based SQL server to simulate an on-premises environment, the migration process remains identical to that of a true on-premises setup.

## Installing and Using Data Migration Assistant (DMA)

In this section, we install DMA on a Windows server running SQL Server:

1.  Open the Edge browser and search for "Data Migration Assistant."
2.  Download and run the installer.
3.  Once installed, launch DMA and create a new project with these settings:
    - **Project Name:** on-prem to Azure
    - **Assessment Type:** Database Engine
    - **Source Server Type:** SQL Server
    - **Target Server:** Azure SQL Database

![The image shows the Data Migration Assistant software interface, with options for creating a new project to assess or migrate data from SQL Server to Azure SQL Database.](https://kodekloud.com/kk-media/image/upload/v1752867028/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Database-migration/data-migration-assistant-sql-azure.jpg)

Before creating the project, note that DMA provides two options: one for assessment and the other for migration. In this demonstration, select the "Assessment" option to evaluate database compatibility and feature parity.

Enter the required server name and credentials to connect to your on-premises database. DMA will scan the databases and identify the "customers" database, similar to what is visible in SQL Server Management Studio.

![The image shows a screenshot of the Data Migration Assistant tool with a "Connect to a server" window open, displaying fields for server name, authentication type, and SQL authentication credentials. In the background, a Microsoft Surface devices webpage is partially visible.](https://kodekloud.com/kk-media/image/upload/v1752867029/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Database-migration/data-migration-assistant-screenshot.jpg)

Click "Connect" (ensure you check the "Trust server certificate" box, if applicable) and select the "customers" database. Then, start the assessment.

![The image shows a screenshot of the Data Migration Assistant tool with a focus on adding sources for migration, alongside a Microsoft Surface devices webpage.](https://kodekloud.com/kk-media/image/upload/v1752867031/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Database-migration/data-migration-assistant-screenshot-2.jpg)

During the assessment, DMA might flag unsupported items such as trace flags for Azure SQL Database. Refer to the provided recommendations; however, if these issues are minor and the compatibility check passes, you can proceed with the migration.

## Preparing Database Migration Using Azure DMS

After completing the assessment and addressing any compatibility issues, you can initiate the migration process. There are two options:

1.  Start the migration directly from DMA.
2.  Use the Azure portal with the Database Migration Service (DMS).

To use the Azure portal:

- Create a DMS instance.
- Specify the source server as SQL Server and the target server as Azure SQL Database.
- Choose the appropriate service tier. For example, opting for the premium tier for online migration is available free for six months.

![The image shows a screenshot of the Microsoft Data Migration Assistant tool, with a project setup window open for creating a new migration project from SQL Server to Azure SQL Database. The background displays a Microsoft Surface devices webpage.](https://kodekloud.com/kk-media/image/upload/v1752867032/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Database-migration/microsoft-data-migration-assistant-screenshot.jpg)

![The image shows a Microsoft Azure portal interface with a search for "database migration" and details of a virtual machine named "onpremises-db" running Windows Server 2022 Datacenter.](https://kodekloud.com/kk-media/image/upload/v1752867033/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Database-migration/azure-portal-database-migration-vm.jpg)

After configuring settings such as location (e.g., East US) and selecting the appropriate virtual network, review your settings and create the migration service.

![The image shows a Microsoft Azure configuration page for selecting a database migration service tier, with options for "Standard" and "Premium" plans, and a cost summary for 4 vCores.](https://kodekloud.com/kk-media/image/upload/v1752867035/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Database-migration/azure-database-migration-service-tier.jpg)

![The image shows a Microsoft Azure portal page for creating a migration service, with fields for project and instance details such as subscription, resource group, migration service name, location, and pricing tier.](https://kodekloud.com/kk-media/image/upload/v1752867036/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Database-migration/azure-migration-service-portal.jpg)

Once the migration service instance is deployed, create a migration project within DMS by providing:

- Project Name
- Source Type: SQL Server
- Target Type: Azure SQL Database
- Selection for migrating data

![The image shows a Microsoft Azure portal page for creating a migration service, specifically focusing on the networking section where users can select or create a virtual network.](https://kodekloud.com/kk-media/image/upload/v1752867037/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Database-migration/azure-portal-migration-service-networking.jpg)

While following the migration wizard, input the necessary details for your on-premises server (even if it is hosted on Azure for demonstration purposes). Use SQL Server authentication by supplying the correct username and password. DMS will then attempt to connect to your on-premises database and retrieve the list of available databases.

> [!important]
> **Warning**
>
> If the DMS connection fails due to server version issues (e.g., if your instance runs SQL Server 2020 Developer Edition), you might encounter an error message indicating an unsupported server version. In such cases, fall back on using DMA to perform the migration.

![The image shows a Microsoft Azure SQL Server to Azure SQL Database Migration Wizard interface with an error message indicating a connection failure due to an unsupported server version. The error details suggest checking the list of supported server versions and editions.](https://kodekloud.com/kk-media/image/upload/v1752867038/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Database-migration/azure-sql-migration-error-message.jpg)

## Migrating the Database Using DMA

If you encounter connection issues with DMS, switch back to DMA to create a migration project by following these steps:

1.  Select "SQL Server Database" as the source.
2.  Choose to migrate both the schema and data.
3.  Provide your on-premises source server details using SQL Server authentication.

After connecting, DMA displays the list of databases, including the "customers" database.

![The image shows a screenshot of the Data Migration Assistant tool, with a project setup for migrating from SQL Server to Azure SQL Database. The interface indicates no compatibility issues with the database.](https://kodekloud.com/kk-media/image/upload/v1752867039/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Database-migration/data-migration-assistant-screenshot-3.jpg)

Next, enter your target server details (the Azure SQL Database). Ensure that you use the correct authentication credentials and verify connectivity.

![The image shows a Microsoft Azure portal interface displaying details of a SQL database named "customers." It includes options for configuring access, connecting to applications, and starting development.](https://kodekloud.com/kk-media/image/upload/v1752867041/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Database-migration/azure-portal-sql-database-customers.jpg)

After setting up the connection, select the objects (tables) you wish to migrate. In this demonstration, both the "department" and "employee" tables are selected.

![The image shows a screenshot of the Data Migration Assistant tool, specifically the "Select objects" step for migrating a database from on-premises to Azure. It includes options to select tables for migration and displays no assessment issues.](https://kodekloud.com/kk-media/image/upload/v1752867043/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Database-migration/data-migration-assistant-select-objects.jpg)

Once you generate the deployment script, it may appear as follows:

```
/****** DMA Schema Migration Deployment Script ******/
-- Script Date: 1/11/2023 8:22:57 AM
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[emp]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[emp] (
        [empid] INT NOT NULL,
        [name] [varchar](20) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
        [job] [varchar](9) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
        [hire] [datetime] NULL,
        [sal] [numeric](7,2) NULL,
        [cnum] [numeric](2) NULL,
        [dept] [int] NULL,
        CONSTRAINT [PK__emp__AF43E3A298D68] PRIMARY KEY CLUSTERED
        (
            [empid] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, ALLOW_DUP_KEY = OFF, ALLOW_PAGE_LOCKS = ON)
    )
END
GO
```

After deploying the schema, proceed to run the data migration process. Once the migration completes successfully, verify the tables in your Azure SQL Database using the query editor.

![The image shows a screenshot of the Data Migration Assistant tool in use, displaying the progress of migrating data from on-premises to Azure. It includes details about server objects, tables, and migration status.](https://kodekloud.com/kk-media/image/upload/v1752867044/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Database-migration/data-migration-assistant-screenshot-4.jpg)

To do a final verification, run the following queries against the migrated tables:

For the employee table:

```
SELECT * FROM [dbo].[emp]
```

For the department table:

```
SELECT TOP (100) [deptno]
    , [dname]
    , [loc]
FROM [customers].[dbo].[dept]
```

The query results should match the data from your original on-premises database.

## Conclusion

In this guide, we demonstrated the process of assessing and migrating an on-premises SQL database to Azure. Both the Data Migration Assistant (DMA) and Azure Database Migration Service (DMS) were used to perform assessments, deploy the schema, and migrate the data. Although this demonstration uses an Azure-based SQL server to simulate an on-premises environment, the same steps apply when migrating from a true on-premises setup.

For further reading, consider the following resources:

- [Azure Database Migration Guide](https://docs.microsoft.com/en-us/azure/dms/)
- [Data Migration Assistant Overview](https://docs.microsoft.com/en-us/sql/dma/dma-overview)
- [Microsoft Azure Documentation](https://docs.microsoft.com/en-us/azure/)

Happy migrating!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/fd250ecb-c21c-4044-ad18-71a6368cc4a6/lesson/a404a429-8496-401f-abe5-96ecc0402623)**
>
> Watch video content
