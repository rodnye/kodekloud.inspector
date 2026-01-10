# Lambda Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications/Lambda-Deployment/Lambda-Overview)

---

## Table of Contents

- Lambda Overview
  - Why Do We Need Lambda?
  - What is AWS Lambda?
  - How Does Lambda Work?
  - Supported Runtimes and Container Deployments
  - Event-Driven Workflows and API Integration
  - Lambda Pricing Model
  - Understanding the Lambda Function Context
  - Optimizing Performance with Memory Configuration
  - Summary
  - Watch Video
    - Benefits of Using Lambda

---

## Content

Jenkins Project: Building CI/CD Pipeline for Scalable Web Applications

Lambda Deployment

# Lambda Overview

In this lesson, we explore AWS Lambda—a serverless compute service designed to simplify application deployment and management by eliminating the need for manual server provisioning and upkeep.

## Why Do We Need Lambda?

Traditionally, deploying an application on AWS using [Amazon Elastic Compute Cloud (EC2)](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2) involves several steps:

1.  Provisioning an EC2 instance with an appropriate AMI based on your chosen operating system.
2.  Installing all necessary dependencies on the instance.
3.  Securing the server with firewalls and additional security measures.
4.  Copying your application code onto the instance.
5.  Continuously handling maintenance tasks such as bug fixes, patch updates, and routine system checks.
6.  Configuring auto-scaling to handle traffic bursts by increasing capacity as needed and scaling down when demand drops.

