# Demo S3 Object Lock - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Amazon-Simple-Storage-Service-Amazon-S3/AWS-S3-Management/Demo-S3-Object-Lock)

---

## Table of Contents

- Demo S3 Object Lock
  - Table of Contents
  - What You’ll Learn
  - 1. Create an S3 Bucket with Object Lock
  - 2. Upload an Object
  - 3. Configure Object Lock Retention
  - 4. Test Deletion with a Restricted IAM User
  - 5. Delete with an Admin User
  - 6. Demonstrate Object Legal Hold
  - 7. Deny Legal Hold Removal
  - Summary
  - References
  - Watch Video
  - Practice Lab

---

## Content

Amazon Simple Storage Service (Amazon S3)

AWS S3 Management

# Demo S3 Object Lock

Learn how to enable and enforce Object Lock on Amazon S3 buckets, apply governance and compliance retention modes, and verify access restrictions using IAM policies.

## Table of Contents

1.  [What You’ll Learn](#what-youll-learn)
2.  [1\. Create an S3 Bucket with Object Lock](#1-create-an-s3-bucket-with-object-lock)
3.  [2\. Upload an Object](#2-upload-an-object)
4.  [3\. Configure Object Lock Retention](#3-configure-object-lock-retention)
5.  [4\. Test Deletion with a Restricted IAM User](#4-test-deletion-with-a-restricted-iam-user)
6.  [5\. Delete with an Admin User](#5-delete-with-an-admin-user)
7.  [6\. Demonstrate Object Legal Hold](#6-demonstrate-object-legal-hold)
8.  [7\. Deny Legal Hold Removal](#7-deny-legal-hold-removal)
9.  [Summary](#summary)
10. [References](#references)

---

## What You’ll Learn

- How to enable Object Lock on an S3 bucket
- The difference between Governance and Compliance retention modes
- Applying and testing IAM policies that enforce or bypass retention settings
- Using Object Legal Hold for indefinite protection

---

## 1\. Create an S3 Bucket with Object Lock

1.  In the AWS S3 console, click **Create bucket**.
2.  Under **Advanced settings**, check **Enable Object Lock**.

![The image shows an AWS S3 bucket configuration page with options for default encryption and advanced settings, including Object Lock.](https://kodekloud.com/kk-media/image/upload/v1752869380/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-S3-Object-Lock/aws-s3-bucket-configuration-page.jpg)

> [!important]
> **Note**
>
> Object Lock requires versioning. When you enable Object Lock, S3 automatically enables versioning for the bucket (the Versioning option is grayed out).

---

## 2\. Upload an Object

Upload a test file, for example `file1.txt`, to your new bucket:

1.  Click **Upload**.
2.  Select `file1.txt`.
3.  Confirm and upload.

![The image shows an AWS S3 Management Console screen where a file named "file1.txt" is being prepared for upload to a bucket named "kk-objectclock-demo." The file is 7.0 bytes in size and is of type "text/plain."](https://kodekloud.com/kk-media/image/upload/v1752869381/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-S3-Object-Lock/aws-s3-console-file-upload-kk-objectclock.jpg)

After upload, open the object’s **Properties** to configure Object Lock.

---

## 3\. Configure Object Lock Retention

In the object’s **Object Lock** section you can choose:

- **Legal Hold**: Indefinite hold without a retention date.
- **Retention Mode**: Specify Governance or Compliance mode and a retention date.

| Retention Mode  | Bypass Permission Required     | Use Case                          |
| --------------- | ------------------------------ | --------------------------------- |
| Governance Mode | `s3:BypassGovernanceRetention` | Temporary holds with exception    |
| Compliance Mode | Not bypassable                 | Regulatory or compliance mandates |

![The image shows an Amazon S3 interface for editing object lock retention settings, with options for retention mode and a warning about governance mode. A specified object, "file1.txt," is listed below with details.](https://kodekloud.com/kk-media/image/upload/v1752869382/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-S3-Object-Lock/amazon-s3-object-lock-settings-file1.jpg)

1.  Select **Governance** mode.
2.  Set the retention date (e.g., tomorrow).
3.  Click **Save**.

> [!important]
> **Warning**
>
> In Compliance mode, objects cannot be deleted or overwritten until the retention period expires.

---

## 4\. Test Deletion with a Restricted IAM User

Switch to **User Two**, who has a policy denying `s3:BypassGovernanceRetention`. They have full S3 access but cannot bypass governance locks:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DenyBypassGovernanceRetention",
      "Effect": "Deny",
      "Action": "s3:BypassGovernanceRetention",
      "Resource": "*"
    }
  ]
}
```

When User Two tries to delete the locked object version, the request fails:

![The image shows an AWS S3 console screen with a "Failed to delete objects" error message, indicating an object could not be deleted due to access denial.](https://kodekloud.com/kk-media/image/upload/v1752869383/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-S3-Object-Lock/aws-s3-failed-delete-objects-error.jpg)

User Two also cannot modify retention settings.

---

## 5\. Delete with an Admin User

Switch back to **User One** (Administrator) with full permissions, including `s3:BypassGovernanceRetention`:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "*",
      "Resource": "*"
    }
  ]
}
```

User One can now permanently delete the locked object version.

---

## 6\. Demonstrate Object Legal Hold

1.  Upload a second file, e.g., `file2.txt`.
2.  Open its **Properties** and scroll to **Object Lock**.
3.  Enable **Legal Hold**, then **Save**.

![The image shows an Amazon S3 console interface displaying details of an object, including the owner, AWS region, last modified date, size, and object URL.](https://kodekloud.com/kk-media/image/upload/v1752869384/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-S3-Object-Lock/amazon-s3-console-file1-details.jpg)

The object is now held indefinitely under Legal Hold.

---

## 7\. Deny Legal Hold Removal

Update **User Two**’s policy to also deny `s3:PutObjectLegalHold`, preventing removal of legal holds:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DenyLegalHoldAndBypass",
      "Effect": "Deny",
      "Action": [
        "s3:PutObjectLegalHold",
        "s3:BypassGovernanceRetention"
      ],
      "Resource": "*"
    }
  ]
}
```

Now, when User Two tries to disable the legal hold, they see a permission error:

![The image shows an AWS S3 console screen where a user is attempting to edit an Object Lock legal hold but receives a permission error message.](https://kodekloud.com/kk-media/image/upload/v1752869385/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-S3-Object-Lock/aws-s3-console-object-lock-error.jpg)

Only users with the correct permissions (e.g., User One) can remove a legal hold.

---

## Summary

In this lesson, you’ve learned to:

- Enable Object Lock on an S3 bucket
- Apply Governance and Compliance retention modes
- Test deletion restrictions with IAM policies
- Use Object Legal Hold for indefinite protection

---

## References

- [AWS S3 Object Lock Documentation](https://docs.aws.amazon.com/AmazonS3/latest/dev/object-lock.html)
- [IAM JSON Policy Reference](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements.html)
- [Amazon S3 Versioning](https://docs.aws.amazon.com/AmazonS3/latest/dev/Versioning.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/amazon-simple-storage-service-amazon-s3/module/985e08bc-a007-4d29-9e60-fe90b52410ae/lesson/cfd3e010-0bcb-4d83-aad1-24c5b426cb78)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/amazon-simple-storage-service-amazon-s3/module/985e08bc-a007-4d29-9e60-fe90b52410ae/lesson/ba19ff43-cdc2-4c39-9fbe-9fcfd739467e)**
>
> Practice lab
