# terraform binary Attribute - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Attributes/terraform-binary-Attribute)

---

## Table of Contents

- terraform binary Attribute
  - Why Override the Terraform Binary?
  - Default Behavior (No terraform_binary)
  - Overriding with terraform_binary
  - Best Practices
  - Links and References
  - Watch Video

---

## Content

Terragrunt for Beginners

Terragrunt Attributes

# terraform binary Attribute

Terragrunt’s `terraform_binary` attribute enables you to specify a custom Terraform executable instead of relying on the system default. By pointing Terragrunt to a specific binary—either by name or full path—you can maintain consistent Terraform versions across multiple environments, projects, and CI/CD pipelines.

> [!important]
> **Note**
>
> Before you begin, verify that the path to your custom Terraform binary is correct and that the file has execute permissions.
> You can check permissions with `ls -l /path/to/terraform`.

## Why Override the Terraform Binary?

| Benefit               | Description                                                                             | Example Use Case                                      |
| --------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| Version Control       | Lock Terragrunt to a precise Terraform release without altering your system default.    | Enforce Terraform v1.8.4 for production modules.      |
| Custom Builds         | Test unreleased, beta, or locally compiled Terraform versions.                          | Run Terraform v1.9.0-beta during feature development. |
| Environment Isolation | Standardize the Terraform executable across developers, CI servers, and remote runners. | Eliminate “works on my machine” version drift issues. |

For more on Terragrunt, see the [official documentation](https://terragrunt.gruntwork.io/docs/).

---

## Default Behavior (No `terraform_binary`)

When you omit `terraform_binary`, Terragrunt uses the Terraform executable found in your system `PATH`. Here’s a sample Terragrunt configuration without the override:

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


download_dir    = "../.terragrunt-kodekloud"
prevent_destroy = false
skip            = false
iam_role        = "arn:aws:iam::6546454587009:role/terragrunt-role"
```

Run `terragrunt version` to confirm which Terraform version is used:

```
~/workspace/vpc $ terragrunt version
Terraform v1.8.4
on linux_amd64
+ provider registry.terraform.io/hashicorp/aws v5.52.0


took 875ms
```

---

## Overriding with `terraform_binary`

Imagine you’ve placed a beta build of Terraform (`v1.9.0-beta`) into your parent Terragrunt directory:

```
~/workspace $ ls -1
terraform-v1.9.0-beta
vpc/
```

To force Terragrunt to use this specific executable, add the `terraform_binary` attribute:

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


download_dir     = "../.terragrunt-kodekloud"
prevent_destroy  = false
skip             = false
iam_role         = "arn:aws:iam::6546454587009:role/terragrunt-role"
terraform_binary = "${get_parent_terragrunt_dir()}/terraform-v1.9.0-beta"
```

Now check the Terragrunt version again:

```
~/workspace/vpc $ terragrunt version
Terraform v1.9.0-beta
on linux_amd64
+ provider registry.terraform.io/hashicorp/aws v5.52.0


took 875ms
```

Terragrunt will use Terraform **v1.9.0-beta** instead of the default in your `PATH`.

> [!important]
> **Warning**
>
> If the specified binary is not found or not executable, Terragrunt will fail to initialize. Always include the correct path and ensure execution rights.

---

## Best Practices

- Pin Terraform versions per project to minimize drift.
- Store custom or beta executables in a consistent directory structure.
- Use `${get_parent_terragrunt_dir()}` or absolute paths to avoid ambiguity.
- Incorporate version checks in your CI/CD pipelines to catch mismatches early.

---

## Links and References

- [Terragrunt Documentation](https://terragrunt.gruntwork.io/docs/)
- [Terraform CLI](https://www.terraform.io/docs/cli)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/1a2a45b4-e7d1-4af2-a897-7ebf83a4350e/lesson/4980c20c-508c-44f3-9890-a0527e0296c8)**
>
> Watch video content
