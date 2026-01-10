# Upgrading the LKE cluster - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linode-Kubernetes-Engine/Working-with-Linode/Upgrading-the-LKE-cluster)

---

## Table of Contents

- Upgrading the LKE cluster
  - 1. Check for Available Upgrades
  - 2. Initiate the Upgrade
  - 3. Recycle Worker Nodes
  - 4. Monitor Upgrade Progress
  - 5. Post-Upgrade Checklist
  - Best Practices
  - Watch Video
    - Why upgrade?

---

## Content

Linode : Kubernetes Engine

Working with Linode

# Upgrading the LKE cluster

Linode Kubernetes Engine (LKE) streamlines Kubernetes version management by automating control plane upgrades and node pool maintenance. This guide walks you through upgrading your cluster, highlights best practices, and ensures minimal downtime.

![The image shows a Kubernetes management interface displaying details about a cluster named "test01," including version, resources, and node pool status. Options for upgrading, adding tags, and managing nodes are also visible.](https://kodekloud.com/kk-media/image/upload/v1752881221/notes-assets/images/Linode-Kubernetes-Engine-Upgrading-the-LKE-cluster/kubernetes-cluster-management-test01.jpg)

## 1\. Check for Available Upgrades

On the LKE Dashboard, any available Kubernetes version upgrades appear as a notification banner. In our example, the cluster **test01** is on v1.22 and ready to upgrade to v1.23.

### Why upgrade?

- Access new Kubernetes features and improvements
- Receive critical bug fixes and security patches
- Maintain compatibility with cloud-native tools

> [!important]
> **Note**
>
> You can also review the [official Kubernetes upgrade documentation](https://kubernetes.io/docs/tasks/administer-cluster/cluster-upgrade/) for details on control plane components such as the API server, scheduler, and etcd.

## 2\. Initiate the Upgrade

Click **Upgrade Version** to begin. A confirmation dialog shows your current and target versions:

![The image shows a dialog box prompting to upgrade a Kubernetes cluster named "test01" from version 1.22 to 1.23, with options to cancel or upgrade.](https://kodekloud.com/kk-media/image/upload/v1752881221/notes-assets/images/Linode-Kubernetes-Engine-Upgrading-the-LKE-cluster/kubernetes-upgrade-dialog-test01.jpg)

## 3\. Recycle Worker Nodes

After version confirmation, LKE recommends recycling all worker nodes. Recycling terminates existing nodes and recreates them under the new control plane version.

![The image shows a confirmation dialog box asking if the user wants to recycle all nodes in a Kubernetes cluster, with options to cancel or proceed.](https://kodekloud.com/kk-media/image/upload/v1752881222/notes-assets/images/Linode-Kubernetes-Engine-Upgrading-the-LKE-cluster/kubernetes-recycle-nodes-dialog.jpg)

> [!important]
> **Warning**
>
> Recycling deletes any local storage, including `hostPath` volumes. Ensure you back up persistent data or migrate workloads to avoid data loss.

## 4\. Monitor Upgrade Progress

Once confirmed, LKE handles the control plane update followed by node pool recreation. You can track real-time progress through the cluster details page:

![The image shows a Kubernetes management interface with details about a cluster named "test01," including its version, resources, and node pool status. The node pool has a dedicated 4 GB node that is currently running.](https://kodekloud.com/kk-media/image/upload/v1752881223/notes-assets/images/Linode-Kubernetes-Engine-Upgrading-the-LKE-cluster/kubernetes-management-interface-test01.jpg)

## 5\. Post-Upgrade Checklist

| Task                | Description                                                       |
| ------------------- | ----------------------------------------------------------------- |
| Backup Verification | Confirm backups for persistent volumes and cluster state          |
| Workload Validation | Test application functionality and performance                    |
| Capacity Review     | Ensure node pool sizing meets production demands                  |
| Rollback Plan       | Have a strategy to revert to the previous version if issues arise |

## Best Practices

- Schedule upgrades during low-traffic periods
- Use staging clusters to validate new Kubernetes versions
- Automate backups with [Linode Block Storage](https://www.linode.com/docs/products/storage/block-storage/) or external snapshot tools
- Review [Linode LKE documentation](/docs/guides/kubernetes/)

Upgrading your LKE cluster centers on preparation and monitoring. With proper planning—backups, test runs, and capacity checks—you can leverage the latest Kubernetes features while minimizing service disruptions.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linode-kubernetes-engine/module/9702fbe2-4321-41c5-87e8-8ea364da097d/lesson/82738fad-f5c9-4fda-a874-3c2e869271f2)**
>
> Watch video content
