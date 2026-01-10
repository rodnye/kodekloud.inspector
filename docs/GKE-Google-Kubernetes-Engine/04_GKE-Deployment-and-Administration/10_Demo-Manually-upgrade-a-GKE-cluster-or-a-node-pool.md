# Demo Manually upgrade a GKE cluster or a node pool - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GKE-Google-Kubernetes-Engine/GKE-Deployment-and-Administration/Demo-Manually-upgrade-a-GKE-cluster-or-a-node-pool)

---

## Table of Contents

- Demo Manually upgrade a GKE cluster or a node pool
  - Prerequisites
  - 1. Set Up Cloud Shell Environment
  - 2. List Available GKE Versions
  - 3. Inspect Your Cluster’s Current Version
  - 4. Upgrade the Control Plane (Master)
  - 5. Upgrade the Node Pool
  - 6. Verify the Final Versions
  - Links and References
  - Watch Video

---

## Content

GKE - Google Kubernetes Engine

GKE Deployment and Administration

# Demo Manually upgrade a GKE cluster or a node pool

In this guide, you’ll learn how to upgrade your GKE control plane (master) and node pools using the `gcloud` CLI. Manual upgrades give you granular control over version selection and scheduling.

**Table of Contents**

1.  [Prerequisites](#prerequisites)
2.  [1\. Set Up Cloud Shell Environment](#1-set-up-cloud-shell-environment)
3.  [2\. List Available GKE Versions](#2-list-available-gke-versions)
4.  [3\. Inspect Your Cluster’s Current Version](#3-inspect-your-clusters-current-version)
5.  [4\. Upgrade the Control Plane (Master)](#4-upgrade-the-control-plane-master)
6.  [5\. Upgrade the Node Pool](#5-upgrade-the-node-pool)
7.  [6\. Verify the Final Versions](#6-verify-the-final-versions)
8.  [Links and References](#links-and-references)

---

## Prerequisites

- You have the [Google Cloud SDK](https://cloud.google.com/sdk) installed or are using **Cloud Shell**.
- Your IAM account has the **Kubernetes Engine Admin** role or equivalent permissions.

> [!important]
> **Note**
>
> Ensure you’re authenticated:
>
> ```
> gcloud auth login
> gcloud auth application-default login
> ```

---

## 1\. Set Up Cloud Shell Environment

Configure your active project and default compute zone:

```
gcloud config set project YOUR_PROJECT_ID
gcloud config set compute/zone us-west1-a
```

Replace `YOUR_PROJECT_ID` with your Google Cloud project ID.

---

## 2\. List Available GKE Versions

Retrieve the supported control plane and node versions for your zone:

```
gcloud container get-server-config
```

Sample output:

```
defaultClusterVersion: 1.27.3-gke.100
validMasterVersions:
- 1.27.3-gke.900
- 1.27.3-gke.100
- 1.27.2-gke.2100
validNodeVersions:
- 1.27.4-gke.900
- 1.27.3-gke.1700
- 1.27.2-gke.2100
validImageTypes:
- COS_CONTAINERD
- UBUNTU_CONTAINERD
- WINDOWS_LTSC_CONTAINERD
```

| Field                 | Description                                            |
| --------------------- | ------------------------------------------------------ |
| defaultClusterVersion | Version applied when no override is provided           |
| validMasterVersions   | Available versions for the control plane (master)      |
| validNodeVersions     | Available versions for the node pools                  |
| validImageTypes       | Container-optimized OS images supported for node pools |

---

## 3\. Inspect Your Cluster’s Current Version

Describe your cluster to view its current master and node versions:

```
gcloud container clusters describe gke-deep-dive
```

Look for these key fields:

```
currentMasterVersion: 1.27.3-gke.100
currentNodeVersion:   1.27.3-gke.100
nodePools:
- name: default-pool
  config:
    imageType: COS_CONTAINERD
    machineType: e2-medium
  management:
    autoUpgrade: true
    autoRepair: true
```

| Field                    | Current Value     | Description                          |
| ------------------------ | ----------------- | ------------------------------------ |
| currentMasterVersion     | 1.27.3-gke.100    | Control plane version                |
| currentNodeVersion       | 1.27.3-gke.100    | Node pool version                    |
| `nodePools[].management` | autoUpgrade: true | Automatic upgrades enabled for nodes |

---

## 4\. Upgrade the Control Plane (Master)

Upgrade the control plane to a target version (for example, `1.27.3-gke.1700`):

```
gcloud container clusters upgrade gke-deep-dive \
  --master \
  --cluster-version 1.27.3-gke.1700
```

When prompted:

```
Do you want to continue (Y/n)? Y
```

> [!important]
> **Warning**
>
> Control plane upgrades can cause brief API server interruptions. Plan a maintenance window if running production workloads.

This operation updates only the control plane.

---

## 5\. Upgrade the Node Pool

After the master upgrade finishes, proceed with the node pool. By default, omitting `--cluster-version` upgrades nodes to match the control plane version.

To specify a different version (e.g., `1.27.4-gke.900`):

```
gcloud container clusters upgrade gke-deep-dive \
  --node-pool default-pool \
  --cluster-version 1.27.4-gke.900
```

Confirm the prompt:

```
Do you want to continue (Y/n)? Y
```

Nodes are cordoned, drained, and replaced one at a time based on your pool’s update strategy.

---

## 6\. Verify the Final Versions

Re-run the describe command to confirm both versions:

```
gcloud container clusters describe gke-deep-dive
```

Expected output:

```
currentMasterVersion: 1.27.3-gke.1700
currentNodeVersion:   1.27.4-gke.900
```

Your cluster is now running the specified master and node pool versions.

---

## Links and References

- [GKE Upgrade Methodology](https://cloud.google.com/kubernetes-engine/docs/how-to/upgrading)
- [gcloud container clusters upgrade](https://cloud.google.com/sdk/gcloud/reference/container/clusters/upgrade)
- [Kubernetes Versioning](https://kubernetes.io/releases/version-skew-policy/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gke-google-kubernetes-engine/module/897349c1-bf57-4c08-82fb-0aa0ce0e0f6b/lesson/45130818-f9e4-4d01-8055-699597c69ddf)**
>
> Watch video content
