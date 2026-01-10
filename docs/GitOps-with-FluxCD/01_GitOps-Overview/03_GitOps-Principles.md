# GitOps Principles - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-FluxCD/GitOps-Overview/GitOps-Principles)

---

## Table of Contents

- GitOps Principles
  - 1. Declarative Desired State
  - 2. Versioned in Git
  - 3. Automated Application of Changes
  - 4. Continuous Reconciliation
  - Links and References
  - Watch Video

---

## Content

GitOps with FluxCD

GitOps Overview

# GitOps Principles

In this lesson, we’ll dive into the four foundational principles of GitOps. Adopting these practices ensures your application and infrastructure deployments are reliable, auditable, and fully automated.

## 1\. Declarative Desired State

GitOps relies on **declarative** configuration: you declare _what_ the system should look like, not _how_ to get there. Common formats include Kubernetes manifests, Helm charts, and Kustomize overlays. This approach eliminates manual, imperative commands that are difficult to track and reproduce.

Example: a simple NGINX Deployment in Kubernetes

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:1.23
          ports:
            - containerPort: 80
```

> [!important]
> **Best Practice**
>
> Store all your configuration files in a structured directory layout (e.g., `apps/`, `infrastructure/`, `overlays/`) to simplify navigation and modularity.

## 2\. Versioned in Git

All declarative files become the “desired state” and are committed to a Git repository (e.g., GitHub, GitLab, Bitbucket). Git provides:

- Full version control with diffs
- Historical audit trails
- Immutable commits

Example Git workflow:

```
git add .
git commit -m "feat: declare nginx deployment desired state"
git push origin main
```

Storing configurations in Git ensures you have a **single source of truth** for your environments.

## 3\. Automated Application of Changes

GitOps agents (also known as operators or controllers) continuously watch your Git repository. When changes are detected—via commits or pull requests—these agents fetch updates and apply them to your Kubernetes clusters or other targets.

| Tool    | Description                                            | Link                            |
| ------- | ------------------------------------------------------ | ------------------------------- |
| Argo CD | Declarative, GitOps continuous delivery for Kubernetes | https://argo-cd.readthedocs.io/ |
| Flux CD | Unidirectional agent for GitOps workflows              | https://fluxcd.io/              |

> [!important]
> **Security Tip**
>
> Ensure your GitOps agent has least-privilege access. Use scoped tokens or service accounts rather than broad admin credentials.

## 4\. Continuous Reconciliation

GitOps agents implement a control loop that:

1.  **Observe** the actual state of your target environment
2.  **Compare** it to the desired state stored in Git
3.  **Reconcile** any drift by applying or rolling back changes

This loop guarantees that the live system matches your declarative configuration. Manual or out-of-band modifications are automatically corrected or flagged.

```
# Pseudocode for a reconciliation loop
while true; do
  actual_state=$(kubectl get all -o yaml)
  desired_state=$(git clone https://repo.git desired && cat desired/apps/nginx-deployment.yaml)
  if [ "$actual_state" != "$desired_state" ]; then
    kubectl apply -f desired/apps/nginx-deployment.yaml
  fi
  sleep 30
done
```

![The image outlines the four principles of GitOps: describing the system declaratively, versioning the desired state in a Git repository, automatically applying changes, and using GitOps agents to ensure system correctness and reconciliation.](https://kodekloud.com/kk-media/image/upload/v1752877620/notes-assets/images/GitOps-with-FluxCD-GitOps-Principles/gitops-four-principles-diagram.jpg)

## Links and References

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Argo CD](https://argo-cd.readthedocs.io/)
- [Flux CD](https://fluxcd.io/)
- [GitOps on CNCF](https://www.cncf.io/projects/gitops/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-fluxcd/module/3b5390cf-dfef-4ace-ab99-1ea5587a2cdb/lesson/66f3c857-d316-4d74-a6da-8c19bbf8ba77)**
>
> Watch video content
