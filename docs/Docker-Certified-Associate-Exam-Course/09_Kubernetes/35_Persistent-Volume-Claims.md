# Persistent Volume Claims - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Kubernetes/Persistent-Volume-Claims)

---

## Table of Contents

- Persistent Volume Claims
  - How PV-PVC Binding Works
  - Step-by-Step: Creating a PersistentVolumeClaim
  - Reclaim Policies
  - Cleaning Up
  - Links and References
  - Watch Video
    - Using Label Selectors

---

## Content

Docker Certified Associate Exam Course

Kubernetes

# Persistent Volume Claims

In Kubernetes, storage resources are decoupled from pods using Persistent Volumes (PV) and Persistent Volume Claims (PVC).

- A **PersistentVolume** (PV) is a cluster-level resource representing a piece of storage provisioned by an administrator.
- A **PersistentVolumeClaim** (PVC) is a user’s request for storage, specifying capacity, access modes, and optional selectors.

When a PVC is created, Kubernetes matches it to an available PV that meets its requirements and then binds them.

![The image illustrates the concept of Persistent Volume Claims (PVC) and Persistent Volumes (PV) in Kubernetes, showing a mapping between PVCs and PVs with different colors.](https://kodekloud.com/kk-media/image/upload/v1752874018/notes-assets/images/Docker-Certified-Associate-Exam-Course-Persistent-Volume-Claims/kubernetes-pvc-pv-mapping-diagram.jpg)

## How PV-PVC Binding Works

The binding process evaluates several criteria to find a suitable PV for a PVC:

- **Capacity**: PV storage ≥ PVC request
- **Access Modes**: e.g., `ReadWriteOnce`, `ReadOnlyMany`
- **Volume Mode**: e.g., `Filesystem` or `Block`
- **Storage Class**: must match if specified
- **Label Selectors** (optional): target specific volumes

### Using Label Selectors

You can refine binding with labels on both PVC and PV:

```
# pvc-selector.yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: myclaim
spec:
  selector:
    matchLabels:
      name: my-pv
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 500Mi
```

```
# pv-with-label.yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-vol1
  labels:
    name: my-pv
spec:
  capacity:
    storage: 1Gi
  accessModes:
    - ReadWriteOnce
  awsElasticBlockStore:
    volumeID: <volume-id>
    fsType: ext4
```

![The image illustrates the concept of "Binding" in Kubernetes, showing various colored blocks labeled "PV" and "PVC" with icons representing storage. It also highlights key factors like "Sufficient Capacity," "Access Modes," "Volume Modes," and "Storage Class."](https://kodekloud.com/kk-media/image/upload/v1752874020/notes-assets/images/Docker-Certified-Associate-Exam-Course-Persistent-Volume-Claims/kubernetes-binding-pv-pvc-diagram.jpg)

> [!important]
> **Note**
>
> A PVC binds to only one PV and vice versa. If a PV is larger than the requested size, the leftover space remains unused and cannot be shared.

![The image illustrates the concept of binding in Kubernetes, showing the relationship between Persistent Volumes (PV) and Persistent Volume Claims (PVC), with conditions like "Pending" and criteria such as "Sufficient Capacity" and "Access Modes."](https://kodekloud.com/kk-media/image/upload/v1752874021/notes-assets/images/Docker-Certified-Associate-Exam-Course-Persistent-Volume-Claims/kubernetes-binding-pv-pvc-diagram-2.jpg)

## Step-by-Step: Creating a PersistentVolumeClaim

1.  **Define the PVC**  
    Save the following manifest as `pvc-definition.yaml`:

    ```
    apiVersion: v1
    kind: PersistentVolumeClaim
    metadata:
      name: myclaim
    spec:
      accessModes:
        - ReadWriteOnce
      resources:
        requests:
          storage: 500Mi
    ```

2.  **Apply the PVC**

    ```
    kubectl apply -f pvc-definition.yaml
    ```

3.  **Verify Status**

    ```
    kubectl get pvc myclaim
    ```

    ```
    NAME      STATUS    VOLUME   CAPACITY   ACCESS MODES
    myclaim   Pending
    ```

    Once a matching PV is available, the PVC transitions to `Bound`:

    ```
    kubectl get pvc myclaim
    ```

    ```
    NAME      STATUS   VOLUME    CAPACITY   ACCESS MODES
    myclaim   Bound    pv-vol1   1Gi        RWO
    ```

> [!important]
> **Note**
>
> If your cluster supports dynamic provisioning, you can skip creating a PV manually. Just specify a `storageClassName` in the PVC.

## Reclaim Policies

When a PVC is deleted, the PV’s reclaim policy determines what happens to the underlying storage:

| Reclaim Policy   | Behavior                                                          | Use Case                                 |
| ---------------- | ----------------------------------------------------------------- | ---------------------------------------- |
| Retain (default) | PV and data are kept intact                                       | Manual cleanup or data recovery          |
| Delete           | PV and its data are deleted automatically                         | Ephemeral workloads or test environments |
| Recycle          | Data is scrubbed (basic `rm -rf /thevolume/*`) and made available | Shared test space (deprecated in v1.22)  |

To set a reclaim policy, include it in the PV spec:

```
spec:
  persistentVolumeReclaimPolicy: Delete
```

## Cleaning Up

Remove the PVC when you no longer need it:

```
kubectl delete pvc myclaim
```

Depending on the reclaim policy, the PV will either be deleted, retained, or recycled.

## Links and References

- [Kubernetes Persistent Volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)
- [Persistent Volume Claims](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#persistentvolumeclaims)
- [Storage Classes](https://kubernetes.io/docs/concepts/storage/storage-classes/)
- [AWS Elastic Block Store (EBS)](https://kubernetes.io/docs/concepts/storage/volumes/#awselasticblockstore)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/d9358627-4fc7-4acc-ab96-fa25232555c6/lesson/78581ed8-6a56-4ad9-a421-867cd399fd46)**
>
> Watch video content
