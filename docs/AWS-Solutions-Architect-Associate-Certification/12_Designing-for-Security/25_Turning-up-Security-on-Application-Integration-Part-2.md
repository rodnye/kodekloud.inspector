# Turning up Security on Application Integration Part 2 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Designing-for-Security/Turning-up-Security-on-Application-Integration-Part-2)

---

## Table of Contents

- Turning up Security on Application Integration Part 2
  - Messaging and Events
  - Amazon Simple Queue Service (SQS)
  - Amazon MQ
  - Amazon EventBridge
  - Amazon Simple Email Service (SES)
  - Workflows and Orchestration
  - AWS Managed Workflows for Apache Airflow (MWAA)
  - Summary
  - Watch Video
    - AWS Step Functions
    - Amazon Simple Workflow Service (SWF)

---

## Content

AWS Solutions Architect Associate Certification

Designing for Security

# Turning up Security on Application Integration Part 2

In this lesson, we continue our discussion on securing application integrations with a focus on Amazon AppFlow. AppFlow facilitates bi-directional data transfers between SaaS applications and AWS services. Because most of its operations involve API calls with third-party applications, its security mechanisms mirror those used in IAM. It is important to note that AppFlow is a fully managed service, unlike an ETL service such as AWS Glue, and is geared toward long-term data storage—much like Amazon Glacier—with secure data transfers. All connection details for AppFlow are safely stored in Secrets Manager, and encryption is applied to the data context.

