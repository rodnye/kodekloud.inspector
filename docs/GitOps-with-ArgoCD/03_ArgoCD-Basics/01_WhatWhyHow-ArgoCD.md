# WhatWhyHow ArgoCD - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-ArgoCD/ArgoCD-Basics/WhatWhyHow-ArgoCD)

---

## Table of Contents

- WhatWhyHow ArgoCD
  - What is ArgoCD?
  - How Does ArgoCD Work?
  - Watch Video

---

## Content

GitOps with ArgoCD

ArgoCD Basics

# WhatWhyHow ArgoCD

This lesson explores ArgoCD, covering what it is, why you should consider using it, and how it operates to revolutionize your continuous delivery workflow.

ArgoCD leverages declarative specifications and Git-based configuration management, offering significant benefits for continuous delivery. It serves as a pivotal element for achieving continuous operations by combining monitoring, analytics, and automated remediation, making it ideal for enterprise environments. Its advanced features such as auditability, compliance, security, RBAC, and SSO further enhance its appeal.

## What is ArgoCD?

ArgoCD is a GitOps continuous delivery tool designed for Kubernetes. It treats a Git repository as the single source of truth for your desired application state. By continuously monitoring running applications, ArgoCD compares the current state with the desired state stored in Git. When discrepancies occur, it not only flags these differences but also provides visual insights, allowing developers to synchronize the live state with the desired configuration either manually or automatically.

> [!important]
> **Key Takeaway**
>
> ArgoCD simplifies Kubernetes resource management by ensuring that your application's live state always reflects the configuration defined in your Git repository.

## How Does ArgoCD Work?

ArgoCD adheres to the GitOps model by using Git repositories as the authority for both your application’s desired state and its target deployment environment. This transparent and consistent approach makes deployment processes reliable and easily auditable.

![The image is an infographic explaining ArgoCD, a GitOps continuous delivery tool for Kubernetes, detailing what it is, why to use it, and how it works. It highlights its benefits, such as declarative specifications, continuous monitoring, and enterprise-friendly features.](https://kodekloud.com/kk-media/image/upload/v1752877538/notes-assets/images/GitOps-with-ArgoCD-WhatWhyHow-ArgoCD/argocd-gitops-infographic-explained.jpg)

ArgoCD supports a variety of Kubernetes manifests. Whether you work with customized applications, Helm charts, JSON files, or YAML configurations, ArgoCD automates the synchronization process to ensure that deployed application states across all target environments are always aligned with those defined in Git.

For a deeper dive into continuous delivery with ArgoCD, consider exploring more about [GitOps practices](https://www.gitops.tech/) and [Kubernetes resource management](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/).

Thank you for reading!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-argocd/module/546d7ffa-8e6e-4197-9dff-443bb15dcdf6/lesson/d4953315-4b72-4339-8dbd-e00696224c81)**
>
> Watch video content
