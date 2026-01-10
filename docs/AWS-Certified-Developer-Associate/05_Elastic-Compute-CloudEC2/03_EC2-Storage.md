# EC2 Storage - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Elastic-Compute-CloudEC2/EC2-Storage)

---

## Table of Contents

- EC2 Storage
  - Instance Store
  - Elastic Block Store (EBS)
  - Elastic File System (EFS)
  - Storage Options Comparison
  - Summary
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Elastic Compute CloudEC2

# EC2 Storage

In this article, we explore various storage options available for EC2 instances, including Instance Store, Elastic Block Store (EBS), and Elastic File System (EFS). We discuss the use cases, characteristics, and benefits of each solution to help you choose the most appropriate persistent storage for your application needs.

---

## Instance Store

Instance Store provides ephemeral storage that is directly hosted on the physical hardware supporting your EC2 instances. It is ideal for storing temporary data where high I/O performance is critical. However, keep in mind that data stored using Instance Store is lost if the instance is stopped, terminated, or migrated to another physical server.

Key advantages of Instance Store include:

- Data is stored on the physical host, ensuring high performance and low latency.
- It is suited for temporary storage scenarios where speed is paramount.
- If an instance is shut down, terminated, or moved, the data will not persist.
- Storage media may vary (SSD or HDD) based on the instance type selected.
- Many instance types offer Instance Store volumes at no additional cost beyond the EC2 instance fee.

![The image is a graphic titled "Instance Store" with five sections: Performance, Ephemerality, Storage Media Types, Capacity and Types, and No Additional Cost. Each section is represented with an icon and a number.](https://kodekloud.com/kk-media/image/upload/v1752858888/notes-assets/images/AWS-Certified-Developer-Associate-EC2-Storage/instance-store-performance-graphic.jpg)

> [!important]
> **Note**
>
> Instance Store is best used for scratch data or caching where data persistence is not required.

---

## Elastic Block Store (EBS)

Elastic Block Store (EBS) offers scalable, persistent block storage designed for EC2 instances. It is an excellent choice for storing operating systems, databases, and critical applications that require reliable storage.

Notable features of EBS include:

- Ability to attach EBS volumes to EC2 instances, including using them as boot volumes.
- EBS snapshots provide point-in-time backups that incrementally save your data in Amazon S3, capturing the entire state of the volume.
- Persistent volumes remain intact even when the associated EC2 instance is terminated, and can be reattached to new instances.
- Consistent, low-latency performance supports various volume types optimized for either throughput or IOPS.
- Volumes can be resized dynamically, allowing adjustments as your application demands evolve.
- Automatic replication within the Availability Zone ensures high durability and protection against hardware failures.

![The image illustrates an AWS architecture diagram showing EC2 instances with EBS volumes within a VPC, across two availability zones, and EBS snapshots.](https://kodekloud.com/kk-media/image/upload/v1752858890/notes-assets/images/AWS-Certified-Developer-Associate-EC2-Storage/aws-architecture-ec2-ebs-vpc.jpg)

---

## Elastic File System (EFS)

Amazon Elastic File System (EFS) is a managed, cloud-based file storage service that provides scalable and elastic NFS storage for your AWS services and on-premise resources. EFS is particularly beneficial for applications that require a shared file system accessible by multiple EC2 instances concurrently.

Key characteristics of EFS include:

- Easy mounting of a remote file system over the network from various EC2 instances simultaneously.
- Simplified deployment and maintenance of file storage infrastructure, as the service automatically scales to meet your needs.
- Pay-as-you-go pricing ensures that you only pay for the storage you consume.
- Automatic scaling adjusts storage capacity as data is added or removed, accommodating workloads from small datasets to petabyte-scale storage.
- Designed to deliver high durability and availability through multi-AZ replication.
- Supports NFS version 4, allowing multiple instances to access and operate on the same file system concurrently.

![The image is a diagram illustrating an Amazon EFS (Elastic File System) setup within a VPC (Virtual Private Cloud), showing instances in two availability zones connected to mount targets.](https://kodekloud.com/kk-media/image/upload/v1752858891/notes-assets/images/AWS-Certified-Developer-Associate-EC2-Storage/amazon-efs-vpc-setup-diagram.jpg)

Additionally, the following diagram highlights the key features of EFS:

![The image lists five features of EFS: Simplicity, Cost-Effectiveness, Scalability, Availability and Durability, and Accessibility, each represented with an icon.](https://kodekloud.com/kk-media/image/upload/v1752858892/notes-assets/images/AWS-Certified-Developer-Associate-EC2-Storage/efs-features-simplicity-cost-effectiveness-scalability.jpg)

---

## Storage Options Comparison

Below is a summary comparing the three primary EC2 storage options:

| Feature               | Instance Store                                | Elastic Block Store (EBS)                                                  | Elastic File System (EFS)                                    |
| --------------------- | --------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Storage Type          | Ephemeral                                     | Persistent block storage                                                   | Managed NFS file storage                                     |
| Data Persistence      | Data is lost on stop/termination              | Data persists even if the instance is terminated                           | Data persists with multi-AZ replication                      |
| Performance           | High performance with low latency             | Consistent low-latency with configurable IOPS or throughput options        | Appropriate for file storage with elastic scalability        |
| Use Cases             | Temporary data, caching, high I/O tasks       | Boot volumes, databases, applications needing reliable, persistent storage | Shared file system for multiple instances                    |
| Flexibility & Scaling | Fixed capacity tied to instance type          | Can be dynamically resized and supports snapshot backups                   | Automatically scales up and down based on the storage demand |
| Cost Considerations   | Included with your EC2 instance cost (varies) | Charged based on provisioned capacity and IOPS                             | Pay-as-you-go pricing model                                  |

![The image is a comparison table of three storage options: Instance Store, EBS, and EFS, detailing features like storage type, data persistence, performance, durability, scalability, cost, and backup.](https://kodekloud.com/kk-media/image/upload/v1752858894/notes-assets/images/AWS-Certified-Developer-Associate-EC2-Storage/storage-options-comparison-table.jpg)

---

## Summary

In summary, choose Instance Store for high-performance temporary storage needs, use EBS for persistent block storage requirements including boot volumes and database applications, and opt for EFS when you need a scalable and accessible file system across multiple instances. This overview should help you make an informed decision when selecting the optimal storage solution for your EC2 workloads.

For further information on EC2 and related AWS services, be sure to explore additional resources from the [AWS Documentation](https://aws.amazon.com/documentation/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/538040df-b323-4fd1-ad80-f5c22725c345/lesson/3b940ab7-fbd3-41dc-b1e0-582e5542bab4)**
>
> Watch video content
