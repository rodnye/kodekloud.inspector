# EKS Upgrades - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-EKS/Upgrades-and-Maintenance/EKS-Upgrades)

---

## Table of Contents

- EKS Upgrades
  - In-Place Cluster Upgrade
  - Data Plane Upgrade
  - Managed Add-Ons
  - Pre-Upgrade Compatibility Checks
  - Blue-Green Cluster Upgrades
  - Summary
  - Links and References
  - Watch Video
    - Control Plane Upgrade
    - Node Groups
    - Karpenter
    - Fargate
    - EKS Cluster Insights API
    - kubectl-no-trouble

---

## Content

AWS EKS

Upgrades and Maintenance

# EKS Upgrades

Keeping an Amazon EKS cluster up to date is critical. Kubernetes releases three minor versions each year, and running an outdated release can lead to forced upgrades, unsupported APIs, or higher support costs. To maintain security and compatibility, plan and execute regular upgrades.

There are two main strategies for upgrading:

- **In-Place Cluster Upgrades**  
  Perform rolling upgrades on the existing control plane and data plane.
- **Blue-Green Cluster Upgrades**  
  Provision a fresh cluster alongside the old one and migrate workloads.

In most environments, **in-place upgrades** are simpler. Migrating services, load balancers, and DNS in a blue-green model can add complexity and downtime.

---

## In-Place Cluster Upgrade

An in-place upgrade involves two logical layers:

- **Control Plane** (managed by AWS EKS)  
  etcd, API server, controller manager, scheduler, webhooks, and other control-plane components.
- **Data Plane** (in your AWS account)  
  Node Groups, Karpenter nodes, Fargate pods, custom controllers, add-ons, and Helm charts.

