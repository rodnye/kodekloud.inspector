# Operators and Conditional Expressions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Associate-Certification-HashiCorp-Certified/Read-generate-and-modify-configuration/Operators-and-Conditional-Expressions)

---

## Table of Contents

- Operators and Conditional Expressions
  - Arithmetic Operators
  - Equality and Comparison Operators
  - Logical Operators
  - Operators with Terraform Variables
  - Conditional Expressions in Terraform
  - Conclusion
  - Watch Video

---

## Content

Terraform Associate Certification: HashiCorp Certified

Read generate and modify configuration

# Operators and Conditional Expressions

In this lesson, we explore common operators and conditional expressions in Terraform. You previously learned about testing functions with the Terraform console command. Terraform not only allows you to perform arithmetic and logical operations, but it also enables you to experiment with these operations directly in the console.

## Arithmetic Operators

Terraform supports arithmetic operations using standard operators. For instance, you can perform simple addition and subtraction as demonstrated below:

```
$ terraform console
> 1 + 2
3
> 5 - 3
2
```

## Equality and Comparison Operators

Equality operators compare two values (regardless of data type) and return a Boolean result. Use the double equals operator (==) to check if values are identical, while the not-equal operator (!=) returns true if the values differ. Note that comparisons between different data types, such as a number and a string, will evaluate to false:

```
$ terraform console
> 8 == 8
true
> 8 == 7
false
> 8 != "8"
true
```

Terraform also supports greater than (>), less than (<), greater than or equal to (>=), and less than or equal to (<=) operators to compare numeric values.

## Logical Operators

Terraform’s logical operators allow you to combine multiple Boolean expressions. The logical AND operator (&&) returns true only when both operands are true:

```
$ terraform console
> 8 > 7 && 8 < 10
true
```

Similarly, the logical OR operator returns true if at least one condition is true. Additionally, Terraform includes the NOT operator (!) which inverts a Boolean value. For example, if you have a Boolean variable named special set to true, applying the NOT operator will yield false.

Another scenario uses the NOT operator in tandem with a comparison expression. If the variable b holds the value 25, then the expression "not (b > 30)" returns true, since 25 is not greater than 30.

## Operators with Terraform Variables

Consider the following Terraform configuration that defines two numeric variables, a and b:

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

You can use operators to compare these variables as shown here:

```
$ terraform console
> var.a > var.b
true
```

## Conditional Expressions in Terraform

Conditional expressions in Terraform allow you to assign values dynamically based on a condition. The syntax for a conditional expression is:

condition ? value_if_true : value_if_false

For example, you can generate a new password using the random password resource from the Random Provider, where the password's length is determined by a variable. First, consider this basic configuration that utilizes a user-specified length:

```
resource "random_password" "password-generator" {
  length = var.length
}


output "password" {
  value = random_password.password-generator.result
}
```

Here is the corresponding variable definition:

```
variable "length" {
  type        = number
  description = "The length of the password"
}
```

When you apply Terraform with a length specified, such as 5, the password is generated with that length:

```
$ terraform apply -var=length=5 -auto-approve
random_password.password-generator: Creating...
random_password.password-generator: Creation complete after 0s [id=null]
Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
Outputs:
```

> [!important]
> **Minimum Password Length**
>
> To ensure security, you often want to enforce a minimum password length. In many shell scripts, you might see a conditional check like this:
>
> ```
> if [ $length -lt 8 ]; then
> length=8
> echo $length
> else
> echo $length
> fi
> ```

You can achieve similar functionality in Terraform by incorporating a conditional expression directly into your resource block. Update the resource block for the random password to enforce a minimum length of 8:

```
resource "random_password" "password-generator" {
  length = var.length < 8 ? 8 : var.length
}


output "password" {
  value = random_password.password-generator.result
}
```

The variable definition remains unchanged:

```
variable "length" {
  type        = number
  description = "The length of the password"
}
```

In this configuration, Terraform checks whether the provided length is less than 8. If it is, Terraform uses 8 as the password length; otherwise, it uses the user-specified value. For example, if you run Terraform with a length value of 5, the resource will enforce an 8-character password. Conversely, if you specify a value greater than 8 (e.g., 12), Terraform will use that value.

## Conclusion

This lesson covered the use of arithmetic, equality, comparison, and logical operators in Terraform. It also demonstrated how to implement conditional expressions to enforce configuration constraints. To reinforce your learning, proceed to the multiple-choice quiz for this section.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-associate-certification-hashicorp-certified/module/c59e52ed-8a8c-4a6c-8ad0-8dcc38c1598e/lesson/57e88010-91d8-497f-bb4a-a8c8d9e1438e)**
>
> Watch video content
