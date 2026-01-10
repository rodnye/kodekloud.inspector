# Demo Multiple Providers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform/OpenTofu-Basics/Demo-Multiple-Providers)

---

## Table of Contents

- Demo Multiple Providers
  - Table of Contents
  - 1. Overview
  - 2. Inspecting an Existing Configuration
  - 3. Initializing Providers
  - 4. Creating a New Multi-Provider Configuration
  - 5. Exploring Additional Provider Resources
  - 6. Practice Task: Creating a local_file Resource
  - 7. Adding a New Provider-Based Resource
  - 8. Summary & References
  - Watch Video
  - Practice Lab

---

## Content

OpenTofu: A Beginners Guide to a Terraform Fork Including Migration From Terraform

OpenTofu Basics

# Demo Multiple Providers

In this lesson, we explore configuring and managing multiple providers within a single OpenTofu project directory. By the end, you’ll be able to initialize, apply, and troubleshoot provider plugins across various configurations.

## Table of Contents

1.  Overview
2.  Inspecting an Existing Configuration
3.  Initializing Providers
4.  Creating a Multi-Provider Configuration
5.  Exploring Additional Provider Resources
6.  Practice Task: `local_file` Resource
7.  Adding a New Provider-Based Resource
8.  Summary & References

## 1\. Overview

OpenTofu allows you to use multiple providers in the same configuration directory. This means you can manage local, random, AWS, Kubernetes, and other resources from a single project.

> [!important]
> **Note**
>
> Make sure you have OpenTofu installed and your CLI configured before starting.
> Read the [OpenTofu Installation Guide](https://opentofu.io/docs/installation) for more details.

## 2\. Inspecting an Existing Configuration

Navigate to the example directory:

```
cd /root/opentofu-projects/multi-provider
ls -1
```

You should see two resource files and no `.terraform` folder—initialized provider count: **0**.

Main configuration (`main.tf`):

```
resource "local_file" "pet_name" {
  content  = "We love pets!"
  filename = "/root/pets.txt"
}

resource "random_pet" "my-pet" {
  prefix    = "Mrs"
  separator = "."
  length    = 1
}
```

## 3\. Initializing Providers

Initialize the configuration to download provider plugins:

```
tofu init
```

Inspect the plugins directory:

```
ls .terraform/providers
```

| Provider | Plugin Count |
| -------- | ------------ |
| local    | 1            |
| random   | 1            |

Total providers initialized: **2**.

## 4\. Creating a New Multi-Provider Configuration

Create and navigate to a new project:

```
mkdir -p /root/opentofu-projects/mpl
cd /root/opentofu-projects/mpl
```

Create `pet-name.tf`:

```
resource "local_file" "my-pet" {
  filename = "/root/pet-name"
  content  = "My pet is called Pennegan."
}

resource "random_pet" "other-pet" {
  length    = 1
  prefix    = "Mr"
  separator = "."
}
```

Initialize and apply:

```
tofu init
tofu apply
```

Confirm with `yes`. Expected output:

```
random_pet.other-pet: Creation complete after 0s [id=Mr.camel]
local_file.my-pet: Creation complete after 0s [id=/root/pet-name]
Apply complete! Resources: 2 added, 0 changed, 0 destroyed.
```

## 5\. Exploring Additional Provider Resources

Switch to another example directory:

```
cd /root/opentofu-projects/provider
```

In `cloud-provider.tf` (AWS EC2 instance):

```
resource "aws_instance" "ec2_instance" {
  ami           = "ami-0eda277a0b884c5ab"
  instance_type = "t2.large"
}
```

- **Instance Type**: t2.large

In `kube.tf` (Kubernetes namespace):

```
resource "kubernetes_namespace" "dev" {
  metadata {
    name = "development"
  }
}
```

- **Namespace Resource Name**: dev

## 6\. Practice Task: Creating a `local_file` Resource

Create `code.tf`:

```
resource "local_file" "iac_code" {
  filename = "/opt/practice"
  content  = "Setting up infrastructure as code"
}
```

Run validation:

```
tofu init
tofu validate
```

Everything should pass successfully.

## 7\. Adding a New Provider-Based Resource

Update `code.tf` by appending a `random_string` resource:

```
resource "local_file" "iac_code" {
  filename = "/opt/practice"
  content  = "Setting up infrastructure as code"
}

resource "random_string" "iac_random" {
  length    = 10
  min_upper = 5
}
```

Attempt to apply:

```
tofu apply
```

You may encounter an _inconsistent dependency lock file_ error.

> [!important]
> **Warning**
>
> Run `tofu init -upgrade` to update the provider lock file and install the latest plugin version.

Upgrade and re-apply:

```
tofu init -upgrade
tofu apply
```

Confirm with `yes`. Expected output:

```
local_file.iac_code: Creating...
random_string.iac_random: Creating...
Apply complete! Resources: 2 added, 0 changed, 0 destroyed.
```

## 8\. Summary & References

You’ve successfully:

- Initialized and managed multiple providers
- Created local, random, AWS, and Kubernetes resources
- Upgraded provider lock files

Further reading:

- [OpenTofu Documentation](https://opentofu.io/docs/)
- [Terraform Provider Development](https://www.terraform.io/docs/plugin/providers.html)
- [Kubernetes Namespace Resource](https://registry.terraform.io/providers/hashicorp/kubernetes/latest/docs/resources/namespace)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/c3586b29-e450-4c95-bad9-91bdf332eb24/lesson/50f68e10-25e8-4dbe-845f-6cb237db9dc9)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/c3586b29-e450-4c95-bad9-91bdf332eb24/lesson/08f41968-772f-414b-b357-f5d9447c5e38)**
>
> Practice lab
