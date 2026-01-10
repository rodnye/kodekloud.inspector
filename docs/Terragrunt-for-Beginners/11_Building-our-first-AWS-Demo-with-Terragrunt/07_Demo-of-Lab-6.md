# Demo of Lab 6 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Building-our-first-AWS-Demo-with-Terragrunt/Demo-of-Lab-6)

---

## Table of Contents

- Demo of Lab 6
  - Prerequisites
  - Project Setup
  - Step 1: Account Configuration
  - Step 2: Region Configuration
  - Step 3: Environment Configuration (Dev)
  - Step 4: VPC Module
  - Step 5: Key Pair & Security Group Modules
  - Step 6: EC2 Module
  - Step 7: Apply the Dev Environment
  - Step 8: Stage Environment
  - Step 9: Production in us-west-2
  - Step 10: Review Remote State Files
  - References & Further Reading
  - Watch Video
  - Practice Lab
    - Key Pair
    - Security Group

---

## Content

Terragrunt for Beginners

Building our first AWS Demo with Terragrunt

# Demo of Lab 6

In this walkthrough, you’ll use Terragrunt to provision a multi-account, multi-region AWS infrastructure. You’ll configure remote state, set up environments (dev, stage, prod), and deploy core modules (VPC, Key Pair, Security Group, EC2).

> [!important]
> **Prerequisite Credentials**
>
> Keep your AWS credentials handy. Run the following at any time to fetch them:
>
> ```
> show creds
> ```

---

## Prerequisites

Before you begin, confirm you have the following tools installed:

| Tool       | Minimum Version | Install / Docs                                                                |
| ---------- | --------------- | ----------------------------------------------------------------------------- |
| Terraform  | v1.8.3+         | https://www.terraform.io/downloads.html                                       |
| Terragrunt | v0.58.8+        | https://terragrunt.gruntwork.io/docs/getting-started/install/                 |
| AWS CLI    | v2.x            | https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html |

```
terraform version
terragrunt --version
aws --version
```

---

## Project Setup

1.  Clone or navigate to your Terragrunt root.
2.  Create a working demo directory:

    ```
    cd terragrunt-stack
    mkdir -p demo
    ls -1
    # demo
    ```

---

## Step 1: Account Configuration

Create `terragrunt-stack/demo/account.hcl` to define account-level locals:

```
locals {
  account      = basename(get_terragrunt_dir())
  account_name = "labs"
}
```

In your root `terragrunt.hcl`, add remote state and provider generation:

```
locals {
  account_vars = read_terragrunt_config(find_in_parent_folders("account.hcl"))
}


remote_state {
  config = {
    bucket         = "kk-state-${local.account_vars.locals.account_name}"
    region         = "us-east-1"
    dynamodb_table = "terraform-locks"
  }
  generate = {
    path      = "backend.tf"
    if_exists = "overwrite_terragrunt"
  }
}


generate "provider" {
  path       = "providers.tf"
  if_exists  = "overwrite_terragrunt"
  contents = <<EOF
provider "aws" {
  region = "${local.region_vars.locals.aws_region}"
}
EOF
}
```

---

## Step 2: Region Configuration

1.  Create `terragrunt-stack/demo/us-east-1/region.hcl`:

    ```
    locals {
      aws_region = basename(get_terragrunt_dir())
    }
    ```

2.  Update root `terragrunt.hcl`:

    ```
    locals {
      region_vars = read_terragrunt_config(find_in_parent_folders("region.hcl"))
    }
    ```

---

## Step 3: Environment Configuration (Dev)

1.  Create `terragrunt-stack/demo/us-east-1/dev/env.hcl`:

    ```
    locals {
      env = basename(get_terragrunt_dir())
    }
    ```

2.  Add to root `terragrunt.hcl`:

    ```
    locals {
      env_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))
    }
    ```

---

## Step 4: VPC Module

File: `terragrunt-stack/demo/us-east-1/dev/vpc/terragrunt.hcl`

```
terraform {
  source = "tfr://terraform-aws-modules/vpc/aws//?version=5.8.1"
}


include "root" {
  path   = find_in_parent_folders()
  expose = true
}


inputs = {
  name            = "KodeKloud-${include.root.locals.account_vars.locals.account_name}-${include.root.locals.region_vars.locals.aws_region}-${include.root.locals.env_vars.locals.env}.vpc"
  cidr            = "10.64.0.0/16"
  azs             = ["${include.root.locals.region_vars.locals.aws_region}a", "${include.root.locals.region_vars.locals.aws_region}b"]
  private_subnets = ["10.64.0.0/24", "10.64.1.0/24"]
  public_subnets  = ["10.64.2.0/24", "10.64.3.0/24"]
}
```

Initialize and apply:

```
cd terragrunt-stack/demo/us-east-1/dev/vpc
terragrunt init
terragrunt apply
```

Verify in the AWS VPC Dashboard.

---

## Step 5: Key Pair & Security Group Modules

### Key Pair

`terragrunt-stack/demo/us-east-1/dev/key-pair/terragrunt.hcl`:

