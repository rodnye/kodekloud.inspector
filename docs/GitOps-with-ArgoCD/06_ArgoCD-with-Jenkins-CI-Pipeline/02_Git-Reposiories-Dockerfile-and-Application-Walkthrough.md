# Git Reposiories Dockerfile and Application Walkthrough - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-ArgoCD/ArgoCD-with-Jenkins-CI-Pipeline/Git-Reposiories-Dockerfile-and-Application-Walkthrough)

---

## Table of Contents

- Git Reposiories Dockerfile and Application Walkthrough
  - Git Repositories Overview
  - Dockerizing the PHP Application
  - Additional Files
  - Watch Video
    - GitOps Repository
    - Source Code Repository

---

## Content

GitOps with ArgoCD

ArgoCD with Jenkins CI Pipeline

# Git Reposiories Dockerfile and Application Walkthrough

This article provides a detailed overview of the application source code along with its associated Git repositories. It covers two main areas: the GitOps repository managed by ArgoCD for Kubernetes deployment and the PHP-based Solar System application's source repository. Below, you'll find step-by-step explanations, code samples, and configuration details designed to help you understand the deployment process and application structure.

## Git Repositories Overview

Two primary Git repositories are involved in this project:

1.  The source repository, which stores the application's source code.
2.  The GitOps repository, managed by ArgoCD, which contains the Kubernetes manifests used to deploy the application.

Let's start by exploring the GitOps repository.

### GitOps Repository

Inside the GitOps repository, navigate to the `Jenkins-demo` directory. Here, several Kubernetes manifests are available. These manifests define the necessary deployment and service resources in Kubernetes and are actively monitored by ArgoCD. Any changes detected in these manifests are automatically applied to the cluster, ensuring smooth configuration management.

![The image shows a Gitea repository interface with details about a project named "gitops-argocd" on the "jenkins-demo" branch. It displays commit information, file updates, and options to manage files.](https://kodekloud.com/kk-media/image/upload/v1752877582/notes-assets/images/GitOps-with-ArgoCD-Git-Reposiories-Dockerfile-and-Application-Walkthrough/gitea-repository-gitops-argocd.jpg)

### Source Code Repository

The second repository contains the PHP-based Solar System application. This repository includes an `index.php` file and an images folder, which provides the visual assets required for the application. Specifically, the `index.php` file integrates PHP with HTML, rendering the application's user interface with dynamic elements.

The UI relies on two critical visual components:

- The Solar System image for creating engaging animations.
- A background image that enhances the overall visual appeal.

Below is the core CSS embedded within the `index.php` file, responsible for styling and animating the application:

```
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
    #solar-system {
        background: url("http://139.59.21.103:3000/siddharth/solar-system/raw/branch/main/images/solar-system-9.png") center center;
        background-repeat: no-repeat;
        background-size: cover;
        content: "";
        position: static;
        animation: spin 25s linear infinite;
        width: 50vw;
        height: 50vw;
    }


    @keyframes spin {
        100% { transform: rotate(360deg); }
    }


    body {
        display: flex;
        align-items: center;
        justify-content: center;
        background: url("http://139.59.21.103:3000/siddharth/solar-system/raw/branch/main/images/background.png");
    }


    /*
    .shadow {
        animation: rainbow 2s linear infinite;
    } */
</style>
```

> [!important]
> **Note**
>
> The above CSS ensures the Solar System element is animated with a 25-second rotation cycle, while the overall page maintains a centered layout with a static background.

## Dockerizing the PHP Application

Containerization is simplified through the use of a Dockerfile included in the project. This Dockerfile leverages an official PHP image with Apache, copying the necessary source files and assets into the appropriate directory for deployment on a web server.

Below is the Dockerfile content:

```
FROM php:7.4-apache
COPY index.php /var/www/html/
COPY images /var/www/html/images
EXPOSE 80
```

The Dockerfile performs the following steps:

- Uses the official `php:7.4-apache` base image.
- Copies the `index.php` file into the Apache default web directory at `/var/www/html/`.
- Copies the entire `images` directory into `/var/www/html/images` to ensure all visual assets are available.
- Exposes port 80, which is the default port for Apache, enabling web traffic to access the application.

## Additional Files

In addition to the main application code and Dockerfile, the repository also contains:

- A **Jenkinsfile** for configuring continuous integration pipelines.
- A **pr.sh** shell script used for automating pull request tasks.

These additional files help streamline CI/CD workflows and will be discussed in greater detail in a forthcoming article.

Thank you for reading this walkthrough. For more information on similar topics, consider exploring the following resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [ArgoCD Documentation](https://argo-cd.readthedocs.io/)

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-argocd/module/2a9a275c-6019-4953-b2cf-96d9f4c303a8/lesson/402f8046-24df-4e66-b834-08dcbdd2ec38)**
>
> Watch video content
