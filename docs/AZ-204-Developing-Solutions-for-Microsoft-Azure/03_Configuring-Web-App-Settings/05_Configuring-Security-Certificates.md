# Configuring Security Certificates - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Configuring-Web-App-Settings/Configuring-Security-Certificates)

---

## Table of Contents

- Configuring Security Certificates
  - Free App Service Managed Certificate
  - Purchased App Service Certificate
  - Importing a Certificate from Key Vault
  - Uploading a Private Certificate
  - Uploading a Public Certificate
  - Working with Security Certificates in Azure Portal
  - Configuring a Custom Domain
  - Additional Certificate Options
  - Watch Video

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Configuring Web App Settings

# Configuring Security Certificates

In this guide, you'll learn how to configure security certificates on Azure App Service. Depending on your requirements and the certificate source, Azure offers a variety of methods for managing SSL/TLS encryption on your custom domains or application endpoints. The available options are:

1.  Free App Service Managed Certificate
2.  Purchased App Service Certificate
3.  Importing a Certificate from Key Vault
4.  Uploading a Private Certificate
5.  Uploading a Public Certificate

---

## Free App Service Managed Certificate

The Free App Service Managed Certificate secures your custom domain at no extra cost, providing basic SSL/TLS encryption with automatic renewal. This option is ideal for enabling HTTPS quickly on a single custom domain.

> [!important]
> **Important**
>
> Ensure that you note:
>
> - Only non-wildcard custom domains are supported.
> - The certificate does not cover both www and non-www versions of the domain simultaneously.

---

## Purchased App Service Certificate

For enhanced security features and greater flexibility, consider purchasing an Azure App Service Certificate directly from Microsoft Azure. This certificate offers benefits such as:

- Support for both custom domains and wildcard certificates.
- Automatic renewals, simplifying certificate management.
- Seamless integration with your existing Azure resources.

This solution is particularly recommended when you need to secure multiple subdomains or require a wildcard certificate for comprehensive protection.

---

## Importing a Certificate from Key Vault

If you already own a certificate, you can store it in Azure Key Vault and import it into your App Service. This method is especially advantageous for organizations with centralized certificate management, as it allows:

- Automated certificate rotation.
- Reduced risk of certificate expiration.
- Compliance with strict security policies.

---

## Uploading a Private Certificate

You can also upload a private certificate directly to your App Service. This approach is beneficial when:

- Your certificate is purchased from a third-party certificate authority.
- Your organization generates certificates internally.

> [!important]
> **Security Tip**
>
> When uploading a private certificate, always ensure that the private key is included and managed securely.

This method offers full control over the certificate, making it ideal for scenarios where Azure management is not used.

---

## Uploading a Public Certificate

Public certificates can be loaded into your App Service or application code when remote resource access is needed. Note that these certificates are not used to secure custom domains.

