# Multiple Providers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform/OpenTofu-Basics/Multiple-Providers)

---

## Table of Contents

- Multiple Providers
  - Prerequisites
  - Defining Multiple Resources
  - Initializing Providers
  - Planning and Applying Changes
  - Example Execution Output
  - Chaining Resources Across Providers
  - References
  - Watch Video

---

## Content

OpenTofu: A Beginners Guide to a Terraform Fork Including Migration From Terraform

OpenTofu Basics

# Multiple Providers

In this guide, we’ll show you how to use multiple Providers in a single OpenTofu (a Terraform-compatible tool) configuration. By combining Providers, you can provision resources across different platforms—local files, random data generators, AWS, and more—all within one `main.tf`.

## Prerequisites

- OpenTofu CLI installed (see [OpenTofu Installation](https://opentofu.org/docs/installation)).
- A working directory with an existing `main.tf` and an initialized backend.

## Defining Multiple Resources

Extend your `main.tf` by adding a `random_pet` resource alongside the existing `local_file`:

```
resource "local_file" "pet" {
  filename = "/root/pets.txt"
  content  = "We love pets!"
}


resource "random_pet" "my-pet" {
  prefix    = "Mrs"
  separator = "."
  length    = 1
}
```

> [!important]
> **Note**
>
> Whenever you introduce a new Provider (e.g., the `random` provider here), you must reinitialize your configuration so OpenTofu can download or reuse the required plugin.

## Initializing Providers

Run:

```
tofu init
```

Sample output:

```
Initializing the backend...


Initializing provider plugins...
- Reusing hashicorp/local from .terraform.lock.hcl
- Finding latest version of hashicorp/random...
- Installing hashicorp/random v3.6.0...
- Installed hashicorp/random v3.6.0


OpenTofu has been successfully initialized!
```

> [!important]
> **Warning**
>
> Review changes in your `.terraform.lock.hcl` after `tofu init`. Commit updates only if they match your intended dependency versions.

## Planning and Applying Changes

First, generate and inspect the execution plan:

```
tofu plan
```

Then apply the proposed changes:

```
tofu apply
```

Table: Common OpenTofu Commands

| Command    | Purpose                              | Example                 |
| ---------- | ------------------------------------ | ----------------------- |
| tofu init  | Initialize backend & providers       | `tofu init`             |
| tofu plan  | Preview changes without applying     | `tofu plan -out=tfplan` |
| tofu apply | Apply changes to reach desired state | `tofu apply tfplan`     |

## Example Execution Output

```
local_file.pet: Refreshing state... [id=...]
random_pet.my-pet: Creating...
random_pet.my-pet: Creation complete after 0s [id=Mrs.hen]


Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
```

The `random_pet` resource simply generates a random name, exposed as its `id` attribute—no real infrastructure is provisioned.

## Chaining Resources Across Providers

You can reference one resource’s attribute in another, even if they come from different Providers. For example, generate a random string to tag an AWS EC2 instance:

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

When you run `tofu apply`, OpenTofu will:

1.  Create the random string.
2.  Launch an EC2 instance tagged with `web-<generated-suffix>`.

Linking resources in this way lets you orchestrate complex, multi-provider deployments from a single `.tf` file.

## References

- [OpenTofu Documentation](https://opentofu.org/docs/)
- [Provider Signing](https://opentofu.org/docs/cli/plugins/signing/)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest)
- [HashiCorp Random Provider](https://registry.terraform.io/providers/hashicorp/random/latest)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/c3586b29-e450-4c95-bad9-91bdf332eb24/lesson/60de153e-0f0d-4bd5-b14d-83dbd1d45729)**
>
> Watch video content
