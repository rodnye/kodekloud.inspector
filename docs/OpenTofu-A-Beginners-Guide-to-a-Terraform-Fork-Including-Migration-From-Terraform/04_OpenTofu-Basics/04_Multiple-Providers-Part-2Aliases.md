# Multiple Providers Part 2Aliases - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform/OpenTofu-Basics/Multiple-Providers-Part-2Aliases)

---

## Table of Contents

- Multiple Providers Part 2Aliases
  - 1. Declare Your Resources
  - 2. Configure the Default Provider
  - 3. Add an Aliased Provider
  - 4. Assign the Aliased Provider to a Resource
  - 5. Verify with tofu show
  - 6. Resource–Provider Mapping
  - Links and References
  - Watch Video

---

## Content

OpenTofu: A Beginners Guide to a Terraform Fork Including Migration From Terraform

OpenTofu Basics

# Multiple Providers Part 2Aliases

In this lesson, you’ll learn how to configure multiple AWS providers in a single OpenTofu setup using provider aliases. This lets you deploy resources—such as EC2 key pairs—to different regions (or accounts) without repeating your configuration.

## 1\. Declare Your Resources

First, define two AWS EC2 key pairs named `alpha` and `beta`:

```
resource "aws_key_pair" "alpha" {
  key_name   = "alpha"
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAAADAQABAAABQD3...alpha@a-server"
}


resource "aws_key_pair" "beta" {
  key_name   = "beta"
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAAADAQABAAABQD3...beta@b-server"
}
```

By default, both resources will target the same AWS provider.

## 2\. Configure the Default Provider

Specify the default AWS provider region:

```
provider "aws" {
  region = "us-east-1"
}
```

At this point, both `aws_key_pair.alpha` and `aws_key_pair.beta` will be created in **us-east-1**.

## 3\. Add an Aliased Provider

To deploy `beta` in a different region, add a second provider block with an `alias`:

```
provider "aws" {
  region = "us-east-1"
}


provider "aws" {
  alias  = "central"
  region = "ca-central-1"
}
```

- The first block remains the **default** (`us-east-1`).
- The second block is identified by `alias = "central"` and targets **ca-central-1**.

## 4\. Assign the Aliased Provider to a Resource

Use the `provider` meta-argument within your resource to select the aliased provider:

```
resource "aws_key_pair" "beta" {
  provider   = aws.central
  key_name   = "beta"
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAAADAQABAAABQD3...beta@b-server"
}
```

- `alpha` continues to use the **default** AWS provider (`us-east-1`).
- `beta` now uses the **aws.central** provider (`ca-central-1`).

> [!important]
> **Note**
>
> Provider aliases are ideal for multi-region or multi-account strategies in a single configuration. You can also combine aliases with workspaces or backends for more complex deployments.

## 5\. Verify with `tofu show`

After running `tofu apply`, inspect your deployed resources:

```
$ tofu show
# aws_key_pair.alpha:
resource "aws_key_pair" "alpha" {
  arn         = "arn:aws:ec2:us-east-1::key-pair/alpha"
  fingerprint = "d7:ff:a6:63:18:64:9c:57:a1:ee:ca:a4:ad:c2:81:62"
  id          = "alpha"
  key_name    = "alpha"
  public_key  = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQC3...Ov"
  tags_all    = {}
}


# aws_key_pair.beta:
resource "aws_key_pair" "beta" {
  arn         = "arn:aws:ec2:ca-central-1::key-pair/beta"
  fingerprint = "d7:ff:a6:63:18:64:9c:57:a1:ee:ca:a4:ad:c2:81:62"
  id          = "beta"
  key_name    = "beta"
  public_key  = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQC3...Ov"
  tags_all    = {}
}
```

Here, `alpha` appears in **us-east-1** (default) and `beta` in **ca-central-1** (aliased).

## 6\. Resource–Provider Mapping

| Resource                 | Provider Block      | Region       |
| ------------------------ | ------------------- | ------------ |
| aws\\\_key\\\_pair.alpha | aws (default)       | us-east-1    |
| aws\\\_key\\\_pair.beta  | aws.central (alias) | ca-central-1 |

> [!important]
> **Warning**
>
> Make sure your AWS credentials have permissions for each region or profile you target. Missing credentials can cause resource creation failures.

## Links and References

- [OpenTofu Provider Aliases](https://docs.opentofu.io/configuration/providers/#provider-aliases)
- [AWS Regions and Availability Zones](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html)
- [Terraform Providers Documentation](https://www.terraform.io/docs/language/providers/configuration.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/c3586b29-e450-4c95-bad9-91bdf332eb24/lesson/8c04d4c3-0f65-454a-95b3-b95dcdc21e6a)**
>
> Watch video content
