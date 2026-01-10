# Demo Memory Stress on EKS Part 3 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Chaos-Engineering/Chaos-Engineering-on-Kubernetes-EKS/Demo-Memory-Stress-on-EKS-Part-3)

---

## Table of Contents

- Demo Memory Stress on EKS Part 3
  - 1. Create the FIS Experiment Template
  - 2. Define the Target Pods
  - 3. Review and Create
  - 4. Execute and Monitor the Experiment
  - Links and References
  - Watch Video
    - 1.1 Configure Basic Settings
    - 1.2 Add a Memory Stress Action
    - 1.3 Specify Action Parameters

---

## Content

Chaos Engineering

Chaos Engineering on Kubernetes EKS

# Demo Memory Stress on EKS Part 3

In this tutorial, you’ll create an AWS Fault Injection Simulator (FIS) experiment template that injects memory stress into a pod running on Amazon EKS. You will configure the fault action, define the target pods, and execute the experiment while monitoring performance in real time.

> [!important]
> **Prerequisites**
>
> - An AWS account with administrative permissions
> - An existing Amazon EKS cluster (e.g., `pet-site`)
> - A Kubernetes service account IAM role with FIS permissions
> - AWS FIS enabled in your account

## 1\. Create the FIS Experiment Template

### 1.1 Configure Basic Settings

1.  Sign in to the [AWS FIS console](https://console.aws.amazon.com/fis/) and go to **Experiment templates**.
2.  Click **Create experiment template**.
3.  Provide the following details:
    - **Name:** EKS-Memory-Stress
    - **Description:** Inject memory stress into pods on EKS for resilience testing

### 1.2 Add a Memory Stress Action

1.  Under **Actions**, click **Add action**.
2.  Set these parameters:
    - **Action name:** eks-memory
    - **Action type:** `aws:eks:inject-fault`
    - **Fault action:** Pod Memory Stress

![The image shows a form for adding an action in an experiment template, specifically for an EKS memory stress test, with fields for name, description, action type, and target.](https://kodekloud.com/kk-media/image/upload/v1752871871/notes-assets/images/Chaos-Engineering-Demo-Memory-Stress-on-EKS-Part-3/eks-memory-stress-test-action-form.jpg)

### 1.3 Specify Action Parameters

Configure the memory stress parameters:

| Parameter  | Value                                       |
| ---------- | ------------------------------------------- |
| Duration   | `9 minutes`                                 |
| Role       | Kubernetes service account IAM role for FIS |
| Percentage | `50`                                        |

> [!important]
> **Blast Radius Control**
>
> Setting `Percentage` to 50 limits memory consumption to half of available memory on targeted pods.

![The image shows a configuration interface for setting optional parameters related to Kubernetes fault orchestration, including fields for annotations, labels, security policy, and memory usage settings.](https://kodekloud.com/kk-media/image/upload/v1752871872/notes-assets/images/Chaos-Engineering-Demo-Memory-Stress-on-EKS-Part-3/kubernetes-fault-orchestration-configuration-interface.jpg)

## 2\. Define the Target Pods

1.  In the **Targets** section, click **Add target**.
2.  Enter the following values:
    - **Cluster:** `pet-site`
    - **Namespace:** `default`
    - **Selector type:** Label
    - **Selector value:** `app=pet-site`

![The image shows a configuration screen for an AWS EKS memory stress test, with actions and targets specified for a pod.](https://kodekloud.com/kk-media/image/upload/v1752871873/notes-assets/images/Chaos-Engineering-Demo-Memory-Stress-on-EKS-Part-3/aws-eks-memory-stress-test-configuration.jpg)

3.  Review and save the target configuration.

![The image shows a configuration screen for setting up an EKS-Memory action in a cloud service interface, with fields for resource parameters and selection options.](https://kodekloud.com/kk-media/image/upload/v1752871874/notes-assets/images/Chaos-Engineering-Demo-Memory-Stress-on-EKS-Part-3/eks-memory-action-configuration-screen.jpg)

## 3\. Review and Create

1.  Verify all settings:
    - **Action:** `eks-memory` (Pod Memory Stress)
    - **Target:** Pods labeled `app=pet-site` in the `default` namespace on `pet-site` cluster
2.  Attach the experiment IAM role to allow publishing logs to CloudWatch.
3.  Click **Create experiment template**.

## 4\. Execute and Monitor the Experiment

1.  From the **Experiment templates** list, select **EKS-Memory-Stress** and click **Start experiment**.
2.  Let the experiment run for the configured duration (9 minutes).
3.  Monitor performance metrics in:
    - CloudWatch RUM
    - EKS container performance dashboards

Compare metrics before, during, and after the memory stress injection to evaluate the resilience of your application.

## Links and References

- [AWS FIS Documentation](https://docs.aws.amazon.com/fis/)
- [Amazon EKS Documentation](https://docs.aws.amazon.com/eks/)
- [Kubernetes Portal](https://kubernetes.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/chaos-engineering/module/67947884-154a-43e4-a0cf-1137e1264eee/lesson/7a3f4d6c-0341-4081-b818-b2f3cc810ae7)**
>
> Watch video content
