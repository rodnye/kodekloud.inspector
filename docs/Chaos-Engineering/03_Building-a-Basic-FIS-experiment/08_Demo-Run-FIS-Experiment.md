# Demo Run FIS Experiment - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Chaos-Engineering/Building-a-Basic-FIS-experiment/Demo-Run-FIS-Experiment)

---

## Table of Contents

- Demo Run FIS Experiment
  - 1. Select the FIS Experiment Template
  - 2. Confirm Affected Instances
  - 3. Start the FIS Experiment
  - 4. Inspect Experiment Logs
  - 5. Identify & Fix the Root Cause
  - 6. Preview Targets Before Rerunning
  - 7. Rerun the Experiment
  - 8. Monitor the Impact
  - Links and References
  - Watch Video

---

## Content

Chaos Engineering

Building a Basic FIS experiment

# Demo Run FIS Experiment

In this tutorial, you’ll learn how to run a Fault Injection Simulator (FIS) experiment in AWS Resilience Hub to terminate 50% of instances in an Auto Scaling group. We’ll cover:

- Selecting an experiment template
- Verifying target EC2 instances
- Executing the experiment
- Troubleshooting and adjusting your Auto Scaling group
- Rerunning and monitoring the experiment

## 1\. Select the FIS Experiment Template

1.  Open the **AWS Resilience Hub** console.
2.  Navigate to **Experiment templates**.
3.  Choose the template named **Terminate 50% of instances in an Auto Scaling group**.

![The image shows the AWS Resilience Hub interface, specifically the "Experiment templates" section, with a template listed for terminating half of the instances in an auto-scaling group.](https://kodekloud.com/kk-media/image/upload/v1752871789/notes-assets/images/Chaos-Engineering-Demo-Run-FIS-Experiment/aws-resilience-hub-experiment-templates.jpg)

## 2\. Confirm Affected Instances

Before you start, ensure your resource filters match the instances you want to target:

- State: `running`
- Tag: `experiment-ready`

In the **EC2 console**, apply these filters to see only the instances that the experiment will affect.

![The image shows an AWS EC2 console with a list of running instances, displaying details like instance ID, state, type, and status checks. A specific instance’s summary is partially visible at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752871791/notes-assets/images/Chaos-Engineering-Demo-Run-FIS-Experiment/aws-ec2-console-running-instances-summary.jpg)

Here, instance `37FF9…` matches both filters and is the only target.

## 3\. Start the FIS Experiment

Back in the FIS console:

1.  Select your experiment template.
2.  Click **Start experiment**.
3.  Confirm the prompt (this action is disruptive).

> [!important]
> **Warning**
>
> Starting a Chaos Engineering experiment will terminate live EC2 instances. Ensure this is performed in a non-production environment or during a maintenance window.

Once initiated, you’ll see the experiment state transition to `Initiating` and then `Pending`. In our first run, the experiment failed immediately:

![The image shows an AWS Resilience Hub interface with a failed experiment notification. It includes details about the experiment ID, state, and other related information.](https://kodekloud.com/kk-media/image/upload/v1752871792/notes-assets/images/Chaos-Engineering-Demo-Run-FIS-Experiment/aws-resilience-hub-failed-experiment.jpg)

## 4\. Inspect Experiment Logs

To diagnose the failure, open the **Timeline** or **Log events** in the FIS console and refresh:

```
{
  "id": "EXpPGlBontFGnDXQ6",
  "log_type": "target-resolution-start",
  "event_timestamp": "2024-08-05T00:13:06.913Z",
  "details": {
    "target_name": "KKFisWorkshopAsg-50Percent"
  }
}
```

```
{
  "id": "EXpPGlBontFGnDXQ6",
  "log_type": "target-resolution-detail",
  "event_timestamp": "2024-08-05T00:13:07.189Z",
  "details": {
    "resolved_targets_count": 0,
    "status": "completed"
  }
}
```

The `resolved_targets_count` is `0` because with a single instance, terminating 50% rounds down to zero.

> [!important]
> **Note**
>
> Chaos experiments require sufficient targets. If your Auto Scaling group has only one instance, 50% of one equals zero.

## 5\. Identify & Fix the Root Cause

Inspect your Auto Scaling group in the **EC2 console**:

![The image shows an AWS EC2 Auto Scaling group details page, displaying information about group capacity, launch template, and associated resources. It includes settings like desired, minimum, and maximum capacity, as well as launch template details such as instance type and AMI ID.](https://kodekloud.com/kk-media/image/upload/v1752871794/notes-assets/images/Chaos-Engineering-Demo-Run-FIS-Experiment/aws-ec2-auto-scaling-group-details.jpg)

Current settings:

| Setting          | Value |
| ---------------- | ----- |
| Desired capacity | 1     |
| Minimum capacity | 1     |
| Maximum capacity | 3     |

To guarantee at least one instance is terminated:

| Setting          | Updated Value |
| ---------------- | ------------- |
| Desired capacity | 2             |
| Minimum capacity | 2             |
| Maximum capacity | 3             |

This ensures 50% of 2 = 1 instance will be terminated.

## 6\. Preview Targets Before Rerunning

Wait for the second instance to launch, then in the FIS console:

1.  Select your experiment template.
2.  Click **Preview**.

You’ll see exactly one target instance:

![The image shows an AWS console screen displaying details of an experiment template for terminating half of the instances in an auto-scaling group. It includes information such as the experiment template ID, ARN, description, and target settings.](https://kodekloud.com/kk-media/image/upload/v1752871795/notes-assets/images/Chaos-Engineering-Demo-Run-FIS-Experiment/aws-console-experiment-template-auto-scaling.jpg)

Generate the preview:

![The image shows an AWS Fault Injection Simulator (FIS) interface with details of an experiment template, including target information and a completed status. It displays resource types, selection mode, and experiment ID.](https://kodekloud.com/kk-media/image/upload/v1752871796/notes-assets/images/Chaos-Engineering-Demo-Run-FIS-Experiment/aws-fault-injection-simulator-interface.jpg)

## 7\. Rerun the Experiment

With your template preview confirming one target:

1.  Click **Start experiment** again.
2.  Watch the state change to `Running`.

![The image shows an AWS Fault Injection Simulator (FIS) dashboard with details of a running experiment, including its ID, state, and associated actions. The experiment involves terminating instances in an auto-scaling group.](https://kodekloud.com/kk-media/image/upload/v1752871797/notes-assets/images/Chaos-Engineering-Demo-Run-FIS-Experiment/aws-fault-injection-simulator-dashboard.jpg)

## 8\. Monitor the Impact

Switch to the **EC2 console** to view instance states. One instance will terminate, while the other continues running, ensuring high availability:

![The image shows an AWS EC2 console with a list of instances, displaying their instance IDs, states, and types. One instance is running, another is shutting down, and a third is terminated.](https://kodekloud.com/kk-media/image/upload/v1752871799/notes-assets/images/Chaos-Engineering-Demo-Run-FIS-Experiment/aws-ec2-console-instances-list.jpg)

With two instances in the group, terminating 50% yields a controlled disruption without downtime.

---

## Links and References

- [AWS Fault Injection Simulator User Guide](https://docs.aws.amazon.com/fis/latest/userguide/)
- [AWS EC2 Auto Scaling Groups](https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html)
- [AWS Resilience Hub Concepts](https://docs.aws.amazon.com/resiliencehub/latest/userguide/what-is-resilience-hub.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/chaos-engineering/module/d49a2b6d-60a1-4603-965d-7e8292688875/lesson/35f1aaa6-3455-4d41-b618-dd83369f9344)**
>
> Watch video content
