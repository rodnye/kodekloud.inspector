# Building and Managing Containers With ACR Tasks - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Managing-Container-Images-in-Azure-Container-Registry/Building-and-Managing-Containers-With-ACR-Tasks)

---

## Table of Contents

- Building and Managing Containers With ACR Tasks
  - Overview of the Container Lifecycle
  - Task Scenarios with ACR Tasks
  - Creating and Deploying a Container Image with ACR Tasks
  - Conclusion
  - Watch Video
    - Kube-Task
    - Automatically Triggered Tasks
    - Multi-Step Tasks
    - Step 1: Create the Azure Container Registry
    - Step 2: Build Your Container Image Locally Using Cloud Shell
    - Step 3: Build the Container Image Using ACR Build

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Managing Container Images in Azure Container Registry

# Building and Managing Containers With ACR Tasks

In this article, we explore the key phases of building and managing containers using Azure Container Registry (ACR) Tasks. ACR Tasks allow you to automate the entire container lifecycle—from building and testing to pushing and deploying container images—thereby streamlining your development and CI/CD workflows.

---

## Overview of the Container Lifecycle

Container lifecycle operations generally follow these steps:

1.  **Build:** Package your application and its dependencies into a Docker image. A Dockerfile defines the build process, and ACR Tasks help automate this step to ensure consistency and efficiency.
2.  **Test:** Integrate automated testing within ACR Tasks to validate the container image before deployment.
3.  **Push:** After successful testing, push the validated image to ACR, making it accessible in a centralized registry across development, staging, and production environments.
4.  **Deploy:** Deploy the containerized application to a live environment. ACR integrates seamlessly with Azure services such as Azure Kubernetes Service (AKS), Azure Container Instances (ACI), Azure Container Apps, and Azure App Service.

