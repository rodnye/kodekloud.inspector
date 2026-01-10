# ECS Fargate Experiment Idea and Hypothesis - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Chaos-Engineering/Chaos-Engineering-on-Serverless-Fargate/ECS-Fargate-Experiment-Idea-and-Hypothesis)

---

## Table of Contents

- ECS Fargate Experiment Idea and Hypothesis
  - Introduction
  - Architecture Overview
  - FIS Experiment Phases
  - Next Steps
  - References
  - Watch Video
    - 1. Given
    - 2. Hypothesis

---

## Content

Chaos Engineering

Chaos Engineering on Serverless Fargate

# ECS Fargate Experiment Idea and Hypothesis

Learn how to leverage AWS Fault Injection Service (FIS) to validate the resilience of an Amazon ECS Fargate–based microservice under high I/O stress. This guide demonstrates running a controlled I/O fault on Fargate tasks to ensure your Pet Adoption payment API remains available.

## Introduction

Amazon ECS Fargate is a serverless compute engine for containers that lets you run Docker workloads without provisioning or managing servers. In this experiment, we’ll deploy a Pet Adoption payment API as two Fargate tasks, fronted by an Application Load Balancer and backed by a Pet Adoption database. Then we’ll launch an AWS FIS experiment to inject I/O stress and observe the behavior.

> [!important]
> **Note**
>
> Before starting, ensure you have the following prerequisites:
>
> - An AWS account with permissions to create FIS experiments, ECS clusters, IAM roles, and CloudWatch alarms.
> - A running ECS Fargate service with at least two tasks.
> - A target database (e.g., Amazon RDS) for the Pet Adoption back end.

## Architecture Overview

![The image is a diagram illustrating a serverless compute architecture using AWS Fargate, with a focus on maintaining application availability despite high I/O tasks. It includes components like a Pet Payment API and a Pet Adoption Database within a virtual private cloud.](https://kodekloud.com/kk-media/image/upload/v1752871915/notes-assets/images/Chaos-Engineering-ECS-Fargate-Experiment-Idea-and-Hypothesis/serverless-architecture-aws-fargate-diagram.jpg)

1.  **Application Load Balancer** distributes incoming traffic to Fargate tasks.
2.  **ECS Fargate Tasks** run the Pet Payment API.
3.  **Pet Adoption Database** serves as the back-end data store.

## FIS Experiment Phases

Every AWS FIS experiment consists of two main phases:

| Experiment Phase | Description                                                                  |
| ---------------- | ---------------------------------------------------------------------------- |
| Given            | The current running state of our ECS Fargate service and its infrastructure. |
| Hypothesis       | The expected system behavior when an I/O fault is injected.                  |

### 1\. Given

- Two Fargate tasks in an ECS service named `pet-payment-service`.
- An Application Load Balancer routing traffic to `pet-payment-service` on port 80.
- A connected Pet Adoption database (e.g., Amazon RDS or DynamoDB).

```
# Verify ECS service and tasks
aws ecs describe-services \
  --cluster pet-adoption-cluster \
  --services pet-payment-service


aws ecs list-tasks \
  --cluster pet-adoption-cluster \
  --service-name pet-payment-service
```

### 2\. Hypothesis

We expect that under high I/O stress on each Fargate task:

- The Pet Payment API remains responsive with < 5% error rate.
- The Pet Adoption web application continues to process payments without downtime.
- CloudWatch alarms trigger if latency or error thresholds are breached.

> [!important]
> **Warning**
>
> Injecting faults can impact production workloads. Always run experiments in a staging environment or during scheduled maintenance windows. Monitor performance and rollback criteria closely.

## Next Steps

1.  Define IAM roles and permissions for AWS FIS.
2.  Create an FIS experiment template that targets the Fargate tasks.
3.  Configure CloudWatch metrics and alarms for latency, error rate, and CPU/I/O usage.
4.  Execute the experiment and review the results.

## References

- [AWS Fault Injection Service](https://docs.aws.amazon.com/fis/latest/userguide/what-is-aws-fis.html)
- [Amazon ECS Fargate Documentation](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/fargate.html)
- [Chaos Engineering on AWS Fargate Blog](https://aws.amazon.com/blogs/containers/chaos-engineering-on-aws-fargate/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/chaos-engineering/module/5fdff083-6ddb-4b6a-a584-9c877b0e9c7b/lesson/a69ee4f0-1717-4945-9208-5cfa67405f07)**
>
> Watch video content
