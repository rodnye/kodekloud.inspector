# Isolation and Segmentation Resource Quotas Limits - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Security-Associate-KCSA/Kubernetes-Security-Fundamentals/Isolation-and-Segmentation-Resource-Quotas-Limits)

---

## Table of Contents

- Isolation and Segmentation Resource Quotas Limits
  - Resource Scheduling in Kubernetes Clusters
  - Defining Resource Requests
  - Memory Units and Conversions
  - Setting Resource Limits
  - Default Behavior and Best Practices
  - Enforcing Defaults with LimitRange
  - Namespace-Wide Quotas with ResourceQuota
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

Kubernetes and Cloud Native Security Associate (KCSA)

Kubernetes Security Fundamentals

# Isolation and Segmentation Resource Quotas Limits

In this lesson, we dive deep into Kubernetes resource management. You’ll learn how to define requests and limits for CPU and memory, enforce defaults with LimitRange, and cap overall consumption with ResourceQuota to ensure fair usage across namespaces.

## Resource Scheduling in Kubernetes Clusters

A Kubernetes scheduler assigns pods to nodes based on available CPU and memory. For instance, in a three-node cluster, if you submit a pod requesting 2 CPUs and 1 Gi of memory, the scheduler will place it on the first node that meets these requirements (node-2 in this example). Pods remain in the Pending state if no node has sufficient resources. You can verify this by running:

```
kubectl describe pod <pod-name>
```

and checking for scheduling errors.

