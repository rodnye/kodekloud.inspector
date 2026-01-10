# Creating Your Own Module From Scratch - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Modules/Creating-Your-Own-Module-From-Scratch)

---

## Table of Contents

- Creating Your Own Module From Scratch
  - 1. Module Directory Structure
  - 2. Declare and Parameterize Inputs
  - 3. Define Resources Using Inputs
  - 4. Expose Outputs
  - 5. Provide Usage Examples
  - 6. Versioning and Collaboration
  - 7. Documentation and Comments
  - Links and References
  - Watch Video

---

## Content

Terragrunt for Beginners

Terragrunt Modules

# Creating Your Own Module From Scratch

Building a well-structured, versioned Terraform module ensures consistency, reusability, and easy collaboration across teams. In this guide, we’ll walk through:

- Directory layout
- Input declarations and validations
- Resource definitions
- Output exports
- Example usage
- Versioning best practices
- Documentation tips

---

## 1\. Module Directory Structure

Begin by creating a top-level folder for your module. Inside, organize files as follows:

| Path                       | Purpose                                     |
| -------------------------- | ------------------------------------------- |
| my-module/                 | Root directory for your module              |
| ├─ main.tf                 | Core resource definitions                   |
| ├─ variables.tf            | Input variable declarations & validations   |
| ├─ outputs.tf              | Exported values for external configurations |
| └─ examples/simple/main.tf | Minimal example demonstrating module usage  |

```
my-module/
├── main.tf
├── variables.tf
├── outputs.tf
└── examples/
    └── simple/
        └── main.tf
```

---

## 2\. Declare and Parameterize Inputs

In `variables.tf`, declare all module inputs, set types, defaults, and add validation:

```
variable "instance_count" {
  description = "Number of EC2 instances to create"
  type        = number
  default     = 1


  validation {
    condition     = var.instance_count > 0
    error_message = "instance_count must be at least 1"
  }
}


variable "ami_id" {
  description = "AMI ID for the EC2 instances"
  type        = string
}


variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}


variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-west-2"
}
```

> [!important]
> **Note**
>
> Use [validation blocks](https://www.terraform.io/language/values/variables#custom-validation) to enforce constraints early and prevent invalid configurations.

---

## 3\. Define Resources Using Inputs

Start by pinning provider versions:

```
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}


provider "aws" {
  region = var.aws_region
}
```

Then, reference your variables in `main.tf`:

```
resource "aws_instance" "example" {
  count         = var.instance_count
  ami           = var.ami_id
  instance_type = var.instance_type


  tags = {
    Name = "example-instance-${count.index + 1}"
  }
}
```

> [!important]
> **Warning**
>
> Avoid hard-coding AMI IDs across regions. Consider using `data "aws_ami"` to dynamically look up the latest image.

---

## 4\. Expose Outputs

In `outputs.tf`, export the values that other modules or root configurations will consume:

```
output "instance_ids" {
  description = "IDs of the created EC2 instances"
  value       = aws_instance.example[*].id
}


output "public_ips" {
  description = "Public IP addresses of the created EC2 instances"
  value       = aws_instance.example[*].public_ip
}
```

> [!important]
> **Note**
>
> If outputs contain sensitive data (e.g., private keys), set `sensitive = true` to prevent accidental exposure.

---

## 5\. Provide Usage Examples

Under `examples/simple/main.tf`, demonstrate a minimal working invocation:

```
module "ec2_example" {
  source         = "../../"
  instance_count = 2
  ami_id         = "ami-0c55b159cbfafe1f0"
  instance_type  = "t3.micro"
  aws_region     = "us-west-2"
}


output "created_ids" {
  value = module.ec2_example.instance_ids
}
```

Run the following commands:

| Command           | Description                     |
| ----------------- | ------------------------------- |
| terraform init    | Initialize plugins and backend  |
| terraform plan    | Preview planned changes         |
| terraform apply   | Apply the configuration         |
| terraform destroy | Tear down the created resources |

```
cd examples/simple
terraform init
terraform apply
```

---

## 6\. Versioning and Collaboration

Follow these guidelines to keep your module maintainable:

- Use [Semantic Versioning](https://semver.org/) (e.g., `v1.0.0`, `v1.1.0`)
- Tag releases in Git (`git tag v1.0.0`)
- Maintain a `CHANGELOG.md` to record feature additions and fixes

---

## 7\. Documentation and Comments

Consistently document your module to help users onboard quickly:

- Add a header comment in each `.tf` file summarizing its purpose
- Comment complex logic (e.g., loops, conditionals) in `main.tf`
- Describe variable constraints and recommended values next to their declarations

---

## Links and References

- [Terraform Module Best Practices](https://www.terraform.io/language/modules/develop)
- [Terraform Input Variables](https://www.terraform.io/language/values/variables)
- [Terraform Output Values](https://www.terraform.io/language/values/outputs)
- [AWS Provider Documentation](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/4d4cda50-7d42-4622-b0d4-fa6e6ce0a16d/lesson/e573b785-9499-4490-b1f8-01223352845a)**
>
> Watch video content
