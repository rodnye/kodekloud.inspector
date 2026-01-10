# Upgrading your GKE cluster and node pools - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GKE-Google-Kubernetes-Engine/GKE-Deployment-and-Administration/Upgrading-your-GKE-cluster-and-node-pools)

---

## Table of Contents

- Upgrading your GKE cluster and node pools
  - Understanding GKE Release Channels
  - 1. Control Plane Upgrade
  - 2. Node Pool Upgrade Strategies
  - 3. Automatic Node Upgrades in Autopilot Mode
  - 4. Manual Upgrades
  - Links and References
  - Watch Video
    - Regional vs. Zonal Clusters
    - Surge (Rolling) Upgrades
    - Blue-Green Upgrades
    - Node Upgrade Workflow

---

## Content

GKE - Google Kubernetes Engine

GKE Deployment and Administration

# Upgrading your GKE cluster and node pools

Keeping your Google Kubernetes Engine (GKE) clusters and node pools up to date is essential for accessing the latest features, performance enhancements, bug fixes, and security patches. GKE’s automated upgrade workflow ensures minimal downtime and continuous availability for your workloads.

Imagine your GKE cluster as a house:

- A **cluster** is the house itself.
- A **node pool** is a group of rooms within that house.

As new “smart home” updates arrive—advanced security alarms or energy-saving appliances—you’ll want to integrate them quickly and safely into your home (cluster) without disrupting daily life (workloads).

