# Azure Files - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DP-900-Microsoft-Azure-Data-Fundamentals/File-Based-Storage/Azure-Files)

---

## Table of Contents

- Azure Files
  - Protocol Support
  - Capacity, Scale, and Quotas
  - Uploading and Managing Files
  - Azure File Sync
  - Links and References
  - Watch Video
    - Example: Upload with AzCopy

---

## Content

DP-900: Microsoft Azure Data Fundamentals

File Based Storage

# Azure Files

Azure Files is a fully managed, cloud-native file-share service within an Azure Storage account. It offers SMB- and NFS-based shares that behave like a local file system, making it perfect for “lift-and-shift” migrations of legacy applications and for containerized workloads requiring persistent, network-mounted storage.

![The image explains the compatibility of Azure Storage Accounts with legacy applications for "lift and shift" migrations, featuring icons of a computer and cloud.](https://kodekloud.com/kk-media/image/upload/v1752872944/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Azure-Files/azure-storage-legacy-apps-compatibility.jpg)

For containerized scenarios—such as Docker containers running in Azure—Azure Files can mount an SMB share into any container, giving applications a familiar file-system path for configuration, logs, or shared data.

![The image illustrates the compatibility of Azure Storage Accounts with legacy applications and file systems, and includes icons for Docker and containers.](https://kodekloud.com/kk-media/image/upload/v1752872946/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Azure-Files/azure-storage-legacy-compatibility-docker.jpg)

## Protocol Support

Azure Files provides two primary network file protocols:

- **SMB (Server Message Block)**  
  Fully compatible with Windows clients and supports Windows ACLs just as on-premises.
- **NFS (Network File System 4.1)**  
  Ideal for Linux and macOS workloads. Available only in **Premium** storage accounts within a virtual network.

> [!important]
> **Note**
>
> NFS support requires a Premium storage account and VNet deployment.
> SMB is available in both Standard and Premium tiers.

![The image is a diagram explaining the compatibility of Azure Storage Accounts with file shares, highlighting support for SMB and NFS protocols, and noting that NFS requires a premium account.](https://kodekloud.com/kk-media/image/upload/v1752872947/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Azure-Files/azure-storage-accounts-file-shares-diagram.jpg)

## Capacity, Scale, and Quotas

| Feature                        | Limit       |
| ------------------------------ | ----------- |
| Maximum share size             | 100 TiB     |
| Maximum individual file size   | 1 TiB       |
| Maximum concurrent connections | 2,000/share |

To avoid unexpected costs and uncontrolled growth, configure **share quotas** to cap the total data stored.

## Uploading and Managing Files

You can add, retrieve, and organize files in an Azure Files share using:

| Method       | Use Case                            | Sample Command / Action                          |
| ------------ | ----------------------------------- | ------------------------------------------------ |
| Azure Portal | Quick GUI-based creation and upload | Click **Upload** within the Azure Storage UI     |
| PowerShell   | Script and automation               | `New-AzStorageShare`; `Get-AzStorageFileContent` |
| AzCopy       | High-performance, large-scale moves | `azcopy copy ... --recursive`                    |

![The image is a guide on uploading files to Azure Files using three methods: Azure Portal, PowerShell, and AzCopy, each with brief descriptions of their features.](https://kodekloud.com/kk-media/image/upload/v1752872949/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Azure-Files/azure-files-upload-guide-portal-powershell-azcopy.jpg)

### Example: Upload with AzCopy

```
azcopy copy "/local/path/*" \
  "https://<storage-account>.file.core.windows.net/<share-name>?<SAS-token>" \
  --recursive
```

## Azure File Sync

Azure File Sync extends your on-premises Windows file servers into Azure Files. Deploy the **Azure File Sync agent**, register your server with a Storage Sync Service, and create a sync group to connect local folders to an Azure file share. File changes replicate bidirectionally:

- **On-prem → Azure**: New or modified files upload automatically.
- **Azure → On-prem**: Updates propagate to all registered servers.

![The image illustrates Azure File Sync, showing a cloud labeled "Azure File Share" connected to a server and a user with a laptop, indicating file synchronization with data centers.](https://kodekloud.com/kk-media/image/upload/v1752872950/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Azure-Files/azure-file-sync-diagram-cloud-server.jpg)

> [!important]
> **Warning**
>
> Large-scale synchronization can incur data transfer charges and may impact network performance. Plan your cache settings and sync schedules to optimize costs and user experience.

## Links and References

- [Azure Files documentation](https://docs.microsoft.com/azure/storage/files/)
- [AzCopy v10 Guide](https://docs.microsoft.com/azure/storage/common/storage-use-azcopy-v10/)
- [Azure File Sync planning](https://docs.microsoft.com/azure/storage/files/storage-sync-files-planning)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/dp-900-microsoft-azure-data-fundamentals/module/e229086c-adc3-444d-a6da-f77b41067675/lesson/5b3f73a8-f65b-44cb-b84d-029f6e2b71af)**
>
> Watch video content
