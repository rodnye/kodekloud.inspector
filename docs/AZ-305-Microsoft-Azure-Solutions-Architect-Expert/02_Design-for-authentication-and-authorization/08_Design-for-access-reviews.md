# Design for access reviews - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-for-authentication-and-authorization/Design-for-access-reviews)

---

## Table of Contents

- Design for access reviews
  - Best Practices for Access Reviews
  - Configuring Access Reviews in the Azure Portal
  - Watch Video

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design for authentication and authorization

# Design for access reviews

Access Reviews help you maintain a secure environment by ensuring that only the users who genuinely need access to your resources retain it. Over time, role assignments or memberships may persist even when they are no longer necessary, potentially creating security risks. Access Reviews address this challenge by periodically verifying, retaining, and revoking access as needed.

Access Reviews follow a four-step cyclic process:

1.  **Notification:**  
    Resource owners receive email notifications that list all current role assignments within a specified scope. This communication ensures that both application owners and users are informed about their access status.

    ![The image is an infographic titled "Access Reviews" by KodeKloud, outlining a process involving notifying resource owners, reviewing assignments, purging stale assignments, and retaining necessary ones. It includes icons and brief descriptions for each step.](https://kodekloud.com/kk-media/image/upload/v1752867217/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-access-reviews/access-reviews-infographic-kodekloud.jpg)

2.  **Review:**  
    During the review phase, designated resource owners assess each role assignment to determine if continued access is warranted.
3.  **Retention:**  
    After reviewing, resource owners decide which access assignments will be maintained for users who still require it.
4.  **Purge:**  
    Finally, stale or redundant assignments are removed automatically. A report is generated for administrators, ensuring that any unnecessary access is revoked promptly.

> [!important]
> **Note**
>
> Access Reviews require a premium P2 license to utilize the full set of features.

---

## Best Practices for Access Reviews

Implementing Access Reviews effectively requires a clear strategy and careful planning. Below are some key best practices to consider:

- **Understand the Purpose:**  
  Access Reviews are essential for protecting, monitoring, and auditing resource access. They help you decide which users should continue to have access and for how long.
- **Decide the Reviewers:**  
  Identify whether the reviews will be conducted by resource owners, delegated reviewers, or security teams.

  ![The image outlines best practices for access reviews, including acquiring licenses, understanding the purpose, deciding reviewers, setting up a review plan, deciding the self-attest process, and determining resource types.](https://kodekloud.com/kk-media/image/upload/v1752867218/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-access-reviews/access-reviews-best-practices.jpg)

- **Implement a Self-Attestation Process:**  
  Consider allowing users to confirm their ongoing need for access. If a user self-attests, their access is retained; if not, their permissions may be revoked.
- **Determine Resource Types for Review:**  
  Focus on reviewing access to highly confidential or mission-critical resources to maximize security.
- **Set Up a Detailed Review Plan:**  
  Develop a clear plan that specifies the list of reviewers, target resources, review frequency, and a remediation strategy in case discrepancies are identified.

To summarize the best practices visually, consider the table below:

| Key Aspect               | Consideration                                           | Recommendation                            |
| ------------------------ | ------------------------------------------------------- | ----------------------------------------- |
| Purpose                  | Protect and audit access                                | Review periodically to reduce risk        |
| Reviewer Selection       | Resource owners, delegated reviewers, or security teams | Choose based on role expertise            |
| Self-Attestation Process | User ability to confirm continued access                | Enable for improved user responsibility   |
| Resource Focus           | Critical, confidential, or sensitive resources          | Prioritize high-risk resources            |
| Review Planning          | Frequency, detailed schedule, and remediation strategy  | Establish clear guidelines and automation |

---

## Configuring Access Reviews in the Azure Portal

The Azure portal offers a streamlined approach to configuring and managing Access Reviews through Identity Governance. Follow these steps to set up an Access Review:

1.  **Start a New Review:**  
    In the Azure portal's **Identity Governance** section, click on "Add a new access review." Choose the type of review based on your needs, such as reviewing a group membership (e.g., Teams plus groups) or a set of applications.

    ![The image shows a Microsoft Azure portal page for creating a new access review, with a dropdown menu to select between reviewing "Teams + Groups" or "Applications."](https://kodekloud.com/kk-media/image/upload/v1752867219/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-access-reviews/azure-portal-access-review-dropdown.jpg)

2.  **Select the Scope:**  
    For instance, if you are reviewing an application, select the relevant app—such as the Azure VPN app—and define whether the review applies to guest users or all users. Configure the review to be either single-stage or multi-stage, as per your approval process requirements.

    ![The image shows a Microsoft Azure portal page for setting up a new access review, with options to configure multi-stage reviews, select reviewers, and specify review durations and recurrence.](https://kodekloud.com/kk-media/image/upload/v1752867221/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-access-reviews/azure-portal-access-review-setup.jpg)

3.  **Assign Reviewers:**  
    Choose who will perform the review. Options include designated users, self-attestation by the user, or managers (if available in Azure AD). For example, you can select individual reviewers to validate each role assignment.

    ![The image shows a Microsoft Azure interface for setting up a new access review, where reviewers are being selected and review details such as duration and start date are specified.](https://kodekloud.com/kk-media/image/upload/v1752867222/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-access-reviews/azure-access-review-setup-interface.jpg)

4.  **Define Review Recurrence and Duration:**  
    Set the review to recur on a schedule that suits your organization’s needs (weekly, monthly, quarterly, semi-annually, or annually) and specify the duration in days. Configure the start and end dates in a manner similar to scheduling a meeting in Outlook.
5.  **Configure Completion Settings:**  
    Enable auto-apply to enforce reviewer decisions automatically. Choose from options such as leaving access unchanged, removing access, or approving access if no response is received. Additionally, use decision maker helpers that can notify you if a user has not signed in within a specified timeframe (e.g., 30 days). Advanced options also allow you to add justifications, set up email notifications, and configure reminders.

    ![The image shows a Microsoft Azure portal interface for setting up a new access review. It includes options for completion settings, reviewer decision helpers, and advanced settings.](https://kodekloud.com/kk-media/image/upload/v1752867223/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-access-reviews/azure-portal-access-review-setup-2.jpg)

6.  **Review Details and Create:**  
    Provide a name and description for the review (for example, "VPN review" if evaluating the VPN app). Once you confirm all settings, create the review. Automated emails will be sent to the reviewers at the specified frequency, enabling them to determine which users should maintain access.

    ![The image shows a Microsoft Azure portal page for creating a new access review, with fields for entering a review name and description. It includes sections for confirming access review details, such as resources, review scope, reviewers, frequency, and settings.](https://kodekloud.com/kk-media/image/upload/v1752867224/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-access-reviews/azure-access-review-portal-page.jpg)

7.  **Monitor the Access Review:**  
    After the review is created, monitor its progress in the Identity Governance section of the Azure portal.

    ![The image shows a Microsoft Azure portal interface for Identity Governance, specifically the Access Reviews section, listing a "VPN review" with a status of "Not started."](https://kodekloud.com/kk-media/image/upload/v1752867225/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-access-reviews/azure-identity-governance-access-reviews.jpg)

> [!important]
> **Reminder**
>
> Regularly monitoring and adjusting your Access Reviews ensures that your organization maintains a secure and efficient access management policy.

This guide has explained how to set up and manage Access Reviews in Azure. By following these steps and best practices, you can ensure that only authorized users maintain access to your critical resources while automating and simplifying the access management process.

Additionally, this course covers Managed Identities, an essential component of secure resource access management in Azure. For further details, explore [Azure Managed Identities Documentation](https://learn.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/37d1f5fb-99a1-4513-a856-4587651d9a60/lesson/cbb59a4d-17b0-40ae-8148-b409bba6eb13)**
>
> Watch video content
