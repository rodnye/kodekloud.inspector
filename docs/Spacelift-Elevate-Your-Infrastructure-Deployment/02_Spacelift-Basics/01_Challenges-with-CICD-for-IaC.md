# Challenges with CICD for IaC - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Spacelift-Elevate-Your-Infrastructure-Deployment/Spacelift-Basics/Challenges-with-CICD-for-IaC)

---

## Table of Contents

- Challenges with CICD for IaC
  - Watch Video

---

## Content

Spacelift: Elevate Your Infrastructure Deployment

Spacelift Basics

# Challenges with CICD for IaC

Integrating Infrastructure as Code (IaC) tools such as Terraform, Pulumi, or CloudFormation into your CI/CD pipeline introduces unique challenges compared to traditional application code. In this guide, we explore these challenges and provide insights into streamlining IaC deployments in modern environments.

One major advantage of IaC is the ability to store configuration files in version control systems like Git. Just as you manage application code with systems like GitHub or GitLab, IaC files benefit from versioning. In a typical workflow, pushing your code triggers a CI/CD pipeline that runs tests, linting, and formatting. For IaC, this pipeline should also execute a Terraform plan, outputting the plan for review. A designated team member can then decide whether to discard or approve the changes by running a Terraform apply to deploy the updates to the cloud.

![The image illustrates a CI/CD pipeline workflow involving GitHub, Terraform, and cloud providers like AWS, Azure, and Google Cloud, with a focus on Infrastructure as Code (IaC) using tools like Terraform and Pulumi.](https://kodekloud.com/kk-media/image/upload/v1752884065/notes-assets/images/Spacelift-Elevate-Your-Infrastructure-Deployment-Challenges-with-CICD-for-IaC/ci-cd-pipeline-github-terraform-iac.jpg)

When designing a CI/CD pipeline for IaC, you often encounter challenges not present with standard application code. For example, IaC tools depend on a back-end state (such as a Terraform state file stored in an S3 bucket or a similar service), which ensures that changes occur sequentially. During a CI/CD run triggered by a pull request, the pipeline may attempt to execute a Terraform plan or apply operation. These operations lock the state, ensuring that only one change is applied at a time and preventing potential state corruption.

Consider a scenario where one developer submits a pull request that triggers a CI/CD run to execute a Terraform plan. If, at the same time, another developer submits a pull request with additional changes, the concurrent pipeline run will also try to plan or apply changes. However, it will fail because the state is already locked.

![The image illustrates a CI/CD process for infrastructure using Terraform, showing a successful plan/apply on the left and a failure on the right due to the state being locked.](https://kodekloud.com/kk-media/image/upload/v1752884066/notes-assets/images/Spacelift-Elevate-Your-Infrastructure-Deployment-Challenges-with-CICD-for-IaC/ci-cd-infrastructure-terraform-process.jpg)

> [!important]
> **Key Insight**
>
> Traditional CI/CD tools are typically designed with stateless applications in mind. This design often makes handling the state locks required by IaC tools more complex. While you can configure these tools to handle state locks, the increased complexity may hinder smooth operations.

When using CI/CD pipelines for IaC, you must also account for the varying access policies across different environments. For example, in a production environment, developers might be limited to proposing changes, while only team leads or managers have permission to apply them. In contrast, QA and development environments might allow for more liberal change applications. The CI/CD pipeline needs to enforce these policies by dynamically managing permissions based on the target environment.

![The image illustrates an access control flowchart with three stages: proposing changes to "Prod," and applying changes to "QA" and "Dev," each associated with a different person icon.](https://kodekloud.com/kk-media/image/upload/v1752884066/notes-assets/images/Spacelift-Elevate-Your-Infrastructure-Deployment-Challenges-with-CICD-for-IaC/access-control-flowchart-changes.jpg)

As policy complexity increases, managing IaC through traditional CI/CD tools becomes more challenging. This complexity often prompts organizations to explore specialized solutions designed to tackle these unique infrastructure deployment hurdles. For instance, consider exploring [Spacelift: Elevate Your Infrastructure Deployment](https://learn.kodekloud.com/user/courses/spacelift-elevate-your-infrastructure-deployment) for a tailored approach to managing IaC challenges.

> [!important]
> **Important Reminder**
>
> Always verify that your CI/CD pipeline is configured to handle state locks properly and conform to your organization’s access policies across environments. Misconfigurations can lead to deployment failures and potential state corruption.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/spacelift-elevate-your-infrastructure-deployment/module/74dbb4df-716f-4fa2-92e9-a223a3a697ca/lesson/de7d6705-9ce5-4afa-80b0-4c2594b83ebb)**
>
> Watch video content
