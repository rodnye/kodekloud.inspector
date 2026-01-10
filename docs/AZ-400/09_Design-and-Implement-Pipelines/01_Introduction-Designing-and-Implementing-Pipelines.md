# Introduction Designing and Implementing Pipelines - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Design-and-Implement-Pipelines/Introduction-Designing-and-Implementing-Pipelines)

---

## Table of Contents

- Introduction Designing and Implementing Pipelines
  - What You’ll Learn
  - 1. Azure Pipelines Overview
  - 2. Setting Up Your First Pipeline
  - 3. Automating Deployments
  - 4. Designing Scalable Pipelines
  - 5. Integrating GitHub
  - 6. End-to-End DevOps Workflow
  - 7. Cost Estimation, Tools & Licensing
  - 8. Triggers, Agent Pools & Parallel Builds
  - References
  - Watch Video
    - Triggers
    - Agent Pools
    - Parallel Jobs Example

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Design and Implement Pipelines

# Introduction Designing and Implementing Pipelines

In this guide, you’ll learn how to design, build, and manage CI/CD pipelines using Azure DevOps. Whether you’re preparing for the [AZ-400 certification](https://learn.microsoft.com/en-us/certifications/exams/az-400) or optimizing your team’s delivery process, mastering Azure Pipelines is essential for scalable, automated deployments.

## What You’ll Learn

- **Azure Pipelines Fundamentals**: Core concepts, terminology, and architecture
- **First Pipeline Setup**: Connect repositories, choose pipeline types, and define build steps
- **Automated Deployments**: Multi-stage YAML or classic release pipelines with approvals
- **Scalable Pipeline Design**: Template reuse, parallel jobs, and agent autoscaling
- **GitHub Integration**: Service connections, webhooks, and combining GitHub Actions
- **End-to-End Workflow**: From code push to production monitoring
- **Cost, Tools & Licensing**: Estimating hosted vs. self-hosted agent costs and license tiers
- **Triggers & Parallel Builds**: Push, PR, scheduled triggers, and multi-job parallelism

---

## 1\. Azure Pipelines Overview

Azure Pipelines provides a cloud-based CI/CD service that works with any language, platform, and cloud provider. You can choose between:

| Pipeline Type     | Definition Method                      | Best For                                   |
| ----------------- | -------------------------------------- | ------------------------------------------ |
| YAML Pipelines    | `azure-pipelines.yml` in repo          | Version-controlled, Infrastructure as Code |
| Classic Pipelines | Visual designer in Azure DevOps portal | Quick setup, GUI-based editing             |

> [!important]
> **Note**
>
> YAML pipelines enable repeatable, code-reviewed pipeline definitions stored alongside your application code.
> Classic pipelines suit teams new to DevOps who prefer a drag-and-drop interface.

---

## 2\. Setting Up Your First Pipeline

1.  **Connect to a Repository**  
    Link Azure DevOps to Azure Repos or GitHub via Service Connections.
2.  **Select Pipeline Type**
    - YAML: add `azure-pipelines.yml` at the repo root
    - Classic: configure steps in the Azure DevOps UI
3.  **Choose an Agent Pool**  
    Decide between Microsoft-hosted or self-hosted pools.
4.  **Define Build Tasks**  
    Install dependencies, run tests, and publish artifacts.

Example `azure-pipelines.yml`:

```
trigger:
  branches:
    include:
      - main


pool:
  vmImage: 'ubuntu-latest'


steps:
  - task: UsePythonVersion@0
    inputs:
      versionSpec: '3.x'


  - script: |
      pip install -r requirements.txt
      pytest
    displayName: 'Install dependencies & run tests'
```

---

## 3\. Automating Deployments

- **Classic Release Pipelines** or **Multi-Stage YAML**  
  Define explicit stages (Dev → QA → Production) with artifact sharing.
- **Approvals & Checks**  
  Use branch policies, manual approvals, or Azure Policy gates to enforce compliance.

---

## 4\. Designing Scalable Pipelines

| Strategy          | Description                                               |
| ----------------- | --------------------------------------------------------- |
| Template Reuse    | Centralize common steps using YAML templates              |
| Parallel Jobs     | Run multiple tests or builds simultaneously               |
| Agent Autoscaling | Scale self-hosted agents with Kubernetes or VM scale sets |

---

## 5\. Integrating GitHub

- **GitHub Actions & Azure Pipelines**  
  Trigger Azure Pipelines from Actions workflows or vice versa.
- **Service Connections**  
  Securely authenticate Azure DevOps to GitHub organizations.
- **Webhooks & Status Checks**  
  Enforce branch policies and display build status in PRs.

---

## 6\. End-to-End DevOps Workflow

1.  Code Push to Azure Repos or GitHub
2.  Continuous Integration: build, test, and publish artifacts
3.  Continuous Delivery: deploy to staging and production environments
4.  Monitoring & Feedback: integrate with [Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/overview) and Application Insights

---

## 7\. Cost Estimation, Tools & Licensing

| Agent Type       | Cost Model                                | Notes                                           |
| ---------------- | ----------------------------------------- | ----------------------------------------------- |
| Microsoft-Hosted | Free minutes per month; overages billed   | Ideal for small teams; pay-as-you-go scaling    |
| Self-Hosted      | No per-job cost; host management required | Control VM specs and network environment        |
| Licensing        | Basic or higher access required           | Additional parallel jobs depend on license tier |

> [!important]
> **Warning**
>
> Exceeding free tier limits on hosted agents will incur additional charges. Monitor usage in the Azure DevOps Portal.

---

## 8\. Triggers, Agent Pools & Parallel Builds

### Triggers

- `trigger` for branch-based CI
- `pr` for pull request validation
- `schedules` for nightly or periodic runs

### Agent Pools

- Shared pools vs. dedicated pools
- Microsoft-hosted vs. self-hosted

### Parallel Jobs Example

```
jobs:
- job: Build
  pool:
    vmImage: 'ubuntu-latest'
  steps:
    - script: echo Building...


- job: Test
  dependsOn: Build
  pool:
    vmImage: 'ubuntu-latest'
  steps:
    - script: echo Testing...
```

---

## References

- [AZ-400: Designing and Implementing Microsoft DevOps Solutions](https://learn.microsoft.com/en-us/certifications/exams/az-400)
- [Azure Pipelines Documentation](https://learn.microsoft.com/azure/devops/pipelines/?view=azure-devops)
- [Azure Monitor Overview](https://learn.microsoft.com/azure/azure-monitor/overview)
- [GitHub Actions Documentation](https://docs.github.com/actions)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/55cf24db-89bc-4b93-bb75-7350d1593073/lesson/36d965aa-4adc-4df9-afc4-522ac678b704)**
>
> Watch video content
