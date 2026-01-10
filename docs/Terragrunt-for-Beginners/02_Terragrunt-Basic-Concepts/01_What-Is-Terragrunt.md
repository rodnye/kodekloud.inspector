# What Is Terragrunt - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Basic-Concepts/What-Is-Terragrunt)

---

## Table of Contents

- What Is Terragrunt
  - Why Terragrunt?
  - Key Features
  - Common Use Cases
  - Links and References
  - Watch Video

---

## Content

Terragrunt for Beginners

Terragrunt Basic Concepts

# What Is Terragrunt

Terragrunt is a lightweight wrapper for [Terraform](https://www.terraform.io/), built by Gruntwork to bring structure and automation to Infrastructure as Code (IaC) workflows. Rather than replacing Terraform, Terragrunt enhances it—making it easier to manage complex, multi-environment infrastructures with less repetition and more consistency.

> [!important]
> **Note**
>
> Terragrunt works _on top_ of Terraform. You still write your IaC in Terraform language and benefit from the Terraform CLI.

## Why Terragrunt?

- Enforces best practices for Terraform configurations
- Simplifies remote state configuration and locking
- Promotes reuse of variables and modules
- Reduces code duplication with parent–child inheritance

## Key Features

| Feature                      | Description                                                                                          |
| ---------------------------- | ---------------------------------------------------------------------------------------------------- |
| Hierarchical Configuration   | Organize Terraform code in directories that reflect environments and regions.                        |
| Remote State Management      | Automate backend setup (e.g., S3, Azure Blob, GCS) and enable state locking with DynamoDB or Consul. |
| Modular Variable Definitions | Define shared variables in one place and reference them across multiple modules and environments.    |
| DRY (Don't Repeat Yourself)  | Inherit and override configurations in a parent–child folder structure to minimize duplication.      |

> [!important]
> **Warning**
>
> Always enable state locking and encryption for your remote backend to prevent concurrent writes and protect sensitive data.

![The image lists four key features: Hierarchical Configuration, Remote Management, Modular Variable Definitions, and DRY Approach, each with an icon.](https://kodekloud.com/kk-media/image/upload/v1752884291/notes-assets/images/Terragrunt-for-Beginners-What-Is-Terragrunt/key-features-hierarchical-remote-modular-dry.jpg)

## Common Use Cases

Terragrunt shines in scenarios where Terraform alone can become unwieldy:

| Use Case                        | Benefit                                                                                        |
| ------------------------------- | ---------------------------------------------------------------------------------------------- |
| Complex Infrastructure Projects | Simplifies management of interdependent modules, networks, and cloud resources.                |
| Multi-Environment Deployments   | Maintains consistency across dev, staging, and prod through shared remote state and variables. |

![The image illustrates use cases for Terragrunt, highlighting its application in managing complex infrastructure and deployments.](https://kodekloud.com/kk-media/image/upload/v1752884293/notes-assets/images/Terragrunt-for-Beginners-What-Is-Terragrunt/terragrunt-use-cases-infrastructure-deployments.jpg)

## Links and References

- [Terragrunt Documentation](https://terragrunt.gruntwork.io/)
- [Terraform Documentation](https://www.terraform.io/docs/)
- [Gruntwork Blog on Terragrunt](https://blog.gruntwork.io/introducing-terragrunt-9f9d2c2bdb34)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/9618155f-f613-4c7b-92c7-9be9ddfa22b5/lesson/48d37272-f19b-4ae3-a51f-01a1c269e483)**
>
> Watch video content
