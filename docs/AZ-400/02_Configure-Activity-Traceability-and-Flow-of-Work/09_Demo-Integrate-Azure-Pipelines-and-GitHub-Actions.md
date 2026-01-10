# Demo Integrate Azure Pipelines and GitHub Actions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Configure-Activity-Traceability-and-Flow-of-Work/Demo-Integrate-Azure-Pipelines-and-GitHub-Actions)

---

## Table of Contents

- Demo Integrate Azure Pipelines and GitHub Actions
  - 1. Connect GitHub to Azure DevOps
  - 2. Generate a Personal Access Token (PAT)
  - 3. Create an Azure Pipeline
  - 4. Configure an Agent Pool
  - 5. Set Up the GitHub Action
  - 6. Configure Repository Secrets
  - 7. Verify Continuous Integration
  - References
  - Watch Video

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Configure Activity Traceability and Flow of Work

# Demo Integrate Azure Pipelines and GitHub Actions

In this guide, you’ll learn how to trigger an Azure Pipeline automatically from a GitHub Action whenever you push code to the `main` branch. By the end, you’ll have a seamless CI flow between GitHub and Azure DevOps.

---

## 1\. Connect GitHub to Azure DevOps

1.  In your Azure DevOps project (e.g., **SimpleWebAPI**), navigate to **Project Settings** → **GitHub Connections**.
2.  Click **Connect Your GitHub Account** and authorize Azure DevOps to access your repos.
3.  Select the **SimpleWebAPI** repository and hit **Save**, then approve the installation in GitHub.

