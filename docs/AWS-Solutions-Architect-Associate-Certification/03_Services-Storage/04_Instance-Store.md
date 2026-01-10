# Instance Store - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Storage/Instance-Store)

---

## Table of Contents

- Instance Store
  - What Is an Instance Store?
  - How Instance Stores Work
  - Use Cases and Limitations
  - Summary
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Storage

# Instance Store

In this article, we discuss the concept of instance stores and their relationship to EC2 instances. Instance stores offer temporary block-level storage directly attached to the host that runs your EC2 instance, making them ideal for scratch data or rapidly changing temporary datasets.

## What Is an Instance Store?

Instance stores provide **temporary storage** that is physically attached to the host machine. Unlike EBS volumes—which reside on separate machines and are accessed via protocols like iSCSI—instance stores enable your EC2 instance to access a local physical drive directly on the host. Their temporary nature means that the stored data is lost if the instance is moved to a different host.

![The image is a diagram titled "Instance Store Volumes," showing four block storage options, with "Block Storage 02" connected to "Instance Storage" via an arrow.](https://kodekloud.com/kk-media/image/upload/v1752865996/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Instance-Store/instance-store-volumes-diagram.jpg)

## How Instance Stores Work

Consider a scenario where multiple EC2 instances run on the same host machine. When an EC2 instance utilizes an instance store:

- The instance directly accesses a physical drive on that host.
- Provided the instance remains on the same host, even after a reboot, it retains access to its instance store data.

However, when an instance is shut down and later restarted on a different host, it loses access to the original instance store and all associated data because the new host has a different storage configuration.

![The image illustrates an instance storage architecture with two hosts, each containing a processor and connected instance stores. Host 1 has two instance stores, while Host 2 has one.](https://kodekloud.com/kk-media/image/upload/v1752865998/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Instance-Store/instance-storage-architecture-hosts.jpg)

> [!important]
> **Warning**
>
> Moving an EC2 instance to a different host results in the loss of any data stored on the original instance store. Use instance stores only for data that can be safely discarded.

## Use Cases and Limitations

Instance stores are best suited for applications where temporary data storage is acceptable and data persistence is not required. Common use cases include:

- Caching
- Buffering
- Temporary file storage

When designing systems, keep in mind that instance stores are not reliable for storing persistent data, as data loss will occur if the instance is migrated.

> [!important]
> **Note**
>
> For persistent data storage, consider using Amazon EBS volumes, which offer durability and the ability to retain data independently of the EC2 instance lifecycle.

## Summary

To summarize:

- Instance stores provide **block-level, temporary storage** for EC2 instances.
- Data on an instance store is lost if the instance migrates to a different host.
- They are ideal for transient data such as caches or scratch files, but not for persistent storage.

![The image is a summary slide with two points: instance stores should be used for temporary data, and moving an EC2 instance will result in data loss from the original instance store.](https://kodekloud.com/kk-media/image/upload/v1752865998/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Instance-Store/ec2-instance-stores-summary-slide.jpg)

By understanding the inherent limitations and ideal use cases for instance stores, you can better architect your cloud infrastructure to maximize performance and efficiency while safeguarding critical data.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/23e00d1f-6422-4fef-a9bf-e8f007be5514/lesson/fe2435cc-aee8-4000-ae67-91479f39fa7e)**
>
> Watch video content
