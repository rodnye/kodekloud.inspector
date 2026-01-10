# Demo Apply labels and tags to GKE clusters - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GKE-Google-Kubernetes-Engine/GKE-Deployment-and-Administration/Demo-Apply-labels-and-tags-to-GKE-clusters)

---

## Table of Contents

- Demo Apply labels and tags to GKE clusters
  - Table of Contents
  - 1. Create a New Cluster with a Label
  - 2. View Labels on an Existing Cluster
  - 3. Update Labels on an Existing Cluster
  - 4. Remove a Label from a Cluster
  - 5. Verify Labels on the New Cluster
  - 6. Remove the Label from the New Cluster
  - 7. Node Pool Labels Remain After Cluster Label Removal
  - Command Reference
  - Links and References
  - Watch Video

---

## Content

GKE - Google Kubernetes Engine

GKE Deployment and Administration

# Demo Apply labels and tags to GKE clusters

In this tutorial, you’ll learn how to manage **labels** on Google Kubernetes Engine (GKE) clusters and their node pools. You will:

1.  Create a new GKE cluster with labels
2.  View labels on an existing cluster
3.  Update labels on a cluster
4.  Remove labels from a cluster
5.  Verify labels on both the cluster and its node pools
6.  Understand how cluster-level label changes affect node pools

---

## Table of Contents

- [1\. Create a New Cluster with a Label](#1-create-a-new-cluster-with-a-label)
- [2\. View Labels on an Existing Cluster](#2-view-labels-on-an-existing-cluster)
- [3\. Update Labels on an Existing Cluster](#3-update-labels-on-an-existing-cluster)
- [4\. Remove a Label from a Cluster](#4-remove-a-label-from-a-cluster)
- [5\. Verify Labels on the New Cluster](#5-verify-labels-on-the-new-cluster)
- [6\. Remove the Label from the New Cluster](#6-remove-the-label-from-the-new-cluster)
- [7\. Node Pool Labels Remain After Cluster Label Removal](#7-node-pool-labels-remain-after-cluster-label-removal)
- [Command Reference](#command-reference)
- [Links and References](#links-and-references)

---

## 1\. Create a New Cluster with a Label

Spin up a GKE cluster named `gke-deep-dive-new` with:

- 1 node
- 10 GB standard persistent disk
- Label `test=gke`

```
gcloud container clusters create gke-deep-dive-new \
  --num-nodes=1 \
  --disk-type=pd-standard \
  --disk-size=10 \
  --labels=test=gke
```

This command provisions a single-node pool (HDD) and attaches the `test=gke` label at creation.

---

## 2\. View Labels on an Existing Cluster

To inspect labels on a cluster (e.g., `gke-deep-dive`) run:

```
gcloud container clusters describe gke-deep-dive \
  --format="yaml(resourceLabels)"
```

If there are no labels, the `resourceLabels` section will be empty.

---

## 3\. Update Labels on an Existing Cluster

Add or modify labels using `--update-labels`. For example, set `newlabel=gkeold` on `gke-deep-dive`:

```
gcloud container clusters update gke-deep-dive \
  --update-labels=newlabel=gkeold
```

Verify the update:

```
gcloud container clusters describe gke-deep-dive \
  --format="yaml(resourceLabels)"
```

Expected output:

```
resourceLabels:
  newlabel: gkeold
```

---

## 4\. Remove a Label from a Cluster

To delete a label, specify its key with `--remove-labels`:

```
gcloud container clusters update gke-deep-dive \
  --remove-labels=newlabel
```

Confirm removal:

```
gcloud container clusters describe gke-deep-dive \
  --format="yaml(resourceLabels)"
```

The `resourceLabels` field should now be empty.

---

## 5\. Verify Labels on the New Cluster

Check that `gke-deep-dive-new` has the `test=gke` label:

```
gcloud container clusters describe gke-deep-dive-new \
  --format="yaml(resourceLabels)"
```

You should see:

```
resourceLabels:
  test: gke
```

Alternatively, filter with `grep`:

```
gcloud container clusters describe gke-deep-dive-new \
  | grep -i resourceLabels -A1
```

---

## 6\. Remove the Label from the New Cluster

Remove the `test` label:

```
gcloud container clusters update gke-deep-dive-new \
  --remove-labels=test
```

Verify:

```
gcloud container clusters describe gke-deep-dive-new \
  --format="yaml(resourceLabels)"
```

`resourceLabels` will now be empty.

---

## 7\. Node Pool Labels Remain After Cluster Label Removal

Cluster-level label updates **do not** automatically propagate to existing node pools. Even after removing `test` from the cluster, the default node pool still holds its label:

```
gcloud container clusters describe gke-deep-dive-new \
  --format="yaml(nodePools[0].resourceLabels)"
```

```
resourceLabels:
  test: gke
```

To remove a label from the node pool itself:

```
gcloud container node-pools update default-pool \
  --cluster=gke-deep-dive-new \
  --remove-labels=test
```

> [!important]
> **Note**
>
> After detaching a label from the cluster, always verify node-pool labels if you rely on them for workloads, autoscaling, or monitoring.

---

## Command Reference

| Operation                 | Command Snippet                                                |
| ------------------------- | -------------------------------------------------------------- |
| Create cluster with label | `gcloud container clusters create ... --labels=test=gke`       |
| View cluster labels       | `gcloud container clusters describe ... --format="yaml(...)"`  |
| Update cluster labels     | `gcloud container clusters update ... --update-labels=key=val` |
| Remove cluster labels     | `gcloud container clusters update ... --remove-labels=key`     |
| View node-pool labels     | `gcloud container clusters describe ... --format="yaml(...)"`  |
| Remove node-pool label    | `gcloud container node-pools update ... --remove-labels=key`   |

---

## Links and References

- [GKE Labels Documentation](https://cloud.google.com/kubernetes-engine/docs/concepts/labels)
- [Kubernetes Labels and Selectors](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/)
- [gcloud container clusters](https://cloud.google.com/sdk/gcloud/reference/container/clusters)
- [gcloud container node-pools](https://cloud.google.com/sdk/gcloud/reference/container/node-pools)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gke-google-kubernetes-engine/module/897349c1-bf57-4c08-82fb-0aa0ce0e0f6b/lesson/c65372aa-2491-489b-a47c-c9c2c5163a8f)**
>
> Watch video content
