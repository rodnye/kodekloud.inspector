# Deploy disk encryption - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Host-Security/Deploy-disk-encryption)

---

## Table of Contents

- Deploy disk encryption
  - Backup and Performance Considerations
  - Managed Disk Encryption Options
  - Enabling Azure Disk Encryption in the Azure Portal
  - Up Next: Microsoft Defender for Endpoints
  - Watch Video

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Host Security

# Deploy disk encryption

Securing your data is essential, and encrypting your disks plays a pivotal role in protecting sensitive information. Azure Disk Encryption (ADE) offers a robust solution to encrypt both operating system and data disks for Windows and Linux virtual machines. In this guide, we explain how ADE works and walk you through its configuration, helping you achieve a balance between security and performance for your applications.

ADE leverages BitLocker for Windows and dm-crypt for Linux to encrypt disks seamlessly. The encryption keys are securely stored in Azure Key Vault, ensuring that only the virtual machine owner has access. This means that if someone downloads a virtual hard disk (VHD) and attaches it to another VM without the necessary keys, the data remains unreadable.

## Backup and Performance Considerations

When using Azure Backup, your encryption keys are saved to the Recovery Services vault, and backups are encrypted with AES 256-bit encryption. This ensures that your backups are secure and tamper-proof.

While disk encryption adds an extra layer of security, it might introduce a slight performance overhead due to the continuous encryption and decryption processes. For CPU-intensive applications, you might consider encrypting only the data disk to optimize performance without compromising the security of your mission-critical data.

![The image shows a "Deploy Disk Encryption" interface with disk settings options and four colorful icons labeled "Encrypt disks," "Restrict access," "Encrypted backup," and "Considerations."](https://kodekloud.com/kk-media/image/upload/v1752881860/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-disk-encryption/deploy-disk-encryption-interface.jpg)

With Azure Disk Encryption, you have the flexibility to safeguard your data in accordance with your application’s performance requirements.

## Managed Disk Encryption Options

Azure offers several disk encryption options to fit various use cases. Below is an overview of these options:

1.  **Encryption at Rest with Platform Managed Key (SSE+PMK):**  
    SSE automatically encrypts data before storage and decrypts it during access. With Platform Managed Keys, all key management is handled by Azure. Note that this method does not encrypt temporary disks, caches, or the data flow between compute and storage, and it does not support customer-managed keys (CMK). In [Microsoft Defender for Cloud](https://learn.microsoft.com/en-us/azure/defender-for-cloud/), the disk encryption status might appear as unhealthy.
2.  **Encryption at Rest with Customer Managed Key (SSE+CMK):**  
    This option provides the same encryption benefits as SSE while allowing you to manage your encryption keys independently. However, if you choose SSE+CMK, you cannot enable Azure Disk Encryption on the VM, and [Microsoft Defender for Cloud](https://learn.microsoft.com/en-us/azure/defender-for-cloud/) will flag the machine as unhealthy.
3.  **Encryption at Host:**  
    This approach encrypts data in use, ensuring protection for temporary disks, OS, and data disks. Similar to SSE, Encryption at Host supports both Platform Managed Keys and Customer Managed Keys. However, when using Encryption at Host, Azure Disk Encryption is not available, and the VM may be marked as unhealthy in [Microsoft Defender for Cloud](https://learn.microsoft.com/en-us/azure/defender-for-cloud/).

![The image is a comparison table of managed disk encryption options, showing features like encryption at rest, temp disk encryption, and customer control of keys for different encryption methods. It includes options such as SSE+PMK, SSE+CMK, Azure Disk Encryption, and Encryption at Host, with checkmarks and crosses indicating feature availability.](https://kodekloud.com/kk-media/image/upload/v1752881862/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-disk-encryption/managed-disk-encryption-comparison-table.jpg)

In summary, consider the following when selecting an encryption method:

- SSE provides automatic encryption with minimal setup.
- ADE is ideal for those who require granular control over virtual machine disk encryption using BitLocker or dm-crypt.
- Encryption at Host is best suited for environments that require comprehensive encryption of data in use, but it is not compatible with ADE.

## Enabling Azure Disk Encryption in the Azure Portal

Follow these step-by-step instructions to enable Azure Disk Encryption on your virtual machine via the Azure portal:

1.  Open the Azure portal and navigate to **Virtual Machines**.
2.  Select the target virtual machine and click on **Disk**.
3.  When selecting a disk, you will initially see the SSE (Storage Service Encryption) settings with a platform-managed key. Note that this setting cannot be altered unless the disk is detached from the VM.
4.  Scroll down to the **Additional settings** section. Here you will see options for enabling Encryption at Host or Azure Disk Encryption (ADE). Keep in mind that Encryption at Host is available only when the virtual machine is deallocated.

![The image shows the "Disk settings" page in Microsoft Azure, where encryption options for virtual machine disks are configured, including settings for encryption at host and Azure Disk Encryption.](https://kodekloud.com/kk-media/image/upload/v1752881862/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-disk-encryption/azure-disk-settings-encryption-options.jpg)

5.  Choose **ADE** and configure your encryption keys by linking to Azure Key Vault. Click to create a new Key Vault—for example, name it "ADE AKV." Ensure that the name is unique.
6.  Within the Key Vault, create your encryption key (e.g., "AAD key") and save your changes. The virtual machine will require a restart to apply the new encryption settings.

![The image shows a Microsoft Azure interface for creating a key vault, with fields for subscription, resource group, key vault name, region, and pricing tier.](https://kodekloud.com/kk-media/image/upload/v1752881864/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-disk-encryption/azure-key-vault-creation-interface.jpg)

> [!important]
> **Unsupported Scenarios**
>
> Before proceeding, note the following unsupported scenarios when using ADE:
>
> - Encrypting basic tier VMs or migrating to classic is not supported.
> - Encrypting VMs utilizing software-based RAID systems is not supported.
> - ADE cannot be applied to VMs with disks already encrypted using Encryption at Host or SSE+CMK.
> - Encryption of Azure Ultra Disks, Premium SSD v2 disks, iSCSI, ephemeral disks, dynamic volumes, NFS, and Azure Files is unsupported.

![The image is a screenshot of a webpage detailing unsupported scenarios for Azure Disk Encryption, listing various configurations and technologies that are not compatible. It includes a navigation menu on the left and additional resources on the right.](https://kodekloud.com/kk-media/image/upload/v1752881865/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-disk-encryption/azure-disk-encryption-unsupported-scenarios.jpg)

Once your key is created and saved, Azure Key Vault will update, and ADE will be enabled on your virtual machine.

For bulk deployments, refer to the Microsoft documentation for scripts that enable ADE on multiple VMs.

## Up Next: Microsoft Defender for Endpoints

In the next section, we will explore [Microsoft Defender for Endpoints](https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/microsoft-defender-endpoint) to enhance your overall security posture.

By following these guidelines, you can easily secure your data with Azure Disk Encryption while maintaining performance and compliance for your computing environment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/d8d70777-3d80-4e41-803e-0929352de5e7/lesson/582e4262-cdbc-4940-873b-5fb66ff6995a)**
>
> Watch video content
