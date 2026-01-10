# Terraform Cloud Workflows - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Terraform-Cloud/Terraform-Cloud-Workflows/Terraform-Cloud-Workflows)

---

## Table of Contents

- Terraform Cloud Workflows
  - Overview
  - 1. CLI Workflow
  - 2. Version Control Workflow
  - 3. API Workflow
  - Summary
  - Watch Video
  - Practice Lab
    - Branching Strategy Example

---

## Content

HashiCorp : Terraform Cloud

Terraform Cloud Workflows

# Terraform Cloud Workflows

## Overview

Terraform Cloud extends your typical Terraform process—write configurations, run `terraform plan`, and execute `terraform apply`—by centralizing state, history, and team collaboration. Whether you’re kicking off runs manually, triggering them on Git commits, or embedding Terraform in CI/CD pipelines, Terraform Cloud adapts to your needs.

Terraform Cloud offers three main workflows to fit different team models:

![The image is a slide explaining how Terraform Cloud can integrate with team workflows, offering manual, semi-automatic, and continuous infrastructure options. It includes a logo and cartoon characters at the bottom.](/images/HashiCorp-Terraform-Cloud-Terraform-Cloud-Workflows-integration.jpg)

| Workflow Type            | Trigger             | State & Run History      | Ideal Use Case                   |
| ------------------------ | ------------------- | ------------------------ | -------------------------------- |
| CLI Workflow             | Local CLI commands  | Remote (Terraform Cloud) | Individual development & testing |
| Version Control Workflow | Git commits or PRs  | Remote (Terraform Cloud) | GitOps-driven teams              |
| API Workflow             | Terraform Cloud API | Remote (Terraform Cloud) | CI/CD pipelines & custom tools   |

Depending on how mature your processes are, you can:

- Queue runs on demand (manual).
- Push code to version control and apply manually (semi-automated).
- Deploy infrastructure on every commit (continuous).

When you create a workspace, Terraform Cloud prompts you to select a workflow: Command Line (CLI), Version Control (VCS), or API.

![The image illustrates three types of workflows: Command Line (CLI), Version Control Software (VCS), and API, with a checkmark next to VCS. It includes the HashiCorp Terraform Cloud logo.](/images/HashiCorp-Terraform-Cloud-Terraform-Cloud-Workflows-cli-vcs-api-terraform.jpg)

---

## 1\. CLI Workflow

The **CLI Workflow** is the default experience in Terraform Cloud and closely parallels open-source Terraform. You author and plan locally, but state and run history live in Terraform Cloud.

