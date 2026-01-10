# Kubernetes deployment file - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-DevOps-Project/Sprint-05/Kubernetes-deployment-file)

---

## Table of Contents

- Kubernetes deployment file
  - Prerequisites
  - 1. Create a New Git Branch
  - 2. Define the Deployment Manifest
  - 3. Manifest Field Reference
  - 4. Verify and Apply the Manifest
  - 5. Next Steps
  - Links and References
  - Watch Video

---

## Content

GCP DevOps Project

Sprint 05

# Kubernetes deployment file

In this guide, you'll learn how to create a Kubernetes Deployment manifest to deploy your Docker image on Google Kubernetes Engine (GKE). We’ll cover:

1.  Creating a Git branch
2.  Writing the Deployment manifest
3.  Understanding each field in the YAML
4.  Next steps for automated deployment

## Prerequisites

- A working GKE cluster
- `kubectl` configured to talk to your GKE cluster
- Docker image pushed to a container registry (e.g., Google Container Registry)

---

## 1\. Create a New Git Branch

Open your terminal, ensure you’re on `main`, then create a feature branch:

```
$ git branch
* main
$ git checkout -b minor/deployment-file
Switched to a new branch 'minor/deployment-file'
$ git branch
  main
* minor/deployment-file
```

> [!important]
> **Note**
>
> Make sure you have committed or stashed any local changes before switching branches.

You can confirm the active branch in your IDE’s integrated terminal.

---

## 2\. Define the Deployment Manifest

In the root of your project, create a file named `GKE.yaml`. This manifest tells Kubernetes how many replicas to run, which Docker image to use, and which port to expose.

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

---

## 3\. Manifest Field Reference

Below is a quick reference for the key fields in `GKE.yaml`:

| Field                         | Description                                                     | Example                                                 |
| ----------------------------- | --------------------------------------------------------------- | ------------------------------------------------------- |
| apiVersion                    | Kubernetes API version for the Deployment resource              | `apps/v1`                                               |
| kind                          | Resource type                                                   | `Deployment`                                            |
| metadata.name                 | Unique name for your Deployment                                 | `gcp-devops-gke`                                        |
| spec.replicas                 | Number of pod replicas to maintain                              | `1`                                                     |
| spec.selector.matchLabels     | Label selector matching pods managed by this Deployment         | `app: gcp`                                              |
| spec.template.metadata.labels | Labels applied to each pod                                      | `app: gcp`                                              |
| spec.template.spec.containers | Container definitions including image, ports, and env variables | name, image URL, `containerPort: 5000`, env `PORT=5000` |

> [!important]
> **Related Reading**
>
> - [Kubernetes Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
> - [Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine)

---

## 4\. Verify and Apply the Manifest

Once `GKE.yaml` is saved, apply it to your GKE cluster:

```
$ kubectl apply -f GKE.yaml
deployment.apps/gcp-devops-gke created
```

Check the rollout status:

```
$ kubectl rollout status deployment/gcp-devops-gke
```

> [!important]
> **Warning**
>
> Always review your manifest for correct image tags and port configurations before applying to production clusters.

---

## 5\. Next Steps

Now that your Deployment manifest is live, update your CI/CD pipeline to automate this step. For example, extend your `cloudbuild.yaml` to:

1.  Build and push the Docker image
2.  Run `kubectl apply -f GKE.yaml` against your GKE cluster

This ensures every merge to `main` automatically deploys the latest version.

## Links and References

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-devops-project/module/c1a43d47-87cb-459f-a9bf-2000d6223395/lesson/6e4b004a-bb83-4b90-b1ee-b22ea3f906b9)**
>
> Watch video content
