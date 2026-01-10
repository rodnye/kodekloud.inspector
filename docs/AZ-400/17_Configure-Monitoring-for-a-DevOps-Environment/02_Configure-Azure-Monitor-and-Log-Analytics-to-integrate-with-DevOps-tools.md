# Configure Azure Monitor and Log Analytics to integrate with DevOps tools - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Configure-Monitoring-for-a-DevOps-Environment/Configure-Azure-Monitor-and-Log-Analytics-to-integrate-with-DevOps-tools)

---

## Table of Contents

- Configure Azure Monitor and Log Analytics to integrate with DevOps tools
  - What Is Continuous Monitoring?
  - Benefits of Continuous Monitoring
  - Overview of Azure Monitor
  - Integrations with Other Azure Services
  - Introduction to Azure Log Analytics
  - Integrating Azure Monitor with DevOps Tools
  - Configuring Alerts in Azure Monitor
  - Setting Up a Log Analytics Workspace
  - Querying Logs with Kusto Query Language (KQL)
  - Next Steps
  - Links and References
  - Watch Video
    - Creating an Alert Rule
    - Managing and Responding to Alerts

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Configure Monitoring for a DevOps Environment

# Configure Azure Monitor and Log Analytics to integrate with DevOps tools

Integrating Azure Monitor and Log Analytics into your DevOps workflows provides continuous visibility into application performance, reliability, and availability. In this guide, you’ll learn how to set up monitoring, create alerts, collect logs at scale, and embed telemetry into CI/CD pipelines.

---

## What Is Continuous Monitoring?

Continuous monitoring collects, analyzes, and acts on telemetry data—metrics, logs, and traces—in real time. It helps DevOps teams detect anomalies, prevent outages, and maintain optimal user experience.

