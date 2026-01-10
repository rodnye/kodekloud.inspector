# DevOps vs GitOps - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-ArgoCD/GitOps-Introduction/DevOps-vs-GitOps)

---

## Table of Contents

- DevOps vs GitOps
  - DevOps Pipeline
  - GitOps Pipeline
  - Conclusion
  - Watch Video

---

## Content

GitOps with ArgoCD

GitOps Introduction

# DevOps vs GitOps

This lesson dives into the contrasting approaches of DevOps and GitOps—two methodologies that share common goals but differ significantly in execution and toolsets.

GitOps leverages containerization technologies such as OpenShift and Kubernetes. It uses Git as the single source of truth for both infrastructure and deployments. In comparison, DevOps is a broader methodology that can be applied to diverse application environments and workflows.

## DevOps Pipeline

A typical DevOps pipeline operates as follows:

1.  A developer writes code in an Integrated Development Environment (IDE) and commits it to a source code management system.
2.  A Continuous Integration (CI) process detects the commit, runs tests, and builds the necessary artifacts.
3.  The pipeline then creates a container image and publishes it to a container repository.
4.  Finally, the Continuous Deployment (CD) process connects to a Kubernetes cluster and uses a command-line tool such as `kubectl` (with imperative commands) to push updates directly to the cluster.

> [!important]
> **Key Point**
>
> In DevOps, the deployment is initiated by pushing changes directly into the cluster.

## GitOps Pipeline

While the CI processes in a GitOps pipeline mirror those of DevOps up to the point of publishing the container image, the deployment process is distinct:

1.  Two separate Git repositories are maintained: one dedicated to application code and another for Kubernetes manifests.
2.  Once the image is published, the manifest repository is cloned and updated—typically the new image name is specified. These changes are then committed and pushed.
3.  The pipeline automatically raises a pull request for the manifest repository. A team member reviews the pull request, suggests adjustments if necessary, and merges the changes upon approval.
4.  A GitOps operator, running within the Kubernetes cluster, continuously monitors the repository. When changes are detected, it synchronizes the cluster state to match the repository configuration.

> [!important]
> **Takeaway**
>
> In a GitOps pipeline, the deployment operator pulls changes from the repository and applies them to the cluster, contrasting with the push-based approach in traditional DevOps workflows.

The image below illustrates a side-by-side comparison of the CI/CD pipelines in both DevOps and GitOps. It highlights the key steps—ranging from code development to deployment—and emphasizes the differences in update management and application.

![The image compares DevOps and GitOps CI/CD pipelines, illustrating the processes of continuous integration and deployment for each approach. It highlights the steps from code development to deployment, showing differences in how updates are managed and applied.](https://kodekloud.com/kk-media/image/upload/v1752877588/notes-assets/images/GitOps-with-ArgoCD-DevOps-vs-GitOps/devops-gitops-cicd-comparison.jpg)

## Conclusion

This article compared DevOps and GitOps pipelines by detailing the key stages of each process. Understanding these differences is essential for choosing the right methodology for your projects. In the next lesson, we will explore the advantages and challenges associated with each approach.

Thank you for reading.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-argocd/module/d850bc8b-9d08-4c89-b5b4-221564cae4a0/lesson/3a04a252-48e5-4542-b202-b3d06ed4e33b)**
>
> Watch video content
