# Problem Statement Meeting with Dasher Team - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/Introduction/Problem-Statement-Meeting-with-Dasher-Team)

---

## Table of Contents

- Problem Statement Meeting with Dasher Team
  - Workflow Challenges and Automation Roadmap
  - Comparing CI/CD Tools
  - Jenkins Setup Complexity
  - Next Steps: Building with GitHub Actions
  - Links and References
  - Watch Video

---

## Content

GitHub Actions

Introduction

# Problem Statement Meeting with Dasher Team

In this lesson, we’ll explore how GitHub Actions can fulfill Dasher Technology’s DevOps prerequisites. Dasher Technology provides a platform that connects data, applications, and devices across on-premise environments. Their R&D team is migrating to the cloud with container technologies, starting with a Node.js project and later supporting Java and Python applications.

Alice leads the DevOps initiative, building a pipeline from scratch on multi-cloud infrastructure using Docker and Kubernetes. Her initial audit uncovered critical workflow gaps in the existing Node.js project:

- No version control system
- Manual, slow testing
- Risky, manual deployments to development, staging, and production

To address these challenges, the team outlined five key objectives:

- Adopt GitHub for version control and collaboration
- Automate unit testing and measure code coverage
- Build and push Docker images
- Deploy to Kubernetes clusters
- Integrate automated end-to-end testing

![The image outlines the DevOps requirements for the Task Dash Team, highlighting processes like code integration, collaboration, manual testing, and deployment, with a focus on unit testing, code coverage, building, and pushing. It features icons for Node.js, GitHub, and Docker, and includes a character named Alice.](https://kodekloud.com/kk-media/image/upload/v1752876713/notes-assets/images/GitHub-Actions-Problem-Statement-Meeting-with-Dasher-Team/devops-requirements-task-dash-team.jpg)

---

## Workflow Challenges and Automation Roadmap

Alice also plans to add automated integration testing as a final step. Successful execution of these stages will eliminate current pain points—but first, the team must choose a CI/CD tool.

![The image outlines the DevOps requirements for the Task Dash Team, highlighting processes like code integration, collaboration, and deployment, with a focus on automation and tools like Docker and Kubernetes.](https://kodekloud.com/kk-media/image/upload/v1752876715/notes-assets/images/GitHub-Actions-Problem-Statement-Meeting-with-Dasher-Team/devops-requirements-task-dash-team-2.jpg)

---

## Comparing CI/CD Tools

The team evaluated several popular CI/CD platforms:

| Tool      | Type                     | Key Features                                |
| --------- | ------------------------ | ------------------------------------------- |
| Jenkins   | Open source, self-hosted | Highly extensible with thousands of plugins |
| Travis CI | Cloud-hosted             | Native GitHub integration                   |
| CircleCI  | Cloud/CVM                | Flexible resource classes                   |
| Bamboo    | Commercial               | Integrated with Atlassian suite             |
| Spinnaker | Open source              | Multi-cloud deployment pipelines            |

![The image lists DevOps tools with their logos: Jenkins, Travis CI, Circle CI, Atlassian Bamboo, and Spinnaker.](https://kodekloud.com/kk-media/image/upload/v1752876716/notes-assets/images/GitHub-Actions-Problem-Statement-Meeting-with-Dasher-Team/devops-tools-logos-jenkins-travis-circle.jpg)

> [!important]
> **Warning**
>
> Self-hosting Jenkins requires provisioning infrastructure, managing plugins, and ensuring compatibility across multiple language runtimes.

---

## Jenkins Setup Complexity

To stand up a Jenkins server for the Node.js pipeline, Alice’s team must:

1.  Provision a VM with sufficient CPU, memory, and disk
2.  Install and configure Java JDK, firewall rules, and Jenkins plugins
3.  Install Node.js and npm (multiple versions)
4.  Install Docker for container builds
5.  Add Kubernetes tools (`kubectl`, Helm, etc.)
6.  Set up external integration testing and reporting tools

![The image illustrates challenges with traditional CI/CD tools, showing a sequence of steps like unit testing, code coverage, build, push, deploy, and automated IT, along with icons for technologies like Node.js, Docker, Kubernetes, and Helm.](https://kodekloud.com/kk-media/image/upload/v1752876717/notes-assets/images/GitHub-Actions-Problem-Statement-Meeting-with-Dasher-Team/ci-cd-challenges-sequence-diagram.jpg)

As more projects (Java/Maven, Python/AWS CLI) and DevSecOps tools (Trivy, KubeSec) join the pipeline, this approach becomes increasingly time-consuming and error-prone.

> [!important]
> **Note**
>
> GitHub Actions offers a native, cloud-scalable CI/CD solution directly within your GitHub repository—no separate servers required.

---

## Next Steps: Building with GitHub Actions

In the upcoming sections, we’ll create GitHub Actions workflows for a real-world Node.js application. You’ll learn how to:

- Automate code integration, linting, and unit testing
- Build and push Docker images to a registry
- Deploy to Kubernetes using Helm
- Run end-to-end integration tests

By the end of this lesson, you’ll have a complete, cloud-native CI/CD pipeline that meets Dasher Technology’s requirements with minimal infrastructure maintenance.

---

## Links and References

- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Getting Started](https://docs.docker.com/get-started/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/a038043a-b553-43c2-9748-2c91fa232a9b/lesson/dca7fdee-6afa-4fbb-a76e-8029aa525025)**
>
> Watch video content
