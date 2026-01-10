# Securing Secrets using HashiCorp Vault - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Security-Guide/Securing-Secrets-using-HashiCorp-Vault)

---

## Table of Contents

- Securing Secrets using HashiCorp Vault
  - Why Centralize Secret Management?
  - Defining a GitHub Actions Workflow
  - Provisioning HashiCorp Vault on HCP
  - Integrating Vault with GitHub Actions
  - Verifying the Workflow
  - Links and References
  - Watch Video

---

## Content

GitHub Actions Certification

Security Guide

# Securing Secrets using HashiCorp Vault

Managing sensitive credentials across multiple repositories can be challenging. GitHub Actions stores secrets at the repository or environment level, but lacks versioning and centralized policy controls. By integrating HashiCorp Vault, you can maintain a single source of truth and automate secret synchronization across all your workflows.

## Why Centralize Secret Management?

GitHub Actions secrets are easy to configure but can become a maintenance burden as your organization scales:

| Storage Type      | Versioning | Access Control                      | Maintenance Overhead   |
| ----------------- | ---------- | ----------------------------------- | ---------------------- |
| GitHub Repository | No         | Per-repo / per-environment policies | Duplicate in each repo |
| HashiCorp Vault   | Yes        | Fine-grained, dynamic ACLs & tokens | Centralized, auditable |

By standardizing on Vault, you gain:

- Automatic versioning and rotation
- Detailed audit logs
- Consistent policies across environments

