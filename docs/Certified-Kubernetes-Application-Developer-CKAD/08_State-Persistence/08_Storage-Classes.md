# Storage Classes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/State-Persistence/Storage-Classes)

---

## Table of Contents

- Storage Classes
  - Dynamic Provisioning with Storage Classes
  - Advanced Storage Classes
  - In Summary
  - Watch Video
  - Practice Lab

---

## Content

Certified Kubernetes Application Developer - CKAD

State Persistence

# Storage Classes

In this guide, we'll dive into storage classes in Kubernetes, a vital concept for managing dynamic storage provisioning. Earlier, we covered the creation of Persistent Volumes (PVs), Persistent Volume Claims (PVCs), and their integration within pod definitions. With static provisioning, you manually create and manage disks along with their corresponding PV definitions before deploying an application.

Below is an example of static provisioning using Google Cloud Persistent Disk:

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

Before creating the corresponding PV, you must provision the disk on Google Cloud manually. For example, you would use the following command to create a disk:

```
gcloud beta compute disks create \
  --size 1GB \
  --region us-east1 \
  pd-disk
```

> [!important]
> **Static Provisioning**
>
> Static provisioning involves manually creating and managing the storage disks and their PV definitions. This can become cumbersome for dynamic applications.

---

## Dynamic Provisioning with Storage Classes

Storage classes simplify storage management by allowing you to automatically create and configure storage resources when a PVC is created. They define a provisioner (such as Google Cloud Persistent Disk) that automatically creates a new disk, dynamically provisions a PV, and binds it to a PVC based on the storage class specified.

To implement dynamic provisioning, create a StorageClass object with the API version set to storage.k8s.io/v1. For Google Cloud, set the provisioner to kubernetes.io/gce-pd. Here is an example:

```
# sc-definition.yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: google-storage
provisioner: kubernetes.io/gce-pd
```

When a PVC references a storage class by name, Kubernetes automatically creates and attaches the required storage. For instance:

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

In this setup, when the PVC is created, Kubernetes uses the specified StorageClass to automatically provision a new disk, create a PV, and bind it to the PVC. This eliminates the need for manual disk provisioning.

---

## Advanced Storage Classes

Storage classes can be further customized with parameters specific to the underlying provisioner. For instance, with Google Cloud Persistent Disk, you can define the disk type and replication mode. Consider this example:

```
# google-storage with parameters
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: google-storage
provisioner: kubernetes.io/gce-pd
parameters:
  type: pd-standard  # Options: pd-standard or pd-ssd
  replication-type: none  # Options: none or regional-pd
```

This customization allows enterprises to define different classes of service based on performance and availability requirements. Below are examples of multiple storage classes:

| Storage Class | Disk Type   | Replication Mode             |
| ------------- | ----------- | ---------------------------- |
| Silver        | pd-standard | None                         |
| Gold          | pd-ssd      | None                         |
| Platinum      | pd-ssd      | Regional (High Availability) |

Examples for each:

```
# silver storage class
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
# gold storage class
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
# platinum storage class
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: platinum
provisioner: kubernetes.io/gce-pd
parameters:
  type: pd-ssd
  replication-type: regional-pd
```

By utilizing these tailored storage classes in your PVC definitions, you ensure that the storage provisioned aligns precisely with your application’s performance requirements and budget considerations.

> [!important]
> **Dynamic Provisioning Benefits**
>
> Dynamic provisioning streamlines the process of deploying applications in Kubernetes by eliminating manual storage configuration. This leads to improved efficiency, reduced errors, and enhanced scalability.

---

## In Summary

Storage classes in Kubernetes offer a powerful mechanism to manage storage dynamically. By abstracting the complexities of physical disk configurations, storage classes enable you to create, manage, and bind storage resources automatically as needed. Whether you opt for static provisioning or embrace the flexibility of dynamic provisioning, storage classes are integral to ensuring your applications have the right storage infrastructure.

For more detailed information, consider visiting the official [Kubernetes Documentation](https://kubernetes.io/docs/concepts/storage/storage-classes/).

Happy provisioning!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/cb16c9a3-1608-48cf-bfd5-2465f64b4f93/lesson/b3eb9f6b-672b-4c2b-82e8-08d8833fd107)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/cb16c9a3-1608-48cf-bfd5-2465f64b4f93/lesson/819fad39-4f84-413a-9d3b-828707393413)**
>
> Practice lab
