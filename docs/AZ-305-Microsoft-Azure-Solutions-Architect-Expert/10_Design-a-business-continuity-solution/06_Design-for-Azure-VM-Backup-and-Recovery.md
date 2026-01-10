# Design for Azure VM Backup and Recovery - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-business-continuity-solution/Design-for-Azure-VM-Backup-and-Recovery)

---

## Table of Contents

- Design for Azure VM Backup and Recovery
  - How Azure VM Backup Works
  - Configuring Backup in the Azure Portal
  - Additional Considerations
  - Watch Video
    - Step 1: Creating a Recovery Services Vault
    - Step 2: Configuring Backup Settings
    - Step 3: Associating Virtual Machines with a Backup Policy
    - Step 4: Monitoring and Managing Backups

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a business continuity solution

# Design for Azure VM Backup and Recovery

This guide details how to design, implement, and manage backup and recovery for Azure Virtual Machines by onboarding them to a Recovery Services Vault and associating them with an appropriate backup policy.

## How Azure VM Backup Works

When you onboard a Virtual Machine (VM) to Azure Backup, an extension is automatically installed on the VM. Based on your backup policy, the Azure Backup service triggers the extension to orchestrate the backup process.

During the backup process:

- A local snapshot is created on the VM.
- The snapshot is retained locally for five days, enabling an "instant restore" without the need to retrieve data from the Recovery Services Vault.
- The backup data is then securely transferred to the Recovery Services Vault for long-term storage and compliance.

This dual-layer strategy ensures both rapid local recovery (within the five-day retention) and robust, secure offsite storage.

Backup scheduling is a critical aspect of the process:

- Group VMs according to their backup policies to synchronize backup timings.
- Schedule backups during non-peak hours to manage network traffic efficiently.
- Define both short-term and long-term retention policies according to your business or compliance needs.
- For immediate needs, trigger an on-demand backup directly from the Recovery Services Vault.

Cross-region Restore (CRR) is another vital feature. CRR allows you to restore your Azure VMs in a paired region, which is especially useful for disaster recovery drills or during unexpected regional outages.

