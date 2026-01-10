# Subscriptions and Resource Groups - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ900-Microsoft-Azure-Fundamentals/Azure-Architectural-Components/Subscriptions-and-Resource-Groups)

---

## Table of Contents

- Subscriptions and Resource Groups
  - Azure Resources
  - Azure Resource Groups
  - Azure Subscriptions
  - Management Groups
  - Proposed Hierarchical Structure for Bella Innovation
  - Conclusion
  - Watch Video
    - Placement
    - Region
    - Migration
    - Flexibility
    - Key Features of Management Groups

---

## Content

AZ900: Microsoft Azure Fundamentals

Azure Architectural Components

# Subscriptions and Resource Groups

Bella Innovation is embarking on its cloud journey, and one of the most critical steps is establishing a structured hierarchy in the Azure environment. Without a clear understanding of cloud management fundamentals, organizations may encounter confusion, inefficiencies, and potential setbacks during migration. Before diving into Bella Innovation's solution, let’s review the core components of Azure.

---

## Azure Resources

Azure resources are the essential building blocks of any cloud solution. They include services such as storage accounts, Virtual Machines, networks, and more. In essence, Azure resources encompass the various services and compute functionalities that Azure provides. As you advance in your learning, you'll explore these components in greater detail. For now, recognize that these resources form the backbone of your Azure deployment.

![The image lists various Azure resources, including Virtual Machines, Storage Accounts, Virtual Networks, App Services, SQL Databases, and Functions.](https://kodekloud.com/kk-media/image/upload/v1752868197/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Subscriptions-and-Resource-Groups/azure-resources-list-virtual-machines.jpg)

---

## Azure Resource Groups

Azure Resource Groups act as logical containers that help you manage and organize your resources effectively. They offer a way to group related resources for easier management, billing, and provisioning. Consider the following key aspects of resource groups:

### Placement

Think of a resource group as a container where you can place your resources. Remember that each resource belongs to one, and only one, resource group at a time. This arrangement simplifies management and access control by allowing you to handle all resources in the group collectively.

### Region

Although a resource group is associated with a specific region, the resources within it can reside across multiple regions. This flexibility lets you deploy resources closer to your customer base to reduce latency or meet specific service or data sovereignty requirements.

### Migration

As your business evolves, so do your Azure resources. Azure enables you to move resources from one resource group to another, allowing organizational adjustments without disrupting ongoing service delivery.

### Flexibility

Utilizing multiple resource groups allows you to organize services according to their lifecycle stages, administrative domains, or billing structures, ultimately enhancing scalability and management efficiency.

> **Important:** Deleting a resource group will also delete all the resources contained within it since the group functions as a single management unit.

For a visual guide on how resource groups can be configured, see the diagram below:

![The image illustrates Azure Resource Groups, showing two configurations: a single group containing web, database, virtual machine, and storage, and separate groups for each component. It also highlights considerations for placement, region, and migration.](https://kodekloud.com/kk-media/image/upload/v1752868198/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Subscriptions-and-Resource-Groups/azure-resource-groups-configurations-diagram.jpg)

---

## Azure Subscriptions

An Azure subscription is your primary entry point for managing and deploying Azure services. It serves several important functions:

- **Service Management:** Your Azure services are managed and deployed within a subscription.
- **Billing Boundary:** Each subscription generates its own billing reports and invoices, enabling you to monitor spending and manage your cloud budget effectively.
- **Access Control:** Subscriptions are used to define which users have permission to create or manage resources. For instance, you might separate subscriptions for development, testing, and production environments, each with distinct access rights.

Think of an Azure subscription as your secure ID card for accessing the Azure ecosystem. When signing up for Azure services, your account typically includes credit card details and allows you to purchase multiple subscriptions.

For a clearer understanding of billing boundaries in subscriptions, refer to the diagram below:

![The image shows two colored documents labeled "Reports" and "Invoice," separated by a vertical line, under the heading "Subscriptions – Billing Boundary."](https://kodekloud.com/kk-media/image/upload/v1752868199/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Subscriptions-and-Resource-Groups/subscriptions-billing-boundary-documents.jpg)

Multiple subscriptions can be consolidated to streamline billing and manage access control boundaries while tailoring policies to meet diverse operational needs.

---

## Management Groups

As your Azure landscape grows, efficient management of multiple subscriptions becomes paramount. This is where management groups come into play. Management groups provide a higher-level organizational structure to aggregate subscriptions and implement common policies, access controls, and compliance rules across the organization.

### Key Features of Management Groups

- **Aggregating Subscriptions:** You can consolidate multiple subscriptions into a single management group for streamlined management.
- **Inherited Policies:** Any policies or settings applied at the management group level are automatically inherited by all subordinate subscriptions, ensuring consistency and compliance.

  ![The image is a diagram illustrating "Management Groups – Inherited Conditions," showing a hierarchical structure with management groups at the top and subscriptions below. It includes icons representing settings and keys.](https://kodekloud.com/kk-media/image/upload/v1752868201/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Subscriptions-and-Resource-Groups/management-groups-inherited-conditions-diagram.jpg)

- **Scalability:** Up to 10,000 management groups can be created within an Azure Active Directory, allowing for significant organizational growth.
- **Hierarchical Depth:** Management groups can be structured up to six levels deep, offering a precise governance model tailored to your organization's needs.

To summarize, the hierarchy in Azure comprises:

- **Management Groups** at the top, organizing multiple subscriptions.
- **Subscriptions** that include several resource groups.
- **Resource Groups** that contain the individual Azure resources.

This framework underpins advanced topics such as policy management, role assignments, and resource tagging.

---

## Proposed Hierarchical Structure for Bella Innovation

To meet Bella Innovation’s cloud organizational needs, consider implementing the following hierarchical structure:

1.  **Root Management Group:** Named “Bella Innovation.”
2.  **Regional Management Groups:** Under the root group, create management groups for key regions such as US, Europe, and Asia Pacific.
    - **US:** Separate subscriptions for production and test environments.
    - **Europe:** Group subscriptions for production and development.
    - **Asia Pacific:** A single subscription for production.
3.  Organize each subscription further using resource groups dedicated to hosting specific resources.

This structure enhances control over access, billing, and operations across regions and environments.

![The image depicts a hierarchical structure of "Bella Innovation," showing management groups, subscriptions, resource groups, and resources across different regions like the US, Europe, and Asia Pacific.](https://kodekloud.com/kk-media/image/upload/v1752868202/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Subscriptions-and-Resource-Groups/bella-innovation-hierarchy-structure.jpg)

Remember, this example is fully customizable. You can adjust the number of management groups and their configurations—even grouping production and test subscriptions separately—up to six levels deep depending on your organizational requirements.

---

## Conclusion

In summary:

- **Azure Resources:** The fundamental services and components you deploy in the cloud.
- **Resource Groups:** Logical containers that facilitate the collective management of these resources.
- **Subscriptions:** Boundaries for resource creation, management, billing, and access control.
- **Management Groups:** An overarching structure to aggregate subscriptions, ensuring centralized governance and policy compliance.

With these foundational Azure components in place, you're well-prepared for a deeper dive into Azure Architecture and Services. In the upcoming lesson, we'll explore core services such as Virtual Machines, App Services, databases, and Functions. Stay tuned for more insights and detailed guidance on building robust cloud solutions.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az900-microsoft-azure-fundamentals/module/1d4b391a-62e8-447d-81b9-b6a7b21f94f0/lesson/3a1e4c31-b748-415d-b1cb-57c1e2e67924)**
>
> Watch video content
