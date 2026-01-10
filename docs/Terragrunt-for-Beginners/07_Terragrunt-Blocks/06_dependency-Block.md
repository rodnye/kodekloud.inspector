# dependency Block - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Blocks/dependency-Block)

---

## Table of Contents

- dependency Block
  - Key Attributes
  - Benefits of Using Dependency Blocks
  - Optimization Strategies
  - Best Practices
  - Example Usage
  - Links and References
  - Watch Video
    - 1. EC2 Module Without Dependencies
    - 2. Adding a VPC Dependency

---

## Content

Terragrunt for Beginners

Terragrunt Blocks

# dependency Block

The **Terragrunt dependency block** lets you declare dependencies between modules, enabling one module to consume another’s outputs. This promotes modular infrastructure, improves code reuse, and streamlines inter-module communication.

> [!important]
> **Note**
>
> Using dependency blocks helps enforce a clear execution order and guarantees that required resources are available before they’re referenced.

## Key Attributes

| Attribute                                             | Type / Default    | Description                                                                                  |
| ----------------------------------------------------- | ----------------- | -------------------------------------------------------------------------------------------- |
| name                                                  | string            | Identifier for the dependency block. Useful when you have multiple dependencies.             |
| config\\\_path                                        | string            | Path to the Terragrunt module or folder with the `terragrunt.hcl`.                           |
| enabled                                               | boolean / `true`  | Controls whether Terragrunt fetches this dependency. Set to `false` to skip resolution.      |
| skip\\\_outputs                                       | boolean / `false` | If `true`, skips executing `terragrunt output`, reducing runtime when outputs aren’t needed. |
| mock\\\_outputs                                       | map               | Key-value pairs to return when the target module has no real outputs.                        |
| mock\\\_outputs\\\_allowed                            | list              | Terraform commands (e.g., `plan`, `apply`) for which mock outputs can be used.               |
| mock\\\_outputs\\\_merge\\\_strategy\\\_with\\\_state | string            | Strategy for merging mock outputs with existing remote state (e.g., `merge`, `overwrite`).   |

## Benefits of Using Dependency Blocks

- **Modularization & Reusability**  
  Break your infrastructure into discrete modules that depend on each other’s outputs.
- **Output References**  
  Access values via `dependency.<name>.outputs.<key>` expressions.
- **Selective Execution**  
  Temporarily disable dependencies using the `enabled` flag.
- **Mock Outputs for Testing**  
  Simulate module outputs during `validate` or `plan` without applying the dependent module.
- **Performance Optimization**  
  Skip unnecessary state downloads with `skip_outputs` and let Terragrunt fetch only the required outputs.
- **Team Collaboration**  
  Independent development and testing of modules with clearly defined input/output contracts.

## Optimization Strategies

Terragrunt fetches dependencies in parallel at each root level but parses nested dependencies serially. When using remote state and optimization flags, it retrieves only the lowest-level outputs, significantly speeding up large infrastructures.

> [!important]
> **Warning**
>
> Overusing mock outputs can mask real configuration issues. Always validate with real outputs before production deployments.

## Best Practices

- Organize dependencies in a dedicated block at the top of your `terragrunt.hcl`.
- Keep `config_path` references relative and consistent.
- Use `mock_outputs` only for CI/CD testing and validation.
- Ensure remote state backends and optimization flags (`skip_outputs`) are configured for faster runs.
- Name your dependencies meaningfully to convey the resource relationship.

## Example Usage

### 1\. EC2 Module Without Dependencies

```
terraform {
  source = "tfr://terraform-aws-modules/ec2-instance/aws//?version=5.6.1"
}


include "root" {
  path   = find_in_parent_folders()
  expose = true
}


include "common" {
  path   = find_in_parent_folders("common.hcl")
  expose = true
}


inputs = {
  name = include.common.locals.project
}
```

### 2\. Adding a VPC Dependency

By adding a `dependency` block, you ensure the EC2 instance uses the VPC created by another module:

```
terraform {
  source = "tfr://terraform-aws-modules/ec2-instance/aws//?version=5.6.1"
}


include "root" {
  path   = find_in_parent_folders()
  expose = true
}


include "common" {
  path   = find_in_parent_folders("common.hcl")
  expose = true
}


dependency "vpc" {
  config_path = "../vpc"
}


inputs = {
  name      = include.common.locals.project
  subnet_id = dependency.vpc.outputs.public_subnets[0]
}
```

This configuration guarantees that the VPC is provisioned before the EC2 instance and that the instance launches in the correct public subnet.

## Links and References

- [Terragrunt Dependency Block Documentation](https://terragrunt.gruntwork.io/docs/features/dependency-block/)
- [Terraform AWS EC2 Module](https://registry.terraform.io/modules/terraform-aws-modules/ec2-instance/aws/latest)
- [Terragrunt Best Practices](https://terragrunt.gruntwork.io/docs/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/bab279d4-de1d-4e8d-8376-ea420c71c9e1/lesson/c29a672f-f103-4fe7-a4a8-3f57dea8d4e4)**
>
> Watch video content
