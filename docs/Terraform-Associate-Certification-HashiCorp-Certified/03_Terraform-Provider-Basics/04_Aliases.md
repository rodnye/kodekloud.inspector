# Aliases - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Associate-Certification-HashiCorp-Certified/Terraform-Provider-Basics/Aliases)

---

## Table of Contents

- Aliases
  - Watch Video

---

## Content

Terraform Associate Certification: HashiCorp Certified

Terraform Provider Basics

# Aliases

In this lesson, we delve into using provider aliases in Terraform to manage resources across multiple regions. Previously, we covered specifying provider versions using version constraints. Now, we will see how to provision resources in different AWS regions by configuring multiple instances of the same provider.

Consider the following scenario: you have a simple Terraform configuration with two resource blocks. The first block creates an AWS EC2 key pair in the US East 1 region, while the second block is intended to create a key pair in the CA Central 1 region. By default, if you only define one provider block (e.g., for the US East 1 region), both resource blocks would be provisioned in that same region.

> [!important]
> **Understanding the Default Behavior**
>
> Without any modifications, Terraform uses the default provider configuration for all resources. This means that if you don't specify otherwise, all resources will be created in the defined default region.

To create a resource in the CA Central 1 region using an aliased provider configuration, you need to define a second provider block with the appropriate region and an alias. Below is an example of how to set up the providers and resources:

```
resource "aws_key_pair" "alpha" {
  key_name   = "alpha"
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQ...alpha@a-server"
}

resource "aws_key_pair" "beta" {
  key_name   = "beta"
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQAB"
}

provider "aws" {
  region = "us-east-1"
}

provider "aws" {
  region = "ca-central-1"
  alias  = "central"
}
```

Notice the alias "central" in the second provider block. To ensure that the "beta" resource is created in the CA Central region, add a `provider` argument within its configuration that references the aliased provider using the syntax: `provider_name.alias`. For instance:

```
resource "aws_key_pair" "beta" {
  provider   = aws.central
  key_name   = "beta"
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQAB"
}
```

> [!important]
> **Key Concept**
>
> By specifying the `provider = aws.central` argument in the "beta" resource block, Terraform knows to use the aliased provider configured for the CA Central 1 region, while resources without a provider argument use the default provider (US East 1).

After running `terraform apply`, Terraform provisions the resources as specified:

- The key pair "alpha" is created in the US East 1 region.
- The key pair "beta" is created in the CA Central 1 region using the aliased provider.

To view the details of the provisioned resources, execute:

```
$ terraform show

# aws_key_pair.alpha:
resource "aws_key_pair" "alpha" {
  arn         = "arn:aws:ec2::us-east-1::key-pair/alpha"
  fingerprint = "d7:ff:a6:63:18:64:9c:57:a1:ee:ca:a4:ad:c2:81:62"
  id          = "alpha"
  key_name    = "alpha"
  public_key  = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDJ3F6tyPEFEzV0LX3X8BsXdMsQz1x2CeikKDEY0aIj41qgxMCP/iteneqXSIFZBp5vizPvaoIR3Um9xK7PGoW8giupGn+EPuxIA4cDM4VzOQoikMhz5XK0WhEjkVzTo4+S0puvDZuWIsdiW9mxhJc7tgBNL0cV1WSYVkz4G/fs1NfRPW5mYAM49f4fhtxPb5ok4Q2Lg9dPKVHO/Bgeu5woMc7RY0p1ej6D4CKF61ymSDJpw0HYX/wqE9+cfEauh7xZcG0q9t2ta6F6fmX0agvFyZo8aFbXeUBr7osSCJNgvavlWbM/06niWr0vYX2xwW"
  tags_all    = {}
}

# aws_key_pair.beta:
resource "aws_key_pair" "beta" {
  arn         = "arn:aws:ec2:ca-central-1::key-pair/beta"
  fingerprint = "d7:ff:a6:63:18:64:9c:57:a1:ee:ca:a4:ad:c2:81:62"
  id          = "beta"
  key_name    = "beta"
  public_key  = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDJ3F6tyPEFEzV0LX3X8BsXdMsQz1x2CeikKDEY0aIj41qgxMCP/iteneqXSIFZBp5vizPvaoIR3Um9xK7PGoW8giupGn+EPuxIA4cDM4VzOQoikMhz5XK0WhEjkVzTo4+S0puvDZuWIsdiW9mxhJc7tgBNL0cV1WSYVkz4G/fs1NfRPW5mYAM49f4fhtxPb5ok4Q2Lg9dPKVHO/Bgeu5woMc7RY0p1ej6D4CKF61ymSDJpw0HYX/wqE9+cfEauh7xZcG0q9t2ta6F6fmX0agvFyZo8aFbXeUBr7osSCJNgvavlWbM/06niWr0vYX2xwW"
  tags_all    = {}
}
```

In summary, using provider aliases in Terraform allows you to manage resources across different regions seamlessly. This approach is especially useful when working with large-scale, multi-region deployments.

That concludes this lesson on Terraform provider aliases.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-associate-certification-hashicorp-certified/module/e442ec14-d1e8-4e05-9ae1-078f6f00b63a/lesson/9810e0f2-6d39-483a-987c-095a80c454d7)**
>
> Watch video content
