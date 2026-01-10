# Summary - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-governance-solution/Summary)

---

## Table of Contents

- Summary
  - Scenario Overview
  - Creating the Management Group Hierarchy
  - Implementing Policy Constraints
  - Enforcing VM Size Restrictions in Testing Environments
  - Role-Based Access Control (RBAC) and Group Management
  - Tagging and Policy for Resource Groups
  - Implementing Test Environment Blueprints
  - Final Validation and Testing
  - Conclusion
  - Watch Video
    - Setting Up in the Azure Portal
    - Restricting Deployment Locations
    - Troubleshooting Permissions
    - Creating Support Request Permissions for IT Help Desk
    - Granting IT Admin Full Management Capabilities

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a governance solution

# Summary

This lesson explains how to implement a hierarchical management structure in Azure to address a customer's requirements. The goal is to create a hierarchy that includes two primary entities—Marketing and HR—with dedicated production, testing, and disaster recovery (DR) environments, plus a central HUB that hosts shared services. The instructions include detailed steps, diagrams, and screenshots captured directly from the Azure portal.

---

## Scenario Overview

The customer’s scenario requires an Azure hierarchy composed of:

• Two entities: Marketing and HR  
• Production, DR, and testing environments for each entity  
• A separate HUB for shared services

The diagram below illustrates the scenario:

