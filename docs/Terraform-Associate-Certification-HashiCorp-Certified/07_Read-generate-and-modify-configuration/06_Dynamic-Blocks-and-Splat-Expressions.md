# Dynamic Blocks and Splat Expressions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Associate-Certification-HashiCorp-Certified/Read-generate-and-modify-configuration/Dynamic-Blocks-and-Splat-Expressions)

---

## Table of Contents

- Dynamic Blocks and Splat Expressions
  - Building a VPC, Subnet, and Security Group with Dynamic Blocks
  - Watch Video
    - Refactoring with Dynamic Blocks
    - Exploring Splat Expressions
    - Applying the Terraform Configuration

---

## Content

Terraform Associate Certification: HashiCorp Certified

Read generate and modify configuration

# Dynamic Blocks and Splat Expressions

In this article, you'll learn how to streamline your Terraform configurations using dynamic blocks and splat expressions. These techniques are especially useful when you need to create multiple resource instances efficiently and maintain cleaner code.

Previously, we covered how to loop through collections such as lists, sets, or maps using arguments like count and for_each. This approach is practical for creating multiple instances of similar resource blocks. For instance, consider the following variable definition for backend servers:

```
resource "aws_instance" "backend" {
  ami           = var.ami
  instance_type = var.instance_type
  count         = length(var.backend-servers)
  tags = {
    Name = var.backend-servers[count.index]
  }
}


variable "ami" {
  default = "ami-06178cf087598769c"
}


variable "instance_type" {
  default = "m5.large"
}


variable "backend-servers" {
  type    = list
  default = ["server1", "server2"]
}
```

In this example, Terraform creates two EC2 instances (server1 and server2) using the count parameter.

## Building a VPC, Subnet, and Security Group with Dynamic Blocks

Consider a more complex scenario where you need to create a new AWS VPC with a private subnet and configure a security group that permits inbound traffic on specific ports. A Virtual Private Cloud (VPC) is a custom network in AWS where you can deploy resources such as EC2 instances. In this case, the VPC uses a CIDR range of 10.0.0.0/16. Inside the VPC, a private subnet (without public IP addresses or direct internet connectivity) is created, and a security group is set up to allow inbound traffic on ports 22 and 8080.

![The image depicts an Amazon VPC setup with a private subnet containing two servers, server1 and server2, within a security group allowing inbound ports 8080 and 22.](https://kodekloud.com/kk-media/image/upload/v1752884105/notes-assets/images/Terraform-Associate-Certification-HashiCorp-Certified-Dynamic-Blocks-and-Splat-Expressions/frame_90.jpg)

Let’s start by defining the resources needed for the VPC, private subnet, and a security group with explicit nested ingress blocks:

```
resource "aws_vpc" "backend-vpc" {
  cidr_block = "10.0.0.0/16"
  tags = {
    Name = "backend-vpc"
  }
}


resource "aws_subnet" "private-subnet" {
  vpc_id     = aws_vpc.backend-vpc.id
  cidr_block = "10.0.2.0/24"
  tags = {
    Name = "private-subnet"
  }
}


resource "aws_security_group" "backend-sg" {
  name   = "backend-sg"
  vpc_id = aws_vpc.backend-vpc.id


  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }


  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
```

Notice the use of a reference expression (aws_vpc.backend-vpc.id) to link the VPC ID with both the subnet and the security group. Although this static configuration functions correctly, it can quickly become repetitive as you add more ingress rules.

> [!important]
> **Tip**
>
> To simplify your configuration and enhance flexibility, use dynamic blocks to automatically generate the ingress blocks.

### Refactoring with Dynamic Blocks

Begin by removing the static ingress blocks and introduce a new variable for allowed ports:

```
variable "ingress_ports" {
  type    = list
  default = [22, 8080]
}
```

Then, modify the security group resource to employ a dynamic block that iterates over the ingress_ports variable:

```
resource "aws_security_group" "backend-sg" {
  name   = "backend-sg"
  vpc_id = aws_vpc.backend-vpc.id


  dynamic "ingress" {
    for_each = var.ingress_ports
    content {
      from_port   = ingress.value
      to_port     = ingress.value
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }
  }
}
```

In this configuration, the dynamic block automatically creates an ingress rule for every port value present in the ingress_ports list.

It is also possible to specify a custom iterator name instead of using the default. Using an iterator named port, the dynamic block can be rewritten as follows:

```
resource "aws_security_group" "backend-sg" {
  name   = "backend-sg"
  vpc_id = aws_vpc.backend-vpc.id


  dynamic "ingress" {
    iterator = port
    for_each = var.ingress_ports
    content {
      from_port   = port.value
      to_port     = port.value
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }
  }
}


variable "ingress_ports" {
  type    = list
  default = [22, 8080]
}
```

### Exploring Splat Expressions

Splat expressions in Terraform allow you to extract specific attributes from a list of blocks. For instance, if you want to output all the to_port values from the dynamically generated ingress rules, you can use the following output variable:

```
output "to_ports" {
  value = aws_security_group.backend-sg.ingress[*].to_port
}
```

This splat expression aggregates the to_port attribute from every ingress rule into a single list.

### Applying the Terraform Configuration

To deploy these resources, run the following command:

```
$ terraform apply --auto-approve
```

After applying, you should see output similar to this:

```
aws_vpc.backend-vpc: Creating...
aws_vpc.backend-vpc: Creation complete after 0s [id=vpc-593470c0]
aws_subnet.private-subnet: Creating...
aws_security_group.backend-sg: Creating...
aws_subnet.private-subnet: Creation complete after 1s [id=subnet-fdd6b762]
aws_security_group.backend-sg: Creation complete after 1s [id=sg-a5aa3b711157d4a2b]
Apply complete! Resources: 3 added, 0 changed, 0 destroyed.
```

> [!important]
> **Summary**
>
> In this article, we demonstrated how to simplify complex Terraform configurations using dynamic blocks for multiple ingress rules and splat expressions for efficient attribute extraction.

That's it for this guide. To further reinforce your understanding, consider taking the accompanying quiz.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-associate-certification-hashicorp-certified/module/c59e52ed-8a8c-4a6c-8ad0-8dcc38c1598e/lesson/630c7612-947c-445e-b67b-cd64a405cca9)**
>
> Watch video content
