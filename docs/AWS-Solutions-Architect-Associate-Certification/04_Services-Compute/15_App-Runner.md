# App Runner - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Compute/App-Runner)

---

## Table of Contents

- App Runner
  - What is AWS App Runner?
  - CI/CD Integration with App Runner
  - Private VPC Resources
  - Benefits and Features of App Runner
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Compute

# App Runner

Discover AWS App Runner, a fully managed service that simplifies application deployment by abstracting the underlying infrastructure.

## What is AWS App Runner?

AWS App Runner enables you to deploy applications effortlessly by simply pushing your code to a Git repository. The service automatically builds and deploys your application on a managed infrastructure—eliminating the need to configure EC2 instances, ECS clusters, or other infrastructure components.

App Runner supports two primary deployment methods:

- **Source Code Deployment:** Upload your code, and App Runner builds and deploys your application.
- **Container Image Deployment:** If your application is containerized, push your container image to Amazon ECR, and App Runner deploys it directly.

This streamlined process allows you to focus on writing code rather than managing servers or complex CI/CD pipelines.

## CI/CD Integration with App Runner

One of the standout features of AWS App Runner is its built-in CI/CD pipeline, which integrates seamlessly with popular Git repositories like CodeCommit and GitHub. The workflow is outlined below:

1.  **Push to Repository:** A merge into the main branch triggers the CI/CD pipeline.
2.  **Build Process:** AWS CodeBuild retrieves the source code and executes tasks specified in the build configuration. This stage typically includes compiling, running unit tests, and assembling a Docker image.
3.  **Deployment:** Once built, the Docker image is pushed to Amazon ECR, and App Runner deploys the new image automatically.

Below is a high-level diagram illustrating the CI/CD pipeline flow using various AWS services:

![The image is a flowchart illustrating a CI/CD pipeline using AWS services, including CodeCommit, CodeBuild, ECR, and App Runner, with a developer committing changes and pushing Docker images.](https://kodekloud.com/kk-media/image/upload/v1752864809/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-App-Runner/ci-cd-pipeline-aws-flowchart.jpg)

After deployment, your application becomes accessible via a unique domain or URL provided by App Runner. Whether your application interacts with DynamoDB, uploads files to S3, or calls third-party APIs, App Runner handles it as a standard AWS-hosted application.

## Private VPC Resources

When your application requires secure access to resources within a private VPC, such as a DynamoDB database or an RDS instance, AWS App Runner offers a VPC Connector. This feature securely bridges your application with private VPC resources while maintaining its public accessibility.

![The image is a diagram showing the flow of data from users to an App Runner via HTTPS, which then accesses a Virtual Private Cloud (VPC) through a VPC Connector.](https://kodekloud.com/kk-media/image/upload/v1752864810/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-App-Runner/data-flow-app-runner-vpc-diagram.jpg)

> [!important]
> **Secure Access Reminder**
>
> Ensure that the VPC Connector is correctly configured to maintain secure and reliable access to your private resources.

## Benefits and Features of App Runner

AWS App Runner offers a wide range of benefits that simplify application deployment and management:

- **Automatic Deployment:** Automatically deploy new changes from your connected repository.
- **Source Integration:** Easily integrates with platforms such as CodeCommit, GitHub, and ECR.
- **Automatic Scaling:** Scales your application dynamically based on traffic, ensuring efficient resource usage.
- **Integrated AWS Services:** Works seamlessly with services like RDS and Lambda, enhancing your application's capabilities.

Below is a visual representation of the key features provided by App Runner:

![The image lists five features: Automatic Deployment, Source Integration, Scalability, Cost-Effective, and Integrated With AWS Services, each represented with an icon.](https://kodekloud.com/kk-media/image/upload/v1752864811/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-App-Runner/features-automatic-deployment-scalability.jpg)

With AWS App Runner, developers can concentrate on building and refining their applications while AWS manages deployments, scaling, and infrastructure maintenance.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/afe0c951-fe76-47f2-9fc4-18858721be70/lesson/17e1f829-7ad5-4e49-b814-2375daa2c3fa)**
>
> Watch video content
