# Karpenter - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-EKS/Compute-Scaling/Karpenter)

---

## Table of Contents

- Karpenter
  - How Karpenter Works
  - Cost and Resource Optimization
  - Streamlined Cluster Management
  - Consolidation
  - Workload Requirements
  - Summary of Best Practices
  - Links and References
  - Watch Video

---

## Content

AWS EKS

Compute Scaling

# Karpenter

Karpenter is an open-source, Kubernetes-native autoscaler originally developed by AWS and donated to the Kubernetes Autoscaling SIG. It dynamically provisions EC2 compute nodes on demand—without preconfigured NodeGroups or Auto Scaling Groups—optimizing for cost, performance, and availability.

> [!important]
> **Note**
>
> Before installing Karpenter, ensure your EKS cluster has the necessary IAM roles, instance profiles, and service account permissions for EC2 provisioning.

| Feature                | NodeGroups (Auto Scaling Group)     | Karpenter                               |
| ---------------------- | ----------------------------------- | --------------------------------------- |
| Provisioning Model     | Static, predefined instance types   | Dynamic, workload-driven instance types |
| Scaling Granularity    | Group-level scaling policies        | Pod-level scheduling triggers           |
| AZ Awareness           | Separate ASGs per Availability Zone | Automatic AZ selection based on pricing |
| Cost Optimization      | Manual spot & instance mix setup    | Automatic least-cost instance discovery |
| Upgrades & Maintenance | Rolling updates per NodeGroup       | Cluster-wide cordon/drain management    |

![The image is an introduction to Karpenter, showing a diagram with three colored cloud icons connected to a central "Autoscaling" icon.](https://kodekloud.com/kk-media/image/upload/v1752862766/notes-assets/images/AWS-EKS-Karpenter/karpenter-autoscaling-cloud-diagram.jpg)

Traditional Auto Scaling Groups require advance capacity planning—choosing instance types, defining scaling policies, and managing multiple ASGs—which can lead to wasted resources and operational overhead. Karpenter replaces these static NodeGroups with flexible node pools defined as Kubernetes custom resources.

![The image is a slide titled "Karpenter’s Flexibility," featuring two sections: one about scaling nodes in different availability zones (AZs) and another about considerations for EBS volumes.](https://kodekloud.com/kk-media/image/upload/v1752862768/notes-assets/images/AWS-EKS-Karpenter/karpenter-flexibility-scaling-nodes-ebs.jpg)

## How Karpenter Works

Karpenter runs as an in-cluster controller. When a pod remains unschedulable, it:

1.  Inspects the pod’s resource requests (CPU, memory, GPU, etc.).
2.  Queries available EC2 instance types in the region that match those requirements.
3.  Selects the optimal AZ and instance type based on current pricing and capacity.
4.  Provisions a node and binds it back to the Kubernetes control plane.

This architecture ensures fast, workload-native node scheduling without manual ASG configurations.

![The image illustrates "On-Demand Node Deployment" using Karpenter, showing connections to an API and EC2, with a focus on workload-native node scheduling and GPU resources.](https://kodekloud.com/kk-media/image/upload/v1752862769/notes-assets/images/AWS-EKS-Karpenter/on-demand-node-deployment-karpenter-ec2.jpg)

## Cost and Resource Optimization

When a pod requests, for example, 4 vCPU and 8 GiB RAM, Karpenter:

- Discovers all matching EC2 instance types.
- Retrieves on-demand and spot pricing for each.
- Launches the least expensive option that meets availability zone constraints.

This automated, cost-driven provisioning minimizes waste and accelerates scheduling.

![The image illustrates automated cost and resource optimization using Karpenter and EC2, highlighting specifications of 4 CPU and 8 GB RAM.](https://kodekloud.com/kk-media/image/upload/v1752862770/notes-assets/images/AWS-EKS-Karpenter/karpenter-ec2-cost-optimization-diagram.jpg)

## Streamlined Cluster Management

Karpenter simplifies upgrades and maintenance by cordoning and draining only the nodes that require replacement. It then either reschedules pods onto existing capacity or provisions new nodes automatically—eliminating manual rolling updates across multiple NodeGroups.

![The image illustrates "Streamlined Cluster Management" with four sets of node groups, each containing three hexagonal icons with gear symbols.](https://kodekloud.com/kk-media/image/upload/v1752862771/notes-assets/images/AWS-EKS-Karpenter/streamlined-cluster-management-node-groups.jpg)

## Consolidation

By continuously monitoring node utilization, Karpenter can consolidate workloads onto fewer, lower-cost instances. Underutilized nodes are drained and terminated, maximizing cluster efficiency and reducing cloud spend.

![The image illustrates a concept of consolidation with four bar charts showing different levels of space utilization, highlighting waste space and optimal usage.](https://kodekloud.com/kk-media/image/upload/v1752862772/notes-assets/images/AWS-EKS-Karpenter/consolidation-space-utilization-bar-charts.jpg)

## Workload Requirements

To ensure safe, predictable scaling with Karpenter, each workload should define:

- **Resource Requests** (`cpu`, `memory`): Guarantees accurate scheduling and avoids overcommitment.
- **Pod Disruption Budgets**: Maintains minimum availability during node drains.
- **Topology Spread Constraints**: Ensures pods distribute across AZs or specific nodes.

> [!important]
> **Warning**
>
> Without proper PodDisruptionBudgets and resource requests, Karpenter might co-locate all pods on a single, cheapest instance or disrupt critical services unexpectedly.

![The image outlines the biggest downsides of using Karpenter, focusing on pod disruption budgets, topology spreads, and resource requests, with details on workload stability and resource allocation.](https://kodekloud.com/kk-media/image/upload/v1752862773/notes-assets/images/AWS-EKS-Karpenter/karpenter-downsides-pod-disruption-topology.jpg)

## Summary of Best Practices

1.  **Workload-Native Provisioning**  
    Let Karpenter select EC2 instances based on explicit pod specifications.
2.  **Define Disruption Budgets & Topology**  
    Use PodDisruptionBudgets and TopologySpreadConstraints for high availability.
3.  **Specify Resource Requests**  
    Always set `requests` for CPU and memory to guide scheduling decisions.
4.  **Cluster-Level Deployment**  
    Run Karpenter as a Kubernetes Deployment with elevated permissions for reliability.

![The image outlines four best practices for cluster management: abundance of compute options, ease of deployment, responsiveness to changes, and cluster service integration. Each practice is briefly described in a colorful, numbered box.](https://kodekloud.com/kk-media/image/upload/v1752862774/notes-assets/images/AWS-EKS-Karpenter/cluster-management-best-practices-diagram.jpg)

Karpenter brings dynamic, cost-optimized scaling to AWS EKS with minimal upfront configuration. By providing well-defined workloads and leveraging Karpenter’s automation, you can eliminate manual NodeGroup tuning and let your cluster adapt instantly to changing demands.

## Links and References

- [AWS Karpenter GitHub Repository](https://github.com/aws/karpenter)
- [AWS EKS Documentation](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html)
- [Kubernetes Autoscaling SIG](https://github.com/kubernetes/autoscaler/tree/master/karpenter)
- [EKS Best Practices Guide](https://docs.aws.amazon.com/eks/latest/userguide/best-practices.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-eks/module/1210661b-7eda-423b-b5f3-b758257d1221/lesson/a5385cac-bf6c-452d-9520-2334bf61d8de)**
>
> Watch video content
