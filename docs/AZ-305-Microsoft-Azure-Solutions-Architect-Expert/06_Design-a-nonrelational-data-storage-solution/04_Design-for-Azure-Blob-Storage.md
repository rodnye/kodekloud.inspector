# Design for Azure Blob Storage - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-nonrelational-data-storage-solution/Design-for-Azure-Blob-Storage)

---

## Table of Contents

- Design for Azure Blob Storage
  - Choosing the Storage Access Tier
  - Requirements for Azure Blob Immutable Storage
  - Setting Up Immutable Storage in the Azure Portal
  - Conclusion
  - Further Reading & Resources
  - Watch Video
    - Premium Tier
    - Standard Hot Tier
    - Standard Cool Tier
    - Archive Tier

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a nonrelational data storage solution

# Design for Azure Blob Storage

In this lesson, we explore advanced design aspects of Azure Blob Storage. Building on the fundamentals discussed in the [AZ-104: Microsoft Azure Administrator](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator) course, this article delves deeper into choosing the appropriate access tier and setting up immutable storage. Before proceeding, ensure you are familiar with the basics of blob storage, including file uploads, access tiers, and lifecycle management policies.

---

## Choosing the Storage Access Tier

Access tiers are crucial for optimizing storage costs based on data access frequency. Azure provides several tiers for standard storage accounts: hot, cool, and archive. In addition, a premium tier that uses SSDs is available for high-performance needs.

### Premium Tier

- Designed for scenarios that demand high IOPS and throughput.
- Features higher data storage costs but minimal retrieval costs.
- Not applicable for hot, cool, or archive concepts since data is accessed frequently.

### Standard Hot Tier

- Best suited for frequently accessed data such as web assets (e.g., images, banners).
- Offers medium storage costs compared to premium, yet higher than cool or archive.
- Boasts very low retrieval costs, ideal for continuous data reading.
- Works well for data staging in processing scenarios.  
  _Note:_ By default, a storage account is created with the hot tier. However, you can later change the access tier for the entire storage account or individual blobs.

### Standard Cool Tier

- Ideal for data that is accessed less frequently, such as short-term backups.
- Provides lower storage costs compared to the hot tier but comes with medium retrieval costs.
- Enforces a minimum storage duration of 30 days.

### Archive Tier

- Recommended for long-term archival and compliance needs (e.g., retention for 10 or 15 years).
- Offers the lowest storage cost, but retrieval is expensive.
- Microsoft advises a retention period of more than 180 days.

The table below summarizes the differences among these access tiers:

