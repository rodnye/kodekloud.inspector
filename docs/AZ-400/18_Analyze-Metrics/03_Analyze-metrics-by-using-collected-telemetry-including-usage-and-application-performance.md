# Analyze metrics by using collected telemetry including usage and application performance - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Analyze-Metrics/Analyze-metrics-by-using-collected-telemetry-including-usage-and-application-performance)

---

## Table of Contents

- Analyze metrics by using collected telemetry including usage and application performance
  - What Is Telemetry in Azure?
  - Why Telemetry Matters
  - Types of Telemetry Data
  - Key Azure Services for Telemetry
  - Setting Up Azure Monitor
  - Integrating Azure Application Insights
  - Working with Azure Log Analytics
  - Configuring Alerts and Notifications
  - Monitoring Application Performance
  - Analyzing Usage Metrics
  - Diagnostic Data and Troubleshooting
  - Creating Custom Dashboards
  - Best Practices for Azure Telemetry
  - References
  - Watch Video

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Analyze Metrics

# Analyze metrics by using collected telemetry including usage and application performance

In this guide, you’ll learn how to collect, monitor, and analyze telemetry data in Azure to gain actionable insights into application usage and performance. Whether you’re preparing for the AZ-400 certification or refining your Azure DevOps practices, understanding telemetry is key to proactive monitoring and optimization.

## What Is Telemetry in Azure?

Telemetry in Azure is the automated gathering and centralized reporting of your application and infrastructure data. By streaming usage counts, response times, error logs, and more into a unified platform, you can:

- Detect issues before they impact users
- Track performance trends over time
- Maintain visibility across distributed services

