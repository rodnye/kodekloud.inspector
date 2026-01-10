# Extending development environment 02 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-DevOps-Project/Sprint-07/Extending-development-environment-02)

---

## Table of Contents

- Extending development environment 02
  - Prerequisites
  - 1. Connect to the Cluster and Create a Namespace
  - 2. Update the gke.yaml Manifest
  - 3. Verify the Cloud Build Trigger
  - 4. Review Build and Deployment Logs
  - 5. Inspect the Deployment in GKE
  - Links and References
  - Watch Video
    - 1.1 Launch Cloud Shell
    - 1.2 Create and Verify the Development Namespace
    - 2.1 Resource Overview
    - 2.2 Updated Manifest Snippet

---

## Content

GCP DevOps Project

Sprint 07

# Extending development environment 02

In this guide, you’ll continue enhancing your development workflow on Google Kubernetes Engine (GKE). We’ll cover cluster access, namespace isolation, manifest updates, automated builds, and deployment verification.

## Prerequisites

- A GCP project with a running GKE cluster
- `gcloud` CLI and `kubectl` installed and configured
- A GitHub repository connected to Cloud Build triggers

## 1\. Connect to the Cluster and Create a Namespace

### 1.1 Launch Cloud Shell

1.  Navigate to Google Cloud Console > Kubernetes Engine > Clusters.
2.  Select your cluster and click **Connect** to open Cloud Shell.
3.  Press **Enter** to run the pre-populated `kubectl` authentication command.

![The image shows a Google Cloud Platform (GCP) Kubernetes Engine console displaying details of a cluster named "gcp-devops-project," including cluster basics, automation, and networking settings.](https://kodekloud.com/kk-media/image/upload/v1752875521/notes-assets/images/GCP-DevOps-Project-Extending-development-environment-02/gcp-kubernetes-engine-cluster-details.jpg)

> [!important]
> **Note**
>
> Make sure your Google Cloud SDK is up to date to avoid authentication issues:
>
> ```
> gcloud components update
> ```

### 1.2 Create and Verify the Development Namespace

```
# List current namespaces
kubectl get namespaces


# Create a new namespace for development
kubectl create namespace development


# Confirm the namespace was created
kubectl get namespaces
```

## 2\. Update the gke.yaml Manifest

Open your `gke.yaml` file. This manifest defines both the Service and Deployment for your application. Modify it to point at the `development` namespace and use your development Docker image.

### 2.1 Resource Overview

| Kind       | Purpose                           | Key Changes                                  |
| ---------- | --------------------------------- | -------------------------------------------- |
| Service    | Exposes your app via LoadBalancer | Set `namespace: development`, port 80 → 5000 |
| Deployment | Manages application pods          | Use `-dev:latest` image tag, replicas = 1    |

### 2.2 Updated Manifest Snippet

```
apiVersion: v1
kind: Service
metadata:
  name: gcp-devops-gke-service
  namespace: development
  labels:
    app: gcp
spec:
  type: LoadBalancer
  ports:
    - protocol: TCP
      port: 80
      targetPort: 5000
  selector:
    app: gcp
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: gcp-devops-gke
  namespace: development
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
          image: gcr.io/kodekloud-gcp-training/gcpdevops-dev:latest
          ports:
            - containerPort: 5000
          env:
            - name: PORT
              value: "5000"
```

Save your changes and push to the `development` branch:

```
git add gke.yaml
git commit -m "chore: update manifests for development namespace"
git push origin development
```

This push will trigger your Cloud Build configuration.

## 3\. Verify the Cloud Build Trigger

After pushing, open your GitHub repository to confirm that a Cloud Build trigger has started on the `development` branch.

![This image shows a GitHub repository page for a project named "gcp-devops-project" under the user "learnwithraghu." The repository contains files like Dockerfile, README.md, and app.py, and it mentions a Docker Flask application written in Python.](https://kodekloud.com/kk-media/image/upload/v1752875522/notes-assets/images/GCP-DevOps-Project-Extending-development-environment-02/gcp-devops-project-github-repo-docker-flask.jpg)

## 4\. Review Build and Deployment Logs

Go back to the GCP Console and navigate to **Cloud Build**. You’ll see logs for steps including:

- Building the Docker image
- Pushing to Container Registry
- Deploying to GKE

![The image shows a Google Cloud Build interface displaying the details of a successful build process, including steps and logs related to deploying a project using Docker and GKE.](https://kodekloud.com/kk-media/image/upload/v1752875523/notes-assets/images/GCP-DevOps-Project-Extending-development-environment-02/google-cloud-build-successful-deploy.jpg)

All steps should complete without errors.

## 5\. Inspect the Deployment in GKE

1.  In the GCP Console, go to **Kubernetes Engine > Workloads** and filter by the `development` namespace.
    - Workload: `gcp-devops-gke`
2.  Then select **Services & Ingress**, keeping the `development` filter applied.
3.  Copy the external LoadBalancer IP and open it in your browser to verify your app is running.

![The image shows the Google Cloud Console interface, specifically the Kubernetes Engine section, with a focus on Services & Ingress. A filter dropdown for selecting namespaces is open.](https://kodekloud.com/kk-media/image/upload/v1752875524/notes-assets/images/GCP-DevOps-Project-Extending-development-environment-02/google-cloud-console-kubernetes-services-ingress.jpg)

---

You’ve successfully set up a dedicated development namespace, updated your Kubernetes manifests for development artifacts, and confirmed an automated CI/CD pipeline. Future commits to the `development` branch will automatically build and deploy your application to GKE.

## Links and References

- [Kubernetes Namespaces](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/)
- [Google Kubernetes Engine Documentation](https://cloud.google.com/kubernetes-engine/docs)
- [Cloud Build Triggers](https://cloud.google.com/build/docs/automating-builds)
- [kubectl CLI Reference](https://kubernetes.io/docs/reference/kubectl/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-devops-project/module/c8ea3a0c-6c88-4c7d-8317-f50354bae0e6/lesson/7dc805aa-a32a-4340-b706-9448f2e85e70)**
>
> Watch video content
