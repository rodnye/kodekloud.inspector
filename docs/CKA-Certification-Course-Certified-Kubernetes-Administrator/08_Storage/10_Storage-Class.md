# Storage Class - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Storage/Storage-Class)

---

## Table of Contents

- Storage Class
  - Static Provisioning
  - Dynamic Provisioning with Storage Classes
  - Customizing Storage Classes
  - Summary
  - Watch Video
  - Practice Lab

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Storage

# Storage Class

In this lesson, we explore storage classes in Kubernetes and demonstrate how they simplify the process of storage provisioning for applications. Traditionally, administrators manually created PersistentVolumes (PVs) and PersistentVolumeClaims (PVCs) and mounted them to pods. This guide covers both static provisioning (manually creating disks and PVs) and dynamic provisioning using storage classes, making your Kubernetes storage management more efficient.

---

## Static Provisioning

With static provisioning, you manually create the underlying storage (for example, a [Google Cloud persistent disk](https://cloud.google.com/compute/docs/disks)) and then construct a PV that references that disk. Each time an application requires storage, you must provision a disk on Google Cloud and create the corresponding PV definition.

For example, to create a persistent disk on Google Cloud, you can use the following command:

```
gcloud beta compute disks create \
  --size 1GB \
  --region us-east1 \
  pd-disk
```

Then, define your Kubernetes resources as follows:

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

```
# pvc-definition.yaml
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

```
# pod-definition.yaml
apiVersion: v1
kind: Pod
metadata:
  name: random-number-generator
spec:
  containers:
    - image: alpine
      name: alpine
      command: ["/bin/sh", "-c"]
      args: ["shuf -i 0-100 -n 1 >> /opt/number.out;"]
      volumeMounts:
        - mountPath: /opt
          name: data-volume
  volumes:
    - name: data-volume
      persistentVolumeClaim:
        claimName: myclaim
```

In this setup, the PVC binds to the manually created PV that refers to your existing Google Cloud persistent disk.

---

## Dynamic Provisioning with Storage Classes

Dynamic provisioning removes the need for manual storage pre-provisioning. When you create a PVC, the associated storage class automatically provisions the necessary PV using the defined provisioner.

First, create a storage class object that specifies the provisioner (in this case, Google Cloud's persistent disk):

```
# sc-definition.yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: google-storage
provisioner: kubernetes.io/gce-pd
```

With the storage class in place, update your PVC to reference it for dynamic provisioning:

```
# pvc-definition.yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: myclaim
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: google-storage
  resources:
    requests:
      storage: 500Mi
```

The pod definition remains similar:

```
# pod-definition.yaml
apiVersion: v1
kind: Pod
metadata:
  name: random-number-generator
spec:
  containers:
    - image: alpine
      name: alpine
      command: ["/bin/sh", "-c"]
      args: ["shuf -i 0-100 -n 1 >> /opt/"]
      volumeMounts:
        - mountPath: /opt
          name: data-volume
  volumes:
    - name: data-volume
      persistentVolumeClaim:
        claimName: myclaim
```

When you create a PVC with a storage class specified, Kubernetes leverages the defined provisioner to dynamically generate a new persistent disk with the requested size, automatically creating and binding a PV to the PVC.

> [!important]
> **Tip**
>
> Using dynamic provisioning simplifies storage management by reducing manual tasks and minimizing potential configuration errors.

---

## Customizing Storage Classes

Storage classes in Kubernetes support various parameters, allowing you to fine-tune the provisioned storage to meet your application’s performance and reliability requirements. Many provisioners support custom parameters. For example, with the GCE provisioner, you can specify disk types and replication modes. This enables you to create multiple classes of service such as silver (standard disks), gold (SSD drives), and platinum (regional SSD drives).

Below are examples of customized storage class definitions:

```
# silver storage class: standard disk without replication
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: silver
provisioner: kubernetes.io/gce-pd
parameters:
  type: pd-standard
  replication-type: none
```

```
# gold storage class: SSD disk without replication
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: gold
provisioner: kubernetes.io/gce-pd
parameters:
  type: pd-ssd
  replication-type: none
```

```
# platinum storage class: SSD disk with regional replication
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: platinum
provisioner: kubernetes.io/gce-pd
parameters:
  type: pd-ssd
  replication-type: regional-pd
```

By specifying the appropriate storage class in your PVC definitions, you match the storage's performance and reliability to your application's needs.

---

## Summary

This lesson demonstrated how Kubernetes storage classes streamline persistent storage provisioning. Whether using static provisioning or dynamic provisioning, storage classes allow for more efficient management of storage resources, reducing manual efforts and enhancing scalability.

For further details on Kubernetes storage and dynamic provisioning, visit the [Kubernetes Documentation](https://kubernetes.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/883f0aa9-3aa9-45a6-bd26-3a87ded1e00e/lesson/7db1e759-86c1-4d12-9b74-3cfd89ab9c5e)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/883f0aa9-3aa9-45a6-bd26-3a87ded1e00e/lesson/b3c24fd3-ca54-4dda-9e1b-0265bcac84ff)**
>
> Practice lab
