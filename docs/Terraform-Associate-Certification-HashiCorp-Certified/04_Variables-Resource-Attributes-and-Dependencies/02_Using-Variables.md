# Using Variables - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Associate-Certification-HashiCorp-Certified/Variables-Resource-Attributes-and-Dependencies/Using-Variables)

---

## Table of Contents

- Using Variables
  - Adding Validation to Variables
  - Simple Variable Types
  - Working with Lists
  - Using Maps
  - Understanding Sets
  - Complex Data Structures
  - Watch Video
    - Object Type
    - Tuple

---

## Content

Terraform Associate Certification: HashiCorp Certified

Variables Resource Attributes and Dependencies

# Using Variables

In this guide, we’ll review how to use variables in a Terraform configuration. Variables allow you to externalize configuration parameters from your core configuration file. They enable default values, descriptions, and type constraints, making your Terraform configuration more flexible and maintainable.

A variable block is valid even without any defined arguments. However, if no default value is provided, you must supply a value during Terraform execution. It’s a best practice to always include a `description` to explain the variable's intended purpose. Additionally, you can enforce data types using the `type` argument. The optional `sensitive` argument (defaulting to `false`) hides variable values during operations like `terraform plan` or `terraform apply` when set to `true`.

Below is an example of two variable blocks that include these common arguments:

```
variable "ami" {
  default     = "ami-0edab43b6fa892279"
  description = "Type of AMI to use"
  type        = string
  sensitive   = true
}

variable "instance_type" {
  default     = "t2.micro"
  description = "Size of EC2"
  type        = string
  sensitive   = false
}
```

> [!important]
> **Note**
>
> Even if a variable is marked as sensitive, its value will still be stored in the Terraform state file.

---

## Adding Validation to Variables

Terraform allows you to define validation rules within a variable block. For example, consider an AMI variable that should always start with "ami-". You can enforce this requirement using a validation block, where the `substring` function extracts the first four characters and verifies they match "ami-". If the condition is not met, Terraform displays the provided error message.

```
variable "ami" {
  type        = string
  description = "The id of the machine image (AMI) to use for the server."
  validation {
    condition     = substr(var.ami, 0, 4) == "ami-"
    error_message = "The AMI should start with \"ami-\"."
  }
}
```

If you supply an invalid value with the `-var` flag, you’ll see an error similar to the following:

```
$ terraform apply -var "ami=abc-11223"
Error: Invalid value for variable

  on main.tf line 1:
  1: variable "ami" {

The image_id value must be a valid AMI id, starting with "ami-".

This was checked by the validation rule at main.tf:5,3-13.
```

---

## Simple Variable Types

Terraform supports several simple variable types, including `string`, `number`, and `boolean`. Here’s how you can define variables of these types:

```
variable "ami" {
  default     = "ami-0edab43b6fa892279"
  description = "Type of AMI to use"
  type        = string
}

variable "instance_type" {
  default     = "t2.micro"
  description = "Size of EC2"
  type        = string
}

variable "count" {
  default     = 2
  type        = number
  description = "Count of VMs"
}

variable "monitoring" {
  default     = true
  type        = bool
  description = "Enable detailed monitoring"
}
```

It’s important to note that when you specify both a type and a default value, the default must match the declared type. Terraform attempts type conversion when possible, but if the conversion fails (for example, converting the number `1` to a boolean), an error will be raised.

Below is an example demonstrating type conversion:

```
variable "count" {
  default     = "2"
  type        = number
  description = "Count of VMs"
}

variable "monitoring" {
  default     = "true"
  type        = bool
  description = "Enable detailed monitoring"
}
```

The following example will cause an error because type conversion is not possible:

```
variable "monitoring" {
  default     = 1
  type        = bool
  description = "Enable detailed monitoring"
}
```

```
$ terraform init
There are some problems with the configuration, described below.

The Terraform configuration must be valid before initialization so that Terraform can determine which modules and providers need to be installed.
Error: Invalid default value for variable

  on variables.tf line 3, in variable "monitoring":
   3:   default = 1

This default value is not compatible with the variable's type constraint: bool required.
```

