# terragrunt run all - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Commands/terragrunt-run-all)

---

## Table of Contents

- terragrunt run all
  - Key Features
  - Common Use Cases
  - Best Practices
  - Example: Applying Multiple VPC Modules
  - References
  - Watch Video

---

## Content

Terragrunt for Beginners

Terragrunt Commands

# terragrunt run all

The `terragrunt run-all` command lets you perform bulk Terraform operations—such as `init`, `plan`, `apply`, and `destroy`—across every module in your project. By automating multi-module workflows, it reduces manual effort and ensures consistency in large-scale Terraform deployments.

![The image is an infographic about "Terragrunt run-all," highlighting its support for Terragrunt commands like init, plan, apply, and destroy, and its capability for bulk execution.](https://kodekloud.com/kk-media/image/upload/v1752884336/notes-assets/images/Terragrunt-for-Beginners-terragrunt-run-all/terragrunt-run-all-infographic-commands.jpg)

## Key Features

| Feature               | Description                                              |
| --------------------- | -------------------------------------------------------- |
| Bulk Commands         | Run `init`, `plan`, `apply`, or `destroy` on all modules |
| Workflow Streamlining | Standardize operations and eliminate repetitive steps    |
| Parallel Execution    | Execute commands concurrently to speed up large projects |

![The image illustrates the concept of "Terragrunt run-all" with colorful puzzle piece icons and emphasizes workflow streamlining by reducing manual command execution.](https://kodekloud.com/kk-media/image/upload/v1752884337/notes-assets/images/Terragrunt-for-Beginners-terragrunt-run-all/terragrunt-run-all-puzzle-workflow.jpg)

![The image illustrates the concept of "Terragrunt run-all" with icons representing parallel execution of tasks. It features colorful puzzle piece icons and a label indicating "Parallel Execution."](https://kodekloud.com/kk-media/image/upload/v1752884338/notes-assets/images/Terragrunt-for-Beginners-terragrunt-run-all/terragrunt-run-all-parallel-execution.jpg)

## Common Use Cases

- Apply changes across all modules with a single command
- Destroy resources uniformly in every module
- Automate routine Terraform tasks in CI/CD pipelines

![The image is a presentation slide about "Terragrunt run-all," highlighting benefits such as performing the same operations across modules and saving time and effort. It includes icons and a "Use Cases" button.](https://kodekloud.com/kk-media/image/upload/v1752884340/notes-assets/images/Terragrunt-for-Beginners-terragrunt-run-all/terragrunt-run-all-benefits-presentation.jpg)

## Best Practices

- Review your Terraform plans before applying changes.
- Use targeted execution (`--terragrunt-include-dir` / `--terragrunt-exclude-dir`) to scope large projects.
- Remember that `run-all apply` and `run-all destroy` add `--auto-approve` by default.

> [!important]
> **Warning**
>
> When running `terragrunt run-all apply` or `terragrunt run-all destroy`, Terragrunt automatically appends `--auto-approve`. Ensure you understand the full impact before executing these commands.

![The image is an infographic about "Terragrunt run-all," highlighting its use for consistent and automated operations and its ability to reduce human error, with a "Best Practices" label.](https://kodekloud.com/kk-media/image/upload/v1752884341/notes-assets/images/Terragrunt-for-Beginners-terragrunt-run-all/terragrunt-run-all-infographic-best-practices.jpg)

---

## Example: Applying Multiple VPC Modules

Assume you have two directories—`vpc-1` and `vpc-2`—each containing a `terragrunt.hcl` that sources the AWS VPC module:

```
# vpc-1/terragrunt.hcl
terraform {
  source = "tfr://terraform-aws-modules/vpc/aws//?version=5.8.1"
}

inputs = {
  name = "KodeKloud-VPC-1"
}
```

```
# vpc-2/terragrunt.hcl
terraform {
  source = "tfr://terraform-aws-modules/vpc/aws//?version=5.8.1"
}

inputs = {
  name = "KodeKloud-VPC-2"
}
```

From the parent directory, list modules:

```
$ ls
vpc-1  vpc-2
```

1.  Initialize all modules

    ```
    $ terragrunt run-all init
    ```

    Downloads providers, creates cache folders, and writes lock files in each module.

2.  Plan and apply changes

    ```
    $ terragrunt run-all apply
    ```

    Prompts once, then creates VPCs in both modules:

    ```
    aws_vpc.this[0]: Creating...
    aws_vpc.this[0]: Creation complete after 13s [id=vpc-00a01fbbed0f8a50]
    aws_vpc.this[1]: Creating...
    aws_vpc.this[1]: Creation complete after 12s [id=vpc-033ed68948da3c48]
    ```

3.  Destroy all resources

    ```
    $ terragrunt run-all destroy
    ```

    Confirm with `yes` to tear down everything:

    ```
    aws_vpc.this[0]: Destroying... [id=vpc-00a01fbbed0f8a50]
    aws_vpc.this[0]: Destruction complete after 1s
    aws_vpc.this[1]: Destroying... [id=vpc-033ed68948da3c48]
    aws_vpc.this[1]: Destruction complete after 1s
    ```

## References

- [Terragrunt Documentation](https://terragrunt.gruntwork.io/docs/)
- [Terraform AWS VPC Module](https://registry.terraform.io/modules/terraform-aws-modules/vpc/aws)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/e42961fc-4288-4cc2-8db8-3882b884c0b1/lesson/d273febc-2f10-4542-9f8e-b40385b9e299)**
>
> Watch video content
