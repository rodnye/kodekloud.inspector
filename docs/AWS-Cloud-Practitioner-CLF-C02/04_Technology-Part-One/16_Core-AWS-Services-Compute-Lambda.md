# Core AWS Services Compute Lambda - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Cloud-Practitioner-CLF-C02/Technology-Part-One/Core-AWS-Services-Compute-Lambda)

---

## Table of Contents

- Core AWS Services Compute Lambda
  - Traditional AWS Deployment with EC2
  - Introducing AWS Lambda
  - Lambda Use Cases
  - Core Components of AWS Lambda
  - Benefits of AWS Lambda
  - Considerations and Limitations
  - AWS Lambda Pricing Model
  - Summary
  - Watch Video
    - What is AWS Lambda?

---

## Content

AWS Cloud Practitioner CLF-C02

Technology Part One

# Core AWS Services Compute Lambda

In this article, we delve into AWS Lambda—a serverless compute service that takes away much of the complexity associated with traditional server management on AWS.

Before exploring AWS Lambda, let's review a typical AWS deployment scenario.

## Traditional AWS Deployment with EC2

Normally, deploying an application on AWS follows these steps:

1.  **Provisioning an EC2 Instance:**  
    Launch an EC2 instance by selecting an appropriate Amazon Machine Image (AMI) for your operating system. Once the instance is running, connect via SSH, install the necessary dependencies, and set up security measures, including firewall configurations, to allow only authorized traffic.
2.  **Deploying and Maintaining Your Application:**  
    After securing the instance, copy your application code and configure it to run smoothly. However, ongoing maintenance tasks—such as patching vulnerabilities, applying software upgrades, and managing scaling during traffic spikes—remain your responsibility. For instance, if traffic increases, you'll either need to manually add more instances or configure auto-scaling to handle the load. Conversely, when traffic subsides, you must scale down to avoid unnecessary costs.

