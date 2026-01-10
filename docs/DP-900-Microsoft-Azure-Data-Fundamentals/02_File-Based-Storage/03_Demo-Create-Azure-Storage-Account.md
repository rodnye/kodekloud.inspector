# Demo Create Azure Storage Account - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DP-900-Microsoft-Azure-Data-Fundamentals/File-Based-Storage/Demo-Create-Azure-Storage-Account)

---

## Table of Contents

- Demo Create Azure Storage Account
  - 1. Navigate to Storage Accounts
  - 2. Launch the Creation Wizard
  - 3. Complete the Basics Tab
  - 4. Select Performance and Redundancy Options
  - 5. Review + Create
  - 6. Explore Your New Storage Account
  - 7. List All Storage Accounts
  - Links and References
  - Watch Video

---

## Content

DP-900: Microsoft Azure Data Fundamentals

File Based Storage

# Demo Create Azure Storage Account

In this guide, you’ll learn how to provision an **Azure Storage Account** through the Azure portal. Follow each step carefully to set up your storage with the right configuration for performance, redundancy, and cost.

## 1\. Navigate to Storage Accounts

1.  Sign in at [portal.azure.com](https://portal.azure.com) to reach the Azure dashboard.
2.  Use the **Search** bar at the top instead of scrolling through the left-hand menu.

    ![The image shows a Microsoft Azure dashboard with various services like Storage accounts, Azure Cosmos DB, and Key vaults. It also lists recent resources such as storage accounts and resource groups with their last viewed dates.](https://kodekloud.com/kk-media/image/upload/v1752872977/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Demo-Create-Azure-Storage-Account/azure-dashboard-services-storage-cosmos-db.jpg)

3.  Type **Storage accounts** and select it from the dropdown.

    ![The image shows a Microsoft Azure portal interface with options for services like subscriptions, SQL databases, and storage accounts. It also includes sections for resources, marketplace, and Azure Active Directory.](https://kodekloud.com/kk-media/image/upload/v1752872978/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Demo-Create-Azure-Storage-Account/azure-portal-interface-services-subscriptions.jpg)

## 2\. Launch the Creation Wizard

- In the **Storage Accounts** blade, click **\+ Create** (or **New**) to open the multi-step wizard.
- You’ll see tabs across the top (Basics, Networking, Data Protection, etc.) and a **Review + create** button at the bottom.

![The image shows a Microsoft Azure interface for creating a storage account, with options for selecting a subscription and resource group.](https://kodekloud.com/kk-media/image/upload/v1752872979/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Demo-Create-Azure-Storage-Account/azure-storage-account-creation-interface.jpg)

> Most demos only require filling out the **Basics** tab—the other tabs use recommended defaults.

## 3\. Complete the Basics Tab

Populate these four required fields:

| Field                | Description                                                                             |
| -------------------- | --------------------------------------------------------------------------------------- |
| Subscription         | Choose the Azure subscription for billing.                                              |
| Resource Group       | Select an existing resource group or create a new one for organizing related resources. |
| Storage Account Name | Must be **globally unique**, lowercase letters and numbers only, no spaces.             |
| Region               | The Azure datacenter location. Azure also assigns a paired region for geo-redundancy.   |

> [!important]
> **Naming Requirements**
>
> Your storage account name forms part of the service URL (`<name>.blob.core.windows.net`). If the chosen name is taken, append a unique suffix (e.g., your initials or date).

Scroll down to configure **Performance** and **Redundancy**.

## 4\. Select Performance and Redundancy Options

| Option      | Choices                                                                                  | Use Case                                                   |
| ----------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Performance | Standard (cost-effective) <br> Premium (low latency)                                     | Standard for general workloads; Premium for I/O-intensive. |
| Redundancy  | Locally-redundant (LRS) <br> Geo-redundant (GRS) <br> Read-access geo-redundant (RA-GRS) | LRS for single-region protection; GRS for cross-region.    |

![The image shows a Microsoft Azure interface for creating a storage account, with options for instance details such as storage account name, region, performance, and redundancy settings.](https://kodekloud.com/kk-media/image/upload/v1752872980/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Demo-Create-Azure-Storage-Account/azure-storage-account-creation-interface-2.jpg)

For this demo:

- **Performance**: Standard
- **Redundancy**: Geo-redundant storage (GRS)

## 5\. Review + Create

1.  Click **Review + create**.
2.  The portal validates your configuration.
3.  Click **Create** to start deployment.

Deployments run asynchronously—you’ll see a notification in the top-right when complete. Click **Go to resource** to open your new storage account.

## 6\. Explore Your New Storage Account

![The image shows a Microsoft Azure portal interface displaying details of a storage account named "dp900storageaccountphv," including its essentials, properties, and security settings.](https://kodekloud.com/kk-media/image/upload/v1752872982/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Demo-Create-Azure-Storage-Account/azure-portal-storage-account-details.jpg)

On the **Overview** page you can:

- View **Containers** (Blob storage) and **File shares** (SMB file storage)
- Check essentials like resource group, subscription, and region
- Upload data or delete the account

## 7\. List All Storage Accounts

1.  Search again for **Storage accounts**.
2.  Confirm the correct **Subscription** filter is applied.
3.  Click **Refresh** if your new account isn’t visible immediately.

![The image shows a Microsoft Azure portal interface displaying a list of storage accounts, with one account named "dp900storageaccountphv" listed under the "MSDN Platforms" subscription.](https://kodekloud.com/kk-media/image/upload/v1752872983/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Demo-Create-Azure-Storage-Account/azure-portal-storage-accounts-list.jpg)

---

## Links and References

- [Azure Storage documentation](https://docs.microsoft.com/azure/storage/)
- [Create a storage account in Azure](https://docs.microsoft.com/azure/storage/common/storage-account-create)
- [Azure Regions and Availability Zones](https://azure.microsoft.com/global-infrastructure/geographies/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/dp-900-microsoft-azure-data-fundamentals/module/e229086c-adc3-444d-a6da-f77b41067675/lesson/c747bf44-2df8-46f5-a1fd-753393dd974d)**
>
> Watch video content
