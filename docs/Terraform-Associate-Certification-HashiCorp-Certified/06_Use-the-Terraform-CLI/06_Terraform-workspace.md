# Terraform workspace - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Associate-Certification-HashiCorp-Certified/Use-the-Terraform-CLI/Terraform-workspace)

---

## Table of Contents

- Terraform workspace
  - Listing and Creating Workspaces
  - Configuring Different Environments
  - Workspace State Files
  - Watch Video
    - Updated Configuration

---

## Content

Terraform Associate Certification: HashiCorp Certified

Use the Terraform CLI

# Terraform workspace

Terraform workspaces enable you to manage multiple environments—such as development and production—using a single configuration directory. In this guide, you'll learn how to leverage workspaces to isolate state files for different environments and adjust resource configurations accordingly.

Every Terraform configuration maintains a state file (either locally or remotely) to track resources. Traditionally, there is a one-to-one mapping between a configuration directory and its associated state file. Consider the following example of an AWS instance resource block named "webserver":

```
# main.tf
resource "aws_instance" "webserver" {
  ami           = var.ami
  instance_type = var.instance_type
  tags = {
    Environment = "Development"
  }
}


# variable.tf
variable "ami" {
  default = "ami-24e140119877avm"
}


variable "instance_type" {
  default = "t2.micro"
}


variable "region" {
  default = "ca-central-1"
}
```

In this configuration, the AMI and instance type are tailored for a development web server. To create similar resources for a production environment using the same configuration files, Terraform workspaces become essential.

> [!important]
> **Key Insight**
>
> Terraform workspaces allow you to reuse the same configuration directory for multiple environments by isolating state files.

## Listing and Creating Workspaces

Every Terraform configuration automatically creates a workspace named "default." You can list all workspaces with:

```
$ terraform workspace list
  * default
```

To create new workspaces, such as one for production and another for development, use the `terraform workspace new` command:

```
$ terraform workspace new production
Created and switched to workspace "production"!
You're now on a new, empty workspace. Workspaces isolate their state, so if you run "terraform plan" Terraform will not see any existing state for this configuration.


$ terraform workspace new development
Created and switched to workspace "development"!
You're now on a new, empty workspace. Workspaces isolate their state, so if you run "terraform plan" Terraform will not see any existing state for this configuration.
```

The asterisk (\*) in the output from `terraform workspace list` indicates the current active workspace:

```
$ terraform workspace list
  default
  production
  * development
```

## Configuring Different Environments

Assume that both production and development environments will deploy EC2 instances in the "ca-central-1" region with the same AMI. However, production demands a more powerful machine (using `m5.large`), while development will use `t2.micro`. To accommodate this difference, update your configuration to determine the instance type based on the active workspace. Convert the `instance_type` variable into a map and apply the `lookup` function.

### Updated Configuration

Make the following modifications to your resource block and variables:

```
# main.tf
resource "aws_instance" "webserver" {
  ami           = var.ami
  instance_type = lookup(var.instance_type, terraform.workspace)
  tags = {
    Environment = terraform.workspace
  }
}


# variable.tf
variable "ami" {
  default = "ami-24e140119877avm"
}


variable "region" {
  default = "ca-central-1"
}


variable "instance_type" {
  type = map
  default = {
    development = "t2.micro"
    production  = "m5.large"
  }
}
```

Here, the expression `terraform.workspace` returns the name of the current workspace. When used with the `lookup` function, it selects the appropriate instance type from the map. For instance, in the development workspace it returns "t2.micro," and in the production workspace it returns "m5.large."

You can verify this behavior using the Terraform console:

```
$ terraform console
> terraform.workspace
development
> lookup(var.instance_type, terraform.workspace)
t2.micro
```

Switch to the production workspace to confirm:

```
$ terraform workspace select production


$ terraform console
> terraform.workspace
production
> lookup(var.instance_type, terraform.workspace)
m5.large
```

When you run `terraform apply` in a particular workspace, Terraform selects the corresponding instance type and updates resource tags accordingly. For example, in the development workspace, the plan will show:

```
$ terraform apply
Terraform will perform the following actions:


# aws_instance.webserver will be created
+ resource "aws_instance" "webserver" {
    + ami           = "ami-24e140119877avm"
    + instance_type = "t2.micro"
    + tags = {
        + "Environment" = "development"
    }
}
...
```

In contrast, in the production workspace:

```
$ terraform workspace select production
Switched to workspace "production".


$ terraform apply
```

```
Terraform will perform the following actions:


# aws_instance.webserver will be created
+ resource "aws_instance" "webserver" {
    + ami           = "ami-24e140119877avm"
    + instance_type = "m5.large"
    + tags = {
        + "Environment" = "production"
    }
}
...
```

## Workspace State Files

When using workspaces with local state, Terraform no longer uses a single `terraform.tfstate` file in the configuration directory. Instead, it stores each workspace’s state in a dedicated subdirectory within `terraform.tfstate.d`. For example, the directory structure might look like this:

```
$ ls
main.tf  provider.tf  terraform.tfstate  variables.tf


$ tree terraform.tfstate.d/
terraform.tfstate.d/
|-- development
|   `-- terraform.tfstate
`-- production
    `-- terraform.tfstate


2 directories, 2 files
```

Each workspace directory contains its own `terraform.tfstate` file, ensuring that the state for one environment doesn't interfere with another.

> [!important]
> **Final Step**
>
> That concludes our guide on Terraform workspaces. Harness this feature to efficiently manage multiple infrastructure environments with a single configuration.

Proceed to the multiple-choice quiz to test your understanding of Terraform workspaces.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-associate-certification-hashicorp-certified/module/ed4291fc-57a9-43d3-abff-eb82bba4a679/lesson/473debba-eac1-42ad-a6d1-f90e337fb1b7)**
>
> Watch video content
