# Microsoft Entra ID concepts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Identity/Microsoft-Entra-ID-concepts)

---

## Table of Contents

- Microsoft Entra ID concepts
  - What is an Identity?
  - Defining an Account
  - Microsoft Entra ID Account Explained
  - Understanding Tenant (Directory)
  - Key Takeaways
  - Watch Video

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Identity

# Microsoft Entra ID concepts

This lesson explores the core components of Microsoft Entra ID, detailing how identities and accounts are structured and managed within Microsoft cloud services. It breaks down the relationship between identity, account, Microsoft Entra ID account, and tenant (also known as directory) while providing clear definitions and examples for each concept.

## What is an Identity?

An identity is any object that can be authenticated within a system. In Microsoft Entra ID, identities come in various forms, including:

- **User:** Represents an individual with access to services.
- **Group:** A collection of users often managed together.
- **Managed Identity:** The identity associated with a service in Azure (such as a virtual machine or app service) that enables secure access to other services.
- **Service Principal:** Similar to on-premises service accounts, these are used for automated tasks or to execute processes on behalf of a user.

> [!important]
> **Note**
>
> An identity alone is not sufficient for detailed resource management—it must be supplemented with additional data attributes to form an account.

## Defining an Account

An account is formed when data attributes—such as location, department, manager, and phone number—are associated with an identity. In essence, once an identity carries additional metadata, it becomes a fully featured account that is used for managing user access and resource permissions.

## Microsoft Entra ID Account Explained

A Microsoft Entra ID account is an account created through Microsoft Entra ID or another Microsoft cloud service. These accounts fall into two main categories:

- **Work or School Account:** Typically provided and managed by organizations for employees or students.
- **Personal Account:** Used by individuals for accessing services like Xbox, Outlook, or Hotmail.

Both types of accounts ensure secure and efficient access to Microsoft services while using a unified identity management system.

## Understanding Tenant (Directory)

A tenant, also referred to as a directory, is a dedicated instance of Microsoft Entra ID that is automatically generated during the sign-up process for any Microsoft cloud service subscription. When you create an Azure account, you also create a tenant, and all associated subscriptions are mapped to this tenant.

![The image is a diagram titled "Microsoft Entra ID Concepts," illustrating four concepts: Identity, Account, Microsoft Entra ID Account, and Microsoft Entra ID or Tenant or Directory, each represented with icons.](https://kodekloud.com/kk-media/image/upload/v1752884593/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Microsoft-Entra-ID-concepts/microsoft-entra-id-concepts-diagram.jpg)

## Key Takeaways

- **Identity:** The foundational element used for authentication (including users, groups, managed identities, and service principals).
- **Account:** An identity enriched with detailed data attributes.
- **Microsoft Entra ID Account:** An account provisioned via Microsoft Entra ID that supports both work/school and personal use cases.
- **Tenant/Directory:** A dedicated instance of Microsoft Entra ID that organizes your subscriptions and resources.

> [!important]
> **Learning Tip**
>
> Understanding the differences between Microsoft Entra ID (formerly Azure AD) and Active Directory Domain Services will greatly enhance your ability to manage user identities, managed identities, and service principals in the Azure environment.

By mastering these concepts, you will be better equipped to navigate and manage the flexible, secure landscape of Microsoft cloud services. For further reading, consider exploring the [Microsoft Entra ID Documentation](https://learn.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-whatis) and related resources on Microsoft cloud management.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/07e3a37e-65a9-430c-9919-011cc605b25d/lesson/b2b559d8-c5f7-4fe4-ab99-274565b847d6)**
>
> Watch video content
