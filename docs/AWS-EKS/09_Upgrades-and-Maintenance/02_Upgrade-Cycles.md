# Upgrade Cycles - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-EKS/Upgrades-and-Maintenance/Upgrade-Cycles)

---

## Table of Contents

- Upgrade Cycles
  - EKS Support Window and Pricing
  - Upgrade Insights
  - Extended Support
  - Planning Your Upgrade Strategy
  - Links and References
  - Watch Video

---

## Content

AWS EKS

Upgrades and Maintenance

# Upgrade Cycles

In this lesson, we’ll cover how often to upgrade your Amazon EKS clusters, the support windows and associated costs, and the tools you can use to manage upgrades with minimal disruption.

---

## EKS Support Window and Pricing

Amazon EKS provides a 14-month support window for each Kubernetes minor version. To help you budget and plan, here’s a quick breakdown:

| Kubernetes Version Lifecycle | Duration   | Control Plane Fee | Total Cost (14 months) |
| ---------------------------- | ---------- | ----------------- | ---------------------- |
| Supported Version            | 14 months  | $0.10/hour        | ~$1,020                |
| Extended Support (optional)  | +12 months | $0.50/hour        | ~$4,380                |

By default, the EKS control plane costs $0.10 per hour (8,760 hours × $0.10 ≃ $876/year). Over the 14-month support window, you’ll spend roughly $1,020 before you must upgrade or opt into extended support. To avoid extended fees, plan your upgrades every 8–10 months—most teams upgrade two or three times per year to validate workloads sufficiently between versions.

> [!important]
> **Note**
>
> Use [Amazon EKS version lifecycle](https://docs.aws.amazon.com/eks/latest/userguide/kubernetes-versions.html) documentation to track end-of-support dates for each minor release.

---

## Upgrade Insights

When you’re ready to move to a newer Kubernetes version, AWS EKS **Upgrade Insights** helps you discover deprecated or removed APIs in use by your workloads before you begin the upgrade.

![The image illustrates an AWS EKS Cluster with a console containing four APIs, labeled API 1 to API 4, and features the "Upgrade Insights" text.](https://kodekloud.com/kk-media/image/upload/v1752862924/notes-assets/images/AWS-EKS-Upgrade-Cycles/aws-eks-cluster-api-console-diagram.jpg)

In the EKS console’s **Upgrade Insights** tab, you can see which Kubernetes APIs your workloads call—highlighting any that will be removed in the next Kubernetes version. This early visibility enables you to update manifests or refactor controllers before the upgrade process.

![The image illustrates AWS Upgrade Insights for an EKS Cluster, showing a console with APIs and a user questioning potential access loss to some APIs.](https://kodekloud.com/kk-media/image/upload/v1752862926/notes-assets/images/AWS-EKS-Upgrade-Cycles/aws-upgrade-insights-eks-cluster.jpg)

You can also query Upgrade Insights via the AWS CLI:

```
aws eks describe-addon-upgrade \
  --cluster-name my-cluster \
  --addon-name vpc-cni \
  --query 'upgradeAvailable'
```

Refer to the [AWS CLI reference for `describe-addon-upgrade`](https://docs.aws.amazon.com/cli/latest/reference/eks/describe-addon-upgrade.html) for full syntax and examples.

---

## Extended Support

If you can’t upgrade within the 14-month window, EKS offers up to 12 additional months of extended support. During this period, the control plane fee increases from $0.10 to $0.50 per hour (approximately $4,380 for 12 months).

![The image illustrates an "Extended Support" timeline, showing an extension from 14 months to 26 months, indicating an additional 12 months of support.](https://kodekloud.com/kk-media/image/upload/v1752862927/notes-assets/images/AWS-EKS-Upgrade-Cycles/extended-support-timeline-12-months.jpg)

> [!important]
> **Warning**
>
> Extended support fees can escalate quickly if you manage multiple clusters. Evaluate whether the additional time justifies the higher rate, especially in large-scale environments.

---

## Planning Your Upgrade Strategy

To stay current and avoid unexpected fees, most teams target two to three upgrades per year. Your cadence will depend on:

- Cluster size and configuration complexity
- Number of workloads and development teams
- Required testing, validation, and rollback plans

Kubernetes upstream releases minor versions about three times per year, each supported for roughly 14 months. EKS aligns with this cadence, so all hosted Kubernetes services follow a similar upgrade rhythm.

![The image illustrates an "Extended Support" concept for Kubernetes, showing an EKS Cluster with workloads and cluster size, alongside icons representing the number of teams. It mentions that releases occur three times a year.](https://kodekloud.com/kk-media/image/upload/v1752862928/notes-assets/images/AWS-EKS-Upgrade-Cycles/kubernetes-extended-support-eks-cluster.jpg)

By regularly reviewing Upgrade Insights and scheduling automated version upgrades—using tools like [eksctl](https://eksctl.io/), [Terraform](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/eks_cluster), or AWS CloudFormation—you’ll minimize downtime and avoid surprise charges.

---

## Links and References

- [Amazon EKS Version Lifecycle](https://docs.aws.amazon.com/eks/latest/userguide/kubernetes-versions.html)
- [AWS EKS Upgrade Best Practices](https://docs.aws.amazon.com/eks/latest/userguide/update-cluster.html)
- [eksctl — Official CLI for EKS](https://eksctl.io/)
- [Terraform AWS Provider: eks_cluster](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/eks_cluster)
- [Amazon EKS Pricing](https://aws.amazon.com/eks/pricing/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-eks/module/1c61ee8d-9fca-4ccb-9670-b87e09b3135b/lesson/ee025c6e-48bc-4135-9ddd-84745e981b62)**
>
> Watch video content
