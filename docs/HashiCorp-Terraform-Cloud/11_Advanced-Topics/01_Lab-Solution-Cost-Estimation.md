# Lab Solution Cost Estimation - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Terraform-Cloud/Advanced-Topics/Lab-Solution-Cost-Estimation)

---

## Table of Contents

- Lab Solution Cost Estimation
  - Prerequisites
  - 1. Enable Cost Estimation
  - 2. Viewing Cost Estimates
  - 3. Testing Cost Impact
  - 4. Supported Providers
  - Summary
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

HashiCorp : Terraform Cloud

Advanced Topics

# Lab Solution Cost Estimation

Terraform Cloud Cost Estimation provides real-time insights into the financial impact of your infrastructure-as-code changes. By previewing estimated cost deltas before you apply a plan, you can budget effectively and avoid surprises in your cloud bill.

## Prerequisites

> [!important]
> **Note**
>
> Cost Estimation is available in the Team & Governance tier of Terraform Cloud. If you’re not on this tier yet, [start a free trial](https://app.terraform.io/signup/account) to enable cost forecasting features.

## 1\. Enable Cost Estimation

1.  Navigate to **Settings** > **Plan & Billing** in your Terraform Cloud organization to confirm your Team & Governance tier and trial status.  
    ![The image shows a "Plan & Billing" page for Terraform Cloud, indicating a free trial with premium features and a note that the plan will change to free on October 29th, 2022. It also mentions that there are no invoices yet.](https://kodekloud.com/kk-media/image/upload/v1752878682/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Cost-Estimation/terraform-cloud-plan-billing-free-trial.jpg)
2.  Next, go to **Settings** > **Cost Estimation Integration**, enable cost estimation for all workspaces, and click **Update Settings**.  
    ![The image shows a settings page for "Cost Estimation" in a software interface, with an option to enable cost estimation for all workspaces and a button to update settings.](https://kodekloud.com/kk-media/image/upload/v1752878683/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Cost-Estimation/cost-estimation-settings-page-interface.jpg)

## 2\. Viewing Cost Estimates

After enabling the feature, open any workspace (for example, **MyAppDev**) and trigger a plan. The Cost Estimation stage appears immediately after the Terraform plan phase:

![The image shows a Terraform Cloud interface displaying a cost estimation for AWS resources, including an instance named "clumsy_bird" with associated costs. The interface indicates that the apply action will not run.](https://kodekloud.com/kk-media/image/upload/v1752878684/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Cost-Estimation/terraform-cloud-cost-estimation-aws.jpg)

Key columns include:

- **Hourly Cost**: Estimated rate per hour for each resource.
- **Monthly Cost**: Projected charge over a full month.
- **Monthly Delta**: Difference between the new monthly cost and the current state.

Resources without pricing data will appear as “cannot estimate cost.”

## 3\. Testing Cost Impact

Modify your Terraform code to see how changes affect cost. For instance, update the EC2 instance type for the Clumsy Bird application from `t2.micro` to `t2.small`, commit your change, and run a new plan. The Cost Estimation section will highlight the updated delta:

![The image shows a Terraform Cloud interface where an EC2 instance size upgrade is being applied. It includes details about the plan, cost estimation, and the application process, with a highlighted cost increase for an AWS instance named "clumsy_bird."](https://kodekloud.com/kk-media/image/upload/v1752878685/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Cost-Estimation/terraform-cloud-ec2-upgrade-cost.jpg)

Upgrading from **t2.micro** to **t2.small** adds approximately **$8.20** per month.

## 4\. Supported Providers

Terraform Cloud Cost Estimation currently supports the following cloud providers:

| Provider | Coverage                                     |
| -------- | -------------------------------------------- |
| AWS      | EC2, RDS, S3, Lambda, and more               |
| GCP      | Compute Engine, Cloud Storage, and more      |
| Azure    | Virtual Machines, Storage Accounts, and more |

## Summary

Terraform Cloud’s Cost Estimation feature empowers teams to monitor and forecast infrastructure expenses before deployment. Enable it in your organization to incorporate cost visibility into your CI/CD workflows.

## Links and References

- [Terraform Cloud](https://www.terraform.io/cloud)
- [Terraform Cloud Pricing](https://www.terraform.io/pricing)
- [Terraform Cloud Workspaces](https://www.terraform.io/cloud/workspaces)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-terraform-cloud/module/f7d08e72-e35f-436f-8d42-d0d7364d2532/lesson/e5853944-2e57-4e0a-abb7-45efcf4c08c9)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/hashicorp-terraform-cloud/module/f7d08e72-e35f-436f-8d42-d0d7364d2532/lesson/bc4a7f9e-6c5d-41c9-9145-8beb686cbeed)**
>
> Practice lab
