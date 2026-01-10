# Deploying App Service - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-PaaS-Compute-Options/Deploying-App-Service)

---

## Table of Contents

- Deploying App Service
  - Configuring App Service
  - Creating an App Service Using the Azure Portal
  - Scaling the App Service Plan
  - Next Steps
  - Watch Video
  - Practice Lab
    - CI/CD and Visual Studio Integration

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer PaaS Compute Options

# Deploying App Service

Azure App Service is a fully managed Platform-as-a-Service (PaaS) that enables you to host web applications, APIs, mobile backends, and more. Designed to support multiple programming languages and frameworks—including .NET, .NET Core, Node.js, PHP, Java, Python, and containerized applications—App Service lets you focus on your code while Azure handles the underlying infrastructure and management.

> [!important]
> **About App Service**
>
> Historically known as "Web Apps," App Service is the underlying platform that runs your web, API, or mobile application on a dedicated App Service plan. It meets enterprise standards such as ISO, SOC, and PCI, and allows integration with Microsoft Entra ID or popular social login providers for authentication.

## Configuring App Service

In our previous lesson, we covered the creation of an App Service plan, a prerequisite for deploying various types of applications on Azure. With App Service, you can not only host web applications but also leverage built-in capabilities like continuous integration and continuous deployment (CI/CD) directly from popular source control systems or Visual Studio.

### CI/CD and Visual Studio Integration

Azure App Service simplifies automation with support for CI/CD pipelines, enabling smooth code deployment using tools like Visual Studio and templates available from the [Azure Marketplace](https://azuremarketplace.microsoft.com/). Additional features include Core Support, Offline Data Sync, and Push Notifications that make App Service an excellent option for hosting mobile apps. Furthermore, you can run Azure Functions on an existing App Service plan without additional infrastructure.

![The image is an infographic about an App Service, highlighting supported programming languages and features like security, compliance, and CI/CD integration. It includes icons for .NET, Node.js, PHP, Java, Python, HTML5, and Docker.](https://kodekloud.com/kk-media/image/upload/v1752884776/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Deploying-App-Service/app-service-infographic-languages-features.jpg)

## Creating an App Service Using the Azure Portal

Follow these steps to create an App Service via the Azure portal:

1.  **Access the Azure Portal**  
    After logging in, search for "App Service" to view the relevant options.

    ![The image shows a Microsoft Azure portal interface with a search bar and a dropdown menu displaying options related to app services, such as App Configuration and Application Insights.](https://kodekloud.com/kk-media/image/upload/v1752884778/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Deploying-App-Service/azure-portal-app-services-interface.jpg)

2.  **Create a Web App**  
    Click on "Create Web App." Unlike creating an App Service plan, you can set up the App Service on the fly, much like creating a Resource Group. Choose your desired resource group.
3.  **Configure Basic Details**  
    Provide a unique name for your App Service that will be registered under azurewebsites.net (e.g., "KodeKloudDemo"). Confirm name availability and select your publish option—whether it's Code, a Docker container, or a Static Web App.

    ![The image shows the "Create Web App" page on the Microsoft Azure portal, where details such as subscription, resource group, app name, and publishing options are being configured.](https://kodekloud.com/kk-media/image/upload/v1752884779/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Deploying-App-Service/create-web-app-azure-portal.jpg)

4.  **Select a Runtime**  
    If you choose "Code" as your publishing option, select the appropriate runtime such as .NET, Java, Node.js, PHP, or Python. (For Docker deployments, select an image for the container.) If an existing App Service plan is available, it will auto-populate; otherwise, create a new one.
5.  **Skip Database Configuration if Unnecessary**  
    Only configure database settings if required by your application.
6.  **Configure CI/CD (Optional)**  
    In the "Deployment" section, set up your CI/CD pipeline. Detailed CI/CD configuration will be discussed in a future lesson.
7.  **Finalize Networking and Monitoring Settings**  
    Configure the "Networking" and "Monitoring" sections as desired, then click "Create" to deploy your web app.

After creation, you'll receive a unique URL to access your web app through a browser. Clicking "Go to resource" will take you to your app's overview page, where you can also review all apps running under the same App Service plan.

![The image shows the Microsoft Azure portal interface for creating a web app, displaying details such as subscription, resource group, app service plan, and monitoring options. The "Review + create" tab is selected, and a "Validation" button is highlighted.](https://kodekloud.com/kk-media/image/upload/v1752884779/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Deploying-App-Service/azure-portal-web-app-creation-2.jpg)

## Scaling the App Service Plan

To accommodate growing demand, you might need to scale your App Service plan. For example, you can upgrade from a free or shared tier to a Standard plan.

1.  **Select a Pricing Tier**  
    Choose the desired pricing tier (e.g., Standard S1) and click "Select."

    ![The image shows a Microsoft Azure portal interface displaying options for scaling out an App Service plan, with various pricing tiers and specifications listed.](https://kodekloud.com/kk-media/image/upload/v1752884780/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Deploying-App-Service/azure-portal-app-service-scaling.jpg)

    > [!important]
    > **Plan Resizing Downtime**
    >
    > Resizing the plan will restart your App Service, which may lead to temporary downtime.

2.  **Adjust Instance Count**  
    Once upgraded to the Standard plan, you can manually set the instance count (up to a maximum of 10 by default).

    ![The image shows a Microsoft Azure portal interface for configuring the scaling options of an App Service plan. It includes settings for manual, automatic, and rules-based scaling methods.](https://kodekloud.com/kk-media/image/upload/v1752884782/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Deploying-App-Service/azure-portal-app-service-scaling-2.jpg)

3.  **Configure Autoscale Rules**  
    Alternatively, set up rule-based autoscale settings. For example:
    - Increase the instance count by one when CPU usage exceeds 70%.
    - Decrease the instance count by one when CPU usage falls below 25%.

    ![The image shows the Microsoft Azure portal with an autoscale setting configuration for an App Service plan. It includes options for setting the scale mode, rules, and instance limits.](https://kodekloud.com/kk-media/image/upload/v1752884782/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Deploying-App-Service/azure-portal-autoscale-settings.jpg)

These autoscale configurations enable your application to dynamically adjust resources based on real-time demand.

## Next Steps

In upcoming lessons, we will build upon this foundation by enhancing security features, configuring advanced CI/CD pipelines, and setting up deployment slots. This initial App Service deployment serves as a launching point for further application development and scaling.

Happy deploying!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/c1871647-c1ec-478a-beab-b21781cec58f/lesson/3f97f761-339d-4c7c-83a4-12e99f522282)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/c1871647-c1ec-478a-beab-b21781cec58f/lesson/24a6c129-cc0c-4638-a923-6b7276b2f889)**
>
> Practice lab
