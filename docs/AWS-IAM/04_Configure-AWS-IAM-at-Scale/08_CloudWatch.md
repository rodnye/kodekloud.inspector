# CloudWatch - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-IAM/Configure-AWS-IAM-at-Scale/CloudWatch)

---

## Table of Contents

- CloudWatch
  - Why Use CloudWatch?
  - Key CloudWatch Components
  - Demo: Configure a High-CPU Alarm
  - Further Reading & References
  - Watch Video

---

## Content

AWS - IAM

Configure AWS IAM at Scale

# CloudWatch

AWS CloudWatch is the central observability service for collecting metrics, logs, and events from your AWS resources and applications. In this guide, you’ll learn how to set up a CPU utilization alarm for an EC2 instance, ensuring you receive notifications whenever usage crosses a critical threshold.

![The image shows a CPU utilization graph with a red alarm threshold line at 75%, indicating that the CPU usage has exceeded this threshold multiple times, triggering an alarm.](https://kodekloud.com/kk-media/image/upload/v1752862939/notes-assets/images/AWS-IAM-CloudWatch/cpu-utilization-graph-alarm-threshold.jpg)

## Why Use CloudWatch?

With CloudWatch, you can:

- Collect and visualize metrics (CPU, memory, disk I/O, network) from AWS services and custom applications
- Aggregate, search, and analyze logs in real time
- Trigger automated actions or notifications when specified events or thresholds are met
- Build dashboards for a consolidated, at-a-glance view of your infrastructure health

> [!important]
> **Note**
>
> Be aware that custom metrics and detailed monitoring (1-minute resolution) may incur additional charges.

## Key CloudWatch Components

| Component    | Purpose                                                              |
| ------------ | -------------------------------------------------------------------- |
| Metrics      | Time-series data for resource performance (e.g., `CPUUtilization`).  |
| Logs         | Centralized aggregation and querying of application and system logs. |
| Alarms       | Threshold-based triggers to send notifications or invoke actions.    |
| Dashboards   | Customizable visualizations combining metrics and logs in one view.  |
| Events/Rules | Automated reactions to state changes or scheduled tasks across AWS.  |

![The image explains AWS Cloudwatch, highlighting its use for monitoring and observability, setting up alarms for issues, and analyzing data through dashboards.](https://kodekloud.com/kk-media/image/upload/v1752862940/notes-assets/images/AWS-IAM-CloudWatch/aws-cloudwatch-monitoring-alarms-dashboards.jpg)

## Demo: Configure a High-CPU Alarm

Follow these steps in the AWS Management Console to create an alarm that notifies you when CPU utilization exceeds 75% for 5 minutes:

1.  Navigate to **CloudWatch** in the AWS Console.
2.  In the sidebar, choose **Alarms** → **All alarms** → **Create alarm**.
3.  Under **Select metric**, pick the **EC2** namespace and then **Per-Instance Metrics** → **CPUUtilization**.
4.  Click **Select metric** for your target instance.
5.  On the **Specify metric and conditions** page:
    - **Threshold type**: Static
    - **Whenever CPUUtilization is**: `>` 75
    - **For**: 5 consecutive periods of 1 minute each
6.  Under **Configure actions**, choose an SNS topic or create a new one to send email notifications.
7.  (Optional) Add tags to organize billing and access management.
8.  Review settings and click **Create alarm**.

Once activated, CloudWatch will continuously evaluate the metric and send an email via SNS whenever CPU usage remains above 75% for 5 minutes.

> [!important]
> **Warning**
>
> Ensure your SNS subscription is confirmed; otherwise, you won’t receive alarm notifications.

## Further Reading & References

- [AWS CloudWatch Documentation](https://docs.aws.amazon.com/cloudwatch/latest/monitoring/WhatIsCloudWatch.html)
- [Managing Amazon SNS Topics](https://docs.aws.amazon.com/sns/latest/dg/sns-create-topic.html)
- [AWS Well-Architected Monitoring and Observability](https://docs.aws.amazon.com/wellarchitected/latest/mon-in-op/overview.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-iam/module/586f5114-fd4d-45e3-88ba-6a691fde129c/lesson/e74caf44-a8b0-405b-9bfa-af91f5e11214)**
>
> Watch video content
