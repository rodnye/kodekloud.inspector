# ConceptsTerminology - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-ArgoCD/ArgoCD-Basics/ConceptsTerminology)

---

## Table of Contents

- ConceptsTerminology
  - Key ArgoCD Concepts
  - Watch Video
    - ArgoCD Applications
    - Source Types
    - ArgoCD Projects
    - Target State vs Live State
    - Sync Operation
    - Refresh Operation
    - Health Assessments

---

## Content

GitOps with ArgoCD

ArgoCD Basics

# ConceptsTerminology

Before diving into the ArgoCD architecture, it is essential to understand its core concepts and terminology. Familiarity with [Git](https://learn.kodekloud.com/user/courses/git-for-beginners), [Docker](https://learn.kodekloud.com/user/courses/docker-training-course-for-the-absolute-beginner), [Kubernetes](https://learn.kodekloud.com/user/courses/kubernetes-for-the-absolute-beginners-hands-on-tutorial), CI/CD principles, and [GitOps](https://learn.kodekloud.com/user/courses/bah-gitops-workshop) is highly recommended to maximize your ArgoCD experience.

> [!important]
> **Recommendation**
>
> Before getting started, ensure you have a solid understanding of the foundational technologies mentioned above for a smoother integration with ArgoCD.

## Key ArgoCD Concepts

### ArgoCD Applications

In ArgoCD, you work primarily with objects known as ArgoCD applications. These applications are custom resource definitions installed with ArgoCD that define both the source (Git repository) and the destination (Kubernetes cluster) for your Kubernetes resources.

### Source Types

Each ArgoCD application is associated with a source type that identifies the tool or method used to build the application.

- **Helm** and **Kustomize** are common examples of source types.

This modular approach allows you to use different tools depending on your deployment strategy.

### ArgoCD Projects

An ArgoCD project acts as a logical grouping of applications, making it easier to manage resources especially when multiple teams are involved. Grouping related applications under a single project simplifies policy enforcement and resource segmentation.

### Target State vs Live State

- **Target State:** The desired configuration stored in your Git repository.
- **Live State:** The current status of deployed resources (e.g., pods, secrets, config maps) in your Kubernetes cluster.

ArgoCD continually compares these two states.

### Sync Operation

When you create an ArgoCD application, the tool synchronizes the desired state (from Git) with the live state (in the cluster). This process, known as **sync**, reconciles the current configuration of the cluster with the version specified in Git. For instance, if modifications are made within the Git repository, a sync operation updates the Kubernetes cluster accordingly.

- **Sync Status:** Indicates whether the live state matches the target state.
- **Operation Status:** Shows whether a sync operation has successfully completed.

### Refresh Operation

A refresh operation in ArgoCD re-evaluates the latest code in Git against the current live state. It:

- Identifies any differences.
- Can automatically initiate a sync or prompt an administrator to manually trigger one.

### Health Assessments

ArgoCD includes built-in health assessments for standard Kubernetes resources. These assessments provide an overall health status for your applications, ensuring you have visibility into both their operational state and configuration compliance.

---

Thank you for reading. For more detailed insights into ArgoCD and its components, explore additional resources and documentation on [ArgoCD's official site](https://argo-cd.readthedocs.io/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-argocd/module/546d7ffa-8e6e-4197-9dff-443bb15dcdf6/lesson/137f0305-e4b2-4b96-862c-3206e026d03e)**
>
> Watch video content
