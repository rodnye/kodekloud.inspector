# Turning up Reliability on Storage Services - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Designing-for-Reliability/Turning-up-Reliability-on-Storage-Services)

---

## Table of Contents

- Turning up Reliability on Storage Services
  - Block Storage
  - File and Network Storage
  - Object Storage: Amazon S3
  - Backup, Disaster Recovery, and Redundancy
  - Elastic Disaster Recovery (EDR)
  - Storage Gateway
  - Final Thoughts
  - Watch Video
  - Practice Lab
    - EBS Volumes
    - Instance Store
    - Amazon EFS
    - FSx Services
    - Amazon ONTAP

---

## Content

AWS Solutions Architect Associate Certification

Designing for Reliability

# Turning up Reliability on Storage Services

Future Solutions Architects,

In this lesson, we explore how to enhance reliability in AWS storage services. Although AWS inherently provides a high level of reliability, implementing best practices and configurations can further improve availability and resiliency. These enhancements are particularly important for the Associate-level exam and for designing robust architectures.

Below is an organized overview of storage services—covering block storage, file storage, and object storage—as well as backup and disaster recovery strategies.

---

## Block Storage

AWS block storage includes services such as EBS volumes, EFS file systems, snapshots, S3 backups, FSx for Lustre, FSx for NetApp, and more. These services typically create at least three redundant copies of your data. For instance, AWS automatically makes three copies when taking an EBS snapshot or using an EFS file system.