![The image is an infographic explaining Azure VM backup and recovery, detailing the process of taking snapshots, transferring them to a recovery service vault, and outlining backup schedules, retention policies, and cross-region restore (CRR).](https://kodekloud.com/kk-media/image/upload/v1752866833/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-VM-Backup-and-Recovery/azure-vm-backup-recovery-infographic.jpg)

## Configuring Backup in the Azure Portal

Follow these steps to configure backup for an Azure VM using the Azure portal.

### Step 1: Creating a Recovery Services Vault

There are two primary approaches:

1.  Create a new Recovery Services Vault and onboard your VM(s) through it.
2.  For a single VM, navigate directly to the VM’s blade and enable the backup process.

In this example, you create a Recovery Services Vault by searching for "vault" in the Azure portal.

![The image shows a Microsoft Azure portal page displaying a list of Recovery Services vaults, with one entry named "fileshare-rsv" located in the "event-analytics" resource group in East US.](https://kodekloud.com/kk-media/image/upload/v1752866834/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-VM-Backup-and-Recovery/azure-portal-recovery-services-vaults.jpg)

Click on **"Create New Vault"** to begin.

![The image shows a Microsoft Azure portal interface for creating a Recovery Services vault. It includes fields for selecting a subscription, resource group, vault name, and region.](https://kodekloud.com/kk-media/image/upload/v1752866835/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-VM-Backup-and-Recovery/azure-portal-recovery-services-vault.jpg)

> [!important]
> **Note**
>
> During vault creation, the default storage redundancy is set to geo-redundant (GRS). Adjust this option before onboarding any VMs if you prefer a different redundancy model.

![The image shows a Microsoft Azure portal page for creating a Recovery Services vault, displaying details like subscription, resource group, vault name, and region. There is also a note about storage replication types and a "Create" button at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752866836/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-VM-Backup-and-Recovery/azure-recovery-services-vault-portal.jpg)

Once the vault is created, click **"Go to resource"** to start configuring backups.

### Step 2: Configuring Backup Settings

Inside the vault, click on the **"Backup"** option. You will be asked to specify:

- The workload location (Azure, Azure Stack, or on-premises).
- The type of backup (e.g., Virtual Machine, file share, SQL Server in Azure VM, or SAP).

![The image shows a Microsoft Azure portal page for configuring a backup goal, with options to select where the workload is running and what to back up, specifically a virtual machine. A warning about storage replication being set to Geo-Redundant is also displayed.](https://kodekloud.com/kk-media/image/upload/v1752866837/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-VM-Backup-and-Recovery/azure-portal-backup-configuration.jpg)

If you need to change the storage replication type from the default geo-redundant option, return to the Recovery Services Vault’s properties under the backup configuration settings. Here, you can switch between geo-redundant storage (GRS) and locally redundant storage (LRS). For production workloads, GRS is typically recommended; for development or test environments, LRS offers a cost-effective alternative.

![The image shows a Microsoft Azure portal interface for configuring backup settings in a recovery services vault named "sample-vault." It includes options for storage replication type and cross-region restore settings.](https://kodekloud.com/kk-media/image/upload/v1752866838/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-VM-Backup-and-Recovery/azure-portal-backup-settings-sample-vault.jpg)

After updating your settings as necessary, save the changes and return to the vault's overview.

![The image shows a Microsoft Azure portal interface for a Recovery Services vault named "sample-vault," displaying options for backup and site recovery, along with a list of new features and settings.](https://kodekloud.com/kk-media/image/upload/v1752866839/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-VM-Backup-and-Recovery/azure-portal-recovery-services-vault-2.jpg)

### Step 3: Associating Virtual Machines with a Backup Policy

In the **"Backup"** section, select **"Azure"** as the workload location and choose **"Virtual machine"** for the backup type. Various backup policies may be available, such as a standard once-daily backup or policies that support multiple backups per day. Select a policy that aligns with your operational schedule and retention needs.

![The image shows a Microsoft Azure interface for configuring a backup policy for a virtual machine. It includes options for setting the backup schedule, instant restore, and retention range.](https://kodekloud.com/kk-media/image/upload/v1752866840/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-VM-Backup-and-Recovery/azure-backup-policy-configuration.jpg)

Add the VMs you wish to back up. If multiple VMs share the same backup policy, you can add them simultaneously. In this example, the VM “SDVM01” is selected. For single test VMs, you can also initiate backup directly from the VM blade.

![The image shows a Microsoft Azure interface for configuring backup settings, including selecting virtual machines for backup and setting backup policies.](https://kodekloud.com/kk-media/image/upload/v1752866842/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-VM-Backup-and-Recovery/azure-backup-settings-interface.jpg)

When you enable backup, the Azure Backup extension is deployed to your VM. This extension works in tandem with the backup schedule (for example, at 12 a.m.) to execute the backup.

You can monitor the extension deployment process. Additionally, once deployment is complete, there is an option to trigger an on-demand backup when needed.

![The image shows a Microsoft Azure portal page where a deployment named "ConfigureProtection" is in progress for the resource group "db-rg." The page includes deployment details and options for managing the deployment.](https://kodekloud.com/kk-media/image/upload/v1752866842/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-VM-Backup-and-Recovery/azure-portal-configureprotection-deployment.jpg)

### Step 4: Monitoring and Managing Backups

After enabling the backup, navigate back to the Recovery Services Vault to view your backup items. Selecting a specific VM will display detailed backup status. Initially, you might find the backup status as pending; once the backup completes, the status and date will update accordingly.

![The image shows a Microsoft Azure portal page for a virtual machine backup item, displaying backup options, status, and recovery points. The backup pre-check is passed, but there is a warning for the last backup status indicating an initial backup is pending.](https://kodekloud.com/kk-media/image/upload/v1752866843/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-VM-Backup-and-Recovery/azure-portal-virtual-machine-backup.jpg)

If required, click **"Backup now"** to trigger an ad hoc backup, and specify the desired retention period. The backup status and completion details will be updated once the process finishes.

## Additional Considerations

- For on-premises VMs, consider using the Azure Backup Server or System Center Data Protection Manager (DPM) based on your environment.
- Regularly review and update your backup policies to ensure they remain aligned with evolving business and compliance requirements.
- Utilize Cross-Region Restore (CRR) for disaster recovery drills or when restoring VMs in a partnered region.

> [!important]
> **Tip**
>
> Backup and recovery strategies for Azure SQL build on these concepts. Ensure that you tailor policies and settings to align with specific workload requirements.

For more in-depth information, explore the following resources:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Azure Documentation](https://docs.microsoft.com/azure/backup/)
- [Microsoft Azure Backup Overview](https://docs.microsoft.com/azure/backup/)

This guide provides a comprehensive overview to help you establish a reliable backup and recovery strategy for your Azure Virtual Machines.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/d9cff719-f4ed-4b69-a9a5-5994a66e8e15/lesson/0b760e56-e2b3-4ae8-bb63-730cf9e13d4f)**
>
> Watch video content
