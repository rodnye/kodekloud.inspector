# S3 ACL and Resource Policies Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Storage/S3-ACL-and-Resource-Policies-Demo)

---

## Table of Contents

- S3 ACL and Resource Policies Demo
  - Overview
  - Creating the S3 Bucket
  - Testing IAM Policies for User Two
  - Creating a Resource Policy for Specific Folder Access
  - Granting Additional Permissions Using a Combined Policy
  - Combining Permissions in a Single Statement
  - Allowing Public Access to Specific Folders
  - Granting Access to a User in a Different AWS Account
  - Conclusion
  - Watch Video
    - Bucket Creation Process
    - Steps to Configure Folder-Specific Access
    - Updated Combined Policy
    - Public Access Policy Example
    - Updating the Bucket Policy for External Access

---

## Content

AWS Solutions Architect Associate Certification

Services Storage

# S3 ACL and Resource Policies Demo

In this lesson, we explore how to control access to an S3 bucket by defining resource policies. You will learn how to grant varying permissions to different users—including users within the same AWS account, users from different accounts, and even anonymous (public) access—by configuring precise policies.

## Overview

The demonstration involves three different user contexts, represented by distinct colored tabs:

- The **blue tab** represents Account One, User One (the bucket creator).
- The **green tab** represents Account One, User Two.
- The **yellow tab** represents Account Two, User Admin (a user from a different account).

Below is the AWS Management Console home page overview:

