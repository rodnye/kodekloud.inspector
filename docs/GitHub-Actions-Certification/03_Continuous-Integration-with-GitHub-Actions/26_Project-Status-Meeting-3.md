# Project Status Meeting 3 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Continuous-Integration-with-GitHub-Actions/Project-Status-Meeting-3)

---

## Table of Contents

- Project Status Meeting 3
  - Workflow Refactoring: Jobs vs. Service Containers
  - Deployment Requirements
  - Kubernetes Fundamentals
  - Next Steps
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

GitHub Actions Certification

Continuous Integration with GitHub Actions

# Project Status Meeting 3

Welcome to the third Project Status Meeting. This update covers our recent workflow refactoring, deployment prerequisites, and a primer on Kubernetes fundamentals.

## Workflow Refactoring: Jobs vs. Service Containers

By decoupling workloads into dedicated **job** and **service** containers, we have achieved:

- **Isolated processing:** Batch tasks no longer compete with live services.
- **Reduced database load:** Production database performance improved significantly.
- **Enhanced reliability:** Scheduled jobs now complete without conflicts.

> [!important]
> **Note**
>
> Using separate containers for one-off jobs helps maintain consistent performance for core microservices.

## Deployment Requirements

Before advancing to the staging and production phases, ensure the following components are in place:

| Requirement         | Description                                     | Example Command                                  |
| ------------------- | ----------------------------------------------- | ------------------------------------------------ |
| Container Registry  | Centralized storage for versioned Docker images | `docker push registry.example.com/myapp:1.0.0`   |
| CI/CD Pipeline      | Automated build, test, and deployment workflows | GitHub Actions, GitLab CI, or Jenkins            |
| Configuration Files | Kubernetes manifests or Helm charts             | `deployment.yaml`, `service.yaml`, `values.yaml` |
| Cluster Access      | kubeconfig and RBAC roles configured            | `kubectl config use-context staging-cluster`     |

> [!important]
> **Warning**
>
> Verify your `kubeconfig` context before running `kubectl apply` to avoid unintended cluster changes.

## Kubernetes Fundamentals

Understanding these core Kubernetes resources will streamline our deployment process:

| Resource Type | Purpose                                 | Example CLI                                    |
| ------------- | --------------------------------------- | ---------------------------------------------- |
| Pod           | Smallest deployable unit                | `kubectl run nginx --image=nginx`              |
| Deployment    | Declarative updates and scaling of pods | `kubectl create deployment web --image=myapp`  |
| Service       | Exposes pods internally or externally   | `kubectl expose deployment web --port=80`      |
| Job           | Runs batch or one-time tasks            | `kubectl create job migrate-db --image=alpine` |

For a deeper dive, refer to [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/).

## Next Steps

Alice’s team will finalize manifest files, conduct staging tests, and prepare for the production rollout. In our next meeting, we’ll review deployment logs, performance metrics, and plan the final cutover.

## Links and References

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/56d72a06-285c-4516-9880-073fb56f579b/lesson/7dd4399d-0808-4c9d-a58e-2a1b3bc38812)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/github-actions-certification/module/56d72a06-285c-4516-9880-073fb56f579b/lesson/f2741588-b88e-4fad-a988-194069c75b9f)**
>
> Practice lab
