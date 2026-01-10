# CICD with GitOps - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Pipelines/Kubernetes-and-GitOps/CICD-with-GitOps)

---

## Table of Contents

- CICD with GitOps
  - Summary
  - Watch Video

---

## Content

Jenkins Pipelines

Kubernetes and GitOps

# CICD with GitOps

In this article, we explore how continuous integration/continuous deployment (CI/CD) pipelines work in conjunction with GitOps to streamline application delivery on Kubernetes.

GitOps takes advantage of two separate Git repositories:

- The **Application Repository** contains all the application code along with its associated resources, such as configuration data, certificates, and container images.
- The **Manifest Repository** houses the Kubernetes manifest YAML files that define how the application is deployed.

The GitOps operator—in our case, the ArgoCD operator running inside a Kubernetes cluster—periodically pulls manifests from the Manifest Repository. If new or updated manifests are detected, it creates or updates the corresponding resources within the cluster.

> [!important]
> **Key Insight**
>
> Whenever a developer pushes changes to the application repository—this might include modifications to a Dockerfile, Jenkins configuration, or application code—a CI/CD system (such as [Jenkins Pipelines](https://learn.kodekloud.com/user/courses/jenkins-pipelines)) automatically triggers a series of stages, such as unit testing, application builds, Docker image creation, and image pushes to a container registry.

For the deployment phase, the CI/CD pipeline follows these steps:

1.  **Clone the Manifest Repository:** The pipeline retrieves the repository that holds the Kubernetes manifests.
2.  **Update Image Version:** The deployment YAML file is updated to reference the newly built Docker image.
3.  **Feature Branch and Pull Request:** The changes are pushed to a feature branch, and a pull request is opened against the main Manifest Repository.

After the pull request is opened, a project manager or architect reviews the changes. They can either approve and merge the modifications or request further improvements. Once the pull request is merged into the main branch, the updated deployment manifests are stored in the repository.

Subsequently, the ArgoCD operator automatically detects the newly merged changes, pulls the updated manifests, and applies them to the Kubernetes cluster.

> [!important]
> **Rollback Readiness**
>
> If the newly deployed image introduces any issues, you can easily rollback to a stable state. Administrators or developers can inspect the application history using the ArgoCD CLI. This process allows quick identification and execution of a rollback.

To perform a rollback, use the following command:

```
argocd app rollback <app-name> <revision-id>
```

This command reverts the application to a previously stable revision, ensuring minimal downtime and disruption.

## Summary

This article has provided an overview of how a CI/CD pipeline integrates with GitOps, explaining the role of separate Git repositories, the operation of the ArgoCD operator, and the steps needed to update and rollback deployments in a Kubernetes environment. In upcoming demos, we will cover:

- Creating a Jenkinsfile with all necessary stages.
- Opening pull requests to update the Manifest Repository.
- Observing how ArgoCD pulls changes and performs rollbacks when needed.

Thank you.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-pipelines/module/fb6b2c83-178c-4962-b4e6-ca5528721170/lesson/494c9ccc-8e37-4b46-a891-d4c124a05f6d)**
>
> Watch video content
