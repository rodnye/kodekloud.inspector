# Setting Up the Second Group of Resources Security Groups Key Pairs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Building-our-first-AWS-Demo-with-Terragrunt/Setting-Up-the-Second-Group-of-Resources-Security-Groups-Key-Pairs)

---

## Table of Contents

- Setting Up the Second Group of Resources Security Groups Key Pairs
  - Overview
  - Prerequisites
  - Community Terraform Modules
  - Directory Structure
  - terragrunt.hcl Example
  - Deployment Steps
  - Customizing Input Variables
  - Links and References
  - Watch Video

---

## Content

Terragrunt for Beginners

Building our first AWS Demo with Terragrunt

# Setting Up the Second Group of Resources Security Groups Key Pairs

In this step, we’ll deploy AWS Security Groups and Key Pairs across multiple environments using community-maintained Terraform modules and Terragrunt.

## Overview

Security Groups and Key Pairs are fundamental for protecting your AWS infrastructure and managing SSH access. By leveraging well-tested community modules, you can apply best practices without reinventing the wheel.

## Prerequisites

- Terraform v1.0+ installed
- Terragrunt v0.35+ installed
- AWS CLI configured with proper credentials
- Existing VPC and networking resources deployed

## Community Terraform Modules

| Module                                   | Description                           | Registry Link                                                                         |
| ---------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------- |
| terraform-aws-modules/security-group/aws | Creates customizable Security Groups  | https://registry.terraform.io/modules/terraform-aws-modules/security-group/aws/latest |
| terraform-aws-modules/key-pair/aws       | Manages EC2 Key Pairs and public keys | https://registry.terraform.io/modules/terraform-aws-modules/key-pair/aws/latest       |

## Directory Structure

```
├── live
│   ├── development
│   │   └── security-groups
│   │       └── terragrunt.hcl
│   └── production
│       └── security-groups
│           └── terragrunt.hcl
```

Each environment (`development` and `production`) contains its own `terragrunt.hcl` to customize inputs and lifecycle settings.

## terragrunt.hcl Example

```
include {
  path = find_in_parent_folders()
}


terraform {
  source = "git::ssh://git@github.com/your-org/terraform-aws-security-groups.git//modules/security-group?ref=v1.0.0"
}


inputs = {
  vpc_id                  = local.vpc_id
  environment             = "development"
  allowed_ssh_cidr_blocks = ["10.0.0.0/16"]
  ingress_rules = [
    { from_port = 22, to_port = 22, protocol = "tcp", cidr_blocks = ["10.0.0.0/16"] },
    { from_port = 80, to_port = 80, protocol = "tcp", cidr_blocks = ["0.0.0.0/0"] },
  ]
}
```

## Deployment Steps

1.  Change into the environment folder:

    ```
    cd live/development/security-groups
    ```

2.  Initialize Terragrunt (which also initializes Terraform):

    ```
    terragrunt init
    ```

3.  Review the execution plan:

    ```
    terragrunt plan
    ```

4.  Apply changes to provision resources:

    ```
    terragrunt apply
    ```

> [!important]
> **Note**
>
> Repeat these steps in each environment directory (`development`, `production`) to maintain isolation and environment-specific configurations.

## Customizing Input Variables

Adjust the following inputs for each environment:

| Variable                  | Description                                  | Example                            |
| ------------------------- | -------------------------------------------- | ---------------------------------- |
| `allowed_ssh_cidr_blocks` | CIDR blocks permitted for SSH access         | `["203.0.113.0/24"]`               |
| `ingress_rules`           | List of ingress rules for the Security Group | See `terragrunt.hcl Example` above |
| `key_pair_name`           | Name for the EC2 Key Pair                    | `"dev-keypair"`                    |
| `public_key_path`         | Local path to your public SSH key            | `"~/.ssh/id_rsa.pub"`              |

> [!important]
> **Warning**
>
> Never commit your private SSH keys (`~/.ssh/id_rsa`) to version control. Always reference only the public key in Terraform.

## Links and References

- [Terraform AWS Security Group Module](https://registry.terraform.io/modules/terraform-aws-modules/security-group/aws/latest)
- [Terraform AWS Key Pair Module](https://registry.terraform.io/modules/terraform-aws-modules/key-pair/aws/latest)
- [Terragrunt Documentation](https://terragrunt.gruntwork.io/docs/)
- [AWS Security Groups](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/07066843-7439-443b-b2d4-d31be3c50c97/lesson/c14dc46c-49b9-4852-ab65-f342c040c284)**
>
> Watch video content
