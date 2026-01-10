# Querying Log Analytics Workspace - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Monitoring/Querying-Log-Analytics-Workspace)

---

## Table of Contents

- Querying Log Analytics Workspace
  - Onboarding Machines and Agents
  - Configuring Monitoring for Virtual Machines
  - Transitioning to the Azure Monitor Agent (AMA) with Data Collection Rules
  - Monitoring App Services
  - Conclusion
  - Watch Video
    - Using the Legacy Agent (MMA)

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Monitoring

# Querying Log Analytics Workspace

In this lesson, we explore how to query a Log Analytics Workspace in Azure. Learn how to ingest data from various environments—including on-premises systems, AWS, and GCP—using agents. Although legacy certification exams might still reference the older Log Analytics Agent (also known as the Microsoft Monitoring Agent or MMA), note that MMA is being deprecated. The recommended approach is to use the Azure Monitoring Agent (AMA) with Azure Arc for managing on-premises machines.

---

## Onboarding Machines and Agents

Traditionally, onboarding non-Azure machines involved installing the Log Analytics Agent and providing the appropriate workspace key. With the deprecation of MMA, the onboarding process now leverages Azure Arc to manage non-Azure machines. Once onboarded to Azure Arc, you can easily deploy the necessary extensions using Azure Resource Manager (ARM), much like managing an Azure Virtual Machine.

The diagram below illustrates the process flow for managing connected log sources in Log Analytics:

