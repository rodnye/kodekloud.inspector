# Demo Generating Release Notes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Configure-Activity-Traceability-and-Flow-of-Work/Demo-Generating-Release-Notes)

---

## Table of Contents

- Demo Generating Release Notes
  - 1. Install the “Generate Release Notes (Crossplatform)” Extension
  - 2. Create a Starter Pipeline
  - 3. Add the Generate Release Notes Task
  - 4. Edit and View in Visual Studio Code
  - 5. Review Logs and Verify the Wiki
  - Links and References
  - Watch Video

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Configure Activity Traceability and Flow of Work

# Demo Generating Release Notes

In this guide, you’ll learn how to automatically generate Markdown-based release notes for your .NET Web API application and publish them to an Azure DevOps Wiki. By integrating the **Generate Release Notes (Crossplatform)** extension into your CI pipeline, you can maintain an up-to-date, code-based wiki—no manual steps required.

We’ll use a sample project called **TestWeb** and demonstrate:

- Installing the release-notes extension
- Creating and configuring an Azure Pipelines YAML
- Generating, copying, and committing the release notes

![The image shows a README file in an Azure DevOps Wiki, detailing a .NET Web API application called TestWeb, with sections on description, installation, usage, contributing, and licensing.](https://kodekloud.com/kk-media/image/upload/v1752867369/notes-assetshttps://kodekloud.com/kk-media/image/upload/v1752867369/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Demo-Generating-Release-Notes/azure-devops-wiki-readme-testweb.jpg)

---

## 1\. Install the “Generate Release Notes (Crossplatform)” Extension

1.  Go to the [Visual Studio Marketplace](https://marketplace.visualstudio.com).
2.  Search for **Generate Release Notes (Crossplatform)** by Richard Fennell.
3.  Click **Get it Free** and select your Azure DevOps organization.

![The image shows a webpage from the Visual Studio Marketplace for a tool called "Generate Release Notes (Crossplatform)" by Richard Fennell. It includes an overview, installation details, and documentation for generating Markdown release notes.](https://kodekloud.com/kk-media/image/upload/v1752867371/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Demo-Generating-Release-Notes/generate-release-notes-visual-studio.jpg)

> [!important]
> **Note**
>
> If you’re running Azure DevOps Server (on-prem), download the extension package directly from its Marketplace page and upload it to your server.

![The image shows a Visual Studio Marketplace page for downloading the "Generate Release Notes (Crossplatform)" extension, with options to select an Azure DevOps organization.](https://kodekloud.com/kk-media/image/upload/v1752867371/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Demo-Generating-Release-Notes/visual-studio-marketplace-generate-release-notes.jpg)

---

## 2\. Create a Starter Pipeline

1.  In Azure DevOps, navigate to **Pipelines** → **Create Pipeline**.
2.  Choose **Azure Repos** → your **TestWeb** repository.
3.  Select **Starter pipeline** to scaffold a basic `azure-pipelines.yml`.

```
# azure-pipelines.yml (Starter)
trigger:
  - master


pool:
  vmImage: 'windows-latest'


steps:
  - script: echo Hello, world!
    displayName: 'Run a one-line script'
```

Replace the sample scripts with .NET build and test steps:

```
# azure-pipelines.yml (Build + Test)
trigger:
  - master


pool:
  vmImage: 'windows-latest'


steps:
  - task: UseDotNet@2
    inputs:
      packageType: 'sdk'
      version: '1.0.x'
      installationPath: '$(Agent.ToolsDirectory)/dotnet'


  - script: dotnet --version
    displayName: 'Check .NET Version'


  - script: dotnet restore
    displayName: 'Restore dependencies'


  - script: dotnet build --configuration Release --no-restore
    displayName: 'Build project'


  - script: dotnet test --no-build --verbosity normal
    displayName: 'Run tests'
```

Save and run the pipeline. After it succeeds, you’ll see a successful build run:

![The image shows an Azure DevOps pipeline interface with a successful job run for a project named "TestWeb." The pipeline was triggered by a user and completed in 16 seconds.](https://kodekloud.com/kk-media/image/upload/v1752867373/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Demo-Generating-Release-Notes/azure-devops-pipeline-success-testweb.jpg)

---

## 3\. Add the Generate Release Notes Task

Extend your YAML to generate and publish release notes in four steps:

```
# azure-pipelines.yml (Generate & Publish Release Notes)
trigger:
  - master


pool:
  vmImage: 'windows-latest'


steps:
  # Build and Test (from previous section)
  - task: UseDotNet@2
    inputs:
      packageType: 'sdk'
      version: '1.0.x'
      installationPath: '$(Agent.ToolsDirectory)/dotnet'
  - script: dotnet restore; dotnet build --configuration Release --no-restore; dotnet test --no-build
    displayName: 'Restore, Build, and Test'


  # 1. Generate release notes in repo root
  - task: XplatGenerateReleaseNotes@4
    inputs:
      outputFile: '$(Build.Repository.LocalPath)\releasenotes_$(Build.BuildId).md'
      templateLocation: 'Inline'
      inlineTemplate: |
        ## Build {{buildDetails.buildNumber}}
        **Branch:** {{buildDetails.sourceBranch}}
        **Author:** {{buildDetails.requestedFor.displayName}}
        **Commit:** {{buildDetails.sourceVersion}}
      dumpPayloadToConsole: false
      replaceFile: true


  # 2. Copy to wiki folder
  - task: CopyFiles@2
    displayName: 'Copy Release Notes to Wiki Folder'
    inputs:
      SourceFolder: '$(Build.Repository.LocalPath)'
      Contents: 'releasenotes_$(Build.BuildId).md'
      TargetFolder: '$(Build.Repository.LocalPath)/wiki'
      CleanTargetFolder: true
      OverWrite: true


  # 3. Clean up temporary file
  - script: del "$(Build.Repository.LocalPath)\releasenotes_$(Build.BuildId).md"
    displayName: 'Delete Temporary Release Notes File'


  # 4. Commit back to wiki (skip CI)
  - task: CmdLine@2
    displayName: 'Commit Release Notes to Wiki'
    inputs:
      script: |
        git checkout master
        git pull
        git config --global user.email "you@example.com"
        git config --global user.name "Your Name"
        git add wiki/releasenotes_$(Build.BuildId).md
        git commit -m "[skip ci] Update release notes for build $(Build.BuildId)"
        git push origin HEAD:master
```

Run the updated pipeline and inspect the release-notes generation logs:

![The image shows an Azure DevOps pipeline interface with a list of jobs and their statuses on the left, and detailed log output of a task called "XplatGenerateReleaseNotes" on the right.](https://kodekloud.com/kk-media/image/upload/v1752867374/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Demo-Generating-Release-Notes/azure-devops-pipeline-jobs-logs.jpg)

---

## 4\. Edit and View in Visual Studio Code

For easier editing, clone the repo locally and open **azure-pipelines.yml** in VS Code. You’ll find all tasks, including the release-notes steps, in one file.

![The image shows a Visual Studio Code interface with a file explorer on the left, highlighting the "azure-pipelines.yml" file, and the file's content displayed on the right.](https://kodekloud.com/kk-media/image/upload/v1752867375/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Demo-Generating-Release-Notes/visual-studio-code-file-explorer-azure-pipelines.jpg)

---

## 5\. Review Logs and Verify the Wiki

After another run, confirm the copy step output:

![The image shows an Azure DevOps pipeline interface with a list of jobs and their statuses on the left, and detailed log output for a specific job, "XplatGenerateReleaseNotes," on the right.](https://kodekloud.com/kk-media/image/upload/v1752867376/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Demo-Generating-Release-Notes/azure-devops-pipeline-jobs-logs-2.jpg)

Cleaning target folder: C:\\agent_work\\7\\s\\wiki Copying C:\\agent_work\\7\\releasenotes_1216.md to C:\\agent_work\\7\\s\\wiki\\releasenotes_1216.md

Finally, navigate to your Azure DevOps Wiki—each build now publishes a new `releasenotes_<BuildId>.md` page:

![The image shows a README file in an Azure DevOps Wiki, detailing a .NET Web API application called TestWeb, with sections on description, installation, usage, contributing, and licensing.](https://kodekloud.com/kk-media/image/upload/v1752867369/notes-assetshttps://kodekloud.com/kk-media/image/upload/v1752867369/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Demo-Generating-Release-Notes/azure-devops-wiki-readme-testweb.jpg)

> [!important]
> **Note**
>
> This template shows build number, branch, author, and commit. Extend the Handlebars template to include work items, pull requests, changelogs, or custom fields from Azure Boards.

---

With this setup, every commit to `master` triggers a pipeline that generates and publishes release notes to your Azure DevOps Wiki—fully automated, CI-safe, and effortless to maintain.

## Links and References

- [Generate Release Notes Extension (MarketPlace)](https://marketplace.visualstudio.com/items?itemName=richardfennellBM.BM-VSTS-GenerateReleaseNotes)
- [Azure Pipelines YAML Reference](https://docs.microsoft.com/azure/devops/pipelines/yaml-schema)
- [Azure DevOps Wiki Documentation](https://docs.microsoft.com/azure/devops/project/wiki/wiki-overview)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/503e97d4-be52-440b-8a4e-8610d1eca6ed/lesson/f3d0bf76-5e14-43d4-a4d0-abc85e00b331)**
>
> Watch video content
