# Demo Functions and Conditional Expressions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform/OpenTofu-Functions-and-Conditional-Expressions/Demo-Functions-and-Conditional-Expressions)

---

## Table of Contents

- Demo Functions and Conditional Expressions
  - Table of Contents
  - 1. Floor Function
  - 2. Title Function
  - 3. Lookup Function
  - 4. Common Functions Overview
  - 5. Splitting a Colon-Separated String for IAM Users
  - 6. Querying a Resource by Index
  - 7. Finding the Index of a List Element
  - 8. Uploading Files to S3 with for_each
  - 9. Conditional Expressions in an EC2 Resource
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

OpenTofu: A Beginners Guide to a Terraform Fork Including Migration From Terraform

OpenTofu Functions and Conditional Expressions

# Demo Functions and Conditional Expressions

Welcome to this hands-on tutorial where you’ll explore key OpenTofu functions and conditional expressions. We’ll run various examples in the OpenTofu console to see how they transform values and control resource creation in Terraform configurations.

## Table of Contents

1.  Floor Function
2.  Title Function
3.  Lookup Function
4.  Common Functions Overview
5.  Splitting a Colon-Separated String for IAM Users
6.  Querying a Resource by Index
7.  Finding the Index of a List Element
8.  Uploading Files to S3 with `for_each`
9.  Conditional Expressions in an EC2 Resource
10. Links and References

---

## 1\. Floor Function

Use the `floor` function to round a number down to the nearest integer. What does `floor(10.9)` return?

