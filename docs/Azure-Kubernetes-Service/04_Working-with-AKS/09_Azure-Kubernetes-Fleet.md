# Azure Kubernetes Fleet - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Azure-Kubernetes-Service/Working-with-AKS/Azure-Kubernetes-Fleet)

---

## Table of Contents

- Azure Kubernetes Fleet
  - Why Use a Multicluster Architecture?
  - Open-Source Multicluster Solutions
  - Enterprise Multicluster Management with Azure Kubernetes Fleet Manager
  - Links and References
  - Watch Video
    - Kubernetes Cluster Federation (KubeFed)
    - Open Cluster Management (OCM)
    - Karmada
    - Example: Placing a Namespace Across Clusters
    - Example: Creating a MultiClusterService
    - Fleet Manager Features

---

## Content

Azure Kubernetes Service

Working with AKS

# Azure Kubernetes Fleet

Managing hundreds or thousands of Azure Kubernetes Service (AKS) clusters can quickly become complex. This guide explores why you should adopt a multicluster pattern—and how to implement it on Azure using both community and enterprise solutions.

## Why Use a Multicluster Architecture?

Single Kubernetes clusters can handle multiple workloads via namespaces and pods. However, large-scale or regulated deployments often require more:

| Requirement           | Description                                                 |
| --------------------- | ----------------------------------------------------------- |
| Multi-tenancy         | Isolate resources across teams or customers                 |
| High availability     | Distribute workloads for regional failover and resilience   |
| Regulatory compliance | Ensure data sovereignty and meet industry-specific rules    |
| Scalability limits    | Scale beyond single-cluster node and pod count restrictions |

![The image lists reasons for adopting a multi-cluster approach, including multi-tenancy, high availability, regulatory compliance, and scaling beyond single cluster limitations.](https://kodekloud.com/kk-media/image/upload/v1752869509/notes-assets/images/Azure-Kubernetes-Service-Azure-Kubernetes-Fleet/multi-cluster-approach-reasons-list.jpg)

> [!important]
> **When to Choose Multicluster**
>
> Multicluster setups introduce operational overhead. Evaluate your tenancy, compliance, and scale requirements before proceeding.

Compliance alone can justify the additional complexity—for example, U.S. state-level regulations might require separate AKS clusters per jurisdiction. When application demands exceed single-cluster limits, a fleet of clusters becomes essential.

---

## Open-Source Multicluster Solutions

Several community-driven projects enable cross-cluster orchestration:

### Kubernetes Cluster Federation (KubeFed)

KubeFed provides federated APIs to coordinate resources across multiple Kubernetes clusters.

```
kubectl apply -f federated_resource.yml
```

Version history:

- v1: Deprecated
- v2: Archived

> [!important]
> **Deprecated Solution**
>
> KubeFed v2 is no longer actively developed. Consider alternative projects for production use.

### Open Cluster Management (OCM)

OCM by Red Hat implements a hub-and-spoke control plane:

- **Hub cluster**: Central management plane
- **Spoke clusters**: Agents (`clusterlet`) register and enforce policies

![The image is a diagram explaining Open Cluster Management (OCM), showing components like the Hub Cluster, Managed Clusters, and various agents and add-ons. It highlights features such as modularity, integration with OpenShift, and Argo CD.](https://kodekloud.com/kk-media/image/upload/v1752869510/notes-assets/images/Azure-Kubernetes-Service-Azure-Kubernetes-Fleet/open-cluster-management-diagram-components.jpg)

Key OCM features:

- Cluster registration and discovery
- Placement, scheduling, and policy enforcement

### Karmada

Karmada introduces a separate control plane with its own API server and scheduler.

![The image is a diagram of the Karmada architecture, showing its control plane with components like Kubernetes APIs, Karmada API-server, and various controllers managing clusters across public, private, and edge clouds.](https://kodekloud.com/kk-media/image/upload/v1752869511/notes-assets/images/Azure-Kubernetes-Service-Azure-Kubernetes-Fleet/karmada-architecture-control-plane-diagram.jpg)

Highlights:

- Dedicated Karmada API server
- Workload controllers sync across clusters
- Requires agent deployment in each member cluster

---

## Enterprise Multicluster Management with Azure Kubernetes Fleet Manager

Azure Kubernetes Fleet Manager offers a managed service for AKS fleet operations at scale:

- Centralized cluster inventory and bulk operations
- Automated provisioning, upgrades, and configuration
- Policy-driven workload placement and governance
- Integrated north-south load balancing across regions

> [!important]
> **Azure Subscription Required**
>
> You need an Azure subscription with required permissions to create and manage fleet resources.

### Example: Placing a Namespace Across Clusters

Define a `ClusterResourcePlacement` CRD to deploy a namespace to clusters in `eastus`:

```
apiVersion: fleet.azure.com/v1alpha1
kind: ClusterResourcePlacement
metadata:
  name: demo
spec:
  resourceSelectors:
    - group:
      version: v1
      kind: Namespace
      name: demo
  policy:
    affinity:
      clusterAffinity:
        clusterSelectorTerms:
          - labelSelector:
              matchLabels:
                fleet.azure.com/location: eastus
```

### Example: Creating a MultiClusterService

Import a service across your fleet using the `MultiClusterService` CRD:

```
apiVersion: networking.fleet.azure.com/v1alpha1
kind: MultiClusterService
metadata:
  name: demo
  namespace: demo
spec:
  serviceImport:
    name: demo
```

### Fleet Manager Features

| Feature              | Description                                                        |
| -------------------- | ------------------------------------------------------------------ |
| Bulk operations      | Apply changes across dozens or hundreds of clusters simultaneously |
| Automated lifecycle  | Self-service cluster provisioning and version upgrades             |
| Policy enforcement   | Define and enforce policies (e.g., Kubernetes version, pod limits) |
| Update orchestration | Stage rollouts (test → prod) with update waves                     |

You can orchestrate rollouts in phases (e.g., test, staging, prod) by grouping clusters into waves:

![The image is a flowchart illustrating a multi-cluster update process, divided into "test" and "prod" stages, with clusters grouped and updated sequentially.](https://kodekloud.com/kk-media/image/upload/v1752869512/notes-assets/images/Azure-Kubernetes-Service-Azure-Kubernetes-Fleet/multi-cluster-update-flowchart-test-prod.jpg)

This approach ensures consistent, safe updates across your entire AKS fleet.

---

## Links and References

- [Kubernetes Federation (KubeFed) Documentation](https://github.com/kubernetes-sigs/kubefed)
- [Open Cluster Management (OCM) Project](https://open-cluster-management.io/)
- [Karmada Official Site](https://karmada.io/)
- [Azure Kubernetes Fleet Manager](https://learn.microsoft.com/azure/aks/fleet-manager)
- [Azure Kubernetes Service (AKS) Overview](https://azure.microsoft.com/products/kubernetes-service/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/azure-kubernetes-service/module/2e4891fe-2f53-4239-9ab9-8b15ba4c6369/lesson/bf1dc3d9-9632-4aef-8f32-71c8b5206198)**
>
> Watch video content
