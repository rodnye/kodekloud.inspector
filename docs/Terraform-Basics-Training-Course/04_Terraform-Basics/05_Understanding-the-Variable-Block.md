# Understanding the Variable Block - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Basics-Training-Course/Terraform-Basics/Understanding-the-Variable-Block)

---

## Table of Contents

- Understanding the Variable Block
  - Basic Variable Definition
  - Simple Variable Types
  - List Variables
  - Map Variables
  - List and Map Type Constraints
  - Set Variables
  - Object Variables
  - Tuple Variables
  - Watch Video
  - Practice Lab

---

## Content

Terraform Basics Training Course

Terraform Basics

# Understanding the Variable Block

In this lesson, we take an in-depth look at the Terraform variable block, exploring how to define variables, enforce type constraints, and work with complex data structures. Learn how to leverage Terraform's variable capabilities to write more efficient and maintainable infrastructure code.

---

## Basic Variable Definition

Terraform variable blocks can include several parameters, including a default value that sets a fallback for the variable. Below is an example that defines several variables with default values:

```
variable "filename" {
  default = "/root/pets.txt"
}


variable "content" {
  default = "I love pets!"
}


variable "prefix" {
  default = "Mrs"
}


variable "separator" {
  default = "."
}


variable "length" {
  default = "1"
}
```

Terraform variable blocks can also include the optional parameters `type` and `description`. The `description` provides clarity on the variable’s purpose, while the `type` enforces the kind of data the variable can hold. For example:

```
variable "filename" {
  default     = "/root/pets.txt"
  type        = string
  description = "The path of the local file"
}


variable "content" {
  default     = "I love pets!"
  type        = string
  description = "The content of the file"
}


variable "prefix" {
  default     = "Mrs"
  type        = string
  description = "The prefix to be set"
}


variable "separator" {
  default = "."
}
```

If a type constraint is not specified, Terraform defaults to the type "Any".

---

## Simple Variable Types

Terraform supports several simple variable types. Here’s a quick overview:

- **String:** Accepts alphanumeric values.
- **Number:** Accepts numeric values (both positive and negative).
- **Boolean:** Accepts values of either `true` or `false`.

In addition to these, Terraform supports more advanced types such as list, map, set, object, and tuple.

---

## List Variables

A list is an ordered collection of values where each element can be accessed by its index (starting at 0). For example, consider a variable that uses a list of prefixes:

```
variable "prefix" {
  default = ["Mr", "Mrs", "Sir"]
  type    = list(string)
}


resource "random_pet" "my-pet" {
  prefix = var.prefix[0]
}
```

In this configuration:

- `var.prefix[0]` returns "Mr"
- `var.prefix[1]` returns "Mrs"
- `var.prefix[2]` returns "Sir"

---

## Map Variables

Maps allow you to define key-value pairs for storing related data. For example, the following variable stores file content:

```
variable "file_content" {
  type    = map(string)
  default = {
    "statement1" = "We love pets!"
    "statement2" = "We love animals!"
  }
}
```

To reference a specific value from this map in a resource, use the key inside square brackets:

```
resource "local_file" "my-pet" {
  filename = "/root/pets.txt"
  content  = var.file_content["statement2"]
}
```

This fetches the value "We love animals!" from the map.

---

## List and Map Type Constraints

You can enforce type constraints on lists and maps to ensure all elements are of a specific type. For example:

```
variable "prefix" {
  default = ["Mr", "Mrs", "Sir"]
  type    = list(string)
}


variable "numbers" {
  default = [1, 2, 3]
  type    = list(number)
}
```

> [!important]
> **Type Mismatch Warning**
>
> If the default values do not match the declared type, Terraform will produce an error when running `terraform plan` or `terraform apply`. For instance, using a string when a number is required will trigger an error.

Similarly, you can enforce type constraints on maps:

```
variable "cats" {
  default = {
    "color" = "brown"
    "name"  = "bella"
  }
  type = map(string)
}


variable "pet_count" {
  default = {
    "dogs"     = 3
    "cats"     = 1
    "goldfish" = 2
  }
  type = map(number)
}
```

---

## Set Variables

Sets in Terraform are similar to lists but automatically remove duplicate elements. Consider these examples of valid set declarations:

```
variable "prefix" {
  default = ["Mr", "Mrs", "Sir"]
  type    = set(string)
}


variable "fruit" {
  default = ["apple", "banana"]
  type    = set(string)
}


variable "age" {
  default = [10, 12, 15]
  type    = set(number)
}
```

Using duplicate values will trigger an error:

```
variable "prefix" {
  default = ["Mr", "Mrs", "Sir", "Sir"]
  type    = set(string)
}


variable "fruit" {
  default = ["apple", "banana", "banana"]
  type    = set(string)
}


variable "age" {
  default = [10, 12, 15, 10]
  type    = set(number)
}
```

Ensure that when using sets, duplicate values are removed to avoid configuration errors.

---

## Object Variables

Objects allow you to create complex structures by combining various data types. For example, you can define an object representing a cat with multiple attributes:

```
variable "bella" {
  type = object({
    name         = string
    color        = string
    age          = number
    food         = list(string)
    favorite_pet = bool
  })
}
```

Assign default values that adhere to the defined structure:

```
variable "bella" {
  type    = object({
    name         = string
    color        = string
    age          = number
    food         = list(string)
    favorite_pet = bool
  })
  default = {
    name         = "Bella"
    color        = "brown"
    age          = 7
    food         = ["fish", "chicken", "turkey"]
    favorite_pet = true
  }
}
```

This configuration defines a cat named Bella, complete with color, age, favorite foods, and a flag indicating she is a favorite pet.

---

## Tuple Variables

Tuples in Terraform are like lists but allow elements of different types. The order and type of the elements are strictly defined. For example, consider this tuple variable:

```
variable "kitty" {
  type    = tuple([string, number, bool])
  default = ["cat", 7, true]
}
```

This tuple expects exactly three elements: a string, a number, and a boolean. Adding an extra element or an incorrect type will produce an error:

```
variable "kitty" {
  type    = tuple([string, number, bool])
  default = ["cat", 7, true, "dog"]  # This will cause an error.
}
```

> [!important]
> **Tuple Configuration Error**
>
> Running `terraform plan` with the above configuration will generate an error indicating that the default value does not match the tuple's required type structure.

---

That's the end of this lesson. In the next section, we will explore how to work with variable types in Terraform in greater detail. For additional resources, refer to the [Terraform Documentation](https://www.terraform.io/docs) and other related materials.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/df2660a4-c959-4fa7-bfa8-0700885b598e/lesson/2980bbb2-201c-455a-ba27-29ebb2ba1d03)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/df2660a4-c959-4fa7-bfa8-0700885b598e/lesson/86b22ea4-d4ba-4bda-858d-5f0f3b1fd15f)**
>
> Practice lab
