# Logging Monitoring - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Serverless/Logging-Monitoring)

---

## Table of Contents

- Logging Monitoring
  - Key CloudWatch Metrics for Lambda Functions
  - Tracing with AWS X-Ray
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Serverless

# Logging Monitoring

In this lesson, you will learn how to effectively implement logging and monitoring for your AWS Lambda functions to ensure optimum performance and troubleshooting capabilities.

By default, each Lambda function is configured to emit logs and metrics directly to CloudWatch. When you assign an execution role to your Lambda function, that role is generally equipped with the necessary permissions to write both logs and metrics to CloudWatch. This setup enables you to review detailed logs and crucial metrics, helping you thoroughly understand your function's behavior.

![The image is a diagram illustrating the flow of AWS Lambda functions, showing how they interact with AWS IAM Execution Roles and CloudWatch Logs and Metrics.](https://kodekloud.com/kk-media/image/upload/v1752859595/notes-assets/images/AWS-Certified-Developer-Associate-Logging-Monitoring/aws-lambda-flow-diagram.jpg)

## Key CloudWatch Metrics for Lambda Functions

Monitoring your AWS Lambda functions involves keeping an eye on several key metrics provided by CloudWatch. Below are some of the essential metrics:

- **Invocations**: Number of times your Lambda function is triggered.
- **Duration**: Total running time of your function during each invocation.
- **Errors**: Count of invocations that resulted in an error.
- **Success Rate**: Percentage of successful invocations compared to total invocations.
- **Throttles**: Number of times the function was throttled due to rate limits.
- **Concurrent Executions**: Number of functions executing simultaneously.
- **Async Delivery Failures**: For asynchronous invocations, tracks the number of events that failed to deliver.
- **Dead Letter Queue Failures**: Number of instances where an event could not be redirected to the dead letter queue.
- Additional metrics such as **Iterator Age** (important for functions triggered by Kinesis or DynamoDB Streams) and **Provisioned Concurrency Utilization** are also available to provide deeper insights.

![The image lists seven CloudWatch metrics: Invocations, Duration, Errors, Success Rate, Throttles, Concurrent Executions, and Async Delivery Failures, each with an icon.](https://kodekloud.com/kk-media/image/upload/v1752859596/notes-assets/images/AWS-Certified-Developer-Associate-Logging-Monitoring/cloudwatch-metrics-list-icons.jpg)

> [!important]
> **Note**
>
> Enabling detailed logging and metrics allows you to quickly identify performance bottlenecks or errors, ensuring that you can maintain high availability and efficiency in your applications.

## Tracing with AWS X-Ray

In addition to logging and metrics, tracing is an essential part of the monitoring process for AWS Lambda functions. AWS X-Ray is a powerful service for distributed tracing that provides end-to-end insights into your application’s performance.

To enable X-Ray tracing for your Lambda function, follow these steps:

1.  Toggle the **Active Tracing** setting in your Lambda function configuration.
2.  Ensure your Lambda function has the appropriate IAM permissions to send trace data to X-Ray. AWS offers a managed policy, **AWSXRayDaemonWriteAccess**, which grants the necessary permissions.

![The image provides instructions for enabling X-Ray tracing in AWS Lambda, including toggling the "Active Tracing" setting and ensuring proper IAM permissions with the AWSXRayDaemonWriteAccess policy.](https://kodekloud.com/kk-media/image/upload/v1752859597/notes-assets/images/AWS-Certified-Developer-Associate-Logging-Monitoring/aws-lambda-xray-tracing-instructions.jpg)

> [!important]
> **Important Tip**
>
> By integrating AWS X-Ray with your Lambda functions, you can enhance your troubleshooting capabilities and gain detailed insights into the operational flow of your application.

This configuration ensures that your Lambda functions effectively send relevant logs, metrics, and trace data to AWS services. As a result, you gain a comprehensive monitoring ecosystem that supports in-depth analysis, troubleshooting, and continuous optimization of your serverless applications.

For further reading on AWS Lambda, CloudWatch metrics, and X-Ray tracing, consider exploring these additional resources:

- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/)
- [Amazon CloudWatch Documentation](https://docs.aws.amazon.com/cloudwatch/)
- [AWS X-Ray Documentation](https://docs.aws.amazon.com/xray/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/3c842ffc-5841-456d-9fad-7bb3af5fdbfc/lesson/d8a6dbd4-968f-43d9-b63e-e6512a0b1b5f)**
>
> Watch video content