![The image shows a GitHub repository settings page for managing secrets and variables, with a section for environment secrets and a repository secret named "DOCKER_PASSWORD."](https://kodekloud.com/kk-media/image/upload/v1752876397/notes-assets/images/GitHub-Actions-Certification-Securing-Secrets-using-HashiCorp-Vault/github-repo-settings-secrets-variables.jpg)

## Defining a GitHub Actions Workflow

Create a workflow file under `.github/workflows/vault-demo.yaml` that manually triggers and checks for `AWS_API_KEY`:

![The image shows a GitHub repository interface displaying a list of YAML workflow files within the `.github/workflows` directory, along with their last commit messages and timestamps.](https://kodekloud.com/kk-media/image/upload/v1752876398/notes-assets/images/GitHub-Actions-Certification-Securing-Secrets-using-HashiCorp-Vault/github-repo-yaml-workflows-list.jpg)

```
name: Vault Demo
on:
  workflow_dispatch:


jobs:
  echo-vault-secret:
    runs-on: ubuntu-latest
    steps:
      - name: Verify AWS_API_KEY exists
        run: |
          if [[ -z "${{ secrets.AWS_API_KEY }}" ]]; then
            echo "::error::Secret Not Found"
            exit 1
          else
            echo "::notice::Secret Found"
            exit 0
          fi
```

> [!important]
> **Note**
>
> Ensure the workflow file is committed to the `main` branch (or your default branch) under `.github/workflows`.

When `AWS_API_KEY` is missing, the run fails:

![The image shows a GitHub Actions interface with a "Vault Demo" workflow that has been manually run. The interface includes options for managing workflows and viewing workflow runs.](https://kodekloud.com/kk-media/image/upload/v1752876399/notes-assets/images/GitHub-Actions-Certification-Securing-Secrets-using-HashiCorp-Vault/github-actions-vault-demo-workflow.jpg)

```
# Simulated check when AWS_API_KEY is unset
if [[ -z "" ]]; then
  echo "Secret Not Found"
  exit 1
fi


# Output:
Secret Not Found
```

## Provisioning HashiCorp Vault on HCP

HashiCorp Vault Secrets on the [HashiCorp Cloud Platform](https://cloud.hashicorp.com/) provides a fully managed service for centralized secret storage.

1.  Sign in at the [HashiCorp Vault website](https://www.vaultproject.io/).

    ![The image shows a webpage from HashiCorp Vault, highlighting "Standardize secrets management" with options to sign up for free or request a demo.](https://kodekloud.com/kk-media/image/upload/v1752876401/notes-assets/images/GitHub-Actions-Certification-Securing-Secrets-using-HashiCorp-Vault/hashicorp-vault-secrets-management-webpage.jpg)

2.  From the HCP dashboard, select **Vault Secrets**:

    ![The image shows a project dashboard from HashiCorp Cloud Platform, displaying various services like Boundary, Consul, Packer, and Vault, along with project status and billing summary.](https://kodekloud.com/kk-media/image/upload/v1752876402/notes-assets/images/GitHub-Actions-Certification-Securing-Secrets-using-HashiCorp-Vault/hashicorp-cloud-platform-dashboard-services.jpg)

3.  Click **Create application**, name it (e.g., **Secret App**), then add the `AWS_API_KEY` secret:

    ![The image shows a dashboard interface for HashiCorp Vault Secrets, welcoming the user and offering options to create an application and access resources like documentation and blog posts.](https://kodekloud.com/kk-media/image/upload/v1752876403/notes-assets/images/GitHub-Actions-Certification-Securing-Secrets-using-HashiCorp-Vault/hashicorp-vault-secrets-dashboard-interface.jpg)

4.  Use the **Add secret** button to insert your key/value pair:

    ![The image shows a web interface for managing secrets in a project, with options to add or import secrets. A notification at the top indicates that "Vault Secrets" is now generally available.](https://kodekloud.com/kk-media/image/upload/v1752876404/notes-assets/images/GitHub-Actions-Certification-Securing-Secrets-using-HashiCorp-Vault/web-interface-managing-secrets-notification.jpg)

> [!important]
> **Note**
>
> New users may be eligible for free credits on HCP. Check the [pricing page](https://cloud.hashicorp.com/pricing) for details.

## Integrating Vault with GitHub Actions

Enable automatic synchronization so GitHub Actions can retrieve secrets directly from Vault:

1.  In the Vault console, select **Integrations → GitHub Actions**:

    ![The image shows a web interface for integrating secret management tools, featuring options to add AWS Secrets Manager, GitHub Actions, and Vercel, along with documentation links for Terraform and Docker.](https://kodekloud.com/kk-media/image/upload/v1752876405/notes-assets/images/GitHub-Actions-Certification-Securing-Secrets-using-HashiCorp-Vault/secret-management-web-interface-integration.jpg)

2.  Authorize access to your GitHub account and grant Vault permission to the target repository:

    ![The image shows a user interface for selecting GitHub repositories to integrate with HashiCorp Vault, featuring a dropdown menu with repository options.](https://kodekloud.com/kk-media/image/upload/v1752876406/notes-assets/images/GitHub-Actions-Certification-Securing-Secrets-using-HashiCorp-Vault/github-repositories-vault-integration-ui.jpg)

3.  Configure the sync destination and save:

    ![The image shows a web interface for adding a new sync destination in HashiCorp Vault, with options to select an organization and repository for GitHub Actions integration. There are buttons to save and sync secrets or cancel the action.](https://kodekloud.com/kk-media/image/upload/v1752876408/notes-assets/images/GitHub-Actions-Certification-Securing-Secrets-using-HashiCorp-Vault/hashicorp-vault-github-actions-sync-interface.jpg)

Integration at a glance:

| Step              | Description                               |
| ----------------- | ----------------------------------------- |
| Authorize GitHub  | Grant Vault read access to selected repos |
| Select Repository | Choose the repo containing your workflow  |
| Configure Sync    | Map Vault path to GitHub secret name      |
| Save & Sync       | Trigger initial secret import             |

## Verifying the Workflow

After syncing, revisit **Settings → Secrets and variables → Actions** to confirm `AWS_API_KEY` appears alongside other repository secrets:

![The image shows a GitHub repository settings page, specifically the "Secrets and variables" section under "Actions," displaying environment and repository secrets like "AWS_API_KEY" and "DOCKER_PASSWORD."](https://kodekloud.com/kk-media/image/upload/v1752876409/notes-assets/images/GitHub-Actions-Certification-Securing-Secrets-using-HashiCorp-Vault/github-repo-settings-secrets-variables-2.jpg)

Re-run the **Vault Demo** workflow. The secret check now passes:

![The image shows a GitHub Actions interface with a workflow named "Vault Demo" running a job called "echo-vault-secret." The job is in the process of starting on a hosted runner.](https://kodekloud.com/kk-media/image/upload/v1752876410/notes-assets/images/GitHub-Actions-Certification-Securing-Secrets-using-HashiCorp-Vault/github-actions-vault-demo-echo-job.jpg)

```
# Masked secret check
if [[ -z "***" ]]; then
  echo "Secret Not Found"
  exit 1
else
  echo "Secret Found"
  exit 0
fi


# Output:
Secret Found
```

> [!important]
> **Warning**
>
> Always verify that only the minimum required permissions are granted when authorizing integrations. Avoid exposing secrets in plaintext logs.

## Links and References

- [HashiCorp Vault Documentation](https://www.vaultproject.io/docs)
- [GitHub Actions Secrets](https://docs.github.com/actions/security-guides/encrypted-secrets)
- [HashiCorp Cloud Platform](https://cloud.hashicorp.com/)
- [Vault Terraform Provider](https://registry.terraform.io/providers/hashicorp/vault/latest)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/a3e810f5-af92-4e1c-ac54-bdf50ddbe9cf/lesson/c50a8686-8a5d-4c58-bf96-d04a242ea354)**
>
> Watch video content
