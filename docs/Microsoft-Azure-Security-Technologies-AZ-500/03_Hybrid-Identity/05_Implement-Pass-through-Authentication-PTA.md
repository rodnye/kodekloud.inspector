# Implement Pass through Authentication PTA - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Hybrid-Identity/Implement-Pass-through-Authentication-PTA)

---

## Table of Contents

- Implement Pass through Authentication PTA
  - PTA Authentication Process
  - Summary
  - Further Reading
  - Watch Video

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Hybrid Identity

# Implement Pass through Authentication PTA

In this lesson, we explore the pass-through authentication (PTA) method used in Azure AD Connect. PTA is a secure alternative to Password Hash Synchronization (PHS). Whereas PHS stores user credentials or their hash values in the cloud and handles authentication there, PTA validates credentials in real time against an on-premises Active Directory (AD) during sign-in.

When a user accesses an application such as Outlook Web, the sign-in process begins at Azure Active Directory (Azure AD), which functions as the identity provider. Azure AD displays a webpage prompting the user to enter their username and password. Since the actual password is not stored in Azure AD because of PTA, it cannot independently verify the password. Instead, Azure AD forwards the authentication request to the on-premises AD for validation.

> [!important]
> **How PTA Works**
>
> The following outlines the PTA authentication process on the on-premises side:

## PTA Authentication Process

1.  The user's authentication request is enqueued.
2.  A dedicated PTA agent continuously polls the queue for pending authentication requests.
3.  Upon retrieving a request, the PTA agent forwards the credentials to the on-premises AD.
4.  The on-premises AD verifies the username and password:
    - If valid, it notifies Azure AD of successful authentication, granting the user access to the application.
    - If invalid, it informs Azure AD, which then denies access.

![The image illustrates the process of implementing Pass-Through Authentication (PTA) with Azure Active Directory, showing how user credentials are validated against on-premises Active Directory in real-time during sign-in. It includes components like Outlook Web, Azure AD, and an on-premises authentication agent.](https://kodekloud.com/kk-media/image/upload/v1752881929/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Implement-Pass-through-Authentication-PTA/pass-through-authentication-azure-ad.jpg)

## Summary

In summary, pass-through authentication ensures that user authentication is performed directly against an on-premises Active Directory with the help of a continuously active PTA agent. This method offers a secure and efficient way to validate user credentials in real time, contrasting with the cloud-based approach of Password Hash Synchronization.

> [!important]
> **Important Note**
>
> Another authentication method, Active Directory Federation Services (AD FS), exists but introduces a higher level of complexity compared to PTA. Be sure to evaluate your infrastructure requirements before choosing an authentication method.

## Further Reading

- [Azure AD Connect Documentation](https://docs.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-pta)
- [Active Directory Federation Services (AD FS) Overview](https://docs.microsoft.com/en-us/windows-server/identity/ad-fs/ad-fs-overview)
- [Understanding Authentication Methods in Azure AD](https://docs.microsoft.com/en-us/azure/active-directory/authentication/concept-mfa-howitworks)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/ec3dd1c7-a3f1-4d9a-ae3c-59b398091a52/lesson/ad0ee446-3898-49d9-b138-c1d54bb0b1a0)**
>
> Watch video content