![The image outlines five steps for configuring security certificates: obtaining a free app service certificate, purchasing a certificate, importing from a key vault, uploading a private certificate, and uploading a public certificate.](https://kodekloud.com/kk-media/image/upload/v1752866195/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Configuring-Security-Certificates/security-certificates-configuration-steps.jpg)

---

## Working with Security Certificates in Azure Portal

Follow these steps to manage security certificates using the Azure Portal:

1.  Log in to the Azure Portal and navigate to your App Service.
2.  From the App Service menu, select **Certificates** on the left-hand side.

![The image shows a Microsoft Azure portal interface displaying details of a web app named "az204demoapp01," including its properties, hosting information, and deployment center.](https://kodekloud.com/kk-media/image/upload/v1752866196/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Configuring-Security-Certificates/azure-portal-web-app-details.jpg)

3.  Click **Add** to register a new certificate. By default, Azure uses the azurewebsites.net domain for web app access, which comes with a built-in certificate.

![The image shows a Microsoft Azure portal interface for managing certificates, with options to add a new App Service Managed Certificate and a sidebar for various settings and deployment options.](https://kodekloud.com/kk-media/image/upload/v1752866198/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Configuring-Security-Certificates/azure-portal-managing-certificates.jpg)

4.  To verify encryption, copy your website URL and open it in a browser. A valid certificate issued by Microsoft Corporation indicates that the connection is secure. The built-in certificate is provided free of charge.

![The image shows a web page with a certificate viewer pop-up displaying SSL certificate details for an Azure website. The background features a design with text and icons related to web development services.](https://kodekloud.com/kk-media/image/upload/v1752866199/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Configuring-Security-Certificates/ssl-certificate-viewer-azure-webpage.jpg)

---

## Configuring a Custom Domain

When you use a custom domain, binding a certificate is essential for secure connections. Follow these steps to add and secure your custom domain:

1.  Navigate to the **Custom domains** section within your App Service.
2.  Enter the custom domain name (e.g., "firbish.com") and use an A record to point your domain to your App Service.
3.  Add the required DNS records via your DNS provider, and click **Validate** in the Azure Portal to confirm domain ownership.

![The image shows a Microsoft Azure portal interface for managing custom domains, with options to add a custom domain and configure domain validation settings. A side panel is open for adding a custom domain, displaying fields for domain provider, TLS/SSL certificate, and domain validation details.](https://kodekloud.com/kk-media/image/upload/v1752866201/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Configuring-Security-Certificates/azure-portal-custom-domains-interface.jpg)

4.  Once validated, your custom domain will initially be unsecured since no certificate is bound to it. Return to **Certificates** and select **Manage Certificates**.
5.  Click **Add Certificate**, select the custom domain (e.g., firbish.com), and click **Validate**. Note that creating an App Service Managed Certificate may take up to 10 minutes.

![The image shows a Microsoft Azure portal interface for managing certificates in a web app. It includes options to add an App Service Managed Certificate, with a notification about the validation of a private key certificate's friendly name.](https://kodekloud.com/kk-media/image/upload/v1752866203/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Configuring-Security-Certificates/azure-portal-managing-certificates-2.jpg)

6.  After the certificate is created, return to **Custom domains**, click **Add Binding**, select the newly created certificate, then click **Add** to bind the certificate to your custom domain.
7.  Refresh your website (using an incognito window if needed) by navigating to https://firbish.com. A secure connection will be indicated by a lock icon; clicking the icon will display certificate details like the common name and validity dates.

![The image shows a Microsoft Azure portal interface for managing custom domains of a web app, displaying domain details and SSL certificate information.](https://kodekloud.com/kk-media/image/upload/v1752866204/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Configuring-Security-Certificates/azure-portal-custom-domains-ssl.jpg)

---

## Additional Certificate Options

Azure App Service supports several additional certificate configurations beyond the free option:

- **Bring Your Own Certificate (BYOC):** Upload certificates that you already own. This is useful for third-party certificates or when you require a wildcard certificate.
- **Import from Key Vault:** Utilize certificates stored in Azure Key Vault.
- **Uploading Public Certificates:** Load public certificates (CER files) into your application for scenarios where binding them to a custom domain is not necessary.

![The image shows a Microsoft Azure portal interface for managing certificates in a web app, with an option to add a public key certificate by uploading a `.cer` file.](https://kodekloud.com/kk-media/image/upload/v1752866206/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Configuring-Security-Certificates/azure-portal-managing-certificates-3.jpg)

---

This concludes our comprehensive guide on configuring security certificates in Azure App Service. For more information on enhancing security, consider exploring additional resources on diagnostic logging and advanced monitoring techniques.

Learn more about [Azure App Service Security](https://docs.microsoft.com/en-us/azure/app-service/) and stay updated with the latest practices!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/874e2f85-3b70-421e-94c6-722d572e440f/lesson/ed61dfda-dce4-44c5-858e-9c20aab5add3)**
>
> Watch video content
