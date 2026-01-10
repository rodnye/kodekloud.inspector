# Sumary Understanding compute Persistant disk and firewall - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-Cloud-Digital-Leader-Certification/GCP-Compute-Part-1/Sumary-Understanding-compute-Persistant-disk-and-firewall)

---

## Table of Contents

- Sumary Understanding compute Persistant disk and firewall
  - Compute Engine
  - Persistent Disk
  - VPC Firewall Rules
  - Additional Compute Options
  - Watch Video

---

## Content

GCP Cloud Digital Leader Certification

GCP Compute Part 1

# Sumary Understanding compute Persistant disk and firewall

Hello and welcome! In this lesson, we summarize the key concepts related to compute, persistent disk, and firewall components, emphasizing points that are especially relevant for certification. You may pause at any time to review these highlights before continuing to explore the details below.

## Compute Engine

Compute Engine is our virtual machine (VM) solution where your applications run. It offers a selection of machine types to suit various workloads:

| Machine Type      | Description                                             |
| ----------------- | ------------------------------------------------------- |
| General Purpose   | Balanced performance for diverse tasks                  |
| Memory Optimized  | Enhanced memory for intensive applications              |
| Compute Optimized | Superior processing for compute-heavy tasks             |
| GPU Optimized     | Specialized for graphics and machine learning workloads |

One of the key advantages of Compute Engine is its per-second billing model, making it cost-effective for dynamic cloud deployments. In addition, you can choose from a range of operating systems, or even deploy your own custom image based on your specific requirements.

## Persistent Disk

Persistent Disk provides durable network storage essential for the efficient operation of Compute Engine instances. It is used to host the application code and necessary software components. You can easily attach a persistent disk to any VM instance, and it offers the flexibility to scale storage size as needed.

> [!important]
> **Note**
>
> Persistent Disks are designed for high availability and durability, making them ideal for critical workloads.

## VPC Firewall Rules

To securely access your Compute Engine instances—whether you're connecting via SSH or serving a deployed web application—it's crucial to configure VPC firewall rules. These rules control incoming and outgoing network traffic based on protocols, ports, and IP ranges, effectively acting as your security guardian.

![The image is a summary from a whiteboard architectural discussion, describing "Persistent Disk" as durable network storage and "VPC Firewall Rules" for managing connections to virtual machine instances.](https://kodekloud.com/kk-media/image/upload/v1752875245/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Sumary-Understanding-compute-Persistant-disk-and-firewall/persistent-disk-vpc-firewall-summary.jpg)

## Additional Compute Options

Beyond Compute Engine, Google Cloud Platform offers other computing solutions for various needs:

- **Cloud Run** for fully managed containerized applications.
- **Cloud Functions** for event-driven serverless computing.
- **[Google Kubernetes Engine (GKE)](https://learn.kodekloud.com/user/courses/gke-google-kubernetes-engine)** for orchestrating containerized applications using Kubernetes.

These alternatives cater to different deployment models and will be discussed in more detail in upcoming lessons.

> [!important]
> **Warning**
>
> Ensure that you configure your VPC firewall rules correctly to avoid potential security risks. Always review and update rules as your network requirements change.

Thank you for reading this summary. We look forward to exploring more advanced topics in the next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-cloud-digital-leader-certification/module/015fc866-5579-442a-80f8-f4e795b70c33/lesson/7d661e96-58a3-4b58-9d92-534b9685b44a)**
>
> Watch video content
