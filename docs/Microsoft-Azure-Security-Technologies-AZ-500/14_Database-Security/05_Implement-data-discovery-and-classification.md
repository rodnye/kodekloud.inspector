# Implement data discovery and classification - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Database-Security/Implement-data-discovery-and-classification)

---

## Table of Contents

- Implement data discovery and classification
  - Overview
  - Demonstration in the Azure Portal
  - Auditing Sensitive Data Access
  - Monitoring with Log Analytics
  - Conclusion
  - Watch Video

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Database Security

# Implement data discovery and classification

In today's data-driven environment, protecting sensitive information is paramount. This guide explains how to implement data discovery and classification using Azure SQL. With Azure’s built-in features, you can automatically identify, label, and secure sensitive data stored in your databases.

## Overview

Azure SQL automatically scans your database to identify columns that may store sensitive data. For example, when it detects that a column in the "address" table contains postal codes, Azure SQL may suggest that it holds contact information and automatically recommend a "confidential" label.

Data classification goes a step further by categorizing data based on its sensitivity. You can assign various sensitivity labels (such as "highly confidential," "confidential," or "general") to your data. This process allows you to implement data protection policies tailored to your organizational needs, comply with regulatory requirements like GDPR, and have comprehensive reporting and monitoring of access to sensitive information.

## Demonstration in the Azure Portal

In this section, we walk through how to implement data discovery and classification using the Azure portal.

1.  Open your SQL database (previously created) and navigate to the "Data Discovery and Classification" option under the "Security" menu.
2.  Initially, no classifications are displayed. Click the blue bar at the bottom indicating "15 columns with classification recommendations." Azure SQL will automatically detect and suggest classification labels based on the stored data.
3.  The screenshot below illustrates data discovery recommendations in the Azure portal. For instance, in the "Sales LT" table, the "first name" column is recommended as a confidential contact detail:

    ![The image shows a Microsoft Azure portal screen displaying data discovery and classification recommendations for a SQL database, listing columns with their information types and sensitivity labels.](https://kodekloud.com/kk-media/image/upload/v1752881779/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Implement-data-discovery-and-classification/azure-portal-data-classification-sql.jpg)

4.  To accept the recommendations, select them and click "Accept Selected Recommendations." The classifications will then be saved and can be modified later if necessary.
5.  If a particular column is not automatically classified, you can manually add a classification. For instance, you might choose the "modified date" column, assign a schema, designate its information type (such as networking data), and mark its sensitivity as "highly confidential."
6.  To modify a recommendation—for example, if you believe that username credentials should be marked as highly confidential instead of confidential—click the pencil icon next to the recommendation, update the sensitivity, and click "Save." The updated classification will be reflected in the overview.

## Auditing Sensitive Data Access

Once data classification is complete, Azure SQL auditing logs any queries that access sensitive data. Whenever a user queries sensitive information, additional fields—indicating the data's sensitivity—are recorded in the audit logs. This ensures administrators can monitor which users are accessing confidential data.

For example, you can use the Query Editor to run a SQL statement that retrieves postal codes from the "SalesLT.Address" table:

```
select PostalCode from [SalesLT].[Address]
```

Every query execution, along with authentication events, is captured in the audit logs.

## Monitoring with Log Analytics

To review audit logs, navigate to Log Analytics workspaces in the Azure portal and open the Logs interface. Use the following Kusto query to display the top four events related to SQL security audit events:

```
AzureDiagnostics
| where Category == 'SQLSecurityAuditEvents'
| top 4 by TimeGenerated
```

Expanding any log entry provides detailed information on the accessed sensitive data—including label IDs and sensitivity attributes—assisting administrators in understanding which sensitive information was queried.

> [!important]
> **Note**
>
> Integrating data discovery with auditing and log analytics not only boosts your security posture but also simplifies compliance and reporting.

## Conclusion

Azure SQL's data discovery and classification streamline the identification of sensitive data and enhance data security by integrating with data protection policies and SQL auditing. This comprehensive approach supports compliance requirements, improves risk management, and provides transparency into your sensitive data landscape.

Next, we will move on to discussing vulnerability assessment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/d199f126-f1df-43a8-bd3d-68cd689d509d/lesson/affcf143-dbdc-40df-8816-1e741dea3583)**
>
> Watch video content
