# terragrunt plan - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Commands/terragrunt-plan)

---

## Table of Contents

- terragrunt plan
  - Key Features of Terragrunt Plan
  - Best Practices for terragrunt plan
  - Example: Planning an AWS VPC Module
  - Links and References
  - Watch Video
    - Parallel Planning Across Modules

---

## Content

Terragrunt for Beginners

Terragrunt Commands

# terragrunt plan

`terragrunt plan` produces a detailed execution plan that shows exactly which resources Terraform will create, update, or destroy. Reviewing this plan before applying changes helps you:

- Validate the intended modifications
- Catch configuration errors early
- Ensure alignment with stakeholder requirements

Terragrunt enhances Terraform’s native `plan` command by recursively applying it across your entire configuration hierarchy. This provides a unified, end-to-end view of changes across all modules.

> [!important]
> **Note**
>
> Terragrunt delegates to [`terraform plan`](https://www.terraform.io/cli/plan) under the hood, orchestrating plans across multiple modules and directories.

![The image illustrates a Terragrunt plan process, showing how it generates an execution plan and applies it across a configuration hierarchy, with integration with Terraform.](https://kodekloud.com/kk-media/image/upload/v1752884333/notes-assets/images/Terragrunt-for-Beginners-terragrunt-plan/terragrunt-plan-process-terraform-diagram.jpg)

## Key Features of Terragrunt Plan

| Feature               | Description                                             | Benefit                                         |
| --------------------- | ------------------------------------------------------- | ----------------------------------------------- |
| Hierarchical Planning | Executes `terraform plan` across all Terragrunt modules | Consistent visibility across environments       |
| Parallel Execution    | Plans multiple modules concurrently                     | Significant reduction in planning time          |
| Execution Summaries   | Aggregates and summarizes results from each module      | Quick, consolidated view of all pending changes |

### Parallel Planning Across Modules

In a modular project structure, `terragrunt plan` can run in parallel, speeding up the planning phase by generating multiple execution plans simultaneously.

![The image illustrates a "Terragrunt plan" with a central icon connected to two puzzle piece icons, representing parallel execution.](https://kodekloud.com/kk-media/image/upload/v1752884334/notes-assets/images/Terragrunt-for-Beginners-terragrunt-plan/terragrunt-plan-parallel-execution-diagram.jpg)

## Best Practices for `terragrunt plan`

- Always **review** the complete execution plan before applying changes.
- **Seek approval** from relevant stakeholders to prevent unintended infrastructure modifications.
- Use version control to track and audit plan outputs.

![The image is a slide titled "Terragrunt plan" with icons and text for "Review plan" and "Seek approval," along with a "Best Practices" button.](https://kodekloud.com/kk-media/image/upload/v1752884334/notes-assets/images/Terragrunt-for-Beginners-terragrunt-plan/terragrunt-plan-review-approval-best-practices.jpg)

> [!important]
> **Warning**
>
> Never run `terragrunt apply` without first validating the execution plan. Unreviewed plans can lead to unexpected downtime or resource drift.

## Example: Planning an AWS VPC Module

Below is a sample Terragrunt configuration that references the official Terraform AWS VPC module. Adjust the `name` input to fit your naming conventions:

```
terraform {
  source = "tfr://terraform-aws-modules/vpc/aws//?version=5.8.1"
}

inputs = {
  name = "KodeKloud-VPC"
}
```

To generate the plan, simply run:

```
$ terragrunt plan
```

After Terragrunt prepares the consolidated configuration, you’ll see an execution plan similar to this:

```
# aws_vpc.this[0] will be created
resource "aws_vpc" "this" {
  + arn                                  = (known after apply)
  + cidr_block                           = "10.0.0.0/16"
  + default_network_acl_id               = (known after apply)
  + default_route_table_id               = (known after apply)
  + default_security_group_id            = (known after apply)
  + dhcp_options_id                      = (known after apply)
  + enable_dns_hostnames                 = true
  + enable_dns_support                   = true
  + enable_network_address_usage_metrics = (known after apply)
  + id                                   = (known after apply)
  + instance_tenancy                     = "default"
  + owner_id                             = (known after apply)
  + tags                                 = {
      + "Name" = "KodeKloud-VPC"
    }
  + tags_all                             = {
      + "Name" = "KodeKloud-VPC"
    }
}

Plan: 4 to add, 0 to change, 0 to destroy.

Changes to Outputs:
  + azs                                  = []
  + cgw_arns                             = []
  + cgw_ids                              = []
  + database_nat_gateway_route_ids       = []
  + database_route_table_association_ids = []
  + database_route_table_ids             = []
  + database_subnet_arns                 = []
  + database_subnets_cidr_blocks         = []
```

Always inspect the plan output to confirm that resource additions and deletions match your expectations before proceeding to `terragrunt apply`.

## Links and References

- [Terragrunt Documentation](https://terragrunt.gruntwork.io/docs/)
- [Terraform CLI: plan](https://www.terraform.io/cli/plan)
- [Terraform AWS VPC Module](https://registry.terraform.io/modules/terraform-aws-modules/vpc/aws)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/e42961fc-4288-4cc2-8db8-3882b884c0b1/lesson/570bbde7-cba7-4868-ad01-2c24e82e6e7f)**
>
> Watch video content
