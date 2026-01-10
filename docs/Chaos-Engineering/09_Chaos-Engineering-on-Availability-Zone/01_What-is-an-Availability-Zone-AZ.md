# What is an Availability Zone AZ - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Chaos-Engineering/Chaos-Engineering-on-Availability-Zone/What-is-an-Availability-Zone-AZ)

---

## Table of Contents

- What is an Availability Zone AZ
  - Availability Zones vs. Regions
  - AWS Global Regions
  - Links and References
  - Watch Video

---

## Content

Chaos Engineering

Chaos Engineering on Availability Zone

# What is an Availability Zone AZ

In this lesson, we’ll explore AWS Availability Zones (AZs), how they differ from Regions, and why they’re fundamental for designing resilient, highly available cloud architectures. We’ll also preview a Fault Injection Simulation of an AZ power interruption.

## Availability Zones vs. Regions

An AWS **Region** is a geographically isolated area containing multiple, physically separate **Availability Zones**. Each AZ has its own power, cooling, and network infrastructure, minimizing correlated failures.

Key characteristics:

- **Region**: A collection of AZs in the same geographic area (e.g., US West – Northern California `us-west-1`).
- **AZ**: A standalone data center within a region, labeled like `us-west-1a`, `us-west-1b`, `us-west-1c`.

Benefits of separating workloads across AZs:

- Fault tolerance: If one AZ suffers a power failure, other AZs in the same region continue operating normally.
- Isolation from regional disasters: An earthquake affecting one region won’t impact other AWS Regions.

Depending on your application’s high-availability requirements, you can choose to:

| Replication Type         | Description                                         | AWS Service Examples                          |
| ------------------------ | --------------------------------------------------- | --------------------------------------------- |
| Cross-AZ replication     | Distribute data within the same region              | S3, RDS Multi-AZ                              |
| Cross-region replication | Distribute data across different geographic regions | S3 Cross-Region Replication, RDS Read Replica |

> [!important]
> **Note**
>
> By default, AWS resources are created in the region you select. To replicate resources across regions, you must enable features like [S3 Cross-Region Replication](https://docs.aws.amazon.com/AmazonS3/latest/dev/crr.html) or RDS Read Replicas.

![The image illustrates the concept of availability zones and regions in cloud computing, showing data centers in Northern California and their organization within a virtual private cloud (VPC) structure. It includes a map highlighting regions and availability zones in the US.](https://kodekloud.com/kk-media/image/upload/v1752871832/notes-assets/images/Chaos-Engineering-What-is-an-Availability-Zone-AZ/availability-zones-regions-cloud-computing.jpg)

## AWS Global Regions

AWS operates multiple Regions around the world. Each Region is fully isolated to maximize fault tolerance:

| Region                        | Identifier     |
| ----------------------------- | -------------- |
| US West (Northern California) | us-west-1      |
| US West (Oregon)              | us-west-2      |
| Asia Pacific (Tokyo)          | ap-northeast-1 |
| Asia Pacific (Singapore)      | ap-southeast-1 |
| Hong Kong                     | ap-east-1      |
| …and more                     | …              |

If an entire Region (for example, US West 1) experiences an outage, workloads in other Regions (such as US West 2) remain unaffected.

![The image is a map illustrating the concept of availability zones and regions, highlighting specific locations such as North California, Oregon, GovCloud (US-West), Tokyo, and Singapore. It includes a detailed view of data centers in the North California region.](https://kodekloud.com/kk-media/image/upload/v1752871834/notes-assets/images/Chaos-Engineering-What-is-an-Availability-Zone-AZ/availability-zones-regions-map-detail.jpg)

> [!important]
> **Note**
>
> While cross-region architectures deliver maximum resilience against geographic disasters, distributing resources across multiple AZs within a single Region often provides sufficient high availability and lower latency for most applications.

## Links and References

- [AWS Regions and Availability Zones](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html)
- [Amazon S3 Cross-Region Replication](https://docs.aws.amazon.com/AmazonS3/latest/dev/crr.html)
- [Amazon RDS Read Replicas](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/chaos-engineering/module/e28ed74d-a0c9-4dbd-9950-2b6f83cd8511/lesson/9c713ac6-0cb6-408e-89fb-7a3f23e78a0b)**
>
> Watch video content
