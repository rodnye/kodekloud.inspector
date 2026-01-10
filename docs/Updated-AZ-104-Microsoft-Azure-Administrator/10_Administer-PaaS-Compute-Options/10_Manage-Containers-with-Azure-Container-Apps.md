# Manage Containers with Azure Container Apps - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-PaaS-Compute-Options/Manage-Containers-with-Azure-Container-Apps)

---

## Table of Contents

- Manage Containers with Azure Container Apps
  - Deploying Azure Container Apps via the Azure Portal
  - Watch Video

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer PaaS Compute Options

# Manage Containers with Azure Container Apps

Azure Container Apps provide a serverless hosting environment that simplifies running containerized applications without the burden of managing underlying infrastructure. They offer a streamlined alternative to Azure Kubernetes Service (AKS) by enabling partial orchestration for microservices instead of full orchestration. This setup is particularly effective when each container operates as a distinct component within a larger application architecture.

For example, one container might be dedicated to data ingestion (the ingestion service), another to processing that data (the delivery service), and a third to packaging processed data for consumption (the packaging service). This modular approach demonstrates how microservices can be effectively managed within an Azure Container Apps environment, where each service is isolated in its own container for optimal performance and scalability.

Integration with the Azure Container Registry is straightforward. A DevOps pipeline can build container images, push them to the registry, and trigger deployments seamlessly. In this context, Azure Container Instances (ACI) serve as the building blocks of container apps. While ACI provides rapid scalability for single containers, Azure Container Apps excel when orchestrating multiple containers as a grouped service.

> [!important]
> **Key Benefit**
>
> Azure Container Apps reduce deployment complexity and streamline scaling operations, enabling developers to focus on application logic rather than managing intricate Kubernetes configurations.

![The image illustrates the management of containers using Azure Container Apps, highlighting its integration with Azure Container Registry and its role as an alternative to Azure Kubernetes Service. It also shows a diagram of the Azure Container Apps environment with components like Ingestion, Delivery, and Package Services.](https://kodekloud.com/kk-media/image/upload/v1752884783/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Manage-Containers-with-Azure-Container-Apps/azure-container-apps-management-diagram.jpg)

## Deploying Azure Container Apps via the Azure Portal

Follow these steps to deploy Azure Container Apps using the Azure Portal:

1.  Open the Azure Portal and search for "Container Apps." Click on the "Create" option.
2.  Choose your subscription and select an existing resource group or create a new one.
3.  Provide a name for your container app (e.g., "demo-app").
4.  Select the appropriate Container Apps environment where your apps will run. You can create a new environment by clicking on "Create new" and configuring options such as workload profiles (consumption or dedicated plans), redundancy, and networking (either your own network or a Microsoft-provided network).

![The image shows a Microsoft Azure portal page for creating a Container Apps Environment, with options for setting the environment name, type, and zone redundancy.](https://kodekloud.com/kk-media/image/upload/v1752884785/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Manage-Containers-with-Azure-Container-Apps/azure-portal-container-apps-environment.jpg)

5.  In the container settings, select a quickstart image for convenience. In this example, a simple "Hello World" container is chosen with HTTP traffic enabled on port 80.
6.  Click on "Review + Create" to validate your settings. Once validation passes, proceed with creating the Azure Container App.

![The image shows a Microsoft Azure portal interface for creating a container app, with options for selecting a quickstart image, resource allocation, and application ingress settings.](https://kodekloud.com/kk-media/image/upload/v1752884786/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Manage-Containers-with-Azure-Container-Apps/azure-portal-container-app-creation.jpg)

After deployment, click "Go to resource" to view your demo app. A URL will be displayed for accessing the deployed application, allowing you to verify the deployment.

![The image shows a Microsoft Azure portal page for creating a container app, displaying project details and container settings such as region, environment, and resource specifications.](https://kodekloud.com/kk-media/image/upload/v1752884787/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Manage-Containers-with-Azure-Container-Apps/azure-portal-container-app-settings.jpg)

Within the demo app resource, additional options include:

- Adding more containers for further orchestration.
- Configuring scaling, specifying replica counts, and enabling continuous deployment.
- Setting up a custom domain, integrating Dapr, or using service connectors for enhanced customization.

This guide has walked you through the deployment process and key configuration options for Azure Container Apps. By leveraging these features, managing and scaling containerized applications becomes more accessible, significantly reducing the complexity associated with traditional Kubernetes deployments.

Next, we will discuss data protection.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/c1871647-c1ec-478a-beab-b21781cec58f/lesson/80e5e07f-f919-4238-a74d-55dd4c316d46)**
>
> Watch video content
