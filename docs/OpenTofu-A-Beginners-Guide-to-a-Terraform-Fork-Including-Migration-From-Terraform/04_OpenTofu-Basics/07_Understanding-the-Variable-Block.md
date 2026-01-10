# Understanding the Variable Block - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform/OpenTofu-Basics/Understanding-the-Variable-Block)

---

## Table of Contents

- Understanding the Variable Block
  - Defining Defaults and Descriptions
  - Specifying a Type
  - Marking Variables as Sensitive
  - Input Validation
  - Simple Types
  - Collection Types
  - Links and References
  - Watch Video
    - List
    - Map
    - Set
    - Object
    - Tuple

---

## Content

OpenTofu: A Beginners Guide to a Terraform Fork Including Migration From Terraform

OpenTofu Basics

# Understanding the Variable Block

In this lesson, we’ll explore how to declare and manage input variables in your OpenTofu configuration. A `variable` block can be empty—if you omit arguments, you must provide its value at runtime (for example, with `tofu apply --var 'name=value'`). You can also specify defaults, descriptions, types, sensitivity flags, and validation rules to enforce best practices and improve readability.

> [!important]
> **Note**
>
> If you don’t set a `default`, OpenTofu will require the variable at apply time. Use `--var` or environment variables to supply missing values.

---

## Defining Defaults and Descriptions

Provide fallback values and document their purpose with the `default` and `description` arguments:

```
variable "ami" {
  default     = "ami-0edab43b6fa892279"
  description = "EC2 machine image ID"
}


variable "instance_type" {
  default     = "t2.micro"
  description = "EC2 instance size"
}
```

---

## Specifying a Type

By default, variables accept any value. Enforce strict typing using the `type` argument:

```
variable "ami" {
  description = "EC2 machine image ID"
  type        = string
  default     = "ami-0edab43b6fa892279"
}


variable "instance_type" {
  description = "EC2 instance size"
  type        = string
  default     = "t2.micro"
}
```

---

## Marking Variables as Sensitive

Set `sensitive = true` to hide variable values in plan/apply outputs (the state file still records them). The default is `false`.

```
variable "ami" {
  description = "EC2 machine image ID"
  type        = string
  default     = "ami-0edab43b6fa892279"
  sensitive   = true
}


variable "instance_type" {
  description = "EC2 instance size"
  type        = string
  default     = "t2.micro"
  sensitive   = false
}
```

> [!important]
> **Warning**
>
> Sensitive variables will not be displayed in CLI output, but they are stored in the state file. Protect your state accordingly.

---

## Input Validation

Use a `validation` block to enforce naming conventions or other business rules:

```
variable "ami" {
  description = "The ID of the machine image (AMI) to use for the server."
  type        = string


  validation {
    condition     = substr(var.ami, 0, 4) == "ami-"
    error_message = "The AMI must start with \"ami-\"."
  }
}
```

Trying an invalid AMI:

```
$ tofu apply --var 'ami=abc-11223'
Error: Invalid value for variable


  on main.tf line 1:
   1: variable "ami" {

  The AMI must start with "ami-".
  This was checked by the validation rule at main.tf:5,3-13.
```

---

## Simple Types

OpenTofu supports these basic types: `string`, `number`, `bool`, and (by default) `any`. OpenTofu will attempt conversion between string↔number and string↔bool, but other mismatches cause errors.

> [!important]
> **Type Conversion**
>
> OpenTofu converts `"2"` → `2` and `"true"` → `true`. Invalid conversions (e.g., `"abc"` → number) will fail during planning.

| Type   | Example Default     | Description         |
| ------ | ------------------- | ------------------- |
| string | `"ami-0edab43b6fa"` | Text values         |
| number | `2`                 | Numeric values      |
| bool   | `true`              | Boolean flags       |
| any    | omitted or `null`   | Any type, no checks |

```
variable "count" {
  default     = 2
  type        = number
  description = "Number of VMs to create"
}


variable "monitoring" {
  default     = true
  type        = bool
  description = "Enable detailed monitoring"
}
```

---

## Collection Types

OpenTofu also supports composite types: `list`, `map`, `set`, `object`, and `tuple`. Use them to model complex inputs.

| Collection | Description                               | Syntax                 |
| ---------- | ----------------------------------------- | ---------------------- |
| list       | Ordered sequence of elements              | list(string)           |
| map        | Key-value pairs with uniform value types  | map(string)            |
| set        | Unordered unique elements (no duplicates) | set(string)            |
| object     | Structured attributes with named types    | object({ ... })        |
| tuple      | Fixed-length heterogeneous sequence       | tuple(\\[type, ...\\]) |

### List

```
variable "servers" {
  type    = list(string)
  default = ["web1", "web2", "web3"]
}
```

Access by index:

```
resource "aws_instance" "web" {
  ami           = var.ami
  instance_type = var.instance_type
  tags = {
    name = var.servers[0]  # "web1"
  }
}
```

### Map

```
variable "instance_type" {
  type = map(string)
  default = {
    production  = "m5.large"
    development = "t2.micro"
  }
}


resource "aws_instance" "dev" {
  ami           = var.ami
  instance_type = var.instance_type["development"]
  tags = {
    name = var.servers[0]
  }
}
```

### Set

```
variable "prefixes" {
  type    = set(string)
  default = ["web1", "web2", "web3"]
}


variable "prefix_dup_error" {
  type    = set(string)
  default = ["web1", "web2", "web1"]  # Error: duplicate element
}
```

### Object

```
variable "bella" {
  type = object({
    name         = string
    color        = string
    age          = number
    food         = list(string)
    favorite_pet = bool
  })
  default = {
    name         = "bella"
    color        = "brown"
    age          = 7
    food         = ["fish", "chicken", "turkey"]
    favorite_pet = true
  }
}
```

### Tuple

```
variable "web" {
  type    = tuple([string, number, bool])
  default = ["web1", 7, true]
}


variable "db" {
  type    = tuple([string, number, bool])
  default = ["db1", 1, true, "db2"]  # ERROR: expects exactly 3 elements
}
```

---

## Links and References

- [OpenTofu Variables Documentation](https://opentofu.io/docs/configuration/variables)
- [Terraform Input Variables](https://www.terraform.io/language/values/variables)
- [HCL Language Reference](https://github.com/hashicorp/hcl)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/c3586b29-e450-4c95-bad9-91bdf332eb24/lesson/89884371-90c1-40df-8f7a-7d1384e84c64)**
>
> Watch video content
