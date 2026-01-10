# Using Input Variables - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Basics-Training-Course/Terraform-Basics/Using-Input-Variables)

---

## Table of Contents

- Using Input Variables
  - Why Use Input Variables?
  - Traditional Hard-Coded Resources
  - Parameterizing with Variables
  - Updating Variables
  - Creating an EC2 Instance with Variables
  - Conclusion
  - Watch Video

---

## Content

Terraform Basics Training Course

Terraform Basics

# Using Input Variables

Terraform input variables enhance code reusability and flexibility by allowing you to parameterize your configurations. Instead of hard-coding values—such as the file name and content for a local file resource or the prefix, separator, and length for a random pet resource—you can pass dynamic values during execution. This approach is similar to using variables in scripting languages like Bash or PowerShell.

## Why Use Input Variables?

Hard-coding values limits the adaptability of your configuration. By leveraging input variables, you can easily update resource configurations without modifying multiple code sections. This not only improves maintenance but also supports better scaling practices.

> [!important]
> **Tip**
>
> Using variables makes your configuration files more modular and easier to manage. Adjust values in a single file to propagate changes across your infrastructure.

## Traditional Hard-Coded Resources

Consider the following example where resource attributes are hard-coded:

```
resource "local_file" "pet" {
  filename = "/root/pets.txt"
  content  = "We love pets!"
}


resource "random_pet" "my-pet" {
  prefix    = "Mrs"
  separator = "."
  length    = "1"
}
```

## Parameterizing with Variables

To parameterize these values, create a configuration file named `variables.tf`. In this file, you define each variable using the `variable` keyword and can optionally assign a default value:

```
variable "filename" {
  default = "/root/pets.txt"
}


variable "content" {
  default = "We love pets!"
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

Once your variables are declared, update your `main.tf` file to reference these variables. You achieve this by prefixing the variable name with `var.`:

```
# main.tf
resource "local_file" "pet" {
  filename = var.filename
  content  = var.content
}


resource "random_pet" "my-pet" {
  prefix    = var.prefix
  separator = var.separator
  length    = var.length
}


# variables.tf
variable "filename" {
  default = "/root/pets.txt"
}


variable "content" {
  default = "We love pets!"
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

After these changes, run the standard Terraform workflow:

1.  Execute `terraform plan` to view the planned changes.
2.  Execute `terraform apply` to deploy the resources with the variable values.

## Updating Variables

You can modify your infrastructure by simply updating the default values in `variables.tf`. For instance, to change the file content and adjust the length of the random pet's name, you might update the file as follows:

```
# main.tf
resource "local_file" "pet" {
  filename = var.filename
  content  = var.content
}


resource "random_pet" "my-pet" {
  prefix    = var.prefix
  separator = var.separator
  length    = var.length
}


# variables.tf
variable "filename" {
  default = "/root/pets.txt"
}


variable "content" {
  default = "My favorite pet is Mrs. Whiskers"
}


variable "prefix" {
  default = "Mrs"
}


variable "separator" {
  default = "."
}


variable "length" {
  default = "2"
}
```

Once you run `terraform apply` again, Terraform updates the resources accordingly—the file content will change, and the pet name will now consist of two parts following the prefix.

## Creating an EC2 Instance with Variables

Here's an additional example of using input variables to create an [EC2 instance](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2) in AWS with Terraform. This configuration demonstrates the same variable usage pattern, even if some resource block parameters might seem unfamiliar:

```
resource "aws_instance" "webserver" {
  ami           = var.ami
  instance_type = var.instance_type
}


variable "ami" {
  default = "ami-0edab43b6fa892279"
}


variable "instance_type" {
  default = "t2.micro"
}
```

For further details on AWS resource management, keep an eye out for our upcoming in-depth coverage.

## Conclusion

Using input variables in Terraform improves code maintainability and allows for dynamic deployments. By defining variable defaults in a dedicated file and referencing them in your resource configurations, you can create more adaptable and scalable infrastructure deployments. Make sure to integrate these practices into your workflows to maximize the efficiency and flexibility of your Terraform projects.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/df2660a4-c959-4fa7-bfa8-0700885b598e/lesson/f88d4131-aec1-4d09-ba28-5846d4621761)**
>
> Watch video content
