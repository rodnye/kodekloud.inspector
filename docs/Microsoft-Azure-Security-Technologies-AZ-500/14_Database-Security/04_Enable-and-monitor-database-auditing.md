# Enable and monitor database auditing - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Database-Security/Enable-and-monitor-database-auditing)

---

## Table of Contents

- Enable and monitor database auditing
  - Why Audit Your Database?
  - Exploring the Portal Interface
  - Enabling Auditing in Azure SQL
  - Running Queries
  - Accessing Audit Logs
  - Conclusion
  - Watch Video
    - Security and Compliance
    - Threat Protection
    - Audit Log Analysis
    - Retention Policy
    - Analyzing SELECT Statements

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Database Security

# Enable and monitor database auditing

Database auditing is essential for safeguarding your data and ensuring compliance. In this guide, we explain how to enable and monitor database auditing in Azure SQL, allowing you to track events in detail and quickly identify potential security threats.

> [!important]
> **Overview**
>
> Database auditing in Azure SQL not only enhances overall security and compliance but also provides actionable insights that shape your business strategy.

## Why Audit Your Database?

### Security and Compliance

Auditing helps maintain comprehensive logs of database events and modifications, ensuring compliance with regulatory standards and reinforcing data security. In today's data-driven environment, strict audit logs are crucial for meeting various industry requirements.

### Threat Protection

Azure SQL Auditing is engineered to detect unusual activities and potential security threats promptly. Real-time monitoring provides valuable insights that enable quick responses in the event of any anomaly, ensuring ongoing protection of your data.

### Audit Log Analysis

By integrating with Log Analytics, you can efficiently analyze your audit logs. You have the option to send audit data to Azure Blob Storage, Event Hub, or a Log Analytics workspace—an ideal setup for drawing valuable insights and even predicting future risks.

### Retention Policy

The retention policy allows you to specify how long your audit logs are maintained, preserving historical data without utilizing excessive storage resources.

## Exploring the Portal Interface

When accessing the Azure portal, if blob auditing is enabled at the server level, it automatically applies to all linked databases. Azure SQL provides separate configurations for server-level and database-level auditing, as well as options for selecting the destination for audit data (storage account, Log Analytics, or Event Hubs).

For example, see the image below that illustrates how to configure Azure SQL auditing settings:

![The image shows the Azure portal interface for configuring SQL database auditing settings, with options for enabling Azure SQL Auditing and selecting audit log destinations.](https://kodekloud.com/kk-media/image/upload/v1752881777/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-and-monitor-database-auditing/azure-portal-sql-auditing-settings.jpg)

## Enabling Auditing in Azure SQL

To enable auditing in Azure SQL, follow these steps:

1.  Navigate to your database in the Azure portal.
2.  Under the "Security" section, select "Auditing." You can enable auditing at either the server level or the database level.
    - > [!important]
      > **Tip**
      >
      > For a single database, setting the auditing configuration at either the server or database level should suffice.
3.  Choose your preferred destination for audit data: Log Analytics, Event Hub, or a storage account. For demonstration purposes, select Log Analytics, choose the appropriate subscription and workspace, and then save your settings.

Once the configuration is saved, your auditing settings become active immediately.

## Running Queries

After enabling auditing, you can execute SQL queries against your database to verify activity and review data. Here are some examples:

To view all entries in the Customer table, use:

```
SELECT * FROM [SalesLT].[Customer];
```

Likewise, query the Product table using:

```
SELECT * FROM [SalesLT].[Product];
```

To test the auditing configuration, try issuing a DELETE command for a specific product:

```
DELETE FROM [SalesLT].[Product] WHERE ProductNumber = 'FR-R92R-52';
```

Upon successful execution, you should see a message like:

```
Query succeeded: Affected_rows: 1
```

## Accessing Audit Logs

Audit logs can be viewed directly in the Azure portal through the audit tab. However, due to slight delays in log updates, it is recommended to use the Log Analytics workspace for in-depth analysis. This workspace not only displays audit logs but also allows you to run custom queries.

For example, to fetch all SQL security audit events, use:

```
AzureDiagnostics
| where Category == 'SQLSecurityAudit'
```

Alternatively, to list all SQL security audit events using a different category, run:

```
AzureDiagnostics
| where Category == 'SQLSecurityAuditEvents'
```

### Analyzing SELECT Statements

To analyze SELECT statements executed by different users and view the execution count, run this query:

```
AzureDiagnostics
| where Category == 'SQLSecurityAuditEvents'
| where statement_s contains 'SELECT'
| summarize count() by statement_s, server_principal_name_s
```

This query outputs each SELECT statement along with the associated username and execution count. You can further refine these queries or build custom ones in Log Analytics for more advanced insights.

## Conclusion

Azure SQL auditing is a powerful tool to ensure your database is secure, compliant, and continuously monitored. This guide covered how to configure auditing within the Azure portal, execute SQL queries, and analyze audit logs using Log Analytics. Next, we will explore data discovery and classification to further protect your data assets.

For more information on Azure SQL and securing your database, refer to the [Azure SQL Documentation](https://docs.microsoft.com/en-us/azure/azure-sql/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/d199f126-f1df-43a8-bd3d-68cd689d509d/lesson/55cf9378-e717-4960-b73b-320fc733c7af)**
>
> Watch video content
