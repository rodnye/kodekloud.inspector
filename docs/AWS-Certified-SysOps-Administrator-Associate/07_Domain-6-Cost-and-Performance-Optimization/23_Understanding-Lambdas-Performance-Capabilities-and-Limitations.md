# Understanding Lambdas Performance Capabilities and Limitations - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-6-Cost-and-Performance-Optimization/Understanding-Lambdas-Performance-Capabilities-and-Limitations)

---

## Table of Contents

- Understanding Lambdas Performance Capabilities and Limitations
  - Execution Model
  - Resource Allocation and Timeouts
  - Cold Starts and Warm Starts
  - Concurrency and Throttling
  - Invocation Models
  - Scaling, Fault Tolerance, and Availability
  - Programming Languages, Runtimes, and Function Limitations
  - Conclusion
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 6 Cost and Performance Optimization

# Understanding Lambdas Performance Capabilities and Limitations

Welcome to this comprehensive lesson on AWS Lambda, the serverless compute service designed to run code in response to events. In this guide, we discuss Lambda’s execution model, resource allocation, performance characteristics, and limitations to help you design and optimize your serverless applications on AWS.

## Execution Model

AWS Lambda functions are event-driven, meaning they run in response to triggers such as file uploads, scheduled events, or HTTP requests. Once a function is triggered, it executes a task for up to 15 minutes.

A key aspect of Lambda’s performance is its resource allocation; memory and CPU are tightly coupled. You can allocate memory in increments from 128 MB (with a fraction of a CPU) up to 10 GB, which can provide up to six virtual CPUs. Typically, around 1,792 MB of memory corresponds to one full virtual CPU.

Consider the diagram below that illustrates the AWS Lambda execution model:

