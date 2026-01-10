# CPA Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Autoscaling/Cluster-Proportional-Autoscaler-CPA/CPA-Introduction)

---

## Table of Contents

- CPA Introduction
  - How CPA Works
  - Scaling Modes
  - Summary
  - References and Further Reading
  - Watch Video
    - Ladder Mode Configuration
    - Linear Mode Configuration
      - Replica Calculation

---

## Content

Kubernetes Autoscaling

Cluster Proportional Autoscaler CPA

# CPA Introduction

Welcome! In this guide, we cover the **Cluster Proportional Autoscaler (CPA)**—a Kubernetes component that automatically scales auxiliary services (DNS, network controllers, metrics servers) in proportion to your cluster’s worker nodes or CPU cores. CPA is different from the [Cluster Autoscaler](https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler); it adjusts supporting deployments instead of core node counts.

> [!important]
> **Note**
>
> CPA ensures that as your cluster grows or shrinks, your auxiliary services maintain the right capacity—no more manual replica tuning.

![The image illustrates a Kubernetes cluster architecture with a master node connected to components like DNS, Network Controller, and Metrics Server, alongside worker nodes.](https://kodekloud.com/kk-media/image/upload/v1752880157/notes-assets/images/Kubernetes-Autoscaling-CPA-Introduction/kubernetes-cluster-architecture-diagram.jpg)

---

## How CPA Works

CPA continuously watches the size of your cluster—either the number of schedulable worker nodes or the total CPU cores—and computes desired replicas for each target deployment using a simple scaling formula.

![The image shows a CPA scaling formula: "desired replicas = base replicas + (nodes or CPU cores) * scale factor."](https://kodekloud.com/kk-media/image/upload/v1752880158/notes-assets/images/Kubernetes-Autoscaling-CPA-Introduction/cpa-scaling-formula-replicas.jpg)

After calculating the target replica count, CPA calls the Kubernetes API to patch the deployment spec and keep your supporting services in sync.

![The image is a diagram explaining how CPA (Cluster Proportional Autoscaler) works, showing interactions between Kube API components (Nodes, CPU, Deployment) and CPA components (Node:10, CPU:50).](https://kodekloud.com/kk-media/image/upload/v1752880158/notes-assets/images/Kubernetes-Autoscaling-CPA-Introduction/cpa-cluster-proportional-autoscaler-diagram.jpg)

![The image is a diagram showing the integration between CPA and Kubernetes API, illustrating the flow of information such as cluster info, node and CPU count, and replica updates. It includes a "Calculate" cloud indicating processing or computation.](https://kodekloud.com/kk-media/image/upload/v1752880160/notes-assets/images/Kubernetes-Autoscaling-CPA-Introduction/cpa-kubernetes-api-integration-diagram.jpg)

---

## Scaling Modes

CPA supports two scaling modes—**ladder** and **linear**—each suited to different workload patterns:

![The image is a table comparing two CPA scaling modes: Ladder and Linear. It describes their behavior, scaling steps, and use cases.](https://kodekloud.com/kk-media/image/upload/v1752880161/notes-assets/images/Kubernetes-Autoscaling-CPA-Introduction/cpa-scaling-modes-comparison-table.jpg)

- **Ladder Mode**: Uses discrete thresholds for stepwise scaling—great for predictable, SLA-driven workloads.
- **Linear Mode**: Applies a continuous ratio between replicas and cluster size—ideal for elastic, usage-based scaling.

---

### Ladder Mode Configuration

Define one or more thresholds to map CPU cores or nodes to replica counts:

```
data:
  ladder: |-
    {
      "coresToReplicas": [[64,3]],
      "nodesToReplicas": [],
      "includeUnschedulableNodes": false
    }
```

Add node-based scaling:

```
data:
  ladder: |-
    {
      "coresToReplicas": [[64,3]],
      "nodesToReplicas": [[2,2]],
      "includeUnschedulableNodes": false
    }
```

Full ladder example with multiple steps:

```
data:
  ladder: |-
    {
      "coresToReplicas": [
        [1,      1],
        [64,     3],
        [512,    5]
      ],
      "nodesToReplicas": [
        [1,      1],
        [2,      2]
      ],
      "includeUnschedulableNodes": false
    }
```

In this configuration:

- 1–63 cores → 1 replica
- 64–511 cores → 3 replicas
- ≥512 cores → 5 replicas
- 1 node → 1 replica; ≥2 nodes → 2 replicas

---

### Linear Mode Configuration

Linear scaling defines an exact ratio of cluster resources to replicas, along with bounds:

| Field                       | Description                                                   |
| --------------------------- | ------------------------------------------------------------- |
| `coresPerReplica`           | CPU cores required per replica                                |
| `nodesPerReplica`           | Worker nodes required per replica                             |
| `min`                       | Minimum number of replicas                                    |
| `max`                       | Maximum number of replicas                                    |
| `preventSinglePointFailure` | Ensures at least two replicas when enabled                    |
| `includeUnschedulableNodes` | Include cordoned or tainted nodes in the resource calculation |

```
data:
  linear: |-
    {
      "coresPerReplica": 2,
      "nodesPerReplica": 1,
      "min": 1,
      "max": 100,
      "preventSinglePointFailure": true,
      "includeUnschedulableNodes": true
    }
```

> [!important]
> **Warning**
>
> Enabling `includeUnschedulableNodes` may cause CPA to count nodes that are cordoned or tainted, affecting your replica calculations.

#### Replica Calculation

CPA computes replicas in three steps:

```
replicas = max(
  ceil(cores / coresPerReplica),
  ceil(nodes / nodesPerReplica)
)
replicas = min(replicas, max)
replicas = max(replicas, min)
```

For a cluster with 4 nodes and 13 cores:

```
ceil(13 / 2) = 7   # coresPerReplica = 2
ceil(4  / 1) = 4   # nodesPerReplica = 1


replicas = max(7, 4) = 7
replicas = min(7, 100) = 7
replicas = max(7, 1)   = 7
```

CPA will deploy **7** replicas to meet the defined ratios and bounds.

---

## Summary

- **Ladder Mode**: Stepwise thresholds for controlled scaling.
- **Linear Mode**: Continuous scaling with direct resource-to-replica ratios.
- CPA integrates with the Kubernetes API to automatically adjust replicas of auxiliary services based on cluster size.

---

## References and Further Reading

- [CPA GitHub Repository](https://github.com/kubernetes/autoscaler/tree/master/cluster-proportional-autoscaler)
- [Kubernetes Autoscaling Concepts](https://kubernetes.io/docs/concepts/cluster-administration/autoscaling/)
- [Cluster Autoscaler](https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-autoscaling/module/ad35ef0b-c572-4f9e-82e4-0865c98fd502/lesson/fffc1694-28ec-4983-a9fe-b573f278a628)**
>
> Watch video content
