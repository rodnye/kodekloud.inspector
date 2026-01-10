# S3 ACL and Resource Policies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Storage/S3-ACL-and-Resource-Policies)

---

## Table of Contents

- S3 ACL and Resource Policies
  - Key Policy Components
  - Defining Access on Specific Prefixes
  - Using Conditions in Bucket Policies
  - Block Public Access Settings and Their Purpose
  - Comparing IAM Policies and Resource (Bucket) Policies
  - Legacy ACLs
  - Summary
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Storage

# S3 ACL and Resource Policies

In this lesson, we explore how Access Control Lists (ACLs) and resource policies determine who can access an S3 bucket and what operations they can perform. Enhancing your security posture starts with understanding that every S3 bucket is locked down by default. Only the bucket creator and the root user have access when the bucket is initially created—no other AWS users, accounts, or anonymous users have any permissions.

![The image illustrates S3 access permissions, showing that the creator and root user have access, while other AWS users, users from another AWS account, and anonymous/public users do not.](https://kodekloud.com/kk-media/image/upload/v1752859703/notes-assets/images/AWS-Certified-Developer-Associate-S3-ACL-and-Resource-Policies/s3-access-permissions-illustration.jpg)

Inside AWS, resource policies are used to manage access at the resource level. For S3 buckets, these policies are often called bucket policies. Not only do these policies define access rights, but they also specify exactly what operations each user or service can perform.

![The image explains S3 bucket policies, highlighting the differences between a Resource Policy and an S3 Bucket Policy in terms of access and operations.](https://kodekloud.com/kk-media/image/upload/v1752859704/notes-assets/images/AWS-Certified-Developer-Associate-S3-ACL-and-Resource-Policies/s3-bucket-policies-resource-access.jpg)

Below is an example of a bucket policy written in JSON:

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
      }
    },
    {
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": [
        "arn:aws:s3:::DOC-EXAMPLE-BUCKET/*"
      ]
    }
  ]
}
```

The policy begins with the version, set here to "2012-10-17"—the current version syntax. For any future changes, refer to the [AWS Documentation](https://aws.amazon.com/documentation/).

## Key Policy Components

1.  **SID (Statement ID)**

    The SID is an optional identifier that describes the purpose of a rule. For example, "AllowRule" indicates this statement is used to grant specific access permissions.

2.  **Principal**

    This element specifies who the policy applies to. In the example, the policy targets the IAM user John Doe, identified by the ARN "arn:aws:iam::111122223333:user/JohnDoe".

3.  **Effect**

    The effect declares whether the action defined in the policy is allowed or denied. The snippet below demonstrates a complete example where the effect is set to "Allow":

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

4.  **Action**

    The action element defines the operations the principal is allowed to perform. In this policy, the user is granted permission to perform the "s3:GetObject" action to retrieve objects from the bucket.

5.  **Resource**

    This element indicates the target resource in the form of an Amazon Resource Name (ARN). The policy applies to either the whole bucket or specific objects within it.

Bucket policies are highly flexible and support multiple statements. Consider the example below that demonstrates granting broad access while explicitly denying access to a particular user:

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

In this policy:

- The `"Principal": "*"` setting applies the allow-all rule to every user (authenticated or not).
- The second statement explicitly denies the IAM user DaisyM from executing the "s3:GetObject" operation.

## Defining Access on Specific Prefixes

Bucket policies can also restrict access to a particular subset of objects within a bucket by specifying prefixes. The following example grants user Daisy access only to objects within the "/media" folder:

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
      }
    },
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject"],
      "Resource": ["arn:aws:s3:::DOC-EXAMPLE-BUCKET/media/*"]
    }
  ]
}
```

This setup ensures that Daisy's access is limited only to objects that start with the "media" prefix.

## Using Conditions in Bucket Policies

Conditions can further refine bucket policies. For instance, the example below limits access to users coming from a specific IP address range (192.0.2.0/24):

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

Alternatively, you can use conditions to grant access for multiple prefixes in a single rule. The following example allows access only to objects under the "/audio" and "/video" prefixes:

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

## Block Public Access Settings and Their Purpose

When creating an S3 bucket, you may encounter settings to block public access. This feature was introduced as a safeguard against accidental misconfigurations that could expose the bucket publicly. Even if a bucket policy is set to allow public access (for example, by using `"Principal": "*"`) the bucket remains inaccessible until the "Block All Public Access" option is disabled.

