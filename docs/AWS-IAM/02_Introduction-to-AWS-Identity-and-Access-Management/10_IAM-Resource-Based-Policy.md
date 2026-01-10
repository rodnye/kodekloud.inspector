# IAM Resource Based Policy - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-IAM/Introduction-to-AWS-Identity-and-Access-Management/IAM-Resource-Based-Policy)

---

## Table of Contents

- IAM Resource Based Policy
  - Key Components of a Resource-Based Policy
  - IAM Policy Evaluation Logic
  - Creating and Attaching Your S3 Bucket Policy
  - References
  - Watch Video
    - Example: Explicit Deny in an S3 Bucket Policy

---

## Content

AWS - IAM

Introduction to AWS Identity and Access Management

# IAM Resource Based Policy

In this lesson, we explore how IAM resource-based policies work in AWS, focusing on S3 bucket policies. Resource-based policies are attached directly to resources—such as S3 buckets—to specify which AWS principals can perform actions on them.

## Key Components of a Resource-Based Policy

| Element   | Description                                                                           |
| --------- | ------------------------------------------------------------------------------------- |
| Version   | Defines the policy language version (e.g., `2012-10-17`).                             |
| Statement | Contains one or more permission statements.                                           |
| Principal | Specifies the AWS entity (user, role, account, or group) to which the policy applies. |
| Effect    | Indicates whether to `Allow` or `Deny` specified actions.                             |
| Action    | Lists AWS operations (for example, `s3:DeleteObject`).                                |
| Resource  | Defines the ARN(s) of the target resource(s).                                         |

### Example: Explicit Deny in an S3 Bucket Policy

The following policy blocks the `accounting` group from deleting objects or the bucket itself in the `accounting1` S3 bucket:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Deny",
      "Principal": {
        "AWS": "arn:aws:iam::123456789:group/accounting"
      },
      "Action": [
        "s3:DeleteBucket",
        "s3:DeleteObject"
      ],
      "Resource": [
        "arn:aws:s3:::accounting1",
        "arn:aws:s3:::accounting1/*"
      ]
    }
  ]
}
```

> [!important]
> **Warning**
>
> Explicit denies always override any allows. Ensure you review all policies for unintended deny statements.

## IAM Policy Evaluation Logic

When multiple statements or policies apply to a request, AWS evaluates them in this order:

| Order | Evaluation Step          | Outcome                        |
| ----- | ------------------------ | ------------------------------ |
| 1     | Explicit Deny present    | Request is denied immediately. |
| 2     | Explicit Allow (no Deny) | Request is granted.            |
| 3     | Neither Deny nor Allow   | Request is implicitly denied.  |

![The image is a flowchart explaining how IAM policies are evaluated, showing decision paths based on explicit deny, allow, and implicit deny outcomes.](https://kodekloud.com/kk-media/image/upload/v1752863061/notes-assets/images/AWS-IAM-IAM-Resource-Based-Policy/iam-policies-evaluation-flowchart.jpg)

> [!important]
> **Note**
>
> Implicit denies occur when no policy explicitly allows an action. You must explicitly allow all required operations.

## Creating and Attaching Your S3 Bucket Policy

Follow these steps to apply a resource-based policy to an S3 bucket:

1.  Sign in to the AWS Management Console.
2.  Open the IAM service and choose **Policies**.
3.  Click **Create policy**, then select **JSON**.
4.  Paste your policy document and review.
5.  Attach the policy to the target S3 bucket under the **Permissions** tab.

> [!important]
> **Note**
>
> Make sure you have the necessary IAM permissions to create and attach policies. Failure to do so will result in authorization errors.

## References

- [Amazon S3 Bucket Policies](https://docs.aws.amazon.com/AmazonS3/latest/userguide/example-bucket-policies.html)
- [AWS IAM Policy Documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-iam/module/84a65700-7455-4ad8-aeb5-27dfaf07b8cc/lesson/7092f613-016f-4154-90d7-dcd164e0d9f4)**
>
> Watch video content
