# Container InsightsLambda InsightsContributor InsightsApplication Insights - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-CloudWatch/Cloudwatch-Insights-X-Ray-and-Service-Map/Container-InsightsLambda-InsightsContributor-InsightsApplication-Insights)

---

## Table of Contents

- Container InsightsLambda InsightsContributor InsightsApplication Insights
  - Container Insights
  - Lambda Insights
  - Contributor Insights
  - Application Insights
  - Links and References
  - Watch Video
    - Key Features
    - Key Features
    - Key Features
    - Key Features

---

## Content

AWS CloudWatch

Cloudwatch Insights X Ray and Service Map

# Container InsightsLambda InsightsContributor InsightsApplication Insights

Welcome back! In this guide, we’ll explore four AWS CloudWatch Insights tools—Container Insights, Lambda Insights, Contributor Insights, and Application Insights—and show how they help you monitor, troubleshoot, and optimize your applications under any workload.

Use case scenario: Imagine preparing an e-commerce platform for Black Friday traffic. You need real-time visibility across containers, serverless functions, and microservices to ensure uptime and performance. Let’s dive in.

| Insight Type         | Primary Use Case                                             | Key Benefit                               |
| -------------------- | ------------------------------------------------------------ | ----------------------------------------- |
| Container Insights   | Monitoring containerized applications (EKS, ECS, Kubernetes) | Unified metrics and logs for clusters     |
| Lambda Insights      | Observability for AWS Lambda functions                       | Spot function outliers and memory leaks   |
| Contributor Insights | High-cardinality event analytics for microservices           | Pinpoint source of errors and slowdowns   |
| Application Insights | End-to-end web application monitoring                        | Auto-detect errors and performance issues |

---

## Container Insights

When running microservices in containers, you need a holistic view of CPU, memory, network, and logs—all in one dashboard. Container Insights collects, aggregates, and visualizes these metrics so you can take action before small issues become outages.

![The image illustrates a concept of "Container Insights" with icons representing containers, gears, and users, leading to a central insight symbol surrounded by settings icons.](https://kodekloud.com/kk-media/image/upload/v1752862498/notes-assets/images/AWS-CloudWatch-Container-InsightsLambda-InsightsContributor-InsightsApplication-Insights/container-insights-icons-gears-users.jpg)

### Key Features

| Feature                         | Description                                                           |
| ------------------------------- | --------------------------------------------------------------------- |
| Performance Monitoring          | Track CPU, memory, disk I/O, and network throughput in real time.     |
| Log Analytics & Troubleshooting | Search, filter, and correlate container logs across clusters.         |
| Auto-Scaling Integration        | Trigger scaling policies based on custom metrics from your workloads. |
| Pay-As-You-Go Pricing           | Only pay for the metrics and logs you collect; no upfront costs.      |

> [!important]
> **Enabling Container Insights**
>
> You can enable Container Insights via the AWS Management Console, CLI, or CloudFormation in just a few clicks—no code changes required.

![The image is a slide titled "Container Insights" with three sections: Performance Monitoring, Log Analytics and Troubleshooting, and Pricing, each with an icon and number.](https://kodekloud.com/kk-media/image/upload/v1752862499/notes-assets/images/AWS-CloudWatch-Container-InsightsLambda-InsightsContributor-InsightsApplication-Insights/container-insights-performance-log-pricing.jpg)

---

## Lambda Insights

If your architecture relies on AWS Lambda for event-driven workloads (e.g., S3 triggers, EventBridge rules), Lambda Insights centralizes performance metrics and logs so you don’t have to investigate each function separately.

![The image illustrates a process flow involving Lambda functions, tools, and users, leading to a central "Lambda Insight" component, surrounded by configuration icons.](https://kodekloud.com/kk-media/image/upload/v1752862500/notes-assets/images/AWS-CloudWatch-Container-InsightsLambda-InsightsContributor-InsightsApplication-Insights/lambda-functions-process-flow-diagram.jpg)

### Key Features

- Easy Setup: Enable instrumentation without modifying your existing code or deployment pipeline.
- Real-Time Metrics: Monitor execution duration, memory usage, cold starts, and concurrency.
- Bottleneck Detection: Quickly identify functions that exceed thresholds or show anomalous behavior.
- Cost Allocation: Break down Lambda charges by function to optimize spend.

> [!important]
> **Pricing Insights**
>
> Lambda Insights incurs a small additional cost per metric and log, but gives you actionable data to reduce overall Lambda spend.

![The image is a slide titled "Lambda Insights" with four sections: Easy Setup, Operational Visibility, Monitoring and Optimization, and Pricing, each represented by an icon and number.](https://kodekloud.com/kk-media/image/upload/v1752862501/notes-assets/images/AWS-CloudWatch-Container-InsightsLambda-InsightsContributor-InsightsApplication-Insights/lambda-insights-setup-visibility-monitoring-pricing.jpg)

---

## Contributor Insights

Contributor Insights provides real-time analytics on high-cardinality data (user IDs, API endpoints, order IDs) so you can pinpoint which component in your transaction pipeline is causing issues.

![The image outlines three aspects of "Contributor Insights": High-Cardinality Data Analysis, Performance Impact Identification, and Data Aggregation and Discovery.](https://kodekloud.com/kk-media/image/upload/v1752862502/notes-assets/images/AWS-CloudWatch-Container-InsightsLambda-InsightsContributor-InsightsApplication-Insights/contributor-insights-data-analysis-performance.jpg)

### Key Features

| Feature                           | Benefit                                                              |
| --------------------------------- | -------------------------------------------------------------------- |
| High-Cardinality Analysis         | Drill into unique keys (e.g., user ID, session ID) to spot hotspots. |
| Performance Impact Identification | Correlate slow API calls or retries with downstream resource errors. |
| Trend Aggregation & Alerts        | Aggregate events over time, set thresholds, and receive alerts.      |

> [!important]
> **Scaling Consideration**
>
> Contributor Insights shines as your microservice count grows. Use it proactively in production to detect anomalies early.

---

## Application Insights

For full-stack web applications—like a live video streaming site—Application Insights offers automatic error detection, performance tracing, and dependency mapping to keep end users happy.

![The image shows a slide titled "Application Insights" with two sections: "Web Application Monitoring" and "Telemetry Data Utilization," each with an icon and number.](https://kodekloud.com/kk-media/image/upload/v1752862503/notes-assets/images/AWS-CloudWatch-Container-InsightsLambda-InsightsContributor-InsightsApplication-Insights/application-insights-web-monitoring-telemetry.jpg)

### Key Features

- Web Application Monitoring: Auto-discover exceptions, HTTP 5XX errors, and latency spikes.
- Dependency Mapping: Visualize calls to databases, caches, and external APIs.
- Telemetry Dashboard: Combine user, performance, and operational data in one view.

> [!important]
> **Use Case Recommendation**
>
> Application Insights adds overhead—enable it for mission-critical applications where user experience metrics are essential.

---

## Links and References

- AWS CloudWatch Container Insights
- AWS Lambda Insights
- AWS Contributor Insights
- AWS Application Insights
- [AWS CloudWatch Documentation](https://docs.aws.amazon.com/cloudwatch)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloudwatch/module/d95c04dd-f122-4f6b-93dc-d0b2fe015b29/lesson/4fd5cf99-a4b3-4068-8f06-5264c6887e73)**
>
> Watch video content
