# Meta Arguments - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Basics-Training-Course/Working-with-Terraform/Meta-Arguments)

---

## Table of Contents

- Meta Arguments
  - Creating a Single Resource
  - Traditional Loop Approach
  - Utilizing Meta-Arguments
  - Next Steps
  - Additional Resources
  - Watch Video
    - Example: Enforcing Dependencies
    - Example: Using Lifecycle Rules

---

## Content

Terraform Basics Training Course

Working with Terraform

# Meta Arguments

Meta-arguments in Terraform allow you to modify the behavior of resource blocks, enabling advanced configurations such as creating multiple instances of a resource and managing dependencies. In previous tutorials, we demonstrated how to create single resources, for example, a local file or a random pet resource. In this guide, we will explain meta-arguments in detail and illustrate how they can be used to enhance your Terraform configurations.

## Creating a Single Resource

Consider the following Terraform configuration that creates a single resource—a local file:

```
resource "local_file" "pet" {
  filename = var.filename
  content  = var.content
}
```

The accompanying variable definitions are:

```
variable "filename" {
  default = "/root/pets.txt"
}


variable "content" {
  default = "I love pets!"
}
```

## Traditional Loop Approach

In traditional scripting, such as with bash, you might use a loop to create multiple files. The example below creates three empty files (`pet1`, `pet2`, and `pet3`) in the `/root` directory:

```
#!/bin/bash
for i in {1..3}
do
    touch /root/pet${i}
done
```

After running the above script, listing the directory contents may produce:

```
$ ls -ltr /root/
-rw-r--r-- 1 root root 0 Sep  9 02:04 pet2
-rw-r--r-- 1 root root 0 Sep  9 02:04 pet1
-rw-r--r-- 1 root root 0 Sep  9 02:04 pet3
```

> [!important]
> **Note**
>
> While Terraform does not directly support loop constructs within a resource block like traditional shell scripts, its meta-arguments provide mechanisms to achieve equivalent outcomes.

## Utilizing Meta-Arguments

Terraform’s meta-arguments can be applied to any resource block to modify its behavior. Two important meta-arguments include:

1.  **depends_on**: Defines explicit dependencies between resources to control the order of resource creation.
2.  **lifecycle**: Provides rules that control how resources are created, updated, and destroyed.

### Example: Enforcing Dependencies

In the following configuration, the `depends_on` meta-argument is used to ensure that the local file resource is created only after the random pet resource:

```
resource "local_file" "pet" {
  filename   = var.filename
  content    = var.content
  depends_on = [
    random_pet.my_pet
  ]
}


resource "random_pet" "my_pet" {
  prefix    = var.prefix
  separator = var.separator
  length    = var.length
}
```

### Example: Using Lifecycle Rules

The `lifecycle` meta-argument can be used to manage resource replacement. For instance, you can ensure that a new resource is created before the old one is destroyed by setting `create_before_destroy` to true:

```
resource "local_file" "pet" {
  filename        = "/root/pets.txt"
  content         = "We love pets!"
  file_permission = "0700"

  lifecycle {
    create_before_destroy = true
  }
}
```

## Next Steps

In the upcoming sections, we will explore additional meta-arguments in Terraform, including those related to looping and iterating over resources, to further enhance your infrastructure automation workflows.

## Additional Resources

- [Terraform Documentation](https://www.terraform.io/docs)
- [Terraform Meta-Arguments Reference](https://www.terraform.io/docs/configuration/resources.html#meta-arguments)

By understanding and utilizing meta-arguments, you can significantly enhance your Terraform configurations, making them both robust and flexible. Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/98de9b33-985e-4ec4-9903-b39856d309e8/lesson/b1a20b38-be8b-43d5-95e4-4d23d8ca2c34)**
>
> Watch video content
