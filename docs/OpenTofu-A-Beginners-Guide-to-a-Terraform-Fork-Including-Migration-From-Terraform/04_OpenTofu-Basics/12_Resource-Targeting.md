# Resource Targeting - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform/OpenTofu-Basics/Resource-Targeting)

---

## Table of Contents

- Resource Targeting
  - Example Configuration
  - Applying Changes Normally
  - Targeting a Single Resource
  - CLI Commands Reference
  - Links and References
  - Watch Video

---

## Content

OpenTofu: A Beginners Guide to a Terraform Fork Including Migration From Terraform

OpenTofu Basics

# Resource Targeting

In this lesson, you'll learn how to use resource targeting with OpenTofu’s `plan` and `apply` commands to update individual resources without affecting the rest of your infrastructure.

## Example Configuration

Below is a sample HCL configuration that generates a random string and launches an AWS EC2 instance tagged with that string:

```
resource "random_string" "server-suffix" {
  length  = 6
  upper   = false
  special = false
}


resource "aws_instance" "web" {
  ami           = "ami-06178cf087598769c"
  instance_type = "m5.large"
  tags = {
    Name = "web-${random_string.server-suffix.id}"
  }
}
```

> [!important]
> **Note**
>
> The `aws_instance.web` resource uses the interpolation `${random_string.server-suffix.id}` to append the generated suffix to the **Name** tag.

## Applying Changes Normally

If you change the random string’s length from `6` to `5` and run:

```
$ tofu apply
```

OpenTofu will plan and apply updates for both resources because the EC2 tag depends on the random string:

```
Plan: 1 to add, 1 to change, 1 to destroy.


Enter a value: yes
random_string.server-suffix: Destroying... [id=6r923x]
random_string.server-suffix: Creation complete after 0s [id=nglmpo]
aws_instance.web: Modifying... [id=i-67428769e06ae2901]
Apply complete! Resources: 1 added, 1 changed, 1 destroyed.
```

## Targeting a Single Resource

To update only the random string and leave the EC2 instance untouched, use the `-target` flag:

```
$ tofu apply -target=random_string.server-suffix
```

OpenTofu will generate a plan for just that resource:

```
OpenTofu will perform the following actions:


  # random_string.server-suffix must be replaced
-/+ resource "random_string" "server-suffix" {
    ~ id      = "bl12qd" -> (known after apply)
    ~ length  = 6 -> 5 # forces replacement
}


Plan: 1 to add, 0 to change, 1 to destroy.


Warning: Resource targeting is in effect


Enter a value: yes
random_string.server-suffix: Destroying... [id=6r923x]
random_string.server-suffix: Creation complete after 0s [id=nglmpo]


Warning: Applied changes may be incomplete
Apply complete! Resources: 1 added, 0 changed, 1 destroyed.
```

> [!important]
> **Warning**
>
> Using resource targeting can leave your state incomplete. Reserve this feature for urgent fixes or small, isolated changes.

## CLI Commands Reference

| Command                                     | Description                                  |
| ------------------------------------------- | -------------------------------------------- |
| `tofu plan`                                 | Preview all changes before applying them     |
| `tofu apply`                                | Apply all planned changes                    |
| `tofu apply -target=<RESOURCE_TYPE>.<NAME>` | Apply changes only to the specified resource |

## Links and References

- [OpenTofu Documentation](https://github.com/opentofu/opentofu)
- [AWS EC2 Overview](https://aws.amazon.com/ec2/)
- [Terraform Random Provider](https://registry.terraform.io/providers/hashicorp/random/latest)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/c3586b29-e450-4c95-bad9-91bdf332eb24/lesson/707a39e7-31dc-43f6-ba9d-40a3df9366be)**
>
> Watch video content
