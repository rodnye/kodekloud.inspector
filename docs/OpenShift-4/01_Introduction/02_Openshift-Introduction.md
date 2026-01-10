# Openshift Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenShift-4/Introduction/Openshift-Introduction)

---

## Table of Contents

- Openshift Introduction
  - OpenShift Flavors
  - Core Technologies Behind OpenShift
  - Understanding the Software Development Process
  - Conclusion
  - Watch Video
    - Docker
    - Kubernetes

---

## Content

OpenShift 4

Introduction

# Openshift Introduction

Hello, and welcome to this lesson on introducing OpenShift.

In this session, we provide a high-level overview of OpenShift—Red Hat's open-source container application platform designed for developing and hosting enterprise-grade applications. As a Platform-as-a-Service (PaaS) solution, OpenShift abstracts the complexities of managing the underlying infrastructure, enabling developers to focus on writing code.

## OpenShift Flavors

OpenShift is available in four distinct editions:

1.  **OpenShift Origin** – The upstream open-source project that serves as the foundation for all other versions.
2.  **OpenShift Online** – Red Hat’s publicly hosted version of OpenShift Origin for application development and hosting.
3.  **OpenShift Dedicated** – A managed private cluster hosted on cloud platforms such as AWS and Google Cloud.
4.  **OpenShift Enterprise** – An on-premise, private PaaS solution.

During this course, we will focus primarily on OpenShift Origin.

## Core Technologies Behind OpenShift

OpenShift Origin is built on Docker containers and the Kubernetes Cluster Manager and is enhanced with additional tools for rapid application development, deployment, and lifecycle management. To get the most out of OpenShift, it is crucial to have a solid understanding of Docker, Kubernetes, and the extra features that OpenShift adds to these technologies.

Below is a diagram that illustrates how OpenShift Origin integrates Docker with Kubernetes:

![The image contains text describing OpenShift Origin as a platform based on Docker containers and Kubernetes, designed for rapid application development, deployment, and lifecycle management.](https://kodekloud.com/kk-media/image/upload/v1752882663/notes-assets/images/OpenShift-4-Openshift-Introduction/openshift-origin-docker-kubernetes.jpg)

### Docker

Docker is the technology that powers containerized applications. It enables you to create reusable images that include your application code along with all its dependencies, ensuring consistency across different deployment environments. Detailed Docker concepts will be covered in an upcoming lesson.

### Kubernetes

Kubernetes orchestrates the deployment and management of Docker images across large clusters, offering features like self-healing and auto-scaling. OpenShift builds upon Kubernetes by integrating additional tools and streamlining infrastructure management. It also offers seamless integration with developer tools such as GitHub for source code management.

> [!important]
> **Key OpenShift Features**
>
> - **Integrated Build Pipelines:** Ensure consistent development, testing, and deployment.
> - **Built-in Docker Image Registry:** Manage application images efficiently.
> - **Software-Defined Networking:** Provides built-in networking capabilities.
> - **Extensive API Support:** Facilitates smooth integration with existing systems.
> - **User and Project Management Tools:** Enable effective management of teams, projects, and access controls.

## Understanding the Software Development Process

Before diving into the advanced features of OpenShift, it is important to understand the basic components and tools involved in modern software development. Familiarity with Docker and Kubernetes will help you appreciate OpenShift’s enhancements. If you are already comfortable with these technologies, feel free to skip ahead to our OpenShift Architectural Overview.

The following diagram outlines the various tools used in the software development process, including Source Code Management (SCM), build pipelines, registries, software-defined networking, APIs, and governance—all represented by interconnected red circles:

![The image is a flowchart illustrating various tools in a software development process, including SCM, Pipeline, Registry, Software Defined Networking, API, and Governance. Each tool is represented by an icon within interconnected red circles.](https://kodekloud.com/kk-media/image/upload/v1752882664/notes-assets/images/OpenShift-4-Openshift-Introduction/software-development-tools-flowchart.jpg)

> [!important]
> **Recommended Learning**
>
> For newcomers to Docker and Kubernetes, consider enrolling in these hands-on courses:
>
> - [Docker for the Absolute Beginners](https://learn.kodekloud.com/user/courses/docker-training-course-for-the-absolute-beginner)
> - [Kubernetes for the Absolute Beginners](https://learn.kodekloud.com/user/courses/kubernetes-for-the-absolute-beginners-hands-on-tutorial)

## Conclusion

This concludes our introductory overview of OpenShift. In the next lesson, we will examine the prerequisites and delve deeper into the core components of the platform.

See you in the next lesson!

---

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/openshift-4/module/1823500d-7c58-4ab6-9edf-f41169a20df9/lesson/c9888be8-0a94-494d-a9bd-3835d7a37d08)**
>
> Watch video content
