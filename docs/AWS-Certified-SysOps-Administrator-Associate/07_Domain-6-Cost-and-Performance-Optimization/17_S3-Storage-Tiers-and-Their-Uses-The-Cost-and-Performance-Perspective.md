# S3 Storage Tiers and Their Uses The Cost and Performance Perspective - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-6-Cost-and-Performance-Optimization/S3-Storage-Tiers-and-Their-Uses-The-Cost-and-Performance-Perspective)

---

## Table of Contents

- S3 Storage Tiers and Their Uses The Cost and Performance Perspective
  - Overview of Storage Tiers
  - S3 Standard and S3 Express One Zone
  - Infrequent Access Tiers
  - Glacier Storage Options
  - Intelligent Tiering
  - Decision Tree for Selecting a Storage Class
  - Additional Considerations
  - References
  - Watch Video
    - S3 Standard-Infrequent Access (S3 Standard-IA)
    - S3 One Zone-Infrequent Access
    - S3 Glacier Instant Retrieval
    - S3 Glacier Flexible Retrieval
    - S3 Glacier Deep Archive

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 6 Cost and Performance Optimization

# S3 Storage Tiers and Their Uses The Cost and Performance Perspective

In this article, we explore various Amazon S3 storage classes, outlining the trade-offs between cost and performance. Choosing the right storage tier is crucial based on your data access patterns and resiliency needs.

## Overview of Storage Tiers

Amazon S3 storage classes are designed to offer a balance between performance and cost. The tiers range from "hot" storage, which provides high performance and immediate access, to "cold" storage optimized for archival purposes with significantly lower costs.

For example, S3 Standard—the default storage class—ensures 11 nines of durability and near-instant access, often within milliseconds. However, this high performance comes with a higher price tag. In contrast, Glacier Deep Archive offers a reduction in cost by roughly 24 times. In US East 1, storing one terabyte in S3 Standard might cost around $23 per month, whereas Glacier Deep Archive could cost about $1 per month.

## S3 Standard and S3 Express One Zone

S3 Standard is the globally available, highly resilient storage class used by most deployments. Recently, S3 Express One Zone was introduced, which delivers millisecond file retrieval and a "hot" performance profile. However, this option stores data in a single availability zone and therefore does not offer the same level of resiliency.

> [!important]
> **Note**
>
> S3 Express One Zone is a new offering and might not be included in exam materials yet.

S3 Standard incurs costs based on gigabyte usage and API calls, with charges applied only when data is retrieved.

