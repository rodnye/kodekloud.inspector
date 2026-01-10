# Azure App Service - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Exploring-Azure-App-Service/Azure-App-Service)

---

## Table of Contents

- Azure App Service
  - Key Features
  - App Service Plans
  - Deploying an App Service
  - Next Steps
  - Watch Video
    - Usage Tiers
    - Step 1: Search and Create a Web App
    - Step 2: Configure Web App Settings
    - Step 3: Create the App Service Plan
    - Step 4: Review Pricing Options
    - Step 5: Configure Deployment and Additional Settings
    - Step 6: Confirm and Deploy
    - Step 7: Access Your Application

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Exploring Azure App Service

# Azure App Service

Azure App Service is a powerful, fully managed platform for deploying and managing web applications. In this guide, we will explore its key features—including built-in scale support, continuous integration and deployment, and deployment slots—while also providing an overview of App Service Plans and usage tiers for optimal resource allocation.

## Key Features

Azure App Service is built to help your application scale efficiently at minimal cost. It supports both manual and automated scaling based on defined metrics. For instance, when CPU utilization exceeds 90%, the platform can automatically add new instances to handle the increased load. Additionally, you can adjust your App Service Plan to scale up or down based on performance requirements.

Another major feature is its robust continuous integration and deployment support. Azure App Service integrates with popular tools such as Azure DevOps, GitHub, Bitbucket, FTP, and local Git repositories, ensuring your development and deployment workflows remain smooth and efficient. This enables continuous updates to your application with little to no downtime.

Deployment slots further enhance the deployment process by allowing you to target different environments (e.g., testing or production) without impacting the live site. With customizable settings swaps between these slots, you gain greater control, reducing the risks associated with new deployments.

