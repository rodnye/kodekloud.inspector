# Exploring Classic Pipelines - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Design-and-Implement-Pipelines/Exploring-Classic-Pipelines)

---

## Table of Contents

- Exploring Classic Pipelines
  - Why Choose Classic Pipelines?
  - Step 1: Selecting Your Source Repository
  - Step 2: Picking a Template
  - Step 3: Configuring Tasks and Environments
  - Step 4: Defining Triggers
  - Classic vs. YAML Pipelines
  - Best Practices for Classic Pipelines
  - Links and References
  - Watch Video

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Design and Implement Pipelines

# Exploring Classic Pipelines

In this lesson, we’ll dive into **Azure DevOps Classic Pipelines**, a GUI-driven approach to building and releasing your applications. If you prefer a visual editor over hand-crafting YAML files, Classic Pipelines deliver an intuitive drag-and-drop experience for designing CI/CD workflows.

![The image is a diagram introducing classic pipelines, showing a connection between Azure DevOps and a CI/CD pipeline, highlighting a user-friendly graphical user interface (GUI).](https://kodekloud.com/kk-media/image/upload/v1752867846/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Exploring-Classic-Pipelines/azure-devops-cicd-pipeline-diagram.jpg)

By the end of this guide, you’ll understand:

- Key features and benefits of Classic Pipelines
- Step-by-step creation of a pipeline
- How to decide between Classic and YAML models
- Best practices for maintaining a robust CI/CD process

## Why Choose Classic Pipelines?

Classic Pipelines excel at lowering the barrier to entry for continuous integration and delivery:

- **Visual Configuration**  
  Configure build and release tasks in a wizard-style editor.
- **Rapid Setup**  
  Leverage prebuilt templates for .NET, Java, Docker, and more.
- **Seamless Azure Integration**  
  Connect to Azure services like App Service, AKS, and Key Vault with a few clicks.

> [!important]
> **Note**
>
> Classic Pipelines are perfect for teams that need a fast, low-code approach. For long-term maintainability, consider storing pipeline definitions in source control via YAML.

![The image shows a screenshot of a classic pipeline interface for web app release, highlighting tasks like IIS deployment and PowerShell scripts. It also lists benefits such as ease of use, visual configuration, and integration with Azure services.](https://kodekloud.com/kk-media/image/upload/v1752867847/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Exploring-Classic-Pipelines/web-app-release-pipeline-interface-screenshot.jpg)

## Step 1: Selecting Your Source Repository

1.  Open your Azure DevOps project and navigate to **Pipelines > Releases** (or **Builds**).
2.  Click **New pipeline** and choose **Classic Editor**.
3.  Select your source: Azure Repos Git, GitHub, Bitbucket, or other supported repositories.

![The image is a guide for creating a classic pipeline, showing step 1: selecting a source, with options like Azure Repos Git and GitHub. It includes dropdowns for team project, repository, and default branch selection.](https://kodekloud.com/kk-media/image/upload/v1752867848/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Exploring-Classic-Pipelines/classic-pipeline-guide-step1-source-selection.jpg)

## Step 2: Picking a Template

Azure DevOps ships with starter templates to kick-start your pipeline:

- .NET Desktop
- Android
- Docker Container
- Node.js

Select the template that best matches your tech stack—you can always customize tasks later.

![The image shows a guide for creating a classic pipeline with steps listed on the left and a template selection interface on the right, featuring options like .NET Desktop, Android, and Docker container.](https://kodekloud.com/kk-media/image/upload/v1752867849/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Exploring-Classic-Pipelines/classic-pipeline-guide-template-selection.jpg)

## Step 3: Configuring Tasks and Environments

Drag and drop tasks to define your build and release process:

- Compile or build artifacts
- Run unit/integration tests
- Package outputs (ZIP, WAR, Docker image)
- Deploy to environments (Dev, QA, Production)

![The image shows a guide for creating a classic pipeline with four steps, highlighting "Step 03: Configuring the Pipeline," alongside a screenshot of a pipeline configuration interface.](https://kodekloud.com/kk-media/image/upload/v1752867850/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Exploring-Classic-Pipelines/classic-pipeline-guide-step-03-configuring.jpg)

## Step 4: Defining Triggers

Set triggers to automate your pipeline runs:

- **CI Trigger**: Automatically start the build on each commit.
- **Scheduled Trigger**: Run nightly or at specific intervals.
- **Manual Release**: Deploy on demand to any environment.

## Classic vs. YAML Pipelines

Azure DevOps offers two pipeline models—choose the one that aligns with your team’s workflow:

| Feature         | Classic Pipelines                       | YAML Pipelines                             |
| --------------- | --------------------------------------- | ------------------------------------------ |
| Definition      | GUI-driven visual editor                | Code-defined in a YAML file                |
| Version Control | Configuration stored in the portal      | Pipeline as code stored alongside your app |
| Flexibility     | Quick setup with standard templates     | Full control over branching and reuse      |
| Best for        | Teams new to CI/CD, non-technical users | Complex workflows, infrastructure as code  |

> [!important]
> **Warning**
>
> Classic Pipelines offer ease of use, but for advanced scenarios and full traceability, **YAML pipelines** provide better versioning, branching, and reuse across projects.

![The image illustrates the transition from Classic to YAML pipelines, highlighting better control and scalability, and includes steps like understanding YAML syntax and converting existing pipelines.](https://kodekloud.com/kk-media/image/upload/v1752867851/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Exploring-Classic-Pipelines/classic-to-yaml-pipelines-transition.jpg)

## Best Practices for Classic Pipelines

- **Modular Design**  
  Group related tasks into [task groups](https://learn.microsoft.com/azure/devops/pipelines/library/task-groups) or reusable templates.
- **Regular Updates & Testing**  
  Keep tasks and agents up to date to leverage security patches and new features.
- **Security & Compliance**  
  Audit pipeline permissions, enforce branch policies, and scan for vulnerabilities.

![The image outlines best practices for using classic pipelines, highlighting "Modular design" and "Regular updates and testing" with corresponding icons.](https://kodekloud.com/kk-media/image/upload/v1752867852/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Exploring-Classic-Pipelines/best-practices-classic-pipelines-modular-design.jpg)

## Links and References

- [Azure DevOps Classic pipelines](https://learn.microsoft.com/azure/devops/pipelines/classic)
- [Get started with YAML pipelines](https://learn.microsoft.com/azure/devops/pipelines/get-started/yaml)
- [Microsoft Learn: CI/CD with Azure Pipelines](https://learn.microsoft.com/training/modules/ci-cd-pipelines)
- [Task groups in Azure Pipelines](https://learn.microsoft.com/azure/devops/pipelines/library/task-groups)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/55cf24db-89bc-4b93-bb75-7350d1593073/lesson/198e69f5-a234-4c74-8e05-061aea599d0b)**
>
> Watch video content
