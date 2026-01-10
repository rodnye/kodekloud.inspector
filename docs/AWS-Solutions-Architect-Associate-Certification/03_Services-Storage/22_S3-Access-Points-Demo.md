# S3 Access Points Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Storage/S3-Access-Points-Demo)

---

## Table of Contents

- S3 Access Points Demo
  - Creating the Demo Bucket
  - Testing Access with Multiple Users
  - Creating and Configuring Access Points
  - Configuring the Finance Access Point
  - Conclusion
  - Watch Video
  - Practice Lab
    - Setting Up Access Points
    - Access Point Policies and Bucket Delegation
    - Configuring the Access Point Policy

---

## Content

AWS Solutions Architect Associate Certification

Services Storage

# S3 Access Points Demo

In this lesson, we explore how to work with AWS S3 Access Points. You will learn how to create a demo bucket named "KodeKloud access point", upload a test file, and configure multiple access points with custom policies to manage access for different users.

---

## Creating the Demo Bucket

Begin by creating a new bucket in the AWS S3 console and naming it "KodeKloud access point". Retain all the default settings.

![The image shows the AWS S3 console interface for creating a new bucket, with options for configuring the bucket name, region, and object ownership settings.](https://kodekloud.com/kk-media/image/upload/v1752866018/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Access-Points-Demo/aws-s3-console-create-bucket.jpg)

After the bucket is created, upload a demo file for testing purposes.

![The image shows an Amazon S3 console with a bucket named "kk-access-point" in the US East (N. Virginia) region, indicating that the bucket and objects are not public.](https://kodekloud.com/kk-media/image/upload/v1752866019/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Access-Points-Demo/amazon-s3-console-kk-access-point.jpg)

Click the "Open" button within the bucket to view the file as the bucket owner. Next, inspect the details of the object (e.g., "beach.jpg"):

![The image shows an Amazon S3 console interface displaying details of an object named "beach.jpg," including its size, type, and S3 URL.](https://kodekloud.com/kk-media/image/upload/v1752866020/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Access-Points-Demo/amazon-s3-console-beachjpg-details.jpg)

---

## Testing Access with Multiple Users

To simulate different access permissions, open several browser tabs representing different users within the same AWS account. For demonstration purposes:

- **Blue Tab:** Represents user one (the bucket owner).
- **Green Tab:** Represents user two.
- **Yellow Tab:** Represents user three.

Verify user permissions in the AWS IAM Management Console. You’ll notice that while user one has full S3 access as the bucket owner, user two and user three have limited access (primarily to Cloud Shell) without direct S3 permissions.

![The image shows an AWS Identity and Access Management (IAM) dashboard displaying a list of users with details such as last activity, MFA status, password age, and active key age.](https://kodekloud.com/kk-media/image/upload/v1752866024/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Access-Points-Demo/aws-iam-dashboard-user-details.jpg)

Using Cloud Shell (which already includes the AWS CLI), run the following test commands. As a general user (not the bucket owner), attempting to copy the object produces a 403 Forbidden error:

```
[cloudshell:user@ip-10-2-30-244 ~]$ aws s3 ls
2023-04-07 02:26:33 kk-access-point
[cloudshell:user@ip-10-2-30-244 ~]$ aws s3 cp s3://kk-access-point/beach.jpg .
fatal error: An error occurred (403) when calling the HeadObject operation: Forbidden
```

Similarly, testing from user two’s Cloud Shell session shows restricted access:

```
[cloudshell-user@ip-10-2-30-244 ~]$ aws s3 ls
2023-04-07 07:26:13 kk-access-point
[cloudshell-user@ip-10-2-30-244 ~]$ aws s3 cp s3://kk-access-point/beach.jpg .
2023-04-07 07:27:37  2073914 beach.jpg
[cloudshell-user@ip-10-2-30-244 ~]$ aws s3 cp s3://kk-access-point/beach.jpg .
fatal error: An error occurred (403) when calling the HeadObject operation: Forbidden
```

This confirms that only user one (the bucket owner) currently has full access to the file.

Switch back to the main user (user one) and test again:

```
[cloudshell-user@ip-10-2-30-244 ~]$ aws s3 ls
2023-04-07 02:36:13 kk-access-point
[cloudshell-user@ip-10-2-30-244 ~]$ aws s3 cp s3://kk-access-point/beach.jpg .
fatal error: An error occurred (403) when calling the HeadObject operation: Forbidden
```

---

## Creating and Configuring Access Points

### Setting Up Access Points

We now create access points to delegate specific access permissions for different groups. First, set up an access point for developers (user two). During creation:

- Assign a name (e.g., "developers").
- Choose the bucket "KodeKloud access point".
- Enable the option to allow requests from the Internet.

![The image shows an Amazon S3 console interface for creating an access point, with fields for access point name, bucket selection, AWS region, and network origin settings.](https://kodekloud.com/kk-media/image/upload/v1752866027/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Access-Points-Demo/amazon-s3-access-point-interface.jpg)

For now, skip setting an access point policy; you can modify it later as needed.

![The image shows an Amazon Web Services (AWS) console screen with settings for an S3 Access Point policy. It indicates that public access is blocked due to Block Public Access settings being enabled.](https://kodekloud.com/kk-media/image/upload/v1752866029/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Access-Points-Demo/aws-s3-access-point-policy.jpg)

After creation, the developers access point appears alongside the bucket's access points:

![The image shows an Amazon S3 console page displaying access points for a bucket named "kk-access-point," with one access point named "developers" listed.](https://kodekloud.com/kk-media/image/upload/v1752866031/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Access-Points-Demo/amazon-s3-access-points-kk.jpg)

Repeat the process to create an additional access point for user three (finance team). Use open Internet access with default policy settings.

---

### Access Point Policies and Bucket Delegation

Access point policies control requests made through an access point. For example, to allow a specific user (Jane) to perform object operations, you might use a policy like this:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::123456789012:user/Jane"
            },
            "Action": [
                "s3:GetObject",
                "s3:PutObject"
            ],
            "Resource": "arn:aws:s3:::accesspoint:my-access-point/object/Jane/*"
        }
    ]
}
```

Note that the resource field in the policy references the access point ARN, which functions similarly to a traditional S3 bucket ARN during operations.

> [!important]
> **Important**
>
> Remember that permissions in an access point policy are only effective if the underlying bucket also permits the same access. You can achieve this by either:
>
> 1.  Adding the same policy to the bucket policy, or
> 2.  Delegating access control from the bucket to the access point. The recommended approach is delegation.

To delegate access, adjust the bucket policy to allow access points to manage access control. An example delegation bucket policy is:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "AWS": "*" },
      "Action": [ "Bucket ARN", "Bucket ARN/*" ],
      "Resource": [ "Bucket ARN", "Bucket ARN/*" ],
      "Condition": { "StringEquals": { "s3:DataAccessPointAccount": "Bucket owner's account ID" } }
    }
  ]
}
```

Replace "Bucket ARN" and "Bucket owner's account ID" with your bucket's specific values. Once updated, save the bucket policy to allow seamless operation of all access points.

A sample bucket policy after replacing placeholders might appear as:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": [
                    "arn:aws:s3:::kk-access-point",
                    "arn:aws:s3:::kk-access-point/*"
                ]
            },
            "Action": "*",
            "Resource": "arn:aws:s3:kk-access-point",
            "Condition": {
                "StringEquals": {
                    "s3:DataAccessPointAccount": "bucket owner's account id"
                }
            }
        }
    ]
}
```

After saving, the bucket now delegates management to its access points. Review the current access point settings for the bucket:

![The image shows an Amazon S3 console screen with settings for a bucket named "kk-access-point," focusing on permissions and public access settings. The interface indicates that public access is blocked for the account and bucket.](https://kodekloud.com/kk-media/image/upload/v1752866032/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Access-Points-Demo/amazon-s3-kk-access-point-settings.jpg)

Switch to the "Permissions" tab for the "developers" access point:

![The image shows an Amazon S3 console screen focused on the "Permissions" tab for an access point named "developers." It displays settings for blocking public access, with options to block access through access control lists and public bucket policies.](https://kodekloud.com/kk-media/image/upload/v1752866033/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Access-Points-Demo/amazon-s3-permissions-developers.jpg)

---

### Configuring the Access Point Policy

Next, define and refine an access point policy. Refer to the [AWS documentation on S3 Access Points](https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-points.html) for complete details.

For instance, a sample policy allowing user John to perform GetObject operations through an access point is:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::123456789012:user/John"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:us-west-2:123456789012:accesspoint/my-access-point/object/John/*"
    }
  ]
}
```

