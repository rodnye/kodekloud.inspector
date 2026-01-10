# Enable rules to create incidents - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Microsoft-Sentinel/Enable-rules-to-create-incidents)

---

## Table of Contents

- Enable rules to create incidents
  - Navigating to Analytics in Microsoft Sentinel
  - Creating a Custom Rule for Windows Security Events
  - Scheduling the Query and Configuring the Alert
  - Automation and Incident Review
  - Conclusion
  - Watch Video

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Microsoft Sentinel

# Enable rules to create incidents

This article demonstrates how to enable rules in Microsoft Sentinel to automatically create incidents. By leveraging rule-based alerts, you can eliminate the need to manually investigate numerous alerts, helping you enhance your security posture, respond more swiftly, and allocate resources more effectively.

After gathering data and visualizing it through workbooks, you can now turn the tide in your favor by converting defined events into actionable incidents using Microsoft Sentinel’s rule automation.

---

## Navigating to Analytics in Microsoft Sentinel

To get started, log in to the [Azure portal](https://portal.azure.com) and open Microsoft Sentinel. Next, navigate to **Analytics** where you can either create your own scheduled queries or select from the rule templates provided by Sentinel. By default, Microsoft Sentinel includes an enabled rule called "Advanced Multistage Attack Detection." This rule is specifically designed to analyze multiple events sourced from your connected systems.

![The image shows a Microsoft Sentinel Analytics dashboard with a focus on "Advanced Multistage Attack Detection" rules, highlighting a high-severity alert. The interface includes options for managing rules and viewing threat management features.](https://kodekloud.com/kk-media/image/upload/v1752882061/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-rules-to-create-incidents/microsoft-sentinel-advanced-attack-dashboard.jpg)

> [!important]
> **Note**
>
> For this exercise, we will explore a different scenario that focuses on Windows security events.

---

## Creating a Custom Rule for Windows Security Events

In this section, you will create a rule specifically tailored to detect excessive Windows login failures. Follow these steps:

1.  Select the relevant rule template for Windows security events.
2.  Filter for indicators related to excessive Windows login failures.
3.  Click **Create Rule** to enter the rule configuration.

Within the rule configuration, you will see a default Kusto query that defines the alert logic. Initially, a basic version of this query may appear as follows:

```
let starttime = 8d;
let endtime = 1d;
let threshold = 0.333;
let countlimit = 50;
SecurityEvent
| where TimeGenerated >= ago(endtime)
```

This query defines common variables and starts querying the SecurityEvent table for data within the designated timeframe. You can modify the rule name and adjust its severity. For this demonstration, set the severity to **Medium**.

When you click **View Query Results**, you might see a query similar to this which investigates login failures:

```
where TimeGenerated >= ago(endTime)
where EventID == 4625 and AccountType == "User"
where IpAddress in ('127.0.0.1', '-1')
summarize StartTime = min(TimeGenerated), EndTime = max(TimeGenerated)
join kind=leftouter (
    SecurityEvent
) on TimeGenerated between (ago(starttime) .. ago(endtime))
```

This query captures failed login attempts, indicating a potential attack on the virtual machine (VM). To refine the alert and consolidate incident creation, use the following final version of the query:

```
let starttime = 8d;
let endtime = 1d;
let threshold = 0.333;
let countlimit = 50;
SecurityEvent
| where TimeGenerated >= ago(endtime)
| where EventID == 4625 and AccountType =~ "User"
| where IpAddress in ("127.0.0.1", "::1")
| summarize StartTime = min(TimeGenerated), EndTime = max(TimeGenerated), CountToday = count() by EventID
join kind=leftouter (
    SecurityEvent
) on $left.TimeGenerated between ($right.StartTime .. $right.EndTime)
```

This refined query detects failed login attempts by filtering on event ID 4625 for user accounts and specific IP addresses. It then summarizes event data and joins additional security events to provide context, forming a solid foundation for incident creation.

---

## Scheduling the Query and Configuring the Alert

After finalizing the query, you can schedule it to run at regular intervals. In our example, the query is configured to run every five minutes with a lookback period of one day. The scheduling ensures that if the query returns any results—indicating a failed login attempt—the alert is automatically triggered.

You also have options to:

- Group alerts based on similarity to minimize noise.
- Configure incident settings to automatically create an incident in Microsoft Sentinel under specific conditions.

![The image shows a Microsoft Azure interface for creating a new scheduled analytics rule, specifically for excessive Windows logon failures. It includes options for setting query scheduling and alert details.](https://kodekloud.com/kk-media/image/upload/v1752882062/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-rules-to-create-incidents/azure-scheduled-analytics-rule.jpg)

> [!important]
> **Tip**
>
> You can further enhance the alert by incorporating custom fields from your Log Analytics query. However, the default setup will suffice for a basic configuration.

---

## Automation and Incident Review

Microsoft Sentinel goes beyond alert creation by supporting automated responses. You can integrate playbooks or ARM-based automation to execute predefined actions when an incident occurs. Although you can configure automation in the current interface, details on setting up playbooks and advanced automation rules will be discussed in a subsequent article.

To complete the process, review your settings and click **Create**. The analytics rule will then run automatically according to your schedule, and any matching events will generate an incident within Sentinel.

Once an incident is recorded, you can inspect its details. This includes information such as the administrator username, the affected VM, and other relevant event data. Testing can be performed by simulating failed logins from the command line; after a few minutes, an incident should appear on the Sentinel dashboard.

![The image shows a Microsoft Sentinel Analytics dashboard with active rules listed, including "Excessive Windows Logon Failures" and "Advanced Multistage Attack Detection," each with their severity, status, and other details.](https://kodekloud.com/kk-media/image/upload/v1752882064/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-rules-to-create-incidents/microsoft-sentinel-analytics-dashboard.jpg)

![The image shows a Microsoft Sentinel dashboard displaying an incident related to "Excessive Windows Logon Failures," with details about severity, alerts, and evidence.](https://kodekloud.com/kk-media/image/upload/v1752882065/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-rules-to-create-incidents/microsoft-sentinel-dashboard-windows-logon-failures.jpg)

Within the incident view, details such as the administrator’s information, VM name, and other event specifics are made available. To display additional information like IP addresses, simply map the corresponding field from your query to the incident layout.

![The image shows a Microsoft Azure Sentinel dashboard displaying an incident titled "Excessive Windows Logon Failures," with details about the incident's severity, status, and entities involved.](https://kodekloud.com/kk-media/image/upload/v1752882066/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-rules-to-create-incidents/azure-sentinel-dashboard-windows-logon-failures.jpg)

---

## Conclusion

By enabling rules in Microsoft Sentinel, you empower your organization to automatically detect, prioritize, and respond to security incidents. In this article, you learned how to create a custom rule for excessive Windows login failures, configure its scheduling, and review incidents as they are generated. In a future article, we will dive deeper into configuring playbooks and advanced automation rules for an even more robust security strategy.

Happy securing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/fdf529c7-54c7-4550-a622-aec81172dcad/lesson/0fb29554-1228-4567-9a36-706c2dd3eebc)**
>
> Watch video content
