# Summary - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Azure-Kubernetes-Service/CICD-Workflow-for-AKS/Summary)

---

## Table of Contents

- Summary
  - Push-based Workflow
  - Pull-based Workflow (GitOps)
  - Watch Video

---

## Content

Azure Kubernetes Service

CICD Workflow for AKS

# Summary

In this lesson, we explore the declarative approach to managing Kubernetes resources in Azure Kubernetes Service (AKS). By adopting declarative configurations, you define _what_ your infrastructure should look like, and Kubernetes ensures the cluster’s actual state matches your desired state.

Azure Kubernetes Service supports two primary CI/CD workflow patterns:

| Workflow Type                | Description                                                                                                                  | Trigger Mechanism                                  |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| Push-based workflow          | You push code or configuration changes directly to a pipeline, which then builds and deploys artifacts.                      | Manual `git push` or automated CI pipeline trigger |
| Pull-based workflow (GitOps) | A Git repository serves as the single source of truth. A GitOps operator continuously reconciles your cluster with the repo. | Operator polling or webhook-based syncing          |

## Push-based Workflow

With a **push-based** approach, your CI server (Azure DevOps, GitHub Actions, etc.) listens for changes in your application repository. When you commit or merge code, the pipeline:

```
# Example GitHub Actions job for AKS deployment
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build Docker image
        run: docker build -t myregistry.azurecr.io/myapp:${{ github.sha }} .
      - name: Push to ACR
        run: docker push myregistry.azurecr.io/myapp:${{ github.sha }}
      - name: Deploy to AKS
        run: |
          kubectl set image deployment/myapp myapp=myregistry.azurecr.io/myapp:${{ github.sha }}
          kubectl rollout status deployment/myapp
```

> [!important]
> **Note**
>
> Push-based pipelines are straightforward and give you direct control over each deployment step. They work well if you prefer an explicit trigger model.

## Pull-based Workflow (GitOps)

In a **GitOps** (pull-based) model, you store your Kubernetes manifests alongside application code or in a dedicated Git repo. A GitOps operator (Flux, Argo CD) watches the repo and applies changes automatically:

```
# Simplified Flux v2 GitRepository resource
apiVersion: source.toolkit.fluxcd.io/v1beta1
kind: GitRepository
metadata:
  name: aks-config
spec:
  interval: 1m
  url: https://github.com/contoso/aks-config
  branch: main
---
apiVersion: kustomize.toolkit.fluxcd.io/v1beta1
kind: Kustomization
metadata:
  name: apps
spec:
  path: ./apps/prod
  prune: true
  sourceRef:
    kind: GitRepository
    name: aks-config
```

> [!important]
> **Note**
>
> GitOps ensures that your cluster’s live state automatically converges with the declared Git state. This model enhances auditability, reversibility, and compliance.

Effective observability is critical for running production workloads on AKS. Azure provides:

- **Azure Monitor for Containers**: Collects metrics, logs, and health data for nodes and pods.
- **Azure Log Analytics**: Enables querying of container logs using Kusto Query Language (KQL).
- **Application Insights**: Offers distributed tracing, exception tracking, and performance monitoring for your applications.

| Feature                        | Purpose                                      | Example Query                   |
| ------------------------------ | -------------------------------------------- | ------------------------------- |
| Container CPU & Memory Metrics | Track resource utilization                   | \\`InsightsMetrics              |
| Pod Log Collection             | Aggregate stdout/stderr logs from containers | \\`ContainerLog                 |
| Distributed Tracing            | Monitor service-to-service calls             | View in Application Insights UI |

Refer to the following resources for more details:

- [Azure Kubernetes Service Documentation](https://docs.microsoft.com/azure/aks/)
- [Azure Monitor for Containers Overview](https://docs.microsoft.com/azure/azure-monitor/containers/)
- [Getting Started with Flux v2 on AKS](https://fluxcd.io/docs/get-started/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/azure-kubernetes-service/module/60e74513-d231-493d-90a3-71787380ae79/lesson/6da6dbba-f38c-49be-9172-ab5c9a9abeaf)**
>
> Watch video content
