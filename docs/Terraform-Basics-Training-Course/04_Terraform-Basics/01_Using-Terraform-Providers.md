# Using Terraform Providers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Basics-Training-Course/Terraform-Basics/Using-Terraform-Providers)

---

## Table of Contents

- Using Terraform Providers
  - Initializing Your Working Directory
  - Provider Tiers
  - Example: Terraform Initialization Output
  - Understanding Provider Source Addresses
  - Next Steps
  - Watch Video

---

## Content

Terraform Basics Training Course

Terraform Basics

# Using Terraform Providers

Learn how Terraform providers enable you to manage resources across various platforms. This guide explains how to initialize your working directory, understand provider tiers, and interpret provider source addresses—all key steps in leveraging Terraform's plugin-based architecture.

## Initializing Your Working Directory

After creating your Terraform configuration file, initialize your working directory by running the following command:

```
terraform init
```

When executed in a directory with configuration files, Terraform downloads and installs the necessary provider plugins. These plugins allow Terraform to manage resources from major cloud providers like AWS, GCP, and Azure, as well as simpler providers such as the local provider for managing local file resources. Terraform's plugin-based architecture supports hundreds of infrastructure platforms, and the providers are distributed by HashiCorp via the [Terraform Registry](https://registry.terraform.io).

## Provider Tiers

Terraform providers are organized into three tiers based on ownership and maintenance:

| Provider Tier       | Description                                                                                                             | Examples                                  |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| Official Providers  | Maintained by HashiCorp. They include major cloud providers and providers like the local provider used in our examples. | AWS, GCP, Azure, Local                    |
| Partner Providers   | Managed by third-party technology companies that have completed HashiCorp's partner provider process.                   | F5 Networks (BigIP), Heroku, DigitalOcean |
| Community Providers | Developed and maintained by individual contributors within the HashiCorp community.                                     | Various community-driven plugins          |

## Example: Terraform Initialization Output

When you run `terraform init`, Terraform displays the version of each provider plugin being installed. The following example shows the initialization process and output details:

```
$ terraform init
Initializing the backend...


Initializing provider plugins...
- Finding latest version of hashicorp/local...
- Installing hashicorp/local v2.0.0...
- Installed hashicorp/local v2.0.0 (signed by HashiCorp)


The following providers do not have any version constraints in configuration,
so the latest version was installed.


To prevent automatic upgrades to new major versions that may contain breaking
changes, we recommend adding version constraints in a required_providers block
in your configuration, with the constraint strings suggested below.


* hashicorp/local: version = "~> 2.0.0"


Terraform has been successfully initialized!
```

> [!important]
> **Note**
>
> The `terraform init` command is safe to run repeatedly. It only updates the local plugin installation without modifying your deployed infrastructure.

## Understanding Provider Source Addresses

The provider name, such as `hashicorp/local`, is the source address Terraform uses to locate and download the plugin from the registry. This identifier consists of:

- An organizational namespace (`hashicorp`)
- A provider name (`local`)

Optionally, you can include a hostname to indicate the location of the registry. If omitted, Terraform defaults to `registry.terraform.io`.

```
hashicorp/local version = "~> 2.0.0"
```

![The image provides instructions for adding version constraints in Terraform configurations to prevent automatic upgrades, with a URL example highlighted.](https://kodekloud.com/kk-media/image/upload/v1752884190/notes-assets/images/Terraform-Basics-Training-Course-Using-Terraform-Providers/frame_200.jpg)

Since the local provider is hosted in the public Terraform Registry under the HashiCorp namespace, you can refer to it in either of the following ways:

- Full source address: `registry.terraform.io/hashicorp/local`
- Simplified: `hashicorp/local`

> [!important]
> **Warning**
>
> Without version constraints, Terraform installs the latest available version by default. Automatic updates may introduce breaking changes. Lock your configuration to a specific provider version to ensure stable and predictable deployments.

![The image shows a terminal output indicating the installation of the HashiCorp local provider version 2.0.0, with a recommendation to add version constraints.](https://kodekloud.com/kk-media/image/upload/v1752884192/notes-assets/images/Terraform-Basics-Training-Course-Using-Terraform-Providers/frame_240.jpg)

## Next Steps

To maintain stable deployments and avoid unexpected changes, consider adding version constraints to your provider configurations. This practice will be discussed in more detail later in this documentation.

For further reading, explore the [Terraform Documentation](https://www.terraform.io/docs) to enhance your infrastructure as code strategy and master Terraform providers.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/df2660a4-c959-4fa7-bfa8-0700885b598e/lesson/687abdb6-01aa-4903-acca-808e752a4f88)**
>
> Watch video content