![The image is a table comparing different storage access tiers, detailing data storage cost, retrieval cost, storage duration, and use cases for each tier.](https://kodekloud.com/kk-media/image/upload/v1752867101/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Blob-Storage/storage-access-tiers-comparison-table.jpg)

> [!important]
> **Important Information**
>
> - At the storage account level, you can only set the hot or cool tier.
> - The archive tier is configurable at the blob level.

Additionally, you can automate tier transitions using lifecycle management policies based on the last modified date, including optional blob deletion after a specified period.

---

## Requirements for Azure Blob Immutable Storage

Immutable storage is essential for scenarios where compliance or business-critical data must adhere to a Write Once, Read Many (WORM) model. For example, regulations might require data retention for five years under strict policies. Once data is written, immutable storage ensures that it cannot be modified or deleted until the retention period expires. This is achieved by enforcing container-level policies that cover all blobs within the container.

![The image outlines the requirements for Azure blob immutable storage, showing a timeline from 1-year to older data, with container-level policies and audit logs applied. It includes a visual representation of data retention and deletion.](https://kodekloud.com/kk-media/image/upload/v1752867103/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Blob-Storage/azure-blob-immutable-storage-requirements.jpg)

Two types of immutability policies can be applied:

- **Time-Based Retention Policy:**  
  Enforces a prohibition on write and delete operations for a specified duration (e.g., 365 days), ensuring data remains unchanged throughout this period.
- **Legal Hold:**  
  Blocks write and delete operations indefinitely until the legal hold is manually lifted.

In both cases, read operations remain permitted. The diagram below illustrates that while reads are allowed, writes and deletes are blocked under these policies:

![The image illustrates the requirements for Azure blob immutable storage, comparing time-based retention policies and legal holds, both of which allow reads but prohibit writes and deletes.](https://kodekloud.com/kk-media/image/upload/v1752867104/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Blob-Storage/azure-blob-immutable-storage-requirements-2.jpg)

---

## Setting Up Immutable Storage in the Azure Portal

Follow the steps below to configure immutable storage policies directly through the Azure portal:

1.  **Creating a Storage Account:**  
    Begin by navigating to the Storage Accounts section and create a new storage account. Provide a unique name, select the standard performance tier, and choose Locally-redundant Storage (LRS).

    ![The image shows a Microsoft Azure portal interface for creating a storage account, with options for selecting subscription, resource group, and redundancy settings. Various redundancy options like Locally-redundant storage (LRS) and Geo-redundant storage (GRS) are displayed.](https://kodekloud.com/kk-media/image/upload/v1752867105/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Blob-Storage/azure-portal-storage-account-setup.jpg)

2.  **Advanced Options:**  
    In the advanced settings, select an access tier. Remember, only hot and cool tiers are available at the account level.

    ![The image shows a Microsoft Azure portal interface for creating a storage account, specifically on the "Advanced" tab, with options for enabling hierarchical namespace, blob storage settings, and access tier selection.](https://kodekloud.com/kk-media/image/upload/v1752867106/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Blob-Storage/azure-portal-storage-account-advanced.jpg)

3.  **Enabling Version-Level Immutability:**  
    Switch to the Data Protection tab and enable "Enable version-level immutability support." This configuration allows you to set a default time-based retention policy at the account level for all blobs. Note that this option must be enabled during the initial creation of the account. If not enabled, you will need to configure immutability at the container level or for individual blob versions later.

    ![The image shows a Microsoft Azure portal page for creating a storage account, specifically on the "Encryption" tab, where options for encryption type and customer-managed keys are being configured.](https://kodekloud.com/kk-media/image/upload/v1752867107/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Blob-Storage/azure-portal-storage-account-encryption.jpg)

4.  **Verifying Immutable Settings Post-Creation:**  
    After creating the storage account, inspect the Data Protection settings. In accounts without initial version-level immutability enabled, the option will be grayed out. In such cases, immutable policies can still be added at the container level.

    ![The image shows a Microsoft Azure portal interface focused on data protection settings for a storage account named "eventstorage010." Options for enabling soft delete for blobs and containers are visible, along with other data management and access control settings.](https://kodekloud.com/kk-media/image/upload/v1752867108/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Blob-Storage/azure-portal-data-protection-settings.jpg)

5.  **Configuring Container-Level Policies:**  
    Create a new container (for example, "random") and set its access policy to add either a time-based retention policy or a legal hold. For a time-based retention policy, you might specify a duration of 365 days. You can also define whether this policy applies only to append blobs.

    ![The image shows a Microsoft Azure portal interface displaying storage account details, specifically the "eventstorage010" account with its containers, "$logs" and "random," both marked as private.](https://kodekloud.com/kk-media/image/upload/v1752867111/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Blob-Storage/azure-portal-eventstorage010-details.jpg)

6.  **Managing Immutable Policy on a Newly Created Storage Account:**  
    For storage accounts with immutability support enabled during creation, navigate to the Data Protection section and select "Manage Policy." Here, set a default account-level retention period (e.g., 365 days). Keep in mind that while time-based retention can be managed at the account level, legal holds must be applied at the container level.

    ![The image shows a Microsoft Azure portal interface focused on managing data protection settings for a storage account named "immutablesa01." It includes options for enabling soft delete, versioning for blobs, and adding an immutability policy.](https://kodekloud.com/kk-media/image/upload/v1752867112/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Blob-Storage/azure-portal-data-protection-settings-2.jpg)

7.  **Testing the Immutable Policy:**  
    To verify that the immutable policy is in effect, create a container (for example, "so random"), upload a file, and inspect its version details. The version ID will show the active immutability policy with a retention end date (e.g., until 1.8.2024, given a 365-day policy set on January 8, 2023). Any attempt to delete the blob will result in an error message indicating that the blob is immutable.

    ![The image shows a Microsoft Azure portal interface displaying a storage account named "immutablesa01" with containers listed, including "$logs" and "random," both marked as private. A context menu is open with options like "Access policy" and "Generate SAS."](https://kodekloud.com/kk-media/image/upload/v1752867113/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Blob-Storage/azure-portal-storage-account-immutablesa01.jpg)

---

## Conclusion

This article reviewed advanced design considerations for Azure Blob Storage, including the selection of optimal access tiers and the implementation of immutable storage policies for compliance and business-critical scenarios. By leveraging these configurations, you can optimize costs, performance, and data protection to meet your specific requirements.

Next, we will explore the design aspects for Azure Files.

---

## Further Reading & Resources

- [Azure Blob Storage Documentation](https://learn.microsoft.com/en-us/azure/storage/blobs/)
- [Azure Storage Access Tiers](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blob-storage-tiers)
- [Immutable Storage Overview](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blob-immutable-storage)

Happy learning!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/7f522b0e-e9c6-4a0a-acfa-345ee6ebb885/lesson/b9dea148-b8f0-4dae-aa7e-439bb796cc80)**
>
> Watch video content
