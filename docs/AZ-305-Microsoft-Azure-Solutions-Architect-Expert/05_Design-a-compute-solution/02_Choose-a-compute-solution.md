# Choose a compute solution - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-compute-solution/Choose-a-compute-solution)

---

## Table of Contents

- Choose a compute solution
  - Understanding the Flowchart
  - Next Steps
  - Watch Video
    - Step 1: Migration Type
    - Step 2: Cloud-Optimized Migration

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a compute solution

# Choose a compute solution

In this article, we review the available compute solutions in Azure and explore a decision flowchart that guides you in selecting the right service for your application. We discuss common Azure offerings such as Virtual Machines, App Services, Azure Batch, Container Instances, Kubernetes Service, Azure Functions, and Logic Apps. Most of these services align with those covered in the [AZ-104: Microsoft Azure Administrator](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator) exam, with the exception of Azure Batch, Functions, and Logic Apps.

This guide is essential for anyone looking to identify the best compute solution based on their application requirements. Let’s walk through the decision process step by step.

## Understanding the Flowchart

We start by determining whether you are migrating an existing application or building a new one. For the purpose of this discussion, assume you are migrating an existing application.

### Step 1: Migration Type

The first decision focuses on whether you want to perform a lift-and-shift migration. A lift-and-shift migration moves your on-premises application to the cloud with minimal changes. The next consideration is whether your application can be containerized.

- **If the application can be containerized:**
  - **Without the need for orchestration:**  
    Choose **Container Instances** when you are managing a single container.
  - **With the need for orchestration:**  
    Opt for **Azure Kubernetes Service (AKS)** to efficiently manage containers at scale.

- **If the application cannot be containerized:**  
  You have two primary options:
  - **Virtual Machines:** Select this option if you require granular control over the operating system and dependencies.
  - **App Service:** Choose this managed service if you prefer not to manage the underlying infrastructure.

### Step 2: Cloud-Optimized Migration

For organizations looking to optimize their application for the cloud—by leveraging Azure’s Platform as a Service (PaaS) offerings—the decision process involves additional key questions:

1.  **Is your workload High Performance Compute (HPC) oriented?**
    - For tasks such as video rendering, select **Azure Batch**.

2.  **Does your application use a microservices architecture?**
    - **If not:**  
      Host the workload on **Azure App Service**.
    - **If yes:**  
      Determine whether your architecture is event-driven:
      - **Event-driven architecture:**  
        You have two choices—**Azure Functions** or **Logic Apps**. Each has its specific use cases, which we will explore in upcoming chapters.
      - **Not event-driven:**  
        Reassess containerization:
        - **If container orchestration is required:**  
          Use **Azure Kubernetes Service (AKS)**.
        - **Otherwise:**  
          Opt for **Container Instances**.

> [!important]
> **Flowchart Overview**
>
> The flowchart below is designed to visually represent these decision points, simplifying the process of choosing the right compute solution based on application needs.

![The image is a flowchart from KodeKloud that guides users in choosing a compute solution for their application, with options like Virtual Machines, Azure Batch, and Azure Functions. It includes decision points based on requirements such as full control, HPC workload, and containerization.](https://kodekloud.com/kk-media/image/upload/v1752866844/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Choose-a-compute-solution/compute-solution-flowchart-kodekloud.jpg)

This diagram serves as a valuable starting point for navigating compute options within the Azure ecosystem.

## Next Steps

In the upcoming sections, we will dive deeper into designing solutions tailored to the compute service you choose. For example:

- **App Service:** We will discuss best practices and design considerations to ensure optimal performance and scalability.
- **Kubernetes:** Detailed guidelines will be provided on designing and managing Azure Kubernetes Service (AKS).

We will begin by focusing on design factors for Virtual Machines, discussing critical aspects of deploying and hosting your application on a Virtual Machine.

Stay tuned for the next chapter as we explore the design considerations for Virtual Machines in detail.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/bf1d18e5-9589-48cf-99af-4150d985241a/lesson/676eaec9-dba9-47a2-8fd5-7aa65bd76129)**
>
> Watch video content
