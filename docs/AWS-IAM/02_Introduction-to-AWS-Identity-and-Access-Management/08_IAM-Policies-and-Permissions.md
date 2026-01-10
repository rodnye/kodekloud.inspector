# IAM Policies and Permissions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-IAM/Introduction-to-AWS-Identity-and-Access-Management/IAM-Policies-and-Permissions)

---

## Table of Contents

- IAM Policies and Permissions
  - Principle of Least Privilege
  - Defining Permissions
  - What Is an IAM Policy?
  - Identity-based Policy Example
  - Demo: Creating an Identity Policy
  - Links and References
  - Watch Video
    - Policy Types

---

## Content

AWS - IAM

Introduction to AWS Identity and Access Management

# IAM Policies and Permissions

In AWS, **IAM policies** and **permissions** control who can perform which actions on which resources. Applying the Principle of Least Privilege—granting only the access needed to perform a task—helps secure your environment.

## Principle of Least Privilege

Grant users and roles only the permissions they require. In this example, Sarah creates three groups:

- **Admins** (Bob and Susan): full management rights across AWS services.
- **Developers**: access limited to a specific Sales folder.
- **Test** (Kathy and Alan): no access to the Sales folder.

![The image illustrates a diagram for implementing the Principle of Least Privilege, showing different user groups (Admins, Developers, Test) and their access permissions to AWS Services and a Sales Folder.](https://kodekloud.com/kk-media/image/upload/v1752863057/notes-assets/images/AWS-IAM-IAM-Policies-and-Permissions/least-privilege-diagram-user-groups-aws.jpg)

> [!important]
> **Note**
>
> Applying least privilege minimizes the blast radius if credentials are compromised.

## Defining Permissions

A **permission** is a fine-grained control that authorizes an action on an AWS resource. Common permission examples:

- `ec2:StartInstances` – start an EC2 instance
- `s3:GetObject` – download an object from an S3 bucket
- `sqs:CreateQueue` – create a new SQS queue
- `sns:DeleteTopic` – delete an SNS topic

A **policy** is a collection of one or more permissions.

## What Is an IAM Policy?

An IAM policy is a JSON document that defines:

- **Who** (user, group, role) can perform
- **What** actions on
- **Which** resources

IAM policies give you granular control over access.

![The image explains IAM policies, highlighting their role in managing access and permissions in AWS, defining permissions for identities or resources, specifying accessible resources and operations, and providing fine-grained access control.](https://kodekloud.com/kk-media/image/upload/v1752863058/notes-assets/images/AWS-IAM-IAM-Policies-and-Permissions/iam-policies-aws-access-control.jpg)

### Policy Types

IAM policies fall into two primary categories:

| Policy Type           | Attachment Point                 | Use Case                                         |
| --------------------- | -------------------------------- | ------------------------------------------------ |
| Identity-based policy | Users, groups, roles             | Grant permissions to IAM identities              |
| Resource-based policy | AWS resources (e.g., S3, Lambda) | Attach policies directly to resources themselves |

![The image categorizes IAM policies into "Identity Policies" and "Resource-Based Policies," with examples like Role, Group, User, S3, and Lambda.](https://kodekloud.com/kk-media/image/upload/v1752863059/notes-assets/images/AWS-IAM-IAM-Policies-and-Permissions/iam-policies-identity-resource-examples.jpg)

You can attach an identity-based policy to a group of developers or assign a role to an EC2 instance so your applications inherit those permissions.

## Identity-based Policy Example

Below is a sample JSON identity policy with two statements:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:*"
      ],
      "Resource": [
        "arn:aws:s3:::<bucket-name>"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "ec2:StartInstances"
      ],
      "Resource": [
        "arn:aws:ec2:<region>:<account-id>:instance/<instance-id>"
      ]
    }
  ]
}
```

- The first statement allows **all** S3 actions on a specific bucket.
- The second statement allows starting a particular EC2 instance.

> [!important]
> **Warning**
>
> Use wildcard (`*`) actions sparingly. Overly broad permissions increase security risks.

## Demo: Creating an Identity Policy

Follow these steps in the AWS Management Console to create and attach an identity-based policy to a group:

1.  Sign in to the [IAM console](https://console.aws.amazon.com/iam/).
2.  Navigate to **Policies** > **Create policy**.
3.  Use the JSON editor to paste your policy document.
4.  Review and **Create policy**.
5.  Attach the new policy to your IAM group.

![The image is a slide titled "Create Identity Policy" with an illustration of a person pointing to a "Demo" sign. It includes instructions for creating identity-based policies for IAM groups on AWS.](https://kodekloud.com/kk-media/image/upload/v1752863060/notes-assets/images/AWS-IAM-IAM-Policies-and-Permissions/create-identity-policy-aws-iam-demo.jpg)

## Links and References

- [AWS IAM User Guide](https://docs.aws.amazon.com/IAM/latest/UserGuide/)
- [Understanding IAM Policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html)
- [AWS JSON Policy Elements Reference](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements.html)
- [Security Best Practices in IAM](https://aws.amazon.com/iam/resources/best-practices/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-iam/module/84a65700-7455-4ad8-aeb5-27dfaf07b8cc/lesson/3bc55c93-b68f-47b0-a8a6-5717289c7d89)**
>
> Watch video content
