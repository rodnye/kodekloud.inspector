# Discovering Azure Container Registry - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Managing-Container-Images-in-Azure-Container-Registry/Discovering-Azure-Container-Registry)

---

## Table of Contents

- Discovering Azure Container Registry
  - Key Use Cases
  - Service Tiers
  - Supported Image Types and Artifacts
  - Storage Capabilities
  - Next Steps: Exploring Dockerfile Elements
  - Watch Video
    - Scalable Orchestration Systems
    - Integration with Azure Services
    - Basic Tier
    - Standard Tier
    - Premium Tier

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Managing Container Images in Azure Container Registry

# Discovering Azure Container Registry

Azure Container Registry (ACR) is a fully managed Docker registry that allows you to securely store and manage container images for both Azure deployments and other environments. It caters to a wide range of scenarios, from small-scale containerized applications to large-scale enterprise solutions.

In this lesson, you'll learn about ACR's key use cases, service tiers, supported artifact types, and robust storage capabilities.

## Key Use Cases

### Scalable Orchestration Systems

ACR seamlessly integrates with scalable orchestration platforms like Azure Kubernetes Service and Azure Container Apps. These systems manage containerized applications across clusters, enabling efficient scaling and workload distribution. This integration simplifies the management of high container volumes in dynamic environments.

### Integration with Azure Services

Deeply integrated with various Azure services, ACR is perfect for automating DevOps workflows and deploying containerized applications across multiple regions. Its tight integration within the Azure ecosystem streamlines operations, making it an excellent choice for enterprises leveraging cloud-native solutions.

![The image is an infographic about the Azure Container Registry, highlighting its use cases in scalable orchestration systems and Azure services. It describes managing containerized applications across clusters and supporting application building and running at scale.](https://kodekloud.com/kk-media/image/upload/v1752866710/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Discovering-Azure-Container-Registry/azure-container-registry-infographic.jpg)

These use cases illustrate the flexibility and strength of Azure Container Registry for a wide range of deployment scenarios—from managing container orchestration systems to integrating with broader Azure services.

## Service Tiers

ACR offers multiple service tiers designed to accommodate different needs, ranging from development and testing to high-demand production environments.

### Basic Tier

The Basic tier is targeted primarily at development and testing environments. It delivers a cost-effective solution with limited storage and throughput, ideal for small-scale operations or early-stage projects.

### Standard Tier

Designed for production workloads, the Standard tier provides enhanced performance and more storage capacity. It fits mid-sized teams and organizations needing reliable performance, though it lacks some of the advanced features available in the Premium tier.

### Premium Tier

For high-demand environments, the Premium tier offers advanced features such as geo-replication. This ensures rapid, reliable access to container images across different regions, making it suitable for global deployments where performance and redundancy are critical.

![The image illustrates the service tiers of Azure Container Registry: Basic, Standard, and Premium, each represented by different icons.](https://kodekloud.com/kk-media/image/upload/v1752866711/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Discovering-Azure-Container-Registry/azure-container-registry-tiers.jpg)

Selecting the right service tier allows you to align ACR's capabilities with your project requirements, whether you're in development, running production workloads, or managing large-scale deployments.

## Supported Image Types and Artifacts

Azure Container Registry supports a variety of image types and artifacts, ensuring versatility in managing different workloads. Key formats and features include:

- **Immutable Image Snapshots:** Images are stored as read-only snapshots, providing consistency during deployments and ensuring reliable rollouts.
- **Cross-Platform Support:** ACR supports both Linux and Windows container images, making it suitable for diverse development teams.
- **Helm Charts:** Manage Kubernetes applications efficiently with Helm charts stored directly in ACR.
- **OCI Compliance:** ACR adheres to Open Container Initiative (OCI) standards, ensuring interoperability with other tools and platforms.

![The image describes features of the Azure Container Registry, highlighting its support for Docker-compatible images, both Windows and Linux images, and storage of Helm charts and OCI-compliant images.](https://kodekloud.com/kk-media/image/upload/v1752866713/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Discovering-Azure-Container-Registry/azure-container-registry-features.jpg)

These features ensure that you have a versatile and fully compliant platform for managing a wide variety of container workloads.

## Storage Capabilities

ACR not only stores container images but also guarantees that they are secure and available when needed. Its key storage capabilities include:

- **Encryption at Rest:** All images are encrypted while stored, protecting your data from unauthorized access.
- **Geo-Redundant Storage:** Container images are replicated across multiple regions using Azure's geo-redundant storage, enhancing availability and ensuring reliability during regional outages.
- **Geo-Replication in Premium Tier:** With the Premium tier, ACR supports geo-replication, reducing latency for global teams and ensuring high availability for rapid deployments.

![The image outlines three storage capabilities: Encryption at Rest, Geo-Redundant Storage, and Geo-Replication, with brief descriptions for each.](https://kodekloud.com/kk-media/image/upload/v1752866715/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Discovering-Azure-Container-Registry/storage-capabilities-encryption-geo-redundant.jpg)

These robust storage capabilities make sure that your container images are secure and readily available whenever and wherever they are needed.

## Next Steps: Exploring Dockerfile Elements

Now that you have a comprehensive understanding of the benefits, use cases, service tiers, supported formats, and storage capabilities of Azure Container Registry, it's time to dive deeper into Dockerfile fundamentals. In the next part of our lesson, we will walk you through the elements of a Dockerfile and explain how to build container images and push them to ACR.

> [!important]
> **Note**
>
> Stay tuned for our upcoming sections where we explore the practical aspects of Dockerfile syntax and usage, ensuring smooth container image management with ACR.

Happy learning!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/21b47c50-0b14-4f95-b6ee-a219b7b1993f/lesson/bff2a88a-0b71-4358-b2c6-7ab6c93d7c12)**
>
> Watch video content
