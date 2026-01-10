# Understanding Resource Quotas - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Minimize-Microservice-Vulnerabilities/Understanding-Resource-Quotas)

---

## Table of Contents

- Understanding Resource Quotas
  - Example: Resource Quota for a Namespace
  - Example: Pod with Resource Restrictions
  - Watch Video
  - Practice Lab

---

## Content

Certified Kubernetes Security Specialist (CKS)

Minimize Microservice Vulnerabilities

# Understanding Resource Quotas

In this lesson, we dive into the implementation of resource quotas in Kubernetes, specifically tailored for multi-tenant environments. This refresher builds on concepts covered in the [CKA Certification Course - Certified Kubernetes Administrator](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator) and focuses on how resource quotas ensure fair resource distribution and prevent resource exhaustion across different teams or services.

Resource quota objects in Kubernetes provide administrators with a mechanism to enforce limits on resources such as CPU, memory, and storage for pods and containers. This control is vital for multi-tenancy as it prevents any single namespace from consuming excessive resources, thereby maintaining balanced and predictable cluster performance.

> [!important]
> **Key Point**
>
> Resource quotas help manage and guarantee resource availability, ensuring that all teams have protected access to the required CPU and memory without risking overall cluster stability.

## Example: Resource Quota for a Namespace

The following example demonstrates a Kubernetes resource quota configuration that restricts the resource consumption for a specific namespace named "namespace_a". This setup limits resource requests to 4 CPUs and 16 GiB of memory, while capping resource limits at 8 CPUs and 32 GiB of memory.

```
apiVersion: v1
kind: ResourceQuota
metadata:
  name: cpu-memory-quota
  namespace: namespace_a
spec:
  hard:
    requests.cpu: "4"
    requests.memory: 16Gi
    limits.cpu: "8"
    limits.memory: 32Gi
```

## Example: Pod with Resource Restrictions

Here’s an example of a pod configuration that adheres to the resource constraints defined for "namespace_a". The pod, using the nginx image, sets specific resource requests and limits to ensure it operates within the allocated boundaries:

```
apiVersion: v1
kind: Pod
metadata:
  name: resource-limited-pod
  namespace: namespace_a
spec:
  containers:
  - name: resource-limited-container
    image: nginx
    resources:
      requests:
        cpu: "250m"
        memory: "64Mi"
      limits:
        cpu: "500m"
        memory: "128Mi"
```

This configuration ensures that the pod operates within the specified resource limits, which in turn contributes to a well-balanced resource allocation across multi-tenant environments. By enforcing these limits, Kubernetes helps prevent any single pod from monopolizing cluster resources, supporting a fair and stable operating environment for all users.

For more detailed information on Kubernetes resource management, explore the [Kubernetes Documentation](https://kubernetes.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/7431dd03-f5c2-4ebb-b94a-2d35615bbd8c/lesson/e0b282e8-1643-44da-9172-cfa722d955b8)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/7431dd03-f5c2-4ebb-b94a-2d35615bbd8c/lesson/d1535b18-8e11-4e23-985b-9753a578c274)**
>
> Practice lab
