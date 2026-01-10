# What is Cloudwatch agent - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-CloudWatch/CloudWatch-Logs/What-is-Cloudwatch-agent)

---

## Table of Contents

- What is Cloudwatch agent
  - Default Metrics and Their Limitations
  - Introducing the CloudWatch Agent
  - Core Functionalities
  - Pricing Overview
  - Agent Restrictions
  - Links and References
  - Watch Video
    - Custom Metrics
    - Log Collection
    - High-Resolution Data

---

## Content

AWS CloudWatch

CloudWatch Logs

# What is Cloudwatch agent

Welcome to our deep dive into the AWS CloudWatch Agent—a powerful service for collecting and monitoring metrics and logs from EC2 instances and on-premises servers. Building on core CloudWatch Logs concepts (log groups, streams, and events), the CloudWatch Agent unlocks granular insights and real-time analysis beyond the default metrics.

## Default Metrics and Their Limitations

By default, AWS CloudWatch gathers EC2 metrics (CPU utilization, disk I/O, network traffic) at five-minute intervals. While useful for high-level monitoring, this resolution may be inadequate when you need:

- Near real-time visibility into application performance
- Detailed custom metrics (e.g., request latency, queue depths)
- Centralized log streaming alongside metrics

If five-minute granularity or basic OS metrics aren’t enough, the CloudWatch Agent provides the solution.

## Introducing the CloudWatch Agent

The CloudWatch Agent is a self-managed package you install on EC2 instances, servers, or virtual machines. It enables you to:

- Push **application-specific metrics** directly to CloudWatch
- Stream **log files** (Apache, Nginx, system logs) in real time
- Capture metrics as frequently as **one-second intervals**
- Build rich dashboards, set alarms, and automate responses

Once deployed across your fleet, the agent sends both default and custom data to CloudWatch, where you can convert logs into metrics, visualize trends, and trigger notifications.

![The image is a diagram illustrating the AWS CloudWatch Agent setup, showing an EC2 instance sending default metrics at 5-minute intervals and custom application logs/metrics at 1-second intervals to AWS CloudWatch.](https://kodekloud.com/kk-media/image/upload/v1752862472/notes-assets/images/AWS-CloudWatch-What-is-Cloudwatch-agent/aws-cloudwatch-agent-setup-diagram.jpg)

## Core Functionalities

CloudWatch Agent extends built-in monitoring by:

- Collecting **application-level metrics** (business KPIs, custom counters)
- Displaying all metrics together in **CloudWatch Dashboards**
- Capturing **memory, disk, and other OS metrics** not available by default
- Eliminating third-party monitoring agents and licensing fees

![The image outlines the features of CloudWatch Agents, highlighting functionality such as custom metrics, log collection, and viewing metrics in Amazon CloudWatch. It also mentions EC2 monitoring dashboards and the absence of a need for third-party software installation.](https://kodekloud.com/kk-media/image/upload/v1752862473/notes-assets/images/AWS-CloudWatch-What-is-Cloudwatch-agent/cloudwatch-agents-features-metrics-logs.jpg)

### Custom Metrics

Configure the agent to emit any numeric data—request counts, error rates, business KPIs—to CloudWatch. These custom metrics appear alongside default metrics, empowering you to:

- Monitor application health in real time
- Create alarms on business-critical thresholds
- Visualize trends over time in dashboards

### Log Collection

With simple configuration, the agent tails specified log files and streams entries directly to CloudWatch Logs. Centralized log management enables you to:

- Search and filter across all logs
- Run Log Insights queries for troubleshooting
- Generate alerts on error patterns

![The image is a slide titled "Features of Cloudwatch Agents," highlighting the "Log collection" feature, which includes collecting and streaming logs to CloudWatch Logs, enabling centralized log management, and noting that EC2 monitoring dashboards lack built-in log collection and streaming.](https://kodekloud.com/kk-media/image/upload/v1752862474/notes-assets/images/AWS-CloudWatch-What-is-Cloudwatch-agent/cloudwatch-agents-log-collection-features.jpg)

### High-Resolution Data

For performance-sensitive workloads, the agent captures metrics at **1-second intervals**—a 300× improvement over the default. High-resolution data helps you:

- Detect transient spikes in CPU, memory, or I/O
- Tune autoscaling policies more precisely
- Troubleshoot performance degradation quickly

![The image lists features of CloudWatch Agents, highlighting "Higher resolution data" which enables high-resolution data collection at 1-second intervals and provides more granular insights.](https://kodekloud.com/kk-media/image/upload/v1752862475/notes-assets/images/AWS-CloudWatch-What-is-Cloudwatch-agent/cloudwatch-agents-higher-resolution-data.jpg)

## Pricing Overview

Using the CloudWatch Agent incurs minimal incremental costs:

| Resource       | Pricing                    |
| -------------- | -------------------------- |
| Custom metrics | $0.30 per metric per month |
| Logs ingestion | $0.50 per GB ingested      |

Example monthly spend:

- 320 custom metrics → 320 × $0.30 = $96
- 10 GB logs ingested → 10 × $0.50 = $5
- **Total ~ $101**

Compared to third-party tools (licensing, hosting), AWS CloudWatch Agent offers a cost-effective, integrated solution.

![The image is a slide titled "Features of Cloudwatch Agents," highlighting the "Logs pricing" feature with details on ingested log costs, an example of metrics, monthly log cost, and total CloudWatch cost.](https://kodekloud.com/kk-media/image/upload/v1752862476/notes-assets/images/AWS-CloudWatch-What-is-Cloudwatch-agent/cloudwatch-agents-logs-pricing-features.jpg)

## Agent Restrictions

Be aware of these limitations when deploying the CloudWatch Agent:

- **Log event size limit:** Each log event must be ≤ 256 KB and batch requests cannot exceed 1 MB.
- **SSM Agent requirement:** To install via AWS Systems Manager, the SSM Agent must be version ≥ 2.2.93.

> [!important]
> **Log Event Size Limit**
>
> Events larger than 256 KB are skipped. Ensure your application splits large log entries before shipping.> [!important]
> **SSM Agent Version Requirement**
>
> If your instance runs an older SSM Agent, update it to version ≥ 2.2.93 before installing the CloudWatch Agent.

![The image outlines features and restrictions of CloudWatch Agents, including log size limits and installation requirements. It highlights specific metrics and pricing considerations.](https://kodekloud.com/kk-media/image/upload/v1752862478/notes-assets/images/AWS-CloudWatch-What-is-Cloudwatch-agent/cloudwatch-agents-features-restrictions.jpg)

---

That wraps up our overview of the AWS CloudWatch Agent. In the next hands-on section, you’ll learn to install the agent on an EC2 instance and begin streaming custom metrics and logs.

## Links and References

- [AWS CloudWatch Agent Documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Install-CloudWatch-Agent.html)
- [CloudWatch Logs Insights](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_QuerySyntax.html)
- [AWS Systems Manager Agent](https://docs.aws.amazon.com/systems-manager/latest/userguide/ssm-agent.html)
- [AWS CloudWatch Pricing](https://aws.amazon.com/cloudwatch/pricing/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloudwatch/module/9fa50074-5184-4ea1-a0fb-233788bf9666/lesson/2a46d937-0cd1-4052-90db-1047719dc2aa)**
>
> Watch video content