![The image shows the AWS Management Console home page, featuring sections for recently visited services, AWS Health, cost and usage, and a welcome section with links to getting started, training, and new features.](https://kodekloud.com/kk-media/image/upload/v1752866000/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-ACL-and-Resource-Policies-Demo/aws-management-console-home-page.jpg)

---

## Creating the S3 Bucket

Using Account One, User One (blue tab), we create a demo S3 bucket with default settings. The configuration disables legacy NACLs, versioning remains off, and public access is blocked by default. Once the bucket is created, several files are uploaded.

### Bucket Creation Process

1.  **Creating the Bucket**:  
    A zoomed view of the bucket creation screen illustrates options for bucket name, region, object ownership, and public access settings.

    ![The image shows the AWS Management Console interface for creating an S3 bucket, with options for setting the bucket name, region, object ownership, and public access settings.](https://kodekloud.com/kk-media/image/upload/v1752866001/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-ACL-and-Resource-Policies-Demo/aws-management-console-s3-bucket-creation.jpg)

2.  **Post-creation and Upload**:  
    After the bucket is created, you open it to upload files. The following image confirms the successful creation of a bucket named "kk-resource-policies" in the US East (N. Virginia) region, with the uploaded objects remaining non-public.

    ![The image shows an Amazon S3 console with a notification of a successfully created bucket named "kk-resource-policies" in the US East (N. Virginia) region. The bucket and objects are not public.](https://kodekloud.com/kk-media/image/upload/v1752866002/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-ACL-and-Resource-Policies-Demo/amazon-s3-bucket-kk-resource-policies.jpg)

3.  **Verifying Access**:  
    When accessing an object while authenticated as User One, permission is granted. However, accessing the object URL publicly results in an "Access Denied" error.

    ![The image shows an Amazon S3 bucket interface with a list of files and folders, including text files and folders named "logs," "media," and "traces." The interface displays details like file type, last modified date, and storage class.](https://kodekloud.com/kk-media/image/upload/v1752866004/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-ACL-and-Resource-Policies-Demo/amazon-s3-bucket-interface-files.jpg)

---

## Testing IAM Policies for User Two

Before switching to User Two (green tab), we review the IAM policy assigned to User Two. The policy permits only listing of all buckets and bucket contents:

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

With this policy, User Two can view the bucket in the S3 console but cannot open objects directly. Trying to open a file (e.g., file1.txt) will trigger an "Access Denied" error.

![The image shows an Amazon S3 console with a list of buckets. One bucket named "kk-resource-policies" is displayed with "Insufficient permissions" noted under the access column.](https://kodekloud.com/kk-media/image/upload/v1752866004/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-ACL-and-Resource-Policies-Demo/amazon-s3-console-bucket-permissions.jpg)

---

## Creating a Resource Policy for Specific Folder Access

Returning to User One (blue tab), we now create a resource policy that permits User Two to access only the "logs" folder within the bucket.

### Steps to Configure Folder-Specific Access

1.  **Modify the Bucket Policy**:  
    Navigate to the Permissions tab of the bucket and edit the bucket policy using the AWS built-in wizard. Start with the default template shown below:

    ```
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Sid": "Statement1",
          "Principal": {},
          "Effect": "Allow",
          "Action": [],
          "Resource": []
        }
      ]
    }
    ```

2.  **Policy Implementation**:  
    Name the policy "user2AllowLogs" and specify the principal using the AWS ARN for User Two. For example:

    ```
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Sid": "user2AllowLogs",
          "Principal": {
            "AWS": ["arn:aws:iam::<ACCOUNT_NUMBER>:user/user2"]
          },
          "Effect": "Allow",
          "Action": "s3:GetObject",
          "Resource": "arn:aws:s3:::kk-resource-policies/logs/*"
        }
      ]
    }
    ```

    Replace <ACCOUNT_NUMBER> with the actual account number.

    > [!important]
    > **Note**
    >
    > This resource policy grants GET access on all objects within the "logs" folder, ensuring that User Two can only view the content within that directory.

3.  **Verification**:  
    After saving the policy, switch to User Two (green tab). Test by navigating to the "logs" folder and opening a log file; the file should download successfully. Attempting access to files outside this folder (e.g., file1.txt) will correctly result in "Access Denied."

For additional reference on S3 actions and resource policy construction, refer to the AWS S3 bucket policy documentation:

![The image shows a webpage from the AWS documentation about Amazon S3 bucket policies, detailing how to secure access to objects in buckets and providing examples of typical use cases. It includes a section on requiring encryption for objects written to a bucket.](https://kodekloud.com/kk-media/image/upload/v1752866006/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-ACL-and-Resource-Policies-Demo/aws-s3-bucket-policies-documentation.jpg)

---

## Granting Additional Permissions Using a Combined Policy

Next, we enhance the bucket policy to allow User Two the ability to delete objects from the "traces" folder, while maintaining GET access to the "logs" folder.

### Updated Combined Policy

The revised bucket policy is as follows:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "userAllowLogs",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::<ACCOUNT_NUMBER>:user/user2"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::kk-resource-policies/logs/*"
        },
        {
            "Sid": "user2AllowDelete",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::<ACCOUNT_NUMBER>:user/user2"
            },
            "Action": "s3:DeleteObject",
            "Resource": "arn:aws:s3:::kk-resource-policies/traces/*"
        }
    ]
}
```

> [!important]
> **Note**
>
> This configuration differentiates between GET and DELETE actions by applying them to specified folders using separate policy statements.

After applying this policy, when User Two attempts to delete an object in the "traces" folder (e.g., "trace1"), the deletion is successful, while deletion attempts in other folders are rejected.

---

## Combining Permissions in a Single Statement

At times, you may wish to combine permissions for different resource types in a single statement. However, combining object-level operations (like "s3:GetObject") with bucket-level operations (like "s3:DeleteBucket") in one action can cause errors if applied incorrectly. To resolve this, list both resource ARNs in an array as demonstrated below:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "user2AllObject",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::<ACCOUNT_NUMBER>:user/user2"
      },
      "Action": [
        "s3:GetObject",
        "s3:DeleteBucket"
      ],
      "Resource": [
        "arn:aws:s3:::kk-resource-policies",
        "arn:aws:s3:::kk-resource-policies/*"
      ]
    },
    {
      "Sid": "user2AllowDelete",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::<ACCOUNT_NUMBER>:user/user2"
      },
      "Action": "s3:DeleteObject",
      "Resource": "arn:aws:s3:::kk-resource-policies/traces/*"
    }
  ]
}
```

> [!important]
> **Warning**
>
> Ensure that actions are applied to the correct resource types by segregating bucket-level and object-level operations in your policies.

---

## Allowing Public Access to Specific Folders

To demonstrate controlled public access, a policy statement is added that allows anonymous GET requests for a designated folder, such as "media." Before doing so, disable the "Block Public Access" feature for the bucket as required.

### Public Access Policy Example

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowPublic",
            "Principal": "*",
            "Effect": "Allow",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::kk-resource-policies/media/*"
        }
    ]
}
```

After the policy update, objects stored in the "media" folder become publicly accessible via their URL, while objects outside this folder continue to be restricted.

![The image shows an Amazon S3 console screen displaying the permissions settings for a bucket named "kk-resource-policies," which is publicly accessible. The "Block all public access" setting is turned off, and a bucket policy is visible.](https://kodekloud.com/kk-media/image/upload/v1752866007/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-ACL-and-Resource-Policies-Demo/amazon-s3-bucket-permissions-kk-resource-policies.jpg)

---

## Granting Access to a User in a Different AWS Account

Finally, we demonstrate how to grant permissions to an external user (Account Two, yellow tab). Initially, when the external user attempts to list the bucket contents using Cloud Shell, the output is as follows:

```
[cloudshell-user@ip-10-6-180-191 ~]$ aws s3 ls s3://kk-resource-policies
An error occurred (AccessDenied) when calling the ListObjectsV2 operation: Access Denied
```

### Updating the Bucket Policy for External Access

To allow access, we add new policy statements to permit Account Two's "admin" user the ability to list the bucket and delete objects from the "logs" folder. The updated policy snippet is:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowAccount2UserAdmin",
      "Principal": {
        "AWS": "arn:aws:iam::<ACCOUNT_TWO_NUMBER>:user/admin"
      },
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::kk-resource-policies"
    },
    {
      "Sid": "AllowAccount2UserAdminDelete",
      "Principal": {
        "AWS": "arn:aws:iam::<ACCOUNT_TWO_NUMBER>:user/admin"
      },
      "Effect": "Allow",
      "Action": "s3:DeleteObject",
      "Resource": "arn:aws:s3:::kk-resource-policies/logs/*"
    }
  ]
}
```

Replace <ACCOUNT_TWO_NUMBER> with the appropriate account number.

After saving the change, the external user is able to list the bucket contents and delete objects within the "logs" folder. For example, a Cloud Shell session might display:

```
[cloudshell-user@ip-10-6-180-191 ~]$ aws s3 ls s3://kk-resource-policies
2023-04-06 08:22:04    PRE media/
2023-04-06 08:22:04    PRE traces/
2023-04-06 08:22:05       7 file1.txt
2023-04-06 08:22:05       0 file2.txt
2023-04-06 08:22:05       0 secondfile.txt
```

Deletion of files outside the permitted folder (e.g., file1.txt) remains restricted and will return an "Access Denied" error.

---

## Conclusion

In this lesson, we demonstrated how to:

- Create an S3 bucket and upload objects.
- Use IAM policies to restrict a user's actions.
- Define granular resource policies to grant GET and DELETE access to specific folders.
- Implement public (anonymous) access for a subset of objects.
- Grant permissions to users in other AWS accounts.

By following these techniques, you can achieve flexible and secure access control for your S3 buckets while ensuring efficient resource management.

For more details, visit the [AWS Documentation](https://aws.amazon.com/documentation/) and explore further use cases for resource policies.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/23e00d1f-6422-4fef-a9bf-e8f007be5514/lesson/de57df2f-02a0-4b75-9e76-fb5effad4fe4)**
>
> Watch video content
