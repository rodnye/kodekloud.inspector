# Plan workload deployment to GKE - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GKE-Google-Kubernetes-Engine/Plan-Deploy-And-Manage-Workloads-On-GKE/Plan-workload-deployment-to-GKE)

---

## Table of Contents

- Plan workload deployment to GKE
  - Stateless Applications
  - Stateful Applications
  - Batch Jobs
  - Daemons
  - Imperative vs. Declarative Management
  - References
  - Watch Video

---

## Content

GKE - Google Kubernetes Engine

Plan Deploy And Manage Workloads On GKE

# Plan workload deployment to GKE

In this lesson, you’ll learn how to plan workload deployment and manage resources on a Google Kubernetes Engine (GKE) cluster. We’ll cover the four primary workload types—stateless, stateful, batch, and daemons—and compare imperative versus declarative management approaches.

| Workload Type | Use Case                               | Kubernetes Object |
| ------------- | -------------------------------------- | ----------------- |
| Stateless     | Web front-ends, application servers    | Deployment        |
| Stateful      | Databases, distributed coordination    | StatefulSet       |
| Batch Jobs    | Data processing, notification emails   | Job               |
| Daemons       | Logging, monitoring, background agents | DaemonSet         |

To deploy and manage containerized applications on GKE, you define controller objects in YAML files and apply them with `kubectl` or via the Kubernetes API.

![The image is an overview diagram of workload deployment on Google Kubernetes Engine (GKE), showing components like YAML configuration, Kubernetes API, and kubectl.](https://kodekloud.com/kk-media/image/upload/v1752875728/notes-assets/images/GKE-Google-Kubernetes-Engine-Plan-workload-deployment-to-GKE/gke-workload-deployment-overview-diagram.jpg)

GKE supports several workload types, including stateless applications, stateful applications, batch jobs, and daemons.

![The image is an overview diagram of workload deployment on Google Kubernetes Engine (GKE), showing different types of applications such as stateless, stateful, batch jobs, and daemons.](https://kodekloud.com/kk-media/image/upload/v1752875729/notes-assets/images/GKE-Google-Kubernetes-Engine-Plan-workload-deployment-to-GKE/gke-workload-deployment-overview-diagram-2.jpg)

## Stateless Applications

Stateless applications do not persist data internally; all session state is managed by clients or external services. They’re ideal for horizontal scaling and rolling updates.

- Examples:
  - NGINX
  - Apache Tomcat
  - Other web servers
- Primary object: **Deployment**

Pods under a Deployment are interchangeable and ephemeral, allowing you to scale out or update without data loss.

![The image illustrates the concept of stateless applications, featuring icons for NGINX and Apache Tomcat as examples.](https://kodekloud.com/kk-media/image/upload/v1752875729/notes-assets/images/GKE-Google-Kubernetes-Engine-Plan-workload-deployment-to-GKE/stateless-applications-nginx-apache-icons.jpg)

## Stateful Applications

Stateful applications require persistent storage to retain data across restarts and replicas. Use PersistentVolumes and PersistentVolumeClaims for durable storage.

- Examples:
  - MongoDB
  - Apache ZooKeeper
- Primary object: **StatefulSet**

StatefulSet pods maintain unique network identities and stable storage. Updates and scaling follow a strict, ordered process.

> [!important]
> **Note**
>
> StatefulSet guarantees that each pod is assigned the same name and storage on every restart, ensuring data consistency.

![The image illustrates the concept of stateful applications, showing a connection between a stateful application and persistent storage.](https://kodekloud.com/kk-media/image/upload/v1752875730/notes-assets/images/GKE-Google-Kubernetes-Engine-Plan-workload-deployment-to-GKE/stateful-applications-persistent-storage-connection.jpg)

![The image illustrates the concept of stateful applications, featuring MongoDB and Apache Zookeeper as examples.](https://kodekloud.com/kk-media/image/upload/v1752875731/notes-assets/images/GKE-Google-Kubernetes-Engine-Plan-workload-deployment-to-GKE/stateful-applications-mongodb-zookeeper.jpg)

## Batch Jobs

Batch jobs run to completion and are well suited for parallel, finite tasks.

- Examples:
  - Sending notification emails
  - Video rendering
  - Complex numerical computations
- Primary object: **Job**

A Job runs Pods until they succeed, with controls for total completions and maximum parallelism.

![The image is a diagram about batch jobs, highlighting their characteristics as finite, independent, and parallel, with examples like sending emails, rendering video, and performing complex computations.](https://kodekloud.com/kk-media/image/upload/v1752875732/notes-assets/images/GKE-Google-Kubernetes-Engine-Plan-workload-deployment-to-GKE/batch-jobs-characteristics-diagram.jpg)

## Daemons

Daemon workloads run continuously on selected nodes to provide cluster-wide services.

- Examples:
  - Fluentd (log collection)
  - Monitoring agents
- Primary object: **DaemonSet**

A DaemonSet ensures one Pod per node (or per label selector), making it perfect for node-level background tasks.

---

## Imperative vs. Declarative Management

GKE offers both imperative and declarative methods for managing workload objects:

- **Imperative Commands**  
  Use one-off `kubectl run`, `kubectl create`, or `kubectl delete` commands for quick changes and immediate feedback.
- **Declarative Object Configuration**  
  Store complete resource definitions in YAML and apply them with `kubectl apply`. Keep these files in version control for an audit trail.
- **Directory-Based Declarative Configuration**  
  Organize YAML files in directories and run `kubectl apply --recursive` to apply updates across many resources. This scales well for large projects.

![The image is a diagram titled "Managing Workload Objects," showing three categories: Imperative Commands, Imperative Object Configuration, and Declarative Object Configuration, each represented by a gear icon.](https://kodekloud.com/kk-media/image/upload/v1752875733/notes-assets/images/GKE-Google-Kubernetes-Engine-Plan-workload-deployment-to-GKE/managing-workload-objects-diagram.jpg)

## References

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [GKE Documentation](https://cloud.google.com/kubernetes-engine/docs)
- [kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gke-google-kubernetes-engine/module/12020a5d-e2fd-46b5-82fb-35aa9cd57ad6/lesson/975c80d1-a4da-4573-965d-a12b8fd6b62b)**
>
> Watch video content
