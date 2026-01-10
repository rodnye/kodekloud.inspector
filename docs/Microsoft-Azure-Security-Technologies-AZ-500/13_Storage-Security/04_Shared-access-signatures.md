# Shared access signatures - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Storage-Security/Shared-access-signatures)

---

## Table of Contents

- Shared access signatures
  - Types of SAS Tokens
  - Anatomy of a SAS URL
  - Working with SAS in the Azure Portal
  - Watch Video
    - 1. Create a Storage Account
    - 2. Access Keys and SAS Token Configuration
    - 3. Configure a Container for Blob Storage
    - 4. Upload Files to the Container
    - 5. Generate and Apply a SAS Token

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Storage Security

# Shared access signatures

Shared Access Signatures (SAS) provide a powerful, granular way to control access to your Azure storage resources. Instead of relying on storage account keys—which grant broad, unrestricted access—SAS enables you to specify precise permissions, resource scopes, and timeframes for accessing blobs, queues, tables, or files.

> [!important]
> **Benefits of SAS**
>
> Using SAS allows you to grant temporary and limited access to Azure Storage resources without exposing your account keys. It serves as a tailor-made access card that improves security and control.

Below is a breakdown of key features and configuration options for SAS:

• Select which services are accessible  
• Define the exact type of resources  
• Grant specific permissions (read, write, delete, list, add, create, update)  
• Set explicit time frames for access  
• Specify allowed IP address ranges and enforce secure protocols (e.g., HTTPS)

Not all SAS tokens are created equal. There are three primary types:

## Types of SAS Tokens

1.  **User Delegation SAS**  
    This type leverages Azure Active Directory (Azure AD) credentials and is specific to blob storage. For instance, if an employee like Jane needs to update documents, you can generate a User Delegation SAS that grants her access only to certain blobs during a specified period.
