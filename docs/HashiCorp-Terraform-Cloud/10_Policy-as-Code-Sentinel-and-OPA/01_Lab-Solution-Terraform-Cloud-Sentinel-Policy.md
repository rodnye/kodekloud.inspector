# Lab Solution Terraform Cloud Sentinel Policy - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Terraform-Cloud/Policy-as-Code-Sentinel-and-OPA/Lab-Solution-Terraform-Cloud-Sentinel-Policy)

---

## Table of Contents

- Lab Solution Terraform Cloud Sentinel Policy
  - Prerequisites: Teams & Governance Tier
  - Fork the Sentinel Policy Repository
  - Review Sentinel Policies
  - Define a Policy Set
  - Connect the Policy Set to Terraform Cloud
  - Test Policy Enforcement in the UI
  - Test Policy Enforcement via CLI
  - Remediate and Re-Run
  - Additional Resources
  - Watch Video
  - Practice Lab
    - 1. Enforce Mandatory Tags
    - 2. Restrict EC2 Instance Types

---

## Content

HashiCorp : Terraform Cloud

Policy as Code Sentinel and OPA

# Lab Solution Terraform Cloud Sentinel Policy

In this lab, we’ll implement **Policy as Code** in Terraform Cloud with **Sentinel**. Sentinel enforces organizational policies between the `terraform plan` and `terraform apply` stages, ensuring your infrastructure remains compliant before changes are applied.

