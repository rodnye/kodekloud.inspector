# Demo Wrapper Module Approach - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Modules/Demo-Wrapper-Module-Approach)

---

## Table of Contents

- Demo Wrapper Module Approach
  - Why Use a Wrapper Module?
  - 1. Define the Wrapper Module
  - 2. Add a Random Suffix
  - 3. Update Module Outputs
  - 4. Configure Terragrunt
  - 5. Deploy with Terragrunt
  - Learn More
  - Watch Video

---

## Content

Terragrunt for Beginners

Terragrunt Modules

# Demo Wrapper Module Approach

In this example, we'll create a **wrapper module** around the official Terraform S3 bucket community module. This lets you inherit all best practices while enforcing your own naming conventions and configuration rules.

## Why Use a Wrapper Module?

A wrapper module allows you to:

- Leverage community-tested code.
- Enforce company-specific policies (e.g., naming standards).
- Extend or override default settings without modifying upstream code.

| Module                              | Description                                                   | Key Inputs                     |
| ----------------------------------- | ------------------------------------------------------------- | ------------------------------ |
| terraform-aws-modules/s3-bucket/aws | Official S3 bucket module on the Terraform Registry           | `source`, `version`, `bucket`  |
| local wrapper module                | Wraps the community module to append a random suffix to names | `bucket_name`, `suffix_length` |

---

## 1\. Define the Wrapper Module

In your local `modules/s3-bucket` directory, replace the direct resource blocks with a call to the community module:

```
terraform {
  required_providers {
    random = {
      source  = "hashicorp/random"
      version = "3.5.1"
    }
  }
}


module "s3_bucket" {
  source  = "terraform-aws-modules/s3-bucket/aws"
  version = "4.0.0"


  bucket = local.full_bucket_name
  acl    = "private"


  # …any other inputs you normally pass…
}
```

## 2\. Add a Random Suffix

Generate a unique suffix automatically so that bucket names remain globally unique:

```
resource "random_string" "suffix" {
  length           = 8
  special          = false
  upper            = false
}


locals {
  full_bucket_name = "${var.bucket_name}-${random_string.suffix.result}"
}
```

> [!important]
> **Note**
>
> We set `special = false` and `upper = false` to keep the suffix alphanumeric and lowercase only.

## 3\. Update Module Outputs

Since the wrapper no longer defines the bucket resource directly, forward the community module outputs:

```
output "bucket_id" {
  value = module.s3_bucket.bucket_id
}


output "bucket_arn" {
  value = module.s3_bucket.bucket_arn
}
```

## 4\. Configure Terragrunt

In your Terragrunt live configuration, reference the local wrapper module. Notice we no longer supply a suffix manually:

```
terraform {
  source = "../modules/s3-bucket"
}


inputs = {
  bucket_name = "testing-bucket-for-terragrunt"
}
```

> [!important]
> **Warning**
>
> The final bucket name is not known until apply time since it depends on the random suffix.

## 5\. Deploy with Terragrunt

Run:

```
terragrunt init
terragrunt apply
```

Terragrunt will:

1.  Download the S3 bucket community module.
2.  Generate a random suffix.
3.  Create the bucket with your base name plus suffix.
4.  Apply default public-access-block settings from the module.

Confirm the bucket exists:

```
aws s3 ls
# OUTPUT: 2023-01-01 12:00:00 testing-bucket-for-terragrunt-4k7gtj3r
```

## Learn More

- [Terraform S3 Bucket Module](https://registry.terraform.io/modules/terraform-aws-modules/s3-bucket/aws/latest)
- [Terragrunt Documentation](https://terragrunt.gruntwork.io/)
- [AWS CLI S3 ls](https://docs.aws.amazon.com/cli/latest/reference/s3/ls.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/4d4cda50-7d42-4622-b0d4-fa6e6ce0a16d/lesson/ad531c23-558f-4b72-8c19-b70d23c78da9)**
>
> Watch video content
