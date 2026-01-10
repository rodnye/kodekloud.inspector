# Lab Solution Terraform Cloud Variables - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Terraform-Cloud/Securing-Variables-with-Terraform-Cloud/Lab-Solution-Terraform-Cloud-Variables)

---

## Table of Contents

- Lab Solution Terraform Cloud Variables
  - Table of Contents
  - Workspace-Level Variables
  - Organizational Variable Sets
  - Terraform CLI & Cloud Integration
  - Variable Precedence & Overrides
  - Conclusion
  - References
  - Watch Video
    - Creating an Org Variable Set
    - Overriding at the Workspace UI
    - Overriding via CLI at Runtime

---

## Content

HashiCorp : Terraform Cloud

Securing Variables with Terraform Cloud

# Lab Solution Terraform Cloud Variables

In this lab, we’ll explore how to manage AWS credentials in Terraform Cloud using both workspace-level variables and centralized organizational variable sets. You’ll learn how to securely store sensitive data, inherit variables across workspaces, and override defaults when needed.

## Table of Contents

1.  [Workspace-Level Variables](#workspace-level-variables)
2.  [Organizational Variable Sets](#organizational-variable-sets)
3.  [Terraform CLI & Cloud Integration](#terraform-cli--cloud-integration)
4.  [Variable Precedence & Overrides](#variable-precedence--overrides)
5.  [Conclusion](#conclusion)
6.  [References](#references)

---

## Workspace-Level Variables

Workspace-level variables apply only to the workspace where they’re defined. This is ideal for settings that differ per environment.

1.  Sign in to Terraform Cloud and select your workspace (e.g., `devopsawsmyapp-dev`) under the **Mastering Terraform Cloud** organization.
2.  Navigate to **Settings → Variables**.
3.  Add environment variables for your AWS credentials:
    - `AWS_ACCESS_KEY_ID` (mark as sensitive)
    - `AWS_SECRET_ACCESS_KEY` (mark as sensitive)

![The image shows a Terraform Cloud interface displaying workspace variables, including sensitive AWS access keys, with options to add more variables.](https://kodekloud.com/kk-media/image/upload/v1752878789/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Terraform-Cloud-Variables/terraform-cloud-workspace-variables-aws.jpg)

> [!important]
> **Warning**
>
> Always mark AWS credentials as **sensitive** to prevent them from appearing in logs or the UI.

---

## Organizational Variable Sets

Organizational variable sets let you define a common set of variables once and apply them to multiple workspaces.

| Scope                   | Inheritance                | Override Behavior              |
| ----------------------- | -------------------------- | ------------------------------ |
| Workspace-level         | Only that workspace        | Highest precedence             |
| Organizational variable | Selected or all workspaces | Can be overridden at workspace |

### Creating an Org Variable Set

1.  Go to **Organization Settings → Variable Sets**.
2.  Click **Create variable set**, then enter:
    - **Name**: `AWS-Credentials`
    - **Description**: `Shared AWS keys for all dev & prod workspaces`
3.  Under **Workspaces**, choose **All workspaces** or pick specific ones.
4.  Add the following environment variables:
    - `AWS_ACCESS_KEY_ID`
    - `AWS_SECRET_ACCESS_KEY` (mark as sensitive)
5.  Save the set.

All selected workspaces now inherit these AWS credentials automatically.

---

## Terraform CLI & Cloud Integration

To run Terraform commands against Terraform Cloud, authenticate your CLI and initialize the workspace:

```
# Authenticate with Terraform Cloud
terraform login


# Initialize the workspace configuration
terraform init
```

After initialization, your local CLI sessions will execute Terraform runs in the Cloud backend.

![The image shows a split screen with a terminal window on the left displaying Terraform commands and a web interface on the right showing Terraform Cloud workspace variables, including sensitive AWS keys.](https://kodekloud.com/kk-media/image/upload/v1752878791/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Terraform-Cloud-Variables/terraform-commands-cloud-workspace-variables.jpg)

---

## Variable Precedence & Overrides

By default, workspace-level variables override those from organizational sets.

> [!important]
> **Note**
>
> Order of precedence (highest → lowest):
>
> 1.  CLI `-var` flags
> 2.  Workspace-level variables
> 3.  Organizational variable sets
> 4.  Terraform defaults

### Overriding at the Workspace UI

1.  Open **Settings → Variables** in your workspace.
2.  Add `prefix` as an environment variable:
    - **Key**: `prefix`
    - **Value**: `dev-app`
3.  Save changes.

### Overriding via CLI at Runtime

```
terraform plan -var="prefix=dev-app"
```

Example output:

```
Plan: 23 to add, 0 to change, 0 to destroy.


Changes to Outputs:
  ~ clumsy-bird-ip  = "http://54.235.109.203:8001" -> (known after apply)
  ~ clumsy-bird-url = "http://ec2-54-235-109-203.compute-1.amazonaws.com:8001" -> (known after apply)
```

---

## Conclusion

You have now:

- Configured AWS credentials at the workspace level.
- Created and applied an organizational variable set.
- Connected your local CLI to Terraform Cloud.
- Explored variable precedence and override methods.

This setup balances security (by marking secrets sensitive) and flexibility (via overrides), ensuring consistent credential management across environments.

---

## References

- [Terraform Cloud Variables](https://www.terraform.io/cloud-docs/workspaces/variables)
- [Terraform CLI Documentation](https://www.terraform.io/cli)
- [AWS Provider Configuration](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-terraform-cloud/module/253ba638-af3c-4403-a517-a7f6f7c7594c/lesson/a6c1aa87-edd4-4a5a-ac63-63b95b48b2e5)**
>
> Watch video content
