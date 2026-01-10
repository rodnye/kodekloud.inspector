# Storage Classes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Amazon-Simple-Storage-Service-Amazon-S3/AWS-S3-Core-Concepts/Storage-Classes)

---

## Table of Contents

- Storage Classes
  - Overview of S3 Storage Classes
  - S3 Standard
  - S3 Standard-IA (Infrequent Access)
  - S3 One Zone-IA
  - S3 Glacier Instant Retrieval
  - S3 Glacier Flexible Retrieval
  - S3 Glacier Deep Archive
  - S3 Intelligent Tiering
  - Selecting the Right S3 Storage Class
  - Additional Resources
  - Watch Video

---

## Content

Amazon Simple Storage Service (Amazon S3)

AWS S3 Core Concepts

# Storage Classes

Amazon S3 offers multiple storage classes tailored to different access patterns, durability needs, and cost objectives. Selecting the right class helps you optimize costs and ensure your data is available when you need it.

## Overview of S3 Storage Classes

| Storage Class                 | Access Pattern  | Durability               | Availability Zones | Retrieval     | Minimum Duration | Use Case                        |
| ----------------------------- | --------------- | ------------------------ | ------------------ | ------------- | ---------------- | ------------------------------- |
| S3 Standard                   | Frequent        | 11 nines (99.999999999%) | ≥3 AZs             | Milliseconds  | None             | Website hosting, hot data       |
| S3 Standard-IA                | Infrequent      | 11 nines                 | ≥3 AZs             | Milliseconds  | 30 days          | Long-lived but infrequent data  |
| S3 One Zone-IA                | Infrequent      | 11 nines (in one AZ)     | 1 AZ               | Milliseconds  | 30 days          | Secondary backups, infrequent   |
| S3 Glacier Instant Retrieval  | Rare, immediate | 11 nines                 | ≥3 AZs             | Milliseconds  | 90 days          | Archive with immediate access   |
| S3 Glacier Flexible Retrieval | Rare, delayed   | 11 nines                 | ≥3 AZs             | Minutes–Hours | 90 days          | Cost-optimized archives         |
| S3 Glacier Deep Archive       | Almost never    | 11 nines                 | ≥3 AZs             | Hours–Days    | 180 days         | Compliance, long-term retention |
| S3 Intelligent-Tiering        | Variable        | 11 nines                 | ≥3 AZs             | Automatic     | None             | Automated cost optimization     |

---

## S3 Standard

The default class for frequently accessed (“hot”) data:

- **Durability:** 99.999999999%
- **Availability:** Tolerates two concurrent AZ failures
- **Latency:** Millisecond reads/writes
- **Pricing:**
  - Storage: per GB/month
  - Data ingress: Free
  - Data egress: per GB (no retrieval fee)

