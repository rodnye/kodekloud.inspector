# S3 Review Storage Classes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Storage/S3-Review-Storage-Classes)

---

## Table of Contents

- S3 Review Storage Classes
  - S3 Standard
  - S3 Standard-IA (Infrequent Access)
  - S3 One Zone-IA
  - S3 Glacier Instant
  - S3 Glacier Flexible
  - S3 Glacier Deep Archive
  - S3 Intelligent-Tiering
  - Choosing the Right Storage Class
  - Summary
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Storage

# S3 Review Storage Classes

In this article, we review the various AWS S3 storage classes, explaining how each option balances data access, resiliency, and cost. AWS offers a range of storage classes to meet different user needs based on access frequency, data size, and durability requirements.

AWS recognizes that not every user accesses their data the same way. Some users require frequent retrieval, while others accumulate large quantities of data that are rarely accessed. To address these diverse requirements, AWS provides several distinct storage classes—each with its own pricing model and performance characteristics.

![The image shows icons representing different aspects of storage classes: a bucket for storage, a lock for data access, a graph for resiliency, and money for cost.](https://kodekloud.com/kk-media/image/upload/v1752859777/notes-assets/images/AWS-Certified-Developer-Associate-S3-Review-Storage-Classes/storage-classes-icons-bucket-lock-graph.jpg)

## S3 Standard

S3 Standard is the default storage class. When no storage class is specified during file upload, S3 Standard is applied. Objects are automatically replicated across at least three Availability Zones, ensuring resilience against up to two simultaneous AZ failures and guaranteeing 11 nines (99.999999999%) of durability.

![The image illustrates AWS S3 Standard storage, showing document replication across three availability zones with a durability of 99.999999999%.](https://kodekloud.com/kk-media/image/upload/v1752859778/notes-assets/images/AWS-Certified-Developer-Associate-S3-Review-Storage-Classes/aws-s3-standard-storage-replication.jpg)

Key features of S3 Standard include:

- Low latency access with millisecond response times
- Public access support for web applications when required
- No retrieval fee, minimum object size, or minimum storage duration, though data egress is charged per gigabyte

> [!important]
> **Note**
>
> When storing frequently accessed data, S3 Standard's high availability and low latency make it an excellent choice.

## S3 Standard-IA (Infrequent Access)

The S3 Standard-IA storage class is optimized for data that is accessed less frequently but still requires rapid access when needed. Similar to S3 Standard, it replicates objects across at least three Availability Zones with 11 nines of durability.

However, S3 Standard-IA applies:

- A per-gigabyte egress fee along with a retrieval fee each time data is accessed
- A minimum storage duration charge of 30 days
- A minimum object size charge of 128 kilobytes

This storage class is ideal for infrequently accessed data that does not consist of many small files.

![The image illustrates the AWS S3 Standard-IA storage class, highlighting features like retrieval fees, a minimum duration charge of 30 days, and a minimum size charge for objects. It shows documents stored across three availability zones.](https://kodekloud.com/kk-media/image/upload/v1752859780/notes-assets/images/AWS-Certified-Developer-Associate-S3-Review-Storage-Classes/aws-s3-standard-ia-storage-class.jpg)

## S3 One Zone-IA

S3 One Zone-IA offers similar benefits to Standard-IA but without multi-AZ replication. Data is stored in a single Availability Zone, which significantly reduces storage costs. The key characteristics include:

- Millisecond access latency
- Support for public file access
- Ingress is free, while data egress incurs charges along with a retrieval fee
- A 30-day minimum storage duration and a minimum object size charge of 128 kilobytes

This option is well-suited for data that is infrequently accessed and does not require multi-AZ resiliency.

## S3 Glacier Instant

Designed for archival data, S3 Glacier Instant provides low-cost storage while allowing near-instant data retrieval (within milliseconds). It offers multi-AZ replication and 11 nines of durability.

Key factors include:

- Free ingress with a per-gigabyte egress fee and additional retrieval fee
- A 90-day minimum storage duration and a minimum object size charge of 128 kilobytes

S3 Glacier Instant is optimal for archival data that must be accessed immediately despite the higher retrieval fees.

![The image is an infographic about S3 Glacier-Instant, highlighting its cost-effectiveness for rarely accessed data, with details on retrieval fees, minimum charges, and availability zones. It compares the storage option to S3 Standard and S3 Standard-IA, noting cheaper storage but higher retrieval costs.](https://kodekloud.com/kk-media/image/upload/v1752859781/notes-assets/images/AWS-Certified-Developer-Associate-S3-Review-Storage-Classes/s3-glacier-instant-infographic.jpg)

## S3 Glacier Flexible

S3 Glacier Flexible is intended for archival data that does not require instant access. When retrieving data from Glacier Flexible, there is a delay, similar to a cold start process; hence, objects cannot be publicly accessible.

Pricing details include:

- Lower storage costs per gigabyte per month compared to S3 Standard options
- A per-gigabyte egress fee and additional retrieval fee
- A 90-day minimum storage duration and a minimum object size charge of 40 kilobytes

Retrieval options vary based on urgency:

- Expedited: 1 to 5 minutes
- Standard: 3 to 5 hours
- Bulk: 5 to 12 hours

Although the retrieved data is temporarily served from S3 Standard-IA, Glacier Flexible remains a cost-effective solution for archives without urgent access needs.

## S3 Glacier Deep Archive

S3 Glacier Deep Archive is the most economical choice for data that is rarely accessed. Like Glacier Flexible, data retrieval is not immediate and objects cannot be made publicly accessible.

Notable characteristics include:

- The lowest per-gigabyte per month storage cost
- Additional data egress and retrieval fees
- A 180-day minimum storage duration and a minimum object size charge of 40 kilobytes

Retrieval options are available as:

- Standard retrieval (up to 12 hours)
- Bulk retrieval (up to 48 hours)

> [!important]
> **Note**
>
> If your archival data does not require quick access, S3 Glacier Deep Archive provides unmatched cost savings for long-term storage.

![The image is an infographic about AWS S3 Glacier Deep Archive, highlighting its retrieval fees, minimum charges, and availability zones. It describes it as the cheapest storage class in S3 with retrieval options of 12 and 48 hours.](https://kodekloud.com/kk-media/image/upload/v1752859782/notes-assets/images/AWS-Certified-Developer-Associate-S3-Review-Storage-Classes/aws-s3-glacier-infographic.jpg)

## S3 Intelligent-Tiering

S3 Intelligent-Tiering simplifies storage management by automatically moving data between access tiers based on usage patterns. This ensures you only pay for the most cost-effective storage option without any retrieval delays.

Be aware that in addition to the storage costs for the final tier, an extra monitoring and automation fee per 1,000 objects applies.

![The image describes S3 Intelligent-Tiering, highlighting its ability to reduce storage costs by moving data to cost-effective tiers and mentioning a monitoring cost per 1,000 objects.](https://kodekloud.com/kk-media/image/upload/v1752859783/notes-assets/images/AWS-Certified-Developer-Associate-S3-Review-Storage-Classes/s3-intelligent-tiering-storage-costs.jpg)

## Choosing the Right Storage Class

Selecting the appropriate S3 storage class depends on your data access patterns and resiliency requirements. Consider the following guidelines:

| Requirement                                                   | Recommended Storage Classes                    |
| ------------------------------------------------------------- | ---------------------------------------------- |
| Immediate access (within milliseconds)                        | S3 Standard, S3 Standard-IA, or S3 One Zone-IA |
| Archive with immediate retrieval capability                   | S3 Glacier Instant                             |
| Archival data with delayed retrieval (up to 12 hours or more) | S3 Glacier Flexible or S3 Glacier Deep Archive |

![The image is a flowchart for selecting storage options based on access frequency and immediacy, including options like Standard, Glacier Instant, and Glacier Deep Archive.](https://kodekloud.com/kk-media/image/upload/v1752859784/notes-assets/images/AWS-Certified-Developer-Associate-S3-Review-Storage-Classes/storage-options-flowchart-access-frequency.jpg)

## Summary

AWS S3 storage classes offer a variety of options tailored to diverse data access patterns, resiliency needs, and cost constraints. Choosing the right storage class can significantly optimize costs while meeting your specific performance requirements. To set a specific storage class for an object, include the x-amz-storage-class request header when uploading to S3.

![The image is a summary slide discussing storage classes, highlighting their role in providing varying levels of data access, resiliency, and cost, and explaining how they are set up and can be changed.](https://kodekloud.com/kk-media/image/upload/v1752859785/notes-assets/images/AWS-Certified-Developer-Associate-S3-Review-Storage-Classes/storage-classes-summary-data-access.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/e8ae2293-e16b-42d3-b32b-5c260a1f1e5d/lesson/bce86837-e0d2-41d5-8da7-493b3febf876)**
>
> Watch video content
