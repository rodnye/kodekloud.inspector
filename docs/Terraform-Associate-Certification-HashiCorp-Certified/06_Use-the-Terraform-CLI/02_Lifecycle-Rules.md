# Lifecycle Rules - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Associate-Certification-HashiCorp-Certified/Use-the-Terraform-CLI/Lifecycle-Rules)

---

## Table of Contents

- Lifecycle Rules
  - Default Behavior in Terraform
  - Using Lifecycle Rules to Control Resource Behavior
  - Conclusion
  - Additional Resources
  - Watch Video
    - 1. Create Before Destroy
    - 2. Prevent Destroy
    - 3. Ignore Changes

---

## Content

Terraform Associate Certification: HashiCorp Certified

Use the Terraform CLI

# Lifecycle Rules

In this article, we explore various Terraform lifecycle rules and their role in managing resource creation and destruction. Understanding these rules is essential to preventing unwanted resource downtime and ensuring smooth infrastructure updates.

![The image features the text "Lifecycle Rules" on a purple background with layered hexagonal shapes.](https://kodekloud.com/kk-media/image/upload/v1752884172/notes-assets/images/Terraform-Associate-Certification-HashiCorp-Certified-Lifecycle-Rules/frame_0.jpg)

## Default Behavior in Terraform

By default, when a resource attribute (like an AMI for an EC2 instance) changes, Terraform destroys the existing resource and creates a new one. Consider the following basic EC2 instance configuration:

```
resource "aws_instance" "cerberus" {
  ami           = "ami-06178cf087598769c"
  instance_type = "m5.large"

  tags = {
    Name = "Cerberus-Webserver"
  }
}
```

Changing the AMI in the above configuration and running `terraform apply` leads to the existing instance being destroyed first, followed by the creation of a new one.

## Using Lifecycle Rules to Control Resource Behavior

Terraform allows you to modify the default behavior with lifecycle rules. Below are some common lifecycle rules and their use cases.

### 1\. Create Before Destroy

To ensure a new resource is created before destroying the current one, you can use the `create_before_destroy` lifecycle rule. This ensures minimal downtime during updates.

> [!important]
> **Tip**
>
> When updating critical resources, using `create_before_destroy` can help maintain availability.

Update the resource as shown below:

```
resource "aws_instance" "cerberus" {
  ami           = "ami-2158cf087598787a"
  instance_type = "m5.large"


  tags = {
    Name = "Cerberus-Webserver"
  }


  lifecycle {
    create_before_destroy = true
  }
}
```

Running `terraform apply` now creates a new instance before terminating the old one:

```
$ terraform apply
aws_instance.cerberus: Refreshing state... [id=i-a6e22ec5303190252]
An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  +/- create replacement and then destroy


Terraform will perform the following actions:


  # aws_instance.cerberus must be replaced
  +/- resource "aws_instance" "cerberus" {
      ~ ami           = "ami-06178cf087598769c" -> "ami-2158cf087598787a" # forces replacement
      ...
  }


Plan: 1 to add, 0 to change, 1 to destroy.


aws_instance.cerberus: Creating...
aws_instance.cerberus: Still creating... [10s elapsed]
aws_instance.cerberus: Creation complete after 10s [id=i-477150603640c964f4].
aws_instance.cerberus: Destroying... [id=i-a6e22ec5303190252]
aws_instance.cerberus: Still destroying... [id=i-a6e22ec5303190252]
aws_instance.cerberus: Destruction complete after 10s


Apply complete! Resources: 1 added, 0 changed, 1 destroyed.
```

### 2\. Prevent Destroy

For critical resources that should never be deleted accidentally, the `prevent_destroy` lifecycle rule comes into play. Adding this rule causes Terraform to reject any plan that would destroy a protected resource.

```
resource "aws_instance" "cerberus" {
  ami           = "ami-2158cf087598787a"
  instance_type = "m5.large"


  tags = {
    Name = "Cerberus-Webserver"
  }


  lifecycle {
    prevent_destroy = true
  }
}
```

> [!important]
> **Warning**
>
> Remember, `prevent_destroy` only protects against deletions during configuration changes with `terraform apply`. It does not override the `terraform destroy` command.

### 3\. Ignore Changes

In some scenarios, you might not want Terraform to act on certain changes. For example, if you prefer that changes to the instance's tags not trigger an update, use the `ignore_changes` rule:

```
resource "aws_instance" "cerberus" {
  ami           = "ami-2158cf087598787a"
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

With `ignore_changes` set for tags, any modifications to the tags—whether from your configuration file or directly on the resource—will be disregarded during the next apply. An example output might be:

```
$ terraform apply
aws_instance.webserver: Refreshing state... [id=i-05cd83b221911acd5]
Apply complete! Resources: 0 added, 0 changed, 0 destroyed.
```

You can extend this rule to include multiple attributes or even use the `all` keyword to ignore all changes to a resource.

## Conclusion

Terraform lifecycle rules provide flexibility to control resource updates, replacements, and destruction. By strategically using rules like `create_before_destroy`, `prevent_destroy`, and `ignore_changes`, you can minimize downtime and safeguard critical infrastructure.

That concludes this overview of Terraform lifecycle rules. Please proceed to the multiple-choice quiz for this section.

---

## Additional Resources

- [Terraform Documentation](https://www.terraform.io/docs)
- [AWS Instance Configuration](https://aws.amazon.com/ec2/)
- [HashiCorp Configuration Language (HCL)](https://www.terraform.io/language)

Happy Terraforming!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-associate-certification-hashicorp-certified/module/ed4291fc-57a9-43d3-abff-eb82bba4a679/lesson/1b6fc6ca-bff0-40b3-a9a5-d9f5c6cc911d)**
>
> Watch video content
