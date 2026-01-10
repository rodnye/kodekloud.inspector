# Version Constraints - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Associate-Certification-HashiCorp-Certified/Terraform-Provider-Basics/Version-Constraints)

---

## Table of Contents

- Version Constraints
  - Enforcing a Specific Provider Version
  - Using Version Constraints
  - Watch Video
    - Excluding a Specific Version
    - Using Comparison Operators
    - Using the Pessimistic Constraint Operator

---

## Content

Terraform Associate Certification: HashiCorp Certified

Terraform Provider Basics

# Version Constraints

In this article, we explore how Terraform handles provider versions and version constraints. Terraform providers use a plugin-based infrastructure and are available from the public [Terraform Registry](https://registry.terraform.io/). By default, running the initialization command downloads the latest version of any required provider plugins.

Below is an example resource that uses the local provider without specifying a version constraint:

```
resource "local_file" "pet" {
  filename = "/root/pet.txt"
  content  = "We love pets!"
}
```

When you run:

```
$ terraform init
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

Because provider functionality may change drastically between versions, your Terraform configuration might not work as expected if a different version is used than originally written. To lock in a specific provider version, you can add a version constraint.

## Enforcing a Specific Provider Version

For example, if the registry's default for the local provider is version 2.0.0 but you want to use an older version (e.g., 1.4.0), follow these steps:

1.  Click on the "Use Provider" tab in the registry to copy the code snippet.
2.  Add a new `terraform` block to your configuration with a required_providers block that includes version constraints.

Below is an example that enforces version 1.4.0 for the local provider:

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

After updating your configuration, run:

```
$ terraform init
Initializing the backend...

Initializing provider plugins...
- Finding hashicorp/local versions matching "1.4.0"...
- Installing hashicorp/local v1.4.0...
- Installed hashicorp/local v1.4.0 (signed by HashiCorp)

Terraform has been successfully initialized!

You may now begin working with Terraform. Try running "terraform plan" to see any changes that are required for your infrastructure. All Terraform commands should work as expected.

If you ever set or change modules or backend configuration, rerun this command to reinitialize your working directory. Other commands will remind you if necessary.
```

With this configuration, Terraform downloads version 1.4.0 of the local provider during initialization.

> [!important]
> **Note**
>
> Using version constraints helps avoid unexpected breaking changes when new major provider versions are released.

## Using Version Constraints

Terraform supports various operators to control which provider versions are installed. Below are some practical examples.

### Excluding a Specific Version

To ensure that a particular version (e.g., 2.0.0) is never used, utilize the "not equal" operator:

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

Running `terraform init` with this constraint ensures that version 2.0.0 is excluded.

### Using Comparison Operators

You can also specify constraints using standard comparison operators. For example, to allow only versions less than 1.4.0:

```
terraform {
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "< 1.4.0"
    }
  }
}

resource "local_file" "pet" {
  filename = "/root/pet.txt"
  content  = "We love pets!"
}
```

Or, to allow any version greater than 1.2.0 and less than 2.0.0 while excluding version 1.4.0, combine multiple constraints:

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

Depending on available versions that satisfy the conditions, Terraform might, for example, install version 1.3.0.

### Using the Pessimistic Constraint Operator

Terraform supports the pessimistic constraint operator (`~>`), which allows you to specify a minimal version while permitting updates that do not modify the leftmost version digit. For example, the following configuration permits incremental updates to any version starting from 1.2 up to, but not including, 2.0:

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

If the registry provides only up to version 1.4.0, that is the version Terraform will download during initialization.

You can also be more precise with the operator. For example:

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

In this case, Terraform will consider versions starting from 1.2.0 up to (but not including) the next minor version, ensuring you always get the highest available incremental version within that range.

> [!important]
> **SEO Tip**
>
> Including descriptive version constraint explanations in your documentation improves both clarity for developers and your article's search engine visibility.

---

By applying these version constraints, you ensure that your Terraform configurations use the intended provider versions, preventing unwanted upgrades that could introduce breaking changes. This practice is essential for maintaining a stable and predictable infrastructure deployment workflow.

For further information, refer to the [Terraform Documentation](https://www.terraform.io/docs) and the [Terraform Registry](https://registry.terraform.io/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-associate-certification-hashicorp-certified/module/e442ec14-d1e8-4e05-9ae1-078f6f00b63a/lesson/790a534b-9e03-456c-805a-d1cbea36e686)**
>
> Watch video content
