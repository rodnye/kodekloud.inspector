# Implement access reviews - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Identity-Protection/Implement-access-reviews)

---

## Table of Contents

- Implement access reviews
  - Why Are Access Reviews Important?
  - When to Use Access Reviews
  - Setting Up an Access Review in Azure Portal
  - Conclusion
  - Watch Video

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Identity Protection

# Implement access reviews

Azure AD Access Reviews empower organizations to regularly evaluate group memberships, application access, and privileged role assignments. This guide explains the significance of these reviews and details how to configure them using the Azure AD portal.

---

## Why Are Access Reviews Important?

Imagine Zahra transitioning from marketing to finance. Should she retain access to sensitive marketing data? With Azure AD Access Reviews, you can periodically verify and adjust user permissions—ensuring every individual holds only the access necessary for their current role.

There are four key reasons to implement Access Reviews:

1.  **New Employees:**  
    Ensure that new hires receive only the permissions required for their job roles from day one.
2.  **Employee Transitions:**  
    When employees change teams or leave the company, updates or revocations of access rights help minimize security risks.
3.  **Audit Compliance:**  
    Regular reviews enforce the principle of least privilege, reducing the risk of excessive permissions that can lead to audit failures.
4.  **Ownership Responsibility:**  
    Resource owners can routinely verify that access rights remain appropriate, ensuring only authorized individuals manage critical data.

![The image explains the importance of access reviews, highlighting the need for appropriate access for new employees, controlling access rights during changes, preventing excessive access, and encouraging regular reviews by resource owners.](https://kodekloud.com/kk-media/image/upload/v1752881947/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Implement-access-reviews/access-reviews-importance-diagram.jpg)

Access Reviews optimize productivity, facilitate safe transitions, prevent audit complications, and promote responsible management of resources.

---

## When to Use Access Reviews

Access Reviews should be considered in scenarios such as:

- **Avoiding Over-Permissioned Roles:**  
  Regular reviews help prevent assigning excessive access, especially for sensitive roles like administrators.
- **Manual Oversight Complementing Automation:**  
  While automation streamlines processes, manual reviews add an extra layer of assurance.
- **Adapting to Evolving Group Functions:**  
  When a group's primary responsibilities shift (for example, an event planning team taking on financial audits), adjusting their access rights is essential.
- **Safeguarding Business-Critical Data:**  
  Reviews ensure that access to highly sensitive information remains strictly controlled.
- **Managing External and Guest Users:**  
  Periodic checks verify that guest or external user access is still necessary and secured.
- **Ongoing Security Management:**  
  Continuous, scheduled reviews maintain proactive security and minimize potential vulnerabilities.

![The image lists six scenarios for using access reviews, including mitigating risks, handling impractical automation, adjusting group access, managing critical data, validating guest access, and ensuring periodic security management.](https://kodekloud.com/kk-media/image/upload/v1752881948/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Implement-access-reviews/access-reviews-scenarios-list.jpg)

---

## Setting Up an Access Review in Azure Portal

Follow these steps to configure an Access Review in the Azure Portal and set up email notifications:

1.  **Access the Access Reviews Section:**  
    In the Azure Portal, navigate to "Identity Governance" or use the search function to locate "Access Reviews". Here, you can view all current reviews for your tenant.
2.  **Create a New Access Review:**
    - Click on "New Access Review".
    - Select the review type. For example, you can choose between applications or teams and groups. In this demonstration, teams and groups are selected, given the absence of applications in the tenant.

3.  **Define the Scope of the Review:**
    - Choose to review all Office 365 groups or specific groups.
    - For specific groups (e.g., HR Debts), you can further specify whether the review should apply to all users or only guest users.
    - There is an option called "Inactive Users Only". This setting lets you include only users who haven't signed in for a selected period. In this demo, it is unchecked to include everyone.

![The image shows a Microsoft Azure interface for setting up a new access review, with options to select review type, scope, and group settings. A warning about license requirements for preview capabilities is also displayed.](https://kodekloud.com/kk-media/image/upload/v1752881949/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Implement-access-reviews/azure-access-review-setup-interface.jpg)

4.  **Configure the Review Process:**
    - Choose between a single-stage or multi-stage review. For simplicity, this guide uses a single-stage review.
    - Specify the reviewers. Options include group owners, selected users, users reviewing their own access, or managers. In this example, group owners serve as reviewers.
    - Optionally, designate fallback reviewers (such as group or global administrators) to step in if primary reviewers do not respond.

5.  **Set Recurrence and Duration:**
    - Define the review duration (for instance, six days).
    - Set the recurrence policy (one-time, weekly, monthly) and select the start date.

6.  **Complete the Review Settings:**
    - In the "Settings" section, choose the action upon review completion. Options include auto-applying changes, removing access, approving access, or taking no action if no modifications are recommended.
    - Configure email notifications for review completion and enable reviewer decision helpers. These helpers provide recommendations—such as identifying inactive users or assessing user-to-group affiliations—to support informed decision-making.
    - Advanced settings also allow you to require justifications when approving or denying access and set up reminder notifications.

![The image shows a Microsoft Azure interface for setting up a new access review, where users can specify reviewers, review duration, and recurrence. A warning about license requirements for preview capabilities is also displayed.](https://kodekloud.com/kk-media/image/upload/v1752881950/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Implement-access-reviews/azure-access-review-setup-interface-2.jpg)

![The image shows a Microsoft Azure portal page for setting up a new access review, with options for configuring completion settings and reviewer decision helpers. A warning about license requirements for preview capabilities is also displayed.](https://kodekloud.com/kk-media/image/upload/v1752881954/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Implement-access-reviews/azure-portal-access-review-setup.jpg)

7.  **Finalize the Review:**
    - Provide a descriptive name for the review (e.g., "Demo Review" for demonstration).
    - Click "Review and Create" to launch the Access Review. The review will be scheduled based on the recurrence policy, and notifications will be sent to relevant group administrators.

![The image shows a Microsoft Azure portal page for creating a new access review, with fields for naming the review and confirming details. A warning about license requirements for preview capabilities is also displayed.](https://kodekloud.com/kk-media/image/upload/v1752881956/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Implement-access-reviews/azure-portal-access-review-creation.jpg)

> [!important]
> **Note**
>
> Ensure that your Azure AD environment meets all licensing requirements for preview capabilities when accessing advanced Access Review settings.

---

## Conclusion

Azure AD Access Reviews offer a robust mechanism to manage permissions effectively across your organization. By regularly validating access rights, you reduce security risks, stay compliant with audit requirements, and ensure that all users have appropriate access levels.

This guide is part of a broader series on Azure Resource Manager. Upcoming sections will delve into implementing RBAC policies and other related topics. If you have experience with the [AZ-104: Microsoft Azure Administrator](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator) course, this content will reinforce your existing skills. For beginners, further detailed explanations are forthcoming.

Thank you for reading this article.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/d856cd5d-a782-4723-82b7-5a6e69cba71d/lesson/db52cbdf-8b51-4780-bd6b-6735f8af7285)**
>
> Watch video content
