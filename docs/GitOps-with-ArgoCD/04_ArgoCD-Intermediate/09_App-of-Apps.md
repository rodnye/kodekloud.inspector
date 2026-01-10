# App of Apps - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-ArgoCD/ArgoCD-Intermediate/App-of-Apps)

---

## Table of Contents

- App of Apps
  - Repository Structure Example
  - Detailed Look: Circle App YAML
  - Benefits of the App-of-Apps Pattern
  - Watch Video

---

## Content

GitOps with ArgoCD

ArgoCD Intermediate

# App of Apps

In this article, we dive into the App-of-Apps pattern in ArgoCD—a declarative approach that streamlines the creation and management of ArgoCD applications. Instead of manually deploying each application, the App-of-Apps pattern programmatically generates and manages multiple ArgoCD applications from a single root configuration.

The core idea is to create a root ArgoCD application whose source points to a folder containing YAML definition files for each microservice or application. Each YAML file specifies a path to a directory containing the relevant Kubernetes manifests. Once all these configuration files are committed to a Git repository, ArgoCD automatically detects and deploys the defined applications.

> [!important]
> **How It Works**
>
> The root application acts as an orchestrator. It cues ArgoCD to traverse the specified directory, reading every YAML file to instantiate the associated applications. This ensures that updates in your Git repository trigger automatic synchronization with your Kubernetes cluster.

## Repository Structure Example

Assume your Git repository is organized so that each directory holds the necessary files for a specific application. The following example reviews the root ArgoCD application's YAML file, which is placed within a multi-application directory. This root application points to the "app-of-apps" directory, prompting ArgoCD to create all the child applications as defined in that folder.

```
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: app-of-apps
spec:
  project: default
  source:
    repoURL: https://github.com/sidd-harth/test-cd.git
    targetRevision: HEAD
    path: ./declarative/app-of-apps
  destination:
    server: https://kubernetes.default.svc
    namespace: argocd
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

In this example, three ArgoCD application YAML files are defined within the specified directory. ArgoCD reads these definitions and automatically creates the corresponding applications.

## Detailed Look: Circle App YAML

Let’s examine the Circle App YAML file as an example. Every application YAML includes a source field that refers to its specific manifest directory. In the Circle App, ArgoCD uses the provided details to create or update the deployment and service in the Kubernetes cluster.

```
# declarative/app-of-apps/app-of-apps.yml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: app-of-apps
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/sidd-harth/test-cd.git
    targetRevision: HEAD
    path: ./declarative/app-of-apps
  destination:
    server: https://kubernetes.default.svc
    namespace: argocd
  syncPolicy:
    automated:
      prune: true
      selfHeal: true


# declarative/app-of-apps/circle-app.yml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: circle-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/sidd-harth/test-cd.git
    targetRevision: HEAD
    path: ./declarative/manifests/circle
  destination:
    server: https://kubernetes.default.svc
    namespace: circle
  syncPolicy:
    syncOptions:
      - CreateNamespace=true
```

Using this pattern, ArgoCD automatically creates all listed applications and deploys their associated Kubernetes manifests. This approach can be extended to manage any Kubernetes object—including ArgoCD itself. Whenever an application definition is updated or a new one is added to your Git repository, ArgoCD ensures your deployments remain in sync by automatically updating or creating the corresponding applications.

## Benefits of the App-of-Apps Pattern

| Benefit                   | Description                                                                                  |
| ------------------------- | -------------------------------------------------------------------------------------------- |
| Centralized Control       | Manage multiple applications from a single ArgoCD application.                               |
| Automated Synchronization | Automatically detect and deploy changes from your Git repository to your Kubernetes cluster. |
| Scalable Management       | Easily add or update applications without manual intervention on each deployment.            |

For more insights on Kubernetes and declarative deployment patterns, check out these additional resources:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [ArgoCD Official Documentation](https://argo-cd.readthedocs.io/)

Using the App-of-Apps pattern simplifies complex deployments and improves operational efficiency, making it an essential tool in modern GitOps-based workflows.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-argocd/module/7d158b65-58ef-432d-9d26-61e245751bfe/lesson/0c09a835-3cf9-4a39-8dee-98c15db6b134)**
>
> Watch video content
