# Exam Tips - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/AWS-CICD-Developer-Tools/Exam-Tips)

---

## Table of Contents

- Exam Tips
  - CodeCommit
  - CodeBuild
  - CodeDeploy
  - CodePipeline
  - Other AWS Developer Tools
  - Watch Video
    - Deployment Groups and Modes
    - Cloud9
    - AWS CodeArtifact
    - CodeGuru and CodeWhisperer
    - CodeStar
    - Amplify

---

## Content

AWS Certified Developer - Associate

AWS CICD Developer Tools

# Exam Tips

In this lesson, we review the key AWS services covered in this section to help you prepare for your exam. Understanding these services along with their integration and best practices is essential for success.

## CodeCommit

CodeCommit is a fully managed source control service that offers a secure alternative to platforms such as GitHub or GitLab. Your code is stored within AWS, increasing security and simplifying platform management. The service supports both SSH and HTTPS protocols for authentication and authorization via IAM. For SSH access, you must generate a public key and attach it to a specific IAM user. Additionally, every new repository automatically creates a main branch.

For the exam, you might encounter questions about who should have certain permissions. For instance, a standard user may be allowed to create commits and pull requests, while tasks like deleting repositories or merging pull requests might be restricted to team leads or administrators. It is advisable to review the various IAM policies associated with CodeCommit to understand the scope of permissions available.

