# S3 ACL and Resource Policies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Storage/S3-ACL-and-Resource-Policies)

---

## Table of Contents

- S3 ACL and Resource Policies
  - Bucket Policy Structure
  - Multiple Statements in a Bucket Policy
  - Defining Access for Specific Prefixes
  - Using Conditions in Bucket Policies
  - Public Access and Extra Security Measures
  - IAM Policies vs. Resource Policies
  - Legacy ACLs
  - Summary
  - Watch Video
    - Example Bucket Policy

---

## Content

AWS Solutions Architect Associate Certification

Services Storage

# S3 ACL and Resource Policies

In this guide, we explore S3 ACLs and resource policies, explaining how they control access to S3 buckets. You will learn how buckets are secured by default, discover the components of JSON-based bucket policies, and understand the differences between IAM policies, resource policies, and legacy ACLs.

When you create an S3 bucket, it starts in a locked-down state. By default, only the bucket creator—and the root user, who has full account access—can access it. Other AWS users within your account, public users, and users from other AWS accounts do not get access automatically.

![The image illustrates S3 access permissions for different types of AWS users, showing that the creator and root user have access, while other AWS users, users from another AWS account, and anonymous/public users do not.](https://kodekloud.com/kk-media/image/upload/v1752866008/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-ACL-and-Resource-Policies/s3-access-permissions-aws-users.jpg)

Within AWS, resource policies define who can access a specific S3 resource. In the case of buckets, these are known as bucket policies. An S3 bucket policy determines which users have permission to access the bucket and specifies the operations they are authorized to perform.

![The image explains S3 bucket policies, highlighting the differences between a Resource Policy and an S3 Bucket Policy in terms of access and operations.](https://kodekloud.com/kk-media/image/upload/v1752866009/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-ACL-and-Resource-Policies/s3-bucket-policies-resource-access.jpg)

## Bucket Policy Structure

Bucket policies are written in JSON and generally include the following components:

- **Version:** Specifies the policy language syntax (e.g., "2012-10-17").
- **Statement:** Contains one or more policy statements. Each statement includes:
  - **Sid:** An optional statement identifier for reference.
  - **Principal:** The AWS user(s) or account(s) the policy applies to.
  - **Effect:** Indicates whether the policy allows or denies access.
  - **Action:** Specifies the allowed or denied actions.
  - **Resource:** Defines the ARN (Amazon Resource Name) of the bucket or its objects that the statement affects.

### Example Bucket Policy

Below is a sample bucket policy that grants the user JohnDoe (from account 111122223333) permission to perform the `s3:GetObject` action on any object within the bucket:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowRule",
      "Principal": {
        "AWS": [
          "arn:aws:iam::111122223333:user/JohnDoe"
        ]
      },
      "Effect": "Allow",
      "Action": ["s3:GetObject"],
      "Resource": ["arn:aws:s3:::DOC-EXAMPLE-BUCKET/*"]
    }
  ]
}
```

## Multiple Statements in a Bucket Policy

A bucket policy can contain multiple statements to enforce different rules. For instance, you might grant access to everyone and then specifically deny access to one user:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowAll",
      "Principal": "*",
      "Effect": "Allow",
      "Action": ["s3:GetObject"],
      "Resource": ["arn:aws:s3:::DOC-EXAMPLE-BUCKET/*"]
    },
    {
      "Sid": "DenyDaisy",
      "Principal": {
        "AWS": [
          "arn:aws:iam::666438:user/DaisyM"
        ]
      },
      "Effect": "Deny",
      "Action": ["s3:GetObject"],
      "Resource": ["arn:aws:s3:::DOC-EXAMPLE-BUCKET/*"]
    }
  ]
}
```

In this example, the `"Principal": "*"` means the first rule applies to everyone—including anonymous users. The second statement explicitly denies the user DaisyM from accessing the objects.

## Defining Access for Specific Prefixes

