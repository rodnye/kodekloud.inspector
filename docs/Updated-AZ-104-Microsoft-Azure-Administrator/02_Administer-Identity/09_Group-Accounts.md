# Group Accounts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Identity/Group-Accounts)

---

## Table of Contents

- Group Accounts
  - Group Types
  - Assignment Types
  - Working with Groups in Microsoft Entra ID via the Azure Portal
  - Bulk Operations and Dynamic Group Membership
  - Additional Group Settings
  - Watch Video
    - Security Groups
    - Microsoft 365 Groups
    - Assigned Groups
    - Dynamic User Groups
    - Dynamic Device Groups
    - Creating a Security Group
    - Creating a Microsoft 365 Group
    - Bulk User Creation
    - Creating a Dynamic User Group
    - Creating a Dynamic Device Group

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Identity

# Group Accounts

Microsoft Entra ID group accounts are essential for managing and securing resource access within your organization. This guide provides an overview of different group types and assignment methods, along with step-by-step instructions for configuring groups via the Azure Portal.

---

## Group Types

### Security Groups

Security groups let you manage member permissions for accessing resources. For example, you might create a security group named "Azure Administrators" to grant specific administrative privileges on Azure services to its members.

### Microsoft 365 Groups

Microsoft 365 Groups are built for collaboration. They integrate seamlessly with Microsoft 365 services such as Outlook, Teams, and SharePoint by offering a shared workspace. For instance, a "Finance" group can provide its members with a shared mailbox, document library, and OneNote notebook, enhancing team productivity.

---

## Assignment Types

### Assigned Groups

Assigned groups require that members be added manually. For example, if an employee needs access to HR-related Azure resources, an Azure Administrator would manually add them to the HR group. This traditional method offers straightforward and direct control over group membership.

### Dynamic User Groups

Dynamic user groups use attribute-based rules to automatically update membership. For example, you can define a rule that adds users to the HR group if their job title contains "HR". This approach minimizes manual intervention while ensuring membership remains current.

### Dynamic Device Groups

Dynamic device groups apply only to security groups and function in a similar way as dynamic user groups, but they rely on device attributes. For example, you could set a rule to automatically include all devices running a specific operating system, enabling targeted software updates.

> [!important]
> **Note**
>
> Using dynamic groups can improve security and administrative efficiency by automating membership based on up-to-date user or device attributes.

---

## Working with Groups in Microsoft Entra ID via the Azure Portal

To manage groups, log in to the Azure Portal, navigate to Microsoft Entra ID, and then select Groups. This section of the portal is where you create, update, and review your groups.

### Creating a Security Group

1.  Click the "New Group" button.
2.  Select the appropriate group type—choose "Security Group" for this example—and name it "Hiring Managers".
3.  Optionally, add a description.
4.  If you plan to assign Azure AD or Microsoft Entra ID roles to the group, change this setting to "Yes" (the default is "No").> [!important]
    > **Additional Information**
    >
    > Detailed role assignments are available in courses such as [Microsoft Azure Security Technologies (AZ-500)](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500).
5.  Set the membership type to "Assigned" to manage users manually.
6.  By default, the group creator becomes the owner. You can add more owners during or after the creation process.
7.  Under the Members section, add users—or even another group (e.g., DevRel) to form nested groups.
8.  Click "Create" to finalize the group.

