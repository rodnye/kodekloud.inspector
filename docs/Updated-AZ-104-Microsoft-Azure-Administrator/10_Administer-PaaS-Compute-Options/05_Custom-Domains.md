# Custom Domains - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-PaaS-Compute-Options/Custom-Domains)

---

## Table of Contents

- Custom Domains
  - Validating Domain Ownership
  - Step-by-Step Process
  - Next Steps
  - Watch Video

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer PaaS Compute Options

# Custom Domains

Azure App Service automatically provides a default domain (azurewebsites.net) for every web app. For enhanced branding and a more professional appearance, you can configure your own custom domain. In this guide, you'll learn how to validate and map a custom domain to your App Service using both A and CNAME mapping methods.

> [!important]
> **Note**
>
> Custom domains are supported on the Basic plan and higher. The free and shared tiers do not support custom domains.

## Validating Domain Ownership

Before mapping your custom domain, you need to prove ownership by adding a TXT record at your DNS provider. Once this TXT record is successfully added, you can choose to create an A record or a CNAME record to point your custom domain to the App Service.

## Step-by-Step Process

In this example, we will map the custom domain "furbish.com" using the CNAME method. Follow these steps in the Azure portal:

1.  **Access the Custom Domains Section**  
    Navigate to your App Service and select the **Custom domains** section.
2.  **Add a Custom Domain**  
    Click on **Add custom domain**. You can either use a domain you already own or purchase an App Service domain directly from Azure, which collaborates with GoDaddy. For this example, enter "www.furbish.com".
3.  **Choose the CNAME Method**  
    Select the CNAME option. Azure will display the required DNS records needed for the configuration. Copy the provided TXT record value as it will be used to validate domain ownership.
4.  **Update Your DNS Records**  
    In your DNS management system (such as Azure DNS), add the TXT record with the specified value. Then, add the CNAME record following Azure's instructions.

Below is an image from the Azure portal showing the custom domain settings, which include the domain provider options, TLS/SSL certificate settings, and domain validation details:

![The image shows a Microsoft Azure portal interface for adding a custom domain to a web app. It includes settings for domain provider, TLS/SSL certificate, and domain validation details.](https://kodekloud.com/kk-media/image/upload/v1752884771/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Custom-Domains/azure-portal-custom-domain-settings.jpg)

5.  **Validate DNS Propagation**  
    After saving your DNS records, allow some time for propagation. Once your DNS changes are effective, click on **Validate** in the Azure portal. Azure will query your DNS zone to confirm the existence of the records.
6.  **Complete the Custom Domain Setup**  
    When validation is successful, click on **Add** to associate the custom domain with your App Service. Initially, you might see a binding error due to the absence of an SSL certificate. This error is temporary and will be resolved once an SSL certificate is added to secure your connection.

    > [!important]
    > **Warning**
    >
    > Until an SSL certificate is applied, your web app may display a "Not Secure" message.

After clicking **Continue**, you will be redirected to the App Service dashboard with your updated domain settings.

## Next Steps

In the following section, we will cover the backup process for your App Service. Before moving on, take a look at the dashboard view from a web application interface, which illustrates sales, revenue, and customer statistics:

![The image shows a dashboard interface from a web application called "NiceAdmin," displaying sales, revenue, and customer statistics, along with recent activity and budget reports. It includes graphs and tables for data visualization.](https://kodekloud.com/kk-media/image/upload/v1752884772/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Custom-Domains/niceadmin-dashboard-sales-revenue-stats.jpg)

This concludes the custom domain integration process with Azure App Service. Up next, we will explore how to back up your App Service to ensure your data is secure.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/c1871647-c1ec-478a-beab-b21781cec58f/lesson/b1011360-3eb0-417a-89e7-b6a1d82cdcfc)**
>
> Watch video content
