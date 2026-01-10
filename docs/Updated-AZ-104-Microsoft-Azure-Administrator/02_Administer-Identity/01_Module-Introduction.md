# Module Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Identity/Module-Introduction)

---

## Table of Contents

- Module Introduction
  - Module Learning Objectives
  - Overview of Managing Identity in Azure
  - Watch Video
    - 1. Configure Microsoft Entra ID
    - 2. Configure User and Group Accounts

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Identity

# Module Introduction

Administering identity is crucial for managing Azure resources because it involves handling user identities, permissions, groups, devices, and access within a cloud environment. This ensures that the right individuals have appropriate access to technology resources. In this article, we outline the learning objectives of this module and provide an overview of identity management in Azure.

## Module Learning Objectives

This module has two primary objectives:

### 1\. Configure Microsoft Entra ID

In this section, you will learn to set up and manage Microsoft Entra ID—formerly known as Azure Active Directory (Azure AD)—which serves as the core component of Azure Identity Services. The following subsections cover essential topics:

- **Introduction to Microsoft Entra ID:**  
  Understand the fundamentals of Microsoft Entra ID and its importance within Azure Identity Services.
- **Key Concepts:**  
  Explore vital concepts such as identity types, authentication methods, and access management practices that define Microsoft Entra ID.
- **Microsoft Entra ID Editions:**  
  Get an overview of the various editions and service levels available, allowing you to select the edition that best meets your organization’s requirements.
- **Configuration of Device Identities:**  
  Learn techniques for configuring device identities, ensuring secure management of devices alongside user identities within Azure.

![The image lists learning objectives related to configuring Microsoft Entra ID, including an introduction, concepts, editions, and configuring device identities.](https://kodekloud.com/kk-media/image/upload/v1752884594/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Module-Introduction/microsoft-entra-id-learning-objectives.jpg)

### 2\. Configure User and Group Accounts

This objective focuses on managing user and group accounts effectively. You will cover these key areas:

- **User Accounts:**  
  Discover how to create and manage individual user accounts in Azure, an essential aspect of controlling access rights.
- **Bulk Operations:**  
  Learn strategies for large-scale administration of user accounts, including bulk creation, modification, and deletion.
- **Group Accounts:**  
  Understand how to manage group accounts to streamline permissions and simplify the administration process for users with shared access needs.
- **Self-Service Password Reset (SSPR):**  
  Enable SSPR to allow users to reset their passwords independently, thereby enhancing overall security and operational efficiency.
- **Multitenant Environments:**  
  Analyze the challenges and best practices associated with managing identities in multitenant environments—key for organizations overseeing multiple Azure services or catering to various customers.

![The image lists learning objectives related to configuring user and group accounts, including user accounts, bulk operations, group accounts, self-service password reset, and multi-tenant environments. It features a gradient background with the title "Learning Objectives" on the left.](https://kodekloud.com/kk-media/image/upload/v1752884595/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Module-Introduction/learning-objectives-user-group-accounts.jpg)

## Overview of Managing Identity in Azure

This section provides a high-level view of identity management in Azure, emphasizing how Microsoft Entra ID integrates various identity types and services.

Microsoft Entra ID acts as a central hub that extends your identity capabilities to the cloud by enabling features such as single sign-on, multi-factor authentication, and conditional access policies. Although on-premises identity synchronization is not covered in this article, note that it is comprehensively addressed in the [Microsoft Azure Security Technologies (AZ-500)](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500) course.

> [!important]
> **Note**
>
> Identity synchronization using tools like Entra ID Connect bridges on-premises directories with Azure's cloud-based identity service.

The following diagram summarizes the overall architecture:

- **On-Premises Identities:**  
  Traditional user accounts within an organization's Active Directory, synchronized with Microsoft Entra ID via tools such as Entra ID Connect, ensure smooth integration between on-premises systems and Azure.
- **B2B Scenario:**  
  Demonstrates how business-to-business (B2B) collaboration is enabled, allowing guest users from partner companies to securely access resources while maintaining robust security.
- **External Identity Providers:**  
  Shows the support for integrating external identity providers without the need to add those users to your primary directory.
- **Users and Groups in Microsoft Entra ID:**  
  Outlines how individual user accounts—with their associated roles and permissions—and groups help streamline permission management at scale.

![The image is a flowchart titled "Administer Identity – Overview," illustrating the relationship between on-premises identities, Microsoft Entra ID, external identity providers, users, and groups, including details on licenses, administrative units, and group types.](https://kodekloud.com/kk-media/image/upload/v1752884596/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Module-Introduction/administer-identity-overview-flowchart.jpg)

> [!important]
> **Diagram Insights**
>
> - On-premises identities are synchronized with Microsoft Entra ID using tools like Entra ID Connect.
> - The diagram highlights a secure B2B collaboration scenario and the integration with external identity providers.
> - It also emphasizes clearly defined roles and permissions for users and groups in the cloud.

As you progress through this article, you will gain detailed insights into Microsoft Entra ID and learn how to integrate B2B connections while effectively managing user, group, and device identities in Azure.

Let’s begin with the introduction to Microsoft Entra ID.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/07e3a37e-65a9-430c-9919-011cc605b25d/lesson/cda68ce1-d25f-4c63-9081-6ff77f6069eb)**
>
> Watch video content
