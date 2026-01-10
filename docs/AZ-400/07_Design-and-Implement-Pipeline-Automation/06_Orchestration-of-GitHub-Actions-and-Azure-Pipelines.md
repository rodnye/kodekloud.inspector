# Orchestration of GitHub Actions and Azure Pipelines - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Design-and-Implement-Pipeline-Automation/Orchestration-of-GitHub-Actions-and-Azure-Pipelines)

---

## Table of Contents

- Orchestration of GitHub Actions and Azure Pipelines
  - 1. Repository Overview
  - 2. Create a GitHub Personal Access Token
  - 3. Modify the GitHub Actions Workflow
  - 4. Configure Azure Pipelines
  - 5. Dispatch GitHub Actions from Azure Pipelines
  - 6. Managing Deployment Gates
  - Links and References
  - Watch Video
    - 4.1 Add the PAT as a Secret Variable

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Design and Implement Pipeline Automation

# Orchestration of GitHub Actions and Azure Pipelines

In this guide, you’ll learn how to trigger a GitHub Actions workflow from an Azure Pipeline to build and deploy a Node.js application. We’ll use the **KodeKloudCoffee** repository as our example, combining the flexibility of Azure Pipelines with GitHub Actions CI/CD.

## 1\. Repository Overview

Our private GitHub repo **KodeKloudCoffee** contains a Node.js app that builds automatically on commits to `main`.

