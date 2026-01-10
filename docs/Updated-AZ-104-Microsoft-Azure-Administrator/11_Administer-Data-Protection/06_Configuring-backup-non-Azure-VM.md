# Configuring backup non Azure VM - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Data-Protection/Configuring-backup-non-Azure-VM)

---

## Table of Contents

- Configuring backup non Azure VM
  - Additional Resources
  - Watch Video

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Data Protection

# Configuring backup non Azure VM

In this article, we explain how to back up on-premises virtual machines (VMs) to Azure using the Recovery Services Vault. The Recovery Services Vault can store backups for various specialized workloads, including Exchange, SharePoint, and SQL Server, supporting both Linux and Windows VMs on Hyper-V, VMware, and even physical Windows Server machines.

When leveraging Azure, backups can be configured easily via the portal. For on-premises environments, however, you can utilize tools like Microsoft Azure Backup Server (MABS) and System Center Data Protection Manager (DPM). These tools bridge your on-premises environment with Azure by handling backup scheduling, retention policies, and securely transferring data to Azure over an HTTPS-encrypted connection.

![The image illustrates a process for backing up on-premises virtual machines, showing specialized workloads, virtual machines, and physical servers being backed up to a Recovery Services Vault via MABS or DPM.](https://kodekloud.com/kk-media/image/upload/v1752884499/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Configuring-backup-non-Azure-VM/vm-backup-process-recovery-services.jpg)

When a backup is initiated, data is securely transmitted over the network to the Recovery Services Vault. In addition to the cloud backup, a local copy is maintained to facilitate rapid restore operations in case of issues. This dual backup strategy ensures low latency access on-premises while also providing a secure secondary copy in the cloud.

If you are using System Center Configuration Manager (SCCM), you have the option to configure backups with the DPM agent. The diagram below outlines the process for setting up the Azure Backup Server, including installation steps and downloading vault credentials:

![The image shows a Microsoft Azure portal page for preparing infrastructure, specifically for installing and configuring the Azure Backup Server. It includes steps for installation and downloading vault credentials.](https://kodekloud.com/kk-media/image/upload/v1752884500/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Configuring-backup-non-Azure-VM/azure-backup-server-setup-guide.jpg)

> [!important]
> **Note**
>
> Once MABS is enabled, the data flows securely to the Recovery Services Vault, ensuring an efficient and safe backup process.

Due to limited on-premises resources, a live demonstration of this configuration is not provided. However, the outlined process reliably secures your backup data both locally and in the cloud.

This concludes the overview of configuring backup for non-Azure VMs. In the next section, we will compare MABS with MARS to help you determine the best solution for your backup strategy.

## Additional Resources

- [Azure Backup Documentation](https://learn.microsoft.com/azure/backup/)
- [Microsoft Azure Recovery Services Vault](https://learn.microsoft.com/azure/backup/backup-recovery-services-vault-overview)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/a25ecd10-20ce-4ff9-bcc1-386c2e018b09/lesson/842c051b-1a60-4a56-bca2-cb64a6948d7e)**
>
> Watch video content
