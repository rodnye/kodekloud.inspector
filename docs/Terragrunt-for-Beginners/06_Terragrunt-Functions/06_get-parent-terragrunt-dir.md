# get parent terragrunt dir - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Functions/get-parent-terragrunt-dir)

---

## Table of Contents

- get parent terragrunt dir
  - What Is get_parent_terragrunt_dir()?
  - Key Benefits
  - Example Usage
  - Best Practices
  - Links and References
  - Watch Video

---

## Content

Terragrunt for Beginners

Terragrunt Functions

# get parent terragrunt dir

Terragrunt’s built-in function `get_parent_terragrunt_dir()` simplifies hierarchical configuration management by returning the file path of the parent Terragrunt directory. Use it to construct relative `source` paths, inherit common settings, and keep your infrastructure code modular and maintainable.

## What Is `get_parent_terragrunt_dir()`?

`get_parent_terragrunt_dir()` resolves at runtime to the directory containing the nearest parent `terragrunt.hcl`. This enables:

- Dynamic discovery of module or state backend locations
- Reuse of shared configurations defined in a parent folder
- Cleaner directory structures for multi-environment setups

> [!important]
> **Note**
>
> Ensure your Terragrunt directory layout follows a clear hierarchy—each child folder must reside under a parent that contains a `terragrunt.hcl`.

## Key Benefits

| Feature                       | Description                                                                 |
| ----------------------------- | --------------------------------------------------------------------------- |
| Dynamic Path Construction     | Automatically build paths for Terraform modules relative to parent folders. |
| Hierarchical Inheritance      | Share backend or provider settings from a top-level `terragrunt.hcl`.       |
| Modular & Flexible Structures | Keep each environment or component isolated while reusing common logic.     |

![The image describes the benefits of the `get_parent_terragrunt_dir` function, highlighting its adaptability to parent Terragrunt configs, dynamic path construction, and support for modular and flexible config structures.](https://kodekloud.com/kk-media/image/upload/v1752884353/notes-assets/images/Terragrunt-for-Beginners-get-parent-terragrunt-dir/get-parent-terragrunt-dir-benefits.jpg)

## Example Usage

Place the following in a child environment’s `terragrunt.hcl` to reference a module stored alongside the parent configuration:

```
# terragrunt.hcl in /envs/dev
terraform {
  source = "${get_parent_terragrunt_dir()}/modules/network"
}


inputs = {
  vpc_cidr = "10.0.0.0/16"
}
```

This resolves to `/envs/modules/network` if the parent `terragrunt.hcl` lives in `/envs`.

> [!important]
> **Warning**
>
> Calling `get_parent_terragrunt_dir()` at the root level (where no parent exists) will result in an error. Always validate your folder structure before using this function.

## Best Practices

- Keep a **consistent directory layout** so returned paths remain predictable.
- Use `get_parent_terragrunt_dir()` for `source` definitions in **nested** configurations only.
- Combine with other Terragrunt functions like `find_in_parent_folders()` to import common settings.

## Links and References

- [Terragrunt Official Documentation](https://terragrunt.gruntwork.io/docs/)
- [Terraform Modules](https://www.terraform.io/language/modules)
- [Terragrunt GitHub Repository](https://github.com/gruntwork-io/terragrunt)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/5775621f-5504-4da8-835d-661cda37a852/lesson/2eadb951-218a-443c-bc0b-946edd9822c7)**
>
> Watch video content