![The image illustrates the AWS S3 Standard storage model, showing data replication across three availability zones in the "us-east-1" region, with charges based on gigabytes used.](https://kodekloud.com/kk-media/image/upload/v1752869345/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Storage-Classes/aws-s3-standard-storage-replication-diagram.jpg)

## S3 Standard-IA (Infrequent Access)

For long-lived data accessed less frequently:

- **Same durability** as S3 Standard
- **Millisecond access latency**
- **Pricing:**
  - Storage: lower per GB than Standard
  - Retrieval fee: per GB + egress rate
  - Minimum duration: 30 days
  - Minimum object size: 128 KB

Standard-IA is perfect for backups and replicas that you need fast access to but rarely retrieve.

## S3 One Zone-IA

Cost-optimized for infrequently accessed data **not** requiring multi-AZ resilience:

- **Durability:** Stored in a single AZ
- **Latency:** Millisecond access
- **Pricing:**
  - Storage: lowest among IA classes
  - Retrieval fee: per GB + egress rate
  - Minimum duration: 30 days
  - Minimum object size: 128 KB

> [!important]
> **Warning**
>
> One Zone-IA stores data in a single Availability Zone. If that AZ fails, your objects become unavailable.

![The image is an infographic about AWS S3 One Zone-IA, highlighting its design for infrequently accessed data, charging per GB, retrieval fees, and minimum charges, with a focus on a single availability zone.](https://kodekloud.com/kk-media/image/upload/v1752869346/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Storage-Classes/aws-s3-one-zone-ia-infographic.jpg)

## S3 Glacier Instant Retrieval

Archival storage with immediate access for rare use cases:

- **Durability & resiliency:** Same as Standard (≥3 AZs)
- **Latency:** Millisecond retrieval
- **Pricing:**
  - Storage: archival rate per GB
  - Retrieval fee: per GB
  - Minimum duration: 90 days
  - Minimum object size: 128 KB

> [!important]
> **Note**
>
> Not recommended for direct website hosting—use S3 Standard for public assets.

![The image is an informational graphic about AWS S3 Glacier-Instant, highlighting it as a low-cost storage option for rarely accessed data with details on charges and availability zones.](https://kodekloud.com/kk-media/image/upload/v1752869347/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Storage-Classes/aws-s3-glacier-instant-storage-info.jpg)

## S3 Glacier Flexible Retrieval

Previously known as “Glacier,” suitable for archive data with retrieval delays:

- **Availability:** Objects must be restored before access
- **Pricing:**
  - Storage: slightly lower per GB than Standard-IA
  - Retrieval fee: varies by retrieval tier
  - Minimum duration: 90 days
  - Minimum object size: 40 KB

**Retrieval Tiers**

- Expedited: 1–5 minutes
- Standard: 3–5 hours
- Bulk: 5–12 hours

Restored objects are copied to Standard-IA for the duration of your restore request.

## S3 Glacier Deep Archive

The lowest-cost class for data accessed once or twice a year:

- **Availability:** Retrieval can take hours or days
- **Pricing:**
  - Storage: lowest in Amazon S3
  - Retrieval fee: per GB + tier fee
  - Minimum duration: 180 days
  - Minimum object size: 40 KB

**Retrieval Tiers**

- Standard: up to 12 hours
- Bulk: up to 48 hours

![The image is an infographic about AWS S3 Glacier Deep Archive, highlighting its options, retrieval times, charges, and storage features across availability zones. It emphasizes being the cheapest storage class in S3 with specific retrieval fees and minimum charges.](https://kodekloud.com/kk-media/image/upload/v1752869348/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Storage-Classes/aws-s3-glacier-deep-archive-infographic.jpg)

## S3 Intelligent Tiering

Automatically optimizes costs for data with unknown or changing access patterns:

- **Automated monitoring** moves objects between frequent & infrequent tiers
- **No retrieval fees** for tier transitions
- **Monitoring & automation charge:** per 1,000 objects

> [!important]
> **Note**
>
> Enable Intelligent Tiering to reduce manual effort and optimize monthly storage bills.

![The image describes S3 Intelligent Tiering, highlighting its ability to reduce storage costs by moving data to cost-effective tiers and mentioning additional monitoring costs per 1,000 objects.](https://kodekloud.com/kk-media/image/upload/v1752869349/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Storage-Classes/s3-intelligent-tiering-storage-costs-diagram.jpg)

---

## Selecting the Right S3 Storage Class

Use the decision flowchart below to pick the optimal storage class based on access frequency and immediacy:

1.  **Immediate (millisecond) access?**
    - Yes → Frequency?
      - Frequent → **S3 Standard**
      - Infrequent → Multi-AZ?
        - Yes → **Standard-IA**
        - No → **One Zone-IA**
      - Rare → **Glacier Instant Retrieval**
    - No → Frequency?
      - Almost never → **Glacier Deep Archive**
      - Occasionally → **Glacier Flexible Retrieval**

![The image is a flowchart for selecting storage options based on access frequency and immediacy, featuring options like Standard, Glacier Instant, and Glacier Deep Archive.](https://kodekloud.com/kk-media/image/upload/v1752869351/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Storage-Classes/storage-options-flowchart-access-frequency.jpg)

---

## Additional Resources

- [AWS S3 Storage Classes Documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html)
- [Optimizing Costs with S3 Intelligent-Tiering](https://aws.amazon.com/blogs/aws/amazon-s3-intelligent-tiering/)
- [Amazon S3 Pricing](https://aws.amazon.com/s3/pricing/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/amazon-simple-storage-service-amazon-s3/module/eec05698-c022-44e4-9421-cf157eb32097/lesson/c99706a7-8aaf-47cf-9159-409e8a53f21e)**
>
> Watch video content
