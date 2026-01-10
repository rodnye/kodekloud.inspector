# Exploring Managed Identities - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Implementing-Managed-Identities/Exploring-Managed-Identities)

---

## Table of Contents

- Exploring Managed Identities
  - Types of Managed Identities
  - When to Use Managed Identities
  - Authentication Flow with Managed Identities
  - Watch Video

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Implementing Managed Identities

# Exploring Managed Identities

In this article, we dive into the two types of managed identities in Azure, highlighting their key differences, use cases, and benefits. Managed identities enable Azure resources to authenticate securely with services that support Microsoft Entra ID or Azure Active Directory (Azure AD) authentication—eliminating the need to store credentials in your code.

## Types of Managed Identities

Azure provides two distinct types of managed identities:

1.  **System-Assigned Managed Identity**  
    This identity is automatically created as part of an Azure resource, such as a virtual machine or an Azure App Service. Its lifecycle is intrinsically linked to the resource—when the resource is deleted, the identity is automatically removed as well.
2.  **User-Assigned Managed Identity**  
    This identity is created as an independent Azure resource and can be assigned to one or more Azure services. Since its lifecycle is separate from any individual resource, it requires explicit management and deletion when no longer needed.

Below is a visual comparison of system-assigned and user-assigned managed identities in Azure, detailing their creation, lifecycle, and the ability to be shared among resources:

![The image is a table comparing system-assigned and user-assigned managed identities in Azure, detailing their creation, lifecycle, and sharing capabilities across resources.](https://kodekloud.com/kk-media/image/upload/v1752866663/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-Managed-Identities/azure-managed-identities-comparison-table.jpg)

> [!important]
> **Understanding Identity Types**
>
> System-assigned managed identities are ideal when an identity is needed only for a single resource, while user-assigned managed identities offer flexibility by allowing a single identity to be shared across multiple resources.

For instance, if you have several web applications requiring access to a centralized database, you can create one user-assigned managed identity. By assigning this identity to all the applications and granting it the necessary database permissions, you ensure secure access without the hassle of managing separate credentials.

## When to Use Managed Identities

Managed identities are particularly useful when you need Azure resources—such as virtual machines, App Services, Container Instances, Container Apps, or Azure Kubernetes Service—to access other Azure services securely and without manual credential management. Any service supporting Azure AD (or Microsoft Entra ID) authentication can benefit from this setup.

![The image is a diagram explaining when to use managed identities, showing a source with Azure resources accessing a target that supports Azure Active Directory Authentication.](https://kodekloud.com/kk-media/image/upload/v1752866664/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-Managed-Identities/managed-identities-azure-diagram.jpg)

Consider an application that previously relied on client credentials stored in environment variables to obtain a token from Azure AD and then access the Azure Key Vault. By assigning a managed identity directly to a Function App and granting it the appropriate Key Vault permissions, you achieve secure, credential-free access to the Key Vault. This not only bolsters application security by removing sensitive credential storage but also streamlines the management of access permissions.

## Authentication Flow with Managed Identities

The authentication process with managed identities follows a secure and streamlined flow:

1.  The resource requests a token from Azure AD using its assigned managed identity.
2.  Azure AD validates the identity and issues a token.
3.  The resource uses the token to authenticate with the target service that supports Azure AD (or Microsoft Entra ID) authentication.

> [!important]
> **Key Benefit**
>
> This authentication flow enhances security by eliminating the need to store and manage credentials, thereby significantly reducing the risk of unauthorized access.

Through this efficient and secure process, managed identities greatly improve both the security and manageability of inter-service communications within Azure.

For further reading on managed identities and secure authentication in Azure, explore additional resources such as [Azure AD Documentation](https://docs.microsoft.com/en-us/azure/active-directory/) and [Microsoft Entra ID](https://docs.microsoft.com/en-us/azure/active-directory/entra-id-overview).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/1eedbbfa-a866-48dd-b220-34f52aefc67c/lesson/7baefcd0-4224-4f91-a82a-89db8b4f8c29)**
>
> Watch video content
