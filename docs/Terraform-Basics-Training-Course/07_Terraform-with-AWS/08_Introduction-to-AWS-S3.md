# Introduction to AWS S3 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Basics-Training-Course/Terraform-with-AWS/Introduction-to-AWS-S3)

---

## Table of Contents

- Introduction to AWS S3
  - Key Concepts
  - Bucket Policies in Practice
  - Summary
  - Watch Video
    - Bucket Fundamentals
    - Object Structure in S3
    - Access Control

---

## Content

Terraform Basics Training Course

Terraform with AWS

# Introduction to AWS S3

In this article, we explore AWS S3—a highly scalable and reliable storage service designed for the AWS cloud. AWS S3 (Simple Storage Service) provides an infinitely scalable solution for storing files such as documents, images, and videos. As an object-based storage system, S3 is optimized for storing flat files unlike block storage solutions that are more suitable for operating systems or databases.

## Key Concepts

Data in S3 is organized into containers called _buckets_. Each bucket can hold an unlimited number of objects, and every file stored is treated as a separate object—even when they appear to be organized within folders such as "pictures/cat.jpg" or "videos/dog.mp4".

### Bucket Fundamentals

When creating an S3 bucket, consider the following guidelines:

- **Unique Bucket Name:** The bucket name must be unique worldwide, as AWS assigns it a global DNS name.
- **DNS-Compliant Naming:** Bucket names cannot contain uppercase letters, underscores, or end with a dash. They must be between 3 to 63 characters.
- **File Upload Limit:** Each individual file uploaded to S3 can be a maximum of 5 TB in size.

For a comprehensive list of bucket naming restrictions, please refer to the [official AWS documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html).

Once created, the bucket is accessible via a unique DNS endpoint. For example, a bucket named "allpets" in the US West (N. California) region would be accessible at:

https://allpets.us-west-1.amazonaws.com

Objects inside the bucket are accessed using the bucket name along with individual object keys.

![The image shows a table listing objects in an AWS S3 bucket, including their names and addresses, with a bucket URL format example.](https://kodekloud.com/kk-media/image/upload/v1752884237/notes-assets/images/Terraform-Basics-Training-Course-Introduction-to-AWS-S3/frame_180.jpg)

### Object Structure in S3

An object in S3 consists of:

- **Data:** The file content.
- **Key:** The unique identifier or name of the file.
- **Metadata:** Additional information such as creation time, owner, and file size.

![The image illustrates a storage bucket containing a file named "dog.jpg" with metadata, including owner "Lucy," size 5MB, and last modified date.](https://kodekloud.com/kk-media/image/upload/v1752884238/notes-assets/images/Terraform-Basics-Training-Course-Introduction-to-AWS-S3/frame_200.jpg)

### Access Control

By default, AWS restricts access to a bucket and its objects so that only the bucket owner has access. AWS manages access through:

- **Bucket Policies:** These policies apply permissions at the bucket level.
- **Access Control Lists (ACLs):** ACLs provide granular control over individual object permissions.

![The image illustrates a cloud storage bucket with access control lists for a file named "dog.jpg," secured by bucket policies labeled "all-pets."](https://kodekloud.com/kk-media/image/upload/v1752884239/notes-assets/images/Terraform-Basics-Training-Course-Introduction-to-AWS-S3/frame_240.jpg)

> [!important]
> **Note**
>
> For enhanced security, consider applying both bucket policies and ACLs to fine-tune access permissions in your AWS S3 environment.

## Bucket Policies in Practice

Bucket policies are JSON documents that control access to your S3 buckets. They can grant or restrict permissions for IAM users, groups, or even external accounts.

Below is an example policy that allows an IAM user named Lucy to retrieve all objects from a bucket called "all-pets":

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "s3:GetObject"
            ],
            "Effect": "Allow",
            "Resource": "arn:aws:s3:::all-pets/*",
            "Principal": {
                "AWS": [
                    "arn:aws:iam::123456123457:user/Lucy"
                ]
            }
        }
    ]
}
```

Bucket policies function similarly to IAM policies and can be used to provide cross-account access or public permissions when necessary.

> [!important]
> **Warning**
>
> Avoid exposing your buckets publicly unless absolutely required. Improper bucket policy configurations can lead to unauthorized data access.

## Summary

This article has provided an introduction to AWS S3 covering:

- The organization of data into buckets and objects.
- Guidelines for naming and creating buckets.
- Access control mechanisms including bucket policies and ACLs.

With this foundational knowledge of AWS S3, you're ready to explore more practical implementations, including Terraform integration and hands-on labs focused on managing S3 storage effectively.

For more detailed information, consider exploring additional resources:

- [AWS S3 Documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/e1d12378-f838-46c9-9b2e-28d86daa1e1e/lesson/06e93745-c92e-4381-973c-79231772f01e)**
>
> Watch video content
