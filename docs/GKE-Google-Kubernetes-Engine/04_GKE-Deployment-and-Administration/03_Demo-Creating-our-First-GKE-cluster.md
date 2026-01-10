# Demo Creating our First GKE cluster - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GKE-Google-Kubernetes-Engine/GKE-Deployment-and-Administration/Demo-Creating-our-First-GKE-cluster)

---

## Table of Contents

- Demo Creating our First GKE cluster
  - Prerequisites
  - 1. Activate Cloud Shell
  - 2. Set the Default Compute Zone
  - 3. Provision the GKE Cluster
  - 4. Verify Cluster Creation
  - References
  - Watch Video
    - a) Using the CLI
    - b) Using the Cloud Console

---

## Content

GKE - Google Kubernetes Engine

GKE Deployment and Administration

# Demo Creating our First GKE cluster

In this tutorial, you’ll learn how to launch a zonal Google Kubernetes Engine (GKE) cluster using Google Cloud Shell. By following these steps, you will:

- Open and configure **Cloud Shell**
- Set a default compute zone to simplify future commands
- Provision a GKE cluster with a custom boot disk
- Validate the cluster creation via CLI and Console

This walkthrough is perfect for DevOps engineers and cloud practitioners who want to get started with GKE on Google Cloud.

## Prerequisites

- A Google Cloud project with billing enabled
- The **Kubernetes Engine Admin** or **Owner** IAM role
- Access to [Cloud Shell](https://cloud.google.com/shell/docs/overview)

---

## 1\. Activate Cloud Shell

1.  Sign in to the [Google Cloud Console](https://console.cloud.google.com/).
2.  Click the **Activate Cloud Shell** button in the top-right toolbar.
3.  Wait for the shell to initialize; you should see a prompt like:

```
Welcome to Cloud Shell! Type "help" to get started.
Your Cloud Platform project in this session is set to clgcporg8-015.
Use "gcloud config set project [PROJECT_ID]" to change to a different project.
odl_user_1038285@cloudshell:~  $
```

---

## 2\. Set the Default Compute Zone

Rather than appending `--zone` to every `gcloud` command, define a default zone for this session. In this lesson, we’ll use `us-west1-a`:

```
gcloud config set compute/zone us-west1-a
```

Expected output:

```
Updated property [compute/zone].
```

> [!important]
> **Why Set a Default Zone?**
>
> Defining a default zone streamlines your workflow by removing the need to specify it repeatedly, reducing the risk of mistakes.

---

## 3\. Provision the GKE Cluster

We’ll create a cluster named `gke-deep-dive` with one node and a custom HDD boot disk. You can adjust these parameters to suit your needs.

| Setting      | Description                | Flag                      |
| ------------ | -------------------------- | ------------------------- |
| Cluster name | Human-readable identifier  | `--cluster=gke-deep-dive` |
| Node count   | Number of worker nodes     | `--num-nodes=1`           |
| Disk type    | Standard HDD (pd-standard) | `--disk-type=pd-standard` |
| Disk size    | 10 GiB                     | `--disk-size=10`          |

Execute:

```
gcloud container clusters create gke-deep-dive \
  --num-nodes=1 \
  --disk-type=pd-standard \
  --disk-size=10
```

You’ll see output similar to:

```
Creating cluster gke-deep-dive in us-west1-a...
Cluster is being configured...working...
```

> [!important]
> **Cluster Provisioning Time**
>
> Cluster creation typically takes **10–15 minutes**. Do not interrupt the process.
> Monitor progress via the Cloud Shell output or the GKE Console.

---

## 4\. Verify Cluster Creation

### a) Using the CLI

List all GKE clusters in your project:

```
gcloud container clusters list
```

You should see:

```
NAME            LOCATION     MASTER_VERSION  NODE_VERSION   NODE_COUNT
gke-deep-dive   us-west1-a   1.24.8-gke.100  1.24.8-gke.100  1
```

### b) Using the Cloud Console

1.  In the Google Cloud Console, navigate to **Kubernetes Engine** ▶ **Clusters**.
2.  Confirm that **gke-deep-dive** appears under **us-west1-a**.

Congratulations! You’ve successfully created and verified your first GKE cluster.

---

## References

- [Google Kubernetes Engine Documentation](https://cloud.google.com/kubernetes-engine/docs)
- [gcloud container clusters create](https://cloud.google.com/sdk/gcloud/reference/container/clusters/create)
- [Cloud Shell Overview](https://cloud.google.com/shell/docs/overview)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gke-google-kubernetes-engine/module/897349c1-bf57-4c08-82fb-0aa0ce0e0f6b/lesson/f0db4d21-aabe-469c-9082-ca486a9f8b64)**
>
> Watch video content
