# Design for Azure App Service - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-compute-solution/Design-for-Azure-App-Service)

---

## Table of Contents

- Design for Azure App Service
  - Choosing Your Development Language and Deployment Method
  - Scalability and High Availability
  - Key Considerations
  - Summary of Considerations for App Service as a Compute Solution
  - Next Steps
  - Watch Video
    - 1. Sizing
    - 2. Built-in Authentication
    - 3. Deployment Slots
    - 4. App Type
    - 5. CI/CD Integration

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a compute solution

# Design for Azure App Service

In this article, we explore the key considerations for deploying Azure App Service. Building on insights from our [AZ-104: Microsoft Azure Administrator](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator) course, this guide will help you determine whether Azure App Service is the right fit for your application while discussing critical factors such as scalability, cost optimization, integrated authentication, deployment slots, supported app types, and CI/CD integration.

Azure App Service is a highly recommended choice for API or web applications—especially when you prefer a cloud-optimized architecture without managing the underlying infrastructure. This Platform as a Service (PaaS) offering supports web apps, background jobs, REST APIs, and mobile backends, handling infrastructure maintenance, patches, and updates on your behalf.

## Choosing Your Development Language and Deployment Method

Azure App Service supports a wide range of programming languages, including Node.js, Java, PHP, .NET Core, Ruby, and Tomcat. For runtimes that are not directly supported, deploying your application in a container is a viable option. All your code can be stored in repositories such as GitHub, Azure DevOps, or other supported source control systems, and connected through a CI/CD pipeline for seamless deployments.

## Scalability and High Availability

Scalability and high availability come built-in with Azure App Service. Microsoft manages auto-scaling features across Standard, Premium, and Isolated tiers of the App Service plan. Note that the maximum number of instances you can scale to varies by tier:

- **Standard**: up to 10 instances
- **Premium**: up to 30 instances

Below is a diagram illustrating the flowchart for selecting an Azure App Service solution. It highlights key decision points for migrating or building new applications and emphasizes features like scalability and language support.

![The image is a flowchart and guide for selecting an Azure App Service solution, detailing decision points for migrating or building new applications, and highlighting features like scalability and language options.](https://kodekloud.com/kk-media/image/upload/v1752866846/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-App-Service/azure-app-service-flowchart-guide.jpg)

## Key Considerations

### 1\. Sizing

Evaluating the correct App Service plan tier is crucial based on cost, scaling requirements, and available features. Azure App Service plans come in various tiers ranging from Free and Shared to Basic, Standard, Premium, and Isolated. For example:

- **Testing**: The Free tier is suitable for experimenting with an application.
- **Auto-Scaling**: The Standard tier is required for auto-scaling features.
- **Private Endpoints**: The Premium tier supports private endpoint configurations.

Keep in mind that pricing is based on the App Service plan, regardless of the number of applications deployed. Even when no applications are actively running, you are charged, so consider isolating resource-intensive applications on separate plans.

### 2\. Built-in Authentication

Azure App Service offers seamless integration with popular identity providers like Microsoft, Google, and Facebook. Unlike virtual machines that often require additional SDKs or code modules to manage authentication for languages such as .NET, Java, or Python, App Service allows you to directly choose and configure an identity provider for your application.

### 3\. Deployment Slots

Deployment slots allow you to promote staging code to production and provide a simple rollback mechanism if issues arise. Available from the Standard plan onward, deployment slots enable developers to test code in a staging environment before swapping with the production slot, ensuring a smooth transition and quick recovery if needed.

### 4\. App Type

Azure App Service accommodates a diverse range of application types, including web apps, API apps, web jobs, and mobile app backends. Whether you are deploying an app written in ASP.NET, Java, Ruby, PHP, or Python, you can choose between Windows or Linux hosting. Additionally, web jobs allow you to run scripts or programs (e.g., Node.js, PHP, Python, Java) using command shell scripts, batch files, PowerShell, or bash for both scheduled and triggered tasks.

### 5\. CI/CD Integration

Modern app development relies on Continuous Integration and Continuous Deployment (CI/CD) practices. Azure App Service integrates with popular source control providers like GitHub, Azure DevOps, Bitbucket, or even manual methods via Dropbox or OneDrive, allowing you to set up automated deployment pipelines with ease.

## Summary of Considerations for App Service as a Compute Solution

Below is an infographic summarizing the critical considerations for utilizing Azure App Service as your compute solution. The infographic covers aspects such as sizing, authentication, deployment slots, application type, and CI/CD integration.

![The image is an infographic from KodeKloud outlining considerations for using App Service as a compute solution, including sizing, authentication, deployment slots, app type, and CI/CD integration. It features a wavy design with icons and brief descriptions for each consideration.](https://kodekloud.com/kk-media/image/upload/v1752866846/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-App-Service/app-service-compute-infographic.jpg)

> [!important]
> **Note**
>
> For a detailed exploration of Azure App Service, including live deployment demonstrations, please refer to our [AZ-104: Microsoft Azure Administrator](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator) course.

## Next Steps

Having reviewed the nuanced details of Azure App Service, our next discussion will focus on container instances as another robust compute solution. Should you have any further questions regarding deploying App Services, please consult the course materials for additional guidance.

For more in-depth information and tutorials, be sure to explore the following resources:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/bf1d18e5-9589-48cf-99af-4150d985241a/lesson/427f6e1d-221f-4976-8754-ca28e96d6d63)**
>
> Watch video content
