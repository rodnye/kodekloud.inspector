# S3 Storage Classes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Storage/S3-Storage-Classes)

---

## Table of Contents

- S3 Storage Classes
  - S3 Standard
  - S3 Standard-IA (Infrequent Access)
  - S3 One Zone-IA (One Zone Infrequent Access)
  - S3 Glacier Instant
  - S3 Glacier Flexible
  - S3 Glacier Deep Archive
  - S3 Intelligent Tiering
  - Choosing the Right Storage Class
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Storage

# S3 Storage Classes

In this article, we explore the various AWS S3 storage classes and explain how each one is optimized for different access patterns, resiliency requirements, and cost considerations. AWS offers a range of storage classes so that you can avoid overpaying by selecting the most suitable option based on your data access frequency and performance needs.

Everyone has unique data storage requirements, whether for large-scale data or less frequently accessed information. AWS addresses these needs by providing multiple pricing schemes and performance features tailored to distinct usage patterns.

![The image illustrates "Storage Classes" with icons representing data access, resiliency, and cost. Each icon is labeled accordingly, and there's a central icon of a storage bucket.](https://kodekloud.com/kk-media/image/upload/v1752866089/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Storage-Classes/storage-classes-data-access-icons.jpg)

## S3 Standard

S3 Standard is the default storage class for AWS S3. When you upload a file without specifying a storage class, it is automatically stored as S3 Standard. In this class, objects are automatically replicated across at least three Availability Zones (AZs), enabling the system to survive up to two simultaneous AZ failures. This design ensures an impressive durability of 99.999999999% (11 nines).

Key features of S3 Standard include:

- Billed per gigabyte per month.
- Low latency access with files available in milliseconds.
- Support for public access (ideal for web application media files).
- Charges for data egress; uploading data (ingress) is free.

![The image illustrates AWS S3 Standard storage with 99.999999999% durability, showing documents replicated across three availability zones.](https://kodekloud.com/kk-media/image/upload/v1752866091/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Storage-Classes/aws-s3-standard-storage-durability.jpg)

![The image illustrates the AWS S3 Standard storage model, showing data replication across three availability zones and indicating charges per gigabyte.](https://kodekloud.com/kk-media/image/upload/v1752866092/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Storage-Classes/aws-s3-standard-storage-model.jpg)

## S3 Standard-IA (Infrequent Access)

S3 Standard-IA is designed for data that is accessed less frequently while still requiring rapid access when needed. Similar to S3 Standard, it replicates data across at least three Availability Zones to ensure high durability. However, it offers a lower storage cost for infrequently accessed data.

Consider these important points for S3 Standard-IA:

- Lower per gigabyte storage rates compared to S3 Standard.
- Maintains low latency for rapid data access.
- Applies a retrieval fee on each data request along with a per-gigabyte egress charge.
- Enforces a minimum duration charge of 30 days per object. If an object is deleted before 30 days, you are still charged for the full period.
- Uses a minimum object size charge of 128 kilobytes (even a 1 KB file is billed as 128 KB).

![The image illustrates AWS S3 Standard-IA storage, showing documents distributed across three availability zones, highlighting its ability to handle two simultaneous AZ failures.](https://kodekloud.com/kk-media/image/upload/v1752866093/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Storage-Classes/aws-s3-standard-ia-storage-diagram.jpg)

![The image illustrates the AWS S3 Standard-IA storage class, highlighting features like retrieval fees, a minimum duration charge of 30 days, and a minimum size charge of 128 KB per object, with data stored across multiple availability zones.](https://kodekloud.com/kk-media/image/upload/v1752866094/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Storage-Classes/aws-s3-standard-ia-storage-class.jpg)

## S3 One Zone-IA (One Zone Infrequent Access)

S3 One Zone-IA is similar to S3 Standard-IA, but stores data in a single Availability Zone instead of multiple zones, resulting in lower storage costs. This makes it an attractive option for data that is infrequently accessed and does not require the added resiliency of multiple AZ replication.

Key details about S3 One Zone-IA:

- Provides immediate, low latency access.
- Supports public access similar to other S3 storage classes.
- Applies charges for egress, retrieval, a minimum duration of 30 days, and a minimum size charge of 128 kilobytes.
- Lacks multi-AZ replication, meaning that in the event of an AZ failure, your data could become inaccessible.

> [!important]
> **Warning**
>
> Since S3 One Zone-IA stores data in only one Availability Zone, consider the risk of data unavailability during an AZ outage.

## S3 Glacier Instant

S3 Glacier Instant is part of the Glacier family and is designed for archiving data that is rarely accessed while providing rapid data retrieval. It maintains high durability through replication across multiple Availability Zones, similar to S3 Standard.

Key features of S3 Glacier Instant include:

- Low-cost storage optimized for archival data.
- Retrieval of data in milliseconds.
- Lower per gigabyte charges compared to S3 Standard.
- Data egress fees and additional retrieval fees apply.
- A minimum duration charge of 90 days and a minimum size charge of 128 kilobytes per object.

![The image is an infographic about AWS S3 Glacier-Instant, highlighting its retrieval fee, 90-day minimum charge, and availability across three zones. It notes that it's a low-cost option for rarely accessed data with performance similar to S3 Standard.](https://kodekloud.com/kk-media/image/upload/v1752866095/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Storage-Classes/aws-s3-glacier-infographic.jpg)

## S3 Glacier Flexible

S3 Glacier Flexible is intended for data that is archived and does not require immediate access. Unlike S3 Glacier Instant, objects stored in Glacier Flexible are not available instantly; a retrieval process similar to a "cold start" is necessary. Consequently, direct public access to these objects is not supported.

Important details for S3 Glacier Flexible:

- Lower monthly storage costs compared to S3 Standard-IA.
- Retrieval fees and a minimum duration charge of 90 days apply.
- Enforces a minimum size charge of 40 kilobytes per object.
- Offers three retrieval options based on speed:
  - Expedited (1–5 minutes)
  - Standard (3–5 hours)
  - Bulk (5–12 hours)
- During the retrieval process, objects are temporarily stored in S3 Standard-IA.

![The image is an infographic about AWS S3 Glacier-Flexible, detailing retrieval fees, minimum charges, and retrieval options. It highlights the storage of objects across availability zones and mentions temporary storage in S3 Standard-IA during retrieval.](https://kodekloud.com/kk-media/image/upload/v1752866096/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Storage-Classes/aws-s3-glacier-infographic-2.jpg)

## S3 Glacier Deep Archive

S3 Glacier Deep Archive provides the most cost-effective storage solution available for AWS S3. Like Glacier Flexible, objects stored in this class are not immediately available and must go through a retrieval process. This class is ideal for data that is rarely needed and can tolerate longer retrieval times.

Key Characteristics:

- Lowest storage cost among all S3 storage classes.
- Charges include a per-gigabyte egress fee and a retrieval fee.
- A minimum duration charge of 180 days applies, along with a minimum size charge of 40 kilobytes per object.
- Retrieval options include:
  - Standard (within 12 hours)
  - Bulk (within 48 hours; the more cost-effective choice if immediate access isn’t critical)
- Retrieved data is temporarily stored in S3 Standard-IA.

## S3 Intelligent Tiering

S3 Intelligent Tiering is a smart storage option for workloads with unpredictable access patterns. This class automatically moves data between tiers to optimize storage costs based on changing usage patterns. An additional monitoring and automation fee is applied per 1,000 objects alongside the underlying storage cost.

Learn more about [AWS S3 Intelligent Tiering](https://aws.amazon.com/s3/storage-classes/intelligent-tiering/).

## Choosing the Right Storage Class

Selecting the appropriate storage class depends on your performance requirements and budget considerations. Use the following decision-making process to choose the correct AWS S3 storage class:

1.  Determine if immediate access (within milliseconds) is necessary.
    - If yes, consider:
      - Frequent access: Choose S3 Standard.
      - Infrequent access:
        - Multi-AZ resilience needed: Choose S3 Standard-IA.
        - Single-AZ storage is sufficient: Choose S3 One Zone-IA.
2.  If immediate access is not required:
    - For very rarely accessed data: Choose S3 Glacier Deep Archive.
    - For archival data with occasional access needs: Choose S3 Glacier Flexible.

![The image is a flowchart for selecting storage options based on access frequency and immediacy, including options like Standard, Glacier Instant, and Glacier Deep Archive.](https://kodekloud.com/kk-media/image/upload/v1752866097/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Storage-Classes/storage-options-flowchart-access-frequency.jpg)

> [!important]
> **Note**
>
> To specify a storage class for an S3 object, include the x-amz-storage-class request header when uploading the object.

In summary, AWS S3 storage classes provide a variety of options to help you optimize costs while ensuring that data access and durability requirements are met. Choosing the right storage class avoids unnecessary expenses and maintains the performance specifications needed for your applications.

![The image is a summary slide discussing storage classes, highlighting their varying levels of data access, resiliency, and cost, and explaining how they are set up and can be changed.](https://kodekloud.com/kk-media/image/upload/v1752866098/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Storage-Classes/storage-classes-summary-access-resiliency.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/23e00d1f-6422-4fef-a9bf-e8f007be5514/lesson/5f386e86-2e08-427f-b968-5f23dc3d519e)**
>
> Watch video content