![The image shows a coding lab interface with a question about the `floor(10.9)` function, offering multiple-choice answers. On the right, there's a Visual Studio Code editor with a welcome message and a terminal open.](https://kodekloud.com/kk-media/image/upload/v1752882862/notes-assets/images/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform-Demo-Functions-and-Conditional-Expressions/coding-lab-floor-function-multiple-choice.jpg)

Run in the console:

```
> tofu console
> floor(10.9)
10
```

> [!important]
> **Note**
>
> The `floor` function always returns an integer by discarding any fractional part.

---

## 2\. Title Function

The `title` function capitalizes the first letter of each word in a string:

```
> tofu console
> title("user-generated password file")
"User-Generated Password File"
```

---

## 3\. Lookup Function

Retrieve a value from a map by key, with a fallback default:

```
> tofu console
> lookup({ a = "apple", b = "banana" }, "a", "unknown")
"apple"
```

The first argument must be a **map**. If the key isn’t found, `lookup` returns the provided default.

---

## 4\. Common Functions Overview

| Function | Purpose                               | Example                                  |
| -------- | ------------------------------------- | ---------------------------------------- |
| floor    | Round down to nearest integer         | `floor(3.7)` → `3`                       |
| title    | Capitalize each word in a string      | `title("hello world")` → `"Hello World"` |
| lookup   | Fetch map value by key or default     | `lookup(var.map, "key", "default")`      |
| split    | Split string into a list by delimiter | `split(":", "a:b:c")` → `["a","b","c"]`  |
| length   | Return length of list or string       | `length(["x","y"])` → `2`                |
| index    | Find index of an element in a list    | `index(["x","y"], "y")` → `1`            |

---

## 5\. Splitting a Colon-Separated String for IAM Users

In your project directory:

```
cd ~/OpenTofu-projects/project-sonic
```

`variables.tf` contains:

```
variable "cloud_users" {
  type    = string
  default = "andrew:ken:faraz:mutsumi:peter:steve:braja"
}
```

Without modifying `variables.tf`, split `cloud_users` into a list and create an IAM user for each name. Add this to `main.tf`:

```
resource "aws_iam_user" "cloud" {
  count = length(split(":", var.cloud_users))
  name  = split(":", var.cloud_users)[count.index]
}
```

Initialize and apply:

```
tofu init
tofu plan
tofu apply
```

You should see **seven** IAM users created.

---

## 6\. Querying a Resource by Index

To inspect a specific IAM user, launch the console:

```
> tofu console
> aws_iam_user.cloud[6].name
"braja"
```

---

## 7\. Finding the Index of a List Element

Given this variable in `variables.tf`:

```
variable "sf" {
  type = list(string)
  default = [
    "ryu", "ken", "akuma", "seth", "zangief",
    "poison", "thawk", "rashid", "fang", "birdie",
  ]
}
```

Locate the index of `"rashid"`:

![The image shows a split screen with a coding task on the left and a code editor on the right. The code editor displays a Terraform configuration file and a terminal output related to AWS IAM user creation.](https://kodekloud.com/kk-media/image/upload/v1752882863/notes-assets/images/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform-Demo-Functions-and-Conditional-Expressions/coding-task-terraform-aws-iam.jpg)

```
> tofu console
> index(var.sf, "rashid")
7
```

---

## 8\. Uploading Files to S3 with `for_each`

Your set of media paths is defined in `var.media`. An S3 bucket is declared in `main.tf`:

```
resource "aws_s3_bucket" "sonic_media" {
  bucket = var.bucket
}
```

Add this resource to upload each file:

```
resource "aws_s3_object" "upload_sonic_media" {
  for_each = var.media
  bucket   = aws_s3_bucket.sonic_media.id
  key      = substr(each.value, 7, length(each.value) - 7)
  source   = each.value
}
```

- `for_each = var.media` iterates over each path.
- `key` removes the leading `/media/` (offset 7).
- `source` points to the original file.

Apply the changes:

```
tofu apply
```

All files will be uploaded to your S3 bucket.

![The image shows a coding environment with instructions on creating an S3 bucket using Terraform. The code editor displays a Terraform configuration file, and the terminal shows the output of a successful resource creation.](https://kodekloud.com/kk-media/image/upload/v1752882864/notes-assets/images/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform-Demo-Functions-and-Conditional-Expressions/s3-bucket-terraform-configuration-diagram.jpg)

> [!important]
> **Tip**
>
> You can verify uploads by checking the S3 console or using `aws s3 ls s3://<bucket-name>/`.

---

## 9\. Conditional Expressions in an EC2 Resource

Switch to the `project-mario` directory:

```
cd ~/opentofu-projects/project-mario
```

`variables.tf` includes:

```
variable "name" {
  type = string
}


variable "ami" {
  type    = string
  default = "ami-09331245601cf"
}


variable "small" {
  type    = string
  default = "t2.nano"
}


variable "large" {
  type    = string
  default = "t2.2xlarge"
}
```

Define an EC2 instance that chooses its size based on `var.name`:

```
resource "aws_instance" "mario_servers" {
  ami           = var.ami
  instance_type = var.name == "tiny" ? var.small : var.large


  tags = {
    Name = var.name
  }
}
```

Initialize and plan with `-var`:

```
tofu init
tofu plan -var='name="tiny"'
tofu plan -var='name="big"'
# instance_type = t2.2xlarge
```

This completes our walkthrough of OpenTofu functions and conditional expressions. Great job!

![The image shows a coding environment with instructions to create an EC2 instance using Terraform, alongside a code editor displaying Terraform configuration files and a terminal with output messages.](https://kodekloud.com/kk-media/image/upload/v1752882866/notes-assets/images/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform-Demo-Functions-and-Conditional-Expressions/ec2-instance-terraform-coding-environment.jpg)

---

## Links and References

- [OpenTofu Documentation](https://docs.opentofu.org)
- [Terraform Language - Expressions](https://www.terraform.io/language/expressions)
- [AWS IAM User Resource](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_user)
- [AWS S3 Bucket & Object](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket)
- [AWS EC2 Instance](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/instance)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/042e7b27-75d9-46fc-8f8c-7357d81923c1/lesson/72ecd9c1-c9d4-4bc2-9687-a54a126a5d00)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/042e7b27-75d9-46fc-8f8c-7357d81923c1/lesson/eb423b69-3251-4c0a-86dc-463214648609)**
>
> Practice lab
