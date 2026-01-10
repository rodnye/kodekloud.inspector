# Demo of Lab 5 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Managing-Remote-State-with-Terragrunt/Demo-of-Lab-5)

---

## Table of Contents

- Demo of Lab 5
  - 1. Verify Your Terraform Version
  - 2. Auto-Generate AWS Provider Files with Terragrunt
  - 3. Initialize Terragrunt
  - 4. Configure Remote State in S3
  - 5. Reinitialize & Apply Your Stack
  - 6. Reconfigure Remote State (Optional)
  - Links and References
  - Watch Video
  - Practice Lab
    - 2.1 Generate providers.tf
    - 2.2 Generate versions.tf

---

## Content

Terragrunt for Beginners

Managing Remote State with Terragrunt

# Demo of Lab 5

In this lab, you’ll learn how to configure a remote state backend and set up the AWS provider using Terragrunt. We’ll generate Terraform configuration files automatically and initialize your stack to manage infrastructure in AWS.

Before you begin, ensure you have AWS credentials configured:

```
show-creds
```

You can run commands in VS Code’s integrated terminal via your browser for easy copy & paste.

---

## 1\. Verify Your Terraform Version

First, confirm the Terraform CLI version installed on your system:

```
terraform version
```

You should see output similar to:

```
Terraform v1.8.3
```

---

## 2\. Auto-Generate AWS Provider Files with Terragrunt

All Terragrunt configuration lives under your Terraform stack directory (`terraform-stack/terragrunt.hcl`). We’ll generate three files:

| Filename       | Purpose                                    | Key Settings              |
| -------------- | ------------------------------------------ | ------------------------- |
| `providers.tf` | Declares the AWS provider and region       | `region = "us-east-1"`    |
| `versions.tf`  | Pins the AWS provider version              | `version = "~> 5.0"`      |
| `backend.tf`   | Configures remote state with an S3 backend | bucket, key, region, lock |

### 2.1 Generate `providers.tf`

Add this block to `terragrunt.hcl` to configure AWS in `us-east-1`:

```
generate "provider" {
  path      = "providers.tf"
  if_exists = "overwrite"
  contents  = <<EOF
provider "aws" {
  region = "us-east-1"
}
EOF
}
```

### 2.2 Generate `versions.tf`

Next, pin to the latest major AWS provider release:

```
generate "provider_version" {
  path      = "versions.tf"
  if_exists = "overwrite"
  contents  = <<EOF
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}
EOF
}
```

> [!important]
> **Note**
>
> Ensure your `terragrunt.hcl` includes these `generate` blocks before initializing.

---

## 3\. Initialize Terragrunt

Switch into your Terraform stack directory and run initialization:

```
cd terraform-stack
terragrunt init
```

On success, you should see `providers.tf` and `versions.tf` created automatically.

---

## 4\. Configure Remote State in S3

An S3 bucket named `kk-infra-state-<random>` already exists for your Terraform state. Discover its exact name:

```
aws s3 ls | grep kk-infra-state
```

Copy the bucket name and update your root `terragrunt.hcl` with this block to generate `backend.tf`:

```
generate "remote_state" {
  path      = "backend.tf"
  if_exists = "overwrite"
  contents  = <<EOF
remote_state {
  backend = "s3"
  config = {
    encrypt        = true
    bucket         = "kk-infra-state-<random>"
    key            = "${path_relative_to_include()}/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform box"
  }
}
EOF
}
```

> [!important]
> **Warning**
>
> Never commit your AWS access keys or state files to version control.

---

## 5\. Reinitialize & Apply Your Stack

Apply the new backend settings and spin up resources:

```
terragrunt init
# If prompted, type "yes" to migrate your state.
terragrunt apply
# Confirm the plan with "yes".
```

You should see Terraform planning and applying an AWS VPC. Verify the VPC and related resources in the AWS Console once complete.

---

## 6\. Reconfigure Remote State (Optional)

To update or reconfigure the backend at any time:

```
terragrunt init --reconfigure
```

---

## Links and References

- [Terraform CLI Documentation](https://www.terraform.io/docs/cli/index.html)
- [Terragrunt Documentation](https://terragrunt.gruntwork.io/docs/)
- [AWS S3 Backend](https://www.terraform.io/docs/backends/types/s3.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/2eef056a-8494-4e5d-acf0-25b04fad55c4/lesson/7e959b9e-c5b3-4dae-b9fd-08788512f552)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/2eef056a-8494-4e5d-acf0-25b04fad55c4/lesson/e61ba193-3780-4e0a-ae45-cc97b0afa1e0)**
>
> Practice lab
