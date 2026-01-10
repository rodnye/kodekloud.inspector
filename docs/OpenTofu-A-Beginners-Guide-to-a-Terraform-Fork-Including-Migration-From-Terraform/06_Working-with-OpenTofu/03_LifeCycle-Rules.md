# LifeCycle Rules - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform/Working-with-OpenTofu/LifeCycle-Rules)

---

## Table of Contents

- LifeCycle Rules
  - Table of Contents
  - Default Behavior
  - 1. create_before_destroy
  - 2. prevent_destroy
  - 3. ignore_changes
  - Summary of Lifecycle Rules
  - Further Reading
  - Watch Video

---

## Content

OpenTofu: A Beginners Guide to a Terraform Fork Including Migration From Terraform

Working with OpenTofu

# LifeCycle Rules

In this lesson, we’ll dive into OpenTofu’s lifecycle rules to control how resources are created, updated, or destroyed. Proper use of these rules helps you avoid downtime, accidental deletions, and unnecessary modifications.

## Table of Contents

- [Default Behavior](#default-behavior)
- [create_before_destroy](#1-create_before_destroy)
- [prevent_destroy](#2-prevent_destroy)
- [ignore_changes](#3-ignore_changes)
- [Summary of Lifecycle Rules](#summary-of-lifecycle-rules)
- [Further Reading](#further-reading)

---

## Default Behavior

By default, OpenTofu will destroy and then recreate any resource if a change requires replacement (for example, updating an AMI in an `aws_instance`).

```
resource "aws_instance" "cerberus" {
  ami           = "ami-2158c0f087598787a"
  instance_type = "m5.large"

  tags = {
    Name = "Cerberus-Webserver"
  }
}
```

After changing the `ami` value and running `tofu apply`, you’ll see:

```
$ tofu apply
...
Plan: 1 to add, 0 to change, 1 to destroy.
...
aws_instance.cerberus: Destroying... [id=i-0abcd1234efgh567a]
aws_instance.cerberus: Creation complete after 1m2s [id=i-1wxyz9876uvgh5432]
Apply complete! Resources: 1 added, 0 changed, 1 destroyed.
```

---

## 1\. create_before_destroy

Use `create_before_destroy = true` to provision the replacement resource before tearing down the old one. This helps minimize downtime.

```
resource "aws_instance" "cerberus" {
  ami           = "ami-2158c0f087598787a"
  instance_type = "m5.large"

  tags = {
    Name = "Cerberus-Webserver"
  }

  lifecycle {
    create_before_destroy = true
  }
}
```

Running `tofu apply` now provisions the new instance first:

```
$ tofu apply
...
Plan: 1 to add, 0 to change, 1 to destroy.
...
aws_instance.cerberus: Creating...
aws_instance.cerberus: Creation complete after 1m1s [id=i-9abcd1234mnop678]
aws_instance.cerberus: Destroying... [id=i-0abcd1234efgh567a]
Apply complete! Resources: 1 added, 0 changed, 1 destroyed.
```

---

## 2\. prevent_destroy

Set `prevent_destroy = true` to block any accidental deletion during an `apply`. OpenTofu will throw an error if a change requires replacement.

```
resource "aws_instance" "cerberus" {
  ami           = "ami-2158c0f087598787a"
  instance_type = "m5.large"

  tags = {
    Name = "Cerberus-Webserver"
  }

  lifecycle {
    prevent_destroy = true
  }
}
```

If you change the AMI and run `tofu apply`, you’ll get:

```
$ tofu apply
Error: Instance aws_instance.cerberus must be replaced
  on main.tf line 2, in resource "aws_instance" "cerberus":
   2: resource "aws_instance" "cerberus" {
Resource aws_instance.cerberus has lifecycle prevent_destroy set, but plan requires resource to be replaced. This operation would destroy the existing resource.
```

> [!important]
> **Note**
>
> `prevent_destroy` does _not_ block a direct `tofu destroy`. It only prevents destruction during apply operations triggered by configuration changes.

---

## 3\. ignore_changes

The `ignore_changes` meta-argument instructs OpenTofu to skip tracking specified attributes, even if they drift from your configuration.

```
resource "aws_instance" "cerberus" {
  ami           = "ami-2158c0f087598787a"
  instance_type = "m5.large"

  tags = {
    Name = "Cerberus-Webserver-1"
  }

  lifecycle {
    ignore_changes = [
      tags
    ]
  }
}
```

If someone updates the `Name` tag manually in the AWS console, `tofu apply` reports no changes:

```
$ tofu apply
aws_instance.cerberus: Refreshing state... [id=i-1234567890abcdef0]
Apply complete! Resources: 0 added, 0 changed, 0 destroyed.
```

You can ignore multiple attributes, or even all changes:

```
resource "aws_instance" "cerberus" {
  ami           = "ami-2158c0f087598787a"
  instance_type = "m5.large"

  tags = {
    Name = "Cerberus-Webserver-2"
  }

  lifecycle {
    ignore_changes = all
  }
}
```

```
$ tofu apply
aws_instance.cerberus: Refreshing state... [id=i-1234567890abcdef0]
Apply complete! Resources: 0 added, 0 changed, 0 destroyed.
```

> [!important]
> **Warning**
>
> Use `ignore_changes = all` cautiously. Ignoring all drift may mask unintended configuration drift over time.

---

## Summary of Lifecycle Rules

| Rule                        | Description                                                                                      | Example                            |
| --------------------------- | ------------------------------------------------------------------------------------------------ | ---------------------------------- |
| create\\\_before\\\_destroy | Provision the new resource before destroying the old to minimize downtime.                       | `create_before_destroy = true`     |
| prevent\\\_destroy          | Block any destructive change during `apply`, protecting critical resources.                      | `prevent_destroy = true`           |
| ignore\\\_changes           | Skip specific attribute changes or all drift between config and real-world state.                | `ignore_changes = [tags]` or `all` |
| Default (no lifecycle)      | Replace resources by destroying then recreating whenever a change requires resource replacement. | N/A                                |

---

## Further Reading

- [OpenTofu Documentation on Lifecycle Rules](https://github.com/opentofu/opentofu/blob/main/docs/lifecycle.md)
- [Terraform Meta-Arguments: Lifecycle](https://developer.hashicorp.com/terraform/language/meta-arguments/lifecycle)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/69432d48-55d0-4340-a56d-9f9a7819d26c/lesson/a1daef77-08c8-402e-9f9e-bd35488ddfe7)**
>
> Watch video content
