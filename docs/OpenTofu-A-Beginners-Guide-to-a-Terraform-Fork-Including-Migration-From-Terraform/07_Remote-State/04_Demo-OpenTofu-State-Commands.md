# Demo OpenTofu State Commands - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform/Remote-State/Demo-OpenTofu-State-Commands)

---

## Table of Contents

- Demo OpenTofu State Commands
  - Table of State Commands
  - 1. Inspecting State Resource Names
  - 2. Showing Resource Attributes
  - 3. Retrieving the ID of a Resource
  - 4. Removing a Resource from State
  - 5. Working with Remote State (S3 Backend)
  - 6. Finding the ID of super_pet_2
  - 7. Renaming a Resource in Config and State
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

OpenTofu: A Beginners Guide to a Terraform Fork Including Migration From Terraform

Remote State

# Demo OpenTofu State Commands

In this step-by-step guide, you’ll master OpenTofu state commands to manage your Terraform state file. We’ll cover how to:

- List resources in state
- Inspect resource attributes
- Retrieve specific IDs
- Remove resources from state
- Work with a remote S3 backend
- Rename resources in both configuration and state

---

## Table of State Commands

| Command           | Description                                  |
| ----------------- | -------------------------------------------- |
| `tofu state list` | List all resources tracked in the state file |
| `tofu state show` | Display all attributes for a resource        |
| `tofu state rm`   | Remove one or more resources from state      |
| `tofu state mv`   | Rename a resource in the state               |

---

## 1\. Inspecting State Resource Names

First, navigate to your project directory and list the tracked resources:

```
cd ~/opentofu-projects/project-anime/
tofu state list
```

You should see output similar to:

```
local_file.classics
local_file.hall_of_fame
local_file.new_shows
local_file.top10
```

These correspond to the resource blocks in `main.tf`:

```
resource "local_file" "top10" {
  filename = "/root/anime/top10.txt"
  content  = "1. Naruto\n2. DragonBallZ\n3. Death Note\n"
}

resource "local_file" "hall_of_fame" {
  filename = "/root/anime/hall-of-fame.txt"
  content  = "1. Attack On Titan\n2. Naruto\n3. Bleach\n"
}

resource "local_file" "new_shows" {
  filename = "/root/anime/new_shows.txt"
  content  = "1. Cannon Busters\n2. Last Hope\n3. Lost Song\n"
}

resource "local_file" "classics" {
  filename = "/root/anime/classic_shows.txt"
  content  = "1. DragonBall\n"
}
```

Any resource not listed (e.g., `super_pets`) is not managed in the current state.

---

## 2\. Showing Resource Attributes

To view every attribute stored for a single resource, run:

```
tofu state show local_file.classics
```

Example output:

```
# local_file.classics:
resource "local_file" "classics" {
  content               = "<<EOT\n1. DragonBall\nEOT"
  content_base64sha256  = "61ybEEB9hy2PJuJ30dyB1jDrngh76EV9R9KSA4="
  content_base64sha512  = "lKrYdMr2TokTZk1xL17LfPlLxUld8Z7uGL4vFq/Ko1Bq0yJ6w="
  content_md5           = "content_md5"
  content_sha1          = "content_sha1"
  content_sha256        = "content_sha256"
  content_sha512        = "content_sha512"
  directory_permission  = "755"
  file_permission       = "644"
  filename              = "/root/anime/classic_shows.txt"
  id                    = "8ac5abf90e9a20aa8e3b49f248d568f2367b2"
}
```

> [!important]
> **Note**
>
> The `tofu state show` command only reads the state—your infrastructure remains unchanged.

---

## 3\. Retrieving the ID of a Resource

If you need a resource’s unique identifier (e.g., to reference it elsewhere), use:

```
tofu state show local_file.top10
```

Look for the `id =` line. It might appear as:

```
id = "961e7f431c2b8a09f1b2d3a4e5b6c7d8e9f0a1b2"
```

---

## 4\. Removing a Resource from State

To stop managing a resource without destroying it, remove its block from `main.tf` and then:

```
tofu state rm local_file.hall_of_fame
```

Sample session:

```
$ tofu state rm local_file.hall_of_fame
Removed local_file.hall_of_fame
Successfully removed 1 resource instance(s).
```

Verify removal:

```
tofu state list
```

> [!important]
> **Warning**
>
> `tofu state rm` **does not** delete actual resources. It only detaches them from Terraform’s state.

---

## 5\. Working with Remote State (S3 Backend)

In `/root/OpenTofu/project/super-pets/`, configure an S3 backend in `tofu.tf`:

```
terraform {
  backend "s3" {
    bucket = "my-remote-state"
    key    = "super-pets/terraform.tfstate"
    region = "us-east-1"
  }
}
```

Define two `random_pet` resources in `main.tf`:

```
resource "random_pet" "super_pet_1" {
  length    = var.length1
  prefix    = var.prefix1
  separator = "-"
}

resource "random_pet" "super_pet_2" {
  length    = var.length2
  prefix    = var.prefix2
  separator = "-"
}
```

And variables:

```
variable "length1" { default = 1 }
variable "length2" { default = 2 }
variable "prefix1" { default = "Super" }
variable "prefix2" { default = "Wonder" }
```

Since the state is stored remotely, all `tofu state` commands will interact with S3.

To confirm:

```
tofu state show random_pet.super_pet_1
```

Output:

```
# random_pet.super_pet_1:
id        = "Super-grackle"
length    = 1
prefix    = "Super"
separator = "-"
```

---

## 6\. Finding the ID of `super_pet_2`

Similarly, retrieve the ID for the second pet:

```
tofu state show random_pet.super_pet_2
```

Example:

```
# random_pet.super_pet_2:
id        = "Wonder-super-pup"
length    = 2
prefix    = "Wonder"
separator = "-"
```

---

## 7\. Renaming a Resource in Config and State

To rename `random_pet.super_pet_1` to `random_pet.ultra_pet`:

1.  **Update `main.tf`:**

    ```
    resource "random_pet" "ultra_pet" {
      length    = var.length1
      prefix    = var.prefix1
      separator = "-"
    }

    resource "random_pet" "super_pet_2" {
      length    = var.length2
      prefix    = var.prefix2
      separator = "-"
    }
    ```

2.  **Move it in the state:**

    ```
    tofu state mv random_pet.super_pet_1 random_pet.ultra_pet
    ```

3.  **Verify:**

    ```
    tofu state list
    # Outputs: random_pet.ultra_pet, random_pet.super_pet_2
    ```

---

Thank you for following this tutorial on OpenTofu state management!

## Links and References

- [OpenTofu Documentation](https://opentofu.io/docs)
- [Terraform State Management](https://developer.hashicorp.com/terraform/cli/commands/state)
- [AWS S3 Backend](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/dd54768d-8454-44bd-bab2-99f8f7b5f145/lesson/baf21805-46cd-4e5a-8c54-c0f7077c60c8)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/dd54768d-8454-44bd-bab2-99f8f7b5f145/lesson/84ec9729-999c-49cb-adcd-4ab31ab275e2)**
>
> Practice lab
