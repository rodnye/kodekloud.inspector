# Autoscaling Groups Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Load-Balancing-AutoScaling/Autoscaling-Groups-Overview)

---

## Table of Contents

- Autoscaling Groups Overview
  - Benefits and Features of Auto Scaling Groups
  - Launch Templates
  - Scaling Methods
  - Metrics and Cooldown Period
  - Instance Refresh
  - Summary
  - Watch Video
    - Dynamic Scaling
    - Predictive Scaling
    - Scheduled Scaling

---

## Content

AWS Certified Developer - Associate

Load Balancing AutoScaling

# Autoscaling Groups Overview

In this guide, you'll learn how auto scaling groups (ASGs) help manage EC2 instance capacity automatically based on your application’s traffic demands. Imagine an application that typically runs on three EC2 instances; during peak hours or special events, these instances might experience heavy traffic. With ASGs, you can automatically scale the number of instances without any manual intervention by setting scaling policies based on metrics like traffic load or CPU utilization.

![The image illustrates a network architecture with an Elastic Load Balancer (ELB) and Auto Scaling Group (ASG) handling traffic during peak hours, showing traffic flow from users to multiple server instances.](https://kodekloud.com/kk-media/image/upload/v1752859039/notes-assets/images/AWS-Certified-Developer-Associate-Autoscaling-Groups-Overview/network-architecture-elb-asg-traffic.jpg)

This automation removes the need for constant monitoring and manual adjustments. Best of all, auto scaling groups incur no additional charges—you only pay for the EC2 instances and the duration they run.

## Benefits and Features of Auto Scaling Groups

Auto scaling groups offer several powerful advantages:

1.  **Scalability:** Automatically add or remove EC2 instances based on current demand.
2.  **Cost Efficiency:** Reduce costs by scaling down during off-peak hours to avoid underutilized resources.
3.  **High Availability and Fault Tolerance:** Distribute instances across multiple availability zones, so if one zone experiences issues, your application remains accessible.
4.  **Load Balancer Integration:** Newly launched EC2 instances are registered automatically with an Elastic Load Balancer (ELB) to ensure smooth traffic distribution.

![The image shows a graphic of coins with a cross over them, accompanied by the text "ASG Pricing" and "No additional charge for AutoScaling Groups."](https://kodekloud.com/kk-media/image/upload/v1752859040/notes-assets/images/AWS-Certified-Developer-Associate-Autoscaling-Groups-Overview/asg-pricing-no-charge-coins.jpg)

![The image displays four features: Scalability, Cost Efficiency, High Availability, and Fault Tolerance, each represented by an icon and a colored circle.](https://kodekloud.com/kk-media/image/upload/v1752859041/notes-assets/images/AWS-Certified-Developer-Associate-Autoscaling-Groups-Overview/scalability-cost-efficiency-availability-fault-tolerance.jpg)

In the example below, as new EC2 instances are launched, the load balancer immediately starts directing traffic to them:

![The image illustrates a network architecture with traffic directed to an Elastic Load Balancer (ELB), which distributes the load to multiple instances within an Auto Scaling Group (ASG).](https://kodekloud.com/kk-media/image/upload/v1752859042/notes-assets/images/AWS-Certified-Developer-Associate-Autoscaling-Groups-Overview/network-architecture-elb-asg-diagram.jpg)

## Launch Templates

When you create an auto scaling group, you must define a launch template. This template is a blueprint that specifies how new EC2 instances should be configured and includes essential settings such as:

- AMI (Amazon Machine Image)
- Instance type
- Security groups
- Key pairs
- IAM roles
- Network interfaces
- User data

![The image illustrates a launch template process, showing components like AMI, instance type, security group, and more, leading to the creation of multiple instances.](https://kodekloud.com/kk-media/image/upload/v1752859043/notes-assets/images/AWS-Certified-Developer-Associate-Autoscaling-Groups-Overview/launch-template-process-ami-instances.jpg)

## Scaling Methods

Auto scaling groups provide flexible methods for managing capacity according to your application's needs.

### Dynamic Scaling

Dynamic scaling adjusts capacity in real-time based on demand and offers three options:

1.  **Simple Scaling:**  
    A scaling policy tied to a CloudWatch alarm triggers a change in capacity. For example, you may add instances when CPU utilization exceeds 70% and remove them when it falls below 30%.

    ![The image illustrates a simple scaling process using CloudWatch Alarms and a scaling policy, adjusting the number of instances based on CPU utilization thresholds.](https://kodekloud.com/kk-media/image/upload/v1752859045/notes-assets/images/AWS-Certified-Developer-Associate-Autoscaling-Groups-Overview/cloudwatch-scaling-process-diagram.jpg)

2.  **Step Scaling:**  
    This method allows you to define multiple scaling actions at different thresholds. For instance:
    - If CPU utilization is below 20%, significantly reduce instances.
    - If utilization is between 20% and 40%, moderately decrease capacity.
    - Maintain capacity when utilization is between 40% and 70%.
    - Add a few instances if CPU utilization is between 70% and 85%.
    - Add many instances if it exceeds 85%.

    ![The image illustrates "Types of Dynamic Scaling – Step Scaling," showing a range of CPU usage percentages with actions like removing, maintaining, or adding instances based on usage thresholds.](https://kodekloud.com/kk-media/image/upload/v1752859047/notes-assets/images/AWS-Certified-Developer-Associate-Autoscaling-Groups-Overview/dynamic-scaling-step-scaling-diagram.jpg)

3.  **Target Tracking Scaling:**  
    With this policy, you define a target value—for example, maintaining CPU utilization at 40%. The auto scaling group automatically adjusts the instance count to keep the metric at the desired level.

    ![The image illustrates a dynamic scaling process using a target tracking policy, where CPU utilization is maintained at 40% by adding or removing instances.](https://kodekloud.com/kk-media/image/upload/v1752859048/notes-assets/images/AWS-Certified-Developer-Associate-Autoscaling-Groups-Overview/dynamic-scaling-cpu-utilization.jpg)

### Predictive Scaling

Predictive scaling leverages machine learning to analyze historical traffic patterns and forecast future demand. This proactive approach scales your ASG in advance, ensuring that resources are available before experiencing increased traffic and thus reducing latency.

![The image illustrates "Predictive Scaling" with components like Historical Data Analysis, Machine Learning Forecasting, and Scheduled Scaling Actions, and shows how instances are added or removed based on traffic levels.](https://kodekloud.com/kk-media/image/upload/v1752859050/notes-assets/images/AWS-Certified-Developer-Associate-Autoscaling-Groups-Overview/predictive-scaling-forecasting-diagram.jpg)

### Scheduled Scaling

Scheduled scaling allows you to predefine specific times to increase or decrease capacity. For example, you might scale out from 6 PM to 12 AM during high traffic periods and scale in from 12 AM to 6 AM when demand is lower.

![The image illustrates scheduled scaling in cloud computing, showing how instances are added during high traffic (6 pm to 12 am) and removed during low traffic (12 am to 6 am) using CloudWatch Alarm.](https://kodekloud.com/kk-media/image/upload/v1752859051/notes-assets/images/AWS-Certified-Developer-Associate-Autoscaling-Groups-Overview/scheduled-scaling-cloud-computing.jpg)

## Metrics and Cooldown Period

ASGs rely on key metrics to trigger scaling actions, including:

- ASG Average CPU Utilization
- Network In (amount and number of packets)
- Network Out
- Requests per target (from the Application Load Balancer)

![The image displays four ASG metrics with icons: ASGAverageCPUUtilization, ASGAverageNetworkIn, ASGAverageNetworkOut, and ALBRequestCountPerTarget.](https://kodekloud.com/kk-media/image/upload/v1752859052/notes-assets/images/AWS-Certified-Developer-Associate-Autoscaling-Groups-Overview/asg-metrics-icons-diagram.jpg)

Rapid fluctuations in these metrics can lead to frequent scaling events. To mitigate this, a cooldown period is used after a scaling action, during which no further actions are taken. This pause helps stabilize the system before additional scaling activities are triggered.

![The image illustrates a "Cooldown Period" in scaling, showing an increase in instances from four to six, with a note that no further scaling is allowed until the cooldown period ends.](https://kodekloud.com/kk-media/image/upload/v1752859053/notes-assets/images/AWS-Certified-Developer-Associate-Autoscaling-Groups-Overview/cooldown-period-scaling-instances.jpg)

## Instance Refresh

When you update your launch template, existing EC2 instances may have outdated configurations. Auto scaling groups offer an instance refresh feature that replaces these outdated instances with new ones running the updated configuration. This update is performed gradually to ensure your application remains available throughout the process.

![The image illustrates the process of an "Instance Refresh," showing steps from updating a launch template to applying a new configuration and replacing instances.](https://kodekloud.com/kk-media/image/upload/v1752859054/notes-assets/images/AWS-Certified-Developer-Associate-Autoscaling-Groups-Overview/instance-refresh-launch-template-steps.jpg)

## Summary

ASGs enable you to manage EC2 instance capacity based on real-time and predicted demand without incurring extra costs. Key takeaways include:

- The launch template acts as a blueprint for configuring new EC2 instances.
- **Simple scaling:** Uses a single CloudWatch alarm and scaling policy for capacity adjustments.
- **Step scaling:** Provides more granular control with multiple actions at different thresholds.
- **Target tracking scaling:** Automatically maintains a desired metric value.
- **Predictive scaling:** Uses machine learning to forecast demand and scale proactively.
- **Scheduled scaling:** Executes scaling based on predefined time intervals.
- **Cooldown period:** Prevents rapid, successive scaling activities to stabilize the system.
- **Instance refresh:** Ensures all running instances are updated with the latest configurations.

![The image is a summary slide outlining key points about AWS EC2 instance scaling, including metrics-based scaling, no extra cost, launch templates, simple scaling policies, and target tracking scaling policies.](https://kodekloud.com/kk-media/image/upload/v1752859056/notes-assets/images/AWS-Certified-Developer-Associate-Autoscaling-Groups-Overview/aws-ec2-instance-scaling-summary.jpg)

![The image is a summary slide detailing aspects of auto-scaling, including predictive scaling, scheduled scaling, cooldown periods, and instance refresh. It features a gradient background with numbered points.](https://kodekloud.com/kk-media/image/upload/v1752859058/notes-assets/images/AWS-Certified-Developer-Associate-Autoscaling-Groups-Overview/auto-scaling-summary-predictive-scaling.jpg)

> [!important]
> **Quick Tip**
>
> For more detailed information about auto scaling groups and other AWS services, consider exploring the [AWS Documentation](https://aws.amazon.com/documentation/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/c5fbed4d-288a-4e90-9f57-04fbe853f8a5/lesson/8c9d57db-5464-4cb3-92f2-42d90bc33a80)**
>
> Watch video content
