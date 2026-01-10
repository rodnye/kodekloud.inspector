# EBS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Storage/EBS)

---

## Table of Contents

- EBS
  - EBS in Action
  - EBS Volume Types
  - EBS Pricing
  - Summary
  - Watch Video
    - SSD-Based Volumes
    - HDD-Based Volumes
    - Magnetic Volumes

---

## Content

AWS Certified Developer - Associate

Storage

# EBS

In this article, we explore AWS Elastic Block Store (EBS) and review the fundamentals of block storage as introduced in our [AWS Cloud Practitioner (CLF-C02)](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02) course. Block storage breaks data into unique individual blocks and distributes these blocks across multiple physical devices. Once assembled, these blocks appear to an operating system as a volume, allowing you to create a file system. Moreover, block storage can serve as a bootable device, enabling you to install an operating system directly onto it.

![The image illustrates a block storage system, showing data blocks distributed across two storage units, with a computer interface managing the blocks.](https://kodekloud.com/kk-media/image/upload/v1752859632/notes-assets/images/AWS-Certified-Developer-Associate-EBS/block-storage-system-data-distribution.jpg)

This dual functionality makes block storage versatile and critical for various cloud architectures, including scenarios encountered in the AWS Solutions Architect exam. In AWS, the block storage service is known as Elastic Block Store (EBS), which provides block level storage volumes for EC2 instances. Once an EBS volume is attached, the EC2 instance detects it as an available block device, allowing file systems such as XFS, ext3, or ext4 to be created on it.

> [!important]
> **Key Benefit**
>
> One major advantage of EBS is its flexibility. You can detach an EBS volume from one EC2 instance and later attach it to another, with all data preserved. While generally an EBS volume is linked to a single EC2 instance, some volume types support multi-attach, allowing multiple instances to access the same volume. In such setups, it is vital that only one instance performs write operations at a time to prevent data corruption.

It is important to note that an EBS volume is provisioned within a specific availability zone. This means that, although it offers built-in redundancy to handle device failures within the same zone, it is not resilient to complete availability zone failures. Additionally, both the EC2 instance and the EBS volume need to be located in the same availability zone.

![The image illustrates Elastic Block Storage (EBS) with two availability zones, each containing four EBS instances labeled EBS 01 to EBS 04. Each zone is connected to a computing resource icon.](https://kodekloud.com/kk-media/image/upload/v1752859633/notes-assets/images/AWS-Certified-Developer-Associate-EBS/elastic-block-storage-availability-zones.jpg)

## EBS in Action

To understand how EBS works in practice, consider the following process:

1.  Choose an availability zone because EBS volumes are specific to a zone.
2.  Create an EBS volume in the selected zone.
3.  Launch an EC2 instance within the same zone.
4.  Attach the volume as a block device to the EC2 instance.

![The image is a diagram illustrating Elastic Block Storage (EBS) within a region, showing two availability zones, with EBS connected to a component in Availability Zone 01.](https://kodekloud.com/kk-media/image/upload/v1752859634/notes-assets/images/AWS-Certified-Developer-Associate-EBS/elastic-block-storage-diagram.jpg)

If you need to transfer data from one EC2 instance to another within the same availability zone, simply detach the EBS volume from the current instance and attach it to the new one. However, for EC2 instances in different availability zones, you must first create a snapshot of the original EBS volume. This snapshot, stored in Amazon S3, is accessible across availability zones within the same region. You can then create a new EBS volume from this snapshot in the desired availability zone and attach it to your EC2 instance.

![The image is a diagram illustrating Elastic Block Storage (EBS) in a cloud environment, showing two availability zones with EBS volumes, snapshots, and the process of creating volumes from snapshots.](https://kodekloud.com/kk-media/image/upload/v1752859635/notes-assets/images/AWS-Certified-Developer-Associate-EBS/elastic-block-storage-diagram-2.jpg)

To move data between regions, the process is similar: create a snapshot of the EBS volume in the original region, copy it to an S3 bucket in the target region, and then generate a new volume from that snapshot.

![The image illustrates the process of creating and copying an Elastic Block Storage (EBS) volume snapshot across two regions. It shows the steps of taking a volume snapshot in Region 1 and creating a volume from the snapshot in Region 2.](https://kodekloud.com/kk-media/image/upload/v1752859636/notes-assets/images/AWS-Certified-Developer-Associate-EBS/ebs-volume-snapshot-process.jpg)

## EBS Volume Types

Amazon EBS offers a variety of volume types to balance performance, reliability, and cost-efficiency. These volume types are broadly categorized by their backing storage technology and specific performance capabilities.

### SSD-Based Volumes

1.  **General Purpose SSD (GP2 and GP3):**
    - These volumes are backed by solid state drives (SSDs) and provide a balanced mix of price and performance, making them suitable for a wide range of transactional workloads. These include virtual desktops, medium-sized databases, latency-sensitive interactive applications, and development or test environments.
    - **GP3** offers improved cost efficiency by being approximately 20% lower in price per gigabyte compared to GP2 while allowing independent scaling of performance relative to the volume size.
    - **GP2** remains the default choice for many EC2 instances, with performance that scales with the volume size.

2.  **Provisioned IOPS SSD:**
    - Designed for critical, high I/O workloads, these volumes provide low latency and high throughput, making them ideal for database operations where consistent performance is crucial.  
      The available variants include:
    - **IO1**
    - **IO2**
    - **IO2 Block Express**

    > [!important]
    > **Performance Comparison**
    >
    > IO2 provides enhanced durability (99.999% compared to IO1's 99.8%–99.9%). IO2 Block Express further supports larger volume sizes (up to 64 TB vs. 16 TB) and offers significantly higher IOPS and throughput, making it suitable for workloads requiring sub-millisecond latency.

![The image is a table comparing different types of SSD volumes, detailing their durability, use cases, volume size, IOPS, throughput, and support for Amazon EBS Multi-attach and boot volumes.](https://kodekloud.com/kk-media/image/upload/v1752859638/notes-assets/images/AWS-Certified-Developer-Associate-EBS/ssd-volumes-comparison-table.jpg)

### HDD-Based Volumes

For workloads that require cost-effective storage with moderate performance, AWS provides HDD-based volumes:

1.  **Throughput Optimized HDD (st1):**
    - Optimized for frequently accessed data and throughput-intensive workloads, these volumes offer higher IOPS and throughput compared to cold HDD volumes. They are well-suited for big data applications, data warehouses, and log processing.

2.  **Cold HDD (sc1):**
    - Intended for infrequently accessed data, cold HDD volumes emphasize cost savings over performance while still providing reliable storage.

![The image is a table comparing Throughput Optimized HDD volumes and Cold HDD volumes, detailing aspects like volume type, durability, use cases, volume size, IOPS, throughput, and support for Amazon EBS Multi-attach and boot volume.](https://kodekloud.com/kk-media/image/upload/v1752859639/notes-assets/images/AWS-Certified-Developer-Associate-EBS/throughput-vs-cold-hdd-comparison.jpg)

### Magnetic Volumes

Magnetic volumes represent an earlier generation of storage technology using magnetic drives. They are best suited for small, infrequently accessed data sets where high performance is not a primary concern. Typically, magnetic volumes deliver around 100 IOPS on average with burst capabilities that may only reach a few hundred IOPS, and they support volume sizes ranging from 1 GB to 1 TB.

![The image is a table describing the specifications of magnetic volumes, including volume type, use cases, volume size, max IOPS, max throughput, and boot volume support.](https://kodekloud.com/kk-media/image/upload/v1752859640/notes-assets/images/AWS-Certified-Developer-Associate-EBS/magnetic-volumes-specifications-table.jpg)

## EBS Pricing

Amazon EBS employs a pay-as-you-go pricing model, charging on a per gigabyte, per month basis. The cost per gigabyte varies by volume type, with faster, high IOPS volumes carrying a premium. Additionally, EBS snapshots incur charges per gigabyte per month. It is important to note that snapshots are full snapshots (not incremental), meaning the billing is based on the entire size of the snapshot data.

![The image is a slide about EBS pricing, showing a gradient-filled rectangle and text indicating costs are based on "Per GB per Month" and "Faster IOPS more Cost."](https://kodekloud.com/kk-media/image/upload/v1752859641/notes-assets/images/AWS-Certified-Developer-Associate-EBS/ebs-pricing-costs-slide.jpg)

## Summary

Block storage divides data into individual blocks, each uniquely identified, and can present these blocks as a mountable file system or a bootable device. AWS Elastic Block Store (EBS) leverages this principle to provide block-level storage volumes for EC2 instances, with volumes being provisioned within a single availability zone. To move data between availability zones, you can create a snapshot of the EBS volume and generate a new volume in the target zone. AWS offers multiple EBS volume types to optimize performance and cost based on your workload’s needs, with pricing determined by the storage you provision.

![The image is a summary slide about EBS (Elastic Block Store), highlighting provisioning in availability zones, data copying via snapshots, and different volume types for storage needs.](https://kodekloud.com/kk-media/image/upload/v1752859642/notes-assets/images/AWS-Certified-Developer-Associate-EBS/ebs-summary-provisioning-snapshots.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/e8ae2293-e16b-42d3-b32b-5c260a1f1e5d/lesson/6a79a469-ddb4-4dbf-980c-ef924d9bbf8e)**
>
> Watch video content
