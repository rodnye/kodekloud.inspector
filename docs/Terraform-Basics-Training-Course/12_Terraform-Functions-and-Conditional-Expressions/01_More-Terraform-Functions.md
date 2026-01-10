# More Terraform Functions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Basics-Training-Course/Terraform-Functions-and-Conditional-Expressions/More-Terraform-Functions)

---

## Table of Contents

- More Terraform Functions
  - Launching the Interactive Console
  - Numeric Functions
  - String Functions
  - Collection Functions
  - Map Functions
  - Conclusion
  - Watch Video

---

## Content

Terraform Basics Training Course

Terraform Functions and Conditional Expressions

# More Terraform Functions

In this lesson, we'll explore additional functions available in Terraform. Throughout this course, we've used functions like `file` to read file data, `length` to count elements in lists or maps, and `toSet` to convert lists into sets. However, we haven't yet taken a closer look at how these functions process or transform values. Fortunately, Terraform’s interactive console allows you to test functions and interpolations before using them in your configurations.

> [!important]
> **Tip**
>
> For a safe and interactive testing environment, always validate changes in the console to prevent unexpected results in production.

## Launching the Interactive Console

To start the interactive console, run:

```
$ terraform console
```

By default, the console loads the state from your current configuration directory and includes any variables defined in your configuration files, making it an ideal environment for experimentation.

Below is an example configuration that demonstrates the use of the `file`, `length`, and `toSet` functions:

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
  description = "A list of AWS regions"
}
```

After launching the console, you can run commands like these:

```
$ terraform console
> file("/root/terraform-projects/main.tf")
resource "aws_instance" "development" {
  ami           = "ami-0edab43b6fa892279"
  instance_type = "t2.micro"
}
> length(var.region)
3
```

The output confirms that the `region` list variable contains three elements. Note that using `toSet` with duplicate values (like "us-east-1") automatically removes duplications because sets do not allow duplicates.

Terraform offers dozens of built-in functions to help you manage your configuration data. In the following sections, we'll review some commonly used functions categorized by their use cases: numeric operations, string manipulation, collection processing, and map handling.

---

## Numeric Functions

Numeric functions are useful for manipulating numerical values. For example, the `max` function returns the largest number among its arguments, while `min` returns the smallest. When working with sets or lists of numbers stored in a variable, you can use the expansion operator (`...`) to pass individual arguments.

Consider the following variable definition:

```
variable "num" {
  type        = set(number)
  default     = [250, 10, 11, 5]
  description = "A set of numbers"
}
```

You can experiment with numeric functions in the Terraform console:

```
$ terraform console
> max(-1, 2, -10, 200, -250)
200
> min(-1, 2, -10, 200, -250)
-250
> max(var.num...)
250
```

Other commonly used numeric functions include:

- `ceil`: Rounds a number up to the nearest whole integer.
- `floor`: Rounds a number down to the nearest whole integer.

Example usage:

```
$ terraform console
> ceil(10.1)
11
> ceil(10.9)
11
> floor(10.9)
10
```

---

## String Functions

String functions help with transforming and manipulating text data. One useful function is `split`, which turns a string into a list based on a specified separator. For example, if you have a comma-separated string of AMI IDs, you can convert it into a list.

Here is a variable definition containing AMI IDs:

```
variable "ami" {
  type        = string
  default     = "ami-xyz,AMI-ABC,ami-efg"
  description = "A string containing AMI IDs"
}
```

Test the split operation in the console:

```
$ terraform console
> split(",", "ami-xyz,AMI-ABC,ami-efg")
[ "ami-xyz", "AMI-ABC", "ami-efg" ]
> split(",", var.ami)
[ "ami-xyz", "AMI-ABC", "ami-efg" ]
```

To change the case of a string, use:

- `lower`: Converts the string to lowercase.
- `upper`: Converts the string to uppercase.
- `title`: Converts the first character of each word to uppercase.

Example usage:

```
$ terraform console
> lower(var.ami)
ami-xyz,ami-abc,ami-efg
> upper(var.ami)
AMI-XYZ,AMI-ABC,AMI-EFG
> title(var.ami)
Ami-Xyz,AMI-ABC,Ami-Efg
```

The `substr` function extracts a substring by specifying an offset and a length. Note that indexes start at zero. For instance:

```
$ terraform console
> substr(var.ami, 0, 7)
ami-xyz
> substr(var.ami, 8, 7)
AMI-ABC
> substr(var.ami, 16, 7)
ami-efg
```

---

## Collection Functions

Collection functions work with data types such as sets, lists, and maps. The `length` function, for example, returns the number of elements in a list. Consider this variable:

```
variable "ami" {
  type        = list(string)
  default     = ["ami-xyz", "AMI-ABC", "ami-efg"]
  description = "A list of AMI IDs"
}
```

Determine its length using:

```
$ terraform console
> length(var.ami)
3
```

Other useful collection functions include:

- `index`: Finds the index of a specific element in a list.
- `element`: Retrieves the element at a particular index.
- `contains`: Checks if a list contains a specific element, returning `true` or `false`.

Example usage:

```
$ terraform console
> index(var.ami, "AMI-ABC")
1
> element(var.ami, 2)
ami-efg
> contains(var.ami, "AMI-ABC")
true
> contains(var.ami, "AMI-XYZ")
false
```

> [!important]
> **Important**
>
> Remember that list indexing starts at zero, and the `contains` function is case-sensitive.

---

## Map Functions

Map functions allow you to work with key-value pairs. Consider a variable where AMI IDs are stored in a map with regions as keys:

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

You can convert the map into lists of keys or values using the `keys` and `values` functions:

```
$ terraform console
> keys(var.ami)
[
  "ap-south-1",
  "ca-central-1",
  "us-east-1",
]
> values(var.ami)
[
  "ami-ABC",
  "ami-efg",
  "ami-xyz",
]
```

To retrieve a value for a specific key, use the `lookup` function. It takes the map and the key as arguments. If the key is missing, the function raises an error unless a default value is provided.

Example without a default value:

```
$ terraform console
> lookup(var.ami, "ca-central-1")
ami-efg
> lookup(var.ami, "us-west-2")
Error: Error in function call


  on <console-input> line 1:
  (source code not available)


Call to function "lookup" failed: lookup failed to find 'us-west-2'.
```

Providing a default value ensures safe lookups:

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

```
$ terraform console
> lookup(var.ami, "us-west-2", "ami-PQR")
ami-PQR
```

In this example, since the key "us-west-2" does not exist in the map, the `lookup` function returns "ami-PQR" as the default value.

---

## Conclusion

This lesson provided an overview of various Terraform functions used for numeric operations, string manipulation, collection handling, and map lookups. By experimenting with these functions in the Terraform console, you can dynamically manipulate and transform data within your configurations, ultimately making your Terraform scripts more efficient and flexible.

For more details on Terraform functions and best practices, visit the [Terraform Documentation](https://www.terraform.io/docs).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/cdfc2941-5d41-4d7c-b701-cddd299de4c5/lesson/69f247fc-d253-4fc5-8d99-53d27897f098)**
>
> Watch video content
