# Azure App Services - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ900-Microsoft-Azure-Fundamentals/Compute-and-Networking/Azure-App-Services)

---

## Table of Contents

- Azure App Services
  - Key Features
  - Benefits
  - Creating an App Service in the Azure Portal
  - Conclusion
  - Watch Video
    - Ease of Use
    - Integrated Services
    - Use Cases
    - Accessing Your Web App

---

## Content

AZ900: Microsoft Azure Fundamentals

Compute and Networking

# Azure App Services

Azure App Service is a fully managed platform designed for building, deploying, and scaling web applications with ease. In this guide, we explore the distinct features and advantages of Azure App Services and how it can accelerate your development projects.

![The image is an illustration of Azure App Services, described as a fully managed platform for building, deploying, and scaling web apps. It features a computer screen with icons representing settings, a rocket, and scaling.](https://kodekloud.com/kk-media/image/upload/v1752868251/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-App-Services/azure-app-services-illustration.jpg)

## Key Features

Azure App Services supports a broad range of programming languages including .NET, .NET Core, Java, Ruby, Node.js, PHP, and Python. This versatility makes it an ideal platform for developers working in diverse environments. The service integrates natively with Azure DevOps, GitHub, and Docker Hub, streamlining continuous deployment workflows. In addition, the platform supports both manual and automatic scaling, ensuring that your application maintains high availability and responsiveness across Microsoft-managed data centers worldwide.

![The image outlines key features of Azure App Services, highlighting support for multiple languages and frameworks, DevOps optimization, and global scalability with high availability.](https://kodekloud.com/kk-media/image/upload/v1752868252/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-App-Services/azure-app-services-features-diagram.jpg)

## Benefits

### Ease of Use

Azure App Service operates as a Platform as a Service (PaaS), abstracting the underlying complexities typical of Virtual Machines (IaaS). With automatic patching, maintenance, and infrastructure management, developers can concentrate on coding and innovation rather than system administration.

> [!important]
> **Note**
>
> Using Azure App Services significantly reduces the operational overhead associated with managing servers, enabling faster development and deployment cycles.

### Integrated Services

The platform easily integrates with various Azure services such as Azure SQL Database and Azure Managed Instances, offering secure authentication and enhanced data management capabilities. This interconnected ecosystem enables you to build robust applications that are both scalable and secure.

![The image highlights the benefits of Azure App Services, featuring three points: "Ease of Use," "Fully Managed Platform," and "Integrated Services," each with corresponding icons.](https://kodekloud.com/kk-media/image/upload/v1752868253/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-App-Services/azure-app-services-benefits-icons.jpg)

### Use Cases

Azure App Services caters to a wide array of applications—from web apps and mobile backends to RESTful APIs. Its powerful and flexible environment is specifically designed to address the diverse requirements of modern developers.

![The image illustrates common use cases for Azure App Services, including web apps, mobile app backends, and RESTful APIs, with icons of a computer and a smartphone.](https://kodekloud.com/kk-media/image/upload/v1752868254/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-App-Services/azure-app-services-use-cases.jpg)

## Creating an App Service in the Azure Portal

In this section, we guide you through the process of creating an App Service using the Azure Portal:

1.  **Log into the Azure Portal:** Enter your credentials and search for "Azure App Services."
2.  **Create a New Web App:** Click on "Create" and then select "Web App."
3.  **Configure Basic Settings:**
    - Choose your subscription and create a new resource group (e.g., "AZ-900 App Service RG").
    - Enter a unique name for your web application (e.g., "AZ-900 Demo Web App"). This unique name forms part of your azurewebsites.net domain.
4.  **Select the Application Stack:**  
    Unlike Virtual Machines where you must manually install and configure the runtime environment, App Service allows you to select the required stack effortlessly.
5.  **Choose Deployment Region and Pricing Plan:**  
    Select a region for deployment and choose an appropriate pricing plan. For learning or testing purposes, the free plan is often sufficient.
6.  **Create the App Service:**  
    After configuring these settings, click on "Create" to deploy your new web application.

![The image shows the "Create Web App" page on the Microsoft Azure portal, where various settings like instance details, runtime stack, operating system, and pricing plans are being configured.](https://kodekloud.com/kk-media/image/upload/v1752868256/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-App-Services/create-web-app-azure-portal.jpg)

Upon successful creation, Azure provides a default landing page that confirms the underlying infrastructure, runtime, and patch management are fully handled by the platform. This streamlined process greatly simplifies the deployment experience when compared to managing Virtual Machines manually.

![The image shows the "Create Web App" page on the Microsoft Azure portal, displaying details for setting up a web app, including subscription, resource group, and app service plan information.](https://kodekloud.com/kk-media/image/upload/v1752868257/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-App-Services/create-web-app-azure-portal-2.jpg)

### Accessing Your Web App

Once the deployment is complete:

- Click "Go to Resource" to visit your newly created web app.
- A unique URL will be provided, which you can use to view your live application.

At this point, although the landing page confirms that your web app is operational, custom content has not been deployed yet. After uploading your code, the application will render your website, allowing you to focus on development without the burden of infrastructure management.

![The image shows the Microsoft Azure portal interface for a web app named "az900demowebapp," displaying its properties, deployment settings, and configuration details.](https://kodekloud.com/kk-media/image/upload/v1752868258/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-App-Services/azure-portal-az900demowebapp-settings.jpg)

![The image shows a Microsoft Azure web page indicating that a web app is live but waiting for content. It provides options for deployment and quickstart guidance.](https://kodekloud.com/kk-media/image/upload/v1752868259/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-App-Services/azure-web-app-live-waiting-content.jpg)

## Conclusion

Azure App Services streamlines the process of deploying web applications by handling infrastructure management, runtime setup, and scaling automatically. This allows developers to concentrate on building innovative solutions, while Azure ensures optimal performance and high availability. Explore other Azure services like Container Services to further enhance your application landscape.

For more detailed information on Azure App Services and other related technologies, please refer to:

- [Microsoft Azure Documentation](https://docs.microsoft.com/azure/app-service/)
- [Azure App Services Overview](https://azure.microsoft.com/services/app-service/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az900-microsoft-azure-fundamentals/module/8eca3741-67ac-4ee2-8439-aa23c16d33dd/lesson/cbd90fa3-73d4-4fcb-86b6-bc0cc4927263)**
>
> Watch video content
