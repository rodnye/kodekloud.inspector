# Role Based Access Control - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ900-Microsoft-Azure-Fundamentals/Identity-Access-and-Security/Role-Based-Access-Control)

---

## Table of Contents

- Role Based Access Control
  - Watch Video

---

## Content

AZ900: Microsoft Azure Fundamentals

Identity Access and Security

# Role Based Access Control

Role-based access control (RBAC) is an essential security mechanism that governs authorization within the Azure ecosystem. While Microsoft Entra ID (formerly known as Azure Active Directory) handles authentication, RBAC focuses on controlling who can perform specific actions on your Azure resources.

Within Microsoft Entra ID, you manage various objects such as users, service principals, and groups. Service principals, which operate similarly to service accounts, enable automated tasks without requiring user intervention and authenticate through Microsoft Entra ID.

Your Azure environment is organized with a subscription residing within your tenant's Entra ID (or directory). This subscription contains multiple resource groups and various resources, all of which can be logically organized under management groups. With RBAC, you can assign permissions to users, service principals, and groups, ensuring precise control over access at different levels.

RBAC addresses authorization by focusing on three core components:

- **Who**: The identity (user, group, or service principal) attempting to access a resource.
- **Where**: The specific resource or resource group in question.
- **What**: The action being performed, such as creating a database or deleting a Virtual Machine.

For instance, if a user (user1) needs permission to create Virtual Machines within a specific resource group, you create a role assignment. This assignment includes selecting a role (owner, contributor, reader, or even a custom role) and defining its scope, be it at the resource group, subscription, or management group level. This hierarchical permission structure ensures that higher-level assignments automatically cascade down to associated resources.

> [!important]
> **Key Features of RBAC**
>
> - **Predefined roles:** Roles like owner, contributor, and reader provide a broad range of permissions.
> - **Custom roles:** Tailor roles to meet specific requirements unique to your organization.
> - **Flexible scope:** Assign roles at the management group, subscription, resource group, or individual resource level.

The benefits of implementing RBAC include:

- **Least privilege:** Users receive only the access necessary to perform their tasks, reducing overall risk.
- **Streamlined management:** Simplifies permission handling in complex environments.
- **Enhanced compliance:** Ensures that access controls conform to industry and organizational standards.

![The image outlines the benefits of Role-Based Access Control, highlighting least privilege, streamlined management, and improved compliance.](https://kodekloud.com/kk-media/image/upload/v1752868440/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Role-Based-Access-Control/role-based-access-control-benefits.jpg)

RBAC is particularly useful in multi-user and large organizational environments as well as in projects that demand strict access controls. Whether managing sensitive healthcare records or overseeing financial transactions, RBAC ensures that access remains secure and appropriately managed.

![The image illustrates use cases for Role-Based Access Control, highlighting multi-user environments, large organizations, and projects requiring strict access control.](https://kodekloud.com/kk-media/image/upload/v1752868441/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Role-Based-Access-Control/role-based-access-control-use-cases.jpg)

By leveraging Azure RBAC, you establish strong safeguards that determine precisely who can perform specific actions on your Azure resources. With authentication through Microsoft Entra ID securing your access to the environment, RBAC then defines your actual permissions once inside.

![The image is a summary slide highlighting the importance of Azure RBAC and Entra ID for security and task performance within the Azure environment. It lists three key points about role-based access control and authentication.](https://kodekloud.com/kk-media/image/upload/v1752868442/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Role-Based-Access-Control/azure-rbac-entral-id-summary.jpg)

With this solid understanding of RBAC, we now move on to a discussion of Zero Trust security models.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az900-microsoft-azure-fundamentals/module/89fa8b43-65f9-450e-9f65-ebd0bcd5ca8b/lesson/724e5162-e79b-4583-9e75-d2aeb7b83179)**
>
> Watch video content
