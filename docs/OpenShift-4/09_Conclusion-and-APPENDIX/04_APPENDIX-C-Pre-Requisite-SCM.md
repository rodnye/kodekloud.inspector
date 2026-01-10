# APPENDIX C Pre Requisite SCM - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenShift-4/Conclusion-and-APPENDIX/APPENDIX-C-Pre-Requisite-SCM)

---

## Table of Contents

- APPENDIX C Pre Requisite SCM
  - What is Source Code Management?
  - Next Steps
  - Watch Video

---

## Content

OpenShift 4

Conclusion and APPENDIX

# APPENDIX C Pre Requisite SCM

Hello, and welcome to this comprehensive guide on Source Code Management (SCM) and Builds.

To grasp the OpenShift workflow fully, it is essential to understand source code management, build pipelines, and deployment processes from a general perspective first. This section is designed for beginners to familiarize themselves with these core concepts. If you already have experience with these topics, you may skip ahead to see how they integrate into the OpenShift environment.

## What is Source Code Management?

A modern application often comprises multiple components. For instance, a front-end web console might deliver web pages to users, while a back-end API server handles data processing. The web console itself can be segmented into several parts—such as a login page, home page, and dashboard—where developers use HTML5, CSS, and JavaScript. Meanwhile, the back-end might be divided into segments that require expertise in Python, Java, or Node.js, alongside specialists in database management and system integration.

When several developers collaborate on the same code base, coordinating changes—especially on identical files—can quickly become overwhelming. This challenge is exacerbated with multiple software release versions across various environments. To manage and track these changes effectively, developers turn to source code management systems, also known as version or revision control systems. These tools not only govern access to code files but also ensure that all modifications are documented and traceable.

Below is an example of a typical project structure in a repository:

```
|-- README.md
|-- Dockerfile
|-- bower.json
|-- package.json
|-- app
|   |-- app.js
|   |-- web
|   |   |-- index.html
|   |   |-- mdir.js
|   |   |-- routing.js
|   |   |-- server.js
|   |-- api
|   |   |-- api.groups.js
|   |   |-- api.posts.js
|   |   |-- api.users.js
|   |   |-- api.widgets.js
|   |   |-- authentication
|   |       |-- oauth.js
|   |       |-- vendor
|   |-- database
|   |   |-- db.js
|   |-- integration
|       |-- servicenow.js
```

With SCM tools, your codebase is hosted in a central repository—whether on-premises or in the cloud. Leading platforms such as GitHub, GitLab, and Bitbucket provide robust access control mechanisms ensuring that only authorized users can modify the code. When multiple users work on the same file, the repository automatically merges changes by evaluating the file line by line, flagging any merge conflicts for manual resolution.

In addition to managing access and tracking changes, code repositories offer features like revision history analytics, delivering insights into the evolution of code over time. This data proves invaluable when planning and managing software releases.

Consider the following simple HTML snippet as an example of web content within an SCM-managed project:

```
<div class="col-md-3"></div>
```

The snippet below shows a brief JavaScript example which sets module exports for an overview:

```
exports = module.exports = {
  title: 'Overview',
  type: 'overview',
  video_id: 'e108VR566n4'
};
```

![The image illustrates aspects of source code management, including revision history, file merging, access control, and hosting, alongside a list of code commits with dates and descriptions.](https://kodekloud.com/kk-media/image/upload/v1752882628/notes-assets/images/OpenShift-4-APPENDIX-C-Pre-Requisite-SCM/source-code-management-revision-history.jpg)

> [!important]
> **Note**
>
> Source Code Management (SCM) is fundamental not only for version control but also for facilitating collaborative development and ensuring a detailed history of changes across the project lifecycle.

## Next Steps

The repository serves a dual purpose: it monitors and records changes made by multiple users over time, and it offers advanced analytics regarding the frequency and nature of these changes. This insight supports effective planning and management of software releases.

In the next section, you will participate in a demonstration that guides you through setting up a local Git environment using GitLab. This demo is tailored to complement the upcoming configuration of CI/CD pipelines in OpenShift.

For more detailed insights into related topics, consider exploring the following resources:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/openshift-4/module/d84e1350-21eb-421e-87d0-2d7bf019360f/lesson/1783d843-d41d-4f7a-a209-a7a1510dd176)**
>
> Watch video content
