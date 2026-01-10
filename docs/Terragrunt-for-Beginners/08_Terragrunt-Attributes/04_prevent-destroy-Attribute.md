# prevent destroy Attribute - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Attributes/prevent-destroy-Attribute)

---

## Table of Contents

- prevent destroy Attribute
  - Overview: Preventing Unintentional Resource Deletion
  - Why Enable prevent_destroy?
  - Attribute Details
  - Use Case: Protecting a VPC Module
  - Best Practices
  - References
  - Watch Video
    - 1. Provision the VPC
    - 2. Enable prevent_destroy
    - 3. Verify Destruction Is Blocked
    - 4. Removing the Protection

---

## Content

Terragrunt for Beginners

Terragrunt Attributes

# prevent destroy Attribute

## Overview: Preventing Unintentional Resource Deletion

In this article, we dive into the `prevent_destroy` attribute within Terragrunt. This powerful flag helps protect critical infrastructure from accidental destruction, ensuring higher stability and data integrity in your Terraform workflows.

## Why Enable `prevent_destroy`?

Cloud environments often involve complex, interdependent resources. A single inadvertent `terraform destroy` can trigger cascading failures, leading to downtime and data loss. By setting `prevent_destroy = true`, you instruct Terraform to refuse any destroy operation on the designated resource or module.

> [!important]
> **Warning**
>
> Be cautious when enabling `prevent_destroy` globally. It can block legitimate operations that require a full teardown, so apply it selectively to high-value resources.

## Attribute Details

| Value | Description                          |
| ----- | ------------------------------------ |
| true  | Prohibit resource destruction        |
| false | Allow resource destruction (default) |

![The image illustrates the concept of minimizing the risk of unintentional destruction, featuring a declining bar graph with a warning symbol and a building being demolished. It highlights the benefits of preventing destruction.](https://kodekloud.com/kk-media/image/upload/v1752884278/notes-assets/images/Terragrunt-for-Beginners-prevent-destroy-Attribute/minimizing-destruction-risk-graph-warning.jpg)

## Use Case: Protecting a VPC Module

Let's walk through a step-by-step example. We will provision a VPC using a Terragrunt module and then lock it down to prevent accidental teardown.

### 1\. Provision the VPC

Create a `terragrunt.hcl` file with the following configuration:

```
terraform {
  source = "tfr://terraform-aws-modules/vpc/aws//?version=5.8.1"
}

include "root" {
  path   = find_in_parent_folders()
  expose = true
}

inputs = {
  name = "KodeKloud-VPC"
  cidr = "10.100.0.0/16"
}

download_dir = "../.terragrunt-kodekloud"
```

Run the provisioning command:

```
terragrunt apply
```

Confirm the prompt to create your VPC.

### 2\. Enable `prevent_destroy`

Modify the same `terragrunt.hcl` file to include the `prevent_destroy` attribute:

```
terraform {
  source = "tfr://terraform-aws-modules/vpc/aws//?version=5.8.1"
}

include "root" {
  path   = find_in_parent_folders()
  expose = true
}

inputs = {
  name = "KodeKloud-VPC"
  cidr = "10.100.0.0/16"
}

download_dir    = "../.terragrunt-kodekloud"
prevent_destroy = true
```

### 3\. Verify Destruction Is Blocked

Attempt to destroy the VPC:

```
terragrunt destroy
```

You will encounter an error:

```
Error: Operation prevented due to prevent_destroy
  on terragrunt.hcl line 12:
  12: prevent_destroy = true
```

### 4\. Removing the Protection

When you need to tear down the VPC, simply set `prevent_destroy = false` or remove the attribute, then run:

```
terragrunt destroy
```

You should see a successful plan and destruction:

```
Plan: 0 to add, 0 to change, 1 to destroy.
Do you really want to destroy all resources? yes
```

## Best Practices

| Practice              | Description                                                |
| --------------------- | ---------------------------------------------------------- |
| Selective Protection  | Apply `prevent_destroy` only to mission-critical resources |
| Review Before Changes | Use `terragrunt plan` to detect potential conflicts early  |
| Documentation         | Tag protected resources clearly in your repository         |

> [!important]
> **Note**
>
> For more details on Terragrunt attributes, refer to the [Terragrunt Documentation](https://terragrunt.gruntwork.io/docs/).

## References

- [Terraform Prevent Destroy Meta-Argument](https://www.terraform.io/docs/language/meta-arguments/prevent_destroy.html)
- [Terragrunt Official Guide](https://terragrunt.gruntwork.io/)
- [Terraform Basics](https://www.terraform.io/docs/index.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/1a2a45b4-e7d1-4af2-a897-7ebf83a4350e/lesson/a30aba05-3507-4290-aab7-385c125a96b0)**
>
> Watch video content
