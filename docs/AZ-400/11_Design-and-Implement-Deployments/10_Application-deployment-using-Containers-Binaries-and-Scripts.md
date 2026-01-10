# Application deployment using Containers Binaries and Scripts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Design-and-Implement-Deployments/Application-deployment-using-Containers-Binaries-and-Scripts)

---

## Table of Contents

- Application deployment using Containers Binaries and Scripts
  - What Is Application Deployment in Azure?
  - Deploying with Containers
  - Deploying with Binaries
  - Scripted Deployments
  - Links and References
  - Watch Video
    - Deployment Workflow
    - Key Benefits
    - Azure Container Services
    - Azure Kubernetes Service (AKS)
    - Typical Binary Deployment Flow
    - App Service Deployment Methods
    - Sample Azure CLI Deployment Script

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Design and Implement Deployments

# Application deployment using Containers Binaries and Scripts

In this guide, you’ll learn three primary methods for deploying applications in Azure—containers, binaries, and scripts. Whether you’re preparing for the AZ-400 exam or optimizing production pipelines, understanding these strategies ensures reliable, repeatable deployments.

## What Is Application Deployment in Azure?

Application deployment means packaging and configuring your code so it runs reliably in Azure. Core tasks include:

- Managing dependencies
- Configuring environment settings
- Integrating with services like networking, databases, and monitoring

### Deployment Workflow

Every deployment pipeline typically follows three stages:

1.  **Build**  
    Compile source code, bundle libraries, and generate artifacts.
2.  **Test**  
    Execute automated tests to validate functionality and catch regressions.
3.  **Install**  
    Deploy artifacts to your Azure environment (e.g., App Service, Kubernetes, VMs).

