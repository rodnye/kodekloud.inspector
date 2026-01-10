# Hunt and investigate potential breaches - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Microsoft-Sentinel/Hunt-and-investigate-potential-breaches)

---

## Table of Contents

- Hunt and investigate potential breaches
  - Querying Failed Login Attempts by Expired Accounts
  - Combining Multiple Security Events for Enhanced Analysis
  - Using Sentinel in the Azure Portal
  - Live Stream Query for Continuous Monitoring
  - Grouping Queries to Create a Hunt
  - Watch Video

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Microsoft Sentinel

# Hunt and investigate potential breaches

In this guide, we explore how to proactively hunt for and investigate potential security breaches using Microsoft Sentinel. Security analysts often face the daunting task of sifting through massive amounts of data from various systems to detect emerging threats. Microsoft Sentinel simplifies this challenge with its advanced hunting, search, and query capabilities, enabling you to quickly pinpoint potential security issues.

## Querying Failed Login Attempts by Expired Accounts

Below is an example query that hunts for failed login attempts by expired user accounts:

```
(union isfuzzy=true
| where EventID == 4625
| where AccountType == 'User'
| where SubStatus == '0xc0000193')
```

Once executed, the query returns immediate and actionable results. Microsoft Sentinel not only aggregates data from numerous sources but also offers built-in hunting queries, which are especially helpful when seeking to unearth anomalies that standard security applications or analytic rules might miss.

## Combining Multiple Security Events for Enhanced Analysis

Consider this more detailed query that inspects two types of security events: one for failed logins (EventID 4625) and another for Kerberos service ticket requests (EventID 4769):

```
union isfuzzy=true
(
    SecurityEvent
    | where EventID == 4625
    // 4625: An account failed to log on
    | where AccountType == 'User'
    | where SubStatus == '0xc0000193'
    | extend Reason = case(SubStatus == '0xc0000193', 'Windows EventID (4625) - Account has expired', 'Unknown')
    | project Computer, Account, Reason, TimeGenerated
)
,
SecurityEvent
| where EventID == 4769
// 4769: A Kerberos service ticket was requested
// Kerberos Authentication
| parse EventData with "Status" Status "<" *
| parse EventData with "TargetUserName" TargetUserName "<" *
| where Status == '0x12'
| extend Reason = strcat('User ', TargetUserName, ' has ...')
```

Even if you are new to KQL (Kusto Query Language), these examples are a great starting point to uncover valuable insights about your environment.

## Using Sentinel in the Azure Portal

When you sign in to the [Azure portal](https://portal.azure.com/), navigate to the Microsoft Sentinel workspace and select the "Hunting" section. Here, you will find a variety of built-in query templates derived from the configured connectors. For instance, if your focus is on investigating failed logins, choose the "Summary of failed login users" query. Running these queries allows you to quickly identify any anomalies. In our demonstration, most queries returned zero results except one, and selecting it redirects you to Log Analytics for a deeper investigation.

![The image shows a Microsoft Sentinel dashboard with a focus on the "Hunting" section, displaying a list of security queries related to failed logins and Azure VM commands.](https://kodekloud.com/kk-media/image/upload/v1752882067/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Hunt-and-investigate-potential-breaches/microsoft-sentinel-hunting-dashboard.jpg)

## Live Stream Query for Continuous Monitoring

If continuous event monitoring is required, you can add a query to the live stream. For example, the following query actively tracks failed logins for user accounts:

```
SecurityEvent
| where AccountType == 'User' and EventID == 4625
| extend Reason = case(
    SubStatus == '0xC000006D', 'No logon servers available',
    SubStatus == '0xC000006E', 'Account name is not proper',
    SubStatus == '0xC0000070', 'Account name does not exist',
    'Unknown reason'
)
```

Once added, this live query continuously refreshes and displays real-time trends in your data.

![The image shows a Microsoft Azure interface for Microsoft Sentinel, specifically the Livestream feature, which allows users to create and manage Livestream sessions using Log Analytics queries.](https://kodekloud.com/kk-media/image/upload/v1752882069/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Hunt-and-investigate-potential-breaches/azure-sentinel-livestream-interface.jpg)

The live feed provides ongoing insights into your environment. If you determine that the data is no longer necessary, simply delete the live stream.

![The image shows the Microsoft Sentinel interface on Azure, specifically the "Hunting" section, displaying active queries and a livestream of query results.](https://kodekloud.com/kk-media/image/upload/v1752882070/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Hunt-and-investigate-potential-breaches/microsoft-sentinel-hunting-interface.jpg)

> [!important]
> **Tip**
>
> Grouping queries together can streamline your threat hunting process by allowing simultaneous execution and comparative analysis.

## Grouping Queries to Create a Hunt

A powerful feature in Microsoft Sentinel is the ability to group multiple queries into a single "hunt." This is particularly useful if you have several regular queries that you run daily. By grouping them, you can execute all queries simultaneously and, if warranted, create an incident based on the aggregated results.

Using this approach, you can efficiently run custom queries, logically organize them, and gain comprehensive insights into your security landscape without the need to run each query separately.

This concludes our lesson on leveraging Microsoft Sentinel for advanced breach hunting. By utilizing the built-in and custom queries, professionals can stay ahead of potential threats and ensure robust security for their systems.

Thank you for reading!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/fdf529c7-54c7-4550-a622-aec81172dcad/lesson/d1a752ba-6279-404b-8e83-63942ba6bb6f)**
>
> Watch video content
