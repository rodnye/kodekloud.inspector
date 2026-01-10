# Deploy web app certificates - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/App-Security/Deploy-web-app-certificates)

---

## Table of Contents

- Deploy web app certificates
  - Why Do We Need Certificates?
  - Options for App Service Certificates in Azure
  - Conclusion
  - Watch Video
    - 1. Free App Service Managed Certificate
    - 2. Purchased App Service Certificate
    - 3. Import a Certificate from Azure Key Vault
    - 4. Upload a Certificate

---

## Content

Microsoft Azure Security Technologies (AZ-500)

App Security

# Deploy web app certificates

Securing your web applications is essential to protect data and maintain user trust. One of the key measures in achieving this security is through the effective use of certificates, which encrypt data, validate website authenticity, and ensure data integrity during transit.

## Why Do We Need Certificates?

Certificates are vital for several reasons:

1.  **Security:**  
    They encrypt the data exchanged between users and your website, safeguarding sensitive information.
2.  **Trust:**  
    A valid certificate reassures visitors of your website's legitimacy, helping to differentiate it from phishing sites.
3.  **Data Integrity:**  
    Encryption prevents data from being intercepted or tampered with while it is being transmitted.

---

## Options for App Service Certificates in Azure

Azure provides multiple certificate options to meet the needs of different applications. Each option is designed to offer flexibility, ensuring that you can choose the level of trust and control that best fits your application requirements.

### 1\. Free App Service Managed Certificate

Azure offers free managed certificates that are perfect for developers and small-scale applications. These certificates are automatically renewed by Azure, streamlining the certificate management process. When viewing your web app (for example, one hosted on azurewebsites.net) in the Azure portal, you can see a secure connection indicator.

![The image shows a Microsoft Azure portal page for managing certificates in a web app named "aapsvcaz500." It indicates that there are currently no managed certificates displayed, with an option to add a new one.](https://kodekloud.com/kk-media/image/upload/v1752881611/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-web-app-certificates/azure-portal-managing-certificates-aapsvcaz500.jpg)

Clicking the secure connection icon displays certificate details such as:

- Issued to Microsoft Corporation.
- Common Name: _wildcard.azurewebsites.net_ (serving any subdomain under azurewebsites.net).

![The image shows a Microsoft Azure web app page indicating the app is running but waiting for content, alongside a certificate viewer window displaying SSL certificate details for an Azure website.](https://kodekloud.com/kk-media/image/upload/v1752881612/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-web-app-certificates/azure-web-app-ssl-certificate.jpg)

Since these certificates are provided by Microsoft, there are no additional costs involved.

### 2\. Purchased App Service Certificate

For enhanced trust and additional features, consider purchasing an App Service Certificate from Azure. This option is particularly useful when:

- You want to use a custom domain (e.g., cloud.com instead of azurewebsites.net).
- Enhanced branding and credibility are required for your business.

Purchased certificates are issued specifically for your verified domain, offering a higher level of trust and customization compared to free certificates.

### 3\. Import a Certificate from Azure Key Vault

If you have acquired a certificate from a third-party vendor, you can store it in Azure Key Vault and integrate it with your App Service. This method gives you the flexibility to choose your preferred certificate authority rather than relying solely on Azure’s options.

### 4\. Upload a Certificate

For organizations that already possess a certificate—whether for internal use or public applications—Azure allows you to upload the certificate directly to your App Service.

![The image outlines options for adding certificates in an app service, including creating, purchasing, importing, and uploading certificates. It features a graphic of a certificate with a ribbon.](https://kodekloud.com/kk-media/image/upload/v1752881613/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-web-app-certificates/app-service-certificate-options.jpg)

To proceed in the Azure portal, click on "Add Certificate." If you haven't configured a custom domain yet, you'll be prompted to add one. Once your custom domain is set up, you can either purchase a managed certificate or upload your own certificate file.

![The image shows a Microsoft Azure portal interface for adding a public key certificate to a web app. It includes options to upload a .cer file and enter a certificate friendly name.](https://kodekloud.com/kk-media/image/upload/v1752881615/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-web-app-certificates/azure-portal-add-certificate.jpg)

For purchasing a certificate, select the App Service Certificates option. You'll see the pricing details for both standard and wildcard certificates. After providing the domain hostname and certificate name, you can enable auto-renewal to let Azure manage the certificate lifecycle automatically.

![The image shows a Microsoft Azure portal page for creating an App Service certificate, with options to select subscription, resource group, certificate type (Standard or Wildcard), and auto-renewal settings.](https://kodekloud.com/kk-media/image/upload/v1752881616/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-web-app-certificates/azure-portal-app-service-certificate.jpg)

> [!important]
> **Note**
>
> Azure's integrated certificate management options provide a cost-effective and streamlined way to secure your applications without the overhead of manual certificate management.

---

## Conclusion

Securing your App Service with the appropriate certificate is crucial for protecting sensitive data and maintaining user trust. Azure offers a variety of certificate options—from free managed certificates to purchased certificates and more—ensuring that you can find a solution tailored to your specific deployment scenario.

The upcoming discussion will focus on data security with an emphasis on storage security, ensuring that your data remains both safe and accessible.

For more in-depth information on securing web applications with certificates, please refer to [Microsoft Azure Documentation](https://docs.microsoft.com/en-us/azure/app-service/overview) and related resources.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/c93091f0-246d-47cc-a399-0e33ad87ee7f/lesson/df888c2f-7cf0-4705-9ef2-0c21c7417ab4)**
>
> Watch video content
