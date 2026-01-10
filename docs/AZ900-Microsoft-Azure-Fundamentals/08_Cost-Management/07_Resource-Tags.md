# Resource Tags - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ900-Microsoft-Azure-Fundamentals/Cost-Management/Resource-Tags)

---

## Table of Contents

- Resource Tags
  - Key Features of Azure Resource Tags
  - Benefits of Using Azure Resource Tags
  - Use Cases
  - Working with Resource Tags in the Azure Portal
  - Conclusion
  - Watch Video
    - Customizable Labeling & Resource Management
    - Cost Allocation and Reporting

---

## Content

AZ900: Microsoft Azure Fundamentals

Cost Management

# Resource Tags

Azure Resource Tags offer a robust solution for managing and organizing your resources within the Azure environment. For instance, Bella Innovation previously exported billing data for analysis and now uses resource tags to distribute costs across various departments such as HR, Marketing, and Finance. In this article, we explain how to implement resource tagging and highlight its benefits in simplifying operations and cost management.

Imagine a well-organized library where every book is precisely categorized. Azure Resource Tags work similarly by allowing you to efficiently organize your cloud resources.

## Key Features of Azure Resource Tags

### Customizable Labeling & Resource Management

Much like a library catalog, you can create and assign custom tags based on your organizational requirements. These tags simplify resource management and monitoring by serving as a digital inventory system.

### Cost Allocation and Reporting

Bella Innovation experienced challenges with cost tracking until they adopted Azure Resource Tags. When using Azure Cost Analysis, you can group costs by tags for detailed budgeting and expense categorization—similar to generating a comprehensive budget report.

![The image outlines the key features of Azure Resource Tags, highlighting customizable labeling, resource management, and cost allocation and reporting.](https://kodekloud.com/kk-media/image/upload/v1752868352/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Resource-Tags/azure-resource-tags-features-outline.jpg)

## Benefits of Using Azure Resource Tags

| Benefit                  | Description                                                                               |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| Improved Organization    | Simplifies locating and managing resources within large environments.                     |
| Enhanced Cost Management | Enables detailed cost tracking and budgeting for financial clarity.                       |
| Automation Support       | Integrates with automation rules and policies to streamline operations and reduce errors. |

![The image lists the benefits of Azure Resource Tags, highlighting improved organization, enhanced cost management, and automation support.](https://kodekloud.com/kk-media/image/upload/v1752868353/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Resource-Tags/azure-resource-tags-benefits.jpg)

## Use Cases

Azure Resource Tags are ideal for:

- Categorizing resources for billing and management.
- Tracking resource ownership and usage during the entire lifecycle—from deployment to decommissioning.
- Triggering automated processes based on specific tags.

![The image outlines three use cases for Azure Resource Tags: resource categorization for billing, ownership and usage tracking, and automating resource lifecycle.](https://kodekloud.com/kk-media/image/upload/v1752868355/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Resource-Tags/azure-resource-tags-use-cases.jpg)

Azure Policy can further automate tagging and enforce compliance rules. Future discussions will cover governance strategies related to tagging.

## Working with Resource Tags in the Azure Portal

Below is a step-by-step guide to applying resource tags through the Azure Portal:

1.  **Tagging a Resource:**  
    Navigate to a specific resource in the Azure Portal and add tags. For example, assign the key "department" with the value "HR" and click Save. You can add up to 50 tags per resource. Some common tag examples include:
    - "call center": "100"
    - "environment": "production"
    - "owner": "market@abc.com"
    - "created on": (creation date)

    > [!important]
    > **Note**
    >
    > Many tags can be automatically populated by Azure services, thus reducing manual input.

2.  **Tagging a Resource Group:**  
    You can add tags at the resource group level as well.

    > [!important]
    > **Warning**
    >
    > Tags applied to a resource group are not automatically inherited by the underlying resources unless explicitly configured through policies or preview features.

3.  **Tag Suggestions:**  
    When tagging a new resource, the Azure Portal suggests tag values based on previous entries. For example, if you have used the tag "department" with the value "HR" before, it will appear in the drop-down list for new entries.
4.  **Cost Management Integration:**  
    After applying a tag, it can take between 8 to 24 hours for the tag to reflect in Azure Cost Management. Remember, tags affect only future costs and cannot be applied retrospectively to historical data.
5.  **Cost Analysis Example:**  
    In Azure Cost Analysis, filter costs by tags to group and display associated expenses. For example, selecting the "department: HR" tag will show costs related only to HR-tagged resources.

![The image shows a Microsoft Azure cost analysis dashboard with a graph displaying accumulated and forecasted costs over time, along with pie charts detailing costs by service, location, and resource group.](https://kodekloud.com/kk-media/image/upload/v1752868356/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Resource-Tags/azure-cost-analysis-dashboard.jpg)

By implementing resource tags, you can effectively create a cost center model that distributes cloud expenses based on the relevant tags configured in the Azure Portal.

![The image shows a Microsoft Azure portal page displaying resources tagged with "Dept: HR." It lists two resources: a container instance and a storage account, both located in the East US region.](https://kodekloud.com/kk-media/image/upload/v1752868357/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Resource-Tags/azure-portal-hr-resources-eastus.jpg)

## Conclusion

Azure Resource Tags are a powerful tool for organizing resources and simplifying cost analysis. By leveraging tagging, organizations like Bella Innovation can maintain structured environments, efficiently manage resource ownership, and optimize budgets through transparent cost tracking. Stay tuned for future articles covering resource logs, Azure policies, and additional governance strategies.

For more information, consider exploring the following resources:

- [Azure Documentation](https://docs.microsoft.com/azure/)
- [Azure Cost Management](https://docs.microsoft.com/azure/cost-management/)
- [Azure Policy](https://docs.microsoft.com/azure/governance/policy/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az900-microsoft-azure-fundamentals/module/e35bb215-c8ca-410f-815d-5f59659dc9ce/lesson/c1a206f8-1299-4995-aabc-e2412362fedf)**
>
> Watch video content
