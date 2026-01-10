# Instance Store - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Storage/Instance-Store)

---

## Table of Contents

- Instance Store
  - How Instance Storage Works
  - When to Use Instance Storage
  - Summary
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Storage

# Instance Store

In this lesson, we explore the benefits and limitations of instance storage, a form of temporary block-level storage available for EC2 instances. Unlike Elastic Block Store (EBS) volumes that leverage network protocols such as iSCSI and store data on separate machines, instance storage is physically attached to the host computer running your EC2 instance.

> [!important]
> **Key Point**
>
> Instance storage is best suited for temporary data or frequently changing data, such as cache files and scratch data.

## How Instance Storage Works

Different EC2 instance types may include instance stores, which are directly linked to the host's physical disks. When an instance is rebooted on the same physical host, it continues to access the same instance store. However, if the EC2 instance migrates to a different host, the associated instance store changes, and any data stored on the previous host will be lost.

Consider the following architecture:

- Multiple EC2 instances run on a single host machine.
- Each instance has its own attached instance store that is physically integrated with the host.
- If an instance is restarted on a new host, it receives a new instance store that does not contain the data from the former host.

![The image illustrates an instance storage architecture with two hosts, each containing a processor and connected to instance stores. Host 1 has two instance stores, while Host 2 has one.](https://kodekloud.com/kk-media/image/upload/v1752859676/notes-assets/images/AWS-Certified-Developer-Associate-Instance-Store/instance-storage-architecture-hosts.jpg)

> [!important]
> **Caution**
>
> When an EC2 instance is moved to a different physical host (for example, during a shutdown and restart), the data on the original instance store is lost. Always ensure that critical data is stored in persistent storage solutions, not in instance stores.

## When to Use Instance Storage

Use instance storage only for data that is temporary or can be regenerated. Its advantages include:

- Low-latency access due to direct attachment.
- Ideal usage for scratch data, caches, and ephemeral data storage.

**Important:** If an EC2 instance is restarted on a different host, the previously stored data will not be available in the new instance store.

![The image is a summary slide highlighting two points: instance stores should be used for temporary data, and moving an EC2 instance will result in data loss from the original instance store.](https://kodekloud.com/kk-media/image/upload/v1752859677/notes-assets/images/AWS-Certified-Developer-Associate-Instance-Store/instance-stores-temporary-data-summary.jpg)

## Summary

Instance storage provides fast, block-level storage directly attached to the host machine, making it suitable for temporary or transient data. However, because this storage is tied to the physical host, any migration of an EC2 instance to a new host will lead to data loss from the old instance store.

For more details on managing EC2 storage options, check out the [AWS Documentation](https://aws.amazon.com/documentation/ec2/).

Remember: Only use instance storage for data you can afford to lose, and always make regular backups of any critical information.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/e8ae2293-e16b-42d3-b32b-5c260a1f1e5d/lesson/147e09ab-8b3d-4cbd-9870-f437fee1c95a)**
>
> Watch video content
