# Configure Azure Initiatives - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Enterprise-Governance/Configure-Azure-Initiatives)

---

## Table of Contents

- Configure Azure Initiatives
  - Creating an Initiative in the Azure Portal
  - Configuring Initiative Parameters
  - Assigning the Initiative
  - Validating Policy Compliance
  - Conclusion
  - Watch Video
    - Testing the "Require a Tag" Policy
    - Testing the "Allowed Resource Types" Policy
    - Testing the "Allowed Virtual Machine Sizes" Policy
    - Testing the "Allowed Storage Account" and "Inherited Tag" Policies

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Enterprise Governance

# Configure Azure Initiatives

In this lesson, you will learn how to group multiple Azure policies into a single initiative, making it easier to manage and assign a set of policies across your environment. The initiative in this lesson includes requirements such as enforcing required tags, allowing only specific virtual machine SKUs, limiting resource group locations, restricting allowed resource types, and automatically inheriting tags from resource groups.

![The image is an infographic about Azure Policy use cases, highlighting aspects like allowed resource types, required tags, and allowed locations, with a central graphic depicting interconnected elements.](https://kodekloud.com/kk-media/image/upload/v1752881781/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-Azure-Initiatives/azure-policy-use-cases-infographic.jpg)

> [!important]
> **Overview**
>
> Grouping policies into an initiative simplifies policy management and enforcement while ensuring consistency across your resources.

## Creating an Initiative in the Azure Portal

1.  **Open the Azure Portal:**
    - Navigate to **Policy Definitions**.
    - Create a new initiative definition. For this example, set the location to **IT** and name it **KodeKloud Standard Policies**. This initiative represents a collection of policies your organization mandates.

    ![The image shows a Microsoft Azure portal page for creating a new initiative definition, with fields for initiative location, name, description, and category.](https://kodekloud.com/kk-media/image/upload/v1752881782/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-Azure-Initiatives/azure-portal-initiative-definition.jpg)

2.  **Select a Category:**
    - You can create a new category or use an existing one (e.g., “KodeKloud”) to group policies.

3.  **Add Policy Definitions:**
    - Begin by adding policies. For instance, include the policy that requires a tag and its value on resource groups.

    ![The image shows a Microsoft Azure portal interface for adding policy definitions to an initiative, with options to require tags on resources or resource groups.](https://kodekloud.com/kk-media/image/upload/v1752881783/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-Azure-Initiatives/azure-portal-policy-initiative-tags.jpg)

4.  **Include Additional Policies:**
    - Add policies for allowed virtual machine SKUs, allowed resource types, and a policy for inherited tags (which ensures resources inherit a tag from the resource group).

    ![The image shows a Microsoft Azure portal interface for creating a new initiative definition, with options to add policy definitions. A list of policy names, categories, and types is displayed, with checkboxes for selection.](https://kodekloud.com/kk-media/image/upload/v1752881785/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-Azure-Initiatives/azure-portal-initiative-definition-2.jpg)

5.  **Organize Policies Using Groups (Optional):**
    - For better organization, group policies into related categories. For example, create a **Tags** group for tagging policies and a **Resource Types** group for policies related to allowed resources.

    ![The image shows a Microsoft Azure portal page for creating a new initiative definition. It displays a section for organizing policies into groups, with options to create a group and a list of existing groups like "Tags" and "ResourceTypes."](https://kodekloud.com/kk-media/image/upload/v1752881786/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-Azure-Initiatives/azure-portal-initiative-definition-3.jpg)

## Configuring Initiative Parameters

At the initiative level, no parameters need to be defined. However, individual policies within the initiative might require parameters. For example, the policy enforcing a tag requires:

- A tag name and value (e.g., the tag must be **Environment** with the value **POC**).
- Specific sets of allowable values for virtual machine SKUs and resource types.

Set the initiative parameter (in this case, **environment**) to **POC**.

![The image shows a Microsoft Azure portal screen for defining initiative parameters, specifically focusing on policy parameters like tag names and values for resource groups. Various fields are set for input, such as "Environment" for the tag name.](https://kodekloud.com/kk-media/image/upload/v1752881787/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-Azure-Initiatives/azure-portal-initiative-parameters.jpg)

For virtual machines, restrict sizes to **Standard_B** family options (e.g., B1S and B1MS). For resource types, restrict to **virtual machines** (Microsoft.Compute) and **storage accounts** (Microsoft.Storage). Ensure that the inherited tag policy confirms the **Environment** tag is required.

![The image shows a Microsoft Azure portal interface for defining initiative policy parameters, with options to set values for tags, virtual machine size SKUs, and resource types.](https://kodekloud.com/kk-media/image/upload/v1752881787/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-Azure-Initiatives/azure-portal-initiative-policy-parameters.jpg)

After reviewing the settings, create the initiative definition. Remember, this step only defines the initiative; you must assign it to the appropriate scope later.

## Assigning the Initiative

Once the initiative definition is created, assign it to the scope where the policies should take effect. The scope defines the resources the initiative targets. In this example, the scope has been set to **IT**—meaning only resources within IT (or its sub-hierarchy) are targeted.  
If you need the initiative to apply across subscriptions, consider defining it at the tenant root level.

For example, if your **POC2** subscription is not under IT, it will not appear during assignment. One solution is to move the POC2 subscription under IT using management groups.

![The image shows a Microsoft Azure portal interface for assigning a policy initiative called "KodeKloud Standard Policies." It includes fields for setting the scope, exclusions, assignment name, and policy enforcement options.](https://kodekloud.com/kk-media/image/upload/v1752881788/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-Azure-Initiatives/azure-portal-kodekloud-policies.jpg)

After selecting the appropriate subscription (e.g., POC2) and optionally leaving the resource group selection empty, review and create the assignment. The process may take some time, and progress can be monitored on the initiative dashboard. Role assignments, such as the **Tags Contributor** role, will be automatically created to support policies like "inherit tags from resource group."

![The image shows a Microsoft Azure Policy dashboard displaying compliance statistics, with a notification panel on the right indicating successful role and initiative assignments.](https://kodekloud.com/kk-media/image/upload/v1752881790/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-Azure-Initiatives/azure-policy-dashboard-compliance-stats.jpg)

> [!important]
> **Attention**
>
> Ensure that the proper role assignments are in place, as some policies (e.g., inherited tag policies) require the system to have sufficient permissions (like Tags Contributor) to automatically apply tag updates.

## Validating Policy Compliance

The initiative includes the following policies:

- **Allowed Resource Types:** Only virtual machines and storage accounts are permitted.
- **Required Tag on Resource Groups:** Each resource group must include the tag **Environment** with the value **POC**.
- **Inherited Tag Policy:** Resources must inherit the **Environment** tag from their resource group.
- **Allowed Virtual Machine Sizes:** Only the VM sizes B1S and B1MS are allowed.

### Testing the "Require a Tag" Policy

1.  Navigate to **Resource Groups** and attempt to create a new resource group without including any tags.
    - For example, name it **AC Policy Test** and choose an approved location (e.g., East US).

2.  Leave the tags section empty and click **Review and Create**.
3.  The creation process should fail with an error message similar to:

    > "Resource ACL policy check RG was disallowed by policy. The policy definition requires a tag named Environment with the value POC."

Below is an example JSON snippet that displays details of the policy violation when the required tag is missing or incorrect:

```
{
  "additionalInfo": [
    {
      "type": "PolicyViolation",
      "info": {
        "evaluationDetails": {
          "evaluatedExpressions": [
            {
              "result": "True",
              "expressionKind": "Field",
              "expression": "type",
              "path": "type",
              "expressionValue": "Microsoft.Resources/subscriptions/resourceGroups"
            },
            {
              "result": "True",
              "expressionKind": "Field",
              "expression": "tags[Environment]",
              "path": "tags[Environment]",
              "targetValue": "POC",
              "operator": "NotEquals"
            }
          ]
        }
      }
    }
  ],
  "policyDefinitionId": "/providers/Microsoft.Authorization/policyDefinitions/8c3da23-7156-49ed-b145-24f95f9dcbd6",
  "policySetDefinitionId": "/providers/Microsoft.Authorization/policySetDefinitions/b54394e980747e8983764e"
}
```

The policy requires the tag **Environment** to always have the value **POC**. Attempting to use any other value (e.g., "prod") results in immediate failure. Correcting the tag value to **POC** will allow the resource group creation to pass the policy check.

### Testing the "Allowed Resource Types" Policy

1.  Within the resource group that passed the required tag policy, attempt to create a virtual network.
2.  Although the selected location (e.g., East US) is approved, the creation will fail because the initiative restricts allowed resource types to virtual machines and storage accounts.

![The image shows a Microsoft Azure portal screen for creating a virtual network, with a validation error indicating that the resource "demo-vnet-4" was disallowed by policy. The error details and troubleshooting options are displayed on the right.](https://kodekloud.com/kk-media/image/upload/v1752881790/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-Azure-Initiatives/azure-portal-virtual-network-error.jpg)

The error confirms that virtual networks are not approved under the current initiative.

### Testing the "Allowed Virtual Machine Sizes" Policy

1.  Create a new virtual machine in the same resource group.
2.  Select an approved location (e.g., East US) and name the VM (for example, **Demo VM**).
3.  Upon selecting the VM size, the dropdown should only display **B1S** and **B1MS** as available options—other sizes are restricted by policy.

![The image shows a Microsoft Azure portal page for selecting a virtual machine (VM) size, displaying various VM options with details like type, vCPUs, RAM, and cost per month. Some VM sizes are marked as blocked by policy, indicating restrictions set by the organization.](https://kodekloud.com/kk-media/image/upload/v1752881792/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-Azure-Initiatives/azure-portal-vm-size-selection.jpg)

Selecting one of the allowed sizes confirms that the policy is working as intended.

### Testing the "Allowed Storage Account" and "Inherited Tag" Policies

1.  Create a new storage account—use a resource group that has passed the required tag policy (e.g., **Azure Policy Check**).
2.  Choose an approved location, use a random name, and select an appropriate SKU (e.g., LRS for cost efficiency).
3.  After deployment, verify that the storage account automatically inherits the **Environment POC** tag from its parent resource group.

![The image shows a Microsoft Azure portal interface displaying details of a storage account named "demoaz356453546," including its resource group, location, subscription, and various properties related to blob and file services.](https://kodekloud.com/kk-media/image/upload/v1752881793/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-Azure-Initiatives/azure-portal-storage-account-demoaz356453546.jpg)

This confirms that both the allowed storage account and inherited tag policies are effective.

## Conclusion

By grouping your policies into an initiative, you streamline policy management and ensure consistent enforcement across your Azure environment. In this lesson, you learned how to define an initiative that:

- Enforces required tags on resource groups,
- Restricts allowed resource types,
- Limits virtual machine sizes, and
- Automatically inherits tags to resources.

A common question is: What is the difference between policy and RBAC? While both are essential for governance, RBAC controls who can perform actions on resources, whereas policies enforce specific rules on resource configurations. We'll explore RBAC in further detail in the next lesson.

Happy learning!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/3c48a4f2-a6f3-45fd-87d7-c53f36f2fb2a/lesson/073e419b-05ae-439c-86bb-a8db7adb6d14)**
>
> Watch video content
