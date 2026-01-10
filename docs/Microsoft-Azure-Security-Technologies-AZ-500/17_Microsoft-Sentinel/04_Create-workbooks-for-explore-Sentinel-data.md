# Create workbooks for explore Sentinel data - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Microsoft-Sentinel/Create-workbooks-for-explore-Sentinel-data)

---

## Table of Contents

- Create workbooks for explore Sentinel data
  - Harnessing the Power of Workbooks in Microsoft Sentinel
  - Saving and Accessing Custom Workbooks
  - Exploring Additional Templates
  - Additional Resources
  - Watch Video

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Microsoft Sentinel

# Create workbooks for explore Sentinel data

In the previous lesson, we brought in data from various connectors. Now that the data is ingested into your workspace, the next step is to visualize and analyze it effectively.

Workbooks in Azure Sentinel are dynamic, interactive canvases that transform raw data into actionable insights. They help you spot trends, identify vulnerabilities, and understand user behavior through a powerful visual narrative.

## Harnessing the Power of Workbooks in Microsoft Sentinel

The process is simple. Start by selecting one of the many templates tailored for common scenarios based on your configured connectors. These templates serve as an effective starting point, and you can further customize them by adding visualizations, modifying queries, or integrating additional data sources.

Follow these steps to view workbooks in the Azure portal:

1.  Open the Azure portal and navigate to your Sentinel workspace.
2.  Go to the Workbooks section to discover a variety of available templates.

![The image shows a Microsoft Azure portal page for Microsoft Sentinel Workbooks, providing options to manage and create workbooks for data visualization and analysis. It includes sections for featured workbooks and more workbook options from the content hub.](https://kodekloud.com/kk-media/image/upload/v1752882053/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Create-workbooks-for-explore-Sentinel-data/azure-sentinel-workbooks-portal.jpg)

If the sidebar or additional sections are not visible in your browser, simply refresh the page.

Even when a large volume of data is not immediately visible, key areas such as identity and access events within Windows Security data often stand out. Clicking on a template reveals detailed information about various activities, such as:

- A "4688" event indicating a new process creation.
- A privileged service being called.
- An account failing to log on.

> [!important]
> **Unauthorized Access Alert**
>
> These events may indicate unauthorized access attempts, especially if the machine is exposed to a public IP address. Investigate any unexpected behavior immediately.

Expanding the view provides a detailed breakdown including counts, timestamps, and status details for events processed by services like Conhost.

![The image shows the Microsoft Sentinel Workbooks interface on Azure, displaying a list of templates related to security and activity logs. The sidebar includes options for threat management and content management.](https://kodekloud.com/kk-media/image/upload/v1752882054/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Create-workbooks-for-explore-Sentinel-data/microsoft-sentinel-workbooks-azure-templates.jpg)

The "more details" option offers comprehensive insights without the need to manually write KQL queries since the data is provided out-of-the-box.

## Saving and Accessing Custom Workbooks

If you discover a workbook template that meets your requirements, save it for quick future access. Once saved, refresh the Workbooks section in Azure Sentinel to locate your custom workbook.

![The image shows a Microsoft Azure Sentinel dashboard displaying identity and access activities, including user and machine activities with activity counts and trends over the past 24 hours.](https://kodekloud.com/kk-media/image/upload/v1752882055/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Create-workbooks-for-explore-Sentinel-data/azure-sentinel-dashboard-activities.jpg)

You can expand the workbook to a larger canvas, utilize search boxes, and filter the data—for example, to view all user sign-in activities on a server.

![The image shows a Microsoft Azure Sentinel dashboard displaying identity and access activities, with metrics on user and machine activities. It includes activity counts and trends for specific users and machines.](https://kodekloud.com/kk-media/image/upload/v1752882056/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Create-workbooks-for-explore-Sentinel-data/azure-sentinel-dashboard-activities-2.jpg)

## Exploring Additional Templates

Advanced workbooks are available for other scenarios as well. These include analyzing analytics efficiency or monitoring logs from Active Directory and Azure Active Directory. Sometimes, the returned query might show no results if no activity has been logged yet; this is perfectly normal.

There are also templates for monitoring services like Defender for Identity, Defender for Endpoint, and Sentinel cost analysis. If you experience issues with missing panels in a template, a browser refresh usually resolves the problem.

To view Sentinel cost details:

1.  Select the appropriate template (Sentinel cost).
2.  Review the ingestion price and retention details provided within the template.

![The image shows a Microsoft Azure portal page displaying a Microsoft Sentinel cost summary. It includes details like time range, workspace, ingestion price, and retention price, with a note indicating no data older than 90 days.](https://kodekloud.com/kk-media/image/upload/v1752882057/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Create-workbooks-for-explore-Sentinel-data/azure-sentinel-cost-summary-portal.jpg)

> [!important]
> **Data Onboarding Reminder**
>
> Initially, you may not see any data if the onboarding process has just begun. As more data accumulates, the workbook will accurately reflect usage patterns and associated costs.

By leveraging workbooks in Azure Sentinel, you can transform your raw data into valuable insights without needing to write custom queries. Enjoy the ease of streamlined data visualization and proactive analysis in your security environment.

## Additional Resources

- [Azure Sentinel Documentation](https://docs.microsoft.com/en-us/azure/sentinel/)
- [Microsoft Sentinel Blog](https://techcommunity.microsoft.com/t5/azure-sentinel/bg-p/AzureSentinel)
- [KQL Quick Reference](https://docs.microsoft.com/en-us/azure/data-explorer/kusto/query/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/fdf529c7-54c7-4550-a622-aec81172dcad/lesson/5b68a660-c0f1-40fe-8bd3-cf053f5eec28)**
>
> Watch video content
