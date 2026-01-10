# Configuring Different Deployment Strategies for Various AWS Services - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-3-Deployment-Provisioning-and-Automation/Configuring-Different-Deployment-Strategies-for-Various-AWS-Services)

---

## Table of Contents

- Configuring Different Deployment Strategies for Various AWS Services
  - Deployments on Amazon Elastic Compute Cloud (EC2)
  - Deployments on AWS Lambda
  - Deployments on Amazon Elastic Container Service (AWS ECS)
  - Deployment Strategy Overview
  - Summary
  - Watch Video
    - 1. In-Place Deployment
    - 2. Blue-Green Deployment
    - 1. All-at-Once Deployment
    - 2. Linear Deployment
    - 3. Canary Deployment

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 3 Deployment Provisioning and Automation

# Configuring Different Deployment Strategies for Various AWS Services

In this article, we explore how to configure different deployment strategies for various AWS services using CodeDeploy. AWS provides primary compute environments such as [Amazon Elastic Compute Cloud (EC2)](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2), [AWS Lambda](https://learn.kodekloud.com/user/courses/aws-lambda), and [Amazon Elastic Container Service (AWS ECS)](https://learn.kodekloud.com/user/courses/amazon-elastic-container-service-aws-ecs). While [AWS EKS](https://learn.kodekloud.com/user/courses/aws-eks) (Elastic Kubernetes Service) is available, it follows Kubernetes-specific deployment practices which are beyond the scope of this article and exam focus. For exam preparation, concentrate on EC2, Lambda, and ECS.

---

## Deployments on [Amazon Elastic Compute Cloud (EC2)](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2)

When deploying applications on EC2 using CodeDeploy, you have two primary strategies:

### 1\. In-Place Deployment

In-place deployment updates each instance within the deployment group individually. The process involves:

- Retrieving deployment artifacts from a source such as an S3 bucket or GitHub.
- Identifying the EC2 instances (often part of an auto-scaling group) in the deployment group and preparing them for updating.
- Fetching and installing the new version on these instances.

This method is cost-effective, yet it may result in brief downtime if the application cannot tolerate temporary unavailability. A load balancer typically minimizes user impact, except in scenarios of significantly reduced capacity.

![The image illustrates the AWS CodeDeploy in-place deployment process for EC2, showing the flow from a development machine to Amazon S3, GitHub, and EC2 instances. It includes components like deployment groups and auto-scaling groups.](https://kodekloud.com/kk-media/image/upload/v1752860278/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-Different-Deployment-Strategies-for-Various-AWS-Services/aws-codedeploy-inplace-deployment.jpg)

### 2\. Blue-Green Deployment

Blue-green deployment involves provisioning an entirely new set of servers (the green environment) with the updated application while keeping the current blue environment active. Once the new environment is validated:

- Traffic is switched using an auto-scaling group or load balancer.
- The blue environment is eventually decommissioned.

This strategy minimizes downtime and simplifies rollback procedures, though it requires additional infrastructure resources during transition.

> [!important]
> **Tip**
>
> Blue-green deployments reduce risks by ensuring that the new version is thoroughly validated before decommissioning the old environment.

---

## Deployments on [AWS Lambda](https://learn.kodekloud.com/user/courses/aws-lambda)

AWS Lambda supports three deployment strategies through CodeDeploy, offering varying levels of risk management and rollout control:

### 1\. All-at-Once Deployment

This strategy immediately replaces all instances of a Lambda function with the new version. Although this approach is fast, any issues in the new version will have an immediate impact.

- The deployment artifact is typically built by CodeBuild.
- CodeDeploy manages the seamless transition from the old version (e.g., version 1.1) to the new version (e.g., version 1.2).

![The image illustrates the AWS CodeDeploy process for Lambda using an all-at-once deployment strategy, showing a sequence from AWS EC2 to AWS CodeBuild, AWS CodeDeploy, and finally AWS Lambda.](https://kodekloud.com/kk-media/image/upload/v1752860279/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-Different-Deployment-Strategies-for-Various-AWS-Services/aws-codedeploy-lambda-process-diagram.jpg)

### 2\. Linear Deployment

In a linear deployment, traffic shifts gradually from the current version to the new one over a specified period. For example, CodeDeploy can be set to shift 10% of the traffic every minute. This incremental approach continues until all traffic is directed to the new version.

![The image illustrates AWS CodeDeploy for Lambda with a linear deployment strategy, showing a diagram of traffic shifting between Lambda versions and a deployment status bar indicating progress.](https://kodekloud.com/kk-media/image/upload/v1752860281/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-Different-Deployment-Strategies-for-Various-AWS-Services/aws-codedeploy-lambda-diagram.jpg)

### 3\. Canary Deployment

Canary deployments begin by directing a small percentage of traffic (e.g., 10%) to the new version, while the remaining traffic continues to be handled by the existing version. After a monitoring period (for example, five minutes), if the new version proves stable, all traffic is shifted over.

![The image illustrates the AWS CodeDeploy process for Lambda using a canary deployment strategy, showing the flow from code commit to deployment with traffic distribution between original and new versions.](https://kodekloud.com/kk-media/image/upload/v1752860282/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-Different-Deployment-Strategies-for-Various-AWS-Services/aws-codedeploy-lambda-canary-deployment.jpg)

---

## Deployments on [Amazon Elastic Container Service (AWS ECS)](https://learn.kodekloud.com/user/courses/amazon-elastic-container-service-aws-ecs)

For containerized applications running on ECS, the deployment strategies mirror those used for Lambda:

- **All-at-Once:** Immediately directs all traffic to the updated container version.
- **Linear:** Gradually transitions traffic in defined increments.
- **Canary:** Begins with a small portion of traffic being shifted to the new container version, followed by monitoring and then a complete switch once validated.

![The image shows three AWS CodeDeploy deployment strategies for ECS: All-at-Once, Linear, and Canary, each with options for traffic rerouting and deployment configuration.](https://kodekloud.com/kk-media/image/upload/v1752860283/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-Different-Deployment-Strategies-for-Various-AWS-Services/aws-codedeploy-ecs-strategies.jpg)

For further details on ECS canary deployments, visual progress indicators such as traffic shifting phases and status updates clearly depict the gradual process.

![The image illustrates the AWS CodeDeploy process for ECS using a canary deployment strategy, showing initial and incremental traffic shifting phases with progress bars and status updates.](https://kodekloud.com/kk-media/image/upload/v1752860284/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-Different-Deployment-Strategies-for-Various-AWS-Services/aws-codedeploy-ecs-canary-deployment.jpg)

---

## Deployment Strategy Overview

Understanding these deployment strategies is crucial for designing robust deployment workflows on AWS. The table below summarizes the key differences between the approaches on EC2, Lambda, and ECS:

| Service      | Strategy Options            | Key Considerations                                                                                                             |
| ------------ | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| EC2          | In-Place, Blue-Green        | In-place is cost-efficient but may incur downtime; Blue-green minimizes downtime at the expense of additional resources.       |
| Lambda & ECS | All-at-Once, Linear, Canary | Allows controlled and gradual rollouts to minimize risk; suitable for environments where traffic can be shifted incrementally. |

> [!important]
> **Exam Preparation Tip**
>
> Remember that gradual traffic shifts using strategies like linear and canary are applicable to [AWS Lambda](https://learn.kodekloud.com/user/courses/aws-lambda) and [Amazon ECS](https://learn.kodekloud.com/user/courses/amazon-elastic-container-service-aws-ecs), but such approaches do not apply to [Amazon EC2](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2) with CodeDeploy.

---

## Summary

- **EC2 Deployments:**
  - _In-Place:_ Cost-effective yet may experience brief downtime.
  - _Blue-Green:_ Offers minimal downtime and easier rollbacks using duplicate infrastructure during transition.

- **Lambda and ECS Deployments:**
  - _All-at-Once:_ Fast but potentially risky if issues arise.
  - _Linear:_ Gradual traffic shifts reduce potential negative impacts during rollout.
  - _Canary:_ Initial small-scale exposure to verify the new version before full deployment.

By understanding and selecting the appropriate deployment strategy, you can ensure efficient and resilient application rollouts, an essential skill for AWS certifications and managing production environments effectively.

This concludes our in-depth overview of configuring different deployment strategies for various AWS services using CodeDeploy.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/ecf54f06-735d-43ee-b254-f6ff814e676f/lesson/99b1d386-637f-4783-ba38-9d11fce49d19)**
>
> Watch video content
