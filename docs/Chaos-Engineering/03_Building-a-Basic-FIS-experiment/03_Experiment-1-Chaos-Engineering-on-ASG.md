# Experiment 1 Chaos Engineering on ASG - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Chaos-Engineering/Building-a-Basic-FIS-experiment/Experiment-1-Chaos-Engineering-on-ASG)

---

## Table of Contents

- Experiment 1 Chaos Engineering on ASG
  - Components of the FIS Experiment
  - Experiment Steps
  - References
  - Watch Video

---

## Content

Chaos Engineering

Building a Basic FIS experiment

# Experiment 1 Chaos Engineering on ASG

In this chapter, we’ll design and execute our first AWS Fault Injection Simulator (FIS) experiment against an Auto Scaling Group (ASG). The goal is to validate that terminating a single EC2 instance does not degrade application availability because the ASG will replace it automatically.

## Components of the FIS Experiment

| Component  | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Given      | We have an application running on EC2 instances spread across multiple Availability Zones, all managed by an Auto Scaling Group.                             |
| Hypothesis | If we terminate one EC2 instance, the Auto Scaling Group will launch a new instance, and the application will continue serving traffic without interruption. |

> [!important]
> **Note**
>
> We use [AWS Fault Injection Simulator](https://docs.aws.amazon.com/fis/latest/userguide/what-is-fis.html) to safely inject failures and test application resilience. Make sure your IAM role has the required permissions to execute FIS experiments.

## Experiment Steps

1.  **Create FIS Experiment Template**  
    Define the target resources (the ASG) and select the `aws:ec2:terminate-instances` action.
2.  **Specify Targets and Actions**
    - Target: EC2 instances belonging to your ASG
    - Action: Terminate one randomly selected instance
3.  **Set Stop Conditions**  
    Monitor CloudWatch alarms (e.g., high error rates or latency). If any alarm triggers, FIS will automatically stop the experiment.
4.  **Run and Observe**  
    Execute the FIS experiment and watch the ASG replace the terminated instance.
5.  **Validate Outcome**  
    Confirm that the new EC2 instance passes health checks and that no user-facing errors occur.

> [!important]
> **Warning**
>
> Always run chaos experiments in a staging or non-production environment first. Verify that your CloudWatch alarms and Auto Scaling health checks are correctly configured to avoid unintended downtime.

## References

- [AWS Fault Injection Simulator User Guide](https://docs.aws.amazon.com/fis/latest/userguide/)
- [Amazon EC2 Auto Scaling User Guide](https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html)
- [Defining FIS Experiment Templates](https://docs.aws.amazon.com/fis/latest/userguide/experimentation-templates.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/chaos-engineering/module/d49a2b6d-60a1-4603-965d-7e8292688875/lesson/27610f4a-e273-4507-9382-c41aa18c06e9)**
>
> Watch video content
