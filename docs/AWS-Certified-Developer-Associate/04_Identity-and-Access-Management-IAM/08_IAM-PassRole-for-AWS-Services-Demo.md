# IAM PassRole for AWS Services Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Identity-and-Access-Management-IAM/IAM-PassRole-for-AWS-Services-Demo)

---

## Table of Contents

- IAM PassRole for AWS Services Demo
  - Overview
  - Configuring the Trust Policy
  - Assigning the Role to an EC2 Instance
  - Granting IAM PassRole Permission to a User
  - Testing the Configuration
  - Summary
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Identity and Access Management IAM

# IAM PassRole for AWS Services Demo

In a previous lesson, we discussed the importance of assigning IAM roles to specific AWS services so that they have the necessary permissions to perform various operations in your AWS accounts. When logged in as a user, you must possess the IAM PassRole permission to assign a role to an AWS service. In this demo, we will explain how to grant a user the IAM PassRole permission, enabling them to assign a specific role to an EC2 instance.

## Overview

For this demonstration, Firefox is set up to log into three AWS accounts simultaneously:

- **Administrator Account (Blue):** Full permissions.
- **User One Account (Green)**
- **User Two Account (Purple)**

The demo involves creating a role named **"EC2 S3 Access"** with a trust policy configured to allow only EC2 to assume the role.

## Configuring the Trust Policy

The trust policy for the **"EC2 S3 Access"** role is defined as follows:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "sts:AssumeRole"
      ],
      "Principal": {
        "Service": [
          "ec2.amazonaws.com"
        ]
      }
    }
  ]
}
```

This configuration ensures that only the EC2 service can assume the role. After creating the role, verify its existence by searching for **"EC2 S3 Access"** in the AWS console.

## Assigning the Role to an EC2 Instance

Next, using either **User One** or **User Two**, navigate to the EC2 dashboard and select an instance (for example, a web app instance). Follow these steps to assign the role:

1.  Choose the instance.
2.  Click on **Actions**.
3.  Select **Security**.
4.  Click **Modify IAM Role**.
5.  Search for **"EC2 S3 Access"** and assign it to the instance.

![The image shows an AWS console interface where a user is modifying an IAM role for an EC2 instance. The user is selecting from a list of IAM roles that include options like "demo-ec2-codedeploy" and "EC2S3Access."](https://kodekloud.com/kk-media/image/upload/v1752858956/notes-assets/images/AWS-Certified-Developer-Associate-IAM-PassRole-for-AWS-Services-Demo/aws-console-iam-role-ec2.jpg)

> [!important]
> **Important**
>
> When attempting this operation with **User One**, an error message appears stating that they are not authorized to perform the operation. This clearly demonstrates the necessity of having the proper IAM PassRole permission during role assignment.

A similar error will occur for **User Two** if the required permission hasn’t been granted.

![The image shows an AWS console screen with an error message indicating a failure to attach an instance profile due to insufficient permissions. It displays the "Modify IAM role" section for an EC2 instance.](https://kodekloud.com/kk-media/image/upload/v1752858958/notes-assets/images/AWS-Certified-Developer-Associate-IAM-PassRole-for-AWS-Services-Demo/aws-console-error-instance-profile.jpg)

## Granting IAM PassRole Permission to a User

To resolve permission issues for **User Two**, the IAM PassRole permission must be explicitly assigned. The inline policy below grants **User Two** permission to pass the **EC2 S3 Access** role (in addition to the `iam:GetRole` action, although only `iam:PassRole` is required):

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "iam:GetRole",
        "iam:PassRole"
      ],
      "Resource": "arn:aws:iam::841860927337:role/EC2S3Access"
    }
  ]
}
```

To apply this policy:

1.  Log in as the **Administrator**.
2.  Navigate to the IAM console and select **User Two**.
3.  Click on **Add permissions** and choose **Create inline policy**.
4.  Switch to the JSON tab and paste the above policy.
5.  Provide a name for the policy (e.g., **pass role EC2 S3 access**) and create it.

![The image shows an AWS Identity and Access Management (IAM) console screen for a user named "user2," displaying their summary, permissions policies, and other access management options.](https://kodekloud.com/kk-media/image/upload/v1752858961/notes-assets/images/AWS-Certified-Developer-Associate-IAM-PassRole-for-AWS-Services-Demo/aws-iam-console-user2-summary.jpg)

## Testing the Configuration

After assigning the policy, test the configuration with these steps:

- Log in as **User One** and attempt to modify the IAM role for an EC2 instance. The error should persist since **User One** does not have the required permissions.
- Log in as **User Two** and try again. When modifying the IAM role and selecting **"EC2 S3 Access"**, the operation should now succeed.

![The image shows an AWS EC2 console with two running instances listed, both of type t2.micro. The interface displays details like instance ID, status checks, and availability zones.](https://kodekloud.com/kk-media/image/upload/v1752858964/notes-assets/images/AWS-Certified-Developer-Associate-IAM-PassRole-for-AWS-Services-Demo/aws-ec2-console-t2micro-instances.jpg)

## Summary

To enable a user to assign a role to an AWS service, ensure that the specific IAM PassRole permission is granted for that role. For clarity, here is the complete inline policy again:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "iam:GetRole",
        "iam:PassRole"
      ],
      "Resource": "arn:aws:iam::841860927337:role/EC2S3Access"
    }
  ]
}
```

> [!important]
> **Key Takeaway**
>
> Configuring the IAM PassRole permission correctly is crucial for enabling AWS services to operate securely and efficiently. Always ensure that only the required permissions are granted to reduce potential security risks.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/683c50bc-9bd3-4094-b666-354fcc06941f/lesson/7228b50f-7888-4838-8c0a-420543f6eeed)**
>
> Watch video content
