# Core AWS Services Storage - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Cloud-Practitioner-CLF-C02/Technology-Part-One/Core-AWS-Services-Storage)

---

## Table of Contents

- Core AWS Services Storage
  - Block Storage
  - File Storage
  - Object Storage
  - AWS S3 Storage Classes
  - S3 Intelligent-Tiering
  - Choosing the Right S3 Storage Class
  - Recap: Object Storage with S3
  - Watch Video
    - S3 Standard
    - S3 Standard-Infrequent Access (S3 Standard-IA)
    - S3 One Zone-Infrequent Access (S3 One Zone-IA)
    - S3 Glacier Instant
    - S3 Glacier Flexible
    - S3 Glacier Deep Archive

---

## Content

AWS Cloud Practitioner CLF-C02

Technology Part One

# Core AWS Services Storage

In this article, we explore the different storage services offered by AWS. AWS provides three primary storage options—block, file, and object—each designed to address specific use cases. We'll explain how each storage type works, discuss its benefits and limitations, and highlight the corresponding AWS service.

---

## Block Storage

AWS delivers block storage through its Elastic Block Store (EBS). This service divides your data into individual blocks, each with a unique identifier. These blocks are then aggregated and presented as a volume to your operating system, allowing you to create file systems or even install an operating system. This bootable capability sets block storage apart from file and object storage.

