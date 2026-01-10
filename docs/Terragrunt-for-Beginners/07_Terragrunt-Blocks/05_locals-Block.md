# locals Block - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Blocks/locals-Block)

---

## Table of Contents

- locals Block
  - Benefits of the locals Block
  - Considerations
  - Best Practices
  - Example Usage
  - Links and References
  - Watch Video
    - 1. Defining a local variable
    - 2. Referencing locals from a shared config (common.hcl)
    - 3. Adding file-specific locals

---

## Content

Terragrunt for Beginners

Terragrunt Blocks

# locals Block

In this lesson, you’ll learn how to leverage the `locals` block in Terragrunt to define reusable variables and expressions directly within your configuration. By centralizing complex values, you can simplify your HCL, reduce duplication, and improve maintainability.

## Benefits of the locals Block

Encapsulating expressions or static values into named local variables offers clear advantages:

| Benefit          | Description                                                              |
| ---------------- | ------------------------------------------------------------------------ |
| Code readability | Improves comprehension by giving meaningful names to expressions         |
| Code reusability | Follows DRY (Don’t Repeat Yourself) by reusing values in multiple places |

![The image is a diagram titled "Locals Block" highlighting two benefits: "Code readability" and "Code reusability."](https://kodekloud.com/kk-media/image/upload/v1752884308/notes-assets/images/Terragrunt-for-Beginners-locals-Block/locals-block-code-readability-reusability-diagram.jpg)

## Considerations

Local variables are strictly confined to the configuration where they’re declared. They won’t be shared across sibling or parent Terragrunt files.

> [!important]
> **Warning**
>
> `locals` in Terragrunt are not global. You cannot reference a local variable defined in one directory from another unless explicitly passed through inputs or shared via a common config.

![The image is a diagram titled "Locals Block" with two points: "Limited to the scope" and "Cannot be shared across configs," accompanied by icons. At the bottom, there's a label "Considerations."](https://kodekloud.com/kk-media/image/upload/v1752884308/notes-assets/images/Terragrunt-for-Beginners-locals-Block/locals-block-scope-considerations-diagram.jpg)

## Best Practices

- Group related expressions under a single `locals` block to keep your configuration tidy.
- Name variables clearly to convey their purpose (e.g., `project_name`, `environment_cidr`).
- Avoid overusing locals for trivial values; reserve them for expressions or values reused multiple times.
- Document complex locals with inline comments for future maintainers.

![The image is a slide titled "Locals Block" with a purple icon and text explaining it is used to reduce complexity by defining variables. It also includes a "Best Practices" button.](https://kodekloud.com/kk-media/image/upload/v1752884309/notes-assets/images/Terragrunt-for-Beginners-locals-Block/locals-block-reduce-complexity-best-practices.jpg)

## Example Usage

### 1\. Defining a local variable

```
locals {
  project = "KodeKloud"
}
```

### 2\. Referencing locals from a shared config (`common.hcl`)

```
terraform {
  source = "tfr://terraform-aws-modules/vpc/aws//?version=5.8.1"
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

### 3\. Adding file-specific locals

You can define additional `locals` in any Terragrunt file for values unique to that directory.

```
locals {
  cidr = "10.100.0.0/16"
}


inputs = {
  name     = include.common.locals.project
  vpc_cidr = local.cidr
}
```

This `cidr` variable is available only within the current VPC configuration, ensuring isolation from other modules.

## Links and References

- [Terragrunt Documentation](https://terragrunt.gruntwork.io/docs/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/bab279d4-de1d-4e8d-8376-ea420c71c9e1/lesson/1c5c1958-10fe-4912-964d-5478cecc3b1f)**
>
> Watch video content
