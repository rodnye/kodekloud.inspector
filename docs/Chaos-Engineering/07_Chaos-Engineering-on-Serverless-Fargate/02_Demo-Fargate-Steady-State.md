# Demo Fargate Steady State - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Chaos-Engineering/Chaos-Engineering-on-Serverless-Fargate/Demo-Fargate-Steady-State)

---

## Table of Contents

- Demo Fargate Steady State
  - Prerequisites
  - 1. Navigate to Container Insights
  - 2. Review Key Metrics
  - Next Steps
  - Links and References
  - Watch Video

---

## Content

Chaos Engineering

Chaos Engineering on Serverless Fargate

# Demo Fargate Steady State

Before introducing an I/O stress fault into our ECS Fargate task, it’s essential to capture baseline metrics. This steady-state data will help us quantify the impact of the stress test.

## Prerequisites

- You have an active ECS Fargate cluster (e.g., _pay-for-adoption_).
- Container Insights is enabled for your cluster.
- Permissions to view AWS CloudWatch metrics.

> [!important]
> **Note**
>
> Baseline metrics enable you to compare system behavior before and after fault injection. Make sure you record the values for each metric over a consistent time window.

## 1\. Navigate to Container Insights

1.  Open the AWS Management Console.
2.  Go to **CloudWatch** > **Container Insights** > **ECS**.
3.  Select your ECS cluster (for example, _pay-for-adoption_).
4.  Set the time range to the **last 30 minutes**.

![The image shows an AWS CloudWatch dashboard displaying container insights for ECS clusters, including graphs for CPU utilization, memory utilization, and network activity. There are no alerts present in the dashboard.](https://kodekloud.com/kk-media/image/upload/v1752871908/notes-assets/images/Chaos-Engineering-Demo-Fargate-Steady-State/aws-cloudwatch-ecs-container-insights-dashboard.jpg)

## 2\. Review Key Metrics

Use the following table to track your baseline values:

| Metric             | Description                                      |
| ------------------ | ------------------------------------------------ |
| CPU Utilization    | Percentage of vCPU resources consumed            |
| Memory Utilization | Percentage of container memory in use            |
| Network Throughput | Ingress and egress data transfer rates (Bytes/s) |

> [!important]
> **Warning**
>
> If any metric is already at or near its limit (e.g., > 80% CPU or memory), address capacity issues before proceeding with fault injection.

## Next Steps

After recording these steady-state values, we’ll inject the I/O stress fault into the Fargate task and revisit the same metrics to observe deviations from this baseline.

---

## Links and References

- [AWS CloudWatch Container Insights](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Container-Insights.html)
- [ECS on AWS Fargate](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/chaos-engineering/module/5fdff083-6ddb-4b6a-a584-9c877b0e9c7b/lesson/3f747326-5557-4870-ba20-3ccec93f0998)**
>
> Watch video content
