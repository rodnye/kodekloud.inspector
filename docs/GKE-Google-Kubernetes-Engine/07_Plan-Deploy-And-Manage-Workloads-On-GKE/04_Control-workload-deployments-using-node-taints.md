# Control workload deployments using node taints - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GKE-Google-Kubernetes-Engine/Plan-Deploy-And-Manage-Workloads-On-GKE/Control-workload-deployments-using-node-taints)

---

## Table of Contents

- Control workload deployments using node taints
  - Taints and Tolerations Analogy
  - Autopilot vs. Standard Clusters
  - Why Use Node Taints?
  - Applying Node Taints in GKE
  - Links and References
  - Watch Video
    - Batch Coordinator Workloads
    - Game Server Matchmaking
    - Server–Database Separation
    - Compliance and Policy Requirements
    - Example: Tainting with kubectl

---

## Content

GKE - Google Kubernetes Engine

Plan Deploy And Manage Workloads On GKE

# Control workload deployments using node taints

Node taints and pod tolerations in Google Kubernetes Engine (GKE) give you fine-grained control over where your workloads run. By marking nodes with taints and adding matching tolerations to pods, you ensure that only eligible pods land on specific nodes.

## Taints and Tolerations Analogy

Imagine a birthday party with two zones: a colorful play area for kids and a quiet lounge for adults. You hand out blue bracelets to kids and green bracelets to adults so everyone stays in the right spot. In GKE:

- Nodes are the party zones.
- A taint on a node labels its “zone” (e.g., Music Area, Reading Area).
- A pod’s toleration is its bracelet—pods with a matching toleration can be scheduled on that node.

![The image is an overview diagram of node taints and tolerations in Google Kubernetes Engine (GKE), showing two nodes with specific taints and corresponding tolerations for "Music Area" and "Reading Area."](https://kodekloud.com/kk-media/image/upload/v1752875714/notes-assets/images/GKE-Google-Kubernetes-Engine-Control-workload-deployments-using-node-taints/node-taints-tolerations-gke-diagram.jpg)

Pods with a `music-area` toleration will only run on nodes tainted for music, just like kids gathering in their play zone. Pods tolerating `reading-area` run on the quiet nodes.

## Autopilot vs. Standard Clusters

Depending on your cluster mode, taint configuration changes:

| Cluster Mode | Node Management         | Taint Setup                        | Automation                      |
| ------------ | ----------------------- | ---------------------------------- | ------------------------------- |
| Autopilot    | Fully managed by GKE    | Taints applied automatically       | GKE assigns taints at scale     |
| Standard     | User-defined node pools | You add taints when creating pools | You must update taints manually |

![The image is an overview of node taints in Google Kubernetes Engine (GKE), comparing Autopilot and Standard modes, highlighting tasks like node provisioning, scheduling, taint, and toleration.](https://kodekloud.com/kk-media/image/upload/v1752875715/notes-assets/images/GKE-Google-Kubernetes-Engine-Control-workload-deployments-using-node-taints/node-taints-gke-autopilot-standard-overview.jpg)

- In **Autopilot**, GKE handles node lifecycles and taints based on pod requirements.
- In **Standard** mode, you configure node pools, labels, and taints yourself.

## Why Use Node Taints?

Taints help isolate workloads with specific needs—whether resources, hardware, or compliance:

![The image is a diagram explaining the need for node taint in GKE, highlighting workloads like batch coordination, game server matchmaking, server/database separation, and compliance reasons.](https://kodekloud.com/kk-media/image/upload/v1752875716/notes-assets/images/GKE-Google-Kubernetes-Engine-Control-workload-deployments-using-node-taints/gke-node-taint-workload-diagram.jpg)

### Batch Coordinator Workloads

Time-sensitive, resource-intensive jobs should run on dedicated nodes to avoid interference.

![The image is a diagram illustrating "Node Taint" with a focus on "Batch Coordinator Workload," highlighting aspects like being time-intensive, requiring significant resources, and ensuring no interference.](https://kodekloud.com/kk-media/image/upload/v1752875718/notes-assets/images/GKE-Google-Kubernetes-Engine-Control-workload-deployments-using-node-taints/node-taint-batch-coordinator-diagram.jpg)

### Game Server Matchmaking

Low-latency and specialized hardware are critical for matchmaking. A unique taint guarantees these pods land on the right machines.

![The image is a diagram illustrating a "Node Taint" concept, showing a game server with matchmaking workload, labeled with "Unique Taint," and highlighting features like low latency and specialized hardware.](https://kodekloud.com/kk-media/image/upload/v1752875719/notes-assets/images/GKE-Google-Kubernetes-Engine-Control-workload-deployments-using-node-taints/node-taint-game-server-diagram.jpg)

### Server–Database Separation

By tainting web servers and database nodes differently, you prevent resource contention and improve performance.

- Web server nodes: `server-role=web:NoSchedule`
- Database nodes: `server-role=db:NoSchedule`

### Compliance and Policy Requirements

Some workloads must adhere to privacy regulations or internal policies. Assign compliance-specific taints to enforce workload isolation.

![The image is a diagram titled "Node Taint," illustrating the concept of compliance and policy reasons, with two subcategories: privacy requirements and regulatory constraints.](https://kodekloud.com/kk-media/image/upload/v1752875720/notes-assets/images/GKE-Google-Kubernetes-Engine-Control-workload-deployments-using-node-taints/node-taint-compliance-policy-diagram.jpg)

> [!important]
> **Note**
>
> Node taints are not a security boundary. For untrusted workloads or strict isolation, use network policies, dedicated clusters, or virtualization.

## Applying Node Taints in GKE

You can apply taints directly with `kubectl` or configure them in GKE for greater reliability:

- **GKE Console / gcloud**
- **`kubectl taint`**
- **Terraform** or other IaC tools

![The image illustrates ways of applying node taints in Kubernetes, highlighting "kubectl taint" and features like taint persistence, automatic taint creation, and seamless cluster autoscaling.](https://kodekloud.com/kk-media/image/upload/v1752875721/notes-assets/images/GKE-Google-Kubernetes-Engine-Control-workload-deployments-using-node-taints/kubernetes-node-taints-kubectl-diagram.jpg)

### Example: Tainting with kubectl

```
# Taint a node so no pods schedule unless they tolerate it
kubectl taint nodes node-1 dedicated=experimental:NoSchedule


# Verify the taint
kubectl describe node node-1 | grep Taints
```

> [!important]
> **Warning**
>
> If you remove a taint via `kubectl` on a managed node pool, GKE will not reapply it after a restart. Always define critical taints at the pool or cluster level in GKE.

## Links and References

- [GKE Node Taints and Tolerations](https://cloud.google.com/kubernetes-engine/docs/concepts/node-taints)
- [Kubectl Taint Documentation](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#taint)
- [Kubernetes Official Documentation](https://kubernetes.io/docs/)
- [Terraform GKE Cluster](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/container_cluster)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gke-google-kubernetes-engine/module/12020a5d-e2fd-46b5-82fb-35aa9cd57ad6/lesson/7e79587d-7913-49d7-a388-9df682f12d57)**
>
> Watch video content
