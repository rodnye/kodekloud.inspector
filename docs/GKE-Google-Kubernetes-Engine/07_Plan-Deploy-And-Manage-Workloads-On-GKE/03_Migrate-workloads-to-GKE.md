# Migrate workloads to GKE - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GKE-Google-Kubernetes-Engine/Plan-Deploy-And-Manage-Workloads-On-GKE/Migrate-workloads-to-GKE)

---

## Table of Contents

- Migrate workloads to GKE
  - Supported Source Environments
  - Fit Assessment Tool
  - Next Steps
  - Watch Video
    - Fit Assessment Categories

---

## Content

GKE - Google Kubernetes Engine

Plan Deploy And Manage Workloads On GKE

# Migrate workloads to GKE

In this guide, you’ll learn how **Migrate for Containers** streamlines the process of converting VM-based applications into containers and deploying them on Google Kubernetes Engine (GKE). By migrating workloads from virtual machines to GKE, you unlock the benefits of Google Cloud’s managed environment, automated scaling, and integrated networking.

## Supported Source Environments

Migrate for Containers can containerize both Linux and Windows VMs running on any of these platforms:

| Source Environment | Supported OS   |
| ------------------ | -------------- |
| VMware             | Linux, Windows |
| AWS                | Linux, Windows |
| Azure              | Linux, Windows |
| Google Cloud       | Linux, Windows |

![The image is an overview diagram illustrating the migration to containers from virtual machines, featuring Linux and Windows icons, and cloud service logos like VMware, AWS, Azure, and Google Cloud.](https://kodekloud.com/kk-media/image/upload/v1752875723/notes-assets/images/GKE-Google-Kubernetes-Engine-Migrate-workloads-to-GKE/container-migration-overview-diagram.jpg)

## Fit Assessment Tool

Before you begin containerization, evaluate each application’s readiness with the built-in **Fit Assessment tool** in Migrate for Containers. This tool scans your source VMs and generates a comprehensive report that:

- Assesses how well an application can run in a container vs. on Compute Engine
- Identifies technical obstacles or unsupported dependencies
- Suggests remediation steps for any issues found

![The image shows "The Fit Assessment Tool," featuring a scale with categories ranging from "Excellent Fit" to "No Fit," represented by circles connected with dotted lines.](https://kodekloud.com/kk-media/image/upload/v1752875724/notes-assets/images/GKE-Google-Kubernetes-Engine-Migrate-workloads-to-GKE/fit-assessment-tool-scale-categories.jpg)

### Fit Assessment Categories

| Fit Category  | What It Means                                       |
| ------------- | --------------------------------------------------- |
| Excellent Fit | Ready for containerization with no changes required |
| Good Fit      | Minor adjustments recommended before migration      |
| Fair Fit      | Moderate remediation or refactoring advised         |
| Poor Fit      | Complex dependencies; significant changes needed    |
| No Fit        | Not suitable for containerization at this time      |

> [!important]
> **Note**
>
> Review the assessment report thoroughly. Address any configuration tweaks or dependency updates before you proceed to containerize and deploy on GKE.

## Next Steps

1.  Remediate any issues identified by the Fit Assessment tool.
2.  Follow the [Migrate for Containers documentation](https://cloud.google.com/migrate/containers/docs) to containerize your VM workloads.
3.  Deploy your new containers to GKE using the [GKE documentation](https://cloud.google.com/kubernetes-engine/docs).

By completing these steps, you’ll have your VM-based applications running reliably on Google Kubernetes Engine, taking full advantage of Google Cloud’s managed services and scalability.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gke-google-kubernetes-engine/module/12020a5d-e2fd-46b5-82fb-35aa9cd57ad6/lesson/88d26274-e530-4f0e-9f1d-50d812af4ba0)**
>
> Watch video content