![The image illustrates an "In-Place Cluster Upgrade" with a control plane containing Etcd V2, API server V2, and Scheduler V2, and a data plane with nodes. It includes AWS and user icons, indicating cloud and user interaction.](https://kodekloud.com/kk-media/image/upload/v1752862914/notes-assets/images/AWS-EKS-EKS-Upgrades/in-place-cluster-upgrade-aws-user-icons.jpg)

### Control Plane Upgrade

When you call the EKS API to bump the Kubernetes version, AWS performs a managed, rolling upgrade:

1.  It replaces each control-plane component (etcd, API server, scheduler, controller manager, webhooks) one at a time.
2.  New versions (for example, v1.30) come up behind the load balancer while old versions terminate.
3.  etcd data migrates automatically if a newer etcd version is required.

Once the control plane reports healthy, proceed to the data plane.

> [!important]
> **Note**
>
> Always confirm that you have a backup or snapshot of your etcd data.
> You can use [EKS Snapshots](https://docs.aws.amazon.com/eks/latest/userguide/eks-snapshots.html) or custom scripts.

---

## Data Plane Upgrade

Your workloads run on compute layers you control. Upgrade procedures differ by type:

![The image is a diagram titled "In-Place Cluster Upgrade" showing components of a data plane, including Node Groups, Karpenter, AWS Fargate, Controllers, Add-ons, and Helm Charts.](https://kodekloud.com/kk-media/image/upload/v1752862916/notes-assets/images/AWS-EKS-EKS-Upgrades/in-place-cluster-upgrade-data-plane-diagram.jpg)

| Data Plane Type | Upgrade Mechanism                  | Configuration                            |
| --------------- | ---------------------------------- | ---------------------------------------- |
| Node Groups     | Auto Scaling Group rolling replace | `maxUnavailable`, `maxSurge`             |
| Karpenter       | Drain-and-replace based on version | `concurrency` (nodes at a time)          |
| Fargate         | Pods restart on new Fargate nodes  | Deployment’s `maxUnavailable`/`maxSurge` |

### Node Groups

Node Groups use an Auto Scaling Group behind the scenes. During an upgrade:

1.  EKS launches a new node with the updated Amazon EKS-optimized AMI (green).
2.  When the new node passes health checks, one old node (blue) is terminated.
3.  This repeats until all nodes run the target version.

Adjust **maxUnavailable** or **maxSurge** in your Managed Node Group configuration to speed up replacements.

### Karpenter

Karpenter provisions instances dynamically based on workloads:

1.  Detects control plane vs. node version mismatches (e.g., nodes on v1.29 while control plane is v1.30).
2.  Drains and terminates outdated nodes at the configured concurrency (default: one at a time).
3.  Launches new nodes under existing scaling and consolidation policies.

Tune Karpenter’s concurrency settings in the `Provisioner` spec to parallelize the rollout.

### Fargate

Fargate schedules each pod on an ephemeral node:

1.  After upgrading the control plane, trigger a new Deployment rollout.
2.  This forces pods to spin up on fresh Fargate nodes with the updated Kubernetes version.

Fargate scales by pod count—so if you have 100 pods, Fargate will create and remove 100 nodes. The rollout speed respects your `maxUnavailable` and `maxSurge` settings.

---

## Managed Add-Ons

AWS provides managed add-ons (e.g., CoreDNS, kube-proxy) that do not auto-upgrade with the cluster. Perform these steps **before** replacing data-plane nodes:

```
aws eks update-addon \
  --cluster-name my-cluster \
  --addon-name coredns \
  --addon-version 1.8.7-eksbuild.1
```

Wait for each add-on’s Deployment to complete rollout.

![The image illustrates a process flow for managed add-ons, involving calling and updating APIs, calling every add-on, and using EKS API, with references to Helm Charts and automation.](/images/AWS-EKS-EKS-Upgrades/managed-add-ons-process-flow-apis.jpg)

---

## Pre-Upgrade Compatibility Checks

Ensure your workloads and CRDs are ready for the next Kubernetes version:

### EKS Cluster Insights API

Use the EKS Cluster Insights API to scan for deprecated or removed resources (for example, PodSecurityPolicy removal in v1.25). It flags items you must remediate before upgrading.

### kubectl-no-trouble

[kubectl-no-trouble](https://github.com/doitintl/kubectl-no-trouble) inspects live cluster objects and reports API deprecations and removals in upcoming Kubernetes versions. Make sure your RBAC permits listing and describing all namespaces and resources.

![The image shows a diagram with "AWS EKS" and "Kubernetes 124" alongside a "Pod Security Policy" icon. A user is asking if anything is going to be removed.](https://kodekloud.com/kk-media/image/upload/v1752862917/notes-assets/images/AWS-EKS-EKS-Upgrades/aws-eks-kubernetes-pod-security-diagram.jpg)

> [!important]
> **Warning**
>
> Skipping compatibility checks can lead to broken workloads post-upgrade. Always fix deprecated APIs **before** starting the upgrade.

---

## Blue-Green Cluster Upgrades

Use a parallel cluster approach when:

- You need **fundamental changes**, such as swapping the CNI from [Amazon VPC CNI](https://github.com/aws/amazon-vpc-cni-k8s) to [Cilium](https://cilium.io).
- There is a **large version gap** (for example, jumping from 1.22 directly to 1.30).

Blue-green upgrades require provisioning duplicate infrastructure and migrating workloads, DNS, and load balancers. This approach typically doubles costs during the migration window.

---

## Summary

![The image is a summary slide listing five topics related to EKS cluster upgrades, including node upgrades, control plane upgrades, and add-ons. It features a gradient background with a copyright notice for KodeKloud.](https://kodekloud.com/kk-media/image/upload/v1752862919/notes-assets/images/AWS-EKS-EKS-Upgrades/eks-cluster-upgrades-summary-slide.jpg)

In this guide, we covered:

1.  Managed control plane upgrades via the EKS API.
2.  Data plane rollouts for Node Groups, Karpenter, and Fargate.
3.  Upgrading AWS-managed add-ons.
4.  Compatibility checks with the EKS Cluster Insights API and `kubectl-no-trouble`.
5.  When to choose blue-green cluster upgrades.

## Links and References

- [Amazon EKS Documentation](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html)
- [Kubernetes Release Notes](https://kubernetes.io/docs/setup/release/notes/)
- [kubectl-no-trouble GitHub](https://github.com/doitintl/kubectl-no-trouble)
- [AWS Amazon VPC CNI GitHub](https://github.com/aws/amazon-vpc-cni-k8s)
- [Cilium Official Site](https://cilium.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-eks/module/1c61ee8d-9fca-4ccb-9670-b87e09b3135b/lesson/e60d798d-7ea7-4b82-974f-d882a8bd80cd)**
>
> Watch video content
