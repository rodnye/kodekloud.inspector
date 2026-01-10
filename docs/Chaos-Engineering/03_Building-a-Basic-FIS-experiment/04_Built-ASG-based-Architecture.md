# Built ASG based Architecture - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Chaos-Engineering/Building-a-Basic-FIS-experiment/Built-ASG-based-Architecture)

---

## Table of Contents

- Built ASG based Architecture
  - 1. Create an EC2 Launch Template
  - 2. Configure the Auto Scaling Group
  - 3. Create a CloudWatch Log Group
  - Watch Video
    - Steps

---

## Content

Chaos Engineering

Building a Basic FIS experiment

# Built ASG based Architecture

In this guide, you’ll deploy a simple AWS architecture using the Management Console to kick off an introduction to the AWS Fault Injection Service (FIS). We’ll create three components:

1.  **EC2 Launch Template** tagged for our experiment
2.  **Auto Scaling Group (ASG)** spanning two Availability Zones
3.  **CloudWatch Log Group** for FIS experiment logs

> [!important]
> **Note**
>
> This demo uses **only** the AWS Management Console—no IaC templates or GitHub repositories required.

---

## 1\. Create an EC2 Launch Template

An EC2 Launch Template defines the configuration (AMI, instance type, security groups, tags) that the ASG will use to provision EC2 instances.

1.  Open the EC2 console and navigate to **Launch Templates**.
2.  Click **Create launch template**.
3.  Enter the following details:
    - **Launch template name**: `FIS-Experiment-Template`
    - **Template version description**: _Initial version for FIS experiment_
    - **Tags**:
      - Key: `experiment`
      - Value: `fault-injection`
    - Choose your **AMI**, **Instance Type**, **Key Pair**, **Security Groups**, etc.
4.  Review and click **Create launch template**.

For more information, see the AWS documentation on [EC2 Launch Templates](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-launch-templates.html).

---

## 2\. Configure the Auto Scaling Group

Your Auto Scaling Group will maintain a desired capacity of 1 instance (minimum 1, maximum 4) across two Availability Zones. If an instance terminates, the ASG will automatically launch a replacement to maintain the desired capacity.

| Setting            | Value                                |
| ------------------ | ------------------------------------ |
| Launch template    | `FIS-Experiment-Template`            |
| Availability Zones | 2 (e.g., `us-east-1a`, `us-east-1b`) |
| Desired capacity   | 1                                    |
| Minimum capacity   | 1                                    |
| Maximum capacity   | 4                                    |

### Steps

1.  In the EC2 console, go to **Auto Scaling Groups** → **Create Auto Scaling group**.
2.  Select **Launch template** and choose `FIS-Experiment-Template`.
3.  Select two subnets in different Availability Zones.
4.  Under **Configure group size and scaling policies**, set the capacity values as shown above.
5.  (Optional) Add scaling policies if you want the group to scale based on metrics.
6.  Review and click **Create Auto Scaling group**.

> [!important]
> **Warning**
>
> Ensure your selected subnets have sufficient IP addresses to support up to 4 instances simultaneously.

---

## 3\. Create a CloudWatch Log Group

AWS FIS will publish all experiment activity to CloudWatch Logs. Create a dedicated log group named `FIS-Experiment`.

1.  Open the CloudWatch console and select **Logs** → **Log groups**.
2.  Click **Create log group**.
3.  Enter **Log group name**: `FIS-Experiment`
4.  (Optional) Configure a retention policy (e.g., 30 days).
5.  Click **Create**.

| Resource                    | Purpose                                                       |
| --------------------------- | ------------------------------------------------------------- |
| Log group: `FIS-Experiment` | Captures AWS FIS experiment logs from your Auto Scaling Group |

For more details, refer to the [Amazon CloudWatch Logs documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html).

---

With these three components in place—EC2 Launch Template, Auto Scaling Group, and CloudWatch Log Group—you’re ready to begin your AWS Fault Injection Service experiment. In the next section, we’ll configure and execute an FIS experiment against this architecture.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/chaos-engineering/module/d49a2b6d-60a1-4603-965d-7e8292688875/lesson/c2a24581-4089-4535-852f-ee7edd476dc0)**
>
> Watch video content
