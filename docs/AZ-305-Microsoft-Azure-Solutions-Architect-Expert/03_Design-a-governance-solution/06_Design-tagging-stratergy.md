# Design tagging stratergy - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-governance-solution/Design-tagging-stratergy)

---

## Table of Contents

- Design tagging stratergy
  - Manual Tag Assignment and Inheritance
  - Types of Tags in Your Strategy
  - Tagging for Billing Purposes
  - Enhancing Governance with Azure Policy
  - Common Tag Categories
  - Custom Tags and Lifecycle Management
  - Final Thoughts
  - Watch Video

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a governance solution

# Design tagging stratergy

Resource tagging is a vital practice in Azure that involves adding metadata to your resources for easy identification, grouping, and categorization. Unlike access control and policies, which inherit settings from higher scopes, tags must be applied individually to each resource, resource group, or subscription. This guide explains how to implement a robust tagging strategy, the role of Azure Policy, and best practices for managing your Azure environment.

## Manual Tag Assignment and Inheritance

By default, you must assign tags manually to your Azure resources. For example, if you tag a subscription with values like "cost center: 112" or "department: HR", these tags do not automatically cascade to resource groups or individual resources. Each resource must be tagged independently unless you implement a policy that enforces inheritance.

![The image illustrates a concept of designing resource tags for Azure, showing how tags can be applied to different resource groups and individual resources. It includes a diagram with tags and icons representing various Azure services.](https://kodekloud.com/kk-media/image/upload/v1752866939/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-tagging-stratergy/azure-resource-tags-design-diagram.jpg)

However, using Azure Policy, you can enforce tag inheritance. For instance, if a resource group is tagged with “environment: production”, “cost center: 112A”, and “app name: WFM”, any new resource created within that group can automatically inherit these tags. This automation ensures consistency and reduces the overhead of manual tagging.

> [!important]
> **Tip**
>
> Consider implementing Azure Policy to automatically enforce tagging rules. This helps maintain consistent governance across your environment.

## Types of Tags in Your Strategy

When implementing a tagging strategy, it is important to consider two main types of tags:

1.  **Marketing-Aligned Tags**
    - These tags include information such as the cost center and finance department details, which are useful for billing and cost analysis.

2.  **Business-Aligned Tags**
    - These tags provide details such as product information, deployment environment (e.g., production or development), and the type of application running.

Based on your organizational needs, you can apply multiple tags at the subscription, resource group, or individual resource level. However, note that not all Azure resources support tagging, and some may not relay tag information to the billing system. Always review Microsoft’s documentation to confirm a resource’s compatibility.

![The image is an infographic about designing resource tags in Azure, showing how tags can be applied to resources and resource groups, with examples of tag structures. It includes illustrations of planes towing banners with tag information and a diagram of resource groups with tags.](https://kodekloud.com/kk-media/image/upload/v1752866940/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-tagging-stratergy/azure-resource-tags-infographic.jpg)

## Tagging for Billing Purposes

Tags are not only useful for organization but also for billing. For example, after downloading your billing CSV report, you can filter by cost center (e.g., "112" or "112A") in Excel to analyze all corresponding expenses. It is important to verify through Microsoft documentation that the target resource supports both tagging and billing integration before finalizing your strategy.

> [!important]
> **Important**
>
> Always ensure that critical resources support tagging and that tag metadata is included in billing reports, as this can affect cost management strategies.

## Enhancing Governance with Azure Policy

Azure Policy enables you to enforce mandatory tags and block deployments that do not meet tagging requirements. This is particularly useful in development and testing environments where users might forget to add the required tags during resource creation. With the right policy configurations, you can ensure that your governance and compliance standards are maintained.

## Common Tag Categories

A well-defined tagging strategy may include a variety of tag categories to cover all aspects of resource management. Here is an overview of common types of tags:

| Category       | Description                                                                 | Example                               |
| -------------- | --------------------------------------------------------------------------- | ------------------------------------- |
| Functional     | Identifies the application role (e.g., payroll application) or server tier. | `role: payroll` or `tier: tier-zero`  |
| Environment    | Indicates the deployment environment.                                       | `environment: production`             |
| Classification | Defines resource confidentiality and criticality.                           | `classification: internal`            |
| Billing        | Contains billing-related details such as department or cost center.         | `cost center: 112A`, `department: HR` |
| Ownership      | Provides contact information for resource accountability.                   | `owner: mark@xyz.com`                 |
| Purpose        | Describes the business process and its significance.                        | `purpose: HR portal`                  |

![The image is a table from KodeKloud titled "Design for resource tags," detailing types of resource tags, their definitions, and examples, such as functional, classification, billing, ownership, and purpose.](https://kodekloud.com/kk-media/image/upload/v1752866941/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-tagging-stratergy/design-for-resource-tags-table.jpg)

For smaller subscriptions, a detailed tagging strategy might seem unnecessary. However, as your environment scales to thousands of resources, tagging becomes essential for effective resource management, cost analysis, and operational efficiency.

## Custom Tags and Lifecycle Management

Custom tags can be designed to meet specific business needs. One common custom tag is the "end of life" tag, which might include a date (e.g., "July 2023"). This tag assists in forecasting resource lifecycles and managing associated costs.

By leveraging Azure Policy to enforce both tag inheritance and mandatory tagging, you eliminate much of the manual work and help prevent any oversight by users, thereby upholding governance standards.

## Final Thoughts

A comprehensive tagging strategy plays a crucial role in managing a complex Azure environment. It aids in resource identification, cost tracking, and operational governance. When combined with policies and role-based access control (RBAC), a solid tagging strategy forms the backbone of an effective Azure governance model.

For more details on designing resource tags and enforcing policies in Azure, refer to the official [Azure Documentation](https://docs.microsoft.com/en-us/azure/governance/policy/).

Happy tagging!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/4e67e086-384c-4b65-a1e4-fe8c434076c4/lesson/f8569ace-96bc-4ec8-85fc-a8ebd7510ea5)**
>
> Watch video content
