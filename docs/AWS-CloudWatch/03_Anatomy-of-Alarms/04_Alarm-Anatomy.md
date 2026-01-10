# Alarm Anatomy - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-CloudWatch/Anatomy-of-Alarms/Alarm-Anatomy)

---

## Table of Contents

- Alarm Anatomy
  - Core Components of a CloudWatch Alarm
  - Example: Creating an Alarm for RDS CPU Utilization
  - Notification Settings
  - Links and References
  - Watch Video

---

## Content

AWS CloudWatch

Anatomy of Alarms

# Alarm Anatomy

In this lesson, we’ll dissect the components of a CloudWatch alarm, explore best practices for setting thresholds, and walk through an example of monitoring an RDS instance.

## Core Components of a CloudWatch Alarm

| Component           | Description                                                                       |
| ------------------- | --------------------------------------------------------------------------------- |
| Alarm Name          | A concise, unique identifier to locate and manage your alarm efficiently.         |
| Metric              | The AWS metric (e.g., `CPUUtilization`) you want to monitor.                      |
| Statistic           | Aggregation method: `Average`, `Minimum`, `Maximum`, `Sum`, or `SampleCount`.     |
| Threshold           | Numerical value that triggers the alarm when crossed.                             |
| Period              | Evaluation interval in seconds (e.g., `60`, `300`, `900`).                        |
| Evaluation Periods  | Number of consecutive periods the threshold must be breached before triggering.   |
| Datapoints to Alarm | How many of those evaluation periods must breach the threshold to fire the alarm. |
| Comparison Operator | Comparison type: `GreaterThanThreshold`, `LessThanOrEqualToThreshold`, etc.       |
| Alarm Actions       | Actions on state change: SNS notification, Lambda invocation, Auto Scaling, etc.  |

![The image is a diagram titled "Alarm Anatomy in AWS CloudWatch," showing components like Alarm Name, Metric, Statistic, Threshold, Period, Evaluation Periods, Datapoints to Alarm, Comparison Operator, and Alarm Actions.](https://kodekloud.com/kk-media/image/upload/v1752862367/notes-assets/images/AWS-CloudWatch-Alarm-Anatomy/alarm-anatomy-aws-cloudwatch-diagram.jpg)

---

## Example: Creating an Alarm for RDS CPU Utilization

Apply these settings to keep tabs on an Amazon RDS instance’s CPU usage:

```
aws cloudwatch put-metric-alarm \
  --alarm-name "High-CPU-RDS" \
  --metric-name CPUUtilization \
  --namespace AWS/RDS \
  --statistic Average \
  --period 900 \
  --threshold 90 \
  --comparison-operator GreaterThanThreshold \
  --evaluation-periods 1 \
  --datapoints-to-alarm 1 \
  --dimensions Name=DBInstanceIdentifier,Value=mydbinstance \
  --alarm-actions arn:aws:sns:us-east-1:123456789012:DefaultCloudWatchAlarms
```

![The image is a diagram explaining the conditions for setting an alarm in AWS CloudWatch, focusing on threshold types and CPU utilization criteria. It includes options for static and anomaly detection thresholds, and conditions like greater, greater/equal, lower/equal, and lower.](https://kodekloud.com/kk-media/image/upload/v1752862368/notes-assets/images/AWS-CloudWatch-Alarm-Anatomy/aws-cloudwatch-alarm-conditions-diagram.jpg)

> [!important]
> **Note**
>
> Consider using [anomaly detection thresholds](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#features-anomaly-detection) for dynamic baselines instead of static thresholds.> [!important]
> **Warning**
>
> Avoid setting low thresholds with short evaluation periods—this can generate noise from transient spikes. Tune `EvaluationPeriods` and `DatapointsToAlarm` for stability.

---

## Notification Settings

Define how CloudWatch alerts you when the alarm state changes:

| Setting      | Description                                          |
| ------------ | ---------------------------------------------------- |
| Alarm State  | Triggers when the alarm enters `ALARM` state.        |
| Notification | Delivery via an Amazon SNS topic.                    |
| SNS Topic    | e.g., `DefaultCloudWatchAlarms` or a custom topic.   |
| Endpoint     | Email address, Lambda function ARN, or HTTP webhook. |

![The image is a diagram explaining the notification settings for an alarm in AWS CloudWatch, detailing alarm state triggers and SNS topic selection. It includes options for defining alarm states and creating or selecting SNS topics for notifications.](https://kodekloud.com/kk-media/image/upload/v1752862369/notes-assets/images/AWS-CloudWatch-Alarm-Anatomy/aws-cloudwatch-alarm-notification-diagram.jpg)

---

## Links and References

- [Amazon CloudWatch Alarms](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html)
- [AWS/RDS Monitoring Overview](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/MonitoringOverview.html)
- [AWS CLI `put-metric-alarm`](https://docs.aws.amazon.com/cli/latest/reference/cloudwatch/put-metric-alarm.html)
- [Amazon SNS Topics](https://docs.aws.amazon.com/sns/latest/dg/sns-create-topic.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloudwatch/module/41c3204a-bf91-4e6f-8175-02ef9b9f6b82/lesson/6fb5890a-e2de-46f6-8965-2a32c9163137)**
>
> Watch video content
