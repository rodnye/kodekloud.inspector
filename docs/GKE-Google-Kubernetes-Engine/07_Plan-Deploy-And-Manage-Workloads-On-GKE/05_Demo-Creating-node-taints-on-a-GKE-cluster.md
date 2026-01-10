# Demo Creating node taints on a GKE cluster - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GKE-Google-Kubernetes-Engine/Plan-Deploy-And-Manage-Workloads-On-GKE/Demo-Creating-node-taints-on-a-GKE-cluster)

---

## Table of Contents

- Demo Creating node taints on a GKE cluster
  - Prerequisites
  - Node Pools & Taints Overview
  - 1. Create a Cluster with a Tainted Default Node Pool
  - 2. Add an Untainted Node Pool
  - 3. Update a Node Pool’s Taint
  - 4. Create a Dedicated Node Pool with a Different Taint
  - 5. Deploy a Pod That Tolerates the Shared Taint
  - 6. Remove the Taint from the Default Node Pool
  - 7. Deploy a Pod Without Any Toleration
  - Links and References
  - Watch Video
    - Verify the Taint

---

## Content

GKE - Google Kubernetes Engine

Plan Deploy And Manage Workloads On GKE

# Demo Creating node taints on a GKE cluster

In this tutorial, you’ll learn how to control pod placement in Google Kubernetes Engine (GKE) by applying **node taints** and **tolerations**. We’ll cover:

1.  Creating a GKE cluster with a tainted default node pool
2.  Adding an untainted node pool
3.  Updating node pool taints post‐creation
4.  Provisioning a dedicated node pool with a unique taint
5.  Deploying pods **with** and **without** tolerations to observe scheduling behavior
6.  Removing a taint and watching pods land on the default pool

---

## Prerequisites

- Google Cloud SDK installed or access to [Cloud Shell](https://cloud.google.com/shell).
- Authentication configured (`gcloud auth login`).

Set your project and compute zone:

```
gcloud config set project YOUR_PROJECT_ID
gcloud config set compute/zone us-west1-a
```

---

## Node Pools & Taints Overview

| Node Pool                    | Taint                                | Purpose                 |
| ---------------------------- | ------------------------------------ | ----------------------- |
| default                      | `function=research:PreferNoSchedule` | Research workloads      |
| gke-deep-dive-pool           | _none_                               | Shared/utility services |
| gke-deep-dive-pool (updated) | `function=shared:NoSchedule`         | Shared services         |
| gke-deep-dive-pool-dedicated | `dedicated=dev:NoExecute`            | Development workloads   |

---

## 1\. Create a Cluster with a Tainted Default Node Pool

```
gcloud container clusters create gke-deep-dive \
  --num-nodes=1 \
  --disk-type=pd-standard \
  --disk-size=10 \
  --node-taints=function=research:PreferNoSchedule
```

> [!important]
> **Note**
>
> Cluster provisioning can take **10–15 minutes**. Use `gcloud container operations list` to track progress.

### Verify the Taint

```
kubectl get nodes
kubectl describe node <NODE_NAME> | grep -A1 "Taints"
```

Expected output:

```
Taints:
  function=research:PreferNoSchedule
```

---

## 2\. Add an Untainted Node Pool

New node pools inherit **no** taints by default. Create one:

```
gcloud container node-pools create gke-deep-dive-pool \
  --cluster=gke-deep-dive \
  --num-nodes=1 \
  --disk-type=pd-standard \
  --disk-size=10
```

Verify:

```
kubectl get nodes
kubectl describe node <NEW_NODE_NAME> | grep -A1 "Taints"
```

Expected:

```
Taints: <none>
```

---

## 3\. Update a Node Pool’s Taint

Apply a new taint to the existing pool:

```
gcloud beta container node-pools update gke-deep-dive-pool \
  --cluster=gke-deep-dive \
  --node-taints=function=shared:NoSchedule
```

Verify:

```
kubectl describe node <NEW_NODE_NAME> | grep -A1 "Taints"
```

Expected:

```
Taints:
  function=shared:NoSchedule
```

---

## 4\. Create a Dedicated Node Pool with a Different Taint

Provision a third pool for development workloads:

```
gcloud container node-pools create gke-deep-dive-pool-dedicated \
  --cluster=gke-deep-dive \
  --num-nodes=1 \
  --disk-type=pd-standard \
  --disk-size=10 \
  --node-taints=dedicated=dev:NoExecute
```

---

## 5\. Deploy a Pod That Tolerates the Shared Taint

Save as `shared-pod.yaml`:

```
apiVersion: v1
kind: Pod
metadata:
  name: shared-pod
spec:
  containers:
  - name: nginx
    image: nginx
  tolerations:
  - key: "function"
    operator: "Equal"
    value: "shared"
    effect: "NoSchedule"
```

Apply and inspect scheduling:

```
kubectl apply -f shared-pod.yaml
kubectl get pods -o wide
```

The pod should land on the node with `function=shared:NoSchedule`.

---

## 6\. Remove the Taint from the Default Node Pool

First, identify the default node:

```
kubectl get nodes
```

Then remove its taint:

```
kubectl taint nodes <DEFAULT_NODE_NAME> function-
```

Verify:

```
kubectl describe node <DEFAULT_NODE_NAME> | grep -A1 "Taints"
```

Expected:

```
Taints: <none>
```

> [!important]
> **Warning**
>
> Removing taints allows **all** untolerated pods to schedule on this node pool. Plan accordingly.

---

## 7\. Deploy a Pod Without Any Toleration

Save as `dedicated-pod.yaml`:

```
apiVersion: v1
kind: Pod
metadata:
  name: dedicated-pod
spec:
  containers:
  - name: nginx
    image: nginx
```

Apply and observe:

```
kubectl apply -f dedicated-pod.yaml
kubectl get pods
```

Since the default pool is now untainted, `dedicated-pod` transitions from `Pending` to `Running` on the default node.

---

Congratulations! You’ve successfully used **node taints** and **tolerations** to control pod placement in a GKE cluster.

---

## Links and References

- [GKE Taints and Tolerations](https://cloud.google.com/kubernetes-engine/docs/how-to/node-taints)
- [Kubernetes Scheduling Concepts](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/)
- [kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gke-google-kubernetes-engine/module/12020a5d-e2fd-46b5-82fb-35aa9cd57ad6/lesson/5638a201-3c14-4992-b33e-7834e0dd82a8)**
>
> Watch video content
