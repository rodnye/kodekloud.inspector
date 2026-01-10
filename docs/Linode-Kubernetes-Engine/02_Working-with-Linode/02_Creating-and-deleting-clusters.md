# Creating and deleting clusters - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linode-Kubernetes-Engine/Working-with-Linode/Creating-and-deleting-clusters)

---

## Table of Contents

- Creating and deleting clusters
  - Prerequisites
  - Navigate to the Kubernetes Dashboard
  - 1. Create a New Cluster
  - 2. Delete a Cluster
  - Links and References
  - Watch Video
    - 1.1 Define Your Worker Node Pools

---

## Content

Linode : Kubernetes Engine

Working with Linode

# Creating and deleting clusters

In this guide, you’ll learn how to spin up a Kubernetes cluster using the Linode Cloud Manager UI and how to tear it down when you’re done. Later, you can automate provisioning with Terraform or another infrastructure-as-code tool.

> [!important]
> **Note**
>
> For repeatable workflows, consider using [Terraform](https://www.terraform.io) and the [Linode Terraform provider](https://registry.terraform.io/providers/linode/linode/latest).

## Prerequisites

- A Linode account with Kubernetes Engine enabled
- Familiarity with basic Kubernetes concepts
- Access to the Linode Cloud Manager (cloud.linode.com)

## Navigate to the Kubernetes Dashboard

1.  Log in to the Linode Cloud Manager.
2.  In the left sidebar, click **Kubernetes**.
3.  You’ll see options to **Create Cluster** or browse documentation for deployments, ingress, CI/CD, monitoring, and observability.

## 1\. Create a New Cluster

Click **Create Cluster** and configure these options:

1.  **Cluster Name**  
    Enter a unique identifier, for example:  
    `kodekloud01`
2.  **Region**  
    Select the data center nearest your users (e.g., **Newark, NJ**).
3.  **Kubernetes Version**  
    Choose the latest supported release (e.g., **v1.23**).
4.  **High-Availability Control Plane**  
    Enable to provision three control-plane nodes instead of one. This setup eliminates a single point of failure for etcd and the Kubernetes API.

> [!important]
> **Warning**
>
> Enabling High Availability adds approximately $60/month to your bill. Ensure this aligns with your budget.

### 1.1 Define Your Worker Node Pools

Choose a node pool based on your workload:

| Node Pool Type | Use Case                          | Example Plan |
| -------------- | --------------------------------- | ------------ |
| Dedicated CPU  | CPU-bound builds and CI workloads | Linode 4 GB  |
| Shared CPU     | General development or testing    | Linode 2 GB  |
| High Memory    | Memory-intensive applications     | Linode 16 GB |

![The image shows a web interface for adding node pools to a cluster, displaying various dedicated CPU plans with details on pricing, RAM, CPUs, and storage. There is also a cluster summary on the right with an option to enable a high availability control plane.](https://kodekloud.com/kk-media/image/upload/v1752881205/notes-assets/images/Linode-Kubernetes-Engine-Creating-and-deleting-clusters/node-pools-cluster-interface-summary.jpg)

For a dev environment, select **Shared CPU** → **Linode 2 GB**, then set node count:

- Development: 1–2 nodes
- Production: 3–4 nodes for redundancy and scaling

Add two nodes:

![The image shows a web interface for configuring a Kubernetes cluster, including options for selecting a region, Kubernetes version, and adding high memory node pools with various plans and pricing.](https://kodekloud.com/kk-media/image/upload/v1752881206/notes-assets/images/Linode-Kubernetes-Engine-Creating-and-deleting-clusters/kubernetes-cluster-configuration-interface.jpg)

4.  **Review & Create**  
    Confirm your settings and review the estimated monthly cost (~$80).

![The image shows a cloud service interface for configuring Kubernetes clusters, including options for selecting node pools with different plans based on RAM, CPUs, and storage. It also includes a cluster summary with pricing details and a recommendation for a minimum number of nodes.](https://kodekloud.com/kk-media/image/upload/v1752881207/notes-assets/images/Linode-Kubernetes-Engine-Creating-and-deleting-clusters/kubernetes-cluster-config-interface.jpg)

Click **Create Cluster**. Provisioning takes 3–5 minutes as Linode sets up control-plane nodes, worker nodes, networking, and storage. When ready, your cluster appears in the dashboard:

![The image shows a Kubernetes management dashboard for a cluster named "kodekloud01," displaying details like version, CPU cores, RAM, and node pool status with IP addresses.](https://kodekloud.com/kk-media/image/upload/v1752881208/notes-assets/images/Linode-Kubernetes-Engine-Creating-and-deleting-clusters/kubernetes-dashboard-kodekloud01-details.jpg)

## 2\. Delete a Cluster

When you no longer need the cluster, delete it to stop billing:

1.  In the **Kubernetes** dashboard, locate your cluster.
2.  Click **Delete Cluster**, then confirm.

Deleting the cluster will remove all associated resources.

## Links and References

- [Linode Kubernetes Engine Documentation](https://www.linode.com/docs/kubernetes/)
- [Terraform Registry: Linode Provider](https://registry.terraform.io/providers/linode/linode)
- [Kubernetes Official Documentation](https://kubernetes.io/docs/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linode-kubernetes-engine/module/9702fbe2-4321-41c5-87e8-8ea364da097d/lesson/6237b20a-231b-423e-965b-1ac8ad8926f0)**
>
> Watch video content
