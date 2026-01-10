# What is AWS FIS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Chaos-Engineering/Chaos-Engineering-Fundamentals/What-is-AWS-FIS)

---

## Table of Contents

- What is AWS FIS
  - Key Benefits
  - AWS FIS Architecture
  - Managing Experiments
  - Security & Permissions
  - Links and References
  - Watch Video

---

## Content

Chaos Engineering

Chaos Engineering Fundamentals

# What is AWS FIS

In the world of Chaos Engineering, tools like Netflix’s [Chaos Monkey](https://github.com/Netflix/chaosmonkey) pioneered fault injection testing. Today, platforms such as Gremlin, Azure Chaos Studio, and **AWS Fault Injection Simulator (FIS)** help teams validate system resilience under real-world failure scenarios.

AWS FIS is a fully managed service that lets you run fault-injection experiments on AWS workloads. By deliberately introducing failures, you can:

- Identify weaknesses before they affect customers
- Validate auto-scaling, failover, and recovery processes
- Ensure SLAs are met under adverse conditions

> [!important]
> **Note**
>
> AWS FIS supports both simple and complex scenarios—from terminating individual EC2 instances to simulating an Availability Zone outage.

## Key Benefits

| Benefit                   | Description                                                         |
| ------------------------- | ------------------------------------------------------------------- |
| Fully Managed             | No need to provision infrastructure for fault injection             |
| Native AWS Integration    | Works with IAM, CloudWatch Alarms, AWS X-Ray, EventBridge, and more |
| Prebuilt & Customizable   | Use built-in templates or define your own experiments               |
| Multi-Environment Support | Inject faults in EC2, ECS, EKS, RDS, Lambda, and more               |

## AWS FIS Architecture

AWS FIS integrates seamlessly with your AWS environment:

- **CloudWatch Alarms**: Trigger experiments or remediation workflows when thresholds are crossed.
- **AWS X-Ray**: Correlate faults with distributed traces to pinpoint failures.
- **EventBridge**: Automate experiment scheduling and notifications.

<img src="path/to/fis-architecture-diagram.png" alt="AWS FIS Architecture Diagram" />

You can leverage AWS FIS to simulate:

- EC2 instance terminations and CPU/network stress
- ECS and EKS pod failures
- RDS instance failovers
- Availability Zone outages
- Network latency and packet loss between resources

## Managing Experiments

AWS FIS experiments are defined as JSON documents. You can manage them through:

| Interface              | Command / Action                                      |
| ---------------------- | ----------------------------------------------------- |
| AWS Management Console | Create, configure, and run experiments via the web UI |
| AWS CLI                | `aws fis create-experiment-template`                  |
| AWS CloudFormation     | Use the `AWS::FIS::ExperimentTemplate` resource       |

```
# Example CloudFormation snippet
Resources:
  MyFISExperiment:
    Type: AWS::FIS::ExperimentTemplate
    Properties:
      Description: "Terminate EC2 instance for resilience testing"
      Actions:
        - ActionId: aws:ec2:terminate-instances
          Parameters:
            instanceIds: ["i-0123456789abcdef0"]
      Targets:
        - ResourceType: "aws:ec2:instance"
          ResourceTags:
            chaos-test: "true"
      RoleArn: arn:aws:iam::123456789012:role/FISRole
      StopConditions:
        - Source: "aws:cloudwatch:alarm"
          Value: arn:aws:cloudwatch:us-west-2:123456789012:alarm:HighCPUUtilization
```

> [!important]
> **Warning**
>
> Always run experiments in a staging or non-production environment first. Fault injection can cause service interruptions!

## Security & Permissions

Leverage **AWS Identity and Access Management (IAM)** to grant granular permissions:

- `fis:CreateExperimentTemplate`
- `fis:StartExperiment`
- `fis:StopExperiment`
- `cloudwatch:DescribeAlarms`
- `ec2:TerminateInstances`

Use IAM policies and roles to restrict who can create, modify, or execute FIS experiments.

---

## Links and References

- [AWS Fault Injection Simulator Documentation](https://docs.aws.amazon.com/fis/)
- [Chaos Engineering Concepts](https://chaosengineering.org/)
- [Amazon CloudWatch Alarms](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html)
- [AWS X-Ray Overview](https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/chaos-engineering/module/b45a00dd-3232-4d00-81b8-60e98b8e3f77/lesson/8991c8a2-8f46-46a3-be8c-e85aa23a44eb)**
>
> Watch video content
