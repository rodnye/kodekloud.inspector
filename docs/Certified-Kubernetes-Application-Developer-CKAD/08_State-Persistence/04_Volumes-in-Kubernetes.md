# Volumes in Kubernetes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/State-Persistence/Volumes-in-Kubernetes)

---

## Table of Contents

- Volumes in Kubernetes
  - Understanding Volumes
  - A Simple Example with a Single-Node Cluster
  - Storage Options for Volumes
  - Conclusion
  - Watch Video

---

## Content

Certified Kubernetes Application Developer - CKAD

State Persistence

# Volumes in Kubernetes

Hello, and welcome to this lesson on persistent volumes in Kubernetes. I’m Mumshad Mannambeth, and today we’ll explore key concepts from the [Certified Kubernetes Application Developer](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad) course.

## Understanding Volumes

Before diving into persistent volumes, let's revisit the concept of volumes, starting with Docker.

Docker containers are inherently ephemeral—they exist solely to process data and are removed once their task is done, taking with them any data stored exclusively inside the container. To ensure data persistence, a volume is attached when the container is created. The container writes data to the volume, and even if the container is removed later, the data remains intact.

Similarly, in Kubernetes, Pods are transient. When a Pod is created to process data and subsequently deleted, any data stored within it is lost unless it is saved externally. By attaching a volume to the Pod, you can ensure that the data written to the volume remains persistent even after the Pod is terminated.

## A Simple Example with a Single-Node Cluster

Consider a simple implementation where a Pod generates a random number between 1 and 100 and writes it to `/opt/number.out`. Note that without a persistent volume, deleting the Pod also removes the generated number.

```
apiVersion: v1
kind: Pod
metadata:
  name: random-number-generator
spec:
  containers:
    - image: alpine
      name: alpine
      command: ["/bin/sh","-c"]
      args: ["shuf -i 0-100 -n 1 >> /opt/number.out;"]
```

To retain the generated number, we attach a volume that leverages host storage. In this example, the host directory `/data` is used as the storage backend. When the volume is mounted inside the container at `/opt`, any file written there will be persisted on the host, even after the Pod is removed.

Below is the updated Pod specification with the volume properly configured:

```
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
      hostPath:
        path: /data
        type: Directory
```

In this configuration, the file `/opt/number.out` is stored on the host's `/data` directory. As a result, the data persists independently of the Pod’s lifecycle.

> [!important]
> **Important**
>
> Remember: Using the hostPath option is effective for single-node clusters, but it is not ideal for multi-node clusters, where consistent storage across nodes is required.

## Storage Options for Volumes

The previous example utilized the hostPath option, which directly uses a directory on the host for persistent storage. While this works well in a single-node implementation, multi-node clusters typically require a more robust solution because the same directory structure is not guaranteed across different nodes.

Kubernetes supports various storage solutions beyond hostPath, including network-based options like NFS, GlusterFS, and Flocker, as well as block storage types such as Fibre Channel, CephFS, and ScaleIO. Moreover, public cloud providers offer native persistent storage options, for example:

- [AWS Elastic Block Store (EBS)](https://aws.amazon.com/ebs/)
- [Azure Disk](https://azure.microsoft.com/services/storage/)
- [Google Persistent Disk](https://cloud.google.com/compute/docs/disks)

For instance, to configure an AWS EBS volume instead of using hostPath, the Pod specification is modified as follows:

```
volumes:
  - name: data-volume
    awsElasticBlockStore:
      volumeID: <volume-id>
      fsType: ext4
```

With this configuration, the Pod utilizes AWS EBS for persistent storage, enabling reliable data management through the cloud provider’s block storage services.

## Conclusion

This lesson reviewed how volumes in Kubernetes work and how to persist data using hostPath and other storage solutions. In the next segment, we will delve into persistent volumes and explore how Kubernetes manages long-term data persistence in various environments.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/cb16c9a3-1608-48cf-bfd5-2465f64b4f93/lesson/78c85f7f-b174-4722-aec2-8ba3c1158d09)**
>
> Watch video content