![The image shows a GitHub repository page named "KodeKloudCoffee," which is private and contains several files and folders. The main branch is not protected, and there are 22 commits listed.](https://kodekloud.com/kk-media/image/upload/v1752867776/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Orchestration-of-GitHub-Actions-and-Azure-Pipelines/kodekloudcoffee-github-repo-private-commits.jpg)

Here’s the current GitHub Actions run history:

![The image shows a GitHub Actions page for the repository "KodeKloudCoffee," displaying a list of workflow runs with their statuses and details.](https://kodekloud.com/kk-media/image/upload/v1752867778/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Orchestration-of-GitHub-Actions-and-Azure-Pipelines/github-actions-kodekloudcoffee-workflows.jpg)

When a Pull Request is merged, the build kicks off and shows a success check:

![The image shows a GitHub pull request page where a pull request has been successfully merged and closed. There is an option to delete the branch and a section to add comments.](https://kodekloud.com/kk-media/image/upload/v1752867779/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Orchestration-of-GitHub-Actions-and-Azure-Pipelines/github-pull-request-merged-closed.jpg)

## 2\. Create a GitHub Personal Access Token

Azure Pipelines needs a PAT with `repo` and `workflow` scopes to dispatch workflows.

1.  Go to **User Settings** → **Developer settings** → **Personal access tokens**.
2.  Click **Generate new token** (Classic), name it (e.g., `push-to-azure`), and set an expiration.
3.  Under **Scopes**, select:
    - `repo` (full control of private repos)
    - `workflow` (manage GitHub Actions workflows)

![The image shows the GitHub Developer Settings page for managing personal access tokens, with options to generate new tokens and a list of existing tokens with their expiration dates.](https://kodekloud.com/kk-media/image/upload/v1752867780/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Orchestration-of-GitHub-Actions-and-Azure-Pipelines/github-developer-settings-personal-access-tokens.jpg)

![The image shows a GitHub settings page for creating a new personal access token, with various scopes and permissions options listed for selection.](https://kodekloud.com/kk-media/image/upload/v1752867781/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Orchestration-of-GitHub-Actions-and-Azure-Pipelines/github-settings-personal-access-token.jpg)

> [!important]
> **Warning**
>
> Store your PAT securely. After you copy it, you won’t be able to view it again.
> Do not commit it to your repo or share it in plain text.

## 3\. Modify the GitHub Actions Workflow

Open `.github/workflows/main.yml`. The existing trigger section is:

```
name: Deploy to Azure
on:
  push:
    branches: [ main ]
  workflow_dispatch:
```

To enable API-driven dispatches, add `repository_dispatch:`:

```
name: Deploy to Azure
on:
  push:
    branches: [ main ]
  repository_dispatch:
  workflow_dispatch:


env:
  AZURE_WEBAPP_NAME: kodekloudcoffee
  AZURE_WEBAPP_PACKAGE_PATH: '.'
  NODE_VERSION: '20.x'


permissions:
  contents: read


jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      - name: Build and test
        run: |
          npm install
          npm run build --if-present
          npm test --if-present
```

Commit and push this change to the `main` branch.

## 4\. Configure Azure Pipelines

In Azure DevOps, create a new pipeline connected to **KodeKloudCoffee**. Use the Starter pipeline template and set:

```
trigger:
- none


pool:
  vmImage: 'ubuntu-latest'


steps:
- script: echo Hello, world!
  displayName: 'Run a one-line script'
```

The `trigger: none` prevents automatic runs—this pipeline will only run manually or via API.

### 4.1 Add the PAT as a Secret Variable

1.  In your pipeline’s **Variables** tab, add `github_token`.
2.  Paste the PAT and mark it as **secret**.
3.  Save and close.

## 5\. Dispatch GitHub Actions from Azure Pipelines

Replace the starter step with a PowerShell task that sends a `repository_dispatch` event:

```
trigger:
- none


pool:
  vmImage: 'ubuntu-latest'


steps:
- task: PowerShell@2
  inputs:
    targetType: 'inline'
    script: |
      $body = '{ "ref": "main" }'
      $headers = @{
        'Authorization'        = "Bearer $env:github_token"
        'Accept'               = 'application/vnd.github+json'
        'X-GitHub-Api-Version' = '2022-11-28'
      }
      Invoke-RestMethod `
        -Uri 'https://api.github.com/repos/jeremykodekloud/KodeKloudCoffee/actions/workflows/main.yml/dispatches' `
        -Method POST `
        -Headers $headers `
        -Body $body `
        -ContentType 'application/json' `
        -ErrorAction Stop
  displayName: 'Trigger GitHub Actions via Repository Dispatch'
```

Run the pipeline. It will call the GitHub API and start the **Deploy to Azure** job.

![The image shows a GitHub Actions page for a repository named "KodeKloudCoffee," displaying a list of workflow runs with their statuses and details.](https://kodekloud.com/kk-media/image/upload/v1752867782/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Orchestration-of-GitHub-Actions-and-Azure-Pipelines/github-actions-kodekloudcoffee-workflows-2.jpg)

Refresh the Actions tab to see the new dispatch run:

![The image shows a GitHub Actions page displaying a list of workflow runs, including "Deploy to Azure" and updates to "azure-pipelines.yml."](https://kodekloud.com/kk-media/image/upload/v1752867783/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Orchestration-of-GitHub-Actions-and-Azure-Pipelines/github-actions-workflow-runs-azure.jpg)

## 6\. Managing Deployment Gates

Now you can control deployments from Azure Pipelines—perfect for environments requiring approvals.

| Trigger Type           | Invocation Source                | Use Case                      |
| ---------------------- | -------------------------------- | ----------------------------- |
| push                   | GitHub on `main` commits         | Automatic CI builds           |
| workflow\\\_dispatch   | GitHub UI manual run             | Ad-hoc runs                   |
| repository\\\_dispatch | API (Azure Pipelines or scripts) | Controlled, gated deployments |

> [!important]
> **Note**
>
> To enforce strict gating, remove `push` and `workflow_dispatch` triggers and rely solely on `repository_dispatch`.

![The image shows an Azure DevOps Pipelines interface with a recently run pipeline named "jeremymorgankodekloud.KodeKloudCoffee" that was manually triggered.](https://kodekloud.com/kk-media/image/upload/v1752867784/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Orchestration-of-GitHub-Actions-and-Azure-Pipelines/azure-devops-pipelines-jeremymorgankodekloud.jpg)

---

## Links and References

- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Azure Pipelines YAML reference](https://docs.microsoft.com/azure/devops/pipelines/yaml-schema)
- [Authenticating with the REST API](https://docs.github.com/rest/overview/other-authentication-methods)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/f114915a-674b-4c1a-a7f2-7a5444db938b/lesson/b0ec72bc-1bdb-4cdc-8e8e-3d88f34be181)**
>
> Watch video content
