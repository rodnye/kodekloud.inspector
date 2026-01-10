# Azure Policies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ900-Microsoft-Azure-Fundamentals/Governance-and-Compliance/Azure-Policies)

---

## Table of Contents

- Azure Policies
  - Key Features of Azure Policy
  - Benefits and Use Cases
  - Azure Policy Demonstration in the Azure Portal
  - Watch Video
    - Example: Allowed Locations Policy

---

## Content

AZ900: Microsoft Azure Fundamentals

Governance and Compliance

# Azure Policies

Azure Policies empower organizations, such as Bella Innovations, to enforce organizational standards and ensure compliance with industry benchmarks like ISO 27001 and PCI DSS. This comprehensive guide explains how to use Azure Policies to assess compliance and enforce regulatory standards.

![The image shows a diagram titled "Enforcing Organizational Standards – Challenge," featuring two standards: ISO:27001 and PCI-DSS.](https://kodekloud.com/kk-media/image/upload/v1752868366/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Policies/enforcing-organizational-standards-diagram.jpg)

Azure Policy is a service designed to help you create, assign, and manage policies that govern your resources effectively. By ensuring all resources adhere to your organizational standards and service level agreements (SLAs), Azure Policy plays a crucial role in maintaining compliance. Below, we showcase a practical example of its usage.

![The image illustrates the process of Azure Policies, highlighting steps to create, assign, and manage policies, with a focus on standards and agreements.](https://kodekloud.com/kk-media/image/upload/v1752868367/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Policies/azure-policies-creation-management.jpg)

Imagine your organization restricts resource deployments to only the East US and West US regions. Even if users have permission to deploy resources in any region, a policy can enforce this constraint. During deployment, a validation process checks the selected region against the policy. If the region is not among the allowed locations, the deployment is blocked.

![The image illustrates Azure Policies with two resource locations, "East US" and "West US," represented by colored squares. A green icon with a document symbol is also present.](https://kodekloud.com/kk-media/image/upload/v1752868368/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Policies/azure-policies-east-west-diagram.jpg)

## Key Features of Azure Policy

1.  **Policy Definitions**: Establish the core rules and effects to enforce when resource configurations do not comply.
2.  **Policy Assignments**: Assign policies at various scopes, including resource groups, subscriptions, or management groups.
3.  **Compliance Reporting**: Track and report on the compliance status of resources, ensuring alignment with standards like PCI DSS.

![The image outlines the key features of Azure Policies, including Policy Definitions, Policy Assignment, and Compliance Reporting, each represented with icons and numbered sections.](https://kodekloud.com/kk-media/image/upload/v1752868368/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Policies/azure-policies-key-features-diagram.jpg)

## Benefits and Use Cases

Azure Policy provides numerous benefits:

- **Enforcing Compliance**: Guarantees that all resources meet corporate and regulatory standards.
- **Preventing Configuration Drift**: Automatically maintains consistency by blocking unauthorized changes.
- **Customizable Control**: Allows you to tailor policies specific to your organizational needs.

![The image outlines the benefits of Azure Policies, highlighting three key points: enforcing compliance, preventing configuration drift, and offering customizable control.](https://kodekloud.com/kk-media/image/upload/v1752868369/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Policies/azure-policies-benefits-outline.jpg)

Azure Policy is an ideal solution for maintaining security standards and managing costs in your Azure environment. For example, by restricting the deployment of expensive virtual machine sizes, you can prevent unintended cost overruns.

![The image outlines three use cases for Azure Policies: maintaining security standards, controlling costs effectively, and enforcing company policies in Azure.](https://kodekloud.com/kk-media/image/upload/v1752868370/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Policies/azure-policies-use-cases-diagram.jpg)

## Azure Policy Demonstration in the Azure Portal

Within the Azure Portal, navigate to the Policy section to view compliance data. The dashboard provides an overview of your resource compliance status, highlights non-compliant initiatives, and offers detailed policy insights.

![The image shows a Microsoft Azure Policy dashboard displaying compliance data, including overall resource compliance, non-compliant initiatives, and policies. It features a pie chart and a table with details on compliance states and resources.](https://kodekloud.com/kk-media/image/upload/v1752868372/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Policies/azure-policy-dashboard-compliance-data.jpg)

Under the **Definitions** section, you can explore built-in policies and create customized ones. Initiatives, which are groups of related policies, can also be assigned together for simplified management.

![The image shows a Microsoft Azure portal page displaying a list of policy definitions, including details like name, definition location, policies, type, and category.](https://kodekloud.com/kk-media/image/upload/v1752868373/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Policies/azure-portal-policy-definitions.jpg)

> [!important]
> **Tip**
>
> Review the built-in policies as a starting point, then customize or combine them as needed to suit your organizational requirements.

### Example: Allowed Locations Policy

An example of a built-in policy is the "Allowed locations" policy, which restricts resource deployments to approved regions. Below is the JSON definition for this policy:

```
{
  "properties": {
    "displayName": "Allowed locations",
    "policyType": "BuiltIn",
    "mode": "Indexed",
    "description": "This policy enables you to restrict the locations your organization can specify when deploying resources. Use to enforce your geo-compliance requirements. Excludes resource groups, Microsoft.AzureActiveDirectory.",
    "metadata": {
      "version": "1.0.0",
      "category": "General"
    },
    "version": "1.0.0",
    "parameters": {
      "listOfAllowedLocations": {
        "type": "Array",
        "metadata": {
          "description": "The list of locations that can be specified when deploying resources.",
          "strongType": "Location",
          "displayName": "Allowed locations"
        }
      }
    },
    "policyRule": {
      "if": {
        "field": "Location",
        "notIn": "[parameters('listOfAllowedLocations')]"
      },
      "then": {
        "field": "Location",
        "equals": "global"
      }
    }
  }
}
```

To enforce this policy, follow these steps:

1.  Click on **Assign Policy**.
2.  Choose the appropriate target scope (management group, subscription, or resource group). You can also specify exclusions for certain resource groups.
3.  Enter a meaningful assignment name and description.
4.  In the assignment parameters, select the allowed regions such as East US and West US.

![The image shows a Microsoft Azure portal interface for setting up a policy assignment with options for defining allowed locations, exclusions, and scope settings. The user can specify details like subscription, resource group, and assignment name.](https://kodekloud.com/kk-media/image/upload/v1752868374/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Policies/azure-portal-policy-assignment-settings.jpg)

Under the parameters, select the desired regions. For example:

![The image shows a Microsoft Azure portal screen where a user is selecting allowed locations, with "East US" checked in a dropdown menu.](https://kodekloud.com/kk-media/image/upload/v1752868375/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Policies/azure-portal-allowed-locations-dropdown.jpg)

Optionally, you can add a custom non-compliance message that will be shown when a resource deployment is denied. After configuring the assignment, click **Create**. Note that while policy enforcement begins immediately, it might take 5 to 15 minutes for the changes to propagate.

> [!important]
> **Verification**
>
> To verify the policy, navigate to a resource group where it’s applied and attempt to create a resource (for example, a Storage Account). If you choose a region outside the allowed set (e.g., Canada Central), the deployment will be blocked during the validation phase. Conversely, choosing an allowed region like West US permits the deployment.

This demonstration clarifies how Azure Policy governs resource deployment locations efficiently, adding an extra layer of control alongside resource locks.

For further details, visit the [Azure Policy Documentation](https://docs.microsoft.com/en-us/azure/governance/policy/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az900-microsoft-azure-fundamentals/module/8a56eadd-85fb-481a-8092-da2e93436abf/lesson/921c0e0d-9306-41e1-a209-1563539d87e2)**
>
> Watch video content
