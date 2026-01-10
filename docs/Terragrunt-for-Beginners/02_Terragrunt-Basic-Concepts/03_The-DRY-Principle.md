# The DRY Principle - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Basic-Concepts/The-DRY-Principle)

---

## Table of Contents

- The DRY Principle
  - 1. Modular Configuration
  - 2. Variable Abstraction
  - 3. Hierarchical Configuration Inheritance
  - 4. Simplified Maintenance and Promotion
  - Links and References
  - Watch Video

---

## Content

Terragrunt for Beginners

Terragrunt Basic Concepts

# The DRY Principle

In Infrastructure as Code (IaC), the DRY (Don’t Repeat Yourself) principle is essential for creating modular, maintainable, and scalable configurations. Terragrunt extends Terraform by enforcing DRY across your codebase. In this guide, you’ll learn how to:

- Structure reusable modules to eliminate redundancy
- Centralize and abstract variables for consistency
- Inherit shared settings through a hierarchical layout
- Streamline maintenance and promote changes safely

> [!important]
> **Note**
>
> This article assumes basic familiarity with Terraform and HCL. For a Terraform refresher, see [Terraform Overview](https://www.terraform.io/intro).

---

## 1\. Modular Configuration

By encapsulating common resources in Terragrunt modules, you define infrastructure blocks once and reuse them across environments. This approach reduces code duplication and speeds up delivery.

Example module call in your environment folder:

```
# live/prod/app/terragrunt.hcl
include {
  path = find_in_parent_folders()
}

terraform {
  source = "git::ssh://git@github.com/your-org/terraform-modules.git//app?ref=v1.2.0"
}

inputs = {
  instance_count = 3
  instance_type  = "t3.medium"
}
```

![The image illustrates the "Don't Repeat Yourself" (DRY) principle, highlighting modular configuration, modular and reusable components, and reduced redundancy.](https://kodekloud.com/kk-media/image/upload/v1752884288/notes-assets/images/Terragrunt-for-Beginners-The-DRY-Principle/dry-principle-modular-configuration-diagram.jpg)

---

## 2\. Variable Abstraction

Terragrunt centralizes variable definitions into shared files, preventing hard-coded values and scattered overrides. Reuse a single `variables.hcl` across modules:

```
# live/common/variables.hcl
locals {
  project_name = "MyApp"
  region       = "us-east-1"
  tags = {
    Environment = read_terragrunt_config(find_in_parent_folders("env.hcl")).inputs.environment
    Project     = local.project_name
  }
}
```

Then reference it:

```
# live/prod/app/terragrunt.hcl
dependency "vars" {
  config_path = find_in_parent_folders("common")
}

inputs = merge(dependency.vars.outputs, {
  service_port = 8080
})
```

![The image explains the "Don't Repeat Yourself" (DRY) principle, highlighting variable abstraction to avoid code repetition and enable centralized variable management.](https://kodekloud.com/kk-media/image/upload/v1752884288/notes-assets/images/Terragrunt-for-Beginners-The-DRY-Principle/dry-principle-variable-abstraction-diagram.jpg)

---

## 3\. Hierarchical Configuration Inheritance

Terragrunt’s directory structure supports inheritance of configuration blocks. Define global settings at the root, then override or extend them in child folders:

```
# live/terragrunt.hcl (root)
remote_state {
  backend = "s3"
  config = {
    bucket = "my-tf-state"
    key    = "${path_relative_to_include()}/terraform.tfstate"
    region = "us-east-1"
  }
}
```

```
# live/prod/terragrunt.hcl
include {
  path = find_in_parent_folders()
}

inputs = {
  environment = "production"
}
```

![The image explains the "Don't Repeat Yourself" (DRY) principle, highlighting hierarchical configuration, enabling inheritance of settings, reducing duplicate configurations, and facilitating reuse of configuration settings.](https://kodekloud.com/kk-media/image/upload/v1752884289/notes-assets/images/Terragrunt-for-Beginners-The-DRY-Principle/dry-principle-configuration-inheritance-reuse.jpg)

---

## 4\. Simplified Maintenance and Promotion

With DRY in place, updating modules or variables in one location propagates changes everywhere they’re used. This reduces configuration drift, lowers the risk of errors, and accelerates promotions across dev, staging, and prod.

| Benefit                     | Description                                               | Example Change                          |
| --------------------------- | --------------------------------------------------------- | --------------------------------------- |
| Single Source of Truth      | One module or file manages multiple environments          | Bump AMI ID in module repository        |
| Consistent Environment Tags | Central tags applied automatically across all deployments | Add `CostCenter` tag in `variables.hcl` |
| Rapid Rollout               | Apply changes once and run `terragrunt apply-all`         | Security patch update                   |
| Reduced Human Error         | Fewer manual edits across multiple HCL files              | Fix input typo in shared file           |

![The image illustrates the "Don't Repeat Yourself" (DRY) principle, highlighting benefits like simplified maintenance, more maintainable code, and uniform updates across code.](https://kodekloud.com/kk-media/image/upload/v1752884290/notes-assets/images/Terragrunt-for-Beginners-The-DRY-Principle/dry-principle-benefits-code-maintenance.jpg)

---

## Links and References

- [Terragrunt Documentation](https://terragrunt.gruntwork.io/)
- [Terraform Registry](https://registry.terraform.io/)
- [Infrastructure as Code Best Practices](https://docs.microsoft.com/azure/devops/learn/what-is-infrastructure-as-code)
- [HCL Language Reference](https://github.com/hashicorp/hcl)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/9618155f-f613-4c7b-92c7-9be9ddfa22b5/lesson/ac9182c8-4e96-4d29-b3eb-630496944ac8)**
>
> Watch video content