![The image is an introduction slide about telemetry in Azure, highlighting the definition, importance in cloud environments, and an overview of telemetry data types.](https://kodekloud.com/kk-media/image/upload/v1752867256/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Analyze-metrics-by-using-collected-telemetry-including-usage-and-application-performance/azure-telemetry-introduction-overview-slide.jpg)

Azure’s telemetry pipeline automatically captures data from application endpoints and infrastructure agents, pushing it to Azure Monitor for analysis.

![The image is an introduction to telemetry in Azure, depicting a person at a desk with servers and a cloud, illustrating the automatic collection and transmission of data for monitoring and analyzing application performance.](https://kodekloud.com/kk-media/image/upload/v1752867257/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Analyze-metrics-by-using-collected-telemetry-including-usage-and-application-performance/azure-telemetry-introduction-data-collection.jpg)

## Why Telemetry Matters

Implementing comprehensive telemetry in a cloud environment helps you:

- Maintain real-time visibility and avoid “flying blind”
- Proactively surface and resolve anomalies
- Optimize resource utilization and control costs

![The image is an introduction to telemetry in Azure, highlighting its importance in cloud environments for proactive monitoring, identifying issues, and ensuring optimal performance. It features graphics of a robotic arm, a laptop, a magnifying glass, and a smartphone with security icons.](https://kodekloud.com/kk-media/image/upload/v1752867258/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Analyze-metrics-by-using-collected-telemetry-including-usage-and-application-performance/azure-telemetry-introduction-monitoring-graphics.jpg)

## Types of Telemetry Data

Azure captures three primary telemetry categories:

| Telemetry Type      | Description                                        | Typical Use Case                      |
| ------------------- | -------------------------------------------------- | ------------------------------------- |
| Usage Metrics       | User sessions, feature adoption, page views        | Analyze user behavior and trends      |
| Performance Metrics | Response times, throughput, CPU/memory utilization | Detect performance bottlenecks        |
| Diagnostic Data     | Error logs, traces, exception details              | Troubleshoot failures and root causes |

![The image is an introduction to telemetry in Azure, showing an overview of telemetry data types: usage metrics (e.g., user activity), performance metrics (e.g., response times), and diagnostic data (e.g., error logs).](https://kodekloud.com/kk-media/image/upload/v1752867259/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Analyze-metrics-by-using-collected-telemetry-including-usage-and-application-performance/azure-telemetry-introduction-data-types.jpg)

## Key Azure Services for Telemetry

Azure provides three core services to collect and analyze telemetry:

| Service Name            | Focus Area                       | Primary Tooling                      |
| ----------------------- | -------------------------------- | ------------------------------------ |
| Azure Monitor           | Centralized metrics and logs     | Metrics Explorer, Alerts             |
| Application Insights    | Application performance          | SDKs, Live Metrics, End-to-End Trace |
| Log Analytics Workspace | Advanced log aggregation and KQL | Kusto Query Language                 |

![The image illustrates a flowchart showing "Key Azure Services for Telemetry," specifically focusing on "Azure Application Insights," with icons representing app service environments and data flow.](https://kodekloud.com/kk-media/image/upload/v1752867260/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Analyze-metrics-by-using-collected-telemetry-including-usage-and-application-performance/key-azure-services-telemetry-flowchart.jpg)

## Setting Up Azure Monitor

Follow these steps to onboard resources into Azure Monitor:

1.  **Enable Azure Monitor** in the Azure Portal under Monitor > Overview.
2.  **Add data sources** such as Virtual Machines, App Services, and Containers.
3.  **Install agents and extensions** on VMs or AKS clusters to stream logs and metrics.
4.  **Route data** to Log Analytics workspaces, Storage accounts, or Event Hubs.

> [!important]
> **Note**
>
> You need Owner or Contributor permissions on the target resource to deploy monitoring agents.

![The image is a flowchart illustrating the setup process for Azure Monitor, involving enabling it through the Azure Portal and configuring it for Virtual Machines, App Services, and Containers.](https://kodekloud.com/kk-media/image/upload/v1752867261/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Analyze-metrics-by-using-collected-telemetry-including-usage-and-application-performance/azure-monitor-setup-flowchart.jpg)

Data from agents can be ingested into Azure Data Lake Storage, Log Analytics, or custom endpoints for deeper analytics.

![The image illustrates the setup process for Azure Monitor, showing data flow from Azure Agent and Extensions to Azure Data Lake Storage, and then to Azure Deployment Environments.](https://kodekloud.com/kk-media/image/upload/v1752867261/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Analyze-metrics-by-using-collected-telemetry-including-usage-and-application-performance/azure-monitor-setup-data-flow-diagram.jpg)

Key features include custom dashboards, actionable alerts, and integration with DevOps pipelines.

![The image is a diagram titled "Setting Up Azure Monitor," showing key features like Custom Dashboard, Services, Alert, and Integration Service Environment.](https://kodekloud.com/kk-media/image/upload/v1752867263/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Analyze-metrics-by-using-collected-telemetry-including-usage-and-application-performance/setting-up-azure-monitor-diagram.jpg)

## Integrating Azure Application Insights

Add Application Insights to web apps and services via SDKs or the Azure Portal:

- Install the language-specific SDK (e.g., .NET, Java, Node.js).
- Configure instrumentation keys or connection strings.
- Enable auto-collection for HTTP requests, dependencies, and exceptions.

![The image is a slide about using Application Insights, explaining integration with applications using SDKs or the Azure portal. It features a lightbulb icon and a gradient background.](https://kodekloud.com/kk-media/image/upload/v1752867264/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Analyze-metrics-by-using-collected-telemetry-including-usage-and-application-performance/application-insights-sdk-integration-slide.jpg)

Application Insights captures rich metrics:

| Metric Type      | Description                             |
| ---------------- | --------------------------------------- |
| Request Rates    | Number of incoming HTTP requests        |
| Response Times   | Latency per request and percentiles     |
| Failure Rates    | HTTP 4xx/5xx, dependency errors         |
| Dependency Calls | Outbound service and database responses |
| User Analytics   | Session counts, page views, feature use |

![The image outlines key metrics for using application insights, including request rates, response times, failure rates, dependency tracking, and user analytics.](https://kodekloud.com/kk-media/image/upload/v1752867265/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Analyze-metrics-by-using-collected-telemetry-including-usage-and-application-performance/application-insights-key-metrics-outline.jpg)

By combining real-time and historical data, you can quickly identify anomalies and track long-term performance trends.

![The image illustrates the use of application insights, highlighting the analysis of real-time and historical data to identify trends and potential issues.](https://kodekloud.com/kk-media/image/upload/v1752867266/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Analyze-metrics-by-using-collected-telemetry-including-usage-and-application-performance/application-insights-data-analysis-trends.jpg)

## Working with Azure Log Analytics

A Log Analytics workspace centralizes log data from Azure services, on-premises systems, and custom apps. Use the [Kusto Query Language (KQL)](https://learn.microsoft.com/azure/data-explorer/kusto/query/) to filter, aggregate, and visualize logs.

![The image is an introduction to log analytics, showing a flow from Azure Services, On-Premises Data Gateways, and App Services to collecting log data and analyzing it.](https://kodekloud.com/kk-media/image/upload/v1752867267/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Analyze-metrics-by-using-collected-telemetry-including-usage-and-application-performance/log-analytics-introduction-azure-flow.jpg)

Key capabilities include log retention, cross-resource queries, and custom alerts.

![The image is an introduction to Log Analytics, highlighting the use of Kusto Query Language (KQL) for creating queries and analyzing data.](https://kodekloud.com/kk-media/image/upload/v1752867269/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Analyze-metrics-by-using-collected-telemetry-including-usage-and-application-performance/log-analytics-introduction-kql-queries.jpg)

> [!important]
> **Note**
>
> KQL supports time-series analysis, joins, and machine learning plugins for advanced insights.

## Configuring Alerts and Notifications

Set up alert rules to act on critical conditions:

| Alert Type          | Trigger Condition              | Action Examples                 |
| ------------------- | ------------------------------ | ------------------------------- |
| Metric Alerts       | CPU > 80% for 5 minutes        | Email, SMS, webhook             |
| Log Alerts          | Error count > 10 in 15 minutes | Logic Apps, Function invocation |
| Activity Log Alerts | Resource group updates         | ITSM ticket creation            |

- **Action Groups** define recipients and channels (email, SMS, Teams, webhooks).
- **Alert Suppression** prevents noisy notifications.
- Tune thresholds based on historical baselines for accuracy.

![The image illustrates a process flow for configuring alerts and notifications using Azure Monitor, showing alerts on critical conditions leading to notifications and automated actions.](https://kodekloud.com/kk-media/image/upload/v1752867270/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Analyze-metrics-by-using-collected-telemetry-including-usage-and-application-performance/azure-monitor-alerts-notifications-flow.jpg)

![The image illustrates three types of alerts: Metric Alerts (e.g., CPU usage), Log Alerts (e.g., specific error codes), and Activity Log Alerts (e.g., resource changes).](https://kodekloud.com/kk-media/image/upload/v1752867271/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Analyze-metrics-by-using-collected-telemetry-including-usage-and-application-performance/alert-types-metric-log-activity.jpg)

## Monitoring Application Performance

Track these KPIs to ensure your app meets SLAs:

- **Response Time**: Average and percentile latencies
- **Error Rate**: Failed requests per thousand
- **Resource Utilization**: CPU, memory, disk I/O
- **Throughput**: Requests per second

Use Application Insights charts and Workbooks to visualize trends and drill into anomalies.

![The image illustrates a process for monitoring application performance, showing how application insights track KPIs using a performance monitor to understand application performance.](https://kodekloud.com/kk-media/image/upload/v1752867273/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Analyze-metrics-by-using-collected-telemetry-including-usage-and-application-performance/application-performance-monitoring-kpis.jpg)

![The image illustrates a process for monitoring application performance, showing performance trend analysis identifying bottlenecks, which are then optimized to achieve better performance.](https://kodekloud.com/kk-media/image/upload/v1752867274/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Analyze-metrics-by-using-collected-telemetry-including-usage-and-application-performance/application-performance-monitoring-trend-analysis.jpg)

## Analyzing Usage Metrics

Usage telemetry helps you understand user engagement:

- **Sessions**: Active users over time
- **Page Views**: Feature popularity
- **Events**: Customized tracking for critical workflows

![The image is a diagram titled "Analyzing Usage Metrics," showing "Application Insights" tracking "User Sessions," "Page Views," and "Interactions."](https://kodekloud.com/kk-media/image/upload/v1752867276/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Analyze-metrics-by-using-collected-telemetry-including-usage-and-application-performance/analyzing-usage-metrics-diagram.jpg)

Leverage these insights to refine features and prioritize development effort.

## Diagnostic Data and Troubleshooting

Collect detailed traces, activity logs, and exception reports to perform root-cause analysis:

- **Correlation IDs** to tie together distributed requests
- **Trace logs** for step-by-step execution flows
- **Exception details** for stack traces and error codes

> [!important]
> **Warning**
>
> Insufficient logging can slow down troubleshooting. Ensure critical paths emit structured logs and correlation IDs.

![The image is a diagram titled "Diagnostic Data and Troubleshooting," showing components like "Activity Log," "Traces," and "Exception Reports" under "Diagnostic Data," with a "Troubleshoot" icon below.](https://kodekloud.com/kk-media/image/upload/v1752867277/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Analyze-metrics-by-using-collected-telemetry-including-usage-and-application-performance/diagnostic-data-troubleshooting-diagram.jpg)

## Creating Custom Dashboards

Build real-time, shareable dashboards in Azure Monitor:

1.  Add tiles for metrics, logs, and charts.
2.  Pin Workbooks visualizations from Application Insights.
3.  Share with teams or embed in SharePoint.

This centralized view fosters collaboration and rapid incident response.

![The image is an illustration about creating custom dashboards in Azure Monitor, highlighting features like data visualization options and team sharing for real-time monitoring.](https://kodekloud.com/kk-media/image/upload/v1752867278/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Analyze-metrics-by-using-collected-telemetry-including-usage-and-application-performance/azure-monitor-custom-dashboards-illustration.jpg)

## Best Practices for Azure Telemetry

1.  **Comprehensive Coverage**: Monitor all mission-critical services.
2.  **Alert Tuning**: Adjust thresholds based on load patterns.
3.  **Regular Reviews**: Update dashboards and rules as your architecture evolves.
4.  **Data Retention**: Balance retention periods with cost and compliance.
5.  **Actionable Insights**: Use telemetry to inform capacity planning and feature roadmaps.

![The image outlines three best practices for application monitoring: ensuring all critical parts are monitored, consistently updating alert rules, and leveraging telemetry insights for continuous improvement.](https://kodekloud.com/kk-media/image/upload/v1752867279/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Analyze-metrics-by-using-collected-telemetry-including-usage-and-application-performance/application-monitoring-best-practices.jpg)

By continually refining your telemetry strategy, you’ll ensure high availability, performance, and user satisfaction for your Azure applications.

---

## References

- [Azure Monitor Documentation](https://learn.microsoft.com/azure/azure-monitor/)
- [Application Insights Overview](https://learn.microsoft.com/azure/azure-monitor/app/app-insights-overview)
- [Kusto Query Language (KQL) Guide](https://learn.microsoft.com/azure/data-explorer/kusto/query/)
- [AZ-400: Designing and Implementing Microsoft DevOps Solutions](https://learn.microsoft.com/certifications/exams/az-400)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/473876ba-f35b-4ae7-a361-3fc9572e593d/lesson/fcad4ec6-6d25-437b-ae45-7361ee5e8931)**
>
> Watch video content
