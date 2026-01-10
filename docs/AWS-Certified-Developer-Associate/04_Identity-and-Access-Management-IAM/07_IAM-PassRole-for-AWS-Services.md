# IAM PassRole for AWS Services - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Identity-and-Access-Management-IAM/IAM-PassRole-for-AWS-Services)

---

## Table of Contents

- IAM PassRole for AWS Services
  - Understanding IAM PassRole
  - Example IAM Policy
  - Applying the IAM Policy
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Identity and Access Management IAM

# IAM PassRole for AWS Services

In this lesson, we explore the IAM PassRole permission—a fundamental requirement for delegating roles to AWS services such as [Amazon Elastic Compute Cloud (EC2)](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2) instances and [AWS Lambda](https://learn.kodekloud.com/user/courses/aws-lambda) functions.

> [!important]
> **Key Information**
>
> The IAM PassRole permission is essential for allowing users to delegate existing roles to AWS services. Explicit permissions must be granted for every AWS operation, ensuring that users only pass roles they are authorized to assign.

## Understanding IAM PassRole

To delegate a role to an AWS service, users need explicit permissions defined in an IAM policy. The `iam:PassRole` action specifically enables a user to transfer an existing role to another service, while the `iam:GetRole` action permits them to view role details.

## Example IAM Policy

Below is an example policy that grants a user permission to retrieve role information and pass the role to an AWS service. The policy restricts these actions to roles matching the identifier "EC2-roles-for-XYZ-\*", enhancing security by enforcing specific resource boundaries.

```
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": [
      "iam:GetRole",
      "iam:PassRole"
    ],
    "Resource": "arn:aws:iam::account-id:role/EC2-roles-for-XYZ-*"
  }]
}
```

> [!important]
> **Policy Breakdown**
>
> - The `iam:GetRole` action allows a user to read the details of a role.
> - The `iam:PassRole` action enables the user to assign the role to an AWS service, such as an EC2 instance.
> - The `Resource` field specifies that the policy applies only to roles matching the pattern "EC2-roles-for-XYZ-\*".

## Applying the IAM Policy

When this policy is attached to a user or role, it authorizes them to assign the specified role (e.g., `EC2-roles-for-XYZ-*`) to AWS services. This delegation ensures that the service receives the proper permissions defined by the role while maintaining strict control over which roles can be passed.

Implementing this policy effectively enforces your AWS security best practices, ensuring that users have the necessary, yet limited, permissions to delegate roles within your environment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/683c50bc-9bd3-4094-b666-354fcc06941f/lesson/dd412ec0-9cc3-4e30-85aa-449c85ff387c)**
>
> Watch video content
