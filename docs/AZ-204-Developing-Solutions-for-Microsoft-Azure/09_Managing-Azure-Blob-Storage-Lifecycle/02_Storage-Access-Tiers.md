# Storage Access Tiers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Managing-Azure-Blob-Storage-Lifecycle/Storage-Access-Tiers)

---

## Table of Contents

- Storage Access Tiers
  - Hot Tier
  - Cool Tier
  - Archive Tier
  - Step 1: Access the Storage Service
  - Step 2: Configure the Storage Account
  - Step 3: Additional Configuration Options
  - Step 4: Access the Storage Account and Perform Blob Operations
  - Step 5: Create a Container and Upload Files
  - Step 6: Access Considerations
  - Step 7: Alternative Tools for File Uploads
  - Step 8: Review the Storage Account Overview
  - Watch Video

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Managing Azure Blob Storage Lifecycle

# Storage Access Tiers

Azure Storage offers multiple access tiers designed to optimize both cost and performance based on data access frequency. This flexibility allows you to balance storage expenses with retrieval speed, making Azure Storage an ideal solution for various workloads.

There are three primary access tiers:

## Hot Tier

The **Hot** tier is optimized for frequently accessed data. It delivers the lowest latency and highest throughput, making it perfect for real-time analytics, web applications, and machine learning models that continuously perform data operations. Due to its premium performance, storing data in this tier is more expensive compared to the others.

## Cool Tier

The **Cool** tier is best suited for data that is accessed infrequently but still demands low-latency retrieval. This tier is often used for backups or archived data that is retrieved on a monthly or quarterly basis. While the storage cost is lower than the Hot tier, each data retrieval incurs a higher access cost. It is ideal for workloads with low read and write frequencies.

## Archive Tier

The **Archive** tier provides the lowest storage cost, but data retrieval times are significantly longer, taking several hours. This tier is ideal for scenarios with rare access requirements, such as long-term data retention for compliance or regulatory purposes. It offers a cost-effective solution for storing data that does not require immediate access but must be retained for legal or historical reasons.

![The image illustrates storage access tiers, categorizing data into "Hot" (frequently accessed), "Cool" (infrequently accessed), "Cold" (rarely accessed with fast retrieval), and "Archive" (rarely accessed with flexible latency).](https://kodekloud.com/kk-media/image/upload/v1752866694/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Storage-Access-Tiers/storage-access-tiers-diagram.jpg)

---

This section guides you through creating a storage account in the Azure portal and configuring its access tiers.

## Step 1: Access the Storage Service

1.  Sign in to the Azure portal.
2.  Navigate to **Storage** and click **Create** to start the process of making a new storage account.

## Step 2: Configure the Storage Account

Fill out the necessary details:

- **Resource Group:** Choose an existing resource group or create a new one (e.g., `az204-storage-rg`).
- **Storage Account Name:** Enter a unique name using a combination of letters and numbers. Avoid reserved words like "Azure" to ensure uniqueness.
- **Region & Primary Service:** Select your desired region and choose your primary service. Options include Azure Blob Storage, ADLS Gen2 for analytic workloads, or Azure Files. This example uses **Azure Blob Storage**.
- **Workload and Performance:** Select "other" for the primary workload if you do not require specialized configurations. Choose between **Standard** (using HDD) and **Premium** (using SSD) performance tiers.
- **Redundancy Options:** Select the preferred redundancy option (LRS, GRS, ZRS, or GCRS). For many scenarios, **LRS** is sufficient, though selecting GRS might automatically set it to RAGRS.

![The image shows a configuration screen for setting up an Azure Storage account, including options for subscription, resource group, storage account name, region, and redundancy settings.](https://kodekloud.com/kk-media/image/upload/v1752866696/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Storage-Access-Tiers/azure-storage-account-configuration.jpg)

> [!important]
> **Tip**
>
> Ensure that you double-check your chosen region and redundancy options, as these can affect both performance and data durability.

## Step 3: Additional Configuration Options

Configure further settings such as network access, data protection, and encryption:

- Choose between Microsoft Managed Keys and Customer Managed Keys for key management.
- For this lesson, proceed with the default settings and click **Create** to finalize your storage account.

## Step 4: Access the Storage Account and Perform Blob Operations

Once your storage account is created:

1.  Click **Go to Resource** to access its dashboard.
2.  Notice that the default access tier at the account level is set to **Hot**. At this level, you can only choose between the Hot and Cool tiers.

If you need to use the Archive tier, configure it at the individual blob (object) level by creating a container.

## Step 5: Create a Container and Upload Files

Follow these steps to create a container and manage blob access tiers:

- Navigate to **Containers** and create a new container (e.g., `Files`).
- Open the container and click **Upload** to add files from your device.
- Once a file is uploaded, select **Change Tier** to view the dropdown menu offering **Hot**, **Cool**, and **Archive** options.

![The image shows a Microsoft Azure portal interface displaying details of a blob file, including properties like URL, size, and access tier options. A dropdown menu is open for changing the access tier of the file.](https://kodekloud.com/kk-media/image/upload/v1752866697/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Storage-Access-Tiers/azure-portal-blob-file-details.jpg)

This process demonstrates that while only Hot and Cool tiers are available at the account level, the blob level offers access to all three tiers.

## Step 6: Access Considerations

- The URL of an uploaded blob can be used for direct access.
- However, if the container is set to private, direct public access is restricted.
- For public access, consider converting the blob to a static website as detailed in additional documentation.

## Step 7: Alternative Tools for File Uploads

In addition to the Azure portal, you can upload and manage files using the following tools:

- Storage Explorer
- AzCopy (command-line tool)
- Azure PowerShell
- Azure CLI

This flexibility allows you to choose the tool that best integrates with your workflow.

## Step 8: Review the Storage Account Overview

Return to the storage account overview to inspect details such as:

- Storage type (e.g., General Purpose V2)
- Redundancy (e.g., Locally Redundant Storage)
- Default access tier (Hot)

![The image shows a Microsoft Azure portal interface displaying the overview of a storage account, including details like resource group, location, subscription ID, and various properties related to blob, file, and queue services.](https://kodekloud.com/kk-media/image/upload/v1752866698/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Storage-Access-Tiers/azure-portal-storage-account-overview.jpg)

---

In this section, we introduce blob lifecycle management policies. These policies enable automated transitions between access tiers based on rules such as data age and usage patterns. They are essential for optimizing costs and maintaining an efficient data management strategy.

---

With this lesson, you now have a solid understanding of Azure Storage access tiers, creating a storage account, and managing blob access tiers within containers. Use this foundational knowledge to balance costs and performance effectively for your distributed data workloads.

For more information on managing your Azure Storage solutions, please refer to the [Azure Storage Documentation](https://docs.microsoft.com/en-us/azure/storage/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/38c068f1-0af0-478b-bae7-b031131cdd1e/lesson/7bcca533-87bf-4c4a-a9aa-2fcd2f666cf2)**
>
> Watch video content
