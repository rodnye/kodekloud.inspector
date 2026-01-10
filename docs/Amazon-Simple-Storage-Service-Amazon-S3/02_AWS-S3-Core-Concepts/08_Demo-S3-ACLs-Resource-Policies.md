# Demo S3 ACLs Resource Policies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Amazon-Simple-Storage-Service-Amazon-S3/AWS-S3-Core-Concepts/Demo-S3-ACLs-Resource-Policies)

---

## Table of Contents

- Demo S3 ACLs Resource Policies
  - Test Environment
  - 1. Create the S3 Bucket (User 1)
  - 2. Baseline IAM Permissions for User 2
  - 3. Grant User 2 Read Access to logs/
  - 4. Grant User 2 Delete Access in traces/
  - 5. Combining Multiple Actions
  - 6. Allow Public Read Access to media/
  - 7. Grant Cross-Account Access (Account 2)
  - Summary
  - Links and References
  - Watch Video
    - Test Read Access

---

## Content

Amazon Simple Storage Service (Amazon S3)

AWS S3 Core Concepts

# Demo S3 ACLs Resource Policies

In this guide, you’ll learn how to use AWS S3 bucket policies (resource policies) to grant or restrict access for:

1.  Users in the same AWS account
2.  Anonymous (public) users
3.  Users in a different AWS account

You’ll simulate three users using browser tabs with colored labels:

- **Blue**: Account 1, User 1 (Bucket Owner)
- **Green**: Account 1, User 2
- **Yellow**: Account 2, User Admin

Switch among these tabs to verify permissions.

---

## Test Environment

| Tab Color | AWS Account | IAM Identity   | Purpose                     |
| --------- | ----------- | -------------- | --------------------------- |
| Blue      | Account 1   | User 1 (owner) | Create bucket & edit policy |
| Green     | Account 1   | User 2         | Test limited access         |
| Yellow    | Account 2   | User Admin     | Test cross-account access   |

---

## 1\. Create the S3 Bucket (User 1)

