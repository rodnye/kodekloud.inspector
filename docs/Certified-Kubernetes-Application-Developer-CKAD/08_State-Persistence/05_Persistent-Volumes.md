# Persistent Volumes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/State-Persistence/Persistent-Volumes)

---

## Table of Contents

- Persistent Volumes
  - Creating a Persistent Volume
  - Using a Cloud Storage Backend
  - Conclusion
  - Watch Video

---

## Content

Certified Kubernetes Application Developer - CKAD

State Persistence

# Persistent Volumes

Welcome to this comprehensive guide on Persistent Volumes. My name is Mumshad Mannambeth, and in this article, we walk through the concept and practical implementation of persistent volumes in Kubernetes.

In previous discussions, we explored the concept of volumes where storage was configured directly within a pod definition file. For example:

```
volumes:
- name: data-volume
  awsElasticBlockStore:
    volumeID: <volume-id>
    fsType: ext4
```

In larger environments with numerous users and multiple pod deployments, manually configuring storage for each pod becomes both tedious and error-prone. Every time a storage configuration change is required, it would need to be updated on every pod individually. Persistent volumes solve this problem by centralizing storage management. Administrators can create a large pool of storage, and users can request specific portions from that pool using Persistent Volume Claims (PVCs).

![The image illustrates the concept of Persistent Volumes (PVs) and Persistent Volume Claims (PVCs) in Kubernetes, showing their relationship and allocation process.](https://kodekloud.com/kk-media/image/upload/v1752871317/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Persistent-Volumes/frame_90.jpg)

Users select the storage they need from this pool by using Persistent Volume Claims, simplifying the management and scalability of storage in Kubernetes environments.

## Creating a Persistent Volume

To get started, let’s create a Persistent Volume using a base template. The following example demonstrates updating the API version, setting the kind to PersistentVolume, and giving it a name (here, PV-01). Under the `spec` section, the access modes—which define how a volume is to be mounted (e.g., read-only or read-write)—are specified. Kubernetes offers several modes such as `ReadOnlyMany`, `ReadWriteOnce`, and `ReadWriteMany`. Additionally, you define the capacity to reserve the necessary storage, set to 1Gi in this example. Initially, we use the `hostPath` option to utilize storage from the node's local directory.

> [!important]
> **Warning**
>
> Using `hostPath` is intended for demonstration or testing purposes only and is not recommended for production environments.

```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-voll
spec:
  accessModes:
    - ReadWriteOnce
  capacity:
    storage: 1Gi
  hostPath:
    path: /tmp/d
```

To create the persistent volume, run the following command:

```
kubectl create -f pv-definition.yaml
```

After creation, list the persistent volumes with:

```
kubectl get persistentvolume
```

The expected output should appear similar to:

```
NAME      CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS       CLAIM   STORAGECLASS   REASON   AGE
pv-voll   1Gi       RWO            Retain            Available                             3m
```

## Using a Cloud Storage Backend

For production environments, it is advisable to use a cloud storage backend rather than `hostPath`. For instance, you can configure AWS Elastic Block Store as illustrated below, where you specify both the `volumeID` and the `fsType`:

```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-voll
spec:
  accessModes:
    - ReadWriteOnce
  capacity:
    storage: 1Gi
  awsElasticBlockStore:
    volumeID: <volume-id>
    fsType: ext4
```

Apply the updated configuration with:

```
kubectl create -f pv-definition.yaml
```

Then verify its status using:

```
kubectl get persistentvolume
```

You should see an output similar to:

```
NAME      CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS      CLAIM   STORAGECLASS   REASON   AGE
pv-voll   1Gi        RWO            Retain            Available           <none>                 3m
```

## Conclusion

This article provided an overview of how persistent volumes in Kubernetes simplify storage management by centralizing configuration. In the next section, we will delve into Persistent Volume Claims and explore how they seamlessly allocate storage from the available persistent volumes.

For more information, explore the following resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [AWS Elastic Block Store](https://aws.amazon.com/ebs/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/cb16c9a3-1608-48cf-bfd5-2465f64b4f93/lesson/b016d3ab-0f1f-47ef-8b87-6e1302f90fd8)**
>
> Watch video content
