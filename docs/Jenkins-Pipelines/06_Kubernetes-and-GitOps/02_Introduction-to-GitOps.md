# Introduction to GitOps - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Pipelines/Kubernetes-and-GitOps/Introduction-to-GitOps)

---

## Table of Contents

- Introduction to GitOps
  - How GitOps Works
  - CI/CD Pipeline and GitOps
  - GitOps Workflow Diagram
  - Watch Video

---

## Content

Jenkins Pipelines

Kubernetes and GitOps

# Introduction to GitOps

GitOps is a modern framework for managing and automating code delivery processes by using Git as the single source of truth. This approach integrates infrastructure and application code, enabling robust continuous integration and deployment practices.

## How GitOps Works

Developers collaborate by committing to a shared Git repository. Typically, they work on feature branches—isolated copies of the main codebase—to develop and test new features independently. Once changes are committed, a continuous integration (CI) service automatically builds the code and runs unit tests. After successful tests and the necessary code reviews, the modifications are merged into the central repository.

Following the merge, continuous deployment (CD) processes take over:

- Approved changes are automatically released to production clusters.
- A GitOps operator, generally running within a Kubernetes cluster, ensures that the desired state defined in Git matches the actual state in production.
- The operator continuously monitors the repository for any updates and applies them to the cluster as needed.

> [!important]
> **Quick Tip**
>
> Using Git as the source of truth not only simplifies deployments but also provides a complete audit trail for all infrastructure and application changes.

## CI/CD Pipeline and GitOps

When new code is merged into the application Git repository, an automated CI/CD pipeline is triggered, performing the following steps:

1.  **Run Unit Tests:** Ensures code quality and functionality.
2.  **Build Application:** Compiles and packages the application.
3.  **Create and Push Docker Image:** Builds the Docker image and pushes it to a container registry.
4.  **Update Kubernetes Manifest:** Modifies the Kubernetes configuration stored in another Git repository.

The GitOps operator then detects any discrepancy between the desired state (as defined in Git) and the actual cluster state, retrieving and applying the updates to maintain consistency.

> [!important]
> **Security Advisory**
>
> Ensure that your Git repositories and CI/CD pipelines are secured and properly managed to prevent unauthorized modifications or breaches.

## GitOps Workflow Diagram

![The image illustrates a GitOps workflow, showing the process from application code merging to continuous integration, and synchronization of Kubernetes manifests to achieve the desired state in production environments.](https://kodekloud.com/kk-media/image/upload/v1752879722/notes-assets/images/Jenkins-Pipelines-Introduction-to-GitOps/gitops-workflow-continuous-integration.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-pipelines/module/fb6b2c83-178c-4962-b4e6-ca5528721170/lesson/584239f7-4360-4a86-b401-6a649d9f9cb7)**
>
> Watch video content
