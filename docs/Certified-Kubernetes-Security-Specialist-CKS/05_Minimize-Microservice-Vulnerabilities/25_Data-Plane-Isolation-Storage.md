# Data Plane Isolation Storage - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Minimize-Microservice-Vulnerabilities/Data-Plane-Isolation-Storage)

---

## Table of Contents

- Data Plane Isolation Storage
  - High-Performance Storage Class Example
  - Watch Video
  - Practice Lab

---

## Content

Certified Kubernetes Security Specialist (CKS)

Minimize Microservice Vulnerabilities

# Data Plane Isolation Storage

In this lesson, we explore how to implement data-plane isolation for storage through the use of storage classes. By defining distinct storage classes for different tenant types, you can manage persistent volumes (PVs) and persistent volume claims (PVCs) according to the specific performance requirements of each group.

Consider the following scenario with two namespaces:

- **Namespace A**: Dedicated to a critical tenant requiring high-performance storage.
- **Namespace B**: Allocated to a regular tenant with standard resource demands.

By setting up separate storage classes, you can effectively isolate the data plane and ensure that each tenant's storage is provisioned and managed optimally.

> [!important]
> **Key Insight**
>
> Creating separate storage classes allows you to customize PVs and PVCs for varying workloads, leading to improved resource utilization and better performance isolation.

## High-Performance Storage Class Example

For the critical tenant in Namespace A, a high-performance storage class can be configured to provide PVs with enhanced IOPS. The YAML configuration below demonstrates how to set up such a storage class:

```
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: high-performance
provisioner: kubernetes.io/aws-ebs
parameters:
  type: io1                          # AWS io1 disks support high IOPS
  iopsPerGB: "50"                    # Specify high IOPS per GB
  fsType: ext4
reclaimPolicy: Delete
allowVolumeExpansion: true
volumeBindingMode: Immediate
```

PVCs targeting high IOPS workloads can bind directly to this storage class, ensuring that critical applications receive the necessary performance. Conversely, a standard-performance storage class can be configured for regular tenants with less intensive storage requirements.

> [!important]
> **Learn More**
>
> For additional insights into Kubernetes storage and persistent volume configurations, check out the [Kubernetes Documentation](https://kubernetes.io/docs/concepts/storage/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/7431dd03-f5c2-4ebb-b94a-2d35615bbd8c/lesson/e2b565cf-bcf5-460f-8f07-c75f2cae1f9c)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/7431dd03-f5c2-4ebb-b94a-2d35615bbd8c/lesson/9748ac82-ecd9-47e8-a112-06b81f64bbc6)**
>
> Practice lab
