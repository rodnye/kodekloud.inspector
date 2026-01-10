# Version Constraints - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Basics-Training-Course/Working-with-Terraform/Version-Constraints)

---

## Table of Contents

- Version Constraints
  - Specifying a Specific Provider Version
  - Using Comparison Operators for Version Constraints
  - The Pessimistic Constraint Operator
  - Watch Video
  - Practice Lab

---

## Content

Terraform Basics Training Course

Working with Terraform

# Version Constraints

In this article, we explain how to specify provider versions in Terraform to ensure your configuration consistently uses the intended plugin version. By default, running the `terraform init` command downloads the latest provider plugins from the public Terraform Registry. This behavior, however, might lead to unexpected issues if newer provider versions introduce breaking changes. To prevent this, you can restrict provider versions using version constraints in your Terraform configuration.

Consider the basic Terraform configuration below that creates a local file:

```
resource "local_file" "pet" {
  filename = "/root/pet.txt"
  content  = "We love pets!"
}
```

When you run:

```
$ terraform init
```

you might see output similar to the following:

```
Initializing the backend...


Initializing provider plugins...
- Finding latest version of hashicorp/local...
- Installing hashicorp/local v1.4.0...
- Installed hashicorp/local v1.4.0 (signed by HashiCorp)


The following providers do not have any version constraints in configuration, so the latest version was installed.


To prevent automatic upgrades to new major versions that may contain breaking changes, we recommend adding version constraints in a required_providers block in your configuration, with the constraint strings suggested below.


* hashicorp/local: version = "~> 1.4.0"


Terraform has been successfully initialized!
```

> [!important]
> **Important**
>
> Always specify provider versions to ensure your Terraform configurations remain stable, especially if newer provider releases might introduce breaking changes.

Because provider functionalities can change drastically between versions, it is critical to use a specific version that you have thoroughly tested. Detailed instructions for each provider's versioning are available on the provider’s Terraform Registry page. For instance, if the default and latest version of the local provider is 2.0.0 but your configuration requires an older version such as 1.4.0, update your configuration accordingly.

## Specifying a Specific Provider Version

To enforce a particular version of the local provider (for example, version 1.4.0), include a `terraform` block with a `required_providers` sub-block. This block explicitly instructs Terraform which version to install. Consider the following configuration:

```
terraform {
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "1.4.0"
    }
  }
}


resource "local_file" "pet" {
  filename = "/root/pet.txt"
  content  = "We love pets!"
}
```

When you run `terraform init`, Terraform reads the configuration and installs version 1.4.0 of the local provider.

## Using Comparison Operators for Version Constraints

Terraform supports several comparison operators to manage provider version constraints. For example, if you want to exclude a specific version, you can use the not-equal operator. In the configuration below, Terraform is directed to avoid version 2.0.0:

```
terraform {
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "!= 2.0.0"
    }
  }
}


resource "local_file" "pet" {
  filename = "/root/pet.txt"
  content  = "We love pets!"
}
```

You can also combine comparison operators to define a version range. The following configuration tells Terraform to use any version greater than 1.2.0 but less than 2.0.0, explicitly excluding version 1.4.0:

```
terraform {
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "> 1.2.0, < 2.0.0, != 1.4.0"
    }
  }
}


resource "local_file" "pet" {
  filename = "/root/pet.txt"
  content  = "We love pets!"
}
```

In this setup, Terraform may choose version 1.3.0 if it is the highest acceptable version according to the defined constraints.

## The Pessimistic Constraint Operator

Terraform offers the pessimistic constraint operator (`~>`) to allow patch-level flexibility while preventing major version upgrades. For example, using the following configuration:

```
terraform {
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 1.2"
    }
  }
}


resource "local_file" "pet" {
  filename = "/root/pet.txt"
  content  = "We love pets!"
}
```

Terraform can use version 1.2 and any incremental versions such as 1.3 or 1.4, up to but not including 2.0. If the maximum available version in the registry is 1.4.0, that version will be installed.

If you want to tightly constrain the version (for example, only accepting versions from 1.2.0 up to 1.2.9), consider the following configuration:

```
terraform {
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 1.2.0"
    }
  }
}


resource "local_file" "pet" {
  filename = "/root/pet.txt"
  content  = "We love pets!"
}
```

In this configuration, Terraform will install version 1.2.2 if that is the highest version available within the defined range.

After updating your configuration, running:

```
$ terraform init
```

will produce output similar to this:

```
Initializing the backend...


Initializing provider plugins...
- Finding hashicorp/local versions matching "~> 1.2.0"...
- Installing hashicorp/local v1.2.2...
- Installed hashicorp/local v1.2.2 (signed by HashiCorp)


Terraform has been successfully initialized!
```

This output confirms that Terraform installed the specified version of the local provider.

> [!important]
> **SEO Tip**
>
> For more best practices on managing Terraform configurations and version constraints, explore additional resources and updated documentation on the [Terraform Registry](https://registry.terraform.io/) and [Terraform Documentation](https://www.terraform.io/docs).

That concludes our article on Terraform version constraints. To further reinforce your understanding, experiment with these versioning techniques in your Terraform practice environment to ensure your configurations remain stable over time.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/98de9b33-985e-4ec4-9903-b39856d309e8/lesson/5f532378-f63e-4302-863e-f021f3f6b35b)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/98de9b33-985e-4ec4-9903-b39856d309e8/lesson/0b6ae539-3d1d-437f-9dac-ee6c0907fd7d)**
>
> Practice lab