![The image outlines a scenario for Vendetta Corp to implement organizational standards in Azure, detailing a hierarchy with Marketing and HR entities, and a HUB for shared services, along with a table listing various subscriptions and environments.](https://kodekloud.com/kk-media/image/upload/v1752866943/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Summary/vendetta-corp-azure-standards-diagram.jpg)

All subscriptions reside within the environment. Leveraging management groups is the recommended solution.

---

## Creating the Management Group Hierarchy

The solution involves creating management groups under the tenant root. In this example, three top-level management groups are created: Marketing, HR, and HUB. Under each, additional management groups for production, testing, and DR subscriptions can be organized.

### Setting Up in the Azure Portal

1.  **Access Management Groups:**  
    Open the Azure portal and search for "Management Groups".
    - First-time users see a prompt labeled “Start using Management Groups,” which automatically moves your subscription to the tenant root group.
    - Returning users will already see the tenant root group.

    ![The image shows the Microsoft Azure portal's "Management groups" section, displaying a list of subscriptions within a tenant root group.](https://kodekloud.com/kk-media/image/upload/v1752866945/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Summary/azure-portal-management-groups-subscriptions.jpg)

2.  **Create Parent Management Groups:**  
    Create three management groups named Marketing, HR, and HUB. When creating a group, provide a display name and a management group ID (note that the ID cannot be changed later as it is used in REST API or CLI calls).
3.  **Move Subscriptions:**  
    After the HUB is created, move subscriptions from the tenant root group to HUB:
    - Click on the HUB, then under Subscriptions, select “Add Subscription.”
    - Refresh the view to confirm that the subscription now appears under HUB.

    ![The image shows a Microsoft Azure portal interface displaying management groups, including "Tenant Root Group" and its subgroups like "IT_PRD_01," "HR," "Hub," and "Marketing."](https://kodekloud.com/kk-media/image/upload/v1752866946/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Summary/azure-portal-management-groups.jpg)

4.  **Create Child Management Groups:**  
    For example, under the HR entity, create three child management groups:
    - Production HR
    - Testing HR
    - DR HR

    Use the same process to create child groups for HUB and Marketing as needed.

    ![The image shows a Microsoft Azure portal interface where a user is creating a new management group under the "HR" management group. The right panel displays fields for entering the management group ID and display name.](https://kodekloud.com/kk-media/image/upload/v1752866947/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Summary/azure-portal-management-group-creation.jpg)

5.  **Verify the Hierarchy:**  
    Expand the management groups in the portal to ensure that subscriptions and subgroups are nested as intended.

    ![The image shows a Microsoft Azure portal interface displaying a management group named "Marketing" with details about its subscriptions and child management groups. The interface includes options for creating, adding subscriptions, and managing groups.](https://kodekloud.com/kk-media/image/upload/v1752866948/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Summary/azure-portal-marketing-management-group.jpg)

6.  **Map Subscriptions:**  
    Finally, move individual subscriptions to the appropriate management groups (e.g., production subscriptions under HR production, testing under HR testing, etc.) to finalize the hierarchy.

A high-level diagram of the hierarchy is shown below:

![The image is a hierarchical diagram showing a root management group with branches for Marketing, Hub, and HR, each further divided into Production, Testing, and DR, with associated keys.](https://kodekloud.com/kk-media/image/upload/v1752866949/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Summary/hierarchical-diagram-management-groups.jpg)

---

## Implementing Policy Constraints

### Restricting Deployment Locations

The organization mandates that all resources be deployed only in East US and West US. This requirement is enforced by applying a policy at the tenant root level.

1.  **Enable Root Group Access:**  
    The tenant root group’s permissions are restricted by default. A global administrator must:
    - Navigate to the tenant root group’s properties.
    - Enable access by selecting “Yes” and saving the changes.
    - Note that it may take two to three minutes for the changes to propagate.

    After enabling access, you can rename the tenant root group (for example, to “Vendata Corp”).

2.  **Assign the Allowed Locations Policy:**
    - In the Azure portal, navigate to the Policy section and select “Assign Policy” at the tenant root group.
    - Choose the policy definition named “Allowed Locations”.
    - Customize the assignment name (e.g., “Allow EUS and WUS Only”) and add an optional description stating that deployments are limited to East US and West US.
    - In the policy parameters, select East US and West US.
    - Click “Create” to finalize the policy assignment.

    ![The image shows a Microsoft Azure Policy Compliance dashboard with 100% overall resource compliance and no assignments displayed within the given scope.](https://kodekloud.com/kk-media/image/upload/v1752866950/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Summary/azure-policy-compliance-dashboard.jpg)

    ![The image shows a Microsoft Azure portal page for assigning a policy, with details about scope, exclusions, and policy enforcement. The "Create" button is highlighted at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752866950/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Summary/azure-portal-policy-assignment.jpg)

    ![The image shows a Microsoft Azure portal interface where a policy is being assigned. The user is selecting allowed locations from a dropdown menu, with options like "East US" and "East US (Stage)."](https://kodekloud.com/kk-media/image/upload/v1752866952/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Summary/azure-portal-policy-allowed-locations.jpg)

3.  **Wait for Evaluation:**  
    Policy evaluation usually takes between 15–30 minutes (or longer for a large number of resources). Monitor progress on the Policy Compliance Dashboard.

    ![The image shows a Microsoft Azure Policy Compliance dashboard with no assignments displayed. There are notifications about a failed RP registration and a successful policy assignment.](https://kodekloud.com/kk-media/image/upload/v1752866955/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Summary/azure-policy-compliance-dashboard-2.jpg)

> [!important]
> **Note**
>
> If you have limited permissions (e.g., User Access Administrator), ensure you upgrade your privileges to assign policies correctly.

### Troubleshooting Permissions

If you cannot assign policies or manage settings due to limited permissions, assign yourself (or the appropriate user) the Owner role at the tenant root group:

1.  In the tenant root group, navigate to “Access Control (IAM)” and review current role assignments.
2.  Add a new role assignment:
    - Select the Owner role.
    - Choose your account.
    - Review and confirm the role assignment.

    ![The image shows the Microsoft Azure portal, specifically the "Access control (IAM)" section for a "Tenant Root Group," displaying role assignments with one user listed as a "User Access Administrator."](https://kodekloud.com/kk-media/image/upload/v1752866956/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Summary/azure-portal-access-control-iam.jpg)

    ![The image shows a Microsoft Azure portal interface for adding role assignments, listing various roles such as Owner, Contributor, and Reader, along with their descriptions and types.](https://kodekloud.com/kk-media/image/upload/v1752866957/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Summary/azure-portal-role-assignments.jpg)

3.  Once you have the Owner role, reassign policies if needed and verify the update under the updated role assignments.

    ![The image shows the Microsoft Azure portal's Access Control (IAM) page for a Tenant Root Group, displaying role assignments for two users with roles of Owner and User Access Administrator.](https://kodekloud.com/kk-media/image/upload/v1752866958/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Summary/azure-portal-access-control-iam-2.jpg)

4.  Confirm that the allowed locations policy now shows as compliant:

    ![The image shows a Microsoft Azure Policy Compliance dashboard indicating 100% compliance for the "Tenant Root Group" with no non-compliant resources or policies.](https://kodekloud.com/kk-media/image/upload/v1752866958/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Summary/azure-policy-compliance-dashboard-3.jpg)

---

## Enforcing VM Size Restrictions in Testing Environments

The second requirement is to restrict testing subscriptions to allow only specific Virtual Machine (VM) sizes (for example, DS, DSV3, DSV4). You have two options:

• Create the policy assignment at the testing management group level.  
• Create the policy at the tenant root group and exclude all other management groups.

For HR testing, follow these steps:

1.  Navigate to the HR testing management group in the Azure portal.
2.  Click “Assign Policy” and select the appropriate policy definition (e.g., “Allowed VM Size Queues”).
3.  Rename the assignment as “Allow Selected VM Sizes in Testing” and provide a description.
4.  In the Parameters section, select the allowed VM size SKUs.
5.  Optionally, include a custom non-compliance message.
6.  Click “Create” to finish the policy assignment.

    ![The image shows a Microsoft Azure interface for assigning a policy, with fields for scope, exclusions, policy definition, assignment name, description, and policy enforcement options.](https://kodekloud.com/kk-media/image/upload/v1752866959/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Summary/azure-policy-assignment-interface.jpg)

    ![The image shows a Microsoft Azure portal interface for assigning a policy, specifically in the "Parameters" section, where various size SKUs can be selected.](https://kodekloud.com/kk-media/image/upload/v1752866960/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Summary/azure-portal-policy-parameters-skus.jpg)

Repeat these steps for the Marketing testing management group.

![The image shows a Microsoft Azure Policy Compliance dashboard with 100% overall resource compliance for the Tenant Root Group. It indicates no non-compliant resources or policies.](https://kodekloud.com/kk-media/image/upload/v1752866962/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Summary/azure-policy-compliance-dashboard-4.jpg)

---

## Role-Based Access Control (RBAC) and Group Management

### Creating Support Request Permissions for IT Help Desk

The customer requires that IT help desk users can create Microsoft support requests on behalf of any entity. To achieve this:

1.  **Create IT Groups:**  
    In Azure Active Directory, create groups such as:
    - IT_admins
    - IT_Helpdesk
    - Marketing_admins
    - HR_admins

    Add the required users to the IT_Helpdesk group.

    ![The image shows a Microsoft Azure interface for creating a new group named "IT_Helpdesk," with options to add members and configure group settings. The "Add members" panel on the right lists potential members to include in the group.](https://kodekloud.com/kk-media/image/upload/v1752866963/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Summary/azure-create-it-helpdesk-group.jpg)

2.  **Assign the Support Request Contributor Role:**
    - Navigate to the tenant root group’s IAM.
    - Click “Add role assignment,” select the role “Support Request Contributor” (this enables users to create and manage support requests), and assign it to the IT_Helpdesk group.

    ![The image shows a Microsoft Azure portal interface for adding role assignments, listing various roles with their descriptions, types, and categories.](https://kodekloud.com/kk-media/image/upload/v1752866964/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Summary/azure-portal-role-assignments-interface.jpg)

3.  **Confirm Inheritance:**  
    Verify a production subscription to ensure that IT_Helpdesk inherits the Support Request Contributor role.

    ![The image shows the "Access control (IAM)" section of the Azure portal for a subscription named "Azure Pass - Sponsorship," displaying role assignments for users and groups.](https://kodekloud.com/kk-media/image/upload/v1752866965/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Summary/azure-access-control-iam-role-assignments.jpg)

### Granting IT Admin Full Management Capabilities

IT admins require full management across subscriptions. To enable this:

1.  Assign the Owner role (which includes full RBAC management permissions) at the management group level to the IT_admins group.

    ![The image shows a Microsoft Azure portal interface for adding a role assignment, listing various roles with descriptions, types, and categories. The "Owner" role is highlighted, granting full access to manage all resources.](https://kodekloud.com/kk-media/image/upload/v1752866967/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Summary/azure-portal-role-assignment-owner.jpg)

2.  Confirm by reviewing the updated access control settings.
3.  For Marketing and HR admins managing their respective subscriptions, assign the Contributor role (following the principle of least privilege):
    - In the HR management group, add the Contributor role to the HR_admins group.
    - Repeat the process for Marketing.

    ![The image shows a Microsoft Azure portal interface for adding role assignments, listing various roles with their descriptions, types, and categories. Options include roles like Owner, Contributor, and Reader, each with specific permissions.](https://kodekloud.com/kk-media/image/upload/v1752866968/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Summary/azure-portal-role-assignments-2.jpg)

    ![The image shows a Microsoft Azure interface for adding a role assignment, with options to select members and assign access to a user, group, or service principal. The "Select members" panel is open on the right side.](https://kodekloud.com/kk-media/image/upload/v1752866969/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Summary/azure-role-assignment-interface.jpg)

---

## Tagging and Policy for Resource Groups

The customer requires that every resource group in Marketing and HR subscriptions has a tag identifying the department (e.g., "department: marketing" or "department: HR") and that this tag is inherited by all resources in the group.

1.  **Assign a Tag Enforcement Policy (Marketing):**
    - Navigate to the Marketing management group.
    - Use the “Assign Policy” option and select the policy that requires a tag with a specific value on Resource Groups.
    - Enter the tag name as "department" and value as "marketing".
    - Create the policy assignment.

    ![The image outlines organizational standards for Vendetta Corp, detailing resource deployment, auditing, role management, and subscription management requirements. It specifies permissions for IT, Marketing, and HR groups, and includes guidelines for testing environments.](https://kodekloud.com/kk-media/image/upload/v1752866970/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Summary/vendetta-corp-organizational-standards.jpg)

    ![The image shows a Microsoft Azure interface for assigning a policy, with fields for scope, exclusions, policy definition, assignment name, description, and policy enforcement options.](https://kodekloud.com/kk-media/image/upload/v1752866971/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Summary/azure-policy-assignment-interface-2.jpg)

2.  **Enforce Tag Inheritance:**  
    Since tag inheritance is not automatic, assign an additional policy (for example, “inherit tag from resource group”) that ensures every resource deployed in a resource group inherits the "department" tag.

    ![The image shows a Microsoft Azure interface for assigning a policy, with fields for scope, exclusions, policy definition, assignment name, description, and policy enforcement options.](https://kodekloud.com/kk-media/image/upload/v1752866972/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Summary/azure-policy-assignment-interface-3.jpg)

3.  **Test the Tag Policy:**
    - Move a subscription under Marketing, create a test resource group, and try creating a storage account without the "department" tag.
    - The resource group creation validation will enforce the correct tag and the storage account should automatically inherit it.

    ![The image shows a Microsoft Azure portal page where a storage account is being created, displaying the review settings and deployment initialization.](https://kodekloud.com/kk-media/image/upload/v1752866973/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Summary/azure-portal-storage-account-creation.jpg)

    ![The image shows a Microsoft Azure portal interface displaying the overview of a storage account named "policysampling." It includes details such as resource group, location, subscription ID, and various properties related to blob and file services.](https://kodekloud.com/kk-media/image/upload/v1752866975/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Summary/azure-portal-storage-account-overview.jpg)

Test further by creating storage accounts in other resource groups with the enforced tag to confirm that the policy works as designed.

---

## Implementing Test Environment Blueprints

The final requirement is to provide a standardized template for testing environments. This blueprint should allow testing subscriptions to spin up resource groups, role assignments, policy assignments, and various Azure resources.

1.  **Create a Blueprint:**
    - Navigate to the Blueprints section in the Azure portal.
    - Create a new blueprint (e.g., “testing_resource_blueprint”)—note that blueprint names cannot have spaces; use underscores as needed.
    - Define its purpose in the description (e.g., "Deploys all resources required by the testing environment").
    - Choose a location where it will be available (this could be assigned to either testing HR or testing Marketing).

    ![The image shows a Microsoft Azure interface for creating a blueprint, with fields for entering a blueprint name, description, and definition location. The right panel displays a selection of management groups and subscriptions.](https://kodekloud.com/kk-media/image/upload/v1752866976/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Summary/azure-blueprint-creation-interface.jpg)

2.  **Add Artifacts to the Blueprint:**  
    Within the blueprint, add necessary artifacts such as Resource Groups and Role Assignments. For example:

    | Artifact Type     | Description                                                 | Example Artifact        |
    | ----------------- | ----------------------------------------------------------- | ----------------------- |
    | Resource Group    | Create a resource group with a parameter for its name       | RG\\\_prod, RG\\\_dev   |
    | Role Assignment   | Assign roles (e.g., Contributor) to designated users/groups | Contributor for Testing |
    | Policy Assignment | Include policies if additional resources must be deployed   | Tag enforcement policy  |

    Optionally, include ARM templates if further resources are needed.

    ![The image shows a Microsoft Azure portal interface for creating a blueprint, specifically the "Add artifact" section where a resource group is being configured. The user is entering details such as the artifact display name and location.](https://kodekloud.com/kk-media/image/upload/v1752866977/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Summary/azure-portal-blueprint-artifact.jpg)

    ![The image shows a Microsoft Azure interface for creating a blueprint, with options to add artifacts and assign roles. The "Add artifact" panel on the right lists various policy definitions for selection.](https://kodekloud.com/kk-media/image/upload/v1752866978/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Summary/azure-blueprint-interface-artifacts.jpg)

3.  **Publish and Assign the Blueprint:**  
    Save the blueprint as a draft, then publish it by setting a version number (e.g., 1.0.0).  
    Assign the published blueprint to the targeted subscription. During assignment, provide dynamic parameters like resource group names, locations, and user details.

    ![The image shows a Microsoft Azure interface for assigning a blueprint, with fields for subscription, assignment name, location, and blueprint definition version. There is a warning about no accessible subscriptions and options for lock assignment and managed identity.](https://kodekloud.com/kk-media/image/upload/v1752866979/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Summary/azure-blueprint-assignment-interface.jpg)

---

## Final Validation and Testing

After completing all configurations:

1.  Validate that resource groups in Marketing automatically inherit the "department: marketing" tag.
2.  Create a sample storage account to confirm that the allowed locations policy is enforced (e.g., deployments in East US are allowed while others are blocked or require correction).
3.  Verify that the blueprint assignment for testing environments deploys all defined artifacts correctly.
4.  Ensure that all role assignments for IT helpdesk, IT admins, Marketing admins, and HR admins reflect the intended permissions with proper inheritance.

For example, create a resource group in a disallowed location (like South Central US) to trigger tag enforcement and deployment location policies. Then, create resources within that group to observe the policies in action.

![The image shows a Microsoft Azure portal interface displaying details of a management group named "Production," including its ID, access level, and associated subscriptions.](https://kodekloud.com/kk-media/image/upload/v1752866980/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Summary/azure-portal-management-group-production.jpg)

---

## Conclusion

This lesson demonstrated how to create a hierarchical structure using Azure management groups, enforce organizational policies (such as allowed deployment locations and tag inheritance), manage access through RBAC for various teams, and automate testing environment provisioning via blueprints. By following these steps, you ensure that the customer’s requirements for resource governance and security are met in a scalable and manageable manner.

Thank you for following along. In the next module, we will dive into networking configurations. See you there!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/4e67e086-384c-4b65-a1e4-fe8c434076c4/lesson/7c563eb8-7753-46ce-b8f8-602c9c4cd662)**
>
> Watch video content
