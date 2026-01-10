# get terragrunt dir - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Functions/get-terragrunt-dir)

---

## Table of Contents

- get terragrunt dir
  - When to Use get_terragrunt_dir()
  - Key Benefits
  - Best Practices
  - Example: Fixing Relative Paths in a VPC Module
  - Summary
  - Links and References
  - Watch Video
    - Applying get_terragrunt_dir()

---

## Content

Terragrunt for Beginners

Terragrunt Functions

# get terragrunt dir

The `get_terragrunt_dir()` function in Terragrunt returns the absolute filesystem path of the directory containing the current `terragrunt.hcl` configuration. By using this function, you can build dynamic file references, support modular layouts, and adapt configurations based on their location.

![The image shows a grid of folder icons with one highlighted, labeled "Path to config dir," and a label "Functionality" at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752884353/notes-assets/images/Terragrunt-for-Beginners-get-terragrunt-dir/folder-icons-grid-highlighted-config-path.jpg)

## When to Use `get_terragrunt_dir()`

- Dynamically adapt resources or input files based on the configuration directory
- Construct file paths that automatically adjust when the directory hierarchy changes
- Maintain flexible, modular directory structures without hard-coding absolute paths

![The image outlines the benefits of the `get_terragrunt_dir` function, highlighting its adaptability to config locations, dynamic path construction, and support for modular and flexible config structures.](https://kodekloud.com/kk-media/image/upload/v1752884354/notes-assets/images/Terragrunt-for-Beginners-get-terragrunt-dir/get-terragrunt-dir-benefits-outline.jpg)

## Key Benefits

| Benefit                 | Description                                                                |
| ----------------------- | -------------------------------------------------------------------------- |
| Dynamic Path Resolution | Automatically resolves relative paths from the `terragrunt.hcl` location.  |
| Modular Configuration   | Keeps module directories self-contained and portable.                      |
| Environment Agnostic    | Works consistently across local machines, CI pipelines, and remote states. |

## Best Practices

- Always reference inputs, variable files, and modules relative to `get_terragrunt_dir()`
- Avoid using `../` in paths that Terragrunt evaluates in its cache directory
- Combine with `extra_arguments` to pass var-files into remote Terraform modules

> [!important]
> **Warning**
>
> When Terragrunt downloads Terraform code into a cache, your working directory changes. Always use `get_terragrunt_dir()` to ensure paths are resolved against your configuration, not the cache folder.

![The image provides best practices for using `get_terragrunt_dir`, emphasizing the need for relative paths with remote Terraform configurations and clarifying that these paths are not relative to the temporary directory where code is downloaded.](https://kodekloud.com/kk-media/image/upload/v1752884355/notes-assets/images/Terragrunt-for-Beginners-get-terragrunt-dir/best-practices-get-terragrunt-dir.jpg)

---

## Example: Fixing Relative Paths in a VPC Module

Imagine you’re calling the Terraform AWS VPC module via Terragrunt and need to supply a `common.tfvars` file stored in a sibling directory:

```
# terragrunt.hcl (initial version)
terraform {
  source = "tfr://terraform-aws-modules/vpc/aws/?version=5.8.1"


  extra_arguments "custom_vars" {
    commands  = ["plan"]
    arguments = ["-var-file=../common.tfvars"]
  }
}
```

Your `common.tfvars`:

```
name = "KodeKloud-VPC"
cidr = "10.100.0.0/24"
```

When you run:

```
cd workspace/vpc
terragrunt plan
```

You’ll see:

```
Error: Failed to read variables file
  Given variables file ../common.tfvars does not exist.
```

Terragrunt is running Terraform inside its cache folder, so the relative path breaks.

### Applying `get_terragrunt_dir()`

Update your `terragrunt.hcl` to compute the correct path:

```
terraform {
  source = "tfr://terraform-aws-modules/vpc/aws//"


  extra_arguments "custom_vars" {
    commands  = ["plan"]
    arguments = ["-var-file=${get_terragrunt_dir()}/../common.tfvars"]
  }
}
```

Now `terragrunt plan` correctly locates `common.tfvars`, and the VPC module receives the desired inputs. After a successful apply, your AWS VPC resource might look like this:

```
resource "aws_vpc" "this" {
  cidr_block = "10.100.0.0/24"
  tags = {
    Name = "KodeKloud-VPC"
  }
  # ...other attributes omitted for brevity
}
```

---

## Summary

Using `get_terragrunt_dir()` ensures that:

- File references are always relative to your `terragrunt.hcl` location
- Your configurations remain portable and modular
- Terragrunt’s cache directory behavior won’t break your paths

Leverage this function to build more robust and maintainable infrastructure code.

---

## Links and References

- [Terragrunt Official Documentation](https://terragrunt.gruntwork.io/docs/)
- [Terraform AWS VPC Module](https://registry.terraform.io/modules/terraform-aws-modules/vpc/aws/latest)
- [Working with Extra Arguments in Terragrunt](https://terragrunt.gruntwork.io/docs/features/extra-arguments/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/5775621f-5504-4da8-835d-661cda37a852/lesson/f36ff662-3b0c-44cd-8d3e-a8ae00a04013)**
>
> Watch video content
