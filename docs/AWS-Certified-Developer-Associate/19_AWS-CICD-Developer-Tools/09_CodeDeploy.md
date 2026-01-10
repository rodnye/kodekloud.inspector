# CodeDeploy - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/AWS-CICD-Developer-Tools/CodeDeploy)

---

## Table of Contents

- CodeDeploy
  - Key Features of CodeDeploy
  - Setting Up CodeDeploy
  - CodeDeploy and CI/CD Pipelines
  - The AppSpec.yaml File
  - CodeDeploy Agent and IAM Roles
  - Deployment Strategies for Various Platforms
  - Automatic Rollbacks and Monitoring
  - Summary
  - Watch Video
    - EC2 and On-Premises Deployments
    - Lambda Deployments
    - ECS Deployments

---

## Content

AWS Certified Developer - Associate

AWS CICD Developer Tools

# CodeDeploy

In this lesson, we delve into CodeDeploy—a fully managed deployment service that automates software deployments across multiple compute platforms including EC2, AWS Fargate, AWS Lambda, and even on-premises servers. CodeDeploy streamlines the release of new features, minimizes application downtime, and handles the complexities of updating your applications.

By interacting with several AWS services (such as Lambda, EC2, ECS, and on-premises servers), CodeDeploy lives up to its name: it is all about deploying your code efficiently and reliably.

## Key Features of CodeDeploy

CodeDeploy provides a wealth of features that simplify and secure your deployments:

- **Automated Deployments:** Seamlessly deploy applications across platforms like EC2, ECS, and Lambda.
- **Centralized Management:** Manage deployments from the AWS Management Console or via the AWS CLI, SDK, or APIs. This central control provides clear visibility over current and past deployments.
- **Automatic Rollbacks:** If a deployment encounters issues, CodeDeploy can automatically revert to the last stable version, reducing the impact on end users.
- **Health Tracking:** Continuously monitor the health of deployments. Should errors or failures exceed a set threshold, automatic rollbacks can be triggered.
- **Flexible Deployment Types:** Choose from rolling updates (updating instances gradually) or blue-green deployments (running the new version alongside the old one before switching traffic).

