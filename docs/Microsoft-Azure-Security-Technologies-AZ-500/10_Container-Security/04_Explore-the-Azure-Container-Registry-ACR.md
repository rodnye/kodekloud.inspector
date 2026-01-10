# Explore the Azure Container Registry ACR - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Container-Security/Explore-the-Azure-Container-Registry-ACR)

---

## Table of Contents

- Explore the Azure Container Registry ACR
  - Structure of Azure Container Registry
  - Building and Pushing a Docker Image to ACR
  - Features of Azure Container Registry
  - Creating an ACR and Pushing an Image
  - Running the Container
  - ACR Service Tiers
  - Next Steps
  - Watch Video
    - Dockerfile Breakdown
    - Centralized Container Image Management
    - Secure Image and Access Control
    - Container Image Lifecycle Management
    - Integration with Azure Services
    - High Availability and Scalability
    - Geo-replication and Content Delivery

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Container Security

# Explore the Azure Container Registry ACR

In this article, we dive into the Azure Container Registry (ACR), Microsoft Azure's managed Docker container registry service. ACR enables you to securely store and manage container images, Helm charts, and other artifacts directly within Azure. Integrated seamlessly with Azure DevOps and other popular CI/CD tools, ACR provides a reliable and scalable solution that streamlines the journey from source code to production containers.

## Structure of Azure Container Registry

The structure of ACR is designed for simplicity and efficiency:

- **Registry:** The top-level storage solution that houses all containerized images.
- **Repositories:** Nested within the registry, repositories act as dedicated shelves for specific container images. They can include namespaces indicated by forward-slash-delimited names (for example, "base/node"). Although repository names might appear hierarchical, each repository is managed independently by the registry.
- **Artifacts:** Within each repository, artifacts represent specific versions or builds of container images or Helm charts that are uniquely identified by tags. These tags (such as "ABC1", "DEF2", or "20201222") correspond to different stages of your application or varying versions of a Kubernetes deployment package.

