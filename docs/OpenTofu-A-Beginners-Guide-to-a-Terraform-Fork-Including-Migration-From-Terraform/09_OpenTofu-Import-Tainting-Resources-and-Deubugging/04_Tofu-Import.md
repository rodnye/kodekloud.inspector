# Tofu Import - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform/OpenTofu-Import-Tainting-Resources-and-Deubugging/Tofu-Import)

---

## Table of Contents

- Tofu Import
  - Import Workflow Overview
  - Prerequisites
  - 1. Define an Empty Resource Block
  - 2. Import into the State
  - 3. Populate the Resource Block
  - 4. Plan and Verify
  - Links and References
  - Watch Video

---

## Content

OpenTofu: A Beginners Guide to a Terraform Fork Including Migration From Terraform

OpenTofu Import Tainting Resources and Deubugging

# Tofu Import

In this lesson, we’ll walk through how to use the OpenTofu `import` command to bring existing resources—provisioned manually or via tools like Ansible—under OpenTofu management. We’ll use an AWS EC2 instance as our example.

## Import Workflow Overview

| Step                                | Description                                                |
| ----------------------------------- | ---------------------------------------------------------- |
| 1\\. Define an empty resource block | Create a placeholder in your `.tf` file.                   |
| 2\\. Import into state              | Run `tofu import` with the resource address and ID.        |
| 3\\. Populate the resource block    | Fill in all required arguments based on the real resource. |
| 4\\. Plan and verify                | Use `tofu plan` to ensure no drift exists.                 |

## Prerequisites

Before you begin, gather:

- The **instance ID** of the EC2 instance (e.g., `i-02613be10d5326f7`).
- A working OpenTofu project initialized with `tofu init`.
- AWS credentials configured in your environment.

![The image shows an AWS EC2 instance summary with details such as instance ID, state, type, public and private IP addresses, and platform information. The instance is running and is of type t2.micro.](https://kodekloud.com/kk-media/image/upload/v1752882876/notes-assets/images/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform-Tofu-Import/aws-ec2-instance-summary-t2-micro.jpg)

Copy the instance ID from the AWS Console; you’ll need it for the import command.

> [!important]
> **Note**
>
> The resource name (`webserver-2` in our example) must be unique within your state. Choose a descriptive identifier to avoid collisions.

---

## 1\. Define an Empty Resource Block

Create a placeholder in your configuration file (e.g., `main.tf`). The block will remain empty until you import the real attributes.

```
resource "aws_instance" "webserver-2" {
  # Arguments will be populated after import
}
```

---

## 2\. Import into the State

Run the `tofu import` command, specifying:

- The resource address: `<type>.<name>`
- The real resource ID from AWS.

```
$ tofu import aws_instance.webserver-2 i-02613be10d5326f7
aws_instance.webserver-2: Importing from ID "i-02613be10d5326f7"...
aws_instance.webserver-2: Import prepared!
Prepared aws_instance for import
aws_instance.webserver-2: Refreshing state... [id=i-02613be10d5326f7]


Import successful!
```

At this point, the EC2 instance exists in your state file, but the configuration block in `main.tf` is still empty.

---

## 3\. Populate the Resource Block

Inspect the AWS Console or view the state file (`terraform.tfstate`) to retrieve required arguments. Update your configuration with those values:

```
resource "aws_instance" "webserver-2" {
  ami                    = "ami-0edab43b6fa892279"
  instance_type          = "t2.micro"
  key_name               = "ws"
  vpc_security_group_ids = ["sg-8064fdee"]
}
```

---

## 4\. Plan and Verify

Run a plan to ensure there’s no drift between your configuration and real infrastructure:

```
$ tofu plan
aws_instance.webserver-2: Refreshing state... [id=i-02613be10d5326f7]
-------------------------------------------------------------------------------
No changes. Your infrastructure matches the configuration.


OpenTofu has compared your real infrastructure against your configuration and found no differences, so no changes are needed.
```

Your EC2 instance is now managed by OpenTofu. For future changes:

1.  Modify the `.tf` file.
2.  Run `tofu plan` to preview.
3.  Apply with `tofu apply`.

---

OpenTofu also supports the `import` block directly in your configuration. During `tofu plan`, it prepares the import; during `tofu apply`, it brings the resource into state automatically.

```
import {
  to = aws_instance.example
  id = "i-abcd1234"
}


resource "aws_instance" "example" {
  name = "my_instance"
  # other arguments...
}
```

After applying, you can remove the `import` block or leave it as documentation of the resource’s origin.

---

## Links and References

- [OpenTofu Documentation](https://github.com/opentofu/opentofu)
- [Terraform Import Guide](https://www.terraform.io/cli/import)
- [AWS EC2 User Guide](https://docs.aws.amazon.com/ec2/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/0fda982f-8bb2-4b57-8009-996870d27e43/lesson/9e8f8302-506f-43b0-9e27-8bff879033df)**
>
> Watch video content
