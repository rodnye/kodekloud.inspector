# Configure and manage Azure front door - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Network-Security/Configure-and-manage-Azure-front-door)

---

## Table of Contents

- Configure and manage Azure front door
  - Understanding Key Azure Services
  - Key Benefits of Azure Front Door
  - Deploying Azure Front Door
  - Sample HTML Response from App Service
  - Final Thoughts
  - Watch Video
    - Using Azure Portal and Custom Script
    - Exploring the Azure Portal

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Network Security

# Configure and manage Azure front door

In this lesson, you will learn how to configure and manage Azure Front Door, a global load balancing service with web application firewall (WAF) capabilities. We will also compare its features with those of Azure Application Gateway and Azure Firewall to help you choose the best solution for your deployment needs.

## Understanding Key Azure Services

Azure Application Gateway is a regional load balancer designed primarily for handling traffic within a single region. Operating at layer 7, it can manage requests based on HTTP/HTTPS attributes such as headers and paths, making it ideal for routing traffic within a multi-tier application.

In contrast, **Azure Front Door** is a global load balancer that operates at the edge of the Azure network. It provides robust WAF protection and ensures optimal traffic distribution across multiple endpoints—whether in different Azure regions or on-premises. Its key features include:

- Global load balancing
- URL-based routing
- SSL termination
- WAF protection across regions
- Integration with Azure Content Delivery Network (CDN) to reduce latency

As illustrated in the diagram below, when path-based routing is required within a region, Application Gateway offers effective layer 7 load balancing. However, Azure Front Door is best suited for distributing traffic globally.

