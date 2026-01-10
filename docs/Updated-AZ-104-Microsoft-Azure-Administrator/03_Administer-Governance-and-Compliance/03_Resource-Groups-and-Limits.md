# Resource Groups and Limits - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Governance-and-Compliance/Resource-Groups-and-Limits)

---

## Table of Contents

- Resource Groups and Limits
  - Key Points about Resource Groups
  - Creating a Resource Group in the Azure Portal
  - Service Limits and Quotas
  - Managing Quotas in the Azure Portal
  - Conclusion
  - Watch Video

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Governance and Compliance

# Resource Groups and Limits

Resource groups in Azure work similarly to folders on your computer. They help you organize resources such as virtual machines, databases, storage accounts, and more. Grouping related resources into a single container simplifies administration, monitoring, and access control by applying permissions and policies at the group level.

There are two primary strategies for organizing your Azure resources:

1.  Group all resources related to an application (e.g., web servers, databases, storage) into one resource group.  
    This approach is ideal for scenarios like an e-commerce website where keeping all components together simplifies management and interdependency tracking.
2.  Group resources by type.  
    For instance, you might create one group for all virtual machines and another for storage accounts—similar to organizing shirts and pants in separate drawers. This method works well for large organizations with complex resource management needs.

A common concern is whether placing resources in different resource groups affects networking or communication. The answer is no—resource grouping is purely logical. Networking is managed independently, so resources communicate regardless of their group placement.

## Key Points about Resource Groups

- A resource group serves as a container to simplify billing, monitoring, and overall administration.
- Resource groups can include services deployed across multiple geographic locations, offering greater scalability and flexibility. For example, a resource group created in East US might contain a resource physically running in West Europe, while the metadata remains stored in East US.
- Once established, the name of a resource group cannot be changed, nor can resource groups be nested within one another.  
  ![The image explains the concept of creating resource groups, highlighting that they can contain various services and cannot be renamed or nested. It illustrates grouping resources like web, database, virtual machines, and storage either together or separately.](https://kodekloud.com/kk-media/image/upload/v1752884562/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Resource-Groups-and-Limits/resource-groups-services-illustration.jpg)
- Although resource group names are permanent, you can still move resources between groups using Azure Resource Mover—much like moving files between folders on your computer.

## Creating a Resource Group in the Azure Portal

To create a resource group using the Azure Portal, follow these steps:

1.  Open the Azure Portal and either click on the Resource Groups button or search for "Resource Groups".  
    ![The image shows the Microsoft Azure portal interface, displaying various Azure services and a list of resources with details such as type and last viewed time.](https://kodekloud.com/kk-media/image/upload/v1752884563/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Resource-Groups-and-Limits/azure-portal-interface-services-list.jpg)
2.  On the Resource Groups page, view existing groups or create a new one.  
    ![The image shows a Microsoft Azure portal page displaying a list of resource groups. There are options to create, manage, and filter resource groups, with three listed: "about-nithin," "dns-domains," and "NetworkWatcherRG."](https://kodekloud.com/kk-media/image/upload/v1752884564/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Resource-Groups-and-Limits/azure-portal-resource-groups-list.jpg)
3.  To create a new resource group:
    - Select the desired subscription.
    - Enter a unique name for the group.
    - Choose a region that meets your compliance and organizational requirements (e.g., East US).
    - Optionally, add tags for easier resource management.
    - Proceed by clicking "Review and Create". ![The image shows a Microsoft Azure portal page for creating a resource group, with fields for subscription, resource group name, and region.](https://kodekloud.com/kk-media/image/upload/v1752884564/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Resource-Groups-and-Limits/azure-portal-resource-group-creation.jpg)

After the resource group is created, you can reference it when deploying resources. For example, when creating a Storage Account, you have the option to select an existing resource group (e.g., RG Admin 01) or to create a new one seamlessly.  
![The image shows a Microsoft Azure portal page for creating a storage account, with fields for project and instance details such as subscription, resource group, and performance options.](https://kodekloud.com/kk-media/image/upload/v1752884565/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Resource-Groups-and-Limits/azure-portal-storage-account-creation.jpg)

Resource groups can also be created using the Azure CLI, Azure PowerShell, or REST APIs. Detailed guidance on these methods will be provided in upcoming sessions. For now, note that creating a resource group through the portal is a straightforward and essential step in managing your Azure environment.

## Service Limits and Quotas

Azure's service limits and quotas are designed to maintain the cloud ecosystem's health and performance. They help prevent unexpected usage spikes that might degrade performance and allow you to manage costs effectively while preventing platform overuse.

For example, if a script attempts to deploy 10,000 virtual machines, a predefined limit ensures that one user does not consume all the available resources. This safeguard ensures fair resource distribution among customers. Should your business require usage beyond the default limits, you have the option to request an increase.

Azure enforces default limits (quotas) at the subscription level to prevent accidental over-provisioning and unexpected charges. For instance, there might be a cap on the number of virtual CPUs deployable in a region to help manage budgets and resource allocation.

You can think of these usage statistics much like a fuel gauge in a car, providing visibility into remaining capacity.  
![The image shows a dashboard for determining service limits and quotas, displaying usage statistics for various resources in different regions. It includes information on current usage, subscription details, and whether the limits are adjustable.](https://kodekloud.com/kk-media/image/upload/v1752884566/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Resource-Groups-and-Limits/service-limits-usage-dashboard.jpg)

Limits may be adjustable or fixed:

- Some quotas can be increased directly through the portal by submitting a request.
- Others require a support ticket with Microsoft.
- Some limits are "hard limits" that cannot be changed, whereas "soft limits" can be increased with Microsoft’s assistance. In cases where a hard limit is reached, provisioning an additional subscription may be necessary to meet your requirements.

## Managing Quotas in the Azure Portal

To view and manage your quotas:

1.  Navigate to your subscription within the Azure Portal, where these limits are enforced.
2.  Select "Usage + Quotas" to view your current consumption. You can filter the data by provider (e.g., Storage or Compute) or sort by region.
3.  For example, when reviewing compute resources (virtual machines) in a specific region, you will see the total regional vCPU count along with current usage status. If the quota is adjustable, you may submit a request for an increase.  
    ![The image shows a Microsoft Azure portal screen displaying a quota management interface for a subscription, with a sidebar for submitting a new quota request for virtual CPUs in the Central India region.](https://kodekloud.com/kk-media/image/upload/v1752884566/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Resource-Groups-and-Limits/azure-portal-quota-management-cpu.jpg)

> [!important]
> **Note**
>
> Free trial or sponsored subscriptions generally have stricter quota limits compared to paid subscriptions, which usually have better chances for quota adjustments.

## Conclusion

Understanding how resource groups and service limitations work is crucial for effective Azure cloud resource management. With resource groups, you optimize the organization, control, and billing of your resources. Meanwhile, Azure’s service limits and quotas ensure fair usage and prevent resource exhaustion, contributing to a balanced and sustainable cloud environment.

Now that you are familiar with managing subscriptions, resource groups, and limits, you are better equipped to understand the overall hierarchy and integration of these elements within your Azure environment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/df99187b-f512-443a-a64b-93af9d73c5bc/lesson/ff530a0b-2359-42b7-aa66-7470961f1167)**
>
> Watch video content
