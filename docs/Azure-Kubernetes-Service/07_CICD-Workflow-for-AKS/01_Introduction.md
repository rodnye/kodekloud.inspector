# Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Azure-Kubernetes-Service/CICD-Workflow-for-AKS/Introduction)

---

## Table of Contents

- Introduction
  - Imperative vs Declarative at a Glance
  - Imperative Deployment
  - Declarative Deployment
  - Summary
  - Links and References
  - Watch Video
    - Pros
    - Cons
    - Pros
    - Cons

---

## Content

Azure Kubernetes Service

CICD Workflow for AKS

# Introduction

Kubernetes supports two primary deployment methods: Imperative and Declarative. The Imperative approach relies on explicit `kubectl` commands to create and manage resources step by step. The Declarative approach uses YAML or JSON manifests to define the desired state of your cluster, which Kubernetes continuously reconciles. Choosing the right method helps teams optimize for speed, reproducibility, and maintainability in environments like [Azure Kubernetes Service (AKS)](https://azure.microsoft.com/en-us/services/kubernetes-service/).

![The image compares imperative and declarative approaches to Kubernetes deployment, highlighting specific commands and defined steps for imperative, and YAML/JSON manifests for declarative.](https://kodekloud.com/kk-media/image/upload/v1752869453/notes-assets/images/Azure-Kubernetes-Service-Introduction/kubernetes-deployment-imperative-declarative-comparison.jpg)

## Imperative vs Declarative at a Glance

| Aspect           | Imperative Deployment               | Declarative Deployment                     |
| ---------------- | ----------------------------------- | ------------------------------------------ |
| Definition       | Step-by-step `kubectl` commands     | Desired-state manifests (YAML/JSON)        |
| Execution        | Immediate and manual                | Automated reconciliation via control plane |
| Idempotency      | Not guaranteed on reruns            | Always converges to desired state          |
| Common Use Cases | Prototyping, troubleshooting, demos | Production, CI/CD pipelines, GitOps        |

## Imperative Deployment

Imperative deployment gives you direct control through explicit commands. Here’s a typical workflow:

```
kubectl create deployment nginx --image=nginx
kubectl expose deployment nginx --port=80
kubectl scale deployment nginx --replicas=3
kubectl delete service nginx
```

### Pros

- Granular, step-by-step control
- Instant feedback after each command
- Perfect for ad hoc tasks: debugging, prototyping, one-off operations

### Cons

- Difficult to reproduce complex setups consistently
- Lacks idempotency—rerunning commands can yield different results
- Hard to track changes in version control

> [!important]
> **Warning**
>
> Imperative commands can introduce configuration drift if reused without validation. Always verify resource status with `kubectl get` or integrate into CI pipelines.

![The image is a comparison of the pros and cons of imperative Kubernetes deployment. Pros include fine-grained control and flexibility, while cons highlight being more error-prone and lacking idempotency.](https://kodekloud.com/kk-media/image/upload/v1752869454/notes-assets/images/Azure-Kubernetes-Service-Introduction/kubernetes-imperative-deployment-pros-cons.jpg)

## Declarative Deployment

In the declarative model, you define the desired state in a manifest file, and Kubernetes ensures the live cluster matches it. For example:

```
# nginx-deployment.yaml
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
        image: nginx:latest
        ports:
        - containerPort: 80
```

Apply this manifest with:

```
kubectl apply -f nginx-deployment.yaml
```

### Pros

- Desired-state management ensures consistency
- Easy change tracking via Git and pull requests
- Reusable manifests support automation and GitOps workflows
- Simplifies scaling, rolling updates, and rollbacks

### Cons

- Requires governance on manifest changes to avoid unintended effects
- Misconfigurations can lead to unexpected resource updates

> [!important]
> **Note**
>
> Store all YAML/JSON manifests in a Git repository and enforce reviews to prevent accidental outages.

![The image is a comparison of the pros and cons of declarative Kubernetes deployment. It highlights benefits like configuration management and version control, and notes the need for careful management.](https://kodekloud.com/kk-media/image/upload/v1752869454/notes-assets/images/Azure-Kubernetes-Service-Introduction/kubernetes-deployment-pros-cons-comparison.jpg)

## Summary

- Imperative deployment offers fast, hands-on commands ideal for quick experiments and troubleshooting.
- Declarative deployment provides consistency, versioning, and automation by treating manifests as the single source of truth.

In practice, combine both approaches: use imperative commands for on-the-fly tasks and declarative manifests for robust, production-grade workflows.

## Links and References

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Azure Kubernetes Service (AKS)](https://azure.microsoft.com/en-us/services/kubernetes-service/)
- [kubectl CLI Reference](https://kubernetes.io/docs/reference/kubectl/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/azure-kubernetes-service/module/60e74513-d231-493d-90a3-71787380ae79/lesson/06f7d653-3816-499f-b4c1-b7fb552e1903)**
>
> Watch video content
