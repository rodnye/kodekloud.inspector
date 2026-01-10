# Introduction to Terragrunt - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Introduction/Introduction-to-Terragrunt)

---

## Table of Contents

- Introduction to Terragrunt
  - What Is Terraform?
  - Introducing Terragrunt
  - Why Infrastructure as Code Matters
  - Mickey’s Terragrunt Journey
  - Getting Started
  - Links and References
  - Watch Video

---

## Content

Terragrunt for Beginners

Introduction

# Introduction to Terragrunt

Welcome to this lesson on Infrastructure as Code (IaC), Terraform, and Terragrunt. In this module, you will:

1.  Understand the fundamentals of Terraform, the industry-standard IaC tool.
2.  Dive into Terragrunt, the lightweight wrapper for Terraform that simplifies configuration management.
3.  Discover why IaC is critical for modern infrastructure—how it solves challenges of manual provisioning, enhances consistency, and accelerates delivery.

Fasten your seatbelt—let’s get started!

---

## What Is Terraform?

Terraform by HashiCorp is an open-source IaC tool that lets you define, provision, and manage cloud and on-prem resources using declarative configuration files.

| Feature            | Description                                         | Example                                       |
| ------------------ | --------------------------------------------------- | --------------------------------------------- |
| Declarative Syntax | Describe **what** you want, not **how** to build it | `resource "aws_instance" "web" { ... }`       |
| State Management   | Keeps track of resource changes                     | `terraform state list`                        |
| Provider Ecosystem | Supports AWS, Azure, GCP, and >100 more             | `provider "azurerm" { subscription_id = "" }` |

For more details, see the [Terraform Documentation](https://www.terraform.io/docs).

---

## Introducing Terragrunt

Terragrunt is a thin wrapper that provides extra tooling on top of Terraform, focusing on DRY configurations and environment management.

Key benefits:

- **DRY Configurations**: Reuse common Terraform code via `include` and `dependencies`.
- **Automated Workflows**: Run Terraform commands across multiple modules with a single CLI call.
- **Environment Isolation**: Easily manage `dev`, `staging`, and `prod` stacks.

| Capability        | Terraform Only                 | Terraform + Terragrunt                       |
| ----------------- | ------------------------------ | -------------------------------------------- |
| Reusable Modules  | Via `module` blocks            | Via `terragrunt.hcl` and `dependency` blocks |
| Multi-Env Support | Manual state and backend setup | Automatic folder-based isolation             |
| Bulk Commands     | Script your own loops          | `terragrunt run-all apply`                   |

> Note: Terragrunt is maintained by [Gruntwork](https://gruntwork.io/) and works with any Terraform version ≥ 0.12.

---

## Why Infrastructure as Code Matters

Traditional infrastructure management often suffers from:

- **Drift**: Manual changes that go undocumented
- **Inconsistency**: Different setups per environment
- **Scalability Bottlenecks**: Slow provisioning processes

IaC brings:

- **Version Control**: Track every change in Git
- **Automated Provisioning**: Spin up environments in minutes
- **Collaboration**: Review infrastructure changes like application code

---

## Mickey’s Terragrunt Journey

Meet Mickey, an engineer who’s mastered Terraform for numerous projects. Yet, juggling multiple environments has become a headache:

- He’s tried Terraform workspaces, branching strategies, and custom scripts.
- Each environment requires manual backend configuration and state management.
- Team on-boarding slows down as new members learn custom scripts.

Enter Terragrunt. With directory conventions and built-in commands, Mickey can now:

1.  Define common configuration in a root `terragrunt.hcl`.
2.  Reference shared settings in each environment’s folder.
3.  Run `terragrunt apply-all` to provision every stack in one go.

> [!important]
> **Note**
>
> Terragrunt encourages a folder structure like:
>
> ```
> infrastructure-live/
> ├── prod
> │   └── us-east-1
> │       └── vpc
> └── staging
> └── us-east-1
> └── vpc
> ```
>
> This layout keeps environments isolated and easy to navigate.

---

## Getting Started

1.  Install Terraform:

    ```
    brew tap hashicorp/tap
    brew install hashicorp/tap/terraform
    ```

2.  Install Terragrunt:

    ```
    brew install terragrunt
    ```

3.  Scaffold your project:

    ```
    mkdir -p infrastructure-live/{dev,staging,prod}/{region}/{module}
    ```

4.  Add a root `terragrunt.hcl` with remote backend and common inputs.

---

## Links and References

- [Terraform Official Site](https://www.terraform.io/)
- [Terragrunt GitHub Repository](https://github.com/gruntwork-io/terragrunt)
- [Gruntwork Documentation](https://docs.gruntwork.io/)

---

By the end of this lesson, you’ll have a clear understanding of how Terragrunt can streamline your Terraform workflows, reduce duplication, and empower your team to move faster with confidence.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/80c3af1c-e730-4884-8172-1968f95c4dfa/lesson/63bdb637-5d85-407b-83ea-35b45db18bee)**
>
> Watch video content