Similarly, a variant policy allowing user Jane both GetObject and PutObject operations looks like:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::123456789012:user/jane"
            },
            "Action": [
                "s3:GetObject",
                "s3:PutObject"
            ],
            "Resource": "arn:aws:s3:::us-west-2:access-point:my-access-point:object/jane/*"
        }
    ]
}
```

For this demo, modify the policy for the developers access point (user two). For example, allowing user two to list, get, and put objects:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::184186092733:user/user2"
      },
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:us-east-1:184186092733:accesspoint/developers/*"
      ]
    }
  ]
}
```

Remember, the access point ARN format is:

arn:aws:s3:<region>:<account-id>:accesspoint/<access-point-name>

To permit access to all objects, include the object path by appending a slash and a wildcard. For example:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::841860927337:user/user2"
            },
            "Action": [
                "s3:GetObject",
                "s3:PutObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:us-east-1:841860927337:accesspoint/developers/object/*",
                "arn:aws:s3:us-east-1:841860927337:accesspoint/developers"
            ]
        }
    ]
}
```

This policy permits user two to list bucket contents and perform object-level operations via the "developers" access point.

Test the configuration by listing contents using the access point ARN:

```
aws s3 ls s3://arn:aws:s3:us-east-1:841860927337:accesspoint/developers
```

You should see "beach.jpg" in the listing. To copy the file locally, run:

```
[cloudshell-user@ip-10-2-30-244 ~]$ aws s3 cp s3://arn:aws:s3:us-east-1:841860927337:accesspoint/developers/beach.jpg .
download: s3://arn:aws:s3:us-east-1:841860927337:accesspoint/developers/beach.jpg to ./beach.jpg
```

This confirms that operations through the access point work identically to direct bucket operations.

---

## Configuring the Finance Access Point

A similar process applies for the finance team (user three). Start by copying and adjusting the developers' policy for the finance access point. Update the principal for user three accordingly. For example, a sample policy for the finance access point might look like:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::184186092733:user/users"
            },
            "Action": [
                "s3:GetObject",
                "s3:PutObject"
            ],
            "Resource": [
                "arn:aws:s3:us-east-1:184186092733:accesspoint/developer/objects/*",
                "arn:aws:s3:us-east-1:184186092733:accesspoint/developers"
            ]
        }
    ]
}
```