![The image illustrates the configuration and management of Azure Front Door, showing a network diagram with multiple regions and edge locations connected through the Microsoft Global Network. It includes paths for different types of requests, such as "/search/*" and "/statics/*", routed to specific regions.](https://kodekloud.com/kk-media/image/upload/v1752882073/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-and-manage-Azure-front-door/azure-front-door-network-diagram.jpg)

## Key Benefits of Azure Front Door

Azure Front Door provides several benefits over regional load balancers like Application Gateway:

- **Global Reach:** Seamlessly directs user traffic to the nearest endpoint, improving latency and performance.
- **Integrated CDN:** Works with Azure CDN to cache and deliver content worldwide.
- **Enhanced Security:** Supports WAF policies across multiple regions.
- **Additional Features:** Offers SSL/TLS termination, traffic routing, URL rewriting, health monitoring, and failover.

## Deploying Azure Front Door

### Using Azure Portal and Custom Script

To deploy Azure Front Door, you can use the Azure Portal combined with a custom deployment script. This script deploys three applications across West Europe, Southeast Asia, and East US. The deployment ensures that users are directed to the endpoint closest to their location. For example, if you are closest to West Europe, your traffic is routed accordingly.

Below is a sample output from the script that sets up the resources:

```
OutboundIpAddresses                : 137.116.150.42,137.116.147.21,137.116.137.195,52.163.228.2,13.76.44.139
PossibleOutboundIpAddresses        : 137.116.150.42,137.116.147.21,137.116.137.195,52.163.228.2,13.76.44.139
ContainerSize                      : 0
DailyMemoryTimeQuota               : 0
SuspendedTill                      :
MaxNumberOfWorkers                 :
CloningInfo                        :
ResourceGroup                      : rg-afd-apps-01102023
IsDefaultContainer                 : False
DefaultHostName                    : seal1160225602.azurewebsites.net
SlotSwapStatus                     :
HttpsOnly                          : False
RedundancyMode                     :
InProgressOperationId              :
StorageAccountRequired             :
KeyVaultReferenceIdentity          :
VirtualNetworkSubnetId             :
Identity                           :
ExtendedLocation                   :
Id                                 : /subscriptions/3e17f88a-ad65-4ebe-a407-4dcd4cac01a73/resourceGroups/rg-afd-apps-01102023/providers/Microsoft.Web/sites/SEA1160225602
Name                               : SEA1160225602
Kind                               : app
Location                           : Southeast Asia
Type                               : Microsoft.Web/sites
Tags                               :


DEBUG: 11:16:59 AM - [ConfigManager] Got nothing from [DisplayRegionIdentified], Module = [], Cmdlet = []. Returning default value [True].
DEBUG: AzureQoSEvent: Module: Az.Websites.3.1.0; CommandName: Publish-AzWebApp; PSVersion: 5.1.22621.1778; IsSuccess: True; Duration: 00:00:35.4472596
DEBUG: 11:16:59 AM - [ConfigManager] Got nothing from [EnableDataCollection], Module = [], Cmdlet = []. Returning default value [True].
DEBUG: 11:16:59 AM - PublishAzureWebAppCmdlet end processing.
Build and publish finished
```

> [!important]
> **Prerequisite**
>
> Ensure that .NET is installed on your computer before running the script. The script deploys three app services along with your custom application code.

### Exploring the Azure Portal

1.  **Resource Group Overview:**  
    Open the Azure Portal and navigate to the resource group created by the script (e.g., `rg-afd-apps-01102023`). This group contains various app service plans and deployed app services.

    ![The image shows a Microsoft Azure portal interface displaying a resource group named "rg-afd-apps-01102023." It lists several resources, including App Services and App Service plans, with their respective locations.](https://kodekloud.com/kk-media/image/upload/v1752882074/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-and-manage-Azure-front-door/azure-portal-resource-group-rg-afd-apps.jpg)

2.  **App Service Inspection:**  
    When you open an app service (for example, "KodeKloud E-U-S"), you will see similar services deployed for West Europe (W-E-U) and Southeast Asia ("KodeKloud Southeast Asia").
3.  **Deploying Azure Front Door:**  
    In the Azure Portal, search for "Firewall and CDN profiles" and select "Create Front Door and CDN Profile." Although classic options are available, the modern Azure Front Door solution offers enhanced features and performance.

    ![The image shows a Microsoft Azure portal page comparing offerings for Azure Front Door and other services, with options for "Quick create" and "Custom create" configurations.](https://kodekloud.com/kk-media/image/upload/v1752882075/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-and-manage-Azure-front-door/azure-portal-front-door-comparison.jpg)
    - **Custom Create:** Choose "Custom Create." When prompted, select your resource group and assign a name (e.g., "AD Apps 500"). Note that, although Azure Front Door is a global service, it requires a region to store its metadata—the same region as the resource group.
    - **Endpoint Configuration:** Add an endpoint by providing a name (e.g., "AppSR1") and clicking on Add.

    ![The image shows a Microsoft Azure interface for creating a Front Door profile, with options to add an endpoint by specifying a name and enabling it.](https://kodekloud.com/kk-media/image/upload/v1752882077/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-and-manage-Azure-front-door/azure-front-door-profile-interface.jpg)
    - **Adding a Route and Origin Group:**  
      Add a route that points to an origin group—a collection of your app service endpoints. Create a new origin group (for example, "AFD origin host") and add your regional app services. You do not need to enable validation at this point; simply include each app service as an origin.

      ![The image shows a Microsoft Azure portal interface for adding a route and an origin group. It includes options for configuring protocols, redirect settings, and health probes.](https://kodekloud.com/kk-media/image/upload/v1752882078/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-and-manage-Azure-front-door/azure-portal-route-origin-group.jpg)

    - **Configuring Health Probes:**  
      Set up health probes (e.g., a GET request every 100 seconds) to monitor the status of each endpoint. Name the route (e.g., "AFD route app svc") and create it. This route directs traffic to the correct origin group.

      ![The image shows a Microsoft Azure interface for adding a route and configuring an origin group, including settings for protocols, health probes, and load balancing.](https://kodekloud.com/kk-media/image/upload/v1752882079/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-and-manage-Azure-front-door/azure-route-configuration-interface.jpg)

4.  **Deployment and Verification:**  
    Once the configuration is complete, your Front Door instance will deploy. Traffic will now be distributed among app services based on user proximity. For instance, users in the United States may be served by the East US app service, while users in Asia Pacific may reach the Southeast Asia app service.

    ![The image shows a Microsoft Azure portal page for creating a Front Door profile, displaying details like subscription, resource group, location, and endpoint information. Validation has passed, and various settings such as origin group and security policy are listed.](https://kodekloud.com/kk-media/image/upload/v1752882080/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-and-manage-Azure-front-door/azure-portal-front-door-profile.jpg)

    Wait for the deployment to complete. Then, check the Front Door endpoint details in the Azure Portal and copy the endpoint URL into your browser. Traffic will be directed to the nearest regional endpoint based on your location and network latency.

    ![The image shows a Microsoft Azure portal page displaying the overview of a deployment in progress, with details about resources, types, statuses, and operation details.](https://kodekloud.com/kk-media/image/upload/v1752882081/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-and-manage-Azure-front-door/azure-portal-deployment-overview.jpg)

## Sample HTML Response from App Service

After deployment, accessing the Front Door URL should display the web page served by the nearest app service. Below is an example of a basic HTML output:

```
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Home page - KodeKloud_EUS</title>
    <link rel="stylesheet" href="/lib/bootstrap/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="/css/site.css?v=pAGv4ietcJNK_EwsQZ5B9N-K4UmNYS2a9wL4Jw-q9D0" />
    <link rel="stylesheet" href="/KodeKloud_EUS.styles.css" />
</head>
<body>
    <header>
        <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
            <div class="container">
                <a class="navbar-brand" href="/">KodeKloud_EUS</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                    <ul class="navbar-nav flex-grow-1">
                        <li class="nav-item">
                            <a class="nav-link text-dark" href="/">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-dark" href="/Privacy">Privacy</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    <div class="container">
        <main role="main" class="pb-3">
            <!-- Page content continues here -->
        </main>
    </div>
</body>
</html>
```

This HTML sample confirms that Azure Front Door is directing traffic effectively by serving content from the closest regional app service.

## Final Thoughts

Azure Front Door ensures optimal global load balancing and efficient content delivery by dynamically routing requests to the nearest deployed app service instance. This service enhances performance and reliability, especially for applications with a worldwide user base.

For further learning, explore more about Azure connectivity services such as [ExpressRoute](https://azure.microsoft.com/services/expressroute/) which provides dedicated, private network connections to Azure.

Happy deploying!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/0489a935-a4dd-41c6-b5d3-6054c570299b/lesson/4d418368-2007-4c0b-ada2-49a0a4047eb6)**
>
> Watch video content
