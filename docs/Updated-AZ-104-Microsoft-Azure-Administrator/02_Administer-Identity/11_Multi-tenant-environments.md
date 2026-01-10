# Multi tenant environments - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Identity/Multi-tenant-environments)

---

## Table of Contents

- Multi tenant environments
  - Relationship Independence
  - Resource Independence
  - Administration Independence
  - Synchronization Independence
  - Managing Tenants in the Azure Portal
  - Watch Video

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Identity

# Multi tenant environments

This article delves into the concept of multi-tenant environments, an essential topic for those preparing for the [AZ-104: Microsoft Azure Administrator](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator) exam. The discussion highlights four key principles that define tenant operations within Microsoft Entra ID.

## Relationship Independence

Each Microsoft Entra ID organization, often referred to as a tenant, functions autonomously. Unlike on-premises Active Directory—with its intricate structures like forests, root domains, trees, and trusts—cloud environments feature a flat hierarchy. There is no parent-child or hierarchical relationship between tenants. Multiple tenants can coexist, each managing its own subscriptions, users, groups, and resources.

## Resource Independence

Actions performed in one tenant—whether it's the creation or deletion of resources—do not influence other tenants. This strict isolation guarantees that each tenant's data and assets remain secure and separate from those in other tenants.

> [!important]
> **Key Benefit**
>
> Resource independence ensures that any changes, issues, or maintenance activities in one tenant have no unintended consequences on another, maintaining a robust security posture.

## Administration Independence

Administrative rights are tenant-specific. For example, holding a global administrator role in one tenant does not automatically extend similar privileges in another tenant. If global rights are required in Tenant B, they must be explicitly granted for that tenant. This separation reinforces a secure and well-controlled management environment across all tenants.

## Synchronization Independence

Each Microsoft Entra ID tenant can configure its own on-premises synchronization approach based on its unique needs. Modifications in the synchronization settings of one tenant do not impact any other tenant. This independent synchronization setup offers flexibility and streamlined management.

These principles collectively ensure that even though tenants share the underlying Azure data center infrastructure, each tenant enjoys enhanced security, precise control, and tailored customization.

## Managing Tenants in the Azure Portal

The Azure portal facilitates effortless tenant management, allowing you to switch between different tenants you have access to. For example, your personal account might be set as your home tenant. Previously displayed in a single location, tenant information has now been moved to the settings icon.

Clicking on the settings icon reveals a list of tenants accessible to you. This feature makes it simple to switch profiles and manage tenant-specific resources. Notably, the visual theme of the portal—including its color scheme—changes dynamically to reflect the identity of the currently selected tenant.

![The image shows the Microsoft Azure portal settings page, specifically the "Directories + subscriptions" section, where different directories and their details are listed.](https://kodekloud.com/kk-media/image/upload/v1752884598/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Multi-tenant-environments/azure-portal-directories-subscriptions.jpg)

Switching between tenants enables you to manage your home tenant as well as additional tenants you might be invited to join through a B2B process. Even though this is not a primary focus of the exam, understanding the concept of multiple tenant memberships is critical.

> [!important]
> **Exam Tip**
>
> Familiarity with the multi-tenant environment is essential not only for exam success but also for real-world administration and security management.

With this overview, you now understand the foundational aspects of administering identity within Microsoft Entra ID as part of the [AZ-104: Microsoft Azure Administrator](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator) training. Next, we will explore governance and compliance.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/07e3a37e-65a9-430c-9919-011cc605b25d/lesson/64e01d4f-a2d0-4933-99cd-096d87011320)**
>
> Watch video content
