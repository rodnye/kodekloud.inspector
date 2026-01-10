# Exploring Azure Container Instances - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Running-Container-Images-in-Azure-Container-Instances/Exploring-Azure-Container-Instances)

---

## Table of Contents

- Exploring Azure Container Instances
  - Key Features of Azure Container Instances
  - Understanding Container Groups
  - Creating an Azure Container Instance via the Azure Portal
  - Next Steps: Restart Policies and Environment Variables
  - Watch Video

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Running Container Images in Azure Container Instances

# Exploring Azure Container Instances

In this guide, we'll explore the key features of Azure Container Instances (ACI) and learn how to deploy containerized applications without the overhead of managing virtual machines. ACI offers rapid startup times, flexible resource allocation, and robust networking and security options to streamline your cloud container deployments.

## Key Features of Azure Container Instances

Azure Container Instances provides a variety of benefits that can enhance your containerized application deployments:

1.  **Fast Startup Time**  
    With ACI, containers can start in seconds. Since there's no need to provision or manage VMs, your applications benefit from quick scalability and immediate responsiveness.
2.  **Public IP Connectivity and DNS**  
    ACI assigns containers direct public IP addresses and fully qualified domain names, ensuring that your applications are easily accessible from the internet.
3.  **Hypervisor-Level Security**  
    Containers run with security isolation equivalent to that of virtual machines, which keeps your applications secure even in multi-tenant environments.
4.  **Customizable Resource Sizes**  
    You can specify exact CPU and memory requirements for each container. This feature prevents resource over-provisioning and promotes efficient usage.
5.  **Persistent Storage**  
    By mounting Azure File Shares directly to your containers, ACI provides persistent storage solutions where data remains intact even if containers restart.
6.  **Support for Linux and Windows Containers**  
    Manage both Linux and Windows containers using a single API, simplifying multi-platform application deployments.
7.  **Co-scheduled Container Groups**  
    Container groups allow containers to share lifecycle and resources such as CPU, memory, and local networks. This is particularly useful when pairing an application container with a sidecar container managing supplementary tasks like logging or monitoring.
8.  **Virtual Network Integration**  
    Deploying ACI into an Azure Virtual Network gives you tighter control over network configurations and enhances security by integrating with other Azure services.

> [!important]
> **Note**
>
> Azure Container Instances is ideal for cloud-native development, offering scalability, security, and flexibility in a managed environment.

## Understanding Container Groups

Container groups are a fundamental element of Azure Container Instances. They enable you to logically group containers that share resources like CPU, memory, networking, and storage volumes, and that have a synchronized lifecycle. For instance, a typical container group might include:

- An application container that exposes a DNS label to the internet.
- A sidecar container that handles internal processes or logging.

Containers within a group share a common IP address and port namespace, facilitating seamless inter-container communication. Deployment of multi-container groups can be automated using ARM templates or YAML files, aligning with modern infrastructure-as-code practices. Resource allocation (CPU, memory, GPUs) is defined on a per-container basis, ensuring that each container is provisioned with the necessary resources.

![The image illustrates Azure Container Instances and Container Groups, showing DNS name labels, exposed ports, and mounted paths for containers. It includes visual elements representing container and network concepts.](https://kodekloud.com/kk-media/image/upload/v1752866726/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-Azure-Container-Instances/azure-container-instances-groups-diagram.jpg)

## Creating an Azure Container Instance via the Azure Portal

The following steps illustrate how to create an Azure Container Instance using the Azure Portal:

1.  Open the Azure Portal and search for "Container Instances."
2.  Click on "Create" to initiate a new container instance.
3.  Select an existing resource group (e.g., one designated for containers) and provide a unique name for your instance (for example, ACI01) since the DNS label must be unique.
4.  Choose your desired region (e.g., East US).

![The image shows the Microsoft Azure portal interface for creating a container instance, with fields for project and container details such as subscription, resource group, container name, region, and image source.](https://kodekloud.com/kk-media/image/upload/v1752866728/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-Azure-Container-Instances/azure-portal-container-instance-creation.jpg)

5.  Optionally, select availability zones if needed and choose a SKU. Options include a standard SKU or configuring for confidential computing, which provides in-memory encryption and hardware-level isolation. For this demonstration, the standard SKU is used.
6.  Select your image source. You may use a kickstart image like the hello world container, or choose an image from your Container Registry.
7.  Configure resource sizes, specifying GPU, memory, and CPU cores as required. Using default values is acceptable for a simple demonstration.
8.  Under the networking section, decide between public or private access. You can also set up a DNS label and specify which ports the container should expose.
9.  Define the restart policy. By default, ACI is set to restart on failure—a topic that will be discussed in greater depth in a later section.
10. Add any necessary environment variables or startup scripts.
11. Configure key management by choosing between Microsoft-managed keys and customer-managed keys.

After configuring all the settings, click "Create" to deploy the container instance. The instance typically comes online within 30 seconds.

![The image shows a Microsoft Azure portal page for creating a container instance, displaying configuration details such as subscription, resource group, region, and container specifications.](https://kodekloud.com/kk-media/image/upload/v1752866729/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-Azure-Container-Instances/azure-portal-container-instance-creation-2.jpg)

Once the deployment is complete, click "Go to resource" to view your container instance.

![The image shows the Microsoft Azure portal interface displaying an overview of a container instance named "aci-01," with details such as resource group, status, location, and performance metrics like CPU, memory, and network usage.](https://kodekloud.com/kk-media/image/upload/v1752866731/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-Azure-Container-Instances/azure-portal-container-instance-aci-01.jpg)

You can then copy the public IP address provided by the instance, enter it into your browser, and verify that the “Welcome to Azure Container Instances” page is displayed—confirming that your container is up and running.

## Next Steps: Restart Policies and Environment Variables

In our next section, we will explore how to configure restart policies and environment variables using the Azure CLI. This will include deploying containers with commands that define specific restart behaviors and incorporate startup scripts.

This comprehensive guide has provided an understanding of Azure Container Instances' fundamental features and demonstrated how to deploy them via the Azure Portal. Leveraging these techniques enables rapid development and deployment of containerized applications in the cloud, empowering your cloud-native projects.

For additional resources, consider exploring:

- [Azure Container Instances Documentation](https://learn.microsoft.com/azure/container-instances/)
- [Azure Virtual Network Overview](https://learn.microsoft.com/azure/virtual-network/)
- [Infrastructure as Code with ARM Templates](https://learn.microsoft.com/azure/azure-resource-manager/templates/overview)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/67965add-95a2-4ec5-9b09-251429678a13/lesson/38da7858-c0fa-4eaf-8936-1c858057430e)**
>
> Watch video content
