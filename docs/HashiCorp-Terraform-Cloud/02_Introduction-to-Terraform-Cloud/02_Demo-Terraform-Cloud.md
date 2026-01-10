# Demo Terraform Cloud - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Terraform-Cloud/Introduction-to-Terraform-Cloud/Demo-Terraform-Cloud)

---

## Table of Contents

- Demo Terraform Cloud
  - 1. Logging In & Selecting an Organization
  - 2. Plan & Billing Overview
  - 3. Workspace Dashboard
  - 4. Managing Variables & Secrets
  - 5. Execution Modes: Manual & Remote
  - 6. Configuring Workspace Settings
  - 7. Setting Up Notifications
  - 8. Version Control Integration
  - 9. Workflow Options
  - 10. Reviewing GitHub-Triggered Runs
  - 11. Teams, Users & VCS Providers
  - 12. Exploring the Private Module Registry
  - 13. Monitoring Workspace Health
  - Links and References
  - Watch Video
    - Overview of Runs & Resources

---

## Content

HashiCorp : Terraform Cloud

Introduction to Terraform Cloud

# Demo Terraform Cloud

This guide provides a quick walkthrough of Terraform Cloud’s core features, including organization setup, workspace management, VCS integration, and the Private Module Registry. By the end, you’ll understand how to log in, configure settings, and use Terraform Cloud for collaboration and automation.

## 1\. Logging In & Selecting an Organization

1.  Navigate to the Terraform Cloud login page and sign in with your credentials.
2.  From the dashboard, select the desired organization (e.g., **Enterprise Cloud**).
3.  You’ll now see a list of workspaces, each showing its run status, linked repository, and the timestamp of the latest change.

