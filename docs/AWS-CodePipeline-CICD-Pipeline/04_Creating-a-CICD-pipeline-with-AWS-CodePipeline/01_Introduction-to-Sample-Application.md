# Introduction to Sample Application - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-CodePipeline-CICD-Pipeline/Creating-a-CICD-pipeline-with-AWS-CodePipeline/Introduction-to-Sample-Application)

---

## Table of Contents

- Introduction to Sample Application
  - Table of Contents
  - Pipeline Configurations Overview
  - Lab 1: S3 → CodeDeploy (Two-Stage Pipeline)
  - Lab 2: CodeCommit → CodeDeploy (Two-Stage with Git)
  - Lab 3: Add Build & Test Stages (Four-Stage Pipeline)
  - Summary of Pipeline Variants
  - Next Steps & References
  - Watch Video
    - Links and References

---

## Content

AWS CodePipeline (CI/CD Pipeline)

Creating a CICD pipeline with AWS CodePipeline

# Introduction to Sample Application

Welcome to this hands-on tutorial on AWS CodePipeline. In this lesson, you’ll explore three CI/CD pipeline configurations for a sample application. We start with a minimal two-stage design and progressively add Build and Test stages to demonstrate a fully managed AWS pipeline.

## Table of Contents

1.  [Pipeline Configurations Overview](#pipeline-configurations-overview)
2.  [Lab 1: S3 → CodeDeploy (Two-Stage Pipeline)](#lab-1-s3--codedeploy-two-stage-pipeline)
3.  [Lab 2: CodeCommit → CodeDeploy (Two-Stage with Git)](#lab-2-codecommit--codedeploy-two-stage-with-git)
4.  [Lab 3: Add Build & Test Stages (Four-Stage Pipeline)](#lab-3-add-build--test-stages-four-stage-pipeline)
5.  [Summary of Pipeline Variants](#summary-of-pipeline-variants)
6.  [Next Steps & References](#next-steps--references)

---

## Pipeline Configurations Overview

AWS CodePipeline orchestrates the flow from source to deployment through automated stages. In this tutorial, we’ll cover:

- Two-stage pipeline with **Source** and **Deploy**
- Git-based source using AWS CodeCommit
- Four-stage pipeline with **Build** and **Test** phases added

---

## Lab 1: S3 → CodeDeploy (Two-Stage Pipeline)

In our first lab, we use Amazon S3 (with versioning enabled) as the source and AWS CodeDeploy to deploy artifacts to EC2 instances. This setup demonstrates the minimal viable CI/CD pipeline.

> [!important]
> **Note**
>
> Ensure your S3 bucket has versioning enabled to track every deployment artifact.

![The image illustrates a DevOps process flow using AWS services, featuring Amazon S3 as the source and AWS CodeDeploy and EC2 for deployment.](https://kodekloud.com/kk-media/image/upload/v1752862743/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Introduction-to-Sample-Application/devops-process-flow-aws-s3-codedeploy-ec2.jpg)

**Key Steps**

1.  Create an S3 bucket with versioning
2.  Define a CodePipeline with Source → Deploy stages
3.  Configure CodeDeploy application and deployment group targeting EC2

---

## Lab 2: CodeCommit → CodeDeploy (Two-Stage with Git)

Next, we replace S3 with AWS CodeCommit, AWS’s managed Git repository, as our source. The two-stage pattern remains—CodeCommit feeds directly into CodeDeploy on EC2.

> [!important]
> **Warning**
>
> Make sure your CodeCommit repository has the correct [IAM permissions](https://docs.aws.amazon.com/codecommit/latest/userguide/setting-up.html) for CodePipeline access.

![The image illustrates a DevOps process flow with AWS services, featuring AWS CodeCommit for source control and AWS CodeDeploy for deployment, integrated with AWS EC2.](https://kodekloud.com/kk-media/image/upload/v1752862745/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Introduction-to-Sample-Application/devops-process-flow-aws-services.jpg)

**Key Steps**

1.  Initialize a Git repo in CodeCommit
2.  Grant CodePipeline service role access to CodeCommit
3.  Define pipeline stages: Source (CodeCommit) → Deploy (CodeDeploy)

---

## Lab 3: Add Build & Test Stages (Four-Stage Pipeline)

In our final demonstration, we enhance the pipeline by inserting **Build** and **Test** phases between Source and Deploy. This ensures code quality and automated testing before deployment.

**Stages**

- **Source**: CodeCommit
- **Build**: AWS CodeBuild
- **Test**: Custom test runner or CodeBuild project
- **Deploy**: AWS CodeDeploy

**Benefits**

- Automated compilation and unit testing
- Early detection of code defects
- Streamlined continuous delivery process

---

## Summary of Pipeline Variants

| Lab   | Source         | Build         | Test               | Deploy     | Description                                |
| ----- | -------------- | ------------- | ------------------ | ---------- | ------------------------------------------ |
| Lab 1 | Amazon S3      | –             | –                  | CodeDeploy | Minimal two-stage pipeline                 |
| Lab 2 | AWS CodeCommit | –             | –                  | CodeDeploy | Git-based two-stage pipeline               |
| Lab 3 | AWS CodeCommit | AWS CodeBuild | Custom/Test Runner | CodeDeploy | Full four-stage pipeline with build & test |

---

## Next Steps & References

Ready to dive into Lab 1? Proceed to [Lab 1: S3 → CodeDeploy](#lab-1-s3--codedeploy-two-stage-pipeline) and start configuring your pipeline.

### Links and References

- [AWS CodePipeline Documentation](https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome.html)
- [AWS CodeCommit User Guide](https://docs.aws.amazon.com/codecommit/latest/userguide/what-is-codecommit.html)
- [AWS CodeBuild Overview](https://docs.aws.amazon.com/codebuild/latest/userguide/welcome.html)
- [AWS CodeDeploy Developer Guide](https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-codepipeline-ci-cd-pipeline/module/d0ecdc6d-aba5-4798-80c9-171edb45c9dc/lesson/4caa4e2d-d6a7-4c05-bc01-cd2184eafe3e)**
>
> Watch video content
