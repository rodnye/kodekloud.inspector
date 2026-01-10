# Design for governance - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-governance-solution/Design-for-governance)

---

## Table of Contents

- Design for governance
  - Understanding the Azure Hierarchy
  - Governance Strategies and Inheritance
  - Next Steps
  - Watch Video

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a governance solution

# Design for governance

In this article, we explore the hierarchy within Azure governance and explain how it streamlines the management and control of an organization’s resources.

Azure enables you to build a hierarchy that mirrors your organizational structure. Whether your organization consists of multiple departments, business units, or subscriptions, this model helps you assign roles, enforce policies, and manage access controls at various levels.

## Understanding the Azure Hierarchy

At the apex of the hierarchy are management groups. These groups provide a scope above subscriptions, allowing you to group subscriptions together and apply governance settings uniformly across the organization.

When you log into the Azure portal, you start with the default root management group that is automatically created. From there, you can create additional management groups up to six levels deep (excluding the root). For example, your hierarchy might look like this:

- Root Management Group
  - IT Management Group
    - Production Management Group
    - Development Management Group
  - Finance Management Group

Each management group acts as a container for subscriptions. Inside each subscription, resource groups are used to organize individual resources such as virtual machines, databases, and networking components.

The hierarchical design simplifies the implementation of policies, access control, and cost management. If an organization-wide policy is required, you can apply it at the root management group level to automatically propagate it to all child management groups, subscriptions, and resources.

Consider the following diagram that illustrates this structure:

![The image illustrates a hierarchy of management groups, subscriptions, resource groups, and resources, explaining their roles and relationships. It includes a diagram showing a root management group branching into IT and Finance, with further subdivisions leading to specific subscriptions.](https://kodekloud.com/kk-media/image/upload/v1752866935/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-governance/management-hierarchy-diagram-subscriptions.jpg)

## Governance Strategies and Inheritance

Implementing governance strategies such as policies, role-based access control, tagging, and cost management becomes more efficient with this hierarchical approach. Controls applied at a higher level automatically inherit to all levels below. For example:

- A policy applied at the root management group level affects every child subscription and resource.
- A role assignment made at the IT management group level is inherited by both the production and development management groups, as well as any subscriptions under them.
- Adding a new subscription (e.g., Subscription D under the production management group) will automatically incorporate policies and configurations applied at the IT group level.

> [!important]
> **Note**
>
> By centralizing policy application, you reduce administrative overhead and ensure consistency across your organization.

## Next Steps

With a clear understanding of the Azure governance hierarchy and the inheritance of policies, access controls, and cost management strategies, the next step is to dive deeper into designing and configuring management groups. In the following section, we will explain how to set up and optimize these management groups to enhance your overall governance strategy.

For additional details and best practices, consider exploring the following resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Azure Governance Documentation](https://docs.microsoft.com/en-us/azure/governance/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/4e67e086-384c-4b65-a1e4-fe8c434076c4/lesson/d6dfce0d-f856-4a40-812e-084da5b9ab88)**
>
> Watch video content
