# Introduction to AWS CloudWatch Key Features - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-CloudWatch/Introduction-to-Observability-in-AWS/Introduction-to-AWS-CloudWatch-Key-Features)

---

## Table of Contents

- Introduction to AWS CloudWatch Key Features
  - What Is AWS CloudWatch?
  - Why Full-Stack Observability Matters
  - AWS CloudWatch Feature Overview
  - Deep Dive: Key Features
  - Next Steps
  - References and Further Reading
  - Watch Video
    - 1. Alarms
    - 2. Rules
    - 3. Real User Monitoring (RUM)
    - 4. Metrics Insights
    - 5. Events
    - 6. Logs
    - 7. CloudWatch Synthetics

---

## Content

AWS CloudWatch

Introduction to Observability in AWS

# Introduction to AWS CloudWatch Key Features

Welcome! In this guide, you’ll learn how to build a centralized observability system in AWS using CloudWatch. You’ll see how to configure alarms, notifications, logging, and more—so you can maintain application health and swiftly diagnose issues.

![The image illustrates AWS CloudWatch use cases, focusing on building centralized alarms, notifications, logging, and observability systems, with a detailed architecture diagram of AWS services.](https://kodekloud.com/kk-media/image/upload/v1752862533/notes-assets/images/AWS-CloudWatch-Introduction-to-AWS-CloudWatch-Key-Features/aws-cloudwatch-use-cases-architecture.jpg)

## What Is AWS CloudWatch?

AWS CloudWatch is a unified monitoring service that collects metrics, logs, and events from your AWS resources, applications, and on-premises systems. It provides:

- **Full-stack visibility**: From infrastructure (EC2, Lambda) to application layers.
- **Centralized dashboarding**: Aggregate data in one place.
- **Automated actions**: Trigger alerts, runbooks, or remediation workflows.

> [!important]
> **Note**
>
> CloudWatch integrates seamlessly with [AWS services](https://aws.amazon.com/products/management-and-governance/cloudwatch/) like EC2, RDS, Lambda, and EventBridge to give you holistic insight.

## Why Full-Stack Observability Matters

- **Early issue detection**: Catch anomalies before they impact users.
- **Faster troubleshooting**: Correlate logs, metrics, and traces in one console.
- **Cost optimization**: Identify underutilized resources.

![The image is an introduction to AWS CloudWatch, highlighting its key features such as alarms, rules, RUM, metrics insights, events, logs, and synthetics.](https://kodekloud.com/kk-media/image/upload/v1752862534/notes-assets/images/AWS-CloudWatch-Introduction-to-AWS-CloudWatch-Key-Features/aws-cloudwatch-introduction-key-features.jpg)

## AWS CloudWatch Feature Overview

| Feature               | Description                                                   | Example Use Case                                           |
| --------------------- | ------------------------------------------------------------- | ---------------------------------------------------------- |
| Alarms                | Notify when metrics breach thresholds                         | Trigger an SNS notification if CPU > 80% for 5 minutes     |
| Rules                 | Automate workflows based on event patterns                    | Run a Lambda function on EC2 state change                  |
| Real User Monitoring  | Collect user session data to analyze performance and behavior | Track page load times for web customers                    |
| Metrics Insights      | Perform SQL-like queries on metric data                       | Analyze trends across multiple dimensions                  |
| Events                | Schedule or respond to infrastructure and application events  | Schedule daily backups; react to Auto Scaling events       |
| Logs                  | Ingest, store, and analyze log data                           | Create dashboards to track error rates in application logs |
| CloudWatch Synthetics | Run canaries to simulate user journeys and API checks         | Verify endpoint availability every 5 minutes               |

## Deep Dive: Key Features

### 1\. Alarms

CloudWatch Alarms monitor metrics and send notifications when values cross thresholds. Use SNS, Lambda, or Auto Scaling actions for immediate response.

Example: Create an alarm for high CPU utilization

```
aws cloudwatch put-metric-alarm \
  --alarm-name HighCPU \
  --metric-name CPUUtilization \
  --namespace AWS/EC2 \
  --statistic Average \
  --period 300 \
  --threshold 80 \
  --comparison-operator GreaterThanThreshold \
  --dimensions Name=InstanceId,Value=i-0123456789abcdef0 \
  --evaluation-periods 2 \
  --alarm-actions arn:aws:sns:us-east-1:123456789012:HighCPUAlert
```

### 2\. Rules

CloudWatch Rules (EventBridge) let you define event patterns or schedules to trigger actions.

Example: Schedule a Lambda function at midnight

```
aws events put-rule \
  --name DailyJob \
  --schedule-expression "cron(0 0 * * ? *)"
```

### 3\. Real User Monitoring (RUM)

RUM captures actual user sessions in web applications to reveal performance bottlenecks and user behavior patterns.

> [!important]
> **Warning**
>
> Monitor RUM data ingestion and retention settings to control costs—especially for high-traffic applications.

### 4\. Metrics Insights

Run advanced, ad-hoc queries on your metrics with a SQL-like language. This helps you spot trends and correlations across large datasets.

### 5\. Events

CloudWatch supports:

- **Time-based events** (scheduled tasks)
- **Event-driven triggers** (e.g., EC2 state changes, CodePipeline transitions)

### 6\. Logs

Centralize application and system logs. Use filters to extract meaningful patterns, set metric filters, and attach alarms.

Example: Create a metric filter for ERROR logs

```
aws logs put-metric-filter \
  --log-group-name /aws/my-app \
  --filter-name ErrorFilter \
  --filter-pattern "ERROR" \
  --metric-transformations \
      metricName=ErrorCount,metricNamespace=MyApp,metricValue=1
```

### 7\. CloudWatch Synthetics

Create canaries—scripts that run on a schedule to simulate user workflows, ping APIs, and validate endpoints.

Example: Define a canary in YAML

```
Name: MyCanary
Schedule:
  Expression: rate(5 minutes)
Source:
  Handler: index.handler
  Script: |
    const synthetics = require('Synthetics');
    // your canary script here
RuntimeVersion: syn-nodejs-puppeteer-3.4
```

## Next Steps

In the following lessons, we'll walk through hands-on examples:

- Deploying alarms and dashboards via Terraform
- Querying Metrics Insights for capacity planning
- Automating log analysis with Lambda

## References and Further Reading

- [AWS CloudWatch Documentation](https://docs.aws.amazon.com/cloudwatch/)
- [Amazon EventBridge (CloudWatch Events)](https://docs.aws.amazon.com/eventbridge/)
- [AWS CloudWatch Synthetics](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloudwatch/module/a65b6879-8775-41aa-b922-a289e26672f0/lesson/4de74e05-5050-475b-b2c5-a73048044fe7)**
>
> Watch video content
