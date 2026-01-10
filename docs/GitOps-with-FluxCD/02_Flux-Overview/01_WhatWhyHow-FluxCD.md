# WhatWhyHow FluxCD - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-FluxCD/Flux-Overview/WhatWhyHow-FluxCD)

---

## Table of Contents

- WhatWhyHow FluxCD
  - Why Use FluxCD?
  - What Is FluxCD?
  - How Does FluxCD Work?
  - FluxCD Controllers at a Glance
  - Further Reading
  - Watch Video
    - Kustomize Controller
    - Helm Controller

---

## Content

GitOps with FluxCD

Flux Overview

# WhatWhyHow FluxCD

FluxCD is a Cloud Native Computing Foundation (CNCF) project designed to help teams adopt GitOps for Kubernetes deployment. By treating Git repositories, Helm charts, OCI registries, and S3 buckets as the single source of truth, FluxCD automates synchronization between your declared configuration and the live state of your clusters.

## Why Use FluxCD?

Adopting FluxCD delivers multiple benefits:

- **Declarative Configuration**: Leverage Git’s versioning and audit trail for all cluster changes.
- **Automated Reconciliation**: Continuously detects and corrects drift between desired and live states.
- **Image Automation**: Monitors container registries, updates image tags based on policies, and commits changes back to Git.
- **Notifications & Alerts**: Integrates with Slack, Microsoft Teams, or email to inform you about sync status and failures.
- **Scalability**: Supports multi-cluster and multi-environment deployments with minimal overhead.

> [!important]
> **Note**
>
> Ensure that you have cluster-admin access on your Kubernetes cluster and the `flux` CLI installed locally.
> For installation instructions, see [FluxCD Getting Started](https://fluxcd.io/docs/get-started/).

## What Is FluxCD?

FluxCD is a set of Kubernetes controllers and custom resources that continuously reconcile the state of a cluster with configurations stored in external sources:

- **Git Repositories**: YAML manifests, Kustomize overlays, or Helm releases.
- **OCI Registries**: Helm charts or container images.
- **Cloud Storage**: S3 buckets or other object storage for raw manifests.

By adopting a GitOps workflow, every change in your cluster must be made via pull requests, ensuring a clear history and enabling code review practices.

## How Does FluxCD Work?

FluxCD implements GitOps by actively monitoring your declared sources and the cluster’s live state. When it detects a difference, it reports the drift and—depending on your policy—reconciles automatically or waits for manual approval.

![The image is an infographic explaining FluxCD, highlighting its purpose in maintaining Kubernetes clusters, its benefits for declarative specifications and Git-based management, and its operation using the GitOps pattern.](https://kodekloud.com/kk-media/image/upload/v1752877616/notes-assets/images/GitOps-with-FluxCD-WhatWhyHow-FluxCD/fluxcd-infographic-kubernetes-gitops.jpg)

Below is a high-level command sequence to bootstrap FluxCD on a Git repository:

```
# Install Flux CLI
curl -s https://fluxcd.io/install.sh | sudo bash


# Bootstrap Flux with GitHub
flux bootstrap github \
  --owner=<your-github-user> \
  --repository=<repo-name> \
  --branch=main \
  --path=clusters/my-cluster
```

## FluxCD Controllers at a Glance

| Controller           | Source Type   | Primary Function                            | Flux CLI Example            |
| -------------------- | ------------- | ------------------------------------------- | --------------------------- |
| Kustomize Controller | Git, S3       | Applies Kustomize overlays to generate YAML | `flux create kustomization` |
| Helm Controller      | Git, OCI Rep. | Manages Helm chart releases declaratively   | `flux create helmrelease`   |

### Kustomize Controller

The Kustomize Controller is a Kubernetes operator that applies and manages manifests assembled by [Kustomize](https://kubectl.docs.kubernetes.io/references/kustomize/). It is ideal for:

- Layered environment configurations (e.g., dev, staging, prod).
- Declarative customization of base manifests without forking.

### Helm Controller

The Helm Controller enables you to synchronize Helm chart releases using standard Kubernetes manifests:

- Define `HelmRelease` custom resources to specify chart version, values, and target namespace.
- FluxCD will automatically install, upgrade, or rollback charts based on Git commits.

> [!important]
> **Warning**
>
> When using the Helm Controller, ensure your cluster can pull images from the specified OCI registries. You may need to configure image pull secrets.

## Further Reading

- [FluxCD Documentation](https://fluxcd.io/docs/)
- [GitOps Principles](https://www.gitops.tech/)
- [Kustomize Reference](https://kubectl.docs.kubernetes.io/references/kustomize/)
- [Helm Documentation](https://helm.sh/docs/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-fluxcd/module/44949c1c-edf6-4432-81ce-78d709c30af5/lesson/49ef8037-ed73-4539-a489-4aba73a9f88b)**
>
> Watch video content
