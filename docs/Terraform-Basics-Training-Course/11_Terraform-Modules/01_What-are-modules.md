# What are modules - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Basics-Training-Course/Terraform-Modules/What-are-modules)

---

## Table of Contents

- What are modules
  - What Is a Terraform Module?
  - Reusing Modules for Different Environments
  - Watch Video

---

## Content

Terraform Basics Training Course

Terraform Modules

# What are modules

In this guide, we'll explore what Terraform modules are and demonstrate how to leverage them to simplify and modularize your Terraform configurations.

Terraform configuration files can grow lengthy and complex. Initially, you might start with simple resources such as a local file or a random pet, but as you begin deploying more advanced resources on AWS—like IAM roles, policies, S3 buckets, DynamoDB tables, and EC2 instances—the configurations often become repetitive and difficult to manage.

For example, consider a configuration that defines two EC2 instances, a key pair, a security group, and a DynamoDB table. In this case, the EC2 instance configurations are nearly identical, leading to unnecessary duplication of code.

While Terraform supports having hundreds of resources within a single file (with no strict resource limit), coupling all resources together can result in files containing thousands of lines. An alternative approach is to divide the configuration into multiple files within the same directory. Terraform automatically processes every file with a `.tf` extension in the configuration directory, regardless of the file organization.

Below is an example of how you might structure your Terraform files across multiple files:

```
# main.tf
resource "aws_instance" "webserver" {
  # configuration here
}
```

```
# key_pair.tf
resource "aws_key_pair" "web" {
  # configuration here
}
```

```
# dynamodb_table.tf
resource "aws_dynamodb_table" "state-locking" {
  # configuration here
}
```

```
# security_group.tf
resource "aws_security_group" "ssh-access" {
  # configuration here
}
```

```
# ec2_instance.tf
resource "aws_instance" "webserver-2" {
  # configuration here
}
```

```
# s3_bucket.tf
resource "aws_s3_bucket" "terraform-state" {
  # configuration here
}
```

While breaking configurations into separate files can improve organization, it does not fully solve two common challenges:

- Increasing complexity and code duplication within the configuration directory.
- The risk of unintended changes affecting resources in different parts of the configuration.

Additionally, sharing parts of the configuration with teammates involves copying and pasting code, which can introduce errors.

Consider the following directory listing for a typical Terraform project:

```
$ ls
provider.tf
id_rsa
id_rsa.pub
main.tf
pub_ip.txt
terraform.tfstate.backup
terraform.tfstate
iam_roles.tf
iam_users.tf
security_groups.tf
variables.tf
outputs.tf
s3_buckets.tf
dynamo_db.tf
local.tf
```

> [!important]
> **Note**
>
> Using modules in Terraform allows you to manage complexity, reduce code duplication, and enhance reusability across projects and environments.

## What Is a Terraform Module?

A Terraform module is any directory that contains a set of `.tf` files. Essentially, every Terraform configuration directory is a module. For example, consider a configuration directory named `aws-instance` located under `/root/terraform-projects`. This directory contains the Terraform files required to create a simple EC2 instance in AWS. Since it has valid Terraform configuration files, it qualifies as a module.

Here is the directory listing for the `aws-instance` module:

```
$ ls /root/terraform-projects/aws-instance
main.tf
variables.tf
```

The contents of `main.tf` might look like this:

```
resource "aws_instance" "webserver" {
  ami           = var.ami
  instance_type = var.instance_type
  key_name      = var.key
}
```

And the corresponding `variables.tf` defines the variables:

```
variable "ami" {
  type        = string
  default     = "ami-0edab43b6fa892279"
  description = "Ubuntu AMI ID in the ca-central-1 region"
}
```

When you run Terraform commands from within the `aws-instance` directory, it is considered the root module.

## Reusing Modules for Different Environments

Now, imagine you want to reuse the `aws-instance` module to create a new development web server instance without duplicating code. Follow these steps to create a development environment:

1.  Create a new directory named `development` under the `terraform-projects` directory:

    ```
    $ mkdir /root/terraform-projects/development
    ```

2.  Inside the `development` directory, create a configuration file (for example, `main.tf`) that references the `aws-instance` module:

    ```
    module "dev-webserver" {
      source = "../aws-instance"
    }
    ```

In this setup, the `development` directory serves as the root module (because you run Terraform commands from here), while the `aws-instance` directory is referenced as a child module.

Let’s review the module block again:

```
$ mkdir /root/terraform-projects/development
```

```
module "dev-webserver" {
  source = "../aws-instance"
}
```

The `module` keyword is followed by a logical name, in this case, `dev-webserver`. Within the block, the required argument is `source`, which specifies the relative or absolute path to the child module containing the Terraform configuration for the EC2 instance. Here, we use a relative path `"../aws-instance"`, pointing to the corresponding directory next to our development directory.

This modular approach effectively addresses earlier challenges by reducing code duplication, simplifying updates, and boosting reusability. It encapsulates specific infrastructure logic in a module that can be reused across different environments or projects.

> [!important]
> **Summary**
>
> Modules not only help in organizing your Terraform configurations but also promote best practices by isolating infrastructure components. This makes your configurations easier to manage and share.

That concludes this article. In the next section, we will dive deeper into creating custom modules and harnessing their full potential with Terraform.

Learn more about related topics in the following links:

- [Terraform Modules](https://www.terraform.io/language/modules)
- [Terraform Configuration Language](https://www.terraform.io/language)

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/e6838c6b-3208-4396-a744-34b0ed2cd292/lesson/e5a998ed-cd36-48db-81a4-95b1235ebb7f)**
>
> Watch video content
