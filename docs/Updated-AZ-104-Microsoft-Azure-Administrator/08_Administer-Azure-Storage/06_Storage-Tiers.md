# Storage Tiers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Azure-Storage/Storage-Tiers)

---

## Table of Contents

- Storage Tiers
  - Hot Tier
  - Cool Tier
  - Archive Tier
  - Configuring Storage Tiers in the Azure Portal
  - Upcoming: Lifecycle Management
  - Watch Video
    - Pricing Overview
    - Cold Tier

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Azure Storage

# Storage Tiers

Azure Storage provides three main access tiers—Hot, Cool, and Archive—to accommodate various storage needs and cost efficiency requirements. Each tier is optimized for specific access patterns and cost profiles, ensuring that you can match your chosen tier with your data's usage frequency and retrieval speed requirements.

## Hot Tier

The Hot Tier is best suited for data that is frequently accessed and demands high availability. Although the storage cost is higher, it significantly reduces access costs, making it an ideal choice for transactional files, logs, or any data that is regularly read or modified.

## Cool Tier

The Cool Tier targets data that is accessed less frequently but still requires a reasonable retrieval speed. It offers lower storage costs compared to the Hot Tier, albeit at slightly higher access costs. This tier is particularly well-suited for data stored for at least 30 days, including monthly financial reports or backups that are only occasionally retrieved.

## Archive Tier

The Archive Tier is designed for data that is rarely accessed and for which longer retrieval times (several hours) are acceptable. With the lowest storage costs and the highest access fees, this tier is perfect for storing raw data such as old legal documents or historical records that do not require frequent modifications or rapid access.

### Pricing Overview

Below is an overview summarizing the cost differences among the storage tiers:

![The image illustrates storage access tiers (Hot, Cool, Archive) with associated storage and access costs, alongside a dropdown menu for changing the access tier.](https://kodekloud.com/kk-media/image/upload/v1752884403/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Storage-Tiers/storage-access-tiers-costs-diagram.jpg)

- **Hot Storage:** Highest storage cost with lower access expense.
- **Cool Storage:** Lower storage cost compared to Hot, with increased access expense.
- **Archive Storage:** Lowest storage cost paired with the highest access fee.

When choosing an access tier, it is essential to weigh the frequency of data access against the required retrieval performance. For instance:

- Data that is regularly accessed, like transactional logs or real-time data streams, performs best on the Hot Tier.
- Infrequently accessed data—such as periodic backups or monthly financial reports—fits well with the Cool Tier.
- Long-term archival data, required for compliance or historical reference and accessed very rarely, is ideally stored in the Archive Tier.

## Configuring Storage Tiers in the Azure Portal

When you create an Azure storage account, you can select the default access tier—Hot or Cool—at the account level. The Archive (and Cold) options are configurable only at the object level.

Upon logging into the Azure Portal, the storage account overview displays the default access tier (for example, Hot). Selecting this option allows you to navigate to a configuration blade where you can change the default tier to Cool if necessary.

![The image shows a Microsoft Azure portal interface displaying details of a storage account, including properties, security settings, and networking configurations.](https://kodekloud.com/kk-media/image/upload/v1752884404/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Storage-Tiers/azure-portal-storage-account-details.jpg)

Within individual containers, such as one labeled "Site 1," you have the ability to adjust the access tier to Archive, Cold, or maintain Hot or Cool. By clicking on the "Change Tier" button, a selection menu presents the available options: Hot, Cool, Archive, and the newly introduced Cold Tier.

### Cold Tier

The Cold option provides an additional level of cost reduction for data that is not expected to be accessed for 90 days or longer. It offers even lower capacity costs compared to the Cool Tier.

> [!important]
> **Note**
>
> While some Azure Portal interfaces display a "Cold" option for object-level tiering, the primary officially supported access tiers in Azure Storage remain Hot, Cool, and Archive. Users should verify the latest Azure documentation to ensure compatibility with their storage account configuration.

## Upcoming: Lifecycle Management

In the next section, we will explore Lifecycle Management, an important feature that automates the organization and transition of data based on its access patterns and age. This helps optimize storage costs and improves data management efficiency.

For additional information on Azure Storage and configuration best practices, consider visiting the [Azure Storage Documentation](https://docs.microsoft.com/en-us/azure/storage/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/48d08f66-feb9-4bae-83b0-2e6aa34e24ae/lesson/4055366c-d46e-44e9-9af8-2e292b23bd1c)**
>
> Watch video content
