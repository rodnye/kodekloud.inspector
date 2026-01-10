# Demo Creating Azure SQL - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DP-900-Microsoft-Azure-Data-Fundamentals/Structured-Data/Demo-Creating-Azure-SQL)

---

## Table of Contents

- Demo Creating Azure SQL
  - 1. Search for Azure SQL Database
  - 2. Choose a Deployment Model
  - 3. Configure Database Basics
  - 4. Optimize Compute Tier and Cost
  - 5. Configure Networking
  - 6. Enable Security Features
  - 7. Provision Sample Data
  - 8. Review and Deploy
  - 9. Verify Your Deployment
  - 10. Connect with Azure Data Studio
  - Links and References
  - Watch Video
    - 3.1 Set Up a New SQL Server

---

## Content

DP-900: Microsoft Azure Data Fundamentals

Structured Data

# Demo Creating Azure SQL

In this step-by-step guide, you’ll learn how to provision an Azure SQL Database through the Azure portal. We’ll walk through selecting your deployment model, configuring database and server settings, setting up networking and security, loading sample data, and connecting with Azure Data Studio. Let’s get started!

## 1\. Search for Azure SQL Database

1.  Sign in to the [Azure portal](https://portal.azure.com/).
2.  Use the global search bar to find **Azure SQL Database**.

![The image shows the Microsoft Azure portal interface with a search bar and a dropdown menu displaying various services and resources like Azure Active Directory and App Services. The sidebar lists recent resources and navigation options.](https://kodekloud.com/kk-media/image/upload/v1752873054/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Demo-Creating-Azure-SQL/azure-portal-interface-search-dropdown.jpg)

Click **Azure SQL Database** in the results to open the service overview.

## 2\. Choose a Deployment Model

On the Azure SQL Database overview page, click **Create** and then **Azure SQL Database**. You’ll see deployment options such as:

| Deployment Option | Description                                | Best For                                  |
| ----------------- | ------------------------------------------ | ----------------------------------------- |
| Single database   | A standalone database on its own server    | Isolated workloads or development tests   |
| Elastic pool      | Multiple databases sharing compute and I/O | Cost-efficient scaling for many databases |

![The image shows a Microsoft Azure portal interface for selecting SQL deployment options, including SQL databases, SQL managed instances, and SQL virtual machines. A dropdown menu is open under SQL databases, showing options like "Single database" and "Elastic pool."](https://kodekloud.com/kk-media/image/upload/v1752873055/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Demo-Creating-Azure-SQL/azure-portal-sql-deployment-options.jpg)

Select **Single database** and click **Create** to proceed.

## 3\. Configure Database Basics

On the **Basics** tab, fill in:

- **Subscription**: Your Azure subscription.
- **Resource group**: Create new or select existing.
- **Database name**: Must be unique (e.g., `PHVAZ`).
- **Server**: Choose an existing server or create a new one.

![The image shows the Microsoft Azure portal interface for creating a SQL database, displaying options for subscription, resource group, and a cost summary on the right.](https://kodekloud.com/kk-media/image/upload/v1752873057/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Demo-Creating-Azure-SQL/azure-portal-sql-database-creation.jpg)

### 3.1 Set Up a New SQL Server

If you need a new logical server:

1.  Click **Create new** under **Server**.
2.  Enter a **Server name** (all lowercase).
3.  Pick a **Location** (region).
4.  Choose **Authentication** method (SQL or Azure AD).
5.  Set the **Server admin login** and **Password**—store these securely!

> [!important]
> **Note**
>
> Server names must be lowercase and globally unique as they form part of your connection endpoint (e.g., `phvnewserver.database.windows.net`).

![The image shows a Microsoft Azure portal interface for creating a SQL Database Server, with fields for server name, location, and authentication method.](https://kodekloud.com/kk-media/image/upload/v1752873058/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Demo-Creating-Azure-SQL/azure-portal-sql-database-server.jpg)

If you already have a server (for example, `phv2`), simply select it from the dropdown.

![The image shows a Microsoft Azure portal screen for creating a SQL database, displaying project and database details, along with a cost summary on the right.](https://kodekloud.com/kk-media/image/upload/v1752873059/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Demo-Creating-Azure-SQL/azure-portal-sql-database-creation-2.jpg)

## 4\. Optimize Compute Tier and Cost

By default, Azure suggests a production-grade compute tier. For development or labs, switch to **Dev/Test** to save costs (e.g., ~$6.50 CAD/month). You can also pause the database when it’s not in use.

| Tier       | Estimated Cost     | Ideal For               |
| ---------- | ------------------ | ----------------------- |
| Production | Higher performance | Business-critical needs |
| Dev/Test   | Budget-friendly    | Development and testing |

![The image shows a Microsoft Azure portal page for creating an SQL database, displaying estimated costs and terms of service. It includes details like storage and compute costs, and a "Create" button.](https://kodekloud.com/kk-media/image/upload/v1752873060/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Demo-Creating-Azure-SQL/azure-portal-sql-database-costs.jpg)

## 5\. Configure Networking

Switch to the **Networking** tab and click **Add current client IP address**. This creates a firewall rule to allow your machine to connect.

![The image shows a Microsoft Azure portal page for creating an SQL database, focusing on networking settings and firewall rules, with a cost summary on the right.](https://kodekloud.com/kk-media/image/upload/v1752873062/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Demo-Creating-Azure-SQL/azure-portal-sql-database-networking.jpg)

> [!important]
> **Warning**
>
> Opening the firewall to all Azure services or 0.0.0.0/0 can expose your database. Limit rules to specific IP ranges whenever possible.

You can refine firewall rules later in the **Firewalls and virtual networks** settings.

## 6\. Enable Security Features

Under **Security**, consider enabling:

- **Microsoft Defender for SQL**: Threat detection and alerts.
- **Ledger**: Immutable, cryptographically verifiable transaction logs.

![The image shows a Microsoft Azure portal page for creating an SQL database, highlighting security settings like Microsoft Defender for SQL and ledger configuration, along with a cost summary.](https://kodekloud.com/kk-media/image/upload/v1752873063/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Demo-Creating-Azure-SQL/azure-portal-sql-database-security-settings.jpg)

Defender can also be enabled at the server level for centralized monitoring.

## 7\. Provision Sample Data

In **Additional settings**, select **Sample** to load the AdventureWorksLT schema and data. This is perfect for demos and labs.

![The image shows a Microsoft Azure portal interface for creating a SQL database, with options for additional settings and a cost summary. A pop-up message indicates the selection of the "AdventureWorksLT" sample database.](https://kodekloud.com/kk-media/image/upload/v1752873064/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Demo-Creating-Azure-SQL/azure-portal-sql-database-creation-3.jpg)

## 8\. Review and Deploy

Click **Review + create**, verify your configuration, then hit **Create**. Deployment usually takes a few minutes.

## 9\. Verify Your Deployment

Once the deployment succeeds, go to **Azure SQL Databases** to see your new database (`PHVAZ`) on server `PHV2`.

![The image shows a Microsoft Azure SQL portal interface displaying two records: an SQL server and an SQL database, both located in the East US region under a Visual Studio Enterprise Subscription.](https://kodekloud.com/kk-media/image/upload/v1752873065/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Demo-Creating-Azure-SQL/azure-sql-portal-east-us-records.jpg)

Select **PHVAZ** to open its overview.

![The image shows a Microsoft Azure portal interface for managing an SQL database named "PhvAz." It displays various options and settings related to the database, such as resource group, status, location, and connection strings.](https://kodekloud.com/kk-media/image/upload/v1752873066/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Demo-Creating-Azure-SQL/azure-portal-sql-database-phvaz.jpg)

## 10\. Connect with Azure Data Studio

Azure provides several management tools:

- [Visual Studio](https://visualstudio.microsoft.com/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Azure Data Studio](https://docs.microsoft.com/sql/azure-data-studio/)

For this demo, launch **Azure Data Studio**.

![The image shows a Microsoft Azure SQL database portal interface, displaying options for configuring access, connecting to applications, and starting development with tools like Azure Data Studio and Visual Studio.](https://kodekloud.com/kk-media/image/upload/v1752873067/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Demo-Creating-Azure-SQL/azure-sql-database-portal-interface.jpg)

In Azure Data Studio:

1.  Click **New Connection**.
2.  Enter **Server**: `phv2.database.windows.net`.
3.  Choose **SQL Login** and enter your admin credentials.
4.  Click **Connect**.

![The image shows the Azure Data Studio interface with a connection dialog open, displaying fields for connecting to a Microsoft SQL Server using SQL Login authentication.](https://kodekloud.com/kk-media/image/upload/v1752873068/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Demo-Creating-Azure-SQL/azure-data-studio-connection-dialog-sql.jpg)

Once connected, expand the **Tables** folder under your database.

![The image shows a database management interface with a list of tables, including their names, schemas, and types. The interface appears to be part of a web-based SQL database management tool.](https://kodekloud.com/kk-media/image/upload/v1752873070/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Demo-Creating-Azure-SQL/database-management-interface-tables-list.jpg)

Right-click the **Address** table, choose **Select Top 1000**, and run:

```
SELECT TOP (1000)
    [AddressID],
    [AddressLine1],
    [AddressLine2],
    [City],
    [StateProvince],
    [CountryRegion],
    [PostalCode]
FROM [dbo].[Address];
```

You should see up to 1,000 sample rows from the AdventureWorksLT database.

---

Congratulations! You’ve successfully created an Azure SQL Database, configured networking and security, loaded sample data, and connected with Azure Data Studio. Next, consider building Power BI reports or integrating this database with your applications.

## Links and References

- [Azure SQL Database Documentation](https://docs.microsoft.com/azure/azure-sql/)
- [Azure Data Studio](https://docs.microsoft.com/sql/azure-data-studio/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Visual Studio](https://visualstudio.microsoft.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/dp-900-microsoft-azure-data-fundamentals/module/ab06c95a-37f6-40d4-9dd8-b5a6961866b5/lesson/75b5ae93-b00e-435e-944e-7465c9b7eb8d)**
>
> Watch video content
