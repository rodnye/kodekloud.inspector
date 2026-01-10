# Configure Azure policies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Enterprise-Governance/Configure-Azure-policies)

---

## Table of Contents

- Configure Azure policies
  - Understanding Azure Policy Components
  - Common Use Cases for Azure Policy
  - Navigating Policies in the Azure Portal
  - Viewing Policy Definitions and Initiatives
  - Summary
  - Watch Video

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Enterprise Governance

# Configure Azure policies

Azure Policy is a powerful governance tool that enables you to set and enforce organizational rules across your Azure resources. With Azure Policy, you can define standards, identify non-compliant resources, and ensure that all deployments adhere to best practices as well as regulatory requirements. For example, if your organization requires that all resources be deployed in a specific region (e.g., East US or within the United States), you can enforce that rule, preventing deployments in unapproved regions such as Southeast Asia or Western Europe.

## Understanding Azure Policy Components

Azure Policy shares some similarities with Role-Based Access Control (RBAC) in terms of its key components. However, there are distinct differences. The main components of an Azure Policy include:

1.  **Definition**

    A policy definition is a JSON document that outlines the rule and specifies the actions to take when a resource is non-compliant. For instance, a built-in policy might enforce HTTPS on all storage accounts. The JSON document details the conditions that determine compliance and the effect (like denying a deployment) when those conditions are not met. While Azure provides built-in policies, you also have the option to create custom definitions.

2.  **Scope**

    The scope determines where the policy will be applied. This scope can include a management group, subscription, or resource group. Note that you cannot apply a policy to a single resource. When you define a broad scope (such as the entire subscription), the policy’s rules effectively govern all resources within that perimeter.

3.  **Assignment**

    After creating a policy definition, you need to assign it to a particular scope. Unlike RBAC assignments, which are often user-specific, policy assignments have an organizational impact. For example, if you have a policy that restricts the creation of public IP addresses, assigning this policy at the resource group level will block any attempt to create such IP addresses within that group.

4.  **Compliance**

    Once the policy is assigned, Azure continuously evaluates resources for compliance. Policies do not modify existing resources; they only affect future changes. For example, if a new policy restricts resource deployment outside the United States, resources already deployed in other regions will be marked as non-compliant. Administrators can then use compliance reports and remediation tasks to bring these resources into alignment with organizational standards.

