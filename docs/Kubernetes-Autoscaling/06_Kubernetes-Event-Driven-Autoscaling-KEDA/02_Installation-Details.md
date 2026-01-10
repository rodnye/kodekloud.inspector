# Installation Details - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Autoscaling/Kubernetes-Event-Driven-Autoscaling-KEDA/Installation-Details)

---

## Table of Contents

- Installation Details
  - Prerequisites
  - Add and Install the KEDA Helm Chart
  - What the Helm Chart Deploys
  - RoleBindings vs. ClusterRoleBindings
  - Detailed Breakdown of Deployed CRDs
  - Summary of Installed Objects
  - Watch Video
  - Practice Lab

---

## Content

Kubernetes Autoscaling

Kubernetes Event Driven Autoscaling KEDA

# Installation Details

Learn how to install KEDA (Kubernetes Event-driven Autoscaling) using its official Helm chart. This guide walks through prerequisites, Helm commands, and a detailed overview of the Kubernetes objects deployed by KEDA for seamless auto-scaling.

## Prerequisites

- A running Kubernetes cluster (v1.16+)
- Helm v3+ installed and configured
- Access to the KEDA Helm repository

> [!important]
> **Note**
>
> Ensure you have `kubectl` access and the correct context set before proceeding.

## Add and Install the KEDA Helm Chart

Run the following commands to add the KEDA chart repository, update it, and install KEDA into the `keda` namespace:

```
# Add the KEDA Helm repo
helm repo add kedacore https://kedacore.github.io/charts


# Update local Helm repo information
helm repo update


# Install KEDA into namespace "keda"
helm install keda kedacore/keda \
  --namespace keda \
  --create-namespace
```

> [!important]
> **Warning**
>
> If you already have a `keda` namespace or a previous installation, use `helm upgrade --install` to avoid conflicts.

## What the Helm Chart Deploys

When you deploy KEDA with Helm, the following Kubernetes resources are created to enable event-driven autoscaling:

| Component Type              | Resource Name(s)                                                                                       | Purpose                                                          |
| --------------------------- | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| Custom Resource Definitions | `ScaledObject`, `ScaledJob`, `TriggerAuthentication`,<br>`ClusterTriggerAuthentication`, `EventSource` | Extend the API to define KEDA-specific scaling objects.          |
| APIService                  | `external.metrics.k8s.io`                                                                              | Exposes external metrics for Horizontal Pod Autoscalers (HPAs).  |
| ServiceAccount              | `keda-operator`, `keda-metrics-adapter`, `keda-webhook`                                                | Identifies KEDA processes running in the cluster.                |
| ClusterRoles & RoleBindings | `keda-operator-role`, `keda-metrics-role`,<br>`keda-webhook-role` and bindings                         | Grants KEDA permissions at cluster and namespace scope.          |
| Deployments                 | `keda-operator`, `keda-metrics-adapter`, `keda-webhook`                                                | Runs the core controller, metrics server, and admission webhook. |

![The image outlines KEDA components, including Custom Resource Definitions, API Service, Cluster Roles, Deployments, and Service Accounts, each with a brief description of their functions.](https://kodekloud.com/kk-media/image/upload/v1752880195/notes-assets/images/Kubernetes-Autoscaling-Installation-Details/keda-components-overview-diagram.jpg)

## RoleBindings vs. ClusterRoleBindings

KEDA sculpts its permissions with both namespaced and cluster-wide bindings:

- **RoleBinding**  
  Binds a `Role` or `ClusterRole` to the KEDA ServiceAccount within a specific namespace.
- **ClusterRoleBinding**  
  Binds a `ClusterRole` to the KEDA ServiceAccount across the entire cluster.

![The image is a diagram illustrating the components of KEDA, including Custom Resource Definitions, API Service, Cluster Roles, Deployments, Service Accounts, and Role Bindings, each with a brief description of their functions.](https://kodekloud.com/kk-media/image/upload/v1752880196/notes-assets/images/Kubernetes-Autoscaling-Installation-Details/keda-components-diagram.jpg)

## Detailed Breakdown of Deployed CRDs

After installation, you can inspect the following KEDA Custom Resource Definitions:

- **ScaledObject**  
  Defines how to scale a Deployment or StatefulSet based on external triggers.
- **ScaledJob**  
  Similar to ScaledObject but for Kubernetes Jobs.
- **TriggerAuthentication**  
  Stores authentication details for external metric sources.
- **ClusterTriggerAuthentication**  
  Cluster-scoped version of TriggerAuthentication.
- **EventSource**  
  Defines custom event sources for autoscaling.

## Summary of Installed Objects

1.  **CRDs** for KEDA’s custom scale definitions
2.  **ServiceAccounts** for operator, metrics-adapter, and webhook
3.  **ClusterRoles** & **RoleBindings** (cluster- and namespace-scoped)
4.  **Deployments**
    - KEDA Operator
    - External Metrics Adapter
    - Admission Webhook
5.  **APIService** at `external.metrics.k8s.io`

With these resources in place, KEDA is ready to drive event-based autoscaling in your Kubernetes cluster. Continue to the hands-on lab to validate each component and start creating ScaledObjects!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-autoscaling/module/c218f836-7d7e-425b-a8b7-0148914eb040/lesson/2274b91d-9b99-4611-8d83-86efd2ed3f77)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kubernetes-autoscaling/module/c218f836-7d7e-425b-a8b7-0148914eb040/lesson/a6803172-1a10-4637-a1ff-0019932958e2)**
>
> Practice lab
