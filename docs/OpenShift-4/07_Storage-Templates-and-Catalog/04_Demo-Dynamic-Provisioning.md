# Demo Dynamic Provisioning - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenShift-4/Storage-Templates-and-Catalog/Demo-Dynamic-Provisioning)

---

## Table of Contents

- Demo Dynamic Provisioning
  - Watch Video

---

## Content

OpenShift 4

Storage Templates and Catalog

# Demo Dynamic Provisioning

Before diving into OpenShift terminology, it helps to review storage from a Kubernetes perspective. The underlying concepts for both Kubernetes and OpenShift are very similar, which makes it easy to transition between the two.

The Kubernetes storage system relies on the Container Storage Interface (CSI) plugin. This plugin enables direct communication between Kubernetes (or OpenShift) and various storage providers, including Azure Storage, AWS S3, and NetApp Storage—as long as the vendor supports the respective plugin.

One key component in this process is the provisioner. Think of it like a parent-child relationship where the dynamic provisioner acts as the first child, directly interacting with the CSI plugin. This dynamic connection is established through a StorageClass. For example, you could create an Azure StorageClass for dynamically connecting to either Azure File Shares or Azure Disks.

In addition to dynamic provisioning, Kubernetes also supports static provisioning using PersistentVolumes (PVs). In static provisioning, you define a fixed disk (such as a 50-GB disk) within a PersistentVolume, and then allow a Pod to claim this volume using a PersistentVolumeClaim (PVC). In both scenarios, the PVC is responsible for requesting storage either from a StorageClass (dynamic provisioning) or from a pre-configured PersistentVolume (static provisioning).

> [!important]
> **Note**
>
> In OpenShift, "persistent storage" essentially refers to a PersistentVolume in Kubernetes. Although the terminology may differ, the underlying functionality remains the same.

Let's illustrate these concepts with an example in Visual Studio Code. The following YAML configuration defines a StorageClass using the CSI for Azure Files, along with a PersistentVolumeClaim that requests 10 Gi of storage:

```
kind: StorageClass
apiVersion: storage.k8s.io/v1
metadata:
  name: azurefile-csi
  provisioner: file.csi.azure.com
  allowVolumeExpansion: true
mountOptions:
  - dir_mode=0777
  - file_mode=0777
  - uid=0
  - gid=0
  - mfsymlinks
  - cache=strict
  - actimeo=30
parameters:
  skuName: Premium_LRS
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: azurefile
spec:
  accessModes:
    - ReadWriteMany
  storageClassName: azurefile-csi
  resources:
    requests:
      storage: 10Gi
```

In this configuration:

- The StorageClass "azurefile-csi" uses the `file.csi.azure.com` provisioner, designed specifically for Azure Files.
- Various mount options and parameters (e.g., `skuName: Premium_LRS`) customize the storage settings.
- The PersistentVolumeClaim named "azurefile" requests 10 Gi of storage through the defined StorageClass.

When the PVC is created, it communicates with the StorageClass to allocate the requested storage. Once available, the PVC binds to the provisioned storage, making it ready for use by a Kubernetes deployment.

Below is an example snippet that demonstrates how to reference the PersistentVolumeClaim within a Kubernetes deployment. In this configuration, the volume is mounted into a Pod:

```
volumes:
  - name: azure
    persistentVolumeClaim:
      claimName: azurefile
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginxdeployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginxdeployment
  template:
    metadata:
      labels:
        app: nginxdeployment
    spec:
      containers:
        - name: nginx
          image: nginx:latest
          volumeMounts:
            - name: azure
              mountPath: /mnt/azure
```

In this deployment configuration:

- The volume "azure" references the PersistentVolumeClaim named "azurefile".
- The Nginx container mounts this volume at the directory `/mnt/azure`.

This approach to storage provisioning—whether dynamic or static—ensures that you can manage storage resources efficiently across both Kubernetes and OpenShift environments.

Let's check it out.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/openshift-4/module/b7e60e62-0f83-422c-8fca-6c9bb3cf4862/lesson/e697ddfa-bbe2-419d-8300-d2418c6612ca)**
>
> Watch video content