![The image is an infographic about Azure Policy, explaining its components: Definition, Scope, Assignment, and Compliance, with a central graphic representing these elements.](https://kodekloud.com/kk-media/image/upload/v1752881794/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-Azure-policies/azure-policy-infographic-components.jpg)

## Common Use Cases for Azure Policy

Azure Policy can be applied in various scenarios. Here are some common use cases:

- **Required Tags:**  
  Tags function as metadata to organize resources and support billing processes. A required tags policy ensures that users add the necessary tags during resource deployment, preventing oversight.
- **Inherited Tags:**  
  By default, tags applied at the resource group or subscription level are not automatically inherited by underlying resources. A policy that enforces inherited tags ensures that all resources reflect the metadata from the higher-level scope.
- **Allowed Locations:**  
  To meet data residency and geopolitical requirements (e.g., GDPR), organizations can restrict deployments to specific regions. If a user attempts to deploy a resource outside the allowed locations, the policy will block the action.
- **Allowed Virtual Machine SKUs:**  
  This policy is useful in cost control scenarios by restricting high-cost virtual machine sizes in non-production environments, such as development or testing stages.
- **Allowed Resource Group Location:**  
  Although there is an allowed locations policy for resources, a similar policy can ensure that the resource group itself complies with location constraints. This is especially beneficial for managing metadata across regions.
- **Allowed Resource Type:**  
  To limit exposure to expensive services, organizations can restrict deployments to a pre-approved list of resource types (such as virtual machines, app services, databases, and virtual networks), preventing deployments of high-cost services like ExpressRoute.

## Navigating Policies in the Azure Portal

In this lesson, we explore how to interact with Azure Policies using the Azure portal.

1.  **Accessing Policies:**  
    Launch the Azure portal and search for "Policy." From here, you can view both built-in and custom policy definitions. You will also encounter the concept of an "initiative," which allows grouping multiple policies together. Initiatives simplify management by providing a consolidated compliance score, especially useful for regulatory standards like PCI DSS or FedRAMP.

    ![The image shows a Microsoft Azure Policy dashboard with an overview of resource compliance, indicating 100% compliance and no non-compliant policies or initiatives. The sidebar includes options like "Definitions" and "Assignments."](https://kodekloud.com/kk-media/image/upload/v1752881795/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-Azure-policies/azure-policy-dashboard-compliance.jpg)

2.  **Working with a Policy (Allowed Locations Example):**  
    Consider an example where you configure an “Allowed Locations” policy. In this case, the policy definition requires that the location property for a resource must be within a predefined list of allowed regions (or be designated as a global resource). If the specified condition fails, the policy denies the deployment.

    The snippet below shows a portion of such an allowed locations policy definition:

    ```
    {
      "metadata": {
        "description": "The list of locations that can be specified when deploying resources.",
        "strongType": "location",
        "displayName": "Allowed locations"
      }
    },
    {
      "policyRule": {
        "if": {
          "allOf": [
            {
              "field": "location",
              "notIn": "[parameters('listofAllowedLocations')]"
            },
            {
              "field": "location",
              "notEquals": "global"
            },
            {
              "field": "type",
              "notEquals": "Microsoft.AzureActiveDirectory/b2cDirectories"
            }
          ]
        },
        "then": {
          "effect": "deny"
        }
      },
      "$id": "/providers/Microsoft.Authorization/policyDefinitions/e569626a-4747-49cd-b67b-bfb01975c4c4",
      "type": "Microsoft.Authorization/policyDefinitions",
      "name": "e569626a-4747-49cd-b67b-bfb01975c4c4"
    }
    ```

    To assign this policy in the Azure portal, click on "Assign" and select the desired scope (e.g., a specific subscription or resource group). You can also specify exclusions if necessary.

    ![The image shows a Microsoft Azure portal screen for setting up a policy assignment with options to define scope, exclusions, and policy details for allowed locations.](https://kodekloud.com/kk-media/image/upload/v1752881796/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-Azure-policies/azure-portal-policy-assignment.jpg)

3.  **Configuring the Assignment:**  
    In the policy assignment configuration, provide a custom name (for example, "Core Cloud Allowed Locations") and a clear description (such as "List of allowed locations for deployment"). Ensure the policy is enabled (not in audit mode) so that it actively blocks non-compliant deployments. Next, configure the policy parameters by selecting "East US" and "West US" as the approved regions.

    ![The image shows a Microsoft Azure interface for assigning a policy titled "Allowed locations," with fields for scope, assignment name, and description.](https://kodekloud.com/kk-media/image/upload/v1752881797/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-Azure-policies/azure-policy-allowed-locations-interface.jpg)

    After reviewing your settings, click on "Review and create" to complete the assignment. Note that policy evaluation might take five to fifteen minutes to fully propagate.

4.  **Verifying Compliance:**  
    Once the policy is assigned, navigate to the policy assignments page and refresh it to view the compliance status. Initially, evaluation status may indicate that the policy has not yet been executed. As your resources (such as virtual networks) are evaluated, they will be marked as compliant or non-compliant based on the policy rules.

    ![The image shows the Microsoft Azure Policy Assignments page, displaying details about policy and initiative assignments within a specific subscription.](https://kodekloud.com/kk-media/image/upload/v1752881798/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-Azure-policies/azure-policy-assignments-page.jpg)

    > [!important]
    > **Note**
    >
    > If you test the policy by attempting to create a resource (for example, a virtual network) in an unapproved region (like Central US), the policy enforcement will block the deployment. There might be a slight delay before the policy fully takes effect. When triggered, the portal will eventually display a "forbidden" error along with detailed information.

    In such cases, you might see an error JSON similar to the one below:

    ```
    {
      "code": "RequestDisallowedByPolicy",
      "target": "demo-vnet-2",
      "message": "Resource 'demo-vnet-2' was disallowed by policy. Reasons: You need to deploy in East US or West US. See error details for policy resource IDs.",
      "additionalInfo": [
        {
          "type": "PolicyViolation",
          "info": {
            "evaluationDetails": {
              "evaluatedExpressions": [
                {
                  "result": "True",
                  "expressionKind": "Field",
                  "expression": "location",
                  "path": "location",
                  "expressionValue": "centralus",
                  "targetValue": [
                    "eastus",
                    "westus"
                  ],
                  "operator": "NotIn"
                },
                {
                  "result": "True",
                  "expressionKind": "Field",
                  "expression": "location",
                  "path": "location",
                  "expressionValue": "centralus",
                  "targetValue": [
                    "global"
                  ],
                  "operator": "NotEquals"
                }
              ]
            }
          }
        }
      ]
    }
    ```

    ![The image shows a Microsoft Azure portal page indicating a deployment failure for "demo-vnet-2" due to a policy disallowance, with details about the error and deployment.](https://kodekloud.com/kk-media/image/upload/v1752881800/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-Azure-policies/azure-portal-deployment-failure-demo-vnet-2.jpg)

5.  **Additional Testing: Storage Account Example**  
    To further validate your policy, try creating a storage account in an unapproved region (for example, Central US). The deployment attempt will be blocked, and an error will indicate that the allowed locations requirement is not met.

    ![The image shows a Microsoft Azure portal interface for creating a storage account, with fields for subscription, resource group, storage account name, region, performance, and redundancy options.](https://kodekloud.com/kk-media/image/upload/v1752881801/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-Azure-policies/azure-portal-storage-account-creation.jpg)

## Viewing Policy Definitions and Initiatives

Within the Azure portal, head over to the "Definitions" section to see all built-in and custom policies. Additionally, you will encounter the concept of initiatives—collections of policies that simplify assignment and compliance tracking. For example, regulatory standards like PCI DSS include initiatives containing numerous individual policies, making it easy to apply and manage compliance as a single cohesive unit.

![The image shows a Microsoft Azure portal page displaying the PCI DSS v4 policy definitions, including details like name, description, category, version, and a list of policies with their types and evaluation methods.](https://kodekloud.com/kk-media/image/upload/v1752881802/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-Azure-policies/azure-portal-pci-dss-policy-definitions.jpg)

## Summary

Azure Policy is an essential tool for enforcing organizational standards and ensuring compliance during resource deployment. By defining policies, setting the proper scope, and assigning them appropriately, you can guarantee that all resources adhere to your organizational requirements. Whether enforcing location restrictions, mandatory tags, or allowed resource types, Azure Policy streamlines the process and bolsters governance across your Azure environment.

For further details, review your policy assignments in the Azure portal. Remember, policy evaluation may take a few minutes to complete, and you can always test deployments to verify compliance. Once enforced, Azure Policy will prevent any non-compliant resource deployments—helping you maintain best practices throughout your Azure landscape.

Happy governing your Azure environment!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/3c48a4f2-a6f3-45fd-87d7-c53f36f2fb2a/lesson/cd273da7-9cf7-40e5-a462-bd8cd9aeb50c)**
>
> Watch video content
