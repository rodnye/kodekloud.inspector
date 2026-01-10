# EKS EFSElastic File System - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-EKS/EKS-Storage/EKS-EFSElastic-File-System)

---

## Table of Contents

- EKS EFSElastic File System
  - What Is Amazon EFS?
  - Key Benefits of EFS
  - EFS Integration with Kubernetes
  - Performance and Workload Considerations
  - Dynamic Provisioning
  - EFS vs. EBS vs. S3: Cost and Capacity Trade-offs
  - Further Reading
  - Watch Video

---

## Content

AWS EKS

EKS Storage

# EKS EFSElastic File System

Elastic File System (EFS) is AWS’s managed NFS service, seamlessly integrating with Amazon EKS to provide shared, scalable file storage for containers. In this guide, we’ll explore EFS essentials, Kubernetes integration, performance considerations, dynamic provisioning, and a cost–capacity comparison with EBS and S3.

![The image is an introduction to AWS Elastic File System (EFS), equating it to a Network File System (NFS), with corresponding icons for each.](https://kodekloud.com/kk-media/image/upload/v1752862832/notes-assets/images/AWS-EKS-EKS-EFSElastic-File-System/aws-efs-nfs-introduction-icons.jpg)

## What Is Amazon EFS?

EFS delivers a fully managed, elastic NFS file system that automatically scales storage up and down as you add or remove files. It abstracts away capacity planning and low-level configuration, letting developers focus on applications.

> [!important]
> **Note**
>
> EFS provides NFSv4.1/4.2-compatible mounts with POSIX semantics, making it ideal for workloads requiring shared file access across pods and AZs.

## Key Benefits of EFS

| Feature             | Benefit                                                             |
| ------------------- | ------------------------------------------------------------------- |
| Regional Service    | Mount the same file system in multiple Availability Zones (AZs).    |
| Multi-Writer Access | Support many-to-many mounts—pods in different AZs share one volume. |
| Automatic Scaling   | Grow or shrink storage capacity on demand, up to petabyte scale.    |
| Fully Managed NFS   | AWS handles back-end storage, patches, and availability.            |

![The image illustrates the benefits of EFS, showing a region with two availability zones, each containing a pod, and one zone featuring an EFS icon.](https://kodekloud.com/kk-media/image/upload/v1752862833/notes-assets/images/AWS-EKS-EKS-EFSElastic-File-System/efs-benefits-availability-zones-pods.jpg)

## EFS Integration with Kubernetes

To use EFS in EKS, you perform infrastructure setup outside the cluster, then leverage the EFS CSI driver for mounting:

1.  **Provision EFS**
    - Create an EFS file system and mount targets in each subnet.
    - Configure security groups to allow NFS traffic (port 2049) from EKS node subnets.
    - Assign IAM roles or policies permitting `elasticfilesystem:ClientMount` and related actions.

2.  **Install the EFS CSI Driver**

    ```
    helm repo add aws-efs-csi-driver https://kubernetes-sigs.github.io/aws-efs-csi-driver/
    helm install aws-efs-csi-driver aws-efs-csi-driver/aws-efs-csi-driver \
      --namespace kube-system
    ```

3.  **Define PV & PVC**

    ```
    apiVersion: v1
    kind: PersistentVolume
    metadata:
      name: efs-pv
    spec:
      capacity:
        storage: 5Gi
      volumeMode: Filesystem
      accessModes:
        - ReadWriteMany
      persistentVolumeReclaimPolicy: Retain
      csi:
        driver: efs.csi.aws.com
        volumeHandle: fs-12345678
    ---
    apiVersion: v1
    kind: PersistentVolumeClaim
    metadata:
      name: efs-pvc
    spec:
      accessModes:
        - ReadWriteMany
      resources:
        requests:
          storage: 5Gi
      storageClassName: ""
      volumeName: efs-pv
    ```

4.  **Mount in a Pod**

    ```
    apiVersion: v1
    kind: Pod
    metadata:
      name: efs-app
    spec:
      containers:
        - name: app
          image: nginx
          volumeMounts:
            - name: efs-vol
              mountPath: /usr/share/nginx/html
      volumes:
        - name: efs-vol
          persistentVolumeClaim:
            claimName: efs-pvc
    ```

![The image illustrates how Amazon EFS (Elastic File System) integrates with a Kubernetes cluster, showing components like VPC, subnets, nodes, pods, EFS mount points, IAM permissions, and security group policies.](https://kodekloud.com/kk-media/image/upload/v1752862834/notes-assets/images/AWS-EKS-EKS-EFSElastic-File-System/amazon-efs-kubernetes-integration-diagram.jpg)

With the CSI driver, pods in any AZ can mount the same file system concurrently: ![The image illustrates a diagram showing pods in two availability zones connected to an EFS mount point and a database.](https://kodekloud.com/kk-media/image/upload/v1752862836/notes-assets/images/AWS-EKS-EKS-EFSElastic-File-System/pods-availability-zones-efs-database-diagram.jpg)

## Performance and Workload Considerations

EFS offers shared read/write access but inherits NFS characteristics:

- **File locking** may block concurrent writes on the same file.
- **Latency** can be higher than block storage for small-file operations.
- **Throughput** scales with burst credits and Provisioned Throughput modes.

> [!important]
> **Warning**
>
> Running high-concurrency databases on EFS can cause I/O contention due to file locks. Evaluate workload patterns and test performance before production use.

## Dynamic Provisioning

The EFS CSI driver supports creating subdirectories under one mount target for isolated PVCs. This simplifies management compared to a generic NFS provisioner:

```
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: efs-sc
provisioner: efs.csi.aws.com
parameters:
  provisioningMode: efs-ap
  fileSystemId: fs-12345678
  directoryPerms: "750"
reclaimPolicy: Delete
volumeBindingMode: Immediate
```

When you create a PVC using this storage class, the driver auto-creates a subpath:

```
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: app1-pvc
spec:
  storageClassName: efs-sc
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 1Gi
```

![The image illustrates a dynamic provisioning setup with two availability zones, each containing a pod, connected to an EFS mount point for applications.](https://kodekloud.com/kk-media/image/upload/v1752862837/notes-assets/images/AWS-EKS-EKS-EFSElastic-File-System/dynamic-provisioning-setup-availability-zones.jpg)

## EFS vs. EBS vs. S3: Cost and Capacity Trade-offs

| Storage Type | Access Pattern       | AZ Scope  | Cost Tier | Ideal Use Case                        |
| ------------ | -------------------- | --------- | --------- | ------------------------------------- |
| EFS          | NFS, multi-writer    | Regional  | $$        | Shared file storage, web assets       |
| EBS          | Block, single-writer | Single AZ | $         | High IOPS databases, low-latency apps |
| S3           | Object               | Regional  | $         | Backups, archives, static hosting     |

![The image compares EFS and EBS, highlighting that file system size matters in EFS, volume is not a concern in EBS, and EBS and S3 are cheaper options.](https://kodekloud.com/kk-media/image/upload/v1752862838/notes-assets/images/AWS-EKS-EKS-EFSElastic-File-System/efs-ebs-comparison-file-size-costs.jpg)

Choose EFS for cross-AZ, multi-writer scenarios with POSIX semantics. Opt for EBS when you need high-performance block storage. Use S3 for inexpensive, scalable object storage.

---

## Further Reading

- [Amazon EFS Documentation](https://docs.aws.amazon.com/efs/latest/ug/what-is-efs.html)
- [AWS EFS CSI Driver](https://github.com/kubernetes-sigs/aws-efs-csi-driver)
- [Kubernetes Persistent Volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-eks/module/805f2baf-19cd-465a-84c1-e2650ad43f1f/lesson/46e94d31-dbcd-4045-8c04-9723974e7f45)**
>
> Watch video content
