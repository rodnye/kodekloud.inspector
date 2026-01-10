# Enable the secure transfer required - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Storage-Security/Enable-the-secure-transfer-required)

---

## Table of Contents

- Enable the secure transfer required
  - Configuration in the Azure Portal
  - Watch Video

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Storage Security

# Enable the secure transfer required

This article covers the Secure Transfer Required option, a vital security feature in the configuration of your Azure Storage Account. By enforcing secure data transfers, this setting ensures that all transactions occur over HTTPS, protecting your data from potential risks.

Secure Transfer Required is a data protection measure provided by Microsoft Azure. It mandates that every request to a storage account uses HTTPS instead of HTTP. If any request is attempted using HTTP, it will be automatically rejected.

> [!important]
> **Key Benefits**
>
> - Enhanced security through encrypted data transfers.
> - Compliance with industry standards and data privacy regulations – critical for organizations that enforce HTTPS for all data transactions.

By default, this option is enabled, meaning every interaction with your Azure Storage Account is secured. Although you can temporarily disable it for testing purposes, re-enabling the feature will block all HTTP connections, thereby restoring the security protocols.

## Configuration in the Azure Portal

To configure this feature in the Azure portal, navigate to your storage account's configuration settings. You'll notice that the Secure Transfer Required option is enabled by default.

![The image shows a Microsoft Azure portal interface, specifically the configuration settings for a storage account named "cnstsec009." Various options for data management and security settings are visible.](https://kodekloud.com/kk-media/image/upload/v1752882282/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-the-secure-transfer-required/azure-portal-storage-account-settings.jpg)

When creating a new storage account, access the "Advanced" tab to find the setting labeled "Required secure transfer for REST API operations." Hovering over this option will display a tooltip that explains the importance of using HTTPS for all operations.

![The image shows a Microsoft Azure portal page for creating a storage account, specifically on the "Advanced" tab with security options and a tooltip explaining secure transfer settings.](https://kodekloud.com/kk-media/image/upload/v1752882284/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-the-secure-transfer-required/azure-portal-storage-account-advanced.jpg)

> [!important]
> **Security Reminder**
>
> Ensure that the Secure Transfer Required option remains enabled in your production environments to maintain robust security protocols for your data transfers.

This concludes our discussion on securing data transfers in Azure Storage Accounts. In our next lesson, we will shift focus to database security, exploring best practices to further protect your data assets.

See you in the next lesson.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/7acacade-befa-46b1-99e2-3f298d33623d/lesson/dbd099e4-41ed-4896-91cd-c473dd2f820d)**
>
> Watch video content
