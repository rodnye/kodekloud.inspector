# Access Tiers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ900-Microsoft-Azure-Fundamentals/Storage/Access-Tiers)

---

## Table of Contents

- Access Tiers
  - Overview of Access Tiers
  - Benefits of Using Access Tiers
  - Use Cases for Access Tiers
  - Working with Azure Storage Accounts
  - Conclusion
  - Watch Video
    - Hot Tier
    - Cool Tier
    - Cold Tier
    - Archive Tier
    - 1. Creating a Storage Account
    - 2. Navigating the Deployment
    - 3. Working with Containers

---

## Content

AZ900: Microsoft Azure Fundamentals

Storage

# Access Tiers

Understanding access tiers in Azure is like organizing your closet by how often you wear your clothes. Each tier is designed for a specific frequency of data access and cost optimization.

## Overview of Access Tiers

Azure provides multiple access tiers to help you balance performance and cost according to your data usage patterns.

### Hot Tier

The hot tier is comparable to the section of your closet where you keep your most frequently worn clothes. Data in the hot tier is stored for rapid, repeated access in high-demand scenarios—such as streaming videos. However, its high performance comes with a higher storage cost.

### Cool Tier

The cool tier is similar to the clothes you wear occasionally. Although the data is still readily available, it is accessed less frequently (for instance, a monthly report). While this tier offers lower storage costs, it does have a higher cost per access, and data must be stored for at least 30 days.

### Cold Tier

Think of the cold tier as the rarely used formal wear tucked away for special occasions. It offers even lower storage costs, while still keeping data reasonably accessible. This tier is ideal for data seldom referenced, like old photographs. A minimum storage duration of 30 days applies to ensure cost efficiency.

### Archive Tier

The archive tier is like storing keepsakes in a storage unit. It is the most cost-effective option for long-term data retention and is built for data that is rarely or never accessed, such as legal documents. Be aware that retrieving data from this tier requires more time and effort compared to the other tiers.

