# Recap Using Terraform Providers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Associate-Certification-HashiCorp-Certified/Terraform-Provider-Basics/Recap-Using-Terraform-Providers)

---

## Table of Contents

- Recap Using Terraform Providers
  - Understanding Terraform Init Output
  - Provider Naming Convention
  - Watch Video

---

## Content

Terraform Associate Certification: HashiCorp Certified

Terraform Provider Basics

# Recap Using Terraform Providers

In this article, we recap Terraform providers and illustrate how to use them to provision resources across various platforms.

Terraform follows a plugin-based architecture that supports hundreds of platforms, including AWS, GCP, Azure, and more. The first command you'll run with a valid configuration is the Terraform init command. This command installs the necessary plugins for the providers specified in your configuration.

> [!important]
> **Tip**
>
> Running `terraform init` is safe and can be executed multiple times without affecting your deployed infrastructure.

```
$ terraform init
```

Terraform providers, distributed by HashiCorp, are publicly available in the [Terraform Registry](https://registry.terraform.io). There are three types of providers:

1.  **Official Providers**: Owned and maintained by HashiCorp. These include major cloud providers like AWS, GCP, and Azure. Official providers feature a distinct badge in the Terraform Registry.
2.  **Partner Providers**: Maintained by third-party technology companies but reviewed and tested by HashiCorp. They are identified by a checkmark badge in the registry.
3.  **Community Providers**: Published and maintained by individual contributors.

![The image shows logos of cloud service providers and partners categorized as "Official," "Partner," and "Community" on the Terraform registry website.](https://kodekloud.com/kk-media/image/upload/v1752884151/notes-assets/images/Terraform-Associate-Certification-HashiCorp-Certified-Recap-Using-Terraform-Providers/frame_90.jpg)

## Understanding Terraform Init Output

When running `terraform init`, you may see output similar to the following:

```
$ terraform init
Initializing the backend...


Initializing provider plugins...
- Finding latest version of hashicorp/local...
- Installing hashicorp/local v2.0.0...
- Installed hashicorp/local v2.0.0 (signed by HashiCorp)


The following providers do not have any version constraints in configuration,
so the latest version was installed.


To prevent automatic upgrades to new major versions that may contain breaking changes,
we recommend adding version constraints in a required_providers block in your configuration,
with the constraint strings suggested below.


* hashicorp/local: version = "~> 2.0.0"


Terraform has been successfully initialized!
```

In this output, you can observe that the plugin for the HashiCorp Local provider (version 2.0.0) has been installed in your working directory. The plugins are downloaded into a hidden folder named `.terraform/plugins` located in the directory containing your configuration files.

> [!important]
> **Important**
>
> For production environments, always add version constraints in your configuration to avoid unexpected breaking changes from automatic upgrades.

## Provider Naming Convention

Terraform provider names include an organizational namespace. For example, in the case of the local provider, the namespace is "hashicorp", and the provider type is "local". Other common examples include AWS, Azure, and Google Cloud.

```
hashicorp/local version = "~> 2.0.0"
```

The provider name can optionally include a hostname. The hostname indicates the registry location for the plugin. By default, if the hostname is omitted, it defaults to `registry.terraform.io`. Therefore, the source address for the local provider can be specified as either:

- registry.terraform.io/hashicorp/local
- or simply hashicorp/local

![The image provides instructions for adding version constraints in Terraform configurations to prevent automatic upgrades. It includes a URL with labeled components.](https://kodekloud.com/kk-media/image/upload/v1752884152/notes-assets/images/Terraform-Associate-Certification-HashiCorp-Certified-Recap-Using-Terraform-Providers/frame_180.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-associate-certification-hashicorp-certified/module/e442ec14-d1e8-4e05-9ae1-078f6f00b63a/lesson/4af7473a-86c7-4d3d-8ff3-23de9f4b91af)**
>
> Watch video content
