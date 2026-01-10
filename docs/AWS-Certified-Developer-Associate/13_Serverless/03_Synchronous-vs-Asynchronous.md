# Synchronous vs Asynchronous - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Serverless/Synchronous-vs-Asynchronous)

---

## Table of Contents

- Synchronous vs Asynchronous
  - Synchronous Invocations
  - Asynchronous Invocations
  - Summary
  - Watch Video
    - Common Services Triggering Synchronous Invocations
    - Common Services Triggering Asynchronous Invocations

---

## Content

AWS Certified Developer - Associate

Serverless

# Synchronous vs Asynchronous

In this article, we explore the key differences between synchronous and asynchronous Lambda function invocations. Understanding these invocation models is essential for designing scalable and resilient AWS serverless applications.

## Synchronous Invocations

Synchronous invocation occurs when a user or service directly calls a Lambda function and waits for an immediate response. In this model, the client sends a request that triggers the Lambda function, which processes the input and then returns a response directly. This method is ideal when the result of the operation is required instantly.

A common use case is the integration between Lambda and API Gateway. When a user sends an HTTP request to API Gateway, it triggers the Lambda function, processes the request, and returns the response back to the client. With this approach, any errors that occur during function execution are handled on the client side, meaning that the client must manage retries or alternative error-handling logic.

![The image illustrates the concept of synchronous invocation, showing how a user or service directly invokes a Lambda function and waits for a response, with error handling on the client side. It includes a diagram with a user, Amazon API Gateway, and Lambda functions.](https://kodekloud.com/kk-media/image/upload/v1752859605/notes-assets/images/AWS-Certified-Developer-Associate-Synchronous-vs-Asynchronous/synchronous-invocation-lambda-diagram.jpg)

### Common Services Triggering Synchronous Invocations

Synchronous invocations are frequently used across various AWS services. Examples include:

- API Gateway
- Lambda@Edge
- Step Functions
- Elastic Load Balancers
- Amazon Cognito

These integrations typically trigger immediate responses, making them suitable for client-facing applications.

![The image lists AWS services related to synchronous invocation, including API Gateway, Lambda@Edge, Elastic Load Balancer, Amazon Cognito, S3 Batch, and Step Functions.](https://kodekloud.com/kk-media/image/upload/v1752859606/notes-assets/images/AWS-Certified-Developer-Associate-Synchronous-vs-Asynchronous/aws-synchronous-invocation-services.jpg)

> [!important]
> **Note**
>
> When using synchronous invocations, ensure that your client application is prepared to manage potential errors and implement proper retry strategies.

## Asynchronous Invocations

Asynchronous invocations are ideal when the immediate response of a Lambda function is not required. In this model, the function is triggered, and the processing happens in the background. This method is useful for offloading tasks that do not need immediate client feedback.

For example, when an image is uploaded to an S3 bucket, an event triggers a Lambda function to process the image asynchronously. The function processes the image without returning a direct response to the original uploader.

![The image illustrates an asynchronous invocation process where an image is uploaded to an S3 bucket, creating a new job that is processed by a Lambda function.](https://kodekloud.com/kk-media/image/upload/v1752859607/notes-assets/images/AWS-Certified-Developer-Associate-Synchronous-vs-Asynchronous/asynchronous-s3-upload-lambda-process.jpg)

With asynchronous invocations, errors during execution are not immediately returned to the client but can be monitored via CloudWatch logs.

### Common Services Triggering Asynchronous Invocations

Lambda functions can also be integrated asynchronously with several services:

- Amazon SQS (Simple Queue Service)
- Amazon SNS (Simple Notification Service)
- Amazon EventBridge
- S3 events

![The image lists four asynchronous invocation services: Simple Queue Service (SQS), EventBridge, Simple Notification Service (SNS), and S3 Events, each represented by an icon.](https://kodekloud.com/kk-media/image/upload/v1752859609/notes-assets/images/AWS-Certified-Developer-Associate-Synchronous-vs-Asynchronous/asynchronous-invocation-services-icons.jpg)

> [!important]
> **Note**
>
> For asynchronous processes, it is crucial to set up proper monitoring using Amazon CloudWatch to track errors and performance metrics.

## Summary

Lambda functions offer flexibility by supporting both synchronous and asynchronous invocation models. Here’s a quick comparison:

| Invocation Type          | Response Behavior                                  | Error Handling                  | Example Integrations                                          |
| ------------------------ | -------------------------------------------------- | ------------------------------- | ------------------------------------------------------------- |
| Synchronous Invocations  | Immediate response to the caller                   | Client must handle errors       | API Gateway, Lambda@Edge, Step Functions, ELB, Amazon Cognito |
| Asynchronous Invocations | Background processing without waiting for response | Monitor errors using CloudWatch | SNS, SQS, EventBridge, S3 events                              |

![The image is a summary slide about Lambda functions, detailing their synchronous and asynchronous invocation, immediate response, error handling, and examples of synchronous invocations.](https://kodekloud.com/kk-media/image/upload/v1752859610/notes-assets/images/AWS-Certified-Developer-Associate-Synchronous-vs-Asynchronous/lambda-functions-summary-invocation.jpg)

By understanding these two invocation methods, you can choose the best approach based on your application’s requirements—ensuring optimal performance and reliability in your serverless architecture.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/3c842ffc-5841-456d-9fad-7bb3af5fdbfc/lesson/f7c83873-3a9a-40e6-a5b1-0d2544a541da)**
>
> Watch video content
