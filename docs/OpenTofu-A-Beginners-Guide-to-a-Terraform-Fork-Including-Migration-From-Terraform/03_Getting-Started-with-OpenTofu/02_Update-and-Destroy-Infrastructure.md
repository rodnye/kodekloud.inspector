# Update and Destroy Infrastructure - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform/Getting-Started-with-OpenTofu/Update-and-Destroy-Infrastructure)

---

## Table of Contents

- Update and Destroy Infrastructure
  - 🔄 Updating a Resource
  - ✅ Applying the Update
  - 🗑️ Destroying a Resource
  - 🗂️ Organizing Configuration Files
  - Links and References
  - Watch Video
    - Understanding the Plan Output
    - Single vs. Multiple Files

---

## Content

OpenTofu: A Beginners Guide to a Terraform Fork Including Migration From Terraform

Getting Started with OpenTofu

# Update and Destroy Infrastructure

In this tutorial, you’ll learn how to update and destroy infrastructure managed by OpenTofu using a simple `local_file` example. We’ll walk through modifying resource configuration, previewing changes, applying updates, tearing down resources, and organizing your `.tf` files for maintainability.

---

## 🔄 Updating a Resource

To change an existing `local_file` resource, edit its configuration. In this example, we add the `file_permission` argument and set it to `"0700"`:

```
resource "local_file" "pet" {
  filename        = "/root/pets.txt"
  content         = "We love pets!"
  file_permission = "0700"
}
```

Next, preview the plan with:

```
tofu plan
```

Output (truncated):

```
local_file.pet: Refreshing state... [id=cba595b7d9f94ba11074a6f3f731912d95fb3d2c]
OpenTofu used the selected providers to generate the following execution plan.
Resource actions are indicated with these symbols:
  -/+ destroy and then create replacement


  # local_file.pet must be replaced
  -/+ resource "local_file" "pet" {
      ~ file_permission = "0777" -> "0700" # forces replacement
      ~ id              = "cba595b7d9f94ba11074a6f3f731912d95fb3d2c" -> (known after apply)
      ... (other attributes hidden)
    }


Plan: 1 to add, 0 to change, 1 to destroy.


Note: You didn't use the `-out` option to save this plan, so OpenTofu can’t guarantee to take exactly these actions if you run `tofu apply` now.
```

> [!important]
> **Tip**
>
> Save your plan with `tofu plan -out=plan.tfplan` to lock in the exact changes for later application.

### Understanding the Plan Output

- The `-/+` indicator shows the resource will be destroyed and recreated.
- `# forces replacement` highlights why OpenTofu must rebuild the resource—in this case, due to a permission change.
- The summary line (e.g., `1 to add, 0 to change, 1 to destroy`) gives a quick overview of the plan.

---

## ✅ Applying the Update

To apply the pending changes, run:

```
tofu apply
```

You’ll see the same plan, then a confirmation prompt:

```
Do you want to perform these actions?
  # local_file.pet must be replaced
Enter a value: yes


local_file.pet: Destroying... [id=...]
local_file.pet: Creation complete after 0s


Apply complete! Resources: 1 added, 0 changed, 1 destroyed.
```

---

## 🗑️ Destroying a Resource

When you no longer need the `local_file` resource, use:

```
tofu destroy
```

Example output:

```
local_file.pet: Refreshing state... [id=...]
OpenTofu used the selected providers to generate the following execution plan.
Resource actions are indicated with:
  - destroy


  # local_file.pet will be destroyed
  - resource "local_file" "pet" {
      - content         = "We love pets!" -> null
      - file_permission = "0700"            -> null
      - filename        = "/root/pets.txt"  -> null
      - id              = "..."             -> null
      ... (other attributes hidden)
    }


Plan: 0 to add, 0 to change, 1 to destroy.


Do you really want to destroy all resources?
Enter a value: yes


local_file.pet: Destroying... [id=...]
local_file.pet: Destruction complete after 0s


Destroy complete! Resources: 1 destroyed.
```

> [!important]
> **Warning**
>
> Adding `-auto-approve` skips all confirmation prompts. Use with caution, as it will immediately destroy your managed resources.

---

## 🗂️ Organizing Configuration Files

OpenTofu loads all `.tf` files in the working directory. Splitting configurations into multiple files can enhance readability and maintainability.

For example, a directory with two resources:

```
[opentofu-local-file]$ ls /root/opentofu-local-file
local.tf  cat.tf
```

| File     | Description                             |
| -------- | --------------------------------------- |
| local.tf | Defines the `pet` `local_file` resource |
| cat.tf   | Defines the `cat` `local_file` resource |

**local.tf**

```
resource "local_file" "pet" {
  filename = "/root/pets.txt"
  content  = "We love pets!"
}
```

**cat.tf**

```
resource "local_file" "cat" {
  filename = "/root/cat.txt"
  content  = "My favorite pet is Mr. Whiskers"
}
```

When you run `tofu apply`, both resources are created together.

### Single vs. Multiple Files

Alternatively, you can combine all resources in one `main.tf`:

```
resource "local_file" "pet" {
  filename = "/root/pets.txt"
  content  = "We love pets!"
}


resource "local_file" "cat" {
  filename = "/root/cat.txt"
  content  = "My favorite pet is Mr. Whiskers"
}
```

As your project grows, consider splitting into:

- `variables.tf`
- `outputs.tf`
- `providers.tf`
- `main.tf`

This structure improves clarity and makes collaboration easier.

---

## Links and References

- [OpenTofu Documentation](https://github.com/opentofu/opentofu)
- [Terraform CLI Reference](https://www.terraform.io/docs/cli/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/b3a724ed-f2f2-4a25-a20e-bfb4c000d1e7/lesson/bcfab62c-941a-447c-b82b-633fbf64cf48)**
>
> Watch video content
