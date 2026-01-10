# Demo Lifecycle Policies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Amazon-Simple-Storage-Service-Amazon-S3/AWS-S3-Basic-Features/Demo-Lifecycle-Policies)

---

## Table of Contents

- Demo Lifecycle Policies
  - Lifecycle Storage Classes Overview
  - 1. Create a Demo Bucket and Upload Objects
  - 2. Configure Lifecycle Rules
  - 3. Review Your Lifecycle Configuration
  - Additional Resources
  - Watch Video
  - Practice Lab
    - 2.1 Rule 1: lifecycle-logs
    - 2.2 Rule 2: lifecycle-media
      - Current Version Transitions
      - Non-Current Version Transitions

---

## Content

Amazon Simple Storage Service (Amazon S3)

AWS S3 Basic Features

# Demo Lifecycle Policies

In this walkthrough, you’ll learn how to automate object transitions and expirations in an Amazon S3 bucket using lifecycle policies. We’ll cover:

- Creating a demo bucket
- Uploading sample objects
- Defining lifecycle rules to transition and expire objects across storage classes

> [!important]
> **Why Use Lifecycle Policies**
>
> Lifecycle policies help optimize storage costs by automatically moving objects to lower-cost classes (e.g., Standard-IA, Glacier) or deleting them when they’re no longer needed.

## Lifecycle Storage Classes Overview

| Storage Class                | Description                               | Typical Use Case                         |
| ---------------------------- | ----------------------------------------- | ---------------------------------------- |
| S3 Standard                  | Frequent access, low latency              | Active datasets                          |
| S3 Standard-IA               | Infrequent access, lower cost             | Backups and long-term storage            |
| S3 Glacier Instant Retrieval | Millisecond access retrieval from Glacier | Archives with occasional retrieval       |
| S3 Glacier Deep Archive      | Lowest cost, hours-long retrieval time    | Compliance archives, long-term retention |

---

## 1\. Create a Demo Bucket and Upload Objects

1.  Open the [AWS Management Console](https://console.aws.amazon.com/) and navigate to S3.
2.  Click **Create bucket**, accept all defaults, and finish the wizard.
3.  In your new bucket, click **Upload**, then drag and drop a few test files and folders. Any sample data will do.

![The image shows an AWS S3 upload interface on the left and a Windows File Explorer window on the right, displaying a list of files and folders.](https://kodekloud.com/kk-media/image/upload/v1752869248/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-Lifecycle-Policies/aws-s3-upload-windows-explorer.jpg)

4.  Open **Properties** for the bucket and confirm that the **Storage class** of your objects is **Standard**.

---

## 2\. Configure Lifecycle Rules

Navigate to the **Management** tab of your bucket and click **Create lifecycle rule**.

![The image shows an AWS S3 Management Console screen where lifecycle rules for objects are being configured, including options for filtering by prefix and object size, and setting lifecycle rule actions.](https://kodekloud.com/kk-media/image/upload/v1752869249/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-Lifecycle-Policies/aws-s3-lifecycle-rules-console.jpg)

You can define multiple rules to target different prefixes (`logs/`, `media/`) or object sizes.

### 2.1 Rule 1: lifecycle-logs

1.  **Rule name**: `lifecycle-logs`
2.  Under **Scope**, select **Limit the scope to specific prefixes or tags** and enter:
    - Prefix: `logs/`
3.  (Optional) Specify **Minimum size** or **Maximum size** filters.

#### Current Version Transitions

- After 30 days: transition to **S3 Standard-IA**
- After 60 days: transition to **S3 Glacier Instant Retrieval**

![The image shows an AWS S3 Management Console screen where lifecycle rules for transitioning object storage classes are being configured. It includes options for moving current versions of objects and setting transition actions after a specified number of days.](https://kodekloud.com/kk-media/image/upload/v1752869250/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-Lifecycle-Policies/aws-s3-lifecycle-rules-configuration.jpg)

#### Non-Current Version Transitions

- After 30 days: transition to **S3 Standard-IA**
- After 90 days: transition to **S3 Glacier Deep Archive**

![The image shows an AWS S3 management console screen where a lifecycle rule is being configured, including transitions to different storage classes and expiration actions for current and noncurrent object versions.](https://kodekloud.com/kk-media/image/upload/v1752869252/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-Lifecycle-Policies/aws-s3-lifecycle-rule-configuration.jpg)

Click **Create** to save **lifecycle-logs**.

### 2.2 Rule 2: lifecycle-media

1.  **Rule name**: `lifecycle-media`
2.  **Scope** → Prefix: `media/`
3.  **Current version transitions**:
    - After 60 days: transition to **S3 Standard-IA**
4.  **Non-current version actions**:
    - After 30 days: transition to **S3 Standard-IA**
    - After 365 days: **Expire** non-current versions

Click **Create** to save **lifecycle-media**.

---

## 3\. Review Your Lifecycle Configuration

Once both rules are enabled, the **Lifecycle configuration** page displays all active rules:

![The image shows the Amazon S3 Management Console with a "Lifecycle configuration" page, displaying two lifecycle rules named "lifecycle-logs" and "lifecycle-media," both enabled.](https://kodekloud.com/kk-media/image/upload/v1752869253/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-Lifecycle-Policies/amazon-s3-lifecycle-configuration-console.jpg)

> [!important]
> **Propagation Delay**
>
> It can take up to 24 hours for lifecycle policies to appear in the billing report and start transitions.

---

## Additional Resources

- [Amazon S3 Lifecycle Configuration](https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-configuration-examples.html)
- [Amazon S3 Storage Classes](https://aws.amazon.com/s3/storage-classes/)
- [AWS CLI: s3api put-bucket-lifecycle-configuration](https://docs.aws.amazon.com/cli/latest/reference/s3api/put-bucket-lifecycle-configuration.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/amazon-simple-storage-service-amazon-s3/module/64c3572f-57b6-4263-8818-9809392a98a1/lesson/77682aa3-f7e3-4302-b9c8-051304d00f80)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/amazon-simple-storage-service-amazon-s3/module/64c3572f-57b6-4263-8818-9809392a98a1/lesson/9587b4b8-26e8-4ac6-9340-822d178c1849)**
>
> Practice lab
