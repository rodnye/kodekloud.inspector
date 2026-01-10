# Compare and contrast Azure RBAC vs Azure policies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Enterprise-Governance/Compare-and-contrast-Azure-RBAC-vs-Azure-policies)

---

## Table of Contents

- Compare and contrast Azure RBAC vs Azure policies
  - Azure RBAC (Role-Based Access Control)
  - Azure Policy
  - Summary
  - Watch Video

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Enterprise Governance

# Compare and contrast Azure RBAC vs Azure policies

In this article, we explore two fundamental aspects of Azure governance: Azure Role-Based Access Control (RBAC) and Azure Policy. Although both are critical for managing your Azure environment, they serve distinct purposes in addressing resource access and configuration compliance.

## Azure RBAC (Role-Based Access Control)

Azure RBAC focuses on controlling who can perform actions on which resources. It assigns permissions at various scopes, including management groups, subscriptions, resource groups, or even individual resources. Essentially, RBAC grants or denies permissions to users based on their roles.

For example, a database administrator may be given a role that allows the management of Azure SQL databases but restricts modifications to virtual machines. In practical terms, you might assign John, a database administrator, permissions to read, write, and delete SQL databases within a specific subscription (e.g., Subscription A).

> [!important]
> **Key Information**
>
> Azure RBAC is essential for enforcing secure administrative controls and ensuring that only authorized personnel can perform critical operations.

## Azure Policy

Unlike RBAC, Azure Policy is concerned with the configuration settings and properties of resources. Its purpose is to ensure that all resources comply with organizational rules and standards. By enforcing policies, you can guarantee that your resources always meet established guidelines.

For instance, you might deploy a policy that prevents the creation of storage accounts without encryption or one that enforces a standardized naming convention across all resources. With Azure Policy, you could require that every storage account in a given subscription, or any defined scope, has encryption enabled. Compliance reports can then be generated to review adherence to these standards.

> [!important]
> **Policy Enforcement**
>
> Using Azure Policy helps your organization maintain best practices and regulatory compliance by continuously monitoring and enforcing resource configurations.

## Summary

- **Azure RBAC:**  
  Controls which users have what level of access to specific resources. It is crucial for securing administrative actions and ensuring that only authorized personnel can perform specific tasks.
- **Azure Policy:**  
  Ensures that Azure resources are configured correctly and adhere to organizational and compliance standards. It is instrumental for enforcing best practices and meeting regulatory requirements.

Together, Azure RBAC and Azure Policy form a comprehensive governance framework that not only secures access to resources but also ensures that their configurations remain compliant. This dual approach is key to achieving robust security and operational efficiency in your Azure environment.

For more detailed information, see the official [Azure RBAC Documentation](https://docs.microsoft.com/en-us/azure/role-based-access-control/) and [Azure Policy Documentation](https://docs.microsoft.com/en-us/azure/governance/policy/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/3c48a4f2-a6f3-45fd-87d7-c53f36f2fb2a/lesson/03703e48-0b7c-4b49-b928-c140bf32b781)**
>
> Watch video content
