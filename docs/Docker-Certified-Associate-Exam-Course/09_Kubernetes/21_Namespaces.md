# Namespaces - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Kubernetes/Namespaces)

---

## Table of Contents

- Namespaces
  - Overview
  - The House Analogy
  - Custom Namespaces
  - RBAC and Resource Quotas
  - Service Discovery Across Namespaces
  - Working with Namespaces in kubectl
  - Defining Resource Quotas
  - Summary
  - References
  - Watch Video
    - Common Operations
    - Listing Pods
    - Creating a Pod in a Specific Namespace
    - Switching the Current Namespace

---

## Content

Docker Certified Associate Exam Course

Kubernetes

# Namespaces

## Overview

Namespaces partition Kubernetes clusters into virtual sub-clusters, simplifying resource management and isolation for teams or environments. This guide covers core concepts, commands, and best practices for working with namespaces.

## The House Analogy

Imagine two boys named Mark living in separate houses. To avoid confusion, one is called Mark Smith and the other Mark Williams. Inside each house, family members use only first names; outsiders always use the full name. Each house maintains its own rules and resources.

![The image shows two houses labeled "Mark Smith" and "Mark Williams," each containing figures representing people. A central figure is depicted with speech bubbles indicating the names "Mark Smith" and "Mark Williams."](https://kodekloud.com/kk-media/image/upload/v1752874000/notes-assets/images/Docker-Certified-Associate-Exam-Course-Namespaces/houses-mark-smith-williams-figures.jpg)

In Kubernetes, a **namespace** is like a house. Every Pod, Deployment, and Service lives in one namespace. By default, clusters include:

| Namespace   | Description                                                 |
| ----------- | ----------------------------------------------------------- |
| default     | User workloads by default                                   |
| kube-system | Cluster-internal components (DNS, networking plugins, etc.) |
| kube-public | Public resources visible to all users                       |

> [!important]
> **Warning**
>
> Avoid modifying resources in the **kube-system** namespace directly; changes can disrupt critical cluster services.

## Custom Namespaces

For development, testing, or multi-tenant clusters, create additional namespaces (e.g., **dev**, **prod**) to isolate:

- Resources
- Policies (RBAC rules)
- Quotas

![The image illustrates the concept of namespace isolation using house-shaped diagrams, each containing a circle, triangle, and square, labeled with different namespaces like "kube-system," "Default," "kube-public," "Dev," and "Prod."](https://kodekloud.com/kk-media/image/upload/v1752874001/notes-assets/images/Docker-Certified-Associate-Exam-Course-Namespaces/namespace-isolation-diagram-houses.jpg)

## RBAC and Resource Quotas

You can enforce per-namespace access control with RoleBindings and restrict resource usage using ResourceQuotas:

![The image illustrates a Kubernetes namespace resource limits concept, showing different environments (Default, Prod, Dev) with nodes and containers represented by various icons. It highlights how resources are allocated and managed across these environments.](https://kodekloud.com/kk-media/image/upload/v1752874003/notes-assets/images/Docker-Certified-Associate-Exam-Course-Namespaces/kubernetes-namespace-resource-limits.jpg)

## Service Discovery Across Namespaces

Within the same namespace, Services resolve by name:

```
# Connect to a Service in the same namespace
mysql.connect("db-service")
```

To reach a Service in another namespace, use its fully qualified domain name (FQDN):

```
# Connect to a Service in 'dev' namespace
mysql.connect("db-service.dev.svc.cluster.local")
```

DNS format:

```
<service>.<namespace>.svc.<cluster-domain>
```

By default, `cluster-domain` is `cluster.local` and `svc` is the Services subdomain.

> [!important]
> **Note**
>
> You can customize the cluster-domain in kube-DNS/CoreDNS configuration if needed.

## Working with Namespaces in kubectl

### Common Operations

| Operation                   | Command                                                                           |
| --------------------------- | --------------------------------------------------------------------------------- |
| List Pods (current ns)      | `kubectl get pods`                                                                |
| List Pods (all namespaces)  | `kubectl get pods --all-namespaces`                                               |
| Create namespace            | `kubectl create namespace <name>`                                                 |
| Apply manifest in namespace | `kubectl apply -f <file.yml> --namespace=<name>`                                  |
| Switch context namespace    | `kubectl config set-context $(kubectl config current-context) --namespace=<name>` |

### Listing Pods

```
# Default namespace
kubectl get pods


# kube-system namespace
kubectl get pods --namespace=kube-system
```

### Creating a Pod in a Specific Namespace

Override the namespace via CLI:

```
kubectl create -f pod-definition.yml --namespace=dev
```

Or specify within the manifest:

```
# pod-definition.yml
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  namespace: dev
spec:
  containers:
    - name: nginx-container
      image: nginx
```

Then apply:

```
kubectl apply -f pod-definition.yml
```

### Switching the Current Namespace

Set your default namespace for the current context:

```
kubectl config set-context \
  $(kubectl config current-context) \
  --namespace=dev
```

Now, `kubectl get pods` targets **dev** by default.

## Defining Resource Quotas

Limit resource usage per namespace with a ResourceQuota manifest:

```
# compute-quota.yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: compute-quota
  namespace: dev
spec:
  hard:
    pods: "10"
    requests.cpu: "4"
    requests.memory: 5Gi
    limits.cpu: "10"
    limits.memory: 10Gi
```

Apply it:

```
kubectl apply -f compute-quota.yaml
```

## Summary

Namespaces are fundamental for organizing, isolating, and managing resources in Kubernetes. Use them to separate environments, enforce policies, and allocate quotas. Practice creating namespaces, deploying workloads, and exploring cross-namespace Service discovery to master this concept.

## References

- [Kubernetes Official Documentation](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/)
- [kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/d9358627-4fc7-4acc-ab96-fa25232555c6/lesson/9a274a47-4b5c-46b1-8a99-2e8bfef9dea6)**
>
> Watch video content
