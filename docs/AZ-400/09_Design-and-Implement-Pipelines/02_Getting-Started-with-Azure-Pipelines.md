# Getting Started with Azure Pipelines - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Design-and-Implement-Pipelines/Getting-Started-with-Azure-Pipelines)

---

## Table of Contents

- Getting Started with Azure Pipelines
  - What Is Azure Pipelines?
  - Key Features
  - Continuous Integration, Delivery, and Testing
  - Supported Languages and Package Management
  - Prerequisites
  - Pricing Overview
  - Next Steps
  - Watch Video
    - 1. Seamless Git Integration
    - 2. Cross-Platform and Scalable
    - 3. Accelerating Release Cycles
    - 4. Enhanced Team Collaboration
    - 5. Language and Framework Agnostic
    - 6. Integration with Other Tools
    - Continuous Integration (CI)
    - Continuous Delivery (CD)
    - Continuous Testing and Shift-Left/Shift-Right Paradigms

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Design and Implement Pipelines

# Getting Started with Azure Pipelines

Automate your software delivery with Azure Pipelines, Microsoft’s cloud-hosted CI/CD service. In this guide, you’ll learn what Azure Pipelines is, how it fits into modern DevOps workflows, and why it’s essential for fast, reliable releases. By the end, you’ll know how to build, test, and deploy applications at scale.

## What Is Azure Pipelines?

Azure Pipelines automates the three core stages of continuous delivery:

- **Build:** Compile, package, and version your code.
- **Test:** Execute unit, integration, and automated tests.
- **Deploy:** Release to any cloud or on-premises environment.

