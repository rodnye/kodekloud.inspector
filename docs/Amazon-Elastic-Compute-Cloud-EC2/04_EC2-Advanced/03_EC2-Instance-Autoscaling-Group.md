# EC2 Instance Autoscaling Group - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Amazon-Elastic-Compute-Cloud-EC2/EC2-Advanced/EC2-Instance-Autoscaling-Group)

---

## Table of Contents

- EC2 Instance Autoscaling Group
  - Introduction
  - Bakery Analogy for Auto Scaling
  - What Is EC2 Auto Scaling?
  - Key Features
  - Fixed Limit (Manual) Scaling
  - Auto Healing
  - Dynamic Scaling Policies
  - Scheduled Scaling
  - Launch Templates
  - References
  - Watch Video
  - Practice Lab
    - Target Tracking Scaling
    - Simple Scaling
    - Step Scaling

---

## Content

Amazon Elastic Compute Cloud (EC2)

EC2 Advanced

# EC2 Instance Autoscaling Group

## Introduction

In this guide, we explore how EC2 Auto Scaling Groups (ASGs) help maintain application performance and cost efficiency on AWS. You’ll learn the core concepts, scaling policies, and configuration best practices for automatically adjusting EC2 capacity to match real-world demand.

## Bakery Analogy for Auto Scaling

To visualize Auto Scaling, imagine a bakery that manages ovens based on customer flow:

- When ovens reach 80% capacity, a new oven turns on.
- When utilization drops below 20%, an oven shuts off.

