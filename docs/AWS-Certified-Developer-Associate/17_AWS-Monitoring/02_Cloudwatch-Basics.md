# Cloudwatch Basics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/AWS-Monitoring/Cloudwatch-Basics)

---

## Table of Contents

- Cloudwatch Basics
  - How CloudWatch Works
  - Metrics in CloudWatch
  - Logs in CloudWatch
  - Summary
  - Watch Video
    - Key Components of CloudWatch
    - Namespaces
    - Dimensions
    - Metric Resolution
    - Log Groups and Log Streams
    - CloudWatch Log Insights
    - CloudWatch Agents

---

## Content

AWS Certified Developer - Associate

AWS Monitoring

# Cloudwatch Basics

AWS CloudWatch is a powerful monitoring service that provides real-time insights into your AWS services, resources, and the applications running on them. It collects and tracks metrics and logs, and it can trigger notifications when predefined alarms are activated. This article explains how CloudWatch works, its key components, and how you can leverage it to optimize your infrastructure performance.

## How CloudWatch Works

When your services and applications—whether hosted on AWS or externally—generate logs and metrics, CloudWatch collects these data points into a centralized location. This enables you to monitor and query your entire infrastructure effortlessly. For example, you can configure an alarm to activate if CPU utilization exceeds 70%, triggering actions such as sending an email or publishing a message to an SNS topic.

CloudWatch also offers CloudWatch Metrics Insights, a powerful SQL-like querying tool that allows you to extract detailed insights from your metrics.

