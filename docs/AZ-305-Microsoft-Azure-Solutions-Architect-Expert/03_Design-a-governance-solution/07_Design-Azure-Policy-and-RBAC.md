# Design Azure Policy and RBAC - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-governance-solution/Design-Azure-Policy-and-RBAC)

---

## Table of Contents

- Design Azure Policy and RBAC
  - Azure Policy
  - Role-Based Access Control (RBAC)
  - Integrating Policy and RBAC
  - Watch Video
    - Best Practices for Policy Design
    - Remediation
    - Compliance Dashboard
    - Key RBAC Principles
    - Role Assignment Best Practices
    - Privileged Identity Management (PIM)
    - Deployment Process Example

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a governance solution

# Design Azure Policy and RBAC

This article provides an in-depth exploration of design considerations for Azure Policy and Role-Based Access Control (RBAC). It explains how policies enforce organizational standards and compliance while RBAC manages resource access. The sections below offer best practices, guidance on policy remediation, insights into compliance dashboards, and details on RBAC implementation.

## Azure Policy

Azure Policy enforces organizational standards and verifies compliance across your environment. It ensures that resources adhere to defined guidelines and offers a comprehensive dashboard to monitor compliance levels—including the compliant, non-compliant, and unchecked resources.

### Best Practices for Policy Design

- **Management-Level Policies:**  
  Define policies at the management group level to automatically inherit them across all underlying management groups, subscriptions, resource groups, and resources. Consider the following examples:
  - An auditing policy for SQL Servers assigned to a specific resource group.
  - A policy restricting allowed Virtual Machine SKUs (e.g., B-Series, DSV3, DSV4, DSV5, and FCDs) applied at the resource group level.
  - An organizational-level policy (e.g., restricting deployments to West Europe and North Europe) applied at the root management group to ensure consistency across all subscriptions and resources.

> [!important]
> **Note**
>
> Defining policies at a higher scope (such as the management group level) reduces administrative overhead and ensures uniform policy enforcement across all resources.

### Remediation

Azure Policy not only enforces compliance but also includes remediation plans that help correct non-compliant resources. However, it's important to note:

- For policies like allowed locations, if resources were deployed in regions such as East US or West US prior to the policy's assignment, remediation won’t automatically move these resources—manual intervention is required.
- Conversely, tasks like installing a missing Log Analytics Agent can be remediated automatically.

> [!important]
> **Warning**
>
> Even with effective policies, some remediation actions require manual redeployment. Always review the remediation plan details to avoid unsupported operations.

### Compliance Dashboard

The compliance dashboard provides a visual summary of policy assignments and their current status. Key aspects include:

- Overall percentages of compliant and non-compliant resources.
- Identification of resources failing to meet specified standards.
- Available actions for addressing non-compliance issues.

![The image is a diagram from KodeKloud titled "Design for policy," illustrating the enforcement of organizational standards and compliance through management-level policies, remediation, and compliance dashboards. It includes a flowchart showing allowed locations and specific resource group requirements.](https://kodekloud.com/kk-media/image/upload/v1752866930/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-Azure-Policy-and-RBAC/design-for-policy-diagram.jpg)

For example, an Azure initiative enforcing [PCI DSS standards](https://www.pcisecuritystandards.org) can be deployed to handle environments that manage sensitive credit card data. The compliance dashboard then monitors adherence, ensuring any deviations are promptly addressed.

## Role-Based Access Control (RBAC)

Role-Based Access Control (RBAC) is a key component of managing permissions and controlling resource access in Azure. Different roles help administer access at various scopes effectively.

### Key RBAC Principles

- **Built-in Roles:**  
  Common roles include:
  - **Reader:** Ideal for observers, auditors, and reviewers at the management group or resource group level.
  - **Contributor:** Suitable for developers and resource managers performing resource-specific tasks. Custom roles can further refine permissions.
  - **Owner:** Contains privileges to delegate access; use sparingly and reserve for administrators only.

- **Resource-Specific Roles:**  
  Azure also provides roles tailored for specific resources:
  - Virtual Machine Contributor for managing VMs.
  - Monitoring Contributor or Monitoring Reader for Azure Monitor.
  - Storage Blob Contributor for handling storage operations.

### Role Assignment Best Practices

- **Principle of Least Privilege:**  
  Grant users only the minimum necessary permissions.
- **Scope of Assignment:**  
  Assign roles at the highest viable level (e.g., Subscription level) to simplify management.
- **Group Assignment:**  
  Prefer grouping users and assigning roles to groups rather than individual users to ease administration during team transitions.
- **Owner Role Limitation:**  
  Minimize the number of users with Owner roles to reduce the risk of permission overlap or conflicts.

> [!important]
> **Best Practice**
>
> Always assign roles based on job function and limit high-privilege roles to specialized personnel.

### Privileged Identity Management (PIM)

Azure Privileged Identity Management (PIM) boosts security by requiring activation of elevated privileges only when necessary. Similar to using `sudo` in Linux, even users with Owner permissions must activate their role, provide justification, and specify a duration for elevated access. Once the duration expires, permissions are automatically revoked until reactivation is required.

![The image is a diagram illustrating role-based access controls for Azure RBAC, showing different roles like Reader, Built-in, Custom, Contributor, and Owner across various scopes such as Management Groups, Subscription, Resource Group, and Resources. It includes notes on best practices for access management.](https://kodekloud.com/kk-media/image/upload/v1752866931/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-Azure-Policy-and-RBAC/azure-rbac-access-controls-diagram.jpg)

## Integrating Policy and RBAC

Integrating Azure Policy and RBAC establishes a robust governance framework that both limits user permissions and enforces compliance with organizational standards.

### Deployment Process Example

When a user attempts to deploy a Virtual Machine, the following checks occur:

1.  **Permission Check (RBAC):**  
    The system first verifies the user's permissions at the Subscription, Resource Group, or Resource level.
2.  **Policy Evaluation:**  
    After confirming permissions, the system evaluates applicable policies:
    - _Regional restrictions:_ Only specified regions are allowed.
    - _SKU restrictions:_ Only permitted VM SKUs can be deployed.
    - _Tag requirements:_ Mandatory resource tagging may be enforced.

If all checks are successful, the deployment proceeds. However, if any constraints are violated (such as deploying in an unsupported region, using an incorrect SKU, or missing required tags), the deployment is automatically blocked.

![The image illustrates the process of combining Azure Policies and Role-Based Access Control (RBAC) to manage resource access and enforce compliance, showing decision points for permissions and restrictions.](https://kodekloud.com/kk-media/image/upload/v1752866933/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-Azure-Policy-and-RBAC/azure-policies-rbac-access-control.jpg)

This integrated approach guarantees that only compliant resources are deployed while maintaining stringent governance and secure access protocols.

---

This concludes our discussion on designing for Azure Policy and RBAC. For further details, visit the [Azure Documentation](https://docs.microsoft.com/en-us/azure/governance/) and explore additional resources on policy management and access control strategies.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/4e67e086-384c-4b65-a1e4-fe8c434076c4/lesson/462f5a5b-eb45-4f8c-bf22-bed5dfc87702)**
>
> Watch video content
