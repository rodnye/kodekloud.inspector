# Local Values - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform/OpenTofu-Modules/Local-Values)

---

## Table of Contents

- Local Values
  - The Problem: Repeated Tag Definitions
  - Step 1: Define a locals Block
  - Step 2: Reference the Local Value
  - Step 3: Preview and Apply
  - Advanced Example: Combining Variables and Resource Attributes
  - When to Use Local Values
  - Further Reading and References
  - Watch Video

---

## Content

OpenTofu: A Beginners Guide to a Terraform Fork Including Migration From Terraform

OpenTofu Modules

# Local Values

In this lesson, you’ll discover how to use **local values** (locals) in OpenTofu to eliminate duplication, improve readability, and keep your configuration DRY (Don’t Repeat Yourself).

## The Problem: Repeated Tag Definitions

Imagine you have two AWS EC2 instances—`web` and `db`—that share identical tags. Without locals, your HCL might look like this:

```
resource "aws_instance" "web" {
  ami           = "ami-06178cf087598769c"
  instance_type = "t2.medium"

  tags = {
    Department = "finance"
    Project    = "cerberus"
  }
}

resource "aws_instance" "db" {
  ami           = "ami-0567cf08759818b"
  instance_type = "m5.large"

  tags = {
    Department = "finance"
    Project    = "cerberus"
  }
}
```

> [!important]
> **Why locals?**
>
> Defining the same tags in multiple resources increases maintenance overhead. Locals allow you to declare shared values in one place.

## Step 1: Define a `locals` Block

Create a `locals` block to hold your common tag set:

```
locals {
  common_tags = {
    Department = "finance"
    Project    = "cerberus"
  }
}
```

## Step 2: Reference the Local Value

Use `local.common_tags` within each resource:

```
resource "aws_instance" "web" {
  ami           = "ami-06178cf087598769c"
  instance_type = "t2.medium"

  tags = local.common_tags
}

resource "aws_instance" "db" {
  ami           = "ami-0567cf08759818b"
  instance_type = "m5.large"

  tags = local.common_tags
}
```

## Step 3: Preview and Apply

Running `tofu plan` or `tofu apply` now shows both instances using the shared tags:

```
$ tofu apply
An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  + create

OpenTofu will perform the following actions:

# aws_instance.db will be created
+ resource "aws_instance" "db" {
    + tags = {
        + "Department" = "finance"
        + "Project"    = "cerberus"
    }
}

# aws_instance.web will be created
+ resource "aws_instance" "web" {
    + tags = {
        + "Department" = "finance"
        + "Project"    = "cerberus"
    }
}

Plan: 2 to add, 0 to change, 0 to destroy.
```

---

## Advanced Example: Combining Variables and Resource Attributes

Locals aren’t limited to static maps—they can also concatenate variables, resource attributes, and more. For instance, to generate a globally unique S3 bucket name:

```
variable "project" {
  description = "Name of the project"
  type        = string
  default     = "cerberus"
}

resource "random_string" "random_suffix" {
  length  = 6
  special = false
  upper   = false
}

locals {
  bucket_prefix = "${var.project}-${random_string.random_suffix.id}-bucket"
}

resource "aws_s3_bucket" "finance_bucket" {
  acl    = "private"
  bucket = local.bucket_prefix
}
```

When you run `tofu apply`, you’ll see:

```
$ tofu apply --auto-approve
random_string.random_suffix: Creating...
random_string.random_suffix: Creation complete after 0s [id=dhiabk]
aws_s3_bucket.finance_bucket: Creating...
aws_s3_bucket.finance_bucket: Creation complete after 0s [id=cerberus-dhiabk-bucket]
Apply complete! Resources: 2 added, 0 changed, 0 destroyed.
```

> [!important]
> **Tip: HCL Interpolation**
>
> HCL supports both legacy interpolation (`"${...}"`) and the newer direct syntax (`var.project`). Both work in locals, but be consistent across your codebase.

---

## When to Use Local Values

| Use Case                                    | Local Value Example          |
| ------------------------------------------- | ---------------------------- |
| Share common configuration across resources | `local.common_tags`          |
| Build dynamic names or identifiers          | `local.bucket_prefix`        |
| Simplify complex expressions                | Intermediate computed values |

---

## Further Reading and References

- [OpenTofu Locals Documentation](https://developer.hashicorp.com/openTofu/docs/configuration/locals)
- [Terraform Best Practices](https://developer.hashicorp.com/terraform/best-practices)
- [Random Provider on Terraform Registry](https://registry.terraform.io/providers/hashicorp/random/latest)
- [AWS Provider on Terraform Registry](https://registry.terraform.io/providers/hashicorp/aws/latest)

That’s it for this lesson on local values! In the next lesson, we’ll explore modules and how they can further modularize your infrastructure code.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/d4c286c6-b8ee-47b1-bea3-abcf408b00ed/lesson/f6ea91e0-bcaa-49fb-9878-b1c58476acaa)**
>
> Watch video content
