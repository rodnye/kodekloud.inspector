# Optimize pipeline concurrency for performance and cost - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Maintain-Pipelines/Optimize-pipeline-concurrency-for-performance-and-cost)

---

## Table of Contents

- Optimize pipeline concurrency for performance and cost
  - What Is Pipeline Concurrency?
  - Key Benefits of Optimized Concurrency
  - 1. Parallel Jobs
  - 2. Agent Pools
  - References
  - Watch Video

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Maintain Pipelines

# Optimize pipeline concurrency for performance and cost

Pipeline concurrency in Azure DevOps enables you to run multiple jobs at the same time, accelerating your build and release workflows while controlling spending on compute resources. This topic is crucial for anyone preparing for the [AZ-400 certification exam](https://learn.microsoft.com/en-us/certifications/exams/az-400) and aiming to deliver software faster without exceeding budget.

## What Is Pipeline Concurrency?

Concurrency refers to executing several pipeline jobs in parallel. By splitting work into independent jobs, you can leverage multiple agents simultaneously and finish your pipeline in a fraction of the time.

> [!important]
> **Note**
>
> Parallel jobs consume more agents, so ensure your agent pool has enough capacity before increasing concurrency.

![The image illustrates the concept of optimizing pipeline concurrency by showing multiple jobs with tasks executed simultaneously from start to end.](https://kodekloud.com/kk-media/image/upload/v1752868140/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Optimize-pipeline-concurrency-for-performance-and-cost/pipeline-concurrency-optimization-jobs-tasks.jpg)

## Key Benefits of Optimized Concurrency

| Benefit              | Description                                                             |
| -------------------- | ----------------------------------------------------------------------- |
| Improved Performance | Parallel execution reduces overall pipeline runtime.                    |
| Cost Efficiency      | Better utilization of agents lowers idle time and infrastructure costs. |

Finding the right balance between speed and expense ensures you get rapid feedback without overspending.

## 1\. Parallel Jobs

Azure Pipelines allows you to define multiple jobs within a single pipeline. When you have enough agents available, these jobs run at the same time, shortening feedback loops and speeding up delivery.

![The image explains pipeline concurrency in Azure Pipelines, focusing on parallel jobs that can run simultaneously if there are enough available agents.](https://kodekloud.com/kk-media/image/upload/v1752868141/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Optimize-pipeline-concurrency-for-performance-and-cost/azure-pipelines-concurrency-parallel-jobs.jpg)

> [!important]
> **Warning**
>
> If your organization shares a limited number of parallel jobs, monitor usage in **Project settings > Pipelines > Parallel jobs** to avoid queuing delays.

## 2\. Agent Pools

Agents are the workers that execute your pipeline jobs. You group them into pools so pipelines can pick an available machine. Right-sizing your agent pool—choosing the right number and types of agents—ensures you maintain the concurrency level you need without wasting resources.

![The image is a diagram titled "Pipeline Concurrency in Azure Pipelines – Key Aspects," focusing on "Agent Pools" with three agents listed: Agent 1, Agent 2, and Agent 3.](https://kodekloud.com/kk-media/image/upload/v1752868142/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Optimize-pipeline-concurrency-for-performance-and-cost/pipeline-concurrency-azure-pipelines-agents.jpg)

## References

- [Parallel jobs and agent pools in Azure Pipelines](https://learn.microsoft.com/azure/devops/pipelines/process/concurrency)
- [AZ-400: Designing and Implementing Microsoft DevOps Solutions](https://learn.microsoft.com/en-us/certifications/exams/az-400)
- [Azure DevOps Documentation](https://learn.microsoft.com/azure/devops/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/c3626b7f-1518-4df3-8499-73782a79b6fe/lesson/fb6e4b24-df2f-4fc1-b203-621aa79c874e)**
>
> Watch video content
