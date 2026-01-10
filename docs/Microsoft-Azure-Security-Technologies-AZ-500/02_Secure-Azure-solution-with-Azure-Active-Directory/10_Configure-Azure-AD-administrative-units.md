# Configure Azure AD administrative units - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Secure-Azure-solution-with-Azure-Active-Directory/Configure-Azure-AD-administrative-units)

---

## Table of Contents

- Configure Azure AD administrative units
  - Role-Based Permissions Within Administrative Units
  - Working with Administrative Units in the Azure Portal
  - Summary
  - Watch Video

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Secure Azure solution with Azure Active Directory

# Configure Azure AD administrative units

Welcome to this lesson on Azure AD Administrative Units, where efficient management and robust control empower your organization to thrive securely. Think of your organization as a bustling city, with each department representing its own district governed by unique rules and responsibilities. Azure AD Administrative Units (AUs) work in a similar way by compartmentalizing your Azure Active Directory resources into distinct containers, making delegation simpler and more secure.

> [!important]
> **Overview**
>
> Azure AD Administrative Units enable you to create virtual perimeters around specific segments of your organization. This allows you to delegate administrative responsibilities (such as password resets or help desk support) to designated administrators, ensuring that only those with proper permissions can manage their assigned areas.

Imagine a company like KodeKloud. With departments such as Development, Marketing, and Sales, you can create an AU for the Development team. This unit will contain only the users and groups associated with that team, thereby restricting administrative tasks exclusively to them.

![The image is a diagram illustrating Azure AD Administrative Units, showing the relationship between delegated user administrators, access to administrative units, and Azure AD tenant departments. It highlights that administrative units are containers for resources, restrict permissions, and allow user and group assignments.](https://kodekloud.com/kk-media/image/upload/v1752882193/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-Azure-AD-administrative-units/azure-ad-administrative-units-diagram.jpg)

Within each Administrative Unit, you gain granular control. Administrators assigned to a specific AU manage tasks like password resets, authentication methods, or group management only for that unit, minimizing unintended changes to the broader Azure AD tenant.

## Role-Based Permissions Within Administrative Units

Not every role in Azure AD can be scoped to an administrative unit. Some roles, like the Global Administrator, are tenant-wide. Within an AU, the following roles can be delegated:

- **Authentication Administrator:**  
  Can view, set, and reset authentication method information for non-administrative users. For example, if a user loses their phone, an authentication administrator within the AU can update their authentication method.
- **Groups Administrator:**  
  Manages all aspects of groups and group settings (including naming and expiration policies) specifically within the AU.
- **Help Desk Administrator:**  
  Resets passwords for non-administrators and other help desk administrators, and performs tasks such as forcing sign-outs and revoking sessions.
- **License Administrator:**  
  Oversees license assignments by adding, removing, or updating licenses within the AU.
- **Password Administrator:**  
  Responsible for resetting passwords for non-administrative users and other password administrators within the designated AU. Note that password administrators must contact another administrator to reset their own passwords.
- **User Administrator:**  
  Possesses comprehensive rights to manage users and groups, including password resets for many roles except global administrators.

![The image lists various administrative roles, including Authentication Administrator, Groups Administrator, Helpdesk Administrator, License Administrator, and Password Administrator, each with a brief description of their responsibilities.](https://kodekloud.com/kk-media/image/upload/v1752882195/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-Azure-AD-administrative-units/administrative-roles-descriptions-list.jpg)

## Working with Administrative Units in the Azure Portal

This section guides you through setting up an Administrative Unit using the Azure Portal.

1.  Navigate to **Azure Active Directory** in the Azure Portal, then select **Administrative units**.
2.  Click on **Create administrative unit**. Provide a name for the unit (e.g., "HRAVew").
3.  Notice the option for enabling restricted management. This preview feature protects certain objects from modification by unauthorized administrators. For production environments, leave it set to **No**.
4.  Click **Assign roles**—this can also be managed later if you prefer—review your settings, and then click **Create** to finalize the AU.

![The image shows a Microsoft Azure portal page for adding an administrative unit, specifically displaying a list of administrative roles with descriptions, types, and assignment counts.](https://kodekloud.com/kk-media/image/upload/v1752882196/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-Azure-AD-administrative-units/azure-portal-admin-unit-roles.jpg)

Once the administrative unit is created, you will see it listed in the **Administrative units** section.

![The image shows a Microsoft Azure portal interface displaying the "Administrative units" section, with an administrative unit named "HR AU" listed. A notification confirms the successful creation of this administrative unit.](https://kodekloud.com/kk-media/image/upload/v1752882197/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-Azure-AD-administrative-units/azure-portal-administrative-units-hr-au.jpg)

Within the AU, you can add users, groups, and devices, and assign roles to confidently manage administration tasks. For example, onboarding a user involves selecting them from the available list.

![The image shows a Microsoft Azure portal interface for managing users in an administrative unit. It displays options for adding members, downloading users, and managing views, with no users currently listed.](https://kodekloud.com/kk-media/image/upload/v1752882197/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-Azure-AD-administrative-units/azure-portal-user-management-interface.jpg)

You also have the flexibility to add existing groups or create new ones within the AU. By clicking **Add**, you can select all available groups from your Azure AD and enroll them into the designated administrative unit.

Under **Roles and Administrators**, you can view available roles such as Authentication Administrator. For instance, assigning Abigail the Authentication Administrator role within the AU will permit her to reset authentication methods for users (e.g., resetting authentication for user Aldous) confined solely to that specific unit.

![The image shows a Microsoft Azure portal page displaying a list of administrative roles and their descriptions within an Azure Active Directory environment. Each role is described with its permissions and is categorized as "Built-in."](https://kodekloud.com/kk-media/image/upload/v1752882198/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-Azure-AD-administrative-units/azure-portal-administrative-roles.jpg)

## Summary

Azure AD Administrative Units provide a powerful mechanism for achieving granular control over your organization's resources. By grouping resources together and delegating specific administrative roles within secure boundaries, you enhance overall security, streamline operations, and simplify complex management environments. With these finely scoped permissions, only designated administrators can manage their respective units, keeping your entire Azure AD tenant secure and well-organized.

> [!important]
> **Additional Tip**
>
> Passwordless authentication is another vital element of secure user access management. Incorporating this technology can further strengthen your security framework in tandem with AU delegation.

Happy managing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/c0f70ae1-790f-4a5d-8e09-29450b5ee610/lesson/f09fa9de-9fe5-4f30-83c0-5f4411c61283)**
>
> Watch video content
