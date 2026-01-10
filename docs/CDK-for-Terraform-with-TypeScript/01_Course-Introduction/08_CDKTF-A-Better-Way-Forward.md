# CDKTF A Better Way Forward - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CDK-for-Terraform-with-TypeScript/Course-Introduction/CDKTF-A-Better-Way-Forward)

---

## Table of Contents

- CDKTF A Better Way Forward
  - How CDKTF Works
  - Watch Video
    - 1. Programming Languages
    - 2. The CDKTF Abstraction Layer
    - 3. Terraform Core Engine
    - 4. Terraform Provider Ecosystem

---

## Content

CDK for Terraform with TypeScript

Course Introduction

# CDKTF A Better Way Forward

In this article, we introduce the Cloud Development Kit for Terraform (CDKTF), a powerful tool that overcomes some of the limitations discussed earlier in Infrastructure as Code (IaC) practices.

CDKTF empowers developers to write IaC using familiar programming languages like TypeScript, Python, Java, C#, and Go. This means you’re no longer confined to Terraform's native HashiCorp Configuration Language (HCL) but can leverage your language of choice for more flexible and maintainable code.

> [!important]
> **Key Benefit**
>
> By using familiar programming languages, CDKTF makes it easier for developers to integrate infrastructure configurations into their existing application codebases, fostering better collaboration between development and operations teams.

## How CDKTF Works

The following diagram illustrates the layered architecture of CDKTF and its integration with Terraform:

![The image is a diagram illustrating the Cloud Development Kit for Terraform (CDKTF), showing how various programming languages and formats integrate with Terraform to manage multiple cloud providers.](https://kodekloud.com/kk-media/image/upload/v1752869578/notes-assets/images/CDK-for-Terraform-with-TypeScript-CDKTF-A-Better-Way-Forward/cdktf-terraform-cloud-integration-diagram.jpg)

### 1\. Programming Languages

At the highest layer, developers can use popular languages such as TypeScript, Python, Java, C#, and Go. This flexibility lets you write IaC in a language you’re already comfortable with.

### 2\. The CDKTF Abstraction Layer

The core of CDKTF lies in its abstraction layer, which translates high-level programming constructs into low-level Terraform configurations. This layer supports:

- **Custom Resource Definitions:** Extend Terraform with your own custom constructs.
- **Multi-format Support:** Seamlessly integrates with both JSON and HCL, allowing you to combine new configurations with existing Terraform code.

### 3\. Terraform Core Engine

Once CDKTF generates the configurations, they are converted into Terraform’s declarative syntax. The Terraform engine then processes these configurations, taking advantage of its robust state management, planning, and execution capabilities.

### 4\. Terraform Provider Ecosystem

The final step leverages Terraform’s extensive ecosystem. With support for over 3,000 providers, you can manage a diverse array of resources across major cloud platforms like AWS, Azure, and Google Cloud.

> [!important]
> **Summary**
>
> CDKTF bridges the gap between developers and infrastructure teams. It enables you to define infrastructure in familiar programming languages while still reaping the full benefits of Terraform’s ecosystem for state management, planning, and execution.

In the next section, we will demonstrate how to implement CDKTF in a practical scenario, providing you with a step-by-step guide to integrating it into your workflow.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cdk-for-terraform-with-typescript/module/813d9207-e35e-4698-babc-436986515d19/lesson/213dc04d-3f86-4e0a-831f-021da5dc1d44)**
>
> Watch video content
