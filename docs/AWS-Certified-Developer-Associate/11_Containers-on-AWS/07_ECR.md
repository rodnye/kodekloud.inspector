# ECR - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Containers-on-AWS/ECR)

---

## Table of Contents

- ECR
  - How ECR Works
  - Creating Registries in ECR
  - Key Features of AWS ECR
  - Summary
  - Watch Video
    - Typical Workflow Overview

---

## Content

AWS Certified Developer - Associate

Containers on AWS

# ECR

In this lesson, you'll learn about AWS Elastic Container Registry (ECR), a fully managed Docker container registry service that simplifies the process of storing, managing, and deploying Docker container images. ECR provides a secure and scalable alternative to solutions like Docker Hub and integrates seamlessly with environments such as Kubernetes, Docker Swarm, ECS, and EKS.

## How ECR Works

ECR operates by storing your Docker container images, which you push to the service after building them. When it's time to deploy your application, whether on cloud services like Amazon ECS or on-premises systems, your platform pulls these images directly from ECR.

### Typical Workflow Overview

Follow these steps when using ECR:

1.  Develop your application code.
2.  Create a Dockerfile.
3.  Build the Docker image.
4.  Push the Docker image to ECR.
5.  Pull the image from ECR during deployment on platforms like ECS, EKS, or other container orchestration systems.

ECR functions as an integral Docker registry at every step of this process, ensuring flexibility and consistency across various deployment environments.

![The image is a diagram showing Amazon ECR connected to Amazon ECS, Amazon EKS, and an on-premise setup.](https://kodekloud.com/kk-media/image/upload/v1752858503/notes-assets/images/AWS-Certified-Developer-Associate-ECR/amazon-ecr-ecs-eks-diagram.jpg)

## Creating Registries in ECR

When you set up a registry in ECR, you have two choices:

- **Public ECR:**
  - Creates a public repository where images are accessible over the internet.
  - Ideal for open-source projects and sharing images publicly.
- **Private ECR:**
  - Creates a private repository with restricted access controlled via AWS IAM permissions.
  - Ensures that only authorized users within your organization can access the container images.

> [!important]
> **Note**
>
> For projects requiring both public and private access, AWS ECR offers flexibility by allowing multiple repository configurations under one account.

## Key Features of AWS ECR

AWS ECR comes packed with features designed to streamline container management:

- **Image Compression and Encryption:**  
  Ensures images are stored efficiently and securely by automatically compressing and encrypting them.
- **Version and Lifecycle Management:**  
  Supports managing multiple versions of container images and includes lifecycle policies to automatically clean up outdated or unused images.
- **Access Control:**  
  Leverages AWS IAM for robust access control, ensuring that only authorized entities can pull or push images.
- **CI/CD Integration:**  
  Easily integrates with your continuous integration and deployment pipelines, automating tests, builds, and deployments whenever your code changes.
- **Image Scanning:**  
  Provides vulnerability scanning for container images, allowing you to detect and address security issues early.

![The image is a diagram illustrating the structure of a public and private ECR (Elastic Container Registry), showing connections to cloud and user icons.](https://kodekloud.com/kk-media/image/upload/v1752858505/notes-assets/images/AWS-Certified-Developer-Associate-ECR/ecr-structure-diagram-cloud-user.jpg)

![The image is a diagram showing features of Amazon ECR, including compressing, encrypting, managing versions and lifecycle of images, and controlling access to images.](https://kodekloud.com/kk-media/image/upload/v1752858506/notes-assets/images/AWS-Certified-Developer-Associate-ECR/amazon-ecr-features-diagram.jpg)

## Summary

AWS Elastic Container Registry (ECR) offers a powerful, fully managed solution for Docker container image management. In summary, ECR:

- Acts as a fully managed Docker container registry service.
- Integrates seamlessly with AWS services such as IAM, ECS, and EKS.
- Supports both public and private repositories, catering to varied access requirements.
- Provides essential features like image compression, encryption, versioning, lifecycle management, and vulnerability scanning.
- Easily integrates with CI/CD pipelines to facilitate automated build and deployment processes.

![The image lists four features: Fully Managed, Integration with AWS Services, Private Registry, and Image Lifecycle Management, each with a corresponding icon.](https://kodekloud.com/kk-media/image/upload/v1752858507/notes-assets/images/AWS-Certified-Developer-Associate-ECR/managed-aws-integration-private-registry.jpg)

> [!important]
> **Additional Insight**
>
> ECR is not confined to AWS-only platforms; any system capable of pulling Docker images can benefit from storing images in ECR.

For further details on container management and other AWS services, explore additional resources and documentation available from AWS.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/c28ddfac-bdff-4566-b056-f6c6391a0d11/lesson/9324cf86-a727-4a4b-b942-8cafa4a22f00)**
>
> Watch video content
