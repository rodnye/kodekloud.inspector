# Project Status Meeting 4 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/Reusable-Workflows-and-Reporting/Project-Status-Meeting-4)

---

## Table of Contents

- Project Status Meeting 4
  - Why Reusable Workflows?
  - Reuse Strategy Overview
  - Next Steps
  - Links and References
  - Watch Video

---

## Content

GitHub Actions

Reusable Workflows and Reporting

# Project Status Meeting 4

In this fourth project status meeting, Alice and her team have successfully implemented the GitHub Actions workflow for their Node.js application. Building on that progress, Dasher Technologies now plans to adopt the same CI/CD strategy for their Java and Python projects. Since all three applications share a Kubernetes deployment pattern, the team will reuse the existing deployment job steps to streamline the process.

![The image is a project status meeting chart listing tasks, all assigned to Alice, with their statuses marked as completed. Some tasks have comments suggesting reusing steps for other projects.](https://kodekloud.com/kk-media/image/upload/v1752876719/notes-assets/images/GitHub-Actions-Project-Status-Meeting-4/project-status-meeting-chart-alice.jpg)

---

## Why Reusable Workflows?

By extracting common deployment logic into reusable workflows, the team will be able to:

- Maintain a single source of truth for Kubernetes deployments
- Ensure consistency across Node.js, Java, and Python applications
- Simplify updates and reduce duplication in each repository

> [!important]
> **Note**
>
> Reusable workflows allow you to centralize steps like building Docker images, pushing to a registry, and applying manifests to your cluster. You can invoke them from any repository with minimal configuration.

---

## Reuse Strategy Overview

| Language | Deployment Tooling | Workflow File Path                     |
| -------- | ------------------ | -------------------------------------- |
| Node.js  | Helm               | `.github/workflows/deploy-nodejs.yaml` |
| Java     | Kubernetes CLI     | `.github/workflows/deploy-java.yaml`   |
| Python   | Kustomize          | `.github/workflows/deploy-python.yaml` |

---

## Next Steps

1.  **Author the Reusable Workflow**
    - Define inputs (e.g., `cluster_name`, `namespace`, `image_tag`).
    - Encapsulate build, push, and deploy steps in a single workflow file under the `.github/workflows/` directory of your common workflow repository.

2.  **Consume the Reusable Workflow**
    - In each service repository, create a lightweight workflow that calls the central workflow.
    - Pass environment-specific parameters to customize deployments per language.

3.  **Validate and Iterate**
    - Test deployments in a staging environment first.
    - Monitor logs and update the central workflow as new requirements emerge.

> [!important]
> **Warning**
>
> Ensure that each consuming repository has the necessary [GitHub secrets](/docs/actions/security-guides/encrypted-secrets) configured (e.g., `KUBE_CONFIG_DATA`, `DOCKER_REGISTRY_TOKEN`) before invoking the reusable workflow.

---

## Links and References

- [GitHub Actions Reusable Workflows](https://docs.github.com/actions/using-workflows/reusing-workflows)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Helm Charts](https://helm.sh/docs/)
- [Kustomize Overview](https://kubectl.docs.kubernetes.io/guides/introduction/kustomize/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/57481ffd-2f40-4d62-af84-5f992f6c92dc/lesson/faf56225-dc06-405b-b9e2-a5c9b256c5f9)**
>
> Watch video content
