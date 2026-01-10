# What is Spacelift - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Spacelift-Elevate-Your-Infrastructure-Deployment/Spacelift-Basics/What-is-Spacelift)

---

## Table of Contents

- What is Spacelift
  - Core Concepts in Spacelift
  - Policy Management with Spacelift
  - Watch Video

---

## Content

Spacelift: Elevate Your Infrastructure Deployment

Spacelift Basics

# What is Spacelift

Spacelift is a specialized CI/CD tool tailored for Infrastructure as Code (IaC). It streamlines complex challenges such as state locking and concurrent runs with elegant, built-in solutions. Spacelift enhances your development workflow by enabling you to generate and preview plans before applying pull request changes.

In addition to its powerful plan preview capabilities, Spacelift offers advanced access control policies that let you define granular user permissions. For example, you can configure policies to prevent the creation of specific AWS EC2 instance types in a development environment, thereby effectively managing costs.

If you don’t have a dedicated backend for storing your IaC state, Spacelift can handle state management seamlessly. With built-in drift detection, the platform continuously ensures that your infrastructure remains consistent with its configuration.

> [!important]
> **Note**
>
> Spacelift not only simplifies CI/CD but also provides a robust framework for managing the lifecycle of your infrastructure deployments.

## Core Concepts in Spacelift

At the heart of Spacelift is the concept of a "stack." A stack represents the combination of your Infrastructure as Code source, the current state of your managed infrastructure (similar to a Terraform state file), and any associated environment variables or configurations. In the Spacelift UI, each repository and backend state you manage is organized as a separate stack.

![The image illustrates Spacelift concepts, showing a central "Stacks" icon connected to "Repo," "State," and "ENV Variables" components.](https://kodekloud.com/kk-media/image/upload/v1752884083/notes-assets/images/Spacelift-Elevate-Your-Infrastructure-Deployment-What-is-Spacelift/spacelift-stacks-repo-state-env.jpg)

## Policy Management with Spacelift

Spacelift leverages the Open Policy Agent (OPA) to enable you to write policies as code. This declarative approach allows you to enforce security and operational best practices. Key policy types include:

- **Login Policy:** Controls who is permitted to log into Spacelift.
- **Access Policy:** Determines which users have access to individual stacks.
- **Approval Policy:** Specifies who can approve or reject a run.

For more detailed information on Spacelift policies, please refer to the official Spacelift documentation.

![The image is a slide describing how Spacelift uses Open Policy Agent (OPA) to write policies as code, detailing various aspects like login, access, approval, and notifications.](https://kodekloud.com/kk-media/image/upload/v1752884084/notes-assets/images/Spacelift-Elevate-Your-Infrastructure-Deployment-What-is-Spacelift/spacelift-opa-policies-as-code.jpg)

> [!important]
> **Additional Information**
>
> For further details on how to implement and customize policies in Spacelift, check out the [Spacelift Documentation](https://spacelift.io/docs).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/spacelift-elevate-your-infrastructure-deployment/module/74dbb4df-716f-4fa2-92e9-a223a3a697ca/lesson/6a055f27-2d48-4c0b-87dc-2c65b3063097)**
>
> Watch video content
