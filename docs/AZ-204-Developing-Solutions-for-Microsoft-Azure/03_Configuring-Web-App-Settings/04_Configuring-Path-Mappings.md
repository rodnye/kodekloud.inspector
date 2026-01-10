# Configuring Path Mappings - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Configuring-Web-App-Settings/Configuring-Path-Mappings)

---

## Table of Contents

- Configuring Path Mappings
  - Linux Path Mappings
  - Windows Path Mappings
  - Using the Azure Portal to Configure Path Mappings
  - Watch Video
    - Handler Mappings
    - Virtual Applications and Directories

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Configuring Web App Settings

# Configuring Path Mappings

In this guide, we will explore how to configure path mappings in Azure App Service to ensure that your web application routes requests efficiently. Path mappings are essential for directing traffic to the correct parts of your application, particularly in complex setups with multiple virtual directories or custom routing requirements.

## Linux Path Mappings

Path mappings on Linux-based applications are vital—especially in containerized environments using both Windows and Linux containers on App Service. They enable you to add or mount custom storage to your containerized applications, allowing you to manage persistent data like user uploads, logs, or any content that needs to persist beyond the lifecycle of a container.

When you access the path mappings section in the Azure portal for a Linux-based app, you will notice an option called mounted storage. This feature facilitates linking external storage solutions, such as Azure File Storage, directly to your containerized application. For example, you might mount an Azure File Share to store images or documents associated with your application.

![The image shows a Linux penguin logo alongside text about configuring path mappings for Linux-based applications and containers, including examples and explanations of mounting storage.](https://kodekloud.com/kk-media/image/upload/v1752866191/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Configuring-Path-Mappings/linux-penguin-path-mappings-config.jpg)

## Windows Path Mappings

Before delving further, it is important to understand two key concepts within Windows path mappings: handler mappings and virtual applications/directories.

### Handler Mappings

A handler mapping in IIS specifies how the server should process different file types or incoming requests. Essentially, a handler is executed to process a request associated with a specific file type. For instance, when serving PHP files, IIS needs to process `.php` files using the appropriate PHP interpreter. By setting up a handler mapping, you ensure that requests for `.php` files trigger the PHP interpreter correctly.

### Virtual Applications and Directories

- **Virtual Directory:** Represents a folder that is not located in the root of the application but is integrated as part of it. This is particularly useful if you have content distributed across different drives or network shares.
- **Virtual Application:** Extends the concept of a virtual directory by treating it as an independent application. It can utilize its own application pool and settings, making it ideal for managing distinct segments of your website—such as separating an API from the frontend.

These configurations are especially beneficial for complex applications where individual components require unique management or configurations.

![The image is a diagram explaining "Configuring Path Mappings" with sections on handler mappings, virtual applications, and virtual directories, alongside a Windows logo.](https://kodekloud.com/kk-media/image/upload/v1752866192/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Configuring-Path-Mappings/configuring-path-mappings-diagram.jpg)

## Using the Azure Portal to Configure Path Mappings

The Azure portal offers an intuitive interface for setting up your path-based mappings—both for handler mappings and virtual applications/directories.

Follow these steps to configure your mappings:

1.  Navigate to the general settings for your web application.
2.  Select the Path Mappings option to add or modify your handler mappings and virtual directories.

For example, to configure a handler mapping for PHP files, you might use the following configuration:

```
Extension       Script processor    Arguments
.php            /usr/bin/php        -a
```

This configuration directs requests for `.php` files to the PHP interpreter located at `/usr/bin/php` with the argument `-a`.

In addition to setting up handler mappings, you can configure virtual applications and directories. Below is an example of a basic configuration that maps the virtual root to your application's base path:

```
Virtual applications and directories
Virtual path  Physical Path  Type
/             site\wwwroot    Application
```

By default, the root is set to `site\wwwroot`, which serves as your application's main directory. You can add additional mappings as needed by specifying the virtual path alongside its corresponding physical path.

Furthermore, the Azure portal enables the configuration of mounted storage settings for containerized applications. By clicking on "New Azure Storage Mount," you can provide a name (e.g., "file share Azure"), select a storage account, and choose the file share to mount. You will also assign a mount path (for example, `/mnt/disk1`) where the storage will be accessible. For more advanced configurations, you can specify the share name and access key in the advanced settings.

![The image shows a Microsoft Azure portal configuration page for a web app, displaying settings for handler mappings, virtual applications, directories, and mount storage. The interface includes options for adding new mappings and storage mounts.](https://kodekloud.com/kk-media/image/upload/v1752866193/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Configuring-Path-Mappings/azure-portal-web-app-config.jpg)

> [!important]
> **Note**
>
> Ensure that the physical paths you specify match the actual paths on your server or container, as discrepancies can result in incorrect routing or application errors.

This detailed configuration process allows your application to manage various content types efficiently, route incoming requests to the appropriate handlers, and maintain persistent storage as required.

Next, we will cover how to configure security certificates for your web app. For further reading, visit the [Azure App Service Documentation](https://docs.microsoft.com/azure/app-service/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/874e2f85-3b70-421e-94c6-722d572e440f/lesson/a721256d-0550-4939-8c00-97291262acf3)**
>
> Watch video content
