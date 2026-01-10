# Demo Variables - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform/OpenTofu-Basics/Demo-Variables)

---

## Table of Contents

- Demo Variables
  - 1. Variable Type Quiz
  - 2. Data Type Quiz
  - Setup: Navigate to the Variables Directory
  - 3. Inspecting number
  - 4. Fetching a Map Value
  - 5. List Indexing
  - 6. Identifying a Set Definition Error
  - 7. Inspecting a Resource Block
  - 8. Refactoring to Use Variables
  - 9. Initialize, Plan, and Apply
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

OpenTofu: A Beginners Guide to a Terraform Fork Including Migration From Terraform

OpenTofu Basics

# Demo Variables

Welcome to this hands-on lab on defining and using variables in Terraform (OpenTofu). By the end of this tutorial, you’ll understand how to declare different variable types, fetch elements from maps and lists, and refactor resources to leverage variables for cleaner, reusable configurations.

---

## 1\. Variable Type Quiz

**Question:** Which of the following is **not** a valid Terraform variable type?

- object
- item
- tuple
- list
- map

**Answer:** `item` is not a valid variable type in Terraform/OpenTofu.

| Variable Type | Description                                               |
| ------------- | --------------------------------------------------------- |
| object        | Collection of named attributes with specific types        |
| tuple         | Ordered list of elements with potentially different types |
| list          | Ordered homogeneous collection                            |
| map           | Unordered key–value pairs with homogeneous values         |

For more details, see the [Terraform Variable Types](https://developer.hashicorp.com/terraform/language/values/variables#type-constraints).

---

## 2\. Data Type Quiz

**Question:** Which of the following is **not** a valid data type in OpenTofu?

- list
- tuple
- map
- array
- set

**Answer:** `array` is not a valid data type in OpenTofu.

---

## Setup: Navigate to the Variables Directory

```
cd /root/OpenTofu-project/variables
```

---

## 3\. Inspecting `number`

Open **variables.tf** and locate:

```
variable "number" {
  type    = bool
  default = false
}
```

**Question:** Which type does `number` belong to?  
**Answer:** It’s a **boolean**.

---

## 4\. Fetching a Map Value

In **variables.tf**, you have:

```
variable "hard_drive" {
  type = map(string)
  default = {
    slow = "HDD"
    fast = "SSD"
  }
}
```

**Question:** How do you retrieve the `"slow"` entry?

```
var.hard_drive["slow"]
```

> [!important]
> **Note**
>
> You can also use the dot notation if your key is a valid identifier, e.g., `var.hard_drive.slow`.

---

## 5\. List Indexing

Definition in **variables.tf**:

```
variable "gender" {
  type    = list(string)
  default = ["Male", "Female"]
}
```

- Lists are zero-indexed.
- `"Male"` → index 0
- `"Female"` → index 1

**Answer:** The index of `"Female"` is **1**.

---

## 6\. Identifying a Set Definition Error

```
variable "users" {
  type    = set(string)
  default = ["tom", "jerry", "pluto", "daffy", "donald", "jerry"]
}
```

- **Type:** `set(string)`
- **Mistake:** Sets must not contain duplicates; `"jerry"` appears twice.

> [!important]
> **Warning**
>
> Defining duplicate elements in a `set` will cause validation errors. Ensure each member is unique.

---

## 7\. Inspecting a Resource Block

In **main.tf**, you added:

```
resource "local_file" "jedi" {
  filename = "/root/first-jedi"
  content  = "phanius"
}
```

**Question:** What is the value of the `content` argument?  
**Answer:** `"phanius"`

---

## 8\. Refactoring to Use Variables

1.  **Declare a map variable** in **variables.tf**:

    ```
    variable "jedi" {
      type = map(string)
      default = {
        filename = "/root/first-jedi"
        content  = "phanius"
      }
    }
    ```

2.  **Update the resource** in **main.tf**:

    ```
    resource "local_file" "jedi" {
      filename = var.jedi["filename"]
      content  = var.jedi["content"]
    }
    ```

This makes your configuration more modular and easier to maintain.

---

## 9\. Initialize, Plan, and Apply

```
cd /root/OpenTofu-project/variables
opentofu init
opentofu plan
```

Expected output snapshot:

```
+ resource "local_file" "jedi" {
    + content     = "phanius"
    + filename    = "/root/first-jedi"
    ...
  }


Plan: 1 to add, 0 to change, 0 to destroy.
```

Apply the changes:

```
opentofu apply
# Confirm with "yes"
```

After success:

```
local_file.jedi: Creating...
local_file.jedi: Creation complete after 0s [id=...]
Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
```

Verify the file:

```
cat /root/first-jedi
# phanius
```

---

That’s it for this lab. Thank you for following along!

## Links and References

- [Terraform Variables Documentation](https://developer.hashicorp.com/terraform/language/values/variables)
- [OpenTofu GitHub Repository](https://github.com/OpenTofu)
- [Terraform Local Provider](https://registry.terraform.io/providers/hashicorp/local/latest)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/c3586b29-e450-4c95-bad9-91bdf332eb24/lesson/2fd9cf67-3105-4688-bc49-25da6c99e3f3)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/c3586b29-e450-4c95-bad9-91bdf332eb24/lesson/84672ea0-e48d-476e-b0c2-aea7a86a732a)**
>
> Practice lab
