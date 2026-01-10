# Design for Azure SQL Database - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-relational-data-storage-solution/Design-for-Azure-SQL-Database)

---

## Table of Contents

- Design for Azure SQL Database
  - Azure SQL Offerings Overview
  - Detailed Comparison of Azure SQL Offerings
  - Choosing the Right Solution
  - Deploying an Azure SQL Database
  - Querying the SQL Database
  - Overview of SQL Managed Instance Deployment
  - Conclusion
  - Watch Video
    - SQL Database
    - Managed Instance (MI)
    - SQL Virtual Machine

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a relational data storage solution

# Design for Azure SQL Database

In this guide, we explore the various SQL offerings available on Azure and discuss when to choose Azure SQL Database. Understanding the deployment options is essential to select the solution that best meets your requirements.

## Azure SQL Offerings Overview

Azure provides three main SQL offerings:

1.  **SQL Virtual Machine (VM):**  
    SQL Server runs on a virtual machine (VM) as an Infrastructure-as-a-Service (IaaS) solution, offering full control over the operating system, SQL Server version, and configurations. With SQL on VMs, you manage tasks such as OS updating and patching. Essentially, it is like running SQL Server on a Windows virtual machine with the server pre-installed.
2.  **Managed Instances (MI):**  
    Managed Instances are a Platform-as-a-Service (PaaS) solution available in two deployment models:
    - **Single Instance:** A fully managed service running the latest SQL Server version. This option provides automatic updates, patching, and the ability to deploy within a virtual network for a private IP address.
    - **Instance Pool:** A collection of pre-provisioned compute resources shared among multiple instances. This model allows resource sharing across databases for cost optimization and improved performance management, especially when resource demands vary.

3.  **SQL Database:**  
    SQL Database is also a fully managed PaaS solution available in two configurations:
    - **Single Database:** Choose between provisioned compute or serverless execution. With provisioned compute, you pre-allocate resources (e.g., 4 vCores and associated memory), while the serverless mode dynamically adjusts based on query demand.
    - **Elastic Pool:** Multiple databases share compute and storage resources within predefined limits, optimizing costs and ensuring performance based on the current workload.

