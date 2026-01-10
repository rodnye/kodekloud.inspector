# Azure Resource Tags - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Governance-and-Compliance/Azure-Resource-Tags)

---

## Table of Contents

- Azure Resource Tags
  - Overview of Azure Resource Tags
  - Managing Tags in the Azure Portal
  - Next Steps
  - Watch Video
  - Practice Lab
    - Adding Tags to a Virtual Machine
    - Adding Tags in a Storage Account
    - Filtering Resources by Tags
    - Viewing and Modifying Tags
    - Tagging Resource Groups

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Governance and Compliance

# Azure Resource Tags

Azure Resource Tags enable you to attach customizable metadata to your cloud resources—much like sticky notes. By tagging resources, you can easily identify, organize, and manage them across your Azure environment. These tags are especially useful for automation, reporting, and cost tracking, making them an essential tool for efficient cloud management.

## Overview of Azure Resource Tags

Tags in Azure are name-value pairs that attach additional information to your resources. They serve multiple purposes:

- **Adding Metadata:**  
  Tags allow you to include supplemental details with your resources. For example, applying a tag with the name "owner" and the value "Sam" indicates who is responsible for a virtual machine. Similarly, an "environment" tag with the value "production" quickly informs you about the deployment stage.
- **Logical Grouping:**  
  By using consistent tags across different Resource Groups or subscriptions, you can logically group resources. For instance, tagging all resources related to a specific project or application enhances organizational clarity and management.
- **Cost Management:**  
  With tags, you can track Azure spending on a granular level. Tags such as "cost center" or "project code" enable you to generate detailed billing reports that align with your internal accounting systems.

  > [!important]
  > **Important Information**
  >
  > Keep in mind that tags are effective only when applied directly to resources. Applying them at the resource group or subscription level does not automatically include them in billing reports unless you have a policy or preview feature enabled.

Note that tags do not inherit by default. Tagging a resource group or subscription will not automatically propagate these tags to individual resources or billing reports. To ensure inheritance, apply tags directly to the respective resources or use an Azure policy (or enable the inheritance preview feature) to automate this process.

## Managing Tags in the Azure Portal

This section explains how to add, update, and remove tags on Azure resources within the Azure portal.

### Adding Tags to a Virtual Machine

To add tags to a virtual machine, follow these steps:

1.  Navigate to "All Resources" and select a virtual machine.
2.  Click on the "Tags" option.
3.  Add your desired tags—such as:
    - Tag: enrollment
    - Tag: development
    - Tag: cost center (e.g., with the value 1100)
4.  Save your changes and the virtual machine will now display the new tags.

![The image shows a Microsoft Azure portal interface displaying details of a virtual machine named "about-rithin-vm," including its status, location, operating system, and networking information.](/images/Updated-AZ-104-Microsoft-Azure-Administrator-Azure-Resource-Tags/azure-portal-virtual-machine-details.jpg)

### Adding Tags in a Storage Account

To tag a Storage Account:

1.  Navigate to your Storage Account.
2.  Begin typing in the tag field; the system will suggest available values. For example, when you type "EN," it may suggest the "environment" tag with previously entered values.
3.  Enter the desired tag value, such as:
    - Tag: Cost center
    - Value: 00
4.  Save all changes. Tagging across resources like these makes it easier to perform bulk operations.

![The image shows a Microsoft Azure portal interface displaying details of a storage account named "aboutrithin," including its properties, security settings, and networking options. The left panel lists various resources associated with the account.](/images/Updated-AZ-104-Microsoft-Azure-Administrator-Azure-Resource-Tags/azure-portal-storage-account-details.jpg)

### Filtering Resources by Tags

Easily filter and monitor related resources by tags:

- To filter, for instance, by "environment equals dev," the portal will display all resources tagged with "environment: dev", such as the virtual machine and storage account.

![The image shows a Microsoft Azure portal interface displaying a list of resources with various types and resource groups. A filter is being added to the list, specifying the environment with an operator set to "Equals" and a value of "all." ](/images/Updated-AZ-104-Microsoft-Azure-Administrator-Azure-Resource-Tags/azure-portal-resource-list-filter.jpg)

### Viewing and Modifying Tags

Within the Azure portal you can:

- **Search for tags:** Discover all the active name-value combinations.
- **View resources by tag:** Clicking on a specific tag displays all associated resources.
- **Modify Tags:** To update a tag, select the resource, click on "Edit" next to the tag, and update the value as needed.
- **Delete Tags:** Simply click on the trash icon next to a tag to remove it.

![The image shows a Microsoft Azure portal page displaying resources tagged with "Environment: Dev," including a virtual machine and a storage account. The resources are listed with details such as type, resource group, location, and subscription.](/images/Updated-AZ-104-Microsoft-Azure-Administrator-Azure-Resource-Tags/azure-portal-dev-resources-list.jpg)

After editing—such as adding a new key-value pair—you might need to refresh the page a few times before the updates, such as changing to "environment: prod", are fully visible.

![The image shows a Microsoft Azure portal interface displaying details of a virtual machine named "about-rithin-vm," including its status, location, operating system, and networking information.](/images/Updated-AZ-104-Microsoft-Azure-Administrator-Azure-Resource-Tags/azure-portal-virtual-machine-details-2.jpg)

### Tagging Resource Groups

You can also apply tags to Resource Groups. For example:

- Adding an "environment" tag with the value "pre-prod" to a Resource Group.

However, be aware that such a tag applies only to the Resource Group, not automatically to its underlying resources—unless there is a policy in place or the inheritance preview feature is enabled.

> [!important]
> **Tag Inheritance Reminder**
>
> Remember, checking the properties of individual Virtual Machines or services will reveal that the Resource Group's tag is not automatically inherited. Policies are required for consistent tag inheritance across resources.

## Next Steps

For enhanced resource management and protection, consider exploring Azure Resource Locks. These locks provide an additional level of resource protection by preventing accidental modifications or deletions.

This concludes our comprehensive guide on Azure Resource Tags. For further details on Azure management solutions, consult the [Azure Documentation](https://docs.microsoft.com/en-us/azure/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/df99187b-f512-443a-a64b-93af9d73c5bc/lesson/00d038ab-75ff-452a-b885-1a1324b4f015)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/df99187b-f512-443a-a64b-93af9d73c5bc/lesson/4b712333-ccaf-4e8b-9ff1-90288e4853e0)**
>
> Practice lab
