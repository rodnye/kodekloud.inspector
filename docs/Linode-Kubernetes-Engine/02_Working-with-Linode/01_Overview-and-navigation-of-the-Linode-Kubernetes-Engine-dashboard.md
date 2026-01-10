# Overview and navigation of the Linode Kubernetes Engine dashboard - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linode-Kubernetes-Engine/Working-with-Linode/Overview-and-navigation-of-the-Linode-Kubernetes-Engine-dashboard)

---

## Table of Contents

- Overview and navigation of the Linode Kubernetes Engine dashboard
  - Cluster Details
  - API Endpoint
  - Kubeconfig File
  - Kubernetes Dashboard & Node Pools
  - Links and References
  - Related Resources
  - Watch Video

---

## Content

Linode : Kubernetes Engine

Working with Linode

# Overview and navigation of the Linode Kubernetes Engine dashboard

Before provisioning a Linode Kubernetes Engine (LKE) cluster, it’s helpful to familiarize yourself with the LKE dashboard. Understanding this interface clarifies the resources LKE manages on your behalf.

![The image shows a Kubernetes cluster management interface with details about a cluster named "kodekloud01," including its version, resources, and node pool status. Two nodes are listed, both running with their respective IP addresses.](https://kodekloud.com/kk-media/image/upload/v1752881213/notes-assets/images/Linode-Kubernetes-Engine-Overview-and-navigation-of-the-Linode-Kubernetes-Engine-dashboard/kubernetes-cluster-kodekloud01-interface.jpg)

> [!important]
> **Note**
>
> Exploring the LKE dashboard first gives you context on what happens behind the scenes when you later create and manage clusters.

## Cluster Details

| Field                  | Description                                                |
| ---------------------- | ---------------------------------------------------------- |
| **Name**               | Rename your cluster at any time for better identification. |
| **Kubernetes Version** | Shows the control plane version (e.g., v1.22).             |
| **Resources**          | Total CPU cores, RAM, and storage allocated.               |
| **Region**             | Data center location (e.g., `us-east-1`).                  |
| **Price**              | Estimated monthly cost for the control plane and nodes.    |

## API Endpoint

LKE exposes your cluster’s API endpoint publicly. If you query it without valid credentials, you’ll see a 403 Forbidden error:

```
{
  "kind": "Status",
  "apiVersion": "v1",
  "status": "Failure",
  "message": "Forbidden: User \"system:anonymous\" cannot get path \"/\"",
  "reason": "Forbidden",
  "code": 403
}
```

## Kubeconfig File

Download your cluster’s Kubeconfig from the dashboard and save it to `~/.kube/config` (or merge with your existing file). It includes:

- Certificate Authority data
- API server URL
- User credentials (token)
- Context settings

```
apiVersion: v1
kind: Config
clusters:
- name: lke61870
  cluster:
    server: https://6834d9a9-6416-4d00-9a87-aa36d4df7040.east-2.linodek...
    certificate-authority-data: LS0tLS1CRUdJTiBDRVJVS...
users:
- name: lke61870-admin
  user:
    token: eyJhbhGciOiJS...
contexts:
- name: lke61870-ctx
  context:
    cluster: lke61870
    user: lke61870-admin
    namespace: default
current-context: lke61870-ctx
```

> [!important]
> **Warning**
>
> If your Kubeconfig is ever compromised, **regenerate** it immediately to revoke the old credentials.

![The image shows a confirmation dialog box asking if the user wants to reset the cluster Kubeconfig, warning that this action will delete and regenerate the file and cannot be undone. There are options to "Cancel" or "Reset Kubeconfig."](https://kodekloud.com/kk-media/image/upload/v1752881214/notes-assets/images/Linode-Kubernetes-Engine-Overview-and-navigation-of-the-Linode-Kubernetes-Engine-dashboard/kubeconfig-reset-confirmation-dialog.jpg)

## Kubernetes Dashboard & Node Pools

In the LKE dashboard, you’ll also find quick links for:

- Accessing the **Kubernetes Dashboard**
- Managing cluster **tags**
- **Deleting** the entire cluster

The **Node Pools** section lists each worker node, showing its IP address and status. You can:

- Recycle individual nodes or **all** nodes at once
- Enable **autoscaling** for dynamic scaling
- **Resize** node plans
- Delete individual nodes or entire node pools
- Create additional node pools

---

## Links and References

- [Linode Kubernetes Engine Quickstart](https://www.linode.com/docs/guides/kubernetes/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [kubectl CLI Reference](https://kubernetes.io/docs/reference/kubectl/)

## Related Resources

| Resource   | Purpose                   | Example Command                                   |
| ---------- | ------------------------- | ------------------------------------------------- |
| Pod        | Basic unit of deployment  | `kubectl run nginx --image=nginx`                 |
| Deployment | Managed pods with scaling | `kubectl create deployment nginx --image=nginx`   |
| Service    | Network access to pods    | `kubectl expose deployment nginx --port=80`       |
| NodePool   | Worker node management    | Configure via LKE dashboard or Terraform provider |

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linode-kubernetes-engine/module/9702fbe2-4321-41c5-87e8-8ea364da097d/lesson/04e6b856-3418-48cd-be82-d55c7fd803fd)**
>
> Watch video content
