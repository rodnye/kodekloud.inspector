# Lambda Basics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Serverless/Lambda-Basics)

---

## Table of Contents

- Lambda Basics
  - Benefits of AWS Lambda
  - Event-Driven Workflow with Lambda
  - Pricing Model
  - Event and Context Objects in Lambda
  - Performance Considerations
  - Summary
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Serverless

# Lambda Basics

In this article, we explore AWS Lambda—a serverless compute service by AWS that allows you to run your code without provisioning or managing servers. We'll discuss the challenges traditional deployments face and how Lambda simplifies the process so you can focus on writing code instead of managing infrastructure.

Imagine deploying an application on AWS traditionally. You might start by provisioning an EC2 instance, selecting the right AMI for your operating system, launching the instance, and then installing dependencies and configuring security (firewalls, environment settings, etc.). After transferring your code, you’d be responsible for bug fixes, patches, and routine maintenance. As your application scales, you must manually configure the EC2 instances to automatically scale with demand—a process that can become complex and time-consuming.

AWS Lambda streamlines this process. You simply upload your code, and AWS takes care of provisioning, scaling, and monitoring the underlying infrastructure. This serverless model lets you concentrate on your application logic without worrying about the servers.

Lambda functions are event-driven—a trigger dictates when your function executes. Once an event occurs, the function runs automatically to perform its assigned tasks.

![The image explains AWS Lambda, highlighting it as a serverless compute service that allows code execution without server management, with AWS handling maintenance, scaling, and logging.](https://kodekloud.com/kk-media/image/upload/v1752859506/notes-assets/images/AWS-Certified-Developer-Associate-Lambda-Basics/aws-lambda-serverless-compute-explained.jpg)

## Benefits of AWS Lambda

AWS Lambda offers several key advantages:

- **No Server Management:** No need to provision or maintain servers.
- **On-Demand Execution:** Functions run only when triggered by specific events.
- **Automatic Scaling:** Lambda scales automatically in response to incoming event traffic.
- **Cost Efficiency:** You pay only for the compute time and requests, avoiding costs for idle resources.
- **Seamless AWS Integration:** Works natively with AWS services like SQS, SNS, and more.
- **Multi-Language Support:** Supports common programming languages including Python, JavaScript, Ruby, and even custom runtimes.

![The image lists six benefits of a service, including no server management, on-demand operation, automated scaling, simple pricing, wide service integration, and multi-language support.](https://kodekloud.com/kk-media/image/upload/v1752859507/notes-assets/images/AWS-Certified-Developer-Associate-Lambda-Basics/service-benefits-no-server-management.jpg)

> [!important]
> **Container Image Deployments**
>
> Lambda functions can also be deployed using container images. Ensure your container image is compatible with Lambda by including an implementation of the AWS Lambda runtime API.

## Event-Driven Workflow with Lambda

Lambda functions are primarily event-driven. For instance, when a user uploads an image to an S3 bucket, this event can trigger a Lambda function to process it (such as resizing the image). Similarly, configuring API Gateway to trigger a Lambda function allows you to handle API requests and integrate with databases like DynamoDB or RDS.

![The image illustrates a Lambda event-driven workflow, showing a process where an image is uploaded to an S3 bucket, triggering a Lambda function.](https://kodekloud.com/kk-media/image/upload/v1752859508/notes-assets/images/AWS-Certified-Developer-Associate-Lambda-Basics/lambda-event-driven-workflow-s3.jpg)

Alternatively, you could build an API where API Gateway routes incoming user requests to a Lambda function that processes the business logic or database interactions.

![The image illustrates a Lambda API workflow, showing the interaction between users, Amazon API Gateway, Lambda Function, and Amazon DynamoDB.](https://kodekloud.com/kk-media/image/upload/v1752859510/notes-assets/images/AWS-Certified-Developer-Associate-Lambda-Basics/lambda-api-workflow-diagram.jpg)

Lambda functions are also ideal for microservices-based architectures, where distinct functions handle specific tasks or services. They can interact with external APIs, third-party services, or various database platforms.

![The image illustrates a Lambda microservices architecture with three interconnected Lambda functions (A, B, and C) interacting with an external API and Amazon DynamoDB.](https://kodekloud.com/kk-media/image/upload/v1752859511/notes-assets/images/AWS-Certified-Developer-Associate-Lambda-Basics/lambda-microservices-architecture-diagram.jpg)

## Pricing Model

AWS Lambda's pricing model is based on the number of requests and the total compute time your functions consume. This pay-per-use pricing can lead to significant cost savings compared to running and maintaining idle servers.

## Event and Context Objects in Lambda

When a Lambda function is triggered, it receives two essential objects:

- **Event Object:** Contains data or metadata about the triggering event (e.g., details about an image uploaded to an S3 bucket).
- **Context Object:** Provides information about the function invocation and execution environment, including:

  ```
  functionName
  functionVersion
  invokedFunctionArn
  awsRequestId
  logGroupName
  logStreamName
  getRemainingTimeInMillis
  ```

> [!important]
> **Understanding Context**
>
> The Context Object is crucial for diagnosing issues and monitoring function performance during execution.

## Performance Considerations

To optimize the performance of your Lambda function, consider allocating more memory. Increasing the memory allocation not only boosts available memory but also increases the CPU power proportionally. This can reduce timeouts and improve code execution speeds, though it might result in higher costs.

![The image illustrates the relationship between memory and CPU in a Lambda function, highlighting their impact on performance and cost.](https://kodekloud.com/kk-media/image/upload/v1752859512/notes-assets/images/AWS-Certified-Developer-Associate-Lambda-Basics/lambda-memory-cpu-performance-cost.jpg)

## Summary

AWS Lambda is a robust serverless compute service that enables you to run code without the hassle of managing servers. With automated scaling, support for a broad range of runtimes (including custom ones), and a cost-effective pricing model based solely on usage, Lambda helps streamline application development. When a function is invoked, it receives both an event and context object. Moreover, by increasing its memory allocation, your Lambda function can achieve enhanced CPU performance, ultimately leading to more efficient executions.

![The image is a summary of AWS Lambda features, highlighting its serverless compute service, on-demand scaling, runtime support, pricing model, and access to event and context objects.](https://kodekloud.com/kk-media/image/upload/v1752859513/notes-assets/images/AWS-Certified-Developer-Associate-Lambda-Basics/aws-lambda-features-summary.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/3c842ffc-5841-456d-9fad-7bb3af5fdbfc/lesson/da147569-4d3c-4dfd-891a-7a3ef9d45a94)**
>
> Watch video content
