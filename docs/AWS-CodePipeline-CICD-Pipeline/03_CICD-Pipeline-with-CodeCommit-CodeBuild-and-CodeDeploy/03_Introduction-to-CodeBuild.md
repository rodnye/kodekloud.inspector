# Introduction to CodeBuild - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-CodePipeline-CICD-Pipeline/CICD-Pipeline-with-CodeCommit-CodeBuild-and-CodeDeploy/Introduction-to-CodeBuild)

---

## Table of Contents

- Introduction to CodeBuild
  - Why Choose AWS CodeBuild?
  - Supported Source Repositories
  - Integrating or Replacing Jenkins
  - Links and References
  - Watch Video
    - Feature Comparison

---

## Content

AWS CodePipeline (CI/CD Pipeline)

CICD Pipeline with CodeCommit CodeBuild and CodeDeploy

# Introduction to CodeBuild

Welcome to this lesson on AWS CodeBuild. In this module, we’ll explore how CodeBuild fits into the **Build** phase of your CI/CD pipeline, automating compilation, testing, and artifact generation. By integrating CodeBuild, you can achieve a fully managed, scalable build process that feeds seamlessly into Continuous Deployment.

![The image illustrates a CI/CD pipeline with stages labeled Source, Build, Test, and Deploy, featuring AWS CodeBuild. It includes an infinity loop symbolizing continuous integration and delivery.](https://kodekloud.com/kk-media/image/upload/v1752862640/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Introduction-to-CodeBuild/ci-cd-pipeline-aws-codebuild.jpg)

## Why Choose AWS CodeBuild?

AWS CodeBuild is a serverless, fully managed build service that scales with your workload. Key advantages include:

- **Fully managed**: No need to provision or maintain build servers.
- **Scalable**: Run multiple builds in parallel without limits.
- **Secure**: Leverage AWS IAM for permissions and AWS KMS for artifact encryption.

> [!important]
> **Note**
>
> You’re billed only for the compute minutes consumed by your builds, making CodeBuild cost-effective for fluctuating workloads.

![The image is a split screen with the left side listing features like "Fully managed," "Scalable," and "IAM," and the right side displaying the AWS CodeBuild logo with a crane and code symbol.](https://kodekloud.com/kk-media/image/upload/v1752862641/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Introduction-to-CodeBuild/aws-codebuild-features-split-screen.jpg)

## Supported Source Repositories

CodeBuild integrates with popular source providers:

| Resource Type  | Link                               | Description                    |
| -------------- | ---------------------------------- | ------------------------------ |
| Amazon S3      | https://aws.amazon.com/s3/         | Store build inputs and outputs |
| AWS CodeCommit | https://aws.amazon.com/codecommit/ | Managed Git repositories       |
| GitHub         | https://github.com                 | Public & private code hosting  |
| Bitbucket      | https://bitbucket.org              | Atlassian’s Git platform       |

![The image shows a DevOps CI/CD pipeline diagram with stages labeled Source, Build, Test, and Deploy, alongside icons for AWS Cloud services (Amazon S3, AWS CodeCommit) and third-party services (GitHub, Bitbucket).](https://kodekloud.com/kk-media/image/upload/v1752862642/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Introduction-to-CodeBuild/devops-cicd-pipeline-diagram-aws-github.jpg)

## Integrating or Replacing Jenkins

If you use [Jenkins](https://www.jenkins.io/), you can either:

1.  **Replace** Jenkins entirely with CodeBuild for an all-AWS solution.
2.  **Integrate** Jenkins and CodeBuild by installing the AWS CodeBuild plugin, offloading build jobs to CodeBuild while maintaining existing pipelines.

![The image shows a DevOps lifecycle diagram with stages labeled Source, Build, Test, and Deploy, alongside logos for AWS CodeBuild and Jenkins.](https://kodekloud.com/kk-media/image/upload/v1752862643/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Introduction-to-CodeBuild/devops-lifecycle-diagram-source-build-test-deploy.jpg)

### Feature Comparison

| Aspect      | AWS CodeBuild                    | Jenkins                                 |
| ----------- | -------------------------------- | --------------------------------------- |
| Hosting     | Serverless, fully managed by AWS | Requires self-managed servers or agents |
| Scalability | Automatic, parallel builds       | Manual scaling of worker nodes          |
| Security    | IAM roles & KMS encryption       | Plugin-based or custom configuration    |
| Ecosystem   | Native AWS integrations          | Large plugin ecosystem, external to AWS |

![The image shows a comparison between AWS CodeBuild and Jenkins, with AWS CodeBuild labeled as part of the AWS Cloud and Jenkins as a third-party tool.](https://kodekloud.com/kk-media/image/upload/v1752862644/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Introduction-to-CodeBuild/aws-codebuild-jenkins-comparison.jpg)

That wraps up our high-level overview of AWS CodeBuild. In the next lesson, we’ll dive into:

- Configuring CodeBuild projects
- Writing and customizing `buildspec.yml` files
- Optimizing build environments for performance

Stay tuned!

## Links and References

- [AWS CodeBuild Documentation](https://docs.aws.amazon.com/codebuild)
- [AWS CodePipeline Overview](https://aws.amazon.com/codepipeline/)
- [Continuous Integration on AWS](https://aws.amazon.com/devops/continuous-integration/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-codepipeline-ci-cd-pipeline/module/8236e523-f637-4f0a-98c2-0accfd2cb74e/lesson/e245472e-0769-4b01-a4ff-ee8f23cdf92a)**
>
> Watch video content
