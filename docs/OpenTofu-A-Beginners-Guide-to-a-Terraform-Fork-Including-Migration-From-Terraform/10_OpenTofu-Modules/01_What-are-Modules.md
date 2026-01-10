# What are Modules - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform/OpenTofu-Modules/What-are-Modules)

---

## Table of Contents

- What are Modules
  - Root Module Example
  - Calling Child Modules
  - Building a Reusable Payroll App Module
  - Deploy in US East (us-east-1)
  - Deploy in London (eu-west-2)
  - Links and References
  - Watch Video
    - Define the Module
      - app_server.tf
      - s3_bucket.tf
      - dynamodb_table.tf
      - variables.tf

---

## Content

OpenTofu: A Beginners Guide to a Terraform Fork Including Migration From Terraform

OpenTofu Modules

# What are Modules

A **module** in OpenTofu (a Terraform fork) is any directory that contains configuration files. When you run OpenTofu commands inside that directory, it becomes the **root module**, orchestrating resources defined within.

## Root Module Example

Suppose your workspace looks like this:

```
$ ls /root/opentofu-projects/aws-instance
main.tf  variables.tf
```

– **main.tf**

```
# /root/opentofu-projects/aws-instance/main.tf
resource "aws_instance" "webserver" {
  ami           = var.ami
  instance_type = var.instance_type
  key_name      = var.key
}
```

– **variables.tf**

```
# /root/opentofu-projects/aws-instance/variables.tf
variable "ami" {
  type        = string
  default     = "ami-0edab43b6fa892279"
  description = "Ubuntu AMI ID in the ca-central-1 region"
}
```

> [!important]
> **Note**
>
> Running `tofu init`, `tofu plan`, or `tofu apply` inside `aws-instance` treats it as the **root module**.

## Calling Child Modules

To avoid duplicating infrastructure code, package a directory as a **child module** and invoke it:

```
$ mkdir -p /root/opentofu-projects/development
```

Create a `main.tf` in `development`:

```
# /root/opentofu-projects/development/main.tf
module "dev-webserver" {
  source = "../aws-instance"
}
```

- `module "dev-webserver"` assigns a logical name.
- `source = "../aws-instance"` points to the child module’s path.

Now `development` is the **root module**, calling the `../aws-instance` **child module**.

---

## Building a Reusable Payroll App Module

FlexIT Consulting needs the same payroll stack in multiple regions. The architecture uses:

- One EC2 instance (custom AMI)
- One DynamoDB table
- One S3 bucket

All resources live in the default VPC:

