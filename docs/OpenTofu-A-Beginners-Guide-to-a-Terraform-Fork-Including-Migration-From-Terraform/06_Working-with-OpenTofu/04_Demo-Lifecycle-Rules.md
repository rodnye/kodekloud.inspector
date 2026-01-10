# Demo Lifecycle Rules - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform/Working-with-OpenTofu/Demo-Lifecycle-Rules)

---

## Table of Contents

- Demo Lifecycle Rules
  - 1. Initial Setup for OpenTofu Resources
  - 2. Forcing Replacement by Changing keepers
  - 3. Ensuring Continuity with create_before_destroy
  - 4. Inspecting Resource State with tofu show
  - 5. Protecting Critical Resources with prevent_destroy
  - Lifecycle Arguments Comparison
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

OpenTofu: A Beginners Guide to a Terraform Fork Including Migration From Terraform

Working with OpenTofu

# Demo Lifecycle Rules

Welcome to this hands-on lesson covering OpenTofu lifecycle rules. You’ll learn how OpenTofu determines creation order through resource dependencies, how changing certain arguments forces resource replacement, and how to control destruction using lifecycle blocks.

## 1\. Initial Setup for OpenTofu Resources

In the `root/opentofu-projects/project-mysterio` directory, your `main.tf` already defines two resources:

```
resource "local_file" "file" {
  filename        = var.filename
  file_permission = var.permission
  content         = random_string.string.id
}

resource "random_string" "string" {
  length  = var.length
  keepers = {
    length = var.length
  }
}
```

Initialize and apply:

```
cd ~/opentofu-projects/project-mysterio
tofu init

tofu plan
tofu apply
# Enter a value: yes
# random_string.string: Creating...
# random_string.string: Creation complete [id=...]
# local_file.file: Creating...
# local_file.file: Creation complete [id=...]
```

> [!important]
> **Note**
>
> Because `local_file.file` references `random_string.string.id`, OpenTofu automatically creates the string resource first.

## 2\. Forcing Replacement by Changing `keepers`

Open `variables.tf` and adjust the default length:

```
variable "length" {
  default = 12
}
```

Run another plan:

```
tofu plan
# Plan: 2 to add, 0 to change, 2 to destroy.
```

Changing anything in the `keepers` map forces the `random_string.string` resource—and thus `local_file.file`—to be replaced on the next apply.

## 3\. Ensuring Continuity with `create_before_destroy`

To create the replacement before destroying the old resource, add a lifecycle block:

```
resource "random_string" "string" {
  length  = var.length
  keepers = { length = var.length }

  lifecycle {
    create_before_destroy = true
  }
}
```

Apply the update:

```
tofu apply
# New string is created first, then the old one is removed.
```

You can apply the same pattern to the file resource:

```
resource "local_file" "file" {
  filename        = var.filename
  file_permission = var.permission
  content         = random_string.string.id

  lifecycle {
    create_before_destroy = true
  }
}
```

> [!important]
> **Warning**
>
> On disk, you cannot have two files with the same name simultaneously. The old file is destroyed immediately after the new one appears.

## 4\. Inspecting Resource State with `tofu show`

To view the details of your current resources, run:

```
tofu show
# or
tofu state show local_file.file
```

![The image shows a code editor with a Terraform configuration file open, displaying resource definitions and lifecycle rules. Below, a terminal window shows the output of a Terraform apply command, indicating resource creation and destruction.](https://kodekloud.com/kk-media/image/upload/v1752882902/notes-assets/images/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform-Demo-Lifecycle-Rules/terraform-configuration-code-editor-terminal-output.jpg)

Look for the `id` attribute under the `local_file.file` block.

## 5\. Protecting Critical Resources with `prevent_destroy`

First, destroy or clean up existing resources. Then replace your configuration in `main.tf`:

```
resource "random_pet" "super_pet" {
  length = var.length
  prefix = var.prefix

  lifecycle {
    prevent_destroy = true
  }
}
```

Define the variables:

```
variable "length" {
  default = 12
}

variable "prefix" {
  default = "Mrs"
}
```

Apply:

```
tofu plan
tofu apply
# Creates the pet resource.
```

Now modify `length` or `prefix`, then run:

```
tofu apply
```

You’ll encounter:

```
Error: Instance cannot be destroyed

  on main.tf line 1:
   1: resource "random_pet" "super_pet" {

Resource random_pet.super_pet has lifecycle.prevent_destroy set, but the plan calls for this resource to be destroyed. ...
```

The `prevent_destroy` rule blocks any deletion, protecting must-keep resources from accidental removal.

## Lifecycle Arguments Comparison

| Lifecycle Argument          | Purpose                                       | Use Case                                  |
| --------------------------- | --------------------------------------------- | ----------------------------------------- |
| create\\\_before\\\_destroy | Create the new resource before destroying old | Zero-downtime upgrades                    |
| prevent\\\_destroy          | Block any resource deletion                   | Safeguard critical data or infrastructure |

---

You’ve now mastered:

1.  How OpenTofu orders resource creation via dependencies
2.  Why changing `keepers` forces replacement
3.  Using `create_before_destroy` for seamless updates
4.  Applying `prevent_destroy` to protect vital resources

---

## Links and References

- [OpenTofu Documentation](https://opentofu.io/docs/)
- [Terraform Fork Overview](https://opentofu.io/)
- [Resource Lifecycle Meta-Arguments](https://www.terraform.io/language/meta-arguments/lifecycle)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/69432d48-55d0-4340-a56d-9f9a7819d26c/lesson/2cab39b9-fcfa-4df5-af2c-0b23c8c8549b)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/69432d48-55d0-4340-a56d-9f9a7819d26c/lesson/a9d4f393-bb13-4fe3-97be-6ce61e655506)**
>
> Practice lab
