# Count - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Basics-Training-Course/Working-with-Terraform/Count)

---

## Table of Contents

- Count
  - Creating Multiple Instances with a Static Count
  - Creating Unique Resources by Using a List Variable
  - Dynamically Adjusting the Count with the length() Function
  - A Pitfall: List Element Removal and Resource Replacement
  - Viewing Resource Details
  - Conclusion
  - Watch Video

---

## Content

Terraform Basics Training Course

Working with Terraform

# Count

In this article, we explore Terraform’s count meta-argument, demonstrating how it can be used to create multiple resource instances and discussing potential issues when modifying the underlying list used with count. This guide covers both static and dynamic count techniques to help you manage resources efficiently.

---

## Creating Multiple Instances with a Static Count

One of the simplest ways to create multiple instances of a resource is by using a static count. Below is an example that creates three instances of a local file resource:

```
resource "local_file" "pet" {
  filename = var.filename
  count    = 3
}
```

The variable is defined as follows:

```
variable "filename" {
  default = "/root/pets.txt"
}
```

When you run `terraform plan`, Terraform plans to create three resources:

```
$ terraform plan
[Output Truncated]
Terraform will perform the following actions:
...
# local_file.pet[2] will be created
+ resource "local_file" "pet" {
    + directory_permission = "0777"
    + file_permission      = "0777"
    + filename             = "/root/pets.txt"
    + id                   = (known after apply)
}
Plan: 3 to add, 0 to change, 0 to destroy.
```

Each resource is indexed as `pet[0]`, `pet[1]`, and `pet[2]`. Although three resources are created, all instances share the same file name, which means Terraform creates the same file three times rather than three unique files.

---

## Creating Unique Resources by Using a List Variable

To generate unique resources, update the variable definition to a list and reference each element using `count.index`. Here is the modified configuration:

```
resource "local_file" "pet" {
  filename = var.filename[count.index]
  count    = 3
}
```

Define the list variable as follows:

```
variable "filename" {
  default = [
    "/root/pets.txt",
    "/root/dogs.txt",
    "/root/cats.txt"
  ]
}
```

In this configuration:

- The first iteration (index 0) creates `/root/pets.txt`.
- The second iteration (index 1) creates `/root/dogs.txt`.
- The third iteration (index 2) creates `/root/cats.txt`.

After executing `terraform apply`, listing the `/root` directory produces:

```
$ ls /root
pets.txt
dogs.txt
cats.txt
```

This confirms that each resource is now unique.

---

## Dynamically Adjusting the Count with the length() Function

A drawback of the previous approach is its fixed count. If you wish to add more file names, the configuration would still create only three resources. To adapt dynamically to the number of elements, use the built-in `length()` function:

```
resource "local_file" "pet" {
  filename = var.filename[count.index]
  count    = length(var.filename)
}
```

You can now define the variable with any number of file names:

```
variable "filename" {
  default = [
    "/root/pets.txt",
    "/root/dogs.txt",
    "/root/cats.txt",
    "/root/cows.txt",
    "/root/ducks.txt"
  ]
}
```

When running `terraform apply`, Terraform will automatically create five resources—one for each element in the list. To revert back to testing with three elements, simply modify the list back to three filenames:

```
variable "filename" {
  default = [
    "/root/pets.txt",
    "/root/dogs.txt",
    "/root/cats.txt"
  ]
}
```

After applying these changes, the `/root` directory will properly contain the three files.

---

> [!important]
> **Caution**
>
> Modifying a list that drives the count parameter can lead to resource replacements due to index shifts. This may trigger unwanted service interruptions or data loss if the resources are critical.

## A Pitfall: List Element Removal and Resource Replacement

When using count with a list, removing an element causes a shift in resource indices. Consider this configuration:

```
resource "local_file" "pet" {
  filename = var.filename[count.index]
  count    = length(var.filename)
}
```

Initially, the variable is defined with three elements:

```
variable "filename" {
  default = [
    "/root/pets.txt",
    "/root/dogs.txt",
    "/root/cats.txt"
  ]
}
```

After a successful apply, Terraform recognizes three resources: `pet[0]`, `pet[1]`, and `pet[2]`. Now, if you remove the first element (`/root/pets.txt`), the updated variable becomes:

```
variable "filename" {
  default = [
    "/root/dogs.txt",
    "/root/cats.txt"
  ]
}
```

Running `terraform plan` now shows:

- The resource at index 0 is updated from `/root/pets.txt` to `/root/dogs.txt`.
- The resource at index 1 is updated from `/root/dogs.txt` to `/root/cats.txt`.
- The resource at index 2 is marked for destruction as there is no corresponding list element.

An abbreviated plan output looks like this:

```
$ terraform plan
...
# local_file.pet[0] must be replaced
-/+ resource "local_file" "pet" {
    directory_permission = "0777"
    file_permission      = "0777"
    ~ filename           = "/root/pets.txt" -> "/root/dogs.txt" #
}
# local_file.pet[1] must be replaced
-/+ resource "local_file" "pet" {
    directory_permission = "0777"
    file_permission      = "0777"
    ~ filename           = "/root/dogs.txt" -> "/root/cats.txt" #
}
# local_file.pet[2] will be destroyed
-/+ resource "local_file" "pet" {
    directory_permission = "0777" -> null
    file_permission      = "0777" -> null
    ~ filename           = "/root/cats.txt" -> null #
}
```

This behavior occurs because the resource indices are directly linked to the order of the list elements. Removing an element causes subsequent elements to shift, resulting in the unnecessary replacement or destruction of resources.

---

## Viewing Resource Details

It is often useful to confirm resource details created with count. Adding an output variable lets you verify each resource's configuration:

```
output "pets" {
  value = local_file.pet
}
```

After running `terraform output`, you should see similar details for each resource:

```
$ terraform output
Outputs:
pets = [
  {
    "directory_permission" = "0777"
    "file_permission"      = "0777"
    "filename"             = "/root/pets.txt"
    "id"                   = "da39a3ee5e6b4d3255bef95601890afd80709"
  },
  {
    "directory_permission" = "0777"
    "file_permission"      = "0777"
    "filename"             = "/root/dogs.txt"
    "id"                   = "da39a3ee5e6b4d3255bef95601890afd80709"
  },
  {
    "directory_permission" = "0777"
    "file_permission"      = "0777"
    "filename"             = "/root/cats.txt"
    "id"                   = "da39a3ee5e6b4d3255bef95601890afd80709"
  },
]
```

This output confirms that Terraform manages the resources as a list, allowing each element to be accessed individually by its index.

---

## Conclusion

In this article, we demonstrated how to use the count meta-argument in Terraform to create multiple resource instances. We examined both static and dynamic count methods using a list variable and the `length()` function, respectively. Additionally, we discussed a common pitfall—removing an element from the list can trigger resource replacements due to index shifting.

Practice using the count meta-argument in your Terraform projects to automate resource creation and better manage infrastructure changes.

For more detailed information on Terraform and its resource management, refer to the [Terraform Documentation](https://www.terraform.io/docs).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/98de9b33-985e-4ec4-9903-b39856d309e8/lesson/7a326097-ef01-44ef-99b1-f4ca9402a910)**
>
> Watch video content
