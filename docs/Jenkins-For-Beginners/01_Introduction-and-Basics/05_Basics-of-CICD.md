# Basics of CICD - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-For-Beginners/Introduction-and-Basics/Basics-of-CICD)

---

## Table of Contents

- Basics of CICD
  - Source Code and Version Control
  - Challenges Without Continuous Integration
  - A CI/CD Scenario
  - Exploring Continuous Deployment and Delivery
  - Watch Video

---

## Content

Jenkins For Beginners

Introduction and Basics

# Basics of CICD

In this article, we delve into the fundamentals of Continuous Integration and Continuous Deployment (CI/CD), explaining how these methodologies streamline development, testing, and production deployments. By automating the integration and delivery process, CI/CD ensures code quality, faster turnaround, and improved collaboration among development teams.

## Source Code and Version Control

Every modern software project relies on a version control system to manage source code. Most projects store their code in Git repositories. While this article highlights Gitty as a Git hosting platform, the principles discussed apply equally to GitHub, GitLab, Bitbucket, and other similar platforms. These hubs not only manage Git repositories but also extend Git’s functionalities with powerful collaboration and integration features.

Typically, code on the main (or master) branch is regularly deployed to production. When introducing new features or modifying existing code, developers create a dedicated feature branch. This branch serves as an isolated environment where developers can commit changes. Once the feature is complete, a pull request is initiated to merge the changes back into the main branch. A comprehensive code review follows, ensuring that only high-quality, consistent code is integrated.

![The image illustrates a CI/CD process flow, showing the steps from feature branch creation, commit, pull request, review, and approval, to deployment and production. It includes explanatory text about the process and is labeled "Understanding CI/CD."](https://kodekloud.com/kk-media/image/upload/v1752879464/notes-assets/images/Jenkins-For-Beginners-Basics-of-CICD/ci-cd-process-flow-diagram.jpg)

After a successful merge into the main branch, the code is deployed to production using either manual or automated processes.

## Challenges Without Continuous Integration

Deploying code directly after merging, without continuous integration, can lead to several challenges:

- **Delayed Testing:** When multiple developers work on separate feature branches, postponing testing until after code integration can make it difficult to detect issues early—leading to potential defects in production.
- **Inefficient Deployment:** Without CI/CD, deployments across development, staging, and production environments tend to be manual, which increases the risk of errors and inconsistencies.
- **Quality Assurance Dependence:** Relying solely on manual testing elevates the risk of human error and may stretch team resources thin.

![The image illustrates a workflow for continuous integration, showing the process from feature branches to production, highlighting steps like commit, pull request, review, and merge. It also outlines challenges such as delayed testing, inefficient deployment, and quality assurance issues without continuous integration.](https://kodekloud.com/kk-media/image/upload/v1752879465/notes-assets/images/Jenkins-For-Beginners-Basics-of-CICD/continuous-integration-workflow-diagram.jpg)

> [!important]
> **Key Insight**
>
> Adopting CI/CD practices helps mitigate these challenges by automating testing and deployment, ensuring issues are detected and resolved early.

## A CI/CD Scenario

Consider the following scenario that demonstrates a typical CI/CD workflow:

1.  **Feature Branch A:**
    - Developer 1 creates a feature branch (A), makes necessary modifications, and commits the changes.
    - A pull request is generated to merge Feature Branch A into the main branch.
    - Before merging, a team member conducts a code review which triggers an automated CI pipeline.
    - The CI pipeline executes a variety of stages, including unit testing, dependency scanning, artifact building, and vulnerability assessments for both new and existing code.
    - Should any stage in the pipeline fail, the developer is prompted to amend the code and recommit. Once all tests pass, the pull request is approved and merged.
    - Following the merge, an additional CI pipeline run verifies that the integrated code operates as expected.

2.  **Feature Branch B:**
    - Concurrently, Developer 2 creates Feature Branch B, commits changes, and raises a pull request.
    - An automated CI pipeline tests the new code.
    - Once validated, the pull request is approved and the branch is merged into the main branch.
    - The main branch now contains combined updates from both Feature Branch A and B. A final CI pipeline run ensures that the full integration is seamless and error-free.

![The image illustrates a continuous integration workflow, showing the process from feature branch commits to production deployment, including steps like pull requests, review, and CI.](https://kodekloud.com/kk-media/image/upload/v1752879466/notes-assets/images/Jenkins-For-Beginners-Basics-of-CICD/continuous-integration-workflow-diagram-2.jpg)

This streamlined process allows multiple developers to collaborate on the same project simultaneously while ensuring that all new changes integrate smoothly, maintaining high quality and stability.

## Exploring Continuous Deployment and Delivery

Beyond continuous integration, the CI/CD model extends to automated application deployment.

Once code is integrated into the main branch and has passed the CI pipeline, deploying the application to an environment that mirrors production (such as staging or development) is highly recommended for live testing. In a typical CI/CD setup:

- **Continuous Deployment:** After the CI pipeline completes successfully in a feature branch, an automated CD pipeline may deploy the updated code to a staging environment. Post-deployment tests further validate the application. When these tests pass, the code is merged into the main branch, triggering another CI run that ultimately deploys the application to production automatically.
- **Continuous Delivery:** In certain cases, an additional manual approval step is introduced before the final deployment to production. This safeguards quality and compliance by incorporating human oversight into the process. Once the CI pipeline for the main branch is successful, the CD pipeline pauses, awaiting manual approval before deploying to production.

![The image is a flowchart illustrating a continuous deployment/delivery pipeline, showing stages from feature branch creation to production deployment, including continuous integration steps like unit testing and code scanning. It also depicts branching conditions for deploying to staging or production environments.](https://kodekloud.com/kk-media/image/upload/v1752879468/notes-assets/images/Jenkins-For-Beginners-Basics-of-CICD/continuous-deployment-pipeline-flowchart.jpg)

> [!important]
> **Deployment Caution**
>
> Always ensure that comprehensive tests are in place before introducing automated deployment, especially for production environments, to prevent potential downtime or deployment errors.

By implementing CI/CD practices, teams can not only reduce integration issues and deployment errors but also accelerate the entire delivery process. Adopting these processes leads to frequent, reliable releases and a more agile development environment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-for-beginners/module/d923e9ad-da6b-4f99-85ce-a148e17c27d2/lesson/ed94dad8-6a39-4475-8c47-47ba4719b357)**
>
> Watch video content
