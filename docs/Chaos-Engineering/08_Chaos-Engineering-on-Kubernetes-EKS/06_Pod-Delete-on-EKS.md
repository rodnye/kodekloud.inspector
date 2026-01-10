# Pod Delete on EKS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Chaos-Engineering/Chaos-Engineering-on-Kubernetes-EKS/Pod-Delete-on-EKS)

---

## Table of Contents

- Pod Delete on EKS
  - Experiment Overview
  - Hypothesis
  - Next Steps
  - References
  - Watch Video

---

## Content

Chaos Engineering

Chaos Engineering on Kubernetes EKS

# Pod Delete on EKS

In this tutorial, you’ll learn how to use AWS Fault Injection Simulator (FIS) to simulate a pod deletion on an Amazon EKS cluster. Simulating pod terminations helps validate your application’s resilience and ensures that Kubernetes automatically recreates pods without impacting end users.

## Experiment Overview

We’ll design a chaos experiment with two key components:

| Component             | Description                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------ |
| Observed Architecture | The current state of the pet adoption web application built with microservices on EKS.     |
| Hypothesis            | Kubernetes will detect and recreate deleted pods across multiple Availability Zones (AZs). |

Our microservices-based pet adoption application includes a product-details service deployed in multiple AZs. Because these pods have a cold start time of approximately five seconds, we anticipate no noticeable disruption for customers.

> [!important]
> **Prerequisites**
>
> - An existing Amazon EKS cluster with the FIS action role attached.
> - AWS CLI configured with permissions for FIS and EKS.
> - kubectl access to the EKS cluster.> [!important]
>   **Important**
>
> Ensure your EKS node IAM role has the `fis:StartExperiment` permission to run AWS FIS experiments successfully.

![The image illustrates a "Pod Delete Scenario on EKS" with a diagram of a Virtual Private Cloud (VPC) setup, highlighting a hypothesis about Kubernetes restarting application pods with minimal impact on customer experience.](https://kodekloud.com/kk-media/image/upload/v1752871901/notes-assets/images/Chaos-Engineering-Pod-Delete-on-EKS/pod-delete-scenario-eks-vpc-diagram.jpg)

## Hypothesis

If one or more product-details pods are terminated:

1.  Kubernetes Detects Failure: The control plane marks the pods as unavailable.
2.  Self-Healing: The ReplicaSet controller launches new pods.
3.  User Impact: Due to the low cold start time (~5s), end users experience no downtime.

## Next Steps

1.  Create an AWS FIS experiment template targeting the EKS pod delete action.
2.  Execute the experiment and monitor pod restart behavior.
3.  Validate application responsiveness via health checks and user interface tests.

## References

- [AWS Fault Injection Simulator Documentation](https://docs.aws.amazon.com/fis/latest/userguide/)
- [Amazon EKS Documentation](https://docs.aws.amazon.com/eks/latest/userguide/)
- [Kubernetes Pod Lifecycle](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/chaos-engineering/module/67947884-154a-43e4-a0cf-1137e1264eee/lesson/6eb6b4d6-082b-4861-845a-ebe92b1bc281)**
>
> Watch video content
