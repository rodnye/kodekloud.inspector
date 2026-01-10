# What are Metrics and Metric Dimensions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-CloudWatch/Anatomy-of-Alarms/What-are-Metrics-and-Metric-Dimensions)

---

## Table of Contents

- What are Metrics and Metric Dimensions
  - What Is a Metric?
  - What Are Metric Dimensions?
  - References
  - Watch Video
    - Example: Identifying a Stressed Instance

---

## Content

AWS CloudWatch

Anatomy of Alarms

# What are Metrics and Metric Dimensions

Welcome to our in-depth guide on AWS CloudWatch metrics and metric dimensions. We’ll use an Amazon RDS instance as a practical example to show you how to monitor and troubleshoot database performance.

Consider a scenario where:

- You manage an AWS environment spanning a VPC and an Availability Zone.
- An RDS instance supports your application.
- You receive an alert about unusual performance on the RDS instance.

First, you investigate and resolve the issue. Next, you decide which metrics to track and how to design effective alerts.

![The image is a diagram illustrating an AWS cloud setup, featuring a Virtual Private Cloud (VPC) with an Availability Zone containing AWS RDS. It is titled "Metrics and Metric Dimensions."](https://kodekloud.com/kk-media/image/upload/v1752862419/notes-assets/images/AWS-CloudWatch-What-are-Metrics-and-Metric-Dimensions/aws-cloud-setup-vpc-rds-diagram.jpg)

## What Is a Metric?

A **metric** is a time-ordered set of data points that quantify resource performance or utilization. In Amazon RDS, key metrics include:

| Metric Name         | Description                        |
| ------------------- | ---------------------------------- |
| CPUUtilization      | Percentage of CPU in use           |
| FreeableMemory      | Available memory in bytes          |
| DiskQueueDepth      | Number of pending I/O requests     |
| DatabaseConnections | Active connections to the database |

These metrics give you raw insights into how your RDS instance behaves over time.

> [!important]
> **Note**
>
> Metrics answer **what** is happening. To pinpoint **where** or **which** resource is affected, use metric dimensions.

## What Are Metric Dimensions?

A **metric dimension** adds context by specifying attributes that identify the source of a metric. Dimensions help you filter, group, and drill down into your monitoring data.

Typical RDS dimensions:

| Dimension            | Description                                        |
| -------------------- | -------------------------------------------------- |
| DBInstanceIdentifier | Identifier of the RDS instance (e.g., `app-db-01`) |
| EngineName           | Database engine type (e.g., `MySQL`, `PostgreSQL`) |

Pairing a metric with dimensions creates a fully qualified data point in CloudWatch.

![The image is a diagram showing "Metrics" and "Metric Dimensions" related to database performance, including elements like CPU utilization, memory usage, and DB instance identifiers.](https://kodekloud.com/kk-media/image/upload/v1752862421/notes-assets/images/AWS-CloudWatch-What-are-Metrics-and-Metric-Dimensions/database-performance-metrics-diagram.jpg)

### Example: Identifying a Stressed Instance

If CPU utilization spikes:

```
CPUUtilization = 95%
```

You won’t know which instance is affected until you add:

```
DBInstanceIdentifier = application-01
```

This dimension tells you that **application-01** requires immediate attention, enabling targeted monitoring and alerts.

> [!important]
> **Warning**
>
> Using too many high-cardinality dimensions (many unique values) can increase CloudWatch costs. Select dimensions judiciously.

---

That wraps up our overview of metrics and metric dimensions. In the next lesson, we’ll configure alarms and notification channels in AWS CloudWatch to automate your monitoring. Stay tuned!

## References

- [AWS CloudWatch Documentation](https://docs.aws.amazon.com/cloudwatch/)
- [Amazon RDS User Guide](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloudwatch/module/41c3204a-bf91-4e6f-8175-02ef9b9f6b82/lesson/83d87ef4-527b-4d12-8ce3-fad699375840)**
>
> Watch video content
