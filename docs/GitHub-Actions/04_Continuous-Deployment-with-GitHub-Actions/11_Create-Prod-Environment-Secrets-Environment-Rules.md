# Create Prod Environment Secrets Environment Rules - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/Continuous-Deployment-with-GitHub-Actions/Create-Prod-Environment-Secrets-Environment-Rules)

---

## Table of Contents

- Create Prod Environment Secrets Environment Rules
  - 1. Create the Production Environment
  - 2. Configure Deployment Protection Rules
  - 3. Add Secrets
  - 4. Define Environment Variables
  - Validate Your Setup
  - References
  - Watch Video
    - a. Deployment Wait Timer
    - b. Required Reviewers
    - c. Branch Restrictions

---

## Content

GitHub Actions

Continuous Deployment with GitHub Actions

# Create Prod Environment Secrets Environment Rules

Learn how to configure a secure, production-ready environment in GitHub with deployment protection rules, secrets, and environment variables.

**In this guide you’ll cover:**

1.  [Creating the Production Environment](#1-create-the-production-environment)
2.  [Configuring Deployment Protection Rules](#2-configure-deployment-protection-rules)
3.  [Adding Repository Secrets](#3-add-secrets)
4.  [Defining Environment Variables](#4-define-environment-variables)

## 1\. Create the Production Environment

1.  Navigate to your repository’s **Settings** → **Environments**.
2.  Click **New environment**.
3.  Enter `production` as the environment name and hit **Create environment**.

> [!important]
> **Note**
>
> Environments let you control deployment workflows and apply protection rules per stage. For more details, see [GitHub Environments](https://docs.github.com/en/actions/deployment/targeting-different-environments/).

## 2\. Configure Deployment Protection Rules

Open the newly created **production** environment and apply these settings:

| Rule Type           | Configuration | Description                            |
| ------------------- | ------------- | -------------------------------------- |
| Wait timer          | 1 minute      | Delay before deployment begins.        |
| Required approvals  | 1             | Minimum number of reviewers.           |
| Branch restrictions | `main`        | Only workflows from `main` can deploy. |

### a. Deployment Wait Timer

Set **Wait timer** to `1 minute` to introduce a brief delay before the job starts.

### b. Required Reviewers

- **Required approvals**: `1`
- **Reviewers**: Select up to 6 team members.
- (Optional) Disable **Allow self approval** to prevent deployers from approving their own workflows.

### c. Branch Restrictions

Under **Branch restrictions**, choose only the `main` branch to ensure that only the approved branch can trigger production deployments.

## 3\. Add Secrets

Store sensitive data as encrypted secrets in the `production` environment:

1.  In **production**, click **New repository secret**.
2.  **Name**: `KUBECONFIG`
3.  **Value**: Your base64-encoded kubeconfig content.
4.  Click **Add secret**.

> [!important]
> **Warning**
>
> Never commit raw kubeconfig files or credentials to your repository. Always use secrets to keep sensitive data secure.

## 4\. Define Environment Variables

Specify variables your deployment workflow will consume:

| Variable    | Value        |
| ----------- | ------------ |
| `namespace` | `production` |
| `replicas`  | `5`          |

Click **Save changes** to apply your configuration.

---

## Validate Your Setup

To confirm your configuration, trigger a GitHub Actions workflow that targets the `production` environment. Check the **Environments** tab in your workflow run for applied protection rules and secrets usage.

---

## References

- [GitHub Environments Guide](https://docs.github.com/en/actions/deployment/targeting-different-environments/)
- [Managing Secrets in GitHub](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/92928734-1d5a-462d-9414-2d3865f5ef79/lesson/0a19ec11-8a77-4d9a-900c-a0b9263fa1ba)**
>
> Watch video content
