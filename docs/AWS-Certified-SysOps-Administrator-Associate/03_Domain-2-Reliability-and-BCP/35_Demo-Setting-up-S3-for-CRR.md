# Demo Setting up S3 for CRR - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-2-Reliability-and-BCP/Demo-Setting-up-S3-for-CRR)

---

## Table of Contents

- Demo Setting up S3 for CRR
  - Step 1: Identify the Source and Target Buckets
  - Step 2: Configure the Replication Rule
  - Step 3: Configure Additional Replication Settings
  - Step 4: Initiate Batch Operations for Existing Objects
  - Step 5: Run the Batch Operations Job
  - Final Step: Verify Replication
  - Watch Video
  - Practice Lab
    - Creating an IAM Role for S3 Batch Operations

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 2 Reliability and BCP

# Demo Setting up S3 for CRR

Welcome back to this lesson. I’m Michael Forrester, and in this guide we will configure cross-region replication (CRR) for our KodeKloud version demo bucket. In this demo, the bucket already has versioning enabled and contains two files.

## Step 1: Identify the Source and Target Buckets

Currently, the source bucket is located in Ohio. Duplicate the active browser tab and switch to Virginia. Although Amazon S3 is a global service, our replication target will be the KodeKloud version demo replication bucket.

![The image shows an Amazon S3 console with a bucket named "kk-version-demo" containing two YAML files. The interface displays options for managing objects, including uploading, downloading, and deleting files.](https://kodekloud.com/kk-media/image/upload/v1752860094/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-S3-for-CRR/amazon-s3-console-kk-version-demo.jpg)

In Virginia, create a new bucket named **KK version demo rep**. Enable versioning on this new bucket since replication requires it. After creation, notice that the bucket is set in the U.S. East 1 region.

![The image shows an AWS S3 console with a list of general-purpose buckets, including details like bucket names, AWS regions, and creation dates. A green notification bar indicates a bucket was successfully created.](https://kodekloud.com/kk-media/image/upload/v1752860096/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-S3-for-CRR/aws-s3-console-bucket-list.jpg)

## Step 2: Configure the Replication Rule

Return to the source bucket in Ohio. While settings like versioning, encryption, tiering, and logging are available under the **Properties** tab, the replication rule must be set up under the **Management** tab—not under Permissions or Metrics.

1.  Under the **Management** tab, create a new replication rule.
2.  Set the rule ID to "one copy to Virginia".
3.  Enable the rule with a priority of zero.
4.  Define the source bucket as the one in Ohio and specify the newly created replication bucket in Virginia as the destination.  
    If the destination bucket does not appear immediately (possibly due to console update latency), manually enter its name.

![The image shows an AWS S3 console screen for creating a replication rule, with fields for naming the rule, setting its status, and priority.](https://kodekloud.com/kk-media/image/upload/v1752860097/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-S3-for-CRR/aws-s3-replication-rule-console.jpg)

## Step 3: Configure Additional Replication Settings

Proceed with the replication configuration by:

- Entering the destination bucket name (if not auto-populated). The console will validate that the destination is in Virginia.
- Selecting or creating an appropriate IAM role. For simplicity in this demo, we will create a new role for S3 Batch operations.

Before you complete the configuration, adjust the storage class for replicated objects. In this example, the replication rule transitions objects to Glacier after 90 days, balancing cost efficiency with archival retrieval requirements.

![The image shows an Amazon S3 management console screen displaying different storage class options, including Standard, Intelligent-Tiering, and Glacier, with details on their designed use, availability zones, and minimum storage duration.](https://kodekloud.com/kk-media/image/upload/v1752860098/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-S3-for-CRR/amazon-s3-storage-classes-console.jpg)

For additional settings like replication metrics, delete marker replication, and replica modification sync, the default values are acceptable for this demo. Click **Save** to create the replication rule.

![The image shows an AWS S3 management console screen with options for configuring additional replication settings, such as Replication Time Control, Replication Metrics, Delete Marker Replication, and Replica Modification Sync.](https://kodekloud.com/kk-media/image/upload/v1752860099/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-S3-for-CRR/aws-s3-replication-settings-console.jpg)

## Step 4: Initiate Batch Operations for Existing Objects

Because the source bucket already contains objects, Amazon S3 will prompt you to run a batch operations job to replicate the existing files. Click **Submit** to start this one-time copy job.

> [!important]
> **Note**
>
> If an existing IAM role is not available, a permission error may occur. In such cases, you must create a new IAM role with the required permissions.

![The image shows an AWS console interface for configuring an S3 batch operation job, specifically the "Choose manifest" step, with options for selecting the AWS region and manifest format.](https://kodekloud.com/kk-media/image/upload/v1752860100/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-S3-for-CRR/aws-s3-batch-operation-manifest.jpg)

### Creating an IAM Role for S3 Batch Operations

If the batch job fails due to insufficient role permissions, follow these steps to create a suitable IAM role:

1.  Open the IAM console and select **Create role**.
2.  Choose S3 as the trusted entity for Batch operations.
3.  For the demo, attach administrative access to facilitate cross-boundary replication actions (in a production environment, ensure you apply least privilege).

![The image shows an AWS IAM interface for creating a role, where the user is selecting a trusted entity type, such as AWS service, AWS account, web identity, SAML 2.0 federation, or custom trust policy.](https://kodekloud.com/kk-media/image/upload/v1752860100/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-S3-for-CRR/aws-iam-create-role-interface.jpg)

Use the following JSON as the trust policy:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "batchoperations.s3.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

After creating the role (for example, name it "S3 Batch Admin"), refresh the batch operations configuration and select the newly created role to recreate the batch job with the corrected settings.

![The image shows an AWS IAM console screen listing various roles and their management types, such as AWS managed and customer managed. The roles include permissions for services like Alexa, Amazon API Gateway, and Amazon AppStream.](https://kodekloud.com/kk-media/image/upload/v1752860102/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-S3-for-CRR/aws-iam-console-roles-management.jpg)

## Step 5: Run the Batch Operations Job

Proceed through the batch operations wizard:

1.  Verify the manifest settings, permissions, and operation type.
2.  Ensure that "Replicate" is selected on the **Operation type** screen.

![The image shows an AWS S3 Batch Operations interface, specifically the "Operation type" selection screen, with "Replicate" selected as the operation. It includes a note that only replicate operations are permitted when using S3 Replication configuration.](https://kodekloud.com/kk-media/image/upload/v1752860102/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-S3-for-CRR/aws-s3-batch-operations-replicate.jpg)

Once verified, the job will prepare and await your confirmation before starting the replication process for the existing objects.

![The image shows an Amazon S3 Batch Operations job details page, displaying information such as job ID, description, AWS region, and status. The job is awaiting confirmation to run.](https://kodekloud.com/kk-media/image/upload/v1752860104/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-S3-for-CRR/amazon-s3-batch-operations-job-details.jpg)

After the job runs, review the batch operations job details. Although some nuances may cause minimal failures, the overall process will finish and provide a manifest along with detailed output.

![The image shows an AWS console screen displaying the status of a batch operation job. The job is completed with failures, with 0% success and 100% failure rate.](https://kodekloud.com/kk-media/image/upload/v1752860104/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-S3-for-CRR/aws-console-batch-job-status.jpg)

## Final Step: Verify Replication

Return to the KodeKloud version demo bucket under the **Management** tab. You should see that the replication rule is active and replicating objects to the designated bucket in Virginia. This setup successfully demonstrates cross-region replication within the same AWS account. (Note: Cross-account replication can be configured similarly by adjusting the required permissions.)

This completes the setup for S3 cross-region replication in our demo environment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/1b592900-bdef-468a-9a2b-de667b7e9cae/lesson/aea3056b-8fc3-48e1-894e-7b114ed23f34)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/1b592900-bdef-468a-9a2b-de667b7e9cae/lesson/e4fc7c52-be2f-4fd4-b8b0-7d894c261426)**
>
> Practice lab
