# Collecting Application Logs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Monitoring-App-Performance/Collecting-Application-Logs)

---

## Table of Contents

- Collecting Application Logs
  - Log-Based Metrics
  - Pre-Aggregated Metrics
  - Instrumenting Your Application
  - Watch Video
    - Auto-Instrumentation
    - Distributed Tracing

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Monitoring App Performance

# Collecting Application Logs

In this article, we explore two fundamental metric types available in Application Insights: log-based metrics and pre-aggregated metrics. Each type is optimized for different monitoring needs, so understanding when to use each is key to effective diagnostics and performance tracking in your applications.

## Log-Based Metrics

Log-based metrics capture every event as it occurs, storing them as logs in Application Insights. This provides a highly granular view, allowing for detailed diagnostic analysis directly within the Azure Portal. While this approach is beneficial for troubleshooting and investigating individual events, keep in mind that high telemetry volume may result in significant data storage overhead.

> [!important]
> **Tip**
>
> Use log-based metrics when detailed visibility into each event is necessary, especially during troubleshooting or performance analysis.

## Pre-Aggregated Metrics

Pre-aggregated metrics compile telemetry data into summarized time series, retaining only the key dimensions needed for monitoring. This significantly reduces storage requirements and is ideal for applications that generate large volumes of telemetry. Modern SDKs support pre-aggregation by default, ensuring efficient data collection. Even if your chosen SDK does not support pre-aggregation, Application Insights can automatically aggregate incoming events.

![The image is a comparison table of "Log-Based Metrics" and "Pre-Aggregated Metrics," highlighting their characteristics and uses in application insights.](https://kodekloud.com/kk-media/image/upload/v1752866717/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Collecting-Application-Logs/log-based-vs-pre-aggregated-metrics.jpg)

In summary, choose log-based metrics for detailed diagnostics and pre-aggregated metrics for efficient monitoring in high-scale environments. Your decision should align with your application’s telemetry volume and diagnostic needs.

## Instrumenting Your Application

Monitoring begins with proper instrumentation. Application Insights offers two main approaches: auto-instrumentation and distributed tracing. Both methods help ensure comprehensive visibility into your application's behavior.

### Auto-Instrumentation

Auto-instrumentation enables telemetry collection without modifying your application code. This method is particularly useful for quickly setting up monitoring across various frameworks and environments such as .NET, Java, Node.js, Python, and numerous Azure services.

For instance, in a .NET application you can enable auto-instrumentation via the Application Insights SDK without altering your codebase. Similarly, Azure App Service or Function App users can easily activate Application Insights by configuring the agent, which automatically gathers telemetry data like metrics, requests, dependencies, and logs.

### Distributed Tracing

Distributed tracing is essential for observing microservices and complex distributed systems. It tracks the progress of a request as it flows through multiple services, allowing you to visualize transaction paths, spot performance bottlenecks, and diagnose issues spanning multiple components.

You can enable distributed tracing by instrumenting your application with the Application Insights SDK for .NET, Java, Node.js, or Python. Additionally, libraries like OpenCensus can integrate with Application Insights to offer comprehensive tracing across distributed environments.

![The image is a comparison between "Auto-Instrumentation" and "Instrumenting for Distributed Tracing" for app monitoring, detailing their features and methods. It highlights enabling application monitoring and distributed tracing using Application Insights and OpenCensus.](https://kodekloud.com/kk-media/image/upload/v1752866719/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Collecting-Application-Logs/auto-instrumentation-vs-distributed-tracing.jpg)

Auto-instrumentation provides a quick setup for monitoring, especially when your framework is supported natively. Distributed tracing, on the other hand, offers deeper insights into the request flows—a critical aspect for microservices architectures. If auto-instrumentation is not supported in your environment, consider manual instrumentation using the Application Insights SDK or the OpenTelemetry API to ensure complete telemetry ingestion.

> [!important]
> **Final Tip**
>
> Use Application Maps in Application Insights to visualize interconnected components of your application. This tool helps pinpoint performance bottlenecks and identify failing dependencies quickly.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/25287e89-7860-401f-a2c1-af5a7a2e07c6/lesson/1177db6f-b097-4b61-871f-ac047ccd74ef)**
>
> Watch video content
