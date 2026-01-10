# EBS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Storage/EBS)

---

## Table of Contents

- EBS
  - What is AWS Elastic Block Store (EBS)?
  - EBS Volume Types
  - EBS Pricing
  - Summary
  - Watch Video
    - EBS Operation Workflow
    - 1. General Purpose SSD (gp2 and gp3)
    - 2. Provisioned IOPS SSD (io1, io2, and io2 Block Express)
    - 3. Hard Disk Drive (HDD) Volumes
    - 4. Magnetic Volumes

---

## Content

AWS Solutions Architect Associate Certification

Services Storage

# EBS

In this article, we explore AWS Elastic Block Store (EBS) and the fundamentals of block storage. Block storage divides data into separate blocks, each uniquely identified and distributed across multiple physical devices. These blocks can be presented to an operating system as a volume, allowing you to create a file system on top of it. Alternatively, the block device can be bootable, enabling you to install an operating system directly on it. This flexibility—being both mountable and bootable—is especially crucial for the Solutions Architect exam.

The diagram below illustrates a block storage system where data blocks are spread across two storage units and managed by a computer interface:

![The image illustrates a block storage system, showing data blocks distributed across two storage units with a computer interface managing the blocks.](https://kodekloud.com/kk-media/image/upload/v1752865968/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EBS/block-storage-system-data-distribution.jpg)

---

## What is AWS Elastic Block Store (EBS)?

Amazon EBS is a block-level storage service designed specifically for EC2 instances. When attached to an EC2 instance, these volumes appear as block storage devices. You can format these volumes with file systems such as XFS, ext3, or ext4.

> [!important]
> **Key Advantage**
>
> An important benefit of EBS is its independence from EC2 instances. You can detach an EBS volume from one instance and reattach it to another without data loss. Note that while most EBS volumes attach to only one EC2 instance, some volume types support multi-attach. If using multi-attach, ensure that your application effectively manages simultaneous writes to prevent data corruption.

EBS volumes are provisioned within a single availability zone (AZ), ensuring built-in redundancy within that zone. If one physical device fails, the volume remains operational. However, if the entire AZ experiences an outage, the data on the volume can be lost. This means that an EC2 instance and its attached EBS volume must reside in the same AZ.

### EBS Operation Workflow

Imagine deploying EBS in multiple availability zones:

1.  **Create an EBS Volume:** Provision your volume within the desired AZ.
2.  **Attach to an EC2 Instance:** The volume is then presented as a block device.
3.  **Data Migration within the Same AZ:** Detach the volume from one instance and attach it to another within the same AZ if needed.

For migrating data across AZs, you can use snapshots. Taking a snapshot creates an image of your volume stored in Amazon S3. You can then use this snapshot to create a new volume in a different AZ and attach it to an EC2 instance, effectively copying your data from one zone to another.

The following diagram shows the architecture of EBS within a region, including two availability zones, EBS volumes, and EC2 instances. It also demonstrates the process of creating a volume from a snapshot:

![The image illustrates the architecture of Elastic Block Storage (EBS) within a region, showing two availability zones with EBS volumes, instances, and the process of creating a volume from a snapshot.](https://kodekloud.com/kk-media/image/upload/v1752865970/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EBS/elastic-block-storage-architecture-diagram.jpg)

For data migration between regions, the process is analogous:

- Take a snapshot (stored in an S3 bucket in the source region).
- Copy the snapshot to an S3 bucket in the destination region.
- Create a new volume from the copied snapshot and attach it to an EC2 instance.

The next diagram depicts the process of copying an EBS snapshot from one region to another and creating a volume from that snapshot:

![The image illustrates the process of copying an Elastic Block Storage (EBS) snapshot from one region to another and creating a volume from the snapshot in the new region.](https://kodekloud.com/kk-media/image/upload/v1752865972/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EBS/ebs-snapshot-copy-process-diagram.jpg)

---

## EBS Volume Types

Amazon EBS offers various volume types designed to satisfy differing performance and cost requirements. Below is an overview of each:

### 1\. General Purpose SSD (gp2 and gp3)

- **General Purpose SSD Volumes:**  
  Backed by solid state drives (SSDs), these volumes deliver a balanced price/performance ratio ideal for a wide range of workloads such as virtual desktops, medium-sized databases, and interactive applications.
  - **GP3:** Offers predictable performance with independently scalable IOPS from capacity at a 20% lower price per gigabyte compared to GP2.
  - **GP2:** The default volume type where performance scales with the volume size.

### 2\. Provisioned IOPS SSD (io1, io2, and io2 Block Express)

- **High-Performance SSD Volumes:**  
  Designed for I/O-intensive and low-latency workloads.
  - **IO1/IO2:** Both offer high performance, with IO2 delivering higher durability (99.999% compared to approximately 99.8%–99.9% for IO1).
  - **IO2 Block Express:** Supports extreme workloads with maximum volume sizes up to 64 TB, IOPS up to 256,000, and throughput up to 4000 MB/s.

The image below summarizes the specifications of different SSD volume types, including durability, volume limits, IOPS, throughput, and features like multi-attach support and boot volume compatibility:

![The image is a table comparing different types of SSD volumes, detailing their durability, use cases, volume size, IOPS, throughput, and support for Amazon EBS Multi-attach and boot volumes.](https://kodekloud.com/kk-media/image/upload/v1752865972/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EBS/ssd-volumes-comparison-table.jpg)

### 3\. Hard Disk Drive (HDD) Volumes

- **HDD-Based Volumes:**  
  Suitable for less frequently accessed data, HDD volumes are available in two types:
  - **Throughput Optimized HDD (st1):** Tailored for throughput-intensive workloads with frequently accessed large datasets.
  - **Cold HDD (sc1):** Designed for infrequently accessed data where lower storage cost is a priority.

The diagram below compares throughput optimized HDDs and cold HDDs, highlighting performance and cost differences:

![The image is a table comparing throughput optimized and cold HDD volumes, detailing aspects like volume type, durability, use cases, volume size, IOPS, and throughput. It highlights differences in performance and cost considerations for storage solutions.](https://kodekloud.com/kk-media/image/upload/v1752865973/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EBS/throughput-optimized-cold-hdd-comparison.jpg)

### 4\. Magnetic Volumes

- **Previous Generation Magnetic Volumes:**  
  Ideal for workloads with small, infrequently accessed datasets where high performance is not essential. Typically, these volumes deliver around 100 IOPS on average, with burst capabilities to a few hundred IOPS, and range in size from 1 GB to 1 TB.

The table below (depicted in the image) details the specifications of magnetic volumes:

![The image is a table describing the specifications of previous generation magnetic volumes, including volume type, use cases, volume size, IOPS, throughput, and boot volume support.](https://kodekloud.com/kk-media/image/upload/v1752865974/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EBS/magnetic-volumes-specifications-table.jpg)

---

## EBS Pricing

With EBS, you only pay for the storage you provision. Pricing is charged on a per-gigabyte, per-month basis, varying by the selected volume type—meaning that higher performance volumes are priced at a premium. Similarly, EBS snapshots are billed per gigabyte per month. Note that snapshots are full copies of the volumes (stored in Amazon S3), not incremental backups.

---

## Summary

Block storage divides data into distinct blocks that are uniquely identified, enabling them to be aggregated into volumes that an operating system can use both as storage and as a boot device. AWS Elastic Block Store (EBS) provides robust block-level storage for EC2 instances, ensuring that volumes are provisioned within a specific availability zone. To migrate data between zones or regions, you can create snapshots and build new volumes from them. With a range of volume types available, EBS allows you to optimize performance and cost based on your specific needs.

The summary diagram below encapsulates the key block storage concepts, including how data is divided into blocks, presented as volumes, and managed with snapshots for data migration:

![The image is a summary of block storage concepts, explaining how data is broken into blocks, presented as volumes, and used with EC2 instances. It includes four key points with numbered icons.](https://kodekloud.com/kk-media/image/upload/v1752865975/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EBS/block-storage-concepts-summary.jpg)

Additionally, the final diagram summarizes the essential features of EBS volumes—from provisioning in availability zones to snapshot-based data migration and the diversity of volume types offered:

![The image is a summary slide with points about EBS volumes, including provisioning in availability zones, copying data using snapshots, and offering different volume types for storage needs.](https://kodekloud.com/kk-media/image/upload/v1752865976/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EBS/ebs-volumes-summary-slide.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/23e00d1f-6422-4fef-a9bf-e8f007be5514/lesson/de0c9c4d-ea8b-4f66-8c3b-4d8da957d6e8)**
>
> Watch video content
