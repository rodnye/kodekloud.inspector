# Fargate - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-EKS/Compute-Scaling/Fargate)

---

## Table of Contents

- Fargate
  - How Fargate Works
  - Limitations of Fargate Nodes
  - When to Use Fargate
  - Links and References
  - Watch Video

---

## Content

AWS EKS

Compute Scaling

# Fargate

When running workloads on Amazon EKS, you can choose from three compute modes based on your workload requirements:

| Compute Mode | Description                                          | Best For                                 |
| ------------ | ---------------------------------------------------- | ---------------------------------------- |
| Fargate      | Serverless, pod-based provisioning                   | Isolation, simplified operations         |
| Node Groups  | Managed or unmanaged EC2 instances                   | Full control over instances, custom AMIs |
| Karpenter    | Open-source autoscaler that provisions EC2 instances | Cost optimization, rapid scaling         |

We’ll start by exploring **Fargate**, Amazon’s serverless compute engine for containers, then compare it with other options in later sections.

## How Fargate Works

When you deploy a Pod to EKS, the Kubernetes API Server stores its definition in etcd. Normally the default scheduler assigns it to an EC2 instance in a Node Group. With Fargate, you:

1.  Define a **Fargate profile**, which installs an admission webhook.
2.  The webhook intercepts new Pods matching your profile and mutates them to be scheduled by the Fargate scheduler.
3.  The default scheduler ignores those Pods, leaving Fargate to handle provisioning.

![The image is a diagram titled "Fargate – Introduction," showing the interaction between components like API Server, etcd, Scheduler, Webhook, and Fargate Scheduler, with arrows indicating data flow.](https://kodekloud.com/kk-media/image/upload/v1752862758/notes-assets/images/AWS-EKS-Fargate/fargate-introduction-diagram-data-flow.jpg)

Once the Fargate scheduler claims your Pod, it:

- Evaluates the Pod’s CPU and memory requests.
- Calls AWS APIs to launch the appropriate serverless “node.”
- Waits for the kubelet to join the cluster.
- Binds your Pod to the new Fargate node.

![The image shows a diagram labeled "Fargate Scheduler Backend" with icons representing "Fargate Scheduler" and "Fargate Node."](https://kodekloud.com/kk-media/image/upload/v1752862760/notes-assets/images/AWS-EKS-Fargate/fargate-scheduler-backend-diagram.jpg)

Internally, Fargate reserves minimal resources for system components (kubelets and sidecars) before launching your container. From your AWS account, no EC2 instance appears—only a Fargate node inside the cluster.

![The image is a diagram illustrating how the Fargate Scheduler works, showing the interaction between components like the API Server, etcd, Scheduler, Webhook, Kubelets, Sidecars, and Fargate Node.](https://kodekloud.com/kk-media/image/upload/v1752862761/notes-assets/images/AWS-EKS-Fargate/fargate-scheduler-components-interaction-diagram.jpg)

> [!important]
> **Note**
>
> Fargate profiles support label- and namespace-based selection. Use them to target only specific workloads for serverless deployment.

## Limitations of Fargate Nodes

Because Fargate nodes aren’t EC2 instances, they come with a few constraints:

- **No EBS volumes**: Use Amazon EFS via the [EFS CSI driver](https://docs.aws.amazon.com/eks/latest/userguide/efs-csi.html) for persistent storage.
- **DaemonSets unsupported**: You cannot schedule DaemonSets on Fargate nodes.

![The image highlights limitations of Fargate nodes, stating that dynamic EFS volumes and EBS volumes do not work in Fargate.](https://kodekloud.com/kk-media/image/upload/v1752862762/notes-assets/images/AWS-EKS-Fargate/fargate-limitation-dynamic-efs-ebs.jpg)

In Kubernetes, DaemonSets ensure one Pod per node. Since Fargate creates a dedicated node per Pod, traditional DaemonSets fail to run. Monitoring and logging agents must run as sidecar containers instead.

![The image illustrates the limitations of Fargate nodes, comparing "Daemon Sets" and "Fargate" with icons and labels, and showing a sequence of 100 Pods, 100 Nodes, and 100 Daemon Sets.](https://kodekloud.com/kk-media/image/upload/v1752862763/notes-assets/images/AWS-EKS-Fargate/fargate-nodes-daemon-sets-comparison.jpg)

> [!important]
> **Warning**
>
> DaemonSets will not schedule on Fargate. Convert critical agents (e.g., log collectors) into sidecars, which increases per-Pod overhead.

## When to Use Fargate

Fargate excels at providing isolation and simplicity:

1.  **Security isolation**: Pods run on dedicated kernel and filesystem boundaries.
2.  **Compute isolation**: Guaranteed CPU and memory without noisy neighbors.

![The image explains two reasons for using Fargate: isolation for security and isolation for compute resources.](https://kodekloud.com/kk-media/image/upload/v1752862764/notes-assets/images/AWS-EKS-Fargate/fargate-isolation-security-compute-reasons.jpg)

Use Fargate for critical system workloads—metrics-server, cluster-autoscaler, or Karpenter—so they remain unaffected by node lifecycle events. Just remember:

- Deploy multiple replicas across Availability Zones for high availability.
- Balance cost versus resilience when sizing Fargate profiles.

![The image illustrates Kubernetes services related to availability, featuring icons for Metric Server and Karpenter.](https://kodekloud.com/kk-media/image/upload/v1752862765/notes-assets/images/AWS-EKS-Fargate/kubernetes-services-availability-metric-karpenter.jpg)

## Links and References

- [Amazon EKS on AWS Fargate](https://docs.aws.amazon.com/eks/latest/userguide/fargate.html)
- [Kubernetes DaemonSet Documentation](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/)
- [AWS EFS CSI Driver](https://docs.aws.amazon.com/eks/latest/userguide/efs-csi.html)
- [Karpenter Autoscaling](https://karpenter.sh/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-eks/module/1210661b-7eda-423b-b5f3-b758257d1221/lesson/4153ad9d-859a-43e8-97b2-9880072f6c65)**
>
> Watch video content