![The image is a flowchart illustrating data processing using AWS services, including Amazon AppFlow, S3, EventBridge, Glue, and Athena, with data moving from Jira Cloud to a user.](https://kodekloud.com/kk-media/image/upload/v1752864006/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-2/aws-data-processing-flowchart.jpg)

There have been questions regarding the enhancement of security through integration with Secrets Manager. Rest assured, AppFlow seamlessly integrates with Secrets Manager to securely handle connection details.

![The image explains how a global e-commerce company can leverage Amazon AppFlow and Amazon Secrets Manager to securely integrate data between SaaS applications and AWS services. It lists four ways AppFlow can use Secrets Manager for secure data handling and configuration.](https://kodekloud.com/kk-media/image/upload/v1752864008/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-2/amazon-appflow-secrets-manager-integration.jpg)

:::note Logging and Monitoring For logging, AppFlow utilizes CloudTrail and CloudWatch to track API calls and monitor data flows. For instance, a multinational corporation may synchronize data between cloud applications and AWS services, then use CloudWatch for metrics and flow execution tracking. Supplementary tools like AWS X-Ray, AWS Config, and AWS GuardDuty can also be considered for tracing and detecting issues. :::

![The image describes monitoring solutions for Amazon AppFlow, suggesting the use of Amazon CloudWatch, AWS X-Ray, AWS Config, and Amazon GuardDuty.](https://kodekloud.com/kk-media/image/upload/v1752864009/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-2/amazon-appflow-monitoring-solutions.jpg)

---

## Messaging and Events

Next, we delve into messaging and event services, starting with the Simple Notification Service (SNS). SNS is a robust notification system that dispatches messages to a topic. Depending on the subscription configuration, these messages can be delivered to one or more endpoints such as SQS queues, email addresses, or SMS numbers. For example, a message might be replicated across three SQS queues as dictated by an application workflow. SNS secures data by encrypting both topics and queues using server-side encryption (SSE) via AWS Key Management Service (KMS).

![The image illustrates a Simple Notification Service (SNS) architecture, showing how physicians interact with an EMR system, which communicates with encrypted SNS topics and SQS queues for patient records, billing, scheduling, and prescription systems. It highlights security measures for data at rest and in transit.](https://kodekloud.com/kk-media/image/upload/v1752864010/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-2/sns-architecture-emr-physicians-interaction.jpg)

Another diagram demonstrates SNS integrated with two queues managed by a billing Lambda function and a scheduling function, with data processed and, in some cases, routed into S3. Importantly, SNS offers Message Data Protection, which allows you to set policies that audit, redact, or block sensitive information such as Personally Identifiable Information (PII).

![The image is a diagram illustrating the Amazon Simple Notification Service (SNS) with a focus on data protection policies and message flow through various components like Lambda functions and SQS queues. It highlights the integration with services such as Amazon CloudWatch, Kinesis Data Firehose, and Amazon S3 for governance and data protection.](https://kodekloud.com/kk-media/image/upload/v1752864011/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-2/amazon-sns-data-protection-diagram.jpg)

Moreover, SNS leverages resource policies alongside IAM to enforce fine-grained access control, ensuring only authorized entities can publish or subscribe to a topic. A common method is to manage access through IAM roles or groups, rather than relying solely on resource policies.

![The image presents a scenario where a global e-commerce platform uses Amazon SNS for notifications and seeks to ensure only authorized personnel can publish messages. It lists four approaches using AWS IAM, AWS Organizations, Amazon Cognito, and SNS topic attributes to achieve this.](https://kodekloud.com/kk-media/image/upload/v1752864013/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-2/ecommerce-sns-authorization-approaches.jpg)

SNS further integrates with CloudTrail and CloudWatch to provide key metrics (e.g., the number of messages published and delivery success rates) to monitor performance and ensure timely deliveries.

![The image is a flowchart illustrating the AWS Simple Notification Service (SNS) process, showing integration with Amazon Connect, CloudWatch, and notifications via email, SMS, and Slack. It highlights the use of CloudTrail and CloudWatch for metrics and auditing.](https://kodekloud.com/kk-media/image/upload/v1752864014/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-2/aws-sns-flowchart-integration-notifications.jpg)

A separate diagram outlines various monitoring solutions for SNS, emphasizing that CloudWatch Logs and Metrics play a fundamental role in tracking SNS performance—including practices for handling dead-letter queues when messages fail.

![The image presents a scenario where a media company uses Amazon SNS for notifications and lists four monitoring solutions to ensure optimal performance, including using CloudWatch Logs, CloudWatch Metrics, AWS X-Ray, and AWS Config.](https://kodekloud.com/kk-media/image/upload/v1752864015/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-2/amazon-sns-notifications-monitoring-solutions.jpg)

---

## Amazon Simple Queue Service (SQS)

Now let’s discuss Amazon Simple Queue Service (SQS). Launched shortly after S3, SQS is a highly managed queuing service available in both standard and FIFO versions. It provides built-in encryption at rest via KMS and supports private traffic through VPC interface endpoints powered by AWS PrivateLink. Although SQS offers CloudWatch metrics and API activity tracking through CloudTrail, note that it does not log individual queue messages natively without CloudTrail integration.

![The image is a diagram illustrating the flow of data in Amazon's Simple Queue Service (SQS), showing interactions between Amazon SNS, SQS, KMS, Lambda, EC2, and Fargate, with a dead-letter queue for handling failed messages. It highlights that SQS is a managed service with server-side encryption.](https://kodekloud.com/kk-media/image/upload/v1752864016/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-2/amazon-sqs-data-flow-diagram.jpg)

![The image presents a scenario where a fintech startup uses Amazon SQS for financial transactions and seeks to encrypt messages at rest. It lists four methods for achieving server-side encryption in Amazon SQS.](https://kodekloud.com/kk-media/image/upload/v1752864017/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-2/fintech-startup-amazon-sqs-encryption.jpg)

For detailed insights into API call interactions, ensure that CloudTrail logging is enabled.

![The image presents a scenario where an e-commerce company wants to log interactions with Amazon SQS for transparency and troubleshooting. It lists four methods for achieving detailed logging, including using AWS CloudTrail and configuring Amazon CloudWatch Logs.](https://kodekloud.com/kk-media/image/upload/v1752864018/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-2/ecommerce-amazon-sqs-logging-methods.jpg)

---

## Amazon MQ

Moving on to Amazon MQ—a managed message broker service based on ActiveMQ (with support for RabbitMQ). Unlike SQS, Amazon MQ is tailored for scenarios where industry-standard messaging protocols (such as MQTT) and classic broker functionalities are required. Amazon MQ ensures security using KMS for encryption at rest and supports encrypted data in transit.

![The image is a diagram showing an Amazon MQ setup within an AWS Cloud environment, featuring two availability zones with public subnets and MQ brokers, connected to a Lambda function, emphasizing encryption at all times.](https://kodekloud.com/kk-media/image/upload/v1752864019/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-2/amazon-mq-aws-setup-diagram.jpg)

![The image presents a scenario about a financial firm considering Amazon MQ for messaging infrastructure, with a question about its encryption capabilities. Four options are provided regarding Amazon MQ's support for encryption at rest and in transit.](https://kodekloud.com/kk-media/image/upload/v1752864020/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-2/amazon-mq-encryption-options-scenario.jpg)

---

## Amazon EventBridge

Amazon EventBridge is a fully managed event bus that efficiently routes events based on defined rules. It encrypts data by default using the AES-256 algorithm and provides a seamless connection between applications without acting as a traditional broker, streaming service, or managed workflow service. To monitor EventBridge, leverage CloudWatch metrics and CloudTrail, along with optional tools such as AWS X-Ray and AWS Config.

![The image is a flowchart illustrating the process of Amazon EventBridge, showing how events from producers are processed through an event bus and rules, leading to AWS Lambda, Amazon Kinesis Data Firehose, or Amazon Simple Notification Service. It notes that EventBridge uses AES-256 encryption by default.](https://kodekloud.com/kk-media/image/upload/v1752864021/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-2/amazon-eventbridge-flowchart-process.jpg)

![The image provides methods for a digital marketing agency to monitor Amazon EventBridge, including using Amazon CloudWatch Metrics, AWS X-Ray, Amazon S3 logs, and AWS Config.](https://kodekloud.com/kk-media/image/upload/v1752864022/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-2/digital-marketing-amazon-eventbridge-monitoring.jpg)

---

## Amazon Simple Email Service (SES)

Amazon Simple Email Service (SES) differs from SNS in its focus on sending bulk emails. SES supports multiple actions such as sending emails, storing them on S3, and processing content via Lambda (for tasks like language detection before resending). SES applies AES-256 encryption by default for data in transit and supports encryption at rest. Its standard logging capabilities are available through CloudWatch or Kinesis Data Firehose, and event notifications can be configured with SNS.

![The image is a flowchart illustrating a Simple Email Service process using AWS components like Lambda, S3, DynamoDB, and Comprehend. It shows the steps from sending an email to language detection and forwarding.](https://kodekloud.com/kk-media/image/upload/v1752864023/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-2/simple-email-service-flowchart-aws.jpg)

In one scenario, emails from an SES domain are processed via an SNS fan-out, stored in S3, and managed by additional AWS services. SES also features an event publishing function that relays data on deliveries, bounces, complaints, and more. Tools such as the Reputation Dashboard help track email performance and ensure compliance with industry standards.

![The image is a diagram illustrating the flow of Amazon Simple Email Service (SES), showing how emails are received, processed, and stored with encryption support. It includes components like Route 53, SNS, Lambda, and S3 buckets for email and attachment handling.](https://kodekloud.com/kk-media/image/upload/v1752864026/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-2/amazon-ses-email-flow-diagram.jpg)

![The image is a screenshot of an AWS Simple Email Service (SES) configuration page, showing options for specifying an event destination, with "Amazon SNS" selected and "SES_tracking" as the SNS topic. It highlights SES's capability to use standard logging and email sending events.](https://kodekloud.com/kk-media/image/upload/v1752864028/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-2/aws-ses-configuration-screenshot.jpg)

![The image shows an Amazon SES Reputation Dashboard with a "Healthy" account status, displaying bounce and complaint rates. It includes metrics and explanations for maintaining low rates to avoid suspension.](https://kodekloud.com/kk-media/image/upload/v1752864030/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-2/amazon-ses-reputation-dashboard-healthy.jpg)

![The image presents a question about which Amazon SES features can help a digital marketing agency monitor the reputation of their email sending, with four options listed: Reputation Dashboard, Email Preview, Email Templates, and Email Archiving.](https://kodekloud.com/kk-media/image/upload/v1752864031/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-2/amazon-ses-reputation-monitoring-options.jpg)

---

## Workflows and Orchestration

### AWS Step Functions

AWS Step Functions serves as an orchestrator and state machine for coordinating tasks, often managing multiple Lambda functions. Security is primarily enforced through IAM policies that restrict both invocation and execution rights, thereby preventing runaway workflows. Monitoring is achieved via CloudWatch, CloudTrail, and AWS X-Ray, while integration with SNS provides timely notifications to users.

![The image is a diagram illustrating an AWS Step Functions workflow, showing interactions between a user, Amazon EventBridge, Amazon SNS, and various AWS services for policy validation and user approval processes.](https://kodekloud.com/kk-media/image/upload/v1752864033/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-2/aws-step-functions-workflow-diagram.jpg)

![The image shows a service map and monitoring interface for AWS Step Functions, highlighting a 67% error rate in the "MyXRayStateMachine" with connections to various AWS services. It emphasizes the importance of using AWS X-Ray for monitoring.](https://kodekloud.com/kk-media/image/upload/v1752864034/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-2/aws-step-functions-service-map-monitoring.jpg)

### Amazon Simple Workflow Service (SWF)

An older orchestration service, Amazon SWF, is used for coordinating complex tasks (such as credit card processing or order management) through both sequential and parallel steps. SWF requires the invocation of underlying resources, and similar to other AWS services, it supports standard encryption and logging via CloudWatch and CloudTrail.

![The image illustrates a workflow process using Simple Workflow Service (SWF), showing steps from customer order to completion, involving order verifiers, credit card processors, warehouse employees, and database recorders. It notes that SWF is an older service for workflow orchestration, similar to step functions but not serverless or managed.](https://kodekloud.com/kk-media/image/upload/v1752864035/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-2/swf-workflow-process-diagram.jpg)

![The image presents a question about Amazon Simple Workflow Service (SWF) and provides four options describing its architecture and capabilities. It is designed to help a global e-commerce company manage and coordinate tasks across distributed application components.](https://kodekloud.com/kk-media/image/upload/v1752864037/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-2/amazon-swf-architecture-options.jpg)

Additional monitoring for SWF is accomplished using CloudWatch metrics, while changes in configuration are tracked with CloudTrail and AWS Config.

![The image is about Amazon's Simple Workflow Service (SWF), highlighting its features and integration with AWS services for encryption and tracking. It includes screenshots of metrics and workflow details.](https://kodekloud.com/kk-media/image/upload/v1752864039/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-2/amazon-swf-features-integration.jpg)

![The image describes monitoring solutions for a healthcare organization using Amazon Simple Workflow Service (SWF) for patient data processing, listing four options: using CloudWatch, integrating with AWS X-Ray, using Amazon S3 logging, and employing AWS Lambda.](https://kodekloud.com/kk-media/image/upload/v1752864040/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-2/healthcare-monitoring-aws-swf-solutions.jpg)

---

## AWS Managed Workflows for Apache Airflow (MWAA)

The final service covered in this lesson is AWS Managed Workflows for Apache Airflow (MWAA). This fully managed solution abstracts away the complexities of managing Apache Airflow components (such as schedulers, workers, and the metadata database), enabling you to focus on designing and running complex ETL workflows. MWAA leverages Amazon Aurora for metadata storage and integrates seamlessly with AWS services for logging and security via CloudWatch and IAM.

![The image illustrates the architecture of Amazon Managed Workflows for Apache Airflow (MWAA), highlighting its components such as Airflow Schedulers, Workers, and Meta Database, along with integration with AWS services like CloudWatch and S3. It also mentions features like encryption and IAM usage.](https://kodekloud.com/kk-media/image/upload/v1752864042/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-2/amazon-mwaa-architecture-diagram.jpg)

![The image is a presentation slide about Managed Apache Airflow, highlighting its use of standard logging and infrastructure protection, and includes a screenshot of the Amazon S3 setup for DAG code in MWAA.](https://kodekloud.com/kk-media/image/upload/v1752864043/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-2/managed-apache-airflow-presentation.jpg)

![The image presents a question about monitoring workflows using AWS Managed Workflows for Apache Airflow (MWAA), with four options: AWS MWAA Console, Amazon CloudWatch Metrics and Logs, AWS Step Functions, and AWS Lambda Invocation Logs.](https://kodekloud.com/kk-media/image/upload/v1752864044/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-2/aws-mwaa-workflow-monitoring-question.jpg)

---

## Summary

In this lesson, we covered various AWS application integration services designed to enhance operational scaling by serving as intermediaries between compute and data storage. Key takeaways include:

- **Built-In Encryption:** Most managed services offer encryption by default for data at rest and in transit.
- **Robust Logging and Monitoring:** CloudWatch and CloudTrail are typically used for logging and monitoring. In some cases, AWS X-Ray and AWS Config provide deeper insights.
- **Managed and Secure Integration:** These services reduce the need for manual configuration while ensuring strong security and operational oversight.

We look forward to exploring additional topics in our next lesson. Thank you for following along.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/fcdcac66-6274-4b2f-912a-d6e9de511e5a/lesson/04905cb7-d76d-41ac-ab79-81aa434ad5f9)**
>
> Watch video content
