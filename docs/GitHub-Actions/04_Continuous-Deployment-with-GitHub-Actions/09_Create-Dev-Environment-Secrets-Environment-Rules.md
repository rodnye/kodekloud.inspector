# Create Dev Environment Secrets Environment Rules - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/Continuous-Deployment-with-GitHub-Actions/Create-Dev-Environment-Secrets-Environment-Rules)

---

## Table of Contents

- Create Dev Environment Secrets Environment Rules
  - 1. Configure the Development Environment
  - 2. Add Environment Secrets and Variables
  - 3. Next Steps
  - References
  - Watch Video
    - 1.1 Define Deployment Protection Rules
    - 1.2 Verify the Environment Overview
    - 2.1 Add a Kubeconfig Secret
    - 2.2 Define Environment Variables

---

## Content

GitHub Actions

Continuous Deployment with GitHub Actions

# Create Dev Environment Secrets Environment Rules

In this guide, you’ll learn how to set up a **development** environment in GitHub for use with your GitHub Actions workflows. While we focus on a development namespace, you can follow the same steps to create environments for UAT, SIT, production, or any other stage.

## 1\. Configure the Development Environment

1.  Navigate to your repository’s **Settings**.
2.  Select **Environments** in the sidebar.
3.  Click **New environment**, then enter `development` as the name.

Once created, you can add protection rules, secrets, and variables.

### 1.1 Define Deployment Protection Rules

Enforce a 60-second pause before deployments and allow administrators to bypass the delay.

![The image shows a GitHub settings page for configuring environment deployment protection rules, including options for required reviewers, wait timers, and environment secrets.](https://kodekloud.com/kk-media/image/upload/v1752876444/notes-assets/images/GitHub-Actions-Create-Dev-Environment-Secrets-Environment-Rules/github-settings-environment-deployment-rules.jpg)

- Set **Wait timer** to **60 seconds**
- Enable **Allow administrators to bypass this rule**
- Leave branch and tag restrictions at **No restrictions**
- Click **Save protection rules**

> [!important]
> **Note**
>
> You can also require specific reviewers or restrict deployments to certain branches or tags for tighter control.

### 1.2 Verify the Environment Overview

After saving, confirm that the `development` environment appears with the configured protection rule.

![The image shows a GitHub repository settings page, specifically the "Environments" section, where a "development" environment is configured with protection rules, secrets, and variables.](https://kodekloud.com/kk-media/image/upload/v1752876445/notes-assets/images/GitHub-Actions-Create-Dev-Environment-Secrets-Environment-Rules/github-repo-settings-environments-development.jpg)

## 2\. Add Environment Secrets and Variables

GitHub Actions lets you scope secrets and variables to specific environments for improved security and flexibility.

### 2.1 Add a Kubeconfig Secret

1.  Under the **Secrets and variables** section of the `development` environment, click **Add secret**.
2.  Name it `Kubeconfig`.
3.  Paste your kubeconfig content and click **Save secret**.

### 2.2 Define Environment Variables

Create key/value pairs that your workflows can consume:

![The image shows a GitHub repository settings page focused on "Secrets and variables" for actions, displaying environment and repository variables.](https://kodekloud.com/kk-media/image/upload/v1752876446/notes-assets/images/GitHub-Actions-Create-Dev-Environment-Secrets-Environment-Rules/github-repo-settings-secrets-variables.jpg)

| Variable    | Value         | Description                    |
| ----------- | ------------- | ------------------------------ |
| `NAMESPACE` | `development` | Target Kubernetes namespace    |
| `REPLICAS`  | `1`           | Desired number of pod replicas |

> [!important]
> **Warning**
>
> Environment-level secrets and variables override any repository-level entries with the same name.

## 3\. Next Steps

In your GitHub Actions workflow, specify:

```
jobs:
  deploy:
    environment: development
    # … rest of your job
```

This ensures your deployment respects the environment’s protection rules, secrets, and variables.

## References

- [GitHub Environments documentation](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment)
- [GitHub Secrets documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/92928734-1d5a-462d-9414-2d3865f5ef79/lesson/fe69efd0-3928-47f0-8dc0-d9ff9a19663b)**
>
> Watch video content
