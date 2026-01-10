# Demo Creating AWS Account - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-IAM/Introduction-to-AWS-Identity-and-Access-Management/Demo-Creating-AWS-Account)

---

## Table of Contents

- Demo Creating AWS Account
  - Step 1: Navigate to the AWS Homepage
  - Step 2: Provide Root User Email and Account Name
  - Step 3: Sign In as the Root User
  - Step 4: Authenticate and Access the Console
  - AWS Account Setup Overview
  - Next Steps
  - References
  - Watch Video

---

## Content

AWS - IAM

Introduction to AWS Identity and Access Management

# Demo Creating AWS Account

In this tutorial, you’ll learn how to set up a brand-new AWS account for your HR team. We’ll cover:

- Creating and verifying a root user
- Signing in for the first time
- Accessing the AWS Management Console

---

## Step 1: Navigate to the AWS Homepage

1.  Open your browser and go to https://aws.amazon.com.
2.  In the top-right corner, click **Create an AWS Account**.

![The image shows an AWS signup page where users can enter their root email address and account name to create a new AWS account. There is also an option to sign in to an existing account.](https://kodekloud.com/kk-media/image/upload/v1752863017/notes-assets/images/AWS-IAM-Demo-Creating-AWS-Account/aws-signup-page-root-email-account.jpg)

> [!important]
> **Note**
>
> Ensure you’re using a secure and private network when creating your AWS root account.

---

## Step 2: Provide Root User Email and Account Name

On the signup form:

- Under **Root user**, enter the email address that HR will manage:

  ```
  HR@company1.com
  ```

- Under **Account name**, choose a clear identifier:

  ```
  HR
  ```

- Click **Verify email address**.  
  You’ll receive a one-time code—enter it to confirm your email.

---

## Step 3: Sign In as the Root User

1.  Return to https://aws.amazon.com and click **Sign In**.
2.  Select **Root user** (since no IAM users exist yet).
3.  Enter the same email you used during signup, then click **Next**.

![The image shows an AWS sign-in page with options for root and IAM user login, alongside a promotional section for AWS Skill Builder offering access to over 500 free digital courses.](https://kodekloud.com/kk-media/image/upload/v1752863018/notes-assets/images/AWS-IAM-Demo-Creating-AWS-Account/aws-sign-in-page-skill-builder.jpg)

---

## Step 4: Authenticate and Access the Console

1.  Enter your chosen password at the prompt.
2.  Click **Sign In**.
3.  You’ll land on the AWS Management Console as the root user.

> [!important]
> **Warning**
>
> Your root user has full account access. Avoid using these credentials for everyday tasks. After setup, create an [IAM admin user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html) and assign least-privilege permissions.

---

## AWS Account Setup Overview

| User Type | Description                      | Best Practice                                  |
| --------- | -------------------------------- | ---------------------------------------------- |
| Root user | Full access to all AWS resources | Use only for billing, support, and setup tasks |
| IAM user  | Permission-scoped user accounts  | Assign roles and policies for daily operations |

---

## Next Steps

- Create IAM users and groups for HR staff
- Attach appropriate policies (e.g., `AmazonS3ReadOnlyAccess`)
- Enable MFA on your root and admin accounts

---

## References

- [AWS Account Root User Best Practices](https://docs.aws.amazon.com/accounts/latest/reference/root-user.html)
- [IAM User Guide](https://docs.aws.amazon.com/IAM/latest/UserGuide/)
- [AWS Management Console](https://aws.amazon.com/console/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-iam/module/84a65700-7455-4ad8-aeb5-27dfaf07b8cc/lesson/f550c9c0-a9ad-4a0c-9c7d-4aed8f63898f)**
>
> Watch video content