![The image is an infographic about Azure App Service, highlighting built-in scale support, continuous integration/deployment support, and deployment slots. It lists features like cost-saving scaling, integration with tools like GitHub and Azure DevOps, and deployment customization.](https://kodekloud.com/kk-media/image/upload/v1752866384/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Azure-App-Service/azure-app-service-infographic.jpg)

> [!important]
> **Note**
>
> Leveraging deployment slots can significantly reduce downtime during application updates.

Together, these features make Azure App Service a highly scalable, flexible, and robust platform for managing your web applications.

## App Service Plans

The App Service Plan is the foundation for how your apps are hosted in Azure App Service. It defines the compute resources—CPU, memory, and storage—used by your web applications, APIs, or mobile applications. Multiple applications can share the same App Service Plan, allowing for efficient resource allocation. Importantly, you can scale an App Service Plan up or down to meet changing workloads without redeploying your apps.

Imagine App Service Plans as different subscription tiers on a streaming service like Netflix—each tier offers varying levels of performance and features, similar to plans offering mobile-only, full HD, or even 4K viewing.

### Usage Tiers

App Service Plans are available in multiple usage tiers:

- **Free Tier:** Provides 60 minutes of daily usage, ideal for testing purposes.
- **Shared Tier:** Uses shared compute resources, making it a cost-efficient option for development and testing. Note that scaling out is not supported in this tier.
- **Basic Tier:** Offers dedicated compute resources for improved performance and isolation, still targeting development and testing.
- **Standard Tier:** Designed for production workloads—it offers features like custom domains, auto scaling, staging slots, backups, and VNET integration.
- **Premium Tier:** Enhances performance and scalability for high-traffic applications with additional reliability.
- **Isolated Tier:** Caters to applications needing the highest level of performance, security, and isolation for strict compliance and regulatory requirements.

In the shared tier, your applications run on a single shared VM, meaning resources like CPU minutes are divided among multiple customers. In higher tiers—basic, standard, premium, and isolated—your applications run on dedicated VMs, with the ability to scale out to multiple instances when needed.

![The image is an infographic about Azure App Service, detailing App Service Plans, Usage Tiers, and how apps run and scale. It explains different compute resources, usage tiers, and scaling options.](https://kodekloud.com/kk-media/image/upload/v1752866385/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Azure-App-Service/azure-app-service-infographic-2.jpg)

## Deploying an App Service

In this section, we will walk through deploying an Azure App Service using the Azure portal. When deploying, an App Service Plan is either created or an existing one is reused to host your application.

### Step 1: Search and Create a Web App

1.  In the Azure portal, search for "App Service" and click on **Create a web app**.

    ![The image shows a Microsoft Azure portal interface with a search bar displaying results for "App Se," including services, resources, and documentation related to Azure.](https://kodekloud.com/kk-media/image/upload/v1752866387/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Azure-App-Service/azure-portal-search-results-app-se.jpg)

### Step 2: Configure Web App Settings

- **Resource Group:** Create a new resource group (e.g., "app01 for AZ204").
- **App Name:** Specify a unique app name (e.g., "AC204demoapp01") as it will be registered under azurewebsites.net.
- **Uniqueness Feature:** Choose whether to enable the preview feature that appends random letters and region names for uniqueness. In this example, the feature is disabled.

You also determine the type of application to run. For instance, if you select ASP.NET, the operating system option will be Windows (since classic ASP.NET is supported on Windows, unlike .NET Core). Other frameworks such as PHP or Python are typically available on Linux, while Java may offer both options.

### Step 3: Create the App Service Plan

Click to create a new plan (e.g., "ASPAC20401") and choose your pricing tier. While the standard plan is selected by default, you can review other available pricing options by clicking on **Explore pricing plans**.

![The image shows the "Create Web App" page on the Microsoft Azure portal, where users can configure project and instance details for deploying a web app. Options include subscription, resource group, instance name, publish method, runtime stack, operating system, and region.](https://kodekloud.com/kk-media/image/upload/v1752866389/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Azure-App-Service/create-web-app-azure-portal.jpg)

### Step 4: Review Pricing Options

Azure offers various hardware-based pricing tiers:

| Pricing Tier                                | Features                                                               | Typical Use Case                            |
| ------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------- |
| **Free (F1)** and **Shared (D)**            | Limited features, no auto scaling or staging slots                     | Testing and development                     |
| **Basic (B1, B2, B3)**                      | Dedicated compute resources                                            | Small-scale production or testing           |
| **Standard (S1, S2, S3)**                   | Custom domains, auto scaling, staging slots, backups, VNET integration | Production workloads                        |
| **Premium (P1, PV2, PV3)** and **Isolated** | Enhanced performance, high scalability, and isolation                  | High-traffic, mission-critical applications |

![The image shows a Microsoft Azure portal page displaying various App Service pricing plans, with details such as custom domain, auto scale, and costs in INR. A plan named "Basic B1" is selected.](https://kodekloud.com/kk-media/image/upload/v1752866390/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Azure-App-Service/azure-portal-app-service-pricing.jpg)

> [!important]
> **Warning**
>
> Be aware that the shared tier has limitations, such as no auto scaling, staging slots, or zone redundancy.

### Step 5: Configure Deployment and Additional Settings

- **Integration Features:** In the shared tier, options like zone redundancy, database integration, and continuous deployment (via GitHub, Azure DevOps, etc.) may be limited.
- **Networking & Monitoring:** Higher tiers allow configuring advanced features such as networking settings and monitoring tools like Application Insights.

![The image shows a web interface for creating a web app, specifically focusing on deployment settings with options for continuous deployment via GitHub Actions. It includes fields for selecting an organization, repository, and branch, along with authentication settings.](https://kodekloud.com/kk-media/image/upload/v1752866392/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Azure-App-Service/web-app-deployment-settings-github-actions.jpg)

### Step 6: Confirm and Deploy

After reviewing your configuration, click **Review and Create** and then **Create** to deploy the web application along with the selected App Service Plan. If you already have an existing plan, you can reuse it, as a single App Service Plan can support multiple applications—even those with different runtime stacks—provided there are enough resources.

![The image shows a "Create Web App" page from a cloud service platform, detailing the configuration and settings for deploying a web application, including subscription, resource group, and runtime stack information.](https://kodekloud.com/kk-media/image/upload/v1752866393/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Azure-App-Service/create-web-app-cloud-service-settings.jpg)

### Step 7: Access Your Application

Once the deployment is complete, click **Go to resource** to access your web app's overview page. There, you will find the URL which, when opened in a browser, confirms that your Azure App Service is running and ready to host your content.

![The image shows a Microsoft Azure portal interface displaying the overview of a web app named "az204demoapp01," with details like resource group, status, location, and subscription information. Various options and settings are visible on the left sidebar, such as activity log, access control, and deployment.](https://kodekloud.com/kk-media/image/upload/v1752866395/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Azure-App-Service/azure-portal-web-app-overview.jpg)

## Next Steps

With your Azure App Service successfully deployed, you now have a scalable and flexible environment for your web applications. For further exploration, consider diving into topics such as code deployment strategies, enabling advanced authorization and authentication features, and configuring additional settings via the Azure portal.

Happy deploying!

For more details and advanced configurations, explore the [Azure Documentation](https://docs.microsoft.com/en-us/azure/app-service/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/94d21b81-de82-4d33-a347-4404baa9f869/lesson/0f9a5829-1e85-4632-821e-f0fbc577b0cb)**
>
> Watch video content
