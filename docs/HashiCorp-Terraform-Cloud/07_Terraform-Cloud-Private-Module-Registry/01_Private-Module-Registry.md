# Private Module Registry - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Terraform-Cloud/Terraform-Cloud-Private-Module-Registry/Private-Module-Registry)

---

## Table of Contents

- Private Module Registry
  - Key Features
  - Providers and Modules in Terraform
  - Managing Modules at Scale
  - Publishing Modules
  - Consuming Modules
  - Versioning Modules
  - Watch Video
  - Practice Lab
    - Providers
    - Modules

---

## Content

HashiCorp : Terraform Cloud

Terraform Cloud Private Module Registry

# Private Module Registry

One of the biggest advantages of Infrastructure as Code (IaC) is the ability to create reusable, versioned components for common infrastructure patterns. Terraform supports this through providers, modules, and policies. While the [public Terraform Registry](https://registry.terraform.io) enables anyone to share, Terraform Cloud offers a private registry scoped to your organization. In this guide, we’ll cover what the private registry is, why to use it, and how to publish, manage, and consume modules and providers within it.

![The image is an informational note about the "Private Registry" feature in Terraform Cloud, explaining its name change from "Private Module Registry" and its support for custom providers and policies. It includes a logo and cartoon characters at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752878807/notes-assets/images/HashiCorp-Terraform-Cloud-Private-Module-Registry/terraform-cloud-private-registry-note.jpg)

## Key Features

Terraform Cloud’s private registry helps you centrally store, version, and share approved modules and providers. With it, you can:

- Enforce standardized infrastructure patterns
- Control which providers and modules your teams can use
- Track and roll out new versions without disrupting existing users

![The image explains the features of Terraform Cloud's private registry, highlighting its ability to curate, store, and share custom modules and providers within an organization, while supporting versioning and standardization.](https://kodekloud.com/kk-media/image/upload/v1752878808/notes-assets/images/HashiCorp-Terraform-Cloud-Private-Module-Registry/terraform-cloud-private-registry-features.jpg)

## Providers and Modules in Terraform

Terraform components fall into two categories:

- **Providers**: Plugins that manage infrastructure resources (e.g., AWS, Azure).
- **Modules**: Reusable collections of Terraform code packaged together.

Both public and private registries make it simple to discover and integrate providers and modules into your configurations.

![The image explains the concept of a Private Registry in Terraform, highlighting that providers are plugins for managing infrastructure resources, and modules are reusable configurations. It also mentions that the Terraform Registry facilitates the use of any provider or module.](https://kodekloud.com/kk-media/image/upload/v1752878809/notes-assets/images/HashiCorp-Terraform-Cloud-Private-Module-Registry/terraform-private-registry-concept.jpg)

### Providers

In your private registry, you can:

- Recommend or pin specific public providers.
- Automatically sync updates from the [public Terraform Registry](https://registry.terraform.io).
- Publish custom, organization-specific providers.

![The image is a slide titled "Private Registry: Providers" with bullet points explaining features of Terraform Cloud's private registry, such as designating recommended public providers, synchronizing with the public Terraform Registry, and supporting private provider publication.](https://kodekloud.com/kk-media/image/upload/v1752878810/notes-assets/images/HashiCorp-Terraform-Cloud-Private-Module-Registry/private-registry-terraform-cloud-features.jpg)

### Modules

Modules abstract complexity into reusable patterns. For example, the “S3 bucket” module on the public registry looks like this:

```
module "s3-bucket" {
  source  = "terraform-aws-modules/s3-bucket"
  version = "3.4.0"


  # custom inputs...
}
```

You can also publish organization-specific modules. Here’s a sample by Bryan Krausen that provisions HCP HashiCorp Vault with a transit gateway:

```
module "vault-aws-tgw" {
  source  = "bkrausen/vault-aws-tgw"
  version = "1.0.0"


  # insert the 7 required variables
}
```

![The image is a slide titled "Managing Modules" from HashiCorp Terraform Cloud, explaining how to configure Terraform modules in three steps. It includes a brief description and two illustrated characters at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752878812/notes-assets/images/HashiCorp-Terraform-Cloud-Private-Module-Registry/managing-modules-terraform-cloud-slide.jpg)

## Managing Modules at Scale

When you have dozens of modules with multiple versions, file shares and manual versioning become error-prone. Terraform Cloud’s private registry integrates with version control systems (VCS) to help you:

- Migrate modules into Git repositories
- Publish and version for discoverability
- Support new releases while retaining older versions

![The image is a slide titled "Managing Modules" with common questions about module management, including handling multiple modules, managing versions, and accessing the correct module. It features the HashiCorp Terraform Cloud logo and two illustrated characters at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752878813/notes-assets/images/HashiCorp-Terraform-Cloud-Private-Module-Registry/managing-modules-module-management-questions.jpg)

![The image is a guide on publishing to the private registry in Terraform Cloud, showing examples of adding providers and modules from the public registry to an organization's infrastructure.](https://kodekloud.com/kk-media/image/upload/v1752878814/notes-assets/images/HashiCorp-Terraform-Cloud-Private-Module-Registry/terraform-cloud-private-registry-guide.jpg)

You can also enforce policy-based controls with [Sentinel](https://www.terraform.io/cloud/sentinel), ensuring that all modules and providers come from your private registry and preventing unapproved sources.

## Publishing Modules

Publishing to the private registry follows public registry guidelines—except that your Git repositories can stay private. Public registry rules include:

![The image provides guidelines for publishing a module to the public registry on GitHub, including naming conventions, repository description, module structure, and version tagging. It features the HashiCorp Terraform Cloud logo and cartoon characters at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752878816/notes-assets/images/HashiCorp-Terraform-Cloud-Private-Module-Registry/github-module-publishing-guidelines-terraform.jpg)

- Host code on GitHub (public for public registry).
- Name your repo as `terraform-<PROVIDER>-<NAME>`.
- Include a clear repository description.
- Follow the standard module structure (`variables.tf`, `outputs.tf`, `README.md`, etc.).
- Tag releases with [semantic versioning](https://semver.org/) (e.g., `v1.0.0`, `v3.2.5`).

![The image provides guidelines for publishing a module to the Terraform public registry, including requirements for GitHub, naming conventions, repository descriptions, module structure, and version tagging.](https://kodekloud.com/kk-media/image/upload/v1752878818/notes-assets/images/HashiCorp-Terraform-Cloud-Private-Module-Registry/terraform-module-publishing-guidelines.jpg)

> [!important]
> **Note**
>
> When you connect your VCS to Terraform Cloud, private repositories must still follow naming, structure, and tagging rules.

![The image is a slide about publishing to the Terraform Cloud private registry, listing requirements like VCS provider support, naming conventions, repository description, standard module structure, and version tags. It includes a Terraform Cloud logo and cartoon characters at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752878820/notes-assets/images/HashiCorp-Terraform-Cloud-Private-Module-Registry/terraform-cloud-publishing-requirements-slide.jpg)

> [!important]
> **Supported VCS Providers**
>
> Terraform Cloud integrates with these version control systems:
>
> | Provider        | Link                                         | Type               |
> | --------------- | -------------------------------------------- | ------------------ |
> | GitHub          | https://github.com                           | SaaS & Self-Hosted |
> | GitLab          | https://gitlab.com                           | SaaS               |
> | Bitbucket Cloud | https://bitbucket.org                        | SaaS               |
> | Azure DevOps    | https://azure.microsoft.com/services/devops/ | SaaS               |

## Consuming Modules

Once published, reference private modules and providers just as you would public ones. The only difference is the `source`:

```
module "security-group" {
  source  = "app.terraform.io/<ORG>/aws-ec2-vpc-security-group/aws"
  version = "2.1.0"
}
```

Terraform Cloud provides a copy/paste code block to ensure you use the correct source and version.

![The image shows a screenshot of a Terraform Cloud interface, specifically detailing a security group module for AWS EC2-VPC. It includes module information, usage instructions, and configuration details, with a "Using the Private Registry" title and a Terraform Cloud logo.](https://kodekloud.com/kk-media/image/upload/v1752878821/notes-assets/images/HashiCorp-Terraform-Cloud-Private-Module-Registry/terraform-cloud-aws-ec2-vpc-module.jpg)

## Versioning Modules

Terraform Cloud watches for new tags that follow `MAJOR.MINOR.PATCH`. To release a new version:

1.  Create a Git tag (e.g., `v1.2.0`).
2.  Push it to your repository.
3.  Terraform Cloud automatically registers the new version in your private registry.

![The image provides instructions on releasing new versions in the Terraform Registry, emphasizing the use of semantic version tags. It includes examples of valid tags and explains the process of creating and pushing a new tag to notify the registry.](https://kodekloud.com/kk-media/image/upload/v1752878822/notes-assets/images/HashiCorp-Terraform-Cloud-Private-Module-Registry/terraform-registry-versioning-instructions.jpg)

---

Terraform Cloud’s private registry centralizes your approved modules and providers, enforces organizational policies, and simplifies version management—empowering your teams to build and scale infrastructure consistently and securely.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-terraform-cloud/module/55b59425-ff18-4a6b-a521-907542051f03/lesson/e33b7403-01a1-409c-8372-be50f7b18439)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/hashicorp-terraform-cloud/module/55b59425-ff18-4a6b-a521-907542051f03/lesson/001a25e6-4646-4e33-8e16-42187f771758)**
>
> Practice lab
