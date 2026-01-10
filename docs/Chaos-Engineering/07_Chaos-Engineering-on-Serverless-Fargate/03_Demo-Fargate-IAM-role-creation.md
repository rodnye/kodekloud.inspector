# Demo Fargate IAM role creation - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Chaos-Engineering/Chaos-Engineering-on-Serverless-Fargate/Demo-Fargate-IAM-role-creation)

---

## Table of Contents

- Demo Fargate IAM role creation
  - Prerequisites
  - Step 1: Start Role Creation
  - Step 2: Configure Role Details
  - Step 3: Attach Required IAM Policies
  - Finalize and Verify
  - Links & References
  - Watch Video

---

## Content

Chaos Engineering

Chaos Engineering on Serverless Fargate

# Demo Fargate IAM role creation

In this walkthrough, you'll learn how to create an IAM role for running chaos experiments on Amazon ECS Fargate using AWS Fault Injection Simulator (FIS). By the end, your `ECS-Fargate-FIS-Role` will have the permissions needed for logging, SSM commands, and ECS operations.

## Prerequisites

- An AWS account with permissions to create roles and attach policies (`iam:CreateRole`, `iam:AttachRolePolicy`).
- Basic familiarity with AWS IAM, ECS Fargate, and AWS FIS.

## Step 1: Start Role Creation

1.  Open the AWS IAM console and click **Create role**.
2.  Under **Select trusted entity**, choose **AWS service**.
3.  From the service list, select **AWS Fault Injection Simulator (FIS)**.
4.  In the **Use case** section, pick **ECS Fargate** since your experiments will target Fargate tasks.

![The image shows an AWS console interface where a user is selecting a use case for the Fault Injection Simulator (FIS) service, with options for different types of access like EC2, ECS, and EKS.](https://kodekloud.com/kk-media/image/upload/v1752871904/notes-assets/images/Chaos-Engineering-Demo-Fargate-IAM-role-creation/aws-console-fault-injection-simulator.jpg)

> [!important]
> **Note**
>
> Selecting the correct trusted entity and use case ensures FIS can assume this role during experiments.

## Step 2: Configure Role Details

1.  Click **Next** to proceed to the role details page.
2.  Enter a descriptive name, for example `ECS-Fargate-FIS-Role`.
3.  (Optional) Add a description such as “Role for FIS chaos experiments on ECS Fargate.”
4.  Click **Create role** to finalize.

![The image shows an AWS console interface for creating a role, with fields for entering a role name and description, and a section for selecting trusted entities and trust policy details.](https://kodekloud.com/kk-media/image/upload/v1752871905/notes-assets/images/Chaos-Engineering-Demo-Fargate-IAM-role-creation/aws-console-create-role-interface.jpg)

## Step 3: Attach Required IAM Policies

Now that the role exists, attach the following managed policies to grant FIS the necessary permissions:

| Policy Name                         | Purpose                                                       |
| ----------------------------------- | ------------------------------------------------------------- |
| CloudWatch Logs Full Access         | Allow FIS to write experiment logs to CloudWatch Logs         |
| AmazonSSMFullAccess                 | Enable running SSM documents (commands) during the experiment |
| AWSFaultInjectionSimulatorECSAccess | Grant FIS permissions specific to ECS operations on Fargate   |

![The image shows an AWS Identity and Access Management (IAM) interface with a list of permission policies attached to a role. The policies include AmazonSSMFullAccess, AWSFaultInjectionSimulatorECSAccess, and CloudWatchLogsFullAccess.](https://kodekloud.com/kk-media/image/upload/v1752871907/notes-assets/images/Chaos-Engineering-Demo-Fargate-IAM-role-creation/aws-iam-interface-permission-policies.jpg)

> [!important]
> **Warning**
>
> For production environments, consider using least-privilege custom policies rather than full-access managed policies.

## Finalize and Verify

Your IAM role `ECS-Fargate-FIS-Role` is now ready. You can reference this role ARN when creating FIS experiments targeting ECS Fargate tasks.

## Links & References

- [AWS Fault Injection Simulator (FIS)](https://docs.aws.amazon.com/fis/latest/userguide/what-is-fault-injection-simulator.html)
- [Amazon ECS Fargate](https://aws.amazon.com/fargate/)
- [AWS Identity and Access Management (IAM) Documentation](https://docs.aws.amazon.com/iam/latest/UserGuide/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/chaos-engineering/module/5fdff083-6ddb-4b6a-a584-9c877b0e9c7b/lesson/8a02f91f-ec15-4d25-83fa-28b83a8cd33b)**
>
> Watch video content
