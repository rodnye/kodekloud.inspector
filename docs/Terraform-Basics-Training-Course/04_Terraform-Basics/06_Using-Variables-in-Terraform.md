# Using Variables in Terraform - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Basics-Training-Course/Terraform-Basics/Using-Variables-in-Terraform)

---

## Table of Contents

- Using Variables in Terraform
  - Using Default Values with Variable Blocks
  - Providing Variable Values Interactively and via the Command Line
  - Using Variable Definition Files
  - Variable Definition Precedence
  - Watch Video
  - Practice Lab

---

## Content

Terraform Basics Training Course

Terraform Basics

# Using Variables in Terraform

In this lesson, you'll learn various techniques to pass input variables in Terraform. We'll cover several methods including setting default values in your variable blocks, providing values interactively or via the command line, using environment variables, and defining variables in separate files. Additionally, we'll explore the variable definition precedence rules when multiple sources assign values to the same variable. These techniques offer flexibility and control when managing your Terraform configurations.

---

## Using Default Values with Variable Blocks

By assigning default values directly within your variable blocks, you ensure that Terraform uses these values if no alternative is provided. For example, consider the following configuration that creates a local file resource and a random pet resource:

```
# main.tf
resource "local_file" "pet" {
  filename = var.filename
  content  = var.content
}


resource "random_pet" "my-pet" {
  prefix    = var.prefix
  separator = var.separator
  length    = var.length
}
```

```
# variables.tf
variable "filename" {
  default = "/root/pets.txt"
}


variable "content" {
  default = "We love pets!"
}


variable "prefix" {
  default = "Mrs"
}


variable "separator" {
  default = "."
}


variable "length" {
  default = 2
}
```

In this example, each variable is provided with a default value. This approach ensures that Terraform has a fallback value when none is explicitly supplied, making your configurations more robust.

---

## Providing Variable Values Interactively and via the Command Line

If a variable does not have a default value or if you want to override an existing default, Terraform will prompt you for a value during `terraform apply`. To streamline automation and avoid interactive prompts, you can pass values using the `-var` flag. You can supply multiple `-var` flags as needed:

```
$ terraform apply -var "filename=/root/newfile.txt" -var "content=Hello, Terraform!"
```

Alternatively, you can set environment variables by prefixing the variable name with `TF_VAR_`. For example, you can configure your shell as follows:

```
$ export TF_VAR_filename="/root/pets.txt"
$ export TF_VAR_content="We love pets!"
$ export TF_VAR_prefix="Mrs"
$ export TF_VAR_separator="."
$ export TF_VAR_length="2"
$ terraform apply
```

In this scenario, Terraform automatically picks up the environment variable values during execution, providing a convenient method for variable assignment.

---

## Using Variable Definition Files

When managing many variables, it becomes practical to store their values in a dedicated variable definition file. These files typically have a `.tfvars` or `.tfvars.json` extension. For example, you can create a file named `terraform.tfvars` with the following contents:

```
filename = "/root/pets.txt"
content  = "We love pets!"
prefix   = "Mrs"
separator = "."
length   = "2"
```

Terraform automatically loads files named `terraform.tfvars`, `terraform.tfvars.json`, or files with extensions like `.auto.tfvars` or `.auto.tfvars.json`. If you use a differently named file (e.g., `variables.tfvars`), be sure to specify it explicitly with the `-var-file` flag:

```
$ terraform apply -var-file="variables.tfvars"
```

This approach centralizes your variable definitions and simplifies the management of Terraform environments.

---

## Variable Definition Precedence

Terraform allows you to set variable values from multiple sources. When the same variable is defined in multiple places, Terraform uses a specific order of precedence to determine which value to apply. Consider the following scenario where a variable is defined in various ways:

- **Environment Variable:**

  ```
  $ export TF_VAR_filename="/root/cats.txt"
  ```

- **terraform.tfvars File:**

  ```
  filename = "/root/pets.txt"
  ```

- **File Ending with .auto.tfvars:**

  ```
  filename = "/root/mypet.txt"
  ```

- **Command-Line Flag:**

  ```
  $ terraform apply -var "filename=/root/best-pet.txt"
  ```

Below is the sample configuration file:

```
# main.tf
resource "local_file" "pet" {
  filename = var.filename
}


# variables.tf
variable "filename" {
  type = string
}
```

Terraform follows this strict order of precedence when assigning variable values:

| Precedence Level                                             | Example Call or File                               |
| ------------------------------------------------------------ | -------------------------------------------------- |
| 1\\. Environment variables (`TF_VAR_`)                       | export TF\\\_VAR\\\_filename="/root/cats.txt"      |
| 2\\. terraform.tfvars file                                   | filename = "/root/pets.txt"                        |
| 3\\. Files ending with `.auto.tfvars` or `.auto.tfvars.json` | filename = "/root/mypet.txt"                       |
| 4\\. Command-line flags (`-var` or `-var-file`)              | terraform apply -var "filename=/root/best-pet.txt" |

Since the command-line flag (`-var`) has the highest precedence in this example, the variable `filename` will ultimately be assigned the value `/root/best-pet.txt`.

> [!important]
> **Note**
>
> Remember, the order in which variable values are applied ensures predictability in your deployment. This hierarchy allows you to override defaults and maintain control over your configuration settings.

---

That's it for this lesson. With these variable assignment techniques, you're ready to build flexible and maintainable Terraform configurations. Now, let's head to the hands-on lab and put these concepts into practice!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/df2660a4-c959-4fa7-bfa8-0700885b598e/lesson/8a48cd5b-2303-43e2-b469-f7b40951d650)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/df2660a4-c959-4fa7-bfa8-0700885b598e/lesson/a4f921ce-6e6f-4029-b0c0-9d2692f18c88)**
>
> Practice lab
