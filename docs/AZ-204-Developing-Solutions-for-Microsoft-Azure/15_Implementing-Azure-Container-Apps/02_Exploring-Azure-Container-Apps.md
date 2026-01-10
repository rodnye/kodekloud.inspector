# Exploring Azure Container Apps - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Implementing-Azure-Container-Apps/Exploring-Azure-Container-Apps)

---

## Table of Contents

- Exploring Azure Container Apps
  - Key Differences from Azure Container Instances
  - Container Structure and Pods
  - Working with Container Images and the Azure Portal
  - Deploying to Azure Container Apps
  - Next Steps
  - Additional Resources
  - Watch Video
    - Step 1: Create a Resource Group
    - Step 2: Create a Container Apps Environment
    - Step 3: Create the Container App

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Implementing Azure Container Apps

# Exploring Azure Container Apps

In this lesson, we explore Azure Container Apps—a robust serverless platform designed for running microservices and containerized applications. This service integrates with Azure Kubernetes Service (AKS) to deliver scalability, streamlined development, and minimal management overhead.

## Key Differences from Azure Container Instances

Azure Container Apps offers several advantages compared to Azure Container Instances by acting as an orchestrator with advanced features:

- **Dynamic Scaling with KEDA:**  
  Azure Container Apps leverages Kubernetes Event-Driven Auto Scaling (KEDA) to automatically scale applications based on CPU, memory usage, or external event triggers such as message queues.
- **Deployment to a Single Environment:**  
  All containerized applications are deployed within a secure, isolated environment, ensuring safe and reliable communication among apps.
- **Independent Service Development:**  
  Utilizing a microservices architecture, container apps can be developed, updated, and scaled independently which reduces risk and increases flexibility.
- **Native Dapr Integration:**  
  Built-in support for the Distributed Application Runtime (Dapr) simplifies microservices development with APIs for Pub/Sub messaging, service invocation, and state management, helping you construct resilient and scalable applications.

