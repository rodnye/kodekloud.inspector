# S3 Pres Signed URLs Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Storage/S3-Pres-Signed-URLs-Demo)

---

## Table of Contents

- S3 Pres Signed URLs Demo
  - Creating and Configuring the Bucket
  - Uploading an Object and Testing Access
  - Generating a Pre-Signed URL
  - User Permissions and Pre-Signed URLs
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

AWS Certified Developer - Associate

Storage

# S3 Pres Signed URLs Demo

In this lesson, we will demonstrate how to generate and use pre-signed URLs with Amazon S3. Pre-signed URLs allow you to grant temporary access to a private S3 object without making it publicly accessible, ensuring your data remains secure while being easily shareable.

## Creating and Configuring the Bucket

Begin by creating a new S3 bucket. During the bucket creation process, the default settings are maintained, including the configuration that blocks public access. This setting ensures that only authorized users (the root user and those with specific permissions) can access the bucket.

![The image shows an Amazon Web Services (AWS) S3 console screen with settings for blocking public access to a bucket, including options for access control lists and bucket versioning.](https://kodekloud.com/kk-media/image/upload/v1752859766/notes-assets/images/AWS-Certified-Developer-Associate-S3-Pres-Signed-URLs-Demo/aws-s3-console-block-public-access.jpg)

![The image shows an Amazon S3 console with a bucket named "kk-presigned-demo" created in the US East (N. Virginia) region. The bucket and objects are not public, and the creation date is April 6, 2023.](https://kodekloud.com/kk-media/image/upload/v1752859766/notes-assets/images/AWS-Certified-Developer-Associate-S3-Pres-Signed-URLs-Demo/amazon-s3-kk-presigned-demo-bucket.jpg)

> [!important]
> **Note**
>
> Leaving public access blocked by default protects your data from unauthorized access.

## Uploading an Object and Testing Access

After creating the bucket, navigate to your "pre-signed demo" bucket and upload an object—for example, an image. When an authenticated user accesses the object, it loads as expected. However, if an unauthenticated (public) user attempts to access the object, they will encounter an "Access Denied" error due to the strict bucket permissions.

![The image shows an Amazon S3 console interface displaying details of an object named "boat.jpg," including its size, type, and URLs. It also includes information about bucket properties and management configurations.](https://kodekloud.com/kk-media/image/upload/v1752859767/notes-assets/images/AWS-Certified-Developer-Associate-S3-Pres-Signed-URLs-Demo/amazon-s3-console-boatjpg-details.jpg)

The bucket permissions confirm that public access is blocked, and no policy exists to allow anonymous users.

## Generating a Pre-Signed URL

To share an image with someone who does not have an AWS account, you can generate a pre-signed URL instead of making the object public. Follow these steps:

1.  Open the object in the S3 console.
2.  Click the "Share with a pre-signed URL" button.
3.  Specify the duration for which the URL will remain active (e.g., 30 minutes).
4.  Click "Create pre-signed URL." The URL is automatically copied for your convenience.

When someone accesses this URL within the active period, the embedded authentication information permits temporary access to the object.

![The image shows an Amazon S3 permissions overview page, highlighting settings for blocking public access to a bucket. It indicates that public access is blocked and provides options to edit these settings.](https://kodekloud.com/kk-media/image/upload/v1752859768/notes-assets/images/AWS-Certified-Developer-Associate-S3-Pres-Signed-URLs-Demo/amazon-s3-permissions-overview.jpg)

## User Permissions and Pre-Signed URLs

Consider a scenario involving IAM users. Suppose you have another user, "user two," with a policy allowing them to list buckets and view bucket contents. However, this policy does not permit actions such as retrieving or deleting objects. The policy for user two is as follows:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VisualEditor0",
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

This policy enables user two to list all buckets and view the contents of the "pre-signed demo" bucket. However, if user two attempts to open an object, they receive an "Access Denied" error due to insufficient permissions.

```
<Error>
  <Code>AccessDenied</Code>
  <Message>Access Denied</Message>
  <RequestId>24HTNFJDN9D196AV</RequestId>
  <HostId>AAHlmbdW4QPlYcV0Q2xFDMcC4jXyhw5Wj1Kylf.XoDajEfIML.Xi1K9oCKBW0=</HostId>
</Error>
```

Even though user two cannot directly access the object, they can still generate a pre-signed URL. However, if user two generates a 30-minute pre-signed URL and shares it, anyone using this URL will receive an "Access Denied" error because the URL reflects user two's permissions.

The following error messages illustrate what users might encounter when attempting to use such a URL:

```
<Error>
  <Code>AccessDenied</Code>
  <Message>Access Denied</Message>
  <RequestId>6N568V6R6BMW15B7ST</RequestId>
  <HostId>UqNVbn6v7cfaDGJ1WeCRjdmc5z7f5EJHBD9PA9nX3fjdwyq4UZR8BshfFLeZag==</HostId>
</Error>
```

```
<Error>
  <Code>AccessDenied</Code>
  <Message>Access Denied</Message>
  <RequestId>NGD68V3R1B52S18T</RequestId>
  <HostId>UoYlZ1vN6v2rcT6R1WcaRjdms5f6jE1JFB0PAvn1xTjhy4I/2Z8Rf1eFo/2gE=</HostId>
</Error>
```

![The image shows an Amazon S3 console screen with a pop-up window for sharing a file named "boat.jpg" using a presigned URL. The window allows setting a time interval for the URL's expiration in minutes or hours.](https://kodekloud.com/kk-media/image/upload/v1752859769/notes-assets/images/AWS-Certified-Developer-Associate-S3-Pres-Signed-URLs-Demo/amazon-s3-presigned-url-sharing.jpg)

> [!important]
> **Warning**
>
> The pre-signed URL only provides temporary authentication based on the permissions of the user who generated it. If the generating user lacks sufficient permissions to access the object, the URL will result in an "Access Denied" error for anyone who tries to use it.

## Conclusion

This demonstration shows how pre-signed URLs can be used to securely share S3 objects without exposing them publicly. They are particularly useful in automated workflows using the AWS SDK or AWS CLI, where temporary access can be granted programmatically.

For more details on S3 security best practices and AWS IAM, refer to the [AWS Documentation](https://aws.amazon.com/documentation/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/e8ae2293-e16b-42d3-b32b-5c260a1f1e5d/lesson/4ec38e23-d846-4a60-8457-ed7f34e3b5dd)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/e8ae2293-e16b-42d3-b32b-5c260a1f1e5d/lesson/4790734e-0d23-4bab-89b0-6fe5687635b2)**
>
> Practice lab
