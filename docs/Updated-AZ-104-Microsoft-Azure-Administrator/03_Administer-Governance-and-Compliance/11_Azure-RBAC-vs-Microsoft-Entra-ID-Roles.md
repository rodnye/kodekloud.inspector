# Azure RBAC vs Microsoft Entra ID Roles - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Governance-and-Compliance/Azure-RBAC-vs-Microsoft-Entra-ID-Roles)

---

## Table of Contents

- Azure RBAC vs Microsoft Entra ID Roles
  - Overview
  - Scope and Functionality
  - Role Assignment and Management Tools
  - Hierarchical Structure and Integration
  - Conclusion
  - Watch Video
    - Azure RBAC
    - Microsoft Entra ID Roles
    - Azure RBAC Role Assignments
    - Microsoft Entra ID Role Management
      - Practical Demonstration in the Azure Portal

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Governance and Compliance

# Azure RBAC vs Microsoft Entra ID Roles

In this article, we compare two essential permission management tools in the Azure ecosystem: Azure RBAC and Microsoft Entra ID roles. Understanding the differences between these tools is crucial for efficiently managing access within your Azure environment.

## Overview

Access control is a key component of any secure Azure deployment. Both Azure RBAC and Microsoft Entra ID roles play unique roles in this process:

- **Azure RBAC** is designed to manage access to Azure resources such as virtual machines, databases, resource groups, subscriptions, and management groups.
- **Microsoft Entra ID roles** (formerly known as Azure AD roles) focus on governing access within Microsoft Entra ID. These roles provide control over features like privileged identity management, users, groups, and service principals.

Using this guide, you will learn about the functionalities, scopes, and best practices associated with each tool to help you determine when and how to implement them.

## Scope and Functionality

### Azure RBAC

Azure RBAC (Role-Based Access Control) allows you to define permissions precisely across various scopes in your Azure environment. You can assign roles at multiple levels, including:

- Entire subscriptions
- Management groups
- Individual resources, such as virtual machines or storage accounts

This flexibility ensures granular control over resource access.

### Microsoft Entra ID Roles

Microsoft Entra ID roles operate exclusively at the tenant level. When you assign a role in Microsoft Entra ID, the permissions apply across the entire tenant. Some common roles include:

- Global Administrator
- Billing Administrator
- Global Reader

These roles are intended to provide broad access and management capabilities for the Microsoft Entra ID environment.

## Role Assignment and Management Tools

### Azure RBAC Role Assignments

Azure RBAC roles can be assigned using various tools and interfaces:

- Azure Portal
- PowerShell scripting
- Azure CLI
- ARM templates for automated deployments
- REST APIs

These multiple interfaces make it easy to integrate RBAC into your existing workflows.

### Microsoft Entra ID Role Management

You can manage Microsoft Entra ID roles through several platforms:

- Azure Portal (via Microsoft Entra ID)
- M365 Admin Portal
- Microsoft Graph API and the optional Graph PowerShell module

#### Practical Demonstration in the Azure Portal

To assign Microsoft Entra ID roles in the Azure Portal, follow these steps:

1.  Navigate to **Microsoft Entra ID**.
2.  Select **Roles and Administrators** to view available roles for services like Exchange, Teams, and SharePoint.
3.  To assign a role:
    - Choose **Users** and select a specific user (for example, Abigail).
    - Click on **Assigned Roles** and then **Add Assignment**.
    - Select the appropriate role from the list. Note that roles may include eligible or expired options, which are managed through Privileged Identity Management.

> [!important]
> **Note**
>
> The steps provided in this demonstration are representative and may vary with updates to the Azure Portal interface.

This demonstration illustrates that while both Azure RBAC and Microsoft Entra ID roles help manage permissions, they are designed for different aspects of access control—resource-level versus tenant-level management.

## Hierarchical Structure and Integration

Every Azure subscription is linked to a Microsoft Entra ID tenant, creating a hierarchy that harmonizes these two permission systems:

1.  **Microsoft Entra ID Tenant (Root):**  
    All Entra roles reside here (e.g., Global Administrator, Application Administrator, Developer, Billing Administrator). A Global Administrator can enable elevated access across both Microsoft Entra ID features and the associated subscriptions without separate Azure RBAC assignments.
2.  **Root Management Group:**  
    Governed by Azure RBAC with roles such as Owner, Contributor, or Reader. This level can also include nested management groups.
3.  **Subscriptions, Resource Groups, and Resources:**  
    These follow Azure RBAC rules. For instance, even if a user is assigned as a Billing Administrator at the tenant level, they may not have direct access to subscription-specific billing information without the corresponding RBAC role at that scope.

This integrated approach ensures that high-level administrative tasks are managed via Microsoft Entra ID roles while detailed resource access is handled by Azure RBAC.

![The image compares Azure RBAC roles with Microsoft Entra ID roles, illustrating their hierarchy and access levels within a management structure. It shows the relationship between global admin roles and Azure RBAC roles across different management groups and resources.](https://kodekloud.com/kk-media/image/upload/v1752884528/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Azure-RBAC-vs-Microsoft-Entra-ID-Roles/azure-rbac-enra-id-roles-comparison.jpg)

## Conclusion

In summary, this article has highlighted the key differences between Azure RBAC and Microsoft Entra ID roles. By distinguishing between tenant-level administration and resource-level control, you can implement a robust permission strategy that secures your entire Azure ecosystem.

We hope this guide has enhanced your understanding of access control in Azure. Happy managing, and see you in the next module!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/df99187b-f512-443a-a64b-93af9d73c5bc/lesson/3eef02ac-df4d-4e8e-9c1d-5a45fbb611dc)**
>
> Watch video content
