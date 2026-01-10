# Mounted Files - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Spacelift-Elevate-Your-Infrastructure-Deployment/Spacelift-Basics/Mounted-Files)

---

## Table of Contents

- Mounted Files
  - Updating the AWS Instance Configuration
  - Defining and Introducing Variables in Terraform
  - Handling Missing Variable Values
  - Leveraging Mounted Files in Spacelift
  - Cleaning Up Resources
  - Watch Video
    - Setting Up the Mounted File

---

## Content

Spacelift: Elevate Your Infrastructure Deployment

Spacelift Basics

# Mounted Files

In this article, we explore best practices for using variables in Terraform configurations while managing AWS resources with [Spacelift: Elevate Your Infrastructure Deployment](https://learn.kodekloud.com/user/courses/spacelift-elevate-your-infrastructure-deployment). You will learn how to update an AWS instance configuration, define and use Terraform variables, and leverage Spacelift's mounted files feature to supply variable values consistently.

---

## Updating the AWS Instance Configuration

Below is an example Terraform configuration for an AWS EC2 instance. Modify the configuration as needed, for instance by updating the instance type or other resource parameters.

```
resource "aws_instance" "app_server" {
  ami           = "ami-02396cdd13e9a1257"
  instance_type = "t2.micro"


  tags = {
    Name = "app-server"
  }
}
```

After updating the resource, commit the changes using Git:

```
git commit -m "changing to t2.micro"
[main e890439] changing to t2.micro
 1 file changed, 1 insertion(+), 1 deletion(-)
```

And then push the commit:

```
git push
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Delta compression using up to 12 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 362 bytes | 362.00 KiB/s, done.
Total 3 (delta 1), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (1/1), completed with 1 local object.
To https://github.com/Sanjeev-Thiyagarajan/spacelift-demo.git
 dbf10f3..e890439  main -> main
```

---

## Defining and Introducing Variables in Terraform

Instead of hard-coding resource values, it is best practice to use variables. First, create a `variables.tf` file with definitions for your instance name and VPC name:

```
variable "instance_name" {
  description = "Value of the Name tag for the EC2 instance"
  type        = string
  default     = "myInstance"
}


variable "vpc_name" {
  description = "Name of the VPC"
  type        = string
}
```

If you need the values to be provided at runtime, simply remove the default from the variable declaration:

```
variable "instance_name" {
  description = "Value of the Name tag for the EC2 instance"
  type        = string
}


variable "vpc_name" {
  description = "Name of the VPC"
  type        = string
}
```

Reference these variables in your main Terraform configuration (`main.tf`) as shown below:

```
required_version = ">= 1.2.0"


provider "aws" {
  region = "us-east-1"
}


resource "aws_vpc" "my_vpc" {
  cidr_block = "10.2.0.0/16"
  tags = {
    Name = var.vpc_name
  }
}


resource "aws_instance" "app_server" {
  ami           = "ami-02396cdd13e9a1257"
  instance_type = "t2.micro"


  tags = {
    env = var.instance_name
  }
}
```

Once changes are made, commit the updates:

```
git commit -m "added variables for instance and VPC names"
```

And push them:

```
git push
```

---

## Handling Missing Variable Values

If you trigger a Terraform run without setting required variable values, you will encounter errors during the planning stage. For example:

```
Error: No value for required variable
  on variables.tf line 1:
1: variable "instance_name" {
The root module input variable "instance_name" is not set, and has no default value. Use a var or -var-file command line argument to provide a value for this variable.


Error: No value for required variable
  on variables.tf line 7:
7: variable "vpc_name" {
```

> [!important]
> **Tip**
>
> These errors indicate that the values for `instance_name` and `vpc_name` have not been provided. To resolve this, supply the values using a `terraform.tfvars` file.

Create a `terraform.tfvars` file with:

```
instance_name = "testing-instance"
vpc_name = "test-vpc"
```

Then, commit and push your changes if needed:

```
git push
```

On rerunning Terraform, the provided variable values should be correctly applied.

---

## Leveraging Mounted Files in Spacelift

Managing numerous variables via environment variables can be cumbersome for large projects. Fortunately, [Spacelift: Elevate Your Infrastructure Deployment](https://learn.kodekloud.com/user/courses/spacelift-elevate-your-infrastructure-deployment) offers a mounted file feature that allows you to supply all your variable definitions through the `terraform.tfvars` file.

In Spacelift, workloads execute in a dedicated directory structure:

- All operations occur in `/mnt/workspace`.
- Your Git repository is cloned into `/mnt/workspace/source`.

> [!important]
> **Important**
>
> Ensure your `terraform.tfvars` file is mounted inside `/mnt/workspace/source`.

### Setting Up the Mounted File

1.  Navigate to the Environment Variables section in Spacelift and click **Edit**.
2.  Instead of setting individual variables, select the **Mounted File** option.
3.  Provide the file path:

    ```
    /mnt/workspace/source/terraform.tfvars
    ```

4.  Upload an existing `terraform.tfvars` file or create a new one with the following content:

    ```
    instance_name = "testing-instance"
    vpc_name = "test-vpc"
    ```

After mounting the file, trigger another run. The output should reflect that the variable values have been successfully injected. For example, you might see:

```
Plan: 0 to add, 2 to change, 0 to destroy.
Changes are GO
Uploading the list of managed resources...
Please be aware that Run Changes calculation includes Terraform output changes.
Resource list upload is GO
Generating JSON representation of the plan...
loading custom plan policy inputs...
Evaluated 1 plan policy
preflight checks are GO
Exporting workspace...
Uploading workspace...
workspace upload is GO
```

Within the detailed plan, the changes might appear similar to:

```
Terraform will perform the following actions:
  # aws_instance.app_server will be updated in-place
  resource "aws_instance" "app_server" {
    id                    = "i-aadd255fc794a8b9"
    tags = {
      "Name" = "app-server"
      "env"  = "testing-instance"
    }
  }
  tags_all = {
    "Name" = "app-server"
    "env"  = "testing-instance"
  }
  # (30 unchanged attributes hidden)
  # (7 unchanged blocks hidden)
```

This confirms that the `terraform.tfvars` file data was correctly used during the Terraform run.

---

## Cleaning Up Resources

To delete all the resources created by Terraform, you can use the `terraform destroy` command. Since Spacelift cannot handle interactive prompts, include the `--auto-approve` flag:

```
terraform destroy --auto-approve
```

If you experience issues—such as the command being blocked by a recent commit—consider discarding those changes and trying again. You can view the current state of resources with:

```
terraform state list
```

Once the process starts, Terraform will refresh the configuration, display a list of resources to be destroyed, and proceed with cleanup. After a short wait, you should receive confirmation of successful deletion.

---

That concludes this comprehensive guide on managing Terraform variables and utilizing Spacelift's mounted file feature. For additional resources, refer to the following links:

- [Terraform Documentation](https://www.terraform.io/docs)
- [Spacelift Documentation](https://spacelift.io/docs)

Happy Infrastructure Deployments!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/spacelift-elevate-your-infrastructure-deployment/module/74dbb4df-716f-4fa2-92e9-a223a3a697ca/lesson/d2aafa10-a554-4288-bd27-52a321f9b30b)**
>
> Watch video content
