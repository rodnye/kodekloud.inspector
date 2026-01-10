# CloudTrail - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-IAM/Configure-AWS-IAM-at-Scale/CloudTrail)

---

## Table of Contents

- CloudTrail
  - Table of Contents
  - Use Case: Investigating EC2 Shutdown
  - How CloudTrail Works
  - Key Features
  - Demo: Finding the StopInstances Event
  - Best Practices
  - References
  - Watch Video
    - AWS Management Console
    - AWS CLI

---

## Content

AWS - IAM

Configure AWS IAM at Scale

# CloudTrail

CloudTrail provides a comprehensive audit trail of all API calls in your AWS account. In this guide, you’ll learn how to trace which IAM user issued the `StopInstances` command to shut down an EC2 instance.

## Table of Contents

- [Use Case: Investigating EC2 Shutdown](#use-case-investigating-ec2-shutdown)
- [How CloudTrail Works](#how-cloudtrail-works)
- [Key Features](#key-features)
- [Demo: Finding the StopInstances Event](#demo-finding-the-stopinstances-event)
- [Best Practices](#best-practices)
- [References](#references)

---

## Use Case: Investigating EC2 Shutdown

When an unexpected EC2 instance stops, you need to know who performed that action. CloudTrail captures every API call, making it straightforward to identify the culprit.

![The image is a diagram showing the process of investigating who shut down an EC2 instance using AWS CloudTrail. It involves an IAM user making an API call to stop the instance, which is logged by AWS CloudTrail.](https://kodekloud.com/kk-media/image/upload/v1752862936/notes-assets/images/AWS-IAM-CloudTrail/ec2-instance-shutdown-investigation-diagram.jpg)

## How CloudTrail Works

1.  An IAM user or role issues an API request (e.g., `StopInstances`).
2.  CloudTrail records the request details: caller identity, API action, resource ARNs, and timestamp.
3.  Logs are delivered to an S3 bucket (or optionally to CloudWatch Logs) for storage and analysis.

> [!important]
> **Note**
>
> Make sure you have at least one active trail in the region where your EC2 instances run.
> Configure multi-region logging for global coverage.

## Key Features

| Feature                 | Description                                                       |
| ----------------------- | ----------------------------------------------------------------- |
| Audit Trail             | Complete history of all API calls for compliance and forensic use |
| Visibility & Security   | Detect unusual behavior by monitoring account activity            |
| Centralized Log Storage | Store logs in Amazon S3 for long-term retention                   |
| Real-time Monitoring    | Integrate with CloudWatch Logs to trigger alerts instantly        |

![The image explains AWS CloudTrail, highlighting its functions: creating an audit trail, enhancing security through activity monitoring, and storing logs in S3 buckets for real-time analysis.](https://kodekloud.com/kk-media/image/upload/v1752862938/notes-assets/images/AWS-IAM-CloudTrail/aws-cloudtrail-audit-trail-security-logs.jpg)

## Demo: Finding the StopInstances Event

Follow these steps in the AWS Management Console or use the AWS CLI to locate the `StopInstances` event.

### AWS Management Console

1.  Open the **CloudTrail** service.
2.  Click **Event history**.
3.  In the filter bar, select **Event name** and enter `StopInstances`.
4.  Review each entry’s:
    - **Event time**
    - **Username** (IAM user or role)
    - **Resources** (affected EC2 instance ARNs)

### AWS CLI

```
aws cloudtrail lookup-events \
  --lookup-attributes AttributeKey=EventName,AttributeValue=StopInstances \
  --max-results 10
```

This returns a JSON list of matching events. Inspect the `Username`, `EventTime`, and `Resources` fields to pinpoint who stopped the instance.

> [!important]
> **Warning**
>
> If your trail isn’t configured to deliver logs to CloudWatch Logs, you won’t get real-time alerts.
> Enable CloudWatch integration in the trail settings to receive immediate notifications.

## Best Practices

- Enable **multi-region trails** to capture global AWS API activity.
- Encrypt log files with SSE-KMS for data protection.
- Implement **log file validation** to ensure integrity.
- Configure **lifecycle policies** in S3 to archive or delete old logs.

## References

- [AWS CloudTrail User Guide](https://docs.aws.amazon.com/cloudtrail/latest/userguide/)
- [AWS CloudTrail API Reference](https://docs.aws.amazon.com/cloudtrail/latest/APIReference/)
- [Monitoring CloudTrail with CloudWatch](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html)
- [Managing S3 Lifecycle Policies](https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-configuration-examples.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-iam/module/586f5114-fd4d-45e3-88ba-6a691fde129c/lesson/3f50db97-eef8-43a7-957a-8b1bf3e8fbb0)**
>
> Watch video content
