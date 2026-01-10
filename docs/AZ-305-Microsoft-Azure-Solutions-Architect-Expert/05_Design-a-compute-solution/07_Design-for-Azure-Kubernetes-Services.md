# Design for Azure Kubernetes Services - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-compute-solution/Design-for-Azure-Kubernetes-Services)

---

## Table of Contents

- Design for Azure Kubernetes Services
  - Key Concepts of AKS
  - When to Use AKS
  - Considerations for Using AKS
  - Summary Table of AKS Components
  - Conclusion
  - Additional Resources
  - Watch Video
    - Pools and Nodes
    - Pods
    - Deployments
    - Manifests
    - Scalability
    - Network Segmentation
    - Version Upgrades
    - Storage and Image Repository
    - Load Balancing and Ingress Control

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a compute solution

# Design for Azure Kubernetes Services

In this article, we recap the fundamentals of Azure Kubernetes Service (AKS) to reinforce your understanding of key terminology and concepts before diving deeper into AKS design.

## Key Concepts of AKS

### Pools and Nodes

Pools are logical groupings of nodes with identical configurations. For example, you might have separate pools for Linux machines, Windows machines, or GPU-enabled machines. This grouping ensures that containers are scheduled onto nodes equipped with the necessary capabilities.

Within each pool, nodes (which are virtual machines) host your containerized applications. In AKS, these nodes are managed by the Kubernetes master node, which is abstracted from the end user since AKS is a managed cluster. This allows Microsoft to handle master node management seamlessly.

### Pods

A pod is the smallest deployable unit in a Kubernetes cluster. It represents a collection of one or more containers that collectively run a single instance of your application. Each pod is defined by a pod manifest that outlines its container configuration.

### Deployments

Deployments manage the creation and maintenance of identical pod replicas. For instance, a deployment configured with two pods ensures that at all times, two identically configured pods are active. If one pod is deleted or fails, the system automatically creates a replacement to maintain the desired state.

### Manifests

Manifests are YAML or JSON files used to deploy resources on Kubernetes. They define the configuration settings and desired state of your applications.

![The image is an educational diagram explaining the basics of Azure Kubernetes Service (AKS), including concepts like pools, nodes, pods, deployments, and manifests, with a visual representation of their relationships.](https://kodekloud.com/kk-media/image/upload/v1752866861/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Kubernetes-Services/azure-kubernetes-service-diagram.jpg)

## When to Use AKS

Determining whether AKS is the right choice for your application is essential. The decision flowchart below illustrates scenarios where containerized applications—whether for lift-and-shift, migration, or enhanced cloud optimization—would benefit from full-fledged orchestration using AKS.

![The image is a flowchart from KodeKloud titled "When to use AKS?" It guides users through decision points to determine whether to use Azure Kubernetes Service (AKS) or other Azure services based on specific requirements.](https://kodekloud.com/kk-media/image/upload/v1752866862/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Kubernetes-Services/when-to-use-aks-flowchart.jpg)

## Considerations for Using AKS

When planning your AKS deployment, consider the following key aspects:

### Scalability

AKS provides robust scaling options suitable for large-scale containerized applications. There are two primary scaling mechanisms:

- **Horizontal Pod Autoscaler:** Dynamically adjusts the number of pod replicas in response to changes in demand.
- **Cluster Autoscaler:** Automatically increases or decreases the number of nodes in your cluster based on workload requirements.

### Network Segmentation

For scenarios requiring port-to-port communication or integration with on-premises systems, network segmentation is critical. AKS can be deployed within an existing Virtual Network (VNet), enabling integration with:

- VNet peering
- ExpressRoute
- VPN connectivity

This setup ensures seamless connectivity between your AKS cluster, other Azure VNets, and on-premises networks.

> [!important]
> **Note**
>
> Integrating with your existing network infrastructure can enhance security and performance by isolating network traffic.

### Version Upgrades

Kubernetes continuously evolves, and periodic version upgrades are necessary. With AKS, Microsoft manages these upgrades, including the cordoning and uncordoning of nodes. This automated process minimizes downtime and eliminates the need for manual intervention when updating your cluster.

### Storage and Image Repository

For persistent storage, AKS supports:

- Azure Files
- Azure Disks

Additionally, integrating Azure Container Registry (ACR) with AKS allows secure, direct pulling of container images from your private registry.

### Load Balancing and Ingress Control

AKS integrates seamlessly with native Azure load balancing solutions, including Azure Load Balancer and Application Gateway Ingress Controllers. These services ensure efficient traffic distribution and negate the need for third-party load balancing solutions.

## Summary Table of AKS Components

| Component  | Functionality                                                       | Example Usage                                   |
| ---------- | ------------------------------------------------------------------- | ----------------------------------------------- |
| Pool       | Logical grouping of nodes with similar configurations               | Separate pools for Linux, Windows, or GPU nodes |
| Node       | Virtual machine hosting containerized applications                  | A node running multiple pods                    |
| Pod        | Smallest deployable unit consisting of one or more containers       | A pod running a microservice instance           |
| Deployment | Manages replicas of pods ensuring desired state is maintained       | A deployment configured with 3 replicas         |
| Manifest   | YAML/JSON file defining Kubernetes configurations and desired state | A pod manifest file                             |

## Conclusion

This article has covered the essential concepts for designing solutions with Azure Kubernetes Service, including an overview of pools, nodes, pods, deployments, and manifests, as well as detailed considerations for scalability, network segmentation, upgrades, storage, and load balancing. With this foundational knowledge, you are well-equipped to leverage Kubernetes effectively on Azure.

Next, we will explore designing for Azure Functions.

## Additional Resources

- [Azure Kubernetes Service (AKS) Documentation](https://docs.microsoft.com/en-us/azure/aks/)
- [Kubernetes Concepts](https://kubernetes.io/docs/concepts/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/bf1d18e5-9589-48cf-99af-4150d985241a/lesson/9e685599-98e9-4ab3-ac42-927db0c25eb5)**
>
> Watch video content
