# Creating repository in Azure Repos - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Work-with-Azure-Repos-and-GitHub/Creating-repository-in-Azure-Repos)

---

## Table of Contents

- Creating repository in Azure Repos
  - 1. Create an Azure DevOps Project
  - 2. Initialize and Push to GitHub
  - 3. Connect GitHub to Azure Boards
  - 4. Set Up an Azure Pipeline
  - Links and References
  - Watch Video
    - a. Create the repository on GitHub
    - b. Clone, add application code, and push

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Work with Azure Repos and GitHub

# Creating repository in Azure Repos

In this guide, you will:

1.  Create an Azure DevOps project
2.  Initialize and push a GitHub repo
3.  Connect GitHub to Azure Boards
4.  Configure an Azure Pipeline

---

## 1\. Create an Azure DevOps Project

First, sign in to Azure DevOps and [create a new project](https://docs.microsoft.com/azure/devops/organizations/projects/create-project?view=azure-devops) named **CoolWebsite**. We’ll use GitHub as the primary source control.

> [!important]
> **Note**
>
> If you prefer to host code in Azure Repos, add it as a remote:
>
> ```
> git remote add origin https://<org>@dev.azure.com/<org>/CoolWebsite/_git/CoolWebsite
> ```

---

## 2\. Initialize and Push to GitHub

### a. Create the repository on GitHub

- In GitHub, click **New repository**.
- Name: `CoolWebsite`
- Visibility: **Private**
- Default branch: `main`

> [!important]
> **Warning**
>
> Ensure you have [Git](https://git-scm.com/) installed and authenticated with your GitHub account before proceeding.

### b. Clone, add application code, and push

Clone the new repo locally:

```
git clone https://github.com/jeremykodekloud/CoolWebsite.git
```

Copy your application files into the `CoolWebsite` folder, then run:

| Action         | Command                          |
| -------------- | -------------------------------- |
| Stage changes  | `git add .`                      |
| Commit changes | `git commit -m "Initial commit"` |
| Push to remote | `git push -u origin main`        |

Refresh the GitHub page to see your files.

---

## 3\. Connect GitHub to Azure Boards

1.  In Azure DevOps, navigate to **Project Settings** → **GitHub Connections** → **Connect to your GitHub account**.
2.  Choose your organization (e.g., `KodeKloud`) and click **Save**.

![The image shows a web interface for connecting GitHub repositories to Azure Boards, with a sidebar for project settings and a pop-up window indicating a saving process.](https://kodekloud.com/kk-media/image/upload/v1752868147/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Creating-repository-in-Azure-Repos/github-azure-boards-connection-interface.jpg)

3.  You’ll be redirected to GitHub to install the Azure Boards app. Grant access only to the repositories you need:

![The image shows a GitHub settings page for installing an Azure Boards app, with options for repository access and a "Danger zone" section for suspending or uninstalling the app.](https://kodekloud.com/kk-media/image/upload/v1752868148/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Creating-repository-in-Azure-Repos/github-settings-azure-boards-app.jpg)

4.  Back in Azure DevOps, confirm the connection under **GitHub Connections**:

![The image shows a GitHub connection settings page in Azure DevOps, displaying a connection to a GitHub repository. The sidebar includes options for project settings, boards, pipelines, and more.](https://kodekloud.com/kk-media/image/upload/v1752868150/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Creating-repository-in-Azure-Repos/github-connection-settings-azure-devops.jpg)

---

## 4\. Set Up an Azure Pipeline

1.  Go to **Pipelines** and click **Create Pipeline**.

![The image shows an Azure DevOps interface with a prompt to "Create your first Pipeline," featuring a button to initiate the process. The sidebar includes options like Overview, Boards, Repos, and more.](https://kodekloud.com/kk-media/image/upload/v1752868151/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Creating-repository-in-Azure-Repos/azure-devops-create-pipeline-interface.jpg)

2.  Select **GitHub**, pick the `CoolWebsite` repo, and authorize the Azure Pipelines app.
3.  Choose the appropriate template (e.g., **ASP.NET**).

![The image shows an Azure DevOps interface where a user is configuring a new pipeline, with options for different project types like ASP.NET and Xamarin.](https://kodekloud.com/kk-media/image/upload/v1752868153/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Creating-repository-in-Azure-Repos/azure-devops-new-pipeline-configuration.jpg)

4.  Replace the auto-generated YAML with this `azure-pipelines.yml` in your repo root:

```
trigger:
- main


pool:
  vmImage: 'windows-latest'
  name: 'KodeKloudCustomer'


variables:
  solution: '**/*.sln'
  buildPlatform: 'Any CPU'
  buildConfiguration: 'Release'


steps:
- task: NuGetToolInstaller@1


- task: NuGetCommand@2
  inputs:
    restoreSolution: '$(solution)'


- task: VSBuild@1
  inputs:
    solution: '$(solution)'
    msbuildArgs: '/p:DeployOnBuild=true /p:WebPublishMethod=Package /p:PackageAsSingleFile=true /p:SkipInvalidConfigurations=true /p:PackageLocation="$(build.artifactStagingDirectory)"'
    platform: '$(buildPlatform)'
    configuration: '$(buildConfiguration)'


- task: VSTest@2
  inputs:
    platform: '$(buildPlatform)'
    configuration: '$(buildConfiguration)'
```

5.  Commit and push. Each push to `main` triggers a new build. Verify your YAML and commit history:

![The image shows a GitHub repository page titled "CoolWebsite," displaying a list of files and folders with commit messages and details. The sidebar provides information about the repository, including languages used and suggested workflows.](https://kodekloud.com/kk-media/image/upload/v1752868154/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Creating-repository-in-Azure-Repos/github-repo-coolwebsite-files-sidebar.jpg)

---

You’ve successfully set up your **CoolWebsite** repository with Azure Boards and Pipelines. Explore [Azure Boards](https://docs.microsoft.com/azure/devops/boards/?view=azure-devops) and [Azure Pipelines](https://docs.microsoft.com/azure/devops/pipelines/?view=azure-devops) for more integrations.

---

## Links and References

- [Azure DevOps Documentation](https://docs.microsoft.com/azure/devops/?view=azure-devops)
- [GitHub Docs](https://docs.github.com/)
- [Azure Boards Overview](https://docs.microsoft.com/azure/devops/boards/?view=azure-devops)
- [Azure Pipelines Overview](https://docs.microsoft.com/azure/devops/pipelines/?view=azure-devops)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/11f92647-aa61-4572-85b2-a96b279268f5/lesson/4a3b3809-3dc4-42b4-b63d-969f3d79ff8b)**
>
> Watch video content
