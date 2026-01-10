# Azure Kubernetes Service storage - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Container-Security/Azure-Kubernetes-Service-storage)

---

## Table of Contents

- Azure Kubernetes Service storage
  - Architecture Overview
  - Persistent Storage Backend Options
  - Configuring Persistent Storage in AKS
  - Conclusion
  - Watch Video

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Container Security

# Azure Kubernetes Service storage

Container storage in Azure Kubernetes Service (AKS) is ephemeral by default. This means that when a container is deleted, its associated storage is also removed. However, many applications require data persistence beyond the lifecycle of individual containers. In AKS, native Azure storage solutions—such as Managed Disks and Azure Files—can be leveraged to provide persistent storage with robust security features.

> [!important]
> **Key Information**
>
> Understanding persistent storage in AKS is crucial for managing stateful applications effectively. This article explains how persistent storage is integrated and managed within an AKS cluster.

## Architecture Overview

An AKS cluster is composed of two major components:

1.  **Azure Managed Control Plane**  
    The control plane hosts the API server, a central component that manages the cluster by orchestrating communication between various components. It handles tasks such as provisioning, scaling, and managing the lifecycle of storage resources.
2.  **Customer Managed Nodes**  
    These nodes run your application workloads (e.g., pods). When pods require persistent data storage, they make a formal request using a Persistent Volume Claim (PVC). This request is processed by the API server to allocate an appropriate Persistent Volume (PV) that maps the storage request to an actual Azure storage resource.

The following diagram illustrates the interaction between the control plane, managed nodes, and the storage options provided by Azure:

![The image is a diagram illustrating Azure Kubernetes Service (AKS) storage architecture, showing the interaction between Azure managed nodes, customer managed nodes, and storage options like Azure managed disks and Azure files. It includes components such as the API server, persistent volume, and persistent volume claim.](https://kodekloud.com/kk-media/image/upload/v1752881743/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Azure-Kubernetes-Service-storage/aks-storage-architecture-diagram.jpg)

## Persistent Storage Backend Options

At the lower part of the architecture diagram, two primary Azure storage backend options are highlighted:

- **Azure Managed Disk Premium**  
  Positioned on the left in the diagram, this high-performance storage solution is ideal for data-intensive operations. It offers fast read/write capabilities along with robust security features, including storage service encryption.
- **Azure Files**  
  Located on the right in the diagram, Azure Files provides shared storage suitable for applications that require shared content or configuration data. Like Managed Disks, Azure Files ensures comprehensive security when utilized as persistent storage.

## Configuring Persistent Storage in AKS

To enable persistent storage within an AKS cluster, you need to define a Storage Class in your Kubernetes manifest (YAML or JSON). In the Storage Class, you specify key details such as:

- Storage tier (premium or standard)
- Reclaim policy (determining whether the storage should be retained or deleted once the PVC is released)

This configuration bridges the abstract storage request made by your pods via the PVC to a tangible storage resource provided by Azure.

> [!important]
> **Benefits of Using Azure Storage in AKS**
>
> By integrating native Azure Storage services as persistent volumes in an AKS cluster, you ensure that your applications benefit from secure, high-performance, and persistent storage. This approach not only supports data durability but also aligns with best practices for managing sensitive workloads by providing data encryption both at rest and in transit.

## Conclusion

Leveraging Azure storage solutions within AKS provides a seamless and secure mechanism for managing persistent storage requirements. With a clear architectural separation between the control plane and managed nodes, and with the flexible configuration options available through Storage Classes, you can design storage strategies that meet both performance and security needs.

Next, we will explore the security capabilities available in AKS to further enhance your cluster's resilience.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/146650b0-63f9-4c4b-b452-716a780e5fc7/lesson/cd350b89-d710-4275-bbed-6b7201e806e9)**
>
> Watch video content
