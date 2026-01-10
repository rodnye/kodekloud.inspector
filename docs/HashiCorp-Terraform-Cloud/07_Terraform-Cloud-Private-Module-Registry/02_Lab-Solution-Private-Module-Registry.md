# Lab Solution Private Module Registry - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Terraform-Cloud/Terraform-Cloud-Private-Module-Registry/Lab-Solution-Private-Module-Registry)

---

## Table of Contents

- Lab Solution Private Module Registry
  - Prerequisites
  - 1. Importing Public Providers and Modules
  - 2. Forking and Publishing a Private Module
  - 3. Selecting a Specific Module Version
  - 4. Consuming the Private Module in a Terraform Project
  - Summary of Actions
  - Links and References
  - Watch Video

---

## Content

HashiCorp : Terraform Cloud

Terraform Cloud Private Module Registry

# Lab Solution Private Module Registry

Welcome to this hands-on lab where you'll learn to manage private providers and modules in Terraform Cloud. The Private Module Registry enables your team to securely store and share Terraform providers and modules within your organization.

## Prerequisites

> [!important]
> **Note**
>
> Ensure you have:
>
> - A Terraform Cloud account with organization permissions
> - A connected VCS provider (e.g., GitHub)
> - `terraform` CLI installed and authenticated

## 1\. Importing Public Providers and Modules

First, import existing public resources into your Private Module Registry:

1.  Navigate to **Registry** » **Providers**, search for `hashicorp/aws`, and click **Add to organization**.  
    ![The image shows a dialog box for adding a provider to an organization in Terraform Cloud, specifically adding the "hashicorp/aws" provider. There are options to "Add to organization" or "Cancel."](https://kodekloud.com/kk-media/image/upload/v1752878797/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Private-Module-Registry/terraform-cloud-add-provider-dialog.jpg)
2.  Switch to the **Modules** tab, search for the S3 bucket module, and click **Add to organization**.

Once complete, your Private Module Registry will include the AWS provider and the S3 bucket module.

## 2\. Forking and Publishing a Private Module

Next, fork a public module repository and publish it privately:

1.  On the public Terraform Registry, open the **AWS Security Group** module and click the GitHub repo link.  
    ![The image shows a GitHub repository page for "terraform-aws-security-group," displaying the file structure and repository details such as stars, forks, and recent commits.](https://kodekloud.com/kk-media/image/upload/v1752878798/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Private-Module-Registry/github-repo-terraform-aws-security-group.jpg)
2.  Fork the repository into your GitHub account.  
    ![The image shows a GitHub interface for creating a new fork of a repository named "terraform-aws-security-group." It includes options to set the owner, repository name, and description, with a button to create the fork.](https://kodekloud.com/kk-media/image/upload/v1752878800/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Private-Module-Registry/github-fork-terraform-aws-security-group.jpg)
3.  In Terraform Cloud, go to **Registry** » **Private Module Registry**, click **Publish**, select your GitHub VCS provider, and choose the forked repo.  
    ![The image shows a user interface for adding a module in Terraform Cloud, where the user can connect to a VCS and choose a repository from a list. The sidebar includes options like Workspaces, Registry, and Settings.](https://kodekloud.com/kk-media/image/upload/v1752878801/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Private-Module-Registry/terraform-cloud-add-module-interface.jpg)

After publishing, Terraform Cloud displays the module README and usage details:

![The image shows a webpage for a Terraform module named "security-group," which creates EC2-VPC security groups on AWS. It includes details like version, publication time, and usage instructions.](https://kodekloud.com/kk-media/image/upload/v1752878802/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Private-Module-Registry/terraform-module-security-group-ec2-vpc.jpg)

You can now source this private module:

```
module "security-group" {
  source  = "app.terraform.io/Mastering-Terraform-Cloud/security-group/aws"
  version = "4.13.1"
}
```

## 3\. Selecting a Specific Module Version

To use an earlier version (for example, `4.8.0`), update your module block:

```
module "security-group" {
  source  = "app.terraform.io/Mastering-Terraform-Cloud/security-group/aws"
  version = "4.8.0"
}
```

## 4\. Consuming the Private Module in a Terraform Project

Finally, integrate the private module into your application:

1.  Copy the **Clumsy Birds** repo URL.  
    ![The image shows a GitHub repository page for a project named "Clumsy Birds," with details about branches, commits, and files such as `.gitignore` and `README.md`. The repository is private and has no stars or forks.](https://kodekloud.com/kk-media/image/upload/v1752878803/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Private-Module-Registry/clumsy-birds-github-repo-details.jpg)
2.  Clone and switch to the `development` branch:

    ```
    git clone https://github.com/your-org/clumsy_bird.git
    cd clumsy_bird
    git checkout development
    ```

3.  Create `security_groups.tf` and add:

    ```
    module "security-group-http" {
      source              = "app.terraform.io/Mastering-Terraform-Cloud/security-group/aws"
      version             = "4.8.0"
      name                = "http-traffic-${var.env}"
      description         = "Security group for HTTP traffic"
      vpc_id              = module.vpc.vpc_id
      ingress_cidr_blocks = ["10.10.0.0/16"]
    }
    ```

4.  Commit and push your changes:

    ```
    git config --global user.email "your.email@example.com"
    git config --global user.name "Your Name"
    git add security_groups.tf
    git commit -m "Add private security group module for HTTP traffic"
    git push origin development
    ```

Terraform Cloud will trigger a run; upon success, the security group appears in AWS.

> [!important]
> **Warning**
>
> Ensure your module’s semantic versioning aligns with your organization’s policy. Misaligned versions may break downstream workflows.

## Summary of Actions

| Step                                | Action                        | Destination                     |
| ----------------------------------- | ----------------------------- | ------------------------------- |
| Import public items                 | Add provider & module         | Terraform Cloud Registry        |
| Fork & publish private module       | GitHub fork & Terraform Cloud | Private Module Registry         |
| Select specific module version      | Update `version` attribute    | Terraform configuration         |
| Consume module in project workspace | Clone repo & add module block | Clumsy Birds development branch |

## Links and References

- [Terraform Cloud Private Module Registry](https://www.terraform.io/cloud/registry/private)
- [Terraform CLI Documentation](https://www.terraform.io/docs/cli/index.html)
- [GitHub Forking Guide](https://docs.github.com/en/forks)

This completes the lab on the Terraform Cloud Private Module Registry. Proceed to the next module for advanced collaboration features.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-terraform-cloud/module/55b59425-ff18-4a6b-a521-907542051f03/lesson/89b24aff-c770-428d-96c8-dab273b5433d)**
>
> Watch video content
