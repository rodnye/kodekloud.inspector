# Builtin Functions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Associate-Certification-HashiCorp-Certified/Read-generate-and-modify-configuration/Builtin-Functions)

---

## Table of Contents

- Builtin Functions
  - Numeric Functions
  - String Functions
  - Collection Functions
  - Map Functions
  - Watch Video

---

## Content

Terraform Associate Certification: HashiCorp Certified

Read generate and modify configuration

# Builtin Functions

In this lesson, we explore several built-in functions available in Terraform. Throughout your Terraform journey, you have seen functions like `file` (to read file contents), `length` (to count elements in lists or maps), and `toset` (to convert lists into sets). Until now, you may have used these functions within configuration files; however, we haven’t examined in detail how they transform and combine values. Thankfully, Terraform’s interactive console allows you to experiment with these functions and interpolations before integrating them into your configurations.

To start the interactive console, run:

```
$ terraform console
```

The console loads the state associated with your current configuration directory along with any defined variables. This setup lets you test and fine-tune functions and interpolations to ensure they work as expected.

Below is a sample configuration that demonstrates the usage of several functions:

```
resource "aws_iam_policy" "adminUser" {
  name   = "AdminUsers"
  policy = file("admin-policy.json")
}

resource "local_file" "pet" {
  filename = var.filename
  count    = length(var.filename)
}

resource "local_file" "pet" {
  filename = var.filename
  for_each = toset(var.region)
}

variable "region" {
  type        = list(string)
  default     = ["us-east-1", "us-east-1", "ca-central-1"]
  description = "A list of AWS Regions"
}
```

In the console, you can test these functions. For example, using the `file` function displays the contents of a specified file (such as the `main.tf` file). Running the `length` function on the `region` variable returns `3`, while the `toset` function converts the list and removes duplicate values:

```
$ terraform console
> file("/root/terraform-projects/main.tf")
resource "aws_instance" "development" {
  ami           = "ami-0edab43b6fa892279"
  instance_type = "t2.micro"
}
> length(var.region)
3
> toset(var.region)
[
  "ca-central-1",
  "us-east-1",
]
```

In this example, the duplicate `"us-east-1"` is removed when the list is converted to a set.

> [!important]
> **Note**
>
> Terraform offers many other useful built-in functions. In the following sections, we delve into numeric, string, collection, and map functions to enhance your configuration authoring ability.

---

## Numeric Functions

Numeric functions help you perform operations on numbers. For instance, the `max` function returns the largest value among its arguments, while the `min` function returns the smallest.

When using variables as arguments, you can expand a set of values using the expansion operator (`...`). Consider this variable declaration:

```
variable "num" {
  type        = set(number)
  default     = [250, 10, 11, 5]
  description = "A set of numbers"
}
```

You can test numeric functions in the console:

```
$ terraform console
> max(-1, 2, -10, 200, -250)
200
> min(-1, 2, -10, 200, -250)
-250
> max(var.num...)
250
```

Other useful numeric functions include:

- **ceil**: Rounds a floating-point number to the smallest integer greater than or equal to the number (e.g., both 10.1 and 10.9 round up to 11).
- **floor**: Rounds a number down to the largest integer that is less than or equal to the provided value.

---

## String Functions

String functions allow you to manipulate text data effectively. One valuable function is `split`, which converts a string into a list based on a specified separator. For example, if you have a string containing dummy AMI IDs separated by commas, you can split the string into a list:

```
variable "ami" {
  type        = string
  default     = "ami-xyz,AMI-ABC,ami-efg"
  description = "A string containing AMI IDs"
}
```

Test the `split` function in the Terraform console:

```
$ terraform console
> split(",", "ami-xyz,AMI-ABC,ami-efg")
[ "ami-xyz", "AMI-ABC", "ami-efg" ]
> split(",", var.ami)
[ "ami-xyz", "AMI-ABC", "ami-efg" ]
```

Additional string manipulation functions include:

