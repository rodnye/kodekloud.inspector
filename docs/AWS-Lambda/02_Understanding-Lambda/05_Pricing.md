# Pricing - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Lambda/Understanding-Lambda/Pricing)

---

## Table of Contents

- Pricing
  - Free Tier
  - Core Pricing Components
  - Memory and CPU Allocation
  - CPU Architectures
  - Additional Cost Factors
  - Summary
  - Next Steps
  - References
  - Watch Video
    - 1. Requests
    - 2. Gigabyte-Seconds

---

## Content

AWS Lambda

Understanding Lambda

# Pricing

In this guide, we’ll dive into AWS Lambda pricing—covering the free tier, core billing components (requests and gigabyte-seconds), memory/CPU allocation, architecture choices, and additional cost factors like storage and concurrency. By understanding these elements, you can optimize your serverless workloads for both performance and cost.

## Free Tier

AWS Lambda incurs no upfront fees. Each month, you receive:

- **1 million free requests**
- **400 000 GB-seconds** of compute time

> [!important]
> **Note**
>
> Free-tier usage resets every month. Usage beyond these amounts is billed according to the rates in your AWS Region.

## Core Pricing Components

Lambda charges are based on:

1.  **Number of requests**
2.  **Compute time measured in gigabyte-seconds (GB-s)**

![The image outlines the components of Lambda cost, highlighting the number of requests and gigabit seconds (amount of time multiplied by the amount of resources).](https://kodekloud.com/kk-media/image/upload/v1752863187/notes-assets/images/AWS-Lambda-Pricing/lambda-cost-components-requests-gigabit.jpg)

### 1\. Requests

Each time your function handler begins execution—triggered by API Gateway, event sources, or manual tests—it counts as one request.

> Price = (Total requests) × (Request rate per million)

### 2\. Gigabyte-Seconds

Compute time is billed in GB-s, calculated as:

```
GB-s = (Allocated memory in GB) × (Execution duration in seconds)
```

- **Timer** starts when the handler is invoked and stops after shutdown code completes.
- **Rounding** is to the nearest millisecond.

> [!important]
> **Warning**
>
> AWS rounds up to the nearest ms, so a 1.0001 ms function is billed as 2 ms.

![The image is a diagram illustrating the flow of data from a source to AWS Lambda, where a Lambda function is executed, and then to another AWS service. It includes a timeline for initialization and shutdown, labeled "Gigabit Seconds."](https://kodekloud.com/kk-media/image/upload/v1752863188/notes-assets/images/AWS-Lambda-Pricing/data-flow-aws-lambda-diagram.jpg)

## Memory and CPU Allocation

When you configure a Lambda function, you select memory between 128 MB and 10 240 MB. CPU power scales linearly with memory—more RAM also means more CPU share, speeding up execution and reducing GB-s.

![The image illustrates a concept related to "Gigabit Seconds" with a focus on CPU and memory allocation for a Lambda function, showing a range from 128 MB to 10,240 MB.](https://kodekloud.com/kk-media/image/upload/v1752863189/notes-assets/images/AWS-Lambda-Pricing/gigabit-seconds-cpu-memory-allocation.jpg)

## CPU Architectures

Lambda supports two processor types. Choosing the right architecture can yield significant savings:

| Architecture      | Price-Performance Improvement | Best for                             |
| ----------------- | ----------------------------- | ------------------------------------ |
| x86\\\_64         | Baseline                      | General workloads                    |
| ARM64 (Graviton2) | Up to 34% better              | Cost-sensitive, high-throughput jobs |

**Tip:** ARM64 functions may require compatibility testing for native dependencies.

## Additional Cost Factors

Besides requests and GB-s, consider these extras:

| Component               | Description                                 | Billing Unit                |
| ----------------------- | ------------------------------------------- | --------------------------- |
| Ephemeral storage       | Scratch space (`/tmp`) from 512 MB to 10 GB | Per GB-month (region-based) |
| Provisioned concurrency | Keeps functions warm to avoid cold starts   | Per concurrency-second      |

> [!important]
> **Warning**
>
> Provisioned concurrency charges apply even during idle periods. Use only for latency-sensitive functions.

![The image outlines pricing components for a service, highlighting memory range, ephemeral storage, provisioned concurrency, and cold start avoidance. It includes region-specific pricing and uses a lambda symbol.](https://kodekloud.com/kk-media/image/upload/v1752863190/notes-assets/images/AWS-Lambda-Pricing/pricing-components-service-memory-storage-lambda.jpg)

## Summary

Your AWS Lambda costs depend on:

- Free-tier utilization
- Request count
- GB-seconds (memory × duration)
- Memory/CPU allocation
- CPU architecture (x86_64 vs ARM64)
- Additional storage and concurrency settings

## Next Steps

Use the [AWS Pricing Calculator](https://aws.amazon.com/calculator/) to model workloads and forecast costs.

---

## References

- [AWS Lambda Pricing](https://aws.amazon.com/lambda/pricing/)
- [AWS Lambda Developer Guide](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
- [AWS Pricing Calculator](https://aws.amazon.com/calculator/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-lambda/module/fdb5ec1b-18a2-4034-baed-3231f187825b/lesson/ce1130d8-8c79-4577-86a8-cc6820d819ee)**
>
> Watch video content
