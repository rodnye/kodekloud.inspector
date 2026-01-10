# Azure files authentication - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Storage-Security/Azure-files-authentication)

---

## Table of Contents

- Azure files authentication
  - Using On-Premises Active Directory Domain Services
  - Using Azure Active Directory Domain Services
  - Summary of Authentication Methods
  - Enabling Secure Transfer for Azure Files
  - Next Steps
  - Watch Video

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Storage Security

# Azure files authentication

In this lesson, you’ll learn how authentication works with Azure Files. Unlike Azure Blobs—which support native integration with Azure Active Directory (Azure AD) authentication—Azure Files requires alternative methods. You must select from either on-premises Active Directory Domain Services (AD DS) or Azure Active Directory Domain Services (Azure AD DS) for authentication.

## Using On-Premises Active Directory Domain Services

In an on-premises environment, clients are typically domain-joined using Active Directory. The authentication flow in this scenario follows these steps:

1.  **Synchronize with Azure AD:**  
    Azure AD Connect synchronizes your on-premises Active Directory users with Azure AD. For example, a user such as user1@onprem.corecloud.com is synchronized as user1@corecloud.com in Azure AD (assuming corecloud.com is the configured domain).
2.  **Enable Azure Files Authentication:**  
    After synchronization, you need to enable Azure Files to authenticate with your on-premises AD DS. This involves creating an Active Directory identity within Azure that represents the storage account. The synchronized identity is then granted specific permissions on Azure Files.
3.  **Access the Azure File Shares:**  
    With permissions set using standard Windows Directory ACLs, a domain user (e.g., user1@onprem.corecloud.com) can mount the Azure File Share. When accessing Azure Files, the user’s credentials are verified against the Discretionary Access Control Lists (DACLs) in a two-step authentication process:
    - **Step 1:** The user authenticates through on-premises AD DS.
    - **Step 2:** A Kerberos token is generated and forwarded to Azure Files for access authorization.

This multi-step authentication starkly contrasts with Azure Blobs, which use a seamless token-based authentication thanks to native Azure AD integration.

## Using Azure Active Directory Domain Services

For organizations that prefer not to use on-premises AD DS, Azure AD DS is an alternative option. The overall process is similar, with these key differences:

1.  **Identity Management via Azure AD DS:**  
    Instead of relying on on-premises AD DS, Azure AD DS manages all identity and authentication processes. Identities are synchronized from Azure AD to Azure AD DS.
2.  **Authentication Flow:**  
    Clients are domain-joined to Azure AD DS and follow these steps:
    - Clients are granted specific permissions on Azure Files.
    - When attempting to mount the storage, users are prompted to provide their credentials.
    - Authentication occurs against Azure AD DS. Once validated, access to Azure Files is granted.

Below is a diagram that illustrates the Azure Files authentication process when using Azure AD DS:

![The image illustrates the process of Azure Files Authentication using Azure Active Directory Domain Services (AD DS), showing the interaction between clients, Azure AD, Azure AD DS, and Azure Files within a network.](https://kodekloud.com/kk-media/image/upload/v1752882275/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Azure-files-authentication/azure-files-authentication-ad-ds-diagram.jpg)

> [!important]
> **Note**
>
> Azure Files requires setting up an Active Directory identity specifically for the storage account. This step is crucial regardless of whether you use on-premises AD DS or Azure AD DS.

## Summary of Authentication Methods

Azure Files supports authentication through two primary methods:

- **On-Premises Active Directory Domain Services:**  
  Uses Azure AD Connect for user synchronization, then leverages standard Windows Directory ACLs for secure access.
- **Azure Active Directory Domain Services:**  
  Manages identities directly in the cloud with a process similar to on-premises AD DS, but without needing on-premises infrastructure.

It is important to note that Azure Files does not support native Azure AD integration; hence, you must choose one of the above methods.

## Enabling Secure Transfer for Azure Files

Secure transfer is a small but critical component of storage security. It is enabled by default via a simple checkbox in your configuration settings. Although minimal, this setup is essential for meeting exam requirements and ensuring secure data transfers.

Below is another diagram illustrating the authentication process when using Azure AD DS:

![The image illustrates the process of Azure Files Authentication using Azure Active Directory Domain Services (AD DS), showing the interaction between clients, Azure AD, and Azure Files within a network.](https://kodekloud.com/kk-media/image/upload/v1752882276/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Azure-files-authentication/azure-files-authentication-ad-ds-diagram-2.jpg)

## Next Steps

With a clear understanding of Azure Files authentication, you can now move on to exploring additional aspects of storage security. For more detailed information on related topics, refer to the following resources:

- [Azure Storage Security Documentation](https://docs.microsoft.com/en-us/azure/storage/)
- [Azure Active Directory](https://docs.microsoft.com/en-us/azure/active-directory/)

Stay tuned for the upcoming section on storage security enhancements and best practices.

Happy learning!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/7acacade-befa-46b1-99e2-3f298d33623d/lesson/c874a85a-2ea4-4f59-ba25-a3f448315968)**
>
> Watch video content
