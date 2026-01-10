# Persistent Volumes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Kubernetes/Persistent-Volumes)

---

## Table of Contents

- Persistent Volumes
  - Why Use Persistent Volumes?
  - PersistentVolume Object Overview
  - 1. Creating a HostPath PersistentVolume
  - 2. Creating a Cloud-Backed PersistentVolume
  - Next Steps
  - Links and References
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Kubernetes

# Persistent Volumes

Persistent Volumes (PVs) decouple storage management from Pod lifecycle, providing a cluster-wide pool of storage resources that administrators provision and developers consume via Persistent Volume Claims (PVCs). This approach centralizes configuration, improves security boundaries, and simplifies updates.

## Why Use Persistent Volumes?

When you embed volume definitions in every Pod spec, any change to storage (capacity, filesystem, reclaim policy) requires updating all manifests. PVs solve this by:

- Centralizing storage configuration in a single object
- Allowing administrators to manage capacity, access modes, and reclaim policy
- Letting developers request storage without knowing backend details

![The image illustrates the concept of Persistent Volumes (PVs) and Persistent Volume Claims (PVCs) in a Kubernetes environment, showing the relationship between data volumes and claims.](https://kodekloud.com/kk-media/image/upload/v1752874022/notes-assets/images/Docker-Certified-Associate-Exam-Course-Persistent-Volumes/kubernetes-persistent-volumes-claims.jpg)

## PersistentVolume Object Overview

| Field                                | Description                                                                                                       |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| `spec.capacity.storage`              | Total volume size (e.g., `1Gi`, `10Gi`)                                                                           |
| `spec.accessModes`                   | How Pods can mount the volume:<br/>- `ReadWriteOnce` (RWO)<br/>- `ReadOnlyMany` (ROX)<br/>- `ReadWriteMany` (RWX) |
| `spec.persistentVolumeReclaimPolicy` | Action when a PVC is deleted:<br/>- `Retain`<br/>- `Delete`<br/>- `Recycle`                                       |
| `spec.<storageBackend>`              | Backend-specific settings (e.g., `hostPath`, `awsElasticBlockStore`, `nfs`)                                       |

## 1\. Creating a HostPath PersistentVolume

Below is a minimal PV definition that uses a node’s local filesystem (`hostPath`). This is helpful for testing but **not recommended for production**.

```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-hostpath-1
spec:
  capacity:
    storage: 1Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: /tmp/data
  persistentVolumeReclaimPolicy: Retain
```

> [!important]
> **Warning**
>
> The `hostPath` backend binds storage to a specific node’s filesystem. For highly available or multi-node clusters, use cloud volumes or networked storage solutions.

Save this manifest as `pv-hostpath.yaml` and apply:

```
kubectl apply -f pv-hostpath.yaml
```

Verify creation:

```
kubectl get pv
```

Expected output:

```
NAME             CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS      CLAIM   AGE
pv-hostpath-1    1Gi        RWO            Retain           Available           10s
```

## 2\. Creating a Cloud-Backed PersistentVolume

Replace the `hostPath` section with cloud provider settings. Example: AWS EBS

```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-ebs-1
spec:
  capacity:
    storage: 5Gi
  accessModes:
    - ReadWriteOnce
  awsElasticBlockStore:
    volumeID: <aws-volume-id>
    fsType: ext4
  persistentVolumeReclaimPolicy: Delete
```

Apply and verify as before:

```
kubectl apply -f pv-ebs.yaml
kubectl get pv
```

> [!important]
> **Note**
>
> Adjust the backend section for other cloud providers (GCE, Azure) or network filesystems (NFS, CSI drivers) by consulting the [Kubernetes Storage Concepts](https://kubernetes.io/docs/concepts/storage/).

## Next Steps

Once PVs are available, developers create Persistent Volume Claims (PVCs) to request specific capacity and access modes. Kubernetes binds PVCs to matching PVs, making storage consumption seamless within Pod specs.

---

## Links and References

- [Persistent Volumes | Kubernetes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)
- [Persistent Volume Claim | Kubernetes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#persistentvolumeclaims)
- [Storage Classes | Kubernetes](https://kubernetes.io/docs/concepts/storage/storage-classes/)
- [AWS EBS Volumes](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volume-types.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/d9358627-4fc7-4acc-ab96-fa25232555c6/lesson/b920a910-e89e-477f-be56-458178c4b45d)**
>
> Watch video content
