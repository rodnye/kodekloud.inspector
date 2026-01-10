# SGSecurity Groups for Prods - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-EKS/Redundancy-Resiliency/SGSecurity-Groups-for-Prods)

---

## Table of Contents

- SGSecurity Groups for Prods
  - Default Pod Networking with the Amazon VPC CNI
  - Kubernetes Pod Identity and Security
  - Enabling Security Groups for Pods
  - Challenges with Third-Party CNIs
  - Recommended Alternatives
  - Conclusion
  - Links and References
  - Watch Video
  - Practice Lab
    - Trunk ENI Compatibility and maxPods

---

## Content

AWS EKS

Redundancy Resiliency

# SGSecurity Groups for Prods

In this lesson, we’ll examine how to apply AWS Security Groups at the Kubernetes pod level using EKS’s VPC CNI plugin. Security groups work as stateful firewalls within your VPC, controlling inbound and outbound traffic between endpoints. While EC2 users may be familiar with security group pitfalls—such as forgetting to open ports or failing to allow bi-directional traffic—attaching security groups to pods introduces additional operational considerations.

## Default Pod Networking with the Amazon VPC CNI

By default, the Amazon VPC CNI plugin provisions an Elastic Network Interface (ENI) on each node. That ENI receives one primary IP for the node plus a pool of secondary IPs for pods. All of these IPs share the same security group, applied at the node level (often via your Auto Scaling group).  
As a result, if any pod on a node can reach an AWS resource (for example, an RDS instance), all pods on that node inherit that network-level access—even when IAM policies restrict access at the workload level.

> [!important]
> **Note**
>
> We strongly recommend enforcing fine-grained permissions with IAM Roles for Service Accounts (IRSA) rather than relying solely on security groups for pod-level segmentation.

## Kubernetes Pod Identity and Security

![The image illustrates a Kubernetes pod identity setup, showing the interaction between AWS IAM, security groups, and a Kubernetes cluster with control and data planes. It includes components like ENI, etcd, API server, and scheduler.](https://kodekloud.com/kk-media/image/upload/v1752862898/notes-assets/images/AWS-EKS-SGSecurity-Groups-for-Prods/kubernetes-pod-identity-aws-iam-diagram.jpg)

Attaching security groups directly to pods requires a custom trunk-and-branch ENI model. EKS’s control plane uses a private AWS API to create a “trunk” ENI on each node, then spawns branch ENIs—one per pod—each with its own security group. While this allows micro-segmented network policies, it can be complex to maintain.

Network Policies in Kubernetes are simpler to manage but only filter by IP/CIDR—they can’t reference AWS resources (for example, RDS ARNs) directly.

## Enabling Security Groups for Pods

Behind the scenes, EKS’s VPC CNI controller:

1.  Attaches a **trunk ENI** to each node.
2.  Provisions **branch ENIs** for pods, each with distinct security groups.
3.  Routes pod traffic through its branch ENI.

![The image illustrates a diagram of pod security in an EKS cluster, showing the control plane and a node with security groups (SG) connected to IP addresses via a trunk.](https://kodekloud.com/kk-media/image/upload/v1752862900/notes-assets/images/AWS-EKS-SGSecurity-Groups-for-Prods/pod-security-eks-cluster-diagram.jpg)

### Trunk ENI Compatibility and maxPods

Not every EC2 instance family supports trunk ENIs. Before enabling pod security groups, verify your nodes against the [AWS Trunk ENI Compatibility Matrix](https://docs.aws.amazon.com/eks/latest/userguide/security-groups-for-pods.html#supported-instance-types).  
Additionally, branch ENIs bypass the VPC CNI’s `maxPods` calculation. You must manually set `maxPods` on your node group or Karpenter `NodeClass` to prevent IP exhaustion:

```
# Example: eksctl NodeGroup spec
nodeGroups:
  - name: secure-nodes
    instanceType: m5.xlarge
    maxPodsPerNode: 50
```

> [!important]
> **Warning**
>
> Setting `maxPods` incorrectly may cause pods to fail scheduling when the node IP pool is exhausted.

![The image illustrates pod security in a network, showing a node with security group (SG 1), trunk with 8 pods, 30 IP addresses, and VPC-CNI settings.](https://kodekloud.com/kk-media/image/upload/v1752862901/notes-assets/images/AWS-EKS-SGSecurity-Groups-for-Prods/pod-security-network-illustration.jpg)

Because `maxPods` is configured per node group or provisioner, you should partition your workloads:

- **Secure Nodes**: Nodes with pod-level security groups.
- **Standard Nodes**: Nodes following default VPC CNI behavior.

## Challenges with Third-Party CNIs

Replacing the VPC CNI with plugins such as Calico or Cilium can complicate pod-level security group management. Each CNI implements its own networking model, making integration with AWS private APIs and security groups more error-prone.

## Recommended Alternatives

Instead of micro-segmented security groups for pods, consider these strategies:

| Strategy                                    | Description                                                                                        | Reference                                                                            |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| IAM Roles for Service Accounts (IRSA)       | Assign IAM roles directly to Service Accounts, enforcing AWS-level permissions per pod.            | https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html |
| Kubernetes Network Policies                 | Restrict pod egress/ingress by IP CIDRs or namespace labels, isolating traffic between workloads.  | https://kubernetes.io/docs/concepts/services-networking/network-policies/            |
| Dedicated Node Groups / Karpenter NodeClass | Use separate node groups with distinct security groups, scheduling only sensitive pods to those.   | https://eksctl.io/usage/creating-and-managing-node-groups/                           |
| Isolated EKS Clusters                       | Deploy fully separate EKS clusters in different VPCs to achieve strong multi-tenant or compliance. | https://docs.aws.amazon.com/eks/latest/userguide/clusters.html                       |

![The image illustrates the concept of isolating EKS clusters using AWS IAM, network policies, node groups, and VPCs, with an AWS RDS instance also depicted.](https://kodekloud.com/kk-media/image/upload/v1752862903/notes-assets/images/AWS-EKS-SGSecurity-Groups-for-Prods/eks-cluster-isolation-aws-iam-diagram.jpg)

## Conclusion

Security groups for pods deliver fine-grained network controls but rely on private AWS APIs, trunk ENIs, and manual IP management. For most teams, a combination of IAM Roles for Service Accounts, Kubernetes Network Policies, dedicated node groups, or entirely isolated clusters will yield a more maintainable and secure architecture.

## Links and References

- [Amazon VPC CNI for Kubernetes](https://github.com/aws/amazon-vpc-cni-k8s)
- [EKS Security Groups for Pods](https://docs.aws.amazon.com/eks/latest/userguide/security-groups-for-pods.html)
- [Kubernetes Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/)
- [IAM Roles for Service Accounts (IRSA)](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-eks/module/1bbca08a-6f11-4fbe-89db-aeee53fccb0d/lesson/251a68cf-ed4a-448c-a825-42d452ad09d6)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-eks/module/1bbca08a-6f11-4fbe-89db-aeee53fccb0d/lesson/ff4fa99b-8d30-4752-81fd-31910dd5fa0a)**
>
> Practice lab
