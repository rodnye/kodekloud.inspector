# EC2 vs Fargate - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Amazon-Elastic-Container-Service-AWS-ECS/Understanding-ECS/EC2-vs-Fargate)

---

## Table of Contents

- EC2 vs Fargate
  - Watch Video

---

## Content

Amazon Elastic Container Service (AWS ECS)

Understanding ECS

# EC2 vs Fargate

AWS Fargate revolutionizes container management by eliminating the need to manage the underlying server infrastructure. With ECS Fargate, you can concentrate on deploying your containerized applications without worrying about provisioning, managing, or scaling physical servers. While your ECS control plane and clusters remain identical to traditional setups, Fargate introduces a serverless architecture that abstracts away the compute infrastructure.

> [!important]
> **Key Benefit**
>
> One of the primary advantages of using Fargate is cost efficiency. You are billed solely for the resources you consume, as Fargate automatically provisions and decommissions compute resources based on your application's demand.

When you deploy an application to Amazon ECS using Fargate, the process unfolds as follows:

1.  Amazon ECS detects that there are no available servers to host your application.
2.  ECS then seamlessly communicates with Fargate.
3.  Fargate dynamically provisions the required compute resources on demand.
4.  Once these resources are available, ECS deploys your containers onto the newly created infrastructure.

This serverless approach ensures that when you scale down or remove your application, Fargate decommissions the underlying resources automatically, thereby eliminating costs associated with idle servers.

![The image is an infographic about ECS Fargate, highlighting its serverless architecture, on-demand server creation, and cost efficiency by eliminating the need to maintain EC2 servers.](https://kodekloud.com/kk-media/image/upload/v1752869150/notes-assets/images/Amazon-Elastic-Container-Service-AWS-ECS-EC2-vs-Fargate/ecs-fargate-infographic-serverless.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/amazon-elastic-container-service-aws-ecs/module/cec2a3ca-2cb6-4e9c-a1f2-693b3303765d/lesson/f32d9b8b-fc23-4e16-bcbf-e773dc60325f)**
>
> Watch video content
