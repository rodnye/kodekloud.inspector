# Manage connected sources for log analytics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Azure-Monitor/Manage-connected-sources-for-log-analytics)

---

## Table of Contents

- Manage connected sources for log analytics
  - Ingesting Data from Various Sources
  - Data Tables and Sample Queries
  - Onboarding Machines via Azure Portal
  - Legacy Agent (MMA) Installation
  - Configuring Azure Monitor Agent (AMA) Using Data Collection Rules
  - Onboarding PaaS Resources (App Services)
  - Conclusion
  - Watch Video

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Azure Monitor

# Manage connected sources for log analytics

This article provides a comprehensive guide on managing connected sources for Log Analytics across various environments, including on-premises setups and other clouds such as AWS and GCP. Data from these environments can be ingested into Azure using agents. Note that the legacy Log Analytics Agent (also known as the Microsoft Monitoring Agent or MMA) is being deprecated; the recommended replacement is the Azure Monitoring Agent (AMA), onboarded via Azure Arc for non-Azure machines.

Even though exam content has yet to be updated, both the legacy method (using MMA) and the new approach (using AMA with Azure Arc) are covered here to ensure you are well-informed from both an exam perspective and real-world implementation standpoint.

## Ingesting Data from Various Sources

Traditionally, on-premises machines (or machines outside Azure) would have the Log Analytics Agent installed, along with the workspace key, to enable communication with Log Analytics. With Azure Arc, non-Azure machines can be managed and extensions pushed to them similarly as with Azure VMs. It is important to note that regardless of whether you use MMA or AMA, an agent must be installed on the machine to collect logs and metrics.

Once machines are onboarded to Log Analytics, you can run queries in the Azure Portal to visualize and analyze the collected data.

