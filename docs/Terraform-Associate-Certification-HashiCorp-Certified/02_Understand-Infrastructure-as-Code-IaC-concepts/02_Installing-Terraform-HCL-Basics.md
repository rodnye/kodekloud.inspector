# Installing Terraform HCL Basics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Associate-Certification-HashiCorp-Certified/Understand-Infrastructure-as-Code-IaC-concepts/Installing-Terraform-HCL-Basics)

---

## Table of Contents

- Installing Terraform HCL Basics
  - Installing Terraform
  - Understanding HashiCorp Configuration Language (HCL)
  - Example: Creating a Local File Resource
  - Example: Creating an AWS EC2 Instance
  - Overview of Terraform Resources
  - Terraform Workflow
  - Recap
  - Watch Video
    - Explanation of the Configuration

---

## Content

Terraform Associate Certification: HashiCorp Certified

Understand Infrastructure as Code IaC concepts

# Installing Terraform HCL Basics

In this article, you'll learn how to install Terraform and understand the basics of HCL (HashiCorp Configuration Language). We will walk through the process of installing Terraform on your system and introduce you to the structure of HCL configuration files.

Terraform is a popular Infrastructure as Code (IaC) tool that allows you to provision and manage a wide range of infrastructure resources. It supports various operating systems including Windows, macOS, Linux, Solaris, and OpenBSD.

> [!important]
> **Tip**
>
> Before you begin, ensure that you have the necessary permissions to install software on your system.

## Installing Terraform

Installation is straightforward:

1.  Download the binary for your operating system.
2.  Unzip the downloaded file.
3.  Move the binary to your system path.

For example, on Linux:

```
$ wget https://releases.hashicorp.com/terraform/0.15.0/terraform_0.15.0_linux_amd64.zip
$ unzip terraform_0.15.0_linux_amd64.zip
$ mv terraform /usr/local/bin
$ terraform version
Terraform v0.15.0
```

After installing, Terraform is ready to use for provisioning resources.

## Understanding HashiCorp Configuration Language (HCL)

Terraform configurations are written in HCL and stored in files with a `.tf` extension. These files are composed of blocks and arguments:

- **Blocks:** Define the infrastructure components or describe which resources to create.
- **Arguments:** Provided as key-value pairs within the blocks, they specify configuration parameters.

## Example: Creating a Local File Resource

The following is an example configuration file named `local.tf` that creates a file on the local system. This simple example helps illustrate the basics, even though the majority of this course will focus on AWS-based resources.

Let's review the configuration in `local.tf`:

```
resource "local_file" "pet" {
  filename = "/root/pets.txt"
  content  = "We love pets!"
}
```

### Explanation of the Configuration

- **Resource Block:**  
  The block starts with the keyword `resource` and is enclosed in curly braces. It tells Terraform which infrastructure object to manage.
- **Resource Type and Provider:**  
  In this example, the resource type is `local_file`. The prefix before the underscore ("local") indicates the provider, while the suffix ("file") specifies the resource type.
- **Resource Name:**  
  The name `pet` acts as a logical identifier for this resource, allowing you to reference it in other parts of your configuration.
- **Arguments:**  
  Inside the block, there are two key-value pairs: `filename` (the path of the file) and `content` (the content to be written to the file).

## Example: Creating an AWS EC2 Instance

The configuration structure remains consistent across providers. Here is an example used to create an AWS EC2 instance:

```
resource "aws_instance" "web" {
  ami           = "ami-0c2f25c1f66a1ff4d"
  instance_type = "t2.micro"
}
```

This block defines an AWS EC2 instance by specifying the AMI ID and the instance type.

## Overview of Terraform Resources

A resource in Terraform is any object that it manages. This includes:

- Local files (e.g., `local_file`)
- Virtual machine instances (e.g., AWS EC2)
- Cloud services such as S3 buckets, ECS clusters, DynamoDB tables, IAM users, and many more

