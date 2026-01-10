# Azure Resource Manager - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ900-Microsoft-Azure-Fundamentals/Resource-Deployment-Tools/Azure-Resource-Manager)

---

## Table of Contents

- Azure Resource Manager
  - Watch Video

---

## Content

AZ900: Microsoft Azure Fundamentals

Resource Deployment Tools

# Azure Resource Manager

Azure Resource Manager (ARM) is Azure's deployment and management service, serving as the central hub for creating, updating, and deleting resources. Every time you interact with Azure—whether via the [Azure Portal](https://portal.azure.com), Azure PowerShell, Azure CLI, or any other client—the request must first pass through ARM's rigorous validation process. Once validated, ARM sequentially handles the operation, ensuring that resource deployment, updates, or deletions are executed in a controlled manner.

> [!important]
> **How ARM Works**
>
> ARM acts as the orchestration layer that processes every user request. Each request—whether it’s for creating, updating, or deleting a resource—is validated before being executed.

When you create a resource, ARM begins by validating the request to ensure that all parameters and configurations are correct before deployment. The same validation flow applies when updating a resource; ARM processes the change request accordingly. For resource deletion, a confirmation step triggers a deletion request that is also managed via ARM.

For each Azure resource, there is a dedicated resource provider that communicates with ARM. Here are some examples:

- For virtual machines, the resource provider is `microsoft.compute`.
- For web applications, it is `microsoft.web`.
- For databases, it is `microsoft.sql`.

Before the introduction of ARM, Azure deployed resources using the Azure Service Manager (ASM), and resources created using ASM are known as classic resources. Microsoft now recommends using ARM for all deployments since classic resources are being phased out in favor of the more robust and secure ARM framework.

> [!important]
> **Key Benefit**
>
> Using ARM ensures that all resource management operations are centralized, consistent, and validated, which enhances both reliability and security.

![The image is a diagram of the Azure Resource Manager, showing its integration with Azure Portal, Azure PowerShell, Azure CLI, and REST Client, and its connection to services like Data Store, Web App, Virtual Machine, and Service Management.](https://kodekloud.com/kk-media/image/upload/v1752868490/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Resource-Manager/azure-resource-manager-diagram.jpg)

In summary, Azure Resource Manager is a robust management layer that validates and executes requests to create, update, and delete resources, guaranteeing streamlined and secure operations across your Azure environment.

In the next section, we will explore the concept of Infrastructure as Code and how it revolutionizes resource deployment in cloud environments.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az900-microsoft-azure-fundamentals/module/3a2acdf1-9246-4605-93a4-e0b3d2aa8139/lesson/8bfbda5a-940f-4431-a62f-b0198dd342be)**
>
> Watch video content
