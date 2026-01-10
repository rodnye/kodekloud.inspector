# terragrunt apply - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Commands/terragrunt-apply)

---

## Table of Contents

- terragrunt apply
  - Why Run terragrunt apply?
  - Best Practices
  - Quick Reference: Common terragrunt apply Flags
  - Applying Your VPC Module
  - Links and References
  - Watch Video

---

## Content

Terragrunt for Beginners

Terragrunt Commands

# terragrunt apply

In this lesson, we’ll dive into the `terragrunt apply` command—your gateway to automating infrastructure changes with Terragrunt and Terraform. After reviewing changes with `terragrunt plan`, `terragrunt apply` executes the approved plan, provisioning or updating resources across one or multiple modules.

![The image is a diagram explaining the purpose of "Terragrunt apply," showing it initiates the application of configuration and enables users to implement changes.](https://kodekloud.com/kk-media/image/upload/v1752884314/notes-assets/images/Terragrunt-for-Beginners-terragrunt-apply/terragrunt-apply-configuration-diagram.jpg)

## Why Run terragrunt apply?

Always execute `terragrunt apply` after confirming the plan from `terragrunt plan`. This two-step approach ensures you understand potential changes before they impact your infrastructure.

![The image is a diagram titled "Terragrunt apply," showing a workflow with icons and text describing steps for executing and deploying changes safely.](https://kodekloud.com/kk-media/image/upload/v1752884315/notes-assets/images/Terragrunt-for-Beginners-terragrunt-apply/terragrunt-apply-workflow-diagram.jpg)

> [!important]
> **Note**
>
> Under the hood, Terragrunt invokes Terraform’s [terraform apply](https://developer.hashicorp.com/terraform/cli/commands/apply) command and manages shared configuration across modules for you.

![The image is an infographic about "Terragrunt apply," highlighting its ability to perform across multiple modules and enhance deployment speed, with a focus on parallel execution.](https://kodekloud.com/kk-media/image/upload/v1752884316/notes-assets/images/Terragrunt-for-Beginners-terragrunt-apply/terragrunt-apply-multiple-modules-infographic.jpg)

> [!important]
> **Note**
>
> By default, Terragrunt will execute modules in parallel, vastly reducing deployment time in large, modular repositories.

![The image provides best practices for using Terragrunt, emphasizing reviewing planned changes and seeking approval before applying them. It includes icons and a "Best Practices" label at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752884316/notes-assets/images/Terragrunt-for-Beginners-terragrunt-apply/terragrunt-best-practices-review-approval.jpg)

## Best Practices

- **Review the Plan**: Always inspect the execution plan to catch unintended changes.
- **Get Stakeholder Approval**: Ensure team members sign off on modifications.
- **Use Version Constraints**: Pin module and provider versions for reproducibility.

## Quick Reference: Common terragrunt apply Flags

| Flag                                         | Description                                     | Example                                                       |
| -------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------- |
| \\--auto-approve                             | Skip interactive confirmation                   | `terragrunt apply --auto-approve`                             |
| \\--target                                   | Restrict apply to a specific module or resource | `terragrunt apply --target=module.vpc`                        |
| \\--terragrunt-include-external-dependencies | Include external dependencies in apply run      | `terragrunt apply --terragrunt-include-external-dependencies` |

## Applying Your VPC Module

We’ve already approved the execution plan for our VPC module. Below is the Terragrunt configuration and the commands to apply it:

```
terraform {
  source = "tfr://terraform-aws-modules/vpc/aws//?version=5.8.1"
}


inputs = {
  name = "KodeKloud-VPC"
}
```

Run:

```
$ terragrunt apply
```

Terragrunt will re-display the plan. After confirming the details, type `yes`:

```
Do you want to perform these actions?
Terraform will perform the actions described above.
Only 'yes' will be accepted to approve.


Enter a value: yes
```

Upon completion, you’ll see:

```
Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
```

Terragrunt then prints the resulting outputs:

```
private_nat_gateway_route_ids           = []
private_route_table_association_ids     = []
private_route_table_ids                 = []
private_subnet_arns                     = []
private_subnets                         = []
public_route_table_ids                  = []
public_subnets                          = []
vpc_arn                                 = "arn:aws:ec2:us-east-1:654654587809:vpc/vpc-03218326bbd74f4c"
vpc_cidr_block                          = "10.0.0.0/16"
vpc_enable_dns_hostnames                = true
vpc_id                                  = "vpc-03218326bbd74f4c"
vpc_owner_id                            = "654654587809"
```

## Links and References

- [Terragrunt GitHub Repository](https://github.com/gruntwork-io/terragrunt)
- [Terraform apply Command](https://developer.hashicorp.com/terraform/cli/commands/apply)
- [Terraform AWS VPC Module](https://registry.terraform.io/modules/terraform-aws-modules/vpc/aws/latest)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/e42961fc-4288-4cc2-8db8-3882b884c0b1/lesson/f9e2d2b0-c791-4ca5-ae3b-a417bc9684b6)**
>
> Watch video content
