# Sprint 02 review - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-DevOps-Project/Sprint-02/Sprint-02-review)

---

## Table of Contents

- Sprint 02 review
  - What We Achieved
  - Essential gcloud & kubectl Commands
  - Key Takeaways
  - Next Steps: Sprint 03 Preview
  - Links and References
  - Watch Video

---

## Content

GCP DevOps Project

Sprint 02

# Sprint 02 review

Welcome back! In this lesson, we recap Sprint 02, where we focused on:

| Objective              | Description                                                            |
| ---------------------- | ---------------------------------------------------------------------- |
| Create a GCP account   | Sign up for Google Cloud Platform and configure billing.               |
| Learn GKE fundamentals | Understand Kubernetes architecture and Google Kubernetes Engine (GKE). |
| Set up a GKE cluster   | Deploy and initialize a Kubernetes cluster on GCP.                     |

---

## What We Achieved

1.  **GCP Account Setup**
    - Registered for a [Google Cloud Platform](https://cloud.google.com) account.
    - Enabled billing and configured IAM permissions.

2.  **GKE Fundamentals**
    - Explored key concepts: nodes, pods, control plane, and networking.
    - Reviewed GKE-specific features like auto-scaling and regional clusters.

3.  **Cluster Provisioning**
    - Created a GKE cluster using the `gcloud` CLI.
    - Retrieved credentials and verified the cluster’s health.

> [!important]
> **Warning**
>
> Make sure your IAM user has the **Kubernetes Engine Admin** role before creating a cluster. Insufficient permissions will cause `gcloud container clusters create` to fail.

---

## Essential gcloud & kubectl Commands

```
# Authenticate with GCP
gcloud auth login

# Set your project ID
gcloud config set project YOUR_PROJECT_ID

# Create a GKE cluster in us-central1-a
gcloud container clusters create my-cluster \
  --zone us-central1-a \
  --machine-type e2-medium \
  --num-nodes 3

# Retrieve cluster credentials for kubectl
gcloud container clusters get-credentials my-cluster \
  --zone us-central1-a

# Verify node status
kubectl get nodes
```

> [!important]
> **Note**
>
> Always run `gcloud container clusters get-credentials` before executing `kubectl` commands. This ensures your CLI is pointed to the correct cluster endpoint.

---

## Key Takeaways

- Defining sprint tasks is just the starting point; dive into related subtasks (e.g., authentication, IAM) for a deeper understanding.
- Hands-on practice with `gcloud` and `kubectl` cements your GKE workflow.
- Validating cluster connectivity early prevents common deployment headaches.

---

## Next Steps: Sprint 03 Preview

In Sprint 03, we will:

- Deploy a sample application using a Kubernetes Deployment and Service.
- Scale workloads with the Horizontal Pod Autoscaler.
- Perform rolling updates to achieve zero-downtime releases.

---

## Links and References

- [Google Cloud Platform](https://cloud.google.com)
- [GKE Documentation](https://cloud.google.com/kubernetes-engine/docs)
- [kubectl CLI Reference](https://kubernetes.io/docs/reference/kubectl/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-devops-project/module/e0cc2e03-d889-468c-af73-0866856711aa/lesson/c288f12c-b0df-4db6-be57-036549e0b3c8)**
>
> Watch video content
