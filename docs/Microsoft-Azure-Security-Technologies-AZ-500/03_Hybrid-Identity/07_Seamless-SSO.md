# Seamless SSO - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Hybrid-Identity/Seamless-SSO)

---

## Table of Contents

- Seamless SSO
  - Hybrid Identity and Seamless SSO
  - Key Benefits of Seamless SSO
  - Choosing the Right Authentication Method
  - Watch Video

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Hybrid Identity

# Seamless SSO

Seamless Single Sign-On (SSO) is a powerful feature of [Azure Active Directory](https://docs.microsoft.com/en-us/azure/active-directory/) that enables users to access both cloud-based and on-premises applications without repeatedly entering their credentials. This streamlined approach not only enhances the user experience but also increases productivity by reducing redundant password prompts.

When discussing Azure AD capabilities, we've already mentioned its support for SSO, which eliminates the necessity for users to manually re-enter their username and password for each application they access.

## Hybrid Identity and Seamless SSO

In hybrid identity scenarios, where users are synchronized from on-premises directories, two primary authentication methods are available: Password Hash Synchronization and Pass-Through Authentication (PTA). Both methods support seamless SSO, making them ideal choices for organizations with hybrid environments.

During the Azure AD Connect setup, you'll encounter a dedicated checkbox that allows you to activate seamless SSO. This option is designed exclusively for hybrid identities, ensuring that users can utilize their existing on-premises credentials to sign into Azure AD, cloud-based applications, and even on-premises applications—all without the need to repeatedly input their login information.

> [!important]
> **Note**
>
> Activating seamless SSO is a critical step in simplifying the login experience for hybrid environments. Ensure that you review your authentication method settings—whether you're using PTA or password hash synchronization—during the Azure AD Connect setup.

## Key Benefits of Seamless SSO

The main advantages of using seamless SSO include:

- **Improved User Experience:** Users no longer need to enter their credentials for each new application session, creating a smoother, more integrated sign-on process.
- **Enhanced Security:** With fewer password prompts, the risk of phishing and other password-related attacks is significantly reduced.
- **Simplified IT Management:** Administrators benefit from reduced support calls related to authentication issues, as the SSO configuration automates the sign-in process.

## Choosing the Right Authentication Method

Given that various authentication methods—such as DHS, PIM, and ADFS (with or without SSO)—can be complex, choosing the appropriate method for your scenario is crucial. Future guides will delve into the distinct features of each method to help you determine which best meets your organizational requirements.

This article has explored the seamless SSO option supported by both Pass-Through Authentication and password hash synchronization. By enabling this feature, organizations with hybrid identities can realize a more efficient and secure sign-on experience.

For more in-depth information, be sure to check out related documentation on [Azure AD Connect](https://docs.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-install-custom) and [Hybrid Identity](https://docs.microsoft.com/en-us/azure/active-directory/hybrid/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/ec3dd1c7-a3f1-4d9a-ae3c-59b398091a52/lesson/6e05cfcc-ca7d-4461-a153-23c99cb12791)**
>
> Watch video content
