# Deploy Federation with Azure AD - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Hybrid-Identity/Deploy-Federation-with-Azure-AD)

---

## Table of Contents

- Deploy Federation with Azure AD
  - Overview of Authentication Methods
  - How Federation with AD FS Works
  - Summary
  - Watch Video

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Hybrid Identity

# Deploy Federation with Azure AD

In this article, we detail the final authentication method available in Azure AD Connect—federation with Azure AD. This approach creates a trust relationship between your on-premises AD FS infrastructure and Azure AD, making it an excellent solution for organizations with robust federated environments that want seamless integration with Azure AD.

> [!important]
> **Important Note**
>
> At the time of recording this article, AD FS is scheduled for deprecation. In the future, this option may no longer be available.

## Overview of Authentication Methods

Before diving into federation, it's important to understand the three primary authentication methods available with Azure AD Connect:

- **Password Hash Synchronization (PHS):**  
  Authentication is managed directly in the cloud by synchronizing password hashes.
- **Pass-Through Authentication (PTA):**  
  User credentials are validated directly against your on-premises domain controller.
- **AD FS Federation:**  
  In addition to using the on-premises domain controller, an AD FS server is deployed. This server establishes a trust relationship with Azure AD, enabling federated authentication.

## How Federation with AD FS Works

When a user attempts to access an Office 365 service (such as SharePoint or Exchange) without an active session, the service initially denies access. Since Office 365 trusts Azure AD, the user is redirected to Azure AD for authentication.

Consider the following step-by-step breakdown:

1.  **Initial Access Attempt:**
    - A user tries to access an Office 365 service.
    - Lacking an authenticated session, the service redirects the user to Azure AD.

2.  **User Sign-In Process:**
    - The user enters their email address (e.g., user@kodekloud.com) on the Azure AD sign-in page.
    - Clicking "Next" triggers the Home Realm Discovery process, where Azure AD determines that the domain is federated.

3.  **Redirection to AD FS:**
    - Upon recognizing that it cannot validate the password directly, Azure AD forwards the authentication request to the on-premises AD FS server.
    - The AD FS server, which has an established trust relationship with the on-premises Active Directory, then handles the authentication.

4.  **Token Generation and Validation:**
    - After successfully authenticating against the on-premises Active Directory, AD FS issues an initial token.
    - Since this token is not accepted by cloud services, Azure AD issues a new token based on the validated identity.

5.  **Service Access Granted:**
    - With the newly issued Azure AD token, the user gains access to the requested service—whether it involves reading emails in Exchange or accessing a SharePoint site.

This workflow ensures that even though the authentication request is initially processed by AD FS, the final token issued by Azure AD is accepted by all cloud services.

## Summary

In an AD FS federation scenario, the process is as follows:

- A service request is initiated to access an Office 365 feature.
- The request is redirected from the Office 365 service to Azure AD.
- Azure AD performs Home Realm Discovery to detect the federated domain.
- The authentication request is then passed to the on-premises AD FS server.
- AD FS processes the authentication and issues a preliminary token.
- Azure AD verifies the token and issues a compliant token, granting the user access to the service.

Additionally, note that a seamless single sign-on option is also available, and this will be discussed briefly before we conclude this topic.

For further details on integrating with Azure AD, refer to [Azure AD Connect Documentation](https://docs.microsoft.com/azure/active-directory/hybrid/how-to-connect-install-custom).

Happy federating!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/ec3dd1c7-a3f1-4d9a-ae3c-59b398091a52/lesson/7a6b17d9-2bb1-4c13-812f-37fd0f990150)**
>
> Watch video content
