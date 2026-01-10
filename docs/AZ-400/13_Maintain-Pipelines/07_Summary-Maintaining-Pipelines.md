# Summary Maintaining Pipelines - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Maintain-Pipelines/Summary-Maintaining-Pipelines)

---

## Table of Contents

- Summary Maintaining Pipelines
  - 1. Discovering Pipeline Health
  - 2. Optimizing Pipeline Concurrency
  - 3. Migrating Pipelines from Classic to YAML
  - Links and References
  - Watch Video
    - Key Metrics to Monitor
    - Analytics Tools in Azure DevOps
    - Concurrency Concepts
    - Sample YAML Snippet
    - Classic vs. YAML Comparison
    - Pre-Migration Checklist
    - Step-by-Step Migration Process

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Maintain Pipelines

# Summary Maintaining Pipelines

Welcome to the concise review of pipeline health, optimization, and migration in Azure DevOps. This summary will reinforce the key concepts you need for the AZ-400 exam and real-world DevOps practices.

---

## 1\. Discovering Pipeline Health

Pipeline health ensures reliable, predictable releases. Focus on tracking the right metrics and using Azure DevOps analytics tools.

### Key Metrics to Monitor

| Metric              | Description                                | Example Threshold |
| ------------------- | ------------------------------------------ | ----------------- |
| Build Success Rate  | Percentage of successful builds            | ≥ 95%             |
| Test Pass Rate      | Ratio of passed vs. total tests            | ≥ 98%             |
| Mean Time to Repair | Average time to fix a broken build or test | ≤ 30 minutes      |
| Flaky Test Count    | Number of tests that intermittently fail   | 0                 |

![The image is a slide titled "Discovering Pipeline Health" with a list of topics related to pipeline health monitoring, including key metrics, analytics tools, and strategies for handling flaky tests.](https://kodekloud.com/kk-media/image/upload/v1752868143/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Summary-Maintaining-Pipelines/discovering-pipeline-health-monitoring-topics.jpg)

### Analytics Tools in Azure DevOps

- **Azure DevOps Dashboards:** Custom charts and widgets for real-time insights.
- **Analytics Views & Widgets:** Prebuilt reports on build trends and test outcomes.
- **Azure Test Plans:**
  - Organize, execute, and track test suites.
  - Integrates seamlessly with CI/CD to isolate flaky tests.

> [!important]
> **Note**
>
> Use Azure Test Plans to tag and quarantine flaky tests. Consistent test results improve confidence in your releases.

---

## 2\. Optimizing Pipeline Concurrency

Concurrency controls how many jobs or tasks run in parallel. Proper tuning accelerates delivery and reduces costs.

![The image is a presentation slide titled "Optimizing Pipeline Concurrency for Performance and Cost," with a list of topics related to pipeline concurrency, each marked by a colored dot.](https://kodekloud.com/kk-media/image/upload/v1752868145/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Summary-Maintaining-Pipelines/optimizing-pipeline-concurrency-performance-cost.jpg)

### Concurrency Concepts

| Feature            | Purpose                                          | Example                                       |
| ------------------ | ------------------------------------------------ | --------------------------------------------- |
| Parallel Jobs      | Run multiple stages or jobs simultaneously       | `pool: vmImage: 'ubuntu-latest'`              |
| Agent Pools        | Share agents across teams for better utilization | Create dedicated pools for high-priority jobs |
| Concurrency Limits | Prevent overload and control spending            | `maxParallel: 4` in YAML                      |

### Sample YAML Snippet

```
jobs:
- job: Build
  pool:
    name: 'Default'
    demands:
      - ubuntu
  strategy:
    parallel: 3            # Run 3 agents in parallel
    maxParallel: 3
  steps:
    - script: npm install
    - script: npm run build
```

> [!important]
> **Note**
>
> Limiting `maxParallel` helps avoid agent contention and unexpected billing spikes.

Continually monitor queue times and agent utilization to adjust your concurrency settings.

---

## 3\. Migrating Pipelines from Classic to YAML

YAML pipelines offer versioning, flexibility, and better collaboration. Follow a structured checklist for a seamless migration.

![The image is a slide titled "Migrating a Pipeline From Classic to YAML in Azure Pipelines," listing topics such as introduction, YAML and classic pipelines, reasons to migrate, a pre-migration checklist, and a step-by-step migration process.](https://kodekloud.com/kk-media/image/upload/v1752868146/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Summary-Maintaining-Pipelines/migrating-pipeline-classic-to-yaml-azure.jpg)

### Classic vs. YAML Comparison

| Aspect             | Classic Pipelines    | YAML Pipelines                  |
| ------------------ | -------------------- | ------------------------------- |
| Definition Storage | GUI-based            | Code repository                 |
| Version Control    | Limited              | Full Git history                |
| Extensibility      | UI Extensions        | Custom templates and parameters |
| Collaboration      | Manual export/import | Pull requests, code reviews     |

### Pre-Migration Checklist

1.  Inventory existing Classic pipelines and variable groups.
2.  Identify custom tasks or extensions.
3.  Review environment configurations and security permissions.

### Step-by-Step Migration Process

1.  **Create initial YAML file**
    - Export existing pipeline settings as reference.
2.  **Reproduce Classic settings**
    - Define pools, variables, triggers, and tasks in YAML.
3.  **Validate incrementally**
    - Run small sections of the pipeline using `az pipelines run`.

```
trigger:
  branches:
    include:
      - main


variables:
  - name: buildConfiguration
    value: Release


jobs:
- job: BuildAndTest
  pool: 'azure-pipelines'
  steps:
    - task: DotNetCoreCLI@2
      inputs:
        command: 'build'
        projects: '**/*.csproj'
    - task: DotNetCoreCLI@2
      inputs:
        command: 'test'
        projects: '**/*Tests.csproj'
```

> [!important]
> **Warning**
>
> Watch for YAML indentation and syntax errors. A single space can break your pipeline!

---

By mastering pipeline health metrics, optimizing concurrency, and migrating Classic to YAML pipelines, you'll be fully prepared for the AZ-400 exam and ready to enhance your organization’s DevOps workflows.

## Links and References

- [Azure DevOps Documentation](https://docs.microsoft.com/azure/devops/)
- [YAML schema reference](https://docs.microsoft.com/azure/devops/pipelines/yaml-schema)
- [Azure Test Plans overview](https://docs.microsoft.com/azure/devops/test/overview)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/c3626b7f-1518-4df3-8499-73782a79b6fe/lesson/5a29a56b-ad3b-4a46-bd4e-ae3b8fb19b25)**
>
> Watch video content