![The image describes three features of Azure Container Apps: dynamic scaling with KEDA, deployment to a single environment, and independent development and scaling of core functionalities.](https://kodekloud.com/kk-media/image/upload/v1752866609/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-Azure-Container-Apps/azure-container-apps-features.jpg)

![The image describes four features of Azure Container Apps: dynamic scaling with KEDA, deployment to a single environment, independent development and scaling, and native Dapr integration.](https://kodekloud.com/kk-media/image/upload/v1752866611/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-Azure-Container-Apps/azure-container-apps-features-2.jpg)

## Container Structure and Pods

Azure Container Apps uses scalable architectures where containers are grouped into pods—logical units in Kubernetes that share resources and network namespaces. A common design pattern is the sidecar model, which adds auxiliary functionalities like logging, monitoring, and inter-service communication to support the main container service.

![The image illustrates the structure of containers in Azure Container Apps, showing two container apps, each with two revisions and replicas containing containers.](https://kodekloud.com/kk-media/image/upload/v1752866612/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-Azure-Container-Apps/azure-container-apps-structure-diagram.jpg)

## Working with Container Images and the Azure Portal

Azure Container Apps enables secure deployment of container images stored in private registries such as Azure Container Registry (ACR). By configuring the proper credentials, you ensure that sensitive container images remain protected during the deployment process.

For example, consider the deployment of the Airport Codes API. This API reads a JSON file and has been containerized using the following Dockerfile:

```
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["AirportCodeAPI.csproj", "./"]
RUN dotnet restore "./AirportCodeAPI.csproj"
COPY . .
WORKDIR "/src/"
RUN dotnet build "AirportCodeAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "AirportCodeAPI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
```

A snippet from the API code is shown below:

```
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using AirportCodeAPI.Models;

namespace AirportCodeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AirportCodesController : ControllerBase
    {
        private readonly string _jsonFilePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "airports.json");
        // Additional controller code...
    }
}
```

The build output confirms the successful creation of the image:

```
2024/09/15 20:23:12
- image:
    registry: acraz204kodekloud.azure.io
    repository: airportcodes
    tag: v1
    digest: sha256:2f9367cb9c6b266246a44fd6b6c6781e871c43e53dc63847b7c53b9
  runtime-dependency:
    registry: mcr.microsoft.com
    tag: "8.0"
    digest: sha256:a4913d84b919bd83d61b0c2fa1f9d25d90279938e1c4d
  buildtime-dependency:
    registry: mcr.microsoft.com
    tag: "8.0"
    digest: sha256:1c451c88cad4b8c372ea49058a3900a2a1c8e364c6
  git: {}
Run ID: ca3 was successful after 44s
```

The API utilizes a JSON file to provide airport codes, as shown below:

```
[
  {"code":"CPB","airport_name":"Capurganá Airport","country_code":"Russia"},
  {"code":"KRG","airport_name":"Karasabai Airport","country_code":"Guatemala"},
  {"code":"BUF","airport_name":"Buffalo Niagara International Airport","country_code":"Brazil"},
  {"code":"BCN","airport_name":"Bacnonoa Airport","country_code":"Indonesia"},
  {"code":"ISG","airport_name":"Isai Airport","country_code":"Malaysia"},
  {"code":"GBL","airport_name":"South Goulburn Is Airport","country_code":"China"},
  {"code":"JFK","airport_name":"John F. Kennedy International Airport","country_code":"Brazil"},
  {"code":"SUL","airport_name":"Sui Airport","country_code":"Ukraine"},
  {"code":"MRY","airport_name":"Marin County Airport - Gnoss Field","country_code":"Argentina"},
  {"code":"LTG","airport_name":"Langatong Airport","country_code":"France"},
  {"code":"MTH","airport_name":"The Florida Keys Marathon Airport","country_code":"Brazil"},
  {"code":"TEO","airport_name":"Tepeo Airport","country_code":"Vietnam"},
  {"code":"KLK","airport_name":"Kalskag Airport","country_code":"Brazil"},
  {"code":"PHF","airport_name":"Phifer Airfield","country_code":"Brazil"},
  {"code":"ACA","airport_name":"General Juan N Alvarez International Airport","country_code":"Russia"},
  {"code":"IBZ","airport_name":"Ibiza Airport","country_code":"Kazakhstan"}
]
```

Additional run logs provide further confirmation of the build:

```
2024/09/15 20:23:12
- image:
    registry: acrza3204kodekoud.azurecr.io
    repository: airportcodes
    tag: v1
    digest: sha256:9f2367b9cd6bc266a434fbc376cb6d16c781c2f3d3c6b8c9b7e4c83a36d36d
runtime-dependency:
    registry: mcr.microsoft.com
    repository: dotnet/aspnet
    tag: "8.0"
    digest: sha256:da256:1916978842f8b84b8b6c2fa1d25d90279938e1c4d
buildid=dependency:
    registry: mcr.microsoft.com
    repository: dotnet/sdk
    tag: "8.0"
    digest: sha256:16f4c56f88cadf37e2a496e63900a21c8e364c6
git: {}
Run ID: ca3 was successful after 44s
```

## Deploying to Azure Container Apps

Next, you'll deploy the web API to Azure Container Apps using the Azure CLI. While the Azure Portal provides a user-friendly, click-based experience, the Azure CLI offers more control over your deployment.

### Step 1: Create a Resource Group

Create a resource group to consolidate your Azure resources:

```
az group create -n rg-az204-containerapps -l eastus
```

The output confirms that the resource group has been created successfully.

### Step 2: Create a Container Apps Environment

Establish a secure, isolated environment in which your container apps will run:

```
az containerapp env create -g rg-az204-containerapps -n airportapienvironment --location eastus
```

### Step 3: Create the Container App

Deploy the container app using your published image with the following command:

```
az containerapp create --name airportcodeapiapp -g rg-az204-containerapps --environment airportapienvironment --image acraz204kodekloud.azurecr.io/airportcodes:v1 --target-port 80 --ingress external --registry-server acraz204kodekloud.azurecr.io --registry-username acraz204kodekloud --registry-password 'Maz8091IXY6J?0+Giu3o4eJamKx&SnX68n0' --cpu 0.5 --memory 1.0
```

This command sets the target port to 80 and exposes the application externally. The registry credentials securely pull the container image from the ACR.

After running the command, verify the container app’s status in the Azure Portal, where you will see details such as the app name, size, and URL for accessing your application.

![The image shows a Microsoft Azure portal interface for managing a container app named "airportcodeapiapp," displaying its properties and container details.](https://kodekloud.com/kk-media/image/upload/v1752866614/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-Azure-Container-Apps/azure-portal-airportcodeapiapp-container-details.jpg)

> [!important]
> **Tip**
>
> If the target port does not match the port that your application is listening on (for example, if your project uses port 8080), update your application's configuration accordingly. Alternatively, create a second container app with the correct port mapping.

Create a second container app as follows:

```
az containerapp create --name airportcodeapiapp2 -g rg-az204-containerapps --environment airportapienvironment --image acraz204kodekloud.azurecr.io/airportcodes:v1 --target-port 80 --ingress external --registry-server acraz204kodekloud.azurecr.io --registry-username acraz204kodekloud --registry-password 'Maz089IIXYjE0+Iu3I4oN2S1rqnKxS8n60xj8C+ACRCPDYnH' --cpu 0.5 --memory 1.0Gi
```

After deployment, verify that the container app revisions and replicas are running correctly in the Azure Portal. Access the application URL with the appropriate API path (e.g., /api/airport-codes) to display the list of airport codes:

```
[
  {"code":"UNN","airport_name":"Yujin Airport","country_code":"China"},
  {"code":"YGR","airport_name":"Îles-de-la-Madeleine Airport","country_code":"Democratic Republic of the Congo"},
  {"code":"PRM","airport_name":"Pihare Airport","country_code":"Uzbekistan"},
  {"code":"YIW","airport_name":"Yiwu Airport","country_code":"China"},
  {"code":"ILE","airport_name":"Gainesville Municipal Airport","country_code":"Indonesia"},
  {"code":"GLE","airport_name":"Gainesville Municipal Airport","country_code":"Poland"},
  {"code":"ORY","airport_name":"Orly Airport","country_code":"France"},
  {"code":"FTX","airport_name":"Maltsevo Airport","country_code":"Russia"},
  {"code":"IRI","airport_name":"Iri Airport","country_code":"Serbia"},
  {"code":"VYI","airport_name":"Aupaluk Airport","country_code":"Yemen"}
  // Additional entries...
]
```

## Next Steps

Now that your container app is successfully deployed, consider implementing authentication and authorization to secure your API and ensure that only authorized users have access.

By following these steps, you have learned how to build a container image, push it to Azure Container Registry, and deploy it as an Azure Container App using the Azure CLI. Enjoy building resilient and scalable applications on Azure Container Apps!

## Additional Resources

- [Azure Container Apps Documentation](https://learn.microsoft.com/azure/container-apps/)
- [Azure CLI Documentation](https://learn.microsoft.com/cli/azure/containerapp)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/8ecdad92-d6a0-4292-9798-efa24d97f567/lesson/f54b04d1-208c-4ca3-be72-aee3d0abe032)**
>
> Watch video content
