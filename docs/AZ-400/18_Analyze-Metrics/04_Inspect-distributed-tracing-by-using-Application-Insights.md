# Inspect distributed tracing by using Application Insights - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Analyze-Metrics/Inspect-distributed-tracing-by-using-Application-Insights)

---

## Table of Contents

- Inspect distributed tracing by using Application Insights
  - Table of Contents
  - Key Features
  - Enable Application Insights in Azure Portal
  - Add the Application Insights SDK
  - Configure the Instrumentation Key
  - Explore Telemetry in Application Insights
  - Configure Alerts
  - Diagnostic Settings & Log Analytics
  - References
  - Watch Video
    - Overview Dashboard
    - Live Metrics Stream
    - Application Map
    - Performance
    - Failures
    - Availability

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Analyze Metrics

# Inspect distributed tracing by using Application Insights

Application Insights is part of Azure Monitor and Microsoft’s application performance management (APM) service. It provides real-time telemetry, automatic anomaly detection, powerful analytics, and seamless integration with Azure services and DevOps toolchains. In this guide, you’ll learn how to enable, configure, and explore distributed tracing for your .NET web app using Application Insights.

## Table of Contents

1.  [Key Features](#key-features)
2.  [Enable Application Insights in Azure Portal](#enable-application-insights-in-azure-portal)
3.  [Add the Application Insights SDK](#add-the-application-insights-sdk)
4.  [Configure the Instrumentation Key](#configure-the-instrumentation-key)
5.  [Explore Telemetry in Application Insights](#explore-telemetry-in-application-insights)
    - [Overview Dashboard](#overview-dashboard)
    - [Live Metrics Stream](#live-metrics-stream)
    - [Application Map](#application-map)
    - [Performance](#performance)
    - [Failures](#failures)
    - [Availability](#availability)
6.  [Configure Alerts](#configure-alerts)
7.  [Diagnostic Settings & Log Analytics](#diagnostic-settings--log-analytics)
8.  [References](#references)

---

## Key Features

| Feature                        | Description                                                       |
| ------------------------------ | ----------------------------------------------------------------- |
| Real-time Telemetry            | Monitor requests, dependencies, and exceptions as they occur.     |
| Anomaly Detection              | Automatic alerts on performance deviations and failures.          |
| Powerful Analytics             | Ad-hoc queries and customizable charting with Log Analytics.      |
| DevOps & Toolchain Integration | Plug-ins for Visual Studio, Azure Pipelines, GitHub Actions, etc. |

---

## Enable Application Insights in Azure Portal

1.  In the Azure Portal, create or select your Web App (e.g., **KodeKloud Support**).
2.  Under **Deployment** > **Networking**, configure required networking options.
3.  Navigate to **Monitor and Secure**, toggle **Application Insights** to **Yes**.
4.  Choose an existing resource or create a new one for **KodeKloud Support**.
5.  (Optional) Enable **Defender** for additional security monitoring.
6.  Click **Review + create** to finalize.

> [!important]
> **Note**
>
> Ensure your Azure role has `Monitoring Contributor` permissions before enabling Application Insights on the resource.

---

## Add the Application Insights SDK

Open your project in Visual Studio and update your front‐end page if needed. For example, your **Index.cshtml** might look like this:

```
@page
@model IndexModel
@{
    ViewData["Title"] = "Home page";
}
<div class="hero-image" style="background-image: url('/img/frontpage.jpg'); background-size: cover; background-position: center;">
    <h1 class="display-4 text-white">Welcome to Kode Kloud</h1>
</div>
<div class="container mt-4">
    <div class="row">
        <div class="col-md-8 offset-md-2 text-center">
            <h2>Expert Tech Support at Your Service</h2>
            <p class="lead">
                At Kode Kloud, our dedicated tech support team is committed to providing you with exceptional service. With our extensive knowledge and passion for problem-solving, we're here to ensure your team runs smoothly, allowing you to focus on what matters most – your success.
            </p>
        </div>
    </div>
</div>
```

Then install the Application Insights SDK package:

```
PM> Install-Package Microsoft.ApplicationInsights.AspNetCore
```

---

## Configure the Instrumentation Key

1.  In the Azure Portal, go to **Monitor** > **Application Insights** > **KodeKloud Support**.
2.  Under **Instrument your application**, select **.NET** and the **Recommended Basic** level.
3.  Enable the **Profiler** and click **Apply**.

![The image shows a Microsoft Azure portal page for "KodeKloudSupport" with a focus on Application Insights settings. It includes options for instrumenting applications with various programming languages and settings for collection level, profiler, and snapshot debugger.](https://kodekloud.com/kk-media/image/upload/v1752867281/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Inspect-distributed-tracing-by-using-Application-Insights/azure-portal-kodekloudsupport-application-insights.jpg)

4.  Copy the **Instrumentation Key**, then add it to **appsettings.json**:

```
{
  "ApplicationInsights": {
    "InstrumentationKey": "YOUR_INSTRUMENTATION_KEY"
  }
}
```

5.  Update your application startup (`Program.cs` or `Startup.cs`):

```
using Microsoft.ApplicationInsights.Extensibility;


var builder = WebApplication.CreateBuilder(args);


// Add Application Insights telemetry
builder.Services.AddApplicationInsightsTelemetry();


var app = builder.Build();
app.Run();
```

> [!important]
> **Warning**
>
> Do not commit your Instrumentation Key to public repositories. Store secrets securely using Azure Key Vault or environment variables.

Build and run locally to verify telemetry, then deploy through your CI/CD pipeline.

---

## Explore Telemetry in Application Insights

After deployment, navigate to **Monitor** > **Application Insights** > **KodeKloud Support**.

### Overview Dashboard

The Overview dashboard presents high-level metrics:

- **Failed requests**
- **Server response time**
- **Server requests**
- **Availability**

![The image shows a Microsoft Azure dashboard for "KodeKloudSupport," displaying metrics such as usage, reliability, responsiveness, and browser performance with various graphs and statistics.](https://kodekloud.com/kk-media/image/upload/v1752867282/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Inspect-distributed-tracing-by-using-Application-Insights/azure-dashboard-kodekloudsupport-metrics.jpg)

### Live Metrics Stream

1.  Go to **Live Metrics** and reset the view.
2.  Generate traffic to monitor request rate, duration, CPU usage, and memory in real time.

![The image shows a Microsoft Azure dashboard displaying live metrics for "KodeKloudSupport," including graphs for incoming and outgoing requests, overall health, and server performance.](https://kodekloud.com/kk-media/image/upload/v1752867284/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Inspect-distributed-tracing-by-using-Application-Insights/azure-dashboard-kodekloudsupport-metrics-2.jpg)

Live metrics are ideal for high-load scenarios and can be displayed on a team dashboard.

### Application Map

The **Application Map** visualizes components, dependencies, instance counts, and response times. It also highlights top failures and slowest requests.

![The image shows a Microsoft Azure Application Insights dashboard for "KodeKloudSupport," displaying an application map with metrics such as 1 instance, 301.7 microseconds response time, and 39,000 calls. It also highlights top failing requests and slowest requests on the right panel.](https://kodekloud.com/kk-media/image/upload/v1752867285/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Inspect-distributed-tracing-by-using-Application-Insights/azure-application-insights-kodekloudsupport-dashboard.jpg)

### Performance

Review operations by response time to identify slow dependencies or endpoints.

![The image shows a Microsoft Azure dashboard displaying performance metrics for "KodeKloudSupport," including graphs of request counts and operation durations. It features various tabs and options for analyzing server performance data.](https://kodekloud.com/kk-media/image/upload/v1752867286/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Inspect-distributed-tracing-by-using-Application-Insights/azure-dashboard-kodekloudsupport-metrics-3.jpg)

### Failures

Inspect error types and counts. In this demo, we intentionally generated 4,800 HTTP 404 errors.

![The image shows a Microsoft Azure Application Insights dashboard displaying failure analytics for "KodeKloudSupport," highlighting a high number of 404 response codes.](https://kodekloud.com/kk-media/image/upload/v1752867287/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Inspect-distributed-tracing-by-using-Application-Insights/azure-application-insights-failure-analytics.jpg)

### Availability

Track uptime and response trends over time to assess reliability.

![The image shows a Microsoft Azure dashboard for "KodeKloudSupport" with metrics on failed requests, server response time, server requests, and availability over the past hour. It includes graphs and various monitoring options on the left sidebar.](https://kodekloud.com/kk-media/image/upload/v1752867288/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Inspect-distributed-tracing-by-using-Application-Insights/azure-dashboard-kodekloudsupport-metrics-4.jpg)

---

## Configure Alerts

Define alert rules to get notified when metrics cross thresholds.

| Metric          | Condition     | Threshold    |
| --------------- | ------------- | ------------ |
| Failed requests | Greater than  | 3 per minute |
| Response time   | Above average | 500 ms       |
| CPU usage       | Exceeds       | 80%          |

1.  In the portal, choose **Alerts** > **New alert rule**.
2.  Select the target resource and signal type (e.g., Failed requests).
3.  Set the condition logic and threshold.

![The image shows a Microsoft Azure interface for creating an alert rule, specifically for monitoring failed requests. It includes options for setting alert conditions, logic, and a preview graph of failed request counts over time.](https://kodekloud.com/kk-media/image/upload/v1752867290/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Inspect-distributed-tracing-by-using-Application-Insights/azure-alert-rule-failed-requests-interface.jpg)

4.  On **Actions**, choose or create an action group to send email, SMS, or webhook notifications.

![The image shows a Microsoft Azure portal interface for creating an alert rule, specifically on the "Actions" tab, where users can configure quick actions and select notification methods like email.](https://kodekloud.com/kk-media/image/upload/v1752867291/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Inspect-distributed-tracing-by-using-Application-Insights/azure-portal-alert-rule-actions-tab.jpg)

Tip: Pin custom metric charts to your dashboard for quick visibility.

![The image shows a Microsoft Azure dashboard for KodeKloudSupport, displaying metrics selection options and chart settings for monitoring application insights.](https://kodekloud.com/kk-media/image/upload/v1752867292/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Inspect-distributed-tracing-by-using-Application-Insights/azure-dashboard-kodekloudsupport-metrics-chart.jpg)

---

## Diagnostic Settings & Log Analytics

1.  Under **Diagnostic settings**, configure streaming export of logs and metrics to storage, Event Hubs, or Log Analytics.

![The image shows the "Diagnostic settings" page in Microsoft Azure for "KodeKloudSupport," where users can configure the export of platform logs and metrics. It includes options to add diagnostic settings and lists various data types that can be collected.](https://kodekloud.com/kk-media/image/upload/v1752867294/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Inspect-distributed-tracing-by-using-Application-Insights/azure-diagnostic-settings-kodekloudsupport.jpg)

2.  Use **Log Analytics** to run Kusto queries on your telemetry and logs for advanced diagnostics.

> [!important]
> **Note**
>
> Leverage Log Analytics workspaces to correlate Application Insights data with other Azure monitor logs.

---

## References

- [Azure Monitor Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview)
- [Kusto Query Language (KQL)](https://docs.microsoft.com/azure/data-explorer/kusto/query/)
- [Secure your secrets with Azure Key Vault](https://docs.microsoft.com/azure/key-vault/secrets/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/473876ba-f35b-4ae7-a361-3fc9572e593d/lesson/b140cea2-dc60-4d69-a037-0f1bb53f4498)**
>
> Watch video content
