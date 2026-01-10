# Disk Fill Scenario on EC2 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Chaos-Engineering/Chaos-Engineering-on-Compute-EC2/Disk-Fill-Scenario-on-EC2)

---

## Table of Contents

- Disk Fill Scenario on EC2
  - FIS Experiment Components
  - References
  - Watch Video

---

## Content

Chaos Engineering

Chaos Engineering on Compute EC2

# Disk Fill Scenario on EC2

In this walkthrough, you’ll create your first AWS Fault Injection Simulator (FIS) experiment against the PET Adoption website. By using the AWS FIS API to simulate a disk-fill failure on an EC2 instance, you’ll learn how your application responds to storage exhaustion in one Availability Zone (AZ). This test is crucial for validating your system’s resilience.

> [!important]
> **Prerequisites**
>
> - AWS CLI v2 configured with appropriate IAM permissions for FIS and EC2
> - Target PET Adoption environment deployed across multiple AZs
> - AWS FIS service enabled in your chosen region

## FIS Experiment Components

Before running the scenario, define the two core elements of any chaos experiment:

1.  **Given**  
    The current architecture of the PET Adoption website includes:
    - EC2 instances distributed across multiple Availability Zones
    - An Elastic Load Balancer handling incoming traffic
    - An Auto Scaling Group maintaining desired instance count

    | Resource                    | Role                             |
    | --------------------------- | -------------------------------- |
    | EC2 instances (multi-AZ)    | Application web servers          |
    | Elastic Load Balancer (ELB) | Distributes traffic evenly       |
    | Auto Scaling Group (ASG)    | Scales instances based on demand |

2.  **Hypothesis**  
    Injecting a disk-fill failure on a single EC2 instance in one AZ will **not** impact overall availability. With traffic routed to healthy instances in other AZs, the PET Adoption web page should remain responsive.

![The image illustrates a disk fill scenario on AWS EC2, showing a Virtual Private Cloud (VPC) setup with various components and a hypothesis that an EC2 disk filling up in a single availability zone will not affect application availability.](https://kodekloud.com/kk-media/image/upload/v1752871850/notes-assets/images/Chaos-Engineering-Disk-Fill-Scenario-on-EC2/aws-ec2-disk-fill-vpc-setup.jpg)

Next, we’ll walk through the step-by-step execution of this FIS experiment and verify whether our hypothesis holds true.

## References

- [AWS Fault Injection Simulator Documentation](https://docs.aws.amazon.com/fis/latest/userguide/)
- [AWS CLI FIS Commands](https://docs.aws.amazon.com/cli/latest/reference/fis/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/chaos-engineering/module/822aac19-f6c1-4f39-bc41-59b523a98155/lesson/42443b6a-8f8c-4d3b-afa6-e9e70347730d)**
>
> Watch video content