![The image shows a KodeKloud lab interface for Terraform Cloud Sentinel Policy, featuring a diagram explaining how Sentinel works with Terraform Cloud and a Visual Studio Code editor with instructions for opening a terminal.](https://kodekloud.com/kk-media/image/upload/v1752878768/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Terraform-Cloud-Sentinel-Policy/kodekloud-terraform-cloud-sentinel-diagram.jpg)

## Prerequisites: Teams & Governance Tier

Sentinel policies require the **Teams & Governance** tier in Terraform Cloud. In **Settings → Plan & Billing**, activate your free trial or subscription for this tier to unlock Policy as Code, cost estimation, and run tasks.

> [!important]
> **Note**
>
> You must have an active Teams & Governance plan in Terraform Cloud before you can enforce Sentinel policies.

![The image shows a KodeKloud lab interface for Terraform Cloud Sentinel Policy, with instructions on activating the "Team and Governance" plan and a Visual Studio Code editor on the right.](https://kodekloud.com/kk-media/image/upload/v1752878769/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Terraform-Cloud-Sentinel-Policy/kodekloud-terraform-cloud-sentinel-policy.jpg)

In **Plan & Billing** you’ll see your current plan:

![The image shows a pricing plan page for a service, detailing options for Free, Trial, and Team plans, with features and pricing information. The sidebar includes navigation options like Workspaces, Plan & Billing, and Integrations.](https://kodekloud.com/kk-media/image/upload/v1752878770/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Terraform-Cloud-Sentinel-Policy/pricing-plan-page-free-trial-team.jpg)

The Teams & Governance tier includes all Team features plus Policy as Code and additional run capabilities:

![The image shows a pricing and feature comparison for different plans in a software application, with options for "Team & Governance" and "Business" plans. The sidebar includes navigation options like "Plan & billing" and "Integrations."](https://kodekloud.com/kk-media/image/upload/v1752878771/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Terraform-Cloud-Sentinel-Policy/pricing-feature-comparison-software-plans.jpg)

## Fork the Sentinel Policy Repository

Start by forking the HashiCorp Sentinel policy repository into your GitHub account. This gives you a local copy to customize and connect to Terraform Cloud.

![The image shows a KodeKloud lab interface for Terraform Cloud Sentinel Policy, with instructions to create a fork of a HashiCorp repository on GitHub. On the right, there's a Visual Studio Code editor with a terminal open.](https://kodekloud.com/kk-media/image/upload/v1752878773/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Terraform-Cloud-Sentinel-Policy/kodekloud-terraform-sentinel-policy-lab.jpg)

## Review Sentinel Policies

Below are two example policies from the repository.

### 1\. Enforce Mandatory Tags

This policy uses the `tfplan-functions` import to require that every AWS EC2 instance in the plan has a `Name` tag. The `main` rule fails if any instance is missing this tag.

```
import "tfplan-functions" as plan

# Tags that must be present on every EC2 instance
mandatory_tags = ["Name"]

# Gather EC2 instances from the plan
allEC2Instances = plan.find_resources("aws_instance")

# Identify instances missing required tags
violatingEC2Instances = plan.filter_attribute_not_contains_list(
    allEC2Instances, "tags", mandatory_tags, true
)

# Fail the policy if any violations exist
main = rule {
    length(violatingEC2Instances["messages"]) is 0
}
```

### 2\. Restrict EC2 Instance Types

This policy ensures only specific EC2 instance types (`t2.micro`, `t2.small`, `t2.medium`) are allowed. Any other type triggers a violation.

```
import "tfplan-functions" as plan

# List of approved EC2 instance types
allowed_types = ["t2.micro", "t2.small", "t2.medium"]

# Gather EC2 instances from the plan
allEC2Instances = plan.find_resources("aws_instance")

# Find instances with disallowed types
violatingEC2Instances = plan.filter_attribute_not_in_list(
    allEC2Instances, "instance_type", allowed_types, true
)

# Count how many violations we have
violations = length(violatingEC2Instances["messages"])

# Enforce zero violations
main = rule {
    violations is 0
}
```

## Define a Policy Set

Group your Sentinel policies in a `sentinel.hcl` file at the repository root. Specify each policy and its enforcement level:

```
module "tfplan-functions" {
  source = "https://raw.githubusercontent.com/hashicorp/terraform-guides/master/governance/third-generation/common-functions/tfplan-functions/tfplan-functions"
}

module "tfconfig-functions" {
  source = "https://raw.githubusercontent.com/hashicorp/terraform-guides/master/governance/third-generation/common-functions/tfconfig-functions/tfconfig-functions"
}

policy "enforce-mandatory-tags" {
  enforcement_level = "advisory"
}

policy "restrict-ec2-instance-type" {
  enforcement_level = "hard-mandatory"
}
```

Enforcement levels determine how Sentinel handles violations:

| Enforcement Level | Behavior                                        |
| ----------------- | ----------------------------------------------- |
| advisory          | Emits a warning but does not block the run      |
| soft-mandatory    | Blocks runs unless an admin override is added   |
| hard-mandatory    | Strictly enforces the policy; no bypass allowed |

> [!important]
> **Warning**
>
> The **hard-mandatory** level cannot be bypassed. Any violation will block the run.

![The image shows a KodeKloud lab interface for Terraform Cloud Sentinel Policy, with instructions on setting up a policy set and a Visual Studio Code editor displaying a welcome message for the HashiCorp Terraform Cloud Lab.](https://kodekloud.com/kk-media/image/upload/v1752878774/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Terraform-Cloud-Sentinel-Policy/kodekloud-terraform-cloud-sentinel-policy-2.jpg)

## Connect the Policy Set to Terraform Cloud

1.  In Terraform Cloud, go to **Settings → Policy sets**.
2.  Click **Connect new policy set**, select **GitHub** (or your VCS), then choose your fork.
3.  Set **Policy framework** to **Sentinel**, give it a name (e.g., “AWS Global Policies”), add a description, and specify the path:

    ```
    terraform-cloud/policy-as-code/sentinel/global
    ```

4.  Apply to **All workspaces**.
5.  Click **Connect policy set**.

![The image shows a web interface for connecting a policy set to a version control provider, with options for GitHub and GitHub (Custom). The sidebar includes navigation options like Teams, Users, and Policy sets.](https://kodekloud.com/kk-media/image/upload/v1752878775/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Terraform-Cloud-Sentinel-Policy/web-interface-policy-set-github-options.jpg)

![The image shows a user interface for connecting a policy set in Terraform Cloud, where a repository is being selected from a list. The sidebar includes options like teams, users, and policy sets.](https://kodekloud.com/kk-media/image/upload/v1752878776/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Terraform-Cloud-Sentinel-Policy/terraform-cloud-policy-set-ui.jpg)

![The image shows a "Policy Sets" page from a Terraform Cloud interface, featuring options to connect a new policy set and information about existing AWS-Global-Policies.](https://kodekloud.com/kk-media/image/upload/v1752878778/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Terraform-Cloud-Sentinel-Policy/terraform-cloud-policy-sets-page.jpg)

## Test Policy Enforcement in the UI

Trigger a new run in your workspace. After the plan stage, you’ll see **Policy check**:

![The image shows a Terraform Cloud workspace dashboard for "devops-aws-myapp-dev," displaying details of the latest run, including instance type changes, policy checks, and cost estimates. The "Actions" menu is open, offering options to start a new run or lock the workspace.](https://kodekloud.com/kk-media/image/upload/v1752878779/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Terraform-Cloud-Sentinel-Policy/terraform-cloud-workspace-devops-dashboard.jpg)

![The image shows a Terraform Cloud interface with a "Test Sentinel" run in progress, indicating no changes to the infrastructure. Various stages like cost estimation, policy check, and apply are pending.](https://kodekloud.com/kk-media/image/upload/v1752878781/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Terraform-Cloud-Sentinel-Policy/terraform-cloud-test-sentinel-run.jpg)

Policy results appear in the run output:

```
## Policy 1: AWS-Global-Policies/enforce-mandatory-tags (advisory)
Result: true
Description:
This policy uses the Sentinel tfplan import to require that all EC2 instances have all mandatory tags.

## Policy 2: AWS-Global-Policies/restrict-ec2-instance-type (hard-mandatory)
Result: true
Description:
This policy uses the Sentinel tfplan/v2 import to require that all EC2 instances have instance types from an allowed list.
```

## Test Policy Enforcement via CLI

1.  Configure your backend for Terraform Cloud and run `terraform login`.
2.  Change the `instance_type` in `terraform.auto.tfvars` to an unapproved value (e.g., `"m5.large"`).
3.  Execute:

    ```
    terraform init
    terraform plan
    ```

This triggers a remote run with policy checks. Violations will block the plan.

![The image shows a Terraform Cloud interface with a CLI-triggered run. The plan and cost estimation are completed, but the policy check has failed due to a restriction on EC2 instance types.](https://kodekloud.com/kk-media/image/upload/v1752878782/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Terraform-Cloud-Sentinel-Policy/terraform-cloud-cli-run-policy-failed.jpg)

```
## Policy: AWS-Global-Policies/restrict-ec2-instance-type (hard-mandatory)
Result: false
Description:
aws_instance.clumsy_bird has instance_type with value m5.large that is not in the allowed list: [t2.micro, t2.small, t2.medium]

Error: Organization Policy Check hard failed.
```

## Remediate and Re-Run

Update your `terraform.auto.tfvars` to a compliant instance type and commit:

```
# terraform.auto.tfvars
prefix         = "app"
project        = "clumsy-bird"
environment    = "development"
instance_type  = "t2.medium"
```

```
git add terraform.auto.tfvars
git commit -m "Set instance_type to t2.medium"
git push
```

Terraform Cloud will automatically start a new run and, if compliant, proceed to apply:

```
## Policy 2: AWS-Global-Policies/restrict-ec2-instance-type (hard-mandatory)
Result: true
Description:
This policy uses the Sentinel tfplan/v2 import to require that all EC2 instances have instance types from an allowed list.
```

---

## Additional Resources

**Terraform Public Registry – Policy Library (Beta):** [Terraform Public Registry Policy Library (Beta)](https://registry.terraform.io/policy-library)  
![The image shows a webpage for "Policy Libraries" in beta, featuring Sentinel policies for Terraform. It includes filters for providers and categories, and lists policies for GCP and Azure with details like version and download count.](https://kodekloud.com/kk-media/image/upload/v1752878783/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Terraform-Cloud-Sentinel-Policy/policy-libraries-beta-sentinel-terraform.jpg)

**AWS Networking Policies in Terraform Guides:** [AWS Networking Sentinel Policies for Terraform Guides](https://github.com/hashicorp/terraform-guides/tree/master/governance/third-generation/aws)  
![The image shows a webpage for AWS Networking Sentinel Policies for Terraform by HashiCorp, detailing policy downloads and version information. It includes download statistics and links to the source and maintainer.](https://kodekloud.com/kk-media/image/upload/v1752878784/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Terraform-Cloud-Sentinel-Policy/aws-networking-sentinel-policies-terraform.jpg)

**HashiCorp Terraform Guides Repository:** [HashiCorp Terraform Guides Repository](https://github.com/hashicorp/terraform-guides)  
![The image shows a GitHub repository page for "terraform-guides" by HashiCorp, displaying folders related to cloud governance policies like AWS, Azure, and GCP.](https://kodekloud.com/kk-media/image/upload/v1752878785/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Terraform-Cloud-Sentinel-Policy/github-repo-terraform-guides-cloud-policies.jpg)

**Sentinel Policy Updates History:** [Commit History](https://github.com/hashicorp/terraform-guides/commits/master/governance/third-generation/common-functions)  
![The image shows a list of files and their descriptions from a GitHub repository, detailing updates and changes made to various Sentinel policy files over the past few years.](https://kodekloud.com/kk-media/image/upload/v1752878786/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Terraform-Cloud-Sentinel-Policy/github-repo-sentinel-policy-updates.jpg)  
![The image shows a list of Sentinel policy files from a GitHub repository, each with a description of changes and the time since the last update.](https://kodekloud.com/kk-media/image/upload/v1752878788/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Terraform-Cloud-Sentinel-Policy/sentinel-policy-files-github-updates.jpg)

In this guide, we covered how to store Sentinel policies as code, connect them to Terraform Cloud, and enforce them via both the UI and CLI. With Sentinel policies running automatically between plan and apply, you can enforce organizational standards for every infrastructure change.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-terraform-cloud/module/617ad513-215b-4e40-9b66-1cdb4eacc424/lesson/976308e4-a31e-49e4-a7c3-45255423d3aa)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/hashicorp-terraform-cloud/module/f7d08e72-e35f-436f-8d42-d0d7364d2532/lesson/cca2f6e1-39f3-4e0e-aa42-a37758627c7e)**
>
> Practice lab
