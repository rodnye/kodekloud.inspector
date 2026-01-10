# Azure Container Services - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ900-Microsoft-Azure-Fundamentals/Compute-and-Networking/Azure-Container-Services)

---

## Table of Contents

- Azure Container Services
  - Virtual Machines vs. Containers
  - Overview of Azure Container Services
  - Azure Container Instances (ACI)
  - Azure Container Apps
  - Azure Kubernetes Service (AKS)
  - Demo: Creating a Container Instance in Azure Portal
  - Serverless Computing with Azure Functions
  - Watch Video
    - Key Features of ACI
    - Benefits and Use Cases
    - Key Features of Container Apps
    - Benefits and Use Cases
    - Key Features of AKS
    - Benefits and Use Cases

---

## Content

AZ900: Microsoft Azure Fundamentals

Compute and Networking

# Azure Container Services

Azure Container Services offers multiple solutions for deploying containerized applications on Azure. In this guide, we compare Virtual Machines and containers, then explore three Azure container offerings: Azure Container Instances, Azure Container Apps, and Azure Kubernetes Service.

## Virtual Machines vs. Containers

Virtual Machines (VMs) are the traditional approach where a physical server—whether located in a data center, on Azure, or AWS—runs a host operating system (Windows or Linux). A hypervisor (such as VMware, Hyper-V, or Oracle VirtualBox) then creates and manages VMs. Each VM encapsulates a full guest operating system, alongside its application, binaries, and libraries.

Imagine each VM as a standalone house that includes all infrastructure elements (plumbing, electrical, etc.), which can be resource-intensive when duplicated. In contrast, containers offer an efficient alternative by sharing the host operating system while relying on a container runtime (most commonly Docker) instead of a hypervisor. A container packages only the application and its essential libraries, resulting in a small footprint. Think of containers as stalls in a food court sharing common utilities—this makes them lightweight, quick to deploy, and resource-efficient compared to VMs.

