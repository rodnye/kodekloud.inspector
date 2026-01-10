# Terraform Workspaces OSS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Basics-Training-Course/Terraform-Functions-and-Conditional-Expressions/Terraform-Workspaces-OSS)

---

## Table of Contents

- Terraform Workspaces OSS
  - Using Workspaces to Manage Environments
  - Parameterizing Your Configuration for Workspaces
  - Switching Workspaces and Applying Configuration Changes
  - Watch Video
  - Practice Lab

---

## Content

Terraform Basics Training Course

Terraform Functions and Conditional Expressions

# Terraform Workspaces OSS

In this lesson, we will explore how to use Terraform workspaces effectively to manage multiple environments and streamline your infrastructure as code (IaC) projects. By leveraging workspaces, you can eliminate repetitive tasks and maintain a single configuration directory while handling different projects or environments. This approach not only improves efficiency but also supports best practices for managing Terraform state files.

Terraform state is a critical component during IaC operations. Whether stored locally or on remote backends like [Amazon Simple Storage Service (Amazon S3)](https://learn.kodekloud.com/user/courses/amazon-simple-storage-service-amazon-s3), state files map your real-world infrastructure and help Terraform determine the necessary changes based on your configurations. In our examples, we've kept a one-to-one relationship between configuration directories and state files—one state file per configuration directory.

Consider a scenario where you need to create an [EC2 instance](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2) in the AWS CA Central 1 region for an initial project, Project A. You can start with a simple configuration file located in a directory named Project A inside your Terraform Projects folder. For example:

```
resource "aws_instance" "projectA" {
  ami           = "ami-0edab43b6fa892279"
  instance_type = "t2.micro"
  tags = {
    Name = "ProjectA"
  }
}
```

Running `terraform apply` in the Project A directory creates the EC2 instance and generates its corresponding state file.

Now, suppose you want to replicate this setup for a new project (Project B) with a different AMI ID and server name. The straightforward approach might involve creating a new directory for Project B, copying Project A’s configuration, and updating the AMI ID and tags. An example configuration combining both projects might look like this:

```
resource "aws_instance" "projectA" {
  ami           = "ami-0edab43b6fa892279"
  instance_type = "t2.micro"
  tags = {
    Name = "ProjectA"
  }
}


resource "aws_instance" "projectB" {
  ami           = "ami-0c2f25c1f66a1ff4d"
  instance_type = "t2.micro"
  tags = {
    Name = "ProjectB"
  }
}
```

> [!important]
> **Tip**
>
> Terraform workspaces allow you to use one configuration directory to manage multiple projects (or environments) without duplicating files. This improves maintainability and prevents configuration drift.

## Using Workspaces to Manage Environments

Terraform workspaces isolate state within the same configuration directory. To create a workspace for Project A, run:

```
$ terraform workspace new ProjectA
Created and switched to workspace "ProjectA"!


You're now on a new, empty workspace. Workspaces isolate their state, so if you run "terraform plan" Terraform will not see any existing state for this configuration.
```

To list all available workspaces, use:

```
$ terraform workspace list
default
* ProjectA
```

In the output, the default workspace is shown along with Project A (marked by an asterisk to indicate the active workspace).

## Parameterizing Your Configuration for Workspaces

To maintain a single configuration that dynamically adjusts for different projects in the `ca-central-1` region, create a `variables.tf` file. This file will define the region, instance type, and a map variable for AMI IDs—differentiating between Project A and Project B.

```
// variables.tf
variable "region" {
  default = "ca-central-1"
}


variable "instance_type" {
  default = "t2.micro"
}


variable "ami" {
  type = map(string)
  default = {
    "ProjectA" = "ami-0edab43b6fa892279"
    "ProjectB" = "ami-0c2f25c1f66a1ff4d"
  }
}
```

Next, update your main configuration file (`main.tf`) to dynamically select values based on the current workspace. Here, the AMI is chosen using Terraform's `lookup` function combined with the `terraform.workspace` variable, and the instance tag is automatically set to the workspace name:

```
// main.tf
resource "aws_instance" "project" {
  ami           = lookup(var.ami, terraform.workspace)
  instance_type = var.instance_type
  tags = {
    Name = terraform.workspace
  }
}
```

You can verify that the configuration adapts to the current workspace using the Terraform console:

```
$ terraform console
> terraform.workspace
ProjectA
> lookup(var.ami, terraform.workspace)
"ami-0edab43b6fa892279"
```

This confirms that when you are in the ProjectA workspace, Terraform selects the correct AMI ID.

## Switching Workspaces and Applying Configuration Changes

After setting up your configuration files, run `terraform plan` to preview changes for the current workspace (for example, ProjectA):

```
$ terraform plan
Terraform will perform the following actions:


# aws_instance.project will be created
+ resource "aws_instance" "project" {
    + ami           = "ami-0edab43b6fa892279"
    + instance_type = "t2.micro"
    + tags = {
        + "Name" = "ProjectA"
    }
}
```

To configure Project B, create a new workspace:

```
$ terraform workspace new ProjectB
Created and switched to workspace "ProjectB"!


You're now on a new, empty workspace. Workspaces isolate their state, so if you run "terraform plan" Terraform will not see any existing state for this configuration.
```

When you run `terraform plan` in the ProjectB workspace, Terraform will use the AMI and tag assigned to Project B:

```
$ terraform plan
Terraform will perform the following actions:


# aws_instance.project will be created
+ resource "aws_instance" "project" {
    + ami           = "ami-0c2f25c1f66a1ff4d"
    + instance_type = "t2.micro"
    + tags = {
        + "Name" = "ProjectB"
    }
}
```

To switch between workspaces, use the `terraform workspace select` command. For example, to switch back to ProjectA:

```
$ terraform workspace select ProjectA
Switched to workspace "ProjectA".
```

When you run `terraform apply` in each workspace, Terraform stores each workspace's state in a separate subdirectory within the `terraform.tfstate.d` directory. For example:

```
$ ls
main.tf  provider.tf  terraform.tfstate  variables.tf


$ tree terraform.tfstate.d/
terraform.tfstate.d/
├── ProjectA
│   └── terraform.tfstate
└── ProjectB
    └── terraform.tfstate


2 directories, 2 files
```

> [!important]
> **Key Information**
>
> Using workspaces ensures that changes in one environment (e.g., ProjectA) do not impact another (e.g., ProjectB), thanks to the isolated state files.

That concludes this lesson on Terraform workspaces. Practice managing multiple environments using a single configuration directory to maximize efficiency and maintainability in your Terraform projects.

For further insights:

- [Terraform Documentation](https://www.terraform.io/docs)
- [AWS EC2 Instance Guide](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2)
- [Amazon S3 Overview](https://learn.kodekloud.com/user/courses/amazon-simple-storage-service-amazon-s3)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/cdfc2941-5d41-4d7c-b701-cddd299de4c5/lesson/d805227d-3dc1-4d85-80d5-968bbfa12958)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/cdfc2941-5d41-4d7c-b701-cddd299de4c5/lesson/efca6a14-da3b-4bb6-a9fe-1d83d47101f7)**
>
> Practice lab
