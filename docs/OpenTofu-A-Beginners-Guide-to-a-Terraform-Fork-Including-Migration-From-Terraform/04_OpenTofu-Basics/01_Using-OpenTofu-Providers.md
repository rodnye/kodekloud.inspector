# Using OpenTofu Providers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform/OpenTofu-Basics/Using-OpenTofu-Providers)

---

## Table of Contents

- Using OpenTofu Providers
  - 1. Initializing Your Directory
  - 2. Provider Types
  - 3. Plugin Naming Conventions
  - 4. References
  - Watch Video
    - Examples

---

## Content

OpenTofu: A Beginners Guide to a Terraform Fork Including Migration From Terraform

OpenTofu Basics

# Using OpenTofu Providers

OpenTofu relies on a plugin-based architecture to manage providers, enabling you to provision resources across AWS, GCP, Azure, and many more platforms. This guide covers how to initialize your working directory, understand provider types, and reference provider plugins in your configurations.

## 1\. Initializing Your Directory

Run the following command in a directory containing your OpenTofu configuration files:

```
tofu init
```

When executed against valid `.tf` files, `tofu init` will:

- Install all required provider plugins.
- Create a lock file (`.terraform.lock.hcl`) to pin provider versions.
- Ensure idempotent behavior: rerunning does not alter existing infrastructure.

```
$ tofu init

Initializing the backend...

Initializing provider plugins...
- Finding the latest version of hashicorp/local...
- Installing hashicorp/local v2.4.1...
- Installed hashicorp/local v2.4.1 (signed, key ID 0C0AF313E5FD9F80)

Providers are signed by their developers.
If you'd like to know more about provider signing, see:
  https://opentofu.org/docs/cli/plugins/signing/

OpenTofu has created a lock file .terraform.lock.hcl to record the provider
selections it made above. Include this file in your version control repository
so that OpenTofu can guarantee the same selections next time you run "tofu init".

OpenTofu has been successfully initialized!
```

> [!important]
> **Note**
>
> Always commit the `.terraform.lock.hcl` file to your VCS. This ensures consistent provider versions across environments.

Plugins are stored under the hidden directory `.terraform/providers` in your working directory.

## 2\. Provider Types

Providers are distributed via [Terraform Registry](https://registry.terraform.io/) and [OpenTofu Registry](https://registry.opentofu.org/), and fall into three categories:

| Provider Type | Maintainer                          | Registry Badge  |
| ------------- | ----------------------------------- | --------------- |
| Official      | HashiCorp                           | Official badge  |
| Verified      | Third-party (reviewed by HashiCorp) | Checkmark badge |
| Community     | Individual contributors             | No badge        |

![The image is a diagram showing HashiCorp's providers, including AWS, Google Cloud, Azure, and others, leading to the Terraform and OpenTofu registries.](https://kodekloud.com/kk-media/image/upload/v1752882833/notes-assets/images/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform-Using-OpenTofu-Providers/hashicorp-providers-terraform-diagram.jpg)

## 3\. Plugin Naming Conventions

Each provider is referenced by a source address with this structure:

```
<hostname>/<namespace>/<type>
```

- **hostname** (optional): Defaults to `registry.opentofu.org` if omitted.
- **namespace**: Organization or author (e.g., `hashicorp`).
- **type**: Provider name (e.g., `aws`, `local`).

### Examples

Using the **default registry**:

```
terraform {
  required_providers {
    local = {
      source  = "hashicorp/local"  # Implicitly registry.opentofu.org
      version = "~> 2.4.0"
    }
  }
}
```

Using the **fully qualified** address:

```
terraform {
  required_providers {
    local = {
      source  = "registry.opentofu.org/hashicorp/local"
      version = "~> 2.4.0"
    }
  }
}
```

## 4\. References

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/c3586b29-e450-4c95-bad9-91bdf332eb24/lesson/21846b0b-7e9c-4bea-84fa-c249512886c5)**
>
> Watch video content
