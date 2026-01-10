# What is GitOps - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-ArgoCD/Introduction/What-is-GitOps)

---

## Table of Contents

- What is GitOps
  - GitOps Workflow
  - Watch Video

---

## Content

GitOps with ArgoCD

Introduction

# What is GitOps

GitOps is an operational framework that leverages Git as the single source of truth for managing both infrastructure and application code. It extends the principles of Infrastructure as Code, enabling automated deployments and rollbacks by controlling the entire code delivery pipeline through Git version control.

## GitOps Workflow

Developers begin by committing their changes to a centralized Git repository. Typically, they work in feature branches created as copies of the main codebase. These branches allow teams to develop new features in isolation until they are deemed ready. A Continuous Integration (CI) service automatically builds the application and runs unit tests on the new code. Once tests pass, the changes undergo a review and approval process by relevant team members before being merged into the central repository.

The final step in the pipeline is Continuous Deployment (CD), where changes from the repository are automatically released to Kubernetes clusters.

![The image illustrates the GitOps workflow, showing the integration of infrastructure, configuration, and application code into a Git repository, followed by continuous integration (CI) and continuous deployment (CD) processes to a Kubernetes cluster. It also depicts a branching and merging process in Git.](https://kodekloud.com/kk-media/image/upload/v1752877599/notes-assets/images/GitOps-with-ArgoCD-What-is-GitOps/gitops-workflow-integration-diagram.jpg)

At the heart of GitOps is the concept of a declaratively defined state. This involves maintaining your infrastructure, application configurations, and related components within one or more Git repositories. An automated process continuously verifies that the state stored in Git matches the actual state in the production environment. This synchronization is managed by a GitOps operator running within a Kubernetes cluster. The operator monitors the repository for updates and applies the desired changes to the cluster—or even to other clusters as needed.

When a developer merges new code into the application repository, a series of automated steps is triggered: unit tests are run, the application is built, a Docker image is created and pushed to a container registry, and finally, the Kubernetes manifests in another Git repository are updated.

![The image illustrates a GitOps workflow, showing the process from application code merging and continuous integration to deploying Kubernetes manifests, with GitOps operators ensuring the desired state matches the actual state in production environments.](https://kodekloud.com/kk-media/image/upload/v1752877601/notes-assets/images/GitOps-with-ArgoCD-What-is-GitOps/gitops-workflow-ci-kubernetes.jpg)

The GitOps operator continuously compares the desired state (as defined in Git) with the actual state in the Kubernetes cluster. If discrepancies are found, the operator pulls the necessary changes to ensure that the production environment remains aligned with the desired configuration.

![The image illustrates a GitOps workflow, showing the process from application code repository through continuous integration to Kubernetes deployment, highlighting the synchronization between desired and actual states.](https://kodekloud.com/kk-media/image/upload/v1752877602/notes-assets/images/GitOps-with-ArgoCD-What-is-GitOps/gitops-workflow-ci-kubernetes-2.jpg)

> [!important]
> **Ease of Rollbacks**
>
> One of the key benefits of GitOps is the seamless rollback process. Since the entire configuration is maintained in Git, reverting to a previous state is as simple as executing a `git revert` command. The GitOps operator detects this change and automatically rolls back the production environment to match the desired state.

![The image illustrates a GitOps workflow, showing the process from application code repository through continuous integration to Kubernetes deployment, highlighting the synchronization between desired and actual states.](https://kodekloud.com/kk-media/image/upload/v1752877603/notes-assets/images/GitOps-with-ArgoCD-What-is-GitOps/gitops-workflow-ci-kubernetes-3.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-argocd/module/713ff34d-1afe-4f18-b1bf-2990c322469e/lesson/69da05c8-eecf-472a-9dda-231b48e3b7c3)**
>
> Watch video content