![The image is a flowchart illustrating the process of managing connected source log analytics using Operations Manager, Linux and Windows agents, and Azure services. It shows data collection and integration with Microsoft's Log Analytics on Azure.](https://kodekloud.com/kk-media/image/upload/v1752881715/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Manage-connected-sources-for-log-analytics/log-analytics-flowchart-operations-manager.jpg)

## Data Tables and Sample Queries

Data ingestion is organized into various tables. For example, Windows event logs are stored in the "Event" table, while syslog entries appear in the "Syslog" table. The following sample queries demonstrate how to work with these tables:

```
Syslog
| union Event
| where SeverityLevel == "Error"
```

```
Heartbeat
| where ComputerIP startswith "52" and Computer startswith "DC"
| where OSType == "Windows" and OSName contains "2016"
```

```
Perf
| where CounterName == "Available MBytes" and Computer == "JBOX00"
| project TimeGenerated, CounterValue
| sort by TimeGenerated asc
| render timechart
```

The "Heartbeat" table verifies that each machine's agent (whether MMA or AMA) is reporting back to Log Analytics, while the "Perf" table collects performance metrics. Custom logs can also be created using your own table names, and alert data is stored in an "Alert" table. All this data can be efficiently queried using the Kusto Query Language.

## Onboarding Machines via Azure Portal

Machines can be onboarded to Log Analytics directly from the Azure Portal. This guide demonstrates both methods: the legacy MMA and the new AMA with Azure Arc. A script available in the Security Operations GitHub repository—named "monitoring prep infrastructure partial script"—can automatically create a resource group (e.g., "rgsecops"), two virtual machines (one Windows and one Linux), and a web app.

After running the script, you will see all the created resources in the new resource group:

![The image shows a Microsoft Azure portal interface displaying details of a resource group named "rg-secops-20231010." It lists various resources such as App Services, Disks, and Network Interfaces located in the East US region.](https://kodekloud.com/kk-media/image/upload/v1752881717/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Manage-connected-sources-for-log-analytics/azure-portal-rg-secops-resources.jpg)

## Legacy Agent (MMA) Installation

Let's review the legacy method using MMA, which is scheduled for deprecation in August 2024. To onboard a machine with MMA, navigate in the Azure Portal to your Log Analytics workspace, then select "Sources" → "Virtual Machines" to view onboarded machines. Click "Connect" for the machine you wish to onboard.

> [!important]
> **Note**
>
> Not all operating systems are supported by MMA. For example, Ubuntu 22.04 may not be supported.

While the connection process is initiated, you can also manage legacy agents:

![The image shows a Microsoft Azure portal interface for managing legacy agents in a Log Analytics workspace, with options to add and filter Windows event logs. A notification indicates that Log Analytics agents will not be supported after August 31, 2024.](https://kodekloud.com/kk-media/image/upload/v1752881718/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Manage-connected-sources-for-log-analytics/azure-portal-legacy-agents-log-analytics.jpg)

Check the virtual machine's "Extensions" blade to confirm agent installation. If you encounter an error such as "Install failed unsupported operating system" for the OMS agent on Linux, it signals a need to migrate to AMA.

![The image shows a Microsoft Azure portal interface displaying details of a virtual machine extension called "OmsAgentForLinux," with a status message indicating an installation failure due to an unsupported operating system, Ubuntu 22.04.](https://kodekloud.com/kk-media/image/upload/v1752881719/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Manage-connected-sources-for-log-analytics/azure-portal-omsagent-installation-failure.jpg)

In your Log Analytics workspace, you will see one Windows machine connected using the legacy agent and no machines connected via the Azure Monitor Agent if it is not configured.

![The image shows a Microsoft Azure portal interface for a Log Analytics workspace named "law-monitoring," displaying agent connection details for Windows computers. It indicates that 0 computers are connected via the Azure Monitor Windows agent, and 1 computer is connected via the legacy Log Analytics Windows agent.](https://kodekloud.com/kk-media/image/upload/v1752881720/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Manage-connected-sources-for-log-analytics/azure-log-analytics-workspace.jpg)

Opening the Logs section and executing a query for "Heartbeat" confirms the connection from the Windows machine:

![The image shows a Microsoft Azure Log Analytics workspace interface displaying a query result for "Heartbeat" logs, including details like time generated, computer ID, and OS type.](https://kodekloud.com/kk-media/image/upload/v1752881722/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Manage-connected-sources-for-log-analytics/azure-log-analytics-heartbeat-logs.jpg)

## Configuring Azure Monitor Agent (AMA) Using Data Collection Rules

To implement the newer approach, you will use the Azure Monitor Agent (AMA) with Data Collection Rules (DCRs). These rules specify which data to collect and from which resources. While both MMA and AMA can run concurrently, doing so will result in duplicate data being sent to Log Analytics, which can impact billing.

Follow these steps to create a DCR using AMA:

1.  In the Azure Portal, navigate to "Monitor" then "Data Collection Rules."
2.  Create a new rule (e.g., "AMA DCR") in your monitoring resource group.

![The image shows the Microsoft Azure Monitor Overview page, displaying various insights and diagnostic tools for monitoring Azure resources, such as Application Insights, Container Insights, and Network Insights. It includes sections for detection, triage, and diagnosis with options like Metrics, Alerts, and Logs.](https://kodekloud.com/kk-media/image/upload/v1752881723/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Manage-connected-sources-for-log-analytics/azure-monitor-overview-insights.jpg)

Within the DCR creation interface:

- Select the platform type ("All" to cover both Windows and Linux).
- Add resources from your resource group (e.g., under "SecOps").
- Add data sources such as Windows Event Logs, Performance Counters, and Linux Syslog.

For Windows Event Logs, configure the log levels (e.g., capture all critical events from Application Security) and set the destination to your Log Analytics workspace. Similar steps apply for adding performance counters like CPU, memory, disk, network, system, and process:

![The image shows a Microsoft Azure interface for creating a data collection rule, specifically adding a data source with performance counters like CPU, Memory, and Network, each set to a sample rate of 60 seconds.](https://kodekloud.com/kk-media/image/upload/v1752881724/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Manage-connected-sources-for-log-analytics/azure-data-collection-rule-performance-counters.jpg)

For Linux Syslog collection, configure the necessary log facilities and set the minimum log levels, directing the output to your Log Analytics workspace:

![The image shows a Microsoft Azure interface for creating a data collection rule, where a user can add a data source and configure log facilities and minimum log levels for Linux Syslog.](https://kodekloud.com/kk-media/image/upload/v1752881725/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Manage-connected-sources-for-log-analytics/azure-data-collection-rule-linux-syslog.jpg)

Review your settings and create the rule. During this process, a system-assigned managed identity is established for agent installation, and the extension installation is automatically initiated.

![The image shows a Microsoft Azure portal page for creating a data collection rule, displaying details like data rule name, subscription, resource group, selected resources, and configurations.](https://kodekloud.com/kk-media/image/upload/v1752881726/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Manage-connected-sources-for-log-analytics/azure-portal-data-collection-rule-2.jpg)

After deployment, verify the installation from the virtual machine extensions pane for both Windows and Linux:

![The image shows a Microsoft Azure portal page indicating that a deployment named "NoMarketplace" is complete, with options to view deployment details and next steps.](https://kodekloud.com/kk-media/image/upload/v1752881727/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Manage-connected-sources-for-log-analytics/azure-portal-nomarketplace-deployment.jpg)

Select your Windows machine and check its extensions:

![The image shows a Microsoft Azure portal interface displaying details of a virtual machine named "win-ra-vm," including its status, location, operating system, and network settings.](https://kodekloud.com/kk-media/image/upload/v1752881729/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Manage-connected-sources-for-log-analytics/azure-portal-virtual-machine-details.jpg)

At this stage, you should see the Azure Monitoring Windows Agent (AWM) installed. For Linux, the agent installation will update soon if it was previously unsupported. Return to the Log Analytics workspace to review agent statuses. Note that AMA data might not be immediately reflected; wait for the first heartbeat from the new agent.

![The image shows a Microsoft Azure Log Analytics workspace interface, specifically the "Agents" section, indicating the connection status of Windows computers. It shows 0 computers connected via the Azure Monitor Windows agent and 1 computer connected via the Log Analytics Windows agent (legacy).](https://kodekloud.com/kk-media/image/upload/v1752881730/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Manage-connected-sources-for-log-analytics/azure-log-analytics-agents-status.jpg)

After a short period, you should see one Windows computer and one Linux computer connected via AMA. Verify the heartbeat logs for the Linux machine with a query like the following:

```
Heartbeat
| where OSType == 'Linux'
| where Category == 'Azure Monitor Agent'
| summarize arg_max(TimeGenerated, *) by SourceComputerId
| sort by Computer
| render table
```

To check distinct computers, execute:

```
Heartbeat
| distinct Computer
```

And review heartbeat details along with category information using:

```
Heartbeat
| distinct computer, category
```

Some machines might report two heartbeats (one from the legacy agent and one from AMA) while others report only from AMA. You can also verify syslog messages being ingested:

![The image shows a Microsoft Azure Log Analytics workspace interface displaying syslog events from Linux computers. It includes a table with details such as timestamp, facility, hostname, and severity level.](https://kodekloud.com/kk-media/image/upload/v1752881732/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Manage-connected-sources-for-log-analytics/azure-log-analytics-syslog-events.jpg)

## Onboarding PaaS Resources (App Services)

For Platform as a Service (PaaS) resources like app services, an agent installation is not required because the compute is managed by Microsoft. Instead, configure diagnostic settings to collect logs. In the Azure Portal, navigate to the web app, go to "Diagnostic Settings," and create a new diagnostic setting. Select relevant log categories (e.g., HTTP logs, event logs) and direct the output to your Log Analytics workspace.

![The image shows a Microsoft Azure portal page for configuring diagnostic settings, where various log categories and metrics are selected to be sent to a Log Analytics workspace.](https://kodekloud.com/kk-media/image/upload/v1752881732/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Manage-connected-sources-for-log-analytics/azure-portal-diagnostic-settings.jpg)

After configuration, review the logs in the Log Analytics workspace. A new table, such as "AppServiceHTTPLogs," will display HTTP request details including status codes and query information:

![The image shows a Microsoft Azure portal interface displaying log analytics for a "law-monitoring" workspace. It includes a query editor and results table for "AppServiceHTTPLogs" with various log details.](https://kodekloud.com/kk-media/image/upload/v1752881734/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Manage-connected-sources-for-log-analytics/azure-portal-log-analytics-law-monitoring.jpg)

Depending on the resource type, logs are stored either in dedicated tables (like "AppServiceHTTPLogs" for web apps) or in the generic "AzureDiagnostics" table (for resources such as SQL auditing). Adjust your queries accordingly to analyze the data.

## Conclusion

This article has demonstrated how to onboard machines and other resources to Log Analytics using both the legacy MMA and the modern AMA (via Azure Arc and Data Collection Rules) approaches. For new deployments, it is recommended to adopt the Azure Monitor Agent (AMA) with ARM-based configurations. Although current exams might still focus on MMA, future updates are expected to incorporate AMA and Kubernetes monitoring.

Next, we will explore Azure Monitor alerts.

[Explore More on Azure Monitor Alerts](#)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/7b98ab58-5aa5-4f2b-9cfa-fdfef40ddc37/lesson/56a168ce-565d-4f43-937d-22e7e32939f3)**
>
> Watch video content
