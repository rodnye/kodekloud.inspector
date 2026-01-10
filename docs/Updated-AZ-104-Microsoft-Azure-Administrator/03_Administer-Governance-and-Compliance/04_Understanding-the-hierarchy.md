# Understanding the hierarchy - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Governance-and-Compliance/Understanding-the-hierarchy)

---

## Table of Contents

- Understanding the hierarchy
  - Overview of Azure's Hierarchy
  - Managing the Hierarchy in the Azure Portal
  - Conclusion
  - Watch Video

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Governance and Compliance

# Understanding the hierarchy

Effective management and organization of resources in Azure is essential for maintaining a well-structured cloud environment. Azure’s hierarchical framework organizes, manages, and secures multiple subscriptions and their associated resources. In this article, we explain how the hierarchy functions and why its structure is critical for implementing policies, managing access, and controlling costs.

## Overview of Azure's Hierarchy

At the very top of the hierarchy are management groups. These groups serve as a scope above individual subscriptions, allowing you to group multiple subscriptions together. By default, Azure creates a root management group for your organization. Beneath the root, you can establish up to six levels of nested management groups—forming a tiered structure that resembles a tree with many branches (excluding the root itself).

As shown in the diagram below, the hierarchy starts with the root management group at the top. It then branches into segments such as IT and Finance. For instance, within the IT branch, further subdivisions like production and development can be created. This logical structure is indispensable for the effective grouping and management of resources.

![The image is a hierarchical diagram explaining management groups, subscriptions, and resource groups, with a flow from the root management group to IT and Finance, and further to specific subscriptions. It includes text boxes describing the purpose and structure of these elements.](https://kodekloud.com/kk-media/image/upload/v1752884568/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Understanding-the-hierarchy/management-groups-subscriptions-diagram.jpg)

Within each management group, subscriptions are organized, and each subscription can contain one or more resource groups. These resource groups allow logical grouping of resources such as virtual machines, databases, and more. The cascading application of policies and permissions, known as inheritance, ensures consistent governance across your Azure environment. For example, granting access at the IT level automatically applies the same permissions to all underlying subscriptions and their resources, which is a fundamental aspect of Role Based Access Control (RBAC).

## Managing the Hierarchy in the Azure Portal

Working with management groups in the Azure portal is straightforward. Follow these steps to manage your Azure hierarchy effectively:

1.  **Viewing Management Groups and Subscriptions**  
    Open the Azure portal and navigate to the management groups section. Here, you will see the root group alongside various subscriptions and any additional management groups. Expanding a group may reveal, for example, three subscriptions under the IT category.
2.  **Creating a New Management Group**  
    If you need to create a new management group—say, one named AZ-104—enter the desired display name, and the group is created. Initially, AZ-104 will not have any subscriptions assigned. You can later move existing subscriptions into this group.

    ![The image shows a Microsoft Azure portal interface displaying management groups and subscriptions. It lists various groups and subscriptions with their types and IDs.](https://kodekloud.com/kk-media/image/upload/v1752884568/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Understanding-the-hierarchy/azure-portal-management-groups-subscriptions.jpg)

3.  **Adding a Subscription to a Management Group**  
    To add a subscription to the AZ-104 management group, navigate into the group and select the option to add a subscription.

    ![The image shows a Microsoft Azure portal interface where a user is adding a subscription to a management group named "AZ-104." The "Add subscription" window is open, displaying options for selecting a subscription.](https://kodekloud.com/kk-media/image/upload/v1752884569/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Understanding-the-hierarchy/azure-portal-add-subscription-az104.jpg)

4.  **Verifying the Hierarchy**  
    After adding subscriptions, refresh the hierarchy view. This ensures that the subscriptions now appear correctly under the AZ-104 group.

    ![The image shows a Microsoft Azure portal interface displaying details of a management group named "AZ-104," including its subscriptions and related information. The interface includes options for creating, adding subscriptions, and managing access control.](https://kodekloud.com/kk-media/image/upload/v1752884570/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Understanding-the-hierarchy/azure-portal-management-group-az104.jpg)

5.  **Reorganizing Subscriptions**  
    In cases where a subscription isn’t in its appropriate management group—such as appearing under the root instead of the IT group—you can easily move it. Click on the subscription options (typically represented by three dots), select "Move," choose the target group (e.g., IT), and then click "Save." This action helps maintain an organized and logical hierarchy.

> [!important]
> **Helpful Tip**
>
> Remember, applying RBAC policies at a higher level will automatically propagate permissions to all child resources, saving time and ensuring consistency.

## Conclusion

The Azure resource hierarchy—comprising management groups, subscriptions, resource groups, and the resources themselves—is vital for efficient policy implementation, access control, and cost management. A solid understanding of this structure not only simplifies governance but also supports scalable management strategies within your Azure environment.

Stay tuned for our next discussion, where we will explore Azure Resource Tags in detail.

![The image shows a Microsoft Azure portal page displaying management groups and subscriptions, with details such as names, types, IDs, and total subscriptions.](https://kodekloud.com/kk-media/image/upload/v1752884571/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Understanding-the-hierarchy/azure-portal-management-groups-subscriptions-2.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/df99187b-f512-443a-a64b-93af9d73c5bc/lesson/18b3faf0-1c52-443b-9ca9-07b37e8e4491)**
>
> Watch video content
