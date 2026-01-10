# Manage Soft Delete - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Data-Protection/Manage-Soft-Delete)

---

## Table of Contents

- Manage Soft Delete
  - Understanding Soft Delete
  - Configuring Soft Delete in the Azure Portal
  - Final Thoughts
  - Watch Video

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Data Protection

# Manage Soft Delete

Azure Backup’s Soft Delete feature significantly enhances data protection by retaining deleted backup data for a defined grace period after a delete command is issued. This mechanism minimizes the risk of accidental data loss by placing your data in a soft-deleted state rather than removing it immediately. In this guide, we explain how soft delete works, how to manage backup deletion, and how to configure these settings within the Azure portal.

## Understanding Soft Delete

When your data is securely backed up in Azure, it remains protected even if you decide to stop the backup process later. Instead of being permanently removed right away, the data enters a soft-deleted state—similar to a pause—providing you with a window to verify or recover any unintentionally deleted data.

During this 14-day grace period, if you choose to stop the backup while retaining existing data, no new backups are created. However, your current backup data remains intact and available for restoration. If you later determine that the deletion should be final, you can execute a purge operation to permanently remove the data. Conversely, if you need to recover mistakenly deleted data, you can resume the backup, effectively restoring the soft-deleted backup as part of your backup strategy.

> [!important]
> **Important Information**
>
> While the default retention period is 14 days, you have the option to extend this period for an additional fee. This policy applies across all backup items protected within the Recovery Services vault, ensuring comprehensive data protection for both virtual machine backups and other workloads.

![The image is a flowchart illustrating the process of managing soft delete for backup items, including states like "Soft Deleted" and "Stop Backup with Retain Data," and actions such as undeleting within 14 days or permanently deleting data. It also includes notes on data retention and recovery features.](https://kodekloud.com/kk-media/image/upload/v1752884525/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Manage-Soft-Delete/soft-delete-backup-flowchart.jpg)

## Configuring Soft Delete in the Azure Portal

To configure the Soft Delete feature, follow these steps:

1.  **Navigate to your Recovery Services Vault:**  
    Access the vault's properties from the Azure portal, where you'll find settings related to backup and site recovery.
2.  **Access Security and Soft Delete Settings:**  
    Within the vault's properties, locate the "Security and soft delete settings" section. Here, you can enable the Soft Delete feature, adjust the retention period, and manage other related security options for both cloud and hybrid workloads.
3.  **Adjust Settings as Needed:**  
    Customize the soft delete configuration to align with your organizational data protection and disaster recovery strategies.

![The image shows a Microsoft Azure portal interface focused on a Recovery Services vault, displaying options for backup and site recovery, along with a list of new features.](https://kodekloud.com/kk-media/image/upload/v1752884526/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Manage-Soft-Delete/azure-portal-recovery-services-vault.jpg)

![The image shows the Microsoft Azure portal with the "Security and soft delete settings" for a Recovery Services vault. It includes options for enabling soft delete for cloud and hybrid workloads, setting retention periods, and configuring other security settings.](https://kodekloud.com/kk-media/image/upload/v1752884527/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Manage-Soft-Delete/azure-portal-security-settings-recovery-vault.jpg)

> [!important]
> **Pro Tip**
>
> Integrating a robust backup management strategy with soft delete capabilities into your disaster recovery plan can greatly enhance your organization's resilience against data loss.

## Final Thoughts

By leveraging Azure Backup’s Soft Delete feature, you add an extra layer of protection to your data, ensuring that even after a delete command, your backup information remains recoverable for a limited time. Consider regularly reviewing and testing your recovery strategy to keep your data protection measures up-to-date and effective.

For further information, visit the official [Azure Backup documentation](https://docs.microsoft.com/en-us/azure/backup/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/a25ecd10-20ce-4ff9-bcc1-386c2e018b09/lesson/ad5de685-6644-45e5-b059-e705bfcf8346)**
>
> Watch video content
