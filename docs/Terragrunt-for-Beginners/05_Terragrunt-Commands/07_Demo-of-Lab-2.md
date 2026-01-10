# Demo of Lab 2 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Commands/Demo-of-Lab-2)

---

## Table of Contents

- Demo of Lab 2
  - 1. Authenticate to the AWS Lab Account
  - 2. Confirm Terraform & Terragrunt Versions
  - 3. Inspect the VPC Module
  - 4. Initialize the Terragrunt Project
  - 5. Plan the VPC Deployment
  - 6. Apply the Configuration
  - 7. Clean Up: Destroy the VPC
  - References
  - Watch Video
  - Practice Lab
    - Provider Version Override

---

## Content

Terragrunt for Beginners

Terragrunt Commands

# Demo of Lab 2

In this lesson, we’ll authenticate into a temporary AWS lab account, inspect our Terragrunt configuration, and deploy a VPC module. Follow along to learn how to initialize, plan, apply, and clean up with Terragrunt.

---

## 1\. Authenticate to the AWS Lab Account

When the lab starts, you’ll receive a URL and temporary credentials:

![The image shows a split-screen view with an AWS login page on the left, displaying credentials for a Terragrunt lab, and a Visual Studio Code editor on the right with instructions for using the terminal.](https://kodekloud.com/kk-media/image/upload/v1752884312/notes-assets/images/Terragrunt-for-Beginners-Demo-of-Lab-2/aws-login-terragrunt-vscode-terminal.jpg)

1.  Open the provided URL in your browser.
2.  Log in with the displayed username and password.
3.  If you lose your credentials, run:

    ```
    show creds
    ```

> [!important]
> **Warning**
>
> This lab account has limited AWS permissions. Only perform the tasks outlined in this lesson to avoid permission errors.

---

## 2\. Confirm Terraform & Terragrunt Versions

SSH into the AWS client server and verify your toolchain:

| Tool       | Check Version          | Sample Output                                      |
| ---------- | ---------------------- | -------------------------------------------------- |
| Terraform  | `terraform version`    | Terraform v1.8.3<br>`Your version is out of date!` |
| Terragrunt | `terragrunt --version` | terragrunt version v0.58.8                         |

```
terraform version
```

```
Terraform v1.8.3
on linux_amd64


Your version of Terraform is out of date! The latest version is 1.8.5.
Download: https://www.terraform.io/downloads.html
```

```
terragrunt --version
```

```
terragrunt version v0.58.8
```

---

## 3\. Inspect the VPC Module

Navigate to the `aws-stack/vpc` directory where the VPC module lives:

```
cd aws-stack/vpc
```

Open `terragrunt.hcl` to review:

```
terraform {
  source = "git::https://github.com/terraform-aws-modules/terraform-aws-vpc.git//?ref=v5.8.1"
}


locals {
  vpc_cidr = "10.0.0.0/16"
}


include "root" {
  path   = find_in_parent_folders()
  expose = true
}


inputs = {
  name           = "${include.root.locals.project}-vpc"
  cidr           = local.vpc_cidr
  azs            = [
    "${include.root.locals.aws_region}a",
    "${include.root.locals.aws_region}b",
    "${include.root.locals.aws_region}c"
  ]
  public_subnets = [
    "10.101.0.0/24",
    "10.102.0.0/24",
    "10.103.0.0/24"
  ]
}
```

### Provider Version Override

To ensure compatibility, this module locks the AWS provider to major version 5:

```
generate "provider_version" {
  path      = "provider_version_override.tf"
  if_exists = "overwrite"
  contents  = <<EOF
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}
EOF
}
```

> [!important]
> **Note**
>
> Locking the AWS provider version prevents unexpected breaking changes when Terraform and modules update.

---

## 4\. Initialize the Terragrunt Project

Initialize the backend and download provider plugins:

```
terragrunt init
```

You should see:

```
Initializing the backend...
Initializing provider plugins...
Terraform has been successfully initialized!
```

---

## 5\. Plan the VPC Deployment

Generate and review the execution plan:

```
terragrunt plan
```

Look for the summary at the end:

```
Plan: 13 to add, 0 to change, 0 to destroy.
```

---

## 6\. Apply the Configuration

Create the VPC resources:

```
terragrunt apply
```

Type `yes` when prompted. After completion:

```
Apply complete! Resources: 13 added, 0 changed, 0 destroyed.
```

In the AWS console (US East 1), verify your VPC:

![The image shows an AWS VPC dashboard with a list of virtual private clouds (VPCs). It displays details such as VPC ID, state, and CIDR information.](https://kodekloud.com/kk-media/image/upload/v1752884313/notes-assets/images/Terragrunt-for-Beginners-Demo-of-Lab-2/aws-vpc-dashboard-virtual-private-clouds.jpg)

---

## 7\. Clean Up: Destroy the VPC

Remove all created resources to avoid incurring costs:

```
terragrunt destroy
```

Confirm with `yes`. You’ll see:

```
Destroy complete! Resources: 13 destroyed.
```

The AWS console will now only list the default VPC.

---

## References

- [Terraform Documentation](https://www.terraform.io/docs/)
- [Terragrunt GitHub](https://github.com/gruntwork-io/terragrunt)
- [Terraform AWS VPC Module](https://registry.terraform.io/modules/terraform-aws-modules/vpc/aws/latest)
- [AWS VPC Guide](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/e42961fc-4288-4cc2-8db8-3882b884c0b1/lesson/d62aa81f-8965-4488-a3cc-d145cdb4ce7e)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/e42961fc-4288-4cc2-8db8-3882b884c0b1/lesson/823f841c-aaca-4817-8069-d22e6278231c)**
>
> Practice lab
