# Local Values - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Associate-Certification-HashiCorp-Certified/Read-generate-and-modify-configuration/Local-Values)

---

## Table of Contents

- Local Values
  - Reusing Common Tags for EC2 Instances
  - Creating an S3 Bucket with a Unique Name
  - Summary
  - Watch Video
  - Practice Lab
    - Improved Configuration with Local Values
    - Configuring the S3 Bucket

---

## Content

Terraform Associate Certification: HashiCorp Certified

Read generate and modify configuration

# Local Values

In this article, we explore how local values in Terraform can simplify your configurations by eliminating repetitive code. Using an AWS example that creates EC2 instances and an S3 bucket with common values, you'll learn how to reuse configuration elements efficiently.

## Reusing Common Tags for EC2 Instances

Imagine you have an AWS EC2 instance named "web" with a specific AMI and instance type created for Project Cerberus in the finance department. The instance is tagged as follows:

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

Notice the duplicate tag definitions for both resources. To clean up the configuration and ensure consistency, you can define these common tags using a `locals` block and reference them directly in each resource.

### Improved Configuration with Local Values

The revised Terraform configuration using local values is as follows:

```
locals {
  common_tags = {
    Department = "finance"
    Project    = "cerberus"
  }
}


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

By referencing `local.common_tags`, both EC2 instances now share the same tag definitions, reducing redundancy and simplifying maintenance.

> [!important]
> **Note**
>
> Using local values not only enhances code readability but also minimizes typographical errors when managing multiple similar configurations.

## Creating an S3 Bucket with a Unique Name

S3 buckets require globally unique names. To achieve this, you can generate a random string using Terraform's `random_string` resource and concatenate it with a project variable. This ensures that your bucket name follows a predictable naming convention, such as "projectname-randomstring-bucket".

### Configuring the S3 Bucket

Begin by defining the project variable, the random string resource, and a local value that creates the bucket prefix. Then, use this local value in the S3 bucket resource:

```
variable "project" {
  default = "cerberus"
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

This configuration works as follows:

- The variable `project` defaults to "cerberus".
- The `random_string` resource generates a six-character random string without special characters or uppercase letters.
- The local value `bucket_prefix` interpolates the project name, random string, and a static suffix to create a unique name.
- The AWS S3 bucket resource consumes `local.bucket_prefix` as its bucket name, ensuring compliance with S3’s uniqueness requirements.

After running `terraform apply -auto-approve`, the process output confirms that the random string was generated and the S3 bucket was created with the expected unique name:

```
$ terraform apply -auto-approve
random_string.random_suffix: Creating...
random_string.random_suffix: Creation complete after 0s [id=dhiabk]
aws_s3_bucket.finance_bucket: Creating...
aws_s3_bucket.finance_bucket: Creation complete after 0s [id=cerberus-dhiabk-bucket]
Apply complete! Resources: 2 added, 0 changed, 0 destroyed.
```

> [!important]
> **SEO Tip**
>
> Using clear variable names and concise descriptions improves both code maintainability and search engine discoverability. Consider periodically reviewing your documentation to ensure it remains up-to-date with best practices.

## Summary

In this guide, you learned how to simplify Terraform configurations by using local values to:

- Eliminate repeated code for resource attribute definitions.
- Improve consistency in tagging AWS EC2 instances.
- Ensure unique naming for S3 buckets by combining project variables with random strings.

By centralizing common attributes through local values, you maintain cleaner and more scalable Terraform code. Happy Terraforming!

For further reading on Terraform best practices and AWS resource management, explore the [Terraform Documentation](https://www.terraform.io/docs) and [AWS Provider Guides](https://registry.terraform.io/providers/hashicorp/aws/latest/docs).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-associate-certification-hashicorp-certified/module/c59e52ed-8a8c-4a6c-8ad0-8dcc38c1598e/lesson/9be48c25-004e-4ef3-917f-65eab7cc32bd)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/terraform-associate-certification-hashicorp-certified/module/c59e52ed-8a8c-4a6c-8ad0-8dcc38c1598e/lesson/9ac3b0d9-672c-49e7-83e0-7960299fb0c6)**
>
> Practice lab
