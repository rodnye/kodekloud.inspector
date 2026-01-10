# Design for Log Analytics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-logging-and-monitoring-solution/Design-for-Log-Analytics)

---

## Table of Contents

- Design for Log Analytics
  - What is Log Analytics?
  - Data Collection
  - Querying and Consolidation
  - Data Residency
  - Pricing and Data Retention
  - Data Capping
  - Access Control and Data Mapping
  - Onboarding Resources to Log Analytics
  - Configuring Log Analytics Workspaces in the Azure Portal
  - Next Steps
  - Watch Video
    - Designing Workspace Access Control
    - Detailed Access Control Models

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a logging and monitoring solution

# Design for Log Analytics

This article outlines the design and best practices for Log Analytics, a key component of Azure Monitor. It details topics such as data collection, querying, pricing models, data retention, and access control for Log Analytics workspaces.

## What is Log Analytics?

Log Analytics is a fully managed service within Azure Monitor that empowers you to collect, analyze, and visualize data from Azure resources, on‑premises systems, and non‑Azure environments. By onboarding your resources to a Log Analytics workspace, data from diagnostic settings and configurations is centralized and stored in tables, which can then be queried using the powerful Kusto Query Language (KQL).

## Data Collection

Data from a wide range of resources—whether hosted on Azure, on‑premises, or in other environments—can be ingested into a Log Analytics workspace. Any diagnostic settings configured in Azure Monitor send their collected data to the designated workspace. For instance, performance logs from hundreds of virtual machines could be stored in a table named `perf`, while syslogs from Linux systems would be held in a `syslog` table.

## Querying and Consolidation

Kusto Query Language (KQL) is the tool used to query and analyze this collected data, facilitating the creation of detailed reports and visualizations. Consider the following example, which queries the `perf` table to extract performance data related to SQL-related resources:

```
perf
| where Computer contains "SQL" and ObjectName == "LogicalDisk"
| where CounterName == "% Free Space" and InstanceName == "C:"
| extend TimeInEST = TimeGenerated - 5h
| project TimeInEST, CounterName, CounterValue
```

> [!important]
> **Note**
>
> Learning KQL is highly recommended as it equips you with a powerful tool for troubleshooting, diagnostics, and generating rich workbooks.

## Data Residency

To meet specific data residency requirements, you can create multiple Log Analytics workspaces in different Azure regions. This functionality is particularly useful for organizations that must comply with regulatory mandates or prefer localized data storage.

## Pricing and Data Retention

When designing a Log Analytics solution, it's essential to consider both the pricing model and data retention policies:

- **Pricing:**  
  Choose between per-gigabyte pricing—where you pay based on data ingestion volume—or capacity pricing, which involves pre-purchasing a fixed daily data ingestion capacity (e.g., 100 GB per day). For high-volume environments, capacity pricing may offer significant cost advantages.
- **Data Retention:**  
  By default, data is retained for 30 days at no additional charge. Extended retention beyond 30 days incurs additional costs.

## Data Capping

If you need to restrict the volume of ingested data, data capping rules can be applied. For instance, if you want to limit data ingestion to 1 GB per day, you can configure your data mapping rules to enforce this cap.

## Access Control and Data Mapping

Log Analytics workspaces structure data into various tables for different log types such as Windows event logs, Linux syslogs, performance counters, custom logs, and alerts. You can query these tables with KQL. For example:

```
Syslog
| union Event
| where SeverityLevel == "Error"
```

### Designing Workspace Access Control

Access control for a Log Analytics workspace can be managed using one of the following models:

1.  **Centralized:**  
    All data from various resources is collected into a single workspace. This central repository is managed by a dedicated team with access to all data, ensuring streamlined administration.
2.  **Decentralized:**  
    Individual teams manage their own workspaces within their respective resource groups, gathering data solely from resources under their control. Although billing is based on overall ingestion volume and retention requirements, each team is responsible for managing their own data.
3.  **Hybrid:**  
    For organizations with stringent security and compliance requirements, a hybrid model is ideal. In this configuration, all resource logs are forwarded to a centralized workspace, while critical or sensitive workloads also have their logs ingested into separate, dedicated workspaces.

The following diagram illustrates these different access control designs:

![The image illustrates three designs for workspace access control: centralized, decentralized, and hybrid, each with a brief description and diagram.](https://kodekloud.com/kk-media/image/upload/v1752867010/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Log-Analytics/workspace-access-control-designs.jpg)

### Detailed Access Control Models

- **Centralized Model:**  
  With workspace-level access, you can run queries across all tables within the workspace. This model is ideal for central administration of data.
- **Decentralized Model:**  
  Query scopes are limited to specific resources for which you have read access. This approach suits application teams managing their own resources.

Permissions and scopes are defined at the workspace level for centralized models, whereas decentralized environments use permissions defined at the individual Azure resource level.

## Onboarding Resources to Log Analytics

Onboarding resources to a Log Analytics workspace is well-documented in our [AZ-104: Microsoft Azure Administrator](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator) course. For a practical demo environment that allows you to test Log Analytics and practice KQL, visit [aka.ms/LA-demo](https://aka.ms/LA-demo).

The diagram below, courtesy of KodeKloud, compares the centralized and decentralized models, detailing access, permissions, and scope:

![The image is a diagram from KodeKloud illustrating workspace access control, comparing centralized and decentralized models, including aspects like access, permissions, and scope.](https://kodekloud.com/kk-media/image/upload/v1752867011/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Log-Analytics/workspace-access-control-diagram.jpg)

This demo workspace is managed by Microsoft and ingests a significant volume of data from various demo workloads—providing numerous tables for you to explore and query even if you do not operate a production environment.

## Configuring Log Analytics Workspaces in the Azure Portal

Log Analytics workspaces can be easily managed and configured directly from the Azure portal. Upon opening your workspace, you'll notice an "access mode" setting that allows you to choose between resource-level permissions or workspace-level permissions.

The screenshot below shows the Azure portal interface for a Log Analytics workspace, displaying key details such as the workspace name, ID, status, location, and subscription information. The left-hand sidebar provides access to various settings and options:

![The image shows a Microsoft Azure portal interface displaying details of a Log Analytics workspace, including its name, ID, status, location, and subscription information. The sidebar on the left lists various settings and options related to the workspace.](https://kodekloud.com/kk-media/image/upload/v1752867012/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Log-Analytics/azure-portal-log-analytics-workspace.jpg)

Both resource-level and workspace-level permissions are available:

- Selecting "workspace permissions only" means that access to the workspace alone is sufficient for viewing data.
- Opting for "resource or workspace permissions" requires permission for both the specific resource and the workspace.

## Next Steps

With the fundamentals of Log Analytics design covered, the next step is to dive deeper into Azure Workbooks and Insights to extract more valuable insights and create advanced visualizations.

Happy querying!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/2c624b73-c0ae-4e37-862b-7e9cacbc645b/lesson/0a0c8f3e-e780-4e40-a050-1c8313598da8)**
>
> Watch video content
