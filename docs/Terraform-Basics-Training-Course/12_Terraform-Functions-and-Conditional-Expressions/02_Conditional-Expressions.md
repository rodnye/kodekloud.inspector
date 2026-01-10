# Conditional Expressions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Basics-Training-Course/Terraform-Functions-and-Conditional-Expressions/Conditional-Expressions)

---

## Table of Contents

- Conditional Expressions
  - Arithmetic Operators
  - Equality and Comparison Operators
  - Logical Operators
  - Using Conditional Expressions for Dynamic Configuration
  - Watch Video
  - Practice Lab
    - Example: Enforcing a Minimum Password Length

---

## Content

Terraform Basics Training Course

Terraform Functions and Conditional Expressions

# Conditional Expressions

In this guide, we will explore common operators and conditional expressions in Terraform. You will learn how to use arithmetic, equality, comparison, and logical operators interactively in the Terraform console and within configuration files.

## Arithmetic Operators

Terraform supports basic arithmetic operations. You can use the Terraform console to evaluate expressions as shown below:

```
$ terraform console
> 1 + 2
3
> 5 - 3
2
```

## Equality and Comparison Operators

Terraform provides equality operators that compare values from any data type and return a boolean result. Use the double equals operator (`==`) to test for equality:

```
$ terraform console
> 8 == 8
true
> 8 == 7
false
> 8 != "8"
true
```

In the examples above, although the numeric value 8 equals 8, comparing the number 8 with the string "8" results in a false for equality (`==`) and true for inequality (`!=`).

Comparison operators such as greater than (`>`), less than (`<`), greater than or equal to (`>=`), and less than or equal to (`<=`) work with numbers only. For example:

```
$ terraform console
> 5 > 7
false
> 5 > 4
true
> 5 > 5
false
> 5 >= 5
true
> 4 < 5
true
> 3 <= 4
true
```

## Logical Operators

Terraform also supports logical operators to combine boolean expressions. Use the logical AND operator (`&&`) when you need both conditions to be true:

```
$ terraform console
> 8 > 7 && 8 < 10
true
> 8 > 10 && 8 < 10
false
```

Similarly, the logical OR operator (`||`) returns true if at least one condition is true, and the NOT operator (`!`) inverts a boolean value. Consider the following examples using a boolean variable:

```
$ terraform console
> 8 > 7 && 8 < 10
true
> 8 > 10 && 8 < 10
false
> 8 > 9 || 8 < 10
true
> var.special
true
> ! var.special
false
```

Below is the Terraform configuration for the variable used in the example:

```
variable "special" {
  type        = bool
  default     = true
  description = "Set to true to use special characters"
}
```

Another example involves a numeric variable. Suppose variable `b` has a default value of 25. Using the NOT operator to check if 25 is not greater than 30:

```
$ terraform console
> ! (var.b > 30)
true
```

Here is the configuration for variable `b`:

```
variable "b" {
  type    = number
  default = 25
}
```

You can also compare variables. If you define two number variables `a` and `b`, you can compare them like this:

```
$ terraform console
> var.a > var.b
true
```

Configuration for variables `a` and `b`:

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

## Using Conditional Expressions for Dynamic Configuration

Conditional expressions in Terraform allow you to assign values based on a condition in a concise manner. The syntax follows:

```
condition ? value_if_true : value_if_false
```

### Example: Enforcing a Minimum Password Length

Imagine you need to generate a new password with a minimum length requirement. The following example shows how to use Terraform’s random password resource from the random provider.

Initially, define the resource without any condition:

```
resource "random_password" "password-generator" {
  length = var.length
}


output "password" {
  value = random_password.password-generator.result
}
```

And define the variable in a separate file:

```
variable "length" {
  type        = number
  description = "The length of the password"
}
```

When running the Terraform apply command, you would supply the length manually:

```
$ terraform apply -var=length=5 -auto-approve
random_password.password-generator: Creating...
random_password.password-generator: Creation complete after 0s [id=None]


Apply complete! Resources: 1 added, 0 changed, 0 destroyed.


Outputs:
password = sjsrW
```

However, to enforce a minimum length of 8 characters, update the resource using a conditional expression:

```
resource "random_password" "password-generator" {
  length = var.length < 8 ? 8 : var.length
}


output "password" {
  value = random_password.password-generator.result
}
```

The variable definition remains the same:

```
variable "length" {
  type        = number
  description = "The length of the password"
}
```

Now, when you apply Terraform commands, the configuration enforces a minimum length. For example:

> [!important]
> **Applying with length 5**
>
> When applying with a length of 5:
>
> ````
> $ terraform apply -var=length=5
> Terraform will perform the following actions:
>
>
> # random_password.password-generator will be created
> + resource "random_password" "password-generator" {
> + id     = (known after apply)
> + length = 8
> }
>
>
> Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
>
>
> Outputs:
> password = &(1Beiaq)
> ```> [!important]
> **Applying with length 12**
>
> When applying with a length of 12:
>
> ````
>
> $ terraform apply -var=length=12
> Terraform will perform the following actions:
>
> # random_password.password-generator must be replaced
>
> -/+ resource "random_password" "password-generator" {
> ~ id = "none" -> (known after apply)
> ~ length = 8 -> 12 # forces replacement.
> }
>
> Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
>
> Outputs:
> password = 8B@}{cUzrZ7
>
> ```
>
> ```

This demonstrates how conditional expressions can enforce configuration constraints and dynamically adjust resource properties in Terraform.

That concludes this article on conditional expressions. Proceed to the practice tests and explore further topics such as functions and advanced conditional statements in Terraform.

For more detailed guides and best practices, check out the following links:

- [Terraform Documentation](https://www.terraform.io/docs)
- [Terraform Registry](https://registry.terraform.io/)
- [Getting Started with Terraform](https://learn.hashicorp.com/terraform)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/cdfc2941-5d41-4d7c-b701-cddd299de4c5/lesson/ebc671d1-4c99-4da8-a58d-1a76acc4c066)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/cdfc2941-5d41-4d7c-b701-cddd299de4c5/lesson/adfa642b-22f5-4476-9f1a-40b0e5d2c834)**
>
> Practice lab
