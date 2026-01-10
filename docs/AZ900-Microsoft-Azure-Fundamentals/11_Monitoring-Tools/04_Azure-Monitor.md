# Azure Monitor - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ900-Microsoft-Azure-Fundamentals/Monitoring-Tools/Azure-Monitor)

---

## Table of Contents

- Azure Monitor
  - Benefits of Azure Monitor
  - Navigating Azure Monitor in the Azure Portal
  - Watch Video

---

## Content

AZ900: Microsoft Azure Fundamentals

Monitoring Tools

# Azure Monitor

Pilla Innovations IT team needs to monitor CPU, memory, and disk usage of their servers. In this guide, we explore Azure Monitor—a robust monitoring solution within Azure that collects, analyzes, and acts upon telemetry data from both Azure and on-premises environments.

![The image is a diagram illustrating the Azure Monitor process, showing steps to collect, analyze, and act on data, with icons representing each stage.](https://kodekloud.com/kk-media/image/upload/v1752868462/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Monitor/azure-monitor-process-diagram.jpg)

Azure Monitor provides a centralized way to track not only application performance but also the underlying infrastructure and networking elements. Its key features include:

- **Data Collection:** Aggregates performance and operational telemetry from various Azure resources, on-premises systems, and even other cloud providers, offering a comprehensive view of your environment.
- **Alerts and Notifications:** Enables proactive alert configuration so you can respond quickly to critical events.
- **Dashboards and Visualization:** Allows you to create custom dashboards, making it easy to visualize complex data and monitor resource metrics efficiently.
- **Log Analytics:** An integral component that stores and analyzes logs, enabling you to query data for troubleshooting and in-depth analysis.
- **Application Insights:** Delivers real-time performance insights for live applications, helping ensure an optimal user experience.

![The image lists the key features of Azure Monitor, including Data Collection, Alerts and Notifications, Dashboards and Visualization, Log Analytics, and Application Insights.](https://kodekloud.com/kk-media/image/upload/v1752868464/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Monitor/azure-monitor-key-features.jpg)

Although Log Analytics and Application Insights operate as separate services, they integrate seamlessly with Azure Monitor to provide a unified monitoring solution.

## Benefits of Azure Monitor

Azure Monitor offers several significant benefits, making it an essential tool for modern IT operations:

- **Centralized Monitoring:** Access a unified interface that aggregates data from all your Azure and on-premises resources. For instance, servers onboarded using Azure Arc can send both metrics and logs directly to Azure Monitor.
- **Automated Response:** Set up automated actions that trigger in response to specific events, facilitating rapid issue resolution.
- **Performance Optimization:** Quickly identify performance bottlenecks and pinpoint areas for enhancement, ensuring your applications remain efficient.
- **Unified Diagnostic Tool:** Simplify troubleshooting by obtaining integrated views of network, application, and infrastructure diagnostics.

![The image lists the benefits of Azure Monitor, including centralized monitoring, automated responses, performance optimization, and a unified diagnostic tool.](https://kodekloud.com/kk-media/image/upload/v1752868465/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Monitor/azure-monitor-benefits-list.jpg)

Azure Monitor is widely used for IT operations and is also a favorite among DevOps teams and developers for tracking application health and infrastructure performance.

## Navigating Azure Monitor in the Azure Portal

When you sign in to the [Azure Portal](https://portal.azure.com), navigating to Azure Monitor is straightforward. After logging in, select Azure Monitor from the main menu to view the array of monitoring services available. For example, if you select a storage account and navigate to its "Monitoring" section, you'll see key metrics such as:

- Total egress and ingress
- Latency
- Request breakdown

These basic metrics are accessible for all services at no extra cost. However, if you decide to collect logs for deeper analysis, additional charges via Log Analytics will apply.

> [!important]
> **Note**
>
> When analyzing logs for in-depth insights, remember that extended data retention and advanced queries may incur extra charges.

![The image shows a Microsoft Azure portal interface displaying monitoring metrics for a storage account, including graphs for total egress, total ingress, request breakdown, and average latency.](https://kodekloud.com/kk-media/image/upload/v1752868466/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Monitor/azure-portal-storage-metrics.jpg)

Furthermore, Azure Monitor allows the setup of custom alerts and personalized views. For instance, you can analyze egress traffic by adjusting the display period (e.g., viewing the last three days) to better understand traffic patterns.

![The image shows a Microsoft Azure Metrics dashboard displaying a line chart of data egress over time, with a noticeable spike in activity.](https://kodekloud.com/kk-media/image/upload/v1752868467/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Monitor/azure-metrics-dashboard-line-chart.jpg)

Azure Monitor’s robust features are critical for maintaining high performance and reliability. Its capabilities are frequently highlighted in certification exams such as [AZ900: Microsoft Azure Fundamentals](https://learn.kodekloud.com/user/courses/az900-microsoft-azure-fundamentals) and [Microsoft Azure Security Technologies (AZ-500)](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500).

Thank you for reading this detailed overview of Azure Monitor. Happy monitoring!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az900-microsoft-azure-fundamentals/module/fe17e76e-2be4-4e04-bbfe-a7e8f72b1f6f/lesson/c2d3b771-bbf2-4645-9627-90bb32a6cbe5)**
>
> Watch video content
