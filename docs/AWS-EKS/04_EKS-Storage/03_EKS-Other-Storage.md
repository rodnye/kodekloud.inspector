# EKS Other Storage - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-EKS/EKS-Storage/EKS-Other-Storage)

---

## Table of Contents

- EKS Other Storage
  - 1. Amazon FSx for Lustre
  - 2. Amazon S3
  - 3. Local Instance Storage
  - 4. In-Cluster Storage Solutions
  - Comparative Overview
  - Conclusion
  - Watch Video
    - Example PV and PVC
    - Mounting S3 via CSI
    - Lifecycle Management

---

## Content

AWS EKS

EKS Storage

# EKS Other Storage

Before we wrap up storage on EKS, let’s explore additional AWS-managed file and object stores beyond Amazon EBS and Amazon EFS. AWS offers FSx for Lustre, S3 (via API or CSI), and the node’s local instance storage. While powerful, these may require manual provisioning or mounting rather than automatic CSI-based dynamic provisioning.

![The image shows icons for different Amazon storage options: FSX, Amazon FSX for Lustre, and Amazon S3.](https://kodekloud.com/kk-media/image/upload/v1752862839/notes-assets/images/AWS-EKS-EKS-Other-Storage/amazon-storage-options-fsx-s3-icons.jpg)

## 1\. Amazon FSx for Lustre

Amazon FSx for Lustre delivers a high-performance, POSIX-compliant file system ideal for workloads demanding massive throughput and low latency. You must create the file system in AWS and then mount it into your pods by defining a `PersistentVolume` and `PersistentVolumeClaim`.

![The image is about "Other Storage Options" and highlights "High-Performance Throughputs" and the "Lustre File System" with an icon representing FSx.](https://kodekloud.com/kk-media/image/upload/v1752862840/notes-assets/images/AWS-EKS-EKS-Other-Storage/other-storage-options-high-performance-lustre.jpg)

### Example PV and PVC

```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: fsx-lustre-pv
spec:
  capacity:
    storage: 1Ti
  accessModes:
    - ReadWriteMany
  csi:
    driver: fsx.csi.aws.com
    volumeHandle: fs-0123456789abcdef0
    volumeAttributes:
      dnsname: fs-0123456789abcdef0.fsx.us-west-2.amazonaws.com
  persistentVolumeReclaimPolicy: Retain
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: fsx-lustre-pvc
spec:
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 1Ti
  volumeName: fsx-lustre-pv
```

> [!important]
> **Note**
>
> FSx for Lustre is POSIX-compliant, so standard UNIX file operations work as expected.

## 2\. Amazon S3

Amazon S3 is an object store accessed via its API. Typically, applications use AWS SDKs or CLI to interact with buckets. AWS also provides the [aws-s3-csi-driver](https://github.com/kubernetes-sigs/aws-s3-csi-driver) that exposes S3 buckets as file systems.

![The image shows three icons of S3 buckets labeled "S3 Buckets" under the heading "Other Storage Options," with a "Mount Point for S3" label above them.](https://kodekloud.com/kk-media/image/upload/v1752862842/notes-assets/images/AWS-EKS-EKS-Other-Storage/s3-buckets-other-storage-options-icons.jpg)

### Mounting S3 via CSI

```
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: s3-sc
provisioner: s3.csi.aws.com
reclaimPolicy: Retain
parameters:
  bucket: my-eks-bucket
  region: us-west-2
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: s3-pvc
spec:
  storageClassName: s3-sc
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 10Gi
```

Keep in mind the following filesystem limitations:

- S3 is **not** POSIX-compliant; the CSI driver maps object APIs to file operations.
- Renaming an object involves a copy-and-delete under the hood:

![The image states "S3 Does Not Support Renames" and shows two buttons labeled "Update a Name" and "Delete and Object."](https://kodekloud.com/kk-media/image/upload/v1752862842/notes-assets/images/AWS-EKS-EKS-Other-Storage/s3-does-not-support-renames-buttons.jpg)

- “Directories” are key prefixes; empty folders don’t exist unless objects are present.

> [!important]
> **Warning**
>
> Some file operations (e.g., hard links, permissions) may not behave as expected on S3. Review the CSI driver documentation for feature support and caveats.

## 3\. Local Instance Storage

Each EC2 node includes either HDD or NVMe instance storage. It delivers blazing-fast I/O but is **ephemeral**—data is lost when the instance is stopped or terminated.

![The image illustrates a Kubernetes cluster with two nodes, each containing a local volume.](https://kodekloud.com/kk-media/image/upload/v1752862843/notes-assets/images/AWS-EKS-EKS-Other-Storage/kubernetes-cluster-two-nodes-local-volume.jpg) ![The image illustrates a Kubernetes cluster with two nodes, each containing NVMe drives.](https://kodekloud.com/kk-media/image/upload/v1752862845/notes-assets/images/AWS-EKS-EKS-Other-Storage/kubernetes-cluster-two-nodes-nvme.jpg)

- No native CSI driver exists for instance store.
- You must manually manage mount points and node-level configuration.
- For persistence, attach an EBS volume or snapshot local data before shutdown:

![The image illustrates a concept of "Storage and Nodes" with labeled elements for "Snapshot," "Backup," and "EBS Volume," accompanied by gear icons.](https://kodekloud.com/kk-media/image/upload/v1752862846/notes-assets/images/AWS-EKS-EKS-Other-Storage/storage-and-nodes-snapshot-backup-ebs.jpg)

### Lifecycle Management

![The image shows icons and text for "Local Volumes" and "Container Storage Interface (CSI) Driver."](https://kodekloud.com/kk-media/image/upload/v1752862847/notes-assets/images/AWS-EKS-EKS-Other-Storage/local-volumes-csi-driver-icons.jpg)

- Backup and restore logic must be custom-built (e.g., cronJobs, AWS DataSync).
- Consider combining with EBS for snapshots and durability.

## 4\. In-Cluster Storage Solutions

Running storage natively within Kubernetes eliminates external dependencies like IAM, VPC routing, and separate APIs. Popular CNCF-backed options include [Ceph](https://ceph.io), [Longhorn](https://longhorn.io), [OpenEBS](https://openebs.io), and [Rook](https://rook.io). These platforms deploy operators and CRDs to manage storage across nodes.

![The image shows a diagram of cluster options, including IAM credentials, VPC, subnet, and security group, alongside a Kubernetes cluster with various storage solutions like OpenEBS and others.](https://kodekloud.com/kk-media/image/upload/v1752862848/notes-assets/images/AWS-EKS-EKS-Other-Storage/cluster-options-kubernetes-storage-diagram.jpg)

Key benefits:

- Storage provisioning via Kubernetes APIs (no external calls).
- Built-in replication, healing, and snapshots managed by operators.
- Cloud-agnostic—support on any Kubernetes cluster, on-prem or in another cloud.

## Comparative Overview

| Storage Type           | Performance           | Persistence            | POSIX Compliance | Dynamic Provisioning |
| ---------------------- | --------------------- | ---------------------- | ---------------- | -------------------- |
| FSx for Lustre         | Very high             | Durable                | Yes              | Manual (CSI only)    |
| Amazon S3 (CSI)        | Moderate              | Durable                | Partial          | Yes (CSI)            |
| Local Instance Storage | Ultra low latency     | Ephemeral              | Yes              | Manual               |
| In-Cluster Solutions   | Variable (replicated) | Durable (self-managed) | Yes              | Yes (Operators)      |

## Conclusion

Your choice hinges on throughput requirements, data durability, and operational overhead. Whether you use FSx for Lustre’s HPC file system, object-based S3, node-local volumes, or a self-contained in-cluster solution, plan for backups, snapshots, and access controls to keep your data safe and available.

![The image shows icons representing different storage solutions: FSX, Amazon FSX for Lustre, Amazon S3, and Local Storage, under the heading "Conclusion."](https://kodekloud.com/kk-media/image/upload/v1752862849/notes-assets/images/AWS-EKS-EKS-Other-Storage/storage-solutions-icons-conclusion.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-eks/module/805f2baf-19cd-465a-84c1-e2650ad43f1f/lesson/d0952e36-d846-4e28-a0ce-a6e46a9b20aa)**
>
> Watch video content
