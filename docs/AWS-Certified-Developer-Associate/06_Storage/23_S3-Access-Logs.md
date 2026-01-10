# S3 Access Logs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Storage/S3-Access-Logs)

---

## Table of Contents

- S3 Access Logs
  - Summary
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Storage

# S3 Access Logs

In this article, we explore the significance of Amazon S3 access logs. These logs provide detailed records of every request made to an S3 bucket, making them an invaluable tool for both security and auditing purposes.

For example, when a user named John requests the file "file1.txt", the system logs who made the request, when it was made, and which object was accessed. This information can help you analyze user interactions and fine-tune your S3 storage setup, including selecting the optimal storage class for your data.

> [!important]
> **Key Information Recorded in S3 Access Logs**
>
> The access logs capture crucial details such as the bucket owner, bucket name, timestamp, IP address of the requester, requester's identifier, unique request ID, operation performed (GET, PUT, DELETE, etc.), object key, version ID (if applicable), status, and error codes.

Below is an example of a typical S3 access log entry:

```
John [06/Feb/2019:00:00:38 +0000] GET /File1.txt
```

It is important to note that the logs generated from your S3 bucket are stored in a separate, designated S3 logging bucket. For instance, if you have configured logging for an "app1" bucket, all the access logs will be saved in a different S3 bucket specified for logging.

![The image lists the details contained in access logs, including bucket owner, bucket name, timestamp, remote IP, requester, request ID, operation type, key, version ID, and status/error code.](https://kodekloud.com/kk-media/image/upload/v1752859715/notes-assets/images/AWS-Certified-Developer-Associate-S3-Access-Logs/access-logs-details-bucket-info.jpg)

For a comprehensive list of the fields included in the access logs, please refer to the AWS documentation's [Log Format](https://docs.aws.amazon.com/AmazonS3/latest/dev/LogFormat.html).

## Summary

An S3 access log entry provides you with essential details about each access request, including:

- **Bucket Owner and Name:** Identifies the owner and the specific bucket accessed.
- **Request Timestamp:** Records the time and date when the access occurred.
- **Requester Details:** Captures the IP address and user identifier of the requester.
- **Operation Performed:** Specifies the type of operation executed (e.g., GET, PUT, DELETE).
- **Accessed Object Details:** Includes the object key, version ID (if applicable), and status/error information.

All these logs are stored as text documents in the designated logging bucket, offering a thorough audit trail to help manage security and performance in your S3 environment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/e8ae2293-e16b-42d3-b32b-5c260a1f1e5d/lesson/6c7beee7-ad9c-44a5-bbfa-01a753ec526a)**
>
> Watch video content