2.  **Service SAS**  
    ![The image explains Shared Access Signature (SAS) with details on fine-tuned access, types of SAS keys, and configurable permissions and settings. It includes options for services, resource types, permissions, and time settings.](https://kodekloud.com/kk-media/image/upload/v1752882285/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Shared-access-signatures/shared-access-signature-explained.jpg)  
    A Service SAS provides limited access at the individual service level (blobs, files, queues, or tables). For example, if a third-party application needs to upload photos to a specific container in your Blob storage, a Service SAS can be generated to allow uploads solely to that container.
3.  **Account SAS**  
    This SAS token grants access to multiple services (blobs, files, tables, and queues) within the storage account. It is ideal for applications like dashboards that monitor various aspects of storage usage across the account.

## Anatomy of a SAS URL

When you create a SAS token, the URL comprises two main components:

• The resource endpoint (e.g., blob, queue, file, or table endpoint). For example, a URL might begin with blob.core.windows.net and embed the storage account name (e.g., KodeKloud or xyc) within the domain.  
• The SAS token parameters, which detail allowed services, permissions, start and expiry times, permitted IP ranges, protocol restrictions, and include a unique signature (often generated using SHA-256 and Base64).

For instance, a SAS URL may look like this:

```
https://kodekloud.blob.core.windows.net?sv=2020-08-04&ss=bfqt&srt=sc&sp=rwdlacup&se=2022-05-19T14:31:40Z&st=2022-05-19T06:31:40Z&sip=168.11.12.13-168.11.12.19&spr=https&sig=66iXqzZSakarJO5J210%2ByoPRVXTeT%2FTJcHHSEkUjHr0%3D
```

Breaking down the URL:

- **Resource URI:** Represents the storage endpoint (e.g., Blob).
- **Query Parameters:**
  - `sv=2020-08-04`: The storage service version.
  - `ss=bfqt`: Allowed services: b (blobs), f (files), q (queues), and t (tables).
  - `srt=sc`: Resource types (service and container-level operations).
  - `sp=rwdlacup`: Permissions granted (read, write, delete, list, add, create, update) which can be customized.
  - `st=` and `se=`: Start and end times (UTC) defining token validity.
  - `sip=`: Designates allowed IP address ranges.
  - `spr=https`: Enforces HTTPS for access.
  - `sig=`: The signature that validates the token's integrity using encryption methods like SHA-256 combined with Base64.

Here’s an example of additional parameters produced with a SAS token:

```
<Error>
  <Code>ResourceNotFound</Code>
  <Message>The specified resource does not exist. RequestId:9d188859-e01e-0069-3cfc-f9ea20000000 Time:2023-10-08T15:29:35.599764Z</Message>
</Error>
```

---

## Working with SAS in the Azure Portal

Follow these steps to create and configure SAS tokens within the Azure portal:

### 1\. Create a Storage Account

- In the Azure portal, navigate to Storage and create a new storage account.
- Choose a unique name (since the storage account name is exposed via its endpoint), select a region (e.g., East US), and choose a performance tier (typically, standard; premium for specific requirements).
- For test environments, Locally Redundant Storage (LRS) is often sufficient.

### 2\. Access Keys and SAS Token Configuration

- Once your storage account is created, view the access keys (each account has two keys). These keys grant full access and are periodically rotated for security.
- For fine-grained control, navigate to the Shared Access Signature settings to generate a SAS token.

### 3\. Configure a Container for Blob Storage

Before creating a container, decide whether to enable anonymous access for blobs as per your testing scenario.

![The image shows a Microsoft Azure portal interface with a storage account container view. A new container named "images" is being created with private access settings.](https://kodekloud.com/kk-media/image/upload/v1752882286/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Shared-access-signatures/azure-portal-storage-container-creation.jpg)

By default, anonymous access is disabled. To modify this:

- Visit the storage account configuration page.
- ![The image shows a Microsoft Azure portal configuration page for a storage account, displaying various settings such as account kind, performance, and access options.](https://kodekloud.com/kk-media/image/upload/v1752882287/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Shared-access-signatures/azure-portal-storage-account-settings.jpg)
- Enable "allow anonymous blob access" if needed, then create the container (for example, named "images") with blob-level access. Note: Selecting container-level access permits anonymous users to list all blobs in the container.

### 4\. Upload Files to the Container

- Open the new container and click "Upload" to add files (e.g., images).
- Use the file explorer to drag and drop files, such as images of mountains or cityscapes.

![The image shows a file explorer window open on a computer, displaying various folders, alongside a web interface for uploading files to a cloud service.](https://kodekloud.com/kk-media/image/upload/v1752882288/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Shared-access-signatures/file-explorer-cloud-upload-interface.jpg)

- Monitor the upload progress:

![The image shows a Microsoft Azure portal interface for uploading blobs to a container named "images," with a list of successfully uploaded files displayed on the right.](https://kodekloud.com/kk-media/image/upload/v1752882289/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Shared-access-signatures/azure-portal-upload-blobs-images.jpg)

- Once the files are uploaded, you can select an image and copy its URL to view it in your browser. This demonstrates how anonymous access works. If you require restricted access for authorized users only, set the container’s access level to private.

### 5\. Generate and Apply a SAS Token

To provide temporary access (for instance, for developers to view images for a day):

- Navigate back to the storage account and open the Shared Access Signature configuration.
- Configure the SAS token by selecting:
  - **Services:** Set to Blob (for this example).
  - **Resource Types:** Include service, container, and object.
  - **Permissions:** Define as needed (for view-only access, remove write permissions).
  - **Time Frame:** Set the start (UTC) and expiry times (e.g., valid until tomorrow).
  - **Options:** Optionally restrict allowed IP addresses and enforce HTTPS via `spr=https`.

- Click "Generate SAS connection string" to receive the SAS token. Keep in mind that rotating the storage account keys (e.g., Key One) will invalidate previously generated SAS tokens. Save the SAS token securely, as you might not be able to view it again later.
- After generating the SAS token, update the container’s access level to private. If attempting to refresh the container results in a "ResourceNotFound" error, it confirms that anonymous access is disabled. You can now access the container's resources by appending the SAS token to the URL.

Zoom in on the key components of the SAS token:

• S3 indicates the storage service (Blob, in this case).  
• The resource types include service, container, and object.  
• The permissions parameter is tailored to read-only in this scenario.  
• The start and expiry times determine the validity period.  
• Protocol restrictions and the signature ensure secure access.

> [!important]
> **Security Tip**
>
> Always safeguard your SAS tokens. Use them only as needed, and avoid exposing them publicly. Rotating account keys invalidates previously issued SAS tokens, adding an extra layer of security.

With the SAS token configured, authorized users can access designated storage resources without exposing the master account key.

---

Next, learn how to authenticate requests using [Azure Active Directory](https://docs.microsoft.com/en-us/azure/active-directory/) for enhanced security and streamlined access management.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/7acacade-befa-46b1-99e2-3f298d33623d/lesson/5333ee9a-e1e5-43ec-9c1a-219b1091d89b)**
>
> Watch video content
