# Limitations - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Lambda/Configuring-Lambda/Limitations)

---

## Table of Contents

- Limitations
  - Key Service Limits
  - Next Steps: Lambda Monitoring
  - Watch Video

---

## Content

AWS Lambda

Configuring Lambda

# Limitations

AWS Lambda is a fully managed, serverless compute service that scales automatically with your applications. To maintain high performance and reliability, AWS enforces several resource limits. Understanding these constraints helps you design efficient, cost-effective solutions.

## Key Service Limits

| Limit                      | Maximum            | Notes                                                                                           |
| -------------------------- | ------------------ | ----------------------------------------------------------------------------------------------- |
| Execution timeout          | 15 minutes         | Ideal for short-lived tasks. Long-running batch jobs may require alternative services.          |
| Memory allocation          | 128 MB – 10 GB     | Configurable per function. Affects CPU power proportionally.                                    |
| Ephemeral storage (`/tmp`) | Up to 10 GB        | Temporary read/write space that persists only during the invocation.                            |
| Concurrent executions      | 1,000 (soft limit) | Burst up to 3,000 in some Regions. Request a quota increase via the AWS Service Quotas console. |

> [!important]
> **Note**
>
> Memory allocation scales CPU and network throughput. Allocating more memory can improve performance for CPU-intensive workloads.> [!important]
> **Warning**
>
> Ephemeral storage is **not** persistent. Data in `/tmp` is lost after the function completes.> [!important]
> **Note**
>
> To raise your concurrency limit permanently, open a [quota increase request](https://console.aws.amazon.com/servicequotas/home) in the AWS Service Quotas console. Approval depends on your use case.

For a full overview of AWS Lambda service quotas, refer to the [AWS Lambda Limits and Quotas](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html "AWS Lambda Limits and Quotas").

![The image lists limitations for a service, including a 15-minute runtime, 10 GB RAM and storage limits, and 1000 concurrent executions. It also provides a link for more information on limits and restrictions.](https://kodekloud.com/kk-media/image/upload/v1752863155/notes-assets/images/AWS-Lambda-Limitations/service-limitations-runtime-storage-executions.jpg)

---

With Lambda’s primary limits on execution time, memory, storage, and concurrency covered, the next step is to implement robust monitoring and observability.

## Next Steps: Lambda Monitoring

Stay tuned for our guide on setting up AWS CloudWatch metrics, logs, and alarms to track function performance, error rates, and invocation patterns.

---

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-lambda/module/8fef3e34-137a-46d4-8dec-61fb5bae4e0e/lesson/11ed1821-6a78-4639-ad6a-b119aefddb87)**
>
> Watch video content
