# Persistent Volumes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Storage/Persistent-Volumes)

---

## Table of Contents

- Persistent Volumes
  - Creating a Persistent Volume
  - Watch Video

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Storage

# Persistent Volumes

Hello and welcome to this lesson on persistent volumes. I'm Mumshad Mannambeth, and in this session, we'll explore how to centralize storage management in Kubernetes using persistent volumes.

Previously, we discussed how volumes are defined within pod manifest files, where the storage settings are directly included in each pod definition. For example, a typical pod configuration with a volume might look like:

```
volumes:
- name: data-volume
  awsElasticBlockStore:
    volumeID: <volume-id>
    fsType: ext4
```

In environments where many users deploy multiple pods, duplicating storage configuration in every pod file can lead to redundancy and increased maintenance efforts. Any required change would need to be propagated across all pod definitions.

To solve this issue, administrators can create a centralized pool of storage. Users then request portions of this storage as needed by creating persistent volume claims (PVCs). This concept is enabled by persistent volumes (PVs).

A persistent volume is a cluster-wide storage resource defined and managed by an administrator. Applications running on the cluster utilize these PVs by binding to them via persistent volume claims.

![The image illustrates the relationship between Persistent Volume Claims (PVCs) and Persistent Volumes (PVs) in a Kubernetes environment.](https://kodekloud.com/kk-media/image/upload/v1752869988/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Persistent-Volumes/frame_90.jpg)

## Creating a Persistent Volume

In this section, we will create a persistent volume using a base template. First, update the API version, set the kind to PersistentVolume, and give it a name (for example, "pv-vol1"). Under the spec section, it's necessary to define the access modes. The access modes determine how a volume can be mounted on nodes, such as:

- ReadWriteOnce: The volume can be mounted as read-write by a single node.
- ReadOnlyMany: The volume can be mounted as read-only by multiple nodes.
- ReadWriteMany: The volume can be mounted as read-write by multiple nodes.

Below is an initial portion of the configuration that defines the persistent volume along with its access mode:

```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-vol1
spec:
  accessModes:
    - ReadWriteOnce
```

Next, specify the storage capacity for this persistent volume. In our example, we set the capacity to 1Gi. After defining the capacity, choose the volume type. Here, we use the hostPath option, which leverages storage from the node's local directory.

> [!important]
> **Note**
>
> The hostPath option is primarily for testing or single-node setups and is not recommended for production environments.

The complete persistent volume manifest appears as follows:

```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-vol1
spec:
  accessModes:
    - ReadWriteOnce
  capacity:
    storage: 1Gi
  hostPath:
    path: /tmp/data
```

To create the persistent volume, execute the following command:

```
kubectl create -f pv-d
```

After creating the volume, you can verify its status by running:

```
kubectl get persistentvolume
```

In a production setup, replace the hostPath option with a supported storage solution, such as AWS Elastic Block Store, to ensure data durability and scalability.

This concludes our discussion on persistent volumes. Up next, we will explore persistent volume claims (PVCs) to see how you can request storage from the centralized persistent volume pool.

For further reading, check out these helpful resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [AWS Elastic Block Store](https://aws.amazon.com/ebs/)
- [Docker Hub](https://hub.docker.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/883f0aa9-3aa9-45a6-bd26-3a87ded1e00e/lesson/361e35e6-8b34-489b-a839-f094545ba32e)**
>
> Watch video content