![The image is a diagram illustrating the process of deploying an application on AWS, showing different operating systems, AMI, and components like dependencies, security, and code. It includes icons representing users and computing resources.](https://kodekloud.com/kk-media/image/upload/v1752879966/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Lambda-Overview/aws-application-deployment-diagram.jpg)

Handling these detailed tasks can be both complex and time-consuming. As a developer, you want to focus on writing code rather than managing the underlying infrastructure. Hiring an operations or infrastructure team is an option, yet it increases costs considerably. This challenge led to the emergence of serverless computing and AWS Lambda, which allows you to concentrate on your application without worrying about the servers.

## What is AWS Lambda?

AWS Lambda abstracts the complexity of managing servers by allowing you to simply upload your code. Once deployed, AWS handles:

- Provisioning the necessary compute resources.
- Automatic scaling based on demand.
- Logging and monitoring.

Even though physical servers still exist, Lambda manages them behind the scenes, letting you focus solely on your application logic.

![The image is an infographic about AWS Lambda, describing it as a serverless compute service that allows code execution without server management, with AWS handling server maintenance, scaling, and logging.](https://kodekloud.com/kk-media/image/upload/v1752879967/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Lambda-Overview/aws-lambda-serverless-infographic.jpg)

## How Does Lambda Work?

With AWS Lambda, you define triggers that determine when your function should run. Once an event occurs, the respective Lambda function executes to perform its assigned tasks.

![The image illustrates a process where a "Trigger" initiates an AWS Lambda function, represented by their respective icons.](https://kodekloud.com/kk-media/image/upload/v1752879968/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Lambda-Overview/trigger-aws-lambda-process-illustration.jpg)

### Benefits of Using Lambda

- **No Server Management**: Deploy functions that run on demand with no manual server provisioning or ongoing maintenance.
- **Automatic Scaling**: Functions dynamically scale to match sudden increases in traffic and scale back down when demand decreases.
- **Cost Efficiency**: Pay solely for the number of requests and the compute time consumed by your functions, minimizing expenses on underutilized resources.
- **Seamless Integration**: AWS Lambda integrates effortlessly with various AWS services such as SQS, SNS, DynamoDB, and more.
- **Multi-Language Support**: Out-of-the-box support for popular runtimes like Ruby, JavaScript, Python, and more, plus the option to implement custom runtimes if necessary.

![The image lists six benefits of a service, including no server management, on-demand operation, automated scaling, simple pricing, wide service integration, and multi-language support.](https://kodekloud.com/kk-media/image/upload/v1752879969/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Lambda-Overview/service-benefits-no-server-management.jpg)

## Supported Runtimes and Container Deployments

AWS Lambda supports a diverse range of programming languages and runtimes, including Node.js, Ruby, Go, C#, Java, and Python. If your preferred language is missing, you can develop a custom runtime.

![The image shows logos of various programming languages and runtimes, including Node.js, Ruby, Go, C#, Java, Python, and a "Custom Runtime" option, under the title "Lambda Runtimes."](https://kodekloud.com/kk-media/image/upload/v1752879970/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Lambda-Overview/lambda-runtimes-programming-logos.jpg)

Additionally, Lambda functions can be deployed using container images. However, these images must be compatible with Lambda by implementing the AWS Lambda runtime API—arbitrary Docker images will not suffice.

![The image illustrates the deployment of Lambda functions as containers using Amazon ECR. It shows a flow from Amazon ECR to a Lambda function, indicating the process of deploying functions.](https://kodekloud.com/kk-media/image/upload/v1752879971/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Lambda-Overview/lambda-functions-ecr-deployment-diagram.jpg)

## Event-Driven Workflows and API Integration

AWS Lambda is ideal for event-driven workflows. For example, when a user uploads an image to an [Amazon Simple Storage Service (Amazon S3)](https://learn.kodekloud.com/user/courses/amazon-simple-storage-service-amazon-s3) bucket, this event can trigger a Lambda function to resize the image and even send a notification via Amazon SNS.

![The image illustrates a Lambda event-driven workflow, showing a sequence from an image to an S3 bucket, and then to a Lambda function.](https://kodekloud.com/kk-media/image/upload/v1752879972/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Lambda-Overview/lambda-event-driven-workflow.jpg)

Lambda also makes it easy to build APIs by integrating with AWS API Gateway. In this configuration, API Gateway handles HTTP requests, passing them to Lambda functions, which in turn interact with services like DynamoDB or [AWS RDS](https://learn.kodekloud.com/user/courses/aws-rds).

![The image illustrates a Lambda API workflow, showing the interaction between users, Amazon API Gateway, Lambda Function, and Amazon DynamoDB.](https://kodekloud.com/kk-media/image/upload/v1752879974/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Lambda-Overview/lambda-api-workflow-diagram.jpg)

Moreover, Lambda supports a microservices architecture where separate functions perform individual tasks and interact with external APIs, third-party services, or databases.

![The image illustrates a Lambda microservices architecture with three interconnected Lambda functions (A, B, and C) and their interactions with an external API and Amazon DynamoDB.](https://kodekloud.com/kk-media/image/upload/v1752879975/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Lambda-Overview/lambda-microservices-architecture-diagram.jpg)

## Lambda Pricing Model

AWS Lambda offers a straightforward pricing model based on:

- The number of times your function is invoked.
- The total compute time consumed by your function.

Keep in mind that longer execution times lead to higher costs.

![The image explains Lambda pricing, highlighting that it is based on the number of requests received and the amount of compute time consumed.](https://kodekloud.com/kk-media/image/upload/v1752879976/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Lambda-Overview/lambda-pricing-requests-compute.jpg)

## Understanding the Lambda Function Context

When AWS Lambda triggers a function, it passes two primary pieces of information:

- **Event Object**: Contains data and metadata about the event that triggered the function (for example, details about an uploaded file in an S3 bucket).
- **Context Object**: Provides information about the invocation, including function configuration and execution environment. Key properties include:

```
functionName
functionVersion
invokedFunctionArn
awsRequestId
logGroupName and logStreamName
getRemainingTimeInMillis
```

## Optimizing Performance with Memory Configuration

A Lambda function’s performance can be significantly influenced by its memory allocation. Although increasing memory does not directly increase CPU power, AWS allocates more CPU power alongside additional memory resources. If your function experiences timeouts or slow performance, consider increasing its memory allocation to boost both memory and CPU capacity.

> [!important]
> **Note**
>
> Increasing memory allocation will improve performance but may also lead to increased costs.

## Summary

AWS Lambda is a robust serverless compute service that empowers developers to run code without the overhead of managing physical servers. Key benefits include:

- On-demand execution with automatic scaling.
- Support for major and custom runtimes.
- A transparent pricing model based on invocations and compute time.
- Seamless integration with various AWS services.
- Enhanced performance through adjustable memory (and accompanying CPU) configuration.

By shifting operational responsibilities to AWS, Lambda allows you to focus on building great applications while AWS manages the scaling, infrastructure, and maintenance.

For further details, check out:

- [AWS Lambda Documentation](https://aws.amazon.com/lambda/)
- [Deploying Serverless Applications with AWS Lambda](https://aws.amazon.com/serverless/)
- [AWS Compute Services](https://aws.amazon.com/compute/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-project-building-ci-cd-pipeline-for-scalable-web-applications/module/ddd997d7-0eea-4fa7-8265-5feeb01301e8/lesson/8b6315dd-6bf1-4904-991c-26c5fb484fe5)**
>
> Watch video content