---

## Working with Lists

A list is an ordered collection of values. In the example below, the variable `servers` is defined as a list containing three elements. The first element has an index of 0, the second an index of 1, and so on:

```
variable "servers" {
  default = ["web1", "web2", "web3"]
  type    = list
}
```

To reference a specific element in the list, use its index in square brackets. For example, you can reference the first server in a resource block:

```
resource "aws_instance" "web" {
  ami           = var.ami
  instance_type = var.instance_type
  tags = {
    name = var.servers[0]
  }
}
```

---

## Using Maps

Maps store data as key-value pairs, providing a way to associate specific values with named keys. The following example defines a map variable for instance types, which differentiates between production and development environments:

```
variable "instance_type" {
  type    = map
  default = {
    "production"  = "m5.large"
    "development" = "t2.micro"
  }
}

resource "aws_instance" "production" {
  ami           = var.ami
  instance_type = var.instance_type["development"]
  tags = {
    name = var.servers[0]
  }
}
```

You can also enforce more refined constraints with maps and lists. For example, if you need a list of strings or a map of numbers, you can specify the type accordingly:

```
variable "servers" {
  default = ["web1", "web2", "web3"]
  type    = list(string)
}

variable "prefix" {
  default = [1, 2, 3]
  type    = list(number)
}
```

And for maps:

```
variable "instance_type" {
  default = {
    "production"  = "m5.large"
    "development" = "t2.micro"
  }
  type = map(string)
}

variable "server_count" {
  default = {
    "web"   = 3
    "db"    = 1
    "agent" = 2
  }
  type = map(number)
}
```

---

## Understanding Sets

Sets are similar to lists in that they are collections of values, but they do not allow duplicate elements. If duplicate values are provided, Terraform will signal an error during operations.

Examples of valid and invalid set declarations:

```
variable "servers" {
  default = ["web1", "web2", "web3"]
  type    = set(string)
}

variable "db" {
  default = ["db1", "db2"]
  type    = set(string)
}

variable "prefix" {
  default = ["web1", "web2", "web2"]  // Duplicate "web2" will cause an error
  type    = set(string)
}

variable "db" {
  default = ["db1", "db2", "db1"]  // Duplicate "db1" will cause an error
  type    = set(string)
}

variable "count" {
  default = [10, 12, 15]
  type    = set(number)
}
```

---

## Complex Data Structures

Terraform supports complex data structures, such as objects and tuples, to manage hierarchical and heterogeneous data.

### Object Type

An object allows you to combine different types within a single variable. Consider the example of a variable representing details of a cat named Bella:

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

You would assign values to this variable by providing each attribute as specified (e.g., name as "Bella", color as "brown", age as 7, food as a list of items, and favorite_pet as true).

### Tuple

Unlike lists, tuples can contain elements of different types. The types of each element in a tuple are explicitly defined within square brackets. The following example illustrates a tuple variable:

```
variable "web" {
  type    = tuple([string, number, bool])
  default = ["web1", 3, true]
}
```

In this case, the first element must be a string, the second a number, and the third a boolean. If the number or type of elements does not match the definition, Terraform will return an error. For example:

```
variable "web" {
  type    = tuple([string, number, bool])
  default = ["web1", 3, true]
}

variable "db" {
  type    = tuple([string, number, bool])
  default = ["db1", 1, true, "db2"]  // Error: extra element provided
}
```

---

That concludes our overview of using variables in Terraform. Mastery of these variable types and validation rules can significantly enhance the flexibility and reliability of your Terraform configurations. Future articles will delve deeper into advanced Terraform configurations and best practices.

For additional reading, check out these [Terraform documentation resources](https://www.terraform.io/docs).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-associate-certification-hashicorp-certified/module/cca81ade-f05a-42b2-af56-1926cade6582/lesson/d5be9dde-f0f3-4706-a24a-f8cd44064d7e)**
>
> Watch video content
