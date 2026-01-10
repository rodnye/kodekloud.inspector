# dependencies Block - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Blocks/dependencies-Block)

---

## Table of Contents

- dependencies Block
  - Key Attribute
  - Usage Scenario
  - Applying with terragrunt run-all
  - Links and References
  - Watch Video

---

## Content

Terragrunt for Beginners

Terragrunt Blocks

# dependencies Block

The `dependencies` block in Terragrunt ensures that modules are applied in a specific order when running commands like `terragrunt run-all`. By listing paths to prerequisite modules, you guarantee that upstream infrastructure is provisioned before downstream modules execute.

## Key Attribute

| Attribute | Type         | Description                                                                     |
| --------- | ------------ | ------------------------------------------------------------------------------- |
| paths     | list(string) | A list of relative paths to modules that must finish before the current module. |

> [!important]
> **Note**
>
> The `dependencies` block only enforces execution order. It does **not** retrieve outputs from those modules. To reference outputs, use the `dependency` block with `config_path` and `outputs`.

![The image is a diagram titled "Dependencies Block" with two icons and descriptions: one for executing a module during run-all, and another for addressing dependencies across infrastructure. At the bottom, there's a "Considerations" label.](https://kodekloud.com/kk-media/image/upload/v1752884302/notes-assets/images/Terragrunt-for-Beginners-dependencies-Block/dependencies-block-diagram-execution-considerations.jpg)

## Usage Scenario

Imagine you have defined VPC and EC2 modules, and you want to add an S3 bucket that should only be provisioned after the EC2 instance. Even though the S3 bucket doesn’t consume any EC2 outputs, you can enforce this order:

![The image illustrates a "Dependencies Block" with a sequence of module apps and an icon representing infrastructure dependencies, highlighting usage scenarios.](https://kodekloud.com/kk-media/image/upload/v1752884302/notes-assets/images/Terragrunt-for-Beginners-dependencies-Block/dependencies-block-module-apps-diagram.jpg)

```
terraform {
  source = "tfr://terraform-aws-modules/s3-bucket/aws//?version=4.1.2"
}


include "root" {
  path   = find_in_parent_folders()
  expose = true
}


include "common" {
  path   = find_in_parent_folders("common.hcl")
  expose = true
}


dependencies {
  paths = ["../ec2"]
}


inputs = {
  bucket = include.common.locals.project
}
```

## Applying with `terragrunt run-all`

From the root configuration directory, run:

```
terragrunt run-all apply
```

This command applies the EC2 module under `../ec2` first, then provisions the S3 bucket, preserving the correct module sequence and preventing race conditions.

## Links and References

- [Terragrunt Documentation](https://terragrunt.gruntwork.io/docs/)
- [Terragrunt CLI: run-all](https://terragrunt.gruntwork.io/docs/reference/cli-options/#run-all)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/bab279d4-de1d-4e8d-8376-ea420c71c9e1/lesson/b1db3990-c5d3-4b16-8d37-18772e878538)**
>
> Watch video content
