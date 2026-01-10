# Terragrunt Function Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Functions/Terragrunt-Function-Overview)

---

## Table of Contents

- Terragrunt Function Overview
  - Core Terragrunt Functions
  - Combining Terragrunt with Terraform Functions
  - Links and References
  - Watch Video

---

## Content

Terragrunt for Beginners

Terragrunt Functions

# Terragrunt Function Overview

As you design your infrastructure with Terragrunt, leveraging its built-in functions can greatly enhance modularity, maintainability, and dynamic configuration. Below, we present a concise overview of core Terragrunt functions, along with practical examples and links to further resources.

## Core Terragrunt Functions

| Function                    | Description                                                                                                             |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `read_terragrunt_config`    | Read and parse another Terragrunt configuration file, giving you access to its inputs, dependencies, and locals.        |
| `find_in_parent_folders`    | Recursively search parent directories to locate specific files (e.g., `terragrunt.hcl`), enabling shared configs.       |
| `path_relative_to_include`  | Compute the relative path from the current file to an included configuration, promoting modular directory layouts.      |
| `get_terragrunt_dir`        | Return the full path of the directory containing the current `terragrunt.hcl` file, useful for dynamic file references. |
| `get_parent_terragrunt_dir` | Retrieve the directory path of the parent Terragrunt configuration, supporting hierarchical inheritance.                |
| `run_cmd`                   | Execute a shell command directly within Terragrunt, allowing automation of external tools or scripts.                   |

> [!important]
> **Warning**
>
> Use `run_cmd` with caution. Executing shell commands can expose sensitive information or introduce security risks. Always validate inputs and avoid hardcoding credentials.

![The image lists Terragrunt functions in a vertical flowchart format, including functions like `read_terragrunt_config` and `run_cmd`.](/images/Terragrunt-for-Beginners-Terragrunt-Function-Overview/terragrunt-functions-flowchart-diagram.jpg)

## Combining Terragrunt with Terraform Functions

Terragrunt functions become even more powerful when combined with Terraform’s native functions. For example, to extract just the directory name of your current Terragrunt configuration, you can use Terraform’s `basename` together with `get_terragrunt_dir`:

```
# Returns the base name of the directory containing this Terragrunt configuration
locals {
  current_module = basename(get_terragrunt_dir())
}
```

This pattern helps you dynamically name resources or output modules based on directory structure—ideal for large, multi-environment projects.

## Links and References

- Terragrunt Documentation: https://terragrunt.gruntwork.io/docs/
- Terraform Language Functions: https://developer.hashicorp.com/terraform/language/functions
- Terragrunt GitHub Repository: https://github.com/gruntwork-io/terragrunt
- Best Practices for Infrastructure as Code: https://www.hashicorp.com/resources/series/infrastructure-as-code-guide

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/5775621f-5504-4da8-835d-661cda37a852/lesson/de16959f-d86c-4a43-8b10-8dd6f3934411)**
>
> Watch video content
