# Turning up Security on Compute Services Part 5 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Designing-for-Security/Turning-up-Security-on-Compute-Services-Part-5)

---

## Table of Contents

- Turning up Security on Compute Services Part 5
  - Elastic Container Registry (ECR)
  - AWS Logging and VPC Connectivity in ECR
  - Securing App Runner
  - Data Encryption in App Runner
  - AWS Batch Overview and Security Configurations
  - Batch and Container Services Integration
  - Transition to Serverless
  - Watch Video
    - Integrating App Runner with a VPC
    - Securing AWS Batch
    - Monitoring and Troubleshooting Batch Jobs

---

## Content

AWS Solutions Architect Associate Certification

Designing for Security

# Turning up Security on Compute Services Part 5

In this lesson, we focus on designing secure architectures for AWS container services. We will specifically explore the Elastic Container Registry (ECR) as well as related services such as App Runner and Proton, providing insights into best practices and security configurations.

---

## Elastic Container Registry (ECR)

ECR is a versatile container registry that can be configured as either public or private. It easily integrates with AWS services such as IAM for permission management, CI/CD pipelines, and VPC endpoints for secure, private connectivity. Additionally, ECR supports repository replication and can serve multiple purposes including pull-through caching, development registries, and production repositories.

![The image is a diagram illustrating the workflow of an Elastic Container Repository using AWS services, including Amazon ECR, AWS CodeBuild, CodeDeploy, and ECS, with integration points for security and deployment.](https://kodekloud.com/kk-media/image/upload/v1752864119/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-5/elastic-container-repository-workflow-diagram.jpg)

Consider a scenario where a global e-commerce company uses ECR to store container images for its microservices application. To ensure images are securely stored, only authorized entities can push or pull images, and vulnerabilities are automatically detected, implement the following measures:

1.  Configure IAM policies to grant precise permissions to specific users or roles.
2.  Enable automatic image scanning upon push (leveraging tools like Trivy or similar).

For enhanced security, integrate logging services such as CloudWatch, CloudTrail, and AWS Config. Using VPC endpoints further ensures that ECR traffic does not traverse the public internet.

![The image illustrates the architecture of an AWS Elastic Container Repository (ECR) setup, showing the interaction between production and test AWS accounts with VPC endpoints and ECR registries.](https://kodekloud.com/kk-media/image/upload/v1752864121/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-5/aws-ecr-architecture-diagram.jpg)

---

## AWS Logging and VPC Connectivity in ECR

ECR leverages standard AWS logging mechanisms to help you monitor and audit activities:

- CloudWatch for real-time monitoring.
- CloudTrail to capture and record API calls.
- AWS Config for tracking and recording configuration changes.

Additionally, ECR supports VPC interface endpoints that provide secure, private connectivity. For instance, if a Docker instance in VPC-A pulls an image from a test registry, the traffic will flow through the dedicated VPC endpoints, including those for S3 and any other required services. Keep in mind that gateway endpoints are available only for S3 and DynamoDB, while services like ECR require interface endpoints.

> [!important]
> **Note**
>
> For organizations such as healthcare providers that mandate comprehensive auditing and quick troubleshooting, combining IAM resource-level controls with automatic scanning significantly enhances both security and operational efficiency.

---

## Securing App Runner

AWS App Runner is a fully managed service that simplifies running web applications by deploying code or container images directly from your source repository. It is especially beneficial for rapidly growing startups that need fast deployments without the overhead of managing infrastructure.

Consider a scenario where a startup prepares to deploy a web application using App Runner with the expectation of a user surge. The recommended approach is to leverage App Runner’s built-in features, which include:

- Direct code or container deployment from source repositories.
- Automatic scaling and integrated monitoring.
- Streamlined security features using CloudWatch, CloudTrail, and AWS Config.

![The image presents a scenario where a startup wants to deploy a web application using AWS App Runner, with four suggested steps for secure and efficient deployment.](https://kodekloud.com/kk-media/image/upload/v1752864122/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-5/aws-app-runner-deployment-steps.jpg)

A standard App Runner workflow typically involves:

- Creating the service.
- Integrating source repositories.
- Deploying containerized applications.
- Monitoring service performance and security.

![The image is a diagram illustrating the workflow of an App Runner service, showing interactions between a user, App Runner, and a code/image repository. It highlights the process of creating, deploying, and monitoring services.](https://kodekloud.com/kk-media/image/upload/v1752864123/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-5/app-runner-workflow-diagram.jpg)

---

### Integrating App Runner with a VPC

For organizations such as e-commerce companies migrating backend services to App Runner, maintaining private communication between the VPC and App Runner is essential. To avoid routing traffic over the public internet, configure VPC interface endpoints. This setup ensures that communications remain securely within the AWS network.

![The image presents a scenario where an e-commerce company wants to integrate AWS App Runner with their VPC for private traffic, listing four potential steps to achieve this setup.](https://kodekloud.com/kk-media/image/upload/v1752864126/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-5/aws-app-runner-vpc-setup-steps.jpg)

It’s best to use interface endpoints rather than alternatives like VPC peering, Direct Connect, or VPN. Note that gateway endpoints are applicable only to S3 and DynamoDB.

A detailed VPC-connected App Runner architecture typically includes components such as:

- An internet-facing load balancer.
- A request router.
- Multiple network interfaces directing traffic to tasks.
- A NAT Gateway for controlled internet access by private VPC resources.

![The image is a diagram illustrating the VPC Networking Mode Architecture for AWS App Runner, showing the flow of inbound and outbound traffic through various components like Network Load Balancer, Fargate, and customer VPC resources. It highlights the use of standard services for logging and monitoring.](https://kodekloud.com/kk-media/image/upload/v1752864127/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-5/vpc-networking-architecture-aws-apprunner.jpg)

---

## Data Encryption in App Runner

For startups and enterprises that require encryption in transit and at rest, App Runner comes with built-in support for data encryption and HTTPS communications. To ensure robust security:

1.  Rely on App Runner’s encryption mechanisms for data at rest.
2.  Enforce HTTPS to secure data in transit.

> [!important]
> **Warning**
>
> Do not disable encryption if you operate in an environment with stringent data protection and compliance standards.

---

## AWS Batch Overview and Security Configurations

AWS Batch simplifies the processing of large-scale jobs by efficiently orchestrating compute resources such as EC2, ECS, and EKS (with Fargate and Spot instances available). It divides workloads into smaller jobs that run at scale and typically stores outputs in S3.

![The image is a diagram illustrating the workflow of AWS Batch, showing how a user submits a job container image, which is processed by AWS Batch in a compute environment within a VPC, and results are stored in S3.](https://kodekloud.com/kk-media/image/upload/v1752864129/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-5/aws-batch-workflow-diagram.jpg)

### Securing AWS Batch

When designing a secure AWS Batch environment, consider the following best practices:

- Mix on-demand instances (for critical jobs) with spot instances (for non-critical jobs) to optimize cost and performance.
- Assign specific IAM roles to limit Batch jobs to only necessary resource actions.
- Integrate monitoring and logging with CloudWatch Logs, CloudTrail, and AWS Config.

For example, a pharmaceutical company using AWS Batch to process extensive datasets should adopt a hybrid approach to balance cost efficiency and workload prioritization.

![The image presents a scenario where a pharmaceutical company is using AWS Batch for processing datasets and lists four strategies for choosing the right compute option to optimize costs and efficiency.](https://kodekloud.com/kk-media/image/upload/v1752864130/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-5/aws-batch-pharmaceutical-compute-strategies.jpg)

Ensure effective IAM permission management by assigning distinct policies to different teams. This ensures that each team only accesses its designated job queues and definitions.

![The image presents a scenario involving a media company using AWS Batch, with a question about managing IAM permissions effectively. It lists four strategies for managing these permissions.](https://kodekloud.com/kk-media/image/upload/v1752864131/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-5/aws-batch-iam-permissions-strategies.jpg)

### Monitoring and Troubleshooting Batch Jobs

For companies running complex simulations, integrating CloudWatch Logs to monitor error patterns and setting up alarms is highly recommended. This approach provides granular visibility into the job lifecycle and accelerates issue resolution.

![The image describes a scenario where a pharmaceutical company uses AWS Batch for simulations and seeks solutions for monitoring, logging, and troubleshooting. It presents four approaches, including AWS Batch retry strategies, CloudWatch integration, AWS Lambda notifications, and storing outputs in S3.](https://kodekloud.com/kk-media/image/upload/v1752864132/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-5/aws-batch-simulations-monitoring-solutions.jpg)

---

## Batch and Container Services Integration

AWS Batch, while operating with containerized jobs (using ECS, EC2, EKS, and Fargate), is an essential part of the broader container services ecosystem. Batch leverages IAM roles for securing job executions and integrates with standard AWS logging and monitoring services.

A typical workflow might involve:

- A user uploads a file to S3, triggering an event.
- An AWS Lambda function is invoked by the event, which then initiates a Batch job.
- The Batch job runs on Fargate, accesses an application image from a registry, processes data retrieved via a gateway endpoint, and writes the results to DynamoDB.

This sequence demonstrates how AWS Batch seamlessly integrates with other AWS services to ensure secure data management and operational efficiency.

![The image is a diagram illustrating AWS Batch application orchestration using AWS Fargate, showing the flow of data and interactions between various AWS services like S3, Lambda, and DynamoDB. It includes components such as NAT Gateway, Elastic Network Interface, and CloudWatch, with a focus on batch job processing.](https://kodekloud.com/kk-media/image/upload/v1752864133/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-5/aws-batch-fargate-diagram.jpg)

---

## Transition to Serverless

After exploring the security configurations for AWS Batch and container registries like ECR, we now transition to serverless architectures. In the next part of this lesson, we will examine how similar security design principles apply to serverless services, ensuring that your applications are both secure and scalable.

For more details on AWS security best practices, examine the official [AWS Documentation](https://aws.amazon.com/documentation/) and [AWS Security Blog](https://aws.amazon.com/blogs/security/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/fcdcac66-6274-4b2f-912a-d6e9de511e5a/lesson/47dbeee1-a6ea-4348-9051-57a6d99163a0)**
>
> Watch video content
