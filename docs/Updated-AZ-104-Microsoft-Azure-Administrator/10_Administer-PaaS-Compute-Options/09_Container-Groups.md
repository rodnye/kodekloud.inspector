# Container Groups - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-PaaS-Compute-Options/Container-Groups)

---

## Table of Contents

- Container Groups
  - Deployment Options
  - Watch Video

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer PaaS Compute Options

# Container Groups

Container groups in Azure offer a unified approach to deploying and managing multiple containers as a single entity. They are especially beneficial when running sidecar containers alongside a main application or grouping multiple containers that form a logical unit of your application.

For instance, imagine a Platform as a Service (PaaS) architecture where the underlying container host is abstracted away. When you create an Azure Container Instance, Azure automatically assigns it to a container host—without requiring direct user interaction with the host. In a typical scenario, two container instances might be used: one container connects to Azure Storage for persistent storage and exposes the web application to the internet, while a second container opens port 1433 internally to facilitate communication with the web server. Together, these containers function as a cohesive unit, illustrating the fundamental concept behind container groups.

> [!important]
> **Deployment Note**
>
> Container groups cannot be created directly from the Azure portal. Instead, you must use the Azure CLI, Resource Manager templates, or a YAML file to deploy them. When you use these methods, a unique group ID is generated for the container group, and you can add additional containers to this group to make them operate as a single logical unit.

## Deployment Options

Container groups provide flexible deployment options, allowing you to deploy either a single container or multiple containers that must work together. When deploying a container group, you define the total amount of CPU and memory, which are then allocated proportionately among the containers. This ensures efficient resource utilization and smooth operation across the group.

An important aspect of container groups is their shared network namespace. All containers within a container group receive IPs from a virtual network and can communicate seamlessly over private IP addresses. This shared networking capability is especially useful in microservices architectures where different services within the same application need to interact with low latency. It simplifies resource management and streamlines the overall deployment process.

![The image illustrates the concept of container groups, showing how containers share resources, lifecycle, local network, and storage volumes on a container host. It includes elements like DNS, deployment options, resource allocation, and shared networking.](https://kodekloud.com/kk-media/image/upload/v1752884770/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Container-Groups/container-groups-resource-sharing-diagram.jpg)

Now that you have a comprehensive understanding of container groups, it's important to note the emergence of a new service: container apps. Building on the principles of container groups, container apps offer additional capabilities and further simplify the deployment of containerized applications.

For more detailed insights on Azure services, consider exploring the [Azure Documentation](https://docs.microsoft.com/en-us/azure/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/c1871647-c1ec-478a-beab-b21781cec58f/lesson/044836a8-0a33-4f7a-ae26-bf38511f847e)**
>
> Watch video content
