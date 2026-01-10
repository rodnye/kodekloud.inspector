# Turning up Security on Storage Services Part 1 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Designing-for-Security/Turning-up-Security-on-Storage-Services-Part-1)

---

## Table of Contents

- Turning up Security on Storage Services Part 1
  - Block Storage Overview
  - EBS Volume Encryption
  - Examining EBS Snapshot Encryption
  - Instance Storage and Its Limitations
  - File and Network Storage
  - Conclusion
  - Watch Video
    - Amazon Elastic File System (EFS)
    - FSx for Windows
    - FSx for Lustre
    - FSx for OpenZFS
    - FSx for NetApp ONTAP
      - EFS and Video Editing Workloads
      - Amazon EFS Infrequent Access (EFS IA)

---

## Content

AWS Solutions Architect Associate Certification

Designing for Security

# Turning up Security on Storage Services Part 1

Welcome, future solutions architects! In this article presented by Michael Forrester, we dive into designing secure storage services—starting with block storage. This guide is structured to provide detailed explanations supported by high-level diagrams and real-world scenarios.

---

## Block Storage Overview

Block storage is considered the fundamental type of storage, functioning similarly to a hard drive. In this section, we begin our discussion with Amazon Elastic Block Store (EBS), which is detailed in the second section of this nine-part series.

The diagram below offers a high-level visualization of block storage services operating across AWS regions. An EBS volume located within an Availability Zone (AZ) is depicted along with its snapshot stored in S3. Remember that this volume represents a virtual disk attached to an EC2 instance within the same AZ, although certain storage types can attach to two instances in the same zone.

AWS provides four flavors of EBS volumes:

- Two magnetic hard drive variants (commonly known as “cold” and “throughput” optimized).
- Two SSD-based options (general purpose and provisioned IOPS, available as GP2 and GP3).

There are also specialized options like Block I/O Express that deliver extremely high performance.

Security for storage in AWS is primarily managed by the platform, with encryption being the critical setting to enable. While some storage systems come with encryption activated by default, others—such as EBS volumes and EFS file systems—require you to turn on encryption. Notably, FSx (for Windows or ZFS) has encryption enabled by default.

For this discussion, our focus is mostly on EBS volumes (with additional coverage on instance storage and EFS). Recall that block storage attaches as a disk to an EC2 instance.

The diagram below summarizes key relationships among EBS volumes, their snapshots stored in S3, EFS file systems for shared access, backups handled via AWS Backup, and connections with RDS transactional storage plus cross-region backup capabilities.

