# Manage customer managed keys - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Key-Vault/Manage-customer-managed-keys)

---

## Table of Contents

- Manage customer managed keys
  - Overview
  - Advantages of Using Customer-Managed Keys
  - Watch Video

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Key Vault

# Manage customer managed keys

Data security is a top priority in today's digital landscape. Azure Key Vault provides a robust solution for managing encryption through customer-managed keys (CMK). In this guide, we will explore how Azure Storage Server-Side Encryption (SSE) works with CMK to give you enhanced control over your encryption process.

## Overview

By default, Microsoft uses platform-managed keys (PMK) to handle encryption. However, organizations that require greater control over their sensitive data can opt for customer-managed keys. When you create an Azure Storage account, SSE is enabled by default with Microsoft-managed keys. By switching to SSE with customer-managed keys, you assume control over key management. This approach ensures that the encryption is performed using keys that you create, manage, and control.

The diagram below visualizes the complete process:

![The image illustrates the process of using Customer Managed Keys (CMK) in Azure, showing how a user creates a storage account, writes data into a blob, and manages encryption keys through Azure Storage Account and Key Vaults.](https://kodekloud.com/kk-media/image/upload/v1752882016/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Manage-customer-managed-keys/azure-customer-managed-keys-process.jpg)

## Advantages of Using Customer-Managed Keys

Switching to customer-managed keys offers several important benefits:

- **Enhanced Control:** Manage the entire encryption key lifecycle, including setting key durations tailored to your security needs.
- **Flexible Key Rotation:** Rotate keys promptly whenever required, bolstering overall security.
- **Compliance and Governance:** Achieve greater confidence in meeting regulatory and internal compliance mandates by overseeing your key management processes.

> [!important]
> **Note**
>
> Using customer-managed keys allows you to integrate your enterprise key management processes seamlessly with Azure services.

This article provides a concise overview of using customer-managed keys with Azure Storage. For more detailed insights, including advanced storage security topics and best practices, be sure to explore the additional resources in our documentation.

For further reading:

- [Azure Storage Security Best Practices](https://docs.microsoft.com/azure/storage/common/storage-security-guide)
- [Managing Keys in Azure Key Vault](https://docs.microsoft.com/azure/key-vault/)
- [Azure Storage Documentation](https://docs.microsoft.com/azure/storage/)

Enhance your data security strategy today by leveraging the full potential of customer-managed keys in Azure.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/e6ef26f3-b79d-482a-8f38-130223404051/lesson/6a513831-dea5-4972-92df-9a42d0c056eb)**
>
> Watch video content
