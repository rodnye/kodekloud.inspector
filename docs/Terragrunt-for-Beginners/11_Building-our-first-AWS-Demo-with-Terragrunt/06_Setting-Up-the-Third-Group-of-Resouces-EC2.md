# Setting Up the Third Group of Resouces EC2 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Building-our-first-AWS-Demo-with-Terragrunt/Setting-Up-the-Third-Group-of-Resouces-EC2)

---

## Table of Contents

- Setting Up the Third Group of Resouces EC2
  - 1. Custom Terraform Module
  - 2. Terragrunt Configuration per Environment
  - 3. Deploying with Terragrunt
  - Links and References
  - Watch Video
    - Example: variables.tf

---

## Content

Terragrunt for Beginners

Building our first AWS Demo with Terragrunt

# Setting Up the Third Group of Resouces EC2

In this lesson, we’ll deploy Amazon EC2 instances across multiple environments using a custom Terraform module and Terragrunt. By encapsulating compute configuration in a reusable module, we guarantee consistency, simplify management, and accelerate provisioning of our workloads.

Our end-to-end workflow:

1.  Build a dedicated Terraform module for EC2 provisioning.
2.  Create Terragrunt configurations for each environment (development, production).
3.  Provide environment-specific variables (instance type, AMI ID, networking).
4.  Run `terragrunt init`, `plan`, and `apply`.
5.  Validate security groups, key pairs, and network settings.

![The image shows a diagram for setting up EC2 resources with Terragrunt commands on the left and a shield icon representing considerations on the right.](https://kodekloud.com/kk-media/image/upload/v1752884256/notes-assets/images/Terragrunt-for-Beginners-Setting-Up-the-Third-Group-of-Resouces-EC2/ec2-resources-terragrunt-setup-diagram.jpg)

---

## 1\. Custom Terraform Module

Create a folder structure under `modules/ec2/`:

| File           | Purpose                                                                                  |
| -------------- | ---------------------------------------------------------------------------------------- |
| `main.tf`      | Defines `aws_instance`, security group attachments, user data, etc.                      |
| `variables.tf` | Declares inputs such as `instance_type`, `ami_id`, `vpc_security_group_ids`, `key_name`. |
| `outputs.tf`   | Exposes attributes like public IP and instance ID.                                       |

### Example: variables.tf

```
variable "environment" {
  description = "Deployment environment (e.g., dev, prod)"
  type        = string
}


variable "instance_type" {
  description = "EC2 instance type"
  type        = string
}


variable "ami_id" {
  description = "AMI ID for the instance"
  type        = string
}


variable "vpc_security_group_ids" {
  description = "List of security group IDs"
  type        = list(string)
}


variable "key_name" {
  description = "Key pair name for SSH access"
  type        = string
}
```

> [!important]
> **Note**
>
> Make sure your AMI IDs match the target AWS region. You can automate lookup via the [AWS Systems Manager Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store.html).

---

## 2\. Terragrunt Configuration per Environment

Under each environment folder (`environments/development/`, `environments/production/`), define a `terragrunt.hcl` that points to the EC2 module and sets inputs:

```
# environments/development/terragrunt.hcl
terraform {
  source = "../../modules/ec2"
}


inputs = {
  environment             = "development"
  instance_type           = "t3.micro"
  ami_id                  = "ami-0123456789abcdef0"
  vpc_security_group_ids  = ["sg-0123456789abcdef0"]
  key_name                = "dev-key-pair"
}
```

Repeat for `production`, adjusting values accordingly.

> [!important]
> **Warning**
>
> Avoid committing sensitive data (e.g., private SSH keys) to version control. Store critical secrets in a secure vault or use Terragrunt’s `read_terragrunt_config` to pull from encrypted sources.

---

## 3\. Deploying with Terragrunt

Within your chosen environment directory, execute:

```
terragrunt init      # Initialize the Terraform working directory
terragrunt plan      # Preview infrastructure changes
terragrunt apply     # Provision EC2 instances as defined
```

After deployment, verify that your security groups, key pairs, and networking settings meet your organization’s standards.

---

## Links and References

- [Terraform AWS Provider – aws_instance](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/instance)
- [Terragrunt Documentation](https://terragrunt.gruntwork.io/)
- [AWS EC2 Documentation](https://docs.aws.amazon.com/ec2/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/07066843-7439-443b-b2d4-d31be3c50c97/lesson/5fac8927-90e5-4ca3-b9a1-962a45bfd47a)**
>
> Watch video content
