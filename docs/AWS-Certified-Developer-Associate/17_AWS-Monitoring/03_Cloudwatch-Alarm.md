# Cloudwatch Alarm - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/AWS-Monitoring/Cloudwatch-Alarm)

---

## Table of Contents

- Cloudwatch Alarm
  - Alarm States
  - Composite Alarms
  - Summary
  - Watch Video
    - Example of AND Condition:
    - Example of OR Condition:

---

## Content

AWS Certified Developer - Associate

AWS Monitoring

# Cloudwatch Alarm

In this lesson, we explore CloudWatch alarms and how they enable automated monitoring of your AWS resources. With CloudWatch, you can set thresholds for various metrics so that an alarm is triggered when a specified value is reached. For example, you can configure an alarm for an EC2 instance to trigger if the CPU utilization exceeds 70%. When activated, the alarm can perform a series of actions such as sending notifications, invoking a Lambda function, or publishing to an SNS topic.

## Alarm States

A CloudWatch alarm can be in one of three states:

- **OK:** The monitored metric is below the defined threshold (e.g., CPU utilization is below 70%).
- **Alarm:** The metric exceeds the set threshold (e.g., CPU utilization is above 70%).
- **Insufficient Data:** The current value of the metric is indeterminate.

![The image illustrates alarm states based on CPU utilization, with "Alarm state" above 70% and "OK state" below 70%. It notes that if CPU utilization can't be determined, it is considered insufficient data.](https://kodekloud.com/kk-media/image/upload/v1752858300/notes-assets/images/AWS-Certified-Developer-Associate-Cloudwatch-Alarm/cpu-utilization-alarm-states-diagram.jpg)

> [!important]
> **Note**
>
> CloudWatch alarms help proactively manage your cloud infrastructure by ensuring that critical thresholds are always monitored.

## Composite Alarms

One of the most powerful features of CloudWatch is its capability to monitor multiple metrics with a single alarm, often referred to as composite alarms. You can configure composite alarms using both AND and OR conditions, depending on your monitoring requirements.

### Example of AND Condition:

- CPU utilization is above 70%, **AND**
- Network packets in exceed 100 megabytes.

### Example of OR Condition:

- CPU utilization exceeds 70%, **OR**
- Available free memory drops below 200 megabytes.

![The image illustrates two composite alarms for an instance, one triggered by CPU usage over 70% and network packets in over 100MB, and the other by CPU usage over 70% or memory free under 200MB.](https://kodekloud.com/kk-media/image/upload/v1752858303/notes-assets/images/AWS-Certified-Developer-Associate-Cloudwatch-Alarm/composite-alarms-cpu-memory-diagram.jpg)

## Summary

CloudWatch alarms provide an effective solution for monitoring critical metric thresholds and automatically triggering actions such as notifications, Lambda function invocations, or SNS topic publications. Moreover, the flexibility of composite alarms enables you to combine multiple metrics, ensuring a comprehensive monitoring strategy tailored to your specific needs.

![The image is a summary slide highlighting three points about CloudWatch alarms: triggering based on metric thresholds, triggering notifications and functions, and combining metrics for composite alarms.](https://kodekloud.com/kk-media/image/upload/v1752858304/notes-assets/images/AWS-Certified-Developer-Associate-Cloudwatch-Alarm/cloudwatch-alarms-summary-slide.jpg)

> [!important]
> **Key Takeaway**
>
> By leveraging CloudWatch alarms, you can ensure better resource utilization, faster response times to system anomalies, and improved overall system reliability.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/120498e1-b602-4e0c-afea-2a05f2234bbd/lesson/26d5fd7f-8f3d-4a0a-a9bf-abb7c4edc6d0)**
>
> Watch video content
