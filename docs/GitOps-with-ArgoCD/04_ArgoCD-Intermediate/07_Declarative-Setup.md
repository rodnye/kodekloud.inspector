# Declarative Setup - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-ArgoCD/ArgoCD-Intermediate/Declarative-Setup)

---

## Table of Contents

- Declarative Setup
  - Git Repository Structure
  - Creating the Application
  - Example ArgoCD Application Manifest
  - Watch Video

---

## Content

GitOps with ArgoCD

ArgoCD Intermediate

# Declarative Setup

In this guide, we demonstrate how to set up Kubernetes resources declaratively using a Mono application example. Declarative management involves defining Kubernetes resources (such as Deployments, Services, Secrets, and ConfigMaps) and ArgoCD objects (including Applications, Repositories, and Projects) in manifest files. These files can be applied with the kubectl CLI to ensure your desired state is maintained.

Previously, we created ArgoCD applications using the CLI and UI, providing the source and destination interactively. In contrast, this approach leverages declarative manifests to define and manage these applications systematically.

> [!important]
> **Why Use Declarative Setup?**
>
> Defining your infrastructure as code in Git offers clear traceability, version control, and simplifies management of changes across different environments.

## Git Repository Structure

Assume that you have a Git repository with the structure below. The repository contains a directory called "declarative" with two subdirectories: "manifests" and "mono-app".

```
tree structure of Git Repository
└── declarative
    ├── manifests
    │   ├── geocentric-model
    │   │   ├── deployment.yml
    │   │   └── service.yml
    └── mono-app
        └── geocentric-app.yml
```

Inside the "mono-app" directory, you'll find an ArgoCD application YAML file. This file defines the application by specifying:

- **Project Name:** The project within ArgoCD.
- **Source Configuration:** Includes the Git repository URL, the revision (e.g., HEAD), and the path pointing to the desired Kubernetes manifests (i.e., the "geocentric-model" directory inside "declarative/manifests"). This directory contains two YAML files: one for the Deployment and one for the Service.
- **Destination Configuration:** Specifies the target cluster (using the in-cluster URL) and the namespace where resources will be deployed.
- **Sync Policy:** An optional policy that can automate the synchronization and self-healing process.

## Creating the Application

Once you have defined your manifest, create the application by running the following command:

```
$ kubectl apply -f mono-app/geocentric-app.yml
application.argoproj.io/geocentric-model-app created
```

After the application is created, ArgoCD will pull the Deployment and Service manifests from the Git repository. It will then create the resources on the target cluster either manually through a sync operation or automatically if synchronization is configured.

> [!important]
> **Key Benefit**
>
> By managing both your application definition and its corresponding resources in source control, you can easily track changes and maintain a consistent state across your environments.

## Example ArgoCD Application Manifest

Below is an example of an ArgoCD application manifest that encapsulates this declarative setup:

```
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: geocentric-model-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/sidd-harth/test-cd.git
    targetRevision: HEAD
    path: ./declarative/manifests/geocentric-model
  destination:
    server: https://kubernetes.default.svc
    namespace: geocentric-model
  syncPolicy:
    syncOptions:
      - CreateNamespace=true
    automated:
      selfHeal: true
```

This manifest defines the application by specifying all necessary details, including repository, revision, and resource paths. It also configures automated syncing options, ensuring that your application continuously matches the desired state defined in Git.

Using a declarative approach with Git as the single source of truth guarantees that your infrastructure changes are versioned, auditable, and easily reverted if necessary. For further reading on Kubernetes and ArgoCD best practices, be sure to explore the [Kubernetes Documentation](https://kubernetes.io/docs/) and [ArgoCD Documentation](https://argo-cd.readthedocs.io/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-argocd/module/7d158b65-58ef-432d-9d26-61e245751bfe/lesson/686d531a-ac89-4b8a-8ed2-8d8f054fa44c)**
>
> Watch video content
