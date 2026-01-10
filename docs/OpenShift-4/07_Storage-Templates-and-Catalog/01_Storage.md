# Storage - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenShift-4/Storage-Templates-and-Catalog/Storage)

---

## Table of Contents

- Storage
  - Watch Video

---

## Content

OpenShift 4

Storage Templates and Catalog

# Storage

Welcome to this in-depth article on storage management in OpenShift. Here, we explore how OpenShift uses Kubernetes’ Persistent Volume framework to ensure that data outlasts the lifecycle of transient Docker containers.

Docker containers are inherently transient, meaning that data stored inside them is lost once they are terminated. To preserve important data, OpenShift attaches a persistent volume at container creation, ensuring that processed data is stored permanently.

OpenShift provisions storage using the Kubernetes Persistent Volume (PV) framework and supports a wide range of plugins and platforms. Storage can be provisioned with plugins such as Local, iSCSI, Fibre Channel, and NFS, or through platforms like ClusterFS, Ceph RBD, OpenStack Cinder, AWS Elastic Block Store, Azure Disk, Azure File, and VMware vSphere.

![The image lists various storage plugins such as Local, iSCSI, and AWS Elastic Block Store, alongside a diagram showing Kubernetes with red blocks and database icons.](https://kodekloud.com/kk-media/image/upload/v1752882812/notes-assets/images/OpenShift-4-Storage/storage-plugins-kubernetes-diagram.jpg)

The available storage resources in the OpenShift cluster form a consolidated pool of persistent volume resources. Projects can claim parts of this pool by creating Persistent Volume Claims (PVCs), which are subsequently used by pods as their persistent storage.

To create storage, navigate to the OpenShift web console and click the **Create Storage** button.

![The image illustrates a Kubernetes storage concept, showing Persistent Volume Claims (PVC) of different sizes (10GB, 20GB, 100GB) being allocated from a total PV resource of 1TB.](https://kodekloud.com/kk-media/image/upload/v1752882812/notes-assets/images/OpenShift-4-Storage/kubernetes-storage-pvc-allocation-diagram.jpg)

Within the **Create Storage** interface, follow these steps:

1.  **Specify the Storage Claim Name**  
    Enter a unique name for your storage claim.
2.  **Select an Access Mode**  
    Choose from the following access modes:
    - **Single user mode:** The volume can be mounted as read-write by a single node only.
    - **Shared access mode:** The volume can be mounted by multiple nodes for read-write access.
    - **Read-only mode:** The volume can be mounted by multiple nodes, but only for read access.

3.  **Set the Required Size**  
    Define the storage capacity required for your persistent volume claim.

> [!important]
> **Note**
>
> Once the persistent volume claim is created, attach it to your pods by adding a volume reference in the deployment configuration.

![The image shows a "Create Storage" interface for setting up storage with options for name, access mode, and size. On the right, there's an illustration of three users accessing a shared database.](https://kodekloud.com/kk-media/image/upload/v1752882813/notes-assets/images/OpenShift-4-Storage/create-storage-interface-users-database.jpg)

This guide demonstrates the process of managing storage in an OpenShift cluster, from provisioning persistent volumes to claiming them within projects. By understanding these steps, you can effectively plan and implement persistent data storage in your containerized environments.

Happy provisioning!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/openshift-4/module/b7e60e62-0f83-422c-8fca-6c9bb3cf4862/lesson/e56c810c-1123-481d-a0be-70910e075c25)**
>
> Watch video content
