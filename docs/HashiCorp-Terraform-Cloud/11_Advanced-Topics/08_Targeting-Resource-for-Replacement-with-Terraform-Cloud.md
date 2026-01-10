# Targeting Resource for Replacement with Terraform Cloud - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Terraform-Cloud/Advanced-Topics/Targeting-Resource-for-Replacement-with-Terraform-Cloud)

---

## Table of Contents

- Targeting Resource for Replacement with Terraform Cloud
  - Overview of the Terraform Cloud Workspace
  - Configuring Terraform CLI for Terraform Cloud
  - Local Apply Is Blocked for VCS-Connected Workspaces
  - Using -replace to Recreate Specific Resources
  - Injecting CLI Arguments via Environment Variables
  - Triggering the Terraform Cloud Run
  - Conclusion
  - References
  - Watch Video
  - Practice Lab

---

## Content

HashiCorp : Terraform Cloud

Advanced Topics

# Targeting Resource for Replacement with Terraform Cloud

In this guide, you'll learn how to replace a single resource in a Terraform Cloud workspace—connected to a Version Control System (VCS)—without touching your code or Git history. We demonstrate how to inject the `-replace` flag into Terraform Cloud runs by using workspace environment variables.

---

## Overview of the Terraform Cloud Workspace

You have multiple workspaces—**DevOps**, **AWS MyApp Dev**, **Prod**, and **Staging**—all linked to their respective Git branches. The screenshot below shows the Terraform Cloud dashboard with workspace names, run statuses, linked repositories, and last update times.

![The image shows a Terraform Cloud dashboard displaying a list of workspaces with their names, run statuses, repositories, and the latest change timestamps. The sidebar includes options for managing workspaces, registry, and settings.](https://kodekloud.com/kk-media/image/upload/v1752878714/notes-assets/images/HashiCorp-Terraform-Cloud-Targeting-Resource-for-Replacement-with-Terraform-Cloud/terraform-cloud-dashboard-workspaces-list.jpg)

---

## Configuring Terraform CLI for Terraform Cloud

Even with a VCS-connected workspace, you can run `terraform init` and `terraform plan` locally by pointing your CLI to Terraform Cloud:

```
terraform {
  cloud {
    organization = "Mastering-Terraform-Cloud"
    workspaces {
      name = "devops-aws-myapp-dev"
    }
  }
}
```

After cloning the `clumsy_bird` repo and checking out the `development` branch (tied to the MyApp Dev workspace), initialize and plan:

```
$ terraform init
$ terraform plan
# No changes. Your infrastructure matches the configuration.
```

> [!important]
> **Note**
>
> Local `plan` and `init` commands work because Terraform Cloud is acting as your remote backend.

---

## Local Apply Is Blocked for VCS-Connected Workspaces

Attempting `terraform apply` on a VCS-connected workspace will result in an error:

```
$ terraform apply
Error: Apply not allowed for workspaces with a VCS connection


A workspace that is connected to a VCS requires the VCS-driven workflow to ensure that the VCS remains the single source of truth.
```

> [!important]
> **Warning**
>
> Terraform Cloud disallows local `apply` on VCS workspaces. All changes must flow through your Git repository.

---

## Using `-replace` to Recreate Specific Resources

Terraform’s `-replace` flag lets you target explicit resources for recreation:

```
$ terraform apply -replace=aws_instance.clumsy_bird
```

You can confirm the resource exists in state:

```
$ terraform state list
aws_instance.clumsy_bird
aws_eip.clumsy_bird
...
module.vpc.aws_vpc.this[0]
```

Since local `apply` is blocked, we’ll inject these flags into Terraform Cloud runs.

---

## Injecting CLI Arguments via Environment Variables

Terraform Cloud lets you define environment variables for each run phase. We’ll configure `TF_CLI_ARGS_plan` and `TF_CLI_ARGS_apply` to include `-replace`.

1.  In the Terraform Cloud UI, open the **MyApp Dev** workspace.
2.  Navigate to **Variables** → **Environment Variables**.
3.  Add the following entries:

| Variable Name              | Value                                                          | Purpose                                        |
| -------------------------- | -------------------------------------------------------------- | ---------------------------------------------- |
| TF\\\_CLI\\\_ARGS\\\_plan  | `-replace=aws_instance.clumsy_bird -input=false`               | Automatically replace the instance during plan |
| TF\\\_CLI\\\_ARGS\\\_apply | `-replace=aws_instance.clumsy_bird -auto-approve -input=false` | Bypass approval and replace on apply           |

![The image shows a Terraform Cloud interface where a user is setting environment variables, including AWS keys and a CLI argument for replacing an AWS instance.](https://kodekloud.com/kk-media/image/upload/v1752878715/notes-assets/images/HashiCorp-Terraform-Cloud-Targeting-Resource-for-Replacement-with-Terraform-Cloud/terraform-cloud-environment-variables-aws.jpg)

After saving, your workspace’s environment variables list should appear similar to this:

![The image shows a Terraform Cloud interface displaying workspace variables, including sensitive and environment variables, with options to add more variables.](https://kodekloud.com/kk-media/image/upload/v1752878716/notes-assets/images/HashiCorp-Terraform-Cloud-Targeting-Resource-for-Replacement-with-Terraform-Cloud/terraform-cloud-workspace-variables-interface.jpg)

---

## Triggering the Terraform Cloud Run

Now, start a new run from the Terraform Cloud UI. During **Plan** and **Apply**, Terraform Cloud automatically applies your `-replace` flags:

![The image shows a Terraform Cloud interface displaying the details of a recent run, including resources and outputs, with a list of AWS resources such as subnets and instances.](https://kodekloud.com/kk-media/image/upload/v1752878717/notes-assets/images/HashiCorp-Terraform-Cloud-Targeting-Resource-for-Replacement-with-Terraform-Cloud/terraform-cloud-run-aws-resources.jpg)

You’ll see the plan mark two resources for destruction and recreation, plus one change. After Apply completes, the targeted instance and its related resources have been replaced—**with no Git commits**.

![The image shows a Terraform Cloud interface where a run has been triggered to replace the "Clumsy Bird Application." It indicates that the plan and apply processes have finished, resulting in 2 resources created, 1 changed, and 2 destroyed.](https://kodekloud.com/kk-media/image/upload/v1752878718/notes-assets/images/HashiCorp-Terraform-Cloud-Targeting-Resource-for-Replacement-with-Terraform-Cloud/terraform-cloud-run-trigger-replace.jpg)

---

## Conclusion

By using `TF_CLI_ARGS_plan` and `TF_CLI_ARGS_apply` environment variables in Terraform Cloud, you can inject CLI flags (such as `-replace`) into runs on VCS-connected workspaces. This method lets you force resource replacement without altering your Terraform configuration or committing changes to Git.

---

## References

- [Terraform Cloud Get Started](https://www.terraform.io/cloud/get-started)
- [Terraform CLI Options](https://www.terraform.io/docs/cli/commands/apply.html)
- [Terraform Cloud Variables](https://www.terraform.io/cloud-docs/workspaces/variables)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-terraform-cloud/module/f7d08e72-e35f-436f-8d42-d0d7364d2532/lesson/25ccf5ca-9a0e-4860-9e6e-d125e84d0bf1)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/hashicorp-terraform-cloud/module/f7d08e72-e35f-436f-8d42-d0d7364d2532/lesson/1625a4c9-e5b6-45bd-b7bb-80aa67fa4990)**
>
> Practice lab