![The image illustrates a GKE (Google Kubernetes Engine) cluster and node pool upgrade process, highlighting features, performance, bug fixes, security patches, and smooth operation.](https://kodekloud.com/kk-media/image/upload/v1752875582/notes-assets/images/GKE-Google-Kubernetes-Engine-Upgrading-your-GKE-cluster-and-node-pools/gke-cluster-node-pool-upgrade.jpg)

Upgrades in GKE happen in two distinct phases:

1.  **Control plane (master) upgrade**
2.  **Node pool (worker) upgrade**

By default, both are automatically upgraded. You can also choose manual control for either phase.

---

## Understanding GKE Release Channels

Release channels let you balance stability and feature velocity by grouping GKE versions:

![The image is a table describing GKE release channels, detailing the release availability and properties for Rapid, Regular, and Stable channels. It explains the timing and characteristics of each channel's updates.](https://kodekloud.com/kk-media/image/upload/v1752875583/notes-assets/images/GKE-Google-Kubernetes-Engine-Upgrading-your-GKE-cluster-and-node-pools/gke-release-channels-table-description.jpg)

| Channel | Availability             | Best For                             |
| ------- | ------------------------ | ------------------------------------ |
| Rapid   | Days after Kubernetes GA | Early testing of new Kubernetes APIs |
| Regular | 2–3 months after Rapid   | Balanced stability with new features |
| Stable  | 2–3 months after Regular | Maximum stability, minimal changes   |

For full details, see the [GKE release channels documentation](https://cloud.google.com/kubernetes-engine/docs/concepts/release-channels).

---

## 1\. Control Plane Upgrade

When GKE releases a new Kubernetes version, it upgrades the control plane first—either automatically (auto-upgrade enabled) or manually (user-initiated). Google Cloud manages this process transparently to avoid workload interruption.

![The image illustrates a "Control Plane Upgrade" process, showing components updated seamlessly and managed by GCP, with an available application.](https://kodekloud.com/kk-media/image/upload/v1752875584/notes-assets/images/GKE-Google-Kubernetes-Engine-Upgrading-your-GKE-cluster-and-node-pools/control-plane-upgrade-gcp-application.jpg)

### Regional vs. Zonal Clusters

- **Regional Clusters** (Autopilot & Standard)  
  Deploy multiple control plane replicas across zones. GKE upgrades one replica at a time in undefined order to maintain high availability.  
  ![The image illustrates an "Autopilot and Standard Mode Regional Cluster" with two control planes distributed across Zone A and Zone B, marked as "Available."](https://kodekloud.com/kk-media/image/upload/v1752875585/notes-assets/images/GKE-Google-Kubernetes-Engine-Upgrading-your-GKE-cluster-and-node-pools/autopilot-standard-mode-regional-cluster.jpg)
- **Zonal Clusters** (Standard Only)  
  A single control plane per zone is upgraded in place. Your workloads stay online, but you cannot deploy new workloads or change configurations until the upgrade completes.  
  ![The image illustrates a "Standard Mode Zonal Cluster" with a focus on an upgraded control plane in a single zone, alongside options for new, modified, or changed workloads.](https://kodekloud.com/kk-media/image/upload/v1752875587/notes-assets/images/GKE-Google-Kubernetes-Engine-Upgrading-your-GKE-cluster-and-node-pools/standard-mode-zonal-cluster-control-plane.jpg)

> [!important]
> **Note**
>
> Control plane upgrades are managed by GKE and cannot be disabled, but you can schedule maintenance windows or exclude specific dates.

---

## 2\. Node Pool Upgrade Strategies

GKE offers flexible upgrade strategies for node pools to ensure cluster availability:

### Surge (Rolling) Upgrades

By default, GKE performs a **surge upgrade**, replacing nodes one by one while keeping your cluster operational.

![The image is about upgrading worker nodes or node pools, highlighting a default strategy that uses a rolling method and the benefits of surge upgrades, such as flexibility and optimal balance.](https://kodekloud.com/kk-media/image/upload/v1752875588/notes-assets/images/GKE-Google-Kubernetes-Engine-Upgrading-your-GKE-cluster-and-node-pools/upgrading-worker-nodes-rolling-strategy.jpg)

> [!important]
> **Tip**
>
> You can adjust `maxSurge` and `maxUnavailable` settings in your upgrade policy to fine-tune parallelism and downtime.

### Blue-Green Upgrades

Maintain two parallel environments:

- **Blue**: Current, stable node pool
- **Green**: New node pool with updated kubelet

Workloads shift gradually to Green. Quick rollback is possible by redirecting traffic back to Blue.

### Node Upgrade Workflow

1.  **Cordoning**: Marks the node unschedulable.
2.  **Draining**: Evicts running pods.
3.  **Rescheduling**: Control plane reschedules controller-managed pods; unschedulable pods enter pending state.

![The image outlines a process for upgrading worker nodes or node pools, detailing steps like cordoning, draining, and rescheduling pods, with an alternate strategy of blue-green upgrades.](https://kodekloud.com/kk-media/image/upload/v1752875590/notes-assets/images/GKE-Google-Kubernetes-Engine-Upgrading-your-GKE-cluster-and-node-pools/worker-nodes-upgrade-process-diagram.jpg)

Upgrade time depends on your strategy, node count, and pod workloads—expect anywhere from minutes to hours.

---

## 3\. Automatic Node Upgrades in Autopilot Mode

Autopilot clusters automatically upgrade both control plane and node pools to the same GKE version. Nodes with similar specs are grouped, and GKE uses surge upgrades to update up to 20 nodes concurrently.

![The image outlines the steps for a node upgrade in Autopilot Mode for GKE, including creating a new surge node, selecting and cordoning a target node, draining it, and rescheduling pods.](https://kodekloud.com/kk-media/image/upload/v1752875591/notes-assets/images/GKE-Google-Kubernetes-Engine-Upgrading-your-GKE-cluster-and-node-pools/gke-node-upgrade-autopilot-steps.jpg)

- **Static pods** on a node are deleted and not rescheduled.
- If a spike in unhealthy nodes occurs, GKE pauses the rollout for diagnostics.

![The image illustrates a process of automatic upgrades for nodes in autopilot mode, highlighting unhealthy nodes.](https://kodekloud.com/kk-media/image/upload/v1752875592/notes-assets/images/GKE-Google-Kubernetes-Engine-Upgrading-your-GKE-cluster-and-node-pools/automatic-upgrades-autopilot-unhealthy-nodes.jpg)

> [!important]
> **Warning**
>
> Static pods will not be automatically recreated during Autopilot upgrades. Ensure you back up critical static workloads.

---

## 4\. Manual Upgrades

You can override automatic upgrades and manually set versions for control plane and node pools:

![The image illustrates a "Manual Upgrade" process, showing both the control plane and work nodes as upgraded, with a toggle switch at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752875593/notes-assets/images/GKE-Google-Kubernetes-Engine-Upgrading-your-GKE-cluster-and-node-pools/manual-upgrade-control-plane-nodes.jpg)

- **Autopilot**: Only the control plane version is configurable. Nodes upgrade once your selected version becomes the channel default.
- **Standard**: Control plane and node pool versions are individually configurable. Node auto-upgrade is on by default but can be disabled (not recommended).

Refer to the [Kubernetes version support policy](https://cloud.google.com/kubernetes-engine/versioning-and-upgrades) to ensure compatibility—node pools must stay within two minor versions of the control plane.

![The image illustrates a manual upgrade process for a system, showing different versions, with control plane and work nodes being upgraded, and a note indicating caution.](https://kodekloud.com/kk-media/image/upload/v1752875595/notes-assets/images/GKE-Google-Kubernetes-Engine-Upgrading-your-GKE-cluster-and-node-pools/manual-upgrade-process-control-plane-nodes.jpg)

Control plane upgrades cannot be disabled, but you can define maintenance windows and exclusions to defer them temporarily.

---

## Links and References

- [GKE Release Channels](https://cloud.google.com/kubernetes-engine/docs/concepts/release-channels)
- [Kubernetes Versioning and Upgrades](https://cloud.google.com/kubernetes-engine/versioning-and-upgrades)
- [GKE Autopilot Overview](https://cloud.google.com/kubernetes-engine/docs/concepts/autopilot-overview)

By following these best practices, you’ll keep your GKE infrastructure secure, performant, and up to date with minimal disruption.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gke-google-kubernetes-engine/module/897349c1-bf57-4c08-82fb-0aa0ce0e0f6b/lesson/10069c71-ff04-4f1a-9da0-f00fd5b9eae2)**
>
> Watch video content
