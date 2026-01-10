# terraformterragrunt version constraint Attribute - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Attributes/terraformterragrunt-version-constraint-Attribute)

---

## Table of Contents

- terraformterragrunt version constraint Attribute
  - Why Version Constraints?
  - Key Attributes
  - Terraform Version Constraint Example
  - Terragrunt Version Constraint Example
  - Links and References
  - Watch Video

---

## Content

Terragrunt for Beginners

Terragrunt Attributes

# terraformterragrunt version constraint Attribute

In this guide, you’ll learn how to enforce Terraform and Terragrunt version constraints directly within your Terragrunt configuration. By pinning approved versions of the binaries, you’ll avoid unexpected upgrades and ensure consistency across your infrastructure deployments.

![The image illustrates the benefits and considerations of using `terraform_version_constraint` and `terragrunt_version_constraint` attributes, highlighting version limitations and compatibility with setting constraints.](https://kodekloud.com/kk-media/image/upload/v1752884283/notes-assets/images/Terragrunt-for-Beginners-terraformterragrunt-version-constraint-Attribute/terraform-terragrunt-version-constraints-benefits.jpg)

## Why Version Constraints?

Use version constraints to:

- Guarantee compatibility with existing state and modules
- Prevent accidental upgrades during CI/CD runs
- Enforce organizational compliance on approved tool versions

> [!important]
> **Note**
>
> Always review your infrastructure modules and provider versions before updating constraints to avoid breaking changes.

## Key Attributes

| Attribute                           | Purpose                                               | Example                |
| ----------------------------------- | ----------------------------------------------------- | ---------------------- |
| terraform\\\_version\\\_constraint  | Locks the Terraform binary to a specific semver range | `= 1.8.4`              |
| terragrunt\\\_version\\\_constraint | Restricts the Terragrunt binary to a given range      | `> 0.58.0, <= 0.58.11` |

## Terraform Version Constraint Example

Below is a `terragrunt.hcl` snippet that requires Terraform `1.8.4`:

```
terraform {
  source = "tfr://terraform-aws-modules/vpc/aws//?version=5.8.1"
}

include "root" {
  path   = find_in_parent_folders()
  expose = true
}

inputs = {
  name = "KodeKloud-VPC"
  cidr = "10.100.0.0/16"
}

download_dir                 = "../.terragrunt-kodekloud"
prevent_destroy              = false
skip                         = false
iam_role                     = "arn:aws:iam::654654587009:role/terragrunt-role"
terraform_version_constraint = "= 1.8.4"
```

When a non-matching Terraform binary is detected, Terragrunt exits with an error:

```
~/workspace/vpc > terragrunt plan
ERROR[0000] The currently installed version of Terraform (1.9.0) is not compatible with the version Terragrunt requires (= 1.8.4).
ERROR[0000] Unable to determine underlying exit code, so Terragrunt will exit with error code 1
```

To proceed, you can update or comment out the constraint to match your installed version:

```
# terraform_version_constraint = "= 1.8.4"
```

```
~/workspace/vpc > terragrunt plan
aws_vpc.this[0]: Refreshing state... [id=vpc-0d98d39c5a645c65f]
aws_default_security_group.this[0]: Refreshing state... [id=sg-0617b0ec3422dbc5]
No changes. Your infrastructure matches the configuration.
```

## Terragrunt Version Constraint Example

To restrict the Terragrunt binary, add `terragrunt_version_constraint`. The following example allows any version greater than `0.58.0` and up to `0.58.11`:

```
terraform {
  source = "tfr://terraform-aws-modules/vpc/aws//?version=5.8.1"
}

include "root" {
  path   = find_in_parent_folders()
  expose = true
}

inputs = {
  name = "KodeKloud-VPC"
  cidr = "10.100.0.0/16"
}

download_dir                  = "../.terragrunt-kodekloud"
prevent_destroy               = false
skip                          = false
iam_role                      = "arn:aws:iam::654645487009:role/terragrunt-role"
terraform_version_constraint  = "= 1.8.4"
terragrunt_version_constraint = "> 0.58.0, <= 0.58.11"
```

When your local Terragrunt is outside the specified range, all commands will fail:

```
~/workspace/vpc > terragrunt -version
terragrunt version v0.58.12

~/workspace/vpc > terragrunt plan
ERROR[0000] The currently installed version of Terragrunt (0.58.12) is not compatible with the version Terragrunt requires (> 0.58.0, <= 0.58.11).
ERROR[0000] Unable to determine underlying exit code, so Terragrunt will exit with error code 1
```

> [!important]
> **Warning**
>
> Locking to very specific versions can block legitimate upgrades. Plan your version bumps carefully and test in a staging environment.

## Links and References

- [Terraform Version Constraints](https://www.terraform.io/docs/language/expressions/version-constraints.html)
- [Terragrunt Configuration Reference](https://terragrunt.gruntwork.io/docs/reference/config-blocks/)
- [Terraform AWS VPC Module](https://registry.terraform.io/modules/terraform-aws-modules/vpc/aws)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/1a2a45b4-e7d1-4af2-a897-7ebf83a4350e/lesson/990b6330-6327-4a96-8994-f8f26bce751b)**
>
> Watch video content
