# Exploring PIM Configuration settings - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Azure-AD-Privileged-Identity-Management/Exploring-PIM-Configuration-settings)

---

## Table of Contents

- Exploring PIM Configuration settings
  - Overview of Configuration Options
  - Configuring PIM in the Azure Portal
  - Configuring the Azure DevOps Administrator Role
  - Managing PIM for Groups
  - Conclusion
  - Watch Video
    - Customizing Role Settings
    - Assigning a Role
    - Activating the Role

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Azure AD Privileged Identity Management

# Exploring PIM Configuration settings

In our previous guide, we covered the basics of setting up Privileged Identity Management (PIM). In this article, we delve deeper into the configuration settings that control role activations and assignments in PIM, enhancing both security and flexibility.

When assigning a role, eligible status is defined by default. However, for heightened security—such as enforcing Azure Multi-Factor Authentication (MFA) for access to critical databases or setting a maximum activation duration—these advanced configuration settings are crucial.

Below is a screenshot that outlines these configuration settings before transitioning to a detailed walkthrough in the Azure portal.

![The image shows PIM (Privileged Identity Management) configuration settings for Azure, detailing options for activation, assignment, and notifications. It includes settings for activation duration, assignment eligibility, and notification preferences for role assignments and activations.](https://kodekloud.com/kk-media/image/upload/v1752881658/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Exploring-PIM-Configuration-settings/azure-pim-configuration-settings.jpg)

## Overview of Configuration Options

PIM configuration settings are scoped by type. Azure AD roles and Azure resources each have specific settings. Here are some key configuration options:

- **Activation Settings**: Define a maximum duration (e.g., two or three hours) for which a user can maintain access after activation. Once this duration expires, reactivation is required.
- **Security Enhancements**: Enforce Azure MFA during activation, require justification, or mandate ticket information from internal systems for auditing purposes.
- **Approval Process**: Configure approvers (such as global administrators) to validate role activations. If approvals aren’t needed, activations are processed automatically.

For role assignments, you have multiple options:

- Allow permanent eligible or active assignments.
- Require MFA during assignment.
- Demand justification for active assignments.
- Set up comprehensive notifications for role assignments and activation events.

Let's explore how these settings are managed within the Azure portal.

## Configuring PIM in the Azure Portal

Navigate to Azure AD Privileged Identity Management and select **Azure AD Roles**. You will find options to assign, activate, approve, and audit roles.

![The image shows a Microsoft Azure portal page for Privileged Identity Management, detailing tasks like assigning, activating, and approving Azure AD roles. It includes options for managing roles, assignments, and audits.](https://kodekloud.com/kk-media/image/upload/v1752881660/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Exploring-PIM-Configuration-settings/azure-portal-privileged-identity-management.jpg)

From here, you can view all roles, including both active and eligible assignments.

![The image shows a Microsoft Azure portal interface displaying a list of roles under "Kodekloud | Roles" with descriptions and columns for active and eligible users. The sidebar includes options for tasks and management related to roles and assignments.](https://kodekloud.com/kk-media/image/upload/v1752881661/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Exploring-PIM-Configuration-settings/azure-portal-roles-interface.jpg)

### Customizing Role Settings

For example, to configure the "Application Developer" role, click on the settings at the top of the screen to review the predefined configuration options. You can adjust parameters such as:

- Maximum activation duration
- Requirement for Azure MFA
- Necessity of additional information (e.g., justification or ticket details)
- Option for role activation approvals

![The image shows the role setting details for an "Application Developer" in Microsoft Azure, displaying activation and assignment settings such as activation duration and justification requirements.](https://kodekloud.com/kk-media/image/upload/v1752881663/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Exploring-PIM-Configuration-settings/azure-application-developer-settings.jpg)

In this demonstration, set the maximum activation duration to 30 minutes and enable a justification requirement.

![The image shows the "Edit role setting" page for an "Application Developer" in Microsoft Azure, where activation settings such as duration and requirements are configured. Options include requiring justification, ticket information, and approval for activation.](https://kodekloud.com/kk-media/image/upload/v1752881665/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Exploring-PIM-Configuration-settings/edit-role-setting-application-developer-azure.jpg)

For assignments, additional configurations include:

- Allowing permanent or active assignments.
- Requiring MFA upon assignment.
- Enforcing justification for active assignments.
- Customizing notification settings for assignment and activation events.

![The image shows a Microsoft Azure portal page for editing role settings for an "Application Developer," with options for assignment and notification settings. It includes checkboxes for allowing permanent assignments and requiring justification.](https://kodekloud.com/kk-media/image/upload/v1752881666/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Exploring-PIM-Configuration-settings/azure-portal-application-developer-settings.jpg)

After making your desired changes, click **Update**. These changes apply solely to the selected role, while other roles will maintain their default configurations.

### Assigning a Role

To assign a role, click on **Add Assignment**. The process resembles previous assignment steps but includes options for:

- Defining the maximum activation duration
- Requiring justification
- Setting up the approval process

For example, to assign the "Application Developer" role to a user like Derek:

1.  Select the appropriate member.
2.  Choose the eligibility type (e.g., permanently eligible).
3.  Adjust the duration if desired (the default might be one year).
4.  Click **Assign**.

![The image shows a Microsoft Azure portal page for adding assignments in Privileged Identity Management. It includes options for setting assignment type, eligibility, and start and end dates.](https://kodekloud.com/kk-media/image/upload/v1752881667/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Exploring-PIM-Configuration-settings/azure-portal-privileged-identity-management-assignments.jpg)

After the assignment is complete, you may view, modify, remove, or extend the assignment durations.

![The image shows the Microsoft Azure portal, specifically the "Application Developer" role assignments page. It lists a user named Derek Kelley who has been assigned the role with a direct membership in the directory.](https://kodekloud.com/kk-media/image/upload/v1752881669/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Exploring-PIM-Configuration-settings/azure-portal-application-developer-role.jpg)

### Activating the Role

Next, let's examine the activation process from the end-user standpoint. When Derek logs into the Azure portal, his role is inactive by default. To activate his "Application Developer" role:

1.  Go to Privileged Identity Management → Azure AD Roles.
2.  Select **Activate**.

During activation, the configured maximum duration of 30 minutes is displayed, and Derek is prompted to provide a justification (e.g., "justification is for testing"). If no approvers are set, activation completes automatically. If approvals are needed, an email notification is sent or the portal prompts for approval.

![The image shows a Microsoft Azure portal interface for Privileged Identity Management, specifically the "My roles" section for an Application Developer. It displays the activation status of a role with stages indicating progress.](https://kodekloud.com/kk-media/image/upload/v1752881670/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Exploring-PIM-Configuration-settings/azure-portal-privileged-identity-management-roles.jpg)

Once activated, subsequent activation attempts will indicate that the role is already active. After 30 minutes, reactivation is required to continue access.

## Configuring the Azure DevOps Administrator Role

Now, let’s examine the configuration process for the Azure DevOps Administrator role. In the Azure portal under Privileged Identity Management → Azure AD Roles:

1.  Select the Azure DevOps Administrator role.
2.  Modify settings to include an approval step.
3.  Set the maximum activation duration to two hours.
4.  For assignments, specify a maximum duration of 15 days.

![The image shows the role setting details for an Azure DevOps Administrator in the Microsoft Azure portal, including activation and assignment settings.](https://kodekloud.com/kk-media/image/upload/v1752881671/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Exploring-PIM-Configuration-settings/azure-devops-administrator-role-settings.jpg)

Select your Global Administrator account as the approver. You can also adjust the assignment expiration settings as needed.

![The image shows a Microsoft Azure portal interface for editing role settings in Azure DevOps, with a list of users displayed for selection. The interface includes options for activation requirements and justification settings.](https://kodekloud.com/kk-media/image/upload/v1752881672/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Exploring-PIM-Configuration-settings/azure-portal-role-settings-devops.jpg)

![The image shows the Azure portal interface for editing role settings of an Azure DevOps Administrator, focusing on assignment expiration settings. Options for expiring eligible and active assignments are visible, with dropdown menus for selecting time durations.](https://kodekloud.com/kk-media/image/upload/v1752881674/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Exploring-PIM-Configuration-settings/azure-devops-admin-role-settings.jpg)

After updating the settings, assign the role to a member (for example, Derek). Choose the allowed maximum duration (default: 15 days) or customize it as needed. Upon activation, even though the maximum duration is two hours, Derek may request a shorter duration. In such cases, his activation request will be pending until approved. As the approver, review and approve the request, which then finalizes the activation with the designated duration.

Active assignments—including both the "Application Developer" and "Azure DevOps Administrator" roles—can be viewed under Azure Active Directory → Roles and Administrators.

![The image shows the Microsoft Azure portal displaying active role assignments for a user, including "Azure DevOps Administrator" and "Application Developer," both in an activated state.](https://kodekloud.com/kk-media/image/upload/v1752881676/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Exploring-PIM-Configuration-settings/azure-portal-role-assignments.jpg)

If a user finishes their task or no longer requires access, they can proactively deactivate their role by navigating to the **Active Assignments** section and revoking the activation.

## Managing PIM for Groups

PIM also supports roles for groups, which is especially useful when multiple users require the same roles. To onboard groups:

1.  Navigate to Privileged Identity Management and select **Groups**.
2.  Discover available groups in Azure Active Directory.

Note: Groups controlled by dynamic membership rules or synchronized from on-premises cannot be managed through PIM. Only eligible groups can be onboarded.

For example, to onboard the "Azure Admins" group:

1.  Click **Discover Groups**.
2.  Select the appropriate group.
3.  Once onboarded, assign eligible or active assignments through PIM to streamline role management for multiple users.

![The image shows a Microsoft Azure portal page for Privileged Identity Management, displaying a list of security groups with details like group name, object ID, group type, members, and owners.](https://kodekloud.com/kk-media/image/upload/v1752881677/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Exploring-PIM-Configuration-settings/azure-portal-privileged-identity-management-3.jpg)

Instead of assigning roles individually, you can enable role assignments for a group and control group membership via PIM. For instance, assign roles to the group and set a duration (e.g., one or two days). You can even add specific users (such as Derek) to the group for demonstration purposes.

![The image shows a Microsoft Azure portal interface for selecting a member or group in Privileged Identity Management. It lists users with their names, types, and email details for assignment to a security role.](https://kodekloud.com/kk-media/image/upload/v1752881678/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Exploring-PIM-Configuration-settings/azure-portal-privileged-identity-management-4.jpg)

> [!important]
> **Important**
>
> When creating groups in Azure AD for role assignments, ensure the flag for role assignment is set to "Yes" during creation. If this setting is not enabled initially, you will need to recreate the group for PIM compatibility.

To demonstrate, navigate to **Azure Active Directory → Roles and Administrators** and add roles (e.g., "Attack Payload Author," "Billing Administrator," "Directory Writers") to the selected group. These assignments are direct and permanent. Then, switch to Privileged Identity Management → Groups and activate group membership (setting a duration, say, one hour), so the group gains temporary role privileges until the activation expires.

## Conclusion

This guide has detailed how to configure PIM settings for both individual roles and groups. By controlling activation durations, enforcing security measures such as Azure MFA, requiring justifications, and applying approval processes, you can enhance the security and flexibility of managing critical roles in your Azure environment.

With these advanced PIM configuration settings in your toolkit, you're well-equipped to explore even more sophisticated PIM workflows in future publications.

Happy configuring!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/4c177d01-df52-459d-8089-073ff3170c4f/lesson/225c8240-be18-428b-b384-ddc201fcfe2e)**
>
> Watch video content
