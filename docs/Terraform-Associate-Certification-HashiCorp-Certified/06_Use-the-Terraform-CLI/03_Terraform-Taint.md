# Terraform Taint - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Associate-Certification-HashiCorp-Certified/Use-the-Terraform-CLI/Terraform-Taint)

---

## Table of Contents

- Terraform Taint
  - Scenario: Resource Creation Failure
  - Forcing Resource Recreation
  - Undoing a Taint
  - Additional Resources
  - Watch Video

---

## Content

Terraform Associate Certification: HashiCorp Certified

Use the Terraform CLI

# Terraform Taint

In this guide, we explore the use of Terraform's taint and untaint commands. These commands allow you to manage resources more effectively—whether to force a resource to be recreated after a creation failure or to address manual changes that affect resource integrity.

## Scenario: Resource Creation Failure

Imagine you run `terraform apply` and a resource fails to create. In the example below, a local provisioner is used to store the public IP of an EC2 instance in a file. If the resource creation fails—for example, because the file path specified in the provisioner command is incorrect—Terraform marks the resource as tainted.

Below is the HCL configuration for the EC2 instance with a local provisioner:

```
resource "aws_instance" "webserver-3" {
  ami           = "ami-0edab43b6fa892279"
  instance_type = "t2.micro"
  key_name      = "ws"
  provisioner "local-exec" {
    command = "echo ${aws_instance.webserver-3.public_ip} > /temp/pub_ip.txt"
  }
}
```

When you run the apply command, your output might look similar to this:

```
$ terraform apply
Plan: 1 to add, 0 to change, 0 to destroy.


aws_instance.webserver: Creating...
aws_instance.webserver: Still creating... [10s elapsed]
aws_instance.webserver: Still creating... [20s elapsed]
aws_instance.webserver: Still creating... [30s elapsed]
aws_instance.webserver: Provisioning with 'local-exec'...
aws_instance.webserver (local-exec): Executing: ["cmd" "/C" "echo 35.183.14.192 > /temp/pub_ip.txt"]
aws_instance.webserver (local-exec): The system cannot find the path specified.


Error: Error running command "echo 35.183.14.192 > /temp/pub_ip.txt": exit status 1. Output: The system cannot find the path specified.
```

Since the command in the provisioner failed, Terraform automatically marks the resource as tainted. Running `terraform plan` again will signal that this tainted resource will be replaced:

```
$ terraform plan
Refreshing Terraform state in-memory prior to plan...
The refreshed state will be used to calculate this plan, but will not be
persisted to local or remote state storage.


aws_instance.webserver: Refreshing state... [id=i-0dba2d5dc22a9a904]
--------------------------------------------------------------------------------


An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
    -/+ destroy and then create replacement


Terraform will perform the following actions:


  # aws_instance.webserver is tainted, so must be replaced
  -/+ resource "aws_instance" "webserver-3" {
```

> [!important]
> **Note**
>
> Even though the EC2 instance itself was successfully provisioned, the failure in the local-exec provisioner ensures that the entire resource is flagged for recreation.

## Forcing Resource Recreation

There may be situations where you make manual changes to a resource (for example, updating the Nginx version on an AWS instance) that require Terraform to recreate the resource. Instead of destroying the resource manually and running apply again, you can mark the resource as tainted using the `terraform taint` command.

The following example demonstrates how Terraform marks the resource for replacement:

```
$ terraform taint aws_instance.webserver
Resource instance aws_instance.webserver has been marked as tainted.


$ terraform plan
Refreshing Terraform state in-memory prior to plan...
The refreshed state will be used to calculate this plan, but will not be
persisted to local or remote state storage.
aws_instance.webserver: Refreshing state... [id=i-0fd3946f5b3ab8af8]
-------------------------------------------------------------------
An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
-/+ destroy and then create replacement


Terraform will perform the following actions:


  # aws_instance.webserver is tainted, so must be replaced
  -/+ resource "aws_instance" "webserver" {
```

## Undoing a Taint

If you later decide against recreating the resource, you can remove its tainted status using the `terraform untaint` command. This prevents the resource from being recreated during the next apply:

```
$ terraform untaint aws_instance.webserver
Resource instance aws_instance.webserver has been successfully untainted.
```

> [!important]
> **Tip**
>
> Using the taint and untaint commands gives you granular control over your infrastructure. This avoids unnecessary destruction and creation of resources, making your management process more efficient.

---

By understanding and utilizing these commands, you can maintain consistency and automation in your infrastructure management—all without manually destroying and recreating resources.

## Additional Resources

- [Terraform Documentation](https://www.terraform.io/docs)
- [AWS Provider Documentation](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [Terraform Basics](https://www.terraform.io/intro)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-associate-certification-hashicorp-certified/module/ed4291fc-57a9-43d3-abff-eb82bba4a679/lesson/0b66dc3f-bc86-4ae3-bdc3-3a141aa47324)**
>
> Watch video content
