# Terragrunt Attribute Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Attributes/Terragrunt-Attribute-Overview)

---

## Table of Contents

- Terragrunt Attribute Overview
  - Attribute Summary
  - Detailed Attribute Guide
  - Links and References
  - Watch Video
    - inputs
    - download_dir
    - prevent_destroy
    - skip
    - iam_role
    - terraform_binary
    - version_constraint
    - retryable_errors

---

## Content

Terragrunt for Beginners

Terragrunt Attributes

# Terragrunt Attribute Overview

In this guide, we’ll dive into key Terragrunt configuration attributes that unlock advanced control over your Infrastructure as Code workflows. You’ll learn how to parameterize Terraform modules, optimize caching, enforce security safeguards, and handle transient errors—empowering you to build resilient, maintainable deployments.

![The image is a diagram titled "Terragrunt Attributes," listing attributes such as Inputs, Download dir, Prevent destroy, Skip, IAM role and related, Terraform binary, Version constraint, and Retryable errors.](https://kodekloud.com/kk-media/image/upload/v1752884272/notes-assets/images/Terragrunt-for-Beginners-Terragrunt-Attribute-Overview/terragrunt-attributes-diagram-inputs-iam-role.jpg)

## Attribute Summary

| Attribute             | Purpose                                                                          |
| --------------------- | -------------------------------------------------------------------------------- |
| inputs                | Pass variables into Terraform modules for dynamic parameterization.              |
| download\\\_dir       | Define a local cache directory for remote Terraform modules and providers.       |
| prevent\\\_destroy    | Protect critical resources from accidental deletion during `apply` or `destroy`. |
| skip                  | Exclude specific Terragrunt blocks or commands from execution.                   |
| iam\\\_role           | Configure AWS IAM roles and permissions for Terraform operations.                |
| terraform\\\_binary   | Specify a custom Terraform executable or version.                                |
| version\\\_constraint | Enforce version rules for both Terraform and Terragrunt binaries.                |
| retryable\\\_errors   | List error patterns that Terragrunt retries automatically on failure.            |

---

## Detailed Attribute Guide

### inputs

Define a map of input variables to inject into your Terraform modules.

```
# terragrunt.hcl
inputs = {
  environment = "production"
  region      = "us-east-1"
}
```

> [!important]
> **Note**
>
> Use precise variable names in `inputs` to match your Terraform module's `variables.tf` definitions.

### download_dir

Specify where Terragrunt downloads remote modules, providers, and configuration files. This optimizes build speed by caching dependencies locally.

```
download_dir = "${get_terragrunt_dir()}/.terragrunt-cache"
```

### prevent_destroy

Safeguard resources from accidental destruction. When set to `true`, Terragrunt will refuse to run `terraform destroy` on the protected blocks.

```
prevent_destroy = true
```

> [!important]
> **Warning**
>
> Enabling `prevent_destroy` can block intentional resource teardown. Use with caution.

### skip

Skip execution of selected Terragrunt commands or blocks to streamline CI/CD pipelines.

```
skip = ["plan", "apply_all"]
```

### iam_role

Assign an AWS IAM role for Terraform operations, ensuring secure and auditable access.

```
iam_role {
  arn = "arn:aws:iam::123456789012:role/TerraformExecution"
}
```

### terraform_binary

Point Terragrunt to a specific Terraform binary, enabling consistent Terraform versions across your environments.

```
terraform_binary = "/usr/local/bin/terraform"
```

### version_constraint

Lock both Terraform and Terragrunt to specific versions for consistent builds.

```
version_constraint = ">= 1.0.0, < 2.0.0"
```

### retryable_errors

Configure Terragrunt to automatically retry on transient errors.

```
retryable_errors = [
  "Error acquiring the state lock",
  "Provider finished with"
]
```

---

## Links and References

- [Terragrunt Official Documentation](https://terragrunt.gruntwork.io/docs/)
- [Terraform Registry](https://registry.terraform.io/)
- [AWS IAM Best Practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/1a2a45b4-e7d1-4af2-a897-7ebf83a4350e/lesson/a003ce38-a068-480d-b48a-a45891633e92)**
>
> Watch video content
