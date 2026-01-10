# Wrapper Module Approach - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Modules/Wrapper-Module-Approach)

---

## Table of Contents

- Wrapper Module Approach
  - Why Use Wrapper Modules?
  - Common Use Cases
  - Implementation Example
  - Choosing Between Community, Custom, and Wrapper Modules
  - References
  - Watch Video
    - When to Use What

---

## Content

Terragrunt for Beginners

Terragrunt Modules

# Wrapper Module Approach

The **wrapper module pattern** builds on top of existing community modules, enabling you to enforce organizational standards while reusing battle-tested code. This approach reduces maintenance overhead, maintains upstream compatibility, and ensures consistency across environments.

## Why Use Wrapper Modules?

- **Consistency**  
  Enforce company-wide naming conventions, tag policies, and resource configurations through standardized inputs.
- **Scoped Customization**  
  Override only the settings you need, leaving the underlying community module intact for easier upstream upgrades.
- **Maintainability**  
  Minimize drift from official releases by wrapping instead of forking—updating to new versions becomes straightforward.

## Common Use Cases

| Use Case                        | Description                                                                                        |
| ------------------------------- | -------------------------------------------------------------------------------------------------- |
| Standardizing Inputs            | Enforce naming conventions, tagging policies, or sizing guidelines for all deployments.            |
| Adding Defaults                 | Provide default values for certain inputs (e.g., instance types, region) while allowing overrides. |
| Injecting Organization Settings | Preconfigure logging levels, monitoring hooks, or security controls across all modules.            |

## Implementation Example

1.  Create your wrapper module directory:  
    `modules/my-wrapper/`
2.  In `modules/my-wrapper/main.tf`, call the community module and map your inputs:

```
# modules/my-wrapper/main.tf
module "eks" {
  source       = "git::https://github.com/terraform-aws-modules/eks/aws"
  cluster_name = var.cluster_name       # mapped from wrapper input
  vpc_id       = var.vpc_id             # mapped from wrapper input
  tags = merge(
    var.organization_tags,              # enforced by your organization
    var.user_tags                       # additional user-provided tags
  )
  # ...other required community inputs
}
```

3.  Declare only the variables your team needs in `variables.tf`:

```
# modules/my-wrapper/variables.tf
variable "cluster_name" {
  description = "Name of the EKS cluster"
  type        = string
}


variable "vpc_id" {
  description = "VPC ID for the EKS cluster"
  type        = string
}


variable "organization_tags" {
  description = "Tags enforced by the organization"
  type        = map(string)
  default     = { Project = "AcmeCorp" }
}


variable "user_tags" {
  description = "Additional tags from the user"
  type        = map(string)
  default     = {}
}
```

> [!important]
> **Note**
>
> By exposing only selected inputs, you maintain a clear contract for your internal teams while still benefitting from community-driven improvements.

4.  In your root Terraform or Terragrunt configuration, invoke `modules/my-wrapper` instead of the community module directly.

```
module "production_eks" {
  source = "../modules/my-wrapper"


  cluster_name       = "prod-cluster"
  vpc_id             = "vpc-0123456789abcdef0"
  organization_tags  = { Environment = "production", Team = "infra" }
  user_tags          = { Owner = "alice" }
}
```

## Choosing Between Community, Custom, and Wrapper Modules

| Criteria               | Community Modules | Custom Modules | Wrapper Modules          |
| ---------------------- | ----------------- | -------------- | ------------------------ |
| Reusability            | High              | Low            | Medium                   |
| Development Speed      | Fast              | Slow           | Moderate                 |
| Maintenance Overhead   | Low               | High           | Medium                   |
| Upstream Compatibility | Direct upgrades   | N/A            | Retained with mapping    |
| Flexibility            | Limited to inputs | Full control   | Control over inputs only |

### When to Use What

- **Community Modules**: Go-to for rapid prototyping or teams with minimal customization needs.
- **Custom Modules**: Best for specialized architectures requiring bespoke resource definitions.
- **Wrapper Modules**: Ideal for enforcing organizational governance on top of community best practices.

> [!important]
> **Warning**
>
> Avoid forking community modules unless you require deep structural changes. Wrapping keeps you in sync with upstream fixes and feature releases.

## References

- [Terraform Module Registry](https://registry.terraform.io/)
- [Terraform AWS EKS Module](https://registry.terraform.io/modules/terraform-aws-modules/eks/aws)
- [Terraform Best Practices](https://www.terraform.io/docs/language/modules/index.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/4d4cda50-7d42-4622-b0d4-fa6e6ce0a16d/lesson/5504cd7a-0183-43a0-9b3c-f0a2e65e8f61)**
>
> Watch video content
