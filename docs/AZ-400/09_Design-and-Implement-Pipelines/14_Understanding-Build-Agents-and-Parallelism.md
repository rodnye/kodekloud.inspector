# Understanding Build Agents and Parallelism - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Design-and-Implement-Pipelines/Understanding-Build-Agents-and-Parallelism)

---

## Table of Contents

- Understanding Build Agents and Parallelism
  - Typical Build and Deploy Workflow
  - Core Functions of a Build Agent
  - Hosted vs. Self-Hosted Agents
  - Configuring Build Agents
  - Enabling Parallelism
  - Best Practices for Parallel Builds
  - Optimizing Build Agents and Parallelism
  - Links and References
  - Watch Video

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Design and Implement Pipelines

# Understanding Build Agents and Parallelism

Azure Pipelines—part of [Azure DevOps](https://docs.microsoft.com/azure/devops/overview/)—provides a scalable CI/CD platform for modern applications. At its core are **Build Agents**, which execute your pipeline tasks, and **Parallelism**, which speeds up your workflows. In this guide, we’ll cover how build agents work, how to configure them, and how to leverage parallel jobs for faster delivery.

## Typical Build and Deploy Workflow

A Build Agent executes each stage of your CI/CD pipeline:

1.  Pipeline Trigger
2.  Checkout Source Code
3.  Run Build and Tests
4.  Publish Build Artifacts
5.  Package Artifacts (e.g., container images)

> [!important]
> **Note**
>
> Automating these steps ensures consistent, repeatable deployments and reduces manual overhead.

![The image is a flowchart illustrating a build pipeline process, showing the sequence from starting the pipeline to creating a container image using pipeline jobs and artifacts.](https://kodekloud.com/kk-media/image/upload/v1752867897/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Understanding-Build-Agents-and-Parallelism/build-pipeline-flowchart-container-image.jpg)

## Core Functions of a Build Agent

Build Agents are responsible for:

- Cloning repositories (Git, TFVC, etc.)
- Executing build scripts (MSBuild, Maven, npm, etc.)
- Running automated tests
- Publishing artifacts to Azure Artifacts, GitHub Packages, or external feeds
- Deploying to target environments via tasks (e.g., ARM, Kubernetes)

These tasks make agents the backbone of your CI/CD pipeline.

## Hosted vs. Self-Hosted Agents

Choose the right agent type based on your control, cost, and compliance needs:

| Agent Type        | Description                                             | When to Use                                                     |
| ----------------- | ------------------------------------------------------- | --------------------------------------------------------------- |
| Hosted Agent      | Microsoft-managed with preinstalled tools and OS images | Quick start, no infrastructure overhead                         |
| Self-Hosted Agent | Customer-managed on VMs or on-prem servers              | Custom dependencies, specific network access, cost optimization |

![The image is a diagram showing the types of build agents, illustrating the deployment of self-hosted agents using an Azure Pipeline and AKS Cluster, with three agents running pipelines.](https://kodekloud.com/kk-media/image/upload/v1752867898/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Understanding-Build-Agents-and-Parallelism/build-agents-azure-pipeline-aks-diagram.jpg)

## Configuring Build Agents

1.  Define Agent Pools  
    Use [agent pools](https://docs.microsoft.com/azure/devops/pipelines/agents/pools-queues) to group agents by environment or capability.
2.  Install and Update Agents  
    For self-hosted agents, follow the [Agent installation guide](https://docs.microsoft.com/azure/devops/pipelines/agents/v2-windows) and keep the agent software updated.
3.  Assign Permissions  
    Configure pool security to restrict who can queue pipelines or manage agents.

![The image is a presentation slide about configuring build agents, showing a menu from Azure DevOps with a focus on "Agent pools" and a list of agent pool names. It also includes a color-coded list of topics: basic setup steps, agent pools, and managing agent versions.](https://kodekloud.com/kk-media/image/upload/v1752867899/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Understanding-Build-Agents-and-Parallelism/azure-devops-build-agents-presentation.jpg)

## Enabling Parallelism

Parallel jobs run multiple pipeline stages or tasks at the same time, cutting down total execution time:

- **Sequential**: A → B → C
- **Parallel**: A, B, and C run concurrently

![The image is a flowchart illustrating the benefits of parallelism in Azure Pipelines, showing stages like "Starting point," "Stage Component A/B/C," "Produce artifacts," and "Deploy application," with a skipped "Rolling back" stage. It highlights reduced execution time for CI/CD processes.](https://kodekloud.com/kk-media/image/upload/v1752867900/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Understanding-Build-Agents-and-Parallelism/azure-pipelines-parallelism-flowchart.jpg)

> [!important]
> **Warning**
>
> Check your Azure DevOps plan for the number of parallel jobs included. Exceeding this limit will queue additional jobs and delay execution.

## Best Practices for Parallel Builds

- Distribute test suites across multiple agents.
- Define dependencies with `dependsOn` in YAML pipelines.
- Use a **matrix strategy** to run combinations of environments in parallel:

```
strategy:
  matrix:
    linux-node:
      OS: ubuntu-latest
      NODE_VERSION: 14
    windows-node:
      OS: windows-latest
      NODE_VERSION: 14
```

- Monitor job durations to identify bottlenecks.

## Optimizing Build Agents and Parallelism

Continuous improvement is key:

- **Monitoring and Scaling**  
  Integrate with [Azure Monitor](https://docs.microsoft.com/azure/azure-monitor/) to track agent performance and scale pool size dynamically.
- **Efficient Resource Allocation**  
  Right-size VM SKUs for self-hosted agents; deallocate idle VMs when not in use.
- **Review and Refine**  
  Regularly audit pipeline definitions, update agent versions, and tweak parallel strategies based on data.

![The image is a slide titled "Optimizing Build Agents and Parallelism," featuring three colored boxes labeled "Monitoring and scaling," "Efficient resource allocation," and "Continuous improvement."](https://kodekloud.com/kk-media/image/upload/v1752867901/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Understanding-Build-Agents-and-Parallelism/optimizing-build-agents-parallelism-slide.jpg)

## Links and References

- [Azure Pipelines Documentation](https://docs.microsoft.com/azure/devops/pipelines/)
- [Agent Pools and Queues](https://docs.microsoft.com/azure/devops/pipelines/agents/pools-queues)
- [Parallel Jobs in Azure DevOps](https://docs.microsoft.com/azure/devops/pipelines/licensing/concurrent-jobs)
- [Matrix Strategy](https://docs.microsoft.com/azure/devops/pipelines/process/phases?tabs=yaml#matrix)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/55cf24db-89bc-4b93-bb75-7350d1593073/lesson/eb5d21f2-4fb9-4f64-a206-ecad2845268e)**
>
> Watch video content
