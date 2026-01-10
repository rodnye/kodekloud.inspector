# Turning up Security on Storage Services Part 3 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Designing-for-Security/Turning-up-Security-on-Storage-Services-Part-3)

---

## Table of Contents

- Turning up Security on Storage Services Part 3
  - AWS Backup
  - Legal Holds and Vault Locks
  - Securing Data Transfers with VPC Interface Endpoints
  - Elastic Disaster Recovery (EDR)
  - Storage Gateway
  - Summary
  - Watch Video
  - Practice Lab
    - S3 File Gateway
    - FSx File Gateway
    - Tape Gateway
    - Volume Gateway

---

## Content

AWS Solutions Architect Associate Certification

Designing for Security

# Turning up Security on Storage Services Part 3

In this lesson, we delve deeper into secure storage by exploring storage manipulation services. Beyond merely storing files, these services back up, replicate, and manage your data—actively enhancing both reliability and security.

---

## AWS Backup

AWS Backup is a relatively recent addition to the AWS portfolio (approximately five years old) that automates the backup process for data, such as encrypted EBS snapshots and volumes, using customer-managed keys. In a typical scenario, one AWS account backs up data to a vault that supports cross-account copy jobs to another AWS Backup vault. For instance, backups taken in US East 1 can be replicated to EU West 1.