![The image is a diagram of a simplified AWS architecture for FlexIT Consulting's payroll software, showing components like an AWS instance, S3 bucket, and DynamoDB table within a default VPC. It highlights aspects such as no IAM role considerations and default VPC and subnet usage.](https://kodekloud.com/kk-media/image/upload/v1752882878/notes-assets/images/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform-What-are-Modules/aws-architecture-flexit-payroll-diagram.jpg)

### Define the Module

Organize reusable code under `modules/payroll-app`:

```
$ mkdir -p /root/opentofu-projects/modules/payroll-app
$ ls /root/opentofu-projects/modules/payroll-app
app_server.tf  dynamodb_table.tf  s3_bucket.tf  variables.tf
```

#### app_server.tf

```
# modules/payroll-app/app_server.tf
resource "aws_instance" "app_server" {
  ami           = var.ami
  instance_type = "t2.medium"
  tags = {
    Name = "${var.app_region}-app-server"
  }
  depends_on = [
    aws_dynamodb_table.payroll_db,
    aws_s3_bucket.payroll_data
  ]
}
```

#### s3_bucket.tf

```
# modules/payroll-app/s3_bucket.tf
resource "aws_s3_bucket" "payroll_data" {
  bucket = "${var.app_region}-${var.bucket}"
}
```

#### dynamodb_table.tf

```
# modules/payroll-app/dynamodb_table.tf
resource "aws_dynamodb_table" "payroll_db" {
  name         = "user_data"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "EmployeeID"


  attribute {
    name = "EmployeeID"
    type = "S"
  }
}
```

#### variables.tf

```
# modules/payroll-app/variables.tf
variable "app_region" {
  type = string
}


variable "bucket" {
  type    = string
  default = "flexit-payroll-alpha-22001c"
}


variable "ami" {
  type = string
}
```

- **Hardcoded**: instance type, DynamoDB table name, and hash key.
- **Configurable**: AMI, region, bucket via variables.

---

## Deploy in US East (us-east-1)

Create a root module for the US deployment:

```
$ mkdir /root/opentofu-projects/us-payroll-app
```

– **provider.tf**

```
# /root/opentofu-projects/us-payroll-app/provider.tf
provider "aws" {
  region = "us-east-1"
}
```

– **main.tf**

```
# /root/opentofu-projects/us-payroll-app/main.tf
module "us_payroll" {
  source     = "../modules/payroll-app"
  app_region = "us-east-1"
  ami        = "ami-24e140119877avm"
}
```

Initialize and apply:

```
$ cd /root/opentofu-projects/us-payroll-app
$ tofu init
```

```
$ tofu apply
```

You’ll see:

```
module.us_payroll.aws_dynamodb_table.payroll_db will be created
module.us_payroll.aws_instance.app_server     will be created
module.us_payroll.aws_s3_bucket.payroll_data will be created
```

> [!important]
> **Note**
>
> The S3 bucket name combines the region prefix with the default bucket variable.

---

## Deploy in London (eu-west-2)

Repeat for the UK region:

```
$ mkdir /root/opentofu-projects/uk-payroll-app
```

– **provider.tf**

```
# /root/opentofu-projects/uk-payroll-app/provider.tf
provider "aws" {
  region = "eu-west-2"
}
```

– **main.tf**

```
# /root/opentofu-projects/uk-payroll-app/main.tf
module "uk_payroll" {
  source     = "../modules/payroll-app"
  app_region = "eu-west-2"
  ami        = "ami-35e140119877avm"
}
```

```
$ cd /root/opentofu-projects/uk-payroll-app
$ tofu init && tofu apply
```

Resources provisioned under:

```
module.uk_payroll.aws_instance.app_server
module.uk_payroll.aws_s3_bucket.payroll_data
module.uk_payroll.aws_dynamodb_table.payroll_db
```

---

OpenTofu can source community or verified modules from the registry, just like Terraform. For example, to provision a security group:

![The image shows a search interface from the OpenTofu Registry, displaying results for "security-group" modules, including details about a Terraform module for creating EC2-VPC security groups on AWS.](https://kodekloud.com/kk-media/image/upload/v1752882880/notes-assets/images/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform-What-are-Modules/opentofu-registry-security-group-module.jpg)

```
module "security_group_ssh" {
  source              = "terraform-aws-modules/security-group/aws/modules/ssh"
  version             = "3.16.0"
  vpc_id              = "vpc-7d8d215"
  ingress_cidr_blocks = ["10.10.0.0/16"]
  name                = "ssh-access"
}
```

> [!important]
> **Warning**
>
> Always pin the `version` to prevent unexpected module changes. Use `tofu get` or `tofu init` to fetch registry modules.

---

![The image is an infographic titled "OpenTofu Module" highlighting the benefits of using modules, including simpler configuration files, lower risk, and reusability.](https://kodekloud.com/kk-media/image/upload/v1752882880/notes-assets/images/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform-What-are-Modules/opentofu-module-benefits-infographic.jpg)

| Benefit         | Description                                                      |
| --------------- | ---------------------------------------------------------------- |
| Simpler configs | Keep root modules concise for easier maintenance                 |
| Reusability     | Share the same module across multiple projects                   |
| Stability       | Enforce default settings and reduce configuration drift          |
| Reduced errors  | Leverage tested modules from your team or the community registry |

---

## Links and References

- [OpenTofu Documentation](https://github.com/opentofu)
- [Terraform Module Registry](https://registry.terraform.io/)
- [AWS Provider for Terraform](https://registry.terraform.io/providers/hashicorp/aws/latest)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/d4c286c6-b8ee-47b1-bea3-abcf408b00ed/lesson/9d09c96a-4d2d-4f7c-81a1-5d46b790dd99)**
>
> Watch video content
