# Explore Authentication Options - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Hybrid-Identity/Explore-Authentication-Options)

---

## Table of Contents

- Explore Authentication Options
  - Authentication Methods in Azure AD Connect
  - Next Steps
  - Watch Video
    - Password Hash Synchronization
    - Pass-through Authentication
    - Active Directory Federation Services (AD FS)
    - Seamless Single Sign-On (SSO)

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Hybrid Identity

# Explore Authentication Options

Azure AD Connect provides several authentication options to meet different organizational needs. In this article, we explore the four primary methods available for authentication, along with an additional feature that simplifies the sign-on process. Understanding each method's operation is essential when determining the best authentication strategy for your environment.

## Authentication Methods in Azure AD Connect

Azure AD Connect supports the following authentication options:

- Password Hash Synchronization
- Pass-through Authentication
- Active Directory Federation Services (AD FS)
- Seamless Single Sign-On (SSO)

Below is an overview of each method along with their key benefits.

> [!important]
> **Tip**
>
> Each authentication method is designed to fit different organizational requirements. Evaluate your current security infrastructure and compliance needs before selecting a method.

### Password Hash Synchronization

Password Hash Synchronization synchronizes the hash of on-premises passwords with Azure AD. With this method, user password hashes are stored securely in the cloud, ensuring that credentials are consistent across both on-premises and cloud environments. This straightforward approach minimizes complexity while maintaining a uniform authentication process.

### Pass-through Authentication

Pass-through Authentication forwards the authentication request from Azure AD to your on-premises environment. In this method, Azure AD acts as the initial entry point, then redirects the request to on-premises systems, where the actual authentication takes place. This method is ideal if you want to continue using your on-premises validations while benefiting from cloud-based management.

### Active Directory Federation Services (AD FS)

The AD FS method redirects authentication requests from Azure AD to your on-premises Federation Services. Here, the authentication is handled by your own identity provider, and the validated credentials are returned to Azure AD. This setup is particularly useful if you need to comply with specific regulatory requirements or complex authentication flows.

### Seamless Single Sign-On (SSO)

Seamless Single Sign-On enhances the user experience by allowing automatic access to applications without repeatedly entering credentials. Once users are authenticated on their devices, they can access various resources across your network with minimal interruption. This feature reduces the friction of multiple logins and streamlines access to enterprise services.

## Next Steps

Each authentication option in Azure AD Connect is configurable to meet the unique needs of your organization. In the following sections, we will dive into detailed configuration steps, starting with Password Hash Synchronization. For further technical guidance, refer to the [Azure AD Connect documentation](https://learn.microsoft.com/en-us/azure/active-directory/hybrid/overview).

> [!important]
> **Additional Resources**
>
> - [Azure AD Connect Overview](https://learn.microsoft.com/en-us/azure/active-directory/hybrid/overview)
> - [Choose an Authentication Method](https://learn.microsoft.com/en-us/azure/active-directory/hybrid/choose-authentication)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/ec3dd1c7-a3f1-4d9a-ae3c-59b398091a52/lesson/2ce0c372-4d65-4515-98fa-9ad5d1a863a7)**
>
> Watch video content
