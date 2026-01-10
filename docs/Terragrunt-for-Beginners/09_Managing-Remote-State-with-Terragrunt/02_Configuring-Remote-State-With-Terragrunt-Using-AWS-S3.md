# Configuring Remote State With Terragrunt Using AWS S3 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Managing-Remote-State-with-Terragrunt/Configuring-Remote-State-With-Terragrunt-Using-AWS-S3)

---

## Table of Contents

- Configuring Remote State With Terragrunt Using AWS S3
  - Why Use AWS S3 for Terraform Remote State?
  - Terragrunt Approaches to Remote State
  - Additional Resources
  - Watch Video
    - 1. Generate Block
    - 2. Remote State Block

---

## Content

Terragrunt for Beginners

Managing Remote State with Terragrunt

# Configuring Remote State With Terragrunt Using AWS S3

In this guide, you’ll learn how to store your Terraform state file in **Amazon S3** and leverage **Terragrunt** to automate and simplify remote state management. By adopting a consistent backend pattern, you remove repetitive setup steps and let your team focus on provisioning infrastructure.

Terraform remote state in S3 provides durability and versioning, while Terragrunt adds dynamic environment management—enabling seamless transitions between development, staging, and production.

## Why Use AWS S3 for Terraform Remote State?

- Durable and highly available storage with versioning
- Built-in encryption and access control via IAM policies
- Integration with DynamoDB for state locking to prevent race conditions

## Terragrunt Approaches to Remote State

Terragrunt supports two strategies for configuring your S3 backend. Choose the one that aligns with your workflow and organizational standards:

| Approach       | Configuration Location              | Pros                                          | Cons                             |
| -------------- | ----------------------------------- | --------------------------------------------- | -------------------------------- |
| Generate Block | `.tf` files via `generate`          | Highly customizable<br>DRY Terraform modules  | Additional generated files       |
| Remote State   | `terragrunt.hcl` via `remote_state` | Minimal module code<br>Single source of truth | Less direct control over backend |

### 1\. Generate Block

With the `generate` block, Terragrunt produces a Terraform file in each module directory. Define your S3 backend settings once, and Terragrunt will insert a `backend "s3"` block into every generated `.tf` file.

Example `terragrunt.hcl` snippet:

```
generate "backend" {
  path      = "backend.tf"
  if_exists = "overwrite_terragrunt"
  contents = <<EOF
terraform {
  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "env/${local.environment}/terraform.tfstate"
    region         = "us-west-2"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}
EOF
}
```

### 2\. Remote State Block

Alternatively, the `remote_state` block in `terragrunt.hcl` encapsulates both the backend configuration and state locking. This method reduces Terraform code in your modules and centralizes state settings.

Example `terragrunt.hcl` snippet:

```
remote_state {
  backend = "s3"
  config = {
    bucket         = "my-terraform-state"
    key            = "env/${local.environment}/terraform.tfstate"
    region         = "us-west-2"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}
```

![The image illustrates a comparison between a "Generate Block" with multiple folder icons and a "Remote State Block" represented by a single folder with a lock icon, related to Terragrunt and AWS S3.](https://kodekloud.com/kk-media/image/upload/v1752884264/notes-assets/images/Terragrunt-for-Beginners-Configuring-Remote-State-With-Terragrunt-Using-AWS-S3/generate-block-remote-state-comparison.jpg)

> [!important]
> **Warning**
>
> You cannot combine both `generate` and `remote_state` approaches within the same project. Pick one strategy to avoid configuration conflicts.

## Additional Resources

- [Terraform Backend Configuration](https://www.terraform.io/language/settings/backends/s3)
- [Terragrunt Documentation](https://terragrunt.gruntwork.io/docs/)
- [AWS S3 User Guide](https://docs.aws.amazon.com/s3/latest/userguide/)
- [DynamoDB Locking for Terraform](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadWrite.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/2eef056a-8494-4e5d-acf0-25b04fad55c4/lesson/07f3ad60-7663-4a64-9601-90506adf61e2)**
>
> Watch video content
