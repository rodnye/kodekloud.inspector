# Configuration Directory - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Basics-Training-Course/Terraform-Basics/Configuration-Directory)

---

## Table of Contents

- Configuration Directory
  - Watch Video
  - Practice Lab

---

## Content

Terraform Basics Training Course

Terraform Basics

# Configuration Directory

In this lesson, we explore the structure and naming conventions of the Terraform configuration directory to optimize project organization and enhance configuration management.

Previously, we worked with a single configuration file named local.tf located in the terraform-local-file directory. Below is an example demonstrating how to list the files in this directory along with the contents of local.tf:

```
[terraform-local-file]$ ls /root/terraform-local-file
local.tf
```

```
resource "local_file" "pet" {
  filename = "/root/pets.txt"
  content  = "We love pets!"
}
```

Terraform supports splitting configuration across multiple files. For instance, you can create an additional file named cat.tf that introduces a new resource using the same local_file provider:

```
[terraform-local-file]$ ls /root/terraform-local-file
local.tf  # Note: cat.tf is now also present in the directory.
```

```
resource "local_file" "cat" {
  filename = "/root/cat.txt"
  content  = "My favorite pet is Mr. Whiskers"
}
```

> [!important]
> **Note**
>
> When you apply your configuration, Terraform automatically processes every file in the directory with the .tf extension. This ensures that both pets.txt and cat.txt will be created as specified.

It is also common practice to consolidate resource definitions into one configuration file, often named main.tf. To further organize your configuration, you can use additional files such as:

| File         | Purpose                                  |
| ------------ | ---------------------------------------- |
| variables.tf | To define input variables                |
| outputs.tf   | To specify outputs for the configuration |
| providers.tf | To configure provider settings           |

These topics will be discussed in detail later in the lesson.

Now, let's continue with practical exercises to explore working with providers.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/df2660a4-c959-4fa7-bfa8-0700885b598e/lesson/9d45dfd4-cf12-4da1-81d0-11b37cd4ef50)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/df2660a4-c959-4fa7-bfa8-0700885b598e/lesson/d4fa4075-6b74-4223-afc4-ee20d1163098)**
>
> Practice lab
