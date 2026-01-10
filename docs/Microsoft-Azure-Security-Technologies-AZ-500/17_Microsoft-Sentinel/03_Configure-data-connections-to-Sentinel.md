# Configure data connections to Sentinel - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Microsoft-Sentinel/Configure-data-connections-to-Sentinel)

---

## Table of Contents

- Configure data connections to Sentinel
  - Watch Video

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Microsoft Sentinel

# Configure data connections to Sentinel

Configure data connections to Microsoft Sentinel by setting up connectors that serve as secure bridges between Sentinel and various data sources. These connectors enable Sentinel to receive logs and data from Microsoft solutions, third-party services, cloud providers, or on-premises infrastructure. In doing so, Sentinel builds a comprehensive security overview by correlating events, detecting anomalies, and responding promptly to potential threats.

Setting up connectors is simple and intuitive. With only a few clicks, you can integrate multiple services to ensure that every data source is monitored.

For example, the Azure Kubernetes Service (AKS) connector allows you to link AKS with Sentinel, importing all the log data stored in Log Analytics. Some connectors are deployed exclusively through solutions; Microsoft provides a comprehensive catalog, and you can also find community-built connectors on the [Microsoft Sentinel GitHub repository](https://github.com/Azure/Azure-Sentinel) if you need additional data integrations.

In this guide, you will learn how to onboard Windows and Linux servers to Azure Monitor and analyze their logs using Azure Sentinel. The first step involves enabling the Azure Monitoring Agent (AMA) on your virtual machines by creating a Data Collection Rule (DCR).

---

Navigate to the Monitor section to create a Data Collection Rule. Name the rule (e.g., "DCR for Sentinel") and assign it to the Sentinel resource group. This rule applies to all your servers and requires the creation of a Data Collection Endpoint to handle data collection—especially for Linux machines that do not support direct connectivity using AMA. Although Ubuntu 22.04 does not support MFA, a Data Collection Endpoint can still link it to your Linux service. Under Resources, add both Windows and Linux servers; then, under Collect and Deliver, select all available data sources such as performance counters, application logs, security logs, and system logs. The destination for this collected data is your Sentinel workspace.

![The image shows a Microsoft Azure portal interface for creating a data collection rule, specifically adding a data source for Windows Event Logs with options to configure event log levels.](https://kodekloud.com/kk-media/image/upload/v1752882040/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-data-connections-to-Sentinel/azure-portal-data-collection-rule.jpg)

Once you configure the data sources, the system verifies whether the AMA is installed on these servers. If not, it automatically installs the extension to onboard them to Azure Monitor.

![The image shows a Microsoft Azure portal page for creating a data collection rule, displaying details like the data rule name, subscription, resource group, selected resources, and configurations.](https://kodekloud.com/kk-media/image/upload/v1752882040/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-data-connections-to-Sentinel/azure-portal-data-collection-rule-2.jpg)

After onboarding, wait for the servers' heartbeats to appear in your Log Analytics workspace. This workspace displays connected servers along with the status of the Azure Monitor Agent.

![The image shows a Microsoft Azure portal interface displaying the "Log Analytics workspace" with details about connected Linux computers and options for managing agents and data collection rules.](https://kodekloud.com/kk-media/image/upload/v1752882042/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-data-connections-to-Sentinel/azure-portal-log-analytics-workspace.jpg)

Return to Sentinel and click on Logs to access the same data from your Log Analytics workspace. Running a query will display heartbeat information for both Linux and Windows servers.

![The image shows a Microsoft Sentinel dashboard with a log query interface displaying results for a "Heartbeat" query, including details like timestamps, computer IDs, IP addresses, and operating systems.](https://kodekloud.com/kk-media/image/upload/v1752882043/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-data-connections-to-Sentinel/microsoft-sentinel-heartbeat-query-dashboard.jpg)

---

Next, go to the Connectors section in Sentinel to view the available data connectors. Under Featured Data Connectors, you can onboard essential services such as Azure Activity, Azure Active Directory, Microsoft Defender, Defender for Cloud, and various security events.

Begin by installing the Azure Active Directory connector, then proceed with Azure Activity and other connectors. Once the installations are complete, your Sentinel instance is ready to process the incoming logs.

For the Azure Active Directory connector, navigate to its Manage section. Here, you will see details like “Connect Azure Active Directory logs to Sentinel.” Note that exporting sign-in data may require P1 or P2 licenses. If you do not have a license yet, you can start with a trial to enable the necessary features.

![The image shows a Microsoft Azure portal interface for integrating Azure Active Directory with Microsoft Sentinel, detailing prerequisites and configuration options for connecting logs.](https://kodekloud.com/kk-media/image/upload/v1752882044/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-data-connections-to-Sentinel/azure-portal-active-directory-sentinel.jpg)

Return to the Content Hub and open the Azure Activity solution to manage an item. Some solutions require a policy—for example, one named "Send Azure Logs to Log Analytics Workspace" must be assigned to ensure proper data transmission. This step showcases the configuration process.

To onboard security events from Windows servers, clear the filter in the Content Hub and search for Windows Security Events. Click to install the connector; you will notice that two onboarding methods are available. One uses the Azure Monitor Agent extension (AME) while the other uses a legacy agent, which will be deprecated soon.

![The image shows a Microsoft Azure portal interface displaying the "Content hub" section of Microsoft Sentinel. It lists various security solutions and data connectors, with details about "Windows Security Events" highlighted on the right.](https://kodekloud.com/kk-media/image/upload/v1752882045/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-data-connections-to-Sentinel/azure-portal-content-hub-sentinel.jpg)

Wait for the installation to complete. Once finished, click on Manage for "Security Events via APM." Since this connector requires a Data Collection Rule that collects data exclusively from Windows machines, create a new rule (for example, "DCR Sentinel Windows Resources") and add your Windows machine to it. Under the collection configuration, specify that all security events should be collected.

![The image shows a Microsoft Azure portal interface for creating a data collection rule in Microsoft Sentinel, specifically for Windows Security Events via AMA. It includes details about the data rule, selected resources, and a deployment notification.](https://kodekloud.com/kk-media/image/upload/v1752882046/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-data-connections-to-Sentinel/azure-portal-data-collection-rule-3.jpg)

After applying the rule, refresh the interface to verify that the new Data Collection Rule is visible.

![The image shows the Microsoft Azure Content Hub interface, listing various security solutions and data connectors, such as Abnormal Security Events and Akamai Security.](https://kodekloud.com/kk-media/image/upload/v1752882047/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-data-connections-to-Sentinel/azure-content-hub-security-solutions.jpg)

Go back to the Manage section to confirm that the Data Collection Rule is properly listed. With this configuration, security events from your Windows machines are now being ingested by Azure Sentinel.

![The image shows a Microsoft Azure portal page for configuring Windows Security Events via AMA, with sections for prerequisites and configuration details. It includes options for enabling data collection rules and information about workspace data sources.](https://kodekloud.com/kk-media/image/upload/v1752882049/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-data-connections-to-Sentinel/azure-portal-windows-security-events.jpg)

At this point, your Windows machine is successfully connected to Sentinel. To verify that logs are being collected, return to Sentinel and check for a table named SecurityEvent (or similar). Initially, this table might be empty if no events have occurred within the last 24 hours.

> [!important]
> **Pro Tip**
>
> Consider creating custom workbooks to visualize your log data more intuitively. Workbooks can provide enhanced insights compared to raw queries.

In summary, this guide demonstrates how to onboard Windows servers—and other connectors—into Azure Sentinel. You can further analyze and visualize the collected data using workbooks. For example, to query security events in your log query window, you might use the following command:

```
SecurityEvent
```

Workbooks make it easier to explore and understand your security data, improving your overall monitoring experience.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/fdf529c7-54c7-4550-a622-aec81172dcad/lesson/d24820a4-3d8a-4800-b54c-8fe3cb0e05ec)**
>
> Watch video content