![The image is a diagram explaining how AWS CloudWatch works, showing the flow from AWS Cloud, custom applications, and logs to CloudWatch, which then provides metrics, alarms, and insights to SNS and a management console.](https://kodekloud.com/kk-media/image/upload/v1752858307/notes-assets/images/AWS-Certified-Developer-Associate-Cloudwatch-Basics/aws-cloudwatch-diagram-flow.jpg)

Beyond monitoring and logging, CloudWatch integrates seamlessly with other AWS services. For instance, when monitoring an EC2 instance within an Auto Scaling group, CloudWatch analyzes metrics like CPU utilization or network traffic. If a metric exceeds its threshold, CloudWatch can automatically adjust the number of instances in the Auto Scaling group.

### Key Components of CloudWatch

CloudWatch is built on several fundamental components:

- **Metrics:** Data points that can be visualized on dashboards.
- **Alarms:** Automated triggers that perform defined actions when certain thresholds are crossed.
- **Logs:** Storage and search capabilities for application and system logs.
- **Events (EventBridge):** Real-time event routing to different targets.
- **Dashboards:** Customizable views for monitoring your environment.

![The image is a diagram of CloudWatch components, including Metrics, Alarms, Logs, Events, and Dashboards, each with specific subcategories.](https://kodekloud.com/kk-media/image/upload/v1752858308/notes-assets/images/AWS-Certified-Developer-Associate-Cloudwatch-Basics/cloudwatch-components-diagram.jpg)

## Metrics in CloudWatch

AWS services automatically send metrics to CloudWatch upon deployment. For example, when you launch an EC2 instance or create a Lambda function, default metrics such as CPU utilization, network packets, invocation counts, and errors are published without extra configuration.

![The image is a diagram titled "Metrics," showing six metrics: CPU Utilization, Network Packets In, Disk Read Ops, Invocations, Errors, and Throttles, arranged in a circular layout with icons.](https://kodekloud.com/kk-media/image/upload/v1752858310/notes-assets/images/AWS-Certified-Developer-Associate-Cloudwatch-Basics/metrics-diagram-circular-layout.jpg)

### Namespaces

A namespace in CloudWatch acts as a container for metrics, isolating data so that metrics from one application or service do not mix with others.

> [!important]
> **Note**
>
> Each AWS service automatically groups its metrics in its own namespace, such as AWS/ECS for ECS metrics or another namespace for Elastic Load Balancer metrics.

![The image shows a comparison of error metrics for two applications, App1 and App2, with different error counts listed for each.](https://kodekloud.com/kk-media/image/upload/v1752858311/notes-assets/images/AWS-Certified-Developer-Associate-Cloudwatch-Basics/error-metrics-comparison-app1-app2.jpg)

![The image shows a table listing various AWS services alongside their corresponding namespaces. It also includes a note stating that metrics for each AWS service are grouped in their respective namespaces.](https://kodekloud.com/kk-media/image/upload/v1752858312/notes-assets/images/AWS-Certified-Developer-Associate-Cloudwatch-Basics/aws-services-namespaces-table.jpg)

### Dimensions

Dimensions are key-value pairs that provide additional context for each metric. For instance, a metric for disk read bytes might include dimensions such as the disk identifier or the EC2 instance ID, helping to pinpoint performance characteristics more accurately.

![The image explains "Metrics – Dimensions," showing how labels associated with a metric provide additional information, with examples like DiskReadBytes and MemoryUtilization.](https://kodekloud.com/kk-media/image/upload/v1752858313/notes-assets/images/AWS-Certified-Developer-Associate-Cloudwatch-Basics/metrics-dimensions-labels-explanation.jpg)

### Metric Resolution

CloudWatch supports two types of metric resolutions:

- **Standard Resolution:** 1-minute granularity (default for AWS services).
- **High Resolution:** 1-second granularity, available for custom metrics.

High-resolution metrics can be retrieved at intervals of 1, 5, 10, 30 seconds, or any multiple of 60 seconds.

![The image explains custom metrics in CloudWatch, highlighting that high-resolution metrics are stored with a 1-second resolution and can be retrieved at specific intervals.](https://kodekloud.com/kk-media/image/upload/v1752858314/notes-assets/images/AWS-Certified-Developer-Associate-Cloudwatch-Basics/custom-metrics-cloudwatch-high-resolution.jpg)

## Logs in CloudWatch

CloudWatch not only collects metrics but also provides a central repository for logs from your applications and systems. You can forward logs from your infrastructure to CloudWatch, enabling centralized analysis and troubleshooting.

![The image illustrates the process of sending and storing system logs to Amazon CloudWatch, with a note that services can be configured to send logs to CloudWatch.](https://kodekloud.com/kk-media/image/upload/v1752858316/notes-assets/images/AWS-Certified-Developer-Associate-Cloudwatch-Basics/system-logs-amazon-cloudwatch.jpg)

### Log Groups and Log Streams

- **Log Groups:** Collections of log streams that share retention, monitoring, and access settings.
- **Log Streams:** Sequences of log events from the same source, such as individual servers or services.

For example, if an application is running on two servers, each server generates its own log stream, and these streams are organized under a single log group for the application.

![The image is a diagram showing log groups and log streams for two applications, "app1" and "app2," being sent to Amazon CloudWatch.](https://kodekloud.com/kk-media/image/upload/v1752858317/notes-assets/images/AWS-Certified-Developer-Associate-Cloudwatch-Basics/log-groups-streams-app1-app2-cloudwatch.jpg)

### CloudWatch Log Insights

CloudWatch Log Insights is a robust query tool that lets you search and analyze logs efficiently. You can run queries across multiple log groups and even across different AWS accounts. Here’s an example query:

```
fields @timestamp, @message, @logStream, @log
| sort @timestamp desc
| limit 1000
```

> [!important]
> **Note**
>
> By default, EC2 instances do not forward logs to CloudWatch. To enable log forwarding, install the CloudWatch agent on your EC2 instances or on-premises servers.

![The image illustrates the process of sending logs from EC2 instances to Amazon CloudWatch. It also notes that the CloudWatch Log Agent can be set up on-premises.](https://kodekloud.com/kk-media/image/upload/v1752858319/notes-assets/images/AWS-Certified-Developer-Associate-Cloudwatch-Basics/ec2-logs-to-cloudwatch-diagram.jpg)

### CloudWatch Agents

There are two main agents for log collection in CloudWatch:

| Agent Type               | Capabilities                |
| ------------------------ | --------------------------- |
| CloudWatch Logs Agent    | Sends logs only             |
| CloudWatch Unified Agent | Sends both logs and metrics |

![The image compares CloudWatch Logs Agent and CloudWatch Unified Agent, highlighting that the former is an older version that only sends logs, while the latter is a newer version that can send both logs and metrics.](https://kodekloud.com/kk-media/image/upload/v1752858320/notes-assets/images/AWS-Certified-Developer-Associate-Cloudwatch-Basics/cloudwatch-logs-agent-comparison.jpg)

## Summary

AWS CloudWatch is an essential tool for monitoring and logging, offering comprehensive insights into your infrastructure. Key takeaways include:

- Metrics are isolated within specific namespaces.
- Dimensions add valuable metadata to your metrics.
- CloudWatch supports both standard and high-resolution metrics.
- Log groups and log streams allow centralized log management.
- EC2 instances need the CloudWatch agent for log forwarding.
- CloudWatch Log Insights facilitates robust log querying and analysis.

![The image is a summary slide with five key points about tracking logs and metrics, metric isolation, dimensions, metric resolutions, and log groups. It features a blue gradient background with the word "Summary" on the left.](https://kodekloud.com/kk-media/image/upload/v1752858321/notes-assets/images/AWS-Certified-Developer-Associate-Cloudwatch-Basics/tracking-logs-metrics-summary.jpg)

For more detailed information on setting up and optimizing your CloudWatch environment, visit the [AWS Official Documentation](https://aws.amazon.com/cloudwatch/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/120498e1-b602-4e0c-afea-2a05f2234bbd/lesson/281ec155-daac-4b7a-a892-10d42835ff52)**
>
> Watch video content
