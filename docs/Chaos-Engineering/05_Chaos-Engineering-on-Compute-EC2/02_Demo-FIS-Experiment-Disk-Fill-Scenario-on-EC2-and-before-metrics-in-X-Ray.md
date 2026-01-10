# Demo FIS Experiment Disk Fill Scenario on EC2 and before metrics in X Ray - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Chaos-Engineering/Chaos-Engineering-on-Compute-EC2/Demo-FIS-Experiment-Disk-Fill-Scenario-on-EC2-and-before-metrics-in-X-Ray)

---

## Table of Contents

- Demo FIS Experiment Disk Fill Scenario on EC2 and before metrics in X Ray
  - Prerequisites
  - 1. Record Baseline Metrics
  - 2. Configure the Disk Fill SSM Document
  - 3. Create the FIS Experiment Template
  - 4. Run and Monitor the Experiment
  - 5. Analyze Post-Fault Metrics
  - References
  - Watch Video
    - Input Parameters

---

## Content

Chaos Engineering

Chaos Engineering on Compute EC2

# Demo FIS Experiment Disk Fill Scenario on EC2 and before metrics in X Ray

In this tutorial, you’ll run a disk fill Fault Injection Simulation (FIS) on an EC2 instance in the “EKS pet site” group. You will:

1.  Record baseline metrics
2.  Configure the AWSFIS-Run-Disk-Fill SSM document
3.  Create and run an FIS experiment template
4.  Compare post-fault metrics against the baseline

## Prerequisites

- EC2 instances tagged **EKS pet site**, running Amazon Linux or Ubuntu
- SSM Agent installed on target instances
- IAM role with permissions for SSM commands and CloudWatch logging

---

## 1\. Record Baseline Metrics

Filter the running instances by name “EKS pet site” and select instance **03DF9**.

