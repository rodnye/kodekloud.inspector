# Conditional Expressions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform/OpenTofu-Functions-and-Conditional-Expressions/Conditional-Expressions)

---

## Table of Contents

- Conditional Expressions
  - Table of Contents
  - Interactive Arithmetic in the Console
  - Equality & Inequality Operators
  - Comparison Operators
  - Logical Operators & NOT
  - Defining Variables and Testing Expressions
  - Ternary (Conditional) Expressions in Configurations
  - References
  - Watch Video

---

## Content

OpenTofu: A Beginners Guide to a Terraform Fork Including Migration From Terraform

OpenTofu Functions and Conditional Expressions

# Conditional Expressions

Explore how to use arithmetic, comparison, equality, logical, and conditional operators in OpenTofu configurations and the interactive console.

## Table of Contents

- [Interactive Arithmetic in the Console](#interactive-arithmetic-in-the-console)
- [Equality & Inequality Operators](#equality--inequality-operators)
- [Comparison Operators](#comparison-operators)
- [Logical Operators & NOT](#logical-operators--not)
- [Defining Variables and Testing Expressions](#defining-variables-and-testing-expressions)
- [Ternary (Conditional) Expressions in Configurations](#ternary-conditional-expressions-in-configurations)
- [References](#references)

---

## Interactive Arithmetic in the Console

You can quickly evaluate math expressions in the OpenTofu console:

```
$ tofu console
> 1 + 2
3
> 10 / 4
2.5
> 7 * (3 - 1)
14
```

## Equality & Inequality Operators

Equality and inequality comparisons return a Boolean. Use them to compare values of any type:

```
$ tofu console
> 8 == 8
true
> 8 != "8"
true
> 8 == "8"
false
```

> [!important]
> **Note**
>
> The operators `==` and `!=` are **type-sensitive**. A number and a string holding the same digits are considered unequal.

## Comparison Operators

Numeric comparisons also yield Boolean results. Here’s a quick reference:

| Operator | Description              | Example         |
| -------- | ------------------------ | --------------- |
| `>`      | Greater than             | `5 > 4` → true  |
| `>=`     | Greater than or equal to | `5 >= 5` → true |
| `<`      | Less than                | `3 < 4` → true  |
| `<=`     | Less than or equal to    | `3 <= 3` → true |

```
$ tofu console
> 5 > 7
false
> 4 <= 5
true
```

## Logical Operators & NOT

Combine Boolean expressions using **AND** (`&&`) and **OR** (`||`), and invert them with **NOT** (`!`):

```
$ tofu console
> (8 > 7) && (8 < 10)
true
> (8 > 10) || (8 < 10)
true
> !(8 == 8)
false
```

## Defining Variables and Testing Expressions

You can declare variables in HCL and reference them in the console:

```
variable "a" {
  type    = number
  default = 50
}


variable "b" {
  type    = number
  default = 25
}
```

```
$ tofu console
> var.a > var.b
true
> var.a + var.b
75
```

## Ternary (Conditional) Expressions in Configurations

Use the ternary operator (`condition ? true_val : false_val`) to enforce defaults. For example, generate a random password whose length is at least 8 characters:

```
variable "length" {
  type        = number
  description = "Desired password length (minimum 8)"
}


resource "random_password" "password_generator" {
  length = var.length < 8 ? 8 : var.length
}


output "password" {
  value     = random_password.password_generator.result
  sensitive = true
}
```

> [!important]
> **Warning**
>
> Always enforce a minimum length for generated passwords to maintain security standards.

Initialize, plan, and apply:

```
$ tofu init
$ tofu plan -var='length=5'
$ tofu apply -var='length=5' -auto-approve
```

Even if you pass `length=5`, OpenTofu generates an 8-character password. Passing a higher value (e.g., 12) yields a 12-character result.

---

## References

- [OpenTofu Documentation](https://docs.opentofu.org/)
- [Random Provider: `random_password` Resource](https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/password)
- [Terraform Expressions](https://www.terraform.io/docs/language/expressions/index.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/042e7b27-75d9-46fc-8f8c-7357d81923c1/lesson/afe39695-bab7-4cbb-a6a0-72949fbc7e52)**
>
> Watch video content
