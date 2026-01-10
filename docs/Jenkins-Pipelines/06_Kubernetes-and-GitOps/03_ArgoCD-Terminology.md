# ArgoCD Terminology - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Pipelines/Kubernetes-and-GitOps/ArgoCD-Terminology)

---

## Table of Contents

- ArgoCD Terminology
  - Watch Video

---

## Content

Jenkins Pipelines

Kubernetes and GitOps

# ArgoCD Terminology

Before exploring the ArgoCD architecture, it's crucial to understand the key concepts and terminology that underpin ArgoCD. Familiarity with Git, Docker, Kubernetes, CI/CD, and GitOps will help you maximize the efficiency of your ArgoCD workflows.

In this guide, we introduce the core terminology specific to ArgoCD:

- **ArgoCD Application:**  
  An ArgoCD application is a custom resource definition created during ArgoCD installation. It specifies both the source (for example, a Git repository) and the destination (such as a Kubernetes cluster) for your Kubernetes resources.
- **Application Source Type:**  
  This term refers to the tool or method used to build the application. Common examples include Helm and Kustomize.
- **ArgoCD Project:**  
  An ArgoCD project acts as a logical grouping for applications. This grouping simplifies management when multiple teams are working with ArgoCD, enabling clear separation and control.
- **Target State:**  
  The target state is the desired configuration of an application manifest stored in a Git repository. This serves as the blueprint for what the deployed application should look like.
- **Live State:**  
  Live state denotes the current operational state of application resources (such as pods, secrets, and config maps) deployed in the Kubernetes cluster.
- **Sync Operation:**  
  A sync operation is triggered when an ArgoCD application is created. During this process, ArgoCD reconciles the live state in the cluster with the target state defined in Git, ensuring the deployed resources match the desired configuration.
- **Sync Status:**  
  The sync status provides an indication of whether the live state of the application is aligned with the target state in the Git repository.
- **Synchronized Operation Status:**  
  This status confirms whether a sync operation has been successfully completed, ensuring consistency between the live and target states.
- **Refresh Option:**  
  The refresh functionality compares the latest code in Git with the live state in the cluster. It detects differences and can either automatically initiate a sync or prompt an administrator to perform the synchronization manually.

> [!important]
> **Note**
>
> Understanding these concepts is essential for leveraging ArgoCD to streamline application deployment and management. Each term plays a crucial role in maintaining the desired state of your applications.

Below is a visual overview of the key ArgoCD concepts and terminology:

![The image provides a list of ArgoCD concepts and terminology, explaining terms like "Application," "Target state," "Sync status," and "Health" with brief definitions. It includes icons related to software development and deployment.](https://kodekloud.com/kk-media/image/upload/v1752879704/notes-assets/images/Jenkins-Pipelines-ArgoCD-Terminology/argocd-concepts-terminology-list.jpg)

ArgoCD further enhances application management by offering built-in health assessments for several standard Kubernetes resources. This functionality provides an overall health status for the entire application, helping you quickly identify and rectify any issues.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-pipelines/module/fb6b2c83-178c-4962-b4e6-ca5528721170/lesson/0affc50d-000b-4882-a541-d1efb215d1fa)**
>
> Watch video content
