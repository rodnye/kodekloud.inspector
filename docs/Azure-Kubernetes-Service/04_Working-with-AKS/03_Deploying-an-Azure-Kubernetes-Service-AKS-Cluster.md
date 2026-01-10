# Deploying an Azure Kubernetes Service AKS Cluster - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Azure-Kubernetes-Service/Working-with-AKS/Deploying-an-Azure-Kubernetes-Service-AKS-Cluster)

---

## Table of Contents

- Deploying an Azure Kubernetes Service AKS Cluster
  - 1. Create the AKS Resource
  - 2. Project and Cluster Details
  - 3. Default Node Pool
  - 4. Configure Node Pools
  - 5. Authentication and Authorization
  - 6. Networking
  - 7. Container Registry
  - 8. Advanced Settings and Tags
  - 9. Review + Create
  - References
  - Watch Video

---

## Content

Azure Kubernetes Service

Working with AKS

# Deploying an Azure Kubernetes Service AKS Cluster

Learn how to deploy an Azure Kubernetes Service (AKS) cluster via the Azure Portal. This step-by-step guide assumes you have an active Azure subscription.

## 1\. Create the AKS Resource

1.  Sign in to the [Azure Portal](https://portal.azure.com).
2.  Click **Create a resource**, then choose **Containers**.
3.  Under **Azure Kubernetes Service**, select **Create**.

![The image shows the Microsoft Azure portal interface for creating a resource, with categories like AI, Compute, and Containers, and a list of popular Azure services and marketplace products.](https://kodekloud.com/kk-media/image/upload/v1752869514/notes-assets/images/Azure-Kubernetes-Service-Deploying-an-Azure-Kubernetes-Service-AKS-Cluster/azure-portal-create-resource-interface.jpg)

## 2\. Project and Cluster Details

Provide subscription and cluster metadata:

- **Subscription**: Pick your active Azure subscription.
- **Resource group**: Click **Create new**, name it `rg1-kodekloud-aks`.> [!important]
  > **Note**
  >
  > Resource group names must be unique within your subscription.
- **Cluster name**: `aks1-KodeKloud-app` (unique within the resource group).
- **Region**: **Southeast Asia** (Singapore).
- **Availability Zones**: Uncheck all to reduce cost.> [!important]
  > **Warning**
  >
  > For production workloads, enable multi-AZ to ensure high availability.

![The image shows a Microsoft Azure interface for creating a Kubernetes cluster, with a pop-up window for naming a new resource group.](https://kodekloud.com/kk-media/image/upload/v1752869515/notes-assets/images/Azure-Kubernetes-Service-Deploying-an-Azure-Kubernetes-Service-AKS-Cluster/azure-kubernetes-cluster-resource-group.jpg)

- **Kubernetes version**: Keep the default.> [!important]
  > **Note**
  >
  > AKS supports each GA Kubernetes version for 12 months, with seamless upgrade paths.

![The image shows a Microsoft Azure interface for creating a Kubernetes cluster, with options for project and cluster details such as subscription, resource group, and configuration settings.](https://kodekloud.com/kk-media/image/upload/v1752869516/notes-assets/images/Azure-Kubernetes-Service-Deploying-an-Azure-Kubernetes-Service-AKS-Cluster/azure-kubernetes-cluster-creation-interface.jpg)

![The image shows a Microsoft Azure interface for creating a Kubernetes cluster, with options for subscription, resource group, cluster details, and primary node pool configuration.](https://kodekloud.com/kk-media/image/upload/v1752869517/notes-assets/images/Azure-Kubernetes-Service-Deploying-an-Azure-Kubernetes-Service-AKS-Cluster/azure-kubernetes-cluster-creation-interface-2.jpg)

## 3\. Default Node Pool

Configure the initial node pool:

| Setting     | Value     |
| ----------- | --------- |
| Node size   | DS2\\\_v2 |
| vCPUs / RAM | 2 / 7 GB  |
| Node count  | 1         |

Click **Next: Default Node Pools**.

## 4\. Configure Node Pools

Adjust autoscaling and pod limits:

- **Min count**: `1`
- **Max count**: `1` (or increase to `5` for autoscaling)
- **Max pods per node**: Default is `110`

To customize pods per node:

1.  Go to **Agent pools**.
2.  Set **Max pods per node** to `30`.
3.  Click **Update**, then **Next**.

![The image shows a Microsoft Azure interface for creating a Kubernetes cluster, specifically focusing on the "Node pools" configuration section. It includes options for enabling virtual nodes and setting node pool OS disk encryption.](https://kodekloud.com/kk-media/image/upload/v1752869518/notes-assets/images/Azure-Kubernetes-Service-Deploying-an-Azure-Kubernetes-Service-AKS-Cluster/azure-kubernetes-node-pools-configuration.jpg)

![The image shows a Microsoft Azure interface for updating a Kubernetes node pool, with options for configuring node size, scale method, and additional settings like labels and taints.](https://kodekloud.com/kk-media/image/upload/v1752869519/notes-assets/images/Azure-Kubernetes-Service-Deploying-an-Azure-Kubernetes-Service-AKS-Cluster/azure-kubernetes-node-pool-update-interface.jpg)

## 5\. Authentication and Authorization

Accept the default managed identities and RBAC settings.

## 6\. Networking

Choose the network setup that integrates seamlessly with Azure VNets:

- **Network configuration**: **Azure CNI**
- **Virtual network**: Create a new VNet automatically
- **Network policies**: Default

![The image shows a Microsoft Azure interface for creating a Kubernetes cluster, specifically focusing on the networking configuration options. It includes settings for network configuration, virtual network, cluster subnet, and other related parameters.](https://kodekloud.com/kk-media/image/upload/v1752869520/notes-assets/images/Azure-Kubernetes-Service-Deploying-an-Azure-Kubernetes-Service-AKS-Cluster/azure-kubernetes-cluster-networking-config.jpg)

## 7\. Container Registry

Enable an [Azure Container Registry (ACR)](https://docs.microsoft.com/azure/container-registry/) for private image storage:

1.  Click **Enable Container Registry**.
2.  Enter a unique registry name.
3.  Use the same resource group and region.
4.  Select **Basic** SKU.
5.  Click **OK**.

> ACR (Basic SKU) meets most development and testing scenarios.

Enable container logs and route them to the new Log Analytics workspace.

## 8\. Advanced Settings and Tags

- **Infrastructure resource group**: Default (stores VMs, VNet, etc.).
- **Tags**: Add optional metadata (e.g., `environment=dev`, `project=AKS`) for cost tracking.

![The image shows a Microsoft Azure interface for creating a Kubernetes cluster, displaying configuration details like subscription, region, and networking settings.](https://kodekloud.com/kk-media/image/upload/v1752869521/notes-assets/images/Azure-Kubernetes-Service-Deploying-an-Azure-Kubernetes-Service-AKS-Cluster/azure-kubernetes-cluster-configuration-interface.jpg)

## 9\. Review + Create

Azure will validate your configuration. Once validation passes, click **Create**.

![The image shows a Microsoft Azure portal screen indicating that a deployment is in progress for a resource group named "RG1-KodeKloud-AKS." It includes details like the deployment name, subscription, and start time.](https://kodekloud.com/kk-media/image/upload/v1752869522/notes-assets/images/Azure-Kubernetes-Service-Deploying-an-Azure-Kubernetes-Service-AKS-Cluster/azure-portal-deployment-rg1-kodekloud.jpg)

Deployment typically completes within a few minutes. After provisioning, connect to your new AKS cluster using the Azure CLI or Cloud Shell.

---

## References

- [Azure Kubernetes Service (AKS)](https://docs.microsoft.com/azure/aks/)
- [Azure CNI Networking](https://docs.microsoft.com/azure/aks/configure-azure-cni)
- [Azure Container Registry (ACR)](https://docs.microsoft.com/azure/container-registry/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/azure-kubernetes-service/module/2e4891fe-2f53-4239-9ab9-8b15ba4c6369/lesson/4364a815-f931-42dc-a9a9-72066b6fa020)**
>
> Watch video content