![The image is a flowchart titled "Application Deployment in Azure – Introduction," showing three steps: "Build code," "Test," and "Install on server."](https://kodekloud.com/kk-media/image/upload/v1752867603/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Application-deployment-using-Containers-Binaries-and-Scripts/application-deployment-azure-flowchart.jpg)

Understanding this three-step flow is essential for both exam success and real-world delivery.

## Deploying with Containers

Containers package your application code, dependencies, and configuration into lightweight, portable units. This approach guarantees consistent behavior across every environment.

### Key Benefits

- **Consistency Across Environments**  
  Identical runtime from local dev to production.
- **Scalability**  
  Spin up multiple container instances on demand.
- **Isolation**  
  Processes run in separate namespaces, reducing conflicts.

![The image is a slide titled "Deploying Applications With Containers," highlighting three benefits: consistency across environments, scalability, and isolation.](https://kodekloud.com/kk-media/image/upload/v1752867604/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Application-deployment-using-Containers-Binaries-and-Scripts/deploying-applications-containers-benefits.jpg)

### Azure Container Services

Azure offers two main container hosting options:

| Service                         | Description                                           | Ideal Scenario                                  |
| ------------------------------- | ----------------------------------------------------- | ----------------------------------------------- |
| Azure Kubernetes Service (AKS)  | Managed Kubernetes cluster for advanced orchestration | Production microservices with high availability |
| Azure Container Instances (ACI) | Serverless containers without VM management           | On-demand tasks, dev/test environments          |

![The image illustrates two Azure services for managing and deploying containers: Azure Kubernetes Service (AKS) and Azure Container Instances (ACI).](https://kodekloud.com/kk-media/image/upload/v1752867605/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Application-deployment-using-Containers-Binaries-and-Scripts/azure-kubernetes-service-container-instances.jpg)

> [!important]
> **Note**
>
> Use ACI for simple, burstable workloads and prototyping. Choose AKS for production-grade orchestration, autoscaling, and complex networking.

### Azure Kubernetes Service (AKS)

AKS simplifies Kubernetes deployment in Azure. Key features include:

- **Integrated CI/CD**  
  Connect with [Azure DevOps](https://azure.microsoft.com/services/devops/) or GitHub Actions for automated pipelines.
- **Security**  
  Leverage network policies, Azure Active Directory integration, and role-based access control.
- **Monitoring**  
  Built-in support for [Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/) and [Log Analytics](https://learn.microsoft.com/azure/azure-monitor/logs/).

![The image is a slide titled "Container Orchestration With Azure Kubernetes Service," featuring three sections labeled Integrated CI/CD, Security, and Monitoring. Each section is numbered and has a corresponding icon.](https://kodekloud.com/kk-media/image/upload/v1752867606/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Application-deployment-using-Containers-Binaries-and-Scripts/container-orchestration-azure-kubernetes-slide.jpg)

Mastering AKS fundamentals is critical for the [AZ-400 exam](https://learn.microsoft.com/certifications/exams/az-400) and for running resilient container workloads.

## Deploying with Binaries

Binaries are compiled executables that run directly on the host OS. Azure App Service abstracts infrastructure so you can deploy these executables as a Platform-as-a-Service (PaaS).

### Typical Binary Deployment Flow

1.  Developer commits code to a Git repository.
2.  CI pipeline compiles source into binaries.
3.  Deployment pipeline pushes binaries to Azure App Service.
4.  App Service host runs the application.

![The image illustrates a process flow for deploying applications with binaries, showing a sequence from a user to a Git repository, then to a deployment tool, and finally to a service plan and app service.](https://kodekloud.com/kk-media/image/upload/v1752867607/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Application-deployment-using-Containers-Binaries-and-Scripts/application-deployment-process-flow-diagram.jpg)

### App Service Deployment Methods

| Method           | Description                                               |
| ---------------- | --------------------------------------------------------- |
| FTP / Web Deploy | Upload binaries or web projects directly to the server.   |
| Docker Container | Host container images on App Service for PaaS simplicity. |

> [!important]
> **Note**
>
> For Linux-based executables, consider Docker deployment on App Service to leverage container isolation and portability.

## Scripted Deployments

Automating Azure resource provisioning and application deployment with scripts guarantees repeatable, versioned environments.

![The image is a slide titled "Scripted Deployments in Azure Pipelines," featuring an icon of a script file and a description stating that scripts are sets of commands for deploying applications.](https://kodekloud.com/kk-media/image/upload/v1752867608/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Application-deployment-using-Containers-Binaries-and-Scripts/scripted-deployments-azure-pipelines.jpg)

Azure supports two primary scripting tools:

- [Azure PowerShell](https://learn.microsoft.com/powershell/azure/)
- [Azure CLI](https://learn.microsoft.com/cli/azure/)

Both integrate seamlessly into CI/CD pipelines for full infrastructure-as-code workflows.

### Sample Azure CLI Deployment Script

```
#!/usr/bin/env bash
# Log in to Azure
az login


# Variables
RG_NAME="MyResourceGroup"
LOCATION="eastus"
PLAN_NAME="MyAppServicePlan"
APP_NAME="MyWebApp"


# Create a resource group
az group create --name $RG_NAME --location $LOCATION


# Create an App Service plan
az appservice plan create \
  --name $PLAN_NAME \
  --resource-group $RG_NAME \
  --sku S1 \
  --is-linux


# Create a Web App
az webapp create \
  --resource-group $RG_NAME \
  --plan $PLAN_NAME \
  --name $APP_NAME \
  --runtime "DOTNET|6.0"


# Deploy code (assuming a local folder named 'publish')
az webapp deploy \
  --resource-group $RG_NAME \
  --name $APP_NAME \
  --src-path "./publish"
```

> [!important]
> **Warning**
>
> Store your service principal credentials or managed identity settings securely. Avoid hardcoding secrets in scripts.

Understanding script-based deployments is vital for automating infrastructure and passing the [AZ-400 exam](https://learn.microsoft.com/certifications/exams/az-400).

## Links and References

- [AZ-400: Designing and Implementing Microsoft DevOps Solutions](https://learn.microsoft.com/certifications/exams/az-400)
- [Azure Kubernetes Service (AKS)](https://learn.microsoft.com/azure/aks/)
- [Azure Container Instances (ACI)](https://learn.microsoft.com/azure/container-instances/)
- [Azure App Service](https://learn.microsoft.com/azure/app-service/)
- [Azure DevOps Services](https://azure.microsoft.com/services/devops/)
- [Azure CLI Documentation](https://learn.microsoft.com/cli/azure/)
- [Azure PowerShell Documentation](https://learn.microsoft.com/powershell/azure/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/07c0911f-05cf-4ab9-a7cd-b6a2f1f44f5c/lesson/8efa4ba0-35b3-4cb8-96b9-07085d09101c)**
>
> Watch video content
