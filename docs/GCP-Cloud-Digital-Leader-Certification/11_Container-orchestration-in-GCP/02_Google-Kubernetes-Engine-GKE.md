# Google Kubernetes Engine GKE - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-Cloud-Digital-Leader-Certification/Container-orchestration-in-GCP/Google-Kubernetes-Engine-GKE)

---

## Table of Contents

- Google Kubernetes Engine GKE
  - GKE Architecture Overview
  - Key Takeaways
  - Watch Video

---

## Content

GCP Cloud Digital Leader Certification

Container orchestration in GCP

# Google Kubernetes Engine GKE

Hello and welcome back!

In our previous lesson, we explored the rising popularity of containerization and its adoption by organizations worldwide. Today, we'll dive into Google Kubernetes Engine (GKE) and understand how it streamlines containerized application deployment and management.

Google Cloud Platform (GCP) offers GKE, a managed service built on Kubernetes—an open-source container orchestration system. Kubernetes automates the deployment, scaling, and management of containerized applications. While Kubernetes gives you the core functionality to deploy scalable services, GKE enhances it with a fully managed environment. Notably, Google is one of the original contributors to the Kubernetes project, ensuring tight integration and continuous innovation.

> [!important]
> **GKE Modes of Operation**
>
> GKE supports two primary modes:
>
> - **Autopilot Mode**: Ideal for developers who want to focus solely on deploying applications. Google manages underlying tasks like scaling, updates, patches, and bug fixes.
> - **Standard Mode**: Offers full control over the Kubernetes cluster for those who wish to customize configurations to meet specific requirements.

For straightforward applications, Autopilot mode often proves more efficient. Its seamless integration with other GCP services makes GKE a favorite among developers, especially when migrating on-premises systems to the cloud.

![The image is an infographic about Google Kubernetes Engine (GKE), highlighting it as an automated and scalable managed Kubernetes platform with features like easy integration with load balancers and being a developer favorite for modern data applications. It also mentions GKE's Autopilot and Standard modes.](https://kodekloud.com/kk-media/image/upload/v1752875215/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Google-Kubernetes-Engine-GKE/gke-infographic-automated-scalable.jpg)

## GKE Architecture Overview

Understanding the architecture of GKE is essential for leveraging its full potential. Within a GKE cluster, the smallest deployable unit is called a pod. A pod contains one or more containers that execute your application processes.

When configured in Autopilot mode, GKE automatically handles key cluster management tasks—such as scaling, updates, minor upgrades, patches, and bug fixes. This automation ensures that as your application scales, the system seamlessly adapts by managing additional pods and containers without manual intervention.

![The image is a diagram illustrating Google Cloud's Kubernetes Service (GKE) with components like mobile, cloud load balancing, and Cloud SQL, highlighting the "autopilot" feature for managing, scaling, and maintaining pods.](https://kodekloud.com/kk-media/image/upload/v1752875215/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Google-Kubernetes-Engine-GKE/gke-autopilot-diagram-cloud-components.jpg)

## Key Takeaways

- GKE is a managed Kubernetes service on Google Cloud Platform that simplifies containerized application deployment.
- **Autopilot mode** automates cluster management, making it ideal for rapid deployment with minimal operational overhead.
- **Standard mode** provides users with granular control over their Kubernetes clusters for custom configurations.
- GKE's tight integration with other GCP services and Kubernetes' inherent scalability make it a top choice for modern cloud-native applications.

> [!important]
> **Summary**
>
> In summary, Google Kubernetes Engine provides a robust, automated platform for container orchestration. Whether using Autopilot for ease of management or Standard mode for granular control, GKE leverages Kubernetes to meet diverse deployment needs.

That concludes this lesson on Google Kubernetes Engine. Thank you for reading, and see you in the next article!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-cloud-digital-leader-certification/module/d639dd79-213a-4d3c-928f-7e6392a95b3c/lesson/62911947-b7fe-4a8d-bf0d-239f477b7355)**
>
> Watch video content
