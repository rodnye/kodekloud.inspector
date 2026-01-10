# Design for Azure Monitor - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-logging-and-monitoring-solution/Design-for-Azure-Monitor)

---

## Table of Contents

- Design for Azure Monitor
  - Data Collection from Multiple Sources
  - Configuring Monitoring on Virtual Machines
  - Diagnostic Settings for SQL Databases
  - Monitoring Data Collection Methods
  - Next Steps
  - Watch Video

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a logging and monitoring solution

# Design for Azure Monitor

Azure Monitor is a centralized monitoring solution that enables you to manage and analyze data from both Azure and non-Azure environments. By consolidating logs and metrics from various sources—including applications, guest operating systems, Azure resources, subscriptions, tenants, and custom resources—Azure Monitor offers robust insights for visualization, analysis, alerting, and further integrations.

## Data Collection from Multiple Sources

Identifying and prioritizing the right data sources is essential for efficient monitoring. Azure Monitor supports data collection across several tiers:

- **Application Level:**  
  Use Application Insights to collect application performance data.
- **Guest Operating System:**  
  Utilize diagnostic extensions, the Log Analytics agent, or the Dependency agent to gather metrics, logs, and perform dependency analysis.
- **Azure Resources, Subscription, and Tenant:**
  - For Azure resources, configure diagnostic settings to collect logs and metrics.
  - The subscription-level Activity Log is available by default and records all operations on Azure Resource Manager without extra configuration.
  - At the tenant level, integrate with Azure Active Directory (Azure AD) to collect audit and sign-in logs.

> [!important]
> **Note**
>
> Selecting the appropriate data collection method—whether agent-based or out-of-the-box—depends on your monitoring needs. Ensure you only collect the data you require, as unnecessary data can lead to higher billing costs.

The collected data can be stored in internal services such as Log Analytics, Azure Storage, or Event Hub, or forwarded to external systems like Grafana and Splunk. The key is to understand the data required and prioritize its collection.

![The image is an infographic from KodeKloud about data sources for collecting logs and metrics, detailing different tiers and tools like Application Insights and Azure Active Directory. It explains data collection methods and emphasizes prioritizing data for monitoring to manage billing.](https://kodekloud.com/kk-media/image/upload/v1752866982/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Monitor/data-sources-logs-metrics-infographic.jpg)

## Configuring Monitoring on Virtual Machines

Configuring monitoring for a Virtual Machine (VM) in Azure is straightforward. By accessing a VM's Insights section in the Azure portal (which requires an installed agent), you can enable monitoring. Once activated, the VM’s data is sent to a configured Log Analytics workspace, where you can review monitoring configurations and performance metrics.

![The image shows a Microsoft Azure portal interface with a focus on configuring monitoring settings for a virtual machine named "sde-vm-01." The configuration options include enabling insights using the Azure Monitor agent and selecting a subscription and data collection rule.](https://kodekloud.com/kk-media/image/upload/v1752866983/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Monitor/azure-portal-monitoring-sde-vm-01.jpg)

Additionally, out-of-the-box metrics for the VM are available without requiring additional configuration.

![The image shows the Microsoft Azure portal displaying metrics for a virtual machine named "sde-vm-01." It includes options for selecting different metrics and aggregations to monitor the virtual machine's performance.](https://kodekloud.com/kk-media/image/upload/v1752866987/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Monitor/azure-portal-sde-vm-01-metrics.jpg)

## Diagnostic Settings for SQL Databases

For resources such as SQL databases, diagnostic settings provide enhanced logging capabilities. By accessing these settings, you can add new diagnostics and choose from various log categories and destinations. For example, if you only need security audit logs, enable just that category. Keep in mind that adding more log categories increases the ingested data volume, which can affect billing.

![The image shows a Microsoft Azure portal page for configuring diagnostic settings for a SQL database, with options to select log categories and destination details for log analytics.](https://kodekloud.com/kk-media/image/upload/v1752866988/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Monitor/azure-portal-sql-database-diagnostics.jpg)

In some scenarios, the Azure portal may display a page with no diagnostic settings defined, prompting you to configure the necessary logs and metrics based on your monitoring strategy.

![The image shows a Microsoft Azure portal interface displaying the diagnostic settings for a SQL database. It includes options for configuring logs and metrics, with no diagnostic settings currently defined.](https://kodekloud.com/kk-media/image/upload/v1752866990/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Monitor/azure-portal-sql-database-settings.jpg)

## Monitoring Data Collection Methods

Below is a summary table outlining the various data collection methods available within Azure Monitor:

| Data Source Type               | Data Collection Method                                       | Example/Tool                       |
| ------------------------------ | ------------------------------------------------------------ | ---------------------------------- |
| Application Level              | Application Insights                                         | Application performance monitoring |
| Guest Operating System         | Diagnostic extensions, Log Analytics agent, Dependency agent | Metrics and dependency analysis    |
| Azure Resources                | Diagnostic settings                                          | Log collection for Azure resources |
| Subscription and Tenant Levels | Activity Log, Azure AD integration                           | Audit and sign-in logs             |

## Next Steps

For every Azure resource, there are multiple ways to gather monitoring data—whether by configuring diagnostic settings, installing agents, or leveraging built-in metrics. Plan your monitoring strategy carefully to focus on the data that matters most to your operations.

Next, we will explore Log Analytics in greater detail to further enhance your monitoring capabilities.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/2c624b73-c0ae-4e37-862b-7e9cacbc645b/lesson/34231bc4-2171-4581-bdb5-4bfc5f0d9b84)**
>
> Watch video content
