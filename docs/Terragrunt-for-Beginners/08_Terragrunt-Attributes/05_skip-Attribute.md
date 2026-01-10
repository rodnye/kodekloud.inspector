# skip Attribute - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Attributes/skip-Attribute)

---

## Table of Contents

- skip Attribute
  - Why Use the skip Attribute?
  - Key Considerations
  - skip Attribute Options
  - Example: Skipping a VPC Module
  - Enabling the Module
  - Watch Video

---

## Content

Terragrunt for Beginners

Terragrunt Attributes

# skip Attribute

In this lesson, we explore the `skip` attribute in Terragrunt: a powerful boolean flag that controls whether a specific module runs Terraform commands. By leveraging `skip`, you can conditionally bypass `apply`, `destroy`, and other operations—ideal for tailoring complex infrastructure workflows.

## Why Use the skip Attribute?

- Customize multi-module deployments without removing configuration
- Temporarily disable modules under development or testing
- Avoid unintentional changes in non-critical environments

![The image shows a diagram with connected nodes and a flag, symbolizing a customized workflow. It includes the text "Customizes workflow" and a button labeled "Benefits."](https://kodekloud.com/kk-media/image/upload/v1752884280/notes-assets/images/Terragrunt-for-Beginners-skip-Attribute/customized-workflow-diagram-nodes-flag.jpg)

> [!important]
> **Note**
>
> Use the `skip` flag to control module execution dynamically, ensuring only ready and tested modules are deployed.

## Key Considerations

- Skipping critical modules can lead to incomplete infrastructure
- Ensure dependencies are met before disabling a module

![The image features a diagram with three stacked rectangles connected by arrows, accompanied by the text "Use it judiciously" and a button labeled "Considerations."](https://kodekloud.com/kk-media/image/upload/v1752884282/notes-assets/images/Terragrunt-for-Beginners-skip-Attribute/stacked-rectangles-diagram-use-it-judiciously.jpg)

> [!important]
> **Warning**
>
> Never set `skip = true` on production-critical modules. Always verify dependencies to prevent configuration drift.

## skip Attribute Options

| skip Value | Description                              |
| ---------- | ---------------------------------------- |
| true       | Bypasses Terraform actions on the module |
| false      | Executes Terraform actions normally      |

## Example: Skipping a VPC Module

Imagine you have a VPC module under development. To prevent Terraform from applying it, add `skip = true` in your `terragrunt.hcl`:

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
skip             = true
```

Running `terragrunt apply`:

```
~/workspace/vpc $ terragrunt apply
INFO[0000] Skipping terragrunt module /config/workspace/vpc/terragrunt.hcl due to skip = true.
~/workspace/vpc $
```

Terragrunt detects `skip = true` and leaves the VPC unchanged.

## Enabling the Module

When you're ready to deploy, set `skip` to `false` or remove it:

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
```

Then run:

```
~/workspace/vpc $ terragrunt apply
...
Are you sure you want to perform these actions?
  Terraform will perform the actions described above.
  Only 'yes' will be accepted to approve.

  Enter a value: yes
...
Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
```

With `skip` disabled, Terragrunt proceeds to create the VPC as expected.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/1a2a45b4-e7d1-4af2-a897-7ebf83a4350e/lesson/f97eff28-1b1d-4f57-be1f-c13661616822)**
>
> Watch video content
