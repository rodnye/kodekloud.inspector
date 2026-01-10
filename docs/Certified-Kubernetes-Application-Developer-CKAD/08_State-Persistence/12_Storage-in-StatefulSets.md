# Storage in StatefulSets - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/State-Persistence/Storage-in-StatefulSets)

---

## Table of Contents

- Storage in StatefulSets
  - Persistent Volumes and Static Provisioning
  - Dynamic Provisioning with StorageClasses
  - Using StatefulSets with Shared Storage
  - Separate Volumes for Each Pod Using VolumeClaimTemplates
  - Watch Video
    - PersistentVolume Definition
    - PersistentVolumeClaim Definition
    - Pod Definition Referencing the PVC
    - StorageClass Definition
    - PVC Definition Using Dynamic Provisioning
    - Pod Definition Referencing the Dynamically Provisioned PVC
    - Shared Storage StatefulSet Example
    - Step 1: Define the StorageClass
    - Step 2: Create a StatefulSet with a VolumeClaimTemplate

---

## Content

Certified Kubernetes Application Developer - CKAD

State Persistence

# Storage in StatefulSets

In this article, we explore storage in StatefulSets and explain how persistent storage operates in Kubernetes. We begin with a review of persistent volumes (PV) and persistent volume claims (PVC) used with Pods, then dive into different provisioning methods and their use in StatefulSets.

---

## Persistent Volumes and Static Provisioning

Static provisioning involves a three-step process:

1.  Create a PersistentVolume.
2.  Create a PersistentVolumeClaim.
3.  Reference the PVC in your Pod specification.

Below is an example of each configuration:

> [!important]
> **Tip**
>
> For static provisioning, ensure that the PV capacity and access modes match the requirements of your applications.

### PersistentVolume Definition

```
# pv-definition.yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-vol1
spec:
  accessModes:
    - ReadWriteOnce
  capacity:
    storage: 500Mi
  gcePersistentDisk:
    pdName: pd-disk
  fsType: ext4
```

### PersistentVolumeClaim Definition

```
# pvc-definition.yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: data-volume
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: google-storage
  resources:
    requests:
      storage: 500Mi
```

### Pod Definition Referencing the PVC

```
# pod-definition.yaml
apiVersion: v1
kind: Pod
metadata:
  name: mysql
spec:
  containers:
    - image: mysql
      name: mysql
      volumeMounts:
        - mountPath: /var/lib/mysql
          name: data-volume
  volumes:
    - name: data-volume
      persistentVolumeClaim:
        claimName: data-volume
```

---

## Dynamic Provisioning with StorageClasses

Dynamic provisioning simplifies the process by automatically creating PVs when you define a PVC and reference a StorageClass. This eliminates the need to manually provision PVs.

### StorageClass Definition

```
# sc-definition.yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: google-storage
provisioner: kubernetes.io/gce-pd
```

### PVC Definition Using Dynamic Provisioning

```
# pvc-definition.yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: data-volume
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: google-storage
  resources:
    requests:
      storage: 500Mi
```

### Pod Definition Referencing the Dynamically Provisioned PVC

```
# pod-definition.yaml
apiVersion: v1
kind: Pod
metadata:
  name: mysql
spec:
  containers:
    - image: mysql
      name: mysql
      volumeMounts:
        - mountPath: /var/lib/mysql
          name: data-volume
  volumes:
    - name: data-volume
      persistentVolumeClaim:
        claimName: data-volume
```

---

## Using StatefulSets with Shared Storage

StatefulSets support scenarios where multiple replicas share the same volume. If you reference a common PVC within a StatefulSet, all replicas will attempt to access the same storage. This setup works if your underlying storage supports multi-reader or multi-writer capabilities.

### Shared Storage StatefulSet Example

```
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mysql
  labels:
    app: mysql
spec:
  replicas: 3
  selector:
    matchLabels:
      app: mysql
  template:
    metadata:
      labels:
        app: mysql
    spec:
      containers:
        - name: mysql
          image: mysql
          volumeMounts:
            - mountPath: /var/lib/mysql
              name: data-volume
      volumes:
        - name: data-volume
          persistentVolumeClaim:
            claimName: data-volume
```

> [!important]
> **Important**
>
> Ensure that your storage solution supports concurrent access if you plan to share the same volume across multiple Pods.

---

## Separate Volumes for Each Pod Using VolumeClaimTemplates

For scenarios like MySQL replication where each Pod requires dedicated storage, a volume claim template allows Kubernetes to automatically create a unique PVC for each Pod in a StatefulSet.

### Step 1: Define the StorageClass

```
# sc-definition.yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: google-storage
provisioner: kubernetes.io/gce-pd
```

### Step 2: Create a StatefulSet with a VolumeClaimTemplate

```
# statefulset-definition.yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mysql
  labels:
    app: mysql
spec:
  replicas: 3
  selector:
    matchLabels:
      app: mysql
  template:
    metadata:
      labels:
        app: mysql
    spec:
      containers:
        - name: mysql
          image: mysql
          volumeMounts:
            - mountPath: /var/lib/mysql
              name: data-volume
  volumeClaimTemplates:
    - metadata:
        name: data-volume
      spec:
        accessModes:
          - ReadWriteOnce
        storageClassName: google-storage
        resources:
          requests:
            storage: 500Mi
```

In this configuration, Kubernetes provisions a unique PVC for each Pod automatically based on the volume claim template. This ensures that every Pod receives its dedicated storage. Additionally, StatefulSets maintain stable storage even if a Pod is rescheduled; the associated PVC and underlying PV remain intact and are reattached to the new Pod instance.

---

That concludes our discussion on storage in StatefulSets. For more information on Kubernetes storage concepts, visit the [Kubernetes Documentation](https://kubernetes.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/cb16c9a3-1608-48cf-bfd5-2465f64b4f93/lesson/3d2aab8c-5ddc-40fd-927e-be49550c8f9b)**
>
> Watch video content
