# Investigate roles in Azure AD - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Secure-Azure-solution-with-Azure-Active-Directory/Investigate-roles-in-Azure-AD)

---

## Table of Contents

- Investigate roles in Azure AD
  - Azure AD-Specific Roles
  - Service-Specific Roles
  - Cross-Service Roles
  - Role Categories in Depth
  - Built-In Roles in Azure AD
  - Final Thoughts
  - Watch Video
    - Key Built-In Roles

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Secure Azure solution with Azure Active Directory

# Investigate roles in Azure AD

In this lesson, we dive deep into the roles available in Azure Active Directory (Azure AD). Understanding these roles and their specific permissions is key to managing your resources securely and efficiently.

## Azure AD-Specific Roles

Azure AD-specific roles are designed to manage tasks that are unique to the Azure AD environment. These roles serve as specialized tools for managing users, applications, and groups within Azure AD. Common examples include User Administrator, Application Administrator, and Group Administrator.

![The image is about role management, highlighting "Azure AD-Specific Roles" with examples like User Administrator, Application Administrator, and Groups Administrator.](https://kodekloud.com/kk-media/image/upload/v1752882248/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Investigate-roles-in-Azure-AD/azure-ad-role-management-examples.jpg)

## Service-Specific Roles

Service-specific roles are tailored to individual Microsoft 365 services. Think of these roles as dedicated captains, each steering their respective service. Examples include the Exchange Administrator, Intune Administrator, SharePoint Administrator, and Teams Administrator, each offering precise control over their designated service.

![The image is a diagram about role management, highlighting "Service-Specific Roles" for Microsoft 365 services, with examples like Exchange Administrator and SharePoint Administrator.](https://kodekloud.com/kk-media/image/upload/v1752882249/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Investigate-roles-in-Azure-AD/role-management-service-specific-roles-diagram.jpg)

## Cross-Service Roles

Cross-service roles extend across multiple services, providing a unified management experience across Microsoft 365 and Azure AD. These roles serve as ambassadors by ensuring consistency in administration. Global roles such as Global Administrator and Global Reader operate universally across services. In addition, security and compliance roles, like Security Administrator, oversee protection settings and regulatory compliance across platforms.

![The image is a slide about role management, specifically focusing on cross-service roles, including global, security-related, and compliance administrator roles applicable across Microsoft services.](https://kodekloud.com/kk-media/image/upload/v1752882251/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Investigate-roles-in-Azure-AD/role-management-cross-service-roles.jpg)

## Role Categories in Depth

Azure Active Directory is structured into several role categories, each designed for distinct management areas:

| Role Category           | Description                                                                    | Examples                                                    |
| ----------------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| Azure AD-Specific Roles | Roles focused solely on managing Azure AD functions.                           | Application Administrator, User Administrator               |
| Service-Specific Roles  | Roles that manage individual Microsoft 365 services.                           | Exchange Administrator, Teams Administrator                 |
| Cross-Service Roles     | Roles with permissions that span multiple Microsoft 365 services and Azure AD. | Global Administrator, Global Reader, Security Administrator |

![The image is a diagram illustrating role management, categorizing roles into service-specific, Azure AD-specific, and cross-service roles within Microsoft services like Exchange, Intune, and Teams.](https://kodekloud.com/kk-media/image/upload/v1752882252/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Investigate-roles-in-Azure-AD/role-management-diagram-microsoft-services.jpg)

## Built-In Roles in Azure AD

Azure AD includes both administrative and non-administrative roles:

- **Administrators:** Responsible for critical tasks such as user creation, group management, and device policy enforcement.
- **Non-administrators:** Users without administrative privileges.

![The image illustrates the built-in roles of Azure Active Directory, showing a division between Administrators and Non-Administrators.](https://kodekloud.com/kk-media/image/upload/v1752882252/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Investigate-roles-in-Azure-AD/azure-active-directory-roles-diagram.jpg)

### Key Built-In Roles

1.  **Global Administrator**  
    The Global Administrator is the highest authority within Azure AD. This role provides full access to manage users, groups, application settings, and security configurations, along with the authority to delegate administrative tasks.

    ![The image describes the "Global Administrator" role in Azure AD, highlighting its highest level of access and control, management capabilities, and ability to delegate tasks.](https://kodekloud.com/kk-media/image/upload/v1752882254/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Investigate-roles-in-Azure-AD/azure-ad-global-administrator-role.jpg)

2.  **Security Administrator**  
    Serving as the guardian of Azure AD, the Security Administrator manages security settings, policies, and monitors events to ensure the integrity of your environment.

    ![The image describes the role of a "Security Administrator" in Azure AD, highlighting responsibilities such as managing security aspects, configuring settings, and ensuring resource protection.](https://kodekloud.com/kk-media/image/upload/v1752882255/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Investigate-roles-in-Azure-AD/security-administrator-azure-ad-responsibilities.jpg)

3.  **Billing Administrator**  
    The Billing Administrator oversees subscription management, monitors costs, and ensures that resource consumption stays optimized.

    ![The image shows a list of built-in roles with "Billing Administrator" highlighted, detailing responsibilities such as managing billing tasks, viewing billing information, and monitoring costs.](https://kodekloud.com/kk-media/image/upload/v1752882256/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Investigate-roles-in-Azure-AD/billing-administrator-roles-list.jpg)

4.  **Global Reader**  
    With a focus on oversight, the Global Reader has read-only access to configurations, settings, and reports. This role is ideal for auditors and stakeholders who need to review system details without making any changes.

    ![The image describes the "Global Reader" role in Azure AD, highlighting its read-only access to resources, ability to view configurations and reports, and suitability for auditors or stakeholders needing visibility without modification rights.](https://kodekloud.com/kk-media/image/upload/v1752882258/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Investigate-roles-in-Azure-AD/global-reader-azure-ad-role.jpg)

> [!important]
> **Note**
>
> Remember to apply the principle of least privilege when assigning roles. This practice ensures that users receive only the access necessary for their tasks, thereby reducing security risks.

## Final Thoughts

Roles in Azure AD are more than just titles—they define the level of responsibility and access within your environment. While some roles, like the Teams Administrator, are service-specific, roles such as Global Administrator and Global Reader offer cross-service capabilities applicable across Microsoft 365 and Azure AD.

To manage these roles, navigate to the Azure AD section in the Azure Portal. Here, you can review the list of available roles, assign tasks, and maintain operational security by delegating responsibilities appropriately. As you move forward with creating users and groups, you’ll learn how to effectively assign these permissions.

Finally, let's transition to discussing the deployment of Azure AD Domain Services.

![The image shows a Microsoft Azure portal page displaying a list of administrative roles and their descriptions, such as "Application Administrator" and "Application Developer."](https://kodekloud.com/kk-media/image/upload/v1752882259/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Investigate-roles-in-Azure-AD/azure-portal-administrative-roles.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/c0f70ae1-790f-4a5d-8e09-29450b5ee610/lesson/03d77c42-e9d4-46d7-bc23-048e2879292f)**
>
> Watch video content
