# Configure and monitor metrics and logs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Azure-Monitor/Configure-and-monitor-metrics-and-logs)

---

## Table of Contents

- Configure and monitor metrics and logs
  - Overview of Metrics
  - Understanding Logs
  - Azure Activity Log
  - Navigating the Azure Portal
  - Conclusion
  - Watch Video
    - Viewing Metrics
    - Accessing the Activity Log

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Azure Monitor

# Configure and monitor metrics and logs

In this guide, you will learn how to configure and monitor metrics and logs in Azure effectively. Azure provides out-of-the-box metrics and tools to help you monitor the performance and health of your resources without extra configuration, while log collection may require additional setup.

---

## Overview of Metrics

Azure metrics represent time-series data that capture the state of your resources at any given moment. They provide near real-time visualizations to help you monitor critical performance indicators such as CPU usage, memory consumption, and network traffic. Once a resource is deployed, its metrics are immediately available through the resource's overview blade or the Metrics Explorer.

![The image is a diagram illustrating the configuration and monitoring of metrics and logs, featuring graphs of CPU and network usage, and highlighting features like zero configuration, time series, and real-time data. It also mentions logs being organized as records, requiring additional configuration, and having a rich query language.](https://kodekloud.com/kk-media/image/upload/v1752881686/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-and-monitor-metrics-and-logs/metrics-logs-configuration-diagram.jpg)

---

## Understanding Logs

In contrast to metrics, logs capture discrete events in the form of records. They require further configuration. For example, to collect logs from an application server, SQL database, or virtual machine, you might need to enable diagnostic settings or install the Azure Monitor agent. Some Azure resources, such as SQL databases, offer native log collection by simply enabling auditing.

Azure’s robust [Kusto Query Language (KQL)](https://docs.microsoft.com/en-us/azure/data-explorer/kusto/query/) enhances log analysis with support for complex queries, joins, aggregations, and detailed analytics. Below is an example query filtering SQL security audit events:

```
AzureDiagnostics | where Category == 'SQLSecurityAuditEvents'
```

> [!important]
> **Note**
>
> Azure logs provide deep insights into your resource events, allowing you to perform detailed analysis and troubleshooting.

---

## Azure Activity Log

The Azure Activity Log is a subscription-level tool that records critical events related to Azure Resource Manager operations and other subscription events. Key points about the Activity Log include:

- **Operation Tracking:** Captures create, update, and delete operations (e.g., PUT, POST requests); GET requests are not logged.
- **Audit Trail:** Provides information about who initiated the operation, when it occurred, and its outcomes.
- **Retention Policy:** Activity Logs are enabled by default with a 90-day retention period. After 90 days, logs are purged unless exported or forwarded to a storage account or Log Analytics workspace.

![The image is a diagram of the Azure Activity Log, detailing subscription-level logging, auditing, retention, and querying data, along with application and resource logs. It categorizes logs into application and resource types, highlighting diagnostic and activity logs for Azure infrastructure.](https://kodekloud.com/kk-media/image/upload/v1752881687/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-and-monitor-metrics-and-logs/azure-activity-log-diagram.jpg)

> [!important]
> **Warning**
>
> The Activity Log only captures Azure infrastructure-level events. It does not record events that occur within the guest operating system.

---

## Navigating the Azure Portal

When managing your virtual machine or other resources in the Azure portal, you can easily access both metrics and Activity Logs.

### Viewing Metrics

By navigating to the “Monitoring” section of a resource, you can view platform metrics such as CPU usage, memory consumption, and network throughput. Clicking on **See all metrics** opens the Metrics Explorer.

![The image shows a Microsoft Azure portal interface displaying performance metrics for a virtual machine named "win-sql-access," including VM availability and CPU usage graphs.](https://kodekloud.com/kk-media/image/upload/v1752881688/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-and-monitor-metrics-and-logs/azure-portal-vm-performance-metrics.jpg)

For instance, to compare CPU usage with memory consumption over time, you can plot these metrics simultaneously.

![The image shows a Microsoft Azure metrics dashboard for a virtual machine named "win-sql-access," displaying a line chart of average CPU percentage and available memory over time. The chart indicates a drop in CPU usage at one point, with current averages shown at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752881689/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-and-monitor-metrics-and-logs/azure-metrics-dashboard-win-sql-access.jpg)

### Accessing the Activity Log

To view the Activity Log, select the corresponding blade within the Azure portal. This log can be filtered based on time range, resource group, specific operations, user or service, and event severity. The following categories are available:

| Event Category      | Description                                                                |
| ------------------- | -------------------------------------------------------------------------- |
| **Administrative**  | Actions performed by administrators, service principals, or user accounts. |
| **Security**        | Alerts from Microsoft Defender for Cloud.                                  |
| **Service Health**  | Indicates the availability and operational status of Azure services.       |
| **Alerts**          | Logs triggered by monitoring alerts.                                       |
| **Recommendations** | Advice from Azure Advisor.                                                 |
| **Policy**          | Actions taken as a result of policy enforcement.                           |
| **Auto Scale**      | Activities related to automatic scaling.                                   |
| **Resource Health** | The health status of specific resources.                                   |

![The image shows the Microsoft Azure portal displaying the "Activity log" for a subscription, with filters for operations and a list of recent activities.](https://kodekloud.com/kk-media/image/upload/v1752881690/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-and-monitor-metrics-and-logs/azure-portal-activity-log-filters.jpg)

Filtering these events assists in pinpointing actions, such as a particular administrative task initiated by a specific user.

![The image shows the Microsoft Azure portal displaying the activity log for a subscription named "Kodekloud AZ-500 PoC3." It includes filters and a list of recent activities with details like status, time, and event initiator.](https://kodekloud.com/kk-media/image/upload/v1752881691/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-and-monitor-metrics-and-logs/azure-portal-activity-log-kodekloud.jpg)

If the default 90-day retention does not suit your needs, consider exporting the Activity Log as a CSV file or forwarding the logs to a storage account or Log Analytics workspace for extended retention and advanced querying.

![The image shows a Microsoft Azure portal page for configuring diagnostic settings, where various log categories and destination details are selected for a subscription.](https://kodekloud.com/kk-media/image/upload/v1752881692/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-and-monitor-metrics-and-logs/azure-portal-diagnostic-settings.jpg)

---

## Conclusion

This guide detailed how Azure metrics provide an immediate, out-of-the-box view of your resource performance while logs require additional configuration for detailed event tracking. Additionally, the Azure Activity Log offers a comprehensive audit trail of your subscription-level activities. For advanced log querying and analysis, consider using Log Analytics to gain deeper insights into your Azure environment.

Next, we will explore logging in greater detail using Log Analytics for advanced querying and analytics.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/7b98ab58-5aa5-4f2b-9cfa-fdfef40ddc37/lesson/dd19446b-8a9b-4915-bc25-dfee50e6f287)**
>
> Watch video content