![The image is a guide on when to use different Azure SQL Database offerings, including SQL Virtual Machine, Managed Instances, and Databases, with brief descriptions of each option.](https://kodekloud.com/kk-media/image/upload/v1752867152/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-SQL-Database/azure-sql-database-guide-options.jpg)

If you require a private IP address for your SQL database, consider using Private Link. Additionally, SQL Database supports storage up to 100 terabytes on the hyperscale tier. The native elastic pool in SQL Database functions similarly to instance pools by sharing resources among databases to optimize both cost and performance. However, plan your resource limits carefully to avoid performance throttling.

## Detailed Comparison of Azure SQL Offerings

### SQL Database

Azure SQL Database offers deployment as either a single database or an elastic pool where multiple databases share pre-allocated resources. Key features include:

- **High Availability and Performance:**  
  Achieve a 99.99% SLA, with a Recovery Point Objective (RPO) of 5 seconds and a Recovery Time Objective (RTO) of 30 seconds.
- **Cost Efficiency:**  
  It is approximately 86% more cost-effective than AWS RDS.
- **Licensing Benefits:**  
  Leverage the Azure Hybrid Benefit to reuse your on-premises SQL Server licenses for additional savings.

### Managed Instance (MI)

SQL Managed Instances provide a fully managed solution while still offering instance-scoped features such as:

- SQL Server Agent
- Service Broker
- Common Language Runtime (CLR)
- Database Mail
- Linked Services
- Machine Learning Services

Additional benefits include native virtual network integration and near-zero downtime migrations—ideal for lift-and-shift scenarios from on-premises environments. Managed Instances also support failover groups for business continuity and integrate with on-premises identities using Azure AD Connect.

![The image is an infographic about Azure SQL Managed Instance, highlighting its features: Optimization, Instance Scoped Features, PaaS, and Differentiators. It explains benefits like resource sharing, instance features, platform management, and migration capabilities.](https://kodekloud.com/kk-media/image/upload/v1752867153/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-SQL-Database/azure-sql-managed-instance-infographic.jpg)

### SQL Virtual Machine

SQL on VMs is an IaaS approach that gives you complete control over the OS and SQL Server instance. This option is ideal if you need to:

- Support both Windows and Linux environments (including SQL containers)
- Use components such as SSAS, SSRS, and SSIS, which are not available with other offerings
- Leverage capabilities like FILESTREAM, DTC, and the simple recovery model

Additional differentiators include extended support for SQL Server 2008 R2, automated backup and patching via the update management tool, point-in-time restore using Azure Backup, and accelerated storage performance with Azure Blob Caching.

![The image is an infographic about Azure SQL Virtual Machine, highlighting its components: IaaS, Analysis, Reporting, and Integration, Features, and Differentiators. It provides details on control, support, and unique features like automated backups and Azure Blob Caching.](https://kodekloud.com/kk-media/image/upload/v1752867154/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-SQL-Database/azure-sql-vm-infographic.jpg)

## Choosing the Right Solution

- **SQL on VM:**  
  Choose when full control over the operating system and SQL Server is required, especially in lift-and-shift migration scenarios.
- **SQL Database:**  
  Ideal for modern applications that benefit from a fully managed service with both provisioned and serverless compute options.
- **SQL Managed Instance:**  
  Select if you need instance-scoped features (such as SQL Server Agent and CLR support) coupled with native virtual network integration.

![The image is a decision flowchart for choosing SQL offerings, showing three options with corresponding needs: migrating to a cloud database with full control, using a managed database for modern applications, and lifting-and-shifting to the cloud with instance-scoped features.](https://kodekloud.com/kk-media/image/upload/v1752867155/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-SQL-Database/sql-offerings-decision-flowchart.jpg)

## Deploying an Azure SQL Database

Follow these steps to deploy an Azure SQL Database via the Azure portal:

1.  **Access the Azure Portal:**  
    Search for "SQL" to view options such as SQL Databases, SQL Virtual Machines, and SQL Managed Instances.

    ![The image shows the Microsoft Azure portal with a search for "SQL," displaying various SQL-related services, marketplace options, and documentation. The user interface includes options like SQL databases, SQL servers, and SQL managed instances.](https://kodekloud.com/kk-media/image/upload/v1752867156/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-SQL-Database/azure-portal-sql-services-overview.jpg)

2.  **Create a SQL Database:**
    - Select **SQL Databases** and click on **Create a SQL database**.
    - Choose your subscription and create a new resource group if required.
    - Provide a database name (e.g., "SQL Sample 305") and select a server. If no server exists, create a new one. Remember, the server name must be unique, and you must select a location (e.g., East US).

    ![The image shows a Microsoft Azure portal page for creating a SQL database, with fields for project and database details such as subscription, resource group, database name, and server selection.](https://kodekloud.com/kk-media/image/upload/v1752867157/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-SQL-Database/azure-sql-database-creation-page.jpg)

3.  **Configure Authentication:**  
    Choose your preferred authentication method. In this example, select SQL authentication.

    ![The image shows a Microsoft Azure portal page for creating an SQL Database Server, with fields for server details and authentication settings.](https://kodekloud.com/kk-media/image/upload/v1752867158/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-SQL-Database/azure-portal-sql-database-server.jpg)

4.  **Select Database Tier and Compute Options:**  
    For development, you might select the **Basic** tier, which offers 2 GB of storage at a low monthly cost. For production environments, consider tiers like General Purpose or Hyperscale.
    - Click **Configure database** to review compute and storage options.
    - If you encounter delays, simply refresh the page.

    ![The image shows a Microsoft Azure portal interface for creating a SQL database, with fields for project and database details. The user is in the "Basics" tab, entering information like subscription, resource group, and database name.](/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-SQL-Database/azure-sql-database-creation.jpg)

    ![The image shows a Microsoft Azure portal page for creating a SQL database, with options to configure database details such as name, server, and workload environment.](https://kodekloud.com/kk-media/image/upload/v1752867159/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-SQL-Database/azure-portal-sql-database-creation-2.jpg)

5.  **Storage and Backup Options:**  
    For development, choose **Locally Redundant Storage (LRS)**. In production, consider options like ZRS or GRS for geo-redundant storage.

    ![The image shows a configuration page for creating an SQL database on Microsoft Azure, where users can select service and compute tiers, and view cost estimates.](https://kodekloud.com/kk-media/image/upload/v1752867160/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-SQL-Database/azure-sql-database-configuration.jpg)

6.  **Networking and Connectivity:**  
    For initial deployment, leave the connectivity settings at the default (e.g., "No access"). Later, if external access is needed, update the firewall settings to allow your IP address.

    ![The image shows a Microsoft Azure portal page for creating an SQL database, with options for configuring database details such as name, server, and workload environment.](https://kodekloud.com/kk-media/image/upload/v1752867161/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-SQL-Database/azure-sql-database-configuration-2.jpg)

    ![The image shows a Microsoft Azure portal page for creating an SQL database, focusing on the "Networking" settings. It includes options for network connectivity, connection policy, and a cost summary on the right.](https://kodekloud.com/kk-media/image/upload/v1752867162/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-SQL-Database/azure-sql-database-networking-settings.jpg)

7.  **Security and Data Source Selection:**  
    For this sample deployment, disable additional security options such as Defender, Ledger, Identity, or Transparent Data Encryption (TDE). Optionally, select a sample database (such as Adventure Works LT) as your data source.

    ![The image shows a Microsoft Azure interface for creating an SQL database, with options for data source and collation settings, and a cost summary on the right.](https://kodekloud.com/kk-media/image/upload/v1752867163/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-SQL-Database/azure-sql-database-interface.jpg)

8.  **Create the Database:**  
    Click **Create** and wait for the validation and deployment processes to complete.

    ![The image shows a Microsoft Azure portal page indicating that a SQL database deployment is complete, with options to view deployment details and next steps.](https://kodekloud.com/kk-media/image/upload/v1752867164/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-SQL-Database/azure-portal-sql-deployment-complete.jpg)

After deployment, you can review the database details—including the server name and connection strings—to easily integrate with your preferred SQL tools or SDK.

## Querying the SQL Database

After deployment, use the Query Editor in the Azure portal to run queries:

1.  Launch the Query Editor from the database resource page.
2.  If you encounter a connection error due to your IP address not being allowed (default is "No access"), update the SQL Server firewall settings by adding your current IP address and saving the changes.
3.  Return to the Query Editor and log in with your credentials.

Once connected, you can explore tables, views, and stored procedures. For example, to query customer data, execute the following SQL command:

```
SELECT * FROM [SalesLT].[Customer];
```

The Query Editor functions similarly to standard SQL clients, allowing you to customize and execute queries as needed.

![The image shows the Microsoft Azure SQL Database Query Editor interface, displaying a list of tables and views on the left and a query input area on the right.](https://kodekloud.com/kk-media/image/upload/v1752867165/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-SQL-Database/azure-sql-database-query-editor.jpg)

## Overview of SQL Managed Instance Deployment

Deploying SQL Managed Instance (MI) resembles creating an SQL Database, but with added benefits like native virtual network integration. Key points include:

- MI is deployed within a virtual network for enhanced security.
- When setting up an MI, you will define unique names, select from various service tiers (e.g., General Purpose, Business Critical), and configure authentication similar to SQL Database.
- Note that MI typically incurs higher costs due to its advanced features and native VNet integration.

![The image shows a Microsoft Azure portal interface for creating an Azure SQL Managed Instance, with fields for instance name, region, and authentication settings. There are error messages indicating password requirements are not met.](https://kodekloud.com/kk-media/image/upload/v1752867166/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-SQL-Database/azure-sql-managed-instance-portal.jpg)

Configure networking, security, and geo-replication settings based on your needs. Although the MI deployment process is similar to that of SQL Database, the pricing reflects its advanced feature set.

![The image shows a Microsoft Azure portal page for creating an Azure SQL Managed Instance, focusing on the "Security" settings, including options for enabling Microsoft Defender for SQL and identity management.](https://kodekloud.com/kk-media/image/upload/v1752867167/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-SQL-Database/azure-sql-managed-instance-security-settings.jpg)

![The image shows a Microsoft Azure portal page for creating an Azure SQL Managed Instance, with options for setting collation, time zone, geo-replication, and maintenance window.](https://kodekloud.com/kk-media/image/upload/v1752867168/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-SQL-Database/azure-sql-managed-instance-portal-2.jpg)

> [!important]
> **Note**
>
> For development purposes, consider using SQL Database unless the instance-scoped features or native VNet integration of Managed Instance are required.

## Conclusion

In summary, the choice between SQL Virtual Machines, SQL Database, and SQL Managed Instance depends on your organization's control requirements, scalability needs, and budget. Use SQL on VM when full OS control is necessary, SQL Database for modern fully-managed database services, and SQL Managed Instance if you require instance-scoped features along with enhanced network integration.

This guide has provided an overview of the available options and a detailed walkthrough of deploying each solution in the Azure portal. With these insights, you can confidently select and deploy the Azure SQL solution that best fits your workload and cost requirements.

For more information, check out the [Azure SQL documentation](https://docs.microsoft.com/azure/azure-sql).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/9697e3cc-0c47-4c28-aac7-fd0fcc89cdb2/lesson/574ca249-ca27-4f2f-adef-5bec4f5814f4)**
>
> Watch video content