![The image lists five features: automated deployments, centralized control, rollbacks, health tracking, and rolling and blue/green updates. Each feature is represented with an icon and a number.](https://kodekloud.com/kk-media/image/upload/v1752858005/notes-assets/images/AWS-Certified-Developer-Associate-CodeDeploy/features-of-deployment-automation.jpg)

## Setting Up CodeDeploy

Setting up CodeDeploy involves several clear steps:

1.  **Create a Deployment Group:** Define the set of target compute resources (EC2 instances, Lambda functions, or other AWS resources) where your application will be updated.
2.  **Create a Deployment:** Specify the location of your application's code, and associate it with your deployment group.
3.  **Specify Deployment Configurations:** Configure settings such as the minimum number of healthy hosts required, rollback options, and the update method (blue-green or rolling).
4.  **Execute the Deployment:** CodeDeploy orchestrates the update process based on the instructions defined in your `appspec.yaml` file.

![The image outlines the steps for "Code Deploy," including setting up a deployment group, creating a deployment, configuring deployment settings, and deploying the application.](https://kodekloud.com/kk-media/image/upload/v1752858006/notes-assets/images/AWS-Certified-Developer-Associate-CodeDeploy/code-deploy-steps-outline.jpg)

## CodeDeploy and CI/CD Pipelines

Within a CI/CD pipeline, CodeDeploy plays a crucial role:

- Developers commit code changes to repositories such as AWS CodeCommit or other supported platforms.
- The commit triggers a build process (commonly via CodeBuild), which executes tests, linters, and code formatting.
- CodeDeploy then takes the resulting build artifact from CodeBuild and deploys it onto the designated compute platform (e.g., EC2).

![The image illustrates a workflow for AWS CodeDeploy, showing a sequence from a user to AWS CodeCommit, AWS CodeBuild, AWS CodeDeploy, and finally AWS EC2.](https://kodekloud.com/kk-media/image/upload/v1752858008/notes-assets/images/AWS-Certified-Developer-Associate-CodeDeploy/aws-codedeploy-workflow-diagram.jpg)

## The AppSpec.yaml File

Similar to how CodeBuild relies on a `buildspec.yaml` file, CodeDeploy uses an `appspec.yaml` file positioned at the root of your project. This file provides the deployment specifications and instructions for updating your application. Below is an example configuration:

```
version: 0.0
os: linux
files:
  - source: /
    destination: /var/www/html/myapp
hooks:
  ApplicationStop:
    - location: scripts/stop_server.sh
      timeout: 300
  AfterInstall:
    - location: scripts/install_dependencies.sh
  ApplicationStart:
    - location: scripts/start_server.sh
permissions:
  - object: /var/www/html/myapp/scripts/*
    pattern: "**"
    owner: ec2-user
    group: ec2-user
    mode: 755
```

In this configuration:

- The `os` parameter indicates that the target instances are running Linux.
- The **files** section states where the artifact (produced by CodeBuild) should reside on the instance.
- The **hooks** section outlines various lifecycle events—stopping the current version, installing the update, and starting the new version.
- The **permissions** section ensures that deployed files have the necessary execution permissions.

## CodeDeploy Agent and IAM Roles

For EC2 deployments, it is essential to install the CodeDeploy agent on your instances. This agent handles communication with the AWS CodeDeploy service and executes the deployment actions. Additionally, ensure that your EC2 instance has an IAM role with permissions to access the S3 bucket containing the deployment artifact.

## Deployment Strategies for Various Platforms

### EC2 and On-Premises Deployments

For deployments targeting EC2 or on-premises servers, CodeDeploy supports two primary strategies:

1.  **In-Place Updates:**
    - **All-at-Once:** Update all instances concurrently, offering speed at the cost of potential user impact.
    - **Half-at-a-Time:** Update half of the instances initially; upon success, update the remainder.
    - **One-at-a-Time:** Update instances sequentially, minimizing risk but potentially increasing deployment duration.

![The image outlines deployment types for EC2/on-premise, detailing two options: in-place update and blue/green deployment, with different speeds for in-place updates.](https://kodekloud.com/kk-media/image/upload/v1752858009/notes-assets/images/AWS-Certified-Developer-Associate-CodeDeploy/ec2-deployment-types-in-place-blue-green.jpg)

For instance, in a deployment group with four EC2 instances running version one:

- An all-at-once update replaces all instances simultaneously.
- A half-at-a-time update upgrades two instances first, followed by the remaining two.
- A one-at-a-time update processes each instance sequentially.

![The image shows a diagram labeled "Deployment Types – EC2/On-premise - HalfAtATime" with four icons representing a deployment group.](https://kodekloud.com/kk-media/image/upload/v1752858010/notes-assets/images/AWS-Certified-Developer-Associate-CodeDeploy/deployment-types-ec2-on-premise-diagram.jpg)

2.  **Blue/Green Deployments:**
    - The current environment (blue) continues serving traffic while a new environment (green) is set up with the updated code. Once the new version is verified, traffic is redirected to the green environment, significantly reducing downtime.

![The image illustrates a CodeDeploy Blue/Green Deployment Strategy using AWS CodeDeploy, showing two deployment groups, A and B, with connected icons representing servers or instances.](https://kodekloud.com/kk-media/image/upload/v1752858012/notes-assets/images/AWS-Certified-Developer-Associate-CodeDeploy/codedeploy-blue-green-strategy.jpg)

### Lambda Deployments

For AWS Lambda functions, deployments are managed via aliases that point to specific versions. CodeDeploy supports multiple traffic shifting strategies:

- **All-at-Once:** Immediately route all traffic to the new version.
- **Linear Deployment:** Incrementally shift a specified percentage of traffic (e.g., 10% every minute) until the new version handles 100% of the traffic.
- **Canary Deployment:** Initially send a small fraction of traffic (e.g., 10%) to the new version, and after a brief verification period (e.g., 10 minutes), route all traffic to the new version if no issues are observed.

![The image explains deployment types for AWS Lambda using CodeDeploy, detailing linear and canary traffic shifting strategies, with a diagram showing traffic distribution between two versions.](https://kodekloud.com/kk-media/image/upload/v1752858013/notes-assets/images/AWS-Certified-Developer-Associate-CodeDeploy/aws-lambda-deployment-types-diagram.jpg)

**Example of a Linear Lambda Deployment:**

When using a "linear 10% every 10 minutes" strategy:

- Initially, 100% of traffic targets version one.
- After 10 minutes, 10% of the traffic shifts to the new version.
- This incremental process continues until the new version handles all traffic.

![The image illustrates a linear deployment strategy for AWS Lambda, showing a 10% traffic shift every 10 minutes between two versions, v1 and v2, with v1 receiving 80% and v2 receiving 20% of the traffic.](https://kodekloud.com/kk-media/image/upload/v1752858014/notes-assets/images/AWS-Certified-Developer-Associate-CodeDeploy/aws-lambda-linear-deployment-strategy.jpg)

**Example of a Canary Lambda Deployment:**

For a "canary 10%, 10 minutes" deployment:

- Initially, 10% of the traffic is directed to the new version while 90% remains with the old version.
- After a 10-minute verification period, 100% of the traffic is switched to the new version.

![The image illustrates a Lambda Canary deployment strategy, showing traffic distribution between two versions (v1 and v2) with v1 receiving 0% and v2 receiving 100%.](https://kodekloud.com/kk-media/image/upload/v1752858015/notes-assets/images/AWS-Certified-Developer-Associate-CodeDeploy/lambda-canary-deployment-strategy.jpg)

### ECS Deployments

Amazon ECS deployments follow similar strategies to those used in Lambda:

- **Linear Deployments:** Gradually move a predetermined percentage of traffic (e.g., 10% increments) to the new version until complete transition.
- **Canary Deployments:** Start by shifting a smaller initial percentage (e.g., 10%) and, after a verification period, move all traffic to the new version.
- **All-at-Once Deployments:** Switch the entire service to the new version immediately.

![The image illustrates different ECS deployment types: Linear, Canary, and AllAtOnce, with a diagram showing traffic shifting from version 1 (v1) to version 2 (v2).](https://kodekloud.com/kk-media/image/upload/v1752858016/notes-assets/images/AWS-Certified-Developer-Associate-CodeDeploy/ecs-deployment-types-diagram.jpg)

## Automatic Rollbacks and Monitoring

One of CodeDeploy's standout features is its integration with Amazon CloudWatch. If the newly deployed version triggers alarms due to errors or performance issues, CodeDeploy can automatically roll back to the previous stable version. This proactive approach minimizes any negative impact on your users.

![The image illustrates an AWS CodeDeploy rollback process, showing a sequence of versions from V1.1 to V1.4, with a rollback from V1.4 to V1.3 due to an alarm.](https://kodekloud.com/kk-media/image/upload/v1752858017/notes-assets/images/AWS-Certified-Developer-Associate-CodeDeploy/aws-codedeploy-rollback-process.jpg)

> [!important]
> **Deployment Best Practice**
>
> Leverage automatic rollbacks in CodeDeploy to quickly mitigate issues and ensure a seamless user experience, especially during critical updates.

## Summary

CodeDeploy is a versatile and robust deployment automation service that supports platforms such as EC2, on-premises servers, Lambda, and ECS. Its key capabilities include:

- Automated, centralized deployments with a variety of strategies (all-at-once, in-place, blue/green, linear, and canary).
- Built-in rollback functionalities and real-time health monitoring through CloudWatch.
- Seamless integration with CI/CD pipelines, ensuring smooth transitions from code commit to production.
- Clear configuration requirements via the `appspec.yaml` file and specific setup considerations for different compute platforms.

![The image is a summary of a service that automates deployments to various platforms, supports automatic rollbacks, and different deployment strategies, and requires specific configurations and permissions.](https://kodekloud.com/kk-media/image/upload/v1752858018/notes-assets/images/AWS-Certified-Developer-Associate-CodeDeploy/deployment-automation-summary.jpg)

Understanding these deployment methods and configurations is crucial, especially if you're preparing for AWS certification exams. With CodeDeploy, you can select the best strategy for your environment and user impact tolerance, ensuring smoother and more reliable application updates.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/184641b0-93ba-48d1-a9d7-1bc2b57db724/lesson/8af24c68-7ac9-4d68-86c0-a4d0182af358)**
>
> Watch video content
