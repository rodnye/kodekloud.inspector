# Configuring General Settings - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Configuring-Web-App-Settings/Configuring-General-Settings)

---

## Table of Contents

- Configuring General Settings
  - Overview of General Settings
  - Working with Settings in the Azure Portal
  - Conclusion
  - Watch Video

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Configuring Web App Settings

# Configuring General Settings

In this guide, we explore the various general settings for configuring an Azure App Service. These settings enable you to fine-tune your web application's runtime, compatibility, performance, and security. Each section below details the configuration options and their relevance.

## Overview of General Settings

The general settings are organized into three main categories:

1.  **Stack Settings**  
    This section determines the runtime stack your application will use. It includes language frameworks such as .NET, Node.js, PHP, or Python, along with the specific version. Choosing the appropriate stack is essential to ensure compatibility and optimize performance. For instance, if your application is built with PHP, select PHP and specify the version used during development.
2.  **Platform Settings**  
    Platform settings are related to the hosting environment and include options such as:
    - **Bitness:** Choose between a 32-bit or 64-bit operating system.
    - **Managed Pipeline Version:** Select the HTTP request pipeline version. The recommended "Integrated" pipeline offers modern features and better performance. The "Classic" option may still be useful for legacy applications.
    - **SCM and FTP Setup:** Configure publishing methods like SCM (Kudu) and FTP for application deployment.

      > [!important]
      > **Security Note**
      >
      > It is advisable to enable FTPS only, which prevents data from being transmitted as plain text.

    - **HTTP Version:** Decide between HTTP 1.1 and HTTP/2 based on your application's needs.
    - **HTTP/2.0 Proxy:** When enabled, this option forwards HTTP traffic directly to the worker, enhancing performance, especially for applications that leverage advanced HTTP/2 features like gRPC.
    - **WebSockets:** Enable persistent connections between the client and server to support real-time communication for applications such as chat systems or live-update interfaces.

3.  **Additional Settings**  
    These settings further refine your web app's behavior:
    - **Always On:**  
      Prevents the application from idling by keeping it loaded in memory, ensuring rapid response times. This setting is particularly important for web APIs or background task applications.
    - **Session Affinity (Sticky Sessions):**  
      Ensures that consecutive requests from the same client are routed to the same server instance. This is crucial for applications that maintain session state on the server. For stateless applications, consider disabling this feature to improve performance.
    - **HTTPS Only and TLS Settings:**  
      Redirects all traffic to HTTPS and allows you to set a minimum inbound TLS version for improved security.
    - **Remote Debugging:**  
      Enables support for remote debugging for ASP.NET, ASP.NET Core, and Node.js applications.
    - **Incoming Client Certificates:**  
      Enforces client certificate authentication, requiring a valid certificate from clients before access is granted. This setting is essential for applications handling sensitive data or bound by strict compliance requirements.

Below is a diagram that visually represents the key settings, including HTTP/2.0 Proxy options, WebSockets, Always On, Session Affinity, HTTPS Only, debugging features, as well as incoming client certificates and minimum TLS version:

![The image shows a settings page for configuring various options such as HTTP 2.0 Proxy, Web sockets, Always on, Session affinity, HTTPS Only, and debugging features. It also includes settings for incoming client certificates and minimum TLS version.](https://kodekloud.com/kk-media/image/upload/v1752866189/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Configuring-General-Settings/settings-page-http2-proxy-options.jpg)

## Working with Settings in the Azure Portal

Accessing and updating these settings is straightforward through the Azure portal. Follow these steps to modify your web app's configuration:

1.  **Stack Settings**  
    In the Stack Settings section, specify the runtime environment for your application. For example, if your application is built using .NET and ASP.NET, options related to these technologies will be available. Adjust these settings to ensure they match your application's framework and version requirements.
2.  **Platform Settings**  
    The Platform Settings section provides several configuration options:
    - Select the operating system bitness (32-bit or 64-bit).
    - Configure the managed pipeline version.
    - Enable or disable SCM and FTP publication methods.

      > [!important]
      > **FTP Security Reminder**
      >
      > For enhanced security, it is recommended to use FTPS only.

    - Choose the preferred HTTP protocol (HTTP 1.1 or HTTP/2).
    - Activate the HTTP/2.0 proxy feature.
    - Enable WebSockets to support persistent connections.

3.  **Additional Configurations**  
    In addition to the above, the portal allows you to configure:
    - **Always On:**  
      Ensures continuous application availability by keeping the app loaded in memory.
    - **Session Affinity:**  
      Maintains sticky sessions for applications that rely on session state management.
    - **HTTPS Only:**  
      Forces all traffic over secure HTTPS connections.
    - **Remote Debugging:**  
      Facilitates the debugging of your application remotely.
    - **Incoming Client Certificates:**  
      Enforces client certificate authentication to secure access to your application.

Below is another diagram that captures the comprehensive configuration options available in the portal, including stack settings, platform options, and protocol configuration features:

![The image shows a settings page for configuring a web application, with options for stack settings, platform settings, and authentication methods. It includes selections for .NET version, platform type, and various protocol settings.](https://kodekloud.com/kk-media/image/upload/v1752866190/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Configuring-General-Settings/web-app-settings-configuration.jpg)

## Conclusion

By thoroughly understanding and configuring these general settings, you can tailor your Azure App Service to meet your application's specific requirements, ensuring optimal performance, compatibility, and security. In the next lesson, we will explore how to work with path mappings to further enhance your application configuration.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/874e2f85-3b70-421e-94c6-722d572e440f/lesson/b5714b75-e2a6-4c2a-9443-7e93e8f8f485)**
>
> Watch video content