![The image is a flowchart illustrating the process of managing connected source log analytics, showing the interaction between Operations Manager, Linux and Windows agents, and the Log Analytics Workspace via Azure Portal.](https://kodekloud.com/kk-media/image/upload/v1752884688/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Querying-Log-Analytics-Workspace/log-analytics-flowchart-operations-manager.jpg)

After onboarding, use the Azure Portal to run queries that analyze and visualize the collected data. Data is organized into tables based on its type. For instance:

- Windows Event Logs populate the "Event" table.
- Syslog data is stored in the "Syslog" table.
- Heartbeat data, which monitors agent connectivity, appears in the "Heartbeat" table.
- Performance metrics are stored in the "perf" table.
- Custom logs can also be defined.

Below is an example Kusto query that unions data from the Event table and applies multiple filters to extract and render performance counter data:

```
| union Event
| where SeverityLevel == "Error"
| where ComputerIP startswith "52"
| where Computer startswith "DC"
| where OSType == "Windows" and OSName contains "2016"
| where CounterName == "Available MBytes" and Computer == "JBOX00"
| project TimeGenerated, CounterValue
| sort by TimeGenerated asc
| render timechart
```

---

## Configuring Monitoring for Virtual Machines

For demonstration purposes, we deploy a Windows machine, a Linux machine, and an App Service. These resources can be provisioned using a PowerShell script from the GitHub repository (named `monitoring-prep-infra-powershell`), which creates a resource group called `rgsecops` containing two virtual machines and a web app.

### Using the Legacy Agent (MMA)

Initially, the legacy MMA (Microsoft Monitoring Agent) is used for onboarding, even though it is scheduled for deprecation in August 2024. In the Log Analytics workspace within the Azure Portal, navigate to "Resources" and then "Virtual Machine" to view the onboarded machines:

![The image shows a Microsoft Azure portal interface for a Log Analytics workspace named "law-monitoring," displaying various settings and options related to log management and monitoring.](https://kodekloud.com/kk-media/image/upload/v1752884690/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Querying-Log-Analytics-Workspace/azure-portal-log-analytics-workspace.jpg)

By clicking on "Connect," you can verify that the machines are attempting to join the workspace. Note that some operating systems are not supported by MMA; for example, Ubuntu 22.04 may exhibit compatibility issues. To diagnose such issues, check the extensions on the affected machine:

1.  Navigate to Virtual Machines.
2.  Select the Linux machine.
3.  Click on "Extensions" to review the installation status.

For instance, if you encounter an error for the OMS Agent for Linux, it indicates that MMA does not support Ubuntu 22.04:

![The image shows a Microsoft Azure portal interface displaying details of a virtual machine named "linux-ra-vm." It highlights the "OmsAgentForLinux" extension, which is in a transitioning status with an error message related to an unsupported operating system.](https://kodekloud.com/kk-media/image/upload/v1752884690/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Querying-Log-Analytics-Workspace/azure-portal-linux-ra-vm-error.jpg)

For Windows machines, the MMA status will indicate that it is provisioned and connected to your Log Analytics workspace. Return to the workspace to review the connected machines:

![The image shows a Microsoft Azure portal interface for a Log Analytics workspace named "law-monitoring," displaying the status of connected Windows computers and options for data collection rules.](https://kodekloud.com/kk-media/image/upload/v1752884691/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Querying-Log-Analytics-Workspace/azure-log-analytics-workspace.jpg)

After connecting, run a simple heartbeat query to verify data reporting from your Windows machine. For example:

```
Heartbeat
| distinct Computer, Category
```

This query displays the distinct computer names and agent categories (e.g., direct agent for MMA and Azure Monitor Agent for AMA). Additionally, querying the Syslog table confirms data ingestion from the Linux machine.

![The image shows a Microsoft Azure Log Analytics workspace interface displaying a query result for "Heartbeat" logs, including details like time generated, computer ID, IP address, and operating system information.](https://kodekloud.com/kk-media/image/upload/v1752884693/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Querying-Log-Analytics-Workspace/azure-log-analytics-heartbeat-logs.jpg)

---

## Transitioning to the Azure Monitor Agent (AMA) with Data Collection Rules

To adopt the modern agent (AMA), configure Data Collection Rules (DCRs) to define what data to collect and to specify the target Log Analytics workspace. AMA and MMA can coexist; however, be aware that sending data from both agents to the same workspace may result in duplicate billing.

Follow these steps to create a Data Collection Rule:

1.  In the Azure Portal, go to the Monitor section and select "Data Collection Rules."
2.  Create a new rule (e.g., named "AMADCR") in your monitoring resource group.

![The image shows a Microsoft Azure portal interface for creating a data collection rule, with fields for rule name, subscription, resource group, region, and platform type.](https://kodekloud.com/kk-media/image/upload/v1752884694/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Querying-Log-Analytics-Workspace/azure-portal-data-collection-rule.jpg)

3.  Select "All" for the platform type to cover both Windows and Linux.
4.  Under "Collect & Deliver," add the required data sources:
    - **Windows Event Logs:** Configure the desired logging levels (e.g., only critical events from Application or Security).
    - **Performance Counters:** Choose metrics such as CPU, memory, disk, network, system, and process counters.
    - **Linux Syslog:** Specify the desired logging levels (e.g., Debug, Info, Notice, Warning).

    Ensure that for each data source, the destination is set to your Log Analytics workspace.

![The image shows a Microsoft Azure interface for creating a data collection rule, specifically in the "Collect and deliver" section. It includes options to add a data source, with performance counters like CPU, Memory, Disk, Network, System, and Process selected for data collection.](https://kodekloud.com/kk-media/image/upload/v1752884695/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Querying-Log-Analytics-Workspace/azure-data-collection-rule-interface.jpg)

![The image shows a Microsoft Azure interface for creating a data collection rule, specifically in the "Collect and deliver" section, where a data source type "Linux Syslog" is being configured with various log facilities and minimum log levels.](https://kodekloud.com/kk-media/image/upload/v1752884696/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Querying-Log-Analytics-Workspace/azure-data-collection-linux-syslog.jpg)

5.  Review and create the Data Collection Rule. During this process, a system-assigned managed identity is enabled, and the extension installation for the Azure Monitor Agent is automatically initiated.

![The image shows a Microsoft Azure portal screen for creating a data collection rule, with details about selected resources and configurations. Notifications indicate successful enabling of system-assigned managed identities and a deployment submission.](https://kodekloud.com/kk-media/image/upload/v1752884697/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Querying-Log-Analytics-Workspace/azure-portal-data-collection-rule-2.jpg)

After configuring the DCR, verify the agent installation on your virtual machines by checking the extensions. On your Windows machine, you should now see the "Azure Monitoring Windows Agent," and on your Linux machine, the corresponding Azure agent appears (while MMA is not supported).

Return to your Log Analytics workspace and refresh the view of connected machines. After a short period, you should observe at least one Windows and one Linux computer reporting heartbeats via AMA:

![The image shows a Microsoft Azure portal interface for a Log Analytics workspace named "law-monitoring," displaying options for managing agents and connected computers. It indicates that there are no Linux computers connected via Azure Monitor or Log Analytics agents.](https://kodekloud.com/kk-media/image/upload/v1752884698/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Querying-Log-Analytics-Workspace/azure-portal-log-analytics-workspace-2.jpg)

Run the heartbeat query again:

```
Heartbeat
| distinct Computer, Category
```

This confirms that the Windows VM is now sending two heartbeats (one from the legacy agent and another from AMA), while Linux machines report via AMA. Query the Syslog table to verify that entries are arriving from your Linux machine.

---

## Monitoring App Services

For Platform-as-a-Service (PaaS) resources such as App Services, an agent is not required because Microsoft manages the underlying infrastructure. Instead, configure Diagnostic Settings to capture logs and metrics. Follow these steps:

1.  In the Azure Portal, navigate to your Web App and go to the "Diagnostic Settings" section.
2.  Create a new diagnostic setting (e.g., "App DAG") and select the log and metric categories you want to capture.
3.  Choose your Log Analytics workspace as the destination.

![The image shows a Microsoft Azure portal page for configuring diagnostic settings, where various log categories and destination details are selected for an application.](https://kodekloud.com/kk-media/image/upload/v1752884699/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Querying-Log-Analytics-Workspace/azure-portal-diagnostic-settings.jpg)

Once configured, HTTP requests and other logs for your web app will be captured and stored in the "App Service HTTP Logs" table. These logs include details such as status codes and responses, which you can later query within your Log Analytics workspace.

![The image shows a Microsoft Azure portal interface focused on the "law-monitoring" Log Analytics workspace, displaying a list of log management options and a description of the "Event" log.](https://kodekloud.com/kk-media/image/upload/v1752884700/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Querying-Log-Analytics-Workspace/azure-portal-law-monitoring-log-analytics.jpg)

---

## Conclusion

In this lesson, we demonstrated how to onboard machines to a Log Analytics workspace using both the legacy MMA and the modern AMA approaches. While current exams may reference MMA, it is advisable to adopt AMA for new deployments due to its enhanced capabilities and support for modern operating systems. We also covered how to capture logs from App Services using Diagnostic Settings.

> [!important]
> **Next Steps**
>
> Stay tuned for our upcoming guide on Azure Monitor Alerts to further enhance your monitoring strategy.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/e208e27a-6519-4eb4-aaf1-342bb14def21/lesson/ed41d04b-8a16-458d-949e-2af0824a8de8)**
>
> Watch video content
