# Tofu Taint - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform/OpenTofu-Import-Tainting-Resources-and-Deubugging/Tofu-Taint)

---

## Table of Contents

- Tofu Taint
  - What Is a Tainted Resource?
  - Example: Auto-Taint on Provisioner Failure
  - 1. Detecting a Tainted Resource
  - 2. Forcing Resource Replacement
  - 3. Undoing a Taint
  - Summary of Taint Commands
  - Watch Video

---

## Content

OpenTofu: A Beginners Guide to a Terraform Fork Including Migration From Terraform

OpenTofu Import Tainting Resources and Deubugging

# Tofu Taint

OpenTofu’s taint mechanism lets you mark resources for destruction and recreation, ensuring failed or stale instances are replaced automatically. While the legacy `tofu taint` command is deprecated, its core logic remains intact under the new `apply-replace` flag.

## What Is a Tainted Resource?

A _tainted_ resource in OpenTofu is one you explicitly mark (or is marked automatically) for replacement on the next apply. This is useful when:

- A previous `tofu apply` failed during provisioning.
- You manually modified software or configuration on an existing cloud instance outside of OpenTofu.

## Example: Auto-Taint on Provisioner Failure

```
resource "aws_instance" "webserver" {
  ami           = "ami-0edab43b6fa892279"
  instance_type = "t2.micro"
  key_name      = "ws"


  provisioner "local-exec" {
    # Invalid path causes the provisioner to fail
    command = "echo ${self.public_ip} > invalid/path/to/ip.txt"
  }
}
```

Here, a `local-exec` provisioner tries to write the instance’s public IP to a nonexistent path. When you run:

```
$ tofu apply
```

the creation fails and OpenTofu marks the resource as **tainted**.

> [!important]
> **Note**
>
> A tainted resource will be destroyed and recreated on the next `tofu apply`. This behavior mirrors `terraform taint` in Terraform CLI.

## 1\. Detecting a Tainted Resource

Run `tofu plan` to see any tainted resources in your state:

```
$ tofu plan
```

You’ll see output similar to:

```
Refreshing state in-memory prior to plan...
aws_instance.webserver: Refreshing state... [id=i-0dba2d5dc22a9a904]


An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  -/+ destroy and then create replacement


OpenTofu will perform the following actions:


# aws_instance.webserver is tainted, so must be replaced
-/+ resource "aws_instance" "webserver" {
    ...
}
```

Even if the EC2 instance still exists in AWS, OpenTofu will destroy and recreate it because it’s marked tainted.

## 2\. Forcing Resource Replacement

To manually mark a resource as tainted (without immediately destroying it):

```
$ tofu apply-replace aws_instance.webserver
```

Inspect the planned replacement:

```
$ tofu plan
```

Output:

```
Refreshing state in-memory prior to plan...
aws_instance.webserver: Refreshing state... [id=i-0fd3946f5b3ab8af8]


An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  -/+ destroy and then create replacement


OpenTofu will perform the following actions:


# aws_instance.webserver is tainted (apply-replace), so will be recreated
-/+ resource "aws_instance" "webserver" {
    ...
}
```

## 3\. Undoing a Taint

If you accidentally tainted a resource or decide to keep it:

```
$ tofu untaint aws_instance.webserver
```

A subsequent `tofu plan` will no longer list that resource for replacement.

## Summary of Taint Commands

| Command                     | Description                                 | Example                                       |
| --------------------------- | ------------------------------------------- | --------------------------------------------- |
| tofu apply                  | Applies changes and auto-taints on failures | `$ tofu apply`                                |
| tofu apply-replace RESOURCE | Marks a resource as tainted for next apply  | `$ tofu apply-replace aws_instance.webserver` |
| tofu untaint RESOURCE       | Removes the taint flag from a resource      | `$ tofu untaint aws_instance.webserver`       |

> [!important]
> **Warning**
>
> Using `tofu apply-replace` will destroy and recreate resources. Ensure you have appropriate backups or snapshots before proceeding.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/0fda982f-8bb2-4b57-8009-996870d27e43/lesson/04753b68-9a1d-46ca-a149-cdf9c1ae58c0)**
>
> Watch video content
