# S3 Pres Signed URLs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Storage/S3-Pres-Signed-URLs)

---

## Table of Contents

- S3 Pres Signed URLs
  - Motivation and Use Case
  - How Pre-Signed URLs Work
  - Real-World Use Case: Video Streaming
  - Pre-Signed URLs for Uploads
  - Expiration and Permissions
  - Summary
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Storage

# S3 Pres Signed URLs

This article explores a powerful AWS S3 feature called pre-signed URLs and explains how they provide secure, time-limited access to private S3 objects.

## Motivation and Use Case

Imagine you have an AWS account with a private S3 bucket. As an authenticated IAM user with the necessary permissions, you can retrieve or upload objects to that bucket. However, if you need to share a specific file with someone who does not have an AWS account, the bucket's private settings prevent public access.

![The image illustrates the concept of pre-signed URLs in AWS, showing that an AWS IAM user can access an S3 bucket, while a public user cannot.](https://kodekloud.com/kk-media/image/upload/v1752866064/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Pres-Signed-URLs/pre-signed-urls-aws-iam-s3.jpg)

There are a couple of approaches to manage this situation:

1.  Provide the public user with AWS account credentials. This approach is not scalable, particularly in an organizational context.
2.  Make the bucket public, which exposes all files to everyone—a clearly undesired outcome if you only wish to share select files.

This is where pre-signed URLs shine. They allow you to grant temporary, secured access to a private S3 bucket on a per-user basis by embedding your authentication credentials directly into the URL.

## How Pre-Signed URLs Work

Even though your S3 bucket remains private, you as an authenticated IAM user can generate a pre-signed URL using an API call to S3. The URL incorporates your full credentials, making S3 believe the request is coming from you. Sharing this URL with a public user enables them to access the specific object without opening up your entire bucket.

![The image illustrates the concept of pre-signed URLs in AWS, showing an AWS IAM user with access to an S3 bucket, while a public user is denied access.](https://kodekloud.com/kk-media/image/upload/v1752866066/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Pres-Signed-URLs/pre-signed-urls-aws-iam-s3-2.jpg)

> [!important]
> **Key Insight**
>
> Only the holder of the pre-signed URL can access the specific content, based on the embedded credentials. Unintended access is prevented, ensuring secure sharing.

## Real-World Use Case: Video Streaming

Consider a video hosting website similar to Netflix, where a vast library of videos is stored in an S3 bucket. Instead of hosting videos on a web server, you can significantly reduce server load and storage costs by leveraging S3.

When a paying customer requests a video, the server generates a unique pre-signed URL for that particular video (for instance, tied to UserX) and returns it to the customer. S3 then processes the request using the permissions of UserX, enabling the video to be streamed directly. Conversely, non-paying or unauthenticated users cannot access these videos because they do not receive a valid pre-signed URL.

![The image illustrates a pre-signed URL use case involving AWS Cloud, showing a user interacting with cloud services and an S3 bucket.](https://kodekloud.com/kk-media/image/upload/v1752866067/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Pres-Signed-URLs/aws-cloud-presigned-url-use-case.jpg)

## Pre-Signed URLs for Uploads

Pre-signed URLs are not limited to downloads; they are equally effective for uploads. For example, when users update their profile pictures on a website, traditionally the image would be sent to an API hosted on an EC2 instance, which then forwards the file to the S3 bucket, increasing backend load.

Using a pre-signed URL, the workflow simplifies: once the API server generates and returns the URL, the user uploads the file directly to S3. This approach bypasses the backend server, thereby reducing load and improving performance.

## Expiration and Permissions

When creating a pre-signed URL, you must specify an expiration time to limit its validity. Typically, when using an IAM user's credentials, the maximum expiration period is seven days. This duration can be adjusted based on the requirements of your application.

![The image provides information about pre-signed URLs, highlighting the need for an expiration date, a maximum duration of 7 days, and the ability to generate URLs without S3 bucket access.](https://kodekloud.com/kk-media/image/upload/v1752866068/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Pres-Signed-URLs/presigned-urls-expiration-7-days.jpg)

> [!important]
> **Important**
>
> Remember, a pre-signed URL does not grant new permissions. It merely allows a request to be executed using the IAM user's current permissions. If the user lacks access to a particular object, then any pre-signed URL they generate will also fail to access it.

![The image illustrates the concept of pre-signed URLs, showing how an IAM user without direct access to an S3 bucket can use a pre-signed URL to gain temporary access.](https://kodekloud.com/kk-media/image/upload/v1752866069/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Pres-Signed-URLs/pre-signed-urls-iam-user-access.jpg)

## Summary

Pre-signed URLs offer secure, time-limited access to objects within a private S3 bucket by embedding authentication credentials into the URL. When the URL is accessed, the request is executed using the permissions of the IAM user who originally generated it. If that user lacks access to a specific object, the URL will also be invalid for accessing that object.

![The image is a summary slide explaining pre-signed URLs, highlighting their use of security credentials for time-limited access, the identity association with AWS API requests, and access limitations based on the creator's permissions.](https://kodekloud.com/kk-media/image/upload/v1752866070/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Pres-Signed-URLs/presigned-urls-security-summary.jpg)

Understanding these concepts is essential for integrating pre-signed URLs into your AWS architecture, whether you're handling secure downloads or enabling direct-to-S3 uploads.

---

For further information on AWS S3 and related topics, consider exploring:

- [AWS S3 Documentation](https://aws.amazon.com/documentation/s3/)
- [AWS Security Best Practices](https://aws.amazon.com/architecture/security/)
- [Understanding IAM Policies](https://aws.amazon.com/iam/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/23e00d1f-6422-4fef-a9bf-e8f007be5514/lesson/fede5b1f-8943-4ae0-b5a0-32bbec541768)**
>
> Watch video content
