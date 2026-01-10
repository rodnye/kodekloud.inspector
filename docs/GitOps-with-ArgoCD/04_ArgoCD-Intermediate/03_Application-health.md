# Application health - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-ArgoCD/ArgoCD-Intermediate/Application-health)

---

## Table of Contents

- Application health
  - Built-in Resource Health States
  - Specific Kubernetes Object Checks
  - Custom Health Checks
  - Benefits of Robust Health Checking
  - Watch Video

---

## Content

GitOps with ArgoCD

ArgoCD Intermediate

# Application health

In this article, we explore how ArgoCD performs application health checks and its integration with Kubernetes resources. Understanding these mechanisms is essential for troubleshooting and ensuring robust application deployments.

ArgoCD continuously polls Git repositories for changes and monitors the status of Kubernetes resources. When ArgoCD pulls a deployment manifest and applies it to a cluster, it immediately begins monitoring the deployment. If the deployment fails to scale up to the required number of replicas, ArgoCD will mark it as unhealthy.

## Built-in Resource Health States

ArgoCD provides several built-in health checks, each indicating a different state of resource health:

- **Healthy:** All associated resources are 100% healthy.
- **Progressing:** The resource is not fully healthy but may recover over time.
- **Degraded:** The resource has encountered a failure or cannot reach a healthy state promptly.
- **Missing:** The resource does not exist in the cluster.
- **Suspended:** The resource is paused or in a suspended state (for example, a paused deployment).
- **Unknown:** The health assessment has failed, resulting in an indeterminate status.

## Specific Kubernetes Object Checks

ArgoCD includes health checks tailored for specific Kubernetes objects. Here are a few examples:

- **Secrets:** For Kubernetes secrets, ArgoCD checks whether a service is of type LoadBalancer by ensuring the `loadbalancer.ingress` list is not empty and includes at least one hostname or IP.
- **Ingress Resources:** Similar to services, it verifies that `status.loadBalancer.ingress` is populated with at least one hostname or IP.
- **Persistent Volume Claims (PVCs):** The health of a PVC is determined by examining its `status.phase` to ensure that it is properly bound to a persistent volume.
- **Deployments, ReplicaSets, StatefulSets, and DaemonSets:** ArgoCD compares the observed generation with the desired generation and ensures that the number of updated replicas matches the desired state.

## Custom Health Checks

In scenarios where a built-in health check for a specific resource is unavailable, ArgoCD allows you to create custom health checks. These checks can be defined using Lua—a lightweight scripting language—in a config map. This flexibility extends to any Kubernetes resource, including cron jobs, runtime classes, roles, secrets, namespaces, pods, and PVCs.

Consider a scenario where you deploy a front-end application with three geometric shapes—a circle, a rectangle, and a triangle—displayed on a white background. The colors of these shapes are defined in a config map. For instance, the following configuration sets the triangle color to white:

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: php-color-cm
data:
  TRIANGLE_COLOR: white
```

> [!important]
> **Note**
>
> Without a custom health check, this config map is created without any warnings. However, since the triangle is white, it might blend into the white background, rendering it invisible to end users.

To resolve this issue, you can configure a custom health check in the ArgoCD config map. This check applies to all config maps and marks the status as degraded with a custom message if the `TRIANGLE_COLOR` is set to white.

Below is an example of a custom health check configuration:

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-cm
data:
  resource.customizations.health.ConfigMap: |
    hs = {}
    hs.status = "Healthy"
    if obj.data.TRIANGLE_COLOR == "white" then
      hs.status = "Degraded"
      hs.message = "Use a different COLOR"
    end
    return hs
  timeout.reconciliation: 300s
```

## Benefits of Robust Health Checking

Implementing comprehensive health checks simplifies troubleshooting by providing immediate feedback on the state of an ArgoCD application. Instead of manually inspecting each Kubernetes resource for misconfigurations, an unhealthy flag enables you to quickly identify and resolve issues, ultimately saving time and enhancing deployment reliability.

For further details on Kubernetes and container orchestration best practices, check out the following resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Hub](https://hub.docker.com/)

By leveraging both built-in and custom health checks, you can maintain a healthy, resilient, and scalable deployment environment with ArgoCD.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-argocd/module/7d158b65-58ef-432d-9d26-61e245751bfe/lesson/de39ce28-6ff2-4615-bdd4-09d0f1109f4f)**
>
> Watch video content
