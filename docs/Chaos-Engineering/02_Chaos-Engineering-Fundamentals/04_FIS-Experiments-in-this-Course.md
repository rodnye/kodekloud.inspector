# FIS Experiments in this Course - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Chaos-Engineering/Chaos-Engineering-Fundamentals/FIS-Experiments-in-this-Course)

---

## Table of Contents

- FIS Experiments in this Course
  - Experiment Matrix
  - 1. EC2 Instance Termination
  - 2. EC2 Disk-Fill Simulation
  - 3. Aurora Reader Node Reboot
  - 4. High I/O on ECS Fargate
  - 5. High I/O on EKS Node
  - 6. Pod Deletion on EKS
  - 7. Availability Zone Outage
  - Links and References
  - Watch Video

---

## Content

Chaos Engineering

Chaos Engineering Fundamentals

# FIS Experiments in this Course

In this module, you’ll run a suite of fault injection simulations using AWS Fault Injection Simulator (FIS) to validate and harden your application’s resilience. Each experiment targets a different AWS service or scenario, helping you understand how your infrastructure responds under stress.

## Experiment Matrix

| Experiment                | Description                                                             | Target Services               |
| ------------------------- | ----------------------------------------------------------------------- | ----------------------------- |
| EC2 Instance Termination  | Terminate an EC2 instance managed by an Auto Scaling group              | EC2, Auto Scaling             |
| EC2 Disk-Fill Simulation  | Simulate disk‐fill on an EC2 instance fronted by a load balancer in EKS | EC2, EKS, ELB                 |
| Aurora Reader Node Reboot | Reboot a reader node in an Amazon Aurora cluster                        | Amazon Aurora                 |
| High I/O on ECS Fargate   | Generate heavy I/O load on an ECS Fargate task                          | Amazon ECS (Fargate)          |
| High I/O on EKS Node      | Stress the I/O on an EKS worker node                                    | Amazon EKS                    |
| Pod Deletion on EKS       | Delete a running pod in an EKS cluster                                  | Amazon EKS                    |
| Availability Zone Outage  | Simulate an AZ-wide power interruption                                  | EC2, Auto Scaling, Networking |

---

## 1\. EC2 Instance Termination

Terminate a specific EC2 instance in an Auto Scaling group to verify that new instances launch automatically and service availability is preserved.

```
aws fis create-experiment-template \
  --description "Terminate one EC2 in ASG" \
  --actions terminate-instance \
  --stop-conditions "source=none"
```

> [!important]
> **Note**
>
> Make sure your Auto Scaling group has a minimum capacity greater than zero. Otherwise, FIS won’t be able to replace the terminated instance.

---

## 2\. EC2 Disk-Fill Simulation

Fill up the root volume on an EC2 instance behind a load balancer in an EKS worker node. This test reveals how your EKS pods behave under disk pressure.

```
targets:
  DiskFillerInstance:
    resourceType: aws:ec2:instance
    selectionMode: ALL
actions:
  fill-disk:
    actionId: aws:ssm:send-command
    parameters:
      documentName: AWS-RunShellScript
      commands:
        - "dd if=/dev/zero of=/mnt/fillfile bs=1M count=10000"
```

---

## 3\. Aurora Reader Node Reboot

Reboot a reader node in your Amazon Aurora cluster to measure how fast failover completes and how the application handles transient database unavailability.

```
aws fis create-experiment-template \
  --description "Reboot Aurora Reader Node" \
  --actions reboot-db-instance \
  --targets reader-node
```

> [!important]
> **Warning**
>
> Avoid running this experiment during peak traffic unless you have a multi-AZ Aurora cluster and automated failover enabled.

---

## 4\. High I/O on ECS Fargate

Generate sustained I/O stress on a Fargate task to observe CPU throttling, task restarts, and overall service degradation.

```
actions:
  high-io-stress:
    actionId: aws:ssm:send-command
    targets:
      FargateTask:
        resourceType: aws:ecs:task
    parameters:
      documentName: AWS-RunShellScript
      commands:
        - "stress-ng --io 4 --timeout 300s"
```

---

## 5\. High I/O on EKS Node

Apply heavy I/O load on an EKS worker node to test pod eviction, node replacement, and auto scaling behaviors.

```
actions:
  node-io-stress:
    actionId: aws:ssm:send-command
    targets:
      EksNode:
        resourceType: aws:ec2:instance
    parameters:
      documentName: AWS-RunShellScript
      commands:
        - "stress-ng --io 8 --timeout 300s"
```

---

## 6\. Pod Deletion on EKS

Select and delete a live pod in your EKS cluster to validate Kubernetes self-healing—pods should restart automatically to maintain desired state.

```
kubectl delete pod <pod-name> -n <namespace>
```

> [!important]
> **Note**
>
> Use labels or selectors to target a specific pod group. For example:
> `kubectl delete pod -l app=web -n production`

---

## 7\. Availability Zone Outage

Simulate a full Availability Zone power interruption, ensuring your workloads can fail over to other AZs without data loss or downtime.

```
aws fis create-experiment-template \
  --description "AZ Outage Simulation" \
  --actions disable-availability-zones \
  --targets az-target
```

---

## Links and References

- [AWS Fault Injection Simulator Documentation](https://docs.aws.amazon.com/fis/latest/userguide/what-is-fis.html)
- [Amazon EC2 Auto Scaling](https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html)
- [Amazon EKS Best Practices](https://docs.aws.amazon.com/eks/latest/userguide/best-practices.html)
- [Amazon Aurora Failover](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Managing.html#Aurora.Managing.Failover)
- [Amazon ECS Task Definitions](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definitions.html)
- [Kubernetes Pod Lifecycle](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/chaos-engineering/module/b45a00dd-3232-4d00-81b8-60e98b8e3f77/lesson/2689966e-05f7-4a31-8b57-716b6d309986)**
>
> Watch video content
