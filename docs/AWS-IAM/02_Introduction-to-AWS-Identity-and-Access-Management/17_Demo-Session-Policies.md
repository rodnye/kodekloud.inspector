# Demo Session Policies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-IAM/Introduction-to-AWS-Identity-and-Access-Management/Demo-Session-Policies)

---

## Table of Contents

- Demo Session Policies
  - Prerequisites
  - Step 1: Verify Current AWS Identity
  - Step 2: List Bucket Contents and Test Upload
  - Step 3: Define the Session Policy
  - Step 4: Create and Configure the IAM Role
  - Step 5: Assume the Role and Export Temporary Credentials
  - Step 6: Verify Upload Succeeds
  - Links and References
  - Watch Video

---

## Content

AWS - IAM

Introduction to AWS Identity and Access Management

# Demo Session Policies

In this tutorial, you’ll grant the IAM user **John** temporary file-upload permissions to the S3 bucket `company1-hr` using an AWS STS session policy and a dedicated IAM role. By the end, John will be able to upload objects for a limited time without altering his long-term permissions.

## Prerequisites

- AWS CLI installed and configured for user **John**
- Bucket `company1-hr` already exists in account `629470240201`
- Basic familiarity with IAM, STS, and S3 permissions

---

## Step 1: Verify Current AWS Identity

Confirm you’re authenticated as **John**:

```
aws sts get-caller-identity
```

Expected output:

```
{
  "UserId": "AIDAZFDZUTSTSYQ6QFLS",
  "Account": "629470240201",
  "Arn": "arn:aws:iam::629470240201:user/john"
}
```

---

## Step 2: List Bucket Contents and Test Upload

Check existing objects and verify that upload is currently denied:

```
aws s3 ls s3://company1-hr
aws s3 cp new-file.txt s3://company1-hr
# fatal error: An error occurred (AccessDenied) when calling the PutObject operation: Access Denied
```

---

## Step 3: Define the Session Policy

Create a JSON policy that allows listing, reading, and uploading:

```
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": [
      "s3:ListBucket",
      "s3:GetObject",
      "s3:PutObject"
    ],
    "Resource": [
      "arn:aws:s3:::company1-hr",
      "arn:aws:s3:::company1-hr/*"
    ]
  }]
}
```

| Action        | Description                      |
| ------------- | -------------------------------- |
| s3:ListBucket | List the bucket’s objects        |
| s3:GetObject  | Download or read bucket objects  |
| s3:PutObject  | Upload new objects to the bucket |

> [!important]
> **Note**
>
> Save this policy as `SessionPolicy-UploadFile.json` and upload it as a **customer-managed policy** named **SessionPolicy-UploadFile**.

---

## Step 4: Create and Configure the IAM Role

1.  In the IAM console or via AWS CLI, create a role **JohnUploadRole**.
2.  Attach the `SessionPolicy-UploadFile` policy to this role.

Update the role’s trust policy so that **John** can assume it:

```
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": {
      "AWS": "arn:aws:iam::629470240201:user/john"
    },
    "Action": "sts:AssumeRole"
  }]
}
```

> [!important]
> **Warning**
>
> Ensure the trust relationship is properly updated—otherwise, John will not be able to assume the role.

---

## Step 5: Assume the Role and Export Temporary Credentials

Have John run the following to get short-lived credentials:

```
aws sts assume-role \
  --role-arn arn:aws:iam::629470240201:role/JohnUploadRole \
  --role-session-name JohnUploadSession
```

Sample response:

```
{
  "Credentials": {
    "AccessKeyId": "ASIAFD2ZUTS3J3PIX55",
    "SecretAccessKey": "iqhGcv6Lp3Y4wUgmIiRiRHhS4KinLURta92SW5V",
    "SessionToken": "IQoJb3JpZ2luX2VjE/////////WwECAa...",
    "Expiration": "2023-10-08T21:53:20Z"
  }
}
```

Export these values to the environment:

```
export AWS_ACCESS_KEY_ID="ASIAFD2ZUTS3J3PIX55"
export AWS_SECRET_ACCESS_KEY="iqhGcv6Lp3Y4wUgmIiRiRHhS4KinLURta92SW5V"
export AWS_SESSION_TOKEN="IQoJb3JpZ2luX2VjE/////////WwECAa..."
```

---

## Step 6: Verify Upload Succeeds

With the new session credentials, repeat the list and upload:

```
aws s3 ls s3://company1-hr
aws s3 cp new-file.txt s3://company1-hr
aws s3 ls s3://company1-hr
# 2023-10-08 17:45:42      7 Test.txt
# 2023-10-08 20:55:38      3 new-file.txt
```

The file `new-file.txt` is now uploaded. These permissions automatically expire when the session token’s `Expiration` time is reached.

---

## Links and References

- [AWS CLI Documentation](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html)
- [AWS STS AssumeRole API](https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html)
- [S3 Permissions Reference](https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html)
- [IAM Trust Policy Examples](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_examples_iam-roles.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-iam/module/84a65700-7455-4ad8-aeb5-27dfaf07b8cc/lesson/3ad23a8c-1591-4d58-a9dd-537b91ed7adb)**
>
> Watch video content
