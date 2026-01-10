# Storage Service Encryption SSE and Azure Disk Encryption ADE - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Azure-Storage/Storage-Service-Encryption-SSE-and-Azure-Disk-Encryption-ADE)

---

## Table of Contents

- Storage Service Encryption SSE and Azure Disk Encryption ADE
  - Storage Service Encryption (SSE)
  - Azure Disk Encryption (ADE)
  - Configuring Encryption in the Azure Portal
  - Next Topic: Storage Security and Authorization
  - Watch Video
    - Key Benefits of SSE
    - Bring Your Own Keys (BYOK)
    - Key Features of ADE
    - Configuring SSE for Storage Accounts
    - Enabling ADE on Virtual Machines

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Azure Storage

# Storage Service Encryption SSE and Azure Disk Encryption ADE

This article explains two essential encryption solutions available in Azure that help secure your data at rest while ensuring compliance and performance: Storage Service Encryption (SSE) and Azure Disk Encryption (ADE).

Both encryption methods provide robust security measures, using industry-standard 256-bit AES encryption, with automatic encryption and decryption processes managed by Azure services. They also support customer control over encryption keys to meet specific regulatory and security requirements.

## Storage Service Encryption (SSE)

Storage Service Encryption (SSE), also known as Server Side Encryption, automatically encrypts data as it is stored in Azure. This built-in service applies to Azure Disk, Blob, File, Queue, and Table services, ensuring that data is encrypted at rest and transparently decrypted when accessed.

### Key Benefits of SSE

- **Protection:** All data stored in Azure is encrypted by default, ensuring that data at rest remains secure.
- **Compliance:** Organizations can meet strict security and regulatory requirements without developing custom encryption solutions.
- **Robust Security:** SSE employs 256-bit AES encryption along with automatic key and data management by the Storage Service.

![The image is about Storage Service Encryption (SSE) and includes icons for protection, compliance, and strong cipher, alongside a description of encryption options and settings for Azure Storage.](https://kodekloud.com/kk-media/image/upload/v1752884398/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Storage-Service-Encryption-SSE-and-Azure-Disk-Encryption-ADE/storage-service-encryption-azure.jpg)

> [!important]
> **Default Settings**
>
> By default, SSE is enabled on all storage accounts, and this setting cannot be disabled, ensuring consistent data protection.

### Bring Your Own Keys (BYOK)

If you require full control over your encryption keys and their rotation, Azure supports the Bring Your Own Keys (BYOK) model. Simply create an Azure Key Vault to securely store your keys, and then configure your Storage Service to use these Customer Managed Keys for both encryption and decryption.

## Azure Disk Encryption (ADE)

Azure Disk Encryption (ADE) secures the disks of your virtual machines (VMs) by encrypting both operating system (OS) and data disks. Without ADE, a snapshot VHD could be attached to another VM, potentially exposing sensitive information. ADE mitigates this risk by ensuring the disk is encrypted.

### Key Features of ADE

- **Comprehensive Coverage:** ADE encrypts both OS and data disks for Windows and Linux VMs.
- **Encryption Mechanisms:** Utilizes BitLocker for Windows and dm-crypt for Linux.
- **Key Management:** Encryption keys are securely stored in Azure Key Vault.
- **Access Control:** Only the VM owner can access the encrypted data. If a VHD is downloaded and attached elsewhere without the corresponding keys, the data remains inaccessible.
- **Backup Security:** When using Azure Backup, encryption keys are backed up in the Recovery Services Vault, ensuring that all backups are also encrypted.
- **Encryption Standard:** Implements robust 256-bit encryption.

![The image is about Azure Disk Encryption (ADE) and includes icons for encrypting disks, restricting access, encrypted backup, and considerations, alongside a screenshot of disk settings options.](https://kodekloud.com/kk-media/image/upload/v1752884400/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Storage-Service-Encryption-SSE-and-Azure-Disk-Encryption-ADE/azure-disk-encryption-icons-settings.jpg)

> [!important]
> **Performance Considerations**
>
> Encrypting both OS and data disks may cause a slight performance impact due to the encryption and decryption overhead. In CPU-intensive scenarios, consider encrypting only the data disk to optimize performance. Also, note that if "Encryption at Host" is enabled, ADE cannot be used because host-level encryption relies solely on platform-managed keys.

Additionally, Azure offers an "Encryption at Host" option. For further information on this feature, refer to [Microsoft Azure Security Technologies (AZ-500)](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500).

## Configuring Encryption in the Azure Portal

Azure provides a straightforward interface for configuring both SSE and ADE. Follow the steps below to set up encryption:

### Configuring SSE for Storage Accounts

1.  Navigate to your Storage Account in the Azure Portal.
2.  Select the "Encryption" option to view the current encryption model.
3.  By default, Microsoft Managed Keys are used. If you prefer to use Customer Managed Keys for Blobs and Files, select your Azure Key Vault and assign the keys accordingly.

### Enabling ADE on Virtual Machines

1.  Open your Virtual Machine settings in the Azure Portal.
2.  Navigate to Disk > Additional Settings.
3.  Enable Azure Disk Encryption (ADE) and choose whether to encrypt the OS disk, data disk, or both.
4.  Note that updating the Azure Active Directory (AAD) configuration for your VM requires a reboot.
5.  If you wish to enable "Encryption at Host," ensure the VM is properly shut down during configuration.

![The image shows a Microsoft Azure portal page focused on encryption settings for a storage account. It includes options for encryption selection, key selection, and identity type configuration.](https://kodekloud.com/kk-media/image/upload/v1752884401/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Storage-Service-Encryption-SSE-and-Azure-Disk-Encryption-ADE/azure-portal-encryption-settings.jpg)

![The image shows the "Disk settings" page in the Microsoft Azure portal, where options for ultra disk compatibility and encryption settings are displayed. The page includes toggles for enabling ultra disk and host encryption, as well as a dropdown for selecting disks to encrypt.](https://kodekloud.com/kk-media/image/upload/v1752884402/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Storage-Service-Encryption-SSE-and-Azure-Disk-Encryption-ADE/azure-disk-settings-ultra-encryption.jpg)

## Next Topic: Storage Security and Authorization

This concludes our detailed overview of Storage Service Encryption (SSE) and Azure Disk Encryption (ADE). In the next section, we will explore Storage Security and Authorization. For more Azure security best practices, check out the [Azure Security Documentation](https://learn.microsoft.com/en-us/azure/security/).

Enhance your data protection strategy by implementing these encryption services to meet your organization's compliance and security goals.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/48d08f66-feb9-4bae-83b0-2e6aa34e24ae/lesson/cedc440c-b261-4ca3-8688-a966bab7acde)**
>
> Watch video content