1.  In the **Blue** tab, open the [AWS S3 Console](https://console.aws.amazon.com/s3/).
2.  Click **Create bucket** and configure:
    - Bucket name: `kk-resource-policies`
    - Region: your choice
    - Object Ownership: Bucket owner preferred
    - Block all public access: **Enabled**
    - Versioning: **Disabled**

![The image shows an AWS S3 bucket creation page, where settings like bucket name, region, object ownership, and public access are configured.](https://kodekloud.com/kk-media/image/upload/v1752869304/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-S3-ACLs-Resource-Policies/aws-s3-bucket-creation-settings.jpg)

3.  Confirm creation.

![The image shows an AWS S3 Management Console with a notification indicating a bucket named "kk-resource-policies" has been successfully created. The console displays details about the bucket, including its region and access status.](https://kodekloud.com/kk-media/image/upload/v1752869308/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-S3-ACLs-Resource-Policies/aws-s3-console-bucket-created-notification.jpg)

4.  Upload a set of files (e.g., text & log files).

![The image shows an AWS S3 Management Console with a successful upload status for 13 files, totaling 7.0 B, all marked as succeeded.](https://kodekloud.com/kk-media/image/upload/v1752869309/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-S3-ACLs-Resource-Policies/aws-s3-management-console-upload-success.jpg)

5.  Verify all objects are listed:

![The image shows an Amazon S3 bucket interface with a list of files and folders, including text files and directories, along with their details like type, last modified date, and size.](https://kodekloud.com/kk-media/image/upload/v1752869310/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-S3-ACLs-Resource-Policies/amazon-s3-bucket-interface-files-list.jpg)

By default, as the bucket owner:

- Listing and “Open” via console (authenticated) works.
- Public URL returns **AccessDenied**:

```
<Error>
  <Code>AccessDenied</Code>
  <Message>Access Denied</Message>
  <RequestId>12SIDZRCRIXS94G00</RequestId>
  <HostId>…</HostId>
</Error>
```

---

## 2\. Baseline IAM Permissions for User 2

Switch to the **Green** tab. User 2 currently has only list permissions:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ListBucketsOnly",
      "Effect": "Allow",
      "Action": [
        "s3:ListAllMyBuckets",
        "s3:ListBucket"
      ],
      "Resource": "*"
    }
  ]
}
```

User 2 can list buckets and objects but **cannot** read or delete data. Opening `file1.txt` returns **AccessDenied**.

---

## 3\. Grant User 2 Read Access to logs/

Return to **Blue** (User 1) and edit the bucket policy under **Permissions** → **Bucket Policy**. Add:

```
{
  "Sid": "User2AllowLogs",
  "Effect": "Allow",
  "Principal": {
    "AWS": "arn:aws:iam::<YOUR_ACCOUNT_ID>:user/user2"
  },
  "Action": "s3:GetObject",
  "Resource": "arn:aws:s3:::kk-resource-policies/logs/*"
}
```

Save the policy.

### Test Read Access

In **Green**, open `logs/log1` → download succeeds.

![The image shows an Amazon S3 management console displaying details of an object named "log1" within a bucket. It includes information such as the owner, region, last modified date, and object URL, along with a notification about bucket versioning permissions.](https://kodekloud.com/kk-media/image/upload/v1752869312/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-S3-ACLs-Resource-Policies/amazon-s3-console-log1-details.jpg)

Attempting to open `file1.txt` (outside `logs/`) still yields **AccessDenied**:

```
<Error>
  <Code>AccessDenied</Code>
  <Message>Access Denied</Message>
  …
</Error>
```

---

## 4\. Grant User 2 Delete Access in traces/

Back in **Blue**, append another statement:

```
{
  "Sid": "User2AllowDeleteTraces",
  "Effect": "Allow",
  "Principal": {
    "AWS": "arn:aws:iam::<YOUR_ACCOUNT_ID>:user/user2"
  },
  "Action": "s3:DeleteObject",
  "Resource": "arn:aws:s3:::kk-resource-policies/traces/*"
}
```

Save and switch to **Green**:

- Deleting `traces/trace1` → **Success**
- Deleting `file1.txt` → **AccessDenied**

![The image shows an AWS S3 console screen with a "Failed to delete objects" error message, indicating a permission issue with deleting a file named "file1.txt".](https://kodekloud.com/kk-media/image/upload/v1752869313/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-S3-ACLs-Resource-Policies/aws-s3-failed-delete-permission-error.jpg)

---

## 5\. Combining Multiple Actions

You can merge permissions when they apply to the same resource path:

```
{
  "Sid": "User2GetAndDeleteLogs",
  "Effect": "Allow",
  "Principal": {
    "AWS": "arn:aws:iam::<YOUR_ACCOUNT_ID>:user/user2"
  },
  "Action": [
    "s3:GetObject",
    "s3:DeleteObject"
  ],
  "Resource": "arn:aws:s3:::kk-resource-policies/logs/*"
}
```

> [!important]
> **Note**
>
> Ensure that all listed actions in one statement target the same ARN pattern.

---

## 6\. Allow Public Read Access to media/

To expose only the `media/` prefix publicly:

1.  In **Permissions**, disable “Block public access” (if enforced).
2.  Add:

```
{
  "Sid": "AllowPublicMedia",
  "Effect": "Allow",
  "Principal": "*",
  "Action": "s3:GetObject",
  "Resource": "arn:aws:s3:::kk-resource-policies/media/*"
}
```

After saving, any object under `media/` is publicly readable.

![The image shows an Amazon S3 console displaying details of a file named "file1.txt," including its properties, size, and object URL. It also highlights that bucket versioning is disabled.](https://kodekloud.com/kk-media/image/upload/v1752869314/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-S3-ACLs-Resource-Policies/amazon-s3-file1txt-properties-versioning-disabled.jpg)

---

## 7\. Grant Cross-Account Access (Account 2)

In **Yellow** (Account 2, User Admin), test listing:

```
aws s3 ls s3://kk-resource-policies
# → An error occurred (AccessDenied)
```

Back in **Blue**, append:

```
{
  "Sid": "AllowAccount2UserAdmin",
  "Effect": "Allow",
  "Principal": {
    "AWS": "arn:aws:iam::<SECOND_ACCOUNT_ID>:user/admin"
  },
  "Action": [
    "s3:ListBucket",
    "s3:GetObject"
  ],
  "Resource": [
    "arn:aws:s3:::kk-resource-policies",
    "arn:aws:s3:::kk-resource-policies/logs/*"
  ]
}
```

Save and retry in **Yellow**:

```
aws s3 ls s3://kk-resource-policies
aws s3 rm s3://kk-resource-policies/file1.txt
aws s3 rm s3://kk-resource-policies/logs/log1
# delete: s3://kk-resource-policies/logs/log1
```

---

## Summary

You’ve now configured a private S3 bucket and applied these resource policy patterns:

| Scenario                  | Principal                       | Actions                           | Resource                        |
| ------------------------- | ------------------------------- | --------------------------------- | ------------------------------- |
| Read-only for User 2      | `arn:aws:iam::Acct1:user/user2` | `s3:GetObject`                    | `kk-resource-policies/logs/*`   |
| Delete for User 2         | `arn:aws:iam::Acct1:user/user2` | `s3:DeleteObject`                 | `kk-resource-policies/traces/*` |
| Combined read & delete    | Same as above                   | `s3:GetObject`, `s3:DeleteObject` | `kk-resource-policies/logs/*`   |
| Public read on media/     | `*`                             | `s3:GetObject`                    | `kk-resource-policies/media/*`  |
| Cross-account list & read | `arn:aws:iam::Acct2:user/admin` | `s3:ListBucket`, `s3:GetObject`   | Bucket & `logs/*`               |

With these techniques—granular read, delete, public, and cross-account—you can enforce precise access control over your S3 data.

---

## Links and References

- [AWS S3 Bucket Policies](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-iam-policies.html)
- [AWS IAM JSON Policy Elements](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements.html)
- [AWS Security Best Practices for S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/security-best-practices.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/amazon-simple-storage-service-amazon-s3/module/eec05698-c022-44e4-9421-cf157eb32097/lesson/1048de03-7dc7-4beb-8248-f0a6bd8113d2)**
>
> Watch video content
