# Developing Static Websites - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Working-With-Azure-Blob-Storage/Developing-Static-Websites)

---

## Table of Contents

- Developing Static Websites
  - Benefits & Limitations of Static Website Hosting
  - Setting Up a Static Website
  - Watch Video
    - 1. Enable Static Website Hosting
    - 2. Configure Container Access
    - 3. Upload Your Website Files
    - 4. Use AzCopy to Transfer Files
    - 5. Test the Static Website
    - 6. Associate Custom Domains & Additional Services

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Working With Azure Blob Storage

# Developing Static Websites

In this guide, we will explain how to host static websites using Azure Blob Storage. Azure Blob Storage offers a streamlined solution for serving static content—HTML, CSS, JavaScript, and image files—without the complexity of managing full web servers. By leveraging a dedicated container named $web, Azure Blob Storage simplifies static website hosting.

When you enable the static website feature, Azure automatically creates the $web container. All the static files you upload to this container, such as HTML, CSS, and JavaScript, are immediately available on the internet. This setup removes the need for additional infrastructure like virtual machines or App Services and integrates well with serverless architectures. For instance, you can easily pair your static content with Azure Functions to handle backend operations like form submissions or email processing.

Mapping the auto-generated URL (e.g., https://youraccountname.blob.core.windows.net) to a custom domain is also supported. You can provide a memorable domain name like www.kodekloud.com by updating your DNS settings to point to the Azure Blob Storage endpoint.

![The image outlines three features of static website hosting: serving static content from a storage container, enabling serverless architectures with Azure Functions, and availability via a custom domain.](https://kodekloud.com/kk-media/image/upload/v1752866761/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Developing-Static-Websites/static-website-hosting-features.jpg)

## Benefits & Limitations of Static Website Hosting

One major benefit is the ease of setup. With just a few clicks in the Azure portal, you can activate the static website feature without dealing with server management. However, there are a few limitations to consider:

- **Custom HTTP Headers:** Azure Blob Storage does not natively support configuring custom HTTP headers (e.g., Content Security Policy, X-Frame-Options, or cache control). Although integrating Azure CDN can serve as a workaround, it introduces additional complexity and potential cost.
- **Authentication and Authorization:** Built-in static website hosting does not offer features for authentication or authorization. To restrict access (for example, to admin or premium sections), you need to integrate services like Microsoft Entra ID or Azure AD.

![The image lists two limitations of static website hosting: the inability to configure headers and the lack of support for authentication and authorization.](https://kodekloud.com/kk-media/image/upload/v1752866762/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Developing-Static-Websites/static-website-hosting-limitations.jpg)

## Setting Up a Static Website

Follow these steps to create a static website using Azure Blob Storage in the Azure portal:

### 1\. Enable Static Website Hosting

- Open your storage account in the Azure portal.
- In the menu (located above "Lifecycle management"), select "Static website" and enable the feature.
- Enter the _index document name_ (commonly `index.html`). If required, specify an error document (e.g., `error.html`).

![The image shows a Microsoft Azure portal interface for configuring a static website, with options to enable the site and specify the index document name as "index.html".](https://kodekloud.com/kk-media/image/upload/v1752866764/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Developing-Static-Websites/azure-portal-static-website-config.jpg)

Once enabled, Azure creates the $web container where your web files will be stored.

### 2\. Configure Container Access

- Navigate to the storage account’s containers and find the newly created $web container.
- By default, the container is private. Click on it, then select "Change access level" and choose "blob" to allow anonymous public access.

![The image shows a Microsoft Azure portal interface displaying a list of storage containers with details such as name, last modified date, anonymous access level, and lease state. The containers listed are "$logs," "asp," and "files."](https://kodekloud.com/kk-media/image/upload/v1752866766/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Developing-Static-Websites/azure-portal-storage-containers-list.jpg)

### 3\. Upload Your Website Files

Upload your HTML, CSS, JavaScript, and image files directly into the $web container. There are multiple methods to do this:

- **Azure Storage Explorer**
- **Azure Portal:** Use the "Upload" option within the $web container.
- **AzCopy:** A command-line tool ideal for transferring files.

In this example, we will use AzCopy.

Before using AzCopy, ensure your account has the necessary permissions for data plane operations by assigning the "Storage Blob Data Contributor" role on your storage account.

![The image shows the "Add role assignment" page in Microsoft Azure, where different job function roles related to Azure Storage Blob data are listed, such as Contributor, Owner, and Reader.](https://kodekloud.com/kk-media/image/upload/v1752866767/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Developing-Static-Websites/add-role-assignment-azure-storage.jpg)

Review and confirm the role assignment details.

![The image shows a Microsoft Azure portal page where a role assignment is being added, specifically assigning the "Storage Blob Data Contributor" role to a user. The page includes details like the scope, member name, and object ID.](https://kodekloud.com/kk-media/image/upload/v1752866769/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Developing-Static-Websites/azure-portal-role-assignment-storage-blobs.jpg)

### 4\. Use AzCopy to Transfer Files

Open your terminal to verify that AzCopy is installed. Since you are already logged in, copy the files from your local directory (e.g., "web-template") to the $web container. Remember to escape the `$`symbol in`$web` to avoid variable substitution issues in the terminal.

> [!important]
> **Tip**
>
> To escape the `$` symbol in the terminal command, use a backslash (`\`).

```
azcopy copy web-template/ https://az204st8890.blob.core.windows.net/\$web --recursive
```

You will see an output similar to:

```
Job 6c53f41b-f42c-9345-5d1d-9df612d5233d has started
Log file is located at: /Users/username/.azcopy/6c53f41b-f42c-9345-5d1d-9df612d5233d.log
100.0 %, 57 Done, 0 Failed, 0 Pending, 0 Skipped, 57 Total, 2-sec Throughput (Mb/s): 5.2692
Job 6c53f41b-f42c-9345-5d1d-9df612d5233d summary:
Elapsed Time (Minutes): 0.0333
Number of File Transfers: 57
Final Job Status: Completed
```

Now, return to the $web container in the Azure portal to confirm that your website files have been uploaded successfully.

![The image shows a Microsoft Azure portal interface displaying a container named "$web" with no results or blobs listed. The interface includes options for uploading, changing access levels, and other management actions.](https://kodekloud.com/kk-media/image/upload/v1752866770/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Developing-Static-Websites/azure-portal-container-web-interface.jpg)

### 5\. Test the Static Website

- Locate the `index.html` blob and inspect its properties.
- Click on the blob, copy its URL, and paste it into a web browser. The static website should load as expected.

![The image shows a Microsoft Azure portal interface displaying the properties of a blob file named "index.html" within a storage container. The interface includes details such as URL, size, access tier, and encryption status.](https://kodekloud.com/kk-media/image/upload/v1752866772/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Developing-Static-Websites/azure-portal-blob-properties-index-html.jpg)

If your files appear in a subdirectory (e.g., the URL includes “web-template/index.html”), use the "--as-subdir=false" parameter with AzCopy to copy the files directly to the root of the $web container:

```
azcopy copy web-template/ https://az204st8890.blob.core.windows.net/\$web --recursive --as-subdir=false
```

The output will confirm that the files are copied without the parent directory:

```
Job 2f57bf1a-44d9-fc4a-452a-381c8cc03e03 has started
Log file is located at /Users/username/.azcopy/2f57bf1a-44d9-fc4a-452a-381c8cc03e03.log
100.0 %, 56 Done, 0 Failed, 1 Pending, 0 Skipped, 57 Total, Throughput (Mb/s): 5.2678
Job 2f57bf1a-44d9-fc4a-452a-381c8cc03e03 summary:
Elapsed Time (Minutes): 0.0667
Total Number of Transfers: 57
Final Job Status: Completed
```

Once the files reside at the root, your static website will be directly accessible.

![The image shows a Microsoft Azure portal interface displaying a list of files and folders in a container named "$web." The files include "index.html," "LICENSE.txt," and "README.txt," with details like modification date, access tier, and size.](https://kodekloud.com/kk-media/image/upload/v1752866773/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Developing-Static-Websites/azure-portal-container-files-list.jpg)

### 6\. Associate Custom Domains & Additional Services

Azure Blob Storage allows you to map a custom domain to your static website. You can also leverage services like Azure Front Door or a CDN for multi-region deployment and content caching.

- To configure a custom domain, navigate to the networking settings in your storage account and follow the instructions to set up a CNAME record.

![The image shows a Microsoft Azure portal interface displaying a list of storage containers with details such as name, last modified date, anonymous access level, and lease state. The sidebar includes options for data storage and security settings.](https://kodekloud.com/kk-media/image/upload/v1752866775/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Developing-Static-Websites/azure-portal-storage-containers-interface.jpg)

![The image shows a Microsoft Azure portal interface for configuring a custom domain for a storage account. It includes instructions for setting up a CNAME record and a field to enter the domain name.](https://kodekloud.com/kk-media/image/upload/v1752866776/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Developing-Static-Websites/azure-portal-custom-domain-setup.jpg)

For example, you might assign the custom domain "kodekloud.com" so users can access your static website directly via that domain instead of the full Azure Blob Storage URL.

At this point, your static website hosted on Azure Blob Storage is fully set up and accessible. You can enhance the functionality further by integrating dynamic backend processing using Azure Functions if needed.

Next, explore developing solutions using the Azure Blob Storage Client Library.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/bd8aef3d-3583-45c6-a1a8-8161e7578cbb/lesson/1b3e5b89-77c3-421b-8899-df8fb8d283dd)**
>
> Watch video content
