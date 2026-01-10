# Enable Azure role based access control RBAC - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Enterprise-Governance/Enable-Azure-role-based-access-control-RBAC)

---

## Table of Contents

- Enable Azure role based access control RBAC
  - Key RBAC Concepts
  - Understanding Role Definitions
  - Assigning Roles Using the Azure Portal
  - Creating a Virtual Network
  - Creating Custom Roles
  - Next Steps: Azure Policies
  - Watch Video
    - Built-In Roles Overview
    - Creating a Resource Group
    - Using the Access Control (IAM) Blade
    - Adding a Role Assignment
    - Assigning the Custom Role

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Enterprise Governance

# Enable Azure role based access control RBAC

Azure Role-Based Access Control (RBAC) is a robust authorization system that manages permissions within your Azure environment. It governs who has access to your resources, what actions they can perform, and at what scope these rights apply. In this lesson, you will learn about RBAC’s core concepts, see how to assign roles using the Azure portal, and create custom roles tailored to your organization’s needs.

## Key RBAC Concepts

Azure RBAC is built around three fundamental components:

- **Who:** The security principal—this can be a user, group, service principal, or managed identity requesting access.
- **What:** The permitted actions defined in a role definition. These are expressed in JSON and enumerate what operations a role can perform.
- **Where:** The scope at which the permissions apply, such as a subscription, resource group, or an individual resource.

When a role definition is assigned to a security principal at a given scope, a role assignment is created. The diagram below illustrates the relationship between these components:

