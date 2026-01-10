# Setting Up S3 for CRR - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-2-Reliability-and-BCP/Setting-Up-S3-for-CRR)

---

## Table of Contents

- Setting Up S3 for CRR
  - Overview
  - Prerequisites
  - Configuring Cross-Region Replication
  - What Gets Replicated?
  - Summary
  - Watch Video
    - Additional Considerations

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 2 Reliability and BCP

# Setting Up S3 for CRR

Welcome to this comprehensive guide on setting up Cross-Region Replication (CRR) for Amazon S3. CRR allows asynchronous copying of objects between S3 buckets, providing benefits like disaster recovery, regulatory compliance, and enhanced global data availability.

## Overview

In this lesson, you will learn how to configure CRR by selecting a source bucket, defining your replication criteria, and designating a destination bucket. This process includes:

- **Selecting the Data Set for Replication**: You can choose to replicate:
  - **Entire Bucket**
  - **Prefix**: Functions like a folder.
  - **Tag**: Based on object metadata tags.

- **Choosing the Destination Bucket**: The destination can be located in the same region or a different one—even in another AWS account with proper permissions. You also have the option to override file ownership settings and modify the destination storage class, enabling you to maintain a "hot" source and a "cold" destination to reduce costs.

> [!important]
> **Note**
>
> This configuration is ideal for purposes such as disaster recovery, compliance, global content availability (for static resources like images and videos), and backup. However, it is not suitable for database replication.

![The image illustrates the benefits of Amazon S3 Cross-Region Replication, highlighting features like disaster recovery, compliance, improved latency, and data protection. It includes diagrams of bucket replication processes and options for changing destination accounts and storage classes.](https://kodekloud.com/kk-media/image/upload/v1752860167/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Setting-Up-S3-for-CRR/amazon-s3-cross-region-replication-benefits.jpg)

## Prerequisites

Before configuring CRR, ensure you have met the following prerequisites:

1.  **Source and Destination Buckets**: Identify your buckets.
2.  **Versioning Enabled**: Both buckets must have versioning activated; this ensures replication of every object version.
3.  **Replication / IAM Role**: Establish a role to manage the replication process.
4.  **Proper Permissions**: Ensure that permissions are set using Access Control Lists (ACLs), IAM policies, or bucket policies. For cross-account replication, additional permissions might be necessary.

> [!important]
> **Warning**
>
> Keep in mind that replicating every version of every file may lead to increased costs, and replication may experience delays of up to 30 seconds based on connection performance.

![The image outlines prerequisites for setting up cross-region replication, including source and destination buckets, versioning enabled, replication IAM role, and permissions.](https://kodekloud.com/kk-media/image/upload/v1752860168/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Setting-Up-S3-for-CRR/cross-region-replication-prerequisites.jpg)

### Additional Considerations

- **Data Integrity**: Be aware that any corrupted files will be replicated without alteration.
- **Deletion Process**: Removing a file adds a delete marker instead of erasing all existing versions. To completely remove an object, you must delete all versions and the delete markers.

![The image outlines considerations for setting up cross-region replication, including costs, replication delay, data integrity, and delete markers.](https://kodekloud.com/kk-media/image/upload/v1752860169/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Setting-Up-S3-for-CRR/cross-region-replication-considerations.jpg)

## Configuring Cross-Region Replication

Follow these steps to configure CRR for your S3 buckets:

1.  **Enable Versioning** on both the source and destination buckets.
2.  **Create a Replication Rule** in the source bucket.
3.  **Specify the Buckets**: Define both the source and the destination buckets within the replication settings.
4.  **Set Up Permissions**: Grant the necessary permissions to allow the replication role to function.
5.  **Configure Replication Options**: Apply filters such as prefixes or tags and adjust the destination storage class if needed.
6.  **Save the Replication Rule** to finalize the configuration.

![The image outlines six steps to configure Cross-Region Replication (CRR) for S3, including enabling versioning, creating a replication rule, defining buckets, setting permissions, selecting options, and saving the rule.](https://kodekloud.com/kk-media/image/upload/v1752860170/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Setting-Up-S3-for-CRR/s3-cross-region-replication-steps.jpg)

These steps are crucial and may also be covered in AWS certification exams. The process starts with enabling versioning and continues through rule creation, bucket definition, permission configuration, option selection, and finally, saving the rule.

## What Gets Replicated?

CRR replicates the following components:

- Unencrypted objects
- Associated metadata tags
- Lock retention settings

However, note the following:

- Previously replicated objects will not be re-replicated.
- Objects stored in archival storage (e.g., Glacier) are not replicated.
- Certain lifecycle actions or delete markers are not replicated.

![The image is a comparison chart showing what is replicated and what is not in a data storage context. It lists unencrypted objects and certain encrypted objects as replicated, while already replicated objects, objects in specific archives, and lifecycle actions are not replicated.](https://kodekloud.com/kk-media/image/upload/v1752860171/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Setting-Up-S3-for-CRR/data-storage-replication-comparison-chart.jpg)

Ensure that your application replicates only the intended data. More advanced lifecycle actions might require reconfiguration in the destination bucket.

## Summary

By setting up S3 cross-region replication, you enhance your data protection strategy, ensure compliance, and provide global content availability. Make sure your configuration aligns with your data management and disaster recovery needs.

For additional information on AWS policies and best practices, refer to the [AWS S3 Documentation](https://aws.amazon.com/s3/).

Good luck, and we'll see you on the exam!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/1b592900-bdef-468a-9a2b-de667b7e9cae/lesson/ab1544e3-6f84-4f70-aed5-7b3a0e55146b)**
>
> Watch video content
