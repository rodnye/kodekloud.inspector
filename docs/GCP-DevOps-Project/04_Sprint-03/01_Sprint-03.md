# Sprint 03 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-DevOps-Project/Sprint-03/Sprint-03)

---

## Table of Contents

- Sprint 03
  - Recap of Previous Sprints
  - Why Automate Your GKE Deployments?
  - Key Design Discussion Topics
  - Goals for Sprint 03
  - Links and References
  - Watch Video

---

## Content

GCP DevOps Project

Sprint 03

# Sprint 03

Welcome to Sprint 03, where we focus on architecting the Continuous Integration and Continuous Deployment (CI/CD) pipeline for our application on Google Kubernetes Engine (GKE).

## Recap of Previous Sprints

So far, we have:

- A working application stored in GitHub.
- A Google Kubernetes Engine (GKE) cluster running on Google Cloud Platform (GCP).
- Hands-on experience deploying our app manually to the cluster.

| Milestone         | Description                                    | Reference                                                                       |
| ----------------- | ---------------------------------------------- | ------------------------------------------------------------------------------- |
| Code Repository   | Application source managed in GitHub           | [GitHub Docs](https://docs.github.com/)                                         |
| GKE Cluster       | Kubernetes cluster provisioned on GCP          | [GKE Concepts](https://cloud.google.com/kubernetes-engine/docs/concepts)        |
| Manual Deployment | `kubectl`\\-based deploys tested and validated | [kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/) |

![The image shows the Google Cloud Platform logo and the abbreviation "GKE" with a hexagonal icon, representing Google Kubernetes Engine.](https://kodekloud.com/kk-media/image/upload/v1752875457/notes-assets/images/GCP-DevOps-Project-Sprint-03/google-cloud-platform-gke-logo-icon.jpg)

## Why Automate Your GKE Deployments?

Automating deployments increases reliability, reduces human error, and accelerates delivery. A well-designed CI/CD pipeline will:

- Build container images on every commit
- Run automated tests (unit, integration)
- Push images to Container Registry
- Deploy to GKE with zero-downtime updates
- Provide instant feedback on build or deployment failures

> [!important]
> **Note**
>
> Consider using [Google Container Registry](https://cloud.google.com/container-registry) or [Artifact Registry](https://cloud.google.com/artifact-registry) to store and scan your Docker images.

## Key Design Discussion Topics

Before writing any pipeline code, we need to decide on:

| Decision Area           | Considerations                                                 | Example Tools                        |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------ |
| CI/CD Platform          | Ease of integration, native GCP support, cost                  | GitHub Actions, Cloud Build, Jenkins |
| Pipeline Structure      | Stages for build, test, deploy, approvals                      | YAML-based pipelines, Helm           |
| Branching Strategy      | GitFlow vs. trunk-based development, pull request workflows    | GitHub Flow, GitLab Flow             |
| IAM & Secret Management | Service accounts, least-privilege roles, secure secret storage | Secret Manager, KMS                  |
| Monitoring & Rollback   | Logging, metrics, health checks, automatic rollback triggers   | Cloud Monitoring, Prometheus         |

![The image shows an infinity loop diagram labeled "CI" and "CD," representing Continuous Integration and Continuous Deployment, with a gradient color scheme. It is titled "Design Discussion."](https://kodekloud.com/kk-media/image/upload/v1752875459/notes-assets/images/GCP-DevOps-Project-Sprint-03/ci-cd-infinity-loop-diagram.jpg)

## Goals for Sprint 03

By the end of this sprint, we aim to deliver:

- A **documented design** for our CI/CD pipeline, including architecture diagrams and decision rationale.
- A **prioritized task list** covering:
  - Pipeline definitions (YAML files or scripts)
  - Service account creation and IAM roles
  - Secret management and access controls
  - Integration with Container Registry and monitoring tools

These deliverables will serve as the blueprint for implementing our automated builds and deployments in the next sprints.

---

## Links and References

- [GKE Concepts](https://cloud.google.com/kubernetes-engine/docs/concepts)
- [Cloud Build Documentation](https://cloud.google.com/build/docs)
- [GitHub Actions](https://docs.github.com/actions)
- [Google Container Registry](https://cloud.google.com/container-registry)
- [Kubernetes Official Documentation](https://kubernetes.io/docs/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-devops-project/module/51908e95-ccbf-4a0d-b1e5-254367dec2a0/lesson/00e30648-bf57-4a55-91aa-6a3a8eb3da8d)**
>
> Watch video content
