# Setting Up the First Group of Resouces VPC - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Building-our-first-AWS-Demo-with-Terragrunt/Setting-Up-the-First-Group-of-Resouces-VPC)

---

## Table of Contents

- Setting Up the First Group of Resouces VPC
  - Overview
  - Prerequisites
  - Terragrunt Directory Layout
  - terragrunt.hcl Example
  - Deployment Steps
  - Next Steps
  - Links and References
  - Watch Video

---

## Content

Terragrunt for Beginners

Building our first AWS Demo with Terragrunt

# Setting Up the First Group of Resouces VPC

In this guide, we’ll walk through provisioning an AWS Virtual Private Cloud (VPC) using a community-maintained Terraform module and Terragrunt. By the end, you’ll have a reusable Terragrunt configuration for deploying VPCs across multiple environments (e.g., development, production) with consistency and best practices.

## Overview

We’ll leverage a Terraform Registry module for AWS VPC creation, which offers a battle-tested, configurable blueprint. Terragrunt will orchestrate calls to Terraform, handling remote state and DRY configurations for each environment.

Key benefits:

- Reuse and standardization via community module
- Automated remote state management
- Environment-specific inputs for custom network topologies

## Prerequisites

- Terraform v1.0+ installed
- Terragrunt v0.35+ installed
- AWS CLI configured with appropriate IAM permissions

## Terragrunt Directory Layout

Create a directory structure like:

```
infrastructure/
└── live/
    ├── development/
    │   └── vpc/
    │       └── terragrunt.hcl
    └── production/
        └── vpc/
            └── terragrunt.hcl
```

Each `terragrunt.hcl` will reference the community VPC module and supply environment-specific variables.

## terragrunt.hcl Example

Below is a minimal `terragrunt.hcl` for the development environment:

```
terraform {
  source = "git::https://github.com/terraform-aws-modules/terraform-aws-vpc.git?ref=v3.14.2"
}


include {
  path = find_in_parent_folders()
}


inputs = {
  name                 = "dev-vpc"
  cidr                 = "10.0.0.0/16"
  azs                  = ["us-east-1a", "us-east-1b"]
  public_subnets       = ["10.0.1.0/24", "10.0.2.0/24"]
  private_subnets      = ["10.0.101.0/24", "10.0.102.0/24"]
  enable_dns_hostnames = true
  tags = {
    Environment = "development"
    Project     = "networking"
  }
}
```

> [!important]
> **Customize Inputs per Environment**
>
> Be sure to adjust `cidr`, `azs`, subnet ranges, and tags to match each environment’s constraints and compliance requirements.

## Deployment Steps

1.  Change into your environment’s VPC directory:

    ```
    cd infrastructure/live/development/vpc
    ```

2.  Initialize Terragrunt (which bootstraps Terraform modules and remote state):

    ```
    terragrunt init
    ```

3.  Preview the planned changes:

    ```
    terragrunt plan
    ```

4.  Apply the configuration to create/update the VPC:

    ```
    terragrunt apply
    ```

| Command            | Description                                      |
| ------------------ | ------------------------------------------------ |
| `terragrunt init`  | Download modules and configure remote state      |
| `terragrunt plan`  | Show proposed infrastructure changes             |
| `terragrunt apply` | Execute changes to provision or update resources |

## Next Steps

- Repeat the `terragrunt apply` process for the production directory.
- Integrate other network components (NAT gateways, security groups).
- Reference Terraform AWS VPC module documentation for advanced options.

## Links and References

- [Terraform AWS VPC Module](https://registry.terraform.io/modules/terraform-aws-modules/vpc/aws)
- [Terragrunt Documentation](https://terragrunt.gruntwork.io/docs/)
- [AWS VPC Concepts](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/07066843-7439-443b-b2d4-d31be3c50c97/lesson/b7c0dd38-e5e9-4dd4-984c-0e42b0b01ba2)**
>
> Watch video content
