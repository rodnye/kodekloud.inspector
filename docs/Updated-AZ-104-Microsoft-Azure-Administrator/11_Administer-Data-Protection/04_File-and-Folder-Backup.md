# File and Folder Backup - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Data-Protection/File-and-Folder-Backup)

---

## Table of Contents

- File and Folder Backup
  - Overview
  - Setting Up Azure File Share Backup
  - On-Premises Files and Folders Backup
  - Restoring Files and Folders from an On-Premises Backup
  - Conclusion
  - Watch Video
    - Creating a Storage Account and File Share
    - Configuring the Recovery Services Vault
    - Preparing the Infrastructure
    - Installing and Registering the MARS Agent
    - Scheduling and Running Backups

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Data Protection

# File and Folder Backup

In this guide, you will learn how to back up files and folders from both on-premises systems and Azure File Shares using Azure Backup. The process involves deploying an Azure Recovery Services Vault to securely store your data. The vault leverages managed Azure storage along with robust backup functionalities.

## Overview

Azure Backup offers native integration with Azure Files for seamless file share protection. For on-premises Windows servers, the Microsoft Azure Recovery Services (MARS) Agent is required to replicate your data to the Recovery Services Vault.

The guide is divided into two main sections:

- Backing up Azure File Shares using the Azure portal
- Backing up on-premises files and folders using the MARS Agent on a Hyper-V machine

---

## Setting Up Azure File Share Backup

### Creating a Storage Account and File Share

1.  In the Azure portal, navigate to **Storage Accounts** and create a new account. Select your subscription and create a new resource group.
2.  Provide a distinctive name for the storage account (for example, "RSV Demo"), and choose the appropriate options (e.g., Standard, LRS advanced). Click **Review + Create** and proceed after validation.
3.  After the storage account is deployed, configure a file share within it.

You can then upload files directly via the Azure portal:

