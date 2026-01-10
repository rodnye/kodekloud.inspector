# Demo FIS experiment CloudWatch Dashboard - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Chaos-Engineering/Building-a-Basic-FIS-experiment/Demo-FIS-experiment-CloudWatch-Dashboard)

---

## Table of Contents

- Demo FIS experiment CloudWatch Dashboard
  - Dashboard Widgets Overview
  - How to Interpret the Charts
  - Conclusion
  - References
  - Watch Video

---

## Content

Chaos Engineering

Building a Basic FIS experiment

# Demo FIS experiment CloudWatch Dashboard

In this lesson, we’ll leverage a pre-configured [Amazon CloudWatch](https://aws.amazon.com/cloudwatch/) dashboard to monitor an [Auto Scaling Group (ASG)](https://docs.aws.amazon.com/autoscaling/ec2/userguide/auto-scaling-groups.html) during a [Fault Injection Simulator (FIS)](https://aws.amazon.com/fis/) experiment. This setup provides real-time insights into ELB health checks and ASG instance status, enabling you to track scaling behavior and resilience under controlled failures.

> [!important]
> **Prerequisites**
>
> - An AWS FIS experiment configured to terminate or impair EC2 instances
> - An ASG with `minCapacity` set to a desired level
> - A CloudWatch dashboard pre-populated with the relevant widgets

## Dashboard Widgets Overview

| Widget Name          | Metrics Displayed                        | Purpose                                    |
| -------------------- | ---------------------------------------- | ------------------------------------------ |
| ELB Host HealthCheck | Healthy vs. unhealthy instances          | Monitors ELB health check results          |
| ASG Instance Checks  | Total, pending, and in-service instances | Tracks scaling events and lifecycle status |

## How to Interpret the Charts

1.  **ELB Host HealthCheck**
    - **Baseline**: Starts with 2 healthy instances.
    - **During FIS**: One instance is terminated → healthy count drops to 1.
    - **Recovery**: ASG’s `minCapacity=2` triggers a replacement → healthy count returns to 2.

2.  **ASG Instance Checks**
    - **Pending**: Instances being initialized after launch.
    - **InService**: Fully operational, serving traffic.
    - The graph pattern mirrors the ELB health trend, reflecting when the ASG spins up replacement instances.

![The image shows a dashboard with two graphs: one for ELB Host HealthCheck displaying healthy and unhealthy counts, and another for ASG Instance Checks showing total, pending, and in-service instances over time.](https://kodekloud.com/kk-media/image/upload/v1752871783/notes-assets/images/Chaos-Engineering-Demo-FIS-experiment-CloudWatch-Dashboard/elb-healthcheck-asg-instance-dashboard.jpg)

> [!important]
> **Watch for Rapid Scaling**
>
> If you terminate multiple instances at once or set a high desired capacity, the ASG may launch many replacements simultaneously. Monitor the **ASG Instance Checks** widget to avoid unexpected resource costs.

## Conclusion

By correlating the ELB Host HealthCheck and ASG Instance Checks charts, you gain a clear, real-time view of how FIS-induced failures impact instance health and auto scaling. This dashboard becomes a powerful tool for validating the resiliency and fault tolerance of your AWS infrastructure.

## References

- [Amazon CloudWatch](https://aws.amazon.com/cloudwatch/)
- [AWS Fault Injection Simulator (FIS)](https://aws.amazon.com/fis/)
- [Auto Scaling Groups](https://docs.aws.amazon.com/autoscaling/ec2/userguide/auto-scaling-groups.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/chaos-engineering/module/d49a2b6d-60a1-4603-965d-7e8292688875/lesson/e93eaaf4-f98e-46e4-b5e1-75cd60fd22a1)**
>
> Watch video content
