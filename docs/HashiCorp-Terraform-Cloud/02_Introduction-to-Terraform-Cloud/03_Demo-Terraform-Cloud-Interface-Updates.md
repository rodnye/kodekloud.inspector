# Demo Terraform Cloud Interface Updates - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Terraform-Cloud/Introduction-to-Terraform-Cloud/Demo-Terraform-Cloud-Interface-Updates)

---

## Table of Contents

- Demo Terraform Cloud Interface Updates
  - Signing In and Organization Selection
  - Legacy Interface: Workspace Dashboard
  - Exploring the New Navigation
  - Workspace Settings
  - Switching Between Interfaces
  - Links and References
  - Watch Video
    - Workspace Features at a Glance

---

## Content

HashiCorp : Terraform Cloud

Introduction to Terraform Cloud

# Demo Terraform Cloud Interface Updates

Terraform Cloud is a fully managed service by HashiCorp, designed to streamline infrastructure as code workflows. In this guide, we’ll walk through the latest user interface enhancements, compare the new HashiCorp Cloud Platform navigation with the legacy layout, and highlight key workspace features.

## Signing In and Organization Selection

When you log in to Terraform Cloud with two-factor authentication enabled, a new dark sidebar replaces the previous purple navigation bar. This sidebar lists all organizations you belong to and provides context-switching tips:

![The image shows a Terraform Cloud interface where a user can choose from a list of organizations to access, with options like "Enterprise-Cloud" and "Enterprise-DataCenter." On the left, there is a welcome message explaining what organizations are and how to change them.](https://kodekloud.com/kk-media/image/upload/v1752878719/notes-assets/images/HashiCorp-Terraform-Cloud-Demo-Terraform-Cloud-Interface-Updates/terraform-cloud-organizations-interface.jpg)

> [!important]
> **Note**
>
> If you prefer the classic look, click **Change to legacy navigation** at the bottom of the sidebar to restore the purple bar.

## Legacy Interface: Workspace Dashboard

With the legacy layout active, your dashboard presents a straightforward list of workspaces alongside their most recent run statuses. This view is ideal if you prefer minimal navigation elements and quick visibility into run results:

![The image shows a Terraform Cloud dashboard displaying two workspaces with their run statuses, both marked as successful.](https://kodekloud.com/kk-media/image/upload/v1752878720/notes-assets/images/HashiCorp-Terraform-Cloud-Demo-Terraform-Cloud-Interface-Updates/terraform-cloud-dashboard-workspaces-successful.jpg)

## Exploring the New Navigation

To switch back to the updated HashiCorp Cloud Platform interface, enable **HashiCorp Cloud Platform navigation** in your user settings. The new sidebar (bottom-left) lets you:

- Switch between organizations
- Access organization settings, including the Private Module Registry
- Quickly jump to global notifications and account settings

Within an organization, select **Workspaces** to open the workspace overview. The classic tabs—**Runs**, **State**, **Variables**, and **Settings**—now appear in the left-hand pane:

![The image shows a Terraform Cloud workspace overview for "devops-aws-myapp-dev," displaying details of the latest run, which was a destroy operation triggered via CLI. It includes metrics, resource changes, and settings options.](https://kodekloud.com/kk-media/image/upload/v1752878721/notes-assets/images/HashiCorp-Terraform-Cloud-Demo-Terraform-Cloud-Interface-Updates/terraform-cloud-workspace-devops-aws.jpg)

### Workspace Features at a Glance

| Feature       | Description                                                 |
| ------------- | ----------------------------------------------------------- |
| Run History   | Browse all plan, apply, and destroy runs                    |
| Current State | Inspect the latest Terraform state file                     |
| Variables     | Manage input and environment variables                      |
| Settings      | Configure execution mode, notifications, and workspace tags |

## Workspace Settings

Under **Settings** for a specific workspace (shown below for “devops-aws-myapp-dev”), you can:

- Choose execution mode (remote vs. local)
- Add or edit workspace descriptions
- Configure run triggers and notifications

![The image shows the general settings page of a Terraform Cloud workspace named "devops-aws-myapp-dev," with options for execution mode and a description for an AWS development application.](https://kodekloud.com/kk-media/image/upload/v1752878722/notes-assets/images/HashiCorp-Terraform-Cloud-Demo-Terraform-Cloud-Interface-Updates/terraform-cloud-workspace-settings-devops.jpg)

## Switching Between Interfaces

Terraform Cloud’s UI continues to evolve. Being comfortable with both the new HashiCorp Cloud Platform interface and the legacy navigation ensures you can navigate efficiently, regardless of future updates.

> [!important]
> **Warning**
>
> Toggle the navigation layout only if you understand the impact on your daily workflow. Some features may appear in different locations.

---

## Links and References

- [Terraform Cloud Documentation](https://www.terraform.io/cloud-docs)
- [HashiCorp Cloud Platform](https://cloud.hashicorp.com)
- [Terraform Workspaces](https://www.terraform.io/cloud-docs/workspaces)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-terraform-cloud/module/5be30c4d-ad7e-4fe6-9285-fa36ed0ac151/lesson/eaee357d-9ec8-459a-9468-b163182f2cd8)**
>
> Watch video content
