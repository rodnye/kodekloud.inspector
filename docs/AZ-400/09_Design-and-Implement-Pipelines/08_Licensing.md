# Licensing - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Design-and-Implement-Pipelines/Licensing)

---

## Table of Contents

- Licensing
  - License Types
  - Pricing Tiers
  - Managing and Assigning Licenses
  - Best Practices for License Compliance
  - Links and References
  - Watch Video

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Design and Implement Pipelines

# Licensing

In this lesson, we examine how Azure DevOps licensing controls access and resource management—essential topics for the AZ-400 exam. You’ll learn about license types, pricing tiers, assignment strategies, and best practices to keep your DevOps environment both secure and cost-effective.

## License Types

Azure DevOps offers various licenses tailored to different roles and requirements:

![The image lists different types of licenses with corresponding colored dots: Basic, Stakeholder, Visual Studio subscriber benefits, Enterprise, and MSDN Platforms subscriber benefits.](https://kodekloud.com/kk-media/image/upload/v1752867874/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Licensing/license-types-colored-dots-list.jpg)

| License Type                       | Access & Features                            | Ideal For                     |
| ---------------------------------- | -------------------------------------------- | ----------------------------- |
| Basic                              | Boards, Repos, Pipelines, Test Plans         | Developers, Project Managers  |
| Stakeholder                        | View and modify work items and boards        | Executives, Customers         |
| Visual Studio Subscriber Benefits  | Full Azure DevOps access via VS subscription | Visual Studio license holders |
| Enterprise                         | Analytics, Code Search, Test Insights        | Large organizations           |
| MSDN Platforms Subscriber Benefits | IDE integration and advanced collaboration   | MSDN subscription holders     |

> [!important]
> **Note**
>
> Advanced Test Plans features require a separate Azure Test Plans extension license.

Selecting the right license involves balancing team roles, required features, and budget constraints.

## Pricing Tiers

Azure Pipelines supports both free and paid tiers. Review the [Azure pricing page](https://azure.microsoft.com/pricing/) for the latest details.

| Tier        | Features                                   | Limits                                    |
| ----------- | ------------------------------------------ | ----------------------------------------- |
| Free        | Microsoft-hosted CI/CD jobs                | 1 parallel job, 1,800 minutes/month       |
| Paid        | Additional parallel jobs and build minutes | Variable rates for hosted vs. self-hosted |
| Grant-based | Included with certain Visual Studio subs   | Governed by subscription level            |

Enterprise organizations pay per user beyond the first five, based on the selected plan.

Azure DevOps also offers a special deal for public open-source projects:

![The image shows pricing details for open-source projects using Azure Pipelines and Azure DevOps, highlighting free parallel jobs and user pricing.](https://kodekloud.com/kk-media/image/upload/v1752867875/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Licensing/azure-pipelines-devops-pricing-details.jpg)

- 10 free parallel jobs
- Unlimited monthly minutes for public repositories

## Managing and Assigning Licenses

To maintain security and efficiency:

- Assign licenses according to team roles.
- Audit allocations frequently and adjust as projects evolve.
- Monitor build minutes and parallel jobs to prevent over-provisioning.

## Best Practices for License Compliance

- Audit license usage quarterly to identify unused seats.
- Optimize pipeline triggers and retention policies to cut down on billing minutes.

> [!important]
> **Warning**
>
> Overspending on idle parallel jobs can quickly inflate your monthly bill. Review utilization metrics before adding capacity.

- Set budgets and alerts in [Azure Cost Management](https://azure.microsoft.com/services/cost-management/).
- Leverage built-in analytics to forecast future licensing requirements.

## Links and References

- [Azure DevOps Documentation](https://docs.microsoft.com/azure/devops/)
- [Azure Pipelines Overview](https://docs.microsoft.com/azure/devops/pipelines/)
- [Azure Pricing Calculator](https://azure.microsoft.com/pricing/calculator/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/55cf24db-89bc-4b93-bb75-7350d1593073/lesson/35a96d1c-3d11-476a-9957-34e232dc05a2)**
>
> Watch video content
