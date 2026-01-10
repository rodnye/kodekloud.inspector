# Demo Count and for each - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform/Working-with-OpenTofu/Demo-Count-and-for-each)

---

## Table of Contents

- Demo Count and for each
  - Task 1: Inspect the Base Configuration
  - Task 2: Create Multiple Instances with count
  - Task 3: Accessing Resources by Index
  - Task 4: Parameterize with Variables and count
  - Task 5: Set Default Values for Variables
  - Task 6: Ensure Unique Instances with for_each
  - Comparing count vs. for_each
  - Q&A
  - Further Reading
  - Watch Video
  - Practice Lab

---

## Content

OpenTofu: A Beginners Guide to a Terraform Fork Including Migration From Terraform

Working with OpenTofu

# Demo Count and for each

In this lab, you’ll learn how to leverage the `count` and `for_each` meta-arguments to create multiple resource instances dynamically in OpenTofu. We’ll work through a series of tasks:

- Inspecting a basic configuration
- Scaling with `count`
- Parameterizing with variables
- Ensuring uniqueness with `for_each`

---

## Task 1: Inspect the Base Configuration

Navigate to your project directory:

```
cd /root/opentofu-projects/project-shade
```

Open the default `main.tf`:

```
resource "local_sensitive_file" "name" {
  filename = "/root/user-data"
  content  = "password: S3cr3tP@ssw0rd"
}
```

Since there’s only **one** resource block, running `opentofu plan` would create **one** file at `/root/user-data`.

---

## Task 2: Create Multiple Instances with `count`

Add the `count` argument to generate three instances:

```
resource "local_sensitive_file" "name" {
  filename = "/root/user-data"
  content  = "password: S3cr3tP@ssw0rd"
  count    = 3
}
```

Initialize and preview:

```
opentofu init
opentofu plan
```

Expected plan excerpt:

```
# local_sensitive_file.name will be created with 3 instances
+ resource "local_sensitive_file" "name" {
    + count    = 3
    + filename = "/root/user-data"
    + content  = (sensitive)
  }
```

Apply the changes:

```
opentofu apply
```

All three instances target the same filepath, so you end up with just **one** actual file on disk.

> [!important]
> **Note**
>
> Although Terraform plans three resources, they all write to `/root/user-data`. Use unique filenames or a loop index to avoid overwriting.

---

## Task 3: Accessing Resources by Index

Resources managed with `count` form a **list**. To view the ID of the second element (index 1):

```
opentofu state show local_sensitive_file.name[1]
```

Look for the `id` attribute in the output.

---

## Task 4: Parameterize with Variables and `count`

Define variables in `variables.tf`:

```
variable "users" {
  type = list(string)
}


variable "content" {
  default = "password: S3Cr3tP@ssw0rd"
}
```

Update `main.tf`:

```
resource "local_sensitive_file" "name" {
  count    = length(var.users)
  filename = var.users[count.index]
  content  = var.content
}
```

Now each `users` element becomes a filename. Initialize and apply:

```
opentofu init
opentofu plan
opentofu apply
```

---

## Task 5: Set Default Values for Variables

Add sensible defaults in `variables.tf`:

```
variable "users" {
  type    = list(string)
  default = ["/root/user1", "/root/user11", "/root/user12"]
}


variable "content" {
  default = "password: S3Cr3tP@ssw0rd"
}
```

Key points:

- **Type** of `users`: `list(string)`
- **List vs. set**: Lists allow duplicates; sets do not.

Example of a duplicate in a list (invalid for a set):

```
variable "users" {
  default = [
    "/root/user10",
    "/root/user1",
    "/root/user12",
    "/root/user10"  # duplicate
  ]
}
```

---

## Task 6: Ensure Unique Instances with `for_each`

Refactor `main.tf` to use `for_each` on a set:

```
resource "local_sensitive_file" "name" {
  for_each = toset(var.users)
  filename = each.value
  content  = var.content
}
```

The `toset()` function removes duplicates, and `for_each` creates a **map** keyed by each unique filename.

Initialize and apply:

```
opentofu init
opentofu plan
opentofu apply
```

Expected output:

```
local_sensitive_file.name["/root/user10"]: Creating...
local_sensitive_file.name["/root/user11"]: Creating...
local_sensitive_file.name["/root/user12"]: Creating...
Apply complete! Resources: 3 added, 0 changed, 0 destroyed.
```

> [!important]
> **Why use \`for_each\`?**
>
> - Eliminates duplicates automatically
> - Creates a map, so you can reference resources by key:
>   `local_sensitive_file.name["/root/user11"]`

---

## Comparing `count` vs. `for_each`

| Feature             | count                         | for\\\_each                    |
| ------------------- | ----------------------------- | ------------------------------ |
| Data structure      | List (indexed)                | Map (keyed by value)           |
| Handling duplicates | Requires manual deduplication | Automatic when using `toset()` |
| Reference syntax    | `resource.name[0]`            | `resource.name["key"]`         |

---

## Q&A

1.  **What data structure does `for_each` produce?**  
    A **map**, keyed by each unique element.
2.  **How do you address the resource for `/root/user11` with `for_each`?**  
    `local_sensitive_file.name["/root/user11"]`

---

## Further Reading

- [OpenTofu Documentation](https://opentofu.io/docs/)
- [Terraform Meta-Arguments](https://www.terraform.io/language/meta-arguments)
- [Understanding Lists and Sets](https://www.terraform.io/language/types)

That’s a wrap for this lab. Happy automating!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/69432d48-55d0-4340-a56d-9f9a7819d26c/lesson/5793a08d-f6f5-4739-a570-1038b3ed8619)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/69432d48-55d0-4340-a56d-9f9a7819d26c/lesson/cdab854b-91b9-4e7f-bd0a-f409fa4b1021)**
>
> Practice lab