- **Image:**  
  ![The image shows a Microsoft Azure interface for creating a new file share with backup options enabled, including settings for a recovery services vault, resource group, and backup policy.](https://kodekloud.com/kk-media/image/upload/v1752884502/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-File-and-Folder-Backup/azure-file-share-backup-settings.jpg)

After creating the file share, click on **Browse** and upload your files.

- **Image:**  
  ![The image shows a Microsoft Azure portal interface with a file upload section on the right, displaying a list of uploaded image files.](https://kodekloud.com/kk-media/image/upload/v1752884503/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-File-and-Folder-Backup/azure-portal-file-upload-interface.jpg)

### Configuring the Recovery Services Vault

1.  In the Azure portal, go to **Recovery Services Vaults** and create a new vault. Use an existing resource group or create a new one (for example, RG Data Protection), assign a name such as "RSV01", and select your preferred region (e.g., East US).
    - **Image:**  
      ![The image shows a Microsoft Azure portal interface with a search for "recovery services," displaying various services, marketplace options, and documentation related to recovery and backup.](https://kodekloud.com/kk-media/image/upload/v1752884504/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-File-and-Folder-Backup/azure-portal-recovery-services-search.jpg)

2.  If a private endpoint is not required, skip its configuration by clicking **Review endpoint** and then **Review and Create**.
    - **Image:**  
      ![The image shows a Microsoft Azure portal page for creating a Recovery Services vault, with details like subscription, resource group, and region specified. A cursor is hovering over the "Create" button.](https://kodekloud.com/kk-media/image/upload/v1752884506/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-File-and-Folder-Backup/azure-recovery-services-vault-creation.jpg)

After the vault is deployed, register your file share for backup:

1.  In the Recovery Services Vault, select **Backup**, specify that your workload runs in Azure, and choose **File Share** as the backup option.
2.  Select the target storage account and file share from the list. Optionally, you can enable a lock on the storage account to prevent accidental deletion.
3.  Complete the registration process by setting your backup policy details such as frequency and retention period.
    - **Image:**  
      ![The image shows a Microsoft Azure portal interface for configuring a backup policy for an Azure File Share. It includes options for setting the backup schedule, frequency, and retention range.](https://kodekloud.com/kk-media/image/upload/v1752884507/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-File-and-Folder-Backup/azure-portal-backup-policy-interface.jpg)

Click **Enable Backup** to start protecting your file share. Once enabled, you can view the backup items in your Recovery Services Vault:

- **Image:**  
  ![The image shows a Microsoft Azure portal interface displaying backup items in a Recovery Services vault, with a list of backup management types and their item counts.](https://kodekloud.com/kk-media/image/upload/v1752884508/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-File-and-Folder-Backup/azure-portal-backup-items-vault.jpg)

If you see a warning such as "Initial Backup Pending", trigger the backup manually by clicking **Back Up Now** within the backup item details.

- **Image:**  
  ![The image shows a Microsoft Azure portal page displaying backup items for Azure Storage (Azure Files). It lists details such as the name, storage account, resource group, and backup status, with a warning indicating an initial backup is pending.](https://kodekloud.com/kk-media/image/upload/v1752884509/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-File-and-Folder-Backup/azure-portal-backup-items-storage.jpg)

Once the backup status changes to "Success", you can simulate a restore process by deleting some files from the file share.

- **Image:**  
  ![The image shows a Microsoft Azure portal page displaying backup details for an Azure file share named "rsvdemo." It includes information about the backup status, subscription, and storage account, with a warning indicating that the initial backup is pending.](https://kodekloud.com/kk-media/image/upload/v1752884510/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-File-and-Folder-Backup/azure-portal-backup-rsvdemo-details.jpg)

Next, navigate back to the file share, delete some files, and then restore them from the Recovery Services Vault by choosing the **File Recovery** option. Select an appropriate restore point (if multiple exist), and pick the individual files you need. In case of conflicts, options to skip or override are provided.

- **Image:**  
  ![The image shows a Microsoft Azure portal interface for restoring files, with options to select a restore point, destination, and conflict resolution. Two files, "City2.jpg" and "City1.jpg," are listed for recovery.](https://kodekloud.com/kk-media/image/upload/v1752884512/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-File-and-Folder-Backup/azure-portal-file-restore-options.jpg)

After the restore process, you will see the recovered files back in your file share.

---

## On-Premises Files and Folders Backup

To back up on-premises files and folders, you need to install the MARS Agent. This section explains how to configure your on-premises environment and register it with the Recovery Services Vault.

### Preparing the Infrastructure

1.  In the Azure portal under the backup section for on-premises, select **Files and Folders** and click **Prepare Infrastructure**. This action provides download links for the MARS Agent and the vault credentials.
    - **Image:**  
      ![The image shows a Microsoft Azure portal page with instructions for preparing infrastructure using the Recovery Services Agent. It includes steps for installing the agent, downloading vault credentials, scheduling backups, and configuring notifications.](https://kodekloud.com/kk-media/image/upload/v1752884513/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-File-and-Folder-Backup/azure-portal-recovery-services-agent.jpg)

2.  Download both the MARS Agent installer and the vault credentials file (an XML text file) and copy them to your on-premises Windows Server or Hyper-V machine.
    - **Image:**  
      ![The image shows a Microsoft Azure portal page with instructions for preparing infrastructure, alongside a Windows Server Manager dashboard window. The Server Manager window includes a prompt about managing servers with Windows Admin Center.](https://kodekloud.com/kk-media/image/upload/v1752884514/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-File-and-Folder-Backup/azure-portal-windows-server-manager.jpg)

### Installing and Registering the MARS Agent

1.  Execute the MARS Agent installer on your server. During installation, configure the cache location and any necessary proxy settings if using a private network connection.
    - **Image:**  
      ![The image shows a Microsoft Azure portal with a virtual machine connection open, displaying the Microsoft Azure Recovery Services Agent Setup Wizard in the Server Manager Dashboard. The setup wizard is at the "Installation Settings" stage, where installation and cache locations are being configured.](https://kodekloud.com/kk-media/image/upload/v1752884515/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-File-and-Folder-Backup/azure-portal-virtual-machine-setup.jpg)

2.  When prompted, load the downloaded vault credentials file. This file links your server to the Recovery Services Vault. An example vault credentials file is shown below:

```
<?xml version="1.0" encoding="utf-8"?>
<RBackupVaultAADCreds xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.datacontract.org/2004/07/Microsoft.Azure.Portal.RecoveryServices.Models.Common">
  <Version>2.0</Version>
  <SubscriptionId>2cda1881-8c1e-4c15-be23-9aegTyfo9o1e41T5XhR</SubscriptionId>
  <ResourceType>Vaults</ResourceType>
  <ResourceName>rsv-01</ResourceName>
  <ManagementCert>MIIBIjANBgkqhkiG9w0B...</ManagementCert>
</RBackupVaultAADCreds>
```

3.  The wizard will then request you to input a password for backup encryption (a minimum of 16 characters). It is recommended to store this password securely for recovery purposes.
    - **Image:**  
      ![The image shows a Microsoft Azure portal with a Server Manager window open, displaying the "Encryption Setting" section of the Register Server Wizard. It includes options for entering and confirming a passphrase for data backup encryption.](https://kodekloud.com/kk-media/image/upload/v1752884517/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-File-and-Folder-Backup/azure-portal-server-manager-encryption.jpg)

Once registration is complete, the MARS Agent appears in the **All Programs** list as **Azure Backup**.

### Scheduling and Running Backups

1.  Open the Azure Backup console on your server and choose the files and folders you wish to protect. For example, you might want to back up data from `C:\Users\Administrator\Documents`.
2.  Configure your preferred backup schedule (up to three times per day) and define the retention period.
    - **Image:**  
      ![The image shows a Microsoft Azure interface with a "Schedule Backup Wizard" window open, where a backup schedule is being specified for files and folders.](https://kodekloud.com/kk-media/image/upload/v1752884518/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-File-and-Folder-Backup/azure-schedule-backup-wizard.jpg)

3.  For the initial backup, select whether to transfer data online or offline. For larger datasets, options such as using a Data Box or physical disk are available, whereas online transfers are typically sufficient for smaller volumes.
    - **Image:**  
      ![The image shows a Microsoft Azure interface with a "Schedule Backup Wizard" window open, where the user is selecting an initial backup type for files and folders, with options for online and offline transfers.](https://kodekloud.com/kk-media/image/upload/v1752884519/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-File-and-Folder-Backup/azure-schedule-backup-wizard-interface.jpg)

After scheduling, the backup process starts automatically. You can also trigger an immediate backup if necessary. In cases where a backup job fails (for instance, due to temporary network issues), you can restart the process from the MARS Agent console.

- **Image:**  
  ![The image shows a Microsoft Azure Backup interface with a list of backup jobs, one completed and one failed, along with options for managing backups. The background displays a web page for preparing infrastructure in Azure.](https://kodekloud.com/kk-media/image/upload/v1752884520/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-File-and-Folder-Backup/azure-backup-interface-jobs-management.jpg)

---

## Restoring Files and Folders from an On-Premises Backup

1.  Open the Azure Backup console and select **Recover Data**.
    - **Image:**  
      ![The image shows a Microsoft Azure Backup interface with a "Recover Data Wizard" window open, guiding the user through the process of recovering files from a backup service.](https://kodekloud.com/kk-media/image/upload/v1752884522/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-File-and-Folder-Backup/azure-backup-recover-data-wizard.jpg)

2.  Choose the server and specify the recovery location (typically the primary region). Select your desired recovery mode (individual files and folders, volume, or system state), then choose the appropriate volume (e.g., C:) and the date that corresponds to the desired recovery point.
3.  Mount the recovery point. It will appear as a temporary drive on your system, allowing you up to six hours (extendable up to seven days if necessary) to copy the data back to its original location.
    - **Image:**  
      ![The image shows a Microsoft Azure Backup interface with a recovery process in progress, displaying recovery details and options to browse or unmount the recovery volume.](https://kodekloud.com/kk-media/image/upload/v1752884523/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-File-and-Folder-Backup/azure-backup-recovery-interface.jpg)

After verifying and copying over the recovered files, unmount the temporary recovery volume. Detailed backup history and recovery points can be reviewed within the Recovery Services Vault.

- **Image:**  
  ![The image shows a Microsoft Azure portal page displaying backup details for a computer named "win-bkbran4psd9," with a successful last backup status and one recovery point.](https://kodekloud.com/kk-media/image/upload/v1752884524/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-File-and-Folder-Backup/azure-backup-details-win-bkbran4psd9.jpg)

---

## Conclusion

In this article, we demonstrated how to protect your data using Azure Backup for both Azure File Shares and on-premises files and folders. By setting up a Recovery Services Vault and configuring appropriate backup policies, you can ensure your critical data is securely stored and can be restored when needed.

> [!important]
> **Note**
>
> Azure Backup not only handles files and folders but can also be applied to virtual machines, making it an essential component in a comprehensive data protection strategy.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/a25ecd10-20ce-4ff9-bcc1-386c2e018b09/lesson/87dfcc3b-38b6-4d82-b5ba-7512ca5f5a94)**
>
> Watch video content
