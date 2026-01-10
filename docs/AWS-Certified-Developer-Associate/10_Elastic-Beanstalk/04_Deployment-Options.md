# Deployment Options - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Elastic-Beanstalk/Deployment-Options)

---

## Table of Contents

- Deployment Options
  - All at Once
  - Rolling Update
  - Rolling Update with Additional Batch
  - Immutable Deployment
  - Traffic Splitting
  - Blue-Green Deployment
  - Summary
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Elastic Beanstalk

# Deployment Options

In this lesson, we explore various deployment modes designed to update your EC2 instances with new code versions while minimizing service disruptions. Choosing the right strategy depends on your application requirements, cost considerations, and the desired impact on users. Below, we review the most commonly used deployment strategies.

## All at Once

In an all-at-once deployment, every EC2 instance within an auto scaling group running the current version is updated simultaneously. Although this method is straightforward, it can significantly disrupt users because all instances are updated at the same time.

## Rolling Update

A rolling update method updates only a subset of EC2 instances at a time. The upgrade proceeds gradually through the auto scaling group until all instances run the new version. This approach minimizes user impact by reducing the number of instances affected during any single update interval.

## Rolling Update with Additional Batch

This strategy is an enhanced version of the rolling update. It temporarily increases the number of EC2 instances during the upgrade process. For example, starting with four instances, new instances are spun up to establish a total of six. After verifying the performance of the new instances, the outdated ones are terminated.

> [!important]
> **Note**
>
> Although this method may incur additional costs due to the temporary increase in instances, it maintains overall processing capacity during the upgrade.

## Immutable Deployment

Immutable deployments create a new auto scaling group for the updated version while the existing group continues running the current version. Once the new group is stable, traffic is redirected to it, after which the old version can be safely decommissioned.

![The image illustrates the stages of an immutable deployment process in AWS Elastic Beanstalk, showing the transition from version 1 (v1) to version 2 (v2) with a new Auto Scaling Group (ASG).](https://kodekloud.com/kk-media/image/upload/v1752858846/notes-assets/images/AWS-Certified-Developer-Associate-Deployment-Options/immutable-deployment-aws-eb-diagram.jpg)

## Traffic Splitting

Traffic splitting gradually shifts traffic from the current version to the updated one. Initially, the load balancer or DNS entry directs most traffic to the original version. As you deploy the new version in a separate auto scaling group, you can configure a split (for instance, 90% to version one and 10% to version two) and gradually adjust until the migration is complete.

![The image illustrates Elastic Beanstalk deployment options with traffic splitting, showing 90% of traffic directed to version 1 (v1) and 10% to version 2 (v2).](https://kodekloud.com/kk-media/image/upload/v1752858847/notes-assets/images/AWS-Certified-Developer-Associate-Deployment-Options/elastic-beanstalk-traffic-splitting.jpg)

## Blue-Green Deployment

Blue-green deployment involves maintaining two complete environments concurrently: one running the current version (blue) and the other running the updated version (green). Using a service like Route 53, traffic is switched from the blue environment to the green environment once the new version is verified. This method minimizes downtime and simplifies rollback if issues occur.

![The image illustrates Elastic Beanstalk deployment options using a blue/green strategy, showing two environments (V1 and V2) connected to a Route 53 service.](https://kodekloud.com/kk-media/image/upload/v1752858848/notes-assets/images/AWS-Certified-Developer-Associate-Deployment-Options/elastic-beanstalk-blue-green-deployment.jpg)

## Summary

| Deployment Strategy                      | Description                                                                                | Impact on Users                                                     |
| ---------------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| **All at Once**                          | Simultaneously updates every EC2 instance.                                                 | High -- All instances are affected at once.                         |
| **Rolling Update**                       | Gradually updates subsets of instances across the auto scaling group.                      | Medium -- Reduces impact by updating in phases.                     |
| **Rolling Update with Additional Batch** | Temporarily scales out instances during the update to maintain capacity.                   | Medium -- Ensures continuous processing capacity at increased cost. |
| **Immutable Deployment**                 | Deploys the new version in a separate auto scaling group and switches traffic once stable. | Low -- No interference with the current version until transition.   |
| **Traffic Splitting**                    | Steadily migrates traffic between versions using a load balancer or DNS configuration.     | Low -- Allows gradual migration with minimal disruption.            |
| **Blue-Green Deployment**                | Maintains parallel environments and switches traffic using a service like Route 53.        | Low -- Minimizes downtime and offers an easy rollback solution.     |

Each deployment option has its trade-offs in terms of cost, complexity, and potential impact on users. Choose the strategy that aligns best with your application infrastructure and operational requirements.

> [!important]
> **Warning**
>
> It is essential to thoroughly test your chosen deployment strategy in a staging environment before applying it to production to avoid unforeseen issues.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/3f5ca094-fa86-4914-92ae-0ccab67b102d/lesson/afa85fcc-93cd-4b2f-8e37-01bc89d21881)**
>
> Watch video content
