# find in parent folders - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Functions/find-in-parent-folders)

---

## Table of Contents

- find in parent folders
  - Why Use find_in_parent_folders?
  - Best Practices
  - Real-World Example
  - References
  - Watch Video
    - Verify with Terragrunt
    - common.hcl

---

## Content

Terragrunt for Beginners

Terragrunt Functions

# find in parent folders

Terragrunt’s built-in function `find_in_parent_folders` enables recursive searches up your directory tree to locate a specific file or folder. This approach is invaluable when you need to reference shared configurations or modules in a multi-layered project, removing the brittleness of hardcoded relative paths.

![The image shows a hierarchical arrangement of folder icons with the label "find_in_parent_folders" at the top and "Functionality" at the bottom. It appears to represent a file system structure or search functionality within parent folders.](https://kodekloud.com/kk-media/image/upload/v1752884349/notes-assets/images/Terragrunt-for-Beginners-find-in-parent-folders/find-in-parent-folders-hierarchy.jpg)

## Why Use `find_in_parent_folders`?

By leveraging this function, you can:

- Dynamically adapt configuration based on files located higher in the hierarchy
- Inherit and override settings across environments without manual path tweaks
- Maintain cleaner, DRY (Don’t Repeat Yourself) configurations

![The image is a presentation slide titled "find_in_parent_folders," highlighting two benefits: adapting based on configurations from parent folders and flexible configuration inheritance.](https://kodekloud.com/kk-media/image/upload/v1752884350/notes-assets/images/Terragrunt-for-Beginners-find-in-parent-folders/find-in-parent-folders-benefits-slide.jpg)

## Best Practices

- Organize projects into clear, modular, hierarchical folders
- Use `find_in_parent_folders` inside `include` blocks to locate root-level `terragrunt.hcl`
- Avoid embedding static paths; let Terragrunt resolve them dynamically

![The image is a diagram titled "find_in_parent_folders" with icons and text explaining its use in modular environments and include blocks, along with a "Best Practices" button.](https://kodekloud.com/kk-media/image/upload/v1752884351/notes-assets/images/Terragrunt-for-Beginners-find-in-parent-folders/find-in-parent-folders-diagram-best-practices.jpg)

> [!important]
> **Note**
>
> `find_in_parent_folders` stops when it hits the filesystem root or finds the target file. If the file isn’t present, Terragrunt throws an error.

## Real-World Example

Imagine a VPC module that relies on common variables from `common.hcl`.

Before (hardcoded path):

```
terraform {
  source = "tfr://terraform-aws-modules/vpc/aws//?version=5.8.1"
}


locals {
  common_vars = read_terragrunt_config("../common.hcl")
}


inputs = {
  name = "${local.common_vars.inputs.project}-${local.common_vars.inputs.environment}-VPC"
}
```

After (dynamic lookup):

```
terraform {
  source = "tfr://terraform-aws-modules/vpc/aws//?version=5.8.1"
}


locals {
  common_vars = read_terragrunt_config(find_in_parent_folders("common.hcl"))
}


inputs = {
  name = "${local.common_vars.inputs.project}-${local.common_vars.inputs.environment}-VPC"
}
```

Now, no matter how deep your `vpc/` folder is nested, Terragrunt will climb up until it finds `common.hcl`.

### Verify with Terragrunt

Run:

```
~/workspace/vpc
> terragrunt plan
```

You should see the VPC name generated using values from `common.hcl`, for example:

```
KodeKloudDevVPC
```

### common.hcl

```
inputs = {
  project     = "KodeKloud"
  environment = "dev"
}
```

## References

- [Terragrunt Documentation: find_in_parent_folders](https://terragrunt.gruntwork.io/docs/reference/functions/#find_in_parent_folders)
- [Terragrunt Official Site](https://terragrunt.gruntwork.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/5775621f-5504-4da8-835d-661cda37a852/lesson/0fa40a93-2c92-4fb1-9ef6-5477ac7d9604)**
>
> Watch video content