![The image illustrates the AWS S3 Standard storage model, showing data stored across three availability zones with charges based on data usage per gigabyte.](https://kodekloud.com/kk-media/image/upload/v1752861109/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-S3-Storage-Tiers-and-Their-Uses-The-Cost-and-Performance-Perspective/aws-s3-standard-storage-model.jpg)

## Infrequent Access Tiers

### S3 Standard-Infrequent Access (S3 Standard-IA)

Designed for data that is not frequently accessed yet demands multi–availability zone resilience, S3 Standard-IA offers a lower cost per gigabyte when compared to S3 Standard. However, it includes a retrieval fee and a minimum duration charge of 30 days. Files smaller than 128 KB are billed as if they were 128 KB.

![The image is a diagram explaining AWS S3 Standard-IA storage, highlighting features like retrieval fees, a minimum duration charge of 30 days, and data distribution across three availability zones.](https://kodekloud.com/kk-media/image/upload/v1752861111/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-S3-Storage-Tiers-and-Their-Uses-The-Cost-and-Performance-Perspective/aws-s3-standard-ia-diagram.jpg)

### S3 One Zone-Infrequent Access

This tier is similar to S3 Standard-IA regarding pricing, retrieval fees, and minimum storage duration. The key difference is that S3 One Zone-IA stores data in a single availability zone, making it a cost-effective solution for data that is infrequently accessed and easily recreated if lost.

## Glacier Storage Options

### S3 Glacier Instant Retrieval

S3 Glacier Instant Retrieval is tailored for data that is rarely accessed but still requires rapid retrieval. This tier offers instant access; however, a retrieval fee is charged each time data is accessed. It also has a minimum storage duration of 90 days. While it is less expensive than S3 Standard or S3 Standard-IA, frequent retrievals can quickly escalate costs.

![The image illustrates AWS S3 Glacier-Instant, highlighting its retrieval fee, availability zones, and its low-cost option for rarely accessed data with performance similar to S3 Standard.](https://kodekloud.com/kk-media/image/upload/v1752861112/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-S3-Storage-Tiers-and-Their-Uses-The-Cost-and-Performance-Perspective/aws-s3-glacier-instant-overview.jpg)

### S3 Glacier Flexible Retrieval

For data that can tolerate longer retrieval times, S3 Glacier Flexible Retrieval offers even lower storage costs. Data restoration typically takes five to twelve hours for bulk restores or three to five hours for individual file retrievals. An expedited retrieval option is available for an extra fee, reducing wait times to one to five minutes. During the retrieval process, objects are temporarily moved to the S3 Standard-IA tier.

![The image is an infographic about AWS S3 Glacier-Flexible, highlighting its retrieval options, charges, and availability zones. It mentions retrieval fees, minimum charges, and different retrieval time options.](https://kodekloud.com/kk-media/image/upload/v1752861113/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-S3-Storage-Tiers-and-Their-Uses-The-Cost-and-Performance-Perspective/aws-s3-glacier-infographic.jpg)

### S3 Glacier Deep Archive

Glacier Deep Archive is the most economical storage tier, designed for long-term archival of seldom-accessed data such as compliance records or tax documents. In US East 1, storing one terabyte in this tier costs around $1 per month. Files must remain in Glacier Deep Archive for at least 180 days to avoid extra fees, and retrieval can take 12 hours for a single file or up to 48 hours for bulk requests.

![The image illustrates the AWS S3 Glacier Deep Archive, highlighting it as the cheapest storage class in S3, with documents stored across three availability zones.](https://kodekloud.com/kk-media/image/upload/v1752861114/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-S3-Storage-Tiers-and-Their-Uses-The-Cost-and-Performance-Perspective/aws-s3-glacier-deep-archive.jpg)

## Intelligent Tiering

For workloads where access patterns are unpredictable, S3 Intelligent Tiering automatically transitions data between frequent and infrequent access tiers based on usage activity. This feature helps eliminate the need to manage storage class transitions manually, though a small monitoring fee is incurred.

## Decision Tree for Selecting a Storage Class

When selecting an appropriate S3 storage class, consider these guiding questions:

1.  Do you require immediate access to your data?
    - If data is almost never accessed, consider Glacier Deep Archive.
    - For rarely accessed data that still demands some resiliency, consider Glacier Flexible Retrieval.
    - For infrequent access with high resiliency, opt for S3 Standard-IA.
2.  Does the data require high-speed, frequent access?
    - If yes, use S3 Standard or S3 Express One Zone for lower latency.
3.  If your access pattern is unpredictable, S3 Intelligent Tiering is likely the best choice.

> [!important]
> **Tip**
>
> S3 Express One Zone is optimal for extremely hot data when low latency is critical, but ensure you are comfortable with its lower resiliency level.

## Additional Considerations

- Storage classes are specified during object upload using the Amazon S3 storage class header or can be modified later via the AWS Management Console.
- Always consider the minimum storage duration and billable object size (typically 128 KB, with some variations in Glacier options).
- Review the retrieval options and potential fees for Glacier tiers. For example:
  - Glacier Flexible Retrieval: 5–12 hours bulk restore, 3–5 hours for single file, or expedited retrieval for 1–5 minutes.
  - Glacier Deep Archive: 12 hours for a single file and up to 48 hours for bulk requests.

This comprehensive guide should help you choose the most cost-effective S3 storage class that meets your performance and resiliency needs. Happy storing!

## References

- [Amazon S3 Overview](https://aws.amazon.com/s3/)
- [AWS S3 Pricing](https://aws.amazon.com/s3/pricing/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/c363221d-1b2d-4c1c-876a-cb6108f473e3/lesson/fb0264ee-6c3d-401f-8b1a-a3f209d050b1)**
>
> Watch video content
