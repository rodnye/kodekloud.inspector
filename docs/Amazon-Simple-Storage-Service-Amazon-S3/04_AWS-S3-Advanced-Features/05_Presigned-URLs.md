# Presigned URLs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Amazon-Simple-Storage-Service-Amazon-S3/AWS-S3-Advanced-Features/Presigned-URLs)

---

## Table of Contents

- Presigned URLs
  - Why Use Pre-Signed URLs?
  - How Pre-Signed URLs Work
  - Use Case: Secure Video Streaming
  - Use Case: Direct Client Uploads
  - Expiration and Permissions
  - References
  - Watch Video

---

## Content

Amazon Simple Storage Service (Amazon S3)

AWS S3 Advanced Features

# Presigned URLs

Pre-signed URLs are a powerful Amazon S3 feature that let you grant time-limited access to private objects without sharing AWS credentials. By embedding your IAM user’s credentials and permissions into a URL, you can allow third parties to download or upload files directly to your S3 bucket. This approach keeps your bucket private and eliminates the need to proxy large files through your backend.

## Why Use Pre-Signed URLs?

Imagine you have a private S3 bucket managed by an IAM-authenticated user. That user can list, upload, and download objects, but external (public) users cannot:

![The image illustrates the concept of AWS pre-signed URLs, showing that an AWS IAM user can access an S3 bucket, while a public user cannot.](https://kodekloud.com/kk-media/image/upload/v1752869218/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Presigned-URLs/aws-pre-signed-urls-iam-access.jpg)

Two common—but suboptimal—alternatives are:

- Creating an AWS account for every external user (not scalable)
- Making the bucket public (exposes all objects)

![The image illustrates the concept of pre-signed URLs in AWS, showing an AWS IAM user with access to an S3 bucket, while a public user is denied access.](https://kodekloud.com/kk-media/image/upload/v1752869219/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Presigned-URLs/pre-signed-urls-aws-iam-s3.jpg)

Instead, generate a pre-signed URL that allows the public user to perform a single action (GET or PUT) before it expires. S3 processes the request as if it came from your IAM user.

## How Pre-Signed URLs Work

1.  **Generate URL**: Your backend calls the S3 API to create a pre-signed URL, specifying the bucket, object key, operation (`get_object` or `put_object`), and expiration.
2.  **Share URL**: Send the URL to the client (public user).
3.  **Perform Action**: The client uses the URL to upload or download directly from S3.
4.  **Automatic Validation**: S3 verifies the signature, ensures the URL hasn’t expired, and checks permissions.

## Use Case: Secure Video Streaming

A streaming service stores videos in S3. When a paying customer requests a video, the backend issues a pre-signed GET URL so the client can stream directly from S3:

![The image illustrates a pre-signed URL use case involving AWS Cloud, showing a user accessing a storage bucket while others are denied access.](https://kodekloud.com/kk-media/image/upload/v1752869220/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Presigned-URLs/aws-pre-signed-url-use-case.jpg)

```
import boto3
from botocore.exceptions import ClientError


def create_presigned_get_url(bucket_name, object_key, expiration=3600):
    s3 = boto3.client('s3')
    try:
        return s3.generate_presigned_url(
            'get_object',
            Params={'Bucket': bucket_name, 'Key': object_key},
            ExpiresIn=expiration
        )
    except ClientError as e:
        print(f"Error generating GET URL: {e}")
        return None


# Example usage
url = create_presigned_get_url(
    bucket_name='my-video-bucket',
    object_key='videos/movie.mp4',
    expiration=600
)
print(url)
```

## Use Case: Direct Client Uploads

By default, clients upload files through your backend (EC2), which consumes bandwidth and CPU:

![The image illustrates a process involving pre-signed URLs in AWS Cloud, showing a user interacting with cloud services and storage. A note mentions that all files must traverse through back-end servers.](https://kodekloud.com/kk-media/image/upload/v1752869221/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Presigned-URLs/aws-cloud-presigned-urls-process-diagram.jpg)

With a pre-signed PUT URL, clients upload directly to S3:

```
import boto3
from botocore.exceptions import ClientError


def create_presigned_put_url(bucket_name, object_key, expiration=3600):
    s3 = boto3.client('s3')
    try:
        return s3.generate_presigned_url(
            'put_object',
            Params={'Bucket': bucket_name, 'Key': object_key},
            ExpiresIn=expiration
        )
    except ClientError as e:
        print(f"Error generating PUT URL: {e}")
        return None


# Example usage
url = create_presigned_put_url(
    bucket_name='my-bucket',
    object_key='uploads/profile-pic.png',
    expiration=300
)
print(url)
```

> [!important]
> **Note**
>
> Bypassing your backend for large file uploads reduces latency and operational costs.

## Expiration and Permissions

Every pre-signed URL requires an expiration time. For IAM user credentials, the maximum is 7 days (604,800 seconds). Always choose the shortest practical duration.

![The image provides information about pre-signed URLs, noting that an expiration date is required, with a maximum duration of 7 days using an IAM user, and that a pre-signed URL can be generated even if an IAM user lacks access to an S3 bucket.](https://kodekloud.com/kk-media/image/upload/v1752869222/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Presigned-URLs/presigned-urls-expiration-iam-s3.jpg)

| Operation     | Required Permission | Max Expiration |
| ------------- | ------------------- | -------------- |
| get\\\_object | s3:GetObject        | 7 days         |
| put\\\_object | s3:PutObject        | 7 days         |

Even if an IAM user lacks direct access to the bucket, they can still generate a pre-signed URL. S3 will enforce the embedded permissions:

![The image illustrates the concept of pre-signed URLs, showing how an IAM user without direct access to an S3 bucket can use a pre-signed URL to gain temporary access.](https://kodekloud.com/kk-media/image/upload/v1752869223/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Presigned-URLs/pre-signed-urls-iam-user-access.jpg)

> [!important]
> **Warning**
>
> A pre-signed URL grants the specified action to anyone holding it. Never expose URLs in public repos or client-side code that can be easily inspected.

## References

- [Amazon S3 Pre-Signed URLs](https://docs.aws.amazon.com/AmazonS3/latest/userguide/ShareObjectPreSignedURL.html)
- [Boto3 S3 Client](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html)
- [AWS Security Best Practices](https://docs.aws.amazon.com/whitepapers/latest/aws-security-best-practices/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/amazon-simple-storage-service-amazon-s3/module/90fd6d76-d0d4-481c-b267-b9247a005a6e/lesson/60e19d1d-0788-4a36-ac63-21ee0f7a2f70)**
>
> Watch video content