![The image compares virtual machines and containers, illustrating their components and layers, including apps, libraries, guest OS, hypervisor, and container runtime.](https://kodekloud.com/kk-media/image/upload/v1752868261/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Container-Services/vm-vs-containers-comparison-diagram.jpg)

## Overview of Azure Container Services

Azure Container Services provide a streamlined platform that abstracts away the underlying operating system and server maintenance tasks. Instead of provisioning and managing VMs, patching the host OS, or installing a container runtime, Azure’s Platform as a Service (PaaS) environment lets you focus exclusively on deploying your containerized applications.

In a traditional setup, deploying containers involves provisioning a server, installing an OS, adding a container runtime, and then starting the containers. With Azure Container Services, these steps are managed by Microsoft, resulting in a faster and more efficient deployment process.

![The image is about Azure Container Services, highlighting features such as a lightweight virtual environment, no OS management required, and being responsive and adaptive. It includes a graphic of purple containers.](https://kodekloud.com/kk-media/image/upload/v1752868261/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Container-Services/azure-container-services-graphic.jpg)

Azure offers multiple container services tailored to varying needs:

- **Azure Container Instances (ACI)**
- **Azure Container Apps**
- **Azure Kubernetes Service (AKS)**

---

## Azure Container Instances (ACI)

Azure Container Instances is a PaaS solution that lets you run containers in the cloud with minimal management overhead. Microsoft handles server and operating system maintenance so that you can deploy containers rapidly without managing underlying infrastructure.

With ACI, you eliminate the need for provisioning servers, configuring the host OS, or installing container runtimes. Deployment times can drop dramatically—from two to three minutes with traditional VMs to around 30 seconds with ACI.

![The image is an illustration about Azure Container Instances, highlighting features such as Azure PaaS container service, no VM management needed, and fast and simple deployment.](https://kodekloud.com/kk-media/image/upload/v1752868262/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Container-Services/azure-container-instances-illustration.jpg)

### Key Features of ACI

- **Ease of Deployment:** Launch containers with a single command; no complex orchestration is required.
- **No VM Management:** Enjoy a fully managed service without provisioning or maintaining Virtual Machines.
- **Flexible Sizing:** Allocate the precise amount of CPU and memory to match your container’s resource demands.

![The image highlights three key features of Azure Container Instances: ease of deployment, no VM management, and flexible sizing.](https://kodekloud.com/kk-media/image/upload/v1752868263/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Container-Services/azure-container-instances-features.jpg)

### Benefits and Use Cases

ACI offers simplicity, speed, and cost-efficiency—pay only for the resources you use. Its container isolation enhances security, making it ideal for simple applications, task automation, batch jobs, and scenarios that demand rapid iterations and deployment.

![The image illustrates use cases for Azure Container Instances, highlighting their suitability for simple applications, fast execution, and task automation. It includes icons of a computer monitor and a smartphone.](https://kodekloud.com/kk-media/image/upload/v1752868265/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Container-Services/azure-container-instances-use-cases.jpg)

---

## Azure Container Apps

Azure Container Apps builds upon the simplicity of ACI by adding orchestration capabilities for modern applications and microservices. This PaaS offering provides built-in scaling, service discovery, and traffic routing without the burden of managing infrastructure.

While ACI is perfect for running individual containers, Azure Container Apps enables management of multiple interacting containers, ideal for microservices architectures where applications are decomposed into individual services.

![The image is about Azure Container Apps, highlighting features such as PaaS container deployment, scalable modern apps, and microservices support. It includes a logo and a list of these features.](https://kodekloud.com/kk-media/image/upload/v1752868266/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Container-Services/azure-container-apps-features.jpg)

### Key Features of Container Apps

- **Scalability:** Automatically adjust to workload demands, adapting dynamically as user traffic varies.
- **Built-In Orchestration:** Benefit from integrated service discovery and routing, making it an excellent choice for microservices.
- **CI/CD Integration:** Seamlessly integrate with continuous integration and delivery pipelines to accelerate development.

### Benefits and Use Cases

Azure Container Apps simplifies management and enhances scalability, allowing you to concentrate on building your code. This solution is cost-effective as you only pay for what you use, making it ideal for modern web applications, background processing tasks, and event-driven architectures.

![The image outlines the benefits of Azure Container Apps, highlighting simplified management, scalability and flexibility, and cost-effectiveness.](https://kodekloud.com/kk-media/image/upload/v1752868267/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Container-Services/azure-container-apps-benefits-outline.jpg)

![The image is a slide titled "Azure Container Apps – Use Cases," featuring icons of a computer and a smartphone, with three points highlighting its benefits: ideal for modern apps, offers scalability and flexibility, and supports web apps and event-driven architectures.](https://kodekloud.com/kk-media/image/upload/v1752868269/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Container-Services/azure-container-apps-use-cases.jpg)

---

## Azure Kubernetes Service (AKS)

Azure Kubernetes Service (AKS) is designed for scenarios that require advanced orchestration and multi-container management. Leveraging Kubernetes—an open-source system for automating containerized application deployments—AKS acts as the conductor of your container ecosystem, ensuring seamless coordination and scaling.

### Key Features of AKS

- **Automated Kubernetes Management:** Offload the complexity of running Kubernetes by automating operational tasks, allowing you to focus on application development.
- **Integrated Developer Tools:** Enjoy seamless integration with Azure DevOps and other platforms to support CI/CD pipelines.
- **Advanced Networking:** Utilize enhanced networking features designed for high performance and scalability.

![The image highlights three key features of Azure Kubernetes Service: Automated Kubernetes Management, Integrated Developer Tools, and Advanced Networking.](https://kodekloud.com/kk-media/image/upload/v1752868270/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Container-Services/azure-kubernetes-service-features.jpg)

### Benefits and Use Cases

AKS provides simplified deployment, advanced scaling, and robust security with built-in Azure compliance. Its powerful orchestration capabilities make it an excellent fit for high-availability applications, complex microservices architectures, and enterprises requiring rapid scaling and secure operations.

![The image illustrates use cases for Azure Kubernetes Service, highlighting high-availability applications, scalable microservices, and versatile architecture support, alongside icons of a monitor and a smartphone.](https://kodekloud.com/kk-media/image/upload/v1752868271/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Container-Services/azure-kubernetes-service-use-cases.jpg)

---

## Demo: Creating a Container Instance in Azure Portal

Follow this demo to deploy an Azure Container Instance using the Azure Portal.

1.  **Navigate to the Azure Portal:**  
    Use the search bar to enter "Container" to view services like Container Apps and Container Instances.
2.  **Create a Container Instance:**  
    Click on **Container Instances** and select **Create**.
3.  **Resource Group:**  
    Create a new resource group, for example, "AZ-900 Azure Container Instances Resource Group", and select a region (e.g., East US). Keep the SKU as Standard.
4.  **Image Source:**  
    Choose your desired container image. You may pick from available Kickstart images or supply an image URL from your own registry. In this demo, the NGINX image is used from the Kickstart options.

![The image shows the "Create container instance" page on Microsoft Azure, where users can configure project and container details such as subscription, resource group, container name, region, and image source.](https://kodekloud.com/kk-media/image/upload/v1752868272/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Container-Services/create-container-instance-azure.jpg)

5.  **Deployment:**  
    Once the details are configured, click **Create**. Azure will validate the settings and provision the instance—much faster than traditional VM deployments.

![The image shows a Microsoft Azure portal page for creating a container instance, displaying configuration details such as subscription, resource group, region, and container specifications.](https://kodekloud.com/kk-media/image/upload/v1752868274/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Container-Services/azure-portal-container-instance-setup.jpg)

6.  **Accessing the Container:**  
    When deployment is complete, navigate to the resource page to locate the container instance’s public IP address. Copy this IP, paste it into your browser, and you should see the default NGINX welcome page—confirming successful container operation.

![The image shows a Microsoft Azure portal interface displaying details of a container instance named "az900-aci-demo," including its status, IP address, and resource metrics like CPU and memory usage.](https://kodekloud.com/kk-media/image/upload/v1752868275/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Container-Services/azure-portal-container-instance-details.jpg)

> [!important]
> **Quick Tip**
>
> Ensure your container image is properly configured and accessible from your chosen registry before starting the deployment.

---

## Serverless Computing with Azure Functions

Azure Functions allows you to run code on demand without provisioning or managing servers. This serverless computing model streamlines application development, enabling you to focus exclusively on writing your code while Azure handles the infrastructure.

This concludes our detailed exploration of Azure Container Services. We compared Virtual Machines and containers, and highlighted how Azure Container Instances, Container Apps, and Azure Kubernetes Service cater to different application needs in a modern cloud environment.

For further reading on containerization and cloud deployment strategies, consider exploring [Azure Documentation](https://docs.microsoft.com/azure) and [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az900-microsoft-azure-fundamentals/module/8eca3741-67ac-4ee2-8439-aa23c16d33dd/lesson/11e9ab1f-3168-4b2a-a7e3-cdc848e80a67)**
>
> Watch video content
