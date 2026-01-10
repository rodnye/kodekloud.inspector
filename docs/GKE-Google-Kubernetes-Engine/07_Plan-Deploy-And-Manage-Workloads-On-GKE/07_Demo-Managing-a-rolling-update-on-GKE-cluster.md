# Demo Managing a rolling update on GKE cluster - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GKE-Google-Kubernetes-Engine/Plan-Deploy-And-Manage-Workloads-On-GKE/Demo-Managing-a-rolling-update-on-GKE-cluster)

---

## Table of Contents

- Demo Managing a rolling update on GKE cluster
  - Prerequisites
  - 1. Configure and Create the Cluster
  - 2. Deploy a Simple Nginx Application
  - 3. Perform Rolling Updates
  - 4. Rollback a Deployment
  - Links and References
  - Watch Video
    - 3.1 Update to Nginx 1.9.1
    - 3.2 Update to Nginx 1.21.0
    - 4.1 Rollback to the Previous Revision
    - 4.2 Rollback to a Specific Revision

---

## Content

GKE - Google Kubernetes Engine

Plan Deploy And Manage Workloads On GKE

# Demo Managing a rolling update on GKE cluster

In this tutorial, you’ll learn how to perform and manage rolling updates on a Google Kubernetes Engine (GKE) cluster. These concepts apply equally to upstream Kubernetes, enabling you to update container images with zero downtime and perform safe rollbacks when needed.

## Prerequisites

- Google Cloud SDK with `gcloud` and `kubectl` installed
- A Google Cloud project with billing enabled
- [Enable the Kubernetes Engine API](https://console.cloud.google.com/apis/library/container.googleapis.com)

---

## 1\. Configure and Create the Cluster

First, set your Compute Engine zone and create a single-node GKE cluster named `gke-deep-dive`.

```
# Set your desired zone
gcloud config set compute/zone us-west1-a


# Create a cluster with one node
gcloud container clusters create gke-deep-dive \
  --num-nodes=1 \
  --machine-type=e2-medium \
  --disk-type=pd-standard \
  --disk-size=10
```

> [!important]
> **Note**
>
> Cluster provisioning can take a few minutes. You can monitor progress in the Google Cloud Console under Kubernetes Engine > Clusters.

---

## 2\. Deploy a Simple Nginx Application

Create a Deployment manifest `gke-deep-dive-app.yaml` with two replicas of Nginx:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 2
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
        image: nginx:1.7.9
        ports:
        - containerPort: 80
```

Apply the manifest and verify the pods:

```
kubectl apply -f gke-deep-dive-app.yaml
kubectl get deployments
kubectl get pods
```

| RESOURCE TYPE | COMMAND                                   | DESCRIPTION                        |
| ------------- | ----------------------------------------- | ---------------------------------- |
| Deployment    | `kubectl apply -f gke-deep-dive-app.yaml` | Create or update the deployment    |
| Pods          | `kubectl get pods`                        | List running pods and their status |

---

## 3\. Perform Rolling Updates

GKE supports in-place rolling updates, ensuring that at least one replica remains available while others are replaced.

| Action          | Command                                                           | Description                         |
| --------------- | ----------------------------------------------------------------- | ----------------------------------- |
| Update image    | `kubectl set image deployment/nginx-deployment nginx=nginx:1.9.1` | Change the container image to 1.9.1 |
| Monitor rollout | `kubectl rollout status deployment/nginx-deployment`              | Wait until the rollout completes    |

### 3.1 Update to Nginx 1.9.1

```
kubectl set image deployment/nginx-deployment nginx=nginx:1.9.1
kubectl rollout status deployment/nginx-deployment
```

Verify the new pods are running:

```
kubectl get pods
```

### 3.2 Update to Nginx 1.21.0

Perform another image update to observe an in-progress rollout:

```
kubectl set image deployment/nginx-deployment nginx=nginx:1.21.0
kubectl rollout status deployment/nginx-deployment
```

---

## 4\. Rollback a Deployment

If a rollout introduces an issue, you can revert to a previous revision.

### 4.1 Rollback to the Previous Revision

```
kubectl rollout undo deployment/nginx-deployment
kubectl describe deployment/nginx-deployment | grep Image
```

### 4.2 Rollback to a Specific Revision

1.  View rollout history:

    ```
    kubectl rollout history deployment/nginx-deployment
    ```

2.  Roll back to revision 1 (original version):

    ```
    kubectl rollout undo deployment/nginx-deployment --to-revision=1
    kubectl describe deployment/nginx-deployment | grep Image
    ```

> [!important]
> **Warning**
>
> Rolling back to a previous revision may disrupt your application. Always test in a staging environment before rolling back in production.

---

## Links and References

- [GKE Documentation](https://cloud.google.com/kubernetes-engine/docs)
- [Kubernetes Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- [kubectl Rollout](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#rollout)
- [Nginx Docker Hub](https://hub.docker.com/_/nginx)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gke-google-kubernetes-engine/module/12020a5d-e2fd-46b5-82fb-35aa9cd57ad6/lesson/1890a557-b949-417a-bcab-3faad7e84049)**
>
> Watch video content
