# Root Configuration and Remote State - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Building-our-first-AWS-Demo-with-Terragrunt/Root-Configuration-and-Remote-State)

---

## Table of Contents

- Root Configuration and Remote State
  - Overview of Root terragrunt.hcl
  - 1. Remote State Backend Setup
  - 2. Initializing Remote State
  - 3. Provider Configuration via generate
  - 4. Terragrunt Best Practices
  - References
  - Watch Video

---

## Content

Terragrunt for Beginners

Building our first AWS Demo with Terragrunt

# Root Configuration and Remote State

In this guide, you’ll learn how to centralize Terraform state, enforce global settings, and streamline provider configuration using Terragrunt. A well-structured root `terragrunt.hcl` file acts as the single source of truth for your entire infrastructure, while remote state ensures safe, consistent deployments across teams.

## Overview of Root `terragrunt.hcl`

Your root configuration defines global variables, backends, and provider settings. Terragrunt then propagates these definitions into each module directory, reducing duplication and drift.

Key benefits:

- Centralized state locking and storage
- Consistent provider versions and regions
- Easier maintenance and onboarding

## 1\. Remote State Backend Setup

Use the `remote_state` block in your root `terragrunt.hcl` to specify where Terraform will store its state:

```
remote_state {
  backend = "s3"
  config = {
    bucket         = "my-terraform-state"
    key            = "envs/prod/terraform.tfstate"
    region         = "us-west-2"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}
```

| Parameter         | Description                            | Example                         |
| ----------------- | -------------------------------------- | ------------------------------- |
| backend           | Remote state backend type              | `"s3"`, `"gcs"`                 |
| bucket            | Name of the S3 (or GCS) bucket         | `"my-terraform-state"`          |
| key               | Path within the bucket for the state   | `"envs/prod/terraform.tfstate"` |
| region            | AWS region where the bucket is located | `"us-west-2"`                   |
| dynamodb\\\_table | DynamoDB table for state locking       | `"terraform-locks"`             |
| encrypt           | Enable server-side encryption          | `true`                          |

> [!important]
> **Note**
>
> Terragrunt will initialize the backend automatically, but it **won’t** create the S3 bucket or DynamoDB table for you.
> Ensure these resources exist beforehand.

## 2\. Initializing Remote State

Run the following command at the root to configure your remote backend and enable state locking:

```
terragrunt init
```

This initializes the specified backend so Terraform can securely store and lock its state.

## 3\. Provider Configuration via `generate`

To enforce a unified provider setup across modules, use the `generate` block:

```
generate "provider" {
  path      = "providers.tf"
  if_exists = "overwrite"
  contents  = <<EOF
provider "aws" {
  region = var.aws_region
}
EOF
}
```

This writes a `providers.tf` file in each subdirectory, ensuring all modules use the same AWS region and provider settings.

> [!important]
> **Warning**
>
> Using `if_exists = "overwrite"` will replace any existing `providers.tf` file in your module directories.
> Backup or merge custom provider configurations if necessary.

## 4\. Terragrunt Best Practices

- **Parameterize globally**: Leverage root-level variables and `locals` to adapt to multiple environments.
- **Document heavily**: Add comments and examples in `terragrunt.hcl` to help team members onboard quickly.
- **Use dynamic blocks**: Employ loops and conditional blocks for DRY configurations.
- **Structure by environment**: Group stages (dev, staging, prod) under separate folders for clarity.

![The image outlines five steps for root configuration and remote state management, including setup, configuration, initialization, provider block generation, and best practices. Each step is represented with an icon and a brief description.](https://kodekloud.com/kk-media/image/upload/v1752884250/notes-assets/images/Terragrunt-for-Beginners-Root-Configuration-and-Remote-State/root-configuration-remote-state-steps.jpg)

## References

- [Terragrunt Documentation](https://terragrunt.gruntwork.io/docs/)
- [Terraform Remote State](https://www.terraform.io/language/state/remote)
- [AWS S3 Backend](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/07066843-7439-443b-b2d4-d31be3c50c97/lesson/8b756ac1-22b4-4c8e-970a-bb4763d4207f)**
>
> Watch video content
