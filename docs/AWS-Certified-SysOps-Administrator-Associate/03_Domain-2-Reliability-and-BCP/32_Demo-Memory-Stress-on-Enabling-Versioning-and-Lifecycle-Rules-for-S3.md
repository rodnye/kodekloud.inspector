# Demo Memory Stress on Enabling Versioning and Lifecycle Rules for S3 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-2-Reliability-and-BCP/Demo-Memory-Stress-on-Enabling-Versioning-and-Lifecycle-Rules-for-S3)

---

## Table of Contents

- Demo Memory Stress on Enabling Versioning and Lifecycle Rules for S3
  - Creating an S3 Bucket
  - Enabling Bucket Versioning
  - Configuring Lifecycle Rules
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 2 Reliability and BCP

# Demo Memory Stress on Enabling Versioning and Lifecycle Rules for S3

In this demonstration, we will walk you through the process of setting up an AWS S3 bucket for a demo environment. The tutorial covers how to create an S3 bucket, enable versioning, and establish lifecycle rules to transition objects between different storage classes automatically.

## Creating an S3 Bucket

First, we create a bucket named "KodeKloud version demo bucket," which will serve as both our versioning demonstration bucket and our lifecycle management bucket. The initial configuration for the bucket includes:

- Blocking all public access
- Keeping bucket versioning disabled initially (to be enabled later)
- Using the default encryption settings
- Skipping advanced options like object lock

Once these parameters are set, the bucket is created.

![The image shows an AWS S3 console page with options for blocking public access to buckets and objects, and settings for bucket versioning.](https://kodekloud.com/kk-media/image/upload/v1752860055/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Memory-Stress-on-Enabling-Versioning-and-Lifecycle-Rules-for-S3/aws-s3-console-block-public-access.jpg)

Next, we review the advanced settings to ensure the bucket is configured correctly.

![The image shows a section of the AWS S3 console where a user is configuring advanced settings for creating a bucket, including options for enabling or disabling Object Lock.](https://kodekloud.com/kk-media/image/upload/v1752860056/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Memory-Stress-on-Enabling-Versioning-and-Lifecycle-Rules-for-S3/aws-s3-bucket-advanced-settings.jpg)

Once created in the US East 2 region, we navigate into the bucket.

## Enabling Bucket Versioning

For version control, we begin by uploading a sample YAML file (referred to as the Full Features Bucket YAML file) directly to the bucket. After a successful upload, navigate to the bucket properties to enable versioning.

![The image shows the AWS S3 console interface for editing bucket versioning settings, with options to enable or suspend versioning and a note about updating lifecycle rules.](https://kodekloud.com/kk-media/image/upload/v1752860057/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Memory-Stress-on-Enabling-Versioning-and-Lifecycle-Rules-for-S3/aws-s3-bucket-versioning-settings.jpg)

Enabling bucket versioning is essential as it allows you to maintain multiple versions of an object. Additionally, it opens the possibility to activate multi-factor authentication (MFA) delete—an extra protection layer for preventing accidental or unauthorized deletions in production environments.

> [!important]
> **Note**
>
> For production deployments and exam preparations, consider enabling MFA delete to safeguard your S3 objects.

![The image shows an AWS S3 bucket configuration page with versioning enabled and multi-factor authentication delete disabled. It includes details like the AWS region, Amazon Resource Name (ARN), and creation date.](https://kodekloud.com/kk-media/image/upload/v1752860058/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Memory-Stress-on-Enabling-Versioning-and-Lifecycle-Rules-for-S3/aws-s3-bucket-configuration.jpg)

With versioning enabled, upload another file (the Simple Bucket YAML file) to observe the version control in action. Toggle the "Show Versions" option to view the incremental changes.

![The image shows an Amazon S3 bucket interface with two YAML files listed, displaying their names, version IDs, last modified dates, sizes, and storage classes.](https://kodekloud.com/kk-media/image/upload/v1752860060/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Memory-Stress-on-Enabling-Versioning-and-Lifecycle-Rules-for-S3/amazon-s3-bucket-yaml-files.jpg)

Below is the content of the Simple Bucket YAML file used in this demo:

```
AWSTemplateFormatVersion: '2010-09-09'
Description: Simple CloudFormation template to create an S3 bucket for demo
Resources:
  MyS3Bucket:
    Type: 'AWS::S3::Bucket'
    Properties:
      BucketName: !Sub 'my-simple-log-bucket-${AWS::AccountId}'
```

After a few simulated edits, new versions become visible under the "Show Versions" view, clearly demonstrating how versioning tracks changes over time.

## Configuring Lifecycle Rules

Managing the cost and performance of your S3 storage becomes easier with lifecycle rules, which automatically transition objects between storage classes after a specified period. For instance, you might configure the lifecycle to move YAML files from hot storage (Standard) to a more cost-effective storage option after 30 days.

To set this up, navigate to the "Management" section in the bucket properties, then proceed to configure lifecycle rules. These rules can automate tasks such as:

- Transitioning objects to a lower-cost storage class (for example, from Standard to One Zone Infrequent Access after 30 days, and then to Glacier or Flexible Retrieval after 90 days)
- Deleting noncurrent versions of objects after a defined time frame

![The image shows an AWS S3 console displaying details of an object named "s3-full-features-bucket.yml" in the US East (Ohio) region, with information about its ARN, Etag, and object URL. The bucket versioning is enabled, and there are sections for object management overview and management configurations.](https://kodekloud.com/kk-media/image/upload/v1752860061/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Memory-Stress-on-Enabling-Versioning-and-Lifecycle-Rules-for-S3/aws-s3-console-object-details.jpg)

For the demo, we create a lifecycle rule named "Infrequent-after30" that applies to all objects in the bucket. This rule specifies the following actions for the latest versions of objects:

- After 30 days: Transition to One Zone Infrequent Access
- After 90 days: Transition to a Glacier-like storage class (Flexible Retrieval)

![The image shows an AWS S3 console screen where a lifecycle rule named "Infrequent-after30" is being configured to apply to all objects in a bucket.](https://kodekloud.com/kk-media/image/upload/v1752860062/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Memory-Stress-on-Enabling-Versioning-and-Lifecycle-Rules-for-S3/aws-s3-lifecycle-rule-infrequent.jpg)

After reviewing the summary of transitions, the rule is confirmed and activated.

![The image shows an Amazon S3 console page displaying a lifecycle configuration for managing object storage. It includes a rule named "Infrequent-after30" that is enabled for transitioning objects to a different storage class.](https://kodekloud.com/kk-media/image/upload/v1752860064/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Memory-Stress-on-Enabling-Versioning-and-Lifecycle-Rules-for-S3/amazon-s3-lifecycle-configuration.jpg)

> [!important]
> **Lifecycle Management Tip**
>
> Lifecycle rules not only help optimize storage costs but also ensure that your data is stored in the most appropriate class based on its age and usage patterns.

This demonstration has showcased how to enable bucket versioning and set up lifecycle rules to manage S3 object storage efficiently.

For further details on AWS S3 management and best practices, consider exploring the [AWS Documentation](https://aws.amazon.com/documentation/s3/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/1b592900-bdef-468a-9a2b-de667b7e9cae/lesson/ab29be12-5aec-4160-a251-750879237bee)**
>
> Watch video content
