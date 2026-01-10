# Establishing Steady State Metrics Using Cloudwatch RUMX Ray - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Chaos-Engineering/Introduction-to-Real-life-Application/Establishing-Steady-State-Metrics-Using-Cloudwatch-RUMX-Ray)

---

## Table of Contents

- Establishing Steady State Metrics Using Cloudwatch RUMX Ray
  - 1. Real User Monitoring (RUM)
  - 2. CloudWatch Container Insights for Amazon EKS
  - 3. AWS X-Ray Trace Map
  - Links and References
  - Watch Video

---

## Content

Chaos Engineering

Introduction to Real life Application

# Establishing Steady State Metrics Using Cloudwatch RUMX Ray

After generating load against both the website and its containerized services, it’s essential to capture your baseline performance before introducing faults. AWS offers a suite of observability tools—CloudWatch RUM, Container Insights, and X-Ray—that together provide a complete view of front-end and back-end health.

## 1\. Real User Monitoring (RUM)

CloudWatch RUM collects key browser metrics from actual users, helping you understand page-load performance and interactivity. We’ve enabled RUM on our homepage; let’s examine the dashboards.

> [!important]
> **Note**
>
> Ensure RUM is configured on all critical user flows to gather representative web vitals.

| Metric                   | Description                                                        |
| ------------------------ | ------------------------------------------------------------------ |
| Largest Contentful Paint | Time to render the largest visible element (LCP)                   |
| First Input Delay        | Delay before the page responds to the first user interaction (FID) |
| Page Load Success Rate   | Percentage of page loads without errors                            |

![The image shows an AWS CloudWatch dashboard displaying web vitals, including metrics for "Largest Contentful Paint" and "First Input Delay," with graphs indicating page load performance over time.](https://kodekloud.com/kk-media/image/upload/v1752871944/notes-assets/images/Chaos-Engineering-Establishing-Steady-State-Metrics-Using-Cloudwatch-RUMX-Ray/aws-cloudwatch-dashboard-web-vitals.jpg)

The **Web Vitals** dashboard tracks LCP and FID over time, showing how fast your pages load and respond for real users.

![The image shows an AWS CloudWatch dashboard displaying performance metrics for a web application, including page loads, load time, and errors.](https://kodekloud.com/kk-media/image/upload/v1752871945/notes-assets/images/Chaos-Engineering-Establishing-Steady-State-Metrics-Using-Cloudwatch-RUMX-Ray/aws-cloudwatch-dashboard-performance-metrics.jpg)

The **Performance Metrics** view details page loads, average load times, and error counts. With a ~85% success rate and minimal slow loads, this serves as our front-end baseline.

## 2\. CloudWatch Container Insights for Amazon EKS

Switch to **Container Insights** in the CloudWatch console and select **EKS Performance Monitoring**. You can filter metrics by nodes, namespaces, pods, or containers.

| Component  | Key Metrics                              |
| ---------- | ---------------------------------------- |
| Nodes      | CPU utilization, Memory usage, Pod count |
| Namespaces | Request rate, Error rate, Throughput     |
| Pods       | Latency, Restart count, Health status    |
| Containers | CPU/Memory limits, Network I/O           |

![The image shows an AWS CloudWatch Container Insights dashboard for monitoring node performance, displaying metrics like node status, pods per node, CPU utilization, and memory utilization.](https://kodekloud.com/kk-media/image/upload/v1752871947/notes-assets/images/Chaos-Engineering-Establishing-Steady-State-Metrics-Using-Cloudwatch-RUMX-Ray/aws-cloudwatch-container-insights-dashboard.jpg)

With these metrics, you establish a back-end baseline for cluster health, resource utilization, and workload distribution.

## 3\. AWS X-Ray Trace Map

AWS X-Ray offers end-to-end request tracing across services such as EC2, Lambda, and API Gateway. Use the trace map to pinpoint latency hotspots and error sources.

> [!important]
> **Warning**
>
> Trace sampling needs to be set appropriately. Over-sampling can increase costs, while under-sampling may hide critical issues.

![The image shows an AWS CloudWatch X-Ray console displaying a trace map for an EC2 instance named "PetSite," with metrics on latency, requests, and faults over time.](https://kodekloud.com/kk-media/image/upload/v1752871948/notes-assets/images/Chaos-Engineering-Establishing-Steady-State-Metrics-Using-Cloudwatch-RUMX-Ray/aws-cloudwatch-xray-ec2-trace-map.jpg)

Drill down into individual segments—such as the client calling the PetSite EC2 instance—to view detailed latency, request, and fault counts.

---

By capturing steady-state metrics from CloudWatch RUM, Container Insights, and X-Ray, you’ll have a robust performance baseline. Use these figures to compare against results after injecting faults, ensuring you can accurately gauge the resilience and reliability of your application.

## Links and References

- [AWS CloudWatch RUM](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-RUM.html)
- [Container Insights in CloudWatch](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/ContainerInsights.html)
- [AWS X-Ray Developer Guide](https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html)
- [Chaos Engineering on AWS](https://aws.amazon.com/chaos-engineering/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/chaos-engineering/module/a6b84b48-a401-48a4-8278-0be5a8bb0d38/lesson/1ba58612-242c-44f8-98f6-aba1a4762d6a)**
>
> Watch video content