After updating the policy to reference the correct access point (e.g., "finance") and account details, save the changes. Test by listing contents and copying the file through the finance access point:

```
[cloudshell-user@ip-10-14-113-192 ~]$ aws s3 ls s3://arn:aws:s3:us-east-1:841860927337:accesspoint/finance
2023-03-07 07:39:25  2879431 beach.jpg
[cloudshell-user@ip-10-14-113-192 ~]$ aws s3 cp s3://arn:aws:s3:us-east-1:841860927337:accesspoint/finance/beach.jpg .
download: s3://arn:aws:s3:us-east-1:841860927337:accesspoint/finance/beach.jpg to ./beach.jpg
```

You can also test uploading a new file (e.g., “test1”) to confirm that the permissions are correctly applied through the access point.

---

## Conclusion

This lesson demonstrated how to create and configure S3 Access Points to delegate and manage access policies for different user groups. By assigning separate access point policies rather than relying solely on a bucket policy, you gain granular control of S3 operations. Both the developers (user two) and finance (user three) teams can interact with the same S3 bucket using their dedicated access points, simplifying access management and enhancing security.

Using S3 Access Points not only streamlines policy administration but also provides each team with a tailored “window” into the underlying S3 bucket for optimized and secure data access.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/23e00d1f-6422-4fef-a9bf-e8f007be5514/lesson/3825aa81-2b6f-47c7-9812-750dc48f0dca)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/23e00d1f-6422-4fef-a9bf-e8f007be5514/lesson/bc804536-4e6a-4387-ae8d-e573cf7c8e6d)**
>
> Practice lab