![The image is a diagram illustrating a cross-account copy job in AWS, showing the transfer of encrypted Amazon EBS snapshots from a source account to a destination account using backup vaults and customer-managed keys.](https://kodekloud.com/kk-media/image/upload/v1752864559/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Storage-Services-Part-3/aws-cross-account-ebs-snapshots-diagram.jpg)

AWS Backup is secure by design, but for added protection, consider these best practices:

1.  Encrypt all items stored in the backup vault.
2.  Configure the backup job’s encryption settings to use a specific AWS Key Management Service (KMS) customer-managed key (CMK) when required by regulatory standards.
3.  Avoid relying solely on the default S3 encryption (SSE-S3) if a CMK is necessary; instead, opt for SSE-KMS.
4.  Adjust IAM policies for AWS Backup to grant the proper permissions over the CMK. Note that this does not automatically attach the CMK to your backup job.

> [!important]
> **Example for Regulatory Compliance**
>
> For example, a financial institution that needs to comply with regulatory requirements can select the desired CMK during job creation to enforce encryption at both the source and in the backup vault.

![The image outlines steps for a financial institution to ensure AWS Backup data is encrypted using a specific customer-managed key (CMK) in AWS Key Management Service (KMS). It presents four options for meeting regulatory requirements.](https://kodekloud.com/kk-media/image/upload/v1752864561/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Storage-Services-Part-3/aws-backup-encryption-cmk-options.jpg)

---

## Legal Holds and Vault Locks

Imagine a media company that receives a legal notice requiring certain backups to remain unaltered for a specified period. AWS Backup provides two mechanisms to support this requirement:

- **Legal Hold:** Applies across multiple vaults, securing backups throughout the entire AWS Backup deployment.
- **Vault Lock:** Secures a single backup vault by applying compliance or governance controls, thereby preventing any modifications.

While a legal hold spans multiple vaults, a vault lock functions similarly to an S3 object lock but is confined to one vault.

![The image presents a scenario where a media company needs to ensure backups are not deleted or altered, with four AWS Backup feature options to meet this requirement.](https://kodekloud.com/kk-media/image/upload/v1752864562/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Storage-Services-Part-3/aws-backup-media-company-options.jpg)

For scenarios such as a pharmaceutical company needing to lock data for seven years—even from a root user—apply a legal hold when multiple vaults are involved or use a vault lock for a single vault.

![The image shows an AWS Backup interface for adding a legal hold, with options to specify details, scope, date range, and tags. It also mentions that AWS Backup has an Object Lock function called Legal Hold.](https://kodekloud.com/kk-media/image/upload/v1752864563/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Storage-Services-Part-3/aws-backup-legal-hold-interface.jpg)

---

## Securing Data Transfers with VPC Interface Endpoints

AWS Backup traffic can be secured using VPC interface endpoints. These endpoints assign an IP address from your subnet, ensuring that traffic flows over AWS’s private backbone instead of the public internet. This configuration is particularly beneficial for multinational corporations that require secure backup operations between their VPCs and AWS Backup.

![The image presents a scenario where a multinational corporation needs to ensure private data transfers between their VPC and AWS Backup, with four suggested steps to achieve this. The options include creating a VPC peering connection, using AWS Direct Connect, configuring a VPC interface endpoint, and encrypting data with AWS KMS.](https://kodekloud.com/kk-media/image/upload/v1752864564/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Storage-Services-Part-3/private-data-transfer-aws-backup.jpg)

The recommended approach is to configure a VPC interface endpoint for AWS Backup. Keep in mind that only S3 and DynamoDB support gateway endpoints; all other services, including AWS Backup, require interface endpoints.

---

## Elastic Disaster Recovery (EDR)

Formerly known as CloudEndure (or Elastic Disaster Recovery), EDR replicates storage from any location—including non-AWS environments—into AWS on a block-by-block basis. This near-real-time recovery capability is essential for mission-critical applications during a disaster.

![The image presents a question about the AWS Elastic Disaster Recovery Console, asking which statement is true, with four options provided.](https://kodekloud.com/kk-media/image/upload/v1752864566/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Storage-Services-Part-3/aws-elastic-disaster-recovery-question.jpg)

The EDR console is a dedicated interface that provides detailed insights into job executions, recovery instance details, and overall disaster recovery operations. It is used during both the initial setup and subsequent management phases.

A typical EDR process involves:

1.  Data sourced from an external data center (or another cloud provider) is identified.
2.  An AWS Replication Agent installed at the source transfers the data to replication servers.
3.  Replication servers pre-stage the data in volumes before copying it to the target virtual machines in AWS.
4.  Synchronization is maintained on a block-by-block basis, ensuring that even the smallest changes are securely replicated.

![The image is a diagram illustrating a data replication and recovery setup using AWS services, including components like AWS Replication Agent, EC2, S3, and VPC subnets for staging and recovery. It shows the flow of data and control protocols between a local network and the AWS cloud.](https://kodekloud.com/kk-media/image/upload/v1752864567/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Storage-Services-Part-3/aws-data-replication-recovery-diagram.jpg)

For example, a healthcare organization using EDR might conduct a failover test and then perform a "failback" to restore systems to the primary environment after a disaster.

---

## Storage Gateway

Storage Gateway is one of AWS’s longstanding services that seamlessly integrate on-premises data with AWS cloud services. It is available in several modes:

1.  **S3 File Gateway:** Provides a file system mount on Amazon S3 that supports standard file system protocols (NFS and SMB) with encryption enabled by default.
2.  **Volume Gateway:** Offers iSCSI-based storage volumes. Volume Gateway can operate in:
    - **Cached Mode:** Frequently accessed data is stored on-premises, while the complete dataset remains in Amazon S3.
    - **Stored Mode:** The entire dataset is stored locally and in Amazon S3, with asynchronous backups.
3.  **Tape Gateway:** Emulates a physical tape backup infrastructure using a virtual tape library (VTL), storing backups in S3 and optionally archiving them in Amazon Glacier.
4.  **FSx File Gateway:** Specifically designed for Windows-based file systems using SMB. This gateway integrates with FSx for Windows File Server and supports on-premises caching with SSDs for optimal performance.

### S3 File Gateway

A media company considering an S3 File Gateway will benefit from industry-standard file protocols that simplify integration with existing applications while ensuring data encryption.

![The image presents a scenario where a media company is transitioning to AWS using Amazon S3 File Gateway, with four statements about its features, asking which one is accurate.](https://kodekloud.com/kk-media/image/upload/v1752864568/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Storage-Services-Part-3/aws-s3-file-gateway-features.jpg)

### FSx File Gateway

The FSx File Gateway enables low-latency access to Windows file systems via the SMB protocol. It connects on-premises systems to an FSx for Windows File Server in the cloud and uses both data and metadata caches to optimize performance. Successful implementation requires proper setup of components such as DNS, time servers, and secure VPC endpoints.

![The image is a diagram explaining how the FSx File Gateway works, showing the interaction between on-premises systems and AWS Cloud, including steps like creating a gateway, joining a domain, and connecting clients. It highlights components such as data and metadata caches, common protocols, and optimized data transfer.](https://kodekloud.com/kk-media/image/upload/v1752864569/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Storage-Services-Part-3/fsx-file-gateway-diagram.jpg)

This gateway can be deployed on-premises as a virtual machine using standard hypervisors (e.g., ESXi, Hyper-V, or KVM) and can join a Microsoft domain, ensuring seamless integration with enterprise environments.

### Tape Gateway

Tape Gateway replaces traditional tape backup infrastructure with a virtual tape library (VTL). Data from on-premises backup applications is transmitted via iSCSI to the tape gateway appliance, which then stores virtual tapes in S3 or archives them in Amazon Glacier.

![The image illustrates a Tape Gateway architecture, showing how data from data centers is backed up to AWS using virtual tapes stored in Amazon S3 and archived in Amazon Glacier.](https://kodekloud.com/kk-media/image/upload/v1752864571/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Storage-Services-Part-3/tape-gateway-architecture-aws-backup.jpg)

When evaluating Tape Gateway, consider the following features:

- Supports a virtual tape library (VTL) interface.
- Seamlessly integrates with your existing backup infrastructure.
- Can be deployed virtually on-premises or as an EC2 instance.
- Fully supports archiving with both S3 Glacier Flexible Retrieval and S3 Glacier Deep Archive.

![The image presents a scenario about a corporation considering AWS Storage Gateway Tape Gateway for data archiving, followed by four statements about its features, asking which one is accurate.](https://kodekloud.com/kk-media/image/upload/v1752864573/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Storage-Services-Part-3/aws-storage-gateway-tape-gateway.jpg)

### Volume Gateway

Volume Gateway delivers cloud-backed iSCSI storage for on-premises servers, configurable in two modes:

- **Cached Mode:** Frequently accessed data is cached on-premises while the complete dataset remains in Amazon S3.
- **Stored Mode:** The entire dataset is maintained locally as well as in Amazon S3 with asynchronous backups.

This gateway is engineered for fast provisioning and efficient snapshot creation, ensuring encryption both in transit and at rest.

![The image illustrates two AWS Volume Gateway configurations: Stored Mode, where the entire dataset is stored both on-premises and in AWS, and Cache Mode, where frequently accessed data is stored on-premises.](https://kodekloud.com/kk-media/image/upload/v1752864573/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Storage-Services-Part-3/aws-volume-gateway-configurations.jpg)

For example, a global e-commerce company seeking both scalability and security might choose Volume Gateway in stored mode to maintain a complete local copy of the data while using S3 as the primary storage medium. Although some sources might mention a maximum volume size of 64 terabytes, the current supported limit is typically 32 terabytes.

![The image presents a scenario where a global e-commerce company is considering using AWS Storage Gateway Volume Gateway for data storage optimization, followed by four statements about the service for evaluation.](https://kodekloud.com/kk-media/image/upload/v1752864575/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Storage-Services-Part-3/aws-storage-gateway-ecommerce-scenario.jpg)

---

## Summary

1.  This module focused on storage services that enable manipulation of data through backup, replication, and disaster recovery.
2.  Newer AWS storage services include robust logging and built-in data-at-rest protection by default.
3.  Nearly all storage services support encryption through AWS KMS or customer-managed methods.
4.  AWS provides comprehensive monitoring through CloudWatch, with additional oversight possible via CloudTrail, AWS Config, and Trusted Advisor for premium support plans.

Thank you for joining this comprehensive 90-minute discussion on storage services. In upcoming sessions, we will explore additional topics, including compute services.

Happy securing your data!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/fcdcac66-6274-4b2f-912a-d6e9de511e5a/lesson/fbd124e2-20e3-472d-971d-92d4c75bc328)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/fcdcac66-6274-4b2f-912a-d6e9de511e5a/lesson/046b3d70-6e92-4150-bf36-755f3a00811d)**
>
> Practice lab
