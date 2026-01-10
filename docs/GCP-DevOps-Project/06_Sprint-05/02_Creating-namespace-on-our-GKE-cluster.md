# Creating namespace on our GKE cluster - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-DevOps-Project/Sprint-05/Creating-namespace-on-our-GKE-cluster)

---

## Table of Contents

- Creating namespace on our GKE cluster
  - Why Use Kubernetes Namespaces?
  - Prerequisites
  - Step 1. Connect to Your GKE Cluster
  - Step 2. List Existing Namespaces
  - Step 3. Create a New Namespace
  - Step 4. Verify Your New Namespace
  - Step 5. (Optional) Set the New Namespace as Default
  - Step 6. View Namespaced Workloads in GCP Console
  - Command Reference Table
  - Links and References
  - Watch Video

---

## Content

GCP DevOps Project

Sprint 05

# Creating namespace on our GKE cluster

In this guide, you’ll learn how to create and manage a dedicated Kubernetes namespace on a Google Kubernetes Engine (GKE) cluster. Namespaces provide logical separation for applications, improving resource management, security, and clarity.

## Why Use Kubernetes Namespaces?

A single GKE cluster can host multiple environments or teams. Namespaces help you:

- Enforce resource quotas and limits per team or environment
- Simplify Role-Based Access Control (RBAC)
- Keep workloads organized and isolated

> [!important]
> **Note**
>
> Namespaces are a native Kubernetes feature. Learn more in the [Kubernetes Namespaces documentation](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/).

## Prerequisites

- A Google Cloud project (e.g., `kodekloud-gcp-training`)
- A GKE cluster named `gcp-devops-project` in zone `us-central1-c`
- Access to **Cloud Shell**, or local installation of [`gcloud`](https://cloud.google.com/sdk/docs) and [`kubectl`](https://kubernetes.io/docs/tasks/tools/)

---

## Step 1. Connect to Your GKE Cluster

1.  Open **Cloud Shell** in the GCP Console:  
    **Kubernetes Engine** > **Clusters** > **Connect** > **Run in Cloud Shell**.
2.  Authorize Cloud Shell by pressing **Enter** when prompted.
3.  Fetch cluster credentials:

    ```
    gcloud container clusters get-credentials gcp-devops-project \
      --zone us-central1-c \
      --project kodekloud-gcp-training
    ```

Your local `kubeconfig` is now configured to interact with the `gcp-devops-project` cluster.

---

## Step 2. List Existing Namespaces

Run:

```
kubectl get namespaces
```

Example output:

```
NAME              STATUS   AGE
default           Active   15m
kube-node-lease   Active   15m
kube-public       Active   15m
kube-system       Active   15m
```

---

## Step 3. Create a New Namespace

Create the `gcp-devops-prod` namespace for production workloads:

```
kubectl create namespace gcp-devops-prod
```

---

## Step 4. Verify Your New Namespace

List namespaces again:

```
kubectl get namespaces
```

You should see:

```
NAME                  STATUS   AGE
default               Active   2m
gcp-devops-prod       Active   5s
kube-node-lease       Active   15m
kube-public           Active   15m
kube-system           Active   15m
```

---

## Step 5. (Optional) Set the New Namespace as Default

To avoid specifying `-n gcp-devops-prod` on every command, update your context:

```
kubectl config set-context --current --namespace=gcp-devops-prod
```

Confirm your active namespace:

```
kubectl config view --minify --output "jsonpath={..namespace}"
# gcp-devops-prod
```

> [!important]
> **Warning**
>
> Switching the default namespace affects all subsequent `kubectl` commands in this session.

---

## Step 6. View Namespaced Workloads in GCP Console

1.  In the GCP Console, go to **Kubernetes Engine** > **Workloads**.
2.  Click **Show system workloads**, then open the **Filter** pane.
3.  Select **gcp-devops-prod** under Namespace and apply.

You’ll see workloads scoped to your production namespace (none yet, until you deploy).

---

## Command Reference Table

| Step | Description                             | Command                                                                                                              |
| ---- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| 1    | Authenticate to GKE cluster             | `gcloud container clusters get-credentials gcp-devops-project --zone us-central1-c --project kodekloud-gcp-training` |
| 2    | List all namespaces                     | `kubectl get namespaces`                                                                                             |
| 3    | Create a new namespace                  | `kubectl create namespace gcp-devops-prod`                                                                           |
| 5    | Set new namespace as default (optional) | `kubectl config set-context --current --namespace=gcp-devops-prod`                                                   |

---

## Links and References

- [Kubernetes Namespaces](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/)
- [GKE Documentation](https://cloud.google.com/kubernetes-engine/docs)
- [kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)

That’s it! You’ve successfully created, verified, and configured a namespace in your GKE cluster. You can now deploy applications into `gcp-devops-prod`.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-devops-project/module/c1a43d47-87cb-459f-a9bf-2000d6223395/lesson/5edc012d-3f98-4d8d-b1ff-0ad0ec770e72)**
>
> Watch video content
