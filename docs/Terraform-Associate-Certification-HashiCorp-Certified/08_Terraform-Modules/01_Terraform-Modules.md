# Terraform Modules - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Associate-Certification-HashiCorp-Certified/Terraform-Modules/Terraform-Modules)

---

## Table of Contents

- Terraform Modules
  - Understanding the Root Module
  - Reusing Modules with Child Modules
  - Leveraging the Terraform Registry
  - Benefits of Using Modules
  - Next Steps
  - Watch Video
    - Example: Using an AWS Security Group Module

---

## Content

Terraform Associate Certification: HashiCorp Certified

Terraform Modules

# Terraform Modules

Terraform modules are a powerful way to organize your infrastructure as code. In Terraform, any directory containing configuration files is considered a module. Each Terraform configuration must have one root module, which is the directory where you run your Terraform commands. In this guide, we'll review how modules work and demonstrate how to use both local and registry modules.

## Understanding the Root Module

Consider a configuration directory named "aws-instance" located under your Terraform projects directory. This folder contains the configuration files needed to deploy a simple EC2 instance on AWS. Since Terraform commands are executed inside this folder, "aws-instance" serves as the root module for that configuration.

For example, listing the contents of the "aws-instance" directory:

```
$ ls /root/terraform-projects/aws-instance
main.tf  variables.tf
```

The `main.tf` file might include the following configuration:

```
resource "aws_instance" "webserver" {
  ami           = var.ami
  instance_type = var.instance_type
  key_name      = var.key
}
```

And the `variables.tf` file could define variables like this:

```
variable "ami" {
  type        = string
  default     = "ami-0edab43b6fa892279"
  description = "Ubuntu AMI ID in the ca-central-1 region"
}
```

## Reusing Modules with Child Modules

Terraform modules can also reference other modules, enabling you to package and reuse resource configurations efficiently. Suppose you wish to create a new development web server instance using the existing "aws-instance" module. Instead of duplicating the configuration, you can simply call the module from a new directory called "development."

First, create the new directory:

```
$ mkdir /root/terraform-projects/development
```

Inside the "development" directory, create a configuration file with the following module block that references the local AWS instance module:

```
module "dev-webserver" {
  source = "../aws-instance"
}
```

Since Terraform commands are executed from the "development" directory, it becomes the root module and the AWS instance directory works as a child module. The "module" keyword is followed by a logical name (in this example, "dev-webserver") and a required `source` parameter that provides the path to the module. You can also specify an absolute path:

```
module "dev-webserver" {
  source = "/root/terraform-projects/aws-instance"
}
```

> [!important]
> **Tip**
>
> Using absolute paths can be effective in some scenarios, but it is generally recommended to use relative paths for portability.

## Leveraging the Terraform Registry

One of the key benefits of using modules is code reusability. In addition to local modules, you can also utilize modules hosted on the [Terraform Registry](https://registry.terraform.io), which is a robust repository for both provider plugins and community or official modules. For example, instead of writing a security group configuration from scratch, you might search for a suitable module in the Registry.

Below is an example search result:

![The image shows a search result for "security-group" in the Terraform Registry, listing various modules for AWS and Azure security groups.](https://kodekloud.com/kk-media/image/upload/v1752884150/notes-assets/images/Terraform-Associate-Certification-HashiCorp-Certified-Terraform-Modules/frame_190.jpg)

Modules found in the Registry typically include publisher details, version information, and usage instructions with examples. They might also offer sub-modules for common configurations like SSH, HTTP, or HTTPS security rules.

### Example: Using an AWS Security Group Module

To use a module for creating a security group in your configuration, include a module block with the appropriate source and version specifications. For instance:

```
module "security-group" {
  source  = "terraform-aws-modules/security-group"
  version = "3.16.0"
  # Insert the required variables here
}
```

If you need a sub-module specifically for SSH access, requiring additional arguments like a security group name, VPC ID, and ingress CIDR blocks, your configuration might look like this:

```
module "security-group_ssh" {
  source              = "terraform-aws-modules/security-group/aws/modules/ssh"
  version             = "3.16.0"
  vpc_id              = "vpc-7d8d215"
  ingress_cidr_blocks = ["10.10.0.0/16"]
  name                = "ssh-access"
}
```

After defining your configuration, follow the standard Terraform workflow:

1.  **Initialize Terraform:**  
    Download necessary provider plugins and modules by running:

    ```
    $ terraform init
    Downloading terraform-aws-modules/security-group/aws 3.16.0 for security-group_ssh...
    - security-group_ssh in .terraform/modules/security-group_ssh/modules/ssh
    ```

2.  **Plan and Apply:**  
    Validate the configuration with `terraform plan` and create the resources using `terraform apply`.

> [!important]
> **Workflow Reminder**
>
> Remember that running `terraform init`, `terraform plan`, and `terraform apply` in the directory where your root module is located is crucial for successful deployment.

## Benefits of Using Modules

Modules in Terraform offer numerous advantages:

| Benefit                     | Description                                                                                |
| --------------------------- | ------------------------------------------------------------------------------------------ |
| Reusability                 | Encapsulate resources in self-contained units that can be reused across multiple projects. |
| Simplified Configuration    | Reduce configuration complexity by abstracting detailed setups into modules.               |
| Improved Readability        | Maintain shorter and more understandable root modules.                                     |
| Reduced Risk of Human Error | Use tested and validated modules to minimize errors.                                       |
| Configuration Locking       | Restrict specific variables in the root module to enforce standard parameters.             |

These benefits emphasize why modules are a vital tool for creating consistent and standardized cloud environments.

## Next Steps

In the next lesson, we will dive deeper into advanced module usage, exploring techniques for module parameterization and dependency management. For further learning, consider visiting the [Terraform Documentation](https://www.terraform.io/docs) or exploring additional modules on the [Terraform Registry](https://registry.terraform.io).

Happy coding with Terraform!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-associate-certification-hashicorp-certified/module/7b1fdaed-c4dd-45b8-be74-8068def45ce7/lesson/b83ef4fa-afa8-4ada-b72e-425153d4b38e)**
>
> Watch video content
