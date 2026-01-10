# Updating cloudbuild for GKE deployment - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-DevOps-Project/Sprint-05/Updating-cloudbuild-for-GKE-deployment)

---

## Table of Contents

- Updating cloudbuild for GKE deployment
  - Prerequisites
  - Kubernetes Deployment Manifest
  - Initial cloudbuild.yaml
  - Extending cloudbuild.yaml for GKE Deployment
  - References
  - Next Steps
  - Watch Video
    - Step-by-Step Overview

---

## Content

GCP DevOps Project

Sprint 05

# Updating cloudbuild for GKE deployment

Deploying your Docker image to Google Kubernetes Engine (GKE) can be fully automated using **Cloud Build**. In this guide, we’ll update our CI/CD pipeline by extending `cloudbuild.yaml` to:

1.  Build the Docker image
2.  Push it to Google Container Registry (GCR)
3.  Deploy to a GKE cluster with a Kubernetes manifest

---

## Prerequisites

- A GKE cluster up and running
- `gcloud` CLI configured with your project and zone
- Cloud Build API enabled
- Service account with the following roles:
  - `roles/container.developer`
  - `roles/storage.admin`

> [!important]
> **Note**
>
> Ensure your Cloud Build service account has the **Kubernetes Engine Developer** and **Storage Admin** roles. Without these, build or deploy steps may fail.

---

## Kubernetes Deployment Manifest

We’ve already created a Kubernetes Deployment manifest (`gke.yaml`) for our sample app:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: gcp-devops-gke
spec:
  replicas: 1
  selector:
    matchLabels:
      app: gcp
  template:
    metadata:
      labels:
        app: gcp
    spec:
      containers:
        - name: gcp-devops-gke
          image: gcr.io/kodekloud-gcp-training/test-gcpdevops:latest
          ports:
            - containerPort: 5000
          env:
            - name: PORT
              value: "5000"
```

This Deployment exposes port **5000** and pulls the image from GCR. Next, let’s configure Cloud Build.

---

## Initial cloudbuild.yaml

Our starting `cloudbuild.yaml` only built and pushed the Docker image:

```
steps:
  - name: 'gcr.io/cloud-builders/docker'
    args:
      ['build', '-t', 'gcr.io/$PROJECT_ID/gcpdevops', '.']
images:
  - 'gcr.io/$PROJECT_ID/gcpdevops'
```

---

## Extending cloudbuild.yaml for GKE Deployment

We’ll add a third step to invoke the `gke-deploy` builder, which applies our Kubernetes manifest directly to GKE:

```
steps:
  # 1. Build the container image
  - name: 'gcr.io/cloud-builders/docker'
    args:
      ['build', '-t', 'gcr.io/$PROJECT_ID/gcpdevops', '.']


  # 2. Push the container image
  - name: 'gcr.io/cloud-builders/docker'
    args:
      ['push', 'gcr.io/$PROJECT_ID/gcpdevops']


  # 3. Deploy to GKE
  - name: 'gcr.io/cloud-builders/gke-deploy'
    args:
      [
        'run',
        '--filename=gke.yaml',
        '--image=gcr.io/$PROJECT_ID/gcpdevops',
        '--location=us-central1-c',
        '--cluster=gke-gcp-devops',
        '--namespace=gcp-devops-prod'
      ]


images:
  - 'gcr.io/$PROJECT_ID/gcpdevops'
```

---

### Step-by-Step Overview

| Step | Builder Image                    | Arguments                                                                                                                                    | Purpose                                 |
| ---- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| 1    | gcr.io/cloud-builders/docker     | `build -t gcr.io/$PROJECT_ID/gcpdevops .`                                                                                                    | Build the container image               |
| 2    | gcr.io/cloud-builders/docker     | `push gcr.io/$PROJECT_ID/gcpdevops`                                                                                                          | Push image to Google Container Registry |
| 3    | gcr.io/cloud-builders/gke-deploy | `run --filename=gke.yaml --image=gcr.io/$PROJECT_ID/gcpdevops --location=us-central1-c --cluster=gke-gcp-devops --namespace=gcp-devops-prod` | Deploy manifest to your GKE cluster     |

---

## References

- [Cloud Build Quickstart](https://cloud.google.com/build/docs/quickstart-build)
- [gke-deploy GitHub Repository](https://github.com/GoogleCloudPlatform/cloud-run-hello)
- [GKE Documentation](https://cloud.google.com/kubernetes-engine/docs)

---

## Next Steps

1.  Commit and push your updated `cloudbuild.yaml` to a feature branch.
2.  Open a pull request for review.
3.  Merge into `main`.

Once merged, Cloud Build will automatically execute the pipeline, build and push your container, then deploy the updated manifest to your GKE cluster. Finally, use:

```
kubectl get pods --namespace gcp-devops-prod
```

to verify your application is running successfully.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-devops-project/module/c1a43d47-87cb-459f-a9bf-2000d6223395/lesson/013ab2a5-3092-4ce9-90d3-ee84d9c51ce2)**
>
> Watch video content