![The image is a diagram of an AWS cloud architecture, showing components like VPC, EBS, S3, and AWS Backup across two regions with availability zones. It illustrates data flow and backup processes within the cloud infrastructure.](https://kodekloud.com/kk-media/image/upload/v1752864534/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Storage-Services-Part-1/aws-cloud-architecture-diagram.jpg)

---

## EBS Volume Encryption

Consider a leading e-commerce company migrating its database to an EC2 instance. With sensitive customer information at stake, the database must remain encrypted at rest. The company evaluates four approaches for securing its data on EBS:

1.  **Create an EBS volume and manually encrypt it.**

    > [!important]
    > **Not Recommended**
    >
    > Manual encryption is not feasible because AWS does not offer a “manual encryption” feature for EBS volumes.

2.  **Create an EBS volume with encryption enabled from the start.**

    > [!important]
    > **Recommended Approach**
    >
    > By enabling encryption during volume creation, you ensure that both the volume and its snapshots are encrypted. AWS Key Management Service (KMS) can be used with the default key or a customer-managed key. Data transfer between the volume and the instance is also automatically encrypted.

3.  **Create an EBS volume and enable encryption after data has been written.**  
    Encryption settings cannot be applied retroactively on an existing unencrypted volume.
4.  **Store the data on an unencrypted volume and use an encrypted AMI for the EC2 instance.**  
    This method only secures the operating system image without encrypting the data disk itself.

The best practice is option 2—enabling encryption when the volume is created secures data at rest as well as any snapshots generated later.

Below is a screenshot from the AWS console. Notice the checkbox for encryption and the section displaying the master key for a GP2 volume.

![The image shows a form for creating a volume in a cloud service, with options for volume type, size, IOPS, availability zone, and encryption settings. The encryption section is highlighted, indicating the selection of a master key for encrypting the volume.](https://kodekloud.com/kk-media/image/upload/v1752864535/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Storage-Services-Part-1/cloud-volume-creation-form-encryption.jpg)

---

## Examining EBS Snapshot Encryption

Imagine a global financial institution that uses EC2 instances with attached EBS volumes for transaction processing. With a strict data retention policy that includes regular snapshots, the institution must ensure that even snapshots of unencrypted EBS volumes are secure.

The solution is to specify a KMS key during the snapshot creation process. This guarantees that, even if the source volume is unencrypted, the generated snapshot will be encrypted—securing data at rest.

With AWS managing data in transit between the instance and its volume automatically, leveraging native encryption is the simplest and most secure option.

![The image presents a scenario involving a global financial institution using Amazon EC2 instances with EBS volumes, seeking to ensure all snapshots are encrypted. It lists four approaches to achieve encryption of EBS volume snapshots.](https://kodekloud.com/kk-media/image/upload/v1752864536/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Storage-Services-Part-1/amazon-ec2-ebs-snapshot-encryption.jpg)

---

## Instance Storage and Its Limitations

EC2 instance storage provides local storage that is directly attached to the physical host running your EC2 instance. However, keep in mind that if the instance is moved—say, due to a host failure—the data stored on instance storage is lost. This ephemeral nature means instance storage is best suited for scratch or temporary data.

There are no AWS-managed controls for enabling encryption or long-term persistence on instance storage. If encryption is required, it must be managed at the client level. Without built-in replication across multiple instances, instance store volumes should not be used for critical data.

For example, a gaming company using instance store volumes for high-speed, real-time processing must understand that data can vanish if the instance is stopped, terminated, or encounters a failure.

In summary, while instance store volumes offer high IOPS and low latency, they lack persistence and AWS security controls such as built-in encryption.

![The image presents a scenario about a gaming company considering EC2 instance store volumes for real-time processing, with four statements regarding data persistence and durability.](https://kodekloud.com/kk-media/image/upload/v1752864538/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Storage-Services-Part-1/gaming-company-ec2-instance-store.jpg)

---

## File and Network Storage

Transitioning from block storage, this section covers file and network storage. Despite operating like disks, these storage types work over a network.

### Amazon Elastic File System (EFS)

Amazon EFS offers a shared file system that spans an entire AWS region—unlike EBS volumes, which by default are confined to a single Availability Zone (unless additional steps are taken). EFS supports concurrent access from multiple EC2 instances, very similar to a traditional NFS setup.

The diagram below shows an EFS file system mounted by multiple instances, which illustrates its capability as shared storage across several Availability Zones.

![The image is a diagram of an AWS cloud architecture, showing components like VPC, EBS, S3, and AWS Backup across two regions with connections for storage and backup processes.](https://kodekloud.com/kk-media/image/upload/v1752864539/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Storage-Services-Part-1/aws-cloud-architecture-diagram-2.jpg)

#### EFS and Video Editing Workloads

Consider a media production company evaluating EFS for video editing:

- EFS does not provide block-level storage—it functions as a network file system.
- It is a regional service with automatic replication across multiple AZs for high availability.
- It supports NFS (versions 4.2/4.3) and is engineered for low-latency access, ideal for intensive operations.
- It is not intended for cold data storage by default, though multiple storage classes (including one for infrequent access) are available.

The correct understanding here is that EFS’s regional nature with built-in replication makes it ideal for such workloads.

![The image presents a scenario where a media production company is considering using Amazon EFS for video editing workloads, with four statements evaluating its suitability.](https://kodekloud.com/kk-media/image/upload/v1752864540/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Storage-Services-Part-1/amazon-efs-video-editing-evaluation.jpg)

#### Amazon EFS Infrequent Access (EFS IA)

For organizations needing to store large datasets that are infrequently accessed yet require optimal performance, EFS IA is a cost-effective solution. It acts as a storage class within the same file system, automatically managing synchronization between standard storage and the infrequent access tier.

Key benefits of EFS IA include:

- No need to manually synchronize data between storage tiers.
- Cost savings on files that are accessed less frequently.
- Consistent performance compared to the standard EFS tier.
- Encryption must be enabled at creation time if required.

Option 3 correctly highlights that EFS IA delivers a lower-cost storage class without compromising performance.

![The image describes considerations for using Amazon EFS Infrequent Access (EFS IA) for storing large datasets, highlighting cost optimization and performance needs. It lists four statements about EFS IA's functionality and requirements.](https://kodekloud.com/kk-media/image/upload/v1752864541/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Storage-Services-Part-1/amazon-efs-ia-considerations-dataset.jpg)

> [!important]
> **Encryption Reminder**
>
> Remember, EFS does not encrypt file systems by default. If encryption is needed, it must be enabled during the setup. For existing unencrypted file systems, migrating data to a new, encrypted file system is required.

---

### FSx for Windows

FSx for Windows File Server is tailored for Windows-based applications and supports native Microsoft Windows file systems. Key features include:

- Encryption for both data at rest and in transit is enabled by default.
- Native integration with AWS Managed Microsoft AD for streamlined identity and access management.
- Secure configuration out of the box, minimizing the need for additional security controls.

For instance, a multinational corporation migrating on-premise Windows applications to AWS would benefit from a managed, secure Windows file system integrated with Active Directory.

![The image presents a scenario about a corporation migrating to AWS, considering Amazon FSx for Windows File Server, and lists four statements regarding its security features and considerations.](https://kodekloud.com/kk-media/image/upload/v1752864543/notes-assetshttps://kodekloud.com/kk-media/image/upload/v1752864543/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Storage-Services-Part-1/aws-migration-amazon-fsx-security.jpg)

---

### FSx for Lustre

FSx for Lustre is engineered for high-performance computing and large-scale data processing—ideal for research simulations or data analytics tasks. It can seamlessly integrate with S3, enabling rapid data ingestion, a feature utilized by services like Amazon Redshift for pulling S3 objects.

For research institutions needing both top-tier performance and robust security, FSx for Lustre offers:

- Automatic encryption of data at rest with an option for customer-managed keys.

![The image presents a scenario about a research institution considering Amazon FSx for Lustre for data storage, with a question about its security features and four possible statements.](https://kodekloud.com/kk-media/image/upload/v1752864543/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Storage-Services-Part-1/amazon-fsx-lustre-security-research.jpg)

![The image presents a scenario about a research institution considering Amazon FSx for Lustre for data storage, with a question about its security features. Four statements are provided as options to describe the security features accurately.](https://kodekloud.com/kk-media/image/upload/v1752864545/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Storage-Services-Part-1/amazon-fsx-lustre-security-options.jpg)

---

### FSx for OpenZFS

Amazon FSx for OpenZFS leverages the proven capabilities of the OpenZFS file system, originally developed for Sun Solaris. It offers advanced file system features such as:

- Encryption both at rest and in transit.
- Seamless integration with Amazon VPC for robust access control.

This makes FSx for OpenZFS an excellent choice for multinational corporations requiring stringent security measures during migrations.

![The image presents a scenario about a corporation planning to migrate to Amazon FSx for OpenZFS, with a focus on security features like encryption and VPC integration, followed by four statements to choose from.](https://kodekloud.com/kk-media/image/upload/v1752864546/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Storage-Services-Part-1/amazon-fsx-openzfs-migration-security.jpg)

---

### FSx for NetApp ONTAP

FSx for NetApp ONTAP is a managed file system built for shared storage with advanced features, including:

- Data deduplication and compression.
- Default encryption for data at rest and in transit.
- Support for multi-protocol access such as NFS, SMB, and iSCSI.

These capabilities make FSx for NetApp ONTAP particularly attractive for sensitive industries like healthcare, where managing patient data securely is paramount.

![The image presents a scenario about a healthcare provider considering migrating their file storage solution to FSx for NetApp ONTAP, listing four statements regarding its security features and considerations.](https://kodekloud.com/kk-media/image/upload/v1752864543/notes-assetshttps://kodekloud.com/kk-media/image/upload/v1752864543/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Storage-Services-Part-1/aws-migration-amazon-fsx-security.jpg)

---

## Conclusion

This article explored critical aspects of securing storage services in AWS, covering:

- Encryption best practices for EBS volumes and snapshots.
- The ephemeral nature and limitations of instance storage.
- Shared file system capabilities and cost management with EFS.
- Specialized managed file systems including FSx for Windows, FSx for Lustre, FSx for OpenZFS, and FSx for NetApp ONTAP.

In upcoming articles, we will further examine security services, performance tuning, and advanced cost-management strategies for these storage solutions.

Happy architecting!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/fcdcac66-6274-4b2f-912a-d6e9de511e5a/lesson/173777a4-bb93-4471-8f1b-0db0f3409be3)**
>
> Watch video content
