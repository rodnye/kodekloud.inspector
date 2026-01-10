# S3 Pres Signed URLs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Storage/S3-Pres-Signed-URLs)

---

## Table of Contents

- S3 Pres Signed URLs
  - Overview
  - Use Case 1: Video Streaming
  - Use Case 2: Direct File Uploads
  - Important Considerations
  - Summary
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Storage

# S3 Pres Signed URLs

In this article, we explore a powerful AWS feature—pre-signed URLs. We begin by outlining the problem they solve and then delve into practical use cases.

## Overview

Imagine you have an AWS account with a private S3 bucket that only authenticated IAM users can access. Although IAM users can retrieve or upload objects based on their permissions, sharing specific files with external users poses a challenge. Creating a new AWS account for every external user isn’t scalable, and making the bucket public would expose sensitive data. Pre-signed URLs address this dilemma.

By generating a pre-signed URL, an authenticated IAM user embeds their access credentials within the URL. This URL can be shared with a public user, permitting specific actions—such as downloading or uploading objects on the private bucket. When a request is made using the pre-signed URL, AWS S3 validates the embedded credentials and authorizes the action without exposing direct access to your account.

![The image illustrates the concept of pre-signed URLs in AWS, showing an AWS IAM user generating a pre-signed URL to allow a public user access to an AWS S3 bucket, while others are denied access.](https://kodekloud.com/kk-media/image/upload/v1752859770/notes-assets/images/AWS-Certified-Developer-Associate-S3-Pres-Signed-URLs/pre-signed-urls-aws-s3-access.jpg)

## Use Case 1: Video Streaming

Consider a video hosting platform similar to Netflix or any membership-based service. In this scenario, your web server manages thousands of gigabytes of video files, yet you store the files in S3 for scalability and cost efficiency.

When a paying customer requests to watch a video, your server generates a pre-signed URL on behalf of that customer. The URL contains the credentials of a specific IAM user (for instance, user X) and is returned to the customer. AWS S3 then processes the request as if it came from user X, allowing secure access to the private video content.

![The image illustrates a pre-signed URL use case involving AWS Cloud, showing a user interacting with cloud storage and a bucket containing a file.](https://kodekloud.com/kk-media/image/upload/v1752859771/notes-assets/images/AWS-Certified-Developer-Associate-S3-Pres-Signed-URLs/aws-cloud-presigned-url-use-case.jpg)

> [!important]
> **Note**
>
> This approach ensures that only authorized, paying customers can stream the content, while access remains restricted for others.

## Use Case 2: Direct File Uploads

Pre-signed URLs simplify not only file retrieval but also file uploads. For example, when updating a profile picture on a website, you traditionally upload the image to an API running on an EC2 instance, which then transfers the file to an S3 bucket.

With pre-signed URLs, your API can generate a URL that allows the file to be uploaded directly to S3. This method bypasses the API server, reducing server load and potentially accelerating the upload process.

![The image illustrates a process involving pre-signed URLs in AWS Cloud, showing a user interacting with cloud services and storage. A note mentions that all files must traverse through back-end servers.](https://kodekloud.com/kk-media/image/upload/v1752859772/notes-assets/images/AWS-Certified-Developer-Associate-S3-Pres-Signed-URLs/aws-pre-signed-urls-process.jpg)

## Important Considerations

When generating a pre-signed URL, always specify an expiration time. These URLs are only valid for a limited duration, with a maximum expiration time of seven days when using IAM credentials. This limitation helps ensure temporary and controlled access.

It is crucial to understand that a pre-signed URL does not grant additional permissions beyond those already associated with the generating IAM user. If the IAM user lacks access to a specific object in the S3 bucket, any pre-signed URL they create will also be unable to access that object.

![The image contains a note about pre-signed URLs, explaining their expiration requirements and usage with IAM users for accessing S3 buckets.](https://kodekloud.com/kk-media/image/upload/v1752859773/notes-assets/images/AWS-Certified-Developer-Associate-S3-Pres-Signed-URLs/pre-signed-urls-expiration-iam-s3.jpg)

To illustrate, consider a case where a user without proper S3 bucket access generates a pre-signed URL. Any request made using that URL will be denied since the embedded credentials do not authorize access.

![The image illustrates the concept of pre-signed URLs, showing an IAM user without access to an S3 bucket using a pre-signed URL to gain access.](https://kodekloud.com/kk-media/image/upload/v1752859774/notes-assets/images/AWS-Certified-Developer-Associate-S3-Pres-Signed-URLs/pre-signed-urls-iam-user-access.jpg)

> [!important]
> **Warning**
>
> Always verify that the IAM credentials used to generate pre-signed URLs have the necessary permissions, as the URL will only allow actions permitted by those credentials.

## Summary

Pre-signed URLs in AWS offer a secure, time-limited way to grant specific permissions (such as downloading or uploading objects) to private S3 buckets. The AWS API uses the embedded credentials from the pre-signed URL to process requests. Consequently, if the generating IAM user lacks permission for a target object, the pre-signed URL will not succeed in granting access.

![The image is a summary about pre-signed URLs, explaining their use for granting time-limited permissions, how they work with AWS API, and access limitations.](https://kodekloud.com/kk-media/image/upload/v1752859776/notes-assets/images/AWS-Certified-Developer-Associate-S3-Pres-Signed-URLs/pre-signed-urls-summary-aws-api.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/e8ae2293-e16b-42d3-b32b-5c260a1f1e5d/lesson/6692ab4a-597f-426a-a539-2fff970bd417)**
>
> Watch video content
