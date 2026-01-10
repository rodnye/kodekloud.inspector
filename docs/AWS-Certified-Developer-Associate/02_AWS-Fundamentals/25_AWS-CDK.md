# AWS CDK - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/AWS-Fundamentals/AWS-CDK)

---

## Table of Contents

- AWS CDK
  - Key Features and Benefits
  - Watch Video

---

## Content

AWS Certified Developer - Associate

AWS Fundamentals

# AWS CDK

In this article, we explore the AWS Cloud Development Kit (CDK)—an innovative infrastructure-as-code tool that streamlines resource management on AWS. Unlike AWS CloudFormation, which uses JSON or YAML templates, AWS CDK enables you to define infrastructure using familiar programming languages such as Python, JavaScript, Java, and .NET. This approach leverages the rich ecosystem of libraries, packages, and testing frameworks to create more dynamic, robust, and maintainable scripts.

When you build a CDK application, you work with constructs. These constructs are pre-configured blueprints that follow AWS best practices, simplifying resource provisioning. Under the hood, AWS CDK translates your high-level code into CloudFormation templates. For instance, running the command `cdk synth` generates the corresponding CloudFormation template, and executing `cdk deploy` deploys the stack to AWS.

Moreover, AWS CDK supports a wide range of programming languages, allowing you to choose the one that best aligns with your team's expertise.

![The image is a diagram illustrating the process of using AWS CDK to create CloudFormation templates from a CDK app, which are then deployed to AWS. It shows the flow from constructs in the CDK app to stacks in AWS CloudFormation, with programming languages like TypeScript, JavaScript, Java, .NET, and Python indicated at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752858103/notes-assets/images/AWS-Certified-Developer-Associate-AWS-CDK/aws-cdk-cloudformation-diagram.jpg)

## Key Features and Benefits

1.  **Declarative Infrastructure**: Define your infrastructure in a clear and declarative manner through code. This makes deployments transparent, repeatable, and predictable.
2.  **Code Reusability**: Leverage a rich library of pre-built constructs and share custom components with the community, reducing duplication of effort.
3.  **Automated Synthesis**: Automatically generate CloudFormation templates from your application code, ensuring consistency across deployments.
4.  **Environment Agnosticism**: Write your infrastructure code once and deploy it seamlessly across different environments using parameterized configurations.

![The image lists five features: Declarative Approach, Component Reusability, AWS Construct Library, Automated Synthesis, and Environment Agnosticism, each represented with an icon.](https://kodekloud.com/kk-media/image/upload/v1752858104/notes-assets/images/AWS-Certified-Developer-Associate-AWS-CDK/features-declarative-reusability-aws-icons.jpg)

> [!important]
> **Did you know?**
>
> AWS CDK integrates seamlessly with various AWS services, enabling the construction of powerful and automated CI/CD pipelines for efficient infrastructure management.

AWS CDK not only simplifies resource provisioning but also integrates with other AWS services to support comprehensive CI/CD pipelines. For example, you might update your CDK application and commit changes to AWS CodeCommit, triggering a pipeline in [AWS CodePipeline (CI/CD Pipeline)](https://learn.kodekloud.com/user/courses/aws-codepipeline-ci-cd-pipeline). Within this pipeline, tasks such as running `cdk synth` to generate CloudFormation templates, executing unit tests, building artifacts, and ultimately deploying AWS resources are automated.

![The image illustrates a CDK Pipeline workflow using AWS services, including AWS CodeCommit, AWS CodePipeline, AWS CodeBuild, AWS CloudFormation, and a CloudFormation stack with S3, EC2, VPC, and RDS.](https://kodekloud.com/kk-media/image/upload/v1752858105/notes-assets/images/AWS-Certified-Developer-Associate-AWS-CDK/cdk-pipeline-aws-services-workflow.jpg)

This integrated approach enhances the overall lifecycle management of your infrastructure and maximizes the effectiveness of AWS services in your CI/CD workflows.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/6d3acaeb-020a-4e1e-9bd0-5fc6c50eb164/lesson/4c7d5ca2-3efc-4d3c-966a-936a59f8848e)**
>
> Watch video content
