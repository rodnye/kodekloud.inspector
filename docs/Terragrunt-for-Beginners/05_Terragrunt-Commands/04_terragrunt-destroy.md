# terragrunt destroy - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Commands/terragrunt-destroy)

---

## Table of Contents

- terragrunt destroy
  - Purpose
  - Workflow
  - Under the Hood
  - Confirmation Prompt
  - Parallel Execution
  - Best Practices
  - Example: Destroying an AWS VPC
  - Links and References
  - Watch Video

---

## Content

Terragrunt for Beginners

Terragrunt Commands

# terragrunt destroy

The `terragrunt destroy` command is your go-to solution for safely deprovisioning Terraform-managed infrastructure. By invoking this command, you can prevent unnecessary cloud costs, enforce clean-ups, and maintain consistent environments across your configurations.

## Purpose

![The image is a diagram titled "Terragrunt destroy," showing a central icon connected to two concepts: "Destruction or Resources" and "Safely removes infrastructure," with the word "Purpose" below.](https://kodekloud.com/kk-media/image/upload/v1752884317/notes-assets/images/Terragrunt-for-Beginners-terragrunt-destroy/terragrunt-destroy-diagram-infrastructure-purpose.jpg)

Use `terragrunt destroy` when you need to remove resources provisioned by Terraform. It wraps Terraform’s native `terraform destroy`, extending it with Terragrunt’s configuration hierarchy and remote state management.

## Workflow

![The image is a workflow diagram for "Terragrunt destroy," showing steps like "Run after deployed and tested," "Deprovision resources," and "Release associated resources." It includes icons and a gradient "Workflow" label at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752884319/notes-assets/images/Terragrunt-for-Beginners-terragrunt-destroy/terragrunt-destroy-workflow-diagram.jpg)

A typical `terragrunt destroy` workflow involves:

1.  Deploying and validating infrastructure
2.  Executing the destroy command
3.  Deprovisioning resources
4.  Cleaning up state files and remote backends

## Under the Hood

![The image illustrates the process of "Terragrunt destroy," showing steps from initiating the command to actual resource destruction and its application across a hierarchy, with integration with Terraform.](https://kodekloud.com/kk-media/image/upload/v1752884320/notes-assets/images/Terragrunt-for-Beginners-terragrunt-destroy/terragrunt-destroy-process-illustration.jpg)

When executed, Terragrunt traverses your configuration hierarchy, initializes each module, and delegates destruction to Terraform. This ensures consistent cleanup across all modules, environments, and remote states.

## Confirmation Prompt

![The image is about a "Terragrunt destroy" confirmation prompt, highlighting a feature that prompts users to avoid accidental deletions. It includes a speech bubble asking "Confirm deletion?" and a label "Confirmation Prompt."](https://kodekloud.com/kk-media/image/upload/v1752884321/notes-assets/images/Terragrunt-for-Beginners-terragrunt-destroy/terragrunt-destroy-confirmation-prompt.jpg)

Before any infrastructure is torn down, Terragrunt prompts you to confirm the destruction plan.

> [!important]
> **Warning**
>
> Always review the plan output before typing `yes`. Running `terragrunt destroy` is irreversible and may lead to data loss.

## Parallel Execution

![The image illustrates a process flow for "Terragrunt destroy" with a central icon connected to two puzzle piece icons, labeled "Parallel Execution."](https://kodekloud.com/kk-media/image/upload/v1752884322/notes-assets/images/Terragrunt-for-Beginners-terragrunt-destroy/terragrunt-destroy-process-flow-diagram.jpg)

Terragrunt can execute destroy operations in parallel across modules, drastically reducing total cleanup time for large, modular repositories.

## Best Practices

| Environment            | Recommendation                                        |
| ---------------------- | ----------------------------------------------------- |
| Non-production         | Schedule regular `terragrunt destroy` to reduce cost. |
| Development & Staging  | Automate cleanup in CI/CD pipelines after testing.    |
| Production & Always-on | Avoid destructive commands; use targeted destroys.    |

- Always run `terragrunt plan` before `terragrunt destroy`.
- Lock remote state backends to prevent concurrent modifications.
- Use `--terragrunt-non-interactive` in automated workflows.

## Example: Destroying an AWS VPC

Below is a sample Terragrunt configuration that references an AWS VPC module. We’ll destroy the VPC and its associated resources:

```
terraform {
  source = "tfr://terraform-aws-modules/vpc/aws/?version=5.8.1"
}


inputs = {
  name                          = "KodeKloud-VPC"
  vpc_cidr_block                = "10.0.0.0/16"
  vpc_enable_dns_hostnames      = true
  vpc_enable_dns_support        = true
  vpc_instance_tenancy          = "default"
  vpc_flow_log_destination_type = "cloud-watch-logs"


  # Identifiers for existing resources to be destroyed
  vpc_id                  = "vpc-03218326bbd74f45c"
  vpc_arn                 = "arn:aws:ec2:us-east-1:654654587809:vpc/vpc-03218326bbd74f45c"
  vpc_main_route_table_id = "rtb-0f620361b604057a9"
  vpc_owner_id            = "654654587809"


  # Empty lists ensure Terraform will remove these associations
  private_route_table_ids     = []
  public_subnets              = []
  private_subnets_cidr_blocks = tolist([])
  public_subnets_cidr_blocks  = tolist([])
}
```

Run the destroy command in your VPC module directory:

```
cd path/to/vpc
terragrunt destroy
```

Inspect the plan to confirm the intended resources are queued for removal:

```
Plan: 0 to add, 0 to change, 4 to destroy.


Changes to Outputs:
  - azs                           = "null" -> null
  - default_route_table_id        = "acl-00cf3b95846d6be5" -> null
  - cgw_arns                      = [] -> null
  - cgw_ids                       = [] -> null
  # (additional output removals)
```

Type `yes` when prompted to proceed. Terragrunt will then deprovision the VPC and all related resources.

## Links and References

- [Terragrunt Documentation](https://terragrunt.gruntwork.io/)
- [Terraform destroy Command](https://www.terraform.io/cli/commands/destroy)
- [Terraform State Locking](https://www.terraform.io/language/state/locking)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/e42961fc-4288-4cc2-8db8-3882b884c0b1/lesson/14b33f11-81fd-49f8-9004-2dce0bd76262)**
>
> Watch video content
