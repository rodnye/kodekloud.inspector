# Demo Using Variables in OpenTofu - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform/OpenTofu-Basics/Demo-Using-Variables-in-OpenTofu)

---

## Table of Contents

- Demo Using Variables in OpenTofu
  - 1. Injecting Variables with Environment Variables
  - 2. Variable Definition Precedence
  - 3. Supplying a Custom Variable File
  - Hands-On: Working with Variables in a Sample Project
  - Links and References
  - Watch Video
  - Practice Lab
    - 4. Running tofu plan Without Declared Variables
    - 5. Declaring the filename Variable
    - 6. Overriding Variables on the Command Line

---

## Content

OpenTofu: A Beginners Guide to a Terraform Fork Including Migration From Terraform

OpenTofu Basics

# Demo Using Variables in OpenTofu

In this guide, we’ll cover multiple methods to pass input variables into your OpenTofu configurations. You’ll learn how to:

- Inject variables via environment variables
- Understand OpenTofu’s variable precedence
- Supply custom variable files
- Declare and override variables in your project

By the end, you’ll be confident working with `TF_VAR_` exports, `.tfvars` files, and command-line flags.

---

## 1\. Injecting Variables with Environment Variables

The simplest approach is to set an environment variable prefixed with `TF_VAR_`. OpenTofu picks these up automatically:

```
export TF_VAR_filename="./data/baseball.txt"
```

![The image shows a Visual Studio Code interface with a task on using environment variables in OpenTofu scripts, alongside a terminal window. The left panel displays a file explorer, and the main panel contains a README file with instructions.](https://kodekloud.com/kk-media/image/upload/v1752882828/notes-assets/images/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform-Demo-Using-Variables-in-OpenTofu/vscode-environment-variables-opentofu-scripts.jpg)

> [!important]
> **Note**
>
> Using `TF_VAR_` is ideal for CI/CD pipelines or local development when you want to avoid hardcoding sensitive values.

---

## 2\. Variable Definition Precedence

OpenTofu resolves variables based on a fixed priority list. The highest precedence is given to values passed with `-var` or `-var-file`. Below is the full order:

| Precedence Level | Method                                         |
| ---------------- | ---------------------------------------------- |
| 1                | Command line flags (`-var`, `-var-file`)       |
| 2                | Environment variables (`TF_VAR_*`)             |
| 3                | Auto-loaded files (`*.auto.tfvars`)            |
| 4                | Default values defined in the `variable` block |
| 5                | No value (error if variable has no default)    |

![The image shows a coding environment with a task question about variable definition precedence in Terraform on the left, and a Visual Studio Code editor with a welcome message and terminal on the right.](https://kodekloud.com/kk-media/image/upload/v1752882830/notes-assets/images/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform-Demo-Using-Variables-in-OpenTofu/terraform-variable-definition-coding-environment.jpg)

For more details, see [OpenTofu Input Variables](https://docs.opentofu.io/commands#input-variables){:target="\_blank"}.

---

## 3\. Supplying a Custom Variable File

You can group variables in a file (e.g., `variables.tfvars`) and pass it with `-var-file`:

```
tofu apply -var-file=variables.tfvars
```

OpenTofu will load all key-value pairs from that file.

---

## Hands-On: Working with Variables in a Sample Project

Navigate to `/root/OpenTofu/projects/variables`. The directory contains:

- `basket.auto.tfvars`
- `main.tf`
- `terraform.tfvars`
- `throw.auto.tfvars`

![The image shows a code editor with a file explorer on the left, displaying a directory structure, and a terminal at the bottom. The main section shows a file named `basket.auto.tfvars` with a line of code setting a filename variable.](https://kodekloud.com/kk-media/image/upload/v1752882830/notes-assets/images/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform-Demo-Using-Variables-in-OpenTofu/code-editor-file-explorer-terminal.jpg)

### 4\. Running `tofu plan` Without Declared Variables

If `main.tf` references `var.filename` but you haven’t declared the variable, you’ll see:

```
$ cd /root/OpenTofu/projects/variables
$ tofu plan
Warning: Value for undeclared variable
Error: Reference to undeclared input variable


  on main.tf line 2, in resource "local_file" "games":
   2:   filename = var.filename


An input variable with the name "filename" has not been declared. This variable can be declared with a variable "filename" {} block.
```

> [!important]
> **Warning**
>
> OpenTofu requires every referenced variable to be declared. Always include a `variable` block to avoid plan/apply failures.

### 5\. Declaring the `filename` Variable

Create a `variables.tf` file next to `main.tf`:

```
variable "filename" {
  description = "Path to the output file"
  type        = string
}
```

Re-run `tofu plan`—the error should disappear.

---

### 6\. Overriding Variables on the Command Line

To set or override `filename` at runtime:

```
tofu apply -var='filename=/root/tennis.txt'
```

Since `-var` has the highest precedence, it will override any environment or `.tfvars` settings.

![The image shows a coding environment with a task question on the left asking about a command line flag in OpenTofu, and a code editor on the right displaying a Terraform configuration file and terminal output with warnings and errors related to undeclared variables.](https://kodekloud.com/kk-media/image/upload/v1752882832/notes-assets/images/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform-Demo-Using-Variables-in-OpenTofu/coding-environment-opentofu-terraform-errors.jpg)

---

## Links and References

- [OpenTofu Documentation](https://docs.opentofu.io/)
- [Terraform Variables](https://www.terraform.io/language/values/variables)
- [Managing Terraform Variables](https://www.terraform.io/cli/config/terraform.tfvars){:target="\_blank"}

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/c3586b29-e450-4c95-bad9-91bdf332eb24/lesson/26ad5fda-325b-4fea-9bee-a04aca6b725c)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/c3586b29-e450-4c95-bad9-91bdf332eb24/lesson/69d33f38-4c3a-4d7c-9814-b9565402b14a)**
>
> Practice lab
