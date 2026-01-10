# Configuring backup Azure VM - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Data-Protection/Configuring-backup-Azure-VM)

---

## Table of Contents

- Configuring backup Azure VM
  - Creating a Backup for an Azure VM
  - Configuring the Backup Policy
  - Initiating the First Backup
  - Restore Options
  - Conclusion
  - Watch Video
    - 1. Policy Settings
    - 2. Assigning VMs to the Policy
    - 3. Enabling Backup
    - 1. File Recovery
    - 2. Virtual Machine Restore

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Data Protection

# Configuring backup Azure VM

This guide explains how to configure and manage backups for Azure virtual machines (VMs) using the Azure Backup service. The service automatically deploys a backup extension on your VM (if not already installed) to orchestrate consistent backup operations. This extension coordinates snapshot creation for your VM’s managed disks. For application-consistent backups, it interacts with the Volume Shadow Copy Service (VSS) on Windows VMs or runs user-defined post scripts on Linux VMs. In doing so, it ensures that in-flight transactions and caches are fully flushed to disk before taking a snapshot.

During backup configuration, you define policies that set the backup frequency, retention periods (daily, weekly, monthly, and yearly), and establish instant restore points. For instance, you might schedule a daily backup at 7 a.m., retain that backup for 30 days, and configure additional weekly or monthly backups as needed to meet your recovery objectives.

At the scheduled backup time, the Azure Backup service sends a request to the backup extension to start the process. The extension creates a snapshot of the VM’s attached managed disk. This snapshot—representing the VM’s current state—is transferred incrementally to the Recovery Services vault over encrypted HTTPS connections. If the VM uses Azure Disk Encryption, the encryption key is also exported to assist with future restore operations.

