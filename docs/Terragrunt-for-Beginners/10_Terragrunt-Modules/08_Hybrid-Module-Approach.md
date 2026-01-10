# Hybrid Module Approach - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Modules/Hybrid-Module-Approach)

---

## Table of Contents

- Hybrid Module Approach
  - Why Adopt a Hybrid Module Model?
  - Comparing Module Sources
  - Best Practices for Hybrid Modules
  - Example: Hybrid Module Configuration
  - Links and References
  - Watch Video

---

## Content

Terragrunt for Beginners

Terragrunt Modules

# Hybrid Module Approach

In this lesson, we’ll dive into the Hybrid Module Approach. Rather than relying solely on private Git repositories or exclusively on the [Terraform Registry](https://registry.terraform.io/), organizations often blend both community-maintained modules and in-house custom modules. This strategy accelerates development, ensures compliance, and reduces maintenance overhead.

## Why Adopt a Hybrid Module Model?

Community modules deliver battle-tested patterns for common infrastructure components—such as VPCs, security groups, and IAM roles—while custom modules allow you to tailor resources to your organization’s policies and application requirements.

**Key advantages include:**

- Rapid adoption of reusable, well-supported modules for standard services
- Ability to extend or fine-tune modules to meet project-specific needs
- Consistent versioning of your own modules alongside community offerings

> [!important]
> **Note**
>
> Always pin module versions (`version = "x.y.z"` or Git commit hashes) to avoid unexpected updates in production.

## Comparing Module Sources

| Source             | Use Case                                       | Example                                                         |
| ------------------ | ---------------------------------------------- | --------------------------------------------------------------- |
| Terraform Registry | Standard components supported by the community | `module "vpc" { source = "terraform-aws-modules/vpc/aws" }`     |
| Private Git Repos  | Custom modules tailored to internal policies   | `module "app" { source = "git@github.com:org/app-module.git" }` |
| Local File System  | Rapid prototyping or offline development       | `module "db" { source = "./modules/database" }`                 |

## Best Practices for Hybrid Modules

1.  **Version Control**
    - Use semantic versioning for both community and custom modules.
    - Tag releases in Git and reference stable versions.

2.  **Module Registry**
    - Mirror public modules internally for audit and compliance.
    - Store custom modules in a private Terraform Registry or Nexus.

3.  **Security and Compliance**
    - Scan community modules for vulnerabilities before adoption.
    - Enforce organizational standards via pre-commit hooks or CI pipelines.

> [!important]
> **Warning**
>
> Reusing community modules without reviewing their code can introduce security risks. Always perform a security audit before deploying to production.

## Example: Hybrid Module Configuration

```
terraform {
  required_version = ">= 1.0"
}


provider "aws" {
  region = "us-east-1"
}


module "network" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "3.14.0"


  name = "hybrid-vpc"
  cidr = "10.0.0.0/16"
}


module "app_infrastructure" {
  source = "git@github.com:your-org/app-infra-module.git"
  version = "v2.1.0"


  env        = "production"
  vpc_id     = module.network.vpc_id
  subnet_ids = module.network.private_subnets
}
```

## Links and References

- [Terraform Registry](https://registry.terraform.io/)
- [Official Terraform Documentation](https://www.terraform.io/docs/)
- [Git Best Practices](https://git-scm.com/book/en/v2)
- [Terraform AWS Modules](https://github.com/terraform-aws-modules)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/4d4cda50-7d42-4622-b0d4-fa6e6ce0a16d/lesson/8b2334be-2a67-4763-88ce-57c0bf4ec615)**
>
> Watch video content
