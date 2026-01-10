# Updating ECS Task - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Containers-on-AWS/Updating-ECS-Task)

---

## Table of Contents

- Updating ECS Task
  - Example 1: Update With Balanced Capacity
  - Example 2: Update With Maximum Availability
  - Conclusion
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Containers on AWS

# Updating ECS Task

In this article, we explain how to update an Amazon ECS (Elastic Container Service) task when a new version of your application is available. This guide covers how to replace the old task version with a new one while guaranteeing that sufficient capacity is maintained during the update process.

ECS task updates rely on two key configuration parameters:

1.  **Minimum Healthy Percent**:  
    This setting defines the minimum number of tasks that must remain in service during an update. It ensures that a specified portion of tasks stays active, preventing service downtime.
2.  **Maximum Healthy Percent**:  
    This parameter defines the maximum number of tasks allowed to run concurrently during an update. It specifies how many tasks can be temporarily added to maintain overall capacity.

During an update, ECS does not modify existing tasks directly. Instead, it terminates a portion of the running tasks and deploys new ones using the updated task definition. Consequently, both the old and new versions might run concurrently until the update process is fully complete.

---

## Example 1: Update With Balanced Capacity

Consider a scenario where four tasks are running version 1 of your application with the following configuration:

- **Minimum Healthy Percent**: 25%
- **Maximum Healthy Percent**: 100%

With these settings:

- A minimum healthy percent of 25% means that at least one task (25% of 4) must always remain running.
- A maximum healthy percent of 100% ensures that at no time does the number of running tasks exceed four.

During the update:

- ECS removes up to three tasks at a time, ensuring that at least one task remains active.
- New tasks are deployed to replace the terminated tasks.
- Initially, you might have one task running the old version and three tasks running the new version.
- Once the new tasks are verified as healthy, the remaining old task is terminated and replaced by a new version.

![The image illustrates an ECS updating task process, showing a transition from version 1 (v1) to version 2 (v2) with a minimum of 25% and a maximum of 100% tasks updated, out of a total of 4 tasks.](https://kodekloud.com/kk-media/image/upload/v1752858603/notes-assets/images/AWS-Certified-Developer-Associate-Updating-ECS-Task/ecs-task-update-v1-v2.jpg)

---

## Example 2: Update With Maximum Availability

Now, consider a configuration with these parameters:

- **Total tasks**: 4
- **Minimum Healthy Percent**: 100%
- **Maximum Healthy Percent**: 125%

This configuration implies:

- A minimum healthy percent of 100% guarantees that all four tasks remain running at all times.
- A maximum healthy percent of 125% permits the total number of tasks to temporarily increase to five during the update process.

For this setup:

- ECS launches an additional task, increasing the count to five.
- Once the new task is confirmed healthy, ECS terminates one of the original tasks running version 1.
- This cycle continues until every task is updated to version 2 while ensuring uninterrupted service availability.

> [!important]
> **Note**
>
> By carefully configuring the minimum and maximum healthy percentages, you can balance service availability with an efficient rollout of new task versions. This flexibility ensures that updates can be performed with minimal impact to your application's performance.

---

## Conclusion

By understanding and properly setting the **Minimum Healthy Percent** and **Maximum Healthy Percent** parameters, you gain precise control over the ECS task update process. This ensures your application remains available throughout the update while seamlessly transitioning to newer versions of your tasks.

For more details on ECS task updates and best practices, refer to the [Amazon ECS Documentation](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-deployment-types.html) and other related resources.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/c28ddfac-bdff-4566-b056-f6c6391a0d11/lesson/d634b010-6b3c-43ed-a4c4-11bf83e7540e)**
>
> Watch video content
