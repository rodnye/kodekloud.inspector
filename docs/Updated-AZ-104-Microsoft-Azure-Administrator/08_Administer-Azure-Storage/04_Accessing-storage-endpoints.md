# Accessing storage endpoints - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Azure-Storage/Accessing-storage-endpoints)

---

## Table of Contents

- Accessing storage endpoints
  - Azure Storage Management Tools
  - Watch Video

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Azure Storage

# Accessing storage endpoints

In this lesson, you'll learn how to construct and understand the endpoints required to access various services within an Azure storage account. Each storage service follows a consistent endpoint URL format, making it easy to integrate and manage your storage resources.

Every endpoint is built using the following structure:

```
<protocol>://<storage account name>.<service>.core.windows.net
```

Here's what each element represents:

- **Protocol:** Either `HTTP` or `HTTPS`.
- **Storage Account Name:** The unique name you have chosen for your account.
- **Service:** Represents the Azure service you are accessing (e.g., blob, queue, file, or table).
- **Domain:** All endpoints end with `core.windows.net`, which is the default domain for Azure storage.

For example, if your storage account is named `KodeKloud`, the corresponding endpoints would be:

- **Blob Service:** kodekloud.blob.core.windows.net
- **Queue Service:** kodekloud.queue.core.windows.net
- **File Service:** kodekloud.file.core.windows.net
- **Table Service:** kodekloud.table.core.windows.net

> [!important]
> **Note**
>
> If your preferred storage account name is already taken, consider modifying it by appending additional characters or using a custom domain. This approach can also reinforce your branding; for example, you might configure `blobs.codecloud.com` to point to `codecloud.blob.core.windows.net`.

![The image provides information on accessing storage endpoints for a storage account, showing the format for endpoint URLs and examples for different services like container, queue, file, and table. It also mentions using a custom domain with CNAME mapping.](https://kodekloud.com/kk-media/image/upload/v1752884371/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Accessing-storage-endpoints/storage-endpoints-url-format-examples.jpg)

In addition to direct URL access, several tools help manage your Azure storage resources effectively:

## Azure Storage Management Tools

| Tool                   | Description                                                                                                                                              | Example Command/Usage                                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Azure Storage Explorer | Desktop application that connects to your storage account, allowing you to drag and drop files, delete files, and manage data directly.                  | Launch the app and connect using your storage account credentials                                                      |
| Import Export Service  | Service for transferring large quantities of on-premises data (terabytes or more) into Azure. It enables secure data transfer via pre-configured drives. | Prepare drives, copy, encrypt, and ship them to an Azure Data Center for upload                                        |
| AZCopy                 | Command-line tool designed for fast and efficient data transfers within your storage account, and supports other cloud providers like GCP and AWS.       | `azcopy copy [source] [destination] [flags]` This command can be automated to handle disaster recovery data transfers. |

![The image shows a configuration guide for storage tools, featuring Azure Storage Explorer and an Import and Export Service interface.](https://kodekloud.com/kk-media/image/upload/v1752884372/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Accessing-storage-endpoints/azure-storage-tools-configuration-guide.jpg)

For example, the following command uses AZCopy to transfer data:

```
azcopy copy [source] [destination] [flags]
```

This tool is especially useful for automating data workflows and migrating data between different cloud providers.

When managing your storage account via the Azure Portal, you can easily capture the endpoints for blob, file, queue, table services, and even static website hosting. Additionally, services like Data Lake Store—designed for analytics—offer their own respective endpoints.

Up next, we will explore how to configure Azure Blob Storage, building on the concepts discussed in this lesson.

> [!important]
> **Additional Resources**
>
> For further reading on Azure storage, visit the [Azure Storage Documentation](https://docs.microsoft.com/en-us/azure/storage/) and explore [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/) for related containerized solutions.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/48d08f66-feb9-4bae-83b0-2e6aa34e24ae/lesson/1ccae4d6-20ed-4ebc-9042-ea47f2d66dbc)**
>
> Watch video content
