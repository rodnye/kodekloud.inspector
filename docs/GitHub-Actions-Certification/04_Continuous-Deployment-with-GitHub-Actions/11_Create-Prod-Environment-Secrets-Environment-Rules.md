# Create Prod Environment Secrets Environment Rules - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Continuous-Deployment-with-GitHub-Actions/Create-Prod-Environment-Secrets-Environment-Rules)

---

## Table of Contents

- Create Prod Environment Secrets Environment Rules
  - Prerequisites
  - Step 1: Create the Production Environment
  - Step 2: Configure Deployment Protection Rules
  - Step 3: Restrict Deployments to Your Main Branch
  - Step 4: Add Secrets and Variables
  - Step 5: Verify Your Environment Configuration
  - Summary
  - Watch Video

---

## Content

GitHub Actions Certification

Continuous Deployment with GitHub Actions

# Create Prod Environment Secrets Environment Rules

In this guide, you’ll learn how to configure a `production` environment in your GitHub repository settings, enforce deployment protection rules, restrict deployments to the `main` branch, and add the necessary secrets and variables. By the end, your production workflow will be locked down and ready for automated deployments.

## Prerequisites

- A GitHub repository with Actions enabled
- Admin permissions on the repository
- (Optional) [Familiarity with GitHub Environments](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment)

---

## Step 1: Create the Production Environment

1.  Go to your repository, then click **Settings > Environments**.
2.  Hit **New environment** and enter `production` as the name.

You now have a blank production environment ready for configuration.

---

## Step 2: Configure Deployment Protection Rules

Under **Deployment protection rules**, set up the controls that gate your production deployments:

![The image shows a GitHub settings page for configuring deployment protection rules in a production environment, including options for required reviewers and a wait timer.](https://kodekloud.com/kk-media/image/upload/v1752875880/notes-assets/images/GitHub-Actions-Certification-Create-Prod-Environment-Secrets-Environment-Rules/github-settings-deployment-protection-rules.jpg)

- **Wait timer**: e.g., `1 minute` – enforces a delay before a workflow can proceed.
- **Required reviewers**: add up to six team members; at least one approval is mandatory.
- **Allow self-review**: toggle **off** to prevent the person who triggered the workflow from approving their own deployment.

> [!important]
> **Warning**
>
> Disabling self-review is critical for maintaining an audit trail and ensuring someone else verifies each production deployment.

Click **Save protection rules** to apply.

---

## Step 3: Restrict Deployments to Your Main Branch

In the same **production** environment settings:

1.  Find **Restrict deployments**.
2.  Select **Only allow deployments from specific branches**.
3.  Choose `main` from the dropdown.

Now, only commits merged into `main` can trigger the production workflow.

---

## Step 4: Add Secrets and Variables

Scroll down to **Secrets and variables** to store environment-specific data:

![The image shows a GitHub settings page for configuring environment protection rules, deployment branches, environment secrets, and variables. It includes options to add secrets and variables, and to manage branch rules.](https://kodekloud.com/kk-media/image/upload/v1752875881/notes-assets/images/GitHub-Actions-Certification-Create-Prod-Environment-Secrets-Environment-Rules/github-settings-environment-protection-rules.jpg)

Use the table below as your reference for what to add:

| Type     | Name       | Value                            |
| -------- | ---------- | -------------------------------- |
| Secret   | KUBECONFIG | _Your Kubernetes config content_ |
| Variable | namespace  | `locus-production`               |
| Variable | replicas   | `5`                              |

1.  Under **Secrets**, click **New secret**, enter `KUBECONFIG`, paste your kubeconfig, and save.
2.  Under **Variables**, add `namespace` and `replicas` one at a time, then click **Save**.

---

## Step 5: Verify Your Environment Configuration

After saving, your **Environments** page should list both `development` and `production`, displaying their protection rules, secrets, and variables:

![The image shows a GitHub repository settings page focused on configuring environments, with sections for "production" and "development" that include protection rules, secrets, and variables.](https://kodekloud.com/kk-media/image/upload/v1752875882/notes-assets/images/GitHub-Actions-Certification-Create-Prod-Environment-Secrets-Environment-Rules/github-repo-settings-environments-config.jpg)

---

## Summary

- **Production environment** created under **Settings > Environments**
- **Protection rules**: wait timer + required reviewers + no self-approval
- **Branch restriction**: only `main` can deploy
- **Secrets**: `KUBECONFIG`
- **Variables**: `namespace`, `replicas`

In the next tutorial, we’ll trigger a GitHub Actions workflow against this production environment to validate the setup.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/b6687abe-8094-4750-910b-5daa8bc710b1/lesson/a32a445f-ba6e-4918-91e0-85ab4371ea8a)**
>
> Watch video content
