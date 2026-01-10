# Terragrunt Configuration Files HCL - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Configuration/Terragrunt-Configuration-Files-HCL)

---

## Table of Contents

- Terragrunt Configuration Files HCL
  - Terragrunt HCL: Your Control Center
  - Inheritance Model
  - Configuration Blocks Overview
  - Module Configuration
  - Remote State Configuration
  - Links and References
  - Watch Video
    - locals
    - include

---

## Content

Terragrunt for Beginners

Terragrunt Configuration

# Terragrunt Configuration Files HCL

Mickey, like many infrastructure engineers, needs a concise overview of Terragrunt: its advantages and the essentials to get started. In this guide, we’ll dissect the core of Terragrunt—the `terragrunt.hcl` configuration file—so you can accelerate your infrastructure as code workflow.

## Terragrunt HCL: Your Control Center

Terragrunt’s primary configuration file, typically named `terragrunt.hcl`, dictates how Terragrunt orchestrates your Terraform modules. Built on the [HashiCorp Configuration Language (HCL)](https://github.com/hashicorp/hcl), it provides a declarative syntax optimized for readability and collaboration.

![The image is about Terragrunt configuration files using HCL (HashiCorp Configuration Language), highlighting its declarative nature and ease of reading and writing.](https://kodekloud.com/kk-media/image/upload/v1752884345/notes-assets/images/Terragrunt-for-Beginners-Terragrunt-Configuration-Files-HCL/terragrunt-hcl-configuration-files-diagram.jpg)

With HCL, both machines and humans can parse configurations effortlessly, reducing errors and streamlining team workflows.

## Inheritance Model

Terragrunt employs a hierarchical inheritance model. Child configurations automatically inherit settings from their parent, letting you define common parameters once and reuse them throughout your repository.

![The image shows a hierarchical diagram illustrating the inheritance model of Terragrunt configuration files using HCL. It features interconnected nodes with the Terragrunt logo, indicating a structured configuration setup.](https://kodekloud.com/kk-media/image/upload/v1752884346/notes-assets/images/Terragrunt-for-Beginners-Terragrunt-Configuration-Files-HCL/terragrunt-inheritance-model-diagram-hcl.jpg)

> [!important]
> **Note**
>
> Leverage `include` blocks to pull shared settings from a root `terragrunt.hcl`. This keeps your configurations DRY and consistent.

## Configuration Blocks Overview

Terragrunt organizes settings into named blocks. Here are the most common ones:

| Block           | Purpose                                                   |
| --------------- | --------------------------------------------------------- |
| locals          | Define reusable variables and computed values             |
| include         | Inherit settings from a parent `terragrunt.hcl`           |
| remote\\\_state | Configure backend storage and locking for Terraform state |

![The image is a diagram titled "Terragrunt Configuration Files – HCL," showing colorful puzzle piece icons and a list of configuration blocks labeled "locals," "remote_state," and "include."](https://kodekloud.com/kk-media/image/upload/v1752884346/notes-assets/images/Terragrunt-for-Beginners-Terragrunt-Configuration-Files-HCL/terragrunt-configuration-files-diagram.jpg)

### locals

Use `locals` to declare reusable values or perform simple computations:

```
locals {
  region = "us-east-1"
  env    = "production"
}
```

### include

Pull in a parent configuration to inherit common settings:

```
include {
  path = find_in_parent_folders()
}
```

## Module Configuration

Define which Terraform module to source and supply its input variables:

```
terraform {
  source = "git::ssh://git@github.com/org/terraform-modules.git//vpc?ref=v1.2.0"
}


inputs = {
  vpc_name   = "my-vpc"
  cidr_block = "10.0.0.0/16"
}
```

- **source**: URL or path (Git, Terraform Registry, local directory)
- **ref**: Git tag, branch, or commit to pin module versions
- **inputs**: Map of module variables required by your Terraform code

## Remote State Configuration

Storing your Terraform state remotely ensures consistency, collaboration, and safe locking. Terragrunt makes it simple to configure state backends, such as Amazon S3 with DynamoDB-based locks:

![The image illustrates Terragrunt configuration files in HCL, showing a connection between a backend and Amazon S3 for remote state configuration.](https://kodekloud.com/kk-media/image/upload/v1752884348/notes-assets/images/Terragrunt-for-Beginners-Terragrunt-Configuration-Files-HCL/terragrunt-configuration-hcl-amazon-s3.jpg)

```
remote_state {
  backend = "s3"
  config = {
    bucket         = "my-terraform-states"
    key            = "${local.env}/terraform.tfstate"
    region         = local.region
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}
```

> [!important]
> **Warning**
>
> Ensure your IAM policies allow both S3 access and DynamoDB locking to prevent state corruption or conflicts.

By centralizing state management, you minimize the risk of drift, enable automated pipelines, and facilitate smooth team collaboration.

## Links and References

- [Terragrunt Documentation](https://terragrunt.gruntwork.io/docs/)
- [Terraform Modules](https://www.terraform.io/language/modules)
- [HashiCorp HCL GitHub](https://github.com/hashicorp/hcl)
- [Terraform Remote State](https://www.terraform.io/language/state/remote)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/52cf8076-030b-430e-9a8b-273697ad3399/lesson/5e29cda8-9462-462e-a8e8-35bf1e99afbd)**
>
> Watch video content
