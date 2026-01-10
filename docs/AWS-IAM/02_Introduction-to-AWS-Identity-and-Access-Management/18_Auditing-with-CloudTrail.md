# Auditing with CloudTrail - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-IAM/Introduction-to-AWS-Identity-and-Access-Management/Auditing-with-CloudTrail)

---

## Table of Contents

- Auditing with CloudTrail
  - Why Audit S3 Access?
  - Demo: Use CloudTrail to Audit User Access
  - References
  - Watch Video

---

## Content

AWS - IAM

Introduction to AWS Identity and Access Management

# Auditing with CloudTrail

In this lesson, you’ll learn how to track and audit S3 access using AWS CloudTrail. When an IAM user performs actions—like deleting an object in an S3 bucket—you need to know who did it, when it happened, and exactly which operation was called. AWS CloudTrail records all API calls to your AWS resources, making this audit process straightforward.

> [!important]
> **Note**
>
> Make sure CloudTrail is enabled across all regions before you begin so that no API activity goes unrecorded.

## Why Audit S3 Access?

By analyzing CloudTrail logs, you can:

| Feature                  | Description                                                                |
| ------------------------ | -------------------------------------------------------------------------- |
| API call logging         | Capture every AWS API request, whether from users, services, or resources. |
| Action auditing          | Review who performed which operations on your resources.                   |
| API call tracking        | Filter logs by IAM users, resources, or specific event names.              |
| Security event detection | Identify both successful and failed login attempts.                        |

![The image is an infographic about "CloudTrail and User Access Audit," highlighting four key functions: logging API calls, auditing actions, tracking API calls, and detecting login attempts and security threats.](https://kodekloud.com/kk-media/image/upload/v1752863004/notes-assets/images/AWS-IAM-Auditing-with-CloudTrail/cloudtrail-user-access-audit-infographic.jpg)

## Demo: Use CloudTrail to Audit User Access

Follow these steps to search the event history in the CloudTrail console:

1.  Sign in to the AWS Management Console and open **CloudTrail**.
2.  In the sidebar, select **Event history**.
3.  Use the filter bar to narrow down by **Event name**, **Username**, or **Resource name**.
4.  Click an individual event to view details such as the request time, source IP, and whether the request succeeded or failed.

![The image is a slide titled "Use CloudTrail to Audit User Access," featuring a simple illustration of a person with a "Demo" sign and a list of steps for using CloudTrail on AWS.](https://kodekloud.com/kk-media/image/upload/v1752863005/notes-assets/images/AWS-IAM-Auditing-with-CloudTrail/use-cloudtrail-audit-user-access.jpg)

## References

- [AWS CloudTrail User Guide](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/)
- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/index.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-iam/module/84a65700-7455-4ad8-aeb5-27dfaf07b8cc/lesson/2bb5cc33-c061-4f8f-8d42-bb8ea648ccdd)**
>
> Watch video content
