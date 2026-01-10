# Introduction to IAM - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Basics-Training-Course/Terraform-with-AWS/Introduction-to-IAM)

---

## Table of Contents

- Introduction to IAM
  - Assigning Permissions
  - IAM Roles for AWS Services
  - Creating Custom IAM Policies
  - Summary
  - Watch Video

---

## Content

Terraform Basics Training Course

Terraform with AWS

# Introduction to IAM

In this lesson, we explore Identity and Access Management (IAM) in AWS—a critical component for securing and managing access to cloud resources. We begin by highlighting the significance of the AWS root account and laying out best practices for creating individual IAM users for daily operations.

When you first register for an AWS account, you use an email address and password. This email address is linked to the root account, which has complete administrative privileges—similar to the root user in Linux or an administrator in Windows. Although the root account provides full access to all AWS services, it is highly recommended that you use it only for creating new IAM users. Once these users are established, secure your root account credentials and refrain from using them for routine tasks.

![A diagram showing an AWS Root Account connected to four users: Lucy, Max, Abdul, and Lee.](https://kodekloud.com/kk-media/image/upload/v1752884241/notes-assets/images/Terraform-Basics-Training-Course-Introduction-to-IAM/frame_90.jpg)

In this lesson, we demonstrate how to create new IAM users: Lucy, Max, Abdul, and Lee. AWS provides two distinct access methods for these users:

1.  **Management Console Access:** Involves a valid username and password for the AWS Management Console.
2.  **Programmatic Access:** Enables interactions using CLI tools on platforms like Linux, macOS, or Windows PowerShell, through an access key ID and secret access key.

For instance, to interact with an S3 bucket programmatically, you might execute:

```
aws s3api create-bucket --bucket my-bucket --region us-east-1
```

> [!important]
> **Note**
>
> Remember that programmatic access keys do not allow login to the Management Console. This distinction is crucial for maintaining secure access practices.

## Assigning Permissions

When an IAM user is created, the principle of least privilege is applied. Each user's capabilities are constrained by the permissions specified in their IAM policy. For example, if Lucy, the project's technical lead, needs full administrative access, you would attach AWS’s managed "Administrator Access" policy to her account. The JSON for this policy looks like:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "*",
            "Resource": "*"
        }
    ]
}
```

This policy grants Lucy complete access to perform any action on all resources within the AWS account.

AWS also offers a variety of managed policies tailored for specific job functions such as billing, database administration, and network management. For further details on these policies, refer to the extended discussion later in this lesson.

![The image shows a list of AWS IAM policies, including "AdministratorAccess," with types and usage details, from the AWS Management Console.](https://kodekloud.com/kk-media/image/upload/v1752884242/notes-assets/images/Terraform-Basics-Training-Course-Introduction-to-IAM/frame_270.jpg)

For developers like Max, Abdul, and Lee who require access to both AWS EC2 and S3 services, a common practice is to create an IAM group (e.g., "Developer Group") and attach policies such as AmazonEC2FullAccess and AmazonS3FullAccess. You are also able to attach additional policies directly to individual users within the group if necessary.

![The image illustrates an IAM group named "Developer Group" with members Max, Abdul, and Lee, having AmazonEC2FullAccess and AmazonS3FullAccess permissions.](https://kodekloud.com/kk-media/image/upload/v1752884243/notes-assets/images/Terraform-Basics-Training-Course-Introduction-to-IAM/frame_380.jpg)

## IAM Roles for AWS Services

The permissions discussed so far are for human users accessing AWS either via the Management Console or programmatically. AWS services, such as an EC2 instance, do not inherently possess permissions to interact with other AWS resources (for example, accessing an S3 bucket).

To enable an AWS service to interact with another resource, you create an IAM role. For example, to permit an EC2 instance to access an S3 bucket, you would establish a role (e.g., "S3 Access Role") and attach a policy like "Amazon S3 Full Access." Once the role is associated with the EC2 instance, it gains the necessary permissions to perform S3 operations.

Using IAM roles is a secure and recommended practice that not only facilitates service-to-service interactions but also supports cross-account access, application-based access, and even temporary access for users managed outside of AWS (e.g., through an organization's Active Directory).

## Creating Custom IAM Policies

In addition to AWS managed policies, you can create custom IAM policies to match specific operational requirements. For instance, if you want a user to be able to create and delete tags on an EC2 instance, you could define a custom policy as shown below:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ec2:CreateTags",
                "ec2:DeleteTags"
            ],
            "Resource": "*"
        }
    ]
}
```

This custom policy grants the user permission exclusively to perform the "ec2:CreateTags" and "ec2:DeleteTags" actions on any EC2 resources. Once created, this policy can be assigned within your AWS account to enforce specific permissions.

## Summary

In this lesson, we covered the foundational steps in setting up IAM users, groups, and roles while attaching both managed and custom policies. Following these practices is essential for effectively managing and securing your AWS resources, ensuring that every user and service has the appropriate permissions they need without exceeding their scope.

For more detailed information or further reading, consider exploring the following resources:

- [AWS Identity and Access Management (IAM)](https://aws.amazon.com/iam/)
- [AWS IAM User Guide](https://docs.aws.amazon.com/IAM/latest/UserGuide/)
- [Security Best Practices](https://aws.amazon.com/security/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/e1d12378-f838-46c9-9b2e-28d86daa1e1e/lesson/0aea4cb1-d8fd-4296-a21d-80fccb11fe93)**
>
> Watch video content