![The image is a diagram of an AWS cloud architecture, illustrating components like VPC, EBS, S3, and RDS across different regions and availability zones, with connections for backup and restore processes.](https://kodekloud.com/kk-media/image/upload/v1752863910/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Storage-Services/aws-cloud-architecture-diagram.jpg)

### EBS Volumes

EBS volumes serve as durable, reliable hard drives attached to EC2 instances. To enhance data protection, regularly schedule snapshots. It is important to note that adjusting performance parameters such as switching to GP3 or increasing IOPS does not change the underlying redundancy, which is already maximized by AWS. Snapshots ensure fast recovery in the event of data corruption or accidental deletion, but they do not increase the intrinsic fault tolerance of the volume.

### Instance Store

In contrast, instance store volumes, which are local storage on the EC2 instance's host, deliver excellent performance (up to 150,000–185,000 IOPS) via NVMe storage. However, they are ephemeral and do not persist when the instance fails or is relocated. Therefore, for scenarios where data durability is essential, always choose EBS over instance store.

![The image presents a scenario about a gaming company considering EC2 instance store volumes for their application, with four statements evaluating the durability and persistence of data. The focus is on understanding the ephemeral nature of instance store volumes.](https://kodekloud.com/kk-media/image/upload/v1752863912/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Storage-Services/gaming-company-ec2-instance-store.jpg)

---

## File and Network Storage

### Amazon EFS

Amazon EFS (Elastic File System) is designed for inherent redundancy. It spans multiple Availability Zones (AZs) within a region, ensuring data is automatically backed up with at least three copies. EFS can also be replicated across regions if required.

![The image is a diagram of an AWS cloud architecture showing two regions with VPCs, availability zones, and various services like EBS, S3, EFS, and RDS, illustrating backup and restore processes.](https://kodekloud.com/kk-media/image/upload/v1752863914/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Storage-Services/aws-cloud-architecture-diagram-2.jpg)

EFS offers configurable performance options and lifecycle management, such as intelligent tiering that moves infrequently accessed files to a different storage class similar to that available in Amazon S3. However, while these features enhance performance and cost-efficiency, they do not modify the inherent fault tolerance. Choosing the EFS One Zone option will reduce resiliency compared to the default multi-AZ setup.

EFS lifecycle management can automate data movement based on usage patterns:

![The image is a flowchart illustrating the Amazon Elastic File System (EFS) lifecycle management process, including setting lifecycle policies, managing data movement, and optimizing storage costs with infrequent access and intelligent tiering.](https://kodekloud.com/kk-media/image/upload/v1752863915/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Storage-Services/amazon-efs-lifecycle-management-flowchart.jpg)

### FSx Services

- **FSx for Windows File Server**  
  This service integrates with Active Directory and provides full redundancy through AWS-managed replication. There are no additional configurations to enhance reliability beyond enforcing strong security practices.

  ![The image is a diagram of an AWS cloud setup showing VPC peering between the N. Virginia and Oregon regions, with Amazon FSx and AWS Data Sync components. It highlights default encryption for data in transit and at rest.](https://kodekloud.com/kk-media/image/upload/v1752863916/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Storage-Services/aws-cloud-vpc-peering-diagram.jpg)

- **FSx for Lustre**  
  FSx for Lustre is commonly employed in high-performance computing (HPC) simulations where both performance and reliability are critical. For enhanced backup and redundancy, it is frequently linked to Amazon S3. Additional redundancy settings are not available because the service is designed with inherent reliability.

  ![The image presents a scenario about a research institution considering Amazon FSx for Lustre for data reliability in HPC simulations, with four statements evaluating its reliability features.](https://kodekloud.com/kk-media/image/upload/v1752863918/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Storage-Services/amazon-fsx-lustre-reliability-hpc.jpg)

- **OpenZFS and ONTAP in FSx for OpenZFS**  
  These services offer advanced features such as snapshot volumes and clone volumes. While they do not add extra built-in reliability controls, proper configuration can significantly improve backup speed and data availability. Reliability is largely determined by how the features are utilized rather than by enabling an extra reliability option.

  ![The image is a diagram showing an AWS architecture for backup and restore processes using Amazon EC2, FSx for OpenZFS, and AWS Backup across two VPCs within Account B. It illustrates the flow of data from file systems to backup vaults and the restoration process.](https://kodekloud.com/kk-media/image/upload/v1752863919/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Storage-Services/aws-backup-restore-architecture-diagram.jpg)

### Amazon ONTAP

Similar to OpenZFS, Amazon ONTAP is built with resiliency in mind. Although features like deduplication, compression, and encryption improve efficiency and indirectly support reliability, the core reliability mechanisms rely on AWS’s default three-copy storage design.

---

## Object Storage: Amazon S3

Amazon S3 delivers simple and reliable storage with a built-in design that maintains at least three copies of your data (excluding the S3 One Zone option, which stores data in a single AZ). Standard security measures include private buckets, server-side encryption, IAM controls, bucket policies, and NACLs for access management.

![The image presents a scenario where a startup plans to use Amazon S3 for storing user-uploaded images securely, with four options for managing access and security. Each option suggests different configurations for S3 buckets, encryption, and access control.](https://kodekloud.com/kk-media/image/upload/v1752863920/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Storage-Services/amazon-s3-user-images-security-options.jpg)

Understanding how S3 evaluates permissions is crucial. Even though measures like public access blocks and logging are essential for security, they do not increase the service’s inherent reliability. Amazon S3 automatically provides high availability through its redundant storage design.

![The image presents a question about the order in which Amazon S3 evaluates permissions, with four multiple-choice options detailing different sequences of IAM policies, bucket policies, ACLs, and public access firewall.](https://kodekloud.com/kk-media/image/upload/v1752863921/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Storage-Services/amazon-s3-permissions-evaluation-question.jpg)

When replicating data between buckets—such as configuring a source bucket with disabled replication and a secondary bucket for compliance or disaster recovery—remember that S3’s automatic redundancy typically negates the need for additional reliability adjustments.

---

## Backup, Disaster Recovery, and Redundancy

Ensuring data reliability extends beyond primary storage configurations. Robust backup and disaster recovery strategies are essential for restoring services in case of data corruption or accidental deletion. Using EBS snapshots, EFS snapshots, or FSx snapshots, you can safeguard your data by storing backups in encrypted vaults. Often, these backups are replicated to further mitigate data loss.

![The image is a diagram illustrating a cross-account backup process in AWS, showing the transfer of encrypted Amazon EBS snapshots from a source account to a destination account using backup vaults and customer-managed keys.](https://kodekloud.com/kk-media/image/upload/v1752863922/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Storage-Services/aws-cross-account-backup-diagram.jpg)

A typical backup scenario might involve:

- Storing critical backups with encryption via a customer-managed key (CMK).
- Implementing lifecycle policies that prevent inadvertent deletion or alteration.
- Using a VPC interface endpoint for secure private data transfers during backup replication and recovery.

![The image outlines steps for a financial institution to ensure AWS Backup data is encrypted using a customer-managed key (CMK) in AWS KMS, including enabling default encryption, selecting the CMK during backup creation, modifying IAM policies, and encrypting data at the source.](https://kodekloud.com/kk-media/image/upload/v1752863923/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Storage-Services/aws-backup-encryption-cmk-steps.jpg)

![The image presents a scenario where a media company needs to ensure AWS backups are not deleted or altered due to a legal notice, and it lists four AWS Backup features as potential solutions.](https://kodekloud.com/kk-media/image/upload/v1752863924/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Storage-Services/aws-backup-legal-notice-solutions.jpg)

For secure, private data transfers with added redundancy, consider using a VPC interface endpoint when communicating with AWS Backup services.

---

## Elastic Disaster Recovery (EDR)

Elastic Disaster Recovery (EDR) is vital in ensuring rapid application recovery during outages. By replicating on-premises data to a staging area in AWS, EDR enables you to launch EC2 instances quickly in the event of an emergency. The EDR console offers insights into job execution and instance details, reinforcing your application's resiliency.

![The image presents a scenario about a corporation planning to use AWS Elastic Disaster Recovery and asks which statement about the AWS Elastic Disaster Recovery Console is true, offering four options.](https://kodekloud.com/kk-media/image/upload/v1752863925/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Storage-Services/aws-elastic-disaster-recovery-console.jpg)

![The image is a diagram illustrating a data replication and recovery architecture using AWS services, including components like AWS Replication Agent, EC2, S3, and EBS volumes, with data flow and network protocols indicated.](https://kodekloud.com/kk-media/image/upload/v1752863926/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Storage-Services/aws-data-replication-recovery-diagram.jpg)

Remember, in failover and failback procedures, “fail back” refers to reverting to the primary environment after a recovery event or test. EDR’s capabilities ensure that even during outages, your applications remain available.

---

## Storage Gateway

Storage Gateway bridges on-premises data centers with AWS storage solutions. It is available as a volume gateway, tape gateway, or file gateway, each with its own considerations:

- A storage gateway appliance is deployed in your corporate data center and connects with AWS over the internet or via a private link.
- The appliance itself represents a single point of failure. Although you can restart the virtual machine, the attached disks must be properly managed to avoid data loss.
- For file and tape gateways, the underlying AWS storage (typically S3 or Glacier) ensures redundancy, even if the local gateway experiences issues.

![The image is a network diagram illustrating the integration of a corporate data center with AWS Cloud services, showing data and control flows between an application server, storage gateway, and Amazon S3 via AWS Direct Connect and Site-to-Site VPN.](https://kodekloud.com/kk-media/image/upload/v1752863927/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Storage-Services/corporate-data-center-aws-integration-diagram.jpg)

![The image is a diagram illustrating the integration of a corporate data center with AWS Cloud services, showing data and control flow between an application server, storage gateway appliance, and Amazon S3 via AWS Direct Connect and Site-to-Site VPN.](https://kodekloud.com/kk-media/image/upload/v1752863929/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Storage-Services/corporate-data-center-aws-integration-diagram-2.jpg)

For FSx File Gateway and Tape Gateway deployments, ensure that you have a well-established recovery procedure. Running multiple instances of the gateway does not automatically provide active-active redundancy because these gateways typically attach to a single disk or storage volume at any given time.

![The image illustrates a Tape Gateway architecture, showing how data from data centers is backed up to virtual tapes in Amazon S3 and archived in Amazon Glacier. It includes components like Gateway VMs, tape drives, and media changers, with connections to AWS for storage and retrieval.](https://kodekloud.com/kk-media/image/upload/v1752863930/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Storage-Services/tape-gateway-architecture-diagram.jpg)

![The image illustrates two AWS Volume Gateway configurations: Stored Mode, where the entire dataset is stored both on-premises and in AWS, and Cache Mode, where frequently accessed data is stored on-premises with the rest in AWS.](https://kodekloud.com/kk-media/image/upload/v1752863931/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Storage-Services/aws-volume-gateway-configurations.jpg)

---

## Final Thoughts

In summary, AWS storage services are engineered to be highly redundant and reliable by default—with at least three copies of your data in most cases. However, understanding the differences between services such as EBS versus instance store and the significance of automated backups and disaster recovery is crucial for building resilient architectures. Backup strategies and Elastic Disaster Recovery (EDR) are essential for ensuring data restoration and maintaining service availability in the event of failures.

As you design your systems, keep in mind:

- AWS employs multiple copies of your data to ensure durability, similar to how scaling your application across multiple EC2 instances maintains performance and availability.
- Proper backup and data recovery plans are vital parts of your strategy.

I'm Michael Forrester. Thank you for reviewing this lesson. In upcoming lessons, we will delve into compute services and related concepts.

> [!important]
> **Note**
>
> For more detailed information on AWS storage solutions, consider visiting the [AWS Documentation](https://aws.amazon.com/documentation/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/2a99d085-acf0-4910-924f-737bfc1652da/lesson/f014dbac-1791-4c44-9506-ae9ba8f54639)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/2a99d085-acf0-4910-924f-737bfc1652da/lesson/49afbe6d-d950-4b98-ab98-07e25fa265f9)**
>
> Practice lab
