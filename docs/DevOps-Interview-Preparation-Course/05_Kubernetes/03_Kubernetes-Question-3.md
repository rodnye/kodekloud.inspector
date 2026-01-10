# Kubernetes Question 3 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Interview-Preparation-Course/Kubernetes/Kubernetes-Question-3)

---

## Table of Contents

- Kubernetes Question 3
  - Understanding Persistent Volumes (PV) and Persistent Volume Claims (PVC) in Kubernetes
  - Detailed Explanation of PV and PVC
  - Real-World Analogy: The Flight Booking Process
  - How to Answer the Interview Question
  - Summary Table
  - Watch Video

---

## Content

DevOps Interview Preparation Course

Kubernetes

# Kubernetes Question 3

## Understanding Persistent Volumes (PV) and Persistent Volume Claims (PVC) in Kubernetes

In Kubernetes, storage management is primarily addressed through two crucial resources: Persistent Volumes (PV) and Persistent Volume Claims (PVC). These components are not only essential for managing storage in day-to-day operations but are also common topics in technical interviews.

When working with Kubernetes, you might encounter scenarios where applications need persistent storage—for example, to store logs, databases, or user-uploaded content. Instead of directly accessing raw storage devices, pods utilize PVCs to request storage, which then binds to a PV that meets the requirements.

---

## Detailed Explanation of PV and PVC

A **Persistent Volume (PV)** is a piece of pre-provisioned storage in the cluster, typically managed by an administrator. It abstracts and encapsulates the underlying storage technology, whether it’s an NFS share, Amazon EBS, or another storage solution.

On the other hand, a **Persistent Volume Claim (PVC)** is a request made by a pod for storage. A PVC specifies storage requirements such as size and access modes. Once the PVC is created, Kubernetes dynamically matches it with an appropriate PV that satisfies those requirements.

![The image is a diagram illustrating the relationship between a Pod, PersistentVolumeClaim (PVC), PersistentVolume (PV), and a storage volume (e.g., NFS, EBS) in a Kubernetes environment. It shows the flow from a Pod to a PVC, then to a PV, and finally to a storage volume.](https://kodekloud.com/kk-media/image/upload/v1752873376/notes-assets/images/DevOps-Interview-Preparation-Course-Kubernetes-Question-3/kubernetes-pod-pvc-pv-storage-diagram.jpg)

The diagram illustrates the flow as follows:

1.  **Pod:** The running application needs persistent storage.
2.  **PVC (Persistent Volume Claim):** The pod creates a PVC specifying the required storage size and type (e.g., SSD, NFS).
3.  **PV (Persistent Volume):** The PVC binds to a suitable PV that meets the specified conditions, providing the necessary storage to the pod.

> [!important]
> **Note**
>
> Remember, a PV can exist in the cluster independently of any pod. It waits until a matching PVC is created to become in use.

---

## Real-World Analogy: The Flight Booking Process

To simplify the concept, imagine the process of booking a flight:

1.  **Searching for a Flight:** You search for a flight that fits your schedule on a travel website.
2.  **Ticket Booking:** After finding the right flight, you book a ticket. However, just having a ticket isn’t enough to board the plane.
3.  **Obtaining a Boarding Pass:** At the airport, you use your ticket to get a boarding pass. This pass is what ultimately allows you to board the airplane.

In the context of Kubernetes:

- The **PVC** acts like the ticket, detailing the storage requirements.
- The **PV** performs a role similar to the boarding pass, providing the actual storage needed by the pod.

Both elements work together; having a PVC without a corresponding PV, or vice versa, will not complete the storage provisioning process.

---

## How to Answer the Interview Question

When asked about PV and PVC in an interview, you can structure your answer as follows:

- **PV (Persistent Volume):** This is a cluster resource representing storage that is provisioned by an administrator. It abstracts the details of the underlying storage medium.
- **PVC (Persistent Volume Claim):** This is a declaration made by a pod to request a certain amount of storage with specific attributes (like size and access mode). The PVC, once created, binds to an appropriate PV that meets these requirements.

In practical deployments, you include the PVC in the pod's deployment YAML file, enabling Kubernetes to automatically find and attach the matching PV. This dynamic binding ensures that the pod always has access to the correct storage resource when it starts up.

> [!important]
> **Interview Tip**
>
> Always emphasize the dynamic nature of PV-PVC binding. Clarify that while a PV exists independently, it is the PVC that activates it for a pod. This distinction is crucial in demonstrating a clear understanding of Kubernetes storage management.

---

## Summary Table

| Component | Role in Kubernetes                                            | Key Point                                                  |
| --------- | ------------------------------------------------------------- | ---------------------------------------------------------- |
| PV        | Pre-provisioned storage resource managed at the cluster level | Provides abstraction for underlying storage systems        |
| PVC       | A request from a pod for storage with specified requirements  | Binds to an available PV that meets the requested criteria |

---

Understanding how Persistent Volumes and Persistent Volume Claims interact is key to mastering storage in Kubernetes. For more detailed information, consider exploring the [Kubernetes Documentation](https://kubernetes.io/docs/) and other related resources.

By grasping these concepts, you'll be well-prepared to tackle related interview questions and manage persistent storage efficiently in your Kubernetes deployments.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-interview-preparation-course/module/9c606af3-d2d0-4d2c-9ef5-dc99d8409b6c/lesson/3290d322-b151-4d72-bcaa-9e1bf2a8be45)**
>
> Watch video content