Terraform supports hundreds of providers. For detailed information on available arguments and configurations for a specific resource, always refer to the [Terraform Documentation](https://www.terraform.io/docs).

![The image shows a diagram and text detailing a provider's resource type and argument reference, including optional and required parameters for file creation and permissions.](https://kodekloud.com/kk-media/image/upload/v1752884167/notes-assets/images/Terraform-Associate-Certification-HashiCorp-Certified-Installing-Terraform-HCL-Basics/frame_560.jpg)

In the provider documentation, you will see that some arguments are mandatory (like `filename` for `local_file`), while others, including ACLs or permissions, may be optional.

## Terraform Workflow

After writing your configuration files, use the following steps to provision your resources:

1.  **Write the Configuration File:**  
    Create your `.tf` files with the required resource definitions.
2.  **Initialize the Directory:**  
    Run the `terraform init` command to initialize the working directory and download necessary provider plugins.

    ```
    $ terraform init
    Initializing the backend...


    Initializing provider plugins...
    - Finding latest version of hashicorp/local...
    - Installing hashicorp/local v1.4.0...
    - Installed hashicorp/local v1.4.0 (signed by HashiCorp)


    The following providers do not have any version constraints in configuration,
    so the latest version was installed.


    To prevent automatic upgrades to new major versions that may contain breaking
    changes, we recommend adding version constraints in a required_providers block
    in your configuration, with the constraint strings suggested below.


    * hashicorp/local: version = "~> 1.4.0"


    Terraform has been successfully initialized!
    ```

3.  **Review the Execution Plan:**  
    Use `terraform plan` to preview the actions Terraform will perform. The output will show symbols; for example, a plus sign (+) indicates a resource creation.
4.  **Apply the Configuration:**  
    Run `terraform apply` to execute the execution plan. Terraform will prompt you for confirmation before proceeding unless you supply the `-auto-approve` flag.

    ```
    $ terraform apply
    An execution plan has been generated and is shown below.
    Resource actions are indicated with the following symbols:
    + create


    Terraform will perform the following actions:


    # local_file.pet will be created:
    + resource "local_file" "pet" {
        + content              = "We love pets!"
        + directory_permission = "0777"
        + file_permission      = "0777"
        + filename             = "/root/pets.txt"
        + id                   = (known after apply)
    }


    Plan: 1 to add, 0 to change, 0 to destroy.


    Do you want to perform these actions?
    Terraform will perform the actions described above.
    Only 'yes' will be accepted to approve.


    Enter a value: yes
    local_file.pet: Creating...
    local_file.pet: Creation complete after 0s
    [id=521c5c732c78cb42cc9513ecc7c0638c4a115b55]
    Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
    ```

    To verify the resource creation, use the `terraform show` command:

    ```
    $ terraform show
    # local_file.pet:
    resource "local_file" "pet" {
      content              = "We love pets!"
      directory_permission = "0777"
      file_permission      = "0777"
      filename             = "/root/pets.txt"
      id                   = "cba595b7d9f94ba1107a46f3f731912d95fb3d2c"
    }
    ```

    The `terraform show` command displays the state of the created resource.

> [!important]
> **Further Reading**
>
> For more details on Terraform state management and best practices, check out the official [Terraform Documentation](https://www.terraform.io/docs/state).

## Recap

- **Resource Blocks:**  
  Define the objects Terraform manages. They include the resource type, a logical identifier, and configuration arguments.
- **Arguments:**  
  Specify the parameters for each resource. They can be either mandatory or optional depending on the resource.
- **Providers:**  
  Terraform works with multiple providers, each offering a unique set of resources and configuration options. Always refer to the provider's documentation to understand all available arguments.

This concludes our article on installing Terraform and HCL basics. In future discussions, we will explore methods for updating and destroying resources using Terraform.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-associate-certification-hashicorp-certified/module/e27c7cfe-a9f1-4e56-b55b-f908bd92d21c/lesson/0128c5a1-722c-4738-9a0b-30e527a38fff)**
>
> Watch video content