![The image is a diagram illustrating the process of virtual machine backup for Azure VMs, showing components like managed disks, instant recovery snapshots, and Azure Backup Service with backup policy management and recovery services vault.](https://kodekloud.com/kk-media/image/upload/v1752884482/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Configuring-backup-Azure-VM/azure-vm-backup-diagram.jpg)

---

## Creating a Backup for an Azure VM

To create a backup for your Azure VM, follow these steps:

1.  **Access Your Virtual Machine:**
    - Open the Azure portal and navigate to the Virtual Machines section.
    - In this demonstration, we are using a VM named "RSV Demo 1," which is running a web server. Although the web server is accessible via its public IP, the focus here is solely on backup configuration.

![The image shows a Microsoft Azure portal interface displaying details of a virtual machine named "rsv-demo-1," including its status, location, operating system, and network information.](https://kodekloud.com/kk-media/image/upload/v1752884483/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Configuring-backup-Azure-VM/azure-portal-virtual-machine-rsv-demo-1.jpg)

2.  **Select or Create a Recovery Services Vault:** Before enabling backup, create or choose an existing Recovery Services vault. This vault acts as the centralized storage location for your backup data. In this example, we use a previously created vault used for file and folder backups, a method that is especially beneficial when managing backups for multiple VMs.

![The image shows a Microsoft Azure portal interface for managing Recovery Services vaults, with options for backup and site recovery. It includes a list of features and updates related to Azure VMs and databases.](https://kodekloud.com/kk-media/image/upload/v1752884484/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Configuring-backup-Azure-VM/azure-portal-recovery-services-vaults.jpg)

3.  **Set Up Your Backup Goal:**
    - With the vault selected, set your backup goal by clicking on "Backup."
    - From the options provided (such as once-a-day backups with different operational tiers and enhanced modes), choose the one that fits your scenario—in this demonstration, the standard mode is used.

![The image shows a Microsoft Azure portal page for setting a backup goal, with options to select where the workload is running and what to back up, such as a virtual machine.](https://kodekloud.com/kk-media/image/upload/v1752884485/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Configuring-backup-Azure-VM/azure-portal-backup-goal-setup.jpg)

---

## Configuring the Backup Policy

### 1\. Policy Settings

- Create a new policy (e.g., "VM Backup Policy") or modify the default policy.
- Set the backup frequency (e.g., daily at 4 a.m. with support for your local time zone).
- Define instant restore points (snapshot retention) and specify a retention period (the default might be two days).
- Configure retention for weekly, monthly, and yearly backups, determining both the scheduled backup day and the retention duration.

### 2\. Assigning VMs to the Policy

- After configuring your policy, click **OK** to save it.
- Add the desired VMs to the policy. The portal will list all VMs in the selected region, allowing you to choose which ones to back up.

![The image shows a Microsoft Azure portal interface for configuring a backup policy for virtual machines. It includes options for backup frequency, instant restore, and retention settings, with a virtual machine selected for backup.](https://kodekloud.com/kk-media/image/upload/v1752884487/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Configuring-backup-Azure-VM/azure-portal-backup-policy-configuration.jpg)

### 3\. Enabling Backup

- Validate your configuration. The system checks if the backup extension can be installed on the selected VMs.
- Once validated, click on "Enable Backup" to install the backup extension, which will handle ongoing backup operations.
- The deployment details displayed in the portal will confirm the addition of the backup extension to your VM.

![The image shows a Microsoft Azure portal screen with a deployment in progress for configuring protection, including details about resources and operation status. The right panel displays operation details such as provisioning state, timestamp, and tracking ID.](https://kodekloud.com/kk-media/image/upload/v1752884488/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Configuring-backup-Azure-VM/azure-portal-deployment-progress.jpg)

---

## Initiating the First Backup

Once backup is enabled, initiate the first backup operation as follows:

1.  Open the Recovery Services vault resource.
2.  Under the Backup Items section, locate your virtual machine (for example, "VM1").
3.  Click on "View Details" and then start the first backup.

This initial backup creates a restore point that you can later use either to restore the entire VM or to recover specific files.

![The image shows a Microsoft Azure portal interface for a backup item named "rsv-demo-1," displaying backup status, recovery points, and related details. The backup pre-check is passed, but the last backup status shows a warning for an initial backup pending.](https://kodekloud.com/kk-media/image/upload/v1752884490/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Configuring-backup-Azure-VM/azure-portal-backup-rsv-demo-1.jpg)

Monitor the backup process using the job details:

![The image shows a Microsoft Azure portal page displaying backup job details, including workload names, operations, statuses, types, start times, and durations.](https://kodekloud.com/kk-media/image/upload/v1752884491/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Configuring-backup-Azure-VM/azure-portal-backup-job-details.jpg)

When the extension creates the snapshot, the data is securely transferred to the Recovery Services vault. Refresh the page to confirm that backup completion is successful—the most recent restore point should indicate a recently completed backup.

![The image shows a Microsoft Azure portal interface displaying backup details for a virtual machine, including backup status, recovery points, and backup policy information.](https://kodekloud.com/kk-media/image/upload/v1752884492/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Configuring-backup-Azure-VM/azure-portal-backup-details-vm.jpg)

---

## Restore Options

Azure Backup offers two primary restoration methods:

### 1\. File Recovery

Use this option to restore individual files:

- Select the desired restore point.
- Download the file recovery executable.
- Run the executable to mount a recovery disk and extract the required files.

![The image shows a Microsoft Azure File Recovery interface, where a user can select a restore point, download an executable script for file recovery, and unmount disks after recovery.](https://kodekloud.com/kk-media/image/upload/v1752884493/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Configuring-backup-Azure-VM/azure-file-recovery-interface.jpg)

### 2\. Virtual Machine Restore

For full VM restoration, you have multiple options:

- Create a new virtual machine from the chosen restore point. This option is ideal for testing recovery without affecting your production environment.
- Restore the disk to recover from corruption or issues. In this case, specify the resource group and location for a staging account; the restored disk appears as a VHD file in your storage account.

Select a restore point and then decide whether to use "Create New" or "Restore Disk" based on your scenario.

![The image shows a Microsoft Azure portal interface for restoring a virtual machine, with options to select a restore point based on date and consistency type.](https://kodekloud.com/kk-media/image/upload/v1752884494/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Configuring-backup-Azure-VM/azure-portal-restore-virtual-machine.jpg)

If you have an existing disk backup and wish to replace the disk, choose the "Replace Existing" option.

![The image shows a Microsoft Azure portal interface for restoring a virtual machine, with options to create a new virtual machine or replace an existing one. Various configuration settings such as restore point, data store, and network options are available for selection.](https://kodekloud.com/kk-media/image/upload/v1752884495/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Configuring-backup-Azure-VM/azure-portal-restore-virtual-machine-2.jpg)

Additional restore details and options are available in the portal once the restore job is initiated.

![The image shows a Microsoft Azure portal interface for restoring a virtual machine, with options to select a restore point, data store, restore configuration, and other settings.](https://kodekloud.com/kk-media/image/upload/v1752884497/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Configuring-backup-Azure-VM/azure-portal-restore-virtual-machine-3.jpg)

Monitor the job status to determine when your new VM or restored disk is ready for use. You can later create a snapshot from the restored disk if needed.

![The image shows a Microsoft Azure portal interface for restoring a virtual machine. It includes options for selecting a restore point, data store, restore configuration, and other settings.](https://kodekloud.com/kk-media/image/upload/v1752884498/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Configuring-backup-Azure-VM/azure-portal-restore-virtual-machine-4.jpg)

---

## Conclusion

In this guide, you learned how to configure Azure VM backups using the Recovery Services vault and the backup extension deployed on your VM. We covered setting up backup policies, initiating backup operations, and exploring restore options for both file-level and full VM recoveries.

> [!important]
> **Next Steps**
>
> Up next, explore how to back up and restore on-premises virtual machines to expand your data protection strategy.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/a25ecd10-20ce-4ff9-bcc1-386c2e018b09/lesson/55f44e1c-8f80-4b97-b28e-cdfdc2693dc0)**
>
> Watch video content
