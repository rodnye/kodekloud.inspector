# Demo Creating Your Own Module From Scratch - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Modules/Demo-Creating-Your-Own-Module-From-Scratch)

---

## Table of Contents

- Demo Creating Your Own Module From Scratch
  - 1. Directory Structure
  - 2. Writing the S3 Module
  - 3. Consuming the Module with Terragrunt
  - 4. Initialize, Plan, and Apply
  - 5. Verifying the S3 Bucket
  - Next Steps
  - Links and References
  - Watch Video
    - main.tf
    - variables.tf
    - outputs.tf

---

## Content

Terragrunt for Beginners

Terragrunt Modules

# Demo Creating Your Own Module From Scratch

In this tutorial, you’ll learn how to build a reusable Terraform module for an AWS S3 bucket and then consume it with Terragrunt. You’ll get hands-on experience with:

1.  Directory structure
2.  Writing module files (`main.tf`, `variables.tf`, `outputs.tf`)
3.  Referencing the module in Terragrunt
4.  Initializing, planning, and applying changes
5.  Verifying the S3 bucket

---

## 1\. Directory Structure

Organize your project by creating a dedicated module folder:

```
mkdir -p modules/s3
cd modules/s3
touch main.tf variables.tf outputs.tf
```

Your workspace should resemble:

```
.
├── modules
│   └── s3
│       ├── main.tf
│       ├── variables.tf
│       └── outputs.tf
└── terragrunt.hcl
```

| File         | Purpose             | Description                                    |
| ------------ | ------------------- | ---------------------------------------------- |
| main.tf      | Resource definition | Defines the `aws_s3_bucket` resource           |
| variables.tf | Input variables     | Declares variables like `bucket_name`          |
| outputs.tf   | Outputs             | Exposes attributes such as bucket name and ARN |

---

## 2\. Writing the S3 Module

### main.tf

Create the S3 bucket using the `bucket_name` variable:

```
resource "aws_s3_bucket" "this" {
  bucket = var.bucket_name
}
```

### variables.tf

Declare the bucket name as a required input:

```
variable "bucket_name" {
  type        = string
  description = "Unique name for the S3 bucket"
}
```

> [!important]
> **Warning**
>
> S3 bucket names must be globally unique and comply with AWS naming rules.
> Avoid uppercase letters and underscores.

### outputs.tf

Expose both the bucket name and ARN:

```
output "bucket_name" {
  description = "The name of the S3 bucket"
  value       = aws_s3_bucket.this.bucket
}

output "bucket_arn" {
  description = "The ARN of the S3 bucket"
  value       = aws_s3_bucket.this.arn
}
```

---

## 3\. Consuming the Module with Terragrunt

In your root or environment-specific folder, configure Terragrunt to source the S3 module:

```
# terragrunt.hcl
terraform {
  source = "./modules/s3"
}

inputs = {
  bucket_name = "your-unique-s3-bucket-name-123"
}
```

> [!important]
> **Note**
>
> Terragrunt lets you keep your Terraform code DRY by abstracting common configurations.
> Learn more in the [Terragrunt documentation](https://terragrunt.gruntwork.io/).

---

## 4\. Initialize, Plan, and Apply

Run these commands from the directory containing `terragrunt.hcl`:

```
terragrunt init
terragrunt plan
```

Sample plan output:

```
Plan: 1 to add, 0 to change, 0 to destroy.

Changes to Outputs:
  + bucket_arn  = (known after apply)
  + bucket_name = "your-unique-s3-bucket-name-123"
```

Apply your changes:

```
terragrunt apply
```

Confirm with `yes` when prompted:

```
aws_s3_bucket.this: Creating...
aws_s3_bucket.this: Creation complete after 3s [id=your-unique-s3-bucket-name-123]

Apply complete! Resources: 1 added, 0 changed, 0 destroyed.

Outputs:
bucket_arn  = "arn:aws:s3:::your-unique-s3-bucket-name-123"
bucket_name = "your-unique-s3-bucket-name-123"
```

---

## 5\. Verifying the S3 Bucket

Use the AWS CLI to confirm that your bucket exists:

```
aws s3 ls
```

Example:

```
2024-06-23 15:41:52 your-unique-s3-bucket-name-123
```

---

## Next Steps

- Store your module in a Git repository (e.g., GitHub or GitLab).
- Pin module versions in `terragrunt.hcl` using a Git URL and tag.
- Expand the module with features like versioning, lifecycle rules, or encryption.

---

## Links and References

- [Terraform Modules](https://www.terraform.io/language/modules)
- [AWS S3 Bucket Resource](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket)
- [Terragrunt Documentation](https://terragrunt.gruntwork.io/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/4d4cda50-7d42-4622-b0d4-fa6e6ce0a16d/lesson/89935bb9-9e3b-4621-9c7d-7fe0a1f32f16)**
>
> Watch video content