![The image is a diagram explaining Role Based Access Control (RBAC), detailing components like Security Principal, Role Definition, Scope, and Role Assignment. It visually represents how these elements combine to form an access control assignment.](https://kodekloud.com/kk-media/image/upload/v1752881812/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-Azure-role-based-access-control-RBAC/rbac-diagram-access-control.jpg)

> [!important]
> **Note**
>
> Keep in mind that each subscription can have up to 2,000 role assignments. Always follow the principle of least privilege and consider using Privileged Identity Management (PIM) to reduce long-term direct access to sensitive resources.

## Understanding Role Definitions

A role definition specifies the permissions a role confers. Azure offers several built-in roles such as Owner, Reader, and Contributor, though you can create custom roles to suit specific requirements.

For example, the Contributor role definition is represented by the following JSON:

```
{
    "Name": "Contributor",
    "Id": "b24988ac-6180-42a0-ab88-20f7382dd24c",
    "IsCustom": false,
    "Description": "Grants full access to manage all resources, but does not allow you to assign roles in Azure RBAC, manage assignments in Azure Blueprints, or share image galleries.",
    "Actions": [
        "*"
    ],
    "NotActions": [
        "Microsoft.Authorization/*/Delete",
        "Microsoft.Authorization/*/Write",
        "Microsoft.Authorization/elevateAccess/Action",
        "Microsoft.Blueprint/blueprintAssignments/write",
        "Microsoft.Blueprint/blueprintAssignments/delete",
        "Microsoft.Compute/galleries/share/action"
    ],
    "DataActions": [],
    "NotDataActions": [],
    "AssignableScopes": [
        "/"
    ]
}
```

This JSON snippet defines the Contributor role to allow full resource management with some exceptions (e.g., role assignments, blueprint modifications, and sharing image galleries). The asterisk (`*`) in the "Actions" array denotes complete access, whereas the "NotActions" section lists specific restrictions.

### Built-In Roles Overview

Azure's key built-in roles include:

- **Owner:** Grants full control over all resources, including the ability to delegate access.
- **Contributor:** Allows management of resources but does not grant permissions to assign roles.
- **Reader:** Provides read-only access, blocking modifications and access to sensitive details like keys or connection strings.
- **User Access Administrator:** Permits managing user access without altering the resources directly.

The following diagram visually represents these built-in roles and their respective access permissions:

![The image describes Azure's built-in roles: Owner, Contributor, Reader, and User Access Administrator, each with specific access permissions. It visually represents these roles with a colorful diagram and brief descriptions.](https://kodekloud.com/kk-media/image/upload/v1752881813/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-Azure-role-based-access-control-RBAC/azure-built-in-roles-diagram.jpg)

## Assigning Roles Using the Azure Portal

The next steps guide you through assigning roles with the Azure portal.

### Creating a Resource Group

1.  Log in to the Azure portal and navigate to the resource groups section.
2.  Create a new resource group if needed; for example, name it "AC demo RBAC" in the East Europe region.

![The image shows a Microsoft Azure portal page for creating a resource group, with fields for subscription, resource group name, and region selection.](https://kodekloud.com/kk-media/image/upload/v1752881814/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-Azure-role-based-access-control-RBAC/azure-portal-resource-group-creation.jpg)

After creation, the resource group appears in your list:

![The image shows a Microsoft Azure portal page displaying a list of resource groups, including their names, subscriptions, and locations. A notification indicates that a resource group was successfully created.](https://kodekloud.com/kk-media/image/upload/v1752881815/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-Azure-role-based-access-control-RBAC/azure-portal-resource-groups-list.jpg)

### Using the Access Control (IAM) Blade

To manage permissions, open the Access Control (IAM) blade for your resource group. In this pane, you can:

- Review current role assignments.
- Inspect access details for different users.
- Add new role assignments.

![The image shows a Microsoft Azure portal interface for a resource group named "az-demo-rbac." It displays various options like activity log, access control, and settings, with a message indicating no resources match the current filters.](https://kodekloud.com/kk-media/image/upload/v1752881816/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-Azure-role-based-access-control-RBAC/azure-portal-az-demo-rbac.jpg)

Role assignments can be inherited from a higher-level scope. For example, an assignment at the subscription level might be reflected within a specific resource group.

![The image shows the Microsoft Azure portal, specifically the Access Control (IAM) section for a resource group named "az-demo-rbac." It displays options for checking access, granting access, viewing access, and managing role assignments.](https://kodekloud.com/kk-media/image/upload/v1752881817/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-Azure-role-based-access-control-RBAC/azure-portal-access-control-iam.jpg)

For example, you might see that your account is designated as an owner at the subscription level:

![The image shows the Microsoft Azure portal's Access Control (IAM) page, displaying role assignments for a subscription, with one user listed as the owner.](https://kodekloud.com/kk-media/image/upload/v1752881818/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-Azure-role-based-access-control-RBAC/azure-portal-access-control-role-assignments.jpg)

### Adding a Role Assignment

To assign a role such as Reader:

1.  Click “Add role assignment.”
2.  Choose the Reader role.
3.  Select the members (users or groups) to assign the role.
4.  Confirm the assignment.

![The image shows a Microsoft Azure portal page for adding role assignments, listing various roles with descriptions, types, and options to view details.](https://kodekloud.com/kk-media/image/upload/v1752881820/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-Azure-role-based-access-control-RBAC/azure-portal-role-assignments.jpg)

The user interface will display:

- The role definition, detailing the permissions.
- The members selected for this role.
- The scope where the assignment is applied.

![The image shows the Microsoft Azure portal interface for adding a role assignment, with a list of job function roles and a sidebar for selecting members to assign roles. The roles include descriptions and are categorized as built-in.](https://kodekloud.com/kk-media/image/upload/v1752881821/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-Azure-role-based-access-control-RBAC/azure-portal-role-assignment-interface.jpg)

After completing these steps, you can view the updated role assignments:

![The image shows the Microsoft Azure portal displaying the "Access control (IAM)" section for a resource group named "az-demo-rbac." It lists role assignments for users, including their roles and scopes.](https://kodekloud.com/kk-media/image/upload/v1752881822/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-Azure-role-based-access-control-RBAC/azure-portal-access-control-iam-2.jpg)

## Creating a Virtual Network

To extend the example, let’s create a virtual network within the resource group:

1.  Select the appropriate subscription and resource group.
2.  Provide a name (e.g., "demo VNet") and configure the necessary settings.
3.  Review the configuration and create the virtual network.

![The image shows a Microsoft Azure portal page for creating a virtual network, with fields for project and instance details such as subscription, resource group, virtual network name, and region.](https://kodekloud.com/kk-media/image/upload/v1752881823/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-Azure-role-based-access-control-RBAC/azure-portal-virtual-network-creation.jpg)

After clicking "Review + Create" and then "Create," the deployment begins:

![The image shows a Microsoft Azure portal page for creating a virtual network, displaying configuration details such as subscription, resource group, and security settings. A notification indicates that the deployment is being initialized.](https://kodekloud.com/kk-media/image/upload/v1752881824/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-Azure-role-based-access-control-RBAC/azure-portal-virtual-network-creation-2.jpg)

Once active, navigate to the virtual network. The Access Control (IAM) pane will display any inherited role assignments.

## Creating Custom Roles

Built-in roles might not always meet your requirements. In such cases, you can create custom roles to define permissions precisely.

1.  In the Azure portal, select "Add custom role."
2.  Provide a meaningful name (for example, "VM App Operator") and a detailed description.
3.  Choose to start from scratch or clone an existing role. Starting from scratch allows you to select specific permissions.

For instance, to assign virtual machine-related permissions, filter for “Microsoft.Compute” and select actions such as:

- Read latest patch assessment operation details
- Get virtual machine log definitions
- Get virtual machine run commands
- Delete virtual machine run commands

![The image shows a Microsoft Azure portal interface for creating a custom role, specifically focusing on setting permissions related to Microsoft.Compute. Various permissions are listed with checkboxes for actions like reading or writing virtual machine extensions and commands.](https://kodekloud.com/kk-media/image/upload/v1752881825/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-Azure-role-based-access-control-RBAC/azure-portal-custom-role-permissions.jpg)

After selecting the required permissions:

4.  Click "Next" and then "Create" to finalize your custom role. Note that it might take a few minutes for the role to propagate throughout the portal.

![The image shows a Microsoft Azure portal screen where a custom role named "CR-VM App Operator" has been successfully created. It lists permissions and assignable scopes related to virtual machine operations.](https://kodekloud.com/kk-media/image/upload/v1752881826/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-Azure-role-based-access-control-RBAC/azure-portal-custom-role-vm-operator.jpg)

### Assigning the Custom Role

To assign your newly created custom role:

- Filter for custom roles during the role assignment process.
- Select your custom role (e.g., "CR-VM App Operator").
- Choose the desired members (users or groups, such as an HR group).
- Complete the role assignment.

![The image shows a Microsoft Azure portal page for adding a role assignment, displaying options for job function roles and a custom role named "ER-VM App Operator."](https://kodekloud.com/kk-media/image/upload/v1752881827/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-Azure-role-based-access-control-RBAC/azure-portal-role-assignment-er-vm.jpg)

After assignment, verify the updated permissions at the management group level:

![The image shows a Microsoft Azure portal page displaying the "Access control (IAM)" section for a management group. It lists role assignments for users and groups, detailing their roles and scope within the resource.](https://kodekloud.com/kk-media/image/upload/v1752881828/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-Azure-role-based-access-control-RBAC/azure-portal-access-control-iam-3.jpg)

## Next Steps: Azure Policies

In the upcoming section, we will explore Azure Policies and compare them with RBAC. Azure Policies help enforce resource configurations and compliance requirements, complementing the access control provided by RBAC.

This concludes our lesson on enabling Role-Based Access Control in Azure. For further information, consider reviewing the following resources:

- [Azure Role-Based Access Control Documentation](https://docs.microsoft.com/en-us/azure/role-based-access-control/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

Happy configuring!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/3c48a4f2-a6f3-45fd-87d7-c53f36f2fb2a/lesson/5b490650-625b-4139-bc30-d838f6e2d9fe)**
>
> Watch video content
