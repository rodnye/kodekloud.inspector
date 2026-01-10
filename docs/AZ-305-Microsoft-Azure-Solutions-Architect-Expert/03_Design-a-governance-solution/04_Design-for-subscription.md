# Design for subscription - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-governance-solution/Design-for-subscription)

---

## Table of Contents

- Design for subscription
  - Grouping Subscriptions with Management Groups
  - Understanding Subscription Quotas and Limits
  - Creating a Subscription for Shared Services
  - Policy Management and Access Control
  - Watch Video

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a governance solution

# Design for subscription

Subscriptions in Azure act as logical containers for deploying resources and serve as the billing unit. Every resource you deploy is billed at the subscription level. This guide covers essential design principles and best practices to create and manage subscriptions effectively.

## Grouping Subscriptions with Management Groups

Consider each subscription as a core management unit and view them under management groups. Management groups allow you to organize subscriptions based on regions, environments (such as production, development, or testing), or departments. For example, if the IT department requires separate production and development/test subscriptions, you can create distinct subscriptions and group them under a common management group. This method streamlines policy enforcement and access control at higher levels.

## Understanding Subscription Quotas and Limits

Every Azure subscription comes with Microsoft-defined quotas and limits that safeguard against overuse and ensure cost control. For instance, if a script is intended to deploy 10 virtual machines but mistakenly targets 100, the default quota—typically ranging from 10 to 20 vCores per subscription—will prevent the creation of all 100 VMs. This built-in mechanism is crucial for both testing environments and protection against accidental over-provisioning.

> [!important]
> **Note**
>
> Some subscription limits are soft and can be increased by contacting Microsoft support with a suitable business justification, while others are hard limits that cannot be altered.

## Creating a Subscription for Shared Services

For shared services such as firewalls, ExpressRoute, VPN gateways, or Virtual WAN, it is best to consolidate these in a dedicated subscription. These services often support multiple subscriptions within your environment by providing centralized on-premises connectivity and shared resources. Consolidating shared services into a single subscription is a critical step in building robust Azure landing zones, which integrate management groups, subscriptions, and resource groups into a cohesive design.

## Policy Management and Access Control

Subscriptions are an optimal scope for assigning policies and managing access controls. By implementing policies at the subscription level, all underlying resources automatically inherit these configurations, ensuring a consistent and secure environment. The diagram below provides a visual guide on designing Azure subscriptions, illustrating the grouping under management groups, quota considerations, shared services setup, and policy management and access:

![The image is a guide on designing Azure subscriptions, highlighting grouping under management, considering quotas and limits, setting up shared services, and managing policies and access. It includes a diagram with icons representing different Azure services.](https://kodekloud.com/kk-media/image/upload/v1752866938/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-subscription/azure-subscription-design-guide-diagram.jpg)

> [!important]
> **Warning**
>
> When setting up access control, always follow the principle of least privilege. Assign roles carefully at the subscription level, as permissions propagate to all associated resources, potentially increasing security risks if misconfigured.

With a robust understanding of subscription design, you are now prepared to explore the design principles for resource groups.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/4e67e086-384c-4b65-a1e4-fe8c434076c4/lesson/c5e06f00-62a0-4c51-8b82-9b2b4761c79a)**
>
> Watch video content
