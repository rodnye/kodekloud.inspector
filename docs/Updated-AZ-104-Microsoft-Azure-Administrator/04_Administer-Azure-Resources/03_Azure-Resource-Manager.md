# Azure Resource Manager - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Azure-Resources/Azure-Resource-Manager)

---

## Table of Contents

- Azure Resource Manager
  - Key Responsibilities of ARM
  - Core Features
  - Moving Forward with ARM Templates
  - Watch Video

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Azure Resources

# Azure Resource Manager

Azure Resource Manager (ARM) is the backbone of resource management in Azure. Acting as a centralized management layer, ARM is responsible for deploying, updating, and deleting resources, such as virtual machines, databases, and web apps.

When you issue commands—whether through the Azure portal, Azure PowerShell, CLI, REST clients, or SDKs—ARM is the first component to process these requests. It interprets the high-level instructions you provide and translates them into precise actions, ensuring your services are deployed consistently, organized logically, and configured as specified.

## Key Responsibilities of ARM

- Processing commands to create, update, or delete resources.
- Translating user instructions into concrete backend actions.
- Provisioning resources based on your configuration parameters.

When you deploy a resource, your instructions are forwarded to ARM, which then provisions the necessary services behind the scenes. Conversely, when a resource is slated for deletion, the request is routed through the API to ARM, which manages the removal process.

> [!important]
> **Note**
>
> ARM provides a reliable and consistent way to manage your cloud infrastructure, reducing the complexity involved in handling disparate services.

## Core Features

ARM offers essential features that enhance the management and security of your resources:

- **Access Control**: Utilize Azure Role-Based Access Control (RBAC) to manage permissions effectively.
- **Resource Tagging**: Easily categorize and filter resources with tags.
- **Resource Groups**: Organize resources logically using Resource Groups for better management.
- **Deployment Templates**: Automate resource provisioning with ARM templates.

| Feature                          | Description                                                   |
| -------------------------------- | ------------------------------------------------------------- |
| Role-Based Access Control (RBAC) | Manages fine-grained access to resources                      |
| Resource Tagging                 | Helps in categorizing resources for improved clarity          |
| Resource Groups                  | Logical containers that group related resources               |
| Deployment Templates             | Automates resource deployment using predefined configurations |

This refined approach marks a significant advancement compared to the older Azure Service Manager (ASM) model. Unlike ASM, ARM supports Resource Groups, RBAC locks, and tagging, making it the essential framework for managing Azure resources efficiently.

## Moving Forward with ARM Templates

Next, we will explore ARM templates—Azure Resource Manager templates—and demonstrate how they automate the deployment process. To learn more about these templates and automate your resource deployment process, refer to the [Azure Resource Manager documentation](https://learn.microsoft.com/en-us/azure/azure-resource-manager/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/7f421132-242f-4d10-85e5-6673b7307d12/lesson/d6fc98fd-cd32-480f-ab6a-78785d7ba196)**
>
> Watch video content
