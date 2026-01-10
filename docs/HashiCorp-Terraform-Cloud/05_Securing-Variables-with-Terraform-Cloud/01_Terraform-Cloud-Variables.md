# Terraform Cloud Variables - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Terraform-Cloud/Securing-Variables-with-Terraform-Cloud/Terraform-Cloud-Variables)

---

## Table of Contents

- Terraform Cloud Variables
  - Workspace Variables vs. Organization Variable Sets
  - Input Variables vs. Environment Variables
  - Setting Variables Locally
  - Variable Precedence
  - Best Practices & Recommendations
  - Links and References
  - Watch Video
  - Practice Lab
    - Workspace Variables
    - Organization Variable Sets

---

## Content

HashiCorp : Terraform Cloud

Securing Variables with Terraform Cloud

# Terraform Cloud Variables

Terraform variables in HashiCorp Configuration Language (HCL) let you parameterize your infrastructure code without changing module source files. By centralizing values in Terraform Cloud workspaces, you can:

- Keep secrets out of version control
- Reuse the same configurations across environments
- Simplify CI/CD with remote execution

> [!important]
> **Warning**
>
> Never commit sensitive data (API keys, credentials, or tokens) directly in your `.tf` files. Always mark secrets as _Sensitive_ in Terraform Cloud.

## Workspace Variables vs. Organization Variable Sets

Terraform Cloud offers two scopes for storing variable values:

| Variable Scope             | Defined At         | Sensitivity Support | Applies To          | Typical Use Case              |
| -------------------------- | ------------------ | ------------------- | ------------------- | ----------------------------- |
| Workspace Variables        | Single workspace   | Yes                 | One workspace only  | AWS credentials, DB passwords |
| Organization Variable Sets | Organization level | Yes                 | Multiple workspaces | Shared cloud provider tokens  |

![The image is a slide titled "Setting Workspace Variables" with bullet points explaining how variables can be set per workspace, reused, and applied across workspaces. It includes the HashiCorp Terraform Cloud logo and cartoon characters at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752878792/notes-assets/images/HashiCorp-Terraform-Cloud-Terraform-Cloud-Variables/setting-workspace-variables-bullet-points.jpg)

### Workspace Variables

- Scoped to an individual workspace.
- Can be flagged **Sensitive** to hide in UI, CLI output, and logs.
- Ideal for per-environment secrets like `aws_access_key_id`.

### Organization Variable Sets

- Defined at the organization level for reuse.
- Supports both Terraform input variables and environment variables.
- Workspaces must opt in to inherit the set.
- Perfect for credentials or settings shared by multiple projects.

## Input Variables vs. Environment Variables

Terraform Cloud recognizes two types of variables:

| Variable Type            | Reference in HCL | Common Examples                              |
| ------------------------ | ---------------- | -------------------------------------------- |
| Terraform Input Variable | `var.<name>`     | `var.subscription_id`, `var.db_connection`   |
| Environment Variable     | `<NAME>` env var | `AWS_ACCESS_KEY_ID`, `TF_LOG`, `GOOGLE_CRED` |

All variables can be marked **Sensitive** to prevent exposure in logs or the web UI. Terraform also supports HCL types like `string`, `number`, `list`, and `map`.

## Setting Variables Locally

Even with remote execution, you can still supply values from your workstation:

```
# Single variable
terraform plan -var="name=value"

# Load from a file
terraform apply -var-file="env.prod.tfvars"

# Export as environment variable
export TF_VAR_region=us-west-2
terraform apply
```

Terraform 0.10.0+ automatically loads any `*.auto.tfvars` in your working directory:

```
# Rename your terraform.tfvars
mv terraform.tfvars terraform.auto.tfvars
```

> [!important]
> **Note**
>
> Using `terraform.auto.tfvars` lets you track non-sensitive defaults in Git while still overriding them via the CLI or workspace UI.

![The image provides information on setting non-sensitive variables in Terraform using `auto.tfvars` files, and mentions that workspaces using Terraform v0.10.0 or later can load default values from these files. It also suggests using the Terraform Cloud Provider or variables API for adding multiple variables.](https://kodekloud.com/kk-media/image/upload/v1752878793/notes-assets/images/HashiCorp-Terraform-Cloud-Terraform-Cloud-Variables/terraform-auto-tfvars-variables-guide.jpg)

## Variable Precedence

When a variable exists in multiple locations, Terraform applies values based on this hierarchy (highest → lowest):

1.  **CLI** flags (`-var` or `-var-file`)
2.  **Workspace** UI variables
3.  **Organization** Variable Sets
4.  **Auto-loaded** `*.auto.tfvars` files

Command-line inputs override workspace settings, which override organizational sets, which in turn override `auto.tfvars` defaults.

![The image illustrates the order of precedence for Terraform Cloud, listing local values, files ending with *.auto.tfvars, workspace-specific values, and variable sets, with a visual hierarchy on the right.](https://kodekloud.com/kk-media/image/upload/v1752878794/notes-assets/images/HashiCorp-Terraform-Cloud-Terraform-Cloud-Variables/terraform-cloud-precedence-order-diagram.jpg)

![The image illustrates the order of precedence for variable settings, showing a hierarchy from command line variables to global variables, with a visual flowchart and priority indicators.](https://kodekloud.com/kk-media/image/upload/v1752878795/notes-assets/images/HashiCorp-Terraform-Cloud-Terraform-Cloud-Variables/variable-precedence-flowchart-hierarchy.jpg)

For more details, see the [Terraform Cloud Variable Precedence documentation](https://www.terraform.io/cloud-docs/workspaces/variables#variable-precedence).

## Best Practices & Recommendations

- Store **non-sensitive** defaults in `*.auto.tfvars` files and commit them to Git.
- Keep **sensitive** values in Terraform Cloud—either at the workspace level or via Organization Variable Sets.
- Regularly rotate credentials and audit workspace variable access.

![The image provides recommendations for using Terraform Cloud, advising to use `.auto.tfvars` files for non-sensitive variables and to set sensitive variables in the Workspace's Variables section. It includes the Terraform Cloud logo and cartoon characters at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752878796/notes-assets/images/HashiCorp-Terraform-Cloud-Terraform-Cloud-Variables/terraform-cloud-recommendations-auto-tfvars.jpg)

## Links and References

- [Terraform Cloud Variables Guide](https://www.terraform.io/cloud-docs/workspaces/variables)
- [Terraform Input Variables](https://www.terraform.io/language/values/variables)
- [Terraform CLI Docs](https://www.terraform.io/cli)
- [HashiCorp Configuration Language (HCL)](https://www.terraform.io/language)
- [Terraform Cloud Best Practices](https://www.terraform.io/cloud-docs)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-terraform-cloud/module/253ba638-af3c-4403-a517-a7f6f7c7594c/lesson/da8bca14-1731-468e-b5fe-5e115c84be3f)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/hashicorp-terraform-cloud/module/253ba638-af3c-4403-a517-a7f6f7c7594c/lesson/e2714b1d-22d1-4d62-9da8-70f80c20fa5a)**
>
> Practice lab
