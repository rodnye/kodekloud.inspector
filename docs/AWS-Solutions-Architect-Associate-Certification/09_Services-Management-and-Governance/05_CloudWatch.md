# CloudWatch - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Management-and-Governance/CloudWatch)

---

## Table of Contents

- CloudWatch
  - Key Components of CloudWatch
  - CloudWatch Capabilities
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Management and Governance

# CloudWatch

In this lesson, you will learn about AWS CloudWatch, a robust monitoring service that provides real-time insights into AWS resources and applications. CloudWatch empowers you to collect, track, and analyze various metrics and logs from multiple sources, generate notifications when specific thresholds are breached, and centrally manage system logs for deeper analysis.

CloudWatch automatically ingests logs and metrics from numerous AWS services such as [EC2](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2), [RDS](https://learn.kodekloud.com/user/courses/aws-rds), and [Lambda](https://learn.kodekloud.com/user/courses/aws-lambda). This integration offers instant visibility into the performance and overall operation of these services. Additionally, developers can use the CloudWatch SDK to send custom logs and metrics, which is especially useful for tracking application-specific data like API latency, response times, and error counts. With the CloudWatch Logs API, you also have programmatic control to push logs directly into the service.

Once CloudWatch receives these logs and metrics, it extracts detailed monitoring data and triggers alarms based on user-defined thresholds. Serving as a centralized platform, CloudWatch allows you to view metrics, logs, and traces in one place, streamlining your monitoring and troubleshooting workflows.

![The image illustrates how AWS CloudWatch works, showing the flow from AWS Cloud, custom applications, and logs into CloudWatch for metrics monitoring, which triggers alarms and sends notifications via SNS.](https://kodekloud.com/kk-media/image/upload/v1752865302/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-CloudWatch/aws-cloudwatch-metrics-monitoring-diagram.jpg)

## Key Components of CloudWatch

Below is an overview of the primary components that make CloudWatch a comprehensive monitoring solution:

1.  **Metrics**  
    Metrics are the foundational data points that indicate the performance of your services and applications. Common examples include CPU utilization and application latency.
2.  **Alarms**  
    Alarms enable you to set thresholds on metrics. For example, you can configure an alarm to trigger when the average CPU utilization of an [EC2](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2) instance exceeds 80%.
3.  **Logs**  
    CloudWatch Logs offer a centralized repository to store, view, and analyze logs from a variety of services and applications, both current and historical.
4.  **Events (EventBridge)**  
    Formerly known as CloudWatch Events, EventBridge responds to state changes in AWS resources. With custom rules, you can automate responses to events, such as triggering a Lambda function when a new file is uploaded to an S3 bucket.
5.  **Custom Dashboards**  
    Create personalized dashboards on CloudWatch’s customizable console homepage to display relevant metrics, logs, and data points for your operations.
6.  **Insights**  
    Logs Insights provide the ability to perform advanced queries on your log data. This feature allows for sophisticated analysis and the extraction of complex metrics.

> [!important]
> **Note**
>
> CloudWatch also plays a critical role in the management of AWS Auto Scaling groups. For instance, alarms monitoring EC2 instance metrics within an autoscaling group can directly influence decisions that trigger scaling actions based on predefined thresholds.

## CloudWatch Capabilities

CloudWatch empowers you to:

- Publish custom metrics in dedicated namespaces alongside AWS’s built-in metrics.
- Set up alarms to receive notifications when specific metric thresholds are exceeded.
- Collect and securely store logs from your infrastructure, resources, and applications.
- Stream near real-time system events using EventBridge.
- Create and configure interactive dashboards to consolidate your monitoring data.

![The image displays five feature icons labeled as Custom Metrics, Alarms, Logs, Events, and Dashboards. Each icon is uniquely colored and numbered from 01 to 05.](https://kodekloud.com/kk-media/image/upload/v1752865304/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-CloudWatch/feature-icons-custom-metrics-alarms-logs-events-dashboards.jpg)

For more information on AWS CloudWatch and its extensive capabilities, please refer to the [official AWS CloudWatch documentation](https://aws.amazon.com/cloudwatch/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/3c1ec40a-853a-4bf0-a4de-d53993e309f0/lesson/15697878-7b18-44b8-a617-1bcd31b965cc)**
>
> Watch video content
