# Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Analyze-Metrics/Introduction)

---

## Table of Contents

- Introduction
  - Key Metrics Overview
  - Practical Monitoring Scenarios
  - Configuring Alerts
  - Building Custom Dashboards
  - Best Practices
  - Watch Video
    - Benefits & Challenges

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Analyze Metrics

# Introduction

In this lesson, you’ll learn how to analyze metrics for the AZ-400 exam by inspecting Azure infrastructure performance and leveraging telemetry data. Effective monitoring helps you optimize resource health, detect issues early, and ensure your applications run smoothly.

By the end of this tutorial, you'll be able to:

- Track critical infrastructure metrics (CPU, memory, disk, network)
- Configure Azure monitoring services and alerts
- Analyze usage and application performance telemetry
- Build custom dashboards and follow best practices for Azure performance management

---

Understanding core infrastructure metrics lets you proactively manage Azure resources and avoid bottlenecks.

## Key Metrics Overview

| Metric             | Definition                              | Azure Monitor Metric Name | Typical Threshold  |
| ------------------ | --------------------------------------- | ------------------------- | ------------------ |
| CPU Usage          | Percentage of CPU capacity in use       | Percentage CPU            | 70%                |
| Memory Utilization | Ratio of committed vs. available memory | Available Memory          | 80%                |
| Disk I/O           | Read/write operations per second        | Disk Read/Write Ops/Sec   | Varies by workload |
| Network Throughput | Inbound/outbound bytes per second       | Network In/Out Bytes      | Varies by workload |

![The image is a slide titled "Inspecting Infrastructure Performance Indicators, Including CPU, Memory, Disk, and Network," listing four key metrics: Understanding Key Metrics for Azure Performance Management, CPU Performance, Memory Utilization, and Disk Performance.](https://kodekloud.com/kk-media/image/upload/v1752867318/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Introduction/infrastructure-performance-indicators-metrics.jpg)

> [!important]
> **Note**
>
> Import these metrics into Azure Monitor to visualize trends, set alerts, and automate scaling actions.

## Practical Monitoring Scenarios

- **Scenario 1:** Scale out a compute cluster when CPU usage exceeds 75% for 5 minutes
- **Scenario 2:** Trigger an alert on sustained disk latency spikes in a database VM
- **Scenario 3:** Throttle network-intensive workloads to prevent bandwidth saturation

![The image is a slide titled "Inspecting Infrastructure Performance Indicators, Including CPU, Memory, Disk, and Network," listing three points: practical examples of performance monitoring, benefits of proactive performance, and common challenges.](https://kodekloud.com/kk-media/image/upload/v1752867319/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Introduction/infrastructure-performance-indicators-monitoring.jpg)

### Benefits & Challenges

| Benefit                          | Challenge                                 |
| -------------------------------- | ----------------------------------------- |
| Early issue detection            | Alert fatigue if thresholds too strict    |
| Optimized resource utilization   | Data overload without proper filtering    |
| Reduced downtime and faster MTTR | Misconfigured alerts can mask real issues |

---

Telemetry data provides deeper insights into application usage and performance.

![The image is a slide titled "Analyzing Metrics by Using Collected Telemetry, Including Usage and Application Performance," listing four topics related to Azure: introduction to telemetry, key services, monitoring services, and configuring alerts.](https://kodekloud.com/kk-media/image/upload/v1752867320/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Introduction/analyzing-metrics-telemetry-azure-slide.jpg)

## Configuring Alerts

1.  Navigate to **Azure Monitor > Alerts**
2.  Create an **Alert Rule** for a selected metric
3.  Define **Action Groups** to notify, log, or trigger automation

> [!important]
> **Warning**
>
> Avoid setting excessive alert rules. Prioritize critical metrics to reduce noise and ensure timely response.

## Building Custom Dashboards

- Pin metric charts from multiple resources
- Use **Workbooks** for interactive reports
- Share dashboards with your team via Azure Portal

---

Monitor end-to-end application health by analyzing real usage metrics, dependencies, and response times.

![The image is a slide titled "Analyzing Metrics by Using Collected Telemetry, Including Usage and Application Performance," listing topics like monitoring application performance, analyzing usage metrics, custom dashboards in Azure Monitor, and best practices.](https://kodekloud.com/kk-media/image/upload/v1752867322/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Introduction/analyzing-metrics-telemetry-application-performance.jpg)

## Best Practices

- Enable **Application Insights** for distributed tracing
- Define **Failure Anomalies** to catch performance regressions
- Leverage **Live Metrics Stream** during load testing
- Tag resources consistently for grouped telemetry analysis

---

- [Azure Monitor Overview](https://docs.microsoft.com/azure/azure-monitor/overview)
- [Application Insights Documentation](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview)
- [Configure Azure Alert Rules](https://docs.microsoft.com/azure/azure-monitor/alerts/alerts-unified)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/473876ba-f35b-4ae7-a361-3fc9572e593d/lesson/09ccd487-b457-4d05-a6b9-5152368c62a1)**
>
> Watch video content
