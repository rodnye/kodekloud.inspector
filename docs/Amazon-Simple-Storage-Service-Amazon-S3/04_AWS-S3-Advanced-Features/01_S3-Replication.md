# S3 Replication - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Amazon-Simple-Storage-Service-Amazon-S3/AWS-S3-Advanced-Features/S3-Replication)

---

## Table of Contents

- S3 Replication
  - Why Use S3 Replication?
  - Types of Replication
  - Same-Region Replication Use Cases
  - Cross-Region Replication Use Cases
  - One-Way vs. Bidirectional Replication
  - Replication Requirements
  - Object Replication Details
  - Delete Markers and Version Deletions
  - Cross-Account Replication Permissions
  - Replication Latency and Replication Time Control (RTC)
  - Watch Video

---

## Content

Amazon Simple Storage Service (Amazon S3)

AWS S3 Advanced Features

# S3 Replication

Amazon S3 Replication enables automatic, asynchronous copying of objects from a source bucket to one or more destination buckets. By configuring replication, you can meet compliance mandates, protect against accidental data loss, and serve data with low latency by placing it closer to your users or workloads.

## Why Use S3 Replication?

Replication offers several benefits:

- Maintain multiple copies of objects in separate locations for disaster recovery
- Comply with regulatory requirements for geographically isolated data
- Reduce read latency by storing objects nearer to end users
- Enhance application performance by keeping data close to processing servers

