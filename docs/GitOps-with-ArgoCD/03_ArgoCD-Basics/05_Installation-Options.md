# Installation Options - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-ArgoCD/ArgoCD-Basics/Installation-Options)

---

## Table of Contents

- Installation Options
  - Core Installation
  - Multi-Tenant Installation
  - Installing ArgoCD with Helm
  - Installation Commands
  - Watch Video
    - 1. Non-High Availability (non-HA)
    - 2. High Availability (HA)

---

## Content

GitOps with ArgoCD

ArgoCD Basics

# Installation Options

Explore the various ArgoCD installation models to determine which best suits your deployment needs. ArgoCD can be installed in two primary modes: a core installation for single-tenant use and a multi-tenant installation for environments requiring isolated access for multiple teams.

## Core Installation

The core installation is designed for users running ArgoCD as a standalone service. This mode provides a minimal, non-high availability (non-HA) deployment, making it perfect for simpler setups that do not require multi-tenancy.

## Multi-Tenant Installation

Multi-tenant deployments are ideal for organizations with multiple application development teams, typically managed by a centralized platform team. Within the multi-tenant model, you have two installation variants:

### 1\. Non-High Availability (non-HA)

This variant is excellent for evaluation, testing, and proof-of-concept deployments, even though it is not recommended for production use.

- **install.yaml:**  
  Deploys ArgoCD with cluster-admin access, making it suitable for clusters where ArgoCD also deploys applications. Additionally, the provided credentials allow for deploying to remote clusters.
- **namespace-installed.yaml:**  
  Configures ArgoCD for namespace-level access, offering restricted permissions. This option is useful when you want to limit ArgoCD’s access while still deploying applications in the same cluster if needed.

### 2\. High Availability (HA)

For production environments, the high availability option is the recommended choice. It improves resilience by deploying multiple replicas for critical components. Two manifests are provided:

- **ha-install.yaml**
- **ha-namespace-installed.yaml**

![The image is a flowchart illustrating installation options, showing paths for "Core" and "Multi-Tenant" leading to "Non High Availability" and "High Availability" configurations with corresponding YAML files. An octopus character is on the left side.](https://kodekloud.com/kk-media/image/upload/v1752877537/notes-assets/images/GitOps-with-ArgoCD-Installation-Options/installation-options-flowchart-octopus.jpg)

> [!important]
> **Deployment Note**
>
> In this lesson, we will deploy ArgoCD within the `argocd` namespace using the non-HA installation manifest (install.yaml).

## Installing ArgoCD with Helm

In addition to the standard installation, ArgoCD can be installed using Helm through a community-maintained chart. By default, the Helm chart deploys the non-HA version of ArgoCD.

After installation, download the ArgoCD CLI from its GitHub repository and move it to your local binary directory. The CLI allows you to efficiently interact with the ArgoCD API server.

## Installation Commands

Use the following commands to install ArgoCD:

```
# Deploy ArgoCD using Kubernetes manifest
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Add the Helm repository for ArgoCD
helm repo add argo https://argoproj.github.io/argo-helm

# Install ArgoCD using Helm (non-HA version)
helm install my-argo-cd argo/argo-cd --version 4.8.0

# Download the latest ArgoCD CLI
curl -sSL -o /usr/local/bin/argocd https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64

# Set execute permissions on the CLI
chmod +x /usr/local/bin/argocd
```

> [!important]
> **Next Steps**
>
> In the upcoming hands-on labs, you'll configure the CLI, log in, and interact with the ArgoCD API server through these commands.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-argocd/module/546d7ffa-8e6e-4197-9dff-443bb15dcdf6/lesson/36d1856a-8c10-4fb8-97f9-b3804847f5bf)**
>
> Watch video content