![The image is a slide about CodeCommit, highlighting its features such as being a fully managed source-control service, increased security within AWS, IAM integration, and support for SSH and HTTPS authentication.](https://kodekloud.com/kk-media/image/upload/v1752858065/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/codecommit-features-aws-security.jpg)

## CodeBuild

CodeBuild is a fully managed cloud build service that compiles your source code, runs unit tests, and produces deployable artifacts. It plays an integral role in continuous integration by automating tasks such as linting, testing, and formatting. Configuration for CodeBuild is provided via a `buildspec.yaml` file located at the root of your source code repository. The build artifacts are typically stored in an Amazon S3 bucket, making them available for subsequent stages in your pipeline, such as deployment with CodeDeploy.

![The image provides information about AWS CodeBuild, highlighting it as a fully managed cloud build service that compiles code, runs tests, and stores artifacts in S3, with configuration via a buildspec.yml file.](https://kodekloud.com/kk-media/image/upload/v1752858066/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/aws-codebuild-cloud-build-service.jpg)

## CodeDeploy

CodeDeploy is designed to automate the deployment of software to various compute services including Amazon EC2, AWS Fargate, AWS Lambda, and even on-premises servers. In a CI/CD pipeline, CodeDeploy takes the artifacts produced by CodeBuild and deploys them to your target environment. When deploying to EC2, you must ensure the CodeDeploy agent is installed on your instances and that the proper IAM roles are assigned to facilitate access to the S3 buckets holding your application code.

### Deployment Groups and Modes

With CodeDeploy, you create a deployment group that includes your target compute instances—whether they are EC2 instances, on-premises servers, ECS services, or Lambda functions. Two primary deployment modes are essential to know:

1.  **In-Place Update:**
    - Updates running instances either all at once, in batches (half at a time), or one at a time.
    - Consider the impact on end users: updating all instances simultaneously could lead to service disruption, whereas updating them sequentially minimizes such risks.

2.  **Blue/Green Deployment:**
    - Involves provisioning a new set of instances (or an auto-scaling group), testing this new (green) environment, and then switching the load balancer to route traffic to the new set once validation is complete.

![The image describes AWS CodeDeploy as a fully managed deployment service for automating software deployments to various compute services like Amazon EC2, AWS Fargate, AWS Lambda, and on-premises servers. It also explains that a Deployment Group consists of EC2 instances, on-prem servers, ECS Services, or Lambda functions for application deployment.](https://kodekloud.com/kk-media/image/upload/v1752858068/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/aws-codedeploy-deployment-service.jpg)

For deployments targeting Lambda and ECS, similar deployment modes are available:

- **Linear:** Gradually increases the traffic to the new version by a fixed percentage at specified intervals.
- **Canary:** Initially directs a small portion of traffic to the new version, waits for a set period, and then moves the remaining traffic.
- **All-at-Once:** Immediately transfers all user traffic to the new version.

![The image outlines EC2 deployment modes in CodeDeploy, including in-place updates (AllAtOnce, HalfAtATime, OneAtATime) and Blue/Green deployment.](https://kodekloud.com/kk-media/image/upload/v1752858069/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/ec2-deployment-modes-codedeploy.jpg)

> [!important]
> **Tip**
>
> Review the specific use cases and operational differences between the deployment modes to choose the right strategy for minimizing service disruption.

## CodePipeline

CodePipeline is a continuous integration and continuous delivery (CI/CD) service that automates your software release process. It integrates seamlessly with CodeCommit, CodeBuild, and CodeDeploy to orchestrate the build, test, and deploy phases. In a typical workflow, artifacts generated by CodeBuild are stored in an S3 bucket and subsequently passed to CodeDeploy for final deployment. CodePipeline supports both fully automated processes and manual review steps, such as requiring a manual approval before deploying to production.

![The image is an informational slide about AWS CodePipeline, describing it as a CI/CD service that automates build, test, and deploy phases, utilizing CodeCommit, CodeBuild, and CodeDeploy, with sources from repositories like GitHub and GitLab, and storing artifacts in S3 buckets.](https://kodekloud.com/kk-media/image/upload/v1752858071/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/aws-codepipeline-cicd-service-slide.jpg)

## Other AWS Developer Tools

### Cloud9

Cloud9 is a web-based integrated development environment (IDE) that runs on Amazon EC2 instances. It facilitates team collaboration by allowing multiple users to share development environments via a web browser—eliminating the need for local software installations. This accessibility makes it convenient to work on projects from any device.

### AWS CodeArtifact

AWS CodeArtifact is a fully managed artifact repository that securely caches and manages libraries and dependencies used in your applications. By interacting with CodeArtifact rather than public repositories directly, developers can streamline dependency management and bolster security. It integrates with other AWS services, such as CodeBuild, to ensure reliable dependency resolution.

![The image provides exam tips related to Cloud9 and AWS CodeArtifact, highlighting features like Cloud9's web-based IDE and CodeArtifact's role as a managed artifact repository.](https://kodekloud.com/kk-media/image/upload/v1752858072/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/cloud9-aws-codeartifact-exam-tips.jpg)

### CodeGuru and CodeWhisperer

- **CodeGuru:**  
  CodeGuru uses machine learning to optimize code quality and performance. It consists of two components:
  - **Reviewer:** Analyzes your code and provides actionable recommendations.
  - **Profiler:** Assesses application performance to help you optimize resource usage.

- **CodeWhisperer:**  
  CodeWhisperer leverages machine learning to improve developer productivity by offering in-IDE code recommendations and real-time refactoring suggestions. It serves a function similar to GitHub Copilot by enhancing the coding experience with context-aware suggestions.

The critical difference is that CodeGuru focuses on analyzing existing code in your repositories, while CodeWhisperer provides immediate, in-context recommendations during development.

![The image provides exam tips related to CodeGuru and CodeWhisperer, highlighting their use of machine learning for code review, recommendations, and productivity enhancement.](https://kodekloud.com/kk-media/image/upload/v1752858073/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/codeguru-codewhisperer-exam-tips.jpg)

### CodeStar

CodeStar offers a suite of tools to quickly scaffold projects and streamline development, build, and deployment processes on AWS. Its centralized dashboard provides enhanced team collaboration, allowing you to monitor project progress seamlessly. CodeStar integrates with various AWS tools including CodeCommit, CodeBuild, CodeDeploy, and CodePipeline, and provides templates that automatically set up a full CI/CD pipeline along with the necessary deployment configurations.

### Amplify

Amplify is engineered for web and mobile developers who need to integrate features like storage and authentication quickly. By abstracting the complexities of underlying services—such as using AWS Cognito for user authentication—Amplify enables you to focus primarily on building engaging front-end experiences without deep-diving into backend integration details.

![The image provides exam tips about AWS services, specifically CodeStar and Amplify, highlighting their features and integration capabilities.](https://kodekloud.com/kk-media/image/upload/v1752858075/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/aws-codestar-amplify-exam-tips.jpg)

This concludes our comprehensive review of the primary AWS services and developer tools. Use these insights to deepen your understanding and refine your exam preparation strategy.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/184641b0-93ba-48d1-a9d7-1bc2b57db724/lesson/e62e2848-815d-4dcb-833f-1913de9bd319)**
>
> Watch video content
