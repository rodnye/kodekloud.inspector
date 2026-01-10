# Demo Configuring Users and Group Access and Policies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-4-Security-and-Compliance/Demo-Configuring-Users-and-Group-Access-and-Policies)

---

## Table of Contents

- Demo Configuring Users and Group Access and Policies
  - Summary
  - Watch Video
  - Practice Lab

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 4 Security and Compliance

# Demo Configuring Users and Group Access and Policies

Welcome to this instructional session where Michael Forrester demonstrates how to configure AWS IAM users, groups, and their associated policies using the AWS Identity and Access Management (IAM) service. In this lesson, you'll learn to leverage groups for policy management—a best practice in enterprise environments—to avoid assigning policies directly to users or roles.

> [!important]
> **Tip**
>
> Using groups with intuitive names (e.g., "Project_A_S3_Readonly") enhances clarity and streamlines user management, especially when dealing with multiple projects and varying access levels.

![The image shows an AWS Identity and Access Management (IAM) dashboard with security recommendations and account details. It includes information about multi-factor authentication and IAM resources like user groups, users, roles, and policies.](https://kodekloud.com/kk-media/image/upload/v1752860437/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Configuring-Users-and-Group-Access-and-Policies/aws-iam-dashboard-security-recommendations.jpg)

For example, imagine you want to create a group named "Project_A_S3_Readonly". The name clearly indicates that the group is linked to Project A and is intended for users who need read-only access to the S3 service. Enterprises often organize groups based on project name, service type, and role (e.g., operations, developer) to easily locate and manage permissions.

Consider a scenario where your environment includes multiple users (such as yourself and a colleague named Fani) and several S3 buckets for Project A. You might need one group for read-only access and another for read-write access. By attaching a read-only access policy to the appropriate group, you maintain clear and secure permission boundaries.

![The image shows an AWS Identity and Access Management (IAM) dashboard displaying a list of user groups with details such as name, number of users, and activity timestamps.](https://kodekloud.com/kk-media/image/upload/v1752860438/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Configuring-Users-and-Group-Access-and-Policies/aws-iam-dashboard-user-groups.jpg)

AWS provides a range of managed policies, but many enterprises favor customer-managed policies to have complete control over fine-grained permissions. In this demonstration, Michael creates a custom JSON-based policy for S3 read-only access. Although this example is generic, remember that in production environments, you should limit access by specifying resource names (such as the bucket name) in your policy conditions.

Below is a basic S3 read-only policy that grants permissions to list, describe, and get objects for both S3 and S3 Object Lambda:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:Get*",
        "s3:List*",
        "s3:Describe*",
        "s3-object-lambda:Get*",
        "s3-object-lambda:List*"
      ],
      "Resource": "*"
    }
  ]
}
```

> [!important]
> **Security Reminder**
>
> While using wildcards in actions is acceptable for demonstrations, it is advisable to specify exact services and resources for enhanced security and compliance.

To implement stricter security, Michael refines the policy by restricting access to a specific bucket and its objects. First, he specifies the Amazon Resource Name (ARN) for both the bucket and its content:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:Get*",
        "s3:List*",
        "s3:Describe*",
        "s3-object-lambda:Get*",
        "s3-object-lambda:List*"
      ],
      "Resource": [
        "arn:aws:s3:::mrfkksservices",
        "arn:aws:s3:::mrfkksservices/*"
      ]
    }
  ]
}
```

Next, he further enhances security by adding a condition that limits access to a specific source IP address—71.131.99.101/32. This ensures that S3 requests are only honored if they originate from an approved location:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:Get*",
        "s3:List*",
        "s3:Describe*",
        "s3-object-lambda:Get*",
        "s3-object-lambda:List*"
      ],
      "Resource": [
        "arn:aws:s3:::mrfkservices",
        "arn:aws:s3:::mrfkservices/*"
      ],
      "Condition": {
        "IpAddress": {
          "aws:SourceIp": "71.131.99.101/32"
        }
      }
    }
  ]
}
```

This final policy is applied to the “Project_A_S3_Readonly” group. It not only grants S3 read-only access but also restricts access to a predetermined bucket ("mrfkservices") and enforces network restrictions with a designated IP address. Remember, if any deny statements were specified, they would override these allow statements.

![The image shows an AWS Identity and Access Management (IAM) console screen, displaying the permissions for a user group named "Project_A_S3_Readonly," which has an "AmazonS3ReadOnlyAccess" policy attached.](https://kodekloud.com/kk-media/image/upload/v1752860440/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Configuring-Users-and-Group-Access-and-Policies/aws-iam-console-project-a-s3-readonly.jpg)

Once the policy is configured, attach it to the relevant user group via the IAM console. You will notice that the policy type changes from an AWS-managed policy to a customer-managed policy, indicating that you now have full control and can modify the policy as needed. Enterprises typically prefer customer-managed policies to prevent unexpected changes from AWS that might affect their security setup.

![The image shows an AWS IAM console screen displaying a list of permission policies, including their names, types, usage, and descriptions.](https://kodekloud.com/kk-media/image/upload/v1752860441/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Configuring-Users-and-Group-Access-and-Policies/aws-iam-console-permission-policies.jpg)

## Summary

This lesson demonstrated how to create a user group named "Project_A_S3_Readonly" that includes two users, attach a customer-managed policy granting S3 read-only access, and enforce network restrictions based on a specific source IP address. By following these steps, you can achieve granular permissions tailored to meet your security compliance needs.

See you in the next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/0c9bb9a3-5201-434e-8085-a9f1e9f23f22/lesson/f6718a09-9c80-4f7c-9b6e-c345e50ad07e)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/0c9bb9a3-5201-434e-8085-a9f1e9f23f22/lesson/1100377e-13a1-4f94-bd0a-25f4897388b1)**
>
> Practice lab
