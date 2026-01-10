# Lab Solution Automating Terraform Cloud - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Terraform-Cloud/Advanced-Topics/Lab-Solution-Automating-Terraform-Cloud)

---

## Table of Contents

- Lab Solution Automating Terraform Cloud
  - Prerequisites
  - 1. Initialize the Terraform Cloud Provider
  - 2. Query an Existing Workspace
  - 3. Create a New Workspace
  - 4. Manage Workspace Variables
  - 5. Specify Terraform Version per Workspace
  - 6. Dynamically Create Multiple Workspaces
  - 7. Assign Team Access to Workspaces
  - 8. Cleanup
  - Resource Overview
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

HashiCorp : Terraform Cloud

Advanced Topics

# Lab Solution Automating Terraform Cloud

Automate your Terraform Cloud workflows—workspaces, variables, team access, and more—by codifying everything you’d normally click through in the Terraform Cloud UI. In this lab, we’ll use the official [hashicorp/tfe](https://registry.terraform.io/providers/hashicorp/tfe/latest) provider to:

- Initialize the TFC provider
- Query and inspect existing workspaces
- Create new workspaces
- Manage workspace variables
- Specify Terraform versions
- Dynamically generate multiple workspaces
- Assign team permissions
- Clean up resources

---

## Prerequisites

1.  Terraform CLI v1.x installed
2.  A Terraform Cloud account
3.  A Terraform API token with appropriate permissions

> [!important]
> **Warning**
>
> Keep your `TFE_TOKEN` secure. **Do not** commit API tokens to version control.

Set your Terraform Cloud API token in the shell:

```
export TFE_TOKEN=YOUR_TERRAFORM_CLOUD_TOKEN
```

---

## 1\. Initialize the Terraform Cloud Provider

Create a directory named `workspace_automation` and inside it, add a `main.tf` file:

```
terraform {
  required_providers {
    tfe = {
      source  = "hashicorp/tfe"
      version = "~> 0.31"
    }
  }
}


provider "tfe" {
  token = var.tfe_token
}


variable "tfe_token" {
  type        = string
  description = "Terraform Cloud API token"
}


variable "organization" {
  type        = string
  description = "Terraform Cloud organization name"
}


variable "workspace_name" {
  type        = string
  description = "Existing workspace name to query"
}
```

Initialize the provider:

```
terraform init
```

---

## 2\. Query an Existing Workspace

Add a **data source** block to `main.tf` to fetch a workspace by name:

```
data "tfe_workspace" "existing" {
  name         = var.workspace_name
  organization = var.organization
}


output "workspace_id" {
  value = data.tfe_workspace.existing.id
}


output "workspace_terraform_version" {
  value = data.tfe_workspace.existing.terraform_version
}
```

Apply the configuration:

```
terraform apply \
  -var "organization=YOUR-ORG" \
  -var "workspace_name=devops-aws-myapp-dev"
```

Sample output:

```
data.tfe_workspace.existing: Reading...
data.tfe_workspace.existing: Read complete after 2s [id=ws-pj5yrEcvvrdxjYji]


Outputs:
  workspace_id                = "ws-pj5yrEcvvrdxjYji"
  workspace_terraform_version = "1.2.7"
```

Inspect the state:

```
terraform state list
terraform state show data.tfe_workspace.existing
```

---

## 3\. Create a New Workspace

Extend `main.tf` with a resource block to provision a workspace:

```
variable "workspace_name_new" {
  type        = string
  description = "Name of the new workspace to create"
}


resource "tfe_workspace" "new" {
  name         = var.workspace_name_new
  organization = var.organization
}


output "workspace_new_id" {
  value = tfe_workspace.new.id
}


output "workspace_new_terraform_version" {
  value = tfe_workspace.new.terraform_version
}
```

Format and apply:

```
terraform fmt
terraform apply \
  -var "organization=YOUR-ORG" \
  -var "workspace_name=devops-aws-myapp-dev" \
  -var "workspace_name_new=webserver-aws-stage"
```

Preview plan:

```
# tfe_workspace.new will be created
resource "tfe_workspace" "new" {
  name              = "webserver-aws-stage"
  organization      = "YOUR-ORG"
  terraform_version = (known after apply)
}
Plan: 1 to add, 0 to change, 0 to destroy.
```

After successful apply, verify the new workspace in Terraform Cloud.  
![The image shows a Terraform Cloud interface with a focus on the "Workspaces" section, displaying options to filter and sort workspaces, but no workspaces are currently listed.](https://kodekloud.com/kk-media/image/upload/v1752878677/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Automating-Terraform-Cloud/terraform-cloud-workspaces-interface-empty.jpg)

---

## 4\. Manage Workspace Variables

Use `tfe_variable` resources to define standard, sensitive, and HCL variables:

```
resource "tfe_variable" "standard" {
  key          = "variable_name"
  value        = "variable_value"
  category     = "terraform"
  workspace_id = tfe_workspace.new.id
  description  = "A standard variable"
}


resource "tfe_variable" "sensitive" {
  key          = "my_variable_sensitive"
  value        = "my_sensitive_value"
  category     = "terraform"
  workspace_id = tfe_workspace.new.id
  sensitive    = true
}


resource "tfe_variable" "hcl" {
  key          = "my_variable_hcl"
  value        = "[hcl_variable_value]"
  category     = "terraform"
  workspace_id = tfe_workspace.new.id
  description  = "An HCL variable example"
}
```

Apply the changes:

```
terraform apply \
  -var "organization=YOUR-ORG" \
  -var "workspace_name_new=webserver-aws-stage"
```

Confirm in the Terraform Cloud UI under **Variables** that all variables appear correctly.  
![The image shows a Terraform Cloud interface displaying the "Variables" section for a workspace named "webserver-aws-stage." It includes details about sensitive variables and workspace variables.](https://kodekloud.com/kk-media/image/upload/v1752878678/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Automating-Terraform-Cloud/terraform-cloud-variables-webserver-aws.jpg)

---

## 5\. Specify Terraform Version per Workspace

Control the Terraform version used by the workspace:

```
variable "tf_version" {
  type    = string
  default = "1.2.7"
}


resource "tfe_workspace" "new" {
  name              = var.workspace_name_new
  organization      = var.organization
  terraform_version = var.tf_version
}
```

Reapply:

```
terraform apply \
  -var "organization=YOUR-ORG" \
  -var "workspace_name_new=webserver-aws-stage"
```

Verify the Terraform version update in the workspace settings.

---

## 6\. Dynamically Create Multiple Workspaces

Define apps and environments, then loop to create all combinations:

```
variable "apps" {
  description = "Map of applications with Terraform versions"
  type        = map(object({ terraform_version = string }))
  default     = {
    appA = { terraform_version = "1.2.7" }
    appB = { terraform_version = "1.2.8" }
  }
}


variable "environments" {
  description = "List of environments"
  type        = list(string)
  default     = ["sandbox", "development", "production"]
}


locals {
  app_envs = flatten([
    for app_key, app in var.apps : [
      for env in var.environments : {
        name              = "${app_key}-${env}"
        terraform_version = app.terraform_version
      }
    ]
  ])
}


resource "tfe_workspace" "all" {
  for_each          = { for env in local.app_envs : env.name => env }
  name              = each.value.name
  organization      = var.organization
  terraform_version = each.value.terraform_version
}
```

Apply all at once:

```
terraform apply -var "organization=YOUR-ORG"
```

You’ll see six workspaces created (appA/appB × sandbox/development/production).

---

## 7\. Assign Team Access to Workspaces

Ensure your TFC plan supports Teams & Governance. Create a `teams.tf`:

```
data "tfe_team" "classmates" {
  name         = "classmates"
  organization = var.organization
}


data "tfe_workspace_ids" "all" {
  names        = ["*"]
  organization = var.organization
}


resource "tfe_team_access" "classmates_all" {
  for_each     = toset(data.tfe_workspace_ids.all.ids)
  access       = "read"
  team_id      = data.tfe_team.classmates.id
  workspace_id = each.value
}
```

Apply:

```
terraform apply -var "organization=YOUR-ORG"
```

Verify in the Terraform Cloud UI under **Organization → Teams → classmates** and in each workspace’s Team Access page.  
![The image shows a user interface for managing organization access settings, with options to manage policies, workspaces, and other administrative tasks. A success message indicates that a team named "classmates" has been created.](https://kodekloud.com/kk-media/image/upload/v1752878679/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Automating-Terraform-Cloud/organization-access-settings-ui-success.jpg)

Browse to any workspace’s Team Access settings to confirm the “classmates” team has **read** privileges.  
![The image shows a "Team Access" page from a web application, listing different teams and their access privileges, such as "default," "read," and "plan." The sidebar includes various workspace settings options.](https://kodekloud.com/kk-media/image/upload/v1752878681/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Automating-Terraform-Cloud/team-access-page-workspace-settings.jpg)

---

## 8\. Cleanup

When you’re done, destroy all created resources:

```
terraform destroy \
  -var "organization=YOUR-ORG" \
  -var "workspace_name=devops-aws-myapp-dev" \
  -var "workspace_name_new=webserver-aws-stage"
```

---

## Resource Overview

| Resource Type         | Description                                        | Terraform Block        |
| --------------------- | -------------------------------------------------- | ---------------------- |
| tfe\\\_workspace      | Manages Terraform Cloud workspaces                 | resource / data source |
| tfe\\\_variable       | Defines workspace-level variables (sensitive, HCL) | resource               |
| tfe\\\_team\\\_access | Grants teams specific access to workspaces         | resource               |

---

## Links and References

- Terraform Cloud Provider Documentation: https://registry.terraform.io/providers/hashicorp/tfe/latest
- Terraform Cloud UI Guide: https://www.terraform.io/cloud-docs
- Terraform CLI Docs: https://www.terraform.io/cli
- Terraform Cloud API: https://www.terraform.io/cloud-docs/api

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-terraform-cloud/module/f7d08e72-e35f-436f-8d42-d0d7364d2532/lesson/71408858-eb30-4c37-9dff-64ae9f8b27e1)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/hashicorp-terraform-cloud/module/f7d08e72-e35f-436f-8d42-d0d7364d2532/lesson/b66b19a5-b488-4a90-af69-91ebe54a7a9b)**
>
> Practice lab
