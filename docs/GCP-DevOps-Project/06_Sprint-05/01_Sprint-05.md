# Sprint 05 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-DevOps-Project/Sprint-05/Sprint-05)

---

## Table of Contents

- Sprint 05
  - Milestone Breakdown
  - 1. Create a GKE Namespace
  - 2. Prepare the Deployment Manifest
  - 3. Update Your Cloud Build Configuration
  - 4. Validate the Deployment
  - Watch Video

---

## Content

GCP DevOps Project

Sprint 05

# Sprint 05

In Sprint 0.5, we’ll extend our CI/CD pipeline to push Docker images into a Google Kubernetes Engine (GKE) cluster. By breaking this large goal into focused milestones, we improve visibility, estimation accuracy, and enable parallel work.

> [!important]
> **Why split into milestones?**
>
> Breaking down tasks helps with:
>
> - Tracking incremental progress
> - Clarifying deliverables
> - Providing more accurate time estimates
> - Allowing multiple team members to work concurrently

## Milestone Breakdown

| Step                           | Goal                                   | Example Command                   |
| ------------------------------ | -------------------------------------- | --------------------------------- |
| 1\\. Create Namespace          | Isolate resources in the cluster       | `kubectl create namespace my-app` |
| 2\\. Write Deployment Manifest | Define your Kubernetes Deployment      | See `deployment.yaml` below       |
| 3\\. Update Cloud Build        | Apply manifests in your build pipeline | See `cloudbuild.yaml` snippet     |
| 4\\. Validate Deployment       | Ensure pods and services are running   | `kubectl get all -n my-app`       |

![The image lists four steps for a deployment process: creating a namespace in a GKE cluster, creating a deployment file, updating Cloud Build code, and validating the deployment.](https://kodekloud.com/kk-media/image/upload/v1752875500/notes-assets/images/GCP-DevOps-Project-Sprint-05/gke-deployment-process-steps.jpg)

---

## 1\. Create a GKE Namespace

Define an isolated namespace before any resources are applied:

```
# namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: my-app
```

Apply it in your pipeline or manually:

```
kubectl apply -f namespace.yaml
```

## 2\. Prepare the Deployment Manifest

Create `deployment.yaml` to describe your application pods and replicas:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app-deployment
  namespace: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app
        image: gcr.io/PROJECT_ID/my-app:latest
        ports:
        - containerPort: 8080
```

## 3\. Update Your Cloud Build Configuration

Modify your `cloudbuild.yaml` to include steps for namespace creation and manifest application:

```
steps:
  - name: gcr.io/cloud-builders/kubectl
    args:
      - apply
      - -f
      - namespace.yaml
  - name: gcr.io/cloud-builders/kubectl
    args:
      - apply
      - -f
      - deployment.yaml
images:
  - gcr.io/PROJECT_ID/my-app:$SHORT_SHA
```

For more details on Cloud Build, see the [Cloud Build documentation](https://cloud.google.com/build).

## 4\. Validate the Deployment

After Cloud Build finishes, confirm that your pods and services are up:

```
kubectl get all -n my-app
```

---

![The image lists four steps for a deployment process: creating a namespace in a GKE cluster, creating a deployment file, updating Cloud Build code for deployment, and validating the deployment.](https://kodekloud.com/kk-media/image/upload/v1752875501/notes-assets/images/GCP-DevOps-Project-Sprint-05/gke-deployment-process-steps-2.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-devops-project/module/c1a43d47-87cb-459f-a9bf-2000d6223395/lesson/bf9647fa-4994-46ce-a7c7-53f8439e711b)**
>
> Watch video content
