# Demo Create EC2 instance using UI Part 2 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Amazon-Elastic-Compute-Cloud-EC2/Basics-of-EC2/Demo-Create-EC2-instance-using-UI-Part-2)

---

## Table of Contents

- Demo Create EC2 instance using UI Part 2
  - Prerequisites
  - Overview of Termination Protection
  - Step 1: Attempt to Terminate the Instance
  - Step 2: Disable Termination Protection
  - Step 3: Terminate the Instance
  - References
  - Watch Video
  - Practice Lab

---

## Content

Amazon Elastic Compute Cloud (EC2)

Basics of EC2

# Demo Create EC2 instance using UI Part 2

In this lesson, you’ll learn how to safely terminate an EC2 instance via the AWS Management Console. If termination protection is enabled, we’ll also cover how to disable it.

## Prerequisites

- An active AWS account with required IAM permissions (EC2:Describe, StopInstances, TerminateInstances).
- An existing EC2 instance to terminate.

## Overview of Termination Protection

AWS EC2 offers **Termination Protection** to prevent accidental instance deletion. When enabled, any termination attempt fails until you explicitly disable it.

> [!important]
> **Note**
>
> Enabling termination protection is a best practice for critical workloads. It safeguards against unintended shutdowns.
> Read more: [EC2 Termination Protection](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/terminating-instances.html#instance-termination-protection)

## Step 1: Attempt to Terminate the Instance

1.  Open the **EC2 Dashboard** in the AWS Management Console.
2.  Select the target instance in the **Instances** list.
3.  Click **Instance State** → **Terminate Instance**.

If termination protection is enabled, you’ll see an error message:

![The image shows an AWS EC2 management console with a running instance named "demo." The instance is selected, and the option to terminate it is highlighted.](https://kodekloud.com/kk-media/image/upload/v1752868976/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-Demo-Create-EC2-instance-using-UI-Part-2/aws-ec2-console-running-instance-demo.jpg)

> [!important]
> **Warning**
>
> Error: “Failed to terminate instance. The instance may not be terminated.”
> This indicates that **Termination Protection** is active.

## Step 2: Disable Termination Protection

1.  With the same instance selected, choose **Actions** → **Instance Settings** → **Change Termination Protection**.
2.  In the dialog, uncheck **Enable** and click **Save**.

## Step 3: Terminate the Instance

1.  Again, select the instance and navigate to **Instance State** → **Terminate Instance**.
2.  Confirm the action in the pop-up.

The instance state will progress as follows:

| Instance State | Description                                 |
| -------------- | ------------------------------------------- |
| running        | Instance is active and accepting traffic.   |
| shutting-down  | Termination has been initiated.             |
| terminated     | Instance has been deleted and cannot start. |

Eventually, you’ll see:

![The image shows an AWS EC2 console with an instance labeled "demo" that is in the process of shutting down. The instance type is t2.micro, and it has passed its status checks.](https://kodekloud.com/kk-media/image/upload/v1752868977/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-Demo-Create-EC2-instance-using-UI-Part-2/aws-ec2-console-demo-instance-shutting-down.jpg)

---

## References

- [Amazon EC2 User Guide – Terminating EC2 Instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/terminating-instances.html)
- [AWS IAM Permissions for EC2](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_amazonec2.html)
- [AWS Management Console](https://aws.amazon.com/console/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2/module/6b1df5fc-e1d3-4e1d-9dd1-035d0c2737d4/lesson/eaa85f3d-2028-4a37-8965-5e733bc5fda0)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2/module/6b1df5fc-e1d3-4e1d-9dd1-035d0c2737d4/lesson/0d747b92-78c7-4939-8072-c026201707f0)**
>
> Practice lab