![The image shows an AWS EC2 dashboard with two running instances, displaying monitoring metrics such as CPU utilization, network in/out bytes, and network packets.](https://kodekloud.com/kk-media/image/upload/v1752871841/notes-assets/images/Chaos-Engineering-Demo-FIS-Experiment-Disk-Fill-Scenario-on-EC2-and-before-metrics-in-X-Ray/aws-ec2-dashboard-running-instances-metrics.jpg)

| Metric              | Baseline Value |
| ------------------- | -------------- |
| CPU Utilization     | ~4%            |
| Network Out (Bytes) | 16–18 million  |

These values establish our steady-state before fault injection.

---

## 2\. Configure the Disk Fill SSM Document

Navigate to **AWS Systems Manager** and search for **fis** services.

![The image shows an AWS console with a search for "fis," displaying services like AWS FIS, AWS Firewall Manager, and Amazon Inspector. The background includes a document related to AWS Systems Manager.](https://kodekloud.com/kk-media/image/upload/v1752871842/notes-assets/images/Chaos-Engineering-Demo-FIS-Experiment-Disk-Fill-Scenario-on-EC2-and-before-metrics-in-X-Ray/aws-console-search-fis-services.jpg)

Select the **AWSFIS-Run-Disk-Fill** document. This automation uses `fallocate` to stress disk allocation and installs `bc` and `fallocate` if needed.

```
description: |
  ### Document name - AWSFIS-Run-Disk-Fill
  Runs disk filling stress on an instance using fallocate.
  Installs dependencies if InstallDependencies=true.
schemaVersion: '2.2'
parameters:
  DurationSeconds:
    type: String
    description: (Required) Duration of the disk fill stress in seconds.
  Percent:
    type: String
    description: (Optional) Percent of disk space to allocate (1–100).
    default: '95'
  InstallDependencies:
    type: String
    description: (Optional) Install `bc` & `fallocate` if missing (True/False).
    default: 'True'
```

![The image shows a document from AWS Systems Manager titled "AWSFIS-Run-Disk-Fill," detailing a script that runs disk filling stress on an instance using fallocate, with input parameters for duration and percentage of disk space to allocate.](https://kodekloud.com/kk-media/image/upload/v1752871843/notes-assets/images/Chaos-Engineering-Demo-FIS-Experiment-Disk-Fill-Scenario-on-EC2-and-before-metrics-in-X-Ray/awsfis-run-disk-fill-script.jpg)

> [!important]
> **Note**
>
> This SSM document does not uninstall dependencies after the test. To avoid repeated installs, pre-bake `bc` and `fallocate` and set `InstallDependencies=false`.

### Input Parameters

| Parameter           | Required | Default | Description                                    |
| ------------------- | -------- | ------- | ---------------------------------------------- |
| DurationSeconds     | Yes      | —       | Duration of the disk fill stress (in seconds). |
| Percent             | No       | '95'    | Percentage of disk space to allocate.          |
| InstallDependencies | No       | 'True'  | Install dependencies if missing (True/False).  |

---

## 3\. Create the FIS Experiment Template

1.  Open **AWS Fault Injection Simulator (FIS)** and click **Create experiment template**.
2.  Enter your AWS account, a name (e.g., `ec2-disk-fill-test`), and a description.
3.  Under **Actions**, choose **Add action**:
    - **Name:** disk-fill
    - **Action type:** aws:ssm:send-command
    - **Document:** AWSFIS-Run-Disk-Fill
    - **Parameters:**

      ```
      {"DurationSeconds":"120","Percent":"95","InstallDependencies":"True"}
      ```

    - **Action timeout:** 600 seconds
4.  In **Targets**:
    - **Resource type:** `AWS::EC2::Instance`
    - **Resource IDs:** `03DF9`
    - **Selection mode:** All
5.  Assign an **IAM role** with SSM permissions. For logging, choose CloudWatch log group `FIS experiments`.
6.  Review and create the template.

![The image shows a user interface for creating an experiment template, with fields for description, name, and action type, and a dropdown menu listing various AWS SSM commands.](https://kodekloud.com/kk-media/image/upload/v1752871844/notes-assets/images/Chaos-Engineering-Demo-FIS-Experiment-Disk-Fill-Scenario-on-EC2-and-before-metrics-in-X-Ray/experiment-template-user-interface-aws-ssm.jpg)

![The image shows a configuration screen for creating an experiment template in AWS, specifically for an EC2 disk fill test. It includes fields for description, name, action parameters, and duration settings.](https://kodekloud.com/kk-media/image/upload/v1752871845/notes-assets/images/Chaos-Engineering-Demo-FIS-Experiment-Disk-Fill-Scenario-on-EC2-and-before-metrics-in-X-Ray/aws-ec2-experiment-template-configuration.jpg)

Generate a preview to confirm instance **03DF9** is selected.

![The image shows an AWS Fault Injection Simulator (FIS) interface for an EC2 Disk Fill Test experiment template. It includes details like the experiment template ID, creation time, and target information.](https://kodekloud.com/kk-media/image/upload/v1752871847/notes-assets/images/Chaos-Engineering-Demo-FIS-Experiment-Disk-Fill-Scenario-on-EC2-and-before-metrics-in-X-Ray/aws-fis-ec2-disk-fill-test.jpg)

---

## 4\. Run and Monitor the Experiment

Start the experiment. Observe its state transition from **Pending** → **Running** → **Completed**.

![The image shows an AWS Fault Injection Simulator (FIS) dashboard with details of a running experiment, including its ID, state, and associated resources. The experiment is related to an EC2 Disk Fill Test.](https://kodekloud.com/kk-media/image/upload/v1752871849/notes-assets/images/Chaos-Engineering-Demo-FIS-Experiment-Disk-Fill-Scenario-on-EC2-and-before-metrics-in-X-Ray/aws-fault-injection-simulator-dashboard.jpg)

| State     | Description                            |
| --------- | -------------------------------------- |
| Pending   | Scheduled but not yet started.         |
| Running   | Disk fill stress is in progress.       |
| Completed | Experiment finished; metrics recorded. |

> [!important]
> **Warning**
>
> Disk fill stress can cause system instability and data loss. Only run on non-production or isolated environments.

---

## 5\. Analyze Post-Fault Metrics

After completion, revisit the CPU and Network Out metrics on instance **03DF9** and compare them to your baseline.

---

## References

- [AWS Fault Injection Simulator Documentation](https://docs.aws.amazon.com/fis/)
- [AWS Systems Manager SSM Documents](https://docs.aws.amazon.com/systems-manager/latest/userguide/ssm-docs.html)
- [fallocate Manual](https://man7.org/linux/man-pages/man1/fallocate.1.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/chaos-engineering/module/822aac19-f6c1-4f39-bc41-59b523a98155/lesson/b55d9bbc-6759-44c9-aa22-1584c96e85c6)**
>
> Watch video content
