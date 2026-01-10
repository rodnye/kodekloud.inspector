# Demo Memory Stress on EKS Part 2 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Chaos-Engineering/Chaos-Engineering-on-Kubernetes-EKS/Demo-Memory-Stress-on-EKS-Part-2)

---

## Table of Contents

- Demo Memory Stress on EKS Part 2
  - Observability Tools and Key Metrics
  - 1. CloudWatch Container Insights
  - 2. Service-Level Performance Dashboard
  - 3. Real User Monitoring (RUM)
  - 4. Page Load Metrics Overview
  - Next Steps
  - Links and References
  - Watch Video

---

## Content

Chaos Engineering

Chaos Engineering on Kubernetes EKS

# Demo Memory Stress on EKS Part 2

In this lesson, we’ll establish a steady-state baseline for our Amazon EKS application by collecting metrics from three AWS observability tools. This prepares us to measure the impact of our Fault Injection Service (FIS) memory‐stress experiment.

> [!important]
> **Note**
>
> Establishing a steady-state baseline is crucial before running any chaos experiment. It helps you distinguish normal behavior from fault-induced anomalies.

## Observability Tools and Key Metrics

| Observability Tool               | Focus            | Key Metrics                                                         |
| -------------------------------- | ---------------- | ------------------------------------------------------------------- |
| CloudWatch Container Insights    | Cluster-level    | CPU & memory utilization, alarms                                    |
| CloudWatch Performance Dashboard | Service-level    | Running pods, CPU utilization, memory use                           |
| CloudWatch RUM                   | End-user metrics | Largest Contentful Paint (LCP), First Input Delay (FID), UX ratings |

---

## 1\. CloudWatch Container Insights

To begin, navigate to the [CloudWatch Container Insights](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/ContainerInsights.html) dashboard and select your EKS cluster. Here you can view overall CPU and memory utilization, cluster state summaries, and alarm statuses.

![The image shows an AWS CloudWatch Container Insights dashboard for Amazon EKS, displaying cluster state summaries, performance metrics, and alarm states.](https://kodekloud.com/kk-media/image/upload/v1752871865/notes-assets/images/Chaos-Engineering-Demo-Memory-Stress-on-EKS-Part-2/aws-cloudwatch-eks-container-insights-dashboard.jpg)

This baseline snapshot reveals how your cluster performs under normal conditions.

---

## 2\. Service-Level Performance Dashboard

Next, go to the **Services** section under CloudWatch performance dashboards. Wait for the metrics to load, then review:

- Number of running pods
- Pod CPU utilization
- Pod memory utilization

![The image shows an AWS CloudWatch dashboard for monitoring service performance, displaying metrics like the number of running pods, CPU utilization, and memory utilization for a service named "PetSite."](https://kodekloud.com/kk-media/image/upload/v1752871866/notes-assets/images/Chaos-Engineering-Demo-Memory-Stress-on-EKS-Part-2/aws-cloudwatch-dashboard-petsite-metrics.jpg)

Inspect the time-series graphs to see how these values evolve in real time.

![The image shows an AWS CloudWatch dashboard displaying performance metrics for various services, including graphs of pod CPU utilization and a list of services with their average values.](https://kodekloud.com/kk-media/image/upload/v1752871868/notes-assets/images/Chaos-Engineering-Demo-Memory-Stress-on-EKS-Part-2/aws-cloudwatch-dashboard-performance-metrics.jpg)

---

## 3\. Real User Monitoring (RUM)

For end-user experience, use [CloudWatch RUM](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-RUM.html). Select your PetSite RUM app monitor to view session quality:

- **Positive**
- **Tolerable**
- **Frustrating**

The current “Frustrating” rate is 0.9%, indicating most user sessions are performing well.

![The image shows a dashboard from AWS CloudWatch displaying metrics for "Largest Contentful Paint" and "First Input Delay," with graphs indicating performance over several days. The metrics are categorized into positive, tolerable, and frustrating levels.](https://kodekloud.com/kk-media/image/upload/v1752871869/notes-assets/images/Chaos-Engineering-Demo-Memory-Stress-on-EKS-Part-2/aws-cloudwatch-lcp-fid-metrics-dashboard.jpg)

---

## 4\. Page Load Metrics Overview

Finally, review the page load times and Cumulative Layout Shift (CLS) trends to understand the front-end impact before fault injection.

![The image shows an AWS CloudWatch dashboard displaying metrics related to page load times and cumulative layout shift, with graphs indicating performance over several days in July 2024. The sidebar includes options for logs, metrics, and application signals.](https://kodekloud.com/kk-media/image/upload/v1752871870/notes-assets/images/Chaos-Engineering-Demo-Memory-Stress-on-EKS-Part-2/aws-cloudwatch-dashboard-page-load-metrics.jpg)

---

## Next Steps

In the next demo, we’ll execute our FIS memory‐stress experiment and revisit these dashboards to observe how injected faults affect cluster health, service performance, and user experience.

## Links and References

- [AWS CloudWatch Container Insights Documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/ContainerInsights.html)
- [AWS CloudWatch RUM Documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-RUM.html)
- [AWS Fault Injection Simulator (FIS)](https://docs.aws.amazon.com/fis/latest/userguide/)
- [Amazon EKS User Guide](https://docs.aws.amazon.com/eks/latest/userguide/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/chaos-engineering/module/67947884-154a-43e4-a0cf-1137e1264eee/lesson/9de307a6-02e0-477d-a658-ce9c14bb4de4)**
>
> Watch video content
