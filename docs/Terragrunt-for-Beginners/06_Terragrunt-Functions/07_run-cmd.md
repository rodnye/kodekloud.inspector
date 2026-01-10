# run cmd - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Functions/run-cmd)

---

## Table of Contents

- run cmd
  - Best Practices for run_cmd
  - Example: Tagging AWS VPC Resources with the Current User
  - Links and References
  - Watch Video

---

## Content

Terragrunt for Beginners

Terragrunt Functions

# run cmd

Terragrunt’s `run_cmd` is a powerful interpolation function that lets you execute shell commands during a run and return their standard output. By integrating `run_cmd` into your configurations, you can:

- Dynamically adapt module inputs based on external context
- Incorporate existing workflows or scripts
- Feed custom data into Terraform resources at plan/apply time

![The image is an infographic titled "run_cmd" that outlines three benefits: adapting based on custom command execution, integrating workflows within Terragrunt, and allowing custom script execution during Terragrunt runs.](https://kodekloud.com/kk-media/image/upload/v1752884357/notes-assets/images/Terragrunt-for-Beginners-run-cmd/run-cmd-infographic-benefits-terragrunt.jpg)

## Best Practices for `run_cmd`

| Use Case                    | Example                         |
| --------------------------- | ------------------------------- |
| Inject current OS user      | `run_cmd("whoami")`             |
| Fetch latest Git commit SHA | `run_cmd("git rev-parse HEAD")` |
| Read environment variables  | `run_cmd("echo $MY_ENV_VAR")`   |

- Always validate and sanitize any external scripts or commands to mitigate security risks.
- Prefer native Terraform/Terragrunt functions (like `timestamp()` and `file()`) when possible.
- Reserve `run_cmd` for scenarios where built-in functions cannot produce the needed output.

> [!important]
> **Warning**
>
> Executing arbitrary shell commands can introduce security vulnerabilities. Ensure you trust and sanitize any external inputs or scripts invoked via `run_cmd`.

---

## Example: Tagging AWS VPC Resources with the Current User

In this example, we’ll consume the [Terraform AWS VPC module](https://registry.terraform.io/modules/terraform-aws-modules/vpc/aws/5.8.1) and automatically tag every resource with the username running Terragrunt.

```
terraform {
  source = "tfr://terraform-aws-modules/vpc/aws//?version=5.8.1"
}


inputs = {
  name = "Kodekloud-VPC"
  tags = {
    CreatedBy = run_cmd("whoami")
  }
}
```

When you run the command locally:

```
$ whoami
abc
```

Terragrunt will interpolate the result into your Terraform plan:

```
$ terragrunt plan
...
Plan: 4 to add, 0 to change, 0 to destroy.


Changes to Outputs:
+ tags = {
    + CreatedBy = "abc"
  }
...
```

Every resource provisioned by this Terragrunt configuration will now carry the tag `CreatedBy = "abc"`.

With `run_cmd`, you can extend this pattern to pull data from any script, API call, or toolchain, giving you a highly flexible Terragrunt workflow.

---

## Links and References

- [Terraform AWS VPC Module](https://registry.terraform.io/modules/terraform-aws-modules/vpc/aws/5.8.1)
- [Terragrunt Documentation](https://terragrunt.gruntwork.io/)
- [Terraform Interpolation Functions](https://www.terraform.io/docs/language/functions/index.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/5775621f-5504-4da8-835d-661cda37a852/lesson/bfbd7c34-4649-48ba-b195-23d3299a57a7)**
>
> Watch video content
