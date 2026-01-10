# Create FIS Experiment - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Chaos-Engineering/Building-a-Basic-FIS-experiment/Create-FIS-Experiment)

---

## Table of Contents

- Create FIS Experiment
  - Table of Contents
  - Core Components
  - Prerequisites
  - Step 1: Define the Action
  - Step 2: Specify the Target
  - Step 3: Add a Stop Condition
  - Step 4: Launch the Experiment
  - Cleanup
  - Links and References
  - Watch Video

---

## Content

Chaos Engineering

Building a Basic FIS experiment

# Create FIS Experiment

AWS Fault Injection Simulator (FIS) helps you test the resilience of your applications by safely inducing faults. In this guide, we’ll define and launch an FIS experiment using three core components: **Actions**, **Targets**, and **Stop Conditions**. You’ll also learn how to apply guardrails to contain the blast radius.

---

## Table of Contents

1.  [Core Components](#core-components)
2.  [Prerequisites](#prerequisites)
3.  [Step 1: Define the Action](#step-1-define-the-action)
4.  [Step 2: Specify the Target](#step-2-specify-the-target)
5.  [Step 3: Add a Stop Condition](#step-3-add-a-stop-condition)
6.  [Step 4: Launch the Experiment](#step-4-launch-the-experiment)
7.  [Cleanup](#cleanup)
8.  [Links and References](#links-and-references)

---

## Core Components

| Component          | Description                                                                               | Example                                       |
| ------------------ | ----------------------------------------------------------------------------------------- | --------------------------------------------- |
| **Action**         | The fault you inject into the system.                                                     | Terminating an EC2 instance                   |
| **Target**         | The resource(s) on which the action runs.                                                 | EC2 instances identified by tag `Service=api` |
| **Stop Condition** | A criterion—such as a CloudWatch alarm—that halts and rolls back the experiment when met. | CPU utilization > 80% for 5 minutes           |

> [!important]
> **Note**
>
> Stop conditions are optional but **strongly recommended**. They prevent runaway experiments and ensure safety.

---

## Prerequisites

- AWS CLI v2 installed and configured
- IAM role with permissions:
  - `fis:CreateExperimentTemplate`
  - `fis:StartExperiment`
  - `ec2:TerminateInstances`
  - `cloudwatch:DescribeAlarms`
- EC2 instances tagged with `FaultInject=true`

---

## Step 1: Define the Action

We’ll terminate EC2 instances tagged for the experiment. Use the following snippet in your experiment template:

```
"actions": {
  "terminateInstances": {
    "actionId": "aws:ec2:terminate-instances",
    "description": "Terminate targeted EC2 instances",
    "parameters": {
      "instances": ["${TargetInstanceIDs}"]
    }
  }
}
```

---

## Step 2: Specify the Target

Identify EC2 instances by tag. You can also use resource IDs or ARNs.

```
"targets": {
  "TargetInstanceIDs": {
    "resourceType": "aws:ec2:instance",
    "resourceTags": {
      "FaultInject": "true"
    }
  }
}
```

---

## Step 3: Add a Stop Condition

Define a CloudWatch alarm that stops the experiment when CPU usage exceeds 80% for 5 minutes:

```
"stopConditions": [
  {
    "source": "aws:cloudwatch:alarm",
    "value": "arn:aws:cloudwatch:us-east-1:123456789012:alarm:HighCPUAlarm"
  }
]
```

> [!important]
> **Warning**
>
> Ensure your CloudWatch alarm ARN is correct. A misconfigured stop condition may not trigger, leaving experiments running longer than intended.

---

## Step 4: Launch the Experiment

Combine the components into a single template and create it with the AWS CLI:

```
aws fis create-experiment-template \
  --tags Name=TerminateEC2Test \
  --description "Terminate EC2 instances with guardrails" \
  --role-arn arn:aws:iam::123456789012:role/AWSFISRole \
  --actions file://actions.json \
  --targets file://targets.json \
  --stop-conditions file://stop-conditions.json
```

Once the template is created, start the experiment:

```
aws fis start-experiment \
  --experiment-template-id et-0123456789abcdef0
```

---

## Cleanup

After testing, delete your experiment template to avoid orphaned resources:

```
aws fis delete-experiment-template \
  --experiment-template-id et-0123456789abcdef0
```

---

## Links and References

- [AWS Fault Injection Simulator Developer Guide](https://docs.aws.amazon.com/fis/latest/userguide/)
- [AWS CLI Command Reference: FIS](https://docs.aws.amazon.com/cli/latest/reference/fis/index.html)
- [Creating CloudWatch Alarms](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/chaos-engineering/module/d49a2b6d-60a1-4603-965d-7e8292688875/lesson/ce5778e0-60f3-4445-92db-12a89be03cad)**
>
> Watch video content
