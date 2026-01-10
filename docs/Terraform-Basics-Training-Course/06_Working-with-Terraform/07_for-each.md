# for each - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Basics-Training-Course/Working-with-Terraform/for-each)

---

## Table of Contents

- for each
  - Using count with a List
  - Transitioning to for_each
  - Updating Resources by Removing an Element
  - Outputting Resource Details
  - Conclusion
  - Watch Video
  - Practice Lab
    - Correcting the Configuration

---

## Content

Terraform Basics Training Course

Working with Terraform

# for each

In this lesson, we explore the powerful for_each meta-argument in Terraform. By using for_each, you can overcome some limitations of the count meta-argument and manage resources more reliably.

## Using count with a List

Traditionally, resources are created using the count meta-argument. For example:

```
resource "local_file" "pet" {
  filename = var.filename[count.index]
  count    = length(var.filename)
}
```

```
variable "filename" {
  default = [
    "/root/pets.txt",
    "/root/dogs.txt",
    "/root/cats.txt"
  ]
}
```

This configuration creates resources as a list. However, updating resources based on index positions can lead to unexpected behavior when the list order changes.

## Transitioning to for_each

Switching to for_each can help manage resources more effectively by assigning a unique key to each resource using each.value. An initial attempt might be:

```
resource "local_file" "pet" {
  filename = var.filename[count.index]
  for_each = var.filename
}


variable "filename" {
  default = [
    "/root/pets.txt",
    "/root/dogs.txt",
    "/root/cats.txt"
  ]
}
```

Running `terraform plan` with this configuration results in an error. The for_each argument only supports a map or a set of strings – not a list of strings. The error message appears similar to:

```
$ terraform plan
Error: Invalid for_each argument


  on main.tf line 2, in resource "local_file" "pet":
   2:   for_each = var.filename


The given "for_each" argument value is unsuitable: the "for_each"
argument must be a map, or set of strings, and you have provided a value
of type list of string.
```

> [!important]
> **Warning**
>
> Ensure that the data type passed to for_each complies with Terraform's requirements—a map or a set of strings.

### Correcting the Configuration

There are two approaches to resolve this issue:

1.  Change the variable type from a list to a set (sets do not allow duplicate elements).
2.  Convert the list into a set in the resource block using Terraform's built-in `toset` function.

Below is an updated configuration that uses the `toset` function:

```
resource "local_file" "pet" {
  filename = each.value
  for_each = toset(var.filename)
}


variable "filename" {
  type    = list(string)
  default = [
    "/root/pets.txt",
    "/root/dogs.txt",
    "/root/cats.txt"
  ]
}
```

When you run `terraform plan` now, Terraform will indicate that three resources will be created:

```
$ terraform plan
Terraform will perform the following actions:
  # local_file.pet["/root/cats.txt"] will be created
  + resource "local_file" "pet" {
      + directory_permission = "0777"
      + file_permission      = "0777"
      + filename             = "/root/cats.txt"
    }


...<output trimmed>...
Plan: 3 to add, 0 to change, 0 to destroy.
```

## Updating Resources by Removing an Element

Let's simulate updating the configuration by removing an element. For example, removing `/root/pets.txt` from the list changes the configuration to:

```
resource "local_file" "pet" {
  filename = each.value
  for_each = toset(var.filename)
}
```

```
variable "filename" {
  type    = list(string)
  default = [
    "/root/dogs.txt",
    "/root/cats.txt"
  ]
}
```

Running `terraform plan` with this updated variable shows that only the resource associated with `/root/pets.txt` will be destroyed:

```
$ terraform plan
Terraform will perform the following actions:
  # local_file.pet["/root/pets.txt"] will be destroyed
  + resource "local_file" "pet" {
      + directory_permission = "0777"
      + file_permission      = "0777"
      + filename             = "/root/pets.txt"
    }


... <output trimmed> ...
Plan: 0 to add, 0 to change, 1 to destroy.
```

The remaining resources persist without change.

## Outputting Resource Details

To visualize how Terraform manages resources using for_each, you can create an output variable that displays the resource details. Resources managed with for_each are stored as a map, keyed by their unique identifier—in this case, the filename.

```
resource "local_file" "pet" {
  filename = each.value
  for_each = toset(var.filename)
}


output "pets" {
  value = local_file.pet
}
```

Running the output command displays the resources keyed by their filenames:

```
$ terraform output
pets = {
  "/root/cats.txt" = {
    "directory_permission" = "0777"
    "file_permission"      = "0777"
    "filename"             = "/root/cats.txt"
    "id"                   = "da39a3ee5e6b4b0d3255bfe95601890afd80709"
  }
  "/root/dogs.txt" = {
    "directory_permission" = "0777"
    "file_permission"      = "0777"
    "filename"             = "/root/dogs.txt"
    "id"                   = "da39a3ee5e6b4b0d3255bfe95601890afd80709"
  }
}
```

> [!important]
> **Note**
>
> Using for_each allows the resources to be identified by a unique key (here, the filename), reducing the risk of accidental shifts in resource management compared to using count.

## Conclusion

This lesson demonstrated how to implement the for_each meta-argument in Terraform to manage resources more reliably. By converting a list of strings to a set (either via variable type modification or the toset function), you can efficiently track and update resources using a map keyed by unique identifiers. This approach minimizes errors during deletion or updates compared to using the count meta-argument.

Now that you're familiar with for_each, try practicing these concepts in your Terraform projects to streamline your infrastructure management. Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/98de9b33-985e-4ec4-9903-b39856d309e8/lesson/e7b37e45-3b0b-4a6e-baae-e104738188d9)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/98de9b33-985e-4ec4-9903-b39856d309e8/lesson/1666a706-00a3-4bdb-ba19-1e3c7a845daa)**
>
> Practice lab
