# Rehydrating Data From Archive Tier - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Managing-Azure-Blob-Storage-Lifecycle/Rehydrating-Data-From-Archive-Tier)

---

## Table of Contents

- Rehydrating Data From Archive Tier
  - Option 1: Copying the Archived Blob to an Online Tier
  - Option 2: Changing the Blob's Access Tier
  - Rehydration Priority Options
  - Next Steps
  - Watch Video

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Managing Azure Blob Storage Lifecycle

# Rehydrating Data From Archive Tier

Rehydrating data from the archive tier means transferring offline, cost-effective data back to an online tier for immediate access. Azure offers two primary methods to rehydrate a blob from the archive:

## Option 1: Copying the Archived Blob to an Online Tier

In this method, the archived blob is copied into an online tier (either hot or cool) while the original archived blob remains unchanged. This approach is ideal when you require quick access to a duplicate of the data while preserving the original for future use. Microsoft recommends using this copy operation for most rehydration scenarios.

## Option 2: Changing the Blob's Access Tier

Alternatively, you can change the blob's access tier directly to move it into an online tier, such as hot or cool, by using the `setBlobTier` API. With this method, the blob is entirely moved out of the archive tier. Keep in mind that rehydration through this approach may take additional time depending on the selected priority.

![The image outlines two options for rehydrating blob data from an archive tier: copying an archived blob to an online tier and changing a blob's access tier to an online tier.](https://kodekloud.com/kk-media/image/upload/v1752866691/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Rehydrating-Data-From-Archive-Tier/rehydrate-blob-data-options.jpg)

## Rehydration Priority Options

When rehydrating data, you can choose between different priority settings that affect the duration of the operation:

- **Standard Priority:**  
  This default setting typically completes the rehydration process in several hours—usually between six and 15 hours. It is best suited when there is no immediate urgency to access the data.
- **High Priority:**  
  For scenarios requiring rapid access, setting a high priority can accelerate the process, usually completing within one to five hours depending on the blob's size. Note that opting for high priority may incur additional costs.

![The image illustrates the concept of rehydrating blob data from an archive tier, showing two options: Standard Priority and High Priority, under the category of Rehydration Priority.](https://kodekloud.com/kk-media/image/upload/v1752866693/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Rehydrating-Data-From-Archive-Tier/rehydrating-blob-data-priority-options.jpg)

> [!important]
> **Note**
>
> To specify the desired rehydration priority in your API calls, include the header `X-MS-Rehydrate-Priority` with either a value of `standard` or `high`. This informs the system about your urgency, ensuring the data movement is prioritized accordingly.

## Next Steps

Understanding the available options and priority settings for rehydrating data is essential for managing archived blobs effectively while balancing cost and urgency. In the upcoming lesson, we will dive into working with Azure Blob Storage using the .NET SDK. This session will include practical code samples for uploading, downloading, and managing blob metadata.

See you in the next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/38c068f1-0af0-478b-bae7-b031131cdd1e/lesson/237b0bb0-06cb-4c6b-a83b-e38dd3db5b40)**
>
> Watch video content
