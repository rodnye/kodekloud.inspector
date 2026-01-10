# Understanding Different Deployment Strategies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-3-Deployment-Provisioning-and-Automation/Understanding-Different-Deployment-Strategies)

---

## Table of Contents

- Understanding Different Deployment Strategies
  - Recreate Deployment
  - Blue-Green Deployment
  - Rolling Updates
  - Canary Deployment
  - A/B Testing
  - Choosing the Right Deployment Strategy
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 3 Deployment Provisioning and Automation

# Understanding Different Deployment Strategies

Welcome! In this lesson, we will delve into various deployment strategies—an essential topic covered in technical exams and used widely in production environments. Before we explore the strategies, let's clarify what deployment means in a software context.

Deployment is the process of moving code from a development environment to another environment, typically production. While continuous integration involves merging code contributions from multiple developers, running tests, and ensuring the code is ready for deployment, the deployment process itself takes the resulting build artifact and places it into its target environment. For example, continuous delivery may deploy the artifact to a staging area, while continuous deployment pushes it directly to the production environment.

Deployment strategies are crucial because they address challenges such as maintaining website uptime and handling high-risk changes where both old and new versions need to run concurrently. Each strategy helps introduce new code while preventing service disruptions.

Below are some key deployment strategies:

1.  Recreate Deployment
2.  Blue-Green Deployment
3.  Rolling Updates
4.  Canary Deployment
5.  A/B Testing

Let's explore each strategy in detail.

---

## Recreate Deployment

Recreate Deployment is the simplest approach. In this method, the current version of the application is completely shut down and replaced with the new version. Since the old version is terminated before the new version starts, users may experience service downtime. For example, if the application takes five minutes to start, that downtime is inevitable during the transition.

![The image illustrates a "Recreating Deployment" process, showing a new version being connected to a load balancer, with notes explaining that the older version is stopped before deploying the new one, and service downtime is expected.](https://kodekloud.com/kk-media/image/upload/v1752860337/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Understanding-Different-Deployment-Strategies/recreating-deployment-load-balancer.jpg)

> [!important]
> **Note**
>
> This strategy is best suited for applications where a brief downtime is acceptable and the startup process is optimized.

---

## Blue-Green Deployment

Blue-Green Deployment maintains two separate environments: one live (blue) and one updated (green). Initially, the DNS points to the live blue environment. Once the new version is deployed to the green environment, DNS is switched to redirect users to it. Often, database updates are performed in parallel, which might require maintaining duplicate databases. This strategy facilitates a quick rollback by simply switching DNS back, though it typically incurs higher infrastructure costs due to running duplicate environments.

![The image illustrates a Blue/Green Deployment strategy using AWS Cloud, showing parallel environments (Blue and Green) with Amazon Route 53 DNS endpoints, highlighting features like instant rollback and higher infrastructure costs.](https://kodekloud.com/kk-media/image/upload/v1752860338/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Understanding-Different-Deployment-Strategies/blue-green-deployment-aws-cloud.jpg)

> [!important]
> **Warning**
>
> Blue-Green Deployment can double infrastructure costs. Ensure that budget constraints are considered before opting for this strategy.

---

## Rolling Updates

Rolling Updates involve updating only a subset of servers at a time rather than all servers simultaneously. For instance, if an application runs on 10 servers, updates may be applied one by one or in small batches. This minimizes downtime by ensuring that most servers remain active throughout the update process.

This strategy works best when differences between the old and new versions are minimal. Significant differences or accompanying database changes might create inconsistencies, in which case a Blue-Green Deployment could be a better fit. With Rolling Updates, continuous availability is maintained with minimal service disruption as long as changes are incremental.

![The image illustrates a "Rolling Update Deployment" process, showing a sequence of states where updates are applied incrementally to maintain continuous availability and minimal service disruption.](https://kodekloud.com/kk-media/image/upload/v1752860339/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Understanding-Different-Deployment-Strategies/rolling-update-deployment-process.jpg)

---

## Canary Deployment

Canary Deployment gradually introduces a new version to a small subset of users before a full rollout. For example, you might begin by directing only 0.5% of production traffic to the new version. Once the new version proves stable, the traffic percentage is gradually increased until it serves all users. This approach minimizes risk as it limits the exposure of potential issues to a small group.

The term "canary" comes from the use of canaries in coal mines to detect toxic gases. In this strategy, the "canary" (new version) is monitored with a small traffic portion, and if it performs well, it is rolled out to the entire user base.

---

## A/B Testing

A/B Testing is used primarily to compare two versions of an application rather than to facilitate a full transition. For instance, you might have 75% of users see version A while 25% see version B. This method is used to gather feedback and assess user responses to new features, rather than to completely replace the current version.

While similar in appearance to Canary Deployment, A/B Testing's main aim is performance and user experience comparison, not a full rollout. This strategy is particularly useful when validating new features before finalizing the selection for complete deployment.

![The image illustrates an A/B testing deployment setup, showing load balancing between two serving pages, with 75% of users directed to the original page and 25% to a test variant. It includes application servers for both the original and test variant deployments.](https://kodekloud.com/kk-media/image/upload/v1752860340/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Understanding-Different-Deployment-Strategies/ab-testing-deployment-setup.jpg)

---

## Choosing the Right Deployment Strategy

Choosing the appropriate deployment strategy depends on your environment and requirements. Consider the following guidelines:

| Requirement                                | Recommended Strategy  | Considerations                                                         |
| ------------------------------------------ | --------------------- | ---------------------------------------------------------------------- |
| Rapid rollback with duplicate environments | Blue-Green Deployment | Higher infrastructure cost due to duplicate environments               |
| Minimal downtime with incremental updates  | Rolling Updates       | Best for applications with minimal differences between releases        |
| Gradual rollout for risk mitigation        | Canary Deployment     | Ideal for introducing changes to a small user base before full rollout |
| Comparing feature performance              | A/B Testing           | Not intended for full transitions; focus is on gathering user feedback |

For example:

- If rapid rollback is essential, Blue-Green Deployment is effective despite higher costs.
- If a controlled, gradual rollout fits your needs, Rolling Updates or a Canary Deployment minimizes the risk.
- For feature comparison and testing user experience, A/B Testing offers valuable insights.

![The image illustrates two deployment strategies: Canary and Blue/Green, showing their processes and components for gradual release, real-time monitoring, and risk mitigation.](https://kodekloud.com/kk-media/image/upload/v1752860341/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Understanding-Different-Deployment-Strategies/canary-blue-green-deployment-strategies.jpg)

Understanding these deployment strategies allows you to select the most appropriate method based on risk management, downtime, infrastructure costs, and deployment speed. This knowledge is not only beneficial for exam preparation but also essential for real-world application in dynamic production environments.

Happy deploying!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/ecf54f06-735d-43ee-b254-f6ff814e676f/lesson/3d773dc6-ee3e-4693-baef-264a9566b760)**
>
> Watch video content
