# Deploy Azure AD connect - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Hybrid-Identity/Deploy-Azure-AD-connect)

---

## Table of Contents

- Deploy Azure AD connect
  - Overview
  - Key Advantages and Features
  - Next Steps
  - Watch Video
    - Single Identity Solution
    - Password Synchronization
    - Seamless Hybrid Identity
    - Synchronization Options
    - User and Group Synchronization
    - Centralized Administration
    - Seamless Application Access

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Hybrid Identity

# Deploy Azure AD connect

In this article, we explore the architecture and key features of Azure AD Connect. Rather than focusing on an immediate deployment, our goal is to provide you with the necessary background on synchronization methods, password write-back, and overall design to help you deploy confidently when you're ready.

## Overview

Azure AD Connect synchronizes your on-premises Active Directory with Azure Active Directory, replicating users, groups, and related attributes to the cloud. Although it is possible to install Azure AD Connect on a domain controller, best practices recommend deploying it on a separate, domain-joined server in production environments. In lab settings, installing it on a domain controller may be acceptable.

When you configure Azure AD Connect using your preferred synchronization method—be it password hash synchronization, pass-through authentication, or federation—you will provide both your on-premises domain and Azure credentials. Once authenticated, on-premises users and groups are synchronized to Azure AD as directory-synchronized accounts.

![The image is a diagram illustrating Azure AD Connect, showing the connection between an on-premises Active Directory and cloud services like Azure AD, Office 365, and SaaS applications.](https://kodekloud.com/kk-media/image/upload/v1752881921/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-Azure-AD-connect/azure-ad-connect-diagram.jpg)

## Key Advantages and Features

### Single Identity Solution

Azure AD Connect offers a unified identity solution by synchronizing on-premises user and group accounts to the cloud. This setup empowers users to access both on-premises and cloud resources with a single set of credentials. For instance, with password hash synchronization, all authentication processes are handled in the cloud while maintaining user records locally.

![The image is a slide titled "Single Identity Solution," describing a unified identity solution that synchronizes on-premises AD user accounts to Azure AD, enabling seamless resource access with a single set of credentials.](https://kodekloud.com/kk-media/image/upload/v1752881922/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-Azure-AD-connect/single-identity-solution-ad-azure.jpg)

### Password Synchronization

Password synchronization allows users to streamline their login experience by using the same password for both on-premises Active Directory and Azure AD. This approach reduces password fatigue and eliminates the need for multiple credentials.

![The image is a slide titled "Password Synchronization," explaining that it allows users to use the same password for on-premises AD and Azure AD, improving user experience and reducing password fatigue.](https://kodekloud.com/kk-media/image/upload/v1752881923/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-Azure-AD-connect/password-synchronization-ad-azure.jpg)

### Seamless Hybrid Identity

Maintaining your on-premises Active Directory infrastructure while leveraging cloud services is made simple with Azure AD Connect. This hybrid identity approach extends your existing capabilities to the cloud without the need to decommission current infrastructure. Synchronized accounts mean that users can log in with a single identity across both environments.

![The image is a slide titled "Seamless Hybrid Identity," describing support for hybrid identity scenarios that allow organizations to maintain on-premises AD infrastructure while leveraging cloud services.](https://kodekloud.com/kk-media/image/upload/v1752881924/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-Azure-AD-connect/seamless-hybrid-identity-support.jpg)

### Synchronization Options

Azure AD Connect provides three primary synchronization options:

1.  **Password Hash Synchronization (PHS)**
2.  **Pass-Through Authentication (PTA)**
3.  **Federation**

Each option offers unique workflows and authentication mechanisms, allowing organizations to select the method that aligns with their security requirements. The following slide presents a detailed flowchart that outlines the differences between these methods.

![The image is a slide titled "Synchronization Options," describing different synchronization methods like Password Hash Synchronization, Pass-Through Authentication, and Federation, and emphasizing the choice based on security needs.](https://kodekloud.com/kk-media/image/upload/v1752881924/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-Azure-AD-connect/synchronization-options-methods-slide.jpg)

### User and Group Synchronization

Beyond synchronizing user identities, Azure AD Connect also carries over group memberships and associated attributes from your on-premises Active Directory. This ensures that users' attributes and permissions remain consistent between your local environment and Azure AD. Extensions and custom attributes are also included in the synchronization process.

![The image is about "User and Group Synchronization," highlighting the synchronization of user accounts, groups, and attributes from on-premises AD to Azure AD, ensuring consistent attributes and permissions in both environments.](https://kodekloud.com/kk-media/image/upload/v1752881925/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-Azure-AD-connect/user-group-synchronization-ad-azure.jpg)

### Centralized Administration

Managing identities across on-premises and cloud environments is simplified through centralized administration. Azure AD Connect enables features like password write-back, allowing users or administrators to reset passwords in the cloud while the changes are reflected in the on-premises Active Directory. This unified management approach significantly improves the overall user experience.

![The image is a slide titled "Centralized Administration" with a description about managing user accounts and identities across on-premises and cloud environments. It includes a small icon of a hand holding a light bulb.](https://kodekloud.com/kk-media/image/upload/v1752881926/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-Azure-AD-connect/centralized-administration-user-management.jpg)

> [!important]
> **Note**
>
> Keep in mind that while centralized administration streamlines identity management, it is essential to follow security best practices and regularly review access controls in both environments.

### Seamless Application Access

By offering a unified identity, Azure AD Connect allows users to access both on-premises and cloud-based applications with the same credentials. This seamless login experience eliminates the hassle of managing multiple accounts, making it easier for users to engage with the resources they need.

![The image is a slide titled "Seamless Application Access" with a description about enabling users to access both on-premises and cloud-based applications using the same credentials. It includes a small icon of a computer and a hand.](https://kodekloud.com/kk-media/image/upload/v1752881927/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-Azure-AD-connect/seamless-application-access-users.jpg)

## Next Steps

With a comprehensive understanding of the Azure AD Connect architecture and its key features, consider delving deeper into the various authentication options and decision trees that influence its configuration. This foundational knowledge is critical for deploying Azure AD Connect confidently in your lab or production environment.

> [!important]
> **Further Reading**
>
> For more detailed guidance, explore [Azure AD Connect Documentation](https://docs.microsoft.com/azure/active-directory/hybrid/how-to-connect-install-roadmap) and other related resources.

Thank you for taking the time to explore these concepts—we look forward to sharing more insights with you soon.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/ec3dd1c7-a3f1-4d9a-ae3c-59b398091a52/lesson/2920edc2-1b73-4748-8794-c62048125a30)**
>
> Watch video content
