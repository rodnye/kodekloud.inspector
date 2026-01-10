# CICD with GitOps - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-ArgoCD/ArgoCD-with-Jenkins-CI-Pipeline/CICD-with-GitOps)

---

## Table of Contents

- CICD with GitOps
  - CI/CD Workflow Overview
  - Rollback Process with ArgoCD
  - Conclusion
  - Watch Video

---

## Content

GitOps with ArgoCD

ArgoCD with Jenkins CI Pipeline

# CICD with GitOps

In this article, we explore how to manage continuous integration and delivery (CI/CD) via GitOps—an approach that leverages Git as the single source of truth for both application code and deployment configurations.

The GitOps methodology utilizes two distinct Git repositories:

1.  The first repository stores the application code along with its associated resources, including configuration data, certificates, and container images.
2.  The second repository houses the Kubernetes manifest YAML files, which define the deployment specifications of the application.

An essential component of this process is the GitOps operator, such as ArgoCD. ArgoCD runs within a Kubernetes cluster and continuously monitors the repository that contains the Kubernetes manifests. When a change is detected, ArgoCD pulls the updated manifests and applies them to the cluster, ensuring that the running environment always reflects the declared state in Git.

> [!important]
> **Key Components**
>
> • Two Git repositories: one for application code and one for deployment manifests.
> • A GitOps operator (e.g., ArgoCD) to synchronize the declared and running states.

## CI/CD Workflow Overview

When a developer updates the application code repository—for example, by modifying application code, updating a Dockerfile, or adding Jenkins-related changes ([Jenkins](https://learn.kodekloud.com/user/courses/jenkins))—the CI pipeline executes the following steps:

- Run unit tests.
- Build the application.
- Create a Docker image.
- Push the new image to a container registry.

After the new image is published, the deployment process is initiated by cloning the configuration repository, which contains the Kubernetes manifests. The deployment YAML file is updated to reference the new image version. These changes are then pushed to a feature branch, and a pull request is submitted against the main (or master) branch of the manifest repository.

Once the pull request is reviewed by a project manager or architect, it is either approved and merged or declined. Once merged, the updated manifests become part of the main branch, prompting ArgoCD to pull the latest changes and deploy them to the Kubernetes cluster.

> [!important]
> **Deployment Caution**
>
> In cases where issues arise with the new image, it is crucial to have a rollback strategy in place. ArgoCD provides a simple mechanism to revert to a previous stable state.

## Rollback Process with ArgoCD

If the deployed image presents problems, administrators or developers can review the application history and perform a rollback using the following commands:

```
argocd app history <application-name>
```

This command lists all revisions. To roll back to a specific revision, execute:

```
argocd app rollback <application-name> <revision-number>
```

Both the CLI and the ArgoCD user interface offer quick methods to revert the application to a known stable state.

## Conclusion

This workflow demonstrates how a CI/CD pipeline can be effectively managed using the GitOps approach. In upcoming demonstrations, we will cover the creation of a Jenkinsfile that defines all the necessary CI stages, how to raise a pull request to update the Kubernetes manifest repository, and how ArgoCD processes these changes or performs a rollback when necessary.

Thank you.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-argocd/module/2a9a275c-6019-4953-b2cf-96d9f4c303a8/lesson/988a99f6-359a-4ed0-9236-5bfb1319986d)**
>
> Watch video content
