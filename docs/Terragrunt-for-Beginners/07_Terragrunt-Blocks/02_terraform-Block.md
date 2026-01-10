# terraform Block - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Blocks/terraform-Block)

---

## Table of Contents

- terraform Block
  - Key Terraform Block Attributes
  - 1. Defining the Source
  - 2. Passing Extra Arguments
  - 3. Hooks and Custom Commands
  - References
  - Watch Video
    - 1.1 Terraform Registry
    - 1.2 GitHub (HTTPS)
    - 1.3 GitHub (SSH)
    - 1.4 Local Modules

---

## Content

Terragrunt for Beginners

Terragrunt Blocks

# terraform Block

The Terraform block in Terragrunt defines how Terragrunt locates and invokes your Terraform configuration. It centralizes settings such as module source, version locking, extra CLI arguments, and lifecycle hooks. By configuring this block once, you ensure consistent Terraform behavior across all environments and modules.

## Key Terraform Block Attributes

| Attribute         | Description                                                                          | Example                                                                      |
| ----------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| `source`          | Location of the Terraform module (Registry, Git repo, or local path)                 | `source = "tfr://terraform-aws-modules/vpc/aws/?version=5.8.1"`              |
| `version` / `ref` | Locks a Registry module or Git source to a specific version or commit                | `?version=5.8.1` (Registry) / `?ref=v1.2.0` (Git)                            |
| `extra_arguments` | Defines additional CLI flags or variable files to pass to Terraform                  | `arguments = ["-var-file=prod.tfvars"]`                                      |
| `hooks`           | `before_hook` or `after_hook` blocks for executing scripts around Terraform commands | `before_hook "lint" { commands = ["plan"]; execute = ["npm","run","lint"] }` |

> [!important]
> **Note**
>
> Always lock your modules to a specific `version` or `ref` to avoid unintended upgrades.
> For Registry modules, append `?version=`, and for Git sources, use `?ref=`.

---

## 1\. Defining the Source

The `source` attribute tells Terragrunt where to fetch Terraform code. You can reference:

- **Terraform Registry Modules**
- **Git Repositories** (HTTPS or SSH)
- **Local Directories**

### 1.1 Terraform Registry

```
terraform {
  source = "tfr://terraform-aws-modules/vpc/aws/?version=5.8.1"
}
```

Include subdirectories by adding extra slashes:

```
terraform {
  source = "tfr://terraform-aws-modules/vpc/aws//modules/subnet?version=5.8.1"
}
```

### 1.2 GitHub (HTTPS)

```
terraform {
  source = "github.com/terraform-aws-modules/terraform-aws-vpc?ref=v5.8.1"
}
```

### 1.3 GitHub (SSH)

```
terraform {
  source = "git@github.com:terraform-aws-modules/terraform-aws-vpc.git?ref=v5.8.1"
}
```

### 1.4 Local Modules

Ideal for local development and testing:

```
terraform {
  source = "../modules/vpc-module"
}
```

---

## 2\. Passing Extra Arguments

Use `extra_arguments` to pass flags, variable files, or arbitrary flags to Terraform:

```
terraform {
  extra_arguments "prod_vars" {
    commands  = get_terraform_commands_that_need_vars()
    arguments = ["-var-file=prod.tfvars"]
  }
}
```

| Field       | Description                                        |
| ----------- | -------------------------------------------------- |
| `commands`  | List of Terraform commands (e.g., `plan`, `apply`) |
| `arguments` | Array of CLI flags or variable file references     |

---

## 3\. Hooks and Custom Commands

Hooks allow you to run scripts before or after Terraform commands:

```
terraform {
  before_hook "validate_schema" {
    commands = ["plan", "apply"]
    execute  = ["python", "scripts/validate.py"]
  }

  after_hook "notify" {
    commands = ["apply"]
    execute  = ["bash", "scripts/notify.sh"]
  }
}
```

| Hook Type     | Purpose                                         |
| ------------- | ----------------------------------------------- |
| `before_hook` | Run tasks prior to Terraform execution          |
| `after_hook`  | Run cleanup or notifications post Terraform run |

> [!important]
> **Warning**
>
> Use hooks carefully in production: unexpected script failures can block Terraform runs.
> Always test hooks in a development environment first.

---

## References

- [Terragrunt Documentation](https://terragrunt.gruntwork.io/docs/)
- [Terraform Registry](https://registry.terraform.io/)
- [GitHub Modules](https://github.com/terraform-aws-modules)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/bab279d4-de1d-4e8d-8376-ea420c71c9e1/lesson/b96e4c21-28e8-4db7-9389-6136d4a5020c)**
>
> Watch video content
