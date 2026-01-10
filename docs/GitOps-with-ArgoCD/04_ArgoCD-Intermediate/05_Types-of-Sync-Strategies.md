# Types of Sync Strategies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-ArgoCD/ArgoCD-Intermediate/Types-of-Sync-Strategies)

---

## Table of Contents

- Types of Sync Strategies
  - Examples
  - Watch Video
    - Example 1: Automatic Synchronization Without Auto-Pruning or Self-Healing
    - Example 2: Automatic Synchronization with Auto-Pruning Enabled
    - Example 3: Self-Healing Without Automatic Synchronization
    - Example 4: All Three Options Enabled

---

## Content

GitOps with ArgoCD

ArgoCD Intermediate

# Types of Sync Strategies

ArgoCD provides several synchronization strategies that determine how the desired state in Git is reflected in your Kubernetes cluster. In this article, we review these strategies—including automatic sync, manual sync, auto-pruning, and self-healing—and explain how combining these options can improve your deployment workflow.

When ArgoCD detects a new version of your application in Git, it handles synchronization in one of two ways:

- **Automatic Synchronization:** ArgoCD immediately applies changes by updating or creating new resources in the target Kubernetes cluster.
- **Manual Synchronization:** ArgoCD identifies changes in Git but waits for a manual trigger via the UI (by clicking the Synchronize button) or the CLI before updating the cluster.

In addition to these synchronization methods, ArgoCD features auto-pruning and self-healing capabilities:

- **Auto-Pruning:** When enabled, deleted or removed files from Git result in the removal of the corresponding resources from your Kubernetes cluster. If disabled, resources remain active on the cluster even if they have been removed from Git.
- **Self-Healing:** This option automatically restores resources modified manually (for example, using `kubectl edit`) to their state as defined in Git. Note that following GitOps principles is recommended, as manual changes outside Git may be reverted by ArgoCD.

Below are several examples that illustrate how these options work in practice.

---

## Examples

### Example 1: Automatic Synchronization Without Auto-Pruning or Self-Healing

Assume you have a Git repository that contains several Kubernetes manifest files (such as a deployment YAML and a config map). An ArgoCD application is configured to pull these manifests and create the corresponding resources in your cluster.

- With **automatic synchronization** enabled, any new commit—such as adding a `service.yaml` specification—will automatically create the associated service in the Kubernetes cluster.
- If `service.yaml` is later deleted (or reverted) in Git, no changes occur in the cluster since auto-pruning is disabled.
- Similarly, if a user manually deletes the config map via `kubectl`, the deletion persists because self-healing is not active.

---

### Example 2: Automatic Synchronization with Auto-Pruning Enabled

In this scenario, both **automatic synchronization** and **auto-pruning** are enabled:

- All resources (deployment, config map, and service) defined in the Git repository are automatically created in the cluster.
- If `service.yaml` is removed from Git, ArgoCD promptly prunes the corresponding service from the cluster.
- Manual changes in the cluster (for example, deleting a config map using `kubectl`) remain unaltered because self-healing is not enabled.

---

### Example 3: Self-Healing Without Automatic Synchronization

Here, the application is configured to use **self-healing** only, while **automatic synchronization** is disabled:

- The removal of `service.yaml` from Git does not affect the running service in the cluster because auto-sync is inactive.
- However, if a resource (such as a config map) is manually deleted from the cluster, ArgoCD detects the discrepancy and restores the resource based on its state in Git.

> [!important]
> **Note**
>
> Enabling self-healing is especially useful in production environments where accidental manual changes can be automatically reverted, ensuring consistency with your Git repository.

---

### Example 4: All Three Options Enabled

In this configuration, **automatic synchronization**, **auto-pruning**, and **self-healing** are all enabled:

- When a manifest (e.g., `service.yaml`) is removed from Git, ArgoCD automatically deletes the corresponding resource from the Kubernetes cluster.

  ![The image illustrates different sync strategies in Argo CD, showing how changes in Git repositories affect Kubernetes clusters, with features like manual/automatic sync, auto-pruning, and self-healing.](https://kodekloud.com/kk-media/image/upload/v1752877575/notes-assets/images/GitOps-with-ArgoCD-Types-of-Sync-Strategies/argo-cd-sync-strategies-diagram.jpg)

- Additionally, if any manual changes are made on the cluster using the `kubectl` CLI—such as deleting a config map—the self-healing feature immediately restores the resource from the Git repository.

> [!important]
> **Warning**
>
> Avoid making manual modifications directly on the cluster. Doing so can lead to conflicts with the GitOps model and trigger automatic restorations by ArgoCD, potentially overwriting your intended changes.

---

These examples demonstrate how different combinations of synchronization strategies allow you to maintain a consistent and reliable Kubernetes cluster that reflects the desired state defined in Git. By carefully choosing the right mix of automatic synchronization, auto-pruning, and self-healing, you can streamline your operations and ensure high reliability in your deployment pipeline.

For more information on Kubernetes concepts and GitOps best practices, explore resources like [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/) and [Kubernetes Documentation](https://kubernetes.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-argocd/module/7d158b65-58ef-432d-9d26-61e245751bfe/lesson/2058a3d4-f718-44ff-87f6-040a5dc88398)**
>
> Watch video content
