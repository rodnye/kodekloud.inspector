# Manage Key Vault safety and recovery features - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Key-Vault/Manage-Key-Vault-safety-and-recovery-features)

---

## Table of Contents

- Manage Key Vault safety and recovery features
  - Soft Delete Protection
  - Key Vault Backup
  - Configuring and Accessing Backup Features in the Azure Portal
  - Next Steps
  - Watch Video

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Key Vault

# Manage Key Vault safety and recovery features

In this article, we explore the safety and recovery features provided by Azure Key Vault with a focus on soft delete and backup options. These features ensure that your sensitive data, such as keys, secrets, and certificates, remains secure and recoverable even after accidental or unauthorized deletion.

## Soft Delete Protection

Azure Key Vault enables soft delete by default to prevent accidental or unauthorized deletions. Without soft delete, a deletion would permanently remove the vault and all its components, potentially leading to significant production outages. When soft delete is active, a deleted vault transitions into a recoverable state instead of being removed immediately.

![The image illustrates the difference between managing a key vault with and without soft-delete protection, showing that without it, the key vault is permanently deleted, while with it, the vault can be recovered from a soft-deleted state.](https://kodekloud.com/kk-media/image/upload/v1752882011/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Manage-Key-Vault-safety-and-recovery-features/key-vault-soft-delete-comparison.jpg)

If an immediate permanent deletion is required, you can perform a purge operation on the Key Vault. Purging bypasses the soft delete state and permanently removes the vault. Think of soft delete as a safety mechanism—a two-step process where the vault is first soft-deleted and then purged if necessary.

## Key Vault Backup

Azure Key Vault offers the ability to back up keys, secrets, and certificates individually. The backups are not stored in a recovery service vault; they must be downloaded and secured locally or in another trusted key management system. Currently, there is no single operation that backs up the entire Key Vault.

> [!important]
> **Important Backup Note**
>
> Before automating backup processes with scripts, be aware that Microsoft recommends caution with automated backups. Manual downloads help mitigate risks of errors and reduce potential support issues.

To back up a component, simply download the backup file and ensure that it is stored in a secure location.

## Configuring and Accessing Backup Features in the Azure Portal

When you open a Key Vault in the Azure portal and review its properties, you will notice that soft delete is enabled by default. Additionally, purge protection can be configured when creating a vault. Although soft delete cannot be disabled once set, you can adjust purge protection settings. If purge protection is enabled, even after a vault is soft-deleted, it must remain for a mandatory retention period (typically 90 days) before it is eligible for purging.

![The image shows a Microsoft Azure portal interface displaying the properties of a key vault named "akvappsec," including details like location, subscription ID, and soft-delete settings.](https://kodekloud.com/kk-media/image/upload/v1752882012/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Manage-Key-Vault-safety-and-recovery-features/azure-portal-key-vault-properties.jpg)

Navigating to the keys section in your Key Vault allows you to create backups for individual keys. A backup option will appear as soon as you select a key.

![The image shows a Microsoft Azure Key Vault interface with a pop-up message about creating a backup for a key, offering options to download or cancel.](https://kodekloud.com/kk-media/image/upload/v1752882013/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Manage-Key-Vault-safety-and-recovery-features/azure-key-vault-backup-popup.jpg)

Similarly, when you view secrets, you also have the option to download their backup files. The same functionality applies when managing certificates. Viewing a certificate in the portal reveals a backup download option.

![The image shows a Microsoft Azure Key Vault interface displaying a secret named "sql-db-connstring" with its current version enabled. There are options to create a new version, refresh, delete, or download a backup.](https://kodekloud.com/kk-media/image/upload/v1752882014/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Manage-Key-Vault-safety-and-recovery-features/azure-key-vault-sql-connstring.jpg)

For certificates, the Azure portal provides a similar interface:

![The image shows a Microsoft Azure portal interface displaying a certificate management page with details such as version, thumbprint, status, activation date, and expiration date. The "Download Backup" option is highlighted.](https://kodekloud.com/kk-media/image/upload/v1752882015/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Manage-Key-Vault-safety-and-recovery-features/azure-portal-certificate-management.jpg)

The key takeaway is that while you can back up each key, secret, or certificate individually, there is no single operation to back up an entire Key Vault. If a comprehensive backup is necessary, download and securely store each component individually.

## Next Steps

This concludes our review of key safety and recovery features for Azure Key Vault. In our upcoming article, we will dive deeper into application security topics such as managed identities, service principals, and graph permissions.

See you in the next article.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/e6ef26f3-b79d-482a-8f38-130223404051/lesson/acbe0298-e8d3-4649-b3e1-f8aa07b3756f)**
>
> Watch video content
