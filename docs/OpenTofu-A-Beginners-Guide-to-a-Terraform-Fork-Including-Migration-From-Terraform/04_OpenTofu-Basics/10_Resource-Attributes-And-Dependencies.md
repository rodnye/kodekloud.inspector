# Resource Attributes And Dependencies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform/OpenTofu-Basics/Resource-Attributes-And-Dependencies)

---

## Table of Contents

- Resource Attributes And Dependencies
  - Exported Attributes
  - Referencing Exported Attributes
  - Implicit Dependencies in Action
  - Explicit Dependencies with depends_on
  - Links and References
  - Watch Video

---

## Content

OpenTofu: A Beginners Guide to a Terraform Fork Including Migration From Terraform

OpenTofu Basics

# Resource Attributes And Dependencies

In this lesson, we’ll explore how OpenTofu records resource attributes and manages dependencies during provisioning. Understanding these concepts is key to writing reliable Infrastructure as Code.

## Exported Attributes

When you define a resource in OpenTofu, several attributes are exported after creation. For example, create an AWS key pair:

```
resource "aws_key_pair" "alpha" {
  key_name   = "alpha"
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAAADAQABAAABAQD3.....alpha@a-server"
}
```

Here, `public_key` is a required argument. After running `tofu apply`, inspect the exported values using:

```
tofu show
```

Example output:

```
# aws_key_pair.alpha:
resource "aws_key_pair" "alpha" {
  arn         = "arn:aws:ec2:us-east-1:key-pair/alpha"
  fingerprint = "d7:ff:a6:63:18:64:9c:57:a1:ee:ca:a4:ad:c2:81:62"
  id          = "alpha"
  key_name    = "alpha"
  public_key  = "ssh-rsa AAAAB3NzaC1yc2EAAAAADAQABAAABAQD3F6ty... alpha@a-server"
  tags_all    = {}
}
```

| Attribute     | Description                                      |
| ------------- | ------------------------------------------------ |
| arn           | Amazon Resource Name for the key pair            |
| fingerprint   | SHA1 fingerprint of the public key               |
| id            | Unique identifier (same as `key_name`)           |
| key\\\_name   | Name assigned to the key pair                    |
| public\\\_key | SSH public key supplied by the user              |
| tags\\\_all   | Combined map of resource and provider-level tags |

> [!important]
> **Tip**
>
> You can target a specific resource by running `tofu show aws_key_pair.alpha`.
> Learn more in the \[OpenTofu CLI Docs\].

## Referencing Exported Attributes

Exported attributes become inputs for other resources. For instance, associate the key pair with an EC2 instance:

```
resource "aws_instance" "cerberus" {
  ami           = var.ami
  instance_type = var.instance_type
  key_name      = aws_key_pair.alpha.key_name
}
```

The reference `aws_key_pair.alpha.key_name` follows the format:

```
resource_type.resource_name.attribute
```

This creates an **implicit dependency**, ensuring `aws_key_pair.alpha` is created before `aws_instance.cerberus`.

## Implicit Dependencies in Action

When you run `tofu apply`, OpenTofu will build the dependency graph and provision resources in the correct order:

```
$ tofu apply
aws_key_pair.alpha: Creating...
aws_key_pair.alpha: Creation complete after 1s [id=alpha]
aws_instance.cerberus: Creating...
aws_instance.cerberus: Creation complete after 10s [id=i-c791dc46a6639d4a7]
Apply complete! Resources: 2 added, 0 changed, 0 destroyed
```

During `tofu destroy`, the reverse order is applied: the EC2 instance is terminated before the key pair.

> [!important]
> **Understanding the Dependency Graph**
>
> Implicit dependencies eliminate race conditions and ensure resources are created or destroyed in the correct sequence.
> Read more about the \[AWS Provider\] for detailed attribute information.

## Explicit Dependencies with `depends_on`

If resources lack direct attribute references but still require ordering, use the `depends_on` meta-argument:

```
resource "aws_instance" "db" {
  ami           = var.db_ami
  instance_type = var.db_instance_type
}


resource "aws_instance" "web" {
  ami           = var.web_ami
  instance_type = var.web_instance_type


  depends_on = [
    aws_instance.db
  ]
}
```

Here, `aws_instance.web` will wait for `aws_instance.db` to finish creation first.

> [!important]
> **Use \`depends_on\` Sparingly**
>
> Overusing `depends_on` can complicate your configuration. Prefer implicit references whenever possible.
> For advanced dependency control, see the \[Infrastructure as Code\] best practices.

---

That’s it for this lesson on resource attributes and dependencies in OpenTofu. In the next module, we’ll cover **outputs** and **remote backends** to share state across your team.

## Links and References

- [OpenTofu CLI Docs](https://docs.opentofu.io/cli)
- [AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [Infrastructure as Code](https://en.wikipedia.org/wiki/Infrastructure_as_code)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/c3586b29-e450-4c95-bad9-91bdf332eb24/lesson/19c6f909-165d-43f8-82a8-37bb654d0145)**
>
> Watch video content
