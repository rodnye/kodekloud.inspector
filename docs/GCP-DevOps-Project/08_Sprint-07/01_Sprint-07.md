# Sprint 07 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-DevOps-Project/Sprint-07/Sprint-07)

---

## Table of Contents

- Sprint 07
  - Objectives
  - Branch-to-Namespace Mapping
  - Updating the CI/CD Pipeline
  - Next Steps
  - Watch Video
    - 1. Create the Development Namespace
    - 2. Update Pipeline Configuration

---

## Content

GCP DevOps Project

Sprint 07

# Sprint 07

In Sprint 07, we’ll enhance our GKE-based CI/CD pipeline by introducing a dedicated **development environment**. This sandbox allows developers to validate changes safely before they reach production.

## Objectives

- Create a **development namespace** in the GKE cluster.
- Configure branch-based deployments:
  - Pushing to the `development` branch deploys to the development namespace.
  - Merging into the `main` branch deploys to production.

Whenever a developer pushes code to `development`, the pipeline triggers a rollout into the dev namespace. After tests and QA pass, merging into `main` initiates the production release.

> [!important]
> **Note**
>
> A development environment provides an isolated namespace in your GKE cluster for testing and validation of changes without impacting production.
> Learn more in the [Kubernetes Namespaces documentation](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/).

![The image shows a search bar with the query "What is a development environment?"](https://kodekloud.com/kk-media/image/upload/v1752875525/notes-assets/images/GCP-DevOps-Project-Sprint-07/search-bar-development-environment-query.jpg)

![The image is a flowchart illustrating a process from "Application" to "Main Branch," with steps including "Development" and "Development Environment." Each step is represented by an icon within a circle.](https://kodekloud.com/kk-media/image/upload/v1752875526/notes-assets/images/GCP-DevOps-Project-Sprint-07/application-main-branch-flowchart.jpg)

## Branch-to-Namespace Mapping

| Git Branch  | Kubernetes Namespace | Trigger Event                |
| ----------- | -------------------- | ---------------------------- |
| development | dev                  | `git push` to develop        |
| main        | production           | Pull request merge into main |

## Updating the CI/CD Pipeline

Most CI/CD stages stay the same; we’ll only adjust:

1.  Namespace creation steps.
2.  Deployment job triggers.

### 1\. Create the Development Namespace

```
kubectl create namespace dev
```

### 2\. Update Pipeline Configuration

In your CI/CD YAML (e.g., Cloud Build or GitHub Actions), add branch filters:

```
# Example GitHub Actions snippet
on:
  push:
    branches:
      - development
  pull_request:
    branches:
      - main


jobs:
  deploy-dev:
    if: github.ref == 'refs/heads/development'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Dev Namespace
        run: |
          kubectl config use-context gke-cluster
          kubectl apply -f k8s/ --namespace=dev


  deploy-prod:
    if: github.event.pull_request.merged == true
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Production
        run: |
          kubectl config use-context gke-cluster
          kubectl apply -f k8s/ --namespace=production
```

## Next Steps

1.  Validate the development environment by pushing a test commit to `development`.
2.  Review logs and confirm the new namespace deployment.
3.  Merge into `main` and watch the production rollout.

For more on CI/CD best practices with Kubernetes, see the [Kubernetes CI/CD guide](https://kubernetes.io/docs/concepts/cluster-administration/continuous-deployment/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-devops-project/module/c8ea3a0c-6c88-4c7d-8317-f50354bae0e6/lesson/480f25b0-8750-416f-96b4-76d225635c52)**
>
> Watch video content
