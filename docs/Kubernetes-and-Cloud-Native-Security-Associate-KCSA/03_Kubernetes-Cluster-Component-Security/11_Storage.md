# Storage - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Security-Associate-KCSA/Kubernetes-Cluster-Component-Security/Storage)

---

## Table of Contents

- Storage
  - Encrypting Data at Rest and in Transit
  - Role-Based Access Control (RBAC) for Storage
  - StorageClasses and Policy Enforcement
  - Backup and Disaster Recovery
  - Monitoring Storage Health and Security
  - Summary
  - Watch Video

---

## Content

Kubernetes and Cloud Native Security Associate (KCSA)

Kubernetes Cluster Component Security

# Storage

Securing storage is critical for maintaining data integrity, confidentiality, and availability in your Kubernetes clusters. Pods access storage through Persistent Volumes (PVs) and Persistent Volume Claims (PVCs). Misconfigurations can lead to unauthorized data exposure, interception of unencrypted traffic, or even permanent data loss.

![The image illustrates a Kubernetes storage setup with nodes and persistent volumes, highlighting a security risk due to misconfigured access leading to potential exposure of sensitive data.](https://kodekloud.com/kk-media/image/upload/v1752880768/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Storage/kubernetes-storage-setup-security-risk.jpg)

> [!important]
> **Warning**
>
> Unencrypted or improperly scoped storage access can allow attackers to read, modify, or destroy sensitive data. Always review your storage configurations and access policies.

## Encrypting Data at Rest and in Transit

Encrypting both disk data and network traffic prevents unauthorized access and eavesdropping. Kubernetes natively supports etcd encryption, and most cloud providers offer disk-level encryption:

![The image shows icons representing three cloud storage services: AWS EBS, Azure Disk Storage, and Google Cloud Persistent Disk, under the title "Using Encryption."](https://kodekloud.com/kk-media/image/upload/v1752880769/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Storage/using-encryption-cloud-storage-icons.jpg)

| Provider                     | Encryption Feature                                            | Reference                                           |
| ---------------------------- | ------------------------------------------------------------- | --------------------------------------------------- |
| AWS EBS                      | Customer-managed keys for EBS volumes                         | https://aws.amazon.com/ebs                          |
| Azure Disk Storage           | Server-side encryption with platform or customer-managed keys | https://azure.microsoft.com/services/managed-disks/ |
| Google Cloud Persistent Disk | CMEK/Customer-supplied encryption keys                        | https://cloud.google.com/persistent-disk            |

To enable encryption on AWS EBS via a custom StorageClass:

```
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: encrypted-ebs
provisioner: kubernetes.io/aws-ebs
parameters:
  type: gp2
  encrypted: "true"
```

> [!important]
> **Note**
>
> Ensure your cloud IAM policies grant permissions to use the specified encryption keys.

## Role-Based Access Control (RBAC) for Storage

Restrict access to StorageClasses, PVs, and PVCs using Kubernetes RBAC. Define granular roles and bind them to users or service accounts.

```
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: default
  name: pvc-reader
rules:
  apiGroups: [""]
  resources: ["persistentvolumeclaims"]
  verbs: ["get", "list"]
```

```
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pvc-binding
  namespace: default
subjects:
  - kind: User
    name: jane
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: pvc-reader
  apiGroup: rbac.authorization.k8s.io
```

By scoping roles to namespaces and specific verbs (`get`, `list`, `create`, `delete`), you minimize the blast radius of compromised credentials.

## StorageClasses and Policy Enforcement

StorageClasses let you standardize storage parameters—such as encryption, IOPS, and backup policies—across your cluster.

![The image illustrates the concept of storage in Kubernetes, showing nodes within a cluster, storage classes, persistent volumes, and features like encryption, IOPS limits, and backup policies.](https://kodekloud.com/kk-media/image/upload/v1752880770/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Storage/kubernetes-storage-concept-diagram.jpg)

```
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: secure-storage
provisioner: kubernetes.io/aws-ebs
parameters:
  type: gp3
  encrypted: "true"
  iops: "3000"
```

Key benefits:

- Decouple storage parameters from application manifests
- Enforce organizational policies (encryption, throughput, retention)
- Simplify provisioning for developers

## Backup and Disaster Recovery

Implement automated backups and cross-cluster replication to guard against data loss, corruption, and ransomware.

![The image is a presentation slide titled "Implementing Backup and Disaster Recovery" featuring the Velero logo and a list of use cases related to backup and disaster recovery.](https://kodekloud.com/kk-media/image/upload/v1752880771/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Storage/implementing-backup-disaster-recovery-velero.jpg)

| Tool     | Description                                              | Link                  |
| -------- | -------------------------------------------------------- | --------------------- |
| Velero   | Open source backup, restore, and disaster recovery       | https://velero.io     |
| Portworx | Enterprise-grade storage management and DR               | https://portworx.com  |
| OpenEBS  | Containerized storage with snapshot and clone features   | https://openebs.io    |
| Kasten   | Policy-driven backup and mobility for Kubernetes volumes | https://www.kasten.io |

## Monitoring Storage Health and Security

Track storage metrics and access patterns to detect anomalies early. Use Prometheus for data collection and Grafana for visualization.

![The image shows a Kubernetes monitoring dashboard with metrics on clusters, nodes, namespaces, workloads, pods, and containers, using Prometheus and Grafana.](https://kodekloud.com/kk-media/image/upload/v1752880773/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Storage/kubernetes-monitoring-dashboard-prometheus-grafana.jpg)

Important metrics:

- Volume latency and throughput
- PVC capacity versus usage
- I/O error rates
- Unauthorized mount or delete attempts

Integrate alerting rules to notify on threshold breaches or suspicious activity.

## Summary

![The image illustrates a Kubernetes storage setup, showing nodes within a cluster accessing a persistent volume, with emphasis on using RBAC for access control, regular backups, and data encryption at rest.](https://kodekloud.com/kk-media/image/upload/v1752880774/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Storage/kubernetes-storage-setup-rbac-backups.jpg)

In this lesson, you learned how to:

- Encrypt data at rest and in transit
- Enforce RBAC for storage resources
- Standardize storage parameters with StorageClasses
- Automate backups and disaster recovery
- Monitor storage metrics and access patterns

For deeper dives, see the [Kubernetes Storage Concepts](https://kubernetes.io/docs/concepts/storage/) and the [Kubernetes Security Best Practices](https://kubernetes.io/docs/concepts/security/overview/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/ca772db3-53aa-44c1-b424-3d32a046b683/lesson/676d9ab1-8a6f-48ca-9b46-3f9502ab9981)**
>
> Watch video content