![The image shows a settings interface for blocking public access to S3 buckets and objects, with options to block access through access control lists and public bucket policies.](https://kodekloud.com/kk-media/image/upload/v1752859705/notes-assets/images/AWS-Certified-Developer-Associate-S3-ACL-and-Resource-Policies/s3-bucket-access-settings-interface.jpg)

> [!important]
> **Warning**
>
> Be cautious when configuring bucket policies. An incorrect configuration, such as using `"Principal": "*"` with broad permissions like `"s3:*"`, can inadvertently expose your bucket to the public.

Consider this example, which mistakenly grants public access to all users:

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

Even if such a policy is in place, AWS’ block public access settings keep your bucket secure by preventing public access until explicitly modified.

![The image illustrates AWS S3 bucket access settings, showing options to block public access, and depicts a locked bucket in Account 2, preventing anonymous/public access.](https://kodekloud.com/kk-media/image/upload/v1752859706/notes-assets/images/AWS-Certified-Developer-Associate-S3-ACL-and-Resource-Policies/aws-s3-bucket-access-settings.jpg)

## Comparing IAM Policies and Resource (Bucket) Policies

It is important to distinguish between IAM policies and resource (bucket) policies:

- **IAM Policies**  
  These are attached directly to IAM users or groups and set permissions for authenticated users. They **cannot** grant access to anonymous or public users.
- **Resource Policies (Bucket Policies in S3)**  
  Attached directly to the S3 bucket, these policies can define access rules for both authenticated and anonymous users.

Both policy types work in tandem. Even if a bucket policy grants certain permissions, the corresponding IAM policy must also allow the requested access for an authenticated user.

![The image compares IAM Policy and Resource Policy, highlighting that IAM Policy applies only to authenticated AWS users, while Resource Policy can include rules for anonymous or public users.](https://kodekloud.com/kk-media/image/upload/v1752859707/notes-assets/images/AWS-Certified-Developer-Associate-S3-ACL-and-Resource-Policies/iam-policy-vs-resource-policy.jpg)

If you experience access issues, verify that both your IAM and bucket policies are aligned.

![The image compares IAM policies and resource policies using icons of a person and a bucket, with checkmarks and crosses indicating permissions.](https://kodekloud.com/kk-media/image/upload/v1752859709/notes-assets/images/AWS-Certified-Developer-Associate-S3-ACL-and-Resource-Policies/iam-policies-resource-policies-comparison.jpg)

## Legacy ACLs

Access Control Lists (ACLs) are a legacy method for managing access to S3 buckets. Although they provide basic permissions such as read, write, and full control, ACLs lack the flexibility that bucket policies offer. Because of their limited configurability, AWS recommends using bucket policies instead.

![The image explains S3 ACLs, highlighting their legacy nature and inflexibility, and includes a table detailing different ACL permissions for buckets and objects.](https://kodekloud.com/kk-media/image/upload/v1752859710/notes-assets/images/AWS-Certified-Developer-Associate-S3-ACL-and-Resource-Policies/s3-acls-legacy-permissions-table.jpg)

## Summary

Bucket policies are essential for managing who can access your S3 bucket and which operations they are allowed to perform. Key components of bucket policies include:

1.  **Principal** – Defines the user or group (or even public users) the policy applies to.
2.  **Resource** – Specifies the S3 bucket or objects within it that the policy covers.
3.  **Action** – Lists the allowed or denied operations.
4.  **Effect** – Determines whether access is granted or denied.

Remember that both bucket policies and IAM policies must be in harmony to allow access—bucket policies are used for both authenticated and public access, while IAM policies target only authenticated AWS users.

![The image is a summary slide with three points about access policies, including determining access, policy components, and the role of the principal. It features a gradient background and numbered bullet points.](https://kodekloud.com/kk-media/image/upload/v1752859712/notes-assets/images/AWS-Certified-Developer-Associate-S3-ACL-and-Resource-Policies/access-policies-summary-slide.jpg)

![The image is a summary slide outlining key points about actions, effects, and policies related to resource access and IAM in AWS. It highlights the roles of actions, effects, bucket policies, and public access requirements.](https://kodekloud.com/kk-media/image/upload/v1752859714/notes-assets/images/AWS-Certified-Developer-Associate-S3-ACL-and-Resource-Policies/aws-iam-resource-access-summary.jpg)

In conclusion, to maintain a secure and well-managed S3 environment, leverage bucket policies (in conjunction with IAM policies for authenticated users) rather than relying on legacy ACLs.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/e8ae2293-e16b-42d3-b32b-5c260a1f1e5d/lesson/a4ed1924-3d7e-4ea9-9438-ce92d2567b9e)**
>
> Watch video content