```
terraform {
  source = "tfr://terraform-aws-modules/key-pair/aws//?version=0.2.8"
}


include "root" {
  path   = find_in_parent_folders()
  expose = true
}


inputs = {
  key_name           = "KodeKloud-${include.root.locals.account_vars.locals.account_name}-${include.root.locals.region_vars.locals.aws_region}-${include.root.locals.env_vars.locals.env}-key-pair"
  create_private_key = true
}
```

### Security Group

`terragrunt-stack/demo/us-east-1/dev/security-group/terragrunt.hcl`:

```
terraform {
  source = "tfr://terraform-aws-modules/security-group/aws//?version=5.1.2"
}


include "root" {
  path   = find_in_parent_folders()
  expose = true
}


dependency "vpc" {
  config_path = "../vpc"
}


inputs = {
  name   = "KodeKloud-${include.root.locals.account_vars.locals.account_name}-${include.root.locals.region_vars.locals.aws_region}-${include.root.locals.env_vars.locals.env}-security-group"
  vpc_id = dependency.vpc.outputs.vpc_id
}
```

---

## Step 6: EC2 Module

Ensure `modules/ec2/main.tf` contains:

```
resource "aws_instance" "ec2_instance" {
  ami             = var.ami
  key_name        = var.key_name
  subnet_id       = var.subnet_id
  security_groups = var.security_groups


  instance_type = "t2.micro"


  tags = {
    Name = var.name
  }
}
```

Create `terragrunt-stack/demo/us-east-1/dev/ec2/terragrunt.hcl`:

```
terraform {
  source = "${find_in_parent_folders("modules")}/ec2"
}


include "root" {
  path   = find_in_parent_folders()
  expose = true
}


dependency "key_pair" {
  config_path = "../key-pair"
}


dependency "vpc" {
  config_path = "../vpc"
}


dependency "security_group" {
  config_path = "../security-group"
}


inputs = {
  name            = "KodeKloud-${include.root.locals.account_vars.locals.account_name}-${include.root.locals.region_vars.locals.aws_region}-${include.root.locals.env_vars.locals.env}"
  ami             = "ami-0f21b3c242fe285"
  key_name        = dependency.key_pair.outputs.key_pair_name
  subnet_id       = dependency.vpc.outputs.public_subnets[0]
  security_groups = [dependency.security_group.outputs.security_group_id]
}
```

---

## Step 7: Apply the Dev Environment

Run all modules in order from `terragrunt-stack/demo/us-east-1`:

```
terragrunt run-all init
terragrunt run-all apply
```

Terragrunt processes dependencies in this sequence:

1.  Key Pair
2.  VPC
3.  Security Group
4.  EC2

---

## Step 8: Stage Environment

Duplicate the `dev` folder to `stage` and apply:

```
cp -r dev stage
cd stage
terragrunt run-all apply
```

Check that the `stage` directory mirrors `dev` in your editor.

---

## Step 9: Production in us-west-2

1.  Copy `us-east-1` → `us-west-2`, remove `dev`, rename `stage` → `prod`.
2.  In `prod/ec2/terragrunt.hcl`, update:

    ```
    inputs = {
      ami = "ami-02f378d2e4ac266a"
      # other inputs unchanged
    }
    ```

3.  Apply prod:

    ```
    cd terragrunt-stack/demo/us-west-2
    terragrunt run-all apply
    ```

---

## Step 10: Review Remote State Files

List state files in your S3 bucket:

```
BUCKET_NAME=$(aws s3 ls | grep -oE "kk-state-.*")
aws s3 ls s3://$BUCKET_NAME --recursive
```

Example output:

```
2024-06-23 08:23:05      5210 demo/us-east-1/dev/ec2/terraform.tfstate
2024-06-23 08:23:06     24327 demo/us-east-1/dev/key-pair/terraform.tfstate
2024-06-23 08:23:06      2331 demo/us-east-1/dev/security-group/terraform.tfstate
2024-06-23 08:24:55    334400 demo/us-east-1/vpc/terraform.tfstate
2024-06-23 08:26:17      5116 demo/us-east-1/stage/key-pair/terraform.tfstate
2024-06-23 08:26:17     32265 demo/us-east-1/stage/security-group/terraform.tfstate
2024-06-23 08:26:37      5277 demo-us-west-2/prod/ec2/terraform.tfstate
2024-06-23 08:29:58     242840 demo-us-west-2/prod/security-group/terraform.tfstate
2024-06-23 08:29:58     32840 demo-us-west-2/prod/vpc/terraform.tfstate
```

Each module maintains its own state, promoting isolation and reducing the blast radius.

---

Congratulations! You’ve successfully built a modular, scalable AWS infrastructure with Terragrunt.

## References & Further Reading

- [Terraform Documentation](https://www.terraform.io/docs)
- [Terragrunt Docs](https://terragrunt.gruntwork.io/docs/)
- [AWS Provider for Terraform](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/07066843-7439-443b-b2d4-d31be3c50c97/lesson/fd96900e-0c16-4a58-8161-c90c6c8b4121)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/07066843-7439-443b-b2d4-d31be3c50c97/lesson/0186b4a9-38fe-41de-a77c-ea5374bdf5e5)**
>
> Practice lab
