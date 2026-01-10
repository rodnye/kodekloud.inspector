# Terragrunt Blocks Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Blocks/Terragrunt-Blocks-Overview)

---

## Table of Contents

- Terragrunt Blocks Overview
  - Summary of Terragrunt Blocks
  - 1. terraform Block
  - 2. remote_state Block
  - 3. include Block
  - 4. locals Block
  - 5. dependency Block
  - 6. dependencies Block
  - 7. generate Block
  - Next Steps
  - Watch Video

---

## Content

Terragrunt for Beginners

Terragrunt Blocks

# Terragrunt Blocks Overview

In this lesson, we’ll dive into the seven core Terragrunt configuration blocks that power your Terraform workflows. Whether you’re already familiar with Terraform or new to Terragrunt’s advanced features, you’ll learn how each block streamlines state management, dependency handling, and DRY (Don’t Repeat Yourself) principles for infrastructure as code.

> [!important]
> **Note**
>
> Terragrunt extends Terraform by adding useful wrappers around remote state, dependencies, and configuration generation. If you’re new to Terragrunt, check out the [official Terragrunt documentation](https://terragrunt.gruntwork.io/).

## Summary of Terragrunt Blocks

| Block           | Purpose                                                                | Key Benefit                            |
| --------------- | ---------------------------------------------------------------------- | -------------------------------------- |
| terraform       | Pass extra arguments directly to the Terraform CLI.                    | Fine-tune your Terraform runs.         |
| remote\\\_state | Configure reading from and writing to remote state backends.           | Centralize and secure state storage.   |
| include         | Import and merge settings from another Terragrunt config file.         | Share common configurations.           |
| locals          | Define reusable values and expressions.                                | Keep code DRY and maintainable.        |
| dependency      | Declare a single dependency on another Terragrunt module.              | Expose outputs from one module.        |
| dependencies    | List multiple module dependencies for orchestration.                   | Orchestrate complex multi-module runs. |
| generate        | Auto-generate additional HCL or JSON files before Terraform execution. | Automate boilerplate file creation.    |

## 1\. terraform Block

Use the `terraform` block to pass custom flags and settings to the Terraform CLI:

```
terraform {
  extra_arguments "plan_args" {
    commands = ["plan"]
    arguments = ["-var-file=prod.tfvars", "-parallelism=10"]
  }
}
```

## 2\. remote_state Block

Configure your remote backend once in Terragrunt to avoid repeating it in every module:

```
remote_state {
  backend = "s3"
  config = {
    bucket         = "my-terraform-states"
    key            = "${path_relative_to_include()}/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}
```

> [!important]
> **Warning**
>
> Always enable state locking (e.g., DynamoDB for S3 backends) to prevent concurrent state modifications.

## 3\. include Block

Share common settings by importing another Terragrunt file:

```
include {
  path = find_in_parent_folders("terragrunt.hcl")
}
```

## 4\. locals Block

Define and reuse variables and expressions:

```
locals {
  environment = "production"
  tags = {
    Project = "website"
    Env     = local.environment
  }
}
```

## 5\. dependency Block

Declare a single dependency to retrieve outputs from another module:

```
dependency "vpc" {
  config_path = "../vpc"
}
# Use the output
resource "aws_subnet" "private" {
  vpc_id = dependency.vpc.outputs.vpc_id
}
```

## 6\. dependencies Block

Orchestrate multiple modules by listing them all:

```
dependencies {
  paths = ["../vpc", "../security-group", "../database"]
}
```

When you run `terragrunt apply-all`, it ensures each module runs in the correct order.

## 7\. generate Block

Automatically generate additional configuration files (HCL or JSON):

```
generate "backend_tf" {
  path      = "backend.tf"
  if_exists = "overwrite"
  contents  = <<EOF
terraform {
  backend "s3" {
    bucket = "generated-backend"
    key    = "generated.tfstate"
    region = "us-east-1"
  }
}
EOF
}
```

## Next Steps

- Explore [Terragrunt Remote State](https://terragrunt.gruntwork.io/docs/reference/config-blocks/remote_state/) for advanced backend options.
- Learn how to combine `dependency` and `dependencies` in a real-world multi-module project.
- Check out [Terraform CLI Docs](https://www.terraform.io/docs/cli/index.html) for all available commands and flags.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/bab279d4-de1d-4e8d-8376-ea420c71c9e1/lesson/62f6d615-b3b4-49cc-9a3f-90fb375a2b36)**
>
> Watch video content
