# Terragrunt With AWS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Good-to-Know-Concepts-Ideas/Terragrunt-With-AWS)

---

## Table of Contents

- Terragrunt With AWS
  - 1. AWS Provider Configuration
  - 2. Remote State Management with S3 and DynamoDB
  - 3. IAM Role Assumption for Fine-Grained Permissions
  - 4. Organizing AWS-Specific Variables
  - 5. Modular Infrastructure and AWS Best Practices
  - Links and References
  - Watch Video
    - Recommended Layout
    - Key Practices

---

## Content

Terragrunt for Beginners

Terragrunt Good to Know Concepts Ideas

# Terragrunt With AWS

In this guide, you’ll learn how to integrate Terragrunt with Amazon Web Services to streamline infrastructure management. We cover AWS provider setup, S3-backed remote state, DynamoDB locking, IAM role assumption, variable organization, and modular best practices for secure, reusable Terraform code.

---

## 1\. AWS Provider Configuration

Begin by defining the AWS provider. You can author this directly in Terraform or generate it via Terragrunt.

Example `provider.tf`:

```
provider "aws" {
  region  = var.aws_region
  profile = var.aws_profile
}
```

Example `variables.tf`:

```
variable "aws_region" {
  description = "AWS region for resource deployment"
  type        = string
  default     = "us-west-2"
}


variable "aws_profile" {
  description = "AWS CLI profile used by Terraform"
  type        = string
  default     = "default"
}
```

---

## 2\. Remote State Management with S3 and DynamoDB

Terragrunt simplifies configuring S3 as a remote backend and DynamoDB for state locking.

Example `terragrunt.hcl`:

```
remote_state {
  backend = "s3"
  config = {
    bucket         = "my-terraform-state-bucket"
    key            = "${path_relative_to_include()}/terraform.tfstate"
    region         = "us-west-2"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}
```

> [!important]
> **Note**
>
> Enabling `encrypt = true` ensures that state files are encrypted at rest. DynamoDB locking prevents concurrent state mutations.

---

## 3\. IAM Role Assumption for Fine-Grained Permissions

Use Terragrunt’s `generate` block to create a provider that assumes an IAM role:

```
generate "provider" {
  path      = "provider.tf"
  if_exists = "overwrite_terragrunt"
  contents  = <<EOF
provider "aws" {
  region = "us-west-2"
  assume_role {
    role_arn = "arn:aws:iam::123456789012:role/TerraformExecutionRole"
  }
}
EOF
}
```

This enforces Terraform operations under a specific IAM role, improving security and auditability.

---

## 4\. Organizing AWS-Specific Variables

Centralize common AWS settings in a shared `variables.tf`:

```
variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}


variable "db_engine" {
  description = "RDS engine"
  type        = string
  default     = "postgres"
}
```

Reference these in modules:

```
module "compute" {
  source        = "../modules/ec2-instance"
  instance_type = var.instance_type
}


module "database" {
  source         = "../modules/rds"
  engine         = var.db_engine
  engine_version = "13.4"
}
```

---

## 5\. Modular Infrastructure and AWS Best Practices

Adopt a modular layout and separate environments for scalable, maintainable Terraform code.

### Recommended Layout

| Directory     | Purpose                               | Example Files         |
| ------------- | ------------------------------------- | --------------------- |
| modules/      | Reusable Terraform modules            | `ec2-instance`, `rds` |
| envs/dev/     | Development environment configuration | `terragrunt.hcl`      |
| envs/staging/ | Staging environment configuration     | `terragrunt.hcl`      |
| envs/prod/    | Production environment configuration  | `terragrunt.hcl`      |

### Key Practices

- **Per-Environment Folders**  
  Each folder under `envs/` contains its own `terragrunt.hcl` pointing to shared modules.
- **Shared Modules**  
  Store reusable code in `modules/` and orchestrate inputs/backends with Terragrunt.
- **AWS Well-Architected Framework**  
  Follow [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/) for security, performance, and cost optimization.

> [!important]
> **Warning**
>
> Avoid committing sensitive credentials to version control. Use AWS IAM roles, environment variables, or [Secrets Manager](https://aws.amazon.com/secrets-manager/) instead.

---

## Links and References

- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [Terragrunt Documentation](https://terragrunt.gruntwork.io/docs/)
- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)
- [DynamoDB State Locking](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/c2ee1192-4547-4149-82dc-d7e2940cb844/lesson/d1d8ffe3-5aaa-450f-a343-30867f62eb1a)**
>
> Watch video content
