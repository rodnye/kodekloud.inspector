# Azure Containers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Azure-Storage/Azure-Containers)

---

## Table of Contents

- Azure Containers
  - Configuring Azure Blob Storage
  - Watch Video
  - Practice Lab
    - Storage Account
    - Containers
    - Blobs
    - Creating and Managing Containers
    - Creating a Container and Uploading Blobs via the Azure Portal
    - Understanding Storage Tiers

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Azure Storage

# Azure Containers

## Configuring Azure Blob Storage

Azure Blob Storage is a robust service for storing a vast amount of unstructured data, including text and binary data. Accessible globally via HTTP or HTTPS, it is ideal for serving images, documents, streaming media, writing log files, and handling backup, restore, disaster recovery, or archival scenarios.

The Blob Storage architecture is structured into three main components: storage accounts, containers, and blobs.

### Storage Account

At the highest level is the Storage Account, which serves as the unique namespace in Azure for your data. This account holds all access keys, properties, and configurations, functioning as the "web files" repository where your data is stored.

### Containers

Inside a storage account, containers work like directories in a file system. They group related blobs and dictate access policies. For example, within the "web files" storage account, you might create separate containers for documents and videos. A documents container could hold PDF files, while a videos container might store MP4 files.

### Blobs

Blobs are the individual files stored in Azure Blob Storage and can be of any type and size. Azure Blob Storage supports three types of blobs:

1.  **Block Blobs**  
    These are optimal for storing text and binary data, with a maximum size of up to 4.75 TB. They allow efficient management of large data sets by handling each block individually.  
    Examples include various documents and media files.
2.  **Append Blobs**  
    Specifically designed for append operations, these blobs are perfect for logging scenarios. When your application continuously writes logs, append blobs ensure efficient addition of new entries.
3.  **Page Blobs**  
    With a capacity of up to 8 TB, page blobs are engineered for frequent read-write operations and are ideal for storing virtual machine disks.

A practical example is a website hosting its assets on Azure Blob Storage. The website might use a "web files" storage account with dedicated containers for different asset types (e.g., PDFs in one and videos in another). Users can directly retrieve these blobs based on the access policies set within the containers.

### Creating and Managing Containers

Containers can be created through the Azure Portal, Azure PowerShell, CLI, or REST APIs. They function similarly to directories on your local machine. A critical setting for containers is the public access level, which determines how blobs are available to the public. The access levels include:

- **Private**  
  No anonymous access is allowed. Access is restricted to the account owner or specifically authorized users.  
  ![The image illustrates the process of creating containers in a storage account, showing a hierarchy from storage account to containers and blobs, with a focus on privacy settings.](https://kodekloud.com/kk-media/image/upload/v1752884373/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Azure-Containers/storage-account-containers-privacy.jpg)

  > [!important]
  > **Note**
  >
  > Enabling private access ensures that sensitive data remains protected unless accessed with proper authentication and authorization.

- **Blob**  
  This setting permits anonymous read access to individual blobs, though container metadata remains concealed. Users can access blobs via direct URLs but cannot list all blobs in the container.
- **Container**  
  With container-level access, all content within the container is publicly readable. This setting allows users to list and download blobs, making it suitable for hosting public content like images or documents.

These access levels can be adjusted at any time based on your data security requirements.

### Creating a Container and Uploading Blobs via the Azure Portal

Follow these steps to create and manage containers in the Azure Portal:

1.  Navigate to your storage account and select the "Containers" section.
2.  Click "Add" to create a new container. For example, name the container "images".

    > [!important]
    > **Important**
    >
    > If certain options appear greyed out, it may be due to your storage account's default settings. You might need to enable the "allow blob anonymous access" option in the storage account's configuration.

    ![The image shows the configuration settings of a Microsoft Azure storage account, with options for performance, secure transfer, and access settings. A notification indicates that the storage account was successfully updated.](https://kodekloud.com/kk-media/image/upload/v1752884375/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Azure-Containers/azure-storage-account-configuration.jpg)

3.  After enabling the appropriate settings, select the desired public access level—in this case, container-level access for the "images" container.
4.  Open the "images" container and click "Upload" to add your files. Browse for your files, select them, and confirm the upload. The portal automatically checks for naming conflicts before completing the process.

Once the upload is complete, you can click on an individual blob to view its properties and obtain its URL.

![The image shows a Microsoft Azure portal interface displaying the properties of a blob named "City1.jpg" within a storage container. It includes details like URL, size, type, and encryption status.](https://kodekloud.com/kk-media/image/upload/v1752884376/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Azure-Containers/azure-portal-blob-properties-city1.jpg)

For example, when you copy the URL of a blob like "City1.jpg" and paste it into your browser, the image will load if the public access level is enabled. Changing the access level to private and refreshing the page will result in a "resource not found" error, requiring storage access keys or Azure AD authentication for access.

### Understanding Storage Tiers

In addition to access levels, storage tiers play a significant role in optimizing cost and performance. Typically, content is initially set to the "hot" tier. Storage tiers allow you to balance performance and cost by moving data between different tiers based on usage patterns. Detailed discussions on storage tiers will be covered in upcoming lessons.

This article provided a comprehensive overview of Azure Blob Storage architecture, highlighting the roles of storage accounts, containers, and blobs. It also showcased how to manage access levels and upload files using the Azure Portal. In subsequent lessons, you will explore storage tiers in-depth and learn how to secure access further using storage keys and Azure AD authentication.

For more information on Azure Blob Storage and related topics, visit [Azure Documentation](https://docs.microsoft.com/azure/storage/blobs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/48d08f66-feb9-4bae-83b0-2e6aa34e24ae/lesson/eaba2072-5c58-4b73-ae95-f5b0a5f19194)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/48d08f66-feb9-4bae-83b0-2e6aa34e24ae/lesson/50777290-02c7-441f-92af-7d2134a01d13)**
>
> Practice lab