![The image illustrates the concept of continuous monitoring, featuring people interacting with digital devices and a large infinity symbol, highlighting key benefits such as issue detection, downtime prevention, and maintaining user experience.](https://kodekloud.com/kk-media/image/upload/v1752867462/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Configure-Azure-Monitor-and-Log-Analytics-to-integrate-with-DevOps-tools/continuous-monitoring-infinity-symbol-interaction.jpg)

Key benefits:

- Early detection of issues before they impact users
- Prevention of downtime through proactive alerts
- Consistent performance for a high-quality user experience

---

## Benefits of Continuous Monitoring

| Benefit                                | Description                                              |
| -------------------------------------- | -------------------------------------------------------- |
| Early Issue Detection                  | Identify failures or performance degradation immediately |
| Performance Optimization               | Use telemetry to fine-tune resources and code paths      |
| Reliability & Availability Enhancement | Maintain SLAs and reduce unplanned downtime              |

![The image lists three key benefits: early detection of issues, improved performance, and increased reliability, each represented with an icon and a colored background.](https://kodekloud.com/kk-media/image/upload/v1752867463/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Configure-Azure-Monitor-and-Log-Analytics-to-integrate-with-DevOps-tools/key-benefits-early-detection-performance-reliability.jpg)

Continuous monitoring supports every stage of CI/CD by providing actionable alerts, dashboards, and automated responses.

---

## Overview of Azure Monitor

Azure Monitor is the centralized service for collecting, analyzing, and acting on telemetry across cloud and on-premises environments. It ensures your applications and services operate at peak performance.

**Key features**

- **Data collection**: Metrics and logs from applications, OS, Azure resources.
- **Analysis tools**: Metrics Explorer, Log Analytics workspace, workbooks.
- **Alerts & automation**: Configurable rules, action groups, and automated runbooks.

![The image illustrates three key features: Data Collection, Analysis Tools, and Alerts and Automation, each represented with icons and numbered sequentially.](https://kodekloud.com/kk-media/image/upload/v1752867464/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Configure-Azure-Monitor-and-Log-Analytics-to-integrate-with-DevOps-tools/data-collection-analysis-alerts-automation.jpg)

---

## Integrations with Other Azure Services

Azure Monitor can route telemetry into services for processing, retention, or automation:

| Service               | Integration Scenario                     | Benefits                                    |
| --------------------- | ---------------------------------------- | ------------------------------------------- |
| Azure Event Hubs      | Stream telemetry to analytics platforms  | Decouple ingestion and processing pipelines |
| Azure Storage         | Archive logs for compliance              | Long-term retention and audit readiness     |
| Azure Logic Apps      | Automate workflows on alerts             | Trigger notifications, ticketing, and more  |
| Azure Functions       | Execute custom preprocessing or actions  | Extend telemetry handling using code        |
| Azure DevOps & GitHub | Annotate pipelines and create work items | Embed monitoring into your CI/CD workflows  |

---

## Introduction to Azure Log Analytics

Azure Log Analytics is the centralized log-management component of Azure Monitor. It uses Kusto Query Language (KQL) to analyze massive volumes of data and generate dashboards or alerts.

![The image is an introduction to Azure Log Analytics, highlighting its capabilities to collect and analyze log data, use a robust query language for insights, and handle large data volumes efficiently.](https://kodekloud.com/kk-media/image/upload/v1752867465/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Configure-Azure-Monitor-and-Log-Analytics-to-integrate-with-DevOps-tools/azure-log-analytics-introduction-insights.jpg)

**Core capabilities**

- **Data ingestion**: Logs from Azure, on-prem servers, and multi-cloud.
- **Query & analysis**: KQL for real-time filtering, summarization, and charting.
- **Visualization**: Interactive dashboards, workbooks, and charts for insights.

---

## Integrating Azure Monitor with DevOps Tools

Embed monitoring data directly into your CI/CD pipelines:

- **Azure DevOps**:
  - Auto-create work items on alert
  - Annotate releases with performance metrics
- **GitHub**:
  - Link alerts to pull requests or issues
  - Fail or mark checks based on telemetry thresholds

![The image illustrates the integration of Azure Monitor with DevOps tools, featuring logos for Azure DevOps and GitHub.](https://kodekloud.com/kk-media/image/upload/v1752867466/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Configure-Azure-Monitor-and-Log-Analytics-to-integrate-with-DevOps-tools/azure-monitor-devops-github-integration.jpg)

---

## Configuring Alerts in Azure Monitor

Azure Monitor supports three alert types to keep you informed:

![The image lists three types of alerts: Metric Alerts, Log Alerts, and Activity Log Alerts. Each type is numbered and color-coded.](https://kodekloud.com/kk-media/image/upload/v1752867467/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Configure-Azure-Monitor-and-Log-Analytics-to-integrate-with-DevOps-tools/alert-types-metric-log-activity.jpg)

1.  **Metric alerts**: Trigger when numeric metrics cross thresholds (e.g., CPU > 80%).
2.  **Log alerts**: Fire based on KQL query results matching conditions.
3.  **Activity log alerts**: Detect Azure resource changes (creation, deletion, updates).

### Creating an Alert Rule

1.  In the Azure portal, go to **Azure Monitor** > **Alerts** > **New Alert Rule**.
2.  Select the **Target Resource** (VM, database, etc.).  
    ![The image shows a user interface for selecting a resource to create alert rules, with options for different resource types and locations. It lists several resources, including a Visual Studio Enterprise Subscription and various resource groups.](https://kodekloud.com/kk-media/image/upload/v1752867468/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Configure-Azure-Monitor-and-Log-Analytics-to-integrate-with-DevOps-tools/alert-rules-resource-selection-ui.jpg)
3.  Define the **Condition** (metric threshold or custom log query).
4.  Choose an **Action Group** (email, webhook, Logic App, Function).
5.  Set **Severity** and **Alert Details**, then **Create**.  
    ![The image shows a screenshot of the Microsoft Azure Monitor interface, highlighting the process of creating alert rules with options for alerts, metrics, and logs.](https://kodekloud.com/kk-media/image/upload/v1752867469/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Configure-Azure-Monitor-and-Log-Analytics-to-integrate-with-DevOps-tools/azure-monitor-alert-rules-screenshot.jpg)

### Managing and Responding to Alerts

- Review **Active Alerts** in the Azure portal.
- Automate remediation via **Logic Apps** or **Azure Automation**.
- Analyze **Alert History** to identify recurring issues.

> [!important]
> **Note**
>
> Leveraging automated runbooks or Logic Apps for common alerts can drastically reduce mean time to resolution (MTTR).

---

## Setting Up a Log Analytics Workspace

1.  In the Azure portal, search for **Log Analytics Workspaces** and click **Create**.
2.  Enter workspace **Name**, **Subscription**, **Resource Group**, and **Region**.  
    ![The image shows a screenshot of a marketplace interface for setting up a Log Analytics Workspace, highlighting the search bar and "Create" button.](https://kodekloud.com/kk-media/image/upload/v1752867469/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Configure-Azure-Monitor-and-Log-Analytics-to-integrate-with-DevOps-tools/log-analytics-workspace-marketplace-screenshot.jpg)
3.  For data collection, opt for **Agent-Based Collection** and install the Log Analytics agent on your VMs and servers.  
    ![The image shows a configuration screen for Azure Log Analytics, focusing on agent-based collection with options to download Windows agents. It includes navigation options and workspace details.](https://kodekloud.com/kk-media/image/upload/v1752867471/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Configure-Azure-Monitor-and-Log-Analytics-to-integrate-with-DevOps-tools/azure-log-analytics-agent-configuration.jpg)
4.  Optionally enable the **Azure Diagnostics Extension** to collect platform logs and metrics directly from Azure services.

> [!important]
> **Warning**
>
> Installing multiple agents on the same VM can increase resource consumption—monitor agent CPU and memory usage.

---

## Querying Logs with Kusto Query Language (KQL)

KQL is a powerful, read-only language for querying large log datasets. Use it to filter, summarize, and visualize data:

```
// Top 10 failed requests and their counts
AppRequests
| where Success == false
| summarize FailedCount = sum(ItemCount) by Name
| top 10 by FailedCount desc
| render barchart
```

Pin queries to dashboards or export results for deeper analysis.

---

## Next Steps

You now know how to:

- Configure and collect telemetry with Azure Monitor
- Set up a Log Analytics workspace and agents
- Integrate monitoring into Azure DevOps and GitHub pipelines
- Create and manage alerts for proactive DevOps actions
- Query and visualize logs using KQL

For advanced scenarios—including custom dashboards, autoscaling triggers, and cross-tenant monitoring—refer to the following resources.

## Links and References

- [Azure Monitor Documentation](https://docs.microsoft.com/azure/azure-monitor/)
- [Azure Log Analytics Overview](https://docs.microsoft.com/azure/azure-monitor/logs/log-analytics-overview)
- [Kusto Query Language (KQL) Guide](https://docs.microsoft.com/azure/data-explorer/kusto/query/)
- [Azure DevOps Integrations](https://docs.microsoft.com/azure/devops/)
- [GitHub Actions for Azure](https://github.com/Azure/actions)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/7e7ab3a7-8b66-40ef-9f77-1988e32b786d/lesson/7f731f74-7444-45fa-826b-798c86b103de)**
>
> Watch video content
