# Demo OpenTofu Workspaces - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform/OpenTofu-Functions-and-Conditional-Expressions/Demo-OpenTofu-Workspaces)

---

## Table of Contents

- Demo OpenTofu Workspaces
  - Prerequisites
  - 1. List the Default Workspace
  - 2. Create New Workspaces
  - 3. Select a Workspace
  - 4. Understand Workspace State Location
  - 5. Review the Configuration Files
  - 6. Update main.tf to Invoke the Module
  - 7. Initialize OpenTofu
  - 8. Apply Configuration Across All Workspaces
  - References
  - Watch Video
  - Practice Lab
    - variables.tf
    - provider.tf
    - Workspace-State Mapping

---

## Content

OpenTofu: A Beginners Guide to a Terraform Fork Including Migration From Terraform

OpenTofu Functions and Conditional Expressions

# Demo OpenTofu Workspaces

In this guide, you'll learn how to create, select, and manage OpenTofu workspaces to maintain separate state files for multiple deployments of the same configuration. By the end, you'll deploy a payroll application across three regions—US, UK, and India—using a single Terraform-compatible codebase.

## Prerequisites

> [!important]
> **Note**
>
> - OpenTofu CLI installed and available in your `PATH`.
> - A sample project directory named `project-sapphire`.
> - Access to an S3-like backend (e.g., LocalStack) for state storage.

---

## 1\. List the Default Workspace

Navigate to your project directory and list available workspaces. By default, OpenTofu starts with the `default` workspace.

```
cd ~/opentofu-projects/project-sapphire/
tofu workspace list
```

Expected output:

```
* default
```

---

## 2\. Create New Workspaces

Isolate state per region by creating three workspaces: `us-payroll`, `uk-payroll`, and `india-payroll`.

```
tofu workspace new us-payroll
tofu workspace new uk-payroll
tofu workspace new india-payroll
```

Verify:

```
tofu workspace list
```

| Workspace     | Description                        |
| ------------- | ---------------------------------- |
| default       | Default environment                |
| us-payroll    | State for US payroll deployment    |
| uk-payroll    | State for UK payroll deployment    |
| india-payroll | State for India payroll deployment |

---

## 3\. Select a Workspace

Switch to the `us-payroll` workspace before running any commands:

```
tofu workspace select us-payroll
# Switched to workspace "us-payroll".
```

---

## 4\. Understand Workspace State Location

OpenTofu stores each workspace’s state under `terraform.tfstate.d/<workspace-name>`. For example:

```
terraform.tfstate.d/india-payroll/terraform.tfstate
```

> [!important]
> **Warning**
>
> Do not manually edit files in the `terraform.tfstate.d/` directory—always use OpenTofu commands to manage state.

---

## 5\. Review the Configuration Files

Your `project-sapphire` folder should include:

- **variables.tf**
- **provider.tf**

### variables.tf

```
variable "region" {
  type = map(string)
  default = {
    "us-payroll"    = "us-east-1"
    "uk-payroll"    = "eu-west-2"
    "india-payroll" = "ap-south-1"
  }
}


variable "ami" {
  type = map(string)
  default = {
    "us-payroll"    = "ami-24e140119877avm"
    "uk-payroll"    = "ami-351e40119877avm"
    "india-payroll" = "ami-55140119877avm"
  }
}
```

Quiz:

- **Type of `region`?** A `map(string)`.
- **`region["india-payroll"]` default?** `"ap-south-1"`.
- **`ami["india-payroll"]` default?** `"ami-55140119877avm"`.

### provider.tf

```
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.38.0"
    }
  }
}


provider "aws" {
  region                      = lookup(var.region, terraform.workspace)
  skip_credentials_validation = true
  skip_requesting_account_id  = true
  s3_use_path_style           = true


  endpoints {
    ec2      = "http://aws:4566"
    dynamodb = "http://aws:4566"
    s3       = "http://aws:4566"
  }
}
```

---

## 6\. Update `main.tf` to Invoke the Module

Add a module block in `main.tf` that points to your shared payroll application:

```
module "payroll_app" {
  source     = "/root/opentofu-projects/modules/payroll-app"
  app_region = lookup(var.region, terraform.workspace)
  ami        = lookup(var.ami, terraform.workspace)
}
```

---

## 7\. Initialize OpenTofu

Download providers and modules:

```
tofu init
```

---

## 8\. Apply Configuration Across All Workspaces

Deploy the payroll app in each region:

1.  US Payroll

    ```
    tofu workspace select us-payroll
    tofu apply
    # Enter "yes" to confirm
    ```

2.  UK Payroll

    ```
    tofu workspace select uk-payroll
    tofu apply
    # Enter "yes" to confirm
    ```

3.  India Payroll

    ```
    tofu workspace select india-payroll
    tofu apply
    # Enter "yes" to confirm
    ```

---

### Workspace-State Mapping

| Workspace     | AWS Region | AMI ID              | State File Location                                 |
| ------------- | ---------- | ------------------- | --------------------------------------------------- |
| us-payroll    | us-east-1  | ami-24e140119877avm | terraform.tfstate.d/us-payroll/terraform.tfstate    |
| uk-payroll    | eu-west-2  | ami-351e40119877avm | terraform.tfstate.d/uk-payroll/terraform.tfstate    |
| india-payroll | ap-south-1 | ami-55140119877avm  | terraform.tfstate.d/india-payroll/terraform.tfstate |

---

## References

- [OpenTofu Documentation](https://github.com/opentofu/opentofu)
- [Terraform Workspaces](https://www.terraform.io/language/state/workspaces)
- [AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/042e7b27-75d9-46fc-8f8c-7357d81923c1/lesson/0161ce1c-5d2a-477f-9d21-9f3056f9859a)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/042e7b27-75d9-46fc-8f8c-7357d81923c1/lesson/9197d359-40fc-4167-993e-e951dff69ff9)**
>
> Practice lab
