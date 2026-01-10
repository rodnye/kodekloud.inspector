# Directory Structure - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Configuration/Directory-Structure)

---

## Table of Contents

- Directory Structure
  - Key Components
  - Example Directory Tree
  - How It Works
  - Benefits
  - Links and References
  - Watch Video

---

## Content

Terragrunt for Beginners

Terragrunt Configuration

# Directory Structure

A well-organized directory layout simplifies management of Terraform configurations with Terragrunt, promotes reuse, and makes environment-specific customizations straightforward.

## Key Components

| Component             | Purpose                                                  | Location                              |
| --------------------- | -------------------------------------------------------- | ------------------------------------- |
| Root `terragrunt.hcl` | Defines global settings (remote state, providers, hooks) | `/terragrunt.hcl`                     |
| **Modules**           | Reusable Terraform logic (resources, variables)          | `/modules/<module-name>/`             |
| **Environments**      | Environment-specific configurations                      | `/envs/<environment>/`                |
| Shared Variables      | Centralizes common variable values per environment       | `/envs/<environment>/common-vars.hcl` |

## Example Directory Tree

```
.
├── terragrunt.hcl              # Global Terragrunt configuration
├── modules                     # Reusable Terraform modules
│   ├── app
│   │   ├── main.tf
│   │   └── variables.tf
│   └── mysql
│       ├── main.tf
│       └── variables.tf
└── envs                        # Environment-specific configurations
    ├── dev
    │   ├── account.hcl         # Dev account ID, region, etc.
    │   ├── common-vars.hcl     # Shared dev variables
    │   ├── app
    │   │   └── terragrunt.hcl  # Inherits root, adds app settings
    │   └── mysql
    │       └── terragrunt.hcl  # Inherits root, adds MySQL settings
    └── prod
        ├── account.hcl         # Prod account ID, region, etc.
        ├── common-vars.hcl     # Shared prod variables
        ├── app
        │   └── terragrunt.hcl
        └── mysql
            └── terragrunt.hcl
```

## How It Works

1.  **Global Settings**  
    The root `terragrunt.hcl` provides defaults for all modules and environments:
    - Remote state backend configuration
    - Shared providers
    - Pre/post hooks for automation

    > [!important]
    > **Note**
    >
    > Define secure and centralized remote state backends in your root file to maintain state consistency across teams.

2.  **Environment Overrides**  
    Each environment directory (`envs/dev`, `envs/prod`) contains:
    - `account.hcl` for environment-specific parameters (account IDs, AWS region, etc.)
    - `common-vars.hcl` to share variable values among all components

3.  **Component-Specific Configuration**  
    Inside `envs/<environment>/<component>/terragrunt.hcl` you:
    - Include both the root configuration and the environment’s `account.hcl`
    - Reference the corresponding module from `modules/<component>`
    - Override or supplement module inputs as needed

4.  **Shared Variables**  
    Use `common-vars.hcl` to avoid repetition:

    ```
    inputs = {
      project_name = "example"
      tags = {
        owner = "team-infra"
      }
    }
    ```

    > [!important]
    > **Warning**
    >
    > Avoid duplicating variables across component configs. Centralize values in `common-vars.hcl` to prevent drift.

## Benefits

- **Modularity**: Break infrastructure into reusable modules.
- **Clarity**: Isolate environment-specific settings from shared defaults.
- **Scalability**: Easily add new environments or components without refactoring existing code.

## Links and References

- [Terragrunt Documentation](https://terragrunt.gruntwork.io/docs/)
- [Terraform Modules](https://www.terraform.io/language/modules)
- [Terraform Remote State](https://www.terraform.io/language/state/remote)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/52cf8076-030b-430e-9a8b-273697ad3399/lesson/99e9124e-f13b-4227-a093-422b9447bfb9)**
>
> Watch video content
