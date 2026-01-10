# Section Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/kubernetes-for-the-absolute-beginners-hands-on-tutorial/Kubernetes-on-the-Cloud/Section-Introduction)

---

## Table of Contents

- Section Introduction
  - Watch Video

---

## Content

Kubernetes for the Absolute Beginners - Hands-on Tutorial

Kubernetes on the Cloud

# Section Introduction

In this lesson, we explore various options for deploying a Kubernetes cluster in the cloud, with a focus on getting started quickly using popular platforms such as Google Cloud, AWS, and Azure.

![The image illustrates "Kubernetes on the Cloud" with logos of Google Cloud Platform, Amazon Web Services, and Microsoft Azure.](https://kodekloud.com/kk-media/image/upload/v1752884949/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Section-Introduction/frame_10.jpg)

For production environments, deploying a Kubernetes cluster typically falls into one of two categories:

1.  **Self-hosted (Turnkey) Solutions**  
    With turnkey solutions, you provision the necessary virtual machines and use automation tools or scripts to set up your Kubernetes cluster. Although tools like Kops or KubeOne (for AWS, for example) streamline cluster provisioning, you still maintain responsibility for patching, upgrading, and overall VM management. The [CKA Certification Course - Certified Kubernetes Administrator](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator) provides detailed instructions on setting up clusters using tools such as Kubeadm.
2.  **Hosted (Managed) Solutions**  
    Managed solutions deliver Kubernetes as a service. Here, the cloud provider is responsible for deploying the virtual machines, configuring the Kubernetes cluster, and handling maintenance tasks such as upgrades and patches. A great example is the Google Kubernetes Engine (GKE), which allows you to provision a cluster in minutes with just a few clicks—eliminating the need for manual infrastructure configuration. With managed solutions, access to master nodes or underlying VMs is typically restricted.

![The image compares self-hosted and hosted solutions for Kubernetes, detailing responsibilities like VM provisioning and maintenance, with examples like AWS and Google Container Engine.](https://kodekloud.com/kk-media/image/upload/v1752884951/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Section-Introduction/frame_90.jpg)

In this lesson, we focus on deploying our example voting application using three major managed Kubernetes environments:

- Google Kubernetes Engine on Google Cloud
- Azure Kubernetes Service (AKS)
- AWS Elastic Kubernetes Service (EKS)

![The image lists hosted Kubernetes solutions: Google Kubernetes Engine (GKE), Azure Kubernetes Service (AKS), and Amazon Elastic Kubernetes Service (EKS).](https://kodekloud.com/kk-media/image/upload/v1752884951/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Section-Introduction/frame_150.jpg)

> [!important]
> **Note**
>
> This lesson is designed as a beginner's guide. While it demonstrates the simplest method to provision and deploy a managed Kubernetes cluster, many concepts overlap across different platforms.

By following the deployment and service definition files provided, you will learn how to create a consistent Kubernetes cluster across these environments. Most Kubernetes concepts remain consistent regardless of the platform, making this guide a valuable starting point. For those looking to deploy production-grade Kubernetes clusters, we recommend further learning through courses like the [CKA Certification Course - Certified Kubernetes Administrator](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator) and the [Certified Kubernetes Application Developer (CKAD) Mock Exam Series](https://learn.kodekloud.com/user/courses/ultimate-certified-kubernetes-application-developer-ckad-mock-exam-series).

> [!important]
> **Warning**
>
> This guide is intended for educational purposes only. Before deploying production environments, ensure you have a comprehensive understanding of Kubernetes and the necessary operational best practices.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-for-the-absolute-beginners-hands-on-tutorial/module/2f291cbc-acc2-4250-b96c-2094daff556d/lesson/745d1abb-7d98-4e96-a7cf-f983a954d1e6)**
>
> Watch video content
