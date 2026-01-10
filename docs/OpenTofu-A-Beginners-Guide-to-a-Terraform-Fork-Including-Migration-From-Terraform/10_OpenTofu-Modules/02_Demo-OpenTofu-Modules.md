# Demo OpenTofu Modules - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform/OpenTofu-Modules/Demo-OpenTofu-Modules)

---

## Table of Contents

- Demo OpenTofu Modules
  - 1. Inspecting the Module Configuration
  - 2. Supplying the Required Input
  - 3. Initializing and Planning
  - 4. Restricting Resource Creation
  - 5. Summary
  - References
  - Watch Video
  - Practice Lab

---

## Content

OpenTofu: A Beginners Guide to a Terraform Fork Including Migration From Terraform

OpenTofu Modules

# Demo OpenTofu Modules

Welcome to this hands-on lesson on managing OpenTofu modules. You’ll learn how to inspect, configure, and apply a module to create an AWS IAM user.

## 1\. Inspecting the Module Configuration

First, navigate to the project directory and open `main.tf`:

```
cd /root/OpenTofu/projects/Project\ Sapphire
```

```
module "iam_iam-user" {
  source  = "terraform-aws-modules/iam/aws//modules/iam-user"
  version = "5.28.0"
  # insert the 1 required variable here
}
```

Key details:

- A single `module` block named `iam_iam-user`.
- Source: `terraform-aws-modules/iam/aws//modules/iam-user`
- Version: `5.28.0`
- Requires one input: `name` ([registry docs](https://registry.terraform.io/modules/terraform-aws-modules/iam/aws/latest)).

## 2\. Supplying the Required Input

To create an IAM user named **max**, update the block:

```
module "iam_iam-user" {
  source  = "terraform-aws-modules/iam/aws//modules/iam-user"
  version = "5.28.0"
  name    = "max"
}
```

## 3\. Initializing and Planning

Initialize your working directory and generate a plan:

```
openTofu init
openTofu plan
```

You’ll see three resources slated for creation:

```
module.iam_iam-user.aws_iam_access_key.this_no_pgp[0] will be created
module.iam_iam-user.aws_iam_user.this[0] will be created
module.iam_iam-user.aws_iam_user_login_profile.this[0] will be created


Plan: 3 to add, 0 to change, 0 to destroy.
```

The extra resources result from default boolean inputs.

![The image shows a table listing AWS IAM resources and inputs, including their types, defaults, and whether they are required. It also includes a cookie consent notice at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752882877/notes-assets/images/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform-Demo-OpenTofu-Modules/aws-iam-resources-inputs-table.jpg)

> [!important]
> **Note**
>
> By default, the `iam-user` module defines these inputs:
>
> | Variable                                  | Type   | Default | Required |
> | ----------------------------------------- | ------ | ------- | -------- |
> | name                                      | string | —       | yes      |
> | create\\\_iam\\\_access\\\_key            | bool   | true    | no       |
> | create\\\_iam\\\_user\\\_login\\\_profile | bool   | true    | no       |

## 4\. Restricting Resource Creation

To limit the module to only create the IAM user, disable the access key and login profile:

```
module "iam_iam-user" {
  source                        = "terraform-aws-modules/iam/aws//modules/iam-user"
  version                       = "5.28.0"
  name                          = "max"
  create_iam_access_key         = false
  create_iam_user_login_profile = false
}
```

Reinitialize and apply:

```
openTofu init
openTofu apply
```

The new plan shows only the user resource:

```
Plan: 1 to add, 0 to change, 0 to destroy.


module.iam_iam-user.aws_iam_user.this[0]: Creating...
module.iam_iam-user.aws_iam_user.this[0]: Creation complete after 0s [id=max]


Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
```

## 5\. Summary

You have now configured the `iam-user` module to create a single IAM user, controlling exactly which resources are deployed.

## References

- [IAM User Module Documentation](https://registry.terraform.io/modules/terraform-aws-modules/iam/aws/latest)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/d4c286c6-b8ee-47b1-bea3-abcf408b00ed/lesson/b3d60ff8-79d5-4a00-802c-79111cd664ff)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/d4c286c6-b8ee-47b1-bea3-abcf408b00ed/lesson/aeb71e1a-1044-4f39-92c4-24d99715436f)**
>
> Practice lab
