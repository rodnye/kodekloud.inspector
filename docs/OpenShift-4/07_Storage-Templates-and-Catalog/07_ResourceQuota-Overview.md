# ResourceQuota Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenShift-4/Storage-Templates-and-Catalog/ResourceQuota-Overview)

---

## Table of Contents

- ResourceQuota Overview
  - Example: Memory Resource Quota for a Namespace
  - Example: Restricting Object Counts Within a Namespace
  - Watch Video

---

## Content

OpenShift 4

Storage Templates and Catalog

# ResourceQuota Overview

In this article, we will explore what a resource quota is, its purpose, and how it functions within a Kubernetes namespace or an OpenShift project. Building on our previous discussion on limits and requests, we now expand our understanding to include resource quotas.

When deploying Pods, you typically target a Namespace (or a Project in OpenShift). In OpenShift, a project essentially functions as a Kubernetes Namespace.

![The image is a diagram related to Red Hat OpenShift Container Platform, showing a user icon connected to a "Name Space" with hierarchical structures.](https://kodekloud.com/kk-media/image/upload/v1752882808/notes-assets/images/OpenShift-4-ResourceQuota-Overview/openshift-container-platform-namespace-diagram.jpg)

Within a project or namespace, administrators can define resource limits and requests for components such as CPU and memory. This configuration ensures that the namespace has access only to a specified amount of compute resources. If a Pod is scheduled for deployment in a namespace that has exceeded its resource quota, it will remain in a pending state until the necessary resources become available.

A resource quota imposes constraints on the resources available per project, specifying limits for both resource requests and overall compute resources including CPU and memory. If resource demands exceed these constraints, additional Pods cannot be deployed until resources are freed—for example, when an active Pod is terminated and its resources are released.

![The image illustrates a concept of setting constraints for compute resources, featuring icons of a CPU and memory, with a status labeled as "Pending."](https://kodekloud.com/kk-media/image/upload/v1752882810/notes-assets/images/OpenShift-4-ResourceQuota-Overview/compute-resource-constraints-pending.jpg)

Resource quotas can also limit the total number of certain storage and compute resources. This helps in efficiently segregating and managing resources. The image below shows various constraints related to resource quotas, emphasizing limitations on both resource quantities and the total number of storage and compute items.

![The image shows a list of constraints related to resource quotas, including limiting the quantity of resources and the total number of storage and computer resources, with red dropdown icons next to each item.](https://kodekloud.com/kk-media/image/upload/v1752882811/notes-assets/images/OpenShift-4-ResourceQuota-Overview/resource-quotas-constraints-list.jpg)

## Example: Memory Resource Quota for a Namespace

Consider a theoretical example where a resource quota is applied to a Kubernetes Namespace named "test". In this scenario, the quota sets a request for memory and a limit for memory:

```
apiVersion: v1
kind: ResourceQuota
metadata:
  name: memorylimit
  namespace: test
spec:
  hard:
    requests.memory: 512Mi
    limits.memory: 1000Mi
```

The configuration for OpenShift is identical, specifying the API version and resource type (ResourceQuota) with similar resource constraints.

## Example: Restricting Object Counts Within a Namespace

A more granular example demonstrates how to restrict the number of objects that can be created in a namespace:

```
apiVersion: v1
kind: ResourceQuota
metadata:
  name: core-object-counts
spec:
  hard:
    configmaps: "10"
    persistentvolumeclaims: "4"
    replicationcontrollers: "20"
    secrets: "10"
    services: "10"
    services.loadbalancers: "2"
```

In this configuration, the namespace is limited to:

- 10 Secrets
- 10 Services
- 2 LoadBalancer services (derived from the total Services count)

Managing constraints can be performed both at the Pod level and the Namespace level. While setting per-Pod requests and limits provides granularity, managing quotas at the namespace level simplifies resource management, especially when handling multiple manifests. This consolidated approach significantly reduces management overhead in large-scale Kubernetes environments.

> [!important]
> **Note**
>
> Using resource quotas is a best practice for preventing resource contention and ensuring that no single project monopolizes cluster resources.

In summary, resource quotas are vital tools for managing resource allocation in Kubernetes and OpenShift environments. They enforce constraints on resource usage, ensuring that each namespace or project operates within its predefined limits.

For additional information on Kubernetes resource management, consider reviewing the [Kubernetes Documentation](https://kubernetes.io/docs/) and exploring further topics such as [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/openshift-4/module/b7e60e62-0f83-422c-8fca-6c9bb3cf4862/lesson/299109a4-a983-4f84-837b-a852a3a59895)**
>
> Watch video content
