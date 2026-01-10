# Configuring Initiatives - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Governance-and-Compliance/Configuring-Initiatives)

---

## Table of Contents

- Configuring Initiatives
  - Creating an Initiative Definition
  - Assigning the Initiative
  - Testing and Validating Policies
  - Summary
  - Watch Video
    - Testing the Tag Policy
    - Testing the Allowed Resource Types Policy
    - Testing the Allowed Virtual Machine Sizes Policy
    - Testing the Storage Account Deployment and Inherited Tag Policy

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Governance and Compliance

# Configuring Initiatives

This article explains how to configure initiatives in Azure Policy by combining multiple policy definitions into one cohesive initiative. We will walk you through the process of creating, assigning, and validating the effects of an initiative on your resource deployments.

The available individual policy definitions include:

- Required Tags
- Inherited Tags
- Allowed Virtual Machine SKUs
- Allowed Resource Group Locations
- Allowed Resource Types

All these policies can be combined under a single initiative.

![The image illustrates Azure Policy use cases, highlighting features like allowed resource types, resource group locations, virtual machine SKUs, required and inherited tags, and allowed locations. It includes a central graphic with colorful segments representing each use case.](https://kodekloud.com/kk-media/image/upload/v1752884537/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Configuring-Initiatives/azure-policy-use-cases-illustration.jpg)

Below is an in-depth guide on how to create an initiative directly from the Azure portal.

## Creating an Initiative Definition

1.  Open the Azure portal and navigate to **Policy Definitions**.
2.  Choose to create a new initiative definition.
3.  For the location, select IT (or your preferred location). Set the name as "KodeKloud Standard Policies" to align with your organizational requirements.

![The image shows a Microsoft Azure portal interface for creating a new initiative definition. It includes fields for initiative location, name, description, and category selection.](https://kodekloud.com/kk-media/image/upload/v1752884538/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Configuring-Initiatives/azure-portal-initiative-definition.jpg)

4.  Under **Category**, you can create a new category (e.g., "KodeKloud") or use an existing one to group your policies.
5.  Add the necessary policy definitions to the initiative:
    - **Require a tag and its value on Resource Groups**
    - **Allowed Virtual Machine SKUs**
    - **Allowed Resource Types**

![The image shows a Microsoft Azure portal interface for adding policy definitions to an initiative. It includes options for selecting policies like "Allowed virtual machine size SKUs" under the "Policies" tab.](https://kodekloud.com/kk-media/image/upload/v1752884540/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Configuring-Initiatives/azure-portal-policy-definitions-initiative.jpg)

6.  Optionally, include the **Inherit tags from Resource Groups** policy. For better organization, you can create groups (e.g., "tags group" for tag-related policies and "resource types" for policies related to allowed resource types).
7.  Configure the initiative parameters next. Although the initiative itself may not require parameters, individual policies do. For example:
    - The tag policy requires a tag named "environment" with a fixed value of "POC".
    - The allowed VM sizes policy requires a set of approved sizes.
    - The allowed resource types policy requires allowed resources (e.g., Virtual Machines under Microsoft.Compute and Storage accounts under Microsoft.Storage).
    - The inherited tag policy ensures that resources inherit the environment tag from the resource group.

    For the parameter configuration:
    - Set the **environment** parameter value to "POC".
    - Limit the allowed virtual machine sizes to approved values such as **B1S** and **B1MS**.

![The image shows a Microsoft Azure portal screen for defining an initiative, specifically focusing on setting policy parameters such as tags and allowed virtual machine size SKUs. A dropdown menu is open for selecting virtual machine sizes.](https://kodekloud.com/kk-media/image/upload/v1752884541/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Configuring-Initiatives/azure-portal-initiative-policy-settings.jpg)

8.  For allowed resource types, specify:
    - Virtual Machines (under Microsoft.Compute)
    - Storage accounts (from Microsoft.Storage)

9.  For the inherited tag policy, ensure that the resource inherits the "environment" tag from the resource group.

![The image shows a Microsoft Azure portal screen for defining policy parameters in an initiative. It lists various parameters with their types and values, such as tag names and allowed resource types.](https://kodekloud.com/kk-media/image/upload/v1752884543/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Configuring-Initiatives/azure-portal-policy-parameters-initiative.jpg)

10. Click **Review and Create** to save the initiative definition. This step only creates the definition; it does not assign it.

![The image shows a Microsoft Azure portal screen displaying the "KodeKloud Standard Policies" initiative definition, which includes a list of policies with details such as reference ID, type, evaluation type, and default effect.](https://kodekloud.com/kk-media/image/upload/v1752884544/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Configuring-Initiatives/azure-portal-kodekloud-policies-definition.jpg)

## Assigning the Initiative

1.  Navigate to the initiative definitions and select the "KodeKloud Standard Policies" initiative.
2.  Click **Assign Initiative**. The defined scope (in this case, IT) will be applied. If the target subscription (e.g., POC2) is not within IT, it will not be visible. To assign the initiative at a broader scope, consider creating it at the tenant root level.

![The image shows a Microsoft Azure portal page for assigning "KodeKloud Standard Policies," with fields for scope, exclusions, and basic settings.](https://kodekloud.com/kk-media/image/upload/v1752884545/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Configuring-Initiatives/azure-portal-kodekloud-policies-2.jpg)

3.  If needed, move subscriptions between management groups (for example, moving the POC2 subscription to IT) to ensure the correct scope.
4.  Return to the policy definitions page to verify that the location is correctly set (e.g., 001 for IT). Then, assign the initiative to the desired subscription (e.g., POC2). You may also select a specific Resource Group; however, for demonstration purposes, leaving the Resource Group selection empty showcases how the policy (like the tag requirement) works at a broader level.

![The image shows a Microsoft Azure portal interface for assigning a policy initiative named "KodeKloud Standard Policies." It includes options for setting the scope, exclusions, and policy enforcement.](https://kodekloud.com/kk-media/image/upload/v1752884546/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Configuring-Initiatives/azure-portal-kodekloud-policies-3.jpg)

5.  Review the assignment and click **Create**. The assignment process will take a few moments, and a confirmation will appear once role assignments have succeeded. Note that the policy for inheriting tags requires a role (such as Tags Contributor) for the policy identity, which is why a role assignment is necessary.

![The image shows a Microsoft Azure portal screen where a user is creating an initiative assignment for "KodeKloud Standard Policies." The screen displays details like scope, policy definition, and enforcement status, with options to create, cancel, or navigate through the process.](https://kodekloud.com/kk-media/image/upload/v1752884547/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Configuring-Initiatives/azure-portal-kodekloud-initiative.jpg)

## Testing and Validating Policies

After assigning the initiative, the following policies are enforced:

- Allowed Resource Types
- Require a Tag and Its Value on Resource Groups
- Inherit Tags from Resource Groups
- Allowed Virtual Machine Sizes

### Testing the Tag Policy

1.  Navigate to **Resource Groups**.
2.  Attempt to create a new resource group without a tag. For example, create a Resource Group named "azpolicy-check-rg" in the approved region (e.g., East US), leaving the tags section empty.
3.  The creation process will fail with an error similar to:

    > [!important]
    > **Error Example**
    >
    > ```
    > {
    > "error": {
    > "code": "RequestDisallowedByPolicy",
    > "target": "azpolicy-check-rg",
    > "message": "Resource 'azpolicy-check-rg' was disallowed by policy. Policy identifiers: '[{\"policyAssignment\":{\"name\":\"Kodekloud Standard Policies\", ...",
    > "additionalInfo": [
    > {
    > "type": "PolicyViolation",
    > "info": {
    > "evaluationDetails": {
    > "evaluatedExpressions": [
    > {
    > "result": "True",
    > "expressionkind": "Field",
    > "expressionType": "path",
    > "expressionValue": "Microsoft.Resources/subscriptions/resourceGroups",
    > "targetValue": "Microsoft.Resources/subscriptions/resourceGroups",
    > "message": "Equals"
    > }
    > ]
    > }
    > }
    > }
    > ]
    > }
    > }
    > ```

    The error indicates that the policy requires a tag named "environment" with the value "POC."

4.  To fix the error, enter the tag "environment" with the value "POC." Using a different value, such as "prod," will result in a similar denial message:

    > [!important]
    > **Incorrect Tag Value**
    >
    > ```
    > {
    > "policySetDefinitions": [
    > "b54394e9e80747e89838764e"
    > ],
    > "additionalInfo": {
    > "type": "PolicyViolation",
    > "info": {
    > "evaluationDetails": {
    > "evaluatedExpressions": [
    > {
    > "result": "True",
    > "expressionKind": "Field",
    > "expression": "type",
    > "path": "type",
    > "expressionValue": "Microsoft.Resources/subscriptions/resourceGroups",
    > "targetValue": "Microsoft.Resources/subscriptions/resourceGroups",
    > "operator": "Equals"
    > },
    > {
    > "result": "True",
    > "expressionKind": "Field",
    > "expression": "tags[Environment]",
    > "path": "tags[Environment]",
    > "targetValue": "PoC",
    > "operator": "NotEquals"
    > }
    > ]
    > }
    > }
    > }
    > }
    > ```

5.  After setting the correct tag value ("POC"), the resource group creation will succeed.

### Testing the Allowed Resource Types Policy

1.  Try creating a Virtual Network. With the allowed resource types policy only permitting virtual machines and storage accounts, the Virtual Network creation should be blocked.
2.  The resulting validation error will indicate that the resource type for virtual networks is not approved.

### Testing the Allowed Virtual Machine Sizes Policy

1.  Create a new Virtual Machine in the Resource Group "Azure Policy Check RG" in the approved region (East US).
2.  When selecting a VM size, the dropdown will restrict options to the approved sizes. Only **B1S** and **B1MS** will appear. Selecting any other size will not be allowed.

![The image shows a Microsoft Azure portal page for selecting a virtual machine (VM) size, displaying various VM options with details like type, vCPUs, RAM, and cost per month.](https://kodekloud.com/kk-media/image/upload/v1752884549/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Configuring-Initiatives/azure-portal-vm-size-selection.jpg)

### Testing the Storage Account Deployment and Inherited Tag Policy

1.  Create a Storage Account in the Resource Group "Azure Policy Check." Use a valid name, select East US, and choose a cost-effective option like LRS.
2.  After deployment, verify that the storage account has automatically inherited the "environment: POC" tag from the Resource Group.

![The image shows the Microsoft Azure Policy Definitions page, listing various policy definitions with details such as name, definition location, policies, type, definition type, and category.](https://kodekloud.com/kk-media/image/upload/v1752884550/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Configuring-Initiatives/azure-policy-definitions-page.jpg)

Once the policies are deployed, you can check the compliance state in your Azure Policy dashboard:

![The image shows a Microsoft Azure portal page displaying compliance states for "KodeKloud Standard Policies," listing policy names, effect types, compliance states, and resource counts.](https://kodekloud.com/kk-media/image/upload/v1752884551/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Configuring-Initiatives/azure-portal-kodekloud-compliance.jpg)

## Summary

In this article, we demonstrated how to group multiple Azure policies into a single initiative to enforce compliance across your resources. The initiative covers policies for:

- Enforcing a required tag and its value on resource groups.
- Restricting allowed resource types.
- Limiting allowed virtual machine sizes.
- Automatically inheriting tags from resource groups.

By assigning this initiative at the appropriate scope, you can ensure that all resources under that scope adhere to your organization's standards.

For further clarity on how Azure Policy differs from Role-Based Access Control (RBAC), refer to the detailed discussions in the official [Azure Policy Documentation](https://learn.microsoft.com/en-us/azure/governance/policy/).

Happy configuring!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/df99187b-f512-443a-a64b-93af9d73c5bc/lesson/90e071df-9caa-4138-a4da-a51fee1e9132)**
>
> Watch video content
