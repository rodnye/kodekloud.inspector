# Lab Solution GitOps Workflow using Terraform Cloud - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Terraform-Cloud/Terraform-Cloud-Workflows/Lab-Solution-GitOps-Workflow-using-Terraform-Cloud)

---

## Table of Contents

- Lab Solution GitOps Workflow using Terraform Cloud
  - 1. Review GitHub Repository and Terraform Cloud Workspaces
  - 2. Clone the Repository and Checkout the Development Branch
  - 3. Add an S3 Bucket Module in main.tf
  - 4. Configure the Terraform Cloud Backend
  - 5. Authenticate, Initialize, and Validate
  - 6. Preview Changes with terraform plan
  - 7. Commit and Push to development
  - 8. Observe the Terraform Cloud Run
  - 9. Promote to Staging via Pull Request
  - 10. Verify Staging Apply
  - 11. Promote to Production
  - Conclusion
  - Links and References
  - Watch Video

---

## Content

HashiCorp : Terraform Cloud

Terraform Cloud Workflows

# Lab Solution GitOps Workflow using Terraform Cloud

In this lab, you’ll implement a GitOps workflow by integrating Terraform Cloud workspaces with a GitHub repository. You’ll make infrastructure changes in the development branch and workspace, then promote them through staging to production using pull requests. Terraform Cloud will handle all plan and apply operations automatically.

## 1\. Review GitHub Repository and Terraform Cloud Workspaces

First, inspect the **Clumsy Bird** repository structure and branch layout:

