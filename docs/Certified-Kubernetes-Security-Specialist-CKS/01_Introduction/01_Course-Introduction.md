# Course Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Introduction/Course-Introduction)

---

## Table of Contents

- Course Introduction
  - Course Structure and Key Topics
  - Hands-On Labs, Examples, and Exam Preparation
  - Watch Video
    - 1. Exploring the Kubernetes Attack Surface
    - 2. Hardening Your Kubernetes Cluster
    - 3. Securing the Underlying System
    - 4. Reducing Vulnerabilities in Microservices
    - 5. Securing the Software Supply Chain
    - 6. Runtime Security

---

## Content

Certified Kubernetes Security Specialist (CKS)

Introduction

# Course Introduction

Kubernetes has rapidly become a cornerstone of modern cloud computing, often hailed as the "Linux of the future." Today’s cutting-edge AI technologies, including ChatGPT and OpenAI, run on Kubernetes clusters. With the rapid growth in the AI industry, the demand for Kubernetes expertise is soaring. In fact, a recent survey by Indeed revealed that job searches for Kubernetes surged by over 173% compared to the previous year.

This article introduces the Certified Kubernetes Security Specialist (CKS) exam preparation course. My name is Mumshad Mannambeth and, together with Vijin Palazhi, we will be your guides throughout this course.

Kubernetes security is crucial since it manages containers distributed across multiple systems, making it an attractive target for attacks. By implementing robust security practices, you safeguard both your applications and operational integrity in dynamic cloud environments.

This course kicks off with engaging lectures that break down essential Kubernetes security concepts, supported by visual aids and animations:

![The image outlines Kubernetes security best practices, featuring elements like code, containers, authentication, and network policy, with a person in the bottom right corner.](https://kodekloud.com/kk-media/image/upload/v1752871624/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Course-Introduction/frame_60.jpg)

You will also gain hands-on experience through interactive labs, reinforcing your learning with real-life scenarios that simulate the actual CKS exam environment. Our AI assistants act as expert guides in the labs—tracking your progress, clarifying questions, and providing actionable feedback.

> [!important]
> **Pre-requisite**
>
> Before you dive into this course, please note that the CKS exam requires you to be a [Certified Kubernetes Administrator (CKA)](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator). If you haven't completed that course or need to strengthen your foundational skills, consider starting with our beginner courses such as [Kubernetes for the Absolute Beginners - Hands-on Tutorial](https://learn.kodekloud.com/user/courses/kubernetes-for-the-absolute-beginners-hands-on-tutorial), [Docker Training Course for the Absolute Beginner](https://learn.kodekloud.com/user/courses/docker-training-course-for-the-absolute-beginner), or [DevOps Pre-Requisite Course](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course).

## Course Structure and Key Topics

This course is meticulously structured to align with the CKS exam objectives, emphasizing both theoretical knowledge and practical security measures through real-world scenarios.

### 1\. Exploring the Kubernetes Attack Surface

We begin by examining how various components of Kubernetes clusters can be exploited. This section introduces the four C’s of cloud-native security: cloud, clusters, containers, and code—providing a narrative that sets the stage for deeper exploration into security challenges.

### 2\. Hardening Your Kubernetes Cluster

In this segment, you will discover essential strategies to secure your Kubernetes clusters, including:

- Implementing CIS Benchmarks
- Configuring authentication and authorization
- Managing Service Accounts
- Utilizing TLS certificates
- Securing the Kubernetes dashboard
- Enforcing network policies
- Conducting secure cluster upgrades

### 3\. Securing the Underlying System

Securing the host system is as important as securing Kubernetes itself. This section covers methods such as:

- Minimizing the operating system footprint
- Implementing SSH hardening and access controls
- Restricting kernel modules and open ports
- Using firewalls and Seccomp for system call restrictions
- Leveraging tools like AppArmor for additional protection

### 4\. Reducing Vulnerabilities in Microservices

This section outlines techniques to protect microservices, including:

- Managing Admission Controllers
- Implementing Pod Security Standards
- Utilizing policy engines such as the Open Policy Agent (OPA)
- Securing secrets and runtime sandboxes
- Applying mTLS for pod-to-pod encryption

### 5\. Securing the Software Supply Chain

Securing your software supply chain is critical for maintaining a robust security posture. In this module, you will learn best practices such as:

- Minimizing base image sizes
- Scanning container images for vulnerabilities
- Validating and signing deployments

### 6\. Runtime Security

The final section is dedicated to runtime security, focusing on behavioral analytics and threat detection. You will explore tools like Falco that help establish a defense-in-depth strategy through monitoring and activity logging.

## Hands-On Labs, Examples, and Exam Preparation

Every module of this course includes comprehensive hands-on labs and real-world examples to bolster your practical skills. The course concludes with a realistic mock exam designed to build your confidence and ensure you are exam-ready. Since the CKS exam is hands-on and permits referencing the official Kubernetes documentation, we also teach you how to navigate these resources efficiently to quickly locate critical information during the exam.

> [!important]
> **About KodeKloud**
>
> KodeKloud is a CNCF Silver member, a Certified Kubernetes Training Partner, and a CNCF Endorsed Content Provider. This certification is a significant milestone in your journey to become a true "KubeAstronaut."

Let's get started—I'll see you in the first lecture.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/634a64ac-045c-479e-8d6a-6e2514af768d/lesson/363de760-ffac-46be-b1c2-5f0b6a5b6bee)**
>
> Watch video content
