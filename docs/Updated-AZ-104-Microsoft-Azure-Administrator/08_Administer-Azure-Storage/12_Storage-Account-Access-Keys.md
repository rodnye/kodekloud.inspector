# Storage Account Access Keys - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Azure-Storage/Storage-Account-Access-Keys)

---

## Table of Contents

- Storage Account Access Keys
  - Watch Video

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Azure Storage

# Storage Account Access Keys

Storage account keys are fundamental to Azure security and access management. They authenticate applications and services that access storage resources such as blobs, queues, tables, and files.

> [!important]
> **Caution**
>
> These keys operate as a master password for your storage account. Unauthorized access to these keys can result in complete control over your data, including reading, writing, and deletion across all associated services. Handle them with the utmost care.

Azure issues two keys per storage account to ensure redundancy and facilitate seamless key rotation. This approach helps maintain continuous service operation while you update the keys. Always share these keys only with trusted and authorized parties.

![The image shows information about storage account keys, including two keys with their connection strings and a reminder to be cautious with the account key.](https://kodekloud.com/kk-media/image/upload/v1752884397/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Storage-Account-Access-Keys/storage-account-keys-connection-strings.jpg)

Regular key rotation is a best practice that minimizes security risks. Azure allows you to regenerate these keys without incurring any downtime, thereby preserving uninterrupted access to your services.

> [!important]
> **Tip**
>
> For enhanced security, consider using [Azure Key Vault](https://azure.microsoft.com/en-us/services/key-vault/) to manage and rotate your keys. Additionally, employ Shared Access Signatures (SAS) to provide fine-grained, time-restricted access to specific resources, reducing the risk associated with exposing full storage account keys.

Protecting your storage account keys is vital for securing your Azure data. Next, we will explore Shared Access Signatures, a more secure approach to managing resource access in your Azure environment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/48d08f66-feb9-4bae-83b0-2e6aa34e24ae/lesson/ad3c5936-9ef7-487a-a70f-12b19c30e463)**
>
> Watch video content
