# Design for resource groups - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-governance-solution/Design-for-resource-groups)

---

## Table of Contents

- Design for resource groups
  - Grouping Strategies
  - Role-Based Access Control and Policies
  - Conclusion
  - Watch Video
    - Grouping by Application
    - Grouping by Resource Type

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a governance solution

# Design for resource groups

Resource groups serve as logical containers within an Azure subscription, enabling you to organize resources based on various criteria. Grouping resources helps apply policies, manage access control, and streamline the resource lifecycle. Choosing the right grouping strategy depends on your organizational structure and operational requirements.

## Grouping Strategies

### Grouping by Application

A common strategy for resource organization is grouping by application. In this approach, all components and dependencies of a solution—such as a web application and its associated SQL database—are placed together in a single resource group. This setup simplifies policy application and access control, and it facilitates resource lifecycle management. For instance, when an application is retired, deleting its resource group automatically removes all related resources.

> [!important]
> **Tip**
>
> Grouping by application is ideal for solutions where the components have a tightly coupled lifecycle.

### Grouping by Resource Type

Another practical method is organizing resources by type. For example, you might maintain one resource group for web applications (App Services) and a separate one for databases. Although the resources reside in different groups, their connectivity and overall functionality remain intact. This strategy is particularly useful when resources require independent management or scaling based on their type.

Additional grouping criteria may include department or cost center, geography (region or location), and resource lifecycle considerations. However, it's essential to balance these strategies to avoid excessive administrative complexity from managing too many resource groups.

![The image is a diagram illustrating the design of resource groups in Azure, showing options to group by app or by type, with considerations for management, access controls, and compliance.](https://kodekloud.com/kk-media/image/upload/v1752866936/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-resource-groups/azure-resource-groups-design-diagram.jpg)

## Role-Based Access Control and Policies

Resource groups also serve as a scope for applying role-based access control (RBAC) and policies, similar to management groups and subscriptions. Any roles or policies assigned at the resource group level are inherited by all underlying resources. It is crucial to plan your compliance and access control structures carefully when designing your resource group hierarchy.

> [!important]
> **Important**
>
> When configuring RBAC and policies, ensure that the inheritance of permissions aligns with your organizational security practices.

## Conclusion

Designing your Azure resource groups with a clear grouping strategy—whether by application, resource type, department, or other criteria—simplifies resource management and enforces policies effectively. This structured approach not only streamlines operations but also aids in maintaining cost control and ensuring compliance within your Azure environment.

In the next lesson, we will explore best practices for resource tagging, a crucial aspect of governance as highlighted in the [AZ-104: Microsoft Azure Administrator](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator) course. Stay tuned to learn how effective resource tagging can enhance your governance strategy.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/4e67e086-384c-4b65-a1e4-fe8c434076c4/lesson/17f5cd5b-4dd1-401a-96ab-5e7a1e69dd36)**
>
> Watch video content
