# Introduction to OpenTofu State - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform/OpenTofu-State/Introduction-to-OpenTofu-State)

---

## Table of Contents

- Introduction to OpenTofu State
  - What Is the OpenTofu State?
  - State Refresh on plan and apply
  - Example: Updating a Resource In-Place
  - State Dependencies
  - Best Practices for State Management
  - Watch Video
    - Disabling State Refresh

---

## Content

OpenTofu: A Beginners Guide to a Terraform Fork Including Migration From Terraform

OpenTofu State

# Introduction to OpenTofu State

In this lesson, we’ll dive into OpenTofu’s state management. You’ll learn what the state file is, why it matters, and best practices for keeping it reliable and secure.

## What Is the OpenTofu State?

When you execute `tofu apply` for the first time, OpenTofu generates a JSON state file named `terraform.tfstate` in your working directory, along with a backup `terraform.tfstate.backup`. This file records every resource managed by OpenTofu—its IDs, attributes, dependencies, and provider metadata.

Example configuration:

```
// main.tf
resource "aws_instance" "cerberus" {
  ami           = var.ami
  instance_type = var.instance_type
}
```

```
// variables.tf
variable "ami" {
  default = "ami-06178cf087598769c"
}


variable "instance_type" {
  default = "m5.large"
}
```

Apply the infrastructure:

```
$ tofu apply
aws_instance.cerberus: Creating...
aws_instance.cerberus: Creation complete after 10s [id=i-c791dc46a6639d4a7]
Apply complete! Resources: 1 added, 0 changed, 0 destroyed
```

Verify the state files in your directory:

```
$ ls
main.tf  variables.tf  terraform.tfstate  terraform.tfstate.backup
```

Inspect the JSON structure:

```
$ cat terraform.tfstate
{
  "version": 4,
  "terraform_version": "0.13.3",
  "resources": [
    {
      "mode": "managed",
      "type": "aws_instance",
      "name": "cerberus",
      "provider": "provider[\"registry.terraform.io/hashicorp/aws\"]",
      "instances": [
        {
          "attributes": {
            "ami": "ami-06178cf087598769c",
            "arn": "arn:aws:ec2:eu-west-2:instance/i-1db6bfe81bd1e3ed7",
            "availability_zone": "eu-west-2a"
            // ...
          }
        }
      ]
    }
  ]
}
```

OpenTofu treats this state file as the single source of truth for commands like `tofu plan` and `tofu apply`.

## State Refresh on `plan` and `apply`

Before creating an execution plan, OpenTofu refreshes the state by comparing it to real-world infrastructure:

```
$ tofu plan
aws_instance.cerberus: Refreshing state... [id=i-1db6bfe81bd1e3ed7]
No changes. Your infrastructure matches the configuration.
Plan: 0 to add, 0 to change, 0 to destroy.
```

This ensures that any drift is detected before making changes.

### Disabling State Refresh

You can bypass the refresh step with `-refresh=false`, though it’s generally not recommended:

```
$ tofu apply -refresh=false
Apply complete! Resources: 0 added, 0 changed, 0 destroyed
```

> [!important]
> **Warning**
>
> Skipping state refresh may speed up large operations but risks applying changes on outdated state. Only use this flag if you fully understand the consequences.

## Example: Updating a Resource In-Place

Suppose you update the instance type from `m5.large` to `t3.micro`:

```
// variables.tf
variable "instance_type" {
  default = "t3.micro"
}
```

Generate a new plan:

```
$ tofu plan
aws_instance.cerberus: Refreshing state... [id=i-9d394a982f158e887]


An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  ~ update in-place


  # aws_instance.cerberus will be updated in-place
  ~ resource "aws_instance" "cerberus" {
        ami            = "ami-06178cf087598769c"
      ~ instance_type = "m5.large" -> "t3.micro"
        // ... other attributes
    }
```

This plan highlights an in-place update to apply the new instance type without destroying the instance.

## State Dependencies

OpenTofu tracks inter-resource dependencies to determine correct creation and destruction order. For example:

```
resource "aws_instance" "db" {
  ami           = var.ami
  instance_type = var.instance_type
}


resource "aws_instance" "web" {
  ami           = var.ami
  instance_type = var.instance_type
  depends_on    = [aws_instance.db]
}
```

In `terraform.tfstate`, the `web` instance includes a `dependencies` array:

```
{
  "type": "aws_instance",
  "name": "web",
  "instances": [
    {
      "attributes": { /* ... */ }
    }
  ],
  "dependencies": [
    "aws_instance.db"
  ]
}
```

OpenTofu uses these dependencies to, for example, create the database instance before the web instance, or destroy the web instance before the database.

## Best Practices for State Management

| Practice                 | Recommendation                                                                                                                           |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Sensitive Data           | Avoid storing SSH keys, passwords, or secrets in your state file.                                                                        |
| Remote Backends          | Use a secure remote backend (S3, GCS, Azure Blob) to share and lock your state file.                                                     |
| State Inspection & Tools | Manipulate or inspect state only with OpenTofu commands (e.g., `tofu state list`, `tofu state mv`). Do not edit the state file manually. |
| Version Control          | Add `terraform.tfstate` and `terraform.tfstate.backup` to `.gitignore` to prevent accidental commits.                                    |

> [!important]
> **Note**
>
> Configure remote backends to enable [state locking and consistency](https://www.terraform.io/language/settings/backends). This prevents multiple users from making concurrent changes.

OpenTofu’s state file is the backbone of reliable, idempotent infrastructure as code. Proper management—using secure backends, avoiding manual edits, and staying alert to drift—ensures predictable deployments and clean collaboration.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/8ca03465-be1e-4d86-9269-2bc7d61f0ffb/lesson/1a146877-a837-44a5-9f6a-ba0ea050ecbf)**
>
> Watch video content
