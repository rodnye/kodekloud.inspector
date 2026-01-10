# Adding and Removing Clusters - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Lens-Kubernetes-IDE/Lens-Introduction/Adding-and-Removing-Clusters)

---

## Table of Contents

- Adding and Removing Clusters
  - Launching Lens
  - Adding a Cluster Automatically
  - Adding a Cluster Manually
  - Viewing and Configuring Cluster Settings
  - Enabling Lens Metrics
  - Smart Terminal
  - Cluster Overview
  - Pod Details and Logs
  - Creating an Nginx Deployment
  - Scaling the Deployment
  - Removing a Cluster
  - Further Reading and References
  - Watch Video
    - Editing a Pod Manifest

---

## Content

Lens - Kubernetes IDE

Lens Introduction

# Adding and Removing Clusters

In this guide, you’ll master Kubernetes cluster management using Lens. You will learn to:

- Launch the Lens application
- Add a cluster automatically via detected kubeconfig
- Add a cluster manually with a pasted kubeconfig
- View and customize cluster settings
- Enable and explore Lens Metrics powered by Prometheus
- Utilize the built-in smart terminal
- Navigate cluster overview and inspect pod details
- Edit a live pod manifest in the UI
- Create, view, and scale an Nginx deployment
- Remove a cluster from Lens safely

---

## Launching Lens

Start the Lens desktop application to reach the Home screen, where you can connect and manage multiple Kubernetes clusters.

---

## Adding a Cluster Automatically

1.  Click **Browse Clusters** in the catalog sidebar.
2.  Lens scans your system for kubeconfig files.
3.  Select a detected cluster (e.g., `minikube`) and hit **Open**.

