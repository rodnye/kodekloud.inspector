# Supporting Files accountregionenvcommon - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Configuration/Supporting-Files-accountregionenvcommon)

---

## Table of Contents

- Supporting Files accountregionenvcommon
  - Core Supporting Files
  - Example Configurations
  - Benefits of Supporting Files
  - References
  - Watch Video

---

## Content

Terragrunt for Beginners

Terragrunt Configuration

# Supporting Files accountregionenvcommon

Terragrunt supporting files let you centralize environment-specific and global settings, promoting consistency and reusability across Terraform configurations. By defining variables in dedicated HCL or YAML files, you tailor deployments to specific accounts, regions, and environments without duplication.

## Core Supporting Files

| File        | Purpose                                        | Typical Contents                            |
| ----------- | ---------------------------------------------- | ------------------------------------------- |
| account.hcl | Account-specific details                       | `account_id`, `account_name`                |
| region.hcl  | Region-specific parameters                     | AWS regions like `us-east-1`, geolocation   |
| env.hcl     | Environment-specific values                    | `project_name`, tag conventions, parameters |
| common.hcl  | Global defaults shared across all environments | Company tags, naming conventions            |

> [!important]
> **Note**
>
> Supporting files can be written in HCL or YAML. Use HCL for native Terraform/Terragrunt integration, or YAML if you prefer readability and tooling compatibility.

![The image shows a diagram of supporting files with four categories: account.hcl, region.hcl, env.hcl, and common.hcl, each associated with specific information like account ID, region, project details, and global tags.](https://kodekloud.com/kk-media/image/upload/v1752884344/notes-assets/images/Terragrunt-for-Beginners-Supporting-Files-accountregionenvcommon/supporting-files-diagram-account-region-env-common.jpg)

Place these files alongside your Terraform modules:

```
live
├── account.hcl
├── region.hcl
├── env.hcl
├── common.hcl
└── modules
    └── app
        └── terragrunt.hcl
```

## Example Configurations

```
# example-account.hcl
locals {
  account_id   = "123456789012"
  account_name = "production-account"
}
```

```
# example-common.yaml
globals:
  company_name: "AcmeCorp"
  tags:
    - "owner:infra"
    - "compliance:internal"
```

## Benefits of Supporting Files

- **Reusability**: Import shared settings across multiple modules and environments.
- **Maintainability**: Update a value in one file and have it propagate everywhere.
- **Consistency**: Enforce standard tagging, naming conventions, and defaults.

> [!important]
> **Warning**
>
> Avoid committing sensitive data (like credentials or secrets) directly in these files. Use tools like [Vault](https://www.vaultproject.io/) or encrypt secrets with `sops`.

## References

- [Terragrunt Documentation](https://terragrunt.gruntwork.io/docs/)
- [Terraform Input Variables](https://developer.hashicorp.com/terraform/language/values/variables)
- [YAML vs. HCL Comparison](https://www.terraform.io/language/syntax/configuration)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/52cf8076-030b-430e-9a8b-273697ad3399/lesson/81a5a81a-bb12-46cb-b72b-e1f93f3aee90)**
>
> Watch video content
