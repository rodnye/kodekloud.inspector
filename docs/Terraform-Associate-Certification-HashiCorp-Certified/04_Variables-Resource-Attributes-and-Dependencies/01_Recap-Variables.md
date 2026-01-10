# Recap Variables - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Associate-Certification-HashiCorp-Certified/Variables-Resource-Attributes-and-Dependencies/Recap-Variables)

---

## Table of Contents

- Recap Variables
  - Hard-Coded Resource Definitions
  - Defining Variables in a Separate File
  - Using Variables in Resource Configurations
  - AWS Instance Example Using Variables
  - Variable Definition Precedence
  - Watch Video

---

## Content

Terraform Associate Certification: HashiCorp Certified

Variables Resource Attributes and Dependencies

# Recap Variables

In this article, we recap how variables work in Terraform and demonstrate their usage with practical examples. Instead of hard-coding values directly in your configuration, variables allow you to write more flexible, maintainable code. Although it is common practice to store variable definitions in a separate file named `variables.tf`, you can also declare them in the same file as your resources (e.g., `main.tf`).

---

## Hard-Coded Resource Definitions

Below is an example of defining resources using hard-coded values:

```
resource "local_file" "pet" {
  filename = "/root/pets.txt"
  content  = "We love pets!"
}

resource "random_pet" "my-pet" {
  prefix    = "Mrs"
  separator = "."
  length    = "1"
}
```

---

## Defining Variables in a Separate File

By defining variables in a separate file, you can avoid repetition and make your configuration easier to update. The following example demonstrates how to define corresponding variables in `variables.tf`:

```
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
  default = "1"
}
```

---

## Using Variables in Resource Configurations

By referencing variables in your resource configurations using the `var.` prefix, you can replace hard-coded values. This makes it easier to change values without having to update each resource block. See the example below:

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

The variable definitions remain in `variables.tf` as shown earlier.

When you run `terraform apply`, Terraform processes your configuration and recognizes that variable values do not need to be enclosed in double quotes in concatenated expressions. If you update a variable value (for example, changing the `content` variable or increasing the `length` from 1 to 2), Terraform will detect the change and replace the affected resources accordingly.

Below is an example output after updating variable values:

```
$ terraform apply
Terraform will perform the following actions:

-/+ resource "local_file" "pet" {
    ~ content            = "We love pets!" -> "My favorite pet is Mrs. Whiskers!" # forces replacement
      directory_permission = "0777"
      file_permission      = "0777"
      filename            = "/root/pet.txt"
      ~ id                 = "bc9cabef1d8b0071d3c4ae9959a9c328f35fe697" -> (known after apply)
}

# random_pet.my-pet must be replaced
-/+ resource "random_pet" "my-pet" {
      ~ id      = "Mrs.Hen" -> (known after apply)
      ~ length  = 1 -> 2 # forces replacement
        prefix    = "Mrs"
        separator = "."
}

Plan: 2 to add, 0 to change, 2 to destroy.
random_pet.my-pet: Destroying... [id=Mrs.hen]
random_pet.my-pet: Destruction complete after 0s
local_file.pet: Destroying... [id=bc9cabef1d8b0071d3c4ae9959a9c328f35fe697]
local_file.pet: Destruction complete after 0s
random_pet.my-pet: Creating...
local_file.pet: Creating...
```

> [!important]
> **Tip**
>
> Using variables in Terraform not only makes your configurations more readable but also simplifies maintenance when scaling your infrastructure.

---

## AWS Instance Example Using Variables

Consider an example where you create an AWS instance using variables for the AMI and instance type. In the resource definition below, the values for `ami` and `instance_type` are referenced from variables:

```
resource "aws_instance" "webserver" {
  ami           = var.ami
  instance_type = var.instance_type
}
```

The variable definitions for this configuration might look like the following:

```
variable "ami" {
  default = "ami-0edab43b6fa892279"
}

variable "instance_type" {
  default = "t2.micro"
}
```

While these defaults are set in `variables.tf`, you can override them when applying the configuration. There are a few methods to do so:

1.  **Remove the Default Values:**  
    You can remove the defaults in `variables.tf` and provide values explicitly during runtime.

    ```
    # main.tf
    resource "aws_instance" "webserver" {
      ami           = var.ami
      instance_type = var.instance_type
    }

    # variables.tf
    variable "ami" {
    }

    variable "instance_type" {
    }
    ```

2.  **Pass Values with Command-Line Flags:**  
    Provide variable values using the `-var` flag during execution:

    ```
    $ terraform apply -var "ami=ami-0edab43b6fa892279" -var "instance_type=t2.micro"
    ```

3.  **Use Environment Variables:**  
    Export the variable values before running Terraform:

    ```
    $ export TF_VAR_instance_type="t2.micro"
    $ terraform apply
    ```

4.  **Variable Definition File:**  
    Supply variable values via a variable definition file (ending with `.tfvars` or `.tfvars.json`). By default, Terraform automatically loads files named `terraform.tfvars` or `terraform.tfvars.json`. For custom-named files, use the `-var-file` flag:

    ```
    # variables.tfvars
    ami = "ami-0edab43b6fa892279"
    instance_type = "t2.micro"
    ```

    ```
    $ terraform apply -var-file="variables.tfvars"
    ```

---

## Variable Definition Precedence

Terraform provides multiple methods for assigning variable values. When a variable is defined in more than one way, Terraform follows a specific precedence order:

| Precedence Level                | Description                                                                           |
| ------------------------------- | ------------------------------------------------------------------------------------- |
| 1\\. Environment Variables      | Values set via environment variables (e.g., `export TF_VAR_instance_type="t2.micro"`) |
| 2\\. terraform.tfvars File      | Values provided in `terraform.tfvars` or `terraform.tfvars.json`                      |
| 3\\. Auto-loaded Variable Files | Files ending with `.auto.tfvars` or `.auto.tfvars.json` loaded in alphabetical order  |
| 4\\. Command-Line Flags         | Values passed using the `-var` or `-var-file` flags (highest precedence)              |

For example, if the variable `type` is specified through multiple methods as shown below:

```
$ export TF_VAR_type="t2.nano"
```

```
# In terraform.tfvars:
type = "t3.micro"
```

```
# In an auto.tfvars file:
type = "t3.small"
```

```
$ terraform apply -var "type=t2.medium"
```

Terraform will use `t2.medium` as the final value for `type` since command-line flags have the highest precedence.

> [!important]
> **Best Practice**
>
> Always be aware of the variable precedence in Terraform to avoid unexpected behaviors during deployment. Using dedicated variable files or environment variables can improve consistency across different environments.

---

That concludes our article on variables in Terraform. Understanding how to define, reference, and override variables is essential for creating flexible and reusable Terraform configurations. Happy building!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-associate-certification-hashicorp-certified/module/cca81ade-f05a-42b2-af56-1926cade6582/lesson/06a9906c-1823-4986-a292-ada617ddd68b)**
>
> Watch video content