![The image illustrates the Azure Pipelines process, showing stages of Build, Test, and Deploy, as part of a cloud service for automating CI/CD.](https://kodekloud.com/kk-media/image/upload/v1752867864/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Getting-Started-with-Azure-Pipelines/azure-pipelines-ci-cd-process-diagram.jpg)

Azure Pipelines fits into any DevOps toolchain, providing scalable, reliable automation for teams of all sizes.

## Key Features

### 1\. Seamless Git Integration

Connect to GitHub, Azure Repos, Bitbucket, or GitLab in minutes. Every push or pull request can trigger a pipeline, ensuring consistent automation.

![The image illustrates the integration of Azure Pipelines with any Git repository, featuring their respective icons.](https://kodekloud.com/kk-media/image/upload/v1752867865/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Getting-Started-with-Azure-Pipelines/azure-pipelines-git-repository-integration.jpg)

### 2\. Cross-Platform and Scalable

Run builds and deployments on Microsoft-hosted agents for Windows, Linux, and macOS—or bring your own agents. Scale from a single developer to hundreds of parallel jobs.

![The image illustrates that Azure Pipelines supports Windows, Linux, and macOS operating systems.](https://kodekloud.com/kk-media/image/upload/v1752867866/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Getting-Started-with-Azure-Pipelines/azure-pipelines-windows-linux-macos-support.jpg)

### 3\. Accelerating Release Cycles

Automate repetitive tasks to reduce human error and deliver features faster. Continuous integration and delivery enable rapid feedback loops.

![The image is a slide titled "Azure Pipelines – Why?" featuring a circular diagram with colorful gears, indicating the acceleration of release cycles.](https://kodekloud.com/kk-media/image/upload/v1752867866/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Getting-Started-with-Azure-Pipelines/azure-pipelines-why-circular-diagram.jpg)

### 4\. Enhanced Team Collaboration

Centralize build and release definitions, share artifacts, and monitor pipeline status—all in one platform to improve transparency and communication.

![The image is a slide titled "Azure Pipelines – Why?" featuring four colorful icons representing people, with the text "Enhances team collaboration" below them.](https://kodekloud.com/kk-media/image/upload/v1752867868/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Getting-Started-with-Azure-Pipelines/azure-pipelines-why-team-collaboration.jpg)

### 5\. Language and Framework Agnostic

Support for virtually any language, runtime, or framework gives you the freedom to choose the right tools for your applications.

![The image is a diagram illustrating Azure Pipelines, highlighting its support for multiple languages and frameworks. It features interconnected colored squares and language symbols.](https://kodekloud.com/kk-media/image/upload/v1752867869/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Getting-Started-with-Azure-Pipelines/azure-pipelines-multiple-languages-diagram.jpg)

### 6\. Integration with Other Tools

Connect Azure Pipelines to popular services and extensions to create end-to-end workflows.

| Tool       | Integration Type       | Example Link                                         |
| ---------- | ---------------------- | ---------------------------------------------------- |
| Docker Hub | Container registry     | [Docker Hub](https://hub.docker.com/)                |
| Terraform  | Infrastructure as Code | [Terraform Registry](https://registry.terraform.io/) |
| SonarCloud | Code quality           | [SonarCloud](https://sonarcloud.io/)                 |
| Slack      | Notifications          | [Slack](https://slack.com/)                          |

## Continuous Integration, Delivery, and Testing

### Continuous Integration (CI)

Automatically build and test every change. Early feedback reduces merge conflicts and ensures code health through unit tests, static analysis, and integration tests.

### Continuous Delivery (CD)

Extend CI by automating deployments to staging or production. Define approval gates, environment variables, and rollback strategies for reliable releases.

### Continuous Testing and Shift-Left/Shift-Right Paradigms

Embed testing throughout the pipeline:

- **Shift Left Testing:** Run unit tests, linting, security scans, and smoke tests early in the build.
- **Shift Right Testing:** Conduct performance tests, A/B testing, and monitoring in staging or production environments.

![The image illustrates the concept of continuous testing, showing a process flow from testing new requirements to testing production, highlighting the benefits of automated testing within CI/CD.](https://kodekloud.com/kk-media/image/upload/v1752867870/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Getting-Started-with-Azure-Pipelines/continuous-testing-process-flow-diagram.jpg)

## Supported Languages and Package Management

Azure Pipelines supports a broad range of languages and integrates with major package managers:

| Language   | Package Manager | Use Case                      |
| ---------- | --------------- | ----------------------------- |
| Python     | pip, Poetry     | Scripting, data science, APIs |
| Java       | Maven, Gradle   | Enterprise applications       |
| JavaScript | npm, Yarn       | Front-end frameworks, Node.js |
| C#         | NuGet           | .NET Core, ASP.NET            |
| Go         | Go Modules      | Microservices, CLI tools      |

![The image displays logos of various programming languages and applications, including Python, Java, PHP, JavaScript, C++, Ruby, Scala, Node.js, and C#. It highlights support for a wide range of languages.](https://kodekloud.com/kk-media/image/upload/v1752867871/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Getting-Started-with-Azure-Pipelines/programming-languages-logos-support.jpg)

## Prerequisites

Before you begin, make sure you have:

1.  An active Azure DevOps organization and project.
2.  Source code in a Git repository (GitHub, Azure Repos, etc.).
3.  Defined requirements for your build and release pipeline.

![The image lists prerequisites for using Azure Pipelines: an Azure DevOps account, source code in a version control system, and defined build and release pipelines.](https://kodekloud.com/kk-media/image/upload/v1752867872/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Getting-Started-with-Azure-Pipelines/azure-pipelines-prerequisites-list.jpg)

> [!important]
> **Note**
>
> Creating an Azure DevOps organization is free. You can start with the free tier to experiment with pipelines before scaling up.

## Pricing Overview

Azure Pipelines is free for open source projects and includes:

- 1 Microsoft-hosted CI/CD parallel job with 1,800 minutes per month
- Unlimited self-hosted parallel jobs
- Free for the first five users

Additional parallel jobs, users, and services incur charges.

![The image is a slide about Azure DevOps pricing, showing a gradient background with a table for jobs and users, and notes on free tier availability, pricing based on parallel jobs and users, and additional costs for extra services.](https://kodekloud.com/kk-media/image/upload/v1752867873/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Getting-Started-with-Azure-Pipelines/azure-devops-pricing-table-slide.jpg)

> [!important]
> **Warning**
>
> Exceeding free tier limits or adding advanced services (e.g., Test Plans, Artifacts) will increase costs. Review the [Azure DevOps pricing page](https://azure.microsoft.com/pricing/details/devops/) before scaling.

## Next Steps

1.  Create your first pipeline using the [YAML editor](https://learn.microsoft.com/azure/devops/pipelines/yaml-schema).
2.  Explore advanced features: multi-stage pipelines, gated check-ins, and templates.
3.  Consult the official documentation and tutorials for best practices:
    - [Azure Pipelines Documentation](https://learn.microsoft.com/azure/devops/pipelines/?view=azure-devops)
    - [Microsoft Learn: Azure DevOps](https://learn.microsoft.com/training/azure/devops/)

By integrating Azure Pipelines into your DevOps workflow, you’ll shorten release cycles, improve code quality, and achieve continuous delivery across platforms. Happy building!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/55cf24db-89bc-4b93-bb75-7350d1593073/lesson/d35e93d5-cd18-4d70-9645-765e26a7f388)**
>
> Watch video content