- **lower**: Converts all characters to lowercase.
- **upper**: Converts all characters to uppercase.
- **title**: Capitalizes the first letter of each word.
- **substring**: Extracts a portion of a string using an offset (zero-based indexing) and a specified length.
- **join**: Concatenates a list of strings into a single string.

---

## Collection Functions

Collection functions are designed to work with data types such as sets, lists, and maps. Previously, you used the `length` function to count list elements; other useful functions include:

- **index**: Returns the index of the first occurrence of a specified element in a list. For example, to find the position of `"AMI-ABC"` in the `ami` variable:

  ```
  $ terraform console
  > index(var.ami, "AMI-ABC")
  1
  ```

- **element**: Retrieves the element at a specific index in a list. For instance, to get the element at index `2`:

  ```
  $ terraform console
  > element(var.ami, 2)
  ami-efg
  ```

- **contains**: Checks if a list contains a specified element, returning `true` or `false`:

  ```
  $ terraform console
  > contains(var.ami, "AMI-ABC")
  true
  > contains(var.ami, "AMI-XYZ")
  false
  ```

Consider the following variable declaration for a list of AMI IDs:

```
variable "ami" {
  type        = list(string)
  default     = ["ami-xyz", "AMI-ABC", "ami-efg"]
  description = "A list of AMI IDs"
}
```

Testing these functions in the console demonstrates how you can interactively examine collection data.

---

## Map Functions

Map functions operate on map data types. In this section, we update the `ami` variable to be a map that associates AWS regions with corresponding AMI IDs:

```
variable "ami" {
  type = map(string)
  default = {
    "us-east-1"    = "ami-xyz",
    "ca-central-1" = "ami-efg",
    "ap-south-1"   = "ami-ABC"
  }
  description = "A map of AMI IDs for specific regions"
}
```

Terraform offers several useful map functions:

- **keys**: Returns a list of keys from a map. For instance, the following example demonstrates how to extract all keys from the `ami` map:

  ![The image displays a menu with four buttons labeled: Numeric Functions, String Functions, Collection Functions, and Type Conversion Functions.](https://kodekloud.com/kk-media/image/upload/v1752884104/notes-assets/images/Terraform-Associate-Certification-HashiCorp-Certified-Builtin-Functions/frame_150.jpg)

  In the console:

  ```
  $ terraform console
  > keys(var.ami)
  [
    "ap-south-1",
    "ca-central-1",
    "us-east-1",
  ]
  ```

- **values**: Returns a list of values from the map.

  ```
  $ terraform console
  > values(var.ami)
  [
    "ami-ABC",
    "ami-efg",
    "ami-xyz",
  ]
  ```

- **lookup**: Retrieves a value for a specified key from a map. It accepts the map and key as arguments and throws an error if the key is not found. To avoid errors, you can supply a default value as a third parameter:

  ```
  $ terraform console
  > lookup(var.ami, "ca-central-1")
  ami-efg
  ```

If the key is missing, such as `"us-west-2"`, the following error appears:

```
$ terraform console
> lookup(var.ami, "us-west-2")
Error: Error in function call

  on <console-input> line 1:
 (source code not available)
|-----------------------
| var.ami is map of string with 3 elements

Call to function "lookup" failed: lookup failed to find 'us-west-2'.
```

By providing a default value, Terraform returns that value instead:

```
$ terraform console
> lookup(var.ami, "us-west-2", "ami-pqr")
ami-pqr
```

In this case, when `"us-west-2"` is absent from the map, Terraform returns the supplied default `"ami-pqr"`.

---

This lesson has covered a variety of built-in functions ranging from numeric and string operations to collection and map manipulations. Mastering these functions is essential for creating dynamic, robust Terraform configurations that are both efficient and scalable. For additional guidance, explore the [Terraform Documentation](https://www.terraform.io/docs) and related resources.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-associate-certification-hashicorp-certified/module/c59e52ed-8a8c-4a6c-8ad0-8dcc38c1598e/lesson/a019bf6d-1f93-4bfd-936a-08bd52e27676)**
>
> Watch video content
