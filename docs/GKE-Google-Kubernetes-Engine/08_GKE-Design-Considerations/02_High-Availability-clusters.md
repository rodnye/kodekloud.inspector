# High Availability clusters - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GKE-Google-Kubernetes-Engine/GKE-Design-Considerations/High-Availability-clusters)

---

## Table of Contents

- High Availability clusters
  - Why Choose Regional Clusters?
  - Cluster Configuration and Quotas
  - Cross-Zone Traffic Costs
  - Over-Provisioning for Zonal Failures
  - Best Practices and References
  - Watch Video
    - Key Benefits
    - Links and References

---

## Content

GKE - Google Kubernetes Engine

GKE Design Considerations

# High Availability clusters

Google Kubernetes Engine (GKE) regional clusters enhance reliability by replicating both the control plane and worker nodes across multiple zones within a region. The control plane spans three zones by default, so even if one zone fails, your cluster remains fully operational.

> [!important]
> **Production Recommendation**
>
> For production workloads, regional clusters are strongly recommended over zonal clusters to maximize uptime and resilience.

## Why Choose Regional Clusters?

![The image illustrates the key advantages of a Regional GKE Cluster, highlighting resilience from single zone failure and continuous upgrades for improved availability.](https://kodekloud.com/kk-media/image/upload/v1752875601/notes-assets/images/GKE-Google-Kubernetes-Engine-High-Availability-clusters/regional-gke-cluster-advantages-diagram.jpg)

| Feature                        | Zonal Cluster            | Regional Cluster                          |
| ------------------------------ | ------------------------ | ----------------------------------------- |
| Control plane distribution     | Single zone              | Spread across three zones                 |
| Node failure tolerance         | Single-zone failure risk | Automatic failover to remaining zones     |
| Control plane upgrade behavior | Brief API downtime       | Rolling upgrades with zero API downtime   |
| Workload availability          | Limited by one zone only | Maintained capacity across multiple zones |

### Key Benefits

- **Resilience to single-zone failures**  
  Redundant control plane replicas and worker nodes in other zones ensure workloads keep running.
- **Seamless control plane upgrades**  
  Rolling upgrades occur without interrupting API access or workload scheduling.
- **Enhanced workload availability**  
  Distributing pods across zones preserves capacity during zonal outages.

## Cluster Configuration and Quotas

When you create a **regional standard cluster**, the default node pool provisions nine nodes (three per zone), consuming nine IP addresses. You can adjust to as few as one node per zone. Consider the following:

- **Zone alignment**: Standard-mode node pools must reside in the same region as the control plane. Modifying zones applies to both existing and new nodes.
- **Quota usage**: Regional clusters draw more regional compute and IP addresses compared to zonal or multi-zonal clusters.
- **Pricing impact**: Review [Compute Engine quotas](https://cloud.google.com/compute/quotas) and [Compute Engine pricing](https://cloud.google.com/compute/pricing) to estimate additional costs.

## Cross-Zone Traffic Costs

Workloads communicating across zones incur network egress charges. For the latest rates, consult the [Compute Engine Pricing page](https://cloud.google.com/compute/pricing).

![The image outlines design considerations for choosing highly available clusters, including default node pool configuration, zones for standard mode, regional cluster costs, and node-to-node traffic cost.](https://kodekloud.com/kk-media/image/upload/v1752875602/notes-assets/images/GKE-Google-Kubernetes-Engine-High-Availability-clusters/highly-available-clusters-design-considerations.jpg)

> [!important]
> **Cost Alert**
>
> Cross-zone pod-to-pod traffic and control-plane communications may generate egress fees. Plan your network topology accordingly.

## Over-Provisioning for Zonal Failures

To ensure consistent capacity during a zone outage, configure your node pools with higher maximum node counts. For example, in a three-zone cluster:

- Default sizing: 3 zones × 4 nodes = 12 nodes total
- 150% over-provisioning: 3 zones × 6 nodes = 18 nodes total

If one zone fails, GKE can automatically scale up to 12 nodes spread across the remaining zones, maintaining service availability without manual intervention.

## Best Practices and References

| Resource                      | Description                              |
| ----------------------------- | ---------------------------------------- |
| GKE Best Practices guide      | Production-ready architecture patterns   |
| Compute Engine Pricing        | Egress, regional network, and VM pricing |
| Multi-Region Cluster Patterns | Strategies for global GKE deployments    |

### Links and References

- [GKE Best Practices guide](https://cloud.google.com/kubernetes-engine/docs/best-practices)
- [Compute Engine Pricing page](https://cloud.google.com/compute/pricing)
- [Production-ready multi-region cluster patterns](https://cloud.google.com/kubernetes-engine/docs/how-to/multi-region-cluster)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gke-google-kubernetes-engine/module/ec0f4efc-f350-49e5-9a52-b49f7ec85dae/lesson/7a4d38f0-26ca-4809-9362-f4f5f48483b6)**
>
> Watch video content