![The image shows a dashboard interface listing various workspaces with their run statuses, repository names, and the latest change timestamps. The statuses include "Applied," "Planned and finished," and "Errored."](https://kodekloud.com/kk-media/image/upload/v1752878723/notes-assets/images/HashiCorp-Terraform-Cloud-Demo-Terraform-Cloud/dashboard-workspaces-run-statuses-timestamps.jpg)

## 2\. Plan & Billing Overview

Under **Organization Settings > Plan & Billing**, you can review and upgrade your subscription.

![The image shows a "Plan & Billing" page from the HashiCorp Cloud Platform, indicating a free plan with one active user and no invoices yet.](https://kodekloud.com/kk-media/image/upload/v1752878724/notes-assets/images/HashiCorp-Terraform-Cloud-Demo-Terraform-Cloud/hashicorp-cloud-plan-billing-free-user.jpg)

| Plan              | Users     | Workspaces | Remote State | VCS Integration | Private Module Registry |
| ----------------- | --------- | ---------- | ------------ | --------------- | ----------------------- |
| Free              | Up to 5   | Unlimited  | ✓            | ✓               | ✓                       |
| Team              | Up to 10  | Unlimited  | ✓            | ✓               | ✓                       |
| Team & Governance | Unlimited | Unlimited  | ✓            | ✓               | ✓                       |

![The image shows a pricing plan page for a cloud platform, detailing different subscription options: Free, Team, and Team & Governance, with their respective features and costs. The current plan is marked as "Free."](https://kodekloud.com/kk-media/image/upload/v1752878726/notes-assets/images/HashiCorp-Terraform-Cloud-Demo-Terraform-Cloud/cloud-platform-pricing-plan-subscriptions.jpg)

## 3\. Workspace Dashboard

### Overview of Runs & Resources

Select a workspace (e.g., `devops-aws-myapp-dev`) to see details of recent runs, resource changes, and performance metrics.

![The image shows a Terraform Cloud workspace overview for "devops-aws-myapp-dev," displaying details of the latest run, including a destroy action triggered via the UI, with metrics and resource information.](https://kodekloud.com/kk-media/image/upload/v1752878727/notes-assets/images/HashiCorp-Terraform-Cloud-Demo-Terraform-Cloud/terraform-cloud-workspace-devops-aws.jpg)

A chronological log of all plan and apply events shows branch names, trigger methods, and statuses at a glance.

![The image shows a dashboard interface for managing application deployments, displaying a list of runs with their statuses and details such as branch and trigger method.](https://kodekloud.com/kk-media/image/upload/v1752878728/notes-assets/images/HashiCorp-Terraform-Cloud-Demo-Terraform-Cloud/dashboard-interface-application-deployments.jpg)

Terraform Cloud securely stores and versions your state file. Here’s an example of a raw state export:

```
{
  "version": 4,
  "terraform_version": "1.0.7",
  "serial": 8,
  "lineage": "06f59866-a545-55ba-439a-41e55ed551ba",
  "outputs": {
    "clumsy-bird-ip": {
      "value": "http://52.71.182.141",
      "type": "string"
    },
    "clumsy-bird-url": {
      "value": "http://ec2-52-71-182-141.compute-1.amazonaws.com",
      "type": "string"
    }
  }
}
```

## 4\. Managing Variables & Secrets

At the workspace level, define Terraform variables and reference organization-level variable sets for sensitive data (e.g., AWS credentials). This ensures secrets never appear in your configuration files.

![The image shows a web interface displaying AWS credentials with variable sets, including an access key ID and a sensitive secret access key.](https://kodekloud.com/kk-media/image/upload/v1752878729/notes-assets/images/HashiCorp-Terraform-Cloud-Demo-Terraform-Cloud/aws-credentials-web-interface-access-key.jpg)

> [!important]
> **Note**
>
> Use organization-level variable sets to centralize credential management and avoid committing secrets to VCS.

## 5\. Execution Modes: Manual & Remote

You can lock a workspace during maintenance to prevent changes. Unlock it to run **Plan & Apply** or **Plan Only** directly in Terraform Cloud’s UI.

## 6\. Configuring Workspace Settings

Under **General Settings**, adjust the workspace ID, name, description, execution mode (remote or local), apply method (auto or manual), and Terraform version.

![The image shows a "General Settings" page for a Terraform Cloud workspace, including fields for ID, name, description, execution mode, and apply method.](https://kodekloud.com/kk-media/image/upload/v1752878729/notes-assets/images/HashiCorp-Terraform-Cloud-Demo-Terraform-Cloud/terraform-cloud-workspace-settings-page.jpg)

## 7\. Setting Up Notifications

Create alerts for run events—such as plan completion or apply failures—via Webhook, Email, Slack, Microsoft Teams, or custom channels.

![The image shows a "Create a Notification" interface with options to send messages via Webhook, Email, Slack, or Microsoft Teams. It includes fields for entering a name, webhook URL, and token.](https://kodekloud.com/kk-media/image/upload/v1752878730/notes-assets/images/HashiCorp-Terraform-Cloud-Demo-Terraform-Cloud/create-notification-interface-webhook-email-slack.jpg)

## 8\. Version Control Integration

Connect workspaces to GitHub, GitLab, Bitbucket, or Azure DevOps. Commits, pull requests, and merges can automatically trigger plans (and applies, if enabled).

![The image shows a settings page for a Terraform workspace connected to a GitHub repository named "clumsy_bird." It includes version control and workspace settings, with options for changing the source and applying methods.](https://kodekloud.com/kk-media/image/upload/v1752878731/notes-assets/images/HashiCorp-Terraform-Cloud-Demo-Terraform-Cloud/terraform-workspace-settings-github-clumsy-bird.jpg)

## 9\. Workflow Options

Terraform Cloud supports multiple workflows:

| Workflow   | Trigger Method                        |
| ---------- | ------------------------------------- |
| VCS-driven | Commits, PR merges                    |
| CLI-driven | `terraform login` + `terraform push`  |
| API-driven | Direct API calls for runs and applies |

![The image shows a webpage interface for choosing a Terraform workflow, with options for version control, CLI-driven, and API-driven workflows. It includes navigation steps and links for more information.](https://kodekloud.com/kk-media/image/upload/v1752878732/notes-assets/images/HashiCorp-Terraform-Cloud-Demo-Terraform-Cloud/terraform-workflow-selection-interface.jpg)

## 10\. Reviewing GitHub-Triggered Runs

Click on a Git commit in Terraform Cloud to see what changed. For example, an HCL module definition might look like this:

```
module "security-group-http" {
  source      = "app.terraform.io/Enterprise-Cloud/security-group/aws//modules/http-80"
  version     = "4.8.0"
  name        = "http-traffic-${var.environment}"
  description = "Security group for ${var.environment} with HTTP ports open within VPC"
}
```

Back in the workspace, you’ll find run metrics, tags, and access controls for contributors.

![The image shows a Terraform Cloud workspace interface for "devops-aws-myapp-dev," displaying details of the latest run, which was a destroy action triggered via the UI. It includes metrics, resource changes, and a README section for the "clumsy_bird" application.](https://kodekloud.com/kk-media/image/upload/v1752878733/notes-assets/images/HashiCorp-Terraform-Cloud-Demo-Terraform-Cloud/terraform-cloud-workspace-devops-aws-2.jpg)

## 11\. Teams, Users & VCS Providers

Invite users or teams, assign roles, and add version control providers under **Organization Settings > VCS Providers**.

![The image shows a user interface for adding a Version Control System (VCS) provider in Terraform Cloud, with options to connect to GitHub, GitLab, Bitbucket, or Azure DevOps. The interface includes a sidebar with organization settings and security options.](https://kodekloud.com/kk-media/image/upload/v1752878735/notes-assets/images/HashiCorp-Terraform-Cloud-Demo-Terraform-Cloud/terraform-cloud-vcs-provider-interface.jpg)

## 12\. Exploring the Private Module Registry

Terraform Cloud’s Private Module Registry lets your team browse, version, and share modules securely within your organization.

![The image shows a dashboard from the HashiCorp Cloud Platform, listing various workspaces with their run statuses, repository links, and the latest change timestamps. Most workspaces have a status of "Applied" or "Planned and finished," with one showing "Errored."](https://kodekloud.com/kk-media/image/upload/v1752878736/notes-assets/images/HashiCorp-Terraform-Cloud-Demo-Terraform-Cloud/hashicorp-cloud-platform-dashboard-workspaces.jpg)

Use a private module in your configuration:

```
module "vpc" {
  source  = "app.terraform.io/EnterpriseCloud/vpc"
  version = "2.34.0"
  # insert required variables here
}


credentials "app.terraform.io" {
  # valid user API token
  token = "xxxxxx.atlasv1.zzzzzzzzzzzzz"
}
```

Browse and filter modules by provider and registry to find exactly what you need.

![The image shows a list of Terraform modules with details such as their type (public or private), provider (AWS), version, and download count. There are filters on the left for providers and registries.](https://kodekloud.com/kk-media/image/upload/v1752878737/notes-assets/images/HashiCorp-Terraform-Cloud-Demo-Terraform-Cloud/terraform-modules-list-aws-details.jpg)

## 13\. Monitoring Workspace Health

Keep track of workspaces that need attention, currently running environments, or those with failed runs. Use filters to quickly locate specific environments like “dev.”

![The image shows a HashiCorp Cloud Platform workspace interface with a workspace named "server-build-dev" that needs attention, with a run status of "Planned."](https://kodekloud.com/kk-media/image/upload/v1752878738/notes-assets/images/HashiCorp-Terraform-Cloud-Demo-Terraform-Cloud/hashicorp-cloud-platform-server-build-dev.jpg)

![The image shows a dashboard from the HashiCorp Cloud Platform, displaying a list of workspaces with their run statuses marked as "Errored." Each workspace entry includes the name, associated repository, and the time since the last change.](https://kodekloud.com/kk-media/image/upload/v1752878739/notes-assets/images/HashiCorp-Terraform-Cloud-Demo-Terraform-Cloud/hashicorp-cloud-platform-workspaces-errored.jpg)

![The image shows a dashboard from a cloud platform with a list of workspaces, their run statuses, associated repositories, and the latest change timestamps. Some workspaces have statuses like "Applied" or "Planned and finished," while one shows "Errored."](https://kodekloud.com/kk-media/image/upload/v1752878740/notes-assets/images/HashiCorp-Terraform-Cloud-Demo-Terraform-Cloud/cloud-platform-dashboard-workspaces-statuses.jpg)

---

## Links and References

- [Terraform Cloud Documentation](https://www.terraform.io/docs/cloud/)
- [Private Module Registry Guide](https://www.terraform.io/docs/cloud/modules/registry.html)
- [Terraform CLI Commands](https://www.terraform.io/docs/cli/index.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-terraform-cloud/module/5be30c4d-ad7e-4fe6-9285-fa36ed0ac151/lesson/b5e6b570-f2f1-4f08-b75f-6532fa394045)**
>
> Watch video content