![The image is a slide titled "Terraform CLI Workflow," describing Terraform Cloud's default workflow, its familiarity for existing Terraform OSS users, and its collaboration features. It includes two cartoon characters at the bottom right.](/images/HashiCorp-Terraform-Cloud-Terraform-Cloud-Workflows-cli-workflow-cartoon-characters.jpg)

Typical local steps:

```
terraform init
terraform plan
terraform apply
```

With the CLI workflow:

- State is stored remotely in Terraform Cloud.
- Runs can execute locally or in Terraform Cloud, based on workspace settings.
- You retain familiar CLI commands.

To connect your local CLI to Terraform Cloud, add a `terraform` block in your configuration:

```
terraform {
  cloud {
    hostname     = "app.terraform.io"
    organization = "my-organization"
    workspaces {
      name = "bagapp-web-aws-prod"
    }
  }
}
```

This configuration tells Terraform where to store state and which workspace to target.

> [!important]
> **Note**
>
> If you haven’t authenticated yet, run `terraform login` to save your API token locally.

---

## 2\. Version Control Workflow

The **Version Control Workflow (VCS)** integrates Terraform Cloud directly with Git platforms (GitHub, GitLab, Bitbucket, Azure DevOps). Each commit or pull request can automatically trigger plans and, optionally, applies.

![The image is a slide titled "Version Control Workflow," explaining how code is stored in a repository and connected through VCS platforms like GitHub, GitLab, BitBucket, and Azure DevOps, with a process involving SSH keys, code commits, and triggering Terraform runs.](/images/HashiCorp-Terraform-Cloud-Terraform-Cloud-Workflows-version-control-workflow-git-repository.jpg)

Key features:

- Automated `terraform plan` on commits or pull requests.
- Speculative runs for pre-merge previews.
- Manual or automatic `terraform apply` after approval.
- Branch-to-workspace mapping for different environments.

Supported VCS providers:

- GitHub
- GitLab
- Bitbucket
- Azure DevOps

For private Git servers, configure SSH keys under your workspace settings.

When you push to the connected branch, Terraform Cloud will:

1.  Detect the commit.
2.  Run `terraform plan`.
3.  Pause for manual approval (if auto-apply is off).
4.  Execute `terraform apply` (if approved) and stream results back to both the UI and your Git platform.

You can still run speculative plans locally:

```
terraform plan
```

But all applies happen through commits, ensuring your infrastructure matches version-controlled code.

![The image illustrates a version control workflow involving a developer committing changes to a GitHub repository, triggering Terraform Cloud to execute and manage cloud resources and VMs/containers.](/images/HashiCorp-Terraform-Cloud-Terraform-Cloud-Workflows-version-control-github-terraform-workflow.jpg)

### Branching Strategy Example

Here’s one common mapping of Git branches to Terraform Cloud workspaces:

![The image illustrates a version control workflow for Terraform Cloud, showing branches like master, stage, and dev, with processes such as speculative plans and apply steps. It includes workspaces for different environments and a logo for Terraform Cloud.](/images/HashiCorp-Terraform-Cloud-Terraform-Cloud-Workflows-terraform-cloud-version-control-workflow.jpg)

| Git Branch  | Workspace   |
| ----------- | ----------- |
| dev         | Development |
| stage       | Staging     |
| main/master | Production  |

> [!important]
> **Warning**
>
> Choose branch names and workspace mappings that align with your team’s release process to avoid accidental applies in production.

---

## 3\. API Workflow

The **API Workflow** is the most flexible. It’s perfect for teams embedding Terraform in CI/CD pipelines, internal dashboards, or custom tools. You create runs via Terraform Cloud’s REST API, giving you full programmatic control.

![The image illustrates an API workflow involving a build and release process, an API call to HashiCorp Terraform Cloud using an API token, and the management of cloud resources through workspaces.](/images/HashiCorp-Terraform-Cloud-Terraform-Cloud-Workflows-api-workflow-build-release-terraform.jpg)

With the API workflow you will:

1.  Package Terraform configurations (as a ZIP or VCS module).
2.  Authenticate with an API token.
3.  Call Terraform Cloud’s Runs API to create and monitor plans/applies.
4.  Implement custom logic for error handling and approvals.

Use official client libraries (Go, Python, Ruby, .NET) or direct HTTP requests to integrate tightly with your existing toolchain.

> [!important]
> **Note**
>
> Review the [Terraform Cloud API documentation](https://www.terraform.io/docs/cloud/api/index.html) for endpoint details and rate limits.

---

## Summary

Terraform Cloud provides three workflows to suit your team’s collaboration style:

| Workflow Type            | Description                                |
| ------------------------ | ------------------------------------------ |
| CLI Workflow             | Familiar local commands with remote state. |
| Version Control Workflow | GitOps-driven automation on commits/PRs.   |
| API Workflow             | Full programmatic control via REST API.    |

Each workspace in Terraform Cloud can be configured for one of these workflows—and you can switch workflows as your processes evolve.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-terraform-cloud/module/8dc830bd-1e70-4a76-bc45-b417ff7c1771/lesson/3a72a59c-44c6-41e6-8194-2d10e3643178)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/hashicorp-terraform-cloud/module/8dc830bd-1e70-4a76-bc45-b417ff7c1771/lesson/bd18884a-31cc-4311-be75-34742f717f38)**
>
> Practice lab
