# Using Node Pools and TaintsTolerations for Isolation - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Minimize-Microservice-Vulnerabilities/Using-Node-Pools-and-TaintsTolerations-for-Isolation)

---

## Table of Contents

- Using Node Pools and TaintsTolerations for Isolation
  - Step 1: Apply a Taint to the Node
  - Step 2: Configure Pod Definitions with Tolerations
  - Watch Video
  - Practice Lab

---

## Content

Certified Kubernetes Security Specialist (CKS)

Minimize Microservice Vulnerabilities

# Using Node Pools and TaintsTolerations for Isolation

In this guide, we explore how to use node pools combined with taints and tolerations to achieve effective node isolation and support multi-tenancy configurations. This approach allows you to dedicate specific nodes to individual tenants, thereby avoiding the issue of workload interference, often known as the noisy neighbor problem.

When implementing node isolation, a common strategy is to assign dedicated nodes to each tenant. For instance, Customer A might operate on Node A, Customer B on Node B, and Customer C on Node C. To enforce this separation, only pods with the matching tolerations can be scheduled on nodes that carry specific taints.

> [!important]
> **Key Concept**
>
> Node isolation using taints and tolerations prevents unauthorized pods from being scheduled on nodes that are reserved for a particular tenant.

## Step 1: Apply a Taint to the Node

Begin by adding a taint to the node that you want to reserve. The following command applies a taint to Node A, ensuring that only pods with the appropriate toleration (i.e., belonging to Customer A) can be scheduled on Node A.

```
kubectl taint nodes nodeA customer=customerA:NoSchedule
```

## Step 2: Configure Pod Definitions with Tolerations

Next, update your pod specification to include a toleration that matches the taint on the node. This configuration restricts the pod's scheduling to nodes that accept its designated toleration. Below is an example YAML definition for a pod assigned to Customer A:

```
apiVersion: v1
kind: Pod
metadata:
  name: customer-a-pod
  namespace: customer_a
spec:
  containers:
  - name: customer-a-container
    image: nginx
  tolerations:
  - key: "customer"
    operator: "Equal"
    value: "customerA"
    effect: "NoSchedule"
```

With this setup, the pod can only be scheduled on nodes that have been tainted for Customer A, ensuring strict isolation between different tenant workloads.

> [!important]
> **Further Learning**
>
> If you want to deepen your knowledge of taints and tolerations, consider exploring additional practical exercises and detailed documentation on the topic.

For more details on Kubernetes best practices and workload isolation, refer to the [Kubernetes Documentation](https://kubernetes.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/7431dd03-f5c2-4ebb-b94a-2d35615bbd8c/lesson/8871fa68-1e25-4f0e-9aef-fdc2570189d9)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/7431dd03-f5c2-4ebb-b94a-2d35615bbd8c/lesson/1d21577e-6a9a-4e7d-a8f4-18ab9f127c64)**
>
> Practice lab
