# AWS Question 3 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Interview-Preparation-Course/AWS/AWS-Question-3)

---

## Table of Contents

- AWS Question 3
  - Why Not Use an IAM Policy?
  - Using S3 Bucket Policies
  - How It Appears in the AWS Console
  - Example Bucket Policy
  - Interview Response Strategy
  - Summary
  - Watch Video

---

## Content

DevOps Interview Preparation Course

AWS

# AWS Question 3

In this article, we explain how to block an IAM user from accessing a specific S3 bucket. It's essential to read the details carefully: the focus is on preventing access to a particular bucket, not revoking the user's access across all S3 buckets.

## Why Not Use an IAM Policy?

While IAM policies might seem like a straightforward solution, they can become complex when managing bucket-level permissions. Instead, using S3 bucket policies offers granular control tailored specifically for individual buckets.

> [!important]
> **Tip**
>
> Use S3 bucket policies for precise control over access to specific buckets rather than broad IAM policies.

## Using S3 Bucket Policies

To block an IAM user from accessing a particular S3 bucket, follow these steps:

1.  Log into your AWS console.
2.  Navigate to the S3 bucket in question.
3.  Click on the **Permissions** tab.
4.  Locate the **Bucket Policies** option.

Within the bucket policy, explicitly specify the ARN of the IAM user and configure the permissions to deny access. This approach ensures the policy applies only to the target bucket.

![The image provides guidance on using S3 bucket policies instead of IAM policies for managing public access, highlighting the correct approach with a screenshot of the S3 settings.](https://kodekloud.com/kk-media/image/upload/v1752873326/notes-assets/images/DevOps-Interview-Preparation-Course-AWS-Question-3/s3-bucket-policies-guidance-screenshot.jpg)

## How It Appears in the AWS Console

Once you log into your AWS account and select your S3 bucket, you can quickly review the **Permissions** tab to modify the bucket policy accordingly. This interface allows easy navigation through settings related to bucket policies.

![The image shows an Amazon S3 console page with the "Permissions" tab open for a bucket named "data-lake-s3-raghu." It displays settings related to blocking public access and bucket policies.](https://kodekloud.com/kk-media/image/upload/v1752873327/notes-assets/images/DevOps-Interview-Preparation-Course-AWS-Question-3/amazon-s3-permissions-data-lake.jpg)

> [!important]
> **Important**
>
> Remember: The "Block Public Access" settings are designed to restrict access from the internet and external users. They do not block access for individual IAM users. To specifically block an IAM user, update the bucket policy.

## Example Bucket Policy

When editing the bucket policy, select the "Edit" option and add a statement similar to an IAM policy statement formatted for S3. Here’s a sample structure you can modify:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Statement1",
      "Principal": {},
      "Effect": "Deny",
      "Action": [],
      "Resource": []
    }
  ]
}
```

Customize the "Action" array with the exact actions you want to deny, and the "Resource" array with the precise resource ARNs. Ensure you include the IAM user's ARN so that the deny rule applies specifically to that user.

## Interview Response Strategy

When discussing this approach in an interview, consider the following points:

1.  Confirm you have the necessary permissions to modify the bucket policy.
2.  Describe how you accessed the S3 bucket’s **Permissions** section and located the bucket policy.
3.  Explain that adding a deny statement for the IAM user’s ARN ensures the user cannot access that bucket.

This method of using S3 bucket policies for bucket-specific access control is both effective and straightforward compared to using IAM policies.

## Summary

To block an IAM user from accessing a specific S3 bucket, update the S3 bucket policy by adding a deny rule for that user's ARN. This approach is preferred for bucket-level access control due to its precision and simplicity.

For more information on AWS S3 and IAM, visit the [AWS Documentation](https://aws.amazon.com/documentation/).

Thank you for reading this article. Stay tuned for more insights on AWS and cloud security in the next lesson.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-interview-preparation-course/module/f1169a2e-23de-4377-bc4f-a07c136a11d6/lesson/148fa0fb-3f18-41be-b68d-a738fb23ad4b)**
>
> Watch video content
