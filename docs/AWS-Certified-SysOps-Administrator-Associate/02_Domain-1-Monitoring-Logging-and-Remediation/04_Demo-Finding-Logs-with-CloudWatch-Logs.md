# Demo Finding Logs with CloudWatch Logs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-1-Monitoring-Logging-and-Remediation/Demo-Finding-Logs-with-CloudWatch-Logs)

---

## Table of Contents

- Demo Finding Logs with CloudWatch Logs
  - Navigating to CloudWatch Logs
  - Understanding Log Groups and Streams
  - Example: Log Events from a SageMaker Notebook
  - Summary
  - Watch Video
    - Exploring Log Streams

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 1 Monitoring Logging and Remediation

# Demo Finding Logs with CloudWatch Logs

Welcome to this guide on effectively locating logs within AWS CloudWatch Logs. In this walkthrough, you will learn how to navigate the AWS Management Console and use CloudWatch Logs to monitor, query, and analyze log data.

## Navigating to CloudWatch Logs

Once you have logged into the AWS Management Console, navigate to the [CloudWatch service](https://aws.amazon.com/cloudwatch/). CloudWatch is comprised of multiple subservices—including logs, metrics, and X-Ray traces—making it a central tool for monitoring your AWS resources. To specifically access log data:

1.  Click on **Logs** in the sidebar.
2.  Note that logs are organized by log groups, which you either specify when writing logs or are automatically assigned by the system.

> [!important]
> **Important**
>
> Before using live tailing, Log Insights, or similar features, ensure you are accessing the appropriate log group that holds the desired logs.

Below is an image illustrating the list of log groups available in your account:

![The image shows an AWS CloudWatch interface displaying a list of log groups with options to configure settings and view details.](https://kodekloud.com/kk-media/image/upload/v1752859907/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Finding-Logs-with-CloudWatch-Logs/aws-cloudwatch-log-groups-interface.jpg)

## Understanding Log Groups and Streams

In the log groups view, you will see all active log groups associated with your AWS account. This includes log groups for services such as Lambda, SageMaker, Network Firewall, and Route 53 Resolver. In this demonstration, we focus on **VPC flow logs**—a premier resource for analyzing network traffic.

When you click on the VPC flow logs group, you are presented with a detailed view where you can:

- Start tailing logs live.
- View logs using Log Insights.
- Run custom queries.
- Create metric filters.

The interface also displays several sub-sections like filters, subscription filters, metric filters, anomaly detection, data protection, and contributor insights. The primary area for reviewing the log data is the **Log Streams** panel.

Below is an image showing the detailed view of a VPC flow log group, including the log streams and available actions:

![The image shows an AWS CloudWatch interface displaying details of a log group named "vpcFlowLog," including log class, ARN, creation time, and retention period. It also lists log streams and provides options for actions like viewing in Logs Insights and starting tailing.](https://kodekloud.com/kk-media/image/upload/v1752859908/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Finding-Logs-with-CloudWatch-Logs/aws-cloudwatch-vpcflowlog-details.jpg)

### Exploring Log Streams

Each log stream name typically represents an Elastic Network Interface (ENI), which serves as a virtual network card linked to your AWS resources. By clicking the caret next to a log stream, you can expand it to view:

- Timestamps.
- Specific ENI details.
- Network packet flow information.

For instance, if you find a log stream recording accepted traffic, it indicates successful transmissions as opposed to denied traffic, and includes source and destination IP addresses.

Below is an image that displays detailed log events within the CloudWatch interface, including timestamps and status codes:

![The image shows an AWS CloudWatch interface displaying log events with timestamps and messages, detailing network activity and status codes. The left sidebar includes navigation options like Log groups, Metrics, and Events.](https://kodekloud.com/kk-media/image/upload/v1752859910/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Finding-Logs-with-CloudWatch-Logs/aws-cloudwatch-log-events-interface.jpg)

## Example: Log Events from a SageMaker Notebook

Next, consider an example using a SageMaker notebook instance. This log group may contain historical logs from sessions where Jupyter was active. The log stream in such cases contains system-generated logs indicating warnings and errors. For example, you might see an entry noting that a notebook cell is missing an ID field—information that is crucial for troubleshooting.

Below is an image showing the log events for a Jupyter notebook instance, complete with timestamps and messages:

![The image shows an AWS CloudWatch interface displaying log events for a Jupyter notebook instance, with timestamps and messages detailing various warnings and errors.](https://kodekloud.com/kk-media/image/upload/v1752859911/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Finding-Logs-with-CloudWatch-Logs/aws-cloudwatch-jupyter-logs.jpg)

## Summary

CloudWatch Logs organizes log data into log groups and log streams. Whether you are analyzing VPC flow logs or SageMaker notebook logs, you have access to powerful tools including:

- Live tailing.
- Log Insights.
- Metric filters.
- Exporting logs to S3 (if needed).

This guide provides a comprehensive overview of how to find and manage logs within AWS CloudWatch Logs, empowering you to streamline troubleshooting and performance analysis in your AWS environment.

For additional information, check out the [AWS CloudWatch Documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/e7f728df-5d8d-4dbb-80f6-33c15cde3034/lesson/49cbf451-1ee9-4641-b346-4f148ea0362c)**
>
> Watch video content