![The image is a diagram illustrating the structure of the Azure Container Registry (ACR), showing a registry with repositories and artifacts like MyImage, MyHelmChart, and Base/Node. Each repository contains different versions or tags of artifacts.](https://kodekloud.com/kk-media/image/upload/v1752881752/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Explore-the-Azure-Container-Registry-ACR/azure-container-registry-diagram.jpg)

## Building and Pushing a Docker Image to ACR

This section explains how to build a Docker image using a Dockerfile and push it to ACR.

### Dockerfile Breakdown

The process starts with a Dockerfile that defines the blueprint for creating your Docker container image. Consider the following example:

```
FROM mcr.microsoft.com/dotnet/core/aspnet:3.0
WORKDIR /app
COPY published/aspnetapp.dll ./
ENTRYPOINT ["dotnet", "aspnetapp.dll"]
```

> [!important]
> **Dockerfile Instructions Explained**
>
> - **FROM:** Specifies the base image from the Microsoft repository, here using the .NET Core ASP.NET 3.0 image.
> - **WORKDIR:** Sets the working directory inside the container to `/app`.
> - **COPY:** Transfers the compiled `aspnetapp.dll` from the published folder into the container.
> - **ENTRYPOINT:** Declares the command to run when the container starts (`dotnet aspnetapp.dll`), launching the ASP.NET application.

When you run the `docker build` command with this file, Docker processes each instruction sequentially. Each command creates a distinct layer in the image, identified by a unique 256-character hash, which optimizes storage and version management.

## Features of Azure Container Registry

ACR comes packed with several features that are crucial for efficient container management:

### Centralized Container Image Management

ACR acts as a central hub for storing and managing your container images. It offers a secure environment equipped for organization and version-control, ensuring that your images are readily accessible for deployment across your infrastructure.

### Secure Image and Access Control

Images in ACR are safeguarded with industry-standard encryption. Access is rigorously managed through Azure Active Directory, role-based access control, and fine-grained permissions, ensuring that your container images are protected from unauthorized access.

### Container Image Lifecycle Management

ACR streamlines the management of container image lifecycles with features like versioning, environmental promotion, vulnerability scanning, and automated builds. These tools assist in maintaining a secure and efficient image management workflow.

### Integration with Azure Services

ACR's deep integration with Azure Kubernetes Service and Azure DevOps simplifies the deployment of containerized applications. This seamless integration supports efficient CI/CD pipelines and smooth operations within your existing workflows.

### High Availability and Scalability

Leveraging Azure’s robust global infrastructure, ACR offers high availability and scalability. It replicates images across multiple regions, reducing latency and ensuring fast image retrieval.

### Geo-replication and Content Delivery

![The image is an infographic about Azure Container Registry (ACR), highlighting features like geo-replication, high availability, integration with Azure services, and secure image storage. It visually represents the benefits and functionalities of ACR in a circular layout.](https://kodekloud.com/kk-media/image/upload/v1752881754/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Explore-the-Azure-Container-Registry-ACR/azure-container-registry-infographic.jpg)

ACR supports geo-replication that allows you to mirror images across several Azure regions, enhancing redundancy and disaster recovery. Additionally, integration with the Azure Content Delivery Network (CDN) accelerates image distribution, improving global access speeds.

## Creating an ACR and Pushing an Image

Follow these steps to create an ACR instance and push your image:

1.  **Create Your Dockerfile**  
    Develop a Dockerfile that, for example, pulls the official Nginx image, installs necessary packages, downloads a Bootstrap template, and exposes port 80. See the sample Dockerfile below:

    ```
    # Use the official Nginx image as the base image
    FROM nginx:latest


    # Set working directory
    WORKDIR /tmp


    # Install required packages
    RUN apt-get update && \
        apt-get install -y wget unzip && \
        rm -rf /var/lib/apt/lists/*


    # Download and extract the HTML files
    RUN wget https://github.com/startbootstrap/startbootstrap-freelancer/archive/gh-pages.zip && \
        unzip gh-pages.zip && \
        mv startbootstrap-freelancer-gh-pages/* /usr/share/nginx/html/ && \
        rm -rf /tmp/*


    # Expose port 80
    EXPOSE 80
    ```

2.  **Prepare Your Environment**  
    Open the Azure Portal and start the Cloud Shell. Upload your Dockerfile to your home directory.
3.  **Create a Container Registry**  
    Run the following command in the Azure CLI to create a new container registry (replace `<uniqueID>` with your unique identifier):

    ```
    az acr create --resource-group RGACI --name acr<uniqueID> --sku Standard
    ```

4.  **Build and Push the Image**  
    Use the command below to build the Docker image from your local Dockerfile and push it to the newly created ACR. The image is tagged as "bootstrap:v1":

    ```
    az acr build --image bootstrap:v1 --registry acr<uniqueID> .
    ```

    You'll see a build output similar to:

    ```
    a7e2a768c198: Preparing
    9c62615b1d98: Preparing
    ea43d4f82a03: Preparing
    1dc45c680df: Preparing
    eb7e3384fab: Preparing
    d310e774110a: Waiting
    ea43d4f82a03: Waiting
    1dc45c680df: Waiting
    eb7e3384fab: Waiting
    b74b4b382ff89: Pushed
    f3ca2b82a2c4: Pushed
    9c62615b1d98: Pushed
    ea43d4f82a03: Pushed
    1dc45c680df: Pushed
    d310e774110a: Pushed
    ```

    After the build completes successfully, verify the image in your ACR via the Azure Portal under the "Repositories" section. You can also pull the image locally with:

    ```
    docker pull acr<uniqueID>.azurecr.io/bootstrap:v1
    ```

## Running the Container

Once you have confirmed the image is stored in ACR, deploy it as a container instance. For example, use the following command to pull the image:

```
docker pull acr<uniqueID>.azurecr.io/bootstrap:v1
```

After pulling the image, create a new container instance within the RGACI resource group. During the setup, ensure that the "admin user" is enabled in your ACR to facilitate authentication. Details on this configuration will be explained further in the ACR authentication section later in this series.

## ACR Service Tiers

Before diving into ACR authentication, it’s important to understand the service tiers available for Azure Container Registry. The three primary tiers are:

| Service Tier | Description                                                                                                                                                       | Use Case                                             |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| **Basic**    | Provides core features for image storage, deletion, and webhook integration.                                                                                      | Suitable for development and low usage.              |
| **Standard** | Offers increased storage and throughput over Basic, meeting most production requirements.                                                                         | Ideal for most production workloads.                 |
| **Premium**  | Delivers the highest storage capacity and throughput, plus additional features like geo-replication, content trust (image tag signing), and private link support. | Best for high scale, security, and redundancy needs. |

![The image outlines the service tiers for Azure Container Registry, detailing features for Basic, Standard, and Premium levels, including authentication integration, storage, and operations.](https://kodekloud.com/kk-media/image/upload/v1752881755/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Explore-the-Azure-Container-Registry-ACR/azure-container-registry-service-tiers.jpg)

Choose the tier that best fits your workload requirements. You can start with Basic for initial testing, then scale up to Standard or Premium as your usage increases.

## Next Steps

In the next lesson, we will explore ACR authentication in depth. You will learn how to configure and use the admin user alongside other authentication mechanisms to securely manage your container images.

Happy containerizing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/146650b0-63f9-4c4b-b452-716a780e5fc7/lesson/a8e586a3-1075-4926-b7e2-a1bc6099f5c5)**
>
> Watch video content
