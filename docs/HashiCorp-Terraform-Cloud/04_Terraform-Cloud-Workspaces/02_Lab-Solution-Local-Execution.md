# Lab Solution Local Execution - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Terraform-Cloud/Terraform-Cloud-Workspaces/Lab-Solution-Local-Execution)

---

## Table of Contents

- Lab Solution Local Execution
  - Table of Contents
  - 1. Authenticate the CLI with Terraform Cloud
  - 2. Configure AWS Credentials
  - 3. Create a Terraform Cloud Workspace
  - 4. Match Versions & Set Execution Mode
  - 5. Initialize, Plan, and Apply
  - 6. Verify in Terraform Cloud
  - 7. Tear Down Infrastructure
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

HashiCorp : Terraform Cloud

Terraform Cloud Workspaces

# Lab Solution Local Execution

In this guide, we’ll walk through configuring and running Terraform Cloud Workspaces using **local execution mode**. Follow each step to authenticate, set up AWS credentials, create your workspace, and manage your infrastructure—all from your local machine.

![The image shows a KodeKloud lab interface for "Terraform Cloud Workspace - Local Execution," with instructions and shortcuts for using VS Code on the left and a file explorer with a README.md file open on the right.](https://kodekloud.com/kk-media/image/upload/v1752878929/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Local-Execution/kodekloud-terraform-cloud-workspace-lab.jpg)

## Table of Contents

1.  [Authenticate the CLI with Terraform Cloud](#1-authenticate-the-cli-with-terraform-cloud)
2.  [Configure AWS Credentials](#2-configure-aws-credentials)
3.  [Create a Terraform Cloud Workspace](#3-create-a-terraform-cloud-workspace)
4.  [Match Versions & Set Execution Mode](#4-match-versions--set-execution-mode)
5.  [Initialize, Plan, and Apply](#5-initialize-plan-and-apply)
6.  [Verify in Terraform Cloud](#6-verify-in-terraform-cloud)
7.  [Tear Down Infrastructure](#7-tear-down-infrastructure)

---

## 1\. Authenticate the CLI with Terraform Cloud

First, log in to Terraform Cloud from your terminal:

```
terraform login
```

Follow the on-screen prompts to generate a new API token.

![The image shows a web interface for creating an API token on Terraform Cloud, with a dialog box prompting for a description.](https://kodekloud.com/kk-media/image/upload/v1752878930/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Local-Execution/terraform-cloud-api-token-dialog.jpg)

When prompted, paste your API token into the terminal. Successful authentication will display your user ID and a confirmation message.

| Command           | Description                                      |
| ----------------- | ------------------------------------------------ |
| `terraform login` | Authenticate your local CLI with Terraform Cloud |

## 2\. Configure AWS Credentials

Export your AWS credentials as environment variables:

```
export AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY_ID
export AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_ACCESS_KEY
```

> [!important]
> **Warning**
>
> Never commit your AWS credentials or API tokens to version control. Use environment variables or a secrets manager.> [!important]
> **Note**
>
> These lab environments automatically tear down after one hour, so your temporary credentials remain safe.

| Environment Variable    | Purpose            |
| ----------------------- | ------------------ |
| `AWS_ACCESS_KEY_ID`     | AWS API access key |
| `AWS_SECRET_ACCESS_KEY` | AWS API secret key |

## 3\. Create a Terraform Cloud Workspace

In Terraform Cloud’s web UI:

1.  Select your organization.
2.  Click **New Workspace → CLI-driven workflow**.
3.  Enter:
    - **Name**: `devops-aws-myapp-dev`
    - **Description**: Development environment for MyApp on AWS.

![The image shows a web interface for creating a new workspace in Terraform Cloud, with fields for entering a workspace name and description. There are options to configure settings and buttons to create or cancel the workspace creation.](https://kodekloud.com/kk-media/image/upload/v1752878931/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Local-Execution/terraform-cloud-workspace-creation-interface.jpg)

Add the following backend configuration to `backend.tf` (or your chosen `.tf` file):

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

## 4\. Match Versions & Set Execution Mode

Ensure your local Terraform version matches the workspace setting:

```
terraform version
```

In Terraform Cloud’s UI, go to **Workspace → Settings → General**, then:

- Set **Terraform Version** to match your local client.
- Change **Execution Mode** to **Local**.
- Save your changes.

![The image shows the General Settings page of a Terraform Cloud workspace, with fields for ID, Name, Description, Execution Mode, and Remote State Sharing options.](https://kodekloud.com/kk-media/image/upload/v1752878933/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Local-Execution/terraform-cloud-workspace-settings-page.jpg)

## 5\. Initialize, Plan, and Apply

Initialize your local directory and review the execution plan:

```
terraform init
terraform plan
```

Expected plan output:

```
Plan: 23 to add, 0 to change, 0 to destroy.


Changes to Outputs:
  + clumsy-bird-ip  = (known after apply)
  + clumsy-bird-url = (known after apply)
```

Apply your configuration:

```
terraform apply -auto-approve
```

Sample apply summary:

```
Apply complete! Resources: 23 added, 0 changed, 0 destroyed.


Outputs:
  clumsy-bird-ip  = "http://18.214.74.214:8001"
  clumsy-bird-url = "http://ec2-18-214-74-214.compute-1.amazonaws.com:8001"
```

## 6\. Verify in Terraform Cloud

Navigate to **Workspace → Runs** and inspect the latest run. You’ll see resource details and outputs:

```
{
  "outputs": {
    "clumsy-bird-ip": {
      "value": "http://18.214.74.214:8001",
      "type": "string"
    },
    "clumsy-bird-url": {
      "value": "http://ec2-18-214-74-214.compute-1.amazonaws.com:8001",
      "type": "string"
    }
  },
  "resources": [
    {
      "mode": "data",
      "type": "aws_ami",
      "name": "ubuntu",
      "provider": "provider.terraform.io/hashicorp/aws"
    }
  ]
}
```

## 7\. Tear Down Infrastructure

When testing is complete, destroy all resources:

```
terraform destroy -auto-approve
```

Confirm the teardown:

```
Plan: 0 to add, 0 to change, 23 to destroy.
Do you really want to destroy all resources in workspace "devops-aws-myapp-dev"? ... yes ...
Apply complete! Resources: 0 added, 0 changed, 23 destroyed.
```

---

## Links and References

- [Terraform Cloud CLI-Driven Workflow](https://www.terraform.io/cloud/workspaces/cli-driven)
- [Terraform Documentation](https://www.terraform.io/docs)
- [AWS Credentials Configuration](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-terraform-cloud/module/69fc91b2-bf0f-4922-831c-2aee42d19b03/lesson/0a6ef325-dc19-4050-904b-ced34b6433ab)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/hashicorp-terraform-cloud/module/69fc91b2-bf0f-4922-831c-2aee42d19b03/lesson/64c307ef-f6e0-463f-8a40-352fd04b3bd4)**
>
> Practice lab
