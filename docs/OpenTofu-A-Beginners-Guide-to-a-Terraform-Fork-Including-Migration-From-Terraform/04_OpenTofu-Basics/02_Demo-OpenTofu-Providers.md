# Demo OpenTofu Providers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform/OpenTofu-Basics/Demo-OpenTofu-Providers)

---

## Table of Contents

- Demo OpenTofu Providers
  - Prerequisites
  - 1. Counting Providers, Files, and Resources
  - 2. Creating Local File Resources
  - 3. Working with a New Configuration Directory
  - 4. Identifying Provider Modules
  - References
  - Watch Video
  - Practice Lab
    - 3.1 Adding an Xbox Resource

---

## Content

OpenTofu: A Beginners Guide to a Terraform Fork Including Migration From Terraform

OpenTofu Basics

# Demo OpenTofu Providers

In this lesson, we will:

1.  Inspect an OpenTofu configuration directory
2.  Count providers, configuration files, and resources
3.  Create local file resources
4.  Identify provider modules in specific directories

## Prerequisites

Ensure you have OpenTofu installed and accessible in your `$PATH`. We will work under:

```
/root/opentofu-project/things-to-do
```

Initially, this directory contains only `main.tf`.

> [!important]
> **Note**
>
> Always run `opentofu init` before performing other commands to download necessary provider plugins and create the `.terraform` folder.

---

## 1\. Counting Providers, Files, and Resources

Before running any commands, let’s answer a few questions:

| Question                                                        | Answer                    |
| --------------------------------------------------------------- | ------------------------- |
| How many providers are initialized before `opentofu init`?      | 0                         |
| After `opentofu init`, how many provider plugins are installed? | 1 (local provider v2.5.1) |
| How many `.tf` configuration files exist in this directory?     | 1 (`main.tf`)             |
| How many resources are defined in `main.tf`?                    | 2                         |
| What is the version of the `local` provider downloaded?         | 2.5.1                     |

main.tf resource blocks:

```
resource "local_file" "things-to-do" {
  filename = "/root/things-to-do.txt"
  content  = "Clean my room before Christmas\nComplete the CKA Cert!"
}


resource "local_file" "more-things-to-do" {
  filename = "/root/more-things-to-do.txt"
  content  = "Learn how to play Astronomia on the guitar!"
}
```

![The image shows a coding environment with a file explorer displaying a directory structure and a code editor with Terraform configuration files. A question about the version of a plugin for a local provider is visible on the left.](https://kodekloud.com/kk-media/image/upload/v1752882824/notes-assets/images/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform-Demo-OpenTofu-Providers/coding-environment-file-explorer-terraform.jpg)

---

## 2\. Creating Local File Resources

Apply the configuration:

```
cd /root/opentofu-project/things-to-do
opentofu init
opentofu apply
```

Confirm with `yes`. This will create:

- `/root/things-to-do.txt`
- `/root/more-things-to-do.txt`

---

## 3\. Working with a New Configuration Directory

Create or navigate to:

```
/root/opentofu-project/Christmas_list
```

It contains two files: `cyberpunk.tf` and `ps5.tf`. Each defines a `local_file` resource.

cyberpunk.tf

```
resource "local_file" "cyberpunk" {
  filename = "/root/cyberpunk2077.txt"
  content  = "All I need for Christmas is Cyberpunk 2077!"
}
```

ps5.tf

```
resource "local_file" "ps5" {
  filename = "/root/ps5.txt"
  content  = "All I need for a PS5!"
}
```

**Total resources:** 2  
**cyberpunk resource filename:** `/root/cyberpunk2077.txt`

---

### 3.1 Adding an Xbox Resource

Create `xbox.tf` in the same directory:

```
resource "local_file" "xbox" {
  filename = "/root/xbox.txt"
  content  = "Wouldn't mind an Xbox either!"
}
```

Then run:

```
cd /root/opentofu-project/Christmas_list
opentofu init
opentofu plan
opentofu apply
```

Confirm with `yes` to add `/root/xbox.txt`.

---

## 4\. Identifying Provider Modules

We have two provider directories to inspect:

| Directory                          | Provider Name | Source          | Version | Module Type              |
| ---------------------------------- | ------------- | --------------- | ------- | ------------------------ |
| `/root/opentofu-project/providerA` | linode        | linode/linode   | 1.13.3  | Partner Linode module    |
| `/root/opentofu-project/providerB` | ansible       | nbering/ansible | 1.0.4   | Community Ansible module |

Example snippet from `providerA/required_providers`:

```
terraform {
  required_providers {
    linode = {
      source  = "linode/linode"
      version = "1.13.3"
    }
  }
}
```

---

## References

- [OpenTofu Documentation](https://docs.opentofu.org/)
- [Terraform Language Configuration](https://www.terraform.io/docs/language/index.html)
- [Local File Provider](https://registry.terraform.io/providers/hashicorp/local/latest/docs/resources/file)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/c3586b29-e450-4c95-bad9-91bdf332eb24/lesson/be7c20bb-e42e-44fc-b48a-316bbc5c0c05)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/c3586b29-e450-4c95-bad9-91bdf332eb24/lesson/f68bdd98-1f91-43cc-8c24-b58a98b66748)**
>
> Practice lab
