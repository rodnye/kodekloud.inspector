# CloudTrail - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/AWS-Monitoring/CloudTrail)

---

## Table of Contents

- CloudTrail
  - Watch Video

---

## Content

AWS Certified Developer - Associate

AWS Monitoring

# CloudTrail

This article explains AWS CloudTrail, a vital service for tracking and recording all API activities and actions within your AWS account.

AWS CloudTrail functions as an audit trail by logging every interaction with AWS services. It captures critical information including the identity of the actor, the action performed, and the timestamp. Whether the API calls originate from the console, SDK, or CLI, CloudTrail records them and can store these logs in an S3 bucket for long-term retention. By default, CloudTrail retains events for 90 days, but you can extend this period by forwarding the logs to an S3 bucket.

With the integration of tools like Athena and Elasticsearch, you can query these logs to perform detailed analyses of your AWS account activities. For example, when a user named John creates an [EC2 instance](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2), CloudTrail logs the event with information on the user (John), the service (EC2), and the operation (instance creation).

For instance, AWS CloudTrail meticulously logs user activities by capturing essential details, making it clear how actions such as instance creation are recorded and tracked:  
![The image illustrates how AWS CloudTrail tracks user activity within an AWS account, showing a user named John performing actions that are logged by CloudTrail. It includes a brief explanation of CloudTrail's functions, such as logging user actions and tracking security policy modifications.](https://kodekloud.com/kk-media/image/upload/v1752858298/notes-assets/images/AWS-Certified-Developer-Associate-CloudTrail/aws-cloudtrail-user-activity-logging.jpg)

> [!important]
> **Note**
>
> Centralized logging with CloudTrail offers a consolidated view of all actions within your AWS account, which simplifies forensic investigations, troubleshooting, and compliance auditing.

Logs stored in S3 ensure both data durability and ease of access.

A common integration involves configuring [CloudWatch](https://learn.kodekloud.com/user/courses/aws-cloudwatch) to ingest and analyze CloudTrail logs in real time. This setup allows you to create alarms based on specific events or patterns. For instance, you can configure an alarm to publish messages to an SNS topic or trigger a Lambda function that automatically disables any compromised AWS resource upon detecting a security-related event.

Furthermore, AWS CloudTrail seamlessly integrates with other AWS services to enhance monitoring and response:

- It works with [CloudWatch](https://learn.kodekloud.com/user/courses/aws-cloudwatch) for real-time log analysis.
- It employs EventBridge to process significant events.
- It uses SNS to notify stakeholders or trigger automated remediation processes.

![The image is a flowchart illustrating a process involving AWS services: CloudTrail triggers CloudWatch, which takes action through EventBridge and SNS for triggers and alerts, and then notifies users or Lambda.](https://kodekloud.com/kk-media/image/upload/v1752858299/notes-assets/images/AWS-Certified-Developer-Associate-CloudTrail/aws-flowchart-cloudtrail-cloudwatch-sns.jpg)

In addition, CloudTrail Insights provides automated analysis by establishing a baseline for your API activity and monitoring for deviations. When unusual behavior is detected, CloudTrail Insights can trigger actions to address potential security threats, simplifying the identification of anomalies.

> [!important]
> **Key Benefits**
>
> - Tracks and records all API interactions across console, CLI, and SDK.
> - Retains events for 90 days by default with options for long-term S3 storage.
> - Enhances auditing, forensic investigation, and compliance efforts.
> - Integrates with CloudWatch for real-time monitoring and incident response.
> - Employs CloudTrail Insights to detect anomalous activities automatically.

This comprehensive logging and analysis makes AWS CloudTrail an essential tool for monitoring and securing your AWS environment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/120498e1-b602-4e0c-afea-2a05f2234bbd/lesson/9ef70d54-6bfe-4545-825e-84e448b96b1f)**
>
> Watch video content
