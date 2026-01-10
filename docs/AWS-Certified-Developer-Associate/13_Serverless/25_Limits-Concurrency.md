# Limits Concurrency - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Serverless/Limits-Concurrency)

---

## Table of Contents

- Limits Concurrency
  - Cold Starts
  - Lambda Limits
  - Additional Limits and Hard Restrictions
  - Summary
  - Watch Video
    - Soft Limits
    - Concurrency Management
    - Additional Soft Limits
    - Hard Limits Overview

---

## Content

AWS Certified Developer - Associate

Serverless

# Limits Concurrency

In this article, we explore AWS Lambda limits and concurrency with a focus on cold starts and how provisioned concurrency can help mitigate their impact. Understanding these concepts is essential for optimizing the performance of your serverless applications.

## Cold Starts

A cold start occurs when an AWS Lambda function is invoked after a period of inactivity. During a cold start, AWS initializes a new instance of the function by downloading the code, starting a new container, and loading the runtime. This initialization process introduces additional latency, which can affect latency-sensitive applications.

![The image illustrates the AWS Lambda cold start process, showing the sequence from a trigger to the execution of a Lambda function, including downloading code, starting a new container, and loading into runtime.](https://kodekloud.com/kk-media/image/upload/v1752859582/notes-assets/images/AWS-Certified-Developer-Associate-Limits-Concurrency/aws-lambda-cold-start-process.jpg)

To reduce the impact of cold starts, AWS offers a feature known as provisioned concurrency. With provisioned concurrency, you can pre-allocate a specific number of function instances that are fully initialized and ready to serve incoming requests immediately—even during high-demand periods.

![The image illustrates the process of mitigating with provisioned concurrency in AWS Lambda, showing a trigger leading to a warm instance where the function is invoked.](https://kodekloud.com/kk-media/image/upload/v1752859583/notes-assets/images/AWS-Certified-Developer-Associate-Limits-Concurrency/aws-lambda-provisioned-concurrency-diagram.jpg)

> [!important]
> **Tip**
>
> Provisioned concurrency is particularly useful for applications with unpredictable usage patterns or for those that require consistent low latency.

## Lambda Limits

AWS Lambda enforces various limits to ensure efficient resource usage. These limits fall into two categories: soft limits, which can be increased upon request, and hard limits, which are fixed.

### Soft Limits

| Resource                   | Default Limit                             | Additional Details                                                                        |
| -------------------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------- |
| Concurrent Executions      | 1,000 concurrent executions               | This limit is shared across all functions in your account. Request an increase if needed. |
| Function and Layer Storage | 75 GB                                     | Applies to the combined storage of your function code and its layers.                     |
| Elastic Network Interfaces | 250 ENIs per VPC (up to 2,000 on request) | Relevant for functions that require VPC connectivity.                                     |

![The image shows a table of AWS Lambda soft limits, including concurrent executions, function and layer storage, and elastic network interfaces per VPC, with their respective default limits.](https://kodekloud.com/kk-media/image/upload/v1752859584/notes-assets/images/AWS-Certified-Developer-Associate-Limits-Concurrency/aws-lambda-soft-limits-table.jpg)

### Concurrency Management

Concurrency in AWS Lambda refers to the number of function instances processing events simultaneously. If one function consumes a significant portion of the available concurrency, it could negatively affect other functions. To address this, you can set reserved concurrency for individual functions. For example, reserving 500 concurrent executions for a function ensures that it will never exceed that limit. When the reserved concurrency is reached, synchronous invocations may return a throttle error (HTTP 429), while asynchronous invocations will retry and may eventually be sent to a dead letter queue.

![The image illustrates the concept of concurrency limits in AWS Lambda, showing that the concurrency limit is shared across all functions, with a "Limit reached" indicator.](https://kodekloud.com/kk-media/image/upload/v1752859585/notes-assets/images/AWS-Certified-Developer-Associate-Limits-Concurrency/aws-lambda-concurrency-limits-diagram.jpg)

![The image explains setting "reserved concurrency" for a function to limit its maximum concurrency, preventing it from starving other functions and addressing synchronous invocation errors.](https://kodekloud.com/kk-media/image/upload/v1752859586/notes-assets/images/AWS-Certified-Developer-Associate-Limits-Concurrency/reserved-concurrency-function-settings.jpg)

### Additional Soft Limits

- **Memory Allocation**: Assign between 128 MB and 10,240 MB to your Lambda function.
- **Function Timeout**: Functions can run for up to 15 minutes.
- **Environment Variables Size**: The total size of environment variables is limited to 4 KB.
- **Layers per Function**: Up to five layers can be added to a function.
- **Concurrency Scaling**: Each function supports up to 1,000 execution environments, scaling every 10 seconds.

![The image is a table listing various AWS Lambda limits, including memory allocation, function timeout, and invocation payload sizes.](https://kodekloud.com/kk-media/image/upload/v1752859587/notes-assets/images/AWS-Certified-Developer-Associate-Limits-Concurrency/aws-lambda-limits-table.jpg)

## Additional Limits and Hard Restrictions

AWS Lambda also enforces additional specific limits:

- **Container Image Settings**: Container image code packages can be as large as 10 GB.
- **Temporary Directory Storage (/tmp)**: Configurable up to 10,240 MB.
- **File Descriptors and Threads**: Limited to 1,024 per function.

![The image shows a table listing various AWS Lambda limits, including container image settings size, code package size, test events, directory storage, file descriptors, and execution processes/threads.](https://kodekloud.com/kk-media/image/upload/v1752859588/notes-assets/images/AWS-Certified-Developer-Associate-Limits-Concurrency/aws-lambda-limits-table-2.jpg)

### Hard Limits Overview

Below are the key hard limits applied to AWS Lambda functions:

- **Memory**: Maximum allocation of 10,240 MB.
- **Function Timeout**: Capped at 15 minutes.
- **Deployment Package Size**: 50 MB for direct uploads; 250 MB when uploaded via S3.
- **Environment Variables**: Total size must not exceed 4 KB.
- **Layers**: Maximum of five layers is allowed, with additional constraints on unzipped deployment sizes.
- **Temporary Storage (/tmp)**: Supports up to 10 GB.
- **File Descriptors, Processes, and Threads**: Each is limited to 1,024.

![The image outlines the hard limits for AWS Lambda, including memory allocation, function timeout, deployment package size, and environmental variables. Each limit is specified with its respective constraints and values.](https://kodekloud.com/kk-media/image/upload/v1752859590/notes-assets/images/AWS-Certified-Developer-Associate-Limits-Concurrency/aws-lambda-hard-limits-overview.jpg)

![The image outlines AWS Lambda hard limits, including layer limits, function layer sizes, and ephemeral storage capacity. It specifies constraints on the number of layers, maximum sizes for functions and layers, and available disk space.](https://kodekloud.com/kk-media/image/upload/v1752859591/notes-assets/images/AWS-Certified-Developer-Associate-Limits-Concurrency/aws-lambda-hard-limits-diagram.jpg)

![The image describes AWS Lambda hard limits, specifically the file descriptor limit and execution processes/threads limit, both set at 1,024.](https://kodekloud.com/kk-media/image/upload/v1752859592/notes-assets/images/AWS-Certified-Developer-Associate-Limits-Concurrency/aws-lambda-hard-limits-diagram-2.jpg)

> [!important]
> **Important**
>
> Ensure that your application’s requirements align with AWS Lambda's limits to avoid performance bottlenecks or resource starvation. For critical workloads, consider reviewing and adjusting these limits as necessary.

## Summary

Cold starts can lead to increased latency as AWS initializes a new instance of your Lambda function after inactivity. Provisioned concurrency can alleviate this by keeping a defined number of instances warm and ready for use. AWS Lambda enforces several limits—both soft and hard—on resources such as concurrent executions, memory, deployment package sizes, and more. Being aware of these constraints and managing concurrency appropriately is key to maintaining optimal performance across your serverless applications.

![The image is a summary slide discussing AWS Lambda, highlighting cold starts, provisioned concurrency, and concurrency limits.](https://kodekloud.com/kk-media/image/upload/v1752859594/notes-assets/images/AWS-Certified-Developer-Associate-Limits-Concurrency/aws-lambda-summary-cold-starts.jpg)

The memory allocation for your Lambda functions can range from 128 MB to 10,240 MB, and the maximum function timeout is 15 minutes. Additionally, direct deployment package uploads are limited to 50 MB, while packages uploaded through S3 can be up to 250 MB.

For further details, always refer to the [AWS Lambda Documentation](https://aws.amazon.com/lambda/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/3c842ffc-5841-456d-9fad-7bb3af5fdbfc/lesson/968ec466-ad96-4e19-a343-bf12beecf35c)**
>
> Watch video content
