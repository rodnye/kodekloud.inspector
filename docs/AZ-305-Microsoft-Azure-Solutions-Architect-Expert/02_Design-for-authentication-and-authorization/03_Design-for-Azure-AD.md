# Design for Azure AD - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-for-authentication-and-authorization/Design-for-Azure-AD)

---

## Table of Contents

- Design for Azure AD
  - Why Choose Azure Active Directory?
  - Best Practices for Azure Active Directory
  - Azure AD B2B Best Practices
  - Watch Video
    - Centralized Management with Hybrid Identities
    - Single Tenant Approach
    - Enable Password Hash Synchronization
    - Enable Single Sign-On (SSO)

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design for authentication and authorization

# Design for Azure AD

In this article, we explore how to design robust solutions using Azure Active Directory (Azure AD), highlighting its key features and best practices for effective identity and access management.

Azure AD supports three primary types of users:

1.  Cloud-only users – Users who exist solely in the cloud.
2.  Guest users – Users invited from other tenants for B2B collaboration, appearing as guests in your tenant.
3.  Directory-synchronized users – Users synchronized from an on-premises Active Directory to the cloud.

We previously examined these user types in our [AZ-104: Microsoft Azure Administrator](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator) class. Now, let's analyze why Azure AD is essential and discuss its significant benefits.

## Why Choose Azure Active Directory?

Azure AD is a multi-tenant, cloud-based, centralized identity and access management (IAM) solution that offers comprehensive capabilities including:

- Directory services
- Access management for applications
- Identity protection

By integrating these functionalities into one platform, Azure AD eliminates the need for multiple third-party tools that may have limited features. For organizations with an existing on-premises Active Directory, hybrid identity is achieved effortlessly using Azure AD Connect.

Azure AD Connect synchronizes users, devices, and groups from your on-premises environment to the cloud and even allows filtering of specific organizational units. Any on-premises changes, like adding a new user, are automatically pushed to the cloud. Additionally, the password write-back feature lets users change their cloud password and have it updated on-premises.

Azure AD also provides self-service password reset and self-service group management, further strengthening its role as a robust IAM solution.

In the sections below, we outline best practices for designing an effective Azure AD solution.

## Best Practices for Azure Active Directory

When crafting your Azure AD strategy, consider the following best practices:

### Centralized Management with Hybrid Identities

For organizations that use both on-premises and cloud applications, synchronizing on-premises users with Azure AD enables centralized management. Without this integration, distinct authentication systems would require users to maintain multiple passwords and complicate account deactivation when employees leave.

### Single Tenant Approach

Although multiple tenants can be created, a single tenant approach simplifies user management. With one tenant representing the entire organization, administrative tasks—like disabling accounts for departing employees—are streamlined and less prone to error.

> [!important]
> **Warning**
>
> Do not synchronize AD-privileged accounts. Privileged accounts such as enterprise or domain administrators should be excluded from synchronization to safeguard both on-premises and cloud environments. Even though these accounts are filtered out by default, custom roles may inadvertently sync them.

### Enable Password Hash Synchronization

Hybrid identity solutions offer three methods for user sign-in:

1.  Password hash synchronization (PHS) – Stores users’ hashed passwords in Azure AD, enabling direct cloud authentication.
2.  Pass-through authentication – Proxies login requests from Azure AD to on-premises domain controllers for authentication.
3.  Active Directory Federation Services (AD FS) – Uses a federated model to pass authentication requests to on-premises domain controllers.

It is advisable to enable PHS as a backup for pass-through authentication. If on-premises domain controllers become unreachable, PHS facilitates seamless authentication since credentials are already stored in Azure AD, reducing the risk of login disruptions during outages.

### Enable Single Sign-On (SSO)

Single Sign-On (SSO) enhances productivity by letting users access multiple corporate applications after a single initial login from a domain-joined computer. Should SSO fail, users can still authenticate by manually entering their passwords, ensuring continuous access.

These best practices contribute to a secure, efficient, and manageable Azure AD deployment.

![The image provides best practices for Azure AD, including centralized management, single tenant approach, avoiding syncing AD privileged accounts, enabling password hash synchronization, and enabling SSO. It features a visually appealing design with icons and a wavy line connecting the points.](https://kodekloud.com/kk-media/image/upload/v1752867200/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-AD/azure-ad-best-practices-guide.jpg)

## Azure AD B2B Best Practices

Next, we will cover the best practices for designing a solution with Azure AD B2B, ensuring smooth collaboration and secure access for guest users.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/37d1f5fb-99a1-4513-a856-4587651d9a60/lesson/ba0b15b8-e404-4116-9c60-adfb6bba27c7)**
>
> Watch video content
