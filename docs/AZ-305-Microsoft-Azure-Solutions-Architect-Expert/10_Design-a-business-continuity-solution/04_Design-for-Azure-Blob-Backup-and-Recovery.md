# Design for Azure Blob Backup and Recovery - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-business-continuity-solution/Design-for-Azure-Blob-Backup-and-Recovery)

---

## Table of Contents

- Design for Azure Blob Backup and Recovery
  - Key Features of Azure Blob Storage
  - Configuring Backup and Recovery via the Azure Portal
  - Summary
  - Watch Video
    - Step 1: Set Up Soft Delete and Versioning
    - Step 2: Restore Deleted Containers and Blobs
    - Step 3: Implement Point-In-Time Restore (PITR)
      - Restoring a Deleted Container
      - Restoring an Individual Blob

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a business continuity solution

# Design for Azure Blob Backup and Recovery

This article demonstrates how to implement robust backup and recovery for Azure Blob Storage using soft delete, versioning, and Point-In-Time Restore (PITR). These techniques ensure that your data is protected against accidental deletions, overwrites, and corruption.

## Key Features of Azure Blob Storage

Azure Blob Storage provides two primary data protection features:

- **Soft Delete:**
  - Protects blobs, containers, snapshots, and versions from accidental deletions.
  - Retains deleted items for a configurable period (1 to 365 days), allowing for easy restoration to their original location.
  - Supports both container-level and individual blob recovery.

- **Blob Versioning:**
  - Automatically creates a new version every time a blob is modified.
  - Allows you to access and restore any previous version, providing a safety net against unwanted changes.

## Configuring Backup and Recovery via the Azure Portal

### Step 1: Set Up Soft Delete and Versioning

1.  Log in to the Azure portal and navigate to your storage account.
2.  In the Overview pane, inspect the settings for soft delete, container soft delete, versioning, change feed, and other features.

![The image shows a Microsoft Azure portal interface displaying details of a storage account named "eventstorage010," including its properties, security settings, and networking configurations.](https://kodekloud.com/kk-media/image/upload/v1752866808/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Blob-Backup-and-Recovery/azure-portal-eventstorage010-details.jpg)

At this stage, you can:

- Configure blob soft delete by setting the appropriate retention period.
- Enable container soft delete to recover an entire container and its contents.
- Activate blob versioning to maintain a history of changes made to blobs.

After you configure the settings, click **Save** to update the changes.

### Step 2: Restore Deleted Containers and Blobs

#### Restoring a Deleted Container

If you accidentally delete a container:

1.  Enable the **Show deleted containers** toggle in the Azure portal.
2.  Locate the deleted container.
3.  Click the three-dot menu (⋮) and select **Undelete**.
4.  Click **Save** to restore the container along with its contents.

#### Restoring an Individual Blob

For individual blobs:

1.  Enable the **Show deleted blobs** option.
2.  Select the deleted blob.
3.  Click **Undelete**.  
    If the blob has multiple versions, all available versions will be displayed. Choose the version you wish to restore.

> [!important]
> **Note**
>
> Restoring an individual version of a blob is useful when you need to revert to a specific state of your data prior to the most recent changes.

### Step 3: Implement Point-In-Time Restore (PITR)

Point-In-Time Restore (PITR) provides an additional layer of protection by allowing you to revert your blob storage to a specific moment in time. Consider the following scenario:

- Three days ago (T minus three days), Container A contained three blobs, and Container B had two blobs.
- Two days ago (T minus two days), some blobs were deleted, leaving Container A with only one blob.
- With PITR enabled, you can restore all blobs to their state from three days ago.

![The image illustrates a process of point-in-time restore (PITR) for blobs, showing the deletion and restoration of data in storage accounts over a timeline of three days.](https://kodekloud.com/kk-media/image/upload/v1752866809/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Blob-Backup-and-Recovery/point-in-time-restore-blobs-timeline.jpg)

To enable PITR:

1.  Navigate to the **Data Protection** settings for your storage account.
2.  Set the maximum restore point duration (for example, up to 10 days).
3.  Ensure that the PITR retention period is equal to or less than the soft delete retention period, as PITR relies on the soft delete feature.
4.  Click **Save** to apply this configuration.

> [!important]
> **Warning**
>
> Make sure that the PITR retention period does not exceed the soft delete retention period to ensure compatibility between the two features.

## Summary

Azure Blob Storage offers two key backup and recovery options:

| Feature                          | Benefit                                                                                                |
| -------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Soft Delete with Versioning**  | Protects against accidental deletions and allows rollback to previous versions.                        |
| **Point-In-Time Restore (PITR)** | Enables restoration of data to a specific point in time, safeguarding against data corruption or loss. |

By combining these methods, you can secure your data effectively and ensure rapid recovery in the event of unintended data loss or corruption.

Next, we will discuss the backup and recovery options available for Azure Files.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/d9cff719-f4ed-4b69-a9a5-5994a66e8e15/lesson/b595acd3-35e1-4329-b559-ed94a99e3545)**
>
> Watch video content