![The image explains block storage, showing data divided into blocks with unique identifiers, stored separately in two cylindrical containers.](https://kodekloud.com/kk-media/image/upload/v1752861932/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Storage/frame_40.jpg)

> [!important]
> **Note**
>
> EBS volumes must be located in the same availability zone as the EC2 instance to which they are attached. EC2 instances in different availability zones cannot connect to a given EBS volume.

![The image illustrates EBS Volumes within a Virtual Private Cloud (VPC) across two availability zones, highlighting a connection restriction between a processor and EBS storage.](https://kodekloud.com/kk-media/image/upload/v1752861934/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Storage/frame_120.jpg)

Additionally, AWS provides instance stores that offer temporary block storage. Keep in mind that instance store data is erased when an EC2 instance is stopped or restarted.

![The image summarizes block storage concepts, highlighting EBS volumes' mountability, availability zone constraints, and instance store removal upon EC2 instance stop/start.](https://kodekloud.com/kk-media/image/upload/v1752861935/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Storage/frame_160.jpg)

---

## File Storage

AWS offers file storage through the Elastic File System (Amazon EFS). EFS organizes data in a familiar hierarchical structure of files and folders similar to traditional computer file systems. This network-accessible storage can be mounted concurrently on multiple clients but, unlike block storage, it cannot be used to boot an operating system.

![The image explains file storage, highlighting its hierarchical structure, remote accessibility, mounting capability, and non-bootable nature, with an illustration of a folder on a laptop.](https://kodekloud.com/kk-media/image/upload/v1752861937/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Storage/frame_240.jpg)

Multiple users and systems can access the same file system simultaneously, making Amazon EFS an excellent choice for collaborative and distributed environments.

![The image illustrates file storage accessible over a network, allowing multiple clients to access the same data, with a diagram showing connectivity.](https://kodekloud.com/kk-media/image/upload/v1752861939/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Storage/frame_260.jpg)

---

## Object Storage

Object storage treats data as objects (files) rather than blocks or files in a directory structure. AWS’s Simple Storage Service (S3) is the primary object storage solution. Although S3 can display a folder-like interface for easier navigation, its underlying storage model is a flat file system.

![The image explains object storage, highlighting its ability to store any file type without a folder structure, using a flat file system.](https://kodekloud.com/kk-media/image/upload/v1752861941/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Storage/frame_320.jpg)

Since object storage is not mountable or bootable, it is best suited for storing logs, media, backups, and other data that does not require a conventional file system. AWS S3 further enhances versatility by offering multiple storage classes to balance cost, accessibility, and data durability.

---

## AWS S3 Storage Classes

AWS S3 provides a range of storage classes to match various data access patterns and pricing models. Below is an overview of each storage class:

### S3 Standard

S3 Standard is the default storage class and replicates data across multiple availability zones, ensuring high durability (up to 11 nines) and immediate data availability. The pricing is based on the amount of data stored per month and outbound data transfer.

![The image illustrates AWS S3 Standard storage, showing data replication across three availability zones, with charges applied per gigabyte.](https://kodekloud.com/kk-media/image/upload/v1752861942/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Storage/frame_440.jpg)

### S3 Standard-Infrequent Access (S3 Standard-IA)

For data that does not require frequent access, S3 Standard-IA provides the same durability and availability as S3 Standard but at a lower storage cost. Expect egress and retrieval fees, with a minimum storage period of 90 days and a minimum object size charge of 128 kilobytes.

![The image illustrates AWS S3 Standard-IA storage, showing documents distributed across three availability zones, highlighting cost-effectiveness compared to S3 Standard.](https://kodekloud.com/kk-media/image/upload/v1752861944/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Storage/frame_480.jpg)

### S3 One Zone-Infrequent Access (S3 One Zone-IA)

S3 One Zone-IA reduces costs by storing data in a single availability zone. While this option lowers replication costs, it also offers reduced resilience against availability zone failures. The class includes similar egress and retrieval fees as Standard-IA.

![The image explains AWS S3 One Zone-IA storage, highlighting retrieval fees, minimum charges, and replication within a single availability zone, designed for infrequently accessed data.](https://kodekloud.com/kk-media/image/upload/v1752861946/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Storage/frame_620.jpg)

### S3 Glacier Instant

S3 Glacier Instant is designed for low-cost storage of rarely accessed data while ensuring immediate retrieval. Similar to S3 Standard, it incurs egress and retrieval fees, with a minimum storage duration of 90 days and a minimum object size of 128 kilobytes.

![The image explains AWS S3 Glacier-Instant, highlighting its low-cost storage for rarely accessed data, retrieval fees, and performance similar to S3 Standard across availability zones.](https://kodekloud.com/kk-media/image/upload/v1752861949/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Storage/frame_650.jpg)

### S3 Glacier Flexible

S3 Glacier Flexible provides an economical solution for data that is infrequently needed. Retrieval times vary based on the service option: expedited (1–5 minutes), standard (3–5 hours), or bulk (5–12 hours). It also applies egress and retrieval fees, along with a minimum storage duration of 90 days and a minimum object size charge of 40 kilobytes.

![The image explains AWS S3 Glacier-Flexible storage, highlighting retrieval fees, minimum charges, and availability zones, emphasizing cost-effectiveness compared to S3 Standard.](https://kodekloud.com/kk-media/image/upload/v1752861951/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Storage/frame_750.jpg)

### S3 Glacier Deep Archive

For data that is almost never accessed, S3 Glacier Deep Archive offers the most cost-effective storage option, albeit with the longest retrieval times—up to 12 hours for standard retrieval or 48 hours for bulk retrieval. Charges include typical egress, retrieval fees, and a minimum storage duration of 90 days with a minimum object size of 40 kilobytes.

---

## S3 Intelligent-Tiering

S3 Intelligent-Tiering simplifies storage management by automatically moving data to the most cost-effective tier based on changing access patterns. Although you are billed according to the storage class your objects reside in, an additional monitoring and automation fee applies for every 1,000 objects.

![The image explains S3 Intelligent-Tiering, highlighting automatic cost reduction by moving data to cost-effective tiers and additional monitoring costs per 1,000 objects.](https://kodekloud.com/kk-media/image/upload/v1752861952/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Storage/frame_880.jpg)

---

## Choosing the Right S3 Storage Class

To determine the most suitable S3 storage class for your needs, follow this decision-making process:

1.  Determine if immediate data accessibility is required:
    - If yes:
      - Assess how frequently the data will be accessed:
        - For frequent access, choose S3 Standard.
        - For infrequent access:
          - If multi-availability zone replication is essential, select S3 Standard-IA.
          - Otherwise, opt for S3 One Zone-IA.
2.  If immediate access is not a priority:
    - For scenarios requiring immediate retrieval on demand, choose S3 Glacier Instant.
    - For cost-effective archiving with slower retrieval:
      - If moderate retrieval speed is acceptable, choose S3 Glacier Flexible.
      - For data that is almost never accessed, choose S3 Glacier Deep Archive.

![The image is a flowchart for selecting storage options based on access frequency and immediacy, including Standard, Glacier, and Deep Archive options.](https://kodekloud.com/kk-media/image/upload/v1752861954/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Storage/frame_900.jpg)

---

## Recap: Object Storage with S3

AWS S3 is an object storage service that organizes data in a flat namespace, even though its interface mimics traditional directories and folders. S3 is ideal for storing media files, logs, audit reports, and other data that do not require mounting or boot functionality. By offering multiple storage classes, S3 helps you optimize for cost, data accessibility, and resilience based on your specific requirements.

![The image summarizes S3 object storage, highlighting its flat file structure, suitability for various file types, and API-based access, not for mounting or booting.](https://kodekloud.com/kk-media/image/upload/v1752861956/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Core-AWS-Services-Storage/frame_1020.jpg)

This concludes our detailed overview of AWS storage services and S3 storage classes. By understanding the differences between block, file, and object storage—and the nuances of each S3 storage class—you can choose the ideal storage solution to meet your business needs.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02/module/dcba3ea8-580a-4aac-ad89-48969e6876ee/lesson/ccf6d504-11a6-49ab-a1da-94c72928e76f)**
>
> Watch video content