![The image lists the uses of replication, highlighting data protection, compliance requirements, storing data closer to users, and keeping data near servers. It includes icons next to each point.](https://kodekloud.com/kk-media/image/upload/v1752869235/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-S3-Replication/replication-uses-data-protection-compliance.jpg)

## Types of Replication

| Replication Type               | Description                                                                                           |
| ------------------------------ | ----------------------------------------------------------------------------------------------------- |
| Same-Region Replication (SRR)  | Copy objects to another bucket within the same AWS Region.                                            |
| Cross-Region Replication (CRR) | Copy objects to a bucket in a different AWS Region.                                                   |
| Multi-Destination Replication  | Replicate objects from one source bucket to multiple destination buckets (same or different Regions). |

---

## Same-Region Replication Use Cases

Even when operating in a single Region, SRR can solve key challenges:

- **Log Aggregation:** Consolidate logs from multiple application buckets into a central bucket for unified analytics.
- **Prod-to-Test Synchronization:** Keep your development or staging environments up to date with production data for realistic testing.

![The image illustrates same-region replication use cases, showing the aggregation of logs into a single bucket and live replication between production and test environments.](https://kodekloud.com/kk-media/image/upload/v1752869237/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-S3-Replication/same-region-replication-use-cases.jpg)

---

## Cross-Region Replication Use Cases

CRR is ideal when you need to:

- Fulfill compliance requirements by storing copies in separate Regions
- Deliver content faster to global audiences by minimizing latency
- Increase operational resilience by providing local access to data for multi-Region applications

![The image lists cross-region replication use cases, including compliance requirements, minimizing latency, and operational efficiency, each with corresponding icons.](https://kodekloud.com/kk-media/image/upload/v1752869238/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-S3-Replication/cross-region-replication-use-cases-icons.jpg)

---

## One-Way vs. Bidirectional Replication

By default, replication in S3 is **one-way**: changes in the source bucket propagate to the destination, but updates in the destination do not return to the source. For active-active deployments or automated failover, you can configure **bidirectional replication** manually to synchronize changes both ways.

![The image illustrates bidirectional replication between "Prod" and "Dev" buckets, indicating it can be configured manually, with a cross symbol suggesting a potential issue or restriction.](https://kodekloud.com/kk-media/image/upload/v1752869239/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-S3-Replication/bidirectional-replication-prod-dev-buckets.jpg)

Use Case: During a regional failover, promote the replica bucket as primary. Bidirectional replication ensures that changes made in the failover Region synchronize back when the original Region is restored.

---

## Replication Requirements

Before enabling replication, verify these prerequisites:

| Requirement               | Details                                                                                  |
| ------------------------- | ---------------------------------------------------------------------------------------- |
| Versioning Enabled        | Turn on versioning for both the source and destination buckets.                          |
| IAM Permissions           | Grant AWS S3 the necessary IAM role or policy to perform replication actions.            |
| S3 Object Lock (optional) | If enabled on the source bucket, Object Lock must also be configured on the destination. |

> [!important]
> **Warning**
>
> Replication will not start until versioning is activated on both buckets. The S3 console will prompt you if versioning is missing.

![The image lists replication requirements for AWS S3, including versioning on both buckets, permission to replicate, and object lock on both buckets.](https://kodekloud.com/kk-media/image/upload/v1752869240/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-S3-Replication/aws-s3-replication-requirements-list.jpg)

---

## Object Replication Details

- **New vs. Existing Objects:** Only objects created _after_ replication configuration are auto-copied. To migrate existing objects, use a one-time [Batch Operations job](https://docs.aws.amazon.com/AmazonS3/latest/userguide/batch-ops.html).
- **Encryption:** Objects encrypted with SSE-S3, SSE-KMS, or client-side encryption replicate transparently.
- **Glacier Classes:** Objects in **Glacier Flexible Retrieval** and **Glacier Deep Archive** replicate like standard objects, but you must restore them before access.
- **Metadata & Tags:** All object metadata, ACLs, and tags are preserved during replication.
- **Storage Class Overrides:** Optionally, convert storage classes on the destination—for example, replicate `S3 Standard` to `S3 Standard-IA` in the target bucket.

![The image provides details about object replication in AWS S3, mentioning that only objects created after enabling replication will be replicated, including those with encryption, while objects in certain Glacier storage classes will not be replicated.](https://kodekloud.com/kk-media/image/upload/v1752869244/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-S3-Replication/aws-s3-object-replication-details.jpg)

---

## Delete Markers and Version Deletions

- **Delete Markers:** Not replicated by default. You can enable marker replication if your workflow requires it.
- **Version Deletions:** Removing a specific object version in the source bucket does _not_ delete it in the destination—protecting against accidental or malicious data loss.

![The image explains that by default, delete markers do not get replicated, and if a specific version of an object is deleted on the source bucket, it will not be deleted on the destination bucket to protect data from malicious deletions.](https://kodekloud.com/kk-media/image/upload/v1752869245/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-S3-Replication/delete-markers-replication-explanation.jpg)

---

## Cross-Account Replication Permissions

| Scenario               | Configuration                                                                                       |
| ---------------------- | --------------------------------------------------------------------------------------------------- |
| Same AWS Account       | Create an IAM role in the source account with S3 replicate permissions.                             |
| Different AWS Accounts | In addition to the source IAM role, attach a bucket policy on the destination to allow replication. |

![The image illustrates AWS S3 bucket replication permissions, showing a source bucket with an IAM role and a destination bucket with a bucket policy, indicating replication to a different AWS account.](https://kodekloud.com/kk-media/image/upload/v1752869246/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-S3-Replication/aws-s3-bucket-replication-permissions.jpg)

---

## Replication Latency and Replication Time Control (RTC)

Replication is inherently asynchronous and may take minutes or hours, depending on object size and count. If you require replication within 15 minutes to fulfill strict SLA or regulatory requirements, enable **Replication Time Control (RTC)**.

> [!important]
> **Note**
>
> Replication Time Control (RTC) guarantees that new objects are copied within 15 minutes of creation. This feature incurs additional costs—see the [Amazon S3 Pricing](https://aws.amazon.com/s3/pricing/) page for details.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/amazon-simple-storage-service-amazon-s3/module/90fd6d76-d0d4-481c-b267-b9247a005a6e/lesson/6d3f6520-5733-4225-8adc-a9926fbe3710)**
>
> Watch video content
