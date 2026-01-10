# User Accounts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Identity/User-Accounts)

---

## Table of Contents

- User Accounts
  - Types of User Accounts in Microsoft Entra ID
  - Managing User Accounts in the Azure Portal
  - Bulk Operations and Additional Features
  - Watch Video
    - Cloud Identities
    - Guest Accounts
    - Directory Synchronized Users
    - Creating a New User
    - Inviting Guest Users
    - Working with Directory Synchronized Users
    - Modifying and Deleting User Accounts

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Identity

# User Accounts

Welcome to the foundational element of Microsoft Entra ID. In this guide, we will explain how user accounts serve as the gateway to securing and streamlining access to your organizational resources. These accounts are much more than just a username and password—they are digital passports that provide entry to applications, systems, and services while also enabling richer profile configurations.

In Microsoft Entra ID, each user requires a unique account. These accounts not only support secure authentication and authorization but also offer optional properties such as address, department, and role. This enrichment helps streamline communication and improve operational workflows across your organization.

Administrators can manage identities centrally via the Microsoft Entra ID portal under "Users > All Users." With bulk operations available for creating, inviting, and deleting multiple accounts, the portal significantly enhances the efficiency of onboarding or offboarding processes.

## Types of User Accounts in Microsoft Entra ID

### Cloud Identities

Cloud Identities are standalone accounts that exist solely in the cloud without any dependency on an on-premises directory. They are ideal for organizations fully embracing cloud technology, offering flexibility and secure access from anywhere. Note that these cloud identities can belong either to a home Entra ID tenant or to an external one.

### Guest Accounts

Guest Accounts are tailored for external users, such as partners or contractors, who need access to specific resources without being fully integrated into the internal directory. These accounts can include Microsoft, Live, or Gmail accounts and facilitate secure collaboration while maintaining organizational boundaries.

> [!important]
> **Note**
>
> If a user belongs to another company with its own Entra ID, they are treated as a cloud identity; however, if that user does not have an Entra ID, the account is considered a guest account.

### Directory Synchronized Users

Directory Synchronized Users have identities synchronized from an on-premises Active Directory to the cloud through the Microsoft Entra ID Connect tool (formerly known as Azure AD Connect). Synchronization ensures a unified identity framework across on-premises and cloud environments, simplifying the management of access rights and security policies.

![The image is an informational graphic about user accounts in Microsoft Entra ID, detailing features like authentication, optional properties, and bulk operations. It includes a screenshot of a user management interface and highlights categories such as Cloud Identities, Guest Accounts, and Directory Synchronized Users.](https://kodekloud.com/kk-media/image/upload/v1752884607/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-User-Accounts/microsoft-entra-id-user-accounts-graphic.jpg)

Each type of account plays a vital role in constructing a robust identity and access management strategy, ensuring that users receive the appropriate level of access exactly when they need it.

## Managing User Accounts in the Azure Portal

The Azure Portal is your central hub for creating and managing both cloud identities and guest accounts. Follow these steps to manage your users effectively:

1.  **Navigate to the Users Section:**  
    Go to the Azure Portal, access Microsoft Entra ID, and click on "Users."
2.  **Search and Identify Account Types:**  
    Use the search function to filter users by name or account type. For example, when you search for a given name, an account from another directory might appear. If that account exists solely within Microsoft Entra ID, it is classified as a cloud identity—even if it originates from an external source. Conversely, a Microsoft account created through an invitation is marked as a guest, even if related to Entra ID.
3.  **B2B Collaboration:**  
    When inviting an external user who does not have an Entra ID (e.g., Outlook or Gmail users), they will be designated as a guest user.
4.  **On-Premises Synchronized Users:**  
    Users synchronized from an on-premises Active Directory via Entra ID Connect appear as directory synchronized users. These accounts cannot be directly created from the portal; they are managed through your synchronization tasks.

### Creating a New User

To add a new user:

1.  Click on "New User" to display two options:
    - **Create a new user** (for internal accounts)
    - **Invite an external user** (for guest accounts)

2.  For internal accounts, fill in the details such as user principal name, display name, and password. Additional attributes and role assignments can be configured as required.

![The image shows a Microsoft Azure portal interface for creating a new user, with fields for user principal name, mail nickname, display name, and password settings.](https://kodekloud.com/kk-media/image/upload/v1752884608/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-User-Accounts/azure-portal-create-user-interface.jpg)

After providing the required information, click "Create" to add the user to your Entra ID directory. Upon creation, the user’s account type and domain (for example, "kodekloudlab.onmicrosoft.com") will be visible in search results.

### Inviting Guest Users

To include external collaborators:

- Enter the guest user's email address (e.g., ChrisW@xyc.com) and send an invitation.
- Although the account appears as a guest, if the invited user belongs to another Microsoft Entra ID tenant, their underlying identity will still be classified as a cloud identity.

### Working with Directory Synchronized Users

To focus on synchronized users from an on-premises Active Directory:

- Apply the relevant filter to display only sync-enabled users.
- These accounts are identified by an "on-premises sync enabled" property, typically set to "Yes," indicating their source.

### Modifying and Deleting User Accounts

For ongoing account management:

- **Editing:**  
  Select a user (e.g., Abigail's account) and click "Edit Properties." You can update details including name, user principal name, job information, and contact information. Global administrators or tenant owners also have the option to reset passwords.
- **Deleting:**  
  When you delete an account, it moves to the "Deleted Users" list. This provides a grace period of 30 days during which the account can be restored before permanent deletion occurs.

![The image shows a Microsoft Azure user profile page for "Abigail Richards," displaying various user properties and settings such as identity, contact information, and job information.](https://kodekloud.com/kk-media/image/upload/v1752884609/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-User-Accounts/azure-user-profile-abigail-richards.jpg)

![The image shows a Microsoft Azure portal interface displaying a list of deleted users, with options to restore or permanently delete them. A specific user, "Abigail Richards," is selected for potential restoration.](https://kodekloud.com/kk-media/image/upload/v1752884610/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-User-Accounts/azure-portal-deleted-users-list.jpg)

> [!important]
> **Restoration Process**
>
> To restore a deleted user, click "Restore Users." If the account is to be removed permanently, choose the deletion option.

## Bulk Operations and Additional Features

While the steps above cover individual account management, Microsoft Entra ID supports bulk operations for scenarios involving large numbers of users. These bulk actions include:

| Operation Type        | Use Case                                                    | Example Command/Action                                  |
| --------------------- | ----------------------------------------------------------- | ------------------------------------------------------- |
| Mass Invitations      | Inviting multiple external users simultaneously             | Use the bulk invitation tool in the portal              |
| Bulk Account Creation | Rapidly onboarding many internal users                      | Import user details through a CSV file                  |
| Bulk Deletion         | Efficiently offboarding users during organizational changes | Select and delete multiple user accounts at once        |
| Bulk Password Resets  | Resetting passwords for groups of users to enhance security | Execute a batch password reset operation via PowerShell |

These operations are particularly beneficial for organizations undergoing rapid growth or restructuring, ensuring that identity management scales with your organizational needs.

This concludes our comprehensive overview of user accounts in Microsoft Entra ID. In the next lesson, we will explore advanced bulk operations for efficient user management at scale. For more detailed insights and further configuration tips, consider exploring the official [Microsoft Entra ID documentation](https://learn.microsoft.com/en-us/azure/active-directory/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/07e3a37e-65a9-430c-9919-011cc605b25d/lesson/51d8c0a7-6d65-4903-b37e-b0050789fef8)**
>
> Watch video content