![The image illustrates deploying applications on AWS, showing operating systems, AMI, code, dependencies, security, and a processor, emphasizing secure and efficient deployment.](https://kodekloud.com/kk-media/image/upload/v1752861902/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Compute-Lambda/frame_60.jpg)

Managing these infrastructure tasks can be complex and time-consuming, distracting developers from their primary task of writing code.

## Introducing AWS Lambda

AWS Lambda eliminates the need for manual server management by handling infrastructure, scaling, and maintenance tasks on your behalf. With Lambda, you simply upload your code, and AWS takes care of the rest.

### What is AWS Lambda?

AWS Lambda is a serverless compute service that allows you to run your code without provisioning or managing servers. Once deployed, Lambda automatically handles the infrastructure, such as creating EC2 instances, deploying your code, and executing it. This transforms your development approach, allowing you to concentrate on coding rather than managing servers.

![The image explains AWS Lambda, a serverless compute service that runs code without provisioning servers, with AWS handling maintenance, scaling, capacity, and logging.](https://kodekloud.com/kk-media/image/upload/v1752861904/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Compute-Lambda/frame_170.jpg)

Lambda scales automatically to meet demand by running more instances as needed—all without any extra intervention.

> [!important]
> **How It Works**
>
> Although the term "serverless" implies the absence of servers, AWS Lambda still uses servers behind the scenes. AWS manages a pool of execution environments, which it dynamically allocates when an event triggers your function.

![The image explains serverless architecture, highlighting AWS Lambda, event-driven execution, and clarifying that servers are still required to run applications.](https://kodekloud.com/kk-media/image/upload/v1752861906/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Compute-Lambda/frame_250.jpg)

## Lambda Use Cases

AWS Lambda is ideal for various scenarios:

- **File Processing:** For example, automatically resizing images uploaded to an S3 bucket and storing them in another bucket.
- **Stream Processing:** Real-time data stream processing.
- **Web Applications & Mobile Backends:** Building APIs and handling backend logic without server management.

![The image illustrates AWS Lambda use cases, including file processing, stream processing, web applications, and mobile/web backend, with a diagram of image resizing.](https://kodekloud.com/kk-media/image/upload/v1752861907/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Compute-Lambda/frame_310.jpg)

## Core Components of AWS Lambda

AWS Lambda consists of three primary components:

1.  **Lambda Function:**  
    Your code that executes in response to events. Regardless of the programming language, it functions like a standard function.
2.  **Trigger:**  
    An event source that dictates when the Lambda function should execute. This could be an S3 file upload, an API Gateway request, or updates in DynamoDB, among others.
3.  **Event:**  
    The event object provides details about the trigger—such as an uploaded file's name and the bucket it belongs to.

Below is an example of a simple Lambda function written in JavaScript:

```
exports.handler = async function (event, context) {
    console.log("Lambda function ran");
    return;
};
```

## Benefits of AWS Lambda

AWS Lambda provides several advantages that simplify application development:

- **No Server Management:**  
  AWS handles server maintenance, scaling, capacity provisioning, and logging.
- **Auto Scaling:**  
  The service adjusts automatically to handle traffic spikes, ensuring your application runs smoothly even during high demand.
- **Cost Efficiency:**  
  Costs are based on the number of invocations and the duration of your code execution. If your function isn’t running, you incur no charges.

![The image outlines the benefits of Lambda, highlighting no server management, auto-scaling, and cost efficiency, with colorful icons and text emphasizing key points.](https://kodekloud.com/kk-media/image/upload/v1752861908/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Compute-Lambda/frame_410.jpg)

## Considerations and Limitations

While AWS Lambda is powerful, it comes with specific limitations:

- **Stateless Functions:**  
  Lambda functions do not maintain any local state. Use external databases like DynamoDB for persistent storage.
- **Execution Time Limits:**  
  Each Lambda invocation is capped at a maximum of 15 minutes, which means it is unsuitable for long-running processes.
- **Cold Start Issues:**  
  When a function is idle, subsequent invocations might experience delays known as cold starts. Techniques like SnapStart and Provisioned Concurrency can help mitigate these delays.

![The image outlines the downsides of Lambda, including no local state, limited execution duration, and cold starts, with accompanying icons and brief explanations.](https://kodekloud.com/kk-media/image/upload/v1752861909/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Compute-Lambda/frame_450.jpg)

## AWS Lambda Pricing Model

AWS Lambda’s pricing is determined by several factors:

- **Invocation Count:**  
  You pay for each time your function is executed.
- **Execution Duration:**  
  Charges reflect how long your function runs.
- **Allocated Resources:**  
  The amount of memory and CPU allocated influences the overall cost.

Below is a table summarizing the pricing model:

| Pricing Element     | Details                          | Impact Example                        |
| ------------------- | -------------------------------- | ------------------------------------- |
| Invocation Count    | Billed per function execution    | More invocations mean higher charges  |
| Execution Duration  | Billed based on run time         | Longer execution increases costs      |
| Allocated Resources | Based on assigned memory and CPU | More resources lead to higher pricing |

![The image explains Lambda pricing, highlighting factors like function execution count, duration, and memory/CPU requirements, with related icons and text.](https://kodekloud.com/kk-media/image/upload/v1752861910/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Compute-Lambda/frame_490.jpg)

## Summary

AWS Lambda is a robust compute service that enables you to run code without provisioning or managing servers. Key takeaways include:

- AWS Lambda offloads infrastructure management by automatically handling scaling, capacity provisioning, and logging.
- It is ideally suited for use cases such as file processing, stream processing, and serving as a backend for web and mobile applications.
- The pay-per-invocation pricing model ensures that you only pay for what you use, making it a cost-effective solution.

![The image summarizes AWS Lambda features, highlighting serverless computing, automatic scaling, diverse use cases, and a pay-per-invocation pricing model.](https://kodekloud.com/kk-media/image/upload/v1752861911/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Compute-Lambda/frame_520.jpg)

> [!important]
> **Explore More**
>
> For further reading on AWS Lambda, consider visiting the [AWS Lambda documentation](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html) for detailed insights and additional use cases.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02/module/dcba3ea8-580a-4aac-ad89-48969e6876ee/lesson/31648750-5bb6-4817-8ca9-bb8ef9236fb6)**
>
> Watch video content
