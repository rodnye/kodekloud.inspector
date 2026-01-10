# Functions Operators and Conditional Expressions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform/OpenTofu-Functions-and-Conditional-Expressions/Functions-Operators-and-Conditional-Expressions)

---

## Table of Contents

- Functions Operators and Conditional Expressions
  - Launching the OpenTofu Console
  - Exploring Functions in the Console
  - Numeric Functions
  - String Functions
  - Collection Functions
  - Summary
  - References
  - Watch Video
    - List Operations
    - Map Operations

---

## Content

OpenTofu: A Beginners Guide to a Terraform Fork Including Migration From Terraform

OpenTofu Functions and Conditional Expressions

# Functions Operators and Conditional Expressions

OpenTofu provides a rich set of built-in functions, operators, and conditional expressions that enhance your infrastructure-as-code (IaC) workflows. This guide will show you how to leverage the interactive console and explore numeric, string, list, and map functions with practical examples.

![The image contains the text "Functions, Operators, and Conditional Expressions" with a logo on the left. It also includes a copyright notice for KodeKloud.](https://kodekloud.com/kk-media/image/upload/v1752882868/notes-assets/images/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform-Functions-Operators-and-Conditional-Expressions/functions-operators-conditional-expressions-logo.jpg)

## Launching the OpenTofu Console

To experiment with functions and interpolations in a live environment, start the interactive console:

```
tofu console
```

> [!important]
> **Note**
>
> The OpenTofu console evaluates HCL expressions in real time. You can inspect variables, resources, and file contents without applying changes.

---

## Exploring Functions in the Console

Given this configuration snippet:

```
resource "aws_iam_policy" "adminUser" {
  name   = "AdminUsers"
  policy = file("admin-policy.json")
}


resource "local_file" "pet_count" {
  filename = var.filename
  count    = length(var.filename)
}


resource "local_file" "pet_each" {
  filename = var.filename
  for_each = toset(var.region)
}


variable "region" {
  type        = list(string)
  default     = ["us-east-1", "us-east-1", "ca-central-1"]
  description = "A list of AWS Regions"
}
```

Try these commands in the console:

```
> file("/root/opentofu-projects/main.tf")
<<EOT
resource "aws_instance" "development" {
  ami           = "ami-0edab43b6fa892279"
  instance_type = "t2.micro"
}
EOT


> length(var.region)
3


> toset(var.region)
toset([
  "ca-central-1",
  "us-east-1",
])
```

- `file(path)` reads the file’s content.
- `length(list)` returns the number of elements (here, `3`).
- `toset(list)` converts a list to a set, removing duplicates.

---

## Numeric Functions

Numeric functions allow you to compare values and perform rounding:

```
variable "num" {
  type        = set(number)
  default     = [250, 10, 11, 5]
  description = "A set of numbers"
}
```

```
> max(-1, 2, -10, 200, -250)
200


> min(-1, 2, -10, 200, -250)
-250


> max(var.num...)
250


> ceil(10.1)
11


> floor(10.9)
10
```

| Function | Description                        | Example              |
| -------- | ---------------------------------- | -------------------- |
| max(...) | Returns the largest number         | `max(1,5,3)` → `5`   |
| min(...) | Returns the smallest number        | `min(1,5,3)` → `1`   |
| ceil(n)  | Rounds up to the nearest integer   | `ceil(10.1)` → `11`  |
| floor(n) | Rounds down to the nearest integer | `floor(10.9)` → `10` |

> [!important]
> **Note**
>
> Use the expansion operator `...` to unpack a collection into individual arguments.

---

## String Functions

Manipulate and transform text with string functions:

```
variable "ami" {
  type        = string
  default     = "ami-xyz,AMI-ABC,ami-efg"
  description = "A comma-separated list of AMI IDs"
}
```

```
> split(",", var.ami)
["ami-xyz", "AMI-ABC", "ami-efg"]


> lower(var.ami)
ami-xyz,ami-abc,ami-efg


> upper(var.ami)
AMI-XYZ,AMI-ABC,AMI-EFG


> title(var.ami)
Ami-Xyz,Ami-Abc,Ami-Efg


> substr(var.ami, 0, 7)
ami-xyz


> join(";", split(",", var.ami))
ami-xyz;AMI-ABC;ami-efg
```

| Function             | Description                                             |
| -------------------- | ------------------------------------------------------- |
| split(sep, string)   | Splits a string into a list of substrings               |
| join(sep, list)      | Joins a list into a single string                       |
| lower(string)        | Converts all characters to lowercase                    |
| upper(string)        | Converts all characters to uppercase                    |
| title(string)        | Capitalizes the first letter of each word               |
| substr(string, o, l) | Extracts a substring starting at offset `o`, length `l` |

---

## Collection Functions

### List Operations

```
variable "ami_list" {
  type        = list(string)
  default     = ["ami-xyz", "AMI-ABC", "ami-efg"]
  description = "A list of AMI IDs"
}
```

```
> length(var.ami_list)
3


> index(var.ami_list, "AMI-ABC")
1


> element(var.ami_list, 2)
ami-efg


> contains(var.ami_list, "AMI-ABC")
true
```

| Function              | Description                               |
| --------------------- | ----------------------------------------- |
| length(list)          | Returns the number of items               |
| index(list, value)    | Finds the position of `value`             |
| element(list, index)  | Retrieves the element at `index`          |
| contains(list, value) | Checks if `value` exists (case-sensitive) |

### Map Operations

```
variable "ami_map" {
  type = map(string)
  default = {
    "us-east-1"    = "ami-xyz"
    "ca-central-1" = "ami-efg"
    "ap-south-1"   = "ami-ABC"
  }
  description = "Map of AMI IDs per region"
}
```

```
> keys(var.ami_map)
["ap-south-1", "ca-central-1", "us-east-1"]


> values(var.ami_map)
["ami-ABC", "ami-efg", "ami-xyz"]


> lookup(var.ami_map, "ca-central-1")
ami-efg


> lookup(var.ami_map, "us-west-2", "ami-pqr")
ami-pqr
```

| Function                  | Description                                            |
| ------------------------- | ------------------------------------------------------ |
| keys(map)                 | Returns a list of all keys                             |
| values(map)               | Returns a list of all values                           |
| lookup(map, key, default) | Retrieves `map[key]` or `default` if the key is absent |

> [!important]
> **Warning**
>
> Calling `lookup` without a default value will error if the key does not exist.

---

## Summary

By mastering these built-in functions, operators, and expressions, you can write more concise, powerful, and maintainable OpenTofu configurations. Experiment in the console, integrate them into your modules, and streamline your IaC development.

## References

- [OpenTofu Documentation](https://opentofu.io/docs/)
- [Terraform Functions](https://www.terraform.io/language/functions)
- [HCL Syntax Guide](https://github.com/hashicorp/hcl)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/042e7b27-75d9-46fc-8f8c-7357d81923c1/lesson/04a842c5-6034-40e1-b2a8-a35a03aed0c9)**
>
> Watch video content