![The image illustrates the AWS Lambda execution model, showing a flow from a "Trigger" to "AWS Lambda" and then to "Next Step." It explains that AWS Lambda is event-driven, responding to events like HTTP requests, file uploads, or scheduled events.](https://kodekloud.com/kk-media/image/upload/v1752861157/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Understanding-Lambdas-Performance-Capabilities-and-Limitations/aws-lambda-execution-model-diagram.jpg)

## Resource Allocation and Timeouts

When planning your Lambda functions, keep in mind the following:

- Memory and CPU scale together; increasing the memory allocation will also increase the CPU resources.
- The maximum execution time for a Lambda function is limited to 900 seconds (15 minutes).

The diagram below illustrates how memory allocation and vCPU resources scale together:

![The image is a diagram explaining resource allocation, detailing memory allocation from 128 MB to 10,240 MB and vCPU allocation scaling linearly with memory.](https://kodekloud.com/kk-media/image/upload/v1752861158/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Understanding-Lambdas-Performance-Capabilities-and-Limitations/resource-allocation-diagram-vcpu-memory.jpg)

## Cold Starts and Warm Starts

When a Lambda function is invoked for the first time, it may experience a "cold start" that can add up to a second of extra latency due to initialization. However, once provisioned, Lambda instances stay warm for 5 to 15 minutes, reducing latency on subsequent invocations. This is crucial for applications requiring consistently low response times. AWS also provides pre-provisioned concurrency to mitigate cold start impacts.

The following diagram summarizes execution time limits, cold starts, and warm starts:

![The image explains execution time and limits, highlighting three concepts: "Timeout" with a maximum of 15 minutes, "Cold Starts" indicating higher latency due to new instance provisioning, and "Warm Starts."](https://kodekloud.com/kk-media/image/upload/v1752861159/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Understanding-Lambdas-Performance-Capabilities-and-Limitations/execution-time-timeout-cold-warm-starts.jpg)

## Concurrency and Throttling

AWS Lambda can handle thousands of concurrent executions. However, the default concurrency limit for each region is 1,000. To scale beyond this default, you must request an increase via AWS support.

Reserved concurrency enables you to allocate a portion of this limit to specific functions. For example, you might reserve 200 executions for one function while leaving the remainder available for others. Note that if you reserve all 1,000 executions for a single function, no other functions will have concurrency resources available.

The infographic below illustrates throughput and concurrency concepts:

![The image is an infographic about "Throughput and Concurrency," highlighting "Concurrency Scaling" and "Reserved Concurrency." It mentions handling thousands of executions and a default limit of 1,000 per region, which is expandable.](https://kodekloud.com/kk-media/image/upload/v1752861161/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Understanding-Lambdas-Performance-Capabilities-and-Limitations/throughput-concurrency-infographic.jpg)

Additionally, network performance scales with memory allocation. Higher memory not only boosts CPU allocation but also enhances network throughput. For instance, a function with a high memory allocation might achieve network speeds up to 10 Gbps. The table below (illustrated in the image) represents this relationship between memory allocation and network bandwidth:

![The image is a table showing the relationship between memory allocation and network bandwidth, indicating that higher memory results in higher bandwidth, with a maximum of 10 Gbps for the largest memory allocation.](https://kodekloud.com/kk-media/image/upload/v1752861162/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Understanding-Lambdas-Performance-Capabilities-and-Limitations/memory-allocation-bandwidth-table.jpg)

## Invocation Models

AWS Lambda supports three main invocation models:

- **Synchronous Invocation:** The caller waits for the function to complete and return a response.
- **Asynchronous Invocation:** The function is triggered, processes the event, and then immediately returns control to the caller.
- **Event Source Mapping:** Ideal for stream-based sources where events are processed in batches as they arrive.

The diagram below illustrates these three invocation models along with the associated AWS services:

![The image illustrates three invocation models: Synchronous Invocation, Asynchronous Invocation, and Event-Source Mapping, each with associated AWS services and descriptions.](https://kodekloud.com/kk-media/image/upload/v1752861163/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Understanding-Lambdas-Performance-Capabilities-and-Limitations/invocation-models-aws-services.jpg)

Each invocation model offers a different performance profile, making it essential to choose the one that best fits your application's needs.

## Scaling, Fault Tolerance, and Availability

Lambda functions are designed to burst, allowing approximately 500 additional instances per second. However, actual scaling performance may vary based on the region and service quotas. Without reserved concurrency, scaling is bound by the overall service quota.

Additionally, Lambda functions operate in isolated, AWS-managed data centers, providing high availability and automatic failover. In the event of a failure during execution, the system may require a retry, but the underlying infrastructure remains highly redundant.

## Programming Languages, Runtimes, and Function Limitations

AWS Lambda supports a variety of programming languages, including Rust, Ruby, Java, and .NET Core. Moreover, you can create custom runtimes if your preferred language isn’t natively supported.

Key limitations of Lambda functions include:

- A maximum execution duration of 15 minutes.
- A deployment package size limit of 50 MB (unzipped) or 250 MB when using layers.
- For container image deployments, the image can be up to 10 GB.
- Concurrency is governed by your account’s quota and any reserved concurrency settings.
- Lambda functions are stateless by default; to maintain state, you must integrate external storage solutions like Amazon EFS, S3, or databases.
- A temporary storage directory (/tmp) is available with an initial allocation of 512 MB, which can be increased up to 10 GB.
- There are payload size limitations for responses.

The diagram below highlights several of these limitations:

![The image lists four limitations: concurrency and throttling, no long-term state or persistence, limited languages and runtimes, and limited response payload size.](https://kodekloud.com/kk-media/image/upload/v1752861165/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Understanding-Lambdas-Performance-Capabilities-and-Limitations/limitations-concurrency-state-languages-payload.jpg)

> [!important]
> **Note**
>
> For more details on AWS Lambda limits and best practices, consider reviewing the [AWS Lambda Developer Guide](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html).

## Conclusion

In this lesson, we explored AWS Lambda's core concepts, including its event-driven execution model, dynamic resource allocation, handling of cold and warm starts, concurrency management, various invocation models, and inherent limitations. This foundational understanding is critical for designing and optimizing your serverless applications on AWS effectively.

We hope you found this article informative and engaging. Happy serverless computing, and see you in the next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/c363221d-1b2d-4c1c-876a-cb6108f473e3/lesson/e23a1631-81d9-4cd0-aac1-2f06daac4557)**
>
> Watch video content
