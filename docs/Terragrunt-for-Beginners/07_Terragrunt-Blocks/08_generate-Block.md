# generate Block - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Blocks/generate-Block)

---

## Table of Contents

- generate Block
  - Key Use Cases
  - generate Block Attributes
  - Example 1: Generate AWS Provider Configuration
  - Example 2: Enforce Provider Version Constraints
  - Best Practices
  - References
  - Watch Video
    - if_exists Options

---

## Content

Terragrunt for Beginners

Terragrunt Blocks

# generate Block

The `generate` block in Terragrunt automates file creation within your working directory. It’s essential for maintaining DRY (Don't Repeat Yourself) Terraform configurations across multiple modules, boosting consistency and simplifying management.

## Key Use Cases

- Centralize provider and backend configurations
- Enforce version constraints on Terraform providers
- Generate any auxiliary `.tf` or other configuration files

> [!important]
> **Note**
>
> Use the `generate` block to share common Terraform setup and reduce duplication across your modules.

## generate Block Attributes

| Attribute            | Description                                                                                                   |
| -------------------- | ------------------------------------------------------------------------------------------------------------- |
| name                 | Identifier for the generate block, useful when defining multiple blocks.                                      |
| path                 | Relative output path for the generated file in the Terragrunt working directory.                              |
| if\\\_exists         | Action if the file already exists. See values in the table below.                                             |
| comment\\\_prefix    | Prefix for comments in the generated file (default: `#`).                                                     |
| disable\\\_signature | When `true`, suppresses the Terragrunt signature comment in the generated file.                               |
| contents             | The file content, supporting [HEREDOC](https://terraform.io/docs/language/syntax/configuration.html#heredoc). |
| disable              | When `true`, disables the entire generate block.                                                              |

### if_exists Options

| Value                   | Behavior                                                        |
| ----------------------- | --------------------------------------------------------------- |
| overwrite               | Unconditionally overwrite the existing file.                    |
| overwrite\\\_terragrunt | Terragrunt overwrites its own generated signature section only. |
| skip                    | Leave the existing file untouched.                              |
| error                   | Throw an error if the file already exists, halting execution.   |

> [!important]
> **Warning**
>
> Overwriting files may lead to unintended changes. Review your `if_exists` setting to prevent data loss.

---

## Example 1: Generate AWS Provider Configuration

This example demonstrates how to generate a `providers.tf` file for AWS in every module, alongside an S3 remote state configuration.

```
remote_state {
  backend = "s3"
  config = {
    bucket         = "kodekloud-terragrunt-remote-state"
    key            = "${path_relative_to_include()}/terraform.tfstate"
    region         = "eu-west-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}


generate "backend" {
  path      = "backend.tf"
  if_exists = "overwrite_terragrunt"
}


generate "provider" {
  path      = "providers.tf"
  if_exists = "overwrite_terragrunt"
  contents  = <<EOF
provider "aws" {
  region = "eu-west-1"
}
EOF
}
```

---

## Example 2: Enforce Provider Version Constraints

To ensure all modules use AWS provider version `~> 5.0`, add a `versions.tf` file:

```
generate "provider_version" {
  path      = "versions.tf"
  if_exists = "overwrite_terragrunt"
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

Combine this with the previous blocks to automate both provider and version file generation.

---

## Best Practices

| Practice                               | Benefit                                               |
| -------------------------------------- | ----------------------------------------------------- |
| Centralize common configs              | Ensures uniformity across modules                     |
| Use dynamic content and external files | Provides flexibility and adaptability                 |
| Carefully choose `if_exists` behavior  | Prevents accidental overwrites and operational issues |

---

## References

- [Terragrunt Official Docs](https://terragrunt.gruntwork.io/docs/reference/config-blocks/#generate)
- [Terraform HEREDOC Syntax](https://developer.hashicorp.com/terraform/language/syntax/configuration#here-documents)
- [Terraform Providers Overview](https://developer.hashicorp.com/terraform/plugins)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/bab279d4-de1d-4e8d-8376-ea420c71c9e1/lesson/1ef7d049-0098-4b39-9179-af14273589fe)**
>
> Watch video content
