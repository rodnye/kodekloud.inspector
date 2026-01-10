# Meeting with Task Dash DevOps Team - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-ArgoCD/Introduction/Meeting-with-Task-Dash-DevOps-Team)

---

## Table of Contents

- Meeting with Task Dash DevOps Team
  - The DevOps Journey at TaskDash
  - The CI/CD Workflow and Challenges
  - Disaster Recovery Concerns
  - The GitOps Advantage
  - Watch Video

---

## Content

GitOps with ArgoCD

Introduction

# Meeting with Task Dash DevOps Team

In this article, we explore the challenges faced by the TaskDash DevOps team and how adopting GitOps practices can streamline their processes and enhance security within their infrastructure management.

Dasher is a software vendor offering a platform that connects data, applications, and devices across on-premises environments. Recently, their R&D team began investigating cloud migration to leverage container technologies.

## The DevOps Journey at TaskDash

The TaskDash DevOps team is building their project from the ground up by following industry best practices. Their multi-cloud infrastructure employs Docker for containerization and Kubernetes for orchestrating containerized applications. The first step in their approach is Infrastructure as Code (IaC), which automates the provisioning and management of infrastructure using code instead of manual processes. In addition to IaC, they implement several "X as Code" strategies, including:

- Policy as Code
- Configuration as Code
- Network as Code

Rather than setting up infrastructure, networks, and deploying applications manually to a Kubernetes cluster, the team utilizes automation tools like Terraform and Ansible. These tools leverage YAML and configuration files to define the desired state of the infrastructure and applications. Currently, the configuration files reside on the master branch of a Git repository, and each team member applies changes manually. This workflow bypasses code reviews and automated testing, as every change is instantly pushed to the master branch.

> [!important]
> **Warning**
>
> Manual execution of configuration changes without code reviews or automated tests can lead to discrepancies and potential security vulnerabilities.

## The CI/CD Workflow and Challenges

Due to the lack of automation for updating the infrastructure, team members often resort to manually executing commands to apply modifications. This practice makes it difficult to track changes and identify who performed specific modifications. To mitigate these challenges, the team has established a CI/CD pipeline:

- The Continuous Integration (CI) pipeline automates building, testing, and containerizing the applications.
- The Continuous Deployment (CD) pipeline deploys these applications to the Kubernetes cluster using a push-based model:

```
kubectl apply v2.8.4
```

Additionally, the team sometimes applies updates manually through the Kubernetes command-line interface (CLI). This hybrid approach introduces several issues:

- Exposed credentials outside the cluster, increasing the risk of security breaches.
- A higher likelihood of configuration drift, whereby the deployed state diverges from what is defined in Git.

> [!important]
> **Note**
>
> Manual CLI alterations are generally discouraged due to potential security risks and the possibility of configuration inconsistencies.

## Disaster Recovery Concerns

Cloud computing environments are susceptible to disasters caused by natural events (e.g., earthquakes or floods), technical failures (e.g., power outages or network interruptions), or human errors (e.g., misconfigurations). In such events, having a robust disaster recovery plan is critical to restoring both the infrastructure and application states.

While the Git repository maintains the desired state, manual interventions often lead to discrepancies. For example, over time, the following commands have been executed, each representing a different version applied to the Kubernetes cluster:

```
kubectl apply v2.9.5
kubectl apply v3.0.1
kubectl apply v2.8.4
```

After a disaster recovery, the team must painstakingly identify which manual changes were applied in order to reconcile the current state with the desired state in Git—a process that is error-prone and time-consuming.

## The GitOps Advantage

Adopting the GitOps methodology helps address the above challenges by ensuring all changes—whether to infrastructure or applications—are tracked and applied through the Git repository. This unified approach promotes consistency, enhances security, and simplifies the disaster recovery process.

For additional reading on modern cloud deployment strategies, consider exploring these resources:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

Thank you for reading.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-argocd/module/713ff34d-1afe-4f18-b1bf-2990c322469e/lesson/3f106da5-d2b1-45b1-a9bc-5abb29453536)**
>
> Watch video content
