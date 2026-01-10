# AWS IAM with Terraform - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Basics-Training-Course/Terraform-with-AWS/AWS-IAM-with-Terraform)

---

## Table of Contents

- AWS IAM with Terraform
  - Creating an IAM User Resource
  - Initializing Terraform and Running the Plan
  - Configuring the AWS Provider
  - Executing the Terraform Plan and Apply
  - Best Practices for Managing Credentials
  - Summary
  - Watch Video
    - AWS CLI Configuration
    - Environment Variables

---

## Content

Terraform Basics Training Course

Terraform with AWS

# AWS IAM with Terraform

In this guide, you'll learn how to provision AWS IAM resources using Terraform. Previously, we explored using the AWS Management Console and AWS CLI for IAM tasks. Now, we'll streamline the process by leveraging Terraform to create an IAM user resource. For further details, refer to the [AWS Provider documentation on the Terraform Registry](https://registry.terraform.io/providers/hashicorp/aws/latest/docs).

## Creating an IAM User Resource

Terraform resource blocks follow a naming convention where the resource type is prefixed by the provider name. In our example, we will define an AWS IAM user resource block named "admin-user". The block requires a mandatory argument called "name" (the IAM user's name) and can also include optional arguments such as tags.

Below is an example configuration:

```
resource "aws_iam_user" "admin-user" {
  name = "Lucy"
  tags = {
    Description = "Technical Team Leader"
  }
}
```

In this configuration, an IAM user named Lucy is created with a tag that describes the user as a "Technical Team Leader."

## Initializing Terraform and Running the Plan

Before applying the configuration, initialize Terraform to download the AWS provider plugin by running:

```
terraform init
```

After initialization, if you run:

```
terraform plan
```

you might encounter two common issues:

1.  Terraform may prompt for an AWS region. Although IAM resources are global, Terraform requires a region because most AWS resources are region-specific.
2.  Terraform might not find valid AWS credentials to connect to your AWS account.

## Configuring the AWS Provider

To address these issues, add a provider block to your configuration. The provider block specifies both the default region and the credentials needed to interact with your AWS account. The following combined configuration includes both the provider block and the IAM user resource block:

```
provider "aws" {
  region     = "us-west-2"
  access_key = "AKIAI44QH8DHBEXAMPLE"
  secret_key = "je7MtGbClwBF/2tk/h3yCo8n..."
}

resource "aws_iam_user" "admin-user" {
  name = "Lucy"
  tags = {
    Description = "Technical Team Leader"
  }
}
```

In this setup, the default region is set to US West 2. The access key and secret access key ensure Terraform can authenticate and make changes to your AWS account.

## Executing the Terraform Plan and Apply

With the provider configuration in place, proceed by running:

```
terraform plan
```

You'll see an execution plan similar to this:

```
$ terraform plan
...
+ create

Terraform will perform the following actions:

# aws_iam_user.admin-user will be created
+ resource "aws_iam_user" "admin-user" {
    + arn           = (known after apply)
    + force_destroy = false
    + id            = (known after apply)
    + name          = "Lucy"
    + path          = "/"
    + tags          = {
        + "Description" = "Technical Team Leader"
      }
    + unique_id     = (known after apply)
}

Plan: 1 to add, 0 to change, 0 to destroy.
```

After verifying the plan, apply the changes using:

```
terraform apply
```

Terraform will then create the IAM user as described in your configuration.

## Best Practices for Managing Credentials

Hardcoding credentials in your Terraform configuration is not recommended, especially when storing files in version control. Instead, consider one of the following alternatives:

> [!important]
> **Credential Management Best Practices**
>
> Avoid embedding sensitive information directly into your Terraform files. Instead, use environment variables or CLI configurations to manage your credentials securely.

### AWS CLI Configuration

Configure the AWS CLI on your machine using:

```
aws configure
```

This creates a credentials file (typically located at `~/.aws/credentials`):

```
[default]
aws_access_key_id = YOUR_ACCESS_KEY_ID
aws_secret_access_key = YOUR_SECRET_ACCESS_KEY
```

Terraform will automatically use these stored credentials.

### Environment Variables

Alternatively, you can set environment variables for your AWS credentials and region:

```
export AWS_ACCESS_KEY_ID=YOUR_ACCESS_KEY_ID
export AWS_SECRET_ACCESS_KEY=YOUR_SECRET_ACCESS_KEY
export AWS_DEFAULT_REGION=us-west-2
```

These methods enhance security by removing sensitive information from your Terraform configurations.

## Summary

By following these steps, you can efficiently provision and manage AWS IAM resources using Terraform, ensuring a more secure and maintainable infrastructure as code. For more detailed information, check out the [Terraform AWS Provider Documentation](https://registry.terraform.io/providers/hashicorp/aws/latest/docs).

Happy provisioning!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/e1d12378-f838-46c9-9b2e-28d86daa1e1e/lesson/9aed1294-d2a8-455d-b8c1-1d87f28e4f5d)**
>
> Watch video content
