# Multiple Providers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Associate-Certification-HashiCorp-Certified/Terraform-Provider-Basics/Multiple-Providers)

---

## Table of Contents

- Multiple Providers
  - Overview
  - Example Configuration
  - Execution Workflow
  - Linking Resources Across Providers
  - Conclusion
  - Watch Video

---

## Content

Terraform Associate Certification: HashiCorp Certified

Terraform Provider Basics

# Multiple Providers

In this lesson, you'll learn how to configure and use multiple providers within a single Terraform setup. Leveraging multiple providers enables you to provision and manage resources across different platforms simultaneously, thereby enhancing your infrastructure’s flexibility and scalability.

## Overview

Terraform allows you to define resources from various providers in a single configuration file. In the example below, the configuration file includes two resource blocks: one managed by the local provider and another by the random provider.

> [!important]
> **Tip**
>
> When adding a new provider, Terraform automatically downloads and installs the necessary plugin during initialization.

## Example Configuration

Below is an updated snippet from your `main.tf` file which includes a resource for creating a local file and another for generating a random pet name:

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

During initialization, Terraform detects that the local provider is already installed and proceeds to download the random provider plugin if it’s not already available. Running the `terraform init` command produces output similar to the following:

```
$ terraform init
Initializing the backend...

Initializing provider plugins...
- Using previously-installed hashicorp/local v2.0.0
- Finding latest version of hashicorp/random...
- Installing hashicorp/random v2.3.0...
- Installed hashicorp/random v2.3.0 (signed by HashiCorp)

The following providers do not have any version constraints in configuration,
so the latest version was installed.

To prevent automatic upgrades to new major versions that may contain
breaking changes, we recommend adding version constraints in a required_providers
block in your configuration, with the constraint strings suggested below.

* hashicorp/local: version = "~> 2.0.0"
* hashicorp/random: version = "~> 2.3.0"

Terraform has been successfully initialized!
```

## Execution Workflow

After initialization, the workflow is consistent regardless of the number of resources or providers included. The typical sequence is:

1.  Run `terraform plan` to preview the changes.
2.  Run `terraform apply` to create or update the resources.

When applying the configuration, Terraform refreshes the state of existing resources and creates any new ones. For instance, when `terraform apply` is executed in this scenario, Terraform generates a random pet name and creates the corresponding resource:

```
$ terraform apply
local_file.pet: Refreshing state... [id=d1a31467f206d6ea8ab1cad382bc106bf46df69]

An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # random_pet.my-pet will be created
  + resource "random_pet" "my-pet" {
      + id        = (known after apply)
      + length    = 1
      + prefix    = "Mrs"
      + separator = "."
    }

Plan: 1 to add, 0 to change, 0 to destroy.

random_pet.my-pet: Creating...
random_pet.my-pet: Creation complete after 0s [id=Mrs.hen]

Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
```

In the output, the `id` attribute for the random pet resource is generated only after the apply process completes. Attributes like this are useful for referencing in other parts of your configuration, ensuring that resource dependencies and data flows are maintained.

## Linking Resources Across Providers

You can also link resources from different providers by referencing their generated attributes. The following example demonstrates this by creating a random string using the random provider and then utilizing that string to tag an AWS instance:

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

When `terraform apply` is executed with this configuration, Terraform generates the random string and applies it as a tag to the AWS instance resource. This effectively demonstrates how resource attribute references can bridge resources managed by different providers.

> [!important]
> **SEO Tip**
>
> For enhanced search engine optimization and user engagement, ensure that your Terraform configuration documentation includes clear, concise headings and detailed examples. Reference related documentation such as [Terraform Providers](https://www.terraform.io/docs/providers/index.html) and [AWS Instances](https://aws.amazon.com/ec2/) for additional context.

## Conclusion

This lesson covered how to use multiple providers in Terraform. You learned how to add new providers to your configuration, how Terraform initializes and uses these providers, and how to link resources across different platforms. Proceed to the multiple-choice questions to test your understanding of managing multiple providers in Terraform.

Thank you.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-associate-certification-hashicorp-certified/module/e442ec14-d1e8-4e05-9ae1-078f6f00b63a/lesson/1e0f0f6e-5a49-4c01-9e72-45761a5b4001)**
>
> Watch video content