![The image illustrates the process of building and managing containers with ACR tasks, featuring four steps: Build, Test, Push, and Deploy, each represented by an icon.](https://kodekloud.com/kk-media/image/upload/v1752866700/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Building-and-Managing-Containers-With-ACR-Tasks/acr-tasks-container-management-diagram.jpg)

ACR Tasks essentially function as a continuous integration and continuous deployment (CI/CD) pipeline for container images, significantly reducing manual intervention.

---

## Task Scenarios with ACR Tasks

ACR Tasks are flexible and support different workflows. Here are some common task scenarios:

### Kube-Task

A kube-task is ideal for one-time builds or immediate tasks. It allows you to build a container image without setting up a complex CI/CD pipeline—perfect for rapid development or prototyping.

### Automatically Triggered Tasks

Automatically triggered tasks execute based on specific events. For example, you can configure a trigger to start a new build whenever changes are detected in your source code repository. This integration with tools like [Azure Pipelines](https://azure.microsoft.com/en-us/services/devops/pipelines/) ensures your container images remain up to date.

### Multi-Step Tasks

Multi-step tasks enable you to design a comprehensive pipeline that includes additional steps such as testing or security scanning. By specifying a sequence of actions for your container image before it is pushed or deployed, you gain greater flexibility and control over your container management strategy.

![The image illustrates three types of task scenarios for building and managing containers: Quick Task, Automatically Triggered Task, and Multi-Step Task, each represented by a distinct icon.](https://kodekloud.com/kk-media/image/upload/v1752866701/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Building-and-Managing-Containers-With-ACR-Tasks/container-task-scenarios-icons.jpg)

---

## Creating and Deploying a Container Image with ACR Tasks

This section demonstrates how to build a container image using a Dockerfile and then push that image to the Azure Container Registry.

### Step 1: Create the Azure Container Registry

1.  Log into the [Azure Portal](https://portal.azure.com) and search for "Container Registry" in the search box.

    ![The image shows the Microsoft Azure portal with a search bar displaying results for "container," listing services like Container Apps and Container Instances. Below, there is a list of resources with their types and last viewed dates.](https://kodekloud.com/kk-media/image/upload/v1752866703/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Building-and-Managing-Containers-With-ACR-Tasks/azure-portal-container-search-results.jpg)

2.  Click **Create**.
3.  Create a new resource group (e.g., `azr-az204-containers`).

    ![The image shows the Azure portal interface for creating a container registry, with a pop-up window prompting for a new resource group name.](https://kodekloud.com/kk-media/image/upload/v1752866705/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Building-and-Managing-Containers-With-ACR-Tasks/azure-portal-container-registry-popup.jpg)

4.  Provide a unique name for your registry (e.g., `azr-az204`). If the name is already taken, consider modifying it (for example, appending "KodeKloud" to ensure uniqueness).

    ![The image shows the "Create container registry" page on Microsoft Azure, where a user is attempting to set up a new container registry. An error message indicates that the chosen registry name is already in use.](https://kodekloud.com/kk-media/image/upload/v1752866708/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Building-and-Managing-Containers-With-ACR-Tasks/create-container-registry-error-azure.jpg)

5.  Select your preferred location (e.g., East US) and choose the Standard tier. Note that networking options such as private access are limited to the Premium plan.
6.  Click **Review and Create** to deploy the registry.

Once deployment is complete, the Azure portal will confirm the registry creation.

![The image shows a Microsoft Azure portal page indicating that a deployment of "Microsoft.ContainerRegistry" is complete. It includes options to view deployment details, next steps, and a button to go to the resource.](https://kodekloud.com/kk-media/image/upload/v1752866709/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Building-and-Managing-Containers-With-ACR-Tasks/azure-portal-container-registry-deployment.jpg)

---

### Step 2: Build Your Container Image Locally Using Cloud Shell

For this demonstration, we will use the Azure Cloud Shell. You can also perform these steps locally if preferred.

1.  First, verify that the necessary .NET runtimes are installed:

```
rithin [~] $ dotnet --list-runtimes
Microsoft.AspNetCore.App 8.0.0 [/usr/share/dotnet/shared/Microsoft.AspNetCore.App]
Microsoft.NETCore.App 8.0.0   [/usr/share/dotnet/shared/Microsoft.NETCore.App]
```

2.  Create a directory for your application and navigate into it:

```
rithin [~] $ mkdir App
rithin [~] $ cd App
```

3.  Generate a new ASP.NET Core web application:

```
rithin [~/App] $ dotnet new webapp -n MyWebApp
```

4.  Navigate to the application's Pages directory to verify the landing page:

```
rithin [~/App/MyWebApp] $ cd Pages
rithin [~/App/MyWebApp/Pages] $ ls
Error.cshtml  Error.cshtml.cs  Index.cshtml  Privacy.cshtml  Shared  _ViewImports.cshtml  _ViewStart.cshtml
```

5.  Display the content of the landing page:

```
rithin [~/App/MyWebApp/Pages] $ cat Index.cshtml
@page
@model IndexModel


<h1 class="display-4">Welcome</h1>
<p>Learn about <a href="https://learn.microsoft.com/aspnet/core">building Web apps with ASP.NET Core</a>.</p>
```

6.  If you wish to edit the page, use an editor like nano, then return to the parent directory:

```
rithin [~/App/MyWebApp/Pages] $ nano Index.cshtml
```

7.  Change back to the project root and create a Dockerfile:

```
rithin [~/App/MyWebApp] $ cd ../..
rithin [~/App] $ nano Dockerfile
```

8.  Paste the following content into your Dockerfile, which uses .NET 8.0:

```
# Dockerfile
# Step 1: Use the official ASP.NET Core 8.0 runtime as the base image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80


# Step 2: Use the .NET 8.0 SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["MyWebApp/MyWebApp.csproj", "MyWebApp/"]
RUN dotnet restore "MyWebApp/MyWebApp.csproj"
COPY . .
WORKDIR "/src/MyWebApp"
RUN dotnet build "MyWebApp.csproj" -c Release -o /app/build


# Step 5: Publish the application
FROM build AS publish
RUN dotnet publish "MyWebApp.csproj" -c Release -o /app/publish


# Step 6: Create the final image with the app
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MyWebApp.dll"]
```

Save the Dockerfile after pasting.

> [!important]
> **Tip**
>
> Ensure that the project structure matches the paths in the Dockerfile to avoid build errors.

---

### Step 3: Build the Container Image Using ACR Build

1.  In the Cloud Shell, run the following ACR build command. Be sure to replace the placeholders with your actual registry name and resource group:

```
az acr build -r acraz204kodekloud -g rg-az204-containers -t webapp .
```

This command builds your container image using the Dockerfile in the current directory and automatically pushes it to your specified Azure Container Registry.

2.  Monitor the terminal output to confirm that both the build and push stages complete successfully. You should see messages confirming that each step was successful, along with details about the image layers and build duration.

Example output:

```
2024/09/14 16:16:50 Step ID: build marked as successful (elapsed time in seconds: 38.975983)
2024/09/14 16:16:51 Step ID: push marked as successful (elapsed time in seconds: 9.423809)
2024/09/14 16:16:51 The following dependencies were found:
  registry: acraz204kodekloud.azurecr.io
  repository: webapp
  tag: sha256:2f44bd0f2c9d2303a4cd1c15b7bf489649e01718e21
...
Run ID: ca2 was successful after 52s
```

3.  To verify the published image, you can pull it from your registry using the following command:

```
docker pull acraz204kodekloud.azurecr.io/webapp:v1
```

This command retrieves the version one (`v1`) of your image from the registry.

> [!important]
> **Verification**
>
> Always verify your built image in the Azure portal or via CLI to ensure successful deployment.

---

## Conclusion

In this article, we demonstrated how to build a containerized application using a Dockerfile, leverage Azure Container Registry Tasks to automate building and testing, and push the container image to the Azure Container Registry for further deployment. Next, we will cover deploying container images using Azure Container Instances to run your containerized application in a live environment.

Happy containerizing!

---

For additional details and Azure best practices, refer to the [Azure Documentation](https://docs.microsoft.com/azure/container-registry/) and enhance your container strategy with ACR Tasks.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/21b47c50-0b14-4f95-b6ee-a219b7b1993f/lesson/a7b2452a-9bb5-4130-9a17-9f5382f5c1f5)**
>
> Watch video content