![The image shows an Azure DevOps project dashboard for "SimpleWebAPI," displaying project details, statistics, and navigation options on the left sidebar.](https://kodekloud.com/kk-media/image/upload/v1752867377/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Demo-Integrate-Azure-Pipelines-and-GitHub-Actions/azure-devops-simplewebapi-dashboard.jpg)

![The image shows a webpage for connecting GitHub with Azure Boards, featuring a sidebar with project settings and an illustration of a person watering a plant.](https://kodekloud.com/kk-media/image/upload/v1752867379/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Demo-Integrate-Azure-Pipelines-and-GitHub-Actions/github-azure-boards-connection-webpage.jpg)

![The image shows a GitHub permissions page for installing Azure Boards, with options to select repositories and permissions for accessing metadata, code, and external domains. There are buttons for approving or rejecting the installation.](https://kodekloud.com/kk-media/image/upload/v1752867380/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Demo-Integrate-Azure-Pipelines-and-GitHub-Actions/github-permissions-azure-boards-installation.jpg)

---

## 2\. Generate a Personal Access Token (PAT)

You’ll need a PAT with permissions to queue builds. In Azure DevOps:

1.  Click your user icon → **Personal Access Tokens** → **New Token**.
2.  Give it a name, expiration date, and select scopes:
    - **Build (read & execute)**
    - **Token administration (read & manage)**
3.  Create the token and copy it immediately.

> [!important]
> **Warning**
>
> You will **only** see the PAT value once. Store it securely in your password manager.

![The image shows a screenshot of the Azure DevOps user settings page, specifically the "Personal Access Tokens" section, listing various tokens with their status and expiration dates.](https://kodekloud.com/kk-media/image/upload/v1752867381/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Demo-Integrate-Azure-Pipelines-and-GitHub-Actions/azure-devops-personal-access-tokens-screenshot.jpg)

---

## 3\. Create an Azure Pipeline

1.  In **SimpleWebAPI**, select **Pipelines** → **Create Pipeline**.
2.  Choose **GitHub** and pick **SimpleWebAPI**. Approve the Azure Pipelines app if prompted.
3.  Opt for **Starter Pipeline** to get a minimal YAML template.

![The image shows an Azure DevOps dashboard with a list of projects, including "SimpleWebAPI," "Customer Portal," "Test Project," and "jeremy." The interface includes options for creating a new project and filtering existing ones.](https://kodekloud.com/kk-media/image/upload/v1752867382/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Demo-Integrate-Azure-Pipelines-and-GitHub-Actions/azure-devops-dashboard-projects-list.jpg)

![The image shows an Azure DevOps interface for creating a new pipeline, asking "Where is your code?" with options for Azure Repos Git, Bitbucket Cloud, GitHub, and GitHub Enterprise Server. The left sidebar includes navigation options like Overview, Boards, Repos, and Pipelines.](https://kodekloud.com/kk-media/image/upload/v1752867383/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Demo-Integrate-Azure-Pipelines-and-GitHub-Actions/azure-devops-new-pipeline-interface.jpg)

![The image shows an Azure DevOps interface for creating a new pipeline, with a section to select a repository. The left sidebar includes options like Overview, Boards, Repos, and Pipelines.](https://kodekloud.com/kk-media/image/upload/v1752867384/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Demo-Integrate-Azure-Pipelines-and-GitHub-Actions/azure-devops-new-pipeline-interface-2.jpg)

![The image shows an Azure DevOps interface for configuring a new pipeline, with options for different project types like ASP.NET, .NET Core, and Xamarin.](https://kodekloud.com/kk-media/image/upload/v1752867385/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Demo-Integrate-Azure-Pipelines-and-GitHub-Actions/azure-devops-new-pipeline-configuration.jpg)

```
# azure-pipelines.yml
# Starter pipeline: build and deploy your code.
trigger:
  - main


pool:
  vmImage: ubuntu-latest


steps:
  - script: echo Hello, world!
    displayName: 'Run a one-line script'


  - script: |
      echo Add other tasks to build, test, and deploy your project.
      echo See https://aka.ms/yaml
    displayName: 'Run a multi-line script'
```

For more customization, see the [Azure Pipelines YAML schema](https://docs.microsoft.com/azure/devops/pipelines/yaml-schema).

---

## 4\. Configure an Agent Pool

If you use self-hosted agents:

1.  Go to **Project Settings** → **Agent pools** and note your pool name (e.g., `KodeKloudCustomer`).
2.  Update the `pool` block in your YAML:

```
# azure-pipelines.yml
trigger:
  - main


pool:
  name: 'KodeKloudCustomer'


steps:
  - script: echo Hello, world!
    displayName: 'Run a one-line script'

  - script: |
      echo Add other tasks to build, test, and deploy your project.
      echo See https://aka.ms/yaml
    displayName: 'Run a multi-line script'
```

> [!important]
> **Note**
>
> When targeting a self-hosted pool, remove the `vmImage` setting. Jobs run on your specified agents.

![The image shows a screenshot of the Azure DevOps interface, specifically the "Agent pools" section under "Project Settings," displaying details of an agent named "KodeKloudAgent1" which is online and idle.](https://kodekloud.com/kk-media/image/upload/v1752867386/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Demo-Integrate-Azure-Pipelines-and-GitHub-Actions/azure-devops-agent-pools-kodekloudagent1.jpg)

Save and queue your pipeline. You should see a successful run:

![The image shows an Azure DevOps pipeline interface with a build summary for a project called "SimpleWebAPI." It displays details such as the trigger, repository, branch, and job status.](https://kodekloud.com/kk-media/image/upload/v1752867387/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Demo-Integrate-Azure-Pipelines-and-GitHub-Actions/azure-devops-pipeline-simplewebapi-summary.jpg)

---

## 5\. Set Up the GitHub Action

1.  In your **SimpleWebAPI** GitHub repo, go to **Actions** → **Set up a workflow yourself**.
2.  This creates a blank file at `.github/workflows/main.yml`. Replace its contents with:

```
# .github/workflows/trigger-azure-pipeline.yml
name: Trigger Azure Pipeline


on:
  push:
    branches:
      - main


jobs:
  trigger-pipeline:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Azure DevOps Pipeline
        uses: azure/pipelines@v1
        with:
          azure-devops-project-url: ${{ secrets.AZURE_DEVOPS_PROJECT_URL }}
          azure-pipeline-name: 'jeremykodekloud.SimpleWebAPI'
          azure-devops-token: ${{ secrets.AZURE_DEVOPS_TOKEN }}
```

![The image shows a GitHub Actions setup page for a repository, suggesting workflows for building and deploying applications, such as a .NET Desktop app.](https://kodekloud.com/kk-media/image/upload/v1752867388/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Demo-Integrate-Azure-Pipelines-and-GitHub-Actions/github-actions-setup-workflows-dotnet.jpg)

![The image shows a GitHub interface where a user is editing a YAML file for a workflow in a repository. The right side displays a marketplace with featured actions like setting up Node.js and Java JDK environments.](https://kodekloud.com/kk-media/image/upload/v1752867389/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Demo-Integrate-Azure-Pipelines-and-GitHub-Actions/github-yaml-workflow-editing-marketplace.jpg)

---

## 6\. Configure Repository Secrets

In GitHub, go to **Settings** → **Secrets and variables** → **Actions** and add:

| Secret Name                       | Value Example                               |
| --------------------------------- | ------------------------------------------- |
| AZURE\\\_DEVOPS\\\_PROJECT\\\_URL | `https://dev.azure.com/yourOrg/yourProject` |
| AZURE\\\_DEVOPS\\\_TOKEN          | _(your Azure DevOps PAT)_                   |

![The image shows a GitHub repository settings page where a new secret is being added under "Actions secrets." The secret is named "AZURE_DEVOPS_PROJECT_URL" with a URL provided in the secret field.](https://kodekloud.com/kk-media/image/upload/v1752867390/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Demo-Integrate-Azure-Pipelines-and-GitHub-Actions/github-repo-settings-actions-secret.jpg)

![The image shows a GitHub repository settings page for managing "Actions secrets and variables," with options to add new repository secrets.](https://kodekloud.com/kk-media/image/upload/v1752867391/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Demo-Integrate-Azure-Pipelines-and-GitHub-Actions/github-repo-settings-actions-secrets.jpg)

![The image shows a GitHub repository settings page, specifically the "Secrets and variables" section, with two repository secrets listed: "AZURE_DEVOPS_PROJECT_URL" and "AZURE_DEVOPS_TOKEN".](https://kodekloud.com/kk-media/image/upload/v1752867392/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Demo-Integrate-Azure-Pipelines-and-GitHub-Actions/github-repo-settings-secrets-variables.jpg)

Commit your workflow to `main`. The GitHub Action triggers immediately, and you should see a corresponding run in Azure Pipelines.

![The image shows an Azure DevOps pipeline run summary for a project named "SimpleWebAPI," indicating a successful job execution. The pipeline was triggered by a user and completed in 14 seconds.](https://kodekloud.com/kk-media/image/upload/v1752867393/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Demo-Integrate-Azure-Pipelines-and-GitHub-Actions/azure-devops-simplewebapi-pipeline-summary.jpg)

![The image shows a GitHub Actions workflow summary with a successful build job and annotations indicating warnings about deprecated Node.js versions and commands.](https://kodekloud.com/kk-media/image/upload/v1752867393/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Demo-Integrate-Azure-Pipelines-and-GitHub-Actions/github-actions-workflow-success-warnings.jpg)

![The image shows an Azure DevOps pipeline interface with a list of recent pipeline runs for a project named "SimpleWebAPI," all of which have successfully completed.](https://kodekloud.com/kk-media/image/upload/v1752867394/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Demo-Integrate-Azure-Pipelines-and-GitHub-Actions/azure-devops-pipeline-simplewebapi-successful.jpg)

---

## 7\. Verify Continuous Integration

Every push to `main` now triggers:

```
# Pull latest changes
git pull


# Make edits and commit
git add .
git commit -m "Fix typo in README"
git push
```

Watch the GitHub Action and Azure Pipeline execute in tandem—your CI process is fully automated!

---

## References

- [Azure DevOps Docs: Pipelines YAML](https://docs.microsoft.com/azure/devops/pipelines/yaml-schema)
- [GitHub Actions: Secrets](https://docs.github.com/actions/security-guides/encrypted-secrets)
- [Azure Pipelines GitHub Action](https://github.com/azure/pipelines)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/503e97d4-be52-440b-8a4e-8610d1eca6ed/lesson/bdbadfc9-4cdc-403e-89ea-8313e6ec094a)**
>
> Watch video content