![The image shows a software interface displaying a catalog with a list of clusters, including one named "minikube," which is currently disconnected. The interface has a dark theme with navigation options on the left.](https://kodekloud.com/kk-media/image/upload/v1752881163/notes-assets/images/Lens-Kubernetes-IDE-Adding-and-Removing-Clusters/software-interface-catalog-clusters.jpg)

Once added, Lens presents performance metrics over the last hour using a built-in Prometheus dashboard:

![The image shows a dashboard interface for monitoring a Kubernetes cluster using Minikube, displaying CPU and memory usage, pod capacity, and warnings.](https://kodekloud.com/kk-media/image/upload/v1752881164/notes-assets/images/Lens-Kubernetes-IDE-Adding-and-Removing-Clusters/kubernetes-minikube-dashboard-monitoring.jpg)

---

## Adding a Cluster Manually

If your kubeconfig isn’t auto-detected, you can paste it directly:

> [!important]
> **Note**
>
> Ensure your kubeconfig includes the correct `contexts` and `clusters` entries for the target environment.

1.  Navigate to **File** → **Add Cluster**.
2.  Paste the full kubeconfig YAML into the editor.
3.  Click **Add Cluster** to register it in Lens.

![The image shows a dark interface for adding clusters from a Kubeconfig file, with a button labeled "Add clusters" and a note about clusters not being merged into the config file.](https://kodekloud.com/kk-media/image/upload/v1752881164/notes-assets/images/Lens-Kubernetes-IDE-Adding-and-Removing-Clusters/kubeconfig-add-clusters-interface.jpg)

---

## Viewing and Configuring Cluster Settings

Select your cluster and open **Settings** to:

- Rename the cluster (e.g., _Edwards Performance Cluster_)
- Upload a custom icon
- Manage namespace visibility
- Configure HTTP/HTTPS proxy
- Tweak metrics collection intervals

![The image shows a dark-themed user interface for managing a Kubernetes cluster, with options like General, Proxy, Terminal, and Metrics on the left sidebar. The main section displays settings for a cluster named "Edwards performance cluster" and its Kubeconfig path.](https://kodekloud.com/kk-media/image/upload/v1752881166/notes-assets/images/Lens-Kubernetes-IDE-Adding-and-Removing-Clusters/kubernetes-cluster-ui-settings.jpg)

---

## Enabling Lens Metrics

Under the **Metrics** tab, install a Prometheus monitoring stack to get detailed resource insights:

| Stack Component    | Metrics Collected              |
| ------------------ | ------------------------------ |
| Prometheus         | CPU, Memory, Disk, Network     |
| kube-state-metrics | Deployment, Pod, Node statuses |
| node-exporter      | Host system metrics            |

Click **Enable** next to each component to deploy it on your cluster.

![The image shows a software interface for managing cluster metrics, with options to enable Prometheus, kube-state-metrics, and node-exporter stacks. The settings are part of a tool called "Lens Metrics" within a cluster management application.](https://kodekloud.com/kk-media/image/upload/v1752881167/notes-assets/images/Lens-Kubernetes-IDE-Adding-and-Removing-Clusters/lens-metrics-cluster-management-interface.jpg)

---

## Smart Terminal

Lens’ built-in terminal automatically switches context to the active cluster. No extra `kubectl config use-context` commands are needed when you switch clusters in the UI.

---

## Cluster Overview

The **Overview** dashboard gives you a high-level look at all workloads:

| Resource Type | Description                     |
| ------------- | ------------------------------- |
| Pods          | Running containers              |
| Deployments   | Replica set controllers         |
| DaemonSets    | Node-level pod orchestration    |
| StatefulSets  | Stateful application management |
| Services      | Network endpoints               |
| ConfigMaps    | Configuration objects           |

![The image shows a dashboard interface for managing a Kubernetes cluster, displaying an overview of workloads and a visual representation of resources.](https://kodekloud.com/kk-media/image/upload/v1752881168/notes-assets/images/Lens-Kubernetes-IDE-Adding-and-Removing-Clusters/kubernetes-cluster-dashboard-overview.jpg)

---

## Pod Details and Logs

Click **Pods** to inspect each pod’s metrics over the last hour—CPU, memory, network I/O, and filesystem usage. You can also:

- `exec` or `attach` to a pod shell
- View container logs
- Edit the live manifest

![The image shows a dashboard interface for managing Kubernetes clusters, displaying details of pods, including CPU usage and metadata for a specific pod named "etcd-minikube."](https://kodekloud.com/kk-media/image/upload/v1752881171/notes-assets/images/Lens-Kubernetes-IDE-Adding-and-Removing-Clusters/kubernetes-dashboard-pod-management.jpg)

### Editing a Pod Manifest

Hit **Edit**, modify the YAML in place, then **Save** to apply changes instantly:

```
apiVersion: v1
kind: Pod
metadata:
  name: kube-apiserver-minikube
  namespace: kube-system
  labels:
    tier: control-plane
  annotations:
    kubedam.kubernetes.io/kube-apiserver.advertise-address.endpoint: "192.168.49.2:8443"
    kubernetes.io/config.hash: e30e12caf2cdbac2939b18e4
    kubernetes.io/config.mirror: e30e12caf2cdbac2939b18e4
    kubernetes.io/config.seam: "2021-08-24T18:07:09Z"
    kubernetes.io/config.source: file
ownerReferences:
  - apiVersion: v1
    kind: Node
    name: minikube
    uid: 7deb6c0a-5ab5-46b9-8975-ec5398777a71
    controller: true
    blockOwnerDeletion: true
```

---

## Creating an Nginx Deployment

Lens simplifies resource creation—no CLI required. Select **Add Resource** and paste:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80
```

Click **Create & Close**. Once the deployment is live, select **nginx-deployment** to view its status and annotations:

```
kubectl.kubernetes.io/last-applied-configuration: >
  {"apiVersion":"apps/v1","kind":"Deployment","metadata":{"annotations":{},"name":"nginx-deployment","namespace":"default"},"spec":{"replicas":3,"selector":{"matchLabels":{"app":"nginx"}},"template":{"metadata":{"labels":{"app":"nginx"}},"spec":{"containers":[{"name":"nginx","image":"nginx:1.14.2","ports":[{"containerPort":80}]}]}}}}
```

---

## Scaling the Deployment

1.  Select your **nginx-deployment**.
2.  Click the **Scale** icon.
3.  Adjust the replica count slider or input a number.

Lens will automatically reflect new pods under **Pods** as they come online:

![The image shows a dashboard interface for managing Kubernetes pods, displaying details such as pod names, namespaces, container status, and running status.](https://kodekloud.com/kk-media/image/upload/v1752881172/notes-assets/images/Lens-Kubernetes-IDE-Adding-and-Removing-Clusters/kubernetes-pods-dashboard-interface.jpg)

---

## Removing a Cluster

When you no longer need a cluster in Lens:

> [!important]
> **Warning**
>
> Deleting a cluster in Lens removes its entry from your Lens config but does **not** delete the cluster itself.

- Right-click the cluster icon in the sidebar.
- Select **Delete** to remove its kubeconfig entry and dashboards.

![The image shows a dashboard interface for monitoring a Kubernetes cluster, displaying CPU and memory usage, along with warnings and system messages.](https://kodekloud.com/kk-media/image/upload/v1752881173/notes-assets/images/Lens-Kubernetes-IDE-Adding-and-Removing-Clusters/kubernetes-cluster-monitoring-dashboard.jpg)

After removal, your Lens Home screen will show no connected clusters.

---

## Further Reading and References

- [Lens Documentation](https://k8slens.dev/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Prometheus Official Site](https://prometheus.io/)

For advanced cluster operations, explore the [Kubernetes API Reference](https://kubernetes.io/docs/reference/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/lens-kubernetes-ide/module/5612678e-a690-4e4e-b43d-966183dffdbf/lesson/6b6d1361-9730-425c-8cd0-7ef1da8c1e51)**
>
> Watch video content
