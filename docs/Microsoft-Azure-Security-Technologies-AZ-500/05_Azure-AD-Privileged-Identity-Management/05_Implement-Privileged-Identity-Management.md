# Implement Privileged Identity Management - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Azure-AD-Privileged-Identity-Management/Implement-Privileged-Identity-Management)

---

## Table of Contents

- Implement Privileged Identity Management
  - PIM Onboarding Considerations
  - Using the Azure Portal for PIM
  - Understanding Role Assignments
  - Conclusion
  - Watch Video
    - 1. License Requirements
    - 2. Administrative Access
    - 3. PIM Activation and Effects
    - Eligible Role Assignments
    - Active Role Assignments
    - Permanent Assignments

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Azure AD Privileged Identity Management

# Implement Privileged Identity Management

In this lesson, you will learn how to implement Privileged Identity Management (PIM) in Azure. We will cover the onboarding process, key configuration steps, and how to use the Azure Portal for managing PIM. By understanding PIM's licensing requirements, administrative controls, and role assignment options, you can secure and streamline your privileged access management activities.

---

## PIM Onboarding Considerations

When onboarding PIM, consider the following three key factors:

### 1\. License Requirements

PIM requires one of the following licenses:

- **Azure AD Premium P2**
- **Enterprise Mobility + Security E5**
- **M365 E5**

Ensure your organization subscribes to one of these plans. In your demo environment, you can sign up for a trial of either a P2 or an E5 license to test PIM.

> [!important]
> **Note**
>
> To verify your license, navigate to the Azure billing or subscription section and confirm that you are using one of the supported plans.

### 2\. Administrative Access

Managing PIM requires specific administrative access levels:

- **Initial Setup:**  
  The first user accessing PIM is automatically assigned both the Security Administrator and PIM Privileged Role Administrator roles. This assignment is essential for subsequent configurations.
- **Role of Global Administrator:**  
  The Global Administrator is tasked with assigning additional privileged role administrators and consolidating administrative control over PIM.

![The image is an onboarding guide for Azure AD PIM, focusing on "Administrative Access" with three steps detailing access management and role assignments.](https://kodekloud.com/kk-media/image/upload/v1752881680/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Implement-Privileged-Identity-Management/azure-ad-pim-onboarding-guide.jpg)

### 3\. PIM Activation and Effects

PIM activates automatically when a privileged role user with a valid P2 license navigates to the "Roles and Administrators" section in Azure AD. For example, if you are a Global Administrator with a P2 license, merely accessing the roles and administrative blade triggers PIM without additional configuration.

Once activated, you can configure role assignments as follows:

- **Active or Eligible:**  
  Set roles to be either "active" or "eligible" and specify their start and end times.
- **Scope Definition:**  
  Define the scope using administrative units and custom roles.

Additionally, the activation process may produce notifications like the PIM Weekly Digest that summarizes weekly privileged access activities.

![The image is an infographic about Azure AD PIM onboarding, detailing license requirements, administrative access, and PIM activation effects. It includes three points explaining the automatic enabling of PIM, assignment options, and workflow impact.](https://kodekloud.com/kk-media/image/upload/v1752881681/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Implement-Privileged-Identity-Management/azure-ad-pim-onboarding-infographic.jpg)

---

## Using the Azure Portal for PIM

After onboarding PIM, you can manage it via the Azure Portal:

1.  Search for "Privileged" in the Azure Portal and select **Azure AD Privileged Identity Management**.
2.  Explore the various management options for Azure AD roles, groups, and resources.
3.  Manage tasks such as:
    - Approving access requests
    - Reviewing user access histories
    - Tracking the status of your own access requests

![The image shows a Microsoft Azure Privileged Identity Management dashboard, highlighting options for managing access, activating just-in-time access, and discovering and monitoring roles. It includes a sidebar with tasks and management options.](https://kodekloud.com/kk-media/image/upload/v1752881682/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Implement-Privileged-Identity-Management/azure-privileged-identity-management-dashboard.jpg)

> [!important]
> **Note**
>
> Familiarize yourself with the dashboard's layout to quickly navigate between role assignments, access reviews, and other management tasks.

---

## Understanding Role Assignments

The PIM interface distinguishes between different types of role assignments in Azure Active Directory:

### Eligible Role Assignments

- Users may be eligible for a role without it being activated.
- Eligibility allows users to apply for activation when needed.
- Both eligibility and active assignments display corresponding start and end times.

### Active Role Assignments

- Once an eligible role is activated, it becomes active.
- Active assignments confirm that the role is currently in use.

### Permanent Assignments

- Some accounts, such as break-glass accounts, must have permanent assignments that bypass PIM activation.
- These accounts are configured for continuous, full-time access without an expiration date, ensuring an emergency fallback mechanism.

To add a new assignment, select **Add Assignment**. For instance, you can assign the "Application Developer" role by:

- Making the assignment eligible (with a defined time period or permanently eligible).
- Activating the role immediately to result in a permanent assignment.

When adding assignments, you must provide a justification for the role allocation.

![The image shows a Microsoft Azure portal interface for adding assignments in Privileged Identity Management. It includes options for assignment type, duration, and justification.](https://kodekloud.com/kk-media/image/upload/v1752881683/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Implement-Privileged-Identity-Management/azure-portal-privileged-identity-management-assignments.jpg)

---

## Conclusion

Understanding the licensing prerequisites, administrative roles, activation mechanisms, and role assignment options is essential for implementing an effective Privileged Identity Management solution in Azure. With this overview, you have the foundation to confidently navigate and configure PIM from the Azure Portal.

As you progress, you can explore more advanced features and configurations to tailor PIM according to your organization’s security policies and requirements.

Happy configuring!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/4c177d01-df52-459d-8089-073ff3170c4f/lesson/3ce3c7b6-f8ec-46e5-a5bb-6bb7795610fe)**
>
> Watch video content
