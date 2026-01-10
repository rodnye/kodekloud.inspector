# Version Constraints - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform/Working-with-OpenTofu/Version-Constraints)

---

## Table of Contents

- Version Constraints
  - Default Provider Selection
  - Pinning a Specific Provider Version
  - Version Constraint Operators
  - References
  - Watch Video
    - Excluding a Specific Version
    - Using Comparison Operators
    - Combining Multiple Constraints
    - Pessimistic Constraint Operator
      - Example: ~> 2.2
      - Example: ~> 2.2.0

---

## Content

OpenTofu: A Beginners Guide to a Terraform Fork Including Migration From Terraform

Working with OpenTofu

# Version Constraints

Managing provider versions ensures consistent, reproducible infrastructure deployments. In this guide, you’ll learn how OpenTofu selects providers by default, pins specific versions, and applies version constraints using operators and ranges.

## Default Provider Selection

When you run `tofu init` without specifying versions, OpenTofu automatically downloads the latest available provider releases referenced in your configuration:

```
resource "local_file" "pet" {
  filename = "/root/pets.txt"
  content  = "We love pets!"
}
```

Initializing:

```
$ tofu init
Initializing the backend...


Initializing provider plugins...
- Finding latest version of hashicorp/local...
- Installing hashicorp/local v2.4.1...
- Installed hashicorp/local v2.4.1 (signed, key ID 0C0AF313E5FD9F80)


OpenTofu has created a lock file .terraform.lock.hcl to record the provider selections.
Include this file in version control to guarantee the same plugin versions across runs.


OpenTofu has been successfully initialized!
```

> [!important]
> **Note**
>
> The `.terraform.lock.hcl` file locks provider versions for reproducible builds. Commit it alongside your configuration.

## Pinning a Specific Provider Version

To force a particular provider release (e.g., `hashicorp/local` v2.3.0), declare it in the `terraform` block under `required_providers`:

```
terraform {
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "2.3.0"
    }
  }
}


resource "local_file" "pet" {
  filename = "/root/pets.txt"
  content  = "We love pets!"
}
```

Re-running initialization:

```
$ tofu init
Initializing the backend...


Initializing provider plugins...
- Finding latest version of hashicorp/local...
- Installing hashicorp/local v2.3.0...
- Installed hashicorp/local v2.3.0 (signed, key ID 0CAAF313E5FD9F80)


OpenTofu has been successfully initialized!
```

## Version Constraint Operators

OpenTofu supports standard Terraform constraint operators to control allowed provider versions:

| Operator | Description                      | Example Constraint            |
| -------- | -------------------------------- | ----------------------------- |
| !=       | Exclude a specific version       | `!= 2.4.1`                    |
| <        | Less than a version              | `< 2.4.1`                     |
| \\>      | Greater than a version           | `> 2.3.0`                     |
| <=, >=   | Inclusive comparison             | `>= 2.2.3`                    |
| ~>       | Pessimistic (compatible updates) | `~> 2.2` or `~> 2.2.0`        |
| Range    | Combine multiple operators       | `>= 2.2.3, != 2.4.0, < 2.4.1` |

### Excluding a Specific Version

Prevent OpenTofu from installing v2.4.1:

```
terraform {
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "!= 2.4.1"
    }
  }
}


resource "local_file" "pet" {
  filename = "/root/pets.txt"
  content  = "We love pets!"
}
```

OpenTofu will select the next available version (for example, v2.4.0).

### Using Comparison Operators

Require any version **less than** v2.4.1:

```
terraform {
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "< 2.4.1"
    }
  }
}


resource "local_file" "pet" {
  filename = "/root/pets.txt"
  content  = "We love pets!"
}
```

Require any version **greater than** v2.3.0:

```
terraform {
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "> 2.3.0"
    }
  }
}


resource "local_file" "pet" {
  filename = "/root/pets.txt"
  content  = "We love pets!"
}
```

### Combining Multiple Constraints

Enforce a range: versions at or above v2.2.3, below v2.4.1, and exclude v2.4.0:

```
terraform {
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = ">= 2.2.3, != 2.4.0, < 2.4.1"
    }
  }
}


resource "local_file" "pet" {
  filename = "/root/pets.txt"
  content  = "We love pets!"
}
```

OpenTofu will pick v2.3.0 to satisfy all constraints.

### Pessimistic Constraint Operator

The pessimistic operator `~>` locks the major version and allows compatible minor or patch updates:

#### Example: `~> 2.2`

```
terraform {
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.2"
    }
  }
}


resource "local_file" "pet" {
  filename = "/root/pets.txt"
  content  = "We love pets!"
}
```

This accepts any `>= 2.2.0` and `< 3.0.0`, including patch releases like 2.4.1.

#### Example: `~> 2.2.0`

```
terraform {
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.2.0"
    }
  }
}


resource "local_file" "pet" {
  filename = "/root/pets.txt"
  content  = "We love pets!"
}
```

This restricts updates to the 2.2.x series (e.g., v2.2.3).

Initializing with a pessimistic constraint:

```
$ tofu init
Initializing the backend...


Initializing provider plugins...
- Finding hashicorp/local versions matching "~> 2.2.0"...
- Installing hashicorp/local v2.2.3...
- Installed hashicorp/local v2.2.3 (signed, key ID 0CAAF313E5FD9F80)


OpenTofu has been successfully initialized!
```

> [!important]
> **Warning**
>
> Overly restrictive constraints can prevent you from receiving important bug fixes or security updates. Balance stability with flexibility.

## References

- [OpenTofu CLI: Provider Signing](https://opentofu.org/docs/cli/plugins/signing/)
- [Terraform Version Constraints](https://www.terraform.io/language/providers/requirements)
- [Kubernetes Documentation](https://kubernetes.io/docs/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/69432d48-55d0-4340-a56d-9f9a7819d26c/lesson/12d63e59-cf59-4df8-bfa8-3216cae1d003)**
>
> Watch video content
