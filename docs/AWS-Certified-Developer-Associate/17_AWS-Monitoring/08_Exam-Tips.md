# Exam Tips - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/AWS-Monitoring/Exam-Tips)

---

## Table of Contents

- Exam Tips
  - CloudWatch
  - CloudTrail
  - X-Ray
  - Watch Video
    - Key Concepts in CloudWatch
    - Logs in CloudWatch
    - CloudWatch Logs Insights and Alarms
    - Essential CloudTrail Features
    - Core Components of X-Ray
    - Sampling
    - X-Ray Integration on Different AWS Services

---

## Content

AWS Certified Developer - Associate

AWS Monitoring

# Exam Tips

In this lesson, we review key concepts for the exam, focusing on AWS services such as CloudWatch, CloudTrail, and X-Ray. Follow these detailed explanations and illustrations to gain a solid understanding of how these services work together in monitoring, tracking, and debugging your AWS environment.

---

## CloudWatch

Amazon CloudWatch enables you to collect, monitor, and analyze metrics and logs for your AWS resources and applications. Both AWS services and custom applications can push metrics and logs to CloudWatch. You can configure CloudWatch alarms to monitor metrics and automatically trigger actions—such as sending notifications, invoking Lambda functions, or publishing to SNS topics—when predefined thresholds are crossed.

### Key Concepts in CloudWatch

- **Namespaces:**  
  Namespaces isolate metrics to prevent misaggregation. Each AWS resource typically has its own namespace.
- **Dimensions:**  
  Labels that add context to a metric. For example, when monitoring network traffic, you might use a dimension to identify the specific EC2 interface receiving packets.
- **Custom Metrics:**  
  Publish your own metrics using the `PutMetricData` API. CloudWatch supports two resolutions:
  - **Standard Resolution:** Provides one-minute granularity.
  - **High Resolution:** Offers one-second granularity.

![The image provides tips for using AWS CloudWatch, highlighting its capabilities for tracking metrics, sending logs, setting alarms, and querying logs for insights.](https://kodekloud.com/kk-media/image/upload/v1752858323/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/aws-cloudwatch-tips-metrics-logs.jpg)

### Logs in CloudWatch

When leveraging CloudWatch for log management, note the following definitions:

- **Log Group:**  
  A collection of log streams sharing identical retention, monitoring, and access control settings.
- **Log Stream:**  
  A sequence of log events from a specific source. For example, each EC2 instance in a distributed application might send its logs to its own log stream even though they all belong to the same log group.

> [!important]
> **Note**
>
> For EC2 instances, make sure to install the CloudWatch agent to enable log forwarding. The legacy CloudWatch logs agent handles only logs, whereas the unified agent supports both logs and metrics.

![The image provides tips for acing an exam on AWS CloudWatch, focusing on metrics, namespaces, dimensions, and publishing custom metrics.](https://kodekloud.com/kk-media/image/upload/v1752858325/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/aws-cloudwatch-exam-tips-metrics.jpg)

### CloudWatch Logs Insights and Alarms

CloudWatch Logs Insights is a powerful tool that allows you to query your logs to find complex patterns and gain actionable insights. When setting up alarms, remember that each alarm can be in one of three states:

- **OK:** The metric is within its threshold.
- **INSUFFICIENT_DATA:** There is not enough data to determine a state.
- **ALARM:** The metric has crossed its threshold.

Composite alarms also allow you to combine multiple metrics using logical operators like AND and OR.

![The image provides tips for using CloudWatch, explaining how thresholds can trigger alarms and detailing the different alarm states: OK, INSUFFICIENT_DATA, and ALARM.](https://kodekloud.com/kk-media/image/upload/v1752858326/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/cloudwatch-tips-thresholds-alarms.jpg)

---

## CloudTrail

AWS CloudTrail records all API activity and actions in your AWS account, offering a comprehensive audit trail across AWS services. Whether the actions are performed through the AWS Management Console, CLI, or SDK, CloudTrail captures the details—including who initiated the action and when it occurred.

### Essential CloudTrail Features

- **Audit Trail:**  
  CloudTrail logs act as an audit trail to help track every API call made in your AWS environment.
- **Event Storage:**  
  By default, CloudTrail stores events for 90 days. However, you can configure long-term archival in Amazon S3.
- **CloudTrail Insights:**  
  Use CloudTrail Insights to detect unusual activity and automatically identify unexpected changes in your AWS environment.

![The image provides tips for acing an exam on AWS CloudTrail, highlighting its functions such as tracking API activity, serving as an audit trail, storing events, and analyzing unusual activity.](https://kodekloud.com/kk-media/image/upload/v1752858327/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/aws-cloudtrail-exam-tips.jpg)

---

## X-Ray

AWS X-Ray is a powerful tool designed to help you analyze and debug distributed applications, particularly those built using microservices architectures. It provides an end-to-end view of requests as they traverse through your application, making it easier to identify bottlenecks and performance issues.

### Core Components of X-Ray

- **Segments and Subsegments:**  
  A _segment_ contains detailed information about a request, including data on resource usage and performance. Each segment may be divided into _subsegments_ that detail downstream calls.
- **Traces:**  
  A trace aggregates segments to represent the full journey of a single request through your application.
- **Annotations and Metadata:**  
  Annotations are key-value pairs that help filter and query traces, while metadata provides additional context without being indexed.

### Sampling

By default, X-Ray records the first request at the start of each second—forming a reservoir—and additionally samples 5% of subsequent requests. This sampling strategy helps control the amount of data collected without compromising visibility into application performance.

To integrate X-Ray into your application, import the X-Ray SDK and configure a trace collector. Options for trace collectors include:

- AWS Distro for OpenTelemetry Collector
- CloudWatch Agent
- X-Ray Daemon (automatically enabled for AWS Lambda and select other AWS services)

> [!important]
> **Warning**
>
> Ensure that your X-Ray daemon and client have the necessary permissions (such as `xray:GetSamplingRules` and `xray:GetTraceSummaries`) to successfully send and retrieve trace data.

![The image provides tips for acing an exam related to X-Ray, detailing concepts like segments, subsegments, traces, annotations, and metadata. Each term is briefly explained in the context of application requests and data indexing.](https://kodekloud.com/kk-media/image/upload/v1752858328/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/xray-exam-tips-segments-annotations.jpg)

![The image provides tips for acing an exam related to X-Ray, explaining how it records requests and the sampling rate for additional requests.](https://kodekloud.com/kk-media/image/upload/v1752858330/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/x-ray-exam-tips-sampling-rate.jpg)

### X-Ray Integration on Different AWS Services

For services like Elastic Beanstalk, X-Ray is available out of the box—you can enable it via the AWS Management Console or through configuration files (such as `.ebextensions`). For EC2 instances, make sure the instance has an appropriate IAM role or specific instance profile to allow sending data to X-Ray.

![The image lists tips for acing an exam related to X-Ray, detailing various functions like `xray:GetSamplingRules` and `xray:GetTraceSummaries`.](https://kodekloud.com/kk-media/image/upload/v1752858332/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/xray-exam-tips-sampling-rules.jpg)

---

This concludes the overview of exam tips for AWS CloudWatch, CloudTrail, and X-Ray. Review these concepts thoroughly to ensure you are fully prepared for exam questions related to these fundamental AWS services. For further reading, consider exploring related resources and official documentation provided by AWS.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/120498e1-b602-4e0c-afea-2a05f2234bbd/lesson/101b4423-0b2d-4418-90fa-af5857cd0c90)**
>
> Watch video content