![The image shows a GitHub repository page for a project named "clumsy_bird," which includes several Terraform configuration files and a README.md file. The repository is private, with recent commits related to uploading Terraform configurations.](https://kodekloud.com/kk-media/image/upload/v1752878882/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-GitOps-Workflow-using-Terraform-Cloud/github-repo-clumsy-bird-terraform.jpg)

Next, open Terraform Cloud and confirm you have three VCS-connected workspaces:

![The image shows a Terraform Cloud interface displaying three workspaces with their run statuses marked as "Applied." Each workspace is associated with a repository and shows the time of the latest change.](https://kodekloud.com/kk-media/image/upload/v1752878883/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-GitOps-Workflow-using-Terraform-Cloud/terraform-cloud-workspaces-applied-statuses.jpg)

> [!important]
> **Note**
>
> Each workspace must map to a Git branch (development, staging, main) for GitOps workflows to work seamlessly.

Here’s a quick overview:

| Workspace                | Branch      | Purpose                 |
| ------------------------ | ----------- | ----------------------- |
| devops-aws-myapp-dev     | development | Development environment |
| devops-aws-myapp-staging | staging     | Pre-production testing  |
| devops-aws-myapp-prod    | main        | Production environment  |

Finally, check your AWS console to see the existing EC2 instances for Clumsy Bird:

![The image shows an AWS EC2 dashboard with three running instances listed, each with a unique instance ID and type "t2.micro."](https://kodekloud.com/kk-media/image/upload/v1752878884/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-GitOps-Workflow-using-Terraform-Cloud/aws-ec2-dashboard-three-instances.jpg)

## 2\. Clone the Repository and Checkout the Development Branch

In your terminal (e.g., VS Code integrated terminal), clone the repo and switch to `development`:

![The image shows a KodeKloud lab interface for a GitOps workflow, featuring instructions to clone a GitHub repository and a Visual Studio Code editor with a README file open.](https://kodekloud.com/kk-media/image/upload/v1752878885/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-GitOps-Workflow-using-Terraform-Cloud/kodekloud-gitops-workflow-lab-interface.jpg)

```
cd ~/vcs
git clone https://github.com/gmaentz/clumsy_bird.git
cd clumsy_bird
git checkout -b development origin/development
```

## 3\. Add an S3 Bucket Module in `main.tf`

Update your Terraform configuration by appending the S3 bucket module:

```
module "s3_bucket" {
  source        = "terraform-aws-modules/s3-bucket/aws"
  bucket_prefix = "${var.prefix}-s3-${var.environment}"
  acl           = "private"
  versioning = {
    enabled = true
  }
}
```

This module leverages your existing `prefix` and `environment` variables.

## 4\. Configure the Terraform Cloud Backend

Ensure your `backend.tf` points to the **dev** workspace:

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

## 5\. Authenticate, Initialize, and Validate

Log into Terraform Cloud, initialize the configuration, and validate:

```
terraform login
terraform init
terraform validate
```

A successful validation means your syntax and backend config are correct.

## 6\. Preview Changes with `terraform plan`

Run a speculative plan in Terraform Cloud:

```
terraform plan \
  -var="prefix=my-app" \
  -var="environment=dev" \
  -var="region=us-east-1" \
  -var="owner=you" \
  -var="project=clumsy_bird"
```

![The image shows a Terraform Cloud interface with a speculative plan triggered via CLI for a development workspace. It includes details about the plan's status and navigation improvements.](https://kodekloud.com/kk-media/image/upload/v1752878886/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-GitOps-Workflow-using-Terraform-Cloud/terraform-cloud-interface-speculative-plan.jpg)

You should see **four** new resources to add for the S3 bucket.

## 7\. Commit and Push to `development`

Since this workspace is VCS-driven, CLI `apply` is disabled. Commit and push your updates:

```
git add main.tf backend.tf
git config user.email "you@example.com"
git config user.name "Your Name"
git commit -m "Add S3 bucket module for development"
git push origin development
```

> [!important]
> **Warning**
>
> Do not attempt `terraform apply` locally when using a VCS-connected workspace. All applies must occur in Terraform Cloud.

## 8\. Observe the Terraform Cloud Run

After pushing, Terraform Cloud will automatically plan and apply in the **dev** workspace. View the run details:

![The image shows a Terraform Cloud interface with a run that updates to include an S3 bucket. The plan and apply processes are finished, resulting in four resources being created.](https://kodekloud.com/kk-media/image/upload/v1752878888/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-GitOps-Workflow-using-Terraform-Cloud/terraform-cloud-s3-bucket-update.jpg)

## 9\. Promote to Staging via Pull Request

Create a PR from `development` into `staging` on GitHub:

![The image shows a GitHub repository page for a project named "Clumsy Birds," with details about branches, commits, and files. The "development" branch has recent updates, and there's an option to compare and create a pull request.](https://kodekloud.com/kk-media/image/upload/v1752878889/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-GitOps-Workflow-using-Terraform-Cloud/clumsy-birds-github-repo-branches.jpg)

Once the PR is open, Terraform Cloud runs a speculative plan in **staging**:

![The image shows a Terraform Cloud interface with a plan summary indicating resources to be created. It includes a notification about a pull request that needs to be merged before applying changes.](https://kodekloud.com/kk-media/image/upload/v1752878890/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-GitOps-Workflow-using-Terraform-Cloud/terraform-cloud-plan-summary-pull-request.jpg)

Click **Details** to review:

![The image shows a Terraform Cloud interface with a plan running for a pull request. It includes details of resources to be created.](https://kodekloud.com/kk-media/image/upload/v1752878891/notes-assetshttps://kodekloud.com/kk-media/image/upload/v1752878891/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-GitOps-Workflow-using-Terraform-Cloud/terraform-cloud-interface-pull-request-plan.jpg)

When checks succeed, merge the PR.

## 10\. Verify Staging Apply

After merging, Terraform Cloud detects the new `staging` commit and applies the changes:

![The image shows a Terraform Cloud interface displaying a list of workspaces with their names, run statuses, repositories, and latest change timestamps. The workspaces have statuses like "Applied" and "Planning."](https://kodekloud.com/kk-media/image/upload/v1752878891/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-GitOps-Workflow-using-Terraform-Cloud/terraform-cloud-workspaces-statuses-interface.jpg)

Once complete:

![The image shows a Terraform Cloud interface with a completed run, indicating that four AWS S3 bucket resources were created. The sidebar includes options like Workspaces, Runs, and Settings.](https://kodekloud.com/kk-media/image/upload/v1752878893/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-GitOps-Workflow-using-Terraform-Cloud/terraform-cloud-interface-aws-s3-buckets.jpg)

Finally, confirm the new bucket in the AWS S3 console:

![The image shows an Amazon S3 dashboard with a list of two storage buckets named "my-app-dev-s3-development" and "my-app-staging-s3-staging," both located in the US East (N. Virginia) region.](https://kodekloud.com/kk-media/image/upload/v1752878894/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-GitOps-Workflow-using-Terraform-Cloud/amazon-s3-dashboard-storage-buckets.jpg)

## 11\. Promote to Production

Repeat the PR process from `staging` into `main`:

![The image shows a GitHub pull request interface for creating an S3 bucket in production. It includes commit details, pending checks, and a note that the branch has no conflicts with the base branch.](https://kodekloud.com/kk-media/image/upload/v1752878896/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-GitOps-Workflow-using-Terraform-Cloud/github-pull-request-s3-bucket-interface.jpg)

Terraform Cloud runs the final plan for **prod**:

![The image shows a Terraform Cloud interface with a plan running for a pull request, indicating resources to be created in AWS, such as S3 buckets and related configurations. The sidebar includes navigation options like Workspaces, Runs, and Settings.](https://kodekloud.com/kk-media/image/upload/v1752878891/notes-assetshttps://kodekloud.com/kk-media/image/upload/v1752878891/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-GitOps-Workflow-using-Terraform-Cloud/terraform-cloud-interface-pull-request-plan.jpg)

Merge the PR. Once the apply finishes, verify all three buckets exist:

![The image shows a Terraform Cloud interface where a plan and apply process has finished, resulting in the creation of four AWS S3 bucket resources.](https://kodekloud.com/kk-media/image/upload/v1752878897/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-GitOps-Workflow-using-Terraform-Cloud/terraform-cloud-plan-apply-s3-buckets.jpg)

![The image shows a Terraform Cloud interface where a plan and apply process has finished, resulting in the creation of four AWS S3 bucket resources.](https://kodekloud.com/kk-media/image/upload/v1752878898/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-GitOps-Workflow-using-Terraform-Cloud/terraform-cloud-plan-apply-s3-buckets-2.jpg)

## Conclusion

You’ve successfully implemented a GitOps workflow using Terraform Cloud and GitHub. By mapping workspaces to branches, adding an S3 bucket module, and promoting changes through pull requests, you’ve automated infrastructure provisioning across development, staging, and production.

## Links and References

- [Terraform Cloud Documentation](https://www.terraform.io/cloud)
- [AWS S3 User Guide](https://docs.aws.amazon.com/s3/index.html)
- [Git Branches and Merging](https://docs.github.com/en/get-started/using-git/about-branches)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-terraform-cloud/module/8dc830bd-1e70-4a76-bc45-b417ff7c1771/lesson/c989fc3c-894e-4c3c-b5c6-0d61bd4e7aed)**
>
> Watch video content
