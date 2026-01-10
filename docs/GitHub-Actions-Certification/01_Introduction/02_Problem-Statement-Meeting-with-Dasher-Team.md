# Problem Statement Meeting with Dasher Team - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Introduction/Problem-Statement-Meeting-with-Dasher-Team)

---

## Table of Contents

- Problem Statement Meeting with Dasher Team
  - Overview
  - Current Workflow and Roadmap
  - Evaluating CI/CD Platforms
  - Why Jenkins Becomes Complex
  - Incorporating DevSecOps
  - Adopting GitHub Actions
  - Next Steps
  - References
  - Watch Video
    - Key Pipeline Steps

---

## Content

GitHub Actions Certification

Introduction

# Problem Statement Meeting with Dasher Team

## Overview

Dasher Technology specializes in connecting data, applications, and devices across on-premise environments. To modernize their R&D efforts, the DevOps team led by Alice is migrating workloads to the cloud using Docker and Kubernetes. The initial focus is a Node.js application, with plans to extend these practices to Java and Python projects.

![The image outlines a DevOps requirement for the Task Dash Team, featuring Dasher Technologies, a person named Alice, and Docker for containerization.](https://kodekloud.com/kk-media/image/upload/v1752876303/notes-assets/images/GitHub-Actions-Certification-Problem-Statement-Meeting-with-Dasher-Team/devops-requirement-task-dash-team.jpg)

## Current Workflow and Roadmap

Alice’s team currently lacks standardized version control and automated pipelines. Manual coding, testing, and deployments introduce delays and instability. To streamline delivery, they have identified these core objectives:

- Version control and collaborative branching
- Automated unit testing with code coverage
- Container image building and registry publishing
- Kubernetes-based deployments
- Integration and end-to-end testing

![The image outlines the DevOps requirements for a task dash team, including version control, code integration, collaboration, manual testing, and manual deployment, with an illustration of a person labeled "Alice."](https://kodekloud.com/kk-media/image/upload/v1752876305/notes-assets/images/GitHub-Actions-Certification-Problem-Statement-Meeting-with-Dasher-Team/devops-requirements-task-dash-team.jpg)

### Key Pipeline Steps

1.  Adopt GitHub for source control and PR reviews
2.  Execute unit tests and generate coverage reports
3.  Build Docker containers and push to a registry
4.  Deploy to Kubernetes clusters
5.  Run automated integration tests

![The image outlines the DevOps requirements for a team, highlighting tasks such as code integration, collaboration, manual testing, and deployment, alongside automated processes like unit testing, code coverage, building, pushing, deploying, and automated IT.](https://kodekloud.com/kk-media/image/upload/v1752876306/notes-assets/images/GitHub-Actions-Certification-Problem-Statement-Meeting-with-Dasher-Team/devops-requirements-team-tasks-diagram.jpg)

## Evaluating CI/CD Platforms

A variety of CI/CD services exist. Below is a comparison of popular tools:

| Tool      | Type              | Pros                               | Cons                                 |
| --------- | ----------------- | ---------------------------------- | ------------------------------------ |
| Jenkins   | Self-hosted       | Highly extensible, large community | Requires VM provisioning and upkeep  |
| Travis CI | Hosted            | Simple YAML config                 | Limited concurrency on free tier     |
| CircleCI  | Hosted            | Containerized workflows            | Usage limits on open source projects |
| Bamboo    | Self-hosted       | Deep Atlassian integration         | Commercial license                   |
| Spinnaker | Self-hosted/cloud | Multi-cloud deployment support     | Steeper learning curve               |

![The image lists DevOps tools with their logos: Jenkins, Travis CI, Circle CI, Atlassian Bamboo, and Spinnaker.](https://kodekloud.com/kk-media/image/upload/v1752876307/notes-assets/images/GitHub-Actions-Certification-Problem-Statement-Meeting-with-Dasher-Team/devops-tools-logos-jenkins-travis-circle.jpg)

## Why Jenkins Becomes Complex

Choosing Jenkins adds operational overhead:

- VM or dedicated server setup with proper CPU, memory, and storage
- Java JDK installation, firewall rules, and plugin management
- Multiple Node.js versions for cross-environment testing
- Docker Engine and Kubernetes CLI (kubectl, Helm)
- Third-party CLIs for security scanning and reporting

> [!important]
> **Warning**
>
> Manual configuration scales poorly as you add Java, Python, and cloud-specific CLIs (AWS, Azure).

![The image lists traditional CI/CD tools and their challenges, featuring logos for Java, Maven, Python, Azure, AWS CLI, Trivy, and Kubesec.](https://kodekloud.com/kk-media/image/upload/v1752876308/notes-assets/images/GitHub-Actions-Certification-Problem-Statement-Meeting-with-Dasher-Team/ci-cd-tools-challenges-logos.jpg)

## Incorporating DevSecOps

For a robust DevSecOps practice, tools like Trivy and KubeSec must be integrated. Onboarding these introduces even more setup tasks:

- Static analysis and vulnerability scanning
- Policy enforcement in Kubernetes manifests
- Reporting and alerting mechanisms

Alice needed a solution that eliminates infrastructure management yet delivers full CI/CD and security capabilities.

## Adopting GitHub Actions

GitHub Actions offers built-in workflows and hosted runners, reducing setup time and complexity:

- No VM provisioning—use GitHub-hosted or self-hosted runners
- Pre-installed tools for Node.js, Docker, Kubernetes, and common CLIs
- Native integration with GitHub repositories and pull request workflows
- Marketplace actions for testing, security scans, and deployments

> [!important]
> **Note**
>
> See [GitHub Actions documentation](https://docs.github.com/en/actions) for a full list of supported runners and actions.

![The image is a slide titled "Traditional CI/CD Tools – Challenges" featuring an icon representing GitHub Actions.](https://kodekloud.com/kk-media/image/upload/v1752876309/notes-assets/images/GitHub-Actions-Certification-Problem-Statement-Meeting-with-Dasher-Team/traditional-ci-cd-tools-challenges-github.jpg)

## Next Steps

In the following sections, we will build GitHub Actions workflows for our Node.js application, covering:

- Source code checkout and branch strategies
- Automated testing with Jest and coverage publishing
- Docker build, tagging, and registry push
- Kubernetes deployment with Helm charts
- Integration tests and security scans

Stay tuned for a hands-on implementation guide using GitHub Actions.

## References

- [GitHub Actions](https://docs.github.com/en/actions)
- [Docker](https://www.docker.com/)
- [Kubernetes](https://kubernetes.io/)
- [Trivy](https://github.com/aquasecurity/trivy)
- [KubeSec](https://github.com/controlplaneio/kubesec)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/f7702c28-34a1-40fc-9511-9bbc4940a4af/lesson/6c2f3086-9608-4b8f-b7d8-ace11a98585a)**
>
> Watch video content
