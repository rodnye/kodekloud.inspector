# Cost Structure - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-CodePipeline-CICD-Pipeline/Basics-of-AWS-CodePipeline/Cost-Structure)

---

## Table of Contents

- Cost Structure
  - AWS CodePipeline Free Tier
  - Pricing After the Free Tier
  - Additional Service Costs in a CI/CD Workflow
  - Summary of Monthly CI/CD Costs
  - Links and References
  - Watch Video
    - AWS CodeCommit
    - AWS CodeBuild
    - AWS CodeDeploy
    - AWS EC2 Instances

---

## Content

AWS CodePipeline (CI/CD Pipeline)

Basics of AWS CodePipeline

# Cost Structure

In this guide, we dissect the **AWS CodePipeline** cost structure, explain the Free Tier allowances, and detail associated costs for common CI/CD services.

## AWS CodePipeline Free Tier

AWS offers a Free Tier for CodePipeline, allowing you to try the service at no cost:

- **1 active pipeline** per month is free
- An **active pipeline** has existed for > 30 days and processed at least one change
- After 30 days, charges apply only if the pipeline remains active and processes changes
- Only the **first** active pipeline is free; additional pipelines cost $1/month each

![The image shows a timeline indicating a transition from a free to a paid service on day 30, with a series of numbered, color-coded active pipelines.](https://kodekloud.com/kk-media/image/upload/v1752862549/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Cost-Structure/timeline-free-to-paid-service-pipelines.jpg)

> [!important]
> **Note**
>
> You can create multiple pipelines, but only one remains free each month. Monitor your active pipelines to stay within the Free Tier.

## Pricing After the Free Tier

| Active Pipelines | Free Tier | Monthly Charge          |
| ---------------- | --------- | ----------------------- |
| 1                | ✓         | $0                      |
| 2                | –         | $1 (for the 2nd)        |
| 10               | –         | $9 (for pipelines 2–10) |

For example, if you run **10 active pipelines**, you pay `$9/month` for pipelines #2 through #10.

![The image illustrates a pricing model for active pipelines, showing one free pipeline and additional pipelines costing $1 each, totaling $9 for nine paid pipelines.](https://kodekloud.com/kk-media/image/upload/v1752862550/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Cost-Structure/pricing-model-active-pipelines-diagram.jpg)

## Additional Service Costs in a CI/CD Workflow

A production-grade CI/CD pipeline often integrates multiple services, each with its own pricing:

- **Source repositories**: AWS CodeCommit, GitHub, etc.
- **Build services**: AWS CodeBuild, Jenkins
- **Artifact storage**: Amazon S3
- **Deployment**: AWS CodeDeploy, third-party tools

![The image is a diagram comparing free and paid source and build services, featuring AWS CodeCommit, Amazon S3, AWS CodeBuild, GitHub, and Jenkins.](https://kodekloud.com/kk-media/image/upload/v1752862552/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Cost-Structure/free-vs-paid-source-build-services-diagram.jpg)

Below, find detailed pricing for the most common AWS services in a CodePipeline.

### AWS CodeCommit

AWS CodeCommit is a fully managed Git repository service.

| Feature          | Free Tier                       | Price After Free Tier               |
| ---------------- | ------------------------------- | ----------------------------------- |
| Active users     | 5 users/month                   | $1 per additional active user/month |
| Repositories     | Up to 1,000 (can request 2,500) | Included in Free Tier               |
| Storage          | 50 GB/month                     | $0.06 per GB/month                  |
| API GET requests | 10,000 requests/month           | $0.001 per GET request              |

> An **active user** is any unique identity (root, IAM user/role, or federated user) that accesses CodeCommit in a month.

### AWS CodeBuild

AWS CodeBuild charges based on **build duration** and **compute type**.

- **Build duration**: billed per minute (rounded up)
- **Compute types**: general1.small, arm1.small, and higher tiers

| Metric        | Free Tier                  | Price After Free Tier                     |
| ------------- | -------------------------- | ----------------------------------------- |
| Build minutes | 100 minutes/month          | Varies by compute type ($0.005–$0.10/min) |
| Compute tiers | general1.small, arm1.small | Higher CPU/memory tiers available         |

![The image shows two sections: "Build Duration" with 100 build minutes per month, and "Compute Type" with options for general1.small or arm1.small instance types.](https://kodekloud.com/kk-media/image/upload/v1752862552/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Cost-Structure/build-duration-compute-type-options.jpg)

> [!important]
> **Note**
>
> Choose the smallest compute tier that meets your performance needs to optimize costs.

### AWS CodeDeploy

CodeDeploy automates application deployments to EC2 instances or on-premises servers.

- **EC2 deployments**: no additional CodeDeploy fee
- **On-premises**: $0.02 per instance update

![The image is a diagram showing AWS CodeDeploy deploying to both AWS EC2 and an on-premise server.](https://kodekloud.com/kk-media/image/upload/v1752862553/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Cost-Structure/aws-codedeploy-ec2-onpremise-diagram.jpg)

> [!important]
> **Note**
>
> EC2 instances incur separate compute charges detailed in the next section.

### AWS EC2 Instances

When deploying to Amazon EC2, you pay per instance based on:

![The image shows the AWS EC2 logo and a list of four factors: Type, Region, Software loaded, and Pricing model.](https://kodekloud.com/kk-media/image/upload/v1752862554/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Cost-Structure/aws-ec2-logo-factors-list.jpg)

1.  **Instance type & size**
    - CPU, memory, storage, and networking profile
    - Sizes: micro through xlarge and beyond

2.  **Region**
    - Regional pricing differences; always verify rates in the console

3.  **Software loaded**
    - Stock AMIs are free; Marketplace AMIs may include licensing fees

4.  **Pricing model**

    | Model           | Description                                                              |
    | --------------- | ------------------------------------------------------------------------ |
    | Free Tier       | 750 hours/month on Linux/Windows micro instances (12 months)             |
    | On-Demand       | Pay-per-hour (or per-second) with no commitment                          |
    | Spot Instances  | Up to 90% discount; can be reclaimed with a 2-minute warning             |
    | Savings Plans   | Up to 72% discount for 1- or 3-year commitments                          |
    | Dedicated Hosts | Single-tenant hardware for compliance or specific licensing requirements |

## Summary of Monthly CI/CD Costs

| Service       | Free Tier                                      | Cost After Free Tier                  |
| ------------- | ---------------------------------------------- | ------------------------------------- |
| CodePipeline  | 1 active pipeline                              | $1 per additional pipeline/month      |
| CodeCommit    | 5 active users, 1,000 repos, 50 GB, 10k GETs   | $1/user, $0.06/GB, $0.001/GET         |
| CodeBuild     | 100 build minutes, small compute tiers         | $0.005–$0.10 per build minute         |
| CodeDeploy    | EC2 deployments free; on-premises $0.02/update | –                                     |
| EC2 Instances | 750 hours micro instances (12 months)          | Varies by type, region, pricing model |

## Links and References

- [AWS CodePipeline Pricing](https://aws.amazon.com/codepipeline/pricing/)
- [AWS CodeCommit Pricing](https://aws.amazon.com/codecommit/pricing/)
- [AWS CodeBuild Pricing](https://aws.amazon.com/codebuild/pricing/)
- [AWS CodeDeploy Pricing](https://aws.amazon.com/codedeploy/pricing/)
- [Amazon EC2 Pricing](https://aws.amazon.com/ec2/pricing/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-codepipeline-ci-cd-pipeline/module/d9d0a786-1e14-426c-a9c6-7fe75f543824/lesson/0bd2961a-1f61-42e9-8149-c144d3f30fcd)**
>
> Watch video content