![The image illustrates the concept of autoscaling using a bakery analogy, showing a bakery, ovens, and users with cupcakes.](https://kodekloud.com/kk-media/image/upload/v1752868999/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-EC2-Instance-Autoscaling-Group/autoscaling-bakery-analogy-cupcakes.jpg)

This model ensures resources dynamically match demand—just like AWS Auto Scaling Groups.

## What Is EC2 Auto Scaling?

AWS Auto Scaling Groups automatically add or remove EC2 instances to maintain performance and availability. When incoming traffic spikes, ASGs launch new instances; when demand subsides, they terminate unneeded instances.

![The image illustrates the concept of EC2 Autoscaling, showing a group of computing resources that can scale up or down in response to demand, connected to a user interface.](https://kodekloud.com/kk-media/image/upload/v1752869000/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-EC2-Instance-Autoscaling-Group/ec2-autoscaling-computing-resources-diagram.jpg)

## Key Features

- Automated **Scaling Policies** (manual, dynamic, scheduled)
- **Auto Healing** to replace unhealthy instances
- Seamless integration with Elastic Load Balancing and CloudWatch

![The image outlines features of autoscaling, highlighting "Scaling Policy" with options for manual, dynamic, and scheduled scaling, and "Auto Healing."](https://kodekloud.com/kk-media/image/upload/v1752869001/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-EC2-Instance-Autoscaling-Group/autoscaling-features-scaling-policy-diagram.jpg)

## Fixed Limit (Manual) Scaling

Specify **minimum**, **desired**, and **maximum** capacity for your ASG. The group:

1.  Always runs at least the minimum instances.
2.  Launches up to the desired count.
3.  Never exceeds the maximum.

![The image illustrates three scenarios of autoscaling with manual fixed limits, showing different configurations of minimum, desired, and maximum values for scaling. Each scenario includes icons representing scaling operations.](https://kodekloud.com/kk-media/image/upload/v1752869003/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-EC2-Instance-Autoscaling-Group/autoscaling-manual-limits-scenarios.jpg)

## Auto Healing

Auto Healing leverages health checks to detect failed instances. When an instance is marked unhealthy, ASG terminates and replaces it to preserve capacity.

![The image illustrates an autoscaling group with auto-recovery, showing a desired number of instances and a mechanism for managing them. It includes icons representing scaling and recovery processes.](https://kodekloud.com/kk-media/image/upload/v1752869005/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-EC2-Instance-Autoscaling-Group/autoscaling-group-auto-recovery-diagram.jpg)

## Dynamic Scaling Policies

Dynamic scaling adapts in real time to workload fluctuations. ASGs support three policy types:

| Scaling Policy Type | Description                                | Example Metric        |
| ------------------- | ------------------------------------------ | --------------------- |
| Target Tracking     | Maintain a target metric (e.g., CPU)       | CPUUtilization        |
| Simple Scaling      | Triggered by one CloudWatch alarm          | S3 ObjectCount        |
| Step Scaling        | Multi-tier adjustments based on thresholds | ≥70% adds 2 instances |

![The image illustrates an autoscaling dynamic scaling policy with three types: Target Tracking Scaling, Step Scaling, and Simple Scaling.](https://kodekloud.com/kk-media/image/upload/v1752869005/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-EC2-Instance-Autoscaling-Group/autoscaling-dynamic-scaling-policy-diagram.jpg)

> [!important]
> **Note**
>
> You can monitor default metrics like CPU, network in/out, or Application Load Balancer request count. For custom metrics, publish them to CloudWatch first.

### Target Tracking Scaling

Automatically keeps a metric at your target value. For instance, set a 50% average CPU utilization across two instances. If utilization exceeds 50% for five minutes, ASG adds an instance; if it falls below, it removes one.

![The image illustrates "Target Tracking Scaling" with five microchip icons, each partially filled with green, and a central icon representing scaling options. The text indicates minimum, desired, and maximum values for scaling.](https://kodekloud.com/kk-media/image/upload/v1752869007/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-EC2-Instance-Autoscaling-Group/target-tracking-scaling-microchips-diagram.jpg)

### Simple Scaling

Uses a pair of CloudWatch alarms—one for scale-out and one for scale-in. When an alarm triggers, ASG adjusts capacity by a fixed number or to a specific size.

![The image illustrates a simple scaling concept with CPU icons, a cloud monitoring symbol, and a bar graph indicating EC2 CPU utilization.](https://kodekloud.com/kk-media/image/upload/v1752869008/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-EC2-Instance-Autoscaling-Group/scaling-concept-cpu-cloud-ec2-utilization.jpg)

### Step Scaling

Allows tiered responses to metric breaches. Define thresholds and corresponding adjustments (e.g., >60% CPU adds 1 instance, >90% adds 3).

![The image illustrates a step scaling process for EC2 CPU utilization, showing a series of CPU icons connected to a monitoring and scaling system.](https://kodekloud.com/kk-media/image/upload/v1752869009/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-EC2-Instance-Autoscaling-Group/ec2-cpu-utilization-scaling-process.jpg)

> [!important]
> **Warning**
>
> Ensure your CloudWatch alarms have sufficient evaluation periods to prevent flapping (rapid scale up/down).

## Scheduled Scaling

Plan capacity around predictable load patterns. For example, increase desired capacity from 10 a.m. to 8 p.m. and schedule scale-down afterward. Scheduled actions support one-time or recurring [cron expressions](https://docs.aws.amazon.com/autoscaling/ec2/userguide/schedule_time.html#schedule-cron).

![The image illustrates how scheduled autoscaling works for a website, showing different scaling parameters for two time periods.](https://kodekloud.com/kk-media/image/upload/v1752869010/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-EC2-Instance-Autoscaling-Group/scheduled-autoscaling-website-illustration.jpg)

## Launch Templates

An Auto Scaling Group requires a launch template defining the AMI, instance type, network settings, security groups, and key pairs. This template ensures consistency across all instances launched by ASG.

For detailed steps, refer to the [EC2 Launch Templates documentation](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/LaunchTemplates.html).

## References

- AWS Auto Scaling Groups: https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html
- Application Load Balancer: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html
- CloudWatch Alarms: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html
- EC2 AMIs: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2/module/fe995ae2-a50f-4c70-9d50-3f2e017bd207/lesson/733baff2-d8f4-4093-8d45-a29190c0d930)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2/module/fe995ae2-a50f-4c70-9d50-3f2e017bd207/lesson/42545087-e1de-473b-aca8-b810ba4c2f71)**
>
> Practice lab
