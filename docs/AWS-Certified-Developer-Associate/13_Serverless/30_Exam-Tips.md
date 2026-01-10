# Exam Tips - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Serverless/Exam-Tips)

---

## Table of Contents

- Exam Tips
  - Storage Options and EFS Integration
  - CloudFront Functions and Lambda@Edge
  - EventBridge Integration
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Serverless

# Exam Tips

In this lesson, we review several important points and best practices for the [AWS Certified Developer - Associate](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate) exam, focusing on AWS Lambda features.

AWS Lambda is a serverless compute service that lets you run your code without provisioning or managing servers. It automatically scales on demand and supports most major runtimes, including custom runtimes via container images. When using a container image with Lambda, ensure the image is compatible and implements the AWS Lambda runtime. Pricing is based on the number of requests and the total compute time.

![The image provides exam tips for AWS Lambda, highlighting features like on-demand scaling, runtime support, container deployment, and pricing based on requests and compute time.](https://kodekloud.com/kk-media/image/upload/v1752859462/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/aws-lambda-exam-tips-features.jpg)

Each Lambda function receives an event along with a context object. Increasing the allocated memory not only enhances available memory but also increases the CPU power, resulting in faster execution.

Lambda functions can be invoked both synchronously and asynchronously:

- **Synchronous invocations:** Typically integrated with API Gateway, Elastic Load Balancer, Cognito, Step Functions, and Lambda@Edge. In these cases, the function returns an immediate response, and any errors must be handled by the client.
- **Asynchronous invocations:** Commonly triggered via SNS, SQS, EventBridge, or S3 events, where an immediate response is not required. Error handling is usually managed by reviewing CloudWatch logs.

![The image provides exam tips for AWS Lambda, covering synchronous and asynchronous invocations, error handling, and the use of CloudWatch logs.](https://kodekloud.com/kk-media/image/upload/v1752859463/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/aws-lambda-exam-tips-logs.jpg)

Lambda layers enable the sharing of external dependencies (e.g., libraries or common code) among multiple functions, with a limit of up to five layers per function. Additionally, Lambda functions can integrate with Elastic Load Balancers, which convert request details into JSON for the function and then translate the function's response back into an HTTP response. Multi-value headers can be enabled and are converted to arrays when passed to the Lambda function.

Environment variables allow you to store sensitive information, such as database credentials or secrets, separately from your code, and these variables can be encrypted using AWS KMS.

![The image provides exam tips for AWS Lambda, covering topics like Lambda layers, integration with Elastic Load Balancer, and handling multi-value headers.](https://kodekloud.com/kk-media/image/upload/v1752859464/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/aws-lambda-exam-tips.jpg)

Lambda supports versioning, which creates immutable snapshots of your function code. You can reference the latest version with an alias, a pointer to a specific version. Lambda aliases can also split traffic between multiple versions, enabling gradual deployments and A/B testing.

During asynchronous invocations, if a Lambda function throws an error, AWS automatically retries the execution up to two additional times. These attempts appear in CloudWatch logs, reflecting that the function executed a total of three times. Failed jobs can be redirected to a Dead Letter Queue (DLQ) via Amazon SQS. After resolving the issue, you can reprocess the job by moving the message back to the original queue. Remember that the DLQ must be of the same type as the source queue (e.g., FIFO).

![The image provides exam tips for AWS Lambda, explaining error handling during asynchronous invocations, including retry attempts, CloudWatch logs, and the use of Dead Letter Queues (DLQ).](https://kodekloud.com/kk-media/image/upload/v1752859465/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/aws-lambda-exam-tips-error-handling.jpg)

Lambda Destinations offer an alternative to DLQs by allowing you to specify post-invocation actions. You can define separate destinations for successful and failed executions, providing more flexibility for routing results.

> [!important]
> **Note**
>
> By default, Lambda functions can access the internet. However, when running inside a Virtual Private Cloud (VPC), Lambda functions lack access to private subnet resources unless properly configured. An Elastic Network Interface (ENI) is created in the selected private subnet, and without appropriate routing (e.g., via a NAT Gateway or VPC endpoint), the function loses internet access.

![The image provides exam tips for AWS Lambda, covering topics like Lambda Destinations, internet access, and running functions within a VPC.](https://kodekloud.com/kk-media/image/upload/v1752859467/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/aws-lambda-exam-tips-guide.jpg)

## Storage Options and EFS Integration

AWS Lambda offers various storage options:

- **S3:** Object storage.
- **Amazon EFS:** Connectivity to a remote file system.
- **Ephemeral Storage:** The `/tmp` directory exists for the duration of the execution context.
- **Lambda Layers:** Used for storing additional packages and dependencies.

When using EFS, the mount point integrates the EFS file system into your Lambda execution environment. Note that EFS supports up to 250,000 connections per file system, and Lambda maintains these connections across invocations. Reserved concurrency can help manage the number of simultaneous connections to ensure you do not exceed EFS limits. EFS also operates on a bursting model, where throughput scales with file system size. If you employ provisioned concurrency, be aware that burst credits may be consumed even during idle periods.

![The image provides exam tips for AWS Lambda, listing storage options such as S3, EFS, /tmp, and Layers, and explains the mount point for EFS.](https://kodekloud.com/kk-media/image/upload/v1752859468/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/aws-lambda-exam-tips-storage-options.jpg)

Cold starts can occur when a Lambda function is invoked after a period of inactivity, causing AWS to initialize a new instance and increasing latency. Provisioned concurrency helps mitigate cold starts by pre-allocating a specified number of instances.

By default, AWS Lambda limits total concurrent executions to 1,000; however, you can request an increase by contacting AWS support. Since this limit is shared across all functions, one function could potentially starve another. To prevent this, you can configure reserved concurrency to cap the maximum concurrent executions for a specific function. If a function exceeds its reserved concurrency limit, synchronous invocations will receive a 429 throttle error, while asynchronous invocations are retried automatically and might eventually be routed to a DLQ.

![The image provides exam tips for AWS Lambda, discussing cold starts, provisioned concurrency, and concurrency limits, including how to manage and increase them.](https://kodekloud.com/kk-media/image/upload/v1752859469/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/aws-lambda-exam-tips-concurrency.jpg)

Lambda functions allow memory allocation from 128 MB up to 10,240 MB in 1 MB increments. The maximum execution timeout is 15 minutes, and when uploading a ZIP file directly via AWS, the deployment package is limited to 50 MB (or 250 MB when using S3).

![The image provides exam tips for AWS Lambda, detailing memory allocation, function timeout, and maximum deployment size for .zip files.](https://kodekloud.com/kk-media/image/upload/v1752859470/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/aws-lambda-exam-tips-memory-timeout.jpg)

Additional limits include:

- **Environment Variables:** Maximum size of 4 KB.
- **Lambda Layers:** Up to five layers per function.
- **Ephemeral Disk Space:** The `/tmp` directory offers between 512 MB and 10 GB.

![The image provides exam tips for AWS Lambda, highlighting environment variable limits, layer assignments, and disk space access.](https://kodekloud.com/kk-media/image/upload/v1752859471/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/aws-lambda-exam-tips-2.jpg)

## CloudFront Functions and Lambda@Edge

AWS also offers CloudFront Functions and Lambda@Edge, enabling you to run code at edge locations. These functions are ideal for:

- Manipulating requests and responses.
- Performing authentication and authorization.
- Executing URL redirects.
- Normalizing cache keys.

CloudFront Functions trigger when CloudFront receives a request or sends a response, making them suitable for lightweight, short-running tasks. In contrast, Lambda@Edge functions are better for longer-running, configurable tasks, particularly when third-party libraries or network access is required. These functions can trigger on requests, responses, or origin response events.

![The image provides exam tips for AWS Lambda and CloudFront, highlighting use cases such as request manipulation, authentication, URL redirects, and cache key normalization. It also explains when CloudFront functions and Lambda@Edge triggers run.](https://kodekloud.com/kk-media/image/upload/v1752859472/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/aws-lambda-cloudfront-exam-tips.jpg)

## EventBridge Integration

AWS Lambda functions can also be triggered by events from various AWS services using EventBridge. This integration is particularly useful for scheduling tasks in a manner similar to cron jobs.

![The image provides exam tips comparing Lambda@Edge and CloudFront functions, highlighting their suitability for different types of functions. Lambda@Edge is better for longer running, configurable, and network-dependent functions, while CloudFront is better for lightweight, short-running functions.](https://kodekloud.com/kk-media/image/upload/v1752859474/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/lambda-edge-cloudfront-exam-tips.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/3c842ffc-5841-456d-9fad-7bb3af5fdbfc/lesson/53234ea3-4178-427a-b03c-468452a9471c)**
>
> Watch video content