![The image shows a Kubernetes scheduling error message indicating insufficient CPU resources, with a visual representation of CPU and memory usage across three nodes.](https://kodekloud.com/kk-media/image/upload/v1752880785/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Isolation-and-Segmentation-Resource-Quotas-Limits/kubernetes-scheduling-error-cpu-usage.jpg)

## Defining Resource Requests

A resource request specifies the minimum CPU or memory a container needs. The scheduler uses these values to make placement decisions.

```
apiVersion: v1
kind: Pod
metadata:
  name: simple-webapp-color
spec:
  containers:
  - name: simple-webapp-color
    image: simple-webapp-color
    ports:
    - containerPort: 8080
    resources:
      requests:
        memory: "4Gi"
        cpu: "2"
```

CPU requests can be specified in cores (e.g., `"2"`) or millicores (e.g., `"200m"` = 0.2 CPU). The smallest unit is `1m`.

> [!important]
> **Note**
>
> One Kubernetes CPU core maps to one AWS vCPU, one GCP core, one Azure core, or one hyperthread.

![The image is a slide titled "Resource - CPU," showing a diagram of a CPU with a list detailing equivalences: 1 AWS vCPU, 1 GCP Core, 1 Azure Core, and 1 Hyperthread.](https://kodekloud.com/kk-media/image/upload/v1752880786/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Isolation-and-Segmentation-Resource-Quotas-Limits/resource-cpu-diagram-equivalences.jpg)

## Memory Units and Conversions

Memory can be defined using SI (e.g., `G`, `M`) or binary suffixes (e.g., `Gi`, `Mi`):

- `G` = 10⁹ bytes
- `Gi` = 2³⁰ bytes
- `M` = 10⁶ bytes
- `Mi` = 2²⁰ bytes

![The image is a slide titled "Resource - Memory" showing a diagram labeled "MEM" with "1G" and a list of byte conversions for gigabytes, megabytes, kilobytes, gibibytes, mebibytes, and kibibytes.](https://kodekloud.com/kk-media/image/upload/v1752880788/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Isolation-and-Segmentation-Resource-Quotas-Limits/resource-memory-diagram-byte-conversions.jpg)

## Setting Resource Limits

By default, containers have no resource caps and can consume all available CPU and memory. To prevent extreme usage, define both `requests` and `limits`:

```
apiVersion: v1
kind: Pod
metadata:
  name: simple-webapp-color
spec:
  containers:
  - name: simple-webapp-color
    image: simple-webapp-color
    ports:
    - containerPort: 8080
    resources:
      requests:
        memory: "1Gi"
        cpu: "1"
      limits:
        memory: "2Gi"
        cpu: "2"
```

- Exceeding the CPU limit results in throttling (slower CPU cycles).
- Exceeding the memory limit triggers an OOM kill, terminating the container.

> [!important]
> **Warning**
>
> If a container exceeds its memory `limits`, Kubernetes will kill it with `OOMKilled`. Always set realistic memory limits to avoid unexpected terminations.

![The image illustrates the concept of exceeding resource limits, showing a diagram with CPU and memory constraints, and indicating actions like "THROTTLE" and "TERMINATE" when limits are surpassed, leading to "OOM (Out Of Memory)."](https://kodekloud.com/kk-media/image/upload/v1752880789/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Isolation-and-Segmentation-Resource-Quotas-Limits/resource-limits-cpu-memory-diagram.jpg)

## Default Behavior and Best Practices

Without explicit settings, pods may compete unpredictably for node resources. Below is a summary of CPU allocation behaviors under different configurations:

| Configuration           | Behavior                                                                  | Use Case                                  |
| ----------------------- | ------------------------------------------------------------------------- | ----------------------------------------- |
| No requests, no limits  | A single pod can saturate all CPU resources.                              | Testing or non-critical workloads.        |
| No requests, limits     | The `request` defaults to the `limit`, guaranteeing the capped CPU share. | Enforcing a strict CPU ceiling.           |
| Requests and limits set | Guarantees `requests` and allows bursting up to `limits`.                 | Balanced workloads with predictable load. |
| Requests set, no limits | Guarantees `requests` and allows bursting (throttled by other pods).      | Flexible, bursty workloads.               |

![The image illustrates different CPU behavior scenarios with varying configurations of requests and limits, using bar graphs to show resource allocation. It compares cases with no requests or limits, requests with limits, and requests without limits.](https://kodekloud.com/kk-media/image/upload/v1752880790/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Isolation-and-Segmentation-Resource-Quotas-Limits/cpu-behavior-scenarios-bar-graphs.jpg)

Memory allocation follows similar patterns, except bursting beyond the limit always results in an immediate OOM kill.  
![The image is a diagram illustrating memory behavior with different scenarios of requests and limits, using colored blocks to represent memory allocation.](https://kodekloud.com/kk-media/image/upload/v1752880791/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Isolation-and-Segmentation-Resource-Quotas-Limits/memory-behavior-diagram-requests-limits.jpg)

## Enforcing Defaults with LimitRange

To automatically apply default `requests` and `limits` within a namespace, create a LimitRange. This helps maintain consistency and prevents pods from deploying without resource settings.

```
apiVersion: v1
kind: LimitRange
metadata:
  name: resource-defaults
spec:
  limits:
  - type: Container
    min:
      cpu: "100m"
      memory: "500Mi"
    max:
      cpu: "1"
      memory: "1Gi"
    defaultRequest:
      cpu: "500m"
      memory: "1Gi"
    default:
      cpu: "500m"
      memory: "1Gi"
```

> [!important]
> **Note**
>
> `LimitRange` only affects pods created after the object is applied. Existing pods retain their original settings.

## Namespace-Wide Quotas with ResourceQuota

When you need to cap total resource consumption per namespace, use ResourceQuota. This object restricts the aggregate of `requests` and `limits` across all pods in the namespace:

```
apiVersion: v1
kind: ResourceQuota
metadata:
  name: team-quota
spec:
  hard:
    requests.cpu: "4"
    requests.memory: "4Gi"
    limits.cpu: "10"
    limits.memory: "10Gi"
```

This ensures no single team or namespace can exceed its allocated share.

![The image contains a list of documentation references related to managing memory, CPU, and API resources in Kubernetes, with URLs for further reading.](https://kodekloud.com/kk-media/image/upload/v1752880792/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Isolation-and-Segmentation-Resource-Quotas-Limits/kubernetes-memory-cpu-api-docs.jpg)

## Links and References

- [Managing Compute Resources for Containers](https://kubernetes.io/docs/concepts/configuration/manage-resources-container/)
- [LimitRange Documentation](https://kubernetes.io/docs/concepts/policy/limit-range/)
- [ResourceQuota Documentation](https://kubernetes.io/docs/concepts/policy/resource-quotas/)
- [Kubernetes Official Docs](https://kubernetes.io/docs/)

Complete the hands-on labs to reinforce these concepts. Happy clustering!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/0148994b-9ccc-4725-a77b-a4a63592152f/lesson/b9af56d3-b4cb-4a43-b8e7-d47ad8ed06e0)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/0148994b-9ccc-4725-a77b-a4a63592152f/lesson/8e27c03a-c53e-45c3-a0bc-decf1e4e7a50)**
>
> Practice lab
