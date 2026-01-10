# Repositories - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-CodePipeline-CICD-Pipeline/CICD-Pipeline-with-CodeCommit-CodeBuild-and-CodeDeploy/Repositories)

---

## Table of Contents

- Repositories
  - What Is a Repository?
  - Comparison of Repository Services
  - GitHub
  - Bitbucket
  - AWS CodeCommit
  - Amazon S3
  - Summary
  - Links and References
  - Watch Video

---

## Content

AWS CodePipeline (CI/CD Pipeline)

CICD Pipeline with CodeCommit CodeBuild and CodeDeploy

# Repositories

Welcome to the deep dive on repositories for your AWS CI/CD pipeline. In this lesson, we’ll explore how repositories enable version control, collaboration, and seamless integration with AWS services.

We’ll cover:

- What a repository is and its core benefits
- Git-based hosting: [GitHub](https://github.com) and [Bitbucket](https://bitbucket.org)
- AWS’s native Git service: [AWS CodeCommit](https://aws.amazon.com/codecommit/)
- Using [Amazon S3](https://aws.amazon.com/s3/) as a pipeline source

By the end, you’ll know which repository solution fits your workflow and how it ties into AWS CodePipeline.

## What Is a Repository?

A repository (repo) is a version control system that records changes to files over time. With version control, you can:

- Revert to previous states without manual backups
- Collaborate across distributed teams
- Develop features or fixes on isolated branches
- Merge approved changes back into the main codebase

Instead of duplicating files before edits, a repo automates tracking, branching, and merging.

![The image shows a diagram with a central document surrounded by four developers, illustrating collaboration features like tracking changes, independent resolution, and simultaneous work.](https://kodekloud.com/kk-media/image/upload/v1752862652/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Repositories/collaboration-diagram-developers-document.jpg)

## Comparison of Repository Services

| Service        | Hosting Type   | Key Features                                         |
| -------------- | -------------- | ---------------------------------------------------- |
| GitHub         | Cloud Git      | Pull requests, branch protection, community packages |
| Bitbucket      | Cloud Git      | Free private repos, built-in pipelines               |
| AWS CodeCommit | Managed Git    | IAM integration, encryption, unlimited repo size     |
| Amazon S3      | Object Storage | File versioning, high durability (no Git workflows)  |

## GitHub

[GitHub](https://github.com) is the most popular cloud-based Git hosting platform. Core workflows include:

- Creating or cloning repositories
- Committing changes with descriptive messages
- Pushing updates and opening pull requests
- Reviewing, approving, and merging code

These capabilities make GitHub ideal for open-source and enterprise projects alike.

## Bitbucket

[Bitbucket](https://bitbucket.org) offers Git hosting with free private repositories and integrated CI/CD pipelines (Bitbucket Pipelines). It supports standard Git commands and can migrate repos into AWS CodeCommit for a fully AWS-centric workflow.

## AWS CodeCommit

[AWS CodeCommit](https://aws.amazon.com/codecommit/) is a fully managed, cloud-native Git service. It supports all standard Git operations and integrates seamlessly with other AWS developer tools.

> [!important]
> **Note**
>
> AWS CodeCommit integrates natively with AWS IAM, enabling granular access control and audit trails.

![The image is a split graphic with information about AWS CodeCommit on the right, highlighting its features such as being an AWS service, cloud-based, supporting Git commands, and GitHub compatibility. The left side lists these features with corresponding color-coded icons.](https://kodekloud.com/kk-media/image/upload/v1752862654/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Repositories/aws-codecommit-features-graphic.jpg)

Key benefits:

- Fully managed backups, scaling, and maintenance
- Unlimited repository size—pay only for storage used
- Encryption at rest and in transit with IAM policies
- High availability with built-in redundancy
- Native integration with CodeBuild, CodeDeploy, and CodePipeline

![The image is a promotional graphic for AWS CodeCommit, highlighting features such as being fully managed, scalable, secure, highly available, and cloud-based.](https://kodekloud.com/kk-media/image/upload/v1752862654/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Repositories/aws-codecommit-promotional-graphic.jpg)

## Amazon S3

[Amazon S3](https://aws.amazon.com/s3/) serves as an alternative source for your pipeline, offering:

- File versioning to restore previous object versions
- Monitoring and lifecycle management

> [!important]
> **Warning**
>
> Amazon S3 does not support branches or pull requests like Git-based services. Use it for artifacts or simple file versioning only.

## Summary

In this lesson, we explored:

1.  The role of a repository in version control and collaboration
2.  Git hosting options: GitHub and Bitbucket
3.  AWS CodeCommit’s managed Git features
4.  Amazon S3 as a non-Git source with versioning

![The image is a summary slide listing four topics: "Repository and the benefits," "GitHub," "AWS CodeCommit," and "Amazon Simple Storage Service (AWS S3)."](https://kodekloud.com/kk-media/image/upload/v1752862655/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Repositories/repository-benefits-github-aws-s3.jpg)

Next, we’ll dive into AWS CodeBuild to automate build processes.

## Links and References

- [GitHub](https://github.com)
- [Bitbucket](https://bitbucket.org)
- [AWS CodeCommit](https://aws.amazon.com/codecommit/)
- [Amazon S3](https://aws.amazon.com/s3/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-codepipeline-ci-cd-pipeline/module/8236e523-f637-4f0a-98c2-0accfd2cb74e/lesson/45c98db6-050a-415e-9c5d-5812382eea18)**
>
> Watch video content
