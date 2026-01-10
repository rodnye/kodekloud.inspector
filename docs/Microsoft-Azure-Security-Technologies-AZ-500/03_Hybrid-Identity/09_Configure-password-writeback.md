# Configure password writeback - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Hybrid-Identity/Configure-password-writeback)

---

## Table of Contents

- Configure password writeback
  - How Password Write Back Works
  - Benefits of Password Write Back
  - Enabling Password Write Back in Azure AD Connect
  - Watch Video

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Hybrid Identity

# Configure password writeback

This article explains how to configure Password Write Back—a feature that ensures real-time synchronization of password changes from Azure Active Directory (Azure AD) to your on-premises Active Directory (AD). When a user resets their password in the cloud, the new password is automatically updated in the on-premises environment, ensuring both infrastructures stay aligned.

Password Write Back, available through Azure AD Connect, is essential for organizations leveraging both on-premises AD and cloud services. It allows users to reset their passwords in Azure AD, the central identity provider for Office applications, SaaS applications, and more.

> [!important]
> **Key Benefit**
>
> By synchronizing password resets across all environments, Password Write Back offers a unified experience for users and simplifies password management for administrators.

## How Password Write Back Works

In the Self-Service Password Reset (SSPR) portal, a user can set a new password. To activate this functionality, administrators must enable SSPR within the environment. Once a user resets their password using SSPR, the change is automatically replicated to their on-premises Active Directory, ensuring consistency across systems.

For a high-level overview, if a user resets their password in Azure AD, the change propagates immediately to all connected applications and the on-premises infrastructure. The following diagram illustrates Microsoft’s Password Write Back feature, detailing the flow from user password reset to synchronization between Azure AD and Windows Server AD.

![The image explains Microsoft's Password Writeback feature, which synchronizes on-premises Active Directory with cloud-based password changes using Azure AD Connect. It includes a flowchart showing the process of user password reset and synchronization between Microsoft Azure Active Directory and Windows Server Active Directory.](https://kodekloud.com/kk-media/image/upload/v1752881918/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-password-writeback/microsoft-password-writeback-flowchart.jpg)

## Benefits of Password Write Back

Some of the primary advantages of this feature include:

- Enforcement of on-premises AD password policies during cloud-based reset events.
- Zero-delay in propagating new passwords back to the on-premises infrastructure.
- Support for password changes from multiple access points, including the Access Panel and Office 365 portal.
- Allowing administrators to reset user passwords if self-service reset is not available.
- Eliminating the need for additional inbound firewall configurations as communication is secured over HTTPS (port 443).

The image below highlights these benefits:

![The image lists benefits of a service, including enforcement of on-premises AD password policies, zero-delay feedback, support for password changes from Access Panel and Office 365, support for admin-reset passwords, and no inbound firewall rules required.](https://kodekloud.com/kk-media/image/upload/v1752881919/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-password-writeback/service-benefits-password-policies.jpg)

## Enabling Password Write Back in Azure AD Connect

The following screenshot from the Azure AD Connect tool shows where to enable the Password Write Back feature. In this demonstration, the option is visible within the "Optional Features" section.

![The image shows the "Optional Features" section of Microsoft Azure Active Directory Connect, highlighting the "Password writeback" option as selected.](https://kodekloud.com/kk-media/image/upload/v1752881920/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-password-writeback/azure-ad-connect-optional-features.jpg)

> [!important]
> **Setup Reminder**
>
> Before proceeding with the configuration, ensure that Self-Service Password Reset (SSPR) is enabled to fully utilize the Password Write Back feature.

In the upcoming demonstration, we will walk through the process of enabling this feature and explore additional configuration options within Azure AD Connect. Let’s move on to the detailed setup demonstration.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/ec3dd1c7-a3f1-4d9a-ae3c-59b398091a52/lesson/8490f645-0e98-464b-80b7-56db8e67cee0)**
>
> Watch video content
