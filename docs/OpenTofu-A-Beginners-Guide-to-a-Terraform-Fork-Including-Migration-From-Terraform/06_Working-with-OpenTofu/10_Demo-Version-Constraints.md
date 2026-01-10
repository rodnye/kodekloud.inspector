# Demo Version Constraints - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform/Working-with-OpenTofu/Demo-Version-Constraints)

---

## Table of Contents

- Demo Version Constraints
  - Table of Contents
  - 1. Inspect a Hardcoded Provider Version
  - 2. Determine the Downloaded Provider Version
  - 3. Valid Version Constraint Operators
  - 4. Exclude a Specific Provider Version
  - 5. Combined Constraints for Kubernetes and Helm
  - References
  - Watch Video
  - Practice Lab

---

## Content

OpenTofu: A Beginners Guide to a Terraform Fork Including Migration From Terraform

Working with OpenTofu

# Demo Version Constraints

In this lesson, we'll explore how to inspect and manage provider version constraints using OpenTofu. By reviewing multiple project folders and HCL configurations, you'll learn how Terraform selects and downloads specific provider versions.

## Table of Contents

1.  Inspect a Hardcoded Provider Version
2.  Determine the Downloaded Provider Version
3.  Valid Version Constraint Operators
4.  Exclude a Specific Provider Version
5.  Combined Constraints for Kubernetes and Helm

---

## 1\. Inspect a Hardcoded Provider Version

Navigate to `/root/OpenTofu_project/omega` and open the `main.tf` file. You’ll find a fixed provider version:

```
terraform {
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "1.2.2"
    }
  }
}


resource "local_file" "innovation" {
  filename = var.path
  content  = var.message
}
```

Which version of the `hashicorp/local` provider is specified?  
**Answer:** `1.2.2`

> [!important]
> **Tip**
>
> Hardcoding a provider version ensures reproducible builds but may require manual updates for new features.

---

## 2\. Determine the Downloaded Provider Version

Switch to `/root/OpenTofu_project/rotate`, where the project is already initialized with `opentofu init`. Inspect `rotation.tf`:

```
terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = ">= 3.45.0, < 3.46.0"
    }
  }
}


resource "google_compute_instance" "special" {
  name         = "aone"
  machine_type = "e2-micro"
  zone         = "us-west1-c"
}
```

The constraint allows any release between 3.45.0 (inclusive) and 3.46.0 (exclusive). To verify the actual version downloaded, look in:

```
.terraform/providers/registry.terraform.io/hashicorp/google
```

**Downloaded version:** `3.45.1`  
_(The exact patch version may vary based on the registry state.)_

---

## 3\. Valid Version Constraint Operators

Terraform supports a set of operators for version constraints. Use the table below to identify which one is invalid in OpenTofu/Terraform HCL:

| Operator | Description                        | Valid?     |
| -------- | ---------------------------------- | ---------- |
| `!=`     | Not equal                          | ✅ Valid   |
| `>=`     | Greater than or equal              | ✅ Valid   |
| `<=`     | Less than or equal                 | ✅ Valid   |
| `<`      | Less than                          | ✅ Valid   |
| `~>`     | Pessimistic operator (major/minor) | ✅ Valid   |
| `==`     | Exact match (double equals)        | ❌ Invalid |

**Answer:** `==` is **not** a valid version constraint operator.

---

## 4\. Exclude a Specific Provider Version

In `/root/OpenTofu_project/Nautilus`, you need to avoid AWS provider version `3.17.0`. Apply the `!=` operator:

```
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "!= 3.17.0"
    }
  }
}
```

This configuration excludes exactly version `3.17.0` while allowing all other releases.

---

## 5\. Combined Constraints for Kubernetes and Helm

Open `/root/OpenTofu_project/Lexicorp` and review the HCL:

```
terraform {
  required_providers {
    k8s = {
      source  = "hashicorp/kubernetes"
      version = ">= 1.12.0, < 1.13.0"
    }


    helm = {
      source  = "hashicorp/helm"
      version = "~> 1.2.0"
    }
  }
}


resource "aws_ebs_volume" "soft-volume" {
  availability_zone = "us-west-2a"
  size              = 15
  tags = {
    Name = "temporary"
  }
}
```

- **Kubernetes (`hashicorp/kubernetes`)**: Constraint `>= 1.12.0, < 1.13.0` selects the latest `1.12.x` (e.g., `1.12.8`).
- **Helm (`hashicorp/helm`)**: Pessimistic `~> 1.2.0` allows any `>= 1.2.0, < 1.3.0`, selecting the latest `1.2.x` (e.g., `1.2.4`).

To confirm the current Helm provider versions, check the official documentation:

![The image shows a webpage displaying Helm documentation, including a list of version histories and a section on provider usage with code snippets.](https://kodekloud.com/kk-media/image/upload/v1752882907/notes-assets/images/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform-Demo-Version-Constraints/helm-documentation-version-history-provider-usage.jpg)

**Answers:**

- Kubernetes provider version: **1.12.x** (latest patch)
- Helm provider version: **1.2.4**

---

## References

- [Terraform Version Constraints](https://www.terraform.io/language/expressions/version-constraints)
- [OpenTofu GitHub Repository](https://github.com/OpenTofu)
- [HashiCorp Provider Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/69432d48-55d0-4340-a56d-9f9a7819d26c/lesson/4d2bf6f0-f60f-4734-99b5-16b3064e393c)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/69432d48-55d0-4340-a56d-9f9a7819d26c/lesson/1a48929a-5855-4c1a-ade1-5e804298942f)**
>
> Practice lab
