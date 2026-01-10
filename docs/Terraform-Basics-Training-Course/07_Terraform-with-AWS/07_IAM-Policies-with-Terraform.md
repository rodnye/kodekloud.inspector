# IAM Policies with Terraform - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Basics-Training-Course/Terraform-with-AWS/IAM-Policies-with-Terraform)

---

## Table of Contents

- IAM Policies with Terraform
  - Prerequisites
  - Creating an IAM Policy Document
  - Defining Resources in Terraform
  - Deploying the Configuration
  - Alternative Approach: Using an External JSON File
  - Summary
  - Watch Video
  - Practice Lab
    - Step 1: Declare the IAM User and IAM Policy
    - Step 2: Incorporate the Policy Document with Heredoc Syntax
    - Step 3: Attaching the Policy to the IAM User
    - Complete Terraform Configuration
    - Steps to Use an External File:

---

## Content

Terraform Basics Training Course

Terraform with AWS

# IAM Policies with Terraform

In this lesson, you will learn how to create IAM policies using Terraform and attach them to an AWS user. We will use the example of an IAM user named Lucy, who initially has no permissions. By following the principle of least privilege, we will incrementally grant her the required permissions.

> [!important]
> **Least Privilege Best Practice**
>
> Always start AWS users with the least privilege and only grant specific permissions as needed.

## Prerequisites

Before you begin, ensure you have an IAM user created. In our example, Lucy has already been created.

## Creating an IAM Policy Document

AWS uses JSON-formatted policy documents to define permissions. Below is an example of an administrator access policy document:

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

## Defining Resources in Terraform

To add permissions via Terraform, you will use the `aws_iam_policy` resource. According to the [AWS Terraform Provider Documentation](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_policy), the only mandatory argument for this resource is the policy document in JSON format.

### Step 1: Declare the IAM User and IAM Policy

Below is a Terraform configuration snippet that first defines the IAM user resource, followed by the IAM policy resource:

```
resource "aws_iam_user" "admin-user" {
  name = "lucy"
  tags = {
    Description = "Technical Team Leader"
  }
}

resource "aws_iam_policy" "adminUser" {
  name   = "AdminUsers"
  policy = ?
}
```

### Step 2: Incorporate the Policy Document with Heredoc Syntax

One efficient method to include the policy document within your Terraform configuration is to use a heredoc. This allows you to embed multi-line strings without external file references. Here’s how to integrate the JSON document using this syntax:

```
resource "aws_iam_user" "admin-user" {
  name = "lucy"
  tags = {
    Description = "Technical Team Leader"
  }
}

resource "aws_iam_policy" "adminUser" {
  name   = "AdminUsers"
  policy = <<EOF
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
EOF
}
```

### Step 3: Attaching the Policy to the IAM User

Even though the IAM policy is defined, it is not automatically granted to Lucy. To attach the policy, we use the `aws_iam_user_policy_attachment` resource. This resource takes the username and the ARN of the IAM policy as inputs:

```
resource "aws_iam_user_policy_attachment" "lucy-admin-access" {
  user       = aws_iam_user.admin-user.name
  policy_arn = aws_iam_policy.adminUser.arn
}
```

### Complete Terraform Configuration

Combining all the resources, the complete Terraform configuration looks as follows:

```
resource "aws_iam_user" "admin-user" {
  name = "lucy"
  tags = {
    Description = "Technical Team Leader"
  }
}

resource "aws_iam_policy" "adminUser" {
  name   = "AdminUsers"
  policy = <<EOF
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
EOF
}

resource "aws_iam_user_policy_attachment" "lucy-admin-access" {
  user       = aws_iam_user.admin-user.name
  policy_arn = aws_iam_policy.adminUser.arn
}
```

## Deploying the Configuration

After finalizing your Terraform configuration, follow these steps to preview and apply your changes:

```
$ terraform plan
$ terraform apply
```

Below is a sample output from the Terraform apply process:

```
$ terraform apply
# aws_iam_policy.adminUser will be created
+ resource "aws_iam_policy" "adminUser" {
    + arn    = (known after apply)
    + id     = (known after apply)
    + name   = "AdminUsers"
    + path   = "/"
    + policy = jsonencode(
        {
          + Statement = [
              + {
                  + Action   = "*"
                  + Effect   = "Allow"
                  + Resource = "*"
                },
            ]
          + Version = "2012-10-17"
        }
      )
}

:[Output Truncated]
aws_iam_user.lucy: Creating...
aws_iam_policy.adminUser: Creating...
aws_iam_user.lucy: Creation complete after 0s [id=lucy]
aws_iam_policy.adminUser: Creation complete after 0s
aws_iam_user_policy_attachment.lucy-admin-access: Creating...
aws_iam_user_policy_attachment.lucy-admin-access: Creation complete after 0s [id=lucy-2020919034158686100000001]

Apply complete! Resources: 3 added, 0 changed, 0 destroyed.
```

> [!important]
> **Review Your Configuration**
>
> Double-check your IAM policies and user attachments to ensure you are not inadvertently granting excessive permissions.

## Alternative Approach: Using an External JSON File

An alternative method to define the IAM policy document is to store it in an external file. This can enhance readability and maintainability.

### Steps to Use an External File:

1.  Create a file named `admin-policy.json` in the same directory as your `main.tf`.
2.  Move the JSON policy document into `admin-policy.json`.

Update the IAM policy resource to read the policy document using the `file` function:

```
resource "aws_iam_policy" "adminUser" {
  name   = "AdminUsers"
  policy = file("admin-policy.json")
}
```

The remainder of the configuration remains unchanged.

## Summary

In this lesson, you learned how to create an IAM policy with Terraform and attach it to an IAM user. These techniques are essential for managing AWS permissions securely and efficiently. Continue practicing these methods with practical exercises to master AWS infrastructure provisioning with Terraform.

For more information on IAM policies and Terraform, refer to:

- [Terraform AWS Provider - IAM Policy](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_policy)
- [AWS IAM Documentation](https://docs.aws.amazon.com/iam/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/e1d12378-f838-46c9-9b2e-28d86daa1e1e/lesson/35a22034-f257-4b05-9a60-75c6a7d3cf68)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/e1d12378-f838-46c9-9b2e-28d86daa1e1e/lesson/cdc489ff-7591-4875-8d6a-9cddc5f4256a)**
>
> Practice lab
