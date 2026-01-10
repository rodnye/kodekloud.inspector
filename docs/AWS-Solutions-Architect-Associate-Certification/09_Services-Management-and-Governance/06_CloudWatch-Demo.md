# CloudWatch Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Management-and-Governance/CloudWatch-Demo)

---

## Table of Contents

- CloudWatch Demo
  - Logs
  - Log Insights
  - Metrics
  - Creating Alarms
  - Additional Features
  - Dashboards
  - Watch Video
    - Viewing Log Streams

---

## Content

AWS Solutions Architect Associate Certification

Services Management and Governance

# CloudWatch Demo

In this article, we walk through a comprehensive demo of AWS CloudWatch, highlighting its key features and functionalities for monitoring your AWS environment. CloudWatch is more than just a single service—it’s a suite of monitoring tools that manage logs, metrics, alarms, dashboards, and more.

To begin, access CloudWatch by searching for the service in the AWS console. Once on the CloudWatch page, explore the various features available on the left-hand panel. Each feature provides distinct capabilities for monitoring and managing your AWS resources.

![The image shows the AWS CloudWatch dashboard interface, featuring options to set alarms, create dashboards, view logs, and configure application insights.](https://kodekloud.com/kk-media/image/upload/v1752865291/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-CloudWatch-Demo/aws-cloudwatch-dashboard-interface.jpg)

---

## Logs

CloudWatch's centralized log management lets you collect and analyze logs from different services and applications across your AWS account. Logs are organized into log groups based on your configurations or the specific service/resource generating them. This means you can have distinct log groups for your DataSync operations, each Lambda function, or services like AWS Macie.

![The image shows an AWS CloudWatch interface displaying a list of log groups, each with options for data protection, retention, and other settings.](https://kodekloud.com/kk-media/image/upload/v1752865293/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-CloudWatch-Demo/aws-cloudwatch-log-groups-interface.jpg)

### Viewing Log Streams

Within each log group, inspect individual log streams. For example, when you navigate to the logs of a Lambda function (e.g., "test one"), you'll notice several log streams that include timestamps of the last events. Selecting a log stream reveals detailed log data such as initialization messages, invocation details, and function output.

![The image shows an AWS CloudWatch interface displaying a list of log streams with their corresponding last event times. The interface includes options for filtering and managing log streams.](https://kodekloud.com/kk-media/image/upload/v1752865294/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-CloudWatch-Demo/aws-cloudwatch-log-streams-interface.jpg)

Below is a snippet from a Lambda log stream:

```
2023-10-19T11:15:24.574Z  eec4ff36-6a6d-49ab-bbbe-4da06f561e77  INFO  {
    Records: [
        {
            eventID: 'c4c4238a0b92382dc590a675948',
            eventName: 'INSERT',
            eventVersion: '1.1',
            eventSource: 'aws:dynamodb',
            awsRegion: 'us-east-1',
            dynamodb: [Object],
            eventSourceARN: 'arn:aws:dynamodb:us-east-1:123456789012:table/ExampleTableWithStream/2015-06-27T08:48:05.899'
        },
        {
            eventID: 'c81e728d9d4c2f636f067f89b148c1460',
            eventName: 'MODIFY',
            eventVersion: '1.1',
            eventSource: 'aws:dynamodb',
            awsRegion: 'us-east-1',
            dynamodb: [Object],
            eventSourceARN: 'arn:aws:dynamodb:us-east-1:123456789012:table/ExampleTableWithStream/2015-06-27T08:48:05.899'
        },
        {
            eventID: 'ecc87742b5c2fe28a3075f9df2a7bfa',
            eventName: 'REMOVE',
```

This snippet shows detailed Lambda output, capturing events from a DynamoDB stream. Each new invocation generates similar log entries.

For example, Macie logs contain job event details:

```
{
  "adminAccountId": "841860927337",
  "jobId": "89bfa2335cdea88b3c1d38d78c12c",
  "eventType": "JOB_CREATED",
  "occurredAt": "2023-10-17T01:06:24.566653Z",
  "description": "The job was created.",
  "jobName": "macie-test-job"
}
```

```
{
  "adminAccountId": "841860927337",
  "jobId": "89bfa2335cdea88b3c1d38d78c12c",
  "eventType": "ONE_TIME_JOB_STARTED",
  "occurredAt": "2023-10-17T01:06:29.618922Z",
  "description": "The job started running."
}
```

```
{
  "adminAccountId": "841860927337",
  "jobId": "89bfa2335cdea88b3c1d38d78c12c",
  "eventType": "JOB_COMPLETED",
  "occurredAt": "2023-10-17T01:16:47.152607Z"
}
```

CloudWatch also features a live tail mechanism for real-time troubleshooting. By selecting a specific log group (e.g., the "test one" Lambda group) and activating live tailing, you can stream new log entries as soon as they are generated. Running tests on your Lambda function will produce outputs similar to the following:

```
START RequestId: 78d5a620-3f88-4ed2-aec1-150ee81539ae Version: $LATEST
2023-10-19T01:20:54.405Z 78d5a620-3f88-4ed2-aec1-150ee81539ae INFO  Records: [ { eventID: 'c4c4a238abf923820dc509a67f549b', eventName: 'INSERT', eventVersion: ...
END RequestId: 78d5a620-3f88-4ed2-aec1-150ee81539ae
REPORT RequestId: 78d5a620-3f88-4ed2-aec1-150ee81539ae Duration: 116.26 ms Billed Duration: 117 ms Memory Size: 128 MB Max Memory Used: 69 MB
```

> [!important]
> **Note**
>
> This live tail feature is invaluable for immediate insights during troubleshooting, allowing you to quickly pinpoint issues as they occur.

---

## Log Insights

CloudWatch Log Insights provides a powerful query language similar to SQL, enabling you to filter and analyze logs efficiently. For instance, you can execute the following query to list the 20 most recent log entries:

```
Fields @timestamp, @message, @LogStream, @Log
sort @timestamp desc
limit 20
```

The query output displays a graph of log events over time alongside detailed log entries that match the criteria. You can modify the query to sort entries in ascending order and reduce the limit, as shown below:

```
fields @timestamp, @message, @LogStream, @Log
| sort @timestamp asc
| limit 5
```

---

## Metrics

CloudWatch collects a variety of metrics for your AWS resources. To view these metrics, navigate to the "All Metrics" section. You can filter metrics by service; for example, EC2 metrics include CPU utilization, status checks, network traffic, and EBS operations.

Consider the following example for monitoring CPU utilization of an EC2 instance:

![The image shows an AWS CloudWatch dashboard displaying a graph of CPU utilization over time, along with a list of metrics such as CPUCreditBalance and NetworkIn, all with no alarms set.](https://kodekloud.com/kk-media/image/upload/v1752865295/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-CloudWatch-Demo/aws-cloudwatch-cpu-utilization-dashboard.jpg)

In this graph, you can observe periods of minimal usage and sudden spikes. Customize the display by adjusting the time range (e.g., last hour or three hours) or by choosing different visualization formats.

---

## Creating Alarms

CloudWatch alarms allow you to monitor specific metrics and trigger notifications when thresholds are exceeded. For instance, you can create an alarm for CPU utilization. When the average CPU usage exceeds a predefined static threshold—say 60% over a five-minute period—an alarm is triggered.

![The image shows a configuration screen from AWS CloudWatch for setting a CPU utilization alarm, with options to define conditions and thresholds. The threshold type is set to "Static," and the condition is configured for when CPU utilization is greater than a specified value.](https://kodekloud.com/kk-media/image/upload/v1752865296/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-CloudWatch-Demo/aws-cloudwatch-cpu-alarm-configuration.jpg)

After selecting the metric, configure the alarm conditions, and ensure notifications are sent via an SNS topic (such as an email alert). This setup guarantees that any sustained high CPU usage triggers an alert to the designated recipients.

![The image shows an AWS CloudWatch interface for configuring alarm actions, including setting notifications via SNS topics and adding auto-scaling actions.](https://kodekloud.com/kk-media/image/upload/v1752865297/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-CloudWatch-Demo/aws-cloudwatch-alarm-configurations.jpg)

Verify your settings with the corresponding graph display. If everything is in order, save your configurations; otherwise, cancel the setup if modifications are needed.

![The image shows an AWS CloudWatch interface where a CPU utilization alarm is being configured. It includes a graph displaying CPU usage and settings for the alarm conditions.](https://kodekloud.com/kk-media/image/upload/v1752865299/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-CloudWatch-Demo/aws-cloudwatch-cpu-alarm-configuration-2.jpg)

---

## Additional Features

CloudWatch offers several additional capabilities to enhance monitoring:

- **X-Ray Traces:** Monitor distributed applications with AWS X-Ray. (Note: This demo does not include an X-Ray example.)
- **Service-Specific Insights:** Leverage tailored pages such as Container Insights, Lambda Insights, and Application Insights.
- **Events:** Utilize Amazon EventBridge (formerly CloudWatch events) to define rules that trigger actions based on specific AWS environment events.

---

## Dashboards

Dashboards in CloudWatch let you assemble metrics and logs into customizable visual displays. Creating a dashboard is straightforward:

1.  Navigate to the "Dashboards" section and click "Create dashboard."
2.  Name your dashboard (e.g., "demo") and add various widgets:
    - **Metric Widgets:** Insert a line graph for CPU utilization by selecting the corresponding metric.
    - **Numeric Widgets:** Include widgets that showcase numerical data, such as the number of network packets sent.
    - **Lambda Invocation Metrics:** Display the number of invocations for your Lambda functions.

Resize and rearrange the widgets as needed to optimize the layout.

![The image shows an AWS CloudWatch dashboard with graphs displaying CPU utilization and network packets out over a selected time range.](https://kodekloud.com/kk-media/image/upload/v1752865300/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-CloudWatch-Demo/aws-cloudwatch-dashboard-cpu-network.jpg)

Once satisfied with the layout, save your dashboard under an appropriate name. Use multiple dashboards to monitor different environments or teams, such as separate dashboards for ECS clusters or individual applications.

![The image shows an AWS CloudWatch dashboard displaying metrics for an EC2-Lambda setup, including CPU utilization, network packets out, and invocation counts. The dashboard provides visual graphs and data for monitoring performance.](https://kodekloud.com/kk-media/image/upload/v1752865301/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-CloudWatch-Demo/aws-cloudwatch-ec2-lambda-dashboard.jpg)

---

This overview of CloudWatch has covered log management, live tailing, log insights, metrics, alarms, and dashboards. Experiment with these features to tailor your AWS monitoring strategy to your specific requirements.

Happy monitoring!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/3c1ec40a-853a-4bf0-a4de-d53993e309f0/lesson/35caeb03-67e3-4288-be2f-81e3a639bc93)**
>
> Watch video content
