# CodeBuild - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/AWS-CICD-Developer-Tools/CodeBuild)

---

## Table of Contents

- CodeBuild
  - CodeBuild in the CI/CD Workflow
  - Configuring CodeBuild with buildspec.yaml
  - Key Features of CodeBuild
  - Summary
  - Watch Video

---

## Content

AWS Certified Developer - Associate

AWS CICD Developer Tools

# CodeBuild

In this lesson, we dive into AWS CodeBuild—an essential, fully managed service designed to automate building, testing, and packaging your applications. As a developer, you constantly update your codebase with bug fixes or new features. Every update typically involves repetitive tasks like linting, code formatting, running various automated tests (unit, integration, end-to-end), and finally building or packaging the code. For example, in a Docker environment, you may build a Docker image and then push it to repositories such as Docker Hub, Amazon ECR, or others.

![The image illustrates a workflow for Continuous Integration, Delivery, and Deployment, detailing steps like linting, formatting, testing, building, and uploading code.](https://kodekloud.com/kk-media/image/upload/v1752857946/notes-assets/images/AWS-Certified-Developer-Associate-CodeBuild/ci-cd-workflow-steps-diagram.jpg)

Performing these tasks manually can be both time-consuming and error-prone. To overcome these challenges, the practices of continuous integration (CI), continuous delivery (CD), and continuous deployment (CD) help automate the entire lifecycle. By implementing an automated workflow—triggered by a code push to a platform like GitHub—you can streamline linting, formatting, building, testing, and even deployment processes.

> [!important]
> **Note**
>
> Continuous delivery ensures that your code is always in a deployable state by streamlining the deployment process. Continuous deployment goes a step further by automatically pushing production-ready code to release environments as soon as all tests pass.

![The image illustrates the processes of Continuous Integration, Continuous Delivery, and Continuous Deployment, showing the steps of building, testing, and deploying software either manually or automatically.](https://kodekloud.com/kk-media/image/upload/v1752857948/notes-assets/images/AWS-Certified-Developer-Associate-CodeBuild/ci-cd-pipeline-processes-diagram.jpg)

## CodeBuild in the CI/CD Workflow

AWS CodeBuild plays a key role in the continuous integration phase. It automates essential tasks such as code linting, code formatting, testing, and packaging. It seamlessly integrates with a variety of repositories—including Amazon S3, AWS CodeCommit, GitHub, Bitbucket, and GitHub Enterprise—to source your code.

![The image shows a dropdown menu for selecting a source provider in AWS CodeBuild, with options like Amazon S3, AWS CodeCommit, GitHub, and Bitbucket. AWS CodeCommit is currently selected.](https://kodekloud.com/kk-media/image/upload/v1752857949/notes-assets/images/AWS-Certified-Developer-Associate-CodeBuild/aws-codebuild-source-provider-dropdown.jpg)

When a developer pushes changes to a supported repository (for example, CodeCommit), CodeBuild is triggered to execute the defined CI steps. In Docker-based workflows, CodeBuild can build a Docker image and subsequently push it to a repository such as Amazon ECR or Docker Hub. It also integrates effortlessly with other AWS services by storing build artifacts in Amazon S3 and logging build activities to CloudWatch.

![The image is a flowchart illustrating a process involving AWS services: a user interacts with AWS CodeCommit, which connects to AWS CodeBuild, and the outputs are directed to Amazon S3 and AWS CloudWatch.](https://kodekloud.com/kk-media/image/upload/v1752857950/notes-assets/images/AWS-Certified-Developer-Associate-CodeBuild/aws-flowchart-codecommit-codebuild-s3-cloudwatch.jpg)

## Configuring CodeBuild with buildspec.yaml

To define the actions to be executed during the CI phase, introduce a buildspec.yaml file in your repository (commonly placed at the root directory). This YAML file outlines multiple phases—install, pre_build, build, and post_build—with each phase specifying its respective commands.

Below is an example buildspec.yaml for a Python application:

```
version: 0.2
phases:
  install:
    runtime-versions:
      python: 3.8
    commands:
      - pip install -r requirements.txt
      - pip install pytest
  pre_build:
    commands:
      - pytest
  build:
    commands:
      - echo Logging in to Amazon ECR...
      - $(aws ecr get-login --no-include-email --region $AWS_DEFAULT_REGION)
      - docker build -t my-python-app:latest .
      - docker tag my-python-app:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/my-python-app:latest
  post_build:
    commands:
      - docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/my-python-app:latest
```

In this configuration:

- **Install Phase:** The build environment is initialized with Python 3.8, and all necessary dependencies are installed.
- **Pre_build Phase:** Automated tests are executed via pytest.
- **Build Phase:** A Docker image is built, tagged, and prepared for deployment.
- **Post_build Phase:** The newly created Docker image is pushed to the designated repository.

AWS CodeBuild processes each command in the buildspec file sequentially, executing all specified operations within their corresponding phases.

## Key Features of CodeBuild

AWS CodeBuild is a fully managed continuous integration service that provides several benefits:

- Extensive support for multiple platforms and runtimes including Java, Python, Node.js, Ruby, Go, and more.
- Customizable build environments using Docker images, allowing you to incorporate your own runtime when the provided options do not meet your requirements.
- Seamless integration with a range of AWS services such as AWS CodePipeline, AWS CodeCommit, Amazon S3, and AWS IAM, thereby ensuring a smooth CI/CD workflow.
- The ability to run multiple builds concurrently, significantly reducing build times for large projects or during times of increased development activity.

![The image lists five features of a service: fully managed continuous integration, a wide range of build environments, customizable build environments, integration with AWS services, and parallel builds.](https://kodekloud.com/kk-media/image/upload/v1752857951/notes-assets/images/AWS-Certified-Developer-Associate-CodeBuild/service-features-continuous-integration.jpg)

## Summary

AWS CodeBuild is a robust, fully managed cloud-based build service that compiles your source code, runs tests, and produces deployable artifacts, typically stored in an S3 bucket. With all build instructions defined in the buildspec.yaml file, CodeBuild serves as a fundamental component of your continuous integration workflow.

![The image is a summary slide about AWS CodeBuild, highlighting it as a fully managed cloud build service that compiles code, runs tests, and stores artifacts in S3.](https://kodekloud.com/kk-media/image/upload/v1752857953/notes-assets/images/AWS-Certified-Developer-Associate-CodeBuild/aws-codebuild-summary-slide.jpg)

> [!important]
> **Key Takeaway**
>
> Implementing AWS CodeBuild not only automates your CI process but also integrates with multiple AWS services to enhance your overall CI/CD pipeline efficiency.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/184641b0-93ba-48d1-a9d7-1bc2b57db724/lesson/a3887120-e8b1-4cd5-8115-5ba5ef48b9f0)**
>
> Watch video content