![The image describes four access tiers for data storage: Hot (frequently accessed, lower access costs, higher storage costs), Cool (infrequent access, lower storage costs, higher access costs), Cold (rarely accessed, lower storage costs, reasonable access costs), and Archive (long-term storage, lowest storage cost, higher retrieval costs).](https://kodekloud.com/kk-media/image/upload/v1752868509/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Access-Tiers/data-storage-access-tiers.jpg)

> [!important]
> **Note**
>
> As you progress from the hot tier to the archive tier, you will notice that while storage costs continuously decrease, the cost and time required for data retrieval increase.

## Benefits of Using Access Tiers

Adopting access tiers in your Azure storage strategy offers several advantages:

- **Cost Management:** Select the appropriate tier to balance how often your data is accessed with the corresponding storage costs.
- **Flexibility:** Easily switch between tiers as your storage needs evolve. Lifecycle management policies can automate these transitions based on the last modified date.
- **High Durability:** Regardless of the selected tier, Azure ensures that your data remains secure and highly durable.

![The image shows three access tier benefits: Cost Management, Flexibility, and High Durability, each represented by a colored card with an icon.](https://kodekloud.com/kk-media/image/upload/v1752868510/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Access-Tiers/access-tier-benefits-cost-flexibility-durability.jpg)

## Use Cases for Access Tiers

Different access tiers are optimized for various use cases:

- **Hot Tier:** Best suited for frequently accessed data, such as content streaming.
- **Cool Tier:** Ideal for short-term backup scenarios or data that is accessed sporadically.
- **Cold Tier:** Designed for infrequently used data that still needs to be retained.
- **Archive Tier:** Perfect for long-term retention and compliance purposes, where data is rarely retrieved.

![The image illustrates four access tiers for data use cases: Hot (frequently used items like streaming content), Cool (short-term backup with infrequent access), Cold (less frequently accessed data), and Archive (long-term data retention for compliance).](https://kodekloud.com/kk-media/image/upload/v1752868512/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Access-Tiers/data-access-tiers-hot-cool-cold-archive.jpg)

> [!important]
> **Tip**
>
> When selecting an access tier, always consider the frequency of data access, required storage duration, and overall financial impact.

## Working with Azure Storage Accounts

Now that you understand the concepts of access tiers, let’s explore how to create and manage an Azure Storage Account using the Azure Portal.

### 1\. Creating a Storage Account

- Open the Azure Portal and search for "Storage Accounts."
- Click on "Create" and set up a new resource group (for example, "az900-storage-rg").
- Provide a unique name for your storage account (e.g., "az900-storage"). You can append random numbers to ensure uniqueness.
- Choose your region and select the performance option (Standard with SSDs or Standard disks). For this scenario, select Standard.
- Select the redundancy option (LRS, GRS, ZRS, or RA-GRS). For simplicity, choose LRS.

![The image shows a Microsoft Azure portal interface displaying a list of storage accounts. There are options to create, manage, and filter storage accounts.](https://kodekloud.com/kk-media/image/upload/v1752868512/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Access-Tiers/azure-portal-storage-accounts-interface.jpg)

- Click on "Review + Create." Once validation passes, click "Create" to begin the deployment.

### 2\. Navigating the Deployment

- After deployment is complete, click on "Go to Resource" to view your new storage account.
- Explore the storage account interface, which includes services such as Blob Storage (containers), File Shares, Queues, and Tables.

![The image shows a Microsoft Azure portal interface for creating a storage account, with fields for project and instance details such as subscription, resource group, storage account name, region, performance, and redundancy options.](https://kodekloud.com/kk-media/image/upload/v1752868514/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Access-Tiers/azure-portal-storage-account-creation.jpg)

### 3\. Working with Containers

- Within your storage account, navigate to "Containers."
- Create a new container (for example, named "images") and configure it to allow anonymous access for public viewing.

![The image shows a Microsoft Azure portal interface with a storage account container list. A new container named "image1" is being created on the right side.](https://kodekloud.com/kk-media/image/upload/v1752868515/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Access-Tiers/azure-portal-storage-account-container.jpg)

- Use the "Upload" button to add files into your container. You can select multiple files for bulk uploading.
- Click on an image file after uploading to view its URL. This URL contains details like the storage account name, Blob service URL, container name, and file name, making it easy to embed images directly in your websites.

![The image shows a Microsoft Azure portal interface displaying a storage container named "images" with a list of JPEG files. A cursor is hovering over the "Add filter" option.](https://kodekloud.com/kk-media/image/upload/v1752868516/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Access-Tiers/azure-portal-storage-container-images.jpg)

- This straightforward method is particularly useful for hosting and managing web assets.

![The image shows a Microsoft Azure portal interface displaying details of a storage account named "az900storage786." It includes information about the account's properties, security, networking, and data storage options.](https://kodekloud.com/kk-media/image/upload/v1752868517/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Access-Tiers/azure-portal-storage-account-details.jpg)

- Finally, a summary screen confirms the successful creation of your storage account.

![The image shows a Microsoft Azure portal screen indicating that a deployment named "az900storage786_1710853350220" is complete. It provides options to view deployment details and go to the resource, along with some additional navigation and feedback options.](https://kodekloud.com/kk-media/image/upload/v1752868518/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Access-Tiers/azure-portal-deployment-complete.jpg)

## Conclusion

This article provided an overview of Azure access tiers—from hot to archive—and detailed the steps for creating and managing a storage account within the Azure Portal. By understanding and leveraging these tiers, you can optimize both the performance and cost of your data storage. Up next, we will explore additional data management strategies within Azure, enhancing your overall cloud infrastructure efficiency.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az900-microsoft-azure-fundamentals/module/dc6682c4-e930-431d-ae27-8de33ae04303/lesson/0138be1d-3220-46d9-b139-8ff27a2b993a)**
>
> Watch video content
