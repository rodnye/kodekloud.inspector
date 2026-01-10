# CodePipeline - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/AWS-CICD-Developer-Tools/CodePipeline)

---

## Table of Contents

- CodePipeline
  - Key Pipeline Stages
  - Advanced Features of CodePipeline
  - Summary
  - Watch Video

---

## Content

AWS Certified Developer - Associate

AWS CICD Developer Tools

# CodePipeline

In this lesson, we explore AWS CodePipeline—a continuous integration and delivery (CI/CD) service that automates the build, test, and deployment phases of your software release process. By streamlining these steps, CodePipeline enables rapid and dependable delivery of new features and updates.

AWS CodePipeline integrates with AWS services like CodeCommit, CodeBuild, and CodeDeploy, allowing you to effortlessly build CI/CD pipelines for deploying applications across environments (such as QA, staging, and production). The typical workflow is outlined below:

- When code is pushed to CodeCommit, CodePipeline is triggered.
- The pipeline forwards the code to CodeBuild, which performs formatting, linting, and testing.
- After successful tests, CodeBuild produces a build artifact that it passes to CodeDeploy.
- CodeDeploy then deploys the artifact to the designated compute platform (e.g., EC2, Lambda, or ECS).

This automated workflow also supports manual review steps prior to progressing to production.

![The image illustrates an AWS CodePipeline workflow, showing stages from AWS CodeCommit to CodeBuild, CodeDeploy, and manual review, leading to staging and production environments.](https://kodekloud.com/kk-media/image/upload/v1752858056/notes-assets/images/AWS-Certified-Developer-Associate-CodePipeline/aws-codepipeline-workflow-diagram.jpg)

The diagram above clearly demonstrates how CodePipeline connects various AWS services to construct robust CI/CD pipelines. Rather than adding new features, its primary focus lies in orchestrating the automation process.

## Key Pipeline Stages

When designing a CI/CD pipeline with CodePipeline, the process generally involves the following stages:

1.  **Source Stage**  
    The source stage triggers every time new code is pushed to CodeCommit, retrieving the most recent version of the codebase.
2.  **Build Stage**  
    CodeBuild compiles the source code, executing tests and generating a build artifact—a packaged version of your application ready for deployment.
3.  **Deploy Stage**  
    The deploy stage leverages CodeDeploy, which takes the build artifact from CodeBuild and deploys it to the specified environment.

To efficiently transition code artifacts between stages, CodePipeline uses artifacts generated at each step, ensuring seamless propagation of the application throughout the pipeline.

![The image illustrates an AWS CodePipeline workflow, showing the sequence from AWS CodeCommit to CodeBuild, CodeDeploy, and finally to AWS EC2.](https://kodekloud.com/kk-media/image/upload/v1752858057/notes-assets/images/AWS-Certified-Developer-Associate-CodePipeline/aws-codepipeline-workflow-diagram-2.jpg)

> [!important]
> **Artifact Management**
>
> Artifacts are crucial in CodePipeline as they encapsulate the state of your application at various stages, guaranteeing consistency from source code commits to production deployments.

## Advanced Features of CodePipeline

AWS CodePipeline goes beyond basic pipeline orchestration by offering advanced functionalities:

- **Automated Pipeline Processes**  
  Fully automate the build, test, and deploy phases to maintain an efficient CI/CD workflow.
- **Flexible Workflow Modeling**  
  Define multiple stages with one or more actions within each. In addition to AWS’s predefined actions, you can configure custom actions tailored to your requirements.
- **Manual Approval Steps**  
  Integrate manual approval processes to review changes before they move to production, ensuring higher quality control.
- **Third-Party Integrations**  
  Seamlessly integrate with external tools like GitHub, Bitbucket, and Jenkins, allowing you to maintain your preferred development environment.

![The image lists four features: automated pipelines, integration with AWS services, flexible workflow modeling and custom actions, and manual approval steps. Each feature is represented with an icon and a number.](https://kodekloud.com/kk-media/image/upload/v1752858058/notes-assets/images/AWS-Certified-Developer-Associate-CodePipeline/features-automated-pipelines-aws-integration.jpg)

> [!important]
> **Security Note**
>
> Ensure you configure proper identity and access management (IAM) policies when integrating CodePipeline with other AWS services and third-party tools to maintain a secure CI/CD process.

## Summary

AWS CodePipeline automates the entire release lifecycle by coordinating services such as CodeCommit, CodeBuild, and CodeDeploy. Leveraging artifacts for data transfer between stages and incorporating manual approvals where necessary, CodePipeline establishes a robust framework for continuous integration and delivery.

![The image is a summary slide highlighting four points about a process: automating build, test, and deploy phases; orchestrating CodeCommit, CodeBuild, and CodeDeploy; passing artifacts between pipeline stages; and supporting manual approvals.](https://kodekloud.com/kk-media/image/upload/v1752858059/notes-assets/images/AWS-Certified-Developer-Associate-CodePipeline/automating-build-test-deploy-summary.jpg)

For more details on setting up and optimizing your CI/CD pipelines on AWS, consider exploring the following resources:

- [AWS CodePipeline Documentation](https://docs.aws.amazon.com/codepipeline/)
- [AWS Continuous Integration and Continuous Delivery](https://aws.amazon.com/devops/continuous-integration/)
- [AWS Developer Tools Blog](https://aws.amazon.com/blogs/devops/)

By mastering AWS CodePipeline, you can significantly enhance your deployment workflows—achieving faster, more reliable releases while maintaining high standards of quality and security.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/184641b0-93ba-48d1-a9d7-1bc2b57db724/lesson/c0cf07e8-97c3-4ff3-ab64-32821d32a22b)**
>
> Watch video content