![The image shows a Microsoft Azure portal interface displaying a list of groups with details such as name, object ID, group type, membership type, and email.](https://kodekloud.com/kk-media/image/upload/v1752884582/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Group-Accounts/azure-portal-groups-list.jpg)

### Creating a Microsoft 365 Group

To create a Microsoft 365 group:

1.  Click on "New Group" and select "Microsoft 365."
2.  Fill in the group settings. Besides the common settings, you must specify a group email address, which will be used to create a shared mailbox (ensure you have an Exchange license).

![The image shows a Microsoft Azure portal interface for creating a new Microsoft 365 group. It includes fields for group type, name, email address, description, and membership type, with options for assigning Microsoft Entra roles.](https://kodekloud.com/kk-media/image/upload/v1752884583/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Group-Accounts/azure-portal-microsoft-365-group.jpg)

The process is quite similar to creating a security group, with the additional step of providing an email address.

![The image shows a Microsoft Azure portal interface where a new group named "Hiring Managers" is being created. The "Add members" section is open, displaying a list of groups and selected members on the right.](https://kodekloud.com/kk-media/image/upload/v1752884584/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Group-Accounts/azure-portal-hiring-managers-group.jpg)

---

## Bulk Operations and Dynamic Group Membership

Using bulk operations can streamline the management of group memberships, particularly when dealing with a large number of users.

### Bulk User Creation

Bulk user creation is an efficient way to prepare for dynamic memberships. For example, you might use a CSV file containing details such as department and usage location for multiple users.

1.  Navigate to Bulk Operations under the Users section.
2.  Select "Bulk Create" and upload your CSV template.
3.  Click "Submit" to process the creation of users.
4.  Wait for the operation to complete. The CSV file settings will later help define dynamic group membership.

![The image shows a Microsoft Azure portal interface displaying a list of users with details such as display name, user principal name, and user type. On the right, there is a section for bulk creating users with options to download, edit, and upload a CSV file.](https://kodekloud.com/kk-media/image/upload/v1752884585/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Group-Accounts/azure-portal-user-list-interface.jpg)

Once the process is complete (e.g., "20 out of 20 completed without any errors"), you can proceed to configure dynamic groups.

![The image shows a Microsoft Azure portal page displaying the results of bulk user operations, including user creation and deletion, with details on file names, upload times, completion times, and statuses.](https://kodekloud.com/kk-media/image/upload/v1752884587/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Group-Accounts/azure-portal-bulk-user-operations.jpg)

### Creating a Dynamic User Group

Dynamic user groups update automatically based on your defined criteria:

1.  In Microsoft Entra ID, select Groups and click on "New Group."
2.  Name the group (for example, "Avengers") and choose "Dynamic User" as the membership type.
3.  Enter a dynamic query to define membership criteria. For example, to include users from the "Avengers" department, use:

    ```
    (user.department -eq "Avengers")
    ```

    To further refine the criteria (e.g., including only users in the US), modify the query as follows:

    ```
    (user.department -eq "Avengers") and (user.usageLocation -eq "US")
    ```

4.  Save the rule. The system will automatically add users who meet the criteria and adjust membership if user attributes change.
5.  Use the "Validate Rules" option to troubleshoot dynamic membership issues. For example, if a user like Gamora is missing from the "Avengers" group, the tool can help highlight that, despite matching one condition (e.g., usage location), the department attribute does not match.

### Creating a Dynamic Device Group

Dynamic device groups, available exclusively for security groups, rely on device properties (such as operating system or vendor):

1.  Create a new group in Microsoft Entra ID, selecting "Dynamic Device" as the membership type.
2.  Construct a dynamic query to include devices based on properties (for example, devices where the operating system is Windows).
3.  Follow similar steps as for dynamic user groups, but base your query on device attributes.

> [!important]
> **Important**
>
> Ensure that device attribute data is accurate and up-to-date, as this directly affects dynamic group membership and subsequent policy applications.

---

## Additional Group Settings

Microsoft Entra ID provides several advanced settings for group management, including:

- Deleted Groups (acting as a recycle bin)
- Group Expiration Policies
- Naming Policies to restrict certain words

---

This guide has provided a comprehensive overview of creating and managing different group types in Microsoft Entra ID, with a focus on both manual and dynamic membership methods. Next, we will explore one of the self-service features: Self-Service Password Reset (SSPR).

Thank you.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/07e3a37e-65a9-430c-9919-011cc605b25d/lesson/44ef192e-51aa-4070-b223-3379ac21553b)**
>
> Watch video content
