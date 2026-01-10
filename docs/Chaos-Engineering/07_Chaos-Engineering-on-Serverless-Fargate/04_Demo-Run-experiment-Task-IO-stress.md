# Demo Run experiment Task IO stress - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Chaos-Engineering/Chaos-Engineering-on-Serverless-Fargate/Demo-Run-experiment-Task-IO-stress)

---

## Table of Contents

- Demo Run experiment Task IO stress
  - Table of Contents
  - Step 1: Create a New Experiment Template
  - Step 2: Define the I/O Stress Action
  - Step 3: Configure the Target
  - Step 4: Assign IAM Role and Enable Logging
  - Step 5: Review and Launch
  - References
  - Watch Video

---

## Content

Chaos Engineering

Chaos Engineering on Serverless Fargate

# Demo Run experiment Task IO stress

In this walkthrough, we’ll create an AWS Fault Injection Simulator (FIS) experiment template to inject I/O stress on an ECS Fargate task. ECS Fargate offers a serverless compute engine for container workloads on Amazon ECS or EKS, eliminating the need to manage EC2 instances. By the end of this tutorial, you’ll know how to configure an FIS template to target Fargate tasks, apply I/O load, and monitor the impact in real time.

> [!important]
> **Prerequisites**
>
> - An existing ECS Fargate service with tasks prefixed by `pay-for-adoption`
> - IAM role for FIS (e.g., `AWSFISRole`) with `fis.amazonaws.com` trust and necessary permissions
> - CloudWatch log group (e.g., `FIS-experiments`) for experiment logs

## Table of Contents

- [Step 1: Create a New Experiment Template](#step-1-create-a-new-experiment-template)
- [Step 2: Define the I/O Stress Action](#step-2-define-the-i-o-stress-action)
- [Step 3: Configure the Target](#step-3-configure-the-target)
- [Step 4: Assign IAM Role and Enable Logging](#step-4-assign-iam-role-and-enable-logging)
- [Step 5: Review and Launch](#step-5-review-and-launch)
- [References](#references)

---

## Step 1: Create a New Experiment Template

1.  Sign in to the AWS Console and go to **AWS Fault Injection Simulator (FIS)** > **Experiment templates**.
2.  Click **Create experiment template**, then confirm your AWS account.
3.  Fill in the basic details:
    - **Name**: `ecs-fargate-io-stress-test` (optional)
    - **Description**:

      ```
      ECS Fargate I/O stress test
      ```
4.  Leave other settings at their defaults and proceed to the **Actions** section.

## Step 2: Define the I/O Stress Action

1.  Under **Actions**, click **Add action**.
2.  For **Action name**, enter:

    ```
    ecs-fargate-io-stress-test
    ```

3.  Select **AWS ECS Task I/O stress** as the **Action type**.
4.  Configure action parameters:

| Parameter  | Value      | Description                             |
| ---------- | ---------- | --------------------------------------- |
| Duration   | 10 minutes | Total time to run the I/O stress        |
| Workers    | (default)  | Number of parallel I/O workers          |
| Task count | (default)  | Percentage or number of tasks to affect |

5.  Click **Save**.

![The image shows a form for creating an experiment template in AWS, specifically for an ECS Fargate IO stress test. It includes fields for action type, target, duration, and optional parameters like dependencies and workers.](https://kodekloud.com/kk-media/image/upload/v1752871910/notes-assets/images/Chaos-Engineering-Demo-Run-experiment-Task-IO-stress/aws-ecs-fargate-experiment-template-form.jpg)

## Step 3: Configure the Target

1.  Scroll to **Targets** and choose **Add target**.
2.  Set **Resource type** to `ecs:Task`.
3.  Under **Target method**, pick **Resource ID**.
4.  In the filter box, enter the prefix `pay-for-adoption` to find matching tasks.
5.  Select both ECS Fargate tasks from the results.
6.  Keep **Selection mode** as **All** (to target every matching task).
7.  Click **Save**.

![The image shows a user interface for creating an experiment template in AWS, specifically editing a target for an ECS Fargate IO stress test. It includes fields for naming, resource type, and selecting actions.](https://kodekloud.com/kk-media/image/upload/v1752871911/notes-assets/images/Chaos-Engineering-Demo-Run-experiment-Task-IO-stress/aws-ecs-fargate-experiment-template-ui.jpg)

## Step 4: Assign IAM Role and Enable Logging

1.  Under **Experiment role**, choose your IAM role for FIS (e.g., `AWSFISRole`).
2.  In **Logs**, select **Send logs to CloudWatch Logs** and choose the log group `FIS-experiments`.
3.  Click **Create experiment template** to finalize.

> [!important]
> **Warning**
>
> Ensure your IAM role has permissions for both FIS actions and CloudWatch logging. Missing permissions can cause experiment failures.

## Step 5: Review and Launch

1.  On the template summary page, verify:
    - The action name and parameters
    - The target tasks
    - The experiment role and log configuration
2.  Click **Start experiment**.
3.  Monitor the state switch to **Running**.

![The image shows an AWS Resilience Hub interface, specifically the Fault Injection Service (FIS) section, displaying details of an experiment template with targets and a preview of resources.](https://kodekloud.com/kk-media/image/upload/v1752871912/notes-assets/images/Chaos-Engineering-Demo-Run-experiment-Task-IO-stress/aws-resilience-hub-fault-injection-template.jpg)

After starting, switch to the **AWS FIS dashboard** to track progress and view metrics like CPU usage, memory, and I/O throughput in real time.

![The image shows an AWS Fault Injection Simulator (FIS) dashboard with details of a running experiment, including its ID, state, creation time, and associated resources. The interface displays options for managing the experiment, such as stopping it and viewing logs.](https://kodekloud.com/kk-media/image/upload/v1752871914/notes-assets/images/Chaos-Engineering-Demo-Run-experiment-Task-IO-stress/aws-fault-injection-simulator-dashboard.jpg)

Use these insights to analyze how I/O stress impacts your application’s performance and resilience.

## References

- [AWS Fault Injection Simulator Documentation](https://docs.aws.amazon.com/fis/latest/userguide/)
- [Amazon ECS Fargate](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html)
- [AWS IAM Roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/chaos-engineering/module/5fdff083-6ddb-4b6a-a584-9c877b0e9c7b/lesson/eec4723f-70f9-44e4-a660-24aca2db9931)**
>
> Watch video content
