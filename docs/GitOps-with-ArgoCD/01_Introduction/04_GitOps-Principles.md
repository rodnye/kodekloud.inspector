# GitOps Principles - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-ArgoCD/Introduction/GitOps-Principles)

---

## Table of Contents

- GitOps Principles
  - 1. Declarative vs. Imperative Approach
  - 2. Storing the Desired State in Git
  - 3. Automated Application of the Desired State via GitOps Operators
  - 4. Reconciliation and Self-Healing
  - Watch Video

---

## Content

GitOps with ArgoCD

Introduction

# GitOps Principles

In this lesson, we will explore the core principles of GitOps—an approach to continuous deployment that leverages Git as the single source of truth for infrastructure and application state. The GitOps methodology is built upon four foundational principles.

> [!important]
> **Remember**
>
> GitOps ensures system consistency and reduces human error by enforcing a declarative model of infrastructure management.

## 1\. Declarative vs. Imperative Approach

The first principle stresses a declarative methodology over an imperative one. In the declarative model, the entire system—including both infrastructure and application manifests—is described in a desired state. This contrasts with the imperative approach, where specific commands are executed sequentially to change the system state. Relying on the imperative style can complicate reconciliation since it does not maintain a comprehensive record of the system's intended state.

## 2\. Storing the Desired State in Git

The second principle mandates that all declarative files, which represent the desired state of the system, be stored in a Git repository. Git not only offers powerful version control capabilities but also preserves immutability. Storing the desired state in Git makes it the definitive source of truth for system configuration. Any changes pushed to Git are automatically recognized and applied across the system.

## 3\. Automated Application of the Desired State via GitOps Operators

The third principle involves using GitOps operators—software agents that continuously monitor Git for updates. Once they detect changes, these operators automatically retrieve the desired state from the repository and apply it across one or more clusters or environments. Consider the following deployment manifest example that a GitOps operator might manage:

```
$ cat deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
```

This operator can run in a single cluster and propagate configuration changes to other clusters as necessary, ensuring uniformity and scalability.

## 4\. Reconciliation and Self-Healing

The final principle centers on continuous reconciliation. GitOps operators maintain a self-healing system by constantly checking for discrepancies between the actual state of the system and the desired state stored in Git. They execute this process through three key steps:

1.  **Observe:** Monitor the Git repository for updates.
2.  **Diff:** Compare the desired state from Git with the current state of the cluster.
3.  **Act:** Reconcile any differences by updating the system to reflect the declared desired state.

This ongoing reconciliation loop minimizes the risk of configuration drift and helps maintain a robust, error-resistant system.

By understanding and applying these GitOps principles, you can ensure your infrastructure remains consistent, scalable, and resilient to changes.

Thank you.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-argocd/module/713ff34d-1afe-4f18-b1bf-2990c322469e/lesson/3bee7c16-de3b-4cc6-abb1-e4fed13f962d)**
>
> Watch video content