Bucket policies also support restrictions based on object prefixes. For instance, you can allow a user to only access objects located under the `/media` prefix:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowDaisy",
      "Principal": {
        "AWS": [
          "arn:aws:iam::666438:user/DaisyM"
        ]
      },
      "Effect": "Allow",
      "Action": ["s3:GetObject"],
      "Resource": ["arn:aws:s3:::DOC-EXAMPLE-BUCKET/media/*"]
    }
  ]
}
```

In the policy above, the ARN includes the bucket name, the prefix (`media`), and a wildcard (`*`), which grants access to all objects within that folder.

## Using Conditions in Bucket Policies

Conditions in policies can further refine access rules. For example, you might restrict operations based on the user's source IP address. The following policy only allows actions from the 192.0.2.0/24 subnet:

```
{
  "Id": "PolicyId2",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowIP",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:*",
      "Resource": [
        "arn:aws:s3:::DOC-EXAMPLE-BUCKET",
        "arn:aws:s3:::DOC-EXAMPLE-BUCKET1/*"
      ],
      "Condition": {
        "IpAddress": {
          "aws:SourceIp": [
            "192.0.2.0/24"
          ]
        }
      }
    }
  ]
}
```

Additionally, you can combine conditions to allow access to multiple prefixes. Here’s an example that authorizes access to objects under both `/audio` and `/video` prefixes:

```
{
  "Id": "PolicyId2",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowIP",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:*",
      "Resource": [
        "arn:aws:s3:::DOC-EXAMPLE-BUCKET",
        "arn:aws:s3:::DOC-EXAMPLE-BUCKET1/*"
      ],
      "Condition": {
        "StringEquals": {
          "s3:prefix": ["audio/", "video/"],
          "s3:delimiter": ["/"]
        }
      }
    }
  ]
}
```

## Public Access and Extra Security Measures

AWS provides a "Block Public Access" setting as an extra security measure to prevent accidental exposure of your buckets. Even if you create a bucket policy that appears to grant public access, AWS will block it until you disable the "Block all public access" option.

![The image is a screenshot of a settings panel for blocking public access to S3 buckets and objects, with options to block access through access control lists and public bucket policies.](https://kodekloud.com/kk-media/image/upload/v1752866010/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-ACL-and-Resource-Policies/s3-bucket-access-settings-panel.jpg)

For example, consider this policy intended to allow all users within your AWS account access:

```
{
  "Id": "PolicyId2",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowAll",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:*",
      "Resource": [
        "arn:aws:s3:::DOC-EXAMPLE-BUCKET1/*"
      ]
    }
  ]
}
```

> [!important]
> **Warning**
>
> Using `"Principal": "*"` as shown above unintentionally opens access to the public, including all users from other AWS accounts and anonymous users. This can lead to excessive permissions when using `"s3:*"`, which allows all S3 operations. Always review your bucket policies carefully to avoid unintended public access.

## IAM Policies vs. Resource Policies

Understanding the differences between IAM policies and resource (bucket) policies is critical:

- **IAM Policies:**  
  These are attached to users or roles and determine the actions they can perform. They apply only to authenticated AWS users.
- **Resource Policies:**  
  These policies are directly attached to AWS resources such as S3 buckets. They can grant permissions to both authenticated AWS users and anonymous/public users.

![The image compares IAM Policy and Resource Policy, highlighting that IAM Policy applies to authenticated AWS users, while Resource Policy can include rules for anonymous or public users.](https://kodekloud.com/kk-media/image/upload/v1752866011/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-ACL-and-Resource-Policies/iam-policy-vs-resource-policy.jpg)

It is essential that both policies permit an operation for it to succeed. If either the IAM policy or the resource policy denies access, the request will be blocked.

![The image compares IAM policies and resource policies using icons of a person, documents with checkmarks or crosses, and buckets, illustrating different access scenarios.](https://kodekloud.com/kk-media/image/upload/v1752866014/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-ACL-and-Resource-Policies/iam-policies-resource-policies-comparison.jpg)

## Legacy ACLs

Access Control Lists (ACLs) are a legacy mechanism predating IAM that provide basic access control through a limited set of rules. ACLs offer five permissions such as reading objects, writing objects, reading ACLs, writing ACLs, and full control. Due to their limited flexibility and granularity, ACLs are not recommended for routine bucket management.

![The image is an informational graphic about S3 ACLs, describing them as a legacy access control mechanism with limited flexibility and a table detailing different ACL permissions for buckets and objects.](https://kodekloud.com/kk-media/image/upload/v1752866016/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-ACL-and-Resource-Policies/s3-acls-legacy-access-control.jpg)

## Summary

Bucket policies define who can access your S3 bucket and what operations they can perform by specifying the following components:

- **Principal:** The user, role, or group the policy affects.
- **Resource:** The AWS resource (e.g., bucket or objects) the policy governs.
- **Action:** The S3 operations that are allowed or denied.
- **Effect:** Whether the defined actions are permitted or denied.

Bucket policies are used in conjunction with IAM policies. For instance, if an IAM policy denies access to a specific action, that denial takes precedence—even if a resource policy allows it. Similarly, granting public access requires the use of a bucket policy, as IAM policies only apply to AWS users.

![The image is a summary slide with three points about access policies, detailing who can access a bucket, the components of a policy, and the role of the principal.](https://kodekloud.com/kk-media/image/upload/v1752866017/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-ACL-and-Resource-Policies/access-policies-summary-slide.jpg)

By understanding the distinct roles and interactions of IAM policies, resource policies, and legacy ACLs, you can configure your S3 bucket access securely and effectively.

For additional insights on managing AWS permissions, check out the following resources:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [AWS Documentation](https://aws.amazon.com/documentation/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/23e00d1f-6422-4fef-a9bf-e8f007be5514/lesson/2f946071-1bee-4c8a-a82e-d7e83887e6c2)**
>
> Watch video content
