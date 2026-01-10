# Persistent Storage Static vs Dynamic Provisioning StorageClasses - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenShift-4/Storage-Templates-and-Catalog/Persistent-Storage-Static-vs-Dynamic-Provisioning-StorageClasses)

---

## Table of Contents

- Persistent Storage Static vs Dynamic Provisioning StorageClasses
  - Creating a Storage Class
  - Creating a Persistent Volume Claim
  - Watch Video

---

## Content

OpenShift 4

Storage Templates and Catalog

# Persistent Storage Static vs Dynamic Provisioning StorageClasses

Before starting the demonstration, review the relevant OpenShift 4.8 documentation under the Dynamic Provisioning section. Scroll down to find a dedicated section for available dynamic provisioning plugins, commonly referred to as Container Storage Interfaces (CSIs).

OpenShift supports several dynamic provisioning options, including:

- Kubernetes Cinder
- A plugin for OpenStack (for environments using OpenShift with OpenStack)
- AWS Elastic Block Storage
- Azure Disk and Azure File
- Google’s Persistent Disk
- vSphere

This broad range of options allows you to integrate storage from VMware, Azure, AWS, GCP, and other environments.

Proceed to the OpenShift console to create your Storage Class.

## Creating a Storage Class

1.  In the OpenShift console, navigate to **Storage** and click on **Storage Classes**.
2.  If an existing storage class is present, delete it to start with a clean slate.
3.  Click the blue **Create Storage Class** button.

Enter the following details:

- **Name:** local Storage Class
- **Description:** Storage class for local host
- **Reclaim Policy:** Select an option to either retain or delete the data when the Persistent Volume (PV) is removed. For this demo, choose **delete**.
- **Volume Binding Mode:** Choose one of the following options:
  - **Immediate:** Binds the volume as soon as the claim is created.
  - **Wait for first consumer:** Delays binding until a pod is scheduled to a node with available storage. This is recommended for ensuring the volume is provisioned on a node that meets resource requirements.

Next, choose the appropriate provisioner. For this demonstration, select **no provisioner** from the list of available options such as AWS, GCP, Cinder, and Azure.

Click **Create** to finalize your Storage Class.

![The image shows a Red Hat OpenShift console interface where a user is configuring a storage class, including setting a reclaim policy.](https://kodekloud.com/kk-media/image/upload/v1752882799/notes-assets/images/OpenShift-4-Persistent-Storage-Static-vs-Dynamic-Provisioning-StorageClasses/openshift-console-storage-class-configuration.jpg)

Once the Storage Class is created, you can view its YAML definition. To verify it via the terminal, run:

```
oc get storageclass
```

This command displays the current Storage Classes, including the one you just set up.

![The image shows a Red Hat OpenShift console displaying details of a storage class named "localstorageclass," including its reclaim policy, default class status, and volume binding mode.](https://kodekloud.com/kk-media/image/upload/v1752882800/notes-assets/images/OpenShift-4-Persistent-Storage-Static-vs-Dynamic-Provisioning-StorageClasses/openshift-console-localstorageclass-details.jpg)

## Creating a Persistent Volume Claim

To utilize your newly created Storage Class, create a Persistent Volume Claim (PVC) by following these steps:

1.  Navigate to **Persistent Volume Claims** in the OpenShift console.
2.  Click the blue **Create Persistent Volume Claim** button.
3.  From the Storage Class dropdown list, select `local Storage Class`.
4.  Provide a name for your claim (e.g., **local Storage Class Claim**).
5.  Set the access mode to **ReadWriteOnce** for single user access.
6.  Specify the claim size; for this demo, enter **10 GiB**.
7.  Keep the volume mode as **File System** unless block storage is required.
8.  Click **Create** to complete the process.

![The image shows a Red Hat OpenShift interface for creating a PersistentVolumeClaim, with options for setting the name, access mode, size, and volume mode.](https://kodekloud.com/kk-media/image/upload/v1752882802/notes-assets/images/OpenShift-4-Persistent-Storage-Static-vs-Dynamic-Provisioning-StorageClasses/openshift-persistentvolumeclaim-interface.jpg)

After completing the steps, your Storage Class and PVC will be ready. The behavior of the PVC may vary depending on your OpenShift installation. For example, if you are running OpenShift on Azure, configure the PVC to point to Azure storage. The same applies to AWS or other cloud providers.

![The image shows a Red Hat OpenShift console displaying details of a PersistentVolumeClaim named "localstorageclass-claim," which is currently in a pending status. The requested capacity is 10 GiB, and the volume mode is set to filesystem.](https://kodekloud.com/kk-media/image/upload/v1752882803/notes-assets/images/OpenShift-4-Persistent-Storage-Static-vs-Dynamic-Provisioning-StorageClasses/openshift-persistentvolumeclaim-pending.jpg)

> [!important]
> **Note**
>
> Remember to adjust configurations based on your specific environment and storage requirements.

This article detailed the process for creating a Storage Class and a Persistent Volume Claim in OpenShift, providing a step-by-step guide to ensure proper configuration for both static and dynamic storage provisioning. For more detailed information on storage configuration in OpenShift, consult the [OpenShift Documentation](https://docs.openshift.com/container-platform/4.8/storage/index.html).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/openshift-4/module/b7e60e62-0f83-422c-8fca-6c9bb3cf4862/lesson/781f2132-bbce-4251-a3f4-15199e74b515)**
>
> Watch video content
