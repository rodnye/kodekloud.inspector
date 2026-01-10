# Configure Azure Kubernetes Service networking - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Container-Security/Configure-Azure-Kubernetes-Service-networking)

---

## Table of Contents

- Configure Azure Kubernetes Service networking
  - Networking in Kubernetes
  - Creating Services with Manifests
  - Container Network Interface (CNI)
  - Networking Options in Azure
  - Conclusion
  - Watch Video
    - Internal Traffic
    - Incoming Direct Traffic
    - Incoming Non-Direct Traffic

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Container Security

# Configure Azure Kubernetes Service networking

In this article, we dive into the intricacies of Azure Kubernetes Service (AKS) networking. We explore the internal architecture and the key networking components that form the backbone of secure containerized deployments. A clear understanding of AKS networking is essential for organizations deploying containerized applications to ensure security and operational excellence.

## Networking in Kubernetes

Kubernetes services provide connectivity to pods both internally and externally. Note that when we refer to "services," we mean the Kubernetes objects used to manage and control network access—not the generic concept of services.

AKS networking handles three primary traffic types:

1.  **Internal Traffic**
2.  **Incoming Direct Traffic**
3.  **Incoming Non-Direct Traffic**

### Internal Traffic

Internal communication within the Kubernetes cluster utilizes the ClusterIP service. This default service assigns a single IP address to a group of ports, facilitating seamless internal communication. The diagram below demonstrates how traffic is directed to a ClusterIP on port 80 before being forwarded into the cluster.

![The image is a diagram illustrating Azure Kubernetes Service (AKS) networking, showing how internal and external traffic is routed through ClusterIP, NodePort, and LoadBalancer to AKS nodes.](https://kodekloud.com/kk-media/image/upload/v1752881743/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-Azure-Kubernetes-Service-networking/aks-networking-diagram-traffic-routing.jpg)

### Incoming Direct Traffic

For exposing services externally on a specific port, Kubernetes uses the NodePort service. This service allocates a static port (for example, port 31000) on every node. External traffic addressed to this port is then forwarded to the appropriate pod port (port 80 in this instance), functioning similarly to NAT rules in a firewall environment.

### Incoming Non-Direct Traffic

The LoadBalancer service is utilized when external traffic is not addressed directly. This service is commonly used in production scenarios, where an Azure Load Balancer distributes inbound traffic from port 80 to the corresponding backend pods. The process is depicted in the diagram below:

![The image is a configuration screen for Azure Kubernetes Service Networking, showing options for creating a Kubernetes cluster with networking settings using either "Kubenet" or "Azure CNI."](https://kodekloud.com/kk-media/image/upload/v1752881745/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-Azure-Kubernetes-Service-networking/azure-kubernetes-service-networking.jpg)

## Creating Services with Manifests

Kubernetes services in AKS are defined using YAML manifests. These manifests specify selectors, ports, and the service type (such as ClusterIP, NodePort, or LoadBalancer) required for your application. Tools like `kubectl` are used to deploy these manifests into your cluster.

> [!important]
> **Tip**
>
> Review your YAML manifests carefully to ensure that service selectors and port mappings correctly mirror your application's requirements.

## Container Network Interface (CNI)

A critical concept in container networking is the Container Network Interface (CNI). CNI establishes a standard framework for developing and deploying network plugins in container orchestration platforms like Kubernetes. This framework ensures efficient communication between containers and external endpoints while allowing for the integration of diverse networking solutions.

## Networking Options in Azure

When managing container networks in Azure, you have two primary options:

| Networking Option | Description                                                                                          | Advantages                                                                                                     | Considerations                                                          |
| ----------------- | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Azure CNI         | Direct integration with Azure virtual networks where each pod receives an IP address from the subnet | Leverages native network security features such as Network Security Groups (NSGs), route tables, and firewalls | Can result in higher IP consumption                                     |
| Kubenet           | A lightweight networking plugin that performs NAT for pods using Azure infrastructure                | Lower IP consumption with a simplified networking setup                                                        | Offers less granular control over network traffic compared to Azure CNI |

> [!important]
> **Security Reminder**
>
> Using Azure CNI is generally recommended for production workloads due to its superior security features and comprehensive network control.

## Conclusion

Azure Kubernetes Service offers a robust and versatile networking framework that manages internal traffic as well as both direct and non-direct external communications. A thorough understanding of these networking components and their interactions is crucial for deploying secure and resilient Kubernetes clusters.

In the upcoming sections, we will further elaborate on these networking concepts and demonstrate how to deploy an AKS cluster. Next, we move on to exploring Azure Kubernetes Service Storage.

For more in-depth information on Kubernetes networking, consider visiting [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/) and the [Kubernetes Documentation](https://kubernetes.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/146650b0-63f9-4c4b-b452-716a780e5fc7/lesson/ee0f13c8-31fd-4d65-923e-d00804947785)**
>
> Watch video content
