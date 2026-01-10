# Section Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-compute-solution/Section-Introduction)

---

## Table of Contents

- Section Introduction
  - Watch Video

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a compute solution

# Section Introduction

Welcome to the next module on designing a compute solution. In traditional on-premises environments, deployments often depend on virtual machines or containers, which can limit your flexibility. In contrast, cloud platforms like Microsoft Azure provide a broader range of options through Infrastructure as a Service (IaaS) and Platform as a Service (PaaS).

The right compute solution for your project depends on your application requirements. Whether you're migrating an existing application to the cloud or building a new one from scratch, you will need to weigh factors such as a need for serverless architecture, containerization, or full control over the operating system. In this module, we will review various compute service options and follow a decision-making flowchart to help you select the optimal solution for your application.

Consider the following scenario:

Vendata Corp intends to deploy a three-tier application on Azure with these specific requirements:

- Two web applications, "API" and "API Customer," each requiring custom domains and Azure AD authentication.
- Source code stored in GitHub, with automatic updates triggered by commits to the master branch.
- A focus on core development by Vendata Developers, with Microsoft managing the underlying infrastructure.
- A business logic tier that handles requests from both web applications, listening on a custom port (8080) and necessitating load balancing.
- Custom-built business logic that requires managing the operating system and server dependencies.
- A data tier operating on SQL containers for simplified management, supported by a managed container orchestrator to oversee these SQL containers.

The objective is to design an architecture for Vendata that meets these requirements while efficiently hosting their application. By the end of this module, you will understand which compute solution to implement for each application tier and how to select the appropriate load balancers.

> [!important]
> **Note**
>
> Below is a quick recap emphasizing the placement of load balancers for the front-end and mid-tier components.

![The image is a scenario description for Vendetta Corp's deployment of a three-tier application to Azure, detailing requirements for web applications, authentication, load balancing, and SQL container management.](https://kodekloud.com/kk-media/image/upload/v1752866888/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Section-Introduction/vendetta-corp-azure-three-tier-deployment.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/bf1d18e5-9589-48cf-99af-4150d985241a/lesson/9a5b9703-63bc-4342-b18a-467c03622abc)**
>
> Watch video content
