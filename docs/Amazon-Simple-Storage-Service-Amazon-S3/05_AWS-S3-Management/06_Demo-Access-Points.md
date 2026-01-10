# Demo Access Points - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Amazon-Simple-Storage-Service-Amazon-S3/AWS-S3-Management/Demo-Access-Points)

---

## Table of Contents

- Demo Access Points
  - Table of Contents
  - 1. Create a Demo Bucket
  - 2. Verify Default Access for Other Users
  - 3. Create Access Points
  - 4. Delegate Bucket Permissions to Access Points
  - 5. Define Access Point Policies
  - 6. Test Access via Access Points
  - 7. Final Permissions Overview
  - 8. Conclusion
  - 9. Links and References
  - Watch Video
    - 5.1 Developer Access Point Policy
    - 5.2 Finance Access Point Policy
    - Access Point Summary
    - 6.1 Developer (user2)
    - 6.2 Finance (user3)

---

## Content

Amazon Simple Storage Service (Amazon S3)

AWS S3 Management

# Demo Access Points

In this tutorial, you’ll learn how to use Amazon S3 Access Points to delegate and isolate access control for different teams. By the end, you will have configured two access points—one for developers and one for finance—each with its own fine-grained policy.

---

## Table of Contents

1.  [Create a Demo Bucket](#1-create-a-demo-bucket)
2.  [Verify Default Access for Other Users](#2-verify-default-access-for-other-users)
3.  [Create Access Points](#3-create-access-points)
4.  [Delegate Bucket Permissions to Access Points](#4-delegate-bucket-permissions-to-access-points)
5.  [Define Access Point Policies](#5-define-access-point-policies)
    - [5.1 Developer Access Point Policy](#51-developer-access-point-policy)
    - [5.2 Finance Access Point Policy](#52-finance-access-point-policy)
6.  [Test Access via Access Points](#6-test-access-via-access-points)
    - [6.1 Developer (user2)](#61-developer-user2)
    - [6.2 Finance (user3)](#62-finance-user3)
7.  [Final Permissions Overview](#7-final-permissions-overview)
8.  [Conclusion](#8-conclusion)
9.  [Links and References](#9-links-and-references)

---

## 1\. Create a Demo Bucket

First, set up a new S3 bucket named `kk-accesspoint` with the default settings. Then upload a sample file (`beach.jpg`) for testing.

![The image shows an AWS S3 console screen where a user is configuring settings for a new bucket, including versioning, tags, and default encryption options. The "Create bucket" button is highlighted at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752869367/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-Access-Points/aws-s3-console-create-bucket-settings.jpg)

Upload your test asset:

![The image shows an AWS S3 upload interface where a file named "beach.jpg" is being prepared for upload. The file is 2.7 MB in size, and the "Upload" button is highlighted.](https://kodekloud.com/kk-media/image/upload/v1752869368/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-Access-Points/aws-s3-upload-beach-file-interface.jpg)

Once uploaded, as the bucket owner (user1), you can view the object details:

![The image shows an Amazon S3 console page displaying details of an object named "beach.jpg," including its properties, S3 URI, and object URL. It also indicates that bucket versioning is disabled.](https://kodekloud.com/kk-media/image/upload/v1752869369/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-Access-Points/amazon-s3-console-beachjpg-properties.jpg)

> [!important]
> **Best Practice**
>
> Consider enabling versioning and default encryption on production buckets to protect against accidental data loss or unauthorized access.

---

## 2\. Verify Default Access for Other Users

Assume two IAM users—**user2** and **user3**—each have only CloudShell access. By default, neither can list or retrieve objects from your new bucket.

![The image shows the AWS Identity and Access Management (IAM) console, displaying a list of users with details such as last activity, password age, and active key age.](https://kodekloud.com/kk-media/image/upload/v1752869370/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-Access-Points/aws-iam-console-user-details.jpg)

![The image shows an AWS Identity and Access Management (IAM) console screen, displaying user permissions with the "AWSCloudShellFullAccess" policy attached. The console access is enabled without MFA, and no permissions boundary is set.](https://kodekloud.com/kk-media/image/upload/v1752869372/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-Access-Points/aws-iam-console-user-permissions-policy.jpg)

In AWS CloudShell, both users attempt to list and copy objects:

![The image shows the AWS Management Console with a search for "CloudShell," displaying services, resources, blogs, and documentation related to AWS CloudShell. The interface is dark-themed, and there are multiple tabs open in the browser.](https://kodekloud.com/kk-media/image/upload/v1752869373/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-Access-Points/aws-management-console-cloudshell-search-dark-theme.jpg)

```
# As user2
[cloudshell-user@ip-... ~]$ aws s3 ls s3://kk-accesspoint/
fatal error: An error occurred (AccessDenied) when calling the ListObjectsV2 operation: Access Denied
[cloudshell-user@ip-... ~]$ aws s3 cp s3://kk-accesspoint/beach.jpg .
fatal error: An error occurred (403) when calling the HeadObject operation: Forbidden


# As user3
[cloudshell-user@ip-... ~]$ aws s3 ls s3://kk-accesspoint/
fatal error: An error occurred (AccessDenied) when calling the ListObjectsV2 operation: Access Denied
[cloudshell-user@ip-... ~]$ aws s3 cp s3://kk-accesspoint/beach.jpg .
fatal error: An error occurred (403) when calling the HeadObject operation: Forbidden
```

---

## 3\. Create Access Points

Navigate to Amazon S3 → **Access points** and create two points:

1.  **developers** (for user2)
2.  **finance** (for user3)

Select **kk-accesspoint** as the data source, choose **Internet** for Network origin, and keep public access blocking enabled.

![The image shows an AWS S3 console interface for creating an access point, with fields for access point name, bucket selection, and network origin settings.](https://kodekloud.com/kk-media/image/upload/v1752869374/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-Access-Points/aws-s3-access-point-creation-interface.jpg)

![The image shows an AWS S3 Access Point configuration screen, where settings for bucket selection, AWS region, network origin, and public access blocking are being configured.](https://kodekloud.com/kk-media/image/upload/v1752869375/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-Access-Points/aws-s3-access-point-configuration.jpg)

> [!important]
> **Public Access**
>
> Always keep **Block all public access** enabled on buckets and access points to prevent accidental exposure.

---

## 4\. Delegate Bucket Permissions to Access Points

To let your access points list bucket contents, add this bucket policy. Replace `123456789012` with your AWS account ID:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::kk-accesspoint",
      "Condition": {
        "StringEquals": {
          "s3:DataAccessPointAccount": "123456789012"
        }
      }
    }
  ]
}
```

Apply under **Bucket → Permissions → Bucket policy**:

![The image shows an Amazon S3 console screen with the "Permissions" tab open for a bucket named "kk-access-point." It displays settings related to blocking public access and bucket policies.](https://kodekloud.com/kk-media/image/upload/v1752869377/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-Access-Points/amazon-s3-console-permissions-kk-access-point.jpg)

---

## 5\. Define Access Point Policies

### 5.1 Developer Access Point Policy

Go to **Access points → developers → Permissions → Edit** and paste:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::123456789012:user/user2"
      },
      "Action": [
        "s3:ListBucket",
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Resource": [
        "arn:aws:s3:us-east-1:123456789012:accesspoint/developers",
        "arn:aws:s3:us-east-1:123456789012:accesspoint/developers/object/*"
      ]
    }
  ]
}
```

![The image shows an AWS management console screen for editing an S3 Access Point policy, indicating that public access is blocked due to current settings. There are options to check and learn more about public access settings.](https://kodekloud.com/kk-media/image/upload/v1752869378/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-Access-Points/aws-s3-access-point-policy-settings.jpg)

### 5.2 Finance Access Point Policy

For **finance**, allow user3:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::123456789012:user/user3"
      },
      "Action": [
        "s3:ListBucket",
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Resource": [
        "arn:aws:s3:us-east-1:123456789012:accesspoint/finance",
        "arn:aws:s3:us-east-1:123456789012:accesspoint/finance/object/*"
      ]
    }
  ]
}
```

After saving, review each access point’s overview:

![The image shows an Amazon S3 Access Point overview page, displaying details such as bucket name, account ID, AWS region, creation date, and network origin.](https://kodekloud.com/kk-media/image/upload/v1752869378/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-Access-Points/amazon-s3-access-point-overview.jpg)

---

### Access Point Summary

| Access Point | Principal                              | Actions                    |
| ------------ | -------------------------------------- | -------------------------- |
| developers   | `arn:aws:iam::123456789012:user/user2` | List, GetObject, PutObject |
| finance      | `arn:aws:iam::123456789012:user/user3` | List, GetObject, PutObject |

---

## 6\. Test Access via Access Points

### 6.1 Developer (user2)

In AWS CloudShell as **user2**, list and copy via the developers access point ARN:

```
# List via developers access point
[cloudshell-user@... ~]$ aws s3 ls s3://arn:aws:s3:us-east-1:123456789012:accesspoint/developers
2023-09-04 07:39:25    2879314 beach.jpg


# Download the object
[cloudshell-user@... ~]$ aws s3 cp s3://arn:aws:s3:us-east-1:123456789012:accesspoint/developers/beach.jpg .
```

### 6.2 Finance (user3)

As **user3**, perform the same steps and upload a new file:

```
# List via finance access point
[cloudshell-user@... ~]$ aws s3 ls s3://arn:aws:s3:us-east-1:123456789012:accesspoint/finance
2023-09-04 07:39:25    2879314 beach.jpg


# Download the object
[cloudshell-user@... ~]$ aws s3 cp s3://arn:aws:s3:us-east-1:123456789012:accesspoint/finance/beach.jpg .


# Upload a test file
[cloudshell-user@... ~]$ touch test1
[cloudshell-user@... ~]$ aws s3 cp test1 s3://arn:aws:s3:us-east-1:123456789012:accesspoint/finance/test1


# Verify both files
[cloudshell-user@... ~]$ aws s3 ls s3://arn:aws:s3:us-east-1:123456789012:accesspoint/finance
2023-09-04 07:39:25    2879314 beach.jpg
2023-09-04 07:40:10         0 test1
```

---

## 7\. Final Permissions Overview

Inspect the finance access point’s permissions tab:

![The image shows an AWS S3 Access Point settings page, specifically the "Permissions" tab for an access point named "finance," with options to block public access enabled.](https://kodekloud.com/kk-media/image/upload/v1752869379/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Demo-Access-Points/aws-s3-access-point-permissions-finance.jpg)

---

## 8\. Conclusion

By leveraging S3 Access Points, you can:

- Delegate access control to distinct teams without modifying the main bucket policy.
- Create isolated entry points with tailored permissions.
- Simplify management when multiple user groups share a bucket.

This approach improves security posture and operational efficiency in multi-team environments.

---

## 9\. Links and References

- [Amazon S3 Access Points Documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-points.html)
- [AWS CloudShell User Guide](https://docs.aws.amazon.com/cloudshell/latest/userguide/welcome.html)
- [AWS IAM Best Practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/amazon-simple-storage-service-amazon-s3/module/985e08bc-a007-4d29-9e60-fe90b52410ae/lesson/9c50bd18-eb1f-4ba9-a66a-a04d05ec0ace)**
>
> Watch video content
